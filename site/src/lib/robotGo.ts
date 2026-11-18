/** Small local Go opponent for the portfolio toy; no research policy or network calls. */
export type Color = 1 | 2;
export const SIZE = 9;
/** Casual area score: stones plus exclusively surrounded empty points; zero komi.
 * Stones still on the board are treated as alive. Shared empty regions are neutral. */
export function scoreBoard(board:number[]) {
  const ownership=Array<number>(81).fill(0),seen=new Set<number>();
  const stones=[0,0],territory=[0,0];
  board.forEach((color,p)=>{if(color){stones[color-1]++;ownership[p]=color;}});
  for(let p=0;p<81;p++){
    if(board[p]||seen.has(p))continue;
    const region:number[]=[],border=new Set<number>(),pending=[p];seen.add(p);
    while(pending.length){const point=pending.pop()!;region.push(point);for(const n of neighbors(point)){
      if(board[n])border.add(board[n]);else if(!seen.has(n)){seen.add(n);pending.push(n);}
    }}
    if(border.size===1){const color=[...border][0];territory[color-1]+=region.length;region.forEach(q=>ownership[q]=color);}
  }
  const black=stones[0]+territory[0],white=stones[1]+territory[1];
  return {black,white,stones,territory,ownership,winner:black===white?0:black>white?1:2};
}
export const neighbors = (point: number) => [point % SIZE > 0 ? point - 1 : -1, point % SIZE < SIZE - 1 ? point + 1 : -1, point >= SIZE ? point - SIZE : -1, point < SIZE * (SIZE - 1) ? point + SIZE : -1].filter(p => p >= 0);
export function group(board: number[], point: number) {
  const stones = new Set<number>(), liberties = new Set<number>(), pending = [point];
  while (pending.length) {
    const p = pending.pop()!;
    if (stones.has(p)) continue;
    stones.add(p);
    for (const n of neighbors(p)) {
      if (!board[n]) liberties.add(n);
      else if (board[n] === board[point] && !stones.has(n)) pending.push(n);
    }
  }
  return { stones, liberties };
}
export function play(board: number[], point: number, color: Color, previous?: string) {
  if (point < 0 || point >= SIZE * SIZE || board[point]) return null;
  const next = [...board], captured: number[] = [];
  next[point] = color;
  for (const n of neighbors(point)) {
    if (next[n] && next[n] !== color) {
      const enemy = group(next, n);
      if (!enemy.liberties.size) for (const p of enemy.stones) { next[p] = 0; captured.push(p); }
    }
  }
  if (!group(next, point).liberties.size || next.join('') === previous) return null;
  return { board: next, captured };
}
function evaluate(board:number[], color:Color) {
  const seen=new Set<number>();let score=0;
  for(let p=0;p<81;p++){
    if(!board[p]||seen.has(p))continue;
    const g=group(board,p),sign=board[p]===color?1:-1;
    g.stones.forEach(s=>seen.add(s));
    const size=g.stones.size,liberties=g.liberties.size;
    score+=sign*(size*14+Math.min(liberties,8)*2.5-(liberties===1?size*13+18:liberties===2?size*3+5:0));
  }
  // Local influence rewards surrounding territory and spreading out, without treating
  // the entire open board as territory during the opening.
  for(let p=0;p<81;p++){
    if(board[p])continue;
    let black=0,white=0;
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){
      const x=p%9+dx,z=Math.floor(p/9)+dz,d=Math.abs(dx)+Math.abs(dz);
      if(x<0||x>8||z<0||z>8||d===0||d>2)continue;
      const c=board[z*9+x];if(c===1)black+=1/d;else if(c===2)white+=1/d;
    }
    score+=(color===1?1:-1)*Math.tanh((black-white)*.7)*2;
  }
  return score;
}
function candidates(board:number[],color:Color,previous:string|undefined,near:number) {
  const options:{point:number;board:number[];score:number}[]=[];
  for (let p = 0; p < SIZE * SIZE; p++) {
    const move = play(board, p, color, previous);
    if (!move) continue;
    const own = group(move.board, p), adjacent = neighbors(p);
    const distance = Math.abs(p % SIZE - near % SIZE) + Math.abs(Math.floor(p / SIZE) - Math.floor(near / SIZE));
    let score=evaluate(move.board,color)+move.captured.length*6-distance*.08;
    if(own.liberties.size===1&&!move.captured.length)score-=40;
    // Preserve eyes: orthogonal neighbors alone are insufficient on the edge.
    const diagonal=[[-1,-1],[-1,1],[1,-1],[1,1]].map(([dx,dz])=>[p%9+dx,Math.floor(p/9)+dz]).filter(([x,z])=>x>=0&&x<9&&z>=0&&z<9);
    const hostile=diagonal.filter(([x,z])=>board[z*9+x]!==color).length;
    if(adjacent.every(n=>board[n]===color)&&hostile<=(diagonal.length===4?1:0)&&!move.captured.length)score-=90;
    const edge=Math.min(p%9,8-p%9,Math.floor(p/9),8-Math.floor(p/9));
    if(edge===0)score-=5;else if(edge===1)score-=1.5;else if(edge===2)score+=1;
    options.push({point:p,board:move.board,score});
  }
  return options.sort((a,b)=>b.score-a.score);
}
export function chooseMove(board: number[], color: Color, previous?: string, near = 40, search = true) {
  const moves=candidates(board,color,previous,near);
  if(!moves.length)return -1;if(!search)return moves[0].point;
  const enemy:Color=color===1?2:1,old=board.join('');let best=moves[0].point,bestScore=-Infinity;
  // Three-ply beam search: our move, their strongest replies, then our continuation.
  // Tactical captures and saving groups compete with territory instead of blindly
  // chasing the most recently played stone.
  for(const move of moves.slice(0,8)){
    const replies=candidates(move.board,enemy,old,move.point).slice(0,4);
    let worst=Infinity;
    for(const reply of replies){
      const continuation=candidates(reply.board,color,move.board.join(''),reply.point)[0];
      const value=continuation?continuation.score:evaluate(reply.board,color);
      worst=Math.min(worst,value);
      if(worst+move.score*.12<bestScore)break;
    }
    const score=(replies.length?worst:evaluate(move.board,color))+move.score*.12;
    if(score>bestScore){bestScore=score;best=move.point;}
  }
  return best;
}
