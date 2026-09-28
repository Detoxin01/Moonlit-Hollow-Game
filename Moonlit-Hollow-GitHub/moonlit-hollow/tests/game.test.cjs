const assert=require('node:assert/strict');
const E=require('../engine.js');
const dt=1/120,none={};
const step=(s,n,input=none)=>{for(let i=0;i<n;i++)E.step(s,input,dt);};
let s=E.fresh();step(s,120);assert.equal(s.player.y,402);assert.equal(s.player.onGround,true);console.log('PASS: stable ground collision');
E.step(s,{jump:true},dt);step(s,40);assert.ok(s.player.y<330);console.log('PASS: jump reaches elevated routes');
s=E.fresh();Object.assign(s.player,{x:859,y:402,onGround:true});step(s,3,{right:true});assert.equal(s.player.onGround,false);E.step(s,{right:true,jump:true},dt);assert.ok(s.player.vy<0);console.log('PASS: coyote-time jump after leaving an edge');
s=E.fresh();Object.assign(s.player,{x:100,y:390,vy:150});E.step(s,{jump:true},dt);step(s,9);assert.ok(s.player.vy<0);console.log('PASS: jump pressed before landing is buffered');
s=E.fresh();Object.assign(s.player,{x:4715,y:224,hp:2});E.step(s,none,dt);assert.equal(s.player.hp,3);assert.ok(s.coins.find(c=>c.kind==='heart').got);console.log('PASS: optional heart heals, maximum health remains three');
s=E.fresh();Object.assign(s.player,{x:4715,y:224,hp:3});E.step(s,none,dt);assert.equal(s.player.hp,3);assert.equal(s.coins.find(c=>c.kind==='heart').got,false);
s=E.fresh();s.player.x=4230;E.step(s,none,dt);assert.equal(s.checkpoint,1);E.damage(s,true);assert.equal(s.player.x,4220);assert.equal(s.player.hp,2);console.log('PASS: checkpoint activation and fall recovery');
s=E.fresh();const e=s.enemies[0];Object.assign(s.player,{x:e.x,y:e.y-55,vy:300});step(s,5);assert.equal(e.alive,false);assert.ok(s.player.vy<0);console.log('PASS: stomping defeats an enemy and bounces the player');
s=E.fresh();Object.assign(s.player,{x:e.x,y:e.y-5});E.step(s,none,dt);assert.equal(s.player.hp,2);E.step(s,none,dt);assert.equal(s.player.hp,2);console.log('PASS: enemy contact and invulnerability window');
for(let i=0;i<E.ground.length-1;i++){
 const [x,w,y]=E.ground[i], [nx,nw,ny]=E.ground[i+1];s=E.fresh();s.enemies=[];s.coins=[];Object.assign(s.player,{x:x+w-27,y:y-48,onGround:true});E.step(s,{right:true,jump:true},dt);let landed=false;for(let t=0;t<130;t++){E.step(s,{right:true},dt);if(s.player.onGround&&s.player.x>=nx-24&&s.player.y===ny-48){landed=true;break;}}assert.ok(landed,'Gap '+i+' must be reachable');
}console.log('PASS: every required gap is reachable with standard jump physics');
s=E.fresh();let deaths=0,jumps=0;for(let i=0;i<20000&&!s.won;i++){
 const p=s.player,q=E.ground.find(q=>p.x+24>q[0]&&p.x<q[0]+q[1]);const hazard=s.enemies.find(e=>e.alive&&e.x>p.x&&e.x-p.x<95);const shouldJump=p.onGround&&((q&&q[0]+q[1]-p.x<38)||!!hazard);if(shouldJump)jumps++;
 E.step(s,{right:true,jump:shouldJump},dt);if(s.dead){deaths++;break;}
}assert.equal(s.won,true,'Full route must be completable');assert.equal(deaths,0);console.log(`PASS: complete traversal, ${s.elapsed.toFixed(1)} seconds moving, ${jumps} jumps, ${s.player.hp} hearts left`);
console.log('All gameplay checks passed.');
