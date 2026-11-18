/** Keep autoplay and explicit playback working after Astro swaps and on restricted browsers. */
export function initializeResearchVideos() {
  const abort = new AbortController(), signal = abort.signal;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll<HTMLVideoElement>('.research-card video')];
  const states = new Map<HTMLVideoElement, { visible:boolean; choice:'auto'|'play'|'pause'; pending:boolean; blocked:boolean }>();
  const visibleNow = (v:HTMLVideoElement) => { const r=v.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight; };
  const shouldPlay = (v:HTMLVideoElement) => {
    const s=states.get(v)!;
    return !document.hidden&&s.visible&&s.choice!=='pause'&&(s.choice==='play'||!motion.matches);
  };
  const play = (video:HTMLVideoElement) => {
    const s=states.get(video)!;
    if(s.pending||!shouldPlay(video))return;
    // The property must be set too: imported DOM nodes may only retain defaultMuted.
    video.muted=true;video.defaultMuted=true;video.playsInline=true;
    s.pending=true;
    video.play().then(()=>{
      if(signal.aborted)return;
      s.blocked=false;video.controls=false;
      if(!shouldPlay(video))video.pause();
    }).catch(()=>{
      if(signal.aborted)return;
      s.blocked=true;video.controls=true;
    }).finally(()=>{s.pending=false;});
  };
  const update = (video:HTMLVideoElement) => { if(shouldPlay(video))play(video);else video.pause(); };
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const video=entry.target as HTMLVideoElement;
    states.get(video)!.visible=entry.isIntersecting;update(video);
  }),{threshold:0,rootMargin:'0px'});
  videos.forEach(video=>{
    states.set(video,{visible:visibleNow(video),choice:'auto',pending:false,blocked:false});
    const button=video.parentElement!.querySelector<HTMLButtonElement>('.preview-toggle')!;
    const title=video.closest('article')!.querySelector('h3')!.textContent!;
    const label=()=>{
      button.textContent=video.paused?'Play ▶':'Pause Ⅱ';
      button.setAttribute('aria-label',`${video.paused?'Play':'Pause'} ${title} preview`);
      button.setAttribute('aria-pressed',String(!video.paused));
    };
    video.autoplay=false;video.muted=true;video.defaultMuted=true;video.playsInline=true;
    button.hidden=false;video.controls=motion.matches;
    video.addEventListener('play',label,{signal});video.addEventListener('pause',label,{signal});
    video.addEventListener('canplay',()=>{if(!states.get(video)!.blocked)update(video);},{signal});
    video.addEventListener('error',()=>{video.controls=true;button.textContent='Retry ▶';},{signal});
    button.addEventListener('click',()=>{
      const s=states.get(video)!;
      if(video.paused){s.choice='play';s.visible=true;s.blocked=false;if(video.error)video.load();play(video);}
      else{s.choice='pause';video.pause();}
    },{signal});
    // Native controls remain a fallback if the browser rejects scripted playback.
    video.addEventListener('pointerdown',()=>{states.get(video)!.choice='play';},{signal});
    video.addEventListener('keydown',()=>{states.get(video)!.choice='play';},{signal});
    if(video.readyState===0)video.load();
    observer.observe(video);update(video);label();
  });
  document.addEventListener('visibilitychange',()=>videos.forEach(update),{signal});
  motion.addEventListener('change',()=>videos.forEach(update),{signal});
  return()=>{abort.abort();observer.disconnect();videos.forEach(v=>v.pause());};
}
