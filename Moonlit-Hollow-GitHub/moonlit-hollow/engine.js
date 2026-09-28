(function(root){
'use strict';
const W=10800, SPEED=240, GRAVITY=1500, JUMP=600;
const ground=[ [0,860,450],[980,670,450],[1770,650,425],[2540,760,450],[3420,600,430],[4140,760,455],[5020,680,430],[5820,680,450],[6620,620,425],[7360,750,450],[8230,660,430],[9010,710,450],[9840,960,450] ];
const ledges=[[360,150,358],[650,120,285],[1200,140,355],[1510,120,325],[1930,140,335],[2240,120,280],[2770,140,355],[3070,130,290],[3600,140,335],[3890,110,270],[4370,145,350],[4680,110,285],[5230,130,340],[5520,140,275],[6030,135,350],[6360,115,285],[6800,135,330],[7080,115,265],[7550,145,350],[7880,115,275],[8400,140,335],[8700,120,270],[9190,150,350],[9520,110,285],[10000,140,355]];
const platforms=ground.map(([x,w,y])=>({x,w,y,h:220,ground:true})).concat(ledges.map(([x,w,y])=>({x,w,y,h:27,ground:false})));
function fresh(){
 const coins=[];ground.forEach(([x,w,y],i)=>{for(let j=0;j<3;j++)coins.push({x:x+Math.min(w-65,220+j*100),y:y-45,kind:'coin',got:false});});
 ledges.forEach(([x,w,y],i)=>coins.push({x:x+w/2,y:y-35,kind:i%4===1?'gem':'coin',got:false}));
 coins.push({x:4740,y:245,kind:'heart',got:false});
 return {player:{x:90,y:360,w:25,h:48,vx:0,vy:0,face:1,onGround:false,coyote:0,buffer:0,hp:3,inv:0},coins,enemies:[{x:1340,lo:1260,hi:1540,y:418},{x:2930,lo:2790,hi:3180,y:418},{x:3700,lo:3520,hi:3910,y:398},{x:5360,lo:5180,hi:5580,y:398},{x:6980,lo:6750,hi:7170,y:393},{x:7750,lo:7520,hi:7980,y:418},{x:9400,lo:9200,hi:9600,y:418},{x:10350,lo:10200,hi:10600,y:418}].map(e=>({...e,dir:1,alive:true,w:37,h:32})),score:0,gems:0,checkpoint:0,elapsed:0,won:false,dead:false,events:[],total:coins.filter(c=>c.kind!=='heart').length};
}
function overlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
function damage(s,fall=false){const p=s.player;if(p.inv>0&&!fall)return;p.hp--;s.events.push('hurt');if(p.hp<=0){s.dead=true;return;}p.inv=1.6;if(fall){p.x=s.checkpoint?4220:90;p.y=350;p.vx=p.vy=0;p.onGround=false;p.coyote=0;}else{p.vy=-240;p.x=Math.max(0,p.x-p.face*22);}}
function step(s,input,dt){if(s.won||s.dead)return;dt=Math.min(dt,1/30);s.elapsed+=dt;const p=s.player;s.events=[];p.inv=Math.max(0,p.inv-dt);p.buffer=Math.max(0,p.buffer-dt);p.coyote=p.onGround?.11:Math.max(0,p.coyote-dt);if(input.jump)p.buffer=.13;
 const direction=(input.right?1:0)-(input.left?1:0);p.vx=direction*SPEED;if(direction)p.face=direction;
 if(p.buffer>0&&p.coyote>0){p.vy=-JUMP;p.onGround=false;p.buffer=0;p.coyote=0;s.events.push('jump');}
 if(input.release&&p.vy<-240)p.vy=-240;
 const oldY=p.y;p.vy+=GRAVITY*dt;p.x=Math.max(0,Math.min(W-p.w,p.x+p.vx*dt));p.y+=p.vy*dt;p.onGround=false;
 for(const q of platforms){if(p.x+p.w>q.x&&p.x<q.x+q.w&&p.vy>=0&&oldY+p.h<=q.y+1&&p.y+p.h>=q.y){p.y=q.y-p.h;p.vy=0;p.onGround=true;}}
 if(p.onGround&&p.buffer>0){p.vy=-JUMP;p.onGround=false;p.buffer=0;p.coyote=0;s.events.push('jump');}
 if(p.y>700)damage(s,true);
 for(const c of s.coins){if(c.got)continue;if(Math.abs(p.x+p.w/2-c.x)<29&&Math.abs(p.y+p.h/2-c.y)<39){if(c.kind==='heart'){if(p.hp===3)continue;p.hp=Math.min(3,p.hp+1);s.events.push('heart');}else{s.score++;if(c.kind==='gem')s.gems++;s.events.push(c.kind);}c.got=true;}}
 for(const e of s.enemies){if(!e.alive)continue;e.x+=e.dir*52*dt;if(e.x<e.lo){e.x=e.lo;e.dir=1;}if(e.x>e.hi){e.x=e.hi;e.dir=-1;}if(overlap(p,e)){if(p.vy>0&&oldY+p.h<e.y+13){e.alive=false;p.vy=-390;s.events.push('stomp');}else damage(s);}}
 if(!s.checkpoint&&p.x>4200){s.checkpoint=1;p.hp=3;s.events.push('checkpoint');}
 if(p.x>10540){s.won=true;s.events.push('win');}
}
const api={fresh,step,damage,platforms,ground,ledges,W,SPEED,GRAVITY,JUMP};if(typeof module!=='undefined')module.exports=api;else root.ForestEngine=api;
})(typeof window!=='undefined'?window:globalThis);
