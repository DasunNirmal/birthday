// Birthday page logic. Data (frames, photo, colours) lives in data.js.
const M='ui-monospace,Menlo,Consolas,monospace',D=Math.min(devicePixelRatio||1,2);
const $=s=>document.querySelector(s),cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),sm=x=>{x=cl(x);return x*x*(3-2*x)};
function size(c){const r=c.getBoundingClientRect();c.width=r.width*D;c.height=r.height*D;c.w=r.width;c.h=r.height;const x=c.getContext('2d');x.setTransform(D,0,0,D,0,0);return x}
const vis=e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight},prog=e=>{const r=e.getBoundingClientRect();return cl(-r.top/(r.height-innerHeight))};
async function dec(s){const b=Uint8Array.from(atob(s),c=>c.charCodeAt(0));return new Uint8Array(await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer())}
// ---- the ASCII player (same method as JIN2's: letters, tinted by colour and brightness, fading trail, soft glow)
function mkP(cv,gl,m,d,c0=0,c1=m.cols,step=1){const x=size(cv),N=m.cols*m.rows,drawCols=Math.ceil((c1-c0)/step),drawRows=Math.ceil(m.rows/step),cw=cv.w/drawCols,ch=cv.h/drawRows;gl.width=Math.ceil(cv.w/3);gl.height=Math.ceil(cv.h/3);const g=gl.getContext('2d'),CT=m.colors.map(c=>Array.from({length:m.lv+1},(_,l)=>'rgb('+c.map(v=>v*l/m.lv|0)+')'));x.fillStyle='#000';x.fillRect(0,0,cv.w,cv.h);
return{last:-1,draw(i,rs){if(rs&&i<this.last){x.globalCompositeOperation='source-over';x.fillStyle='#000';x.fillRect(0,0,cv.w,cv.h)}this.last=i;x.globalCompositeOperation='source-over';x.fillStyle='rgba(0,0,0,.6)';x.fillRect(0,0,cv.w,cv.h);x.globalCompositeOperation='lighten';x.font=Math.min(cw/.6,ch*1.09)+'px '+M;x.textAlign='center';x.textBaseline='middle';const o=i*N;
for(let rr=0;rr<drawRows;rr++)for(let qq=0;qq<drawCols;qq++){const r=rr*step,q=c0+qq*step,k=o+r*m.cols+q,l=d.lm[k];if(!l)continue;const s=m.chars[d.ch[k]];if(s==' ')continue;x.fillStyle=CT[d.tg[k]][l];x.fillText(s,(qq+.5)*cw,(rr+.5)*ch)}x.globalCompositeOperation='source-over';g.drawImage(cv,0,0,gl.width,gl.height)}}}
const pl=(u,m)=>{const N=m.n*m.cols*m.rows;return{ch:u.subarray(0,N),tg:u.subarray(N,2*N),lm:u.subarray(2*N,3*N)}};
let KD,HD,CD,PD,KP,HP,CP,ps={};
function build(){const c0=innerWidth<800?30:0,c1=154-c0,ra=(c1-c0)*.6/(87*1.2),kw=$('#kw');kw.style.aspectRatio=ra;
// Fit the complete knight inside Section 03's viewport so it never creates a tall scroll scene.
const knightH=Math.min(innerHeight*.65,innerWidth*.92/ra);kw.style.height=knightH+'px';kw.style.width=(knightH*ra)+'px';
if(KD)KP=mkP($('#kn'),$('#kw .gl'),KM,KD,c0,c1,2);if(HD)HP=mkP($('#hi'),$('#hw .gl'),HM,HD);if(CD)CP=mkP($('#bd'),$('#bg2'),CKM,CD);const p=$('#pc');p.style.aspectRatio=PM.cols*.6/(PM.rows*1.2);px=size(p);pq=-1}
let px,pq=-1;
function drawPh(pr){const c=$('#pc'),x=px,cw=c.w/PM.cols,ch=c.h/PM.rows,N=PM.cols*PM.rows,a=sm(pr*1.3);x.fillStyle='#000';x.fillRect(0,0,c.w,c.h);x.font=Math.min(cw/.6,ch*1.05)+'px '+M;x.textAlign='center';x.textBaseline='middle';
for(let r=0;r<PM.rows;r++)for(let q=0;q<PM.cols;q++){if(((r*7919+q*104729)%9973)/9973>a)continue;const k=r*PM.cols+q,s=PM.chars[PD[k]];if(s==' ')continue;x.fillStyle='rgb('+PD[N+k]+','+PD[2*N+k]+','+PD[3*N+k]+')';x.fillText(s,(q+.5)*cw,(r+.5)*ch)}}
// ---- ASCII butterflies
const fc=$('#fx');let fx=size(fc),P={x:innerWidth/2,y:innerHeight/2,t:-9e9};
const mv=e=>{const p=e.touches?e.touches[0]:e;P.x=p.clientX;P.y=p.clientY;P.t=performance.now()};
addEventListener('pointermove',mv,{passive:true});addEventListener('touchmove',mv,{passive:true});addEventListener('touchstart',mv,{passive:true});
const WL={o:[" ,-. ","(@@@@","(@@@@"," '-@@"," (@@@","  '-."],m:["  ,. ","  (@@","  (@@","   '@","  (@@","   '."],c:["     ","     ","    (","    (","     ","     "]},MR={'(':')',')':'(','/':'\\','\\':'/',',':',',"'":"'"},mir=s=>[...s].reverse().map(c=>MR[c]||c).join(''),BODY=['Y','|','#','|','|','v'];
const SPR={};for(const k in WL)SPR[k]=WL[k].map((l,i)=>l+BODY[i]+mir(l));
const B=[330,45,280,190,20,300,160].map((h,i)=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:0,vy:0,h,s:13+Math.random()*7,ph:Math.random()*6,o:i}));
const SP=[];
function star(x,y,r,a,h){fx.globalAlpha=a;fx.fillStyle='hsl('+h+',100%,80%)';fx.beginPath();fx.moveTo(x,y-r);fx.quadraticCurveTo(x,y,x+r,y);fx.quadraticCurveTo(x,y,x,y+r);fx.quadraticCurveTo(x,y,x-r,y);fx.quadraticCurveTo(x,y,x,y-r);fx.fill()}
// ASCII cat that chases the butterflies, then waves
let C={x:-160,y:innerHeight,a:0};
function catLines(rest,f,hop){const e=rest?'^':'o';const r=[ '  /\\_/\\  ',' ( '+e+'.'+e+' ) ','  > ^ <  ',hop?'  /| |\\  ':'  /|_|\\  ',hop?' (_| |_) ':'  (_) (_)  '.slice(1,10)];if(rest){r[0]='  /\\_/\\ '+(f?'/':'\\');r[1]=' ( ^.^ )'+(f?' ':'/')}return r}
function drawCat(cur,t){const w=innerWidth,h=innerHeight;let tx=-160,ty=h,k=.04,rest=false;if(cur==2){tx=B[0].x-34;ty=B[0].y-30;k=.05}else if(cur>=3){tx=w-120;ty=h-130;k=.06;rest=true}
C.x+=(tx-C.x)*k;C.y+=(ty-C.y)*k;C.a+=((cur>=2?1:0)-C.a)*.08;if(C.a<.02)return;const near=rest&&Math.hypot(tx-C.x,ty-C.y)<30,hop=cur==2&&Math.sin(t*14)>0,L=catLines(near,(t*4|0)%2,hop),fs=17,pw=fs*.6;
fx.save();fx.globalAlpha=C.a;fx.font='700 '+fs+'px '+M;fx.textBaseline='top';fx.shadowColor='#b794ff';fx.shadowBlur=10;const yy=C.y+(hop?-6:0);
L.forEach((l,j)=>{for(let i=0;i<l.length;i++){const c=l[i];if(c==' ')continue;const eye=(j==1&&(c=='o'||c=='^')&&i>2&&i<7)||(near&&j==1&&c=='^');fx.fillStyle=eye?'#ffd54a':'#d9c9ff';fx.fillText(c,C.x+i*pw,yy+j*fs*.95)}});fx.restore()}
function drawFx(t,s1,cur){const w=fc.w,h=fc.h;fx.clearRect(0,0,w,h);fx.globalCompositeOperation='lighter';
if(Math.random()<.25+s1*1.6)SP.push({x:Math.random()*w,y:Math.random()*h,l:1,r:2+Math.random()*(5+s1*6),h:35+Math.random()*30});
const hot=performance.now()-P.t<2500;if(hot&&Math.random()<.5)SP.push({x:P.x+(Math.random()-.5)*30,y:P.y+(Math.random()-.5)*30,l:1,r:2+Math.random()*4,h:300+Math.random()*60});
for(let i=SP.length-1;i>=0;i--){const s=SP[i];s.l-=.016;if(s.l<=0){SP.splice(i,1);continue}star(s.x,s.y,s.r*Math.sin(s.l*3.14),s.l,s.h)}
fx.globalCompositeOperation='source-over';fx.globalAlpha=1;
B.forEach((b,i)=>{let tx,ty;if(hot){tx=P.x+Math.cos(i*1.3+t*.8)*(40+i*16);ty=P.y+Math.sin(i*1.9+t*.9)*(30+i*11)}else{tx=w/2+Math.sin(t*.3+i*2)*w*.38;ty=h/2+Math.cos(t*.37+i*1.5)*h*.34}
b.vx=(b.vx+(tx-b.x)*.0035+Math.sin(t*3+i)*.07)*.94;b.vy=(b.vy+(ty-b.y)*.0035+Math.cos(t*2.6+i)*.07)*.94;b.x+=b.vx;b.y+=b.vy;b.ph+=.28+Math.hypot(b.vx,b.vy)*.02;
const fl=Math.abs(Math.sin(b.ph)),sp=SPR[fl>.66?'o':fl>.33?'m':'c'],pt=b.s*.62;fx.save();fx.translate(b.x,b.y);fx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);fx.font='700 '+pt/.75+'px '+M;fx.textBaseline='middle';fx.textAlign='center';fx.shadowColor='hsl('+b.h+',100%,60%)';fx.shadowBlur=10;
sp.forEach((l,j)=>{for(let q=0;q<11;q++){const c=l[q];if(c==' ')continue;const wing=c=='@';fx.fillStyle=wing?'hsl('+b.h+',90%,62%)':'Y|#v'.includes(c)&&q==5?'#fff':'hsl('+(b.h+25)+',100%,80%)';fx.fillText(wing?((q+j)%2?'o':'*'):c,(q-5)*pt,(j-2.5)*pt*1.5)}});fx.restore()});
drawCat(cur,t)}
// ---- main loop
const SB=$('#sb'),SK=$('#s3'),S1=$('#s1');let t0=null,ks=null,cs=null,knightLoading=false,knightLoaded=false;
async function loadKnight(){if(knightLoading||knightLoaded)return;knightLoading=true;try{const raw=await dec(KB);KD=pl(raw,KM);build();knightLoaded=true;ks=null}catch(err){console.error('Cat Knight animation failed to load:',err)}finally{knightLoading=false}}
function frame(ms){const t=ms/1e3,vh=innerHeight;if(t0===null)t0=ms;let cur=0;[['#s1',1],['#s2',2],['#s3',3],['#s3b',3],['#sb',4]].forEach(([q,n])=>{if($(q).getBoundingClientRect().top<vh*.55)cur=n});
const r1=S1.getBoundingClientRect(),s1=cl(1-Math.abs(r1.top+r1.height/2-vh/2)/(vh*.9));drawFx(t,s1,cur);
if(HP&&vis($('#s0'))){let u=(ms-t0)/1e3;if(u>3)u=1+((u-1)%2.0937);const i=Math.min(HM.n-1,Math.floor(u*HM.fps));if(i!=HP.last)HP.draw(i,false)}
const ph=$('#photo'),pr=cl((vh-ph.getBoundingClientRect().top)/(vh*.7));ph.style.opacity=Math.min(1,pr*3);ph.style.transform='translateX('+(1-pr)*70+'px) rotate('+(1-pr)*-6+'deg)';
if(PD&&px&&vis(ph)){const q=Math.round(pr*40);if(q!=pq){pq=q;drawPh(pr)}}
// Decode only when Section 03 is approaching; render at half resolution and 15 FPS.
const knightTop=SK.getBoundingClientRect().top;if(!knightLoaded&&!knightLoading&&knightTop<vh*1.35)loadKnight();
if(KP&&vis(SK)){if(ks===null)ks=ms;const renderFPS=KM.fps/2,u=((ms-ks)/1e3)%(KM.n/KM.fps),i=Math.min(KM.n-1,Math.floor(u*renderFPS)*2);if(i!==KP.last)KP.draw(i,true)}else if(!vis(SK))ks=null;
if(CP&&vis(SB)){if(cs===null){if(SB.getBoundingClientRect().top<=vh*.15)cs=ms}if(cs!==null){let u=(ms-cs)/1e3;if(u>18)u=10+((u-10)%8);const i=Math.min(CKM.n-1,Math.floor(u*CKM.fps));if(i!=CP.last)CP.draw(i,false);$('#nm').classList.toggle('on',u>10)}}
requestAnimationFrame(frame)}
function init(){fx=size(fc);build()}
addEventListener('resize',init);
document.querySelectorAll('.rv').forEach(e=>new IntersectionObserver((es,o)=>es.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),o.disconnect())),{threshold:.2}).observe(e));
init();requestAnimationFrame(frame);
// Load the page's existing animations first. Cat Knight is decoded separately on approach to Section 03.
(async()=>{try{const [hero,photo,cake]=await Promise.all([dec(HB),dec(PB),dec(CB)]);HD=pl(hero,HM);PD=photo;CD=pl(cake,CKM);build()}catch(err){console.error('Birthday animation data failed to load:',err)}})();
