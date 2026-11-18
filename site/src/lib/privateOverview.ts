import DOMPurify from 'dompurify';
import { unzip, type Unzipped } from 'fflate';
import { decryptResearchArchive } from './researchCrypto';

const mimeTypes:Record<string,string>={mp4:'video/mp4',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp',svg:'image/svg+xml'};
const unpack=(data:Uint8Array)=>new Promise<Unzipped>((resolve,reject)=>unzip(data,(error,files)=>error?reject(error):resolve(files)));

export function initializePrivateOverview() {
  const root=document.querySelector<HTMLElement>('#private-overview');
  if(!root)return;
  const form=root.querySelector<HTMLFormElement>('form')!;
  const password=root.querySelector<HTMLInputElement>('#overview-password')!;
  const submit=form.querySelector<HTMLButtonElement>('button')!;
  const status=root.querySelector<HTMLElement>('#unlock-status')!;
  const unlocked=root.querySelector<HTMLElement>('.unlocked-overview')!;
  const frame=root.querySelector<HTMLIFrameElement>('iframe')!;
  const abort=new AbortController();
  let urls:string[]=[],generation=0,resize:ResizeObserver|undefined,stopVideos:(()=>void)|undefined;
  const clear=()=>{
    generation++;resize?.disconnect();resize=undefined;stopVideos?.();stopVideos=undefined;
    frame.removeAttribute('srcdoc');frame.src='about:blank';
    urls.forEach(url=>URL.revokeObjectURL(url));urls=[];
    unlocked.hidden=true;form.hidden=false;password.value='';password.removeAttribute('aria-invalid');
    status.textContent='';submit.disabled=false;submit.textContent='Open overview ↗';
  };
  const makeURL=(bytes:Uint8Array,mime:string)=>{
    const url=URL.createObjectURL(new Blob([new Uint8Array(bytes).buffer],{type:mime}));urls.push(url);return url;
  };
  const render=async(files:Unzipped,version:number)=>{
    const html=files['index.html'];if(!html)throw new Error('Missing overview document.');
    const clean=DOMPurify.sanitize(new TextDecoder().decode(html),{
      WHOLE_DOCUMENT:true,ADD_TAGS:['style'],
      FORBID_TAGS:['script','iframe','object','embed','form','input','textarea','button','link','base','meta','noscript'],
    });
    const doc=new DOMParser().parseFromString(clean,'text/html');
    const assets=new Map<string,string>();
    for(const [name,bytes]of Object.entries(files)){
      const mime=mimeTypes[name.split('.').pop()!.toLowerCase()];if(mime)assets.set(name,makeURL(bytes,mime));
    }
    doc.querySelectorAll('[src],[poster],[srcset]').forEach(element=>{
      element.removeAttribute('srcset');
      for(const attribute of ['src','poster']){
        if(!element.hasAttribute(attribute))continue;
        const original=element.getAttribute(attribute)!.replace(/^\.\//,'');
        const blob=assets.get(original);if(blob)element.setAttribute(attribute,blob);else element.removeAttribute(attribute);
      }
    });
    doc.querySelectorAll('a[href]').forEach(link=>{
      const href=link.getAttribute('href')!;
      if(href.startsWith('#'))return;
      if(/^https:\/\//.test(href)){link.setAttribute('target','_blank');link.setAttribute('rel','noopener noreferrer');}
      else link.removeAttribute('href');
    });
    doc.querySelectorAll('video').forEach(video=>{video.removeAttribute('autoplay');video.setAttribute('muted','');video.setAttribute('controls','');video.setAttribute('preload','metadata');});
    const csp=doc.createElement('meta');csp.httpEquiv='Content-Security-Policy';
    csp.content="default-src 'none'; img-src blob: data:; media-src blob:; style-src 'unsafe-inline'; script-src 'none'; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
    doc.head.prepend(csp);
    const style=doc.createElement('style');
    style.textContent=`
      :root{color-scheme:dark;--bg:#181918;--bg-2:#202320;--surface:#202320;--border:#353b34;--hairline:#30352f;--text:#eeeee7;--muted:#a6ada2;--faint:#a6ada2;--accent:#bddc92;--accent-strong:#d4eeb0;--accent-line:#bddc9240;--accent-2:#bddc92;--sans:system-ui,-apple-system,sans-serif;--serif:var(--sans);--mono:ui-monospace,monospace}
      body{font-size:15px}h1,h2,h3{font-weight:500;letter-spacing:-.035em}.lead,.aside{font-style:normal}.page{padding-block:32px 48px}.prose{font-size:1rem}
      .grid,.grid.two{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))}.diagram .scroll,.chart .scroll{background:#f6f1e5;color-scheme:light}a{overflow-wrap:anywhere}video{cursor:pointer}
      @media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}}
    `;
    // The source document includes styles in its body; the theme must follow them.
    doc.body.append(style);
    doc.documentElement.setAttribute('data-overview-ready','');
    const loaded=new Promise<void>(resolve=>{
      const done=()=>{frame.removeEventListener('load',onLoad);abort.signal.removeEventListener('abort',done);resolve();};
      const onLoad=()=>{if(frame.contentDocument?.documentElement.hasAttribute('data-overview-ready'))done();};
      frame.addEventListener('load',onLoad);abort.signal.addEventListener('abort',done,{once:true});
    });
    frame.srcdoc='<!doctype html>'+doc.documentElement.outerHTML;
    form.hidden=true;unlocked.hidden=false;
    await loaded;if(version!==generation||abort.signal.aborted)return;
    const content=frame.contentDocument!;
    const fit=()=>{frame.style.height=`${Math.max(600,content.body.scrollHeight+2)}px`;};
    resize=new ResizeObserver(fit);resize.observe(content.body);fit();
    // Run media controls from the parent; the imported document cannot execute scripts.
    const mediaAbort=new AbortController(),motion=matchMedia('(prefers-reduced-motion: reduce)');
    const videos=[...content.querySelectorAll('video')];
    const manuallyPaused=new WeakSet<HTMLVideoElement>();
    const manualPlay=new WeakSet<HTMLVideoElement>();
    const changing=new WeakSet<HTMLVideoElement>();
    const visible=new WeakSet<HTMLVideoElement>();
    const update=(video:HTMLVideoElement)=>{
      if(!document.hidden&&visible.has(video)&&!manuallyPaused.has(video)&&(!motion.matches||manualPlay.has(video))){
        video.muted=true;video.defaultMuted=true;
        if(video.paused){changing.add(video);video.play().catch(()=>changing.delete(video));}
      }else if(!video.paused){changing.add(video);video.pause();}
    };
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      const video=entry.target as HTMLVideoElement;
      if(entry.isIntersecting)visible.add(video);else visible.delete(video);update(video);
    }),{threshold:.05});
    videos.forEach(video=>{
      video.muted=true;video.defaultMuted=true;video.playsInline=true;
      video.addEventListener('pause',()=>{if(changing.has(video))changing.delete(video);else manuallyPaused.add(video);},{signal:mediaAbort.signal});
      video.addEventListener('play',()=>{if(changing.has(video))changing.delete(video);else{manuallyPaused.delete(video);manualPlay.add(video);}},{signal:mediaAbort.signal});
      observer.observe(video);
    });
    content.addEventListener('click',event=>{
      const target=(event.target as Element).closest('a[href^="#"]');if(!target)return;
      const id=target.getAttribute('href')!.slice(1),section=content.getElementById(id);
      if(section){event.preventDefault();window.scrollTo({top:frame.getBoundingClientRect().top+window.scrollY+section.getBoundingClientRect().top-112,behavior:motion.matches?'instant':'smooth'});}
    },{signal:mediaAbort.signal});
    document.addEventListener('visibilitychange',()=>videos.forEach(update),{signal:mediaAbort.signal});
    motion.addEventListener('change',()=>videos.forEach(update),{signal:mediaAbort.signal});
    stopVideos=()=>{mediaAbort.abort();observer.disconnect();videos.forEach(video=>{video.pause();video.removeAttribute('src');video.load();});};
    const section=content.getElementById(location.hash.slice(1));
    if(section)window.scrollTo({top:frame.getBoundingClientRect().top+window.scrollY+section.getBoundingClientRect().top-112,behavior:'instant'});
  };
  submit.disabled=!crypto.subtle;
  if(!crypto.subtle)status.textContent='Open this page over HTTPS to continue.';
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(submit.disabled)return;
    const version=++generation;submit.disabled=true;submit.textContent='Opening…';password.removeAttribute('aria-invalid');
    status.textContent='Opening the research overview…';
    let value=password.value;password.value='';
    let plaintext:Uint8Array<ArrayBuffer>|undefined;
    try{
      const response=await fetch('/research/private/overview.bin',{signal:abort.signal,cache:'no-store',credentials:'omit'});
      if(!response.ok)throw new Error('unavailable');
      const envelope=await response.arrayBuffer();
      plaintext=await decryptResearchArchive(envelope,value);value='';
      if(version!==generation||abort.signal.aborted)return;
      const files=await unpack(plaintext);plaintext.fill(0);plaintext=undefined;
      if(version!==generation||abort.signal.aborted){Object.values(files).forEach(bytes=>bytes.fill(0));return;}
      try{await render(files,version);}finally{Object.values(files).forEach(bytes=>bytes.fill(0));}
      status.textContent='';
    }catch(error){
      if(version!==generation||abort.signal.aborted)return;
      clear();
      status.textContent=error instanceof Error&&error.message==='unavailable'?'The overview is unavailable. Please try again.':'That password didn’t unlock the overview. Please try again.';
      password.setAttribute('aria-invalid','true');password.focus();
    }finally{value='';plaintext?.fill(0);if(!abort.signal.aborted){submit.disabled=false;submit.textContent='Open overview ↗';}}
  },{signal:abort.signal});
  root.querySelector('.lock-overview')!.addEventListener('click',()=>{clear();password.focus();root.scrollIntoView({behavior:'instant'});},{signal:abort.signal});
  return()=>{abort.abort();clear();};
}
