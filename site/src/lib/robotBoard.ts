import type { BufferGeometry, NormalBufferAttributes } from 'three';
import { chooseMove, play, scoreBoard, type Color } from './robotGo';

/** An illustrative Go sequence using licensed Panda geometry, not unpublished research data. */
export async function mountRobotBoard(root: HTMLElement) {
  const [THREE, { OrbitControls }, { GLTFLoader }, { MeshoptDecoder }, { createPandaKinematics }] = await Promise.all([
    import('three'), import('three/addons/controls/OrbitControls.js'),
    import('three/addons/loaders/GLTFLoader.js'), import('three/addons/libs/meshopt_decoder.module.js'), import('./pandaKinematics'),
  ]);
  const model = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync('/models/panda/panda.glb');
  const disposeModel = () => model.scene.traverse(object => {
    if(object instanceof THREE.Mesh) { object.geometry.dispose(); (Array.isArray(object.material)?object.material:[object.material]).forEach(m=>m.dispose()); }
  });
  if (!root.isConnected) { disposeModel(); return; }
  const canvas = root.querySelector('canvas')!;
  const stage = root.querySelector<HTMLElement>('.robot-stage')!;
  const reset = root.querySelector<HTMLButtonElement>('.robot-reset')!;
  const score = root.querySelector<HTMLButtonElement>('.robot-score')!;
  const scorePanel = root.querySelector<HTMLElement>('.score-panel')!;
  const state = root.querySelector<HTMLElement>('.study-state')!;
  const hint = root.querySelector<HTMLElement>('.study-title')!;
  let renderer: InstanceType<typeof THREE.WebGLRenderer>;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true, powerPreference:'low-power' }); }
  catch(error) { disposeModel(); throw error; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35,1,.01,20);
  camera.position.set(1.50,1.25,1.75);
  const controls = new OrbitControls(camera,canvas);
  const cameraTarget = new THREE.Vector3(.14,.31,.025);
  controls.target.copy(cameraTarget); controls.enablePan=false; controls.enableZoom=false;
  controls.minPolarAngle=.3; controls.maxPolarAngle=Math.PI/2.25; controls.rotateSpeed=.6;
  controls.update(); canvas.style.touchAction='pan-y';
  scene.add(new THREE.HemisphereLight(0xffffff,0x515a50,2.3));
  const key = new THREE.DirectionalLight(0xfff7eb,3.5); key.position.set(-1,3,2); key.castShadow=true;
  key.shadow.mapSize.set(2048,2048); key.shadow.camera.left=-1.5; key.shadow.camera.right=1.5;
  key.shadow.camera.top=1.5; key.shadow.camera.bottom=-1.5; key.shadow.camera.near=.1; key.shadow.camera.far=8; key.shadow.normalBias=.0015;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc8dce2,2); rim.position.set(1,2,-2); scene.add(rim);
  const material = (color:number,metalness=0,roughness=.5) => new THREE.MeshStandardMaterial({color,metalness,roughness});
  const mesh = (geometry:BufferGeometry<NormalBufferAttributes>,mat:InstanceType<typeof THREE.Material>) => {
    const object=new THREE.Mesh(geometry,mat); object.castShadow=true; object.receiveShadow=true; scene.add(object); return object;
  };
  const cylinder = (r1:number,r2:number,h:number,mat:InstanceType<typeof THREE.Material>) => mesh(new THREE.CylinderGeometry(r1,r2,h,48),mat);
  const platform = cylinder(.85,.83,.032,material(0x292e2b,.25,.45)); platform.position.set(.14,-.016,.03);
  const floor = mesh(new THREE.PlaneGeometry(8,8),new THREE.ShadowMaterial({color:0x000000,opacity:.25})); floor.rotation.x=-Math.PI/2; floor.position.y=-.04;

  const panda = model.scene; panda.rotation.set(-Math.PI/2,-.82,0,'YXZ'); panda.position.set(-.24,0,-.28);
  panda.traverse(object => { if(object instanceof THREE.Mesh) { object.castShadow=true; object.receiveShadow=true; } }); scene.add(panda);
  const blackRobot=panda.clone(true),blackFrame=new THREE.Group();
  // Keep the licensed Panda geometry; distinguish black with an industrial yellow finish.
  blackRobot.traverse(object=>{if(object instanceof THREE.Mesh){
    const tint=(original:InstanceType<typeof THREE.Material>)=>{const m=original.clone();if(m instanceof THREE.MeshStandardMaterial&&m.color.r+m.color.g+m.color.b>1.5){m.color.set(0xe9ac22);m.metalness=.18;m.roughness=.4;}return m;};
    object.material=Array.isArray(object.material)?object.material.map(tint):tint(object.material);
  }});
  blackFrame.position.set(.27,0,-.01);blackFrame.rotation.y=-Math.PI/2;blackFrame.add(blackRobot);scene.add(blackFrame);
  scene.updateMatrixWorld(true);
  const kinematics = createPandaKinematics(panda),blackKinematics=createPandaKinematics(blackRobot);
  const woodCanvas = document.createElement('canvas'); woodCanvas.width=woodCanvas.height=512;
  const ctx=woodCanvas.getContext('2d')!; ctx.fillStyle='#b48b57'; ctx.fillRect(0,0,512,512);
  for(let y=0;y<512;y++) {
    ctx.strokeStyle=`rgba(64,42,18,${.025+Math.abs(Math.sin(y*.15))*.035})`;
    ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(180,y+Math.sin(y)*2,320,y-2,512,y);ctx.stroke();
  }
  const woodTexture=new THREE.CanvasTexture(woodCanvas); woodTexture.colorSpace=THREE.SRGBColorSpace;
  const wood=new THREE.MeshStandardMaterial({map:woodTexture,roughness:.62});
  const edge=material(0x705233),grid=material(0x45331f);
  const boardBase=mesh(new THREE.BoxGeometry(.40,.035,.40),edge);boardBase.position.set(.14,.0175,.13);
  const top=mesh(new THREE.BoxGeometry(.40,.006,.40),wood);top.position.set(.14,.038,.13);
  const spacing=.04,originX=-.02,originZ=-.03,surfaceY=.042;
  for(let i=0;i<9;i++) {
    const a=mesh(new THREE.BoxGeometry(.32,.0005,.001),grid);a.position.set(.14,surfaceY,originZ+i*spacing);
    const b=mesh(new THREE.BoxGeometry(.001,.0005,.32),grid);b.position.set(originX+i*spacing,surfaceY,.13);
  }
  for(const x of [2,4,6]) for(const z of [2,4,6]) {
    if((x===4)!==(z===4))continue;
    const dot=cylinder(.003,.003,.0007,grid);dot.position.set(originX+x*spacing,surfaceY,originZ+z*spacing);
  }
  const stoneMaterials=[material(0x161c1d,.15,.2),material(0xfffbec,.1,.25)];
  const stoneGeometry=new THREE.SphereGeometry(.019,28,16);
  const makeStone=(color:number) => {const s=mesh(stoneGeometry,stoneMaterials[color]);s.scale.y=.43;return s;};
  const pickup=new THREE.Vector3(-.21,.05,.20);
  const blackPickup=new THREE.Vector3(.07,.05,-.22);
  const blackTray=cylinder(.065,.07,.018,edge);blackTray.position.set(blackPickup.x,.012,blackPickup.z);
  for(let i=0;i<5;i++){const s=makeStone(0);s.position.set(blackPickup.x+Math.cos(i*2.4)*.03,.028+i*.003,blackPickup.z+Math.sin(i*2.4)*.03);}
  const tray=cylinder(.065,.07,.018,edge);tray.position.set(pickup.x,.012,pickup.z);
  for(let i=0;i<5;i++) {const s=makeStone(1);s.position.set(pickup.x+Math.cos(i*2.4)*.03,.028+i*.003,pickup.z+Math.sin(i*2.4)*.03);}
  const carried=makeStone(0);
  const pointPosition=(p:number)=>new THREE.Vector3(originX+(p%9)*spacing,.051,originZ+Math.floor(p/9)*spacing);
  const stones=Array.from({length:81},(_,p)=>{const s=makeStone(0);s.position.copy(pointPosition(p));s.visible=false;return s;});
  const ghostMaterial=new THREE.MeshStandardMaterial({color:0x161c1d,transparent:true,opacity:.75,metalness:.15,roughness:.2});
  const ghost=mesh(stoneGeometry,ghostMaterial);
  ghost.scale.y=.43;ghost.visible=false;ghost.castShadow=false;
  const lastMove=mesh(new THREE.RingGeometry(.006,.008,24),new THREE.MeshBasicMaterial({color:0xbddc92,side:THREE.DoubleSide}));
  lastMove.rotation.x=-Math.PI/2;lastMove.visible=false;
  const discard=new THREE.Vector3(-.05,.05,.41);
  const blackDiscard=new THREE.Vector3(-.14,.05,-.06);
  const blackCaptureTray=cylinder(.055,.06,.018,edge);blackCaptureTray.position.set(blackDiscard.x,.012,blackDiscard.z);
  const captureTray=cylinder(.055,.06,.018,edge);captureTray.position.set(discard.x,.012,discard.z);
  const capturedStones:ReturnType<typeof makeStone>[]=[];
  const captureCounts=[0,0];
  function collectStone(color:Color,arm:Color){
    const count=captureCounts[arm-1]++,center=arm===1?blackDiscard:discard;
    const stone=makeStone(color-1),slot=count%7,layer=Math.floor(count/7);
    stone.position.set(center.x+(slot?Math.cos((slot-1)*Math.PI/3)*.033:0),.029+layer*.015,center.z+(slot?Math.sin((slot-1)*Math.PI/3)*.033:0));
    capturedStones.push(stone);
  }
  type Motion={from:InstanceType<typeof THREE.Vector3>;to:InstanceType<typeof THREE.Vector3>;point:number;color:Color;arm:Color;remove:boolean;time:number;duration:number;lifted:boolean;released:boolean;approach?:InstanceType<typeof THREE.Vector3>;redirect?:InstanceType<typeof THREE.Vector3>;before?:{board:number[];previous:string|undefined}};
  let replyPending:number|undefined;
  let demoColor:Color=1,playerColor:Color=1,scored=false,scoreRequested=false;
  const colorName=(color:Color)=>color===1?'black':'white';
  const takeoverColor=():Color=>interactive?playerColor:(active&&!active.remove&&!active.released?active.arm:demoColor);
  const turnHint=()=>interactive?`Your move (${colorName(playerColor)})`:`Take over ${colorName(takeoverColor())}`;
  let board=Array<number>(81).fill(0),previous:string|undefined,interactive=false,busy=false,demoMoves=0;
  let queue:Motion[]=[],active:Motion|undefined,raf=0,last=0,visible=true,destroyed=false,hover=-1,selected=40;
  const media=matchMedia('(prefers-reduced-motion: reduce)'); let paused=media.matches;
  const abort=new AbortController();
  const smooth=(value:number)=>{const t=THREE.MathUtils.clamp(value,0,1);return t*t*(3-2*t);};
  const home=pickup.clone().add(new THREE.Vector3(0,.20,0));
  const blackHome=blackPickup.clone().add(new THREE.Vector3(0,.20,0));
  kinematics.solve(home,100);blackKinematics.solve(blackHome,100);
  const faceTextures=['happy','sad','neutral'].map(mood=>{
    const face=document.createElement('canvas');face.width=256;face.height=192;const c=face.getContext('2d')!;
    c.fillStyle='#15221e';c.strokeStyle=mood==='happy'?'#bddc92':mood==='sad'?'#b3c4d3':'#c7cdc3';c.lineWidth=7;
    c.beginPath();c.roundRect(8,8,240,176,36);c.fill();c.stroke();c.lineCap='round';c.lineWidth=10;
    for(const x of [82,174]){c.beginPath();if(mood==='happy'){c.moveTo(x-16,76);c.quadraticCurveTo(x,52,x+16,76);}else{c.moveTo(x-12,69);c.lineTo(x+12,mood==='sad'?80:69);}c.stroke();}
    c.beginPath();c.moveTo(88,mood==='sad'?137:120);c.quadraticCurveTo(128,mood==='happy'?160:mood==='sad'?96:120,168,mood==='sad'?137:120);c.stroke();
    const texture=new THREE.CanvasTexture(face);texture.colorSpace=THREE.SRGBColorSpace;return texture;
  });
  const faces=[blackKinematics,kinematics].map(()=>{const face=new THREE.Sprite(new THREE.SpriteMaterial({map:faceTextures[2],depthTest:false,depthWrite:false}));face.renderOrder=10;face.scale.set(.13,.0975,1);face.visible=false;scene.add(face);return face;});
  let reactionRaf=0,reactionVersion=0;
  function clearReaction(){cancelAnimationFrame(reactionRaf);reactionVersion++;faces.forEach(f=>f.visible=false);}
  function reactToScore(winner:number){
    clearReaction();const version=reactionVersion,solvers=[blackKinematics,kinematics],homes=[blackHome,home];
    const starts=solvers.map(s=>s.tipPosition()),targets=homes.map((h,i)=>h.clone().add(new THREE.Vector3(0,winner===0?0:winner===i+1?.13:-.12,0)));
    faces.forEach((f,i)=>{f.material.map=faceTextures[winner===0?2:winner===i+1?0:1];f.material.needsUpdate=true;f.visible=true;});
    const began=performance.now();
    const animate=(now:number)=>{
      if(destroyed||version!==reactionVersion)return;
      const t=media.matches?1:Math.min(1,(now-began)/750);
      solvers.forEach((s,i)=>{s.grip(false);s.solve(starts[i].clone().lerp(targets[i],smooth(t)),t===1&&media.matches?100:12);});
      draw();if(t<1)reactionRaf=requestAnimationFrame(animate);
    };
    animate(began);
  }
  const territoryMarkers=Array.from({length:81},(_,p)=>{const m=mesh(new THREE.BoxGeometry(.012,.001,.012),stoneMaterials[0]);m.position.copy(pointPosition(p));m.position.y=.044;m.visible=false;return m;});
  const setHint=(label:string)=>{hint.textContent=label;if(state.textContent!==label)state.textContent=label;};
  const mark=(p:number)=>{lastMove.position.copy(pointPosition(p));lastMove.position.y=.060;lastMove.visible=true;};
  function seed() {
    clearReaction();
    board.fill(0);previous=undefined;queue=[];active=undefined;interactive=false;busy=false;demoMoves=0;
    demoColor=1;playerColor=1;replyPending=undefined;scored=false;scoreRequested=false;scorePanel.hidden=true;score.disabled=false;score.textContent='Score';territoryMarkers.forEach(m=>m.visible=false);
    stones.forEach(s=>s.visible=false);carried.visible=false;ghost.visible=false;lastMove.visible=false;
    capturedStones.forEach(s=>scene.remove(s));capturedStones.length=0;captureCounts.fill(0);
    [[2,2],[6,6],[2,6],[6,2],[4,4],[5,4]].forEach(([x,z],i)=>{const p=z*9+x;board[p]=i%2+1;stones[p].material=stoneMaterials[i%2];stones[p].visible=true;});
    setHint('Take over black');
  }
  function enqueue(point:number,color:Color,remove=false,arm:Color=color) {
    const motion:Motion={from:remove?pointPosition(point):(arm===1?blackPickup:pickup).clone(),to:remove?(arm===1?blackDiscard:discard).clone():pointPosition(point),point,color,arm,remove,time:0,duration:interactive?2.8:5,lifted:false,released:false};
    queue.push(motion);return motion;
  }
  function applyMove(point:number,color:Color) {
    const result=play(board,point,color,previous);if(!result)return false;
    const before={board:[...board],previous};previous=board.join('');board=result.board;
    enqueue(point,color).before=before;
    result.captured.forEach(p=>enqueue(p,color===1?2:1,true,color));
    return true;
  }
  function beginMotion() {
    if(active||!queue.length)return;
    active=queue.shift()!;active.approach=(active.arm===1?blackKinematics:kinematics).tipPosition();
    if(interactive&&!scoreRequested)setHint(active.arm===playerColor?'Placing your stone':'Robot’s turn');
  }
  function pose() {
    if(!active){carried.visible=false;return;}
    const motion=active,p=Math.min(1,motion.time/motion.duration);
    const solver=motion.arm===1?blackKinematics:kinematics,rest=motion.arm===1?blackHome:home;
    const start=motion.from,end=motion.to;
    const highStart=start.clone().add(new THREE.Vector3(0,.16,0));
    const highEnd=end.clone().add(new THREE.Vector3(0,.16,0));
    let target:InstanceType<typeof THREE.Vector3>;
    if(motion.redirect){
      const raised=motion.redirect.clone();raised.y=Math.max(raised.y,highEnd.y);
      if(p<.2)target=motion.redirect.clone().lerp(raised,smooth(p/.2));
      else if(p<.55)target=raised.clone().lerp(highEnd,smooth((p-.2)/.35));
      else if(p<.77)target=highEnd.clone().lerp(end,smooth((p-.55)/.22));
      else if(p<.87)target=end.clone().lerp(highEnd,smooth((p-.77)/.1));
      else target=highEnd.clone().lerp(rest,smooth((p-.87)/.13));
    }
    else if(p<.12)target=motion.approach!.clone().lerp(highStart,smooth(p/.12));
    else if(p<.25)target=highStart.clone().lerp(start,smooth((p-.12)/.13));
    else if(p<.4)target=start.clone().lerp(highStart,smooth((p-.25)/.15));
    else if(p<.62)target=highStart.clone().lerp(highEnd,smooth((p-.4)/.22));
    else if(p<.77)target=highEnd.clone().lerp(end,smooth((p-.62)/.15));
    else if(p<.87)target=end.clone().lerp(highEnd,smooth((p-.77)/.1));
    else target=highEnd.clone().lerp(rest,smooth((p-.87)/.13));
    solver.grip((!!motion.redirect||p>=.23)&&p<.77);
    const tip=solver.solve(target);
    if(p>=.25&&!motion.lifted){motion.lifted=true;if(motion.remove)stones[motion.point].visible=false;}
    if(p>=.77&&!motion.released){motion.released=true;if(!motion.remove){stones[motion.point].material=stoneMaterials[motion.color-1];stones[motion.point].visible=true;mark(motion.point);}else collectStone(motion.color,motion.arm);}
    carried.visible=(!!motion.redirect||p>=.25)&&p<.77;carried.material=stoneMaterials[motion.color-1];carried.position.copy(tip);
  }
  const draw=()=>{if(!destroyed){
    const color=takeoverColor();ghostMaterial.color.copy(stoneMaterials[color-1].color);
    if(hover>=0){const retarget=active&&!active.remove&&!active.released&&active.arm===color;const position=retarget&&active!.before?active!.before:{board,previous};ghost.visible=(!busy||!!retarget)&&!scored&&!scoreRequested&&!!play(position.board,hover,color,position.previous);}
    pose();faces.forEach((face,i)=>{if(face.visible){face.position.copy((i===0?blackKinematics:kinematics).tipPosition());face.position.y+=.09;face.position.add(camera.position.clone().sub(face.position).normalize().multiplyScalar(.045));}});renderer.render(scene,camera);
  }};
  function advance(dt:number) {
    if(!active&&!queue.length&&replyPending!==undefined){
      const opponent:Color=playerColor===1?2:1,reply=chooseMove(board,opponent,previous,replyPending);replyPending=undefined;
      if(reply>=0)applyMove(reply,opponent);
    }
    if(!active&&!queue.length&&scoreRequested){showScore();return;}
    if(!active&&!queue.length&&!interactive&&!scored){
      if(demoMoves>=24)seed();
      const move=chooseMove(board,demoColor,previous,40,false);if(move<0){seed();return;}
      applyMove(move,demoColor);demoColor=demoColor===1?2:1;demoMoves++;
    }
    beginMotion();
    if(active){active.time+=dt;pose();if(active.time>=active.duration){active=undefined;carried.visible=false;beginMotion();}}
    if(interactive&&!active&&!queue.length&&replyPending===undefined&&busy){busy=false;setHint(turnHint());}
    if(!interactive&&!scoreRequested&&!scored)setHint(turnHint());
  }
  const tick=(now:number)=>{
    raf=0;if(destroyed||paused||scored||!visible||document.hidden){last=0;return;}
    const dt=last?Math.min((now-last)/1000,.06):0;last=now;advance(dt);draw();
    if(!scored&&(active||queue.length||replyPending!==undefined||!interactive||scoreRequested))raf=requestAnimationFrame(tick);
  };
  const start=()=>{if(!raf&&!paused&&visible&&!document.hidden){last=0;raf=requestAnimationFrame(tick);}};
  const resume=()=>{draw();start();};
  function humanMove(point:number) {
    if(scored||scoreRequested)return;
    const color=takeoverColor();
    const moving=active&&!active.remove&&!active.released&&active.arm===color?active:undefined;
    if(interactive&&busy&&!moving)return;
    if(moving?.before){
      const result=play(moving.before.board,point,color,moving.before.previous);
      if(!result){setHint('Choose an empty point');return;}
      // Replace only the unplayed move. Never rewind visible stones, captures, joints or grip.
      previous=moving.before.board.join('');board=result.board;queue=[];
      moving.point=point;moving.to.copy(pointPosition(point));
      if(moving.lifted){moving.redirect=(color===1?blackKinematics:kinematics).tipPosition();moving.time=0;moving.duration=1.8;}
      else{const phase=moving.time/moving.duration;moving.duration=2.8;moving.time=phase*moving.duration;}
      result.captured.forEach(p=>enqueue(p,color===1?2:1,true,color));
    }else{
      if(stones[point]?.visible&&!board[point]){setHint('Let the robot lift that stone');return;}
      const wasInteractive=interactive;interactive=true;
      if(!applyMove(point,color)){interactive=wasInteractive;setHint(board[point]?'Choose an empty point':'Try another point');return;}
    }
    playerColor=color;interactive=true;busy=true;ghost.visible=false;
    replyPending=point;
    setHint('Placing your stone');
    if(media.matches){
      while(active||queue.length||replyPending!==undefined){advance(10);}
      carried.visible=false;kinematics.grip(false);kinematics.solve(home,100);blackKinematics.grip(false);blackKinematics.solve(blackHome,100);busy=false;setHint(turnHint());draw();
    }else{paused=false;resume();}
  }
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
  function hit(event:PointerEvent) {
    const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    camera.updateMatrixWorld();scene.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObject(top)[0];if(!hit)return -1;
    const x=Math.round((hit.point.x-originX)/spacing),z=Math.round((hit.point.z-originZ)/spacing);
    return x>=0&&x<9&&z>=0&&z<9?z*9+x:-1;
  }
  function preview(point:number) {
    hover=point;ghost.visible=false;
    if(point>=0)ghost.position.copy(pointPosition(point));draw();canvas.style.cursor=ghost.visible?'pointer':'grab';
  }
  let pressed:{x:number;y:number}|undefined,dragged=false;
  canvas.addEventListener('pointerdown',event=>{pressed={x:event.clientX,y:event.clientY};dragged=false;},{signal:abort.signal});
  canvas.addEventListener('pointermove',event=>{if(pressed&&Math.hypot(event.clientX-pressed.x,event.clientY-pressed.y)>6)dragged=true;preview(dragged?-1:hit(event));},{signal:abort.signal});
  canvas.addEventListener('pointerup',event=>{if(pressed&&!dragged){const point=hit(event);if(point>=0)humanMove(point);}pressed=undefined;dragged=false;},{signal:abort.signal});
  canvas.addEventListener('pointercancel',()=>{pressed=undefined;dragged=false;preview(-1);},{signal:abort.signal});
  canvas.addEventListener('pointerleave',()=>{preview(-1);},{signal:abort.signal});
  canvas.addEventListener('blur',()=>preview(-1),{signal:abort.signal});
  function showScore(){
    scoreRequested=false;scored=true;ghost.visible=false;lastMove.visible=false;
    const result=scoreBoard(board),margin=Math.abs(result.black-result.white);
    const title=result.winner===0?'Evenly matched':interactive?(result.winner===playerColor?'You lead':'Robot leads'):result.winner===1?'Black leads':'White leads';
    scorePanel.querySelector('.score-result')!.textContent=title;
    scorePanel.querySelector('.score-margin')!.textContent=margin?`≈ +${margin} ${margin===1?'point':'points'}`:'Level';
    for(const color of [1,2] as const){
      const side=scorePanel.querySelector<HTMLElement>(`[data-side="${color}"]`)!;
      side.dataset.leading=String(result.winner===color);
      side.querySelector('.score-owner')!.textContent=interactive?(color===playerColor?'You':'Robot'):color===1?'Black':'White';
      side.querySelector('.score-total')!.textContent=String(color===1?result.black:result.white);
      side.querySelector('.score-detail')!.textContent=`${result.stones[color-1]} stones / ~${result.territory[color-1]} territory`;
    }
    scorePanel.dataset.winner=String(result.winner);scorePanel.hidden=false;score.disabled=true;score.textContent='Score';
    territoryMarkers.forEach((m,p)=>{m.visible=!board[p]&&!!result.ownership[p];if(m.visible){m.material=stoneMaterials[result.ownership[p]-1];m.scale.setScalar(.65+.35*result.confidence[p]);}});
    setHint(title);reactToScore(result.winner);draw();scorePanel.scrollIntoView({block:'nearest',behavior:'instant'});root.querySelector<HTMLButtonElement>('.robot-continue')!.focus({preventScroll:true});
  }
  score.addEventListener('click',()=>{
    ghost.visible=false;
    if(active||queue.length||replyPending!==undefined){scoreRequested=true;score.disabled=true;score.textContent='Counting…';setHint('Finishing this move');if(paused){while(active||queue.length||replyPending!==undefined){advance(10);}showScore();}else start();}
    else showScore();
  },{signal:abort.signal});
  root.querySelector('.robot-continue')!.addEventListener('click',()=>{clearReaction();scored=false;scorePanel.hidden=true;score.disabled=false;territoryMarkers.forEach(m=>m.visible=false);setHint(turnHint());canvas.focus({preventScroll:true});resume();},{signal:abort.signal});
  reset.addEventListener('click',()=>{seed();controls.reset();controls.target.copy(cameraTarget);controls.update();kinematics.solve(home,100);blackKinematics.solve(blackHome,100);paused=media.matches;resume();},{signal:abort.signal});
  media.addEventListener('change',()=>{paused=media.matches;resume();},{signal:abort.signal});
  document.addEventListener('visibilitychange',start,{signal:abort.signal});
  canvas.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();humanMove(hover>=0?hover:selected);return;}
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();
    const x=THREE.MathUtils.clamp(selected%9+(event.key==='ArrowLeft'?-1:event.key==='ArrowRight'?1:0),0,8);
    const z=THREE.MathUtils.clamp(Math.floor(selected/9)+(event.key==='ArrowUp'?-1:event.key==='ArrowDown'?1:0),0,8);
    selected=z*9+x;preview(selected);state.textContent=`Column ${x+1}, row ${z+1}${board[selected]?', occupied':''}`;
  },{signal:abort.signal});
  const resize=new ResizeObserver(()=>{const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();});resize.observe(stage);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;start();},{threshold:.05});observer.observe(root);
  controls.addEventListener('change',draw);controls.saveState();
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();paused=true;root.classList.remove('ready');reset.disabled=true;state.textContent='Static preview';},{signal:abort.signal});
  seed();root.classList.add('ready');reset.disabled=false;resume();
  return ()=>{
    destroyed=true;clearReaction();cancelAnimationFrame(raf);abort.abort();resize.disconnect();observer.disconnect();controls.dispose();
    const geometries=new Set<InstanceType<typeof THREE.BufferGeometry>>(),materials=new Set<InstanceType<typeof THREE.Material>>();
    scene.traverse(object=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());faces.forEach(f=>f.material.dispose());faceTextures.forEach(t=>t.dispose());woodTexture.dispose();renderer.dispose();renderer.forceContextLoss();
  };
}
