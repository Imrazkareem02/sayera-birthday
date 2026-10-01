const pages=[...document.querySelectorAll('.page')];
const total=pages.length;
const pageNo=document.getElementById('pageNo');
const pageTotal=document.getElementById('pageTotal');
const music=document.getElementById('bgMusic');
const musicToggle=document.getElementById('musicToggle');
const audioHint=document.getElementById('audioHint');
const confetti=document.getElementById('confetti');
let current=0, musicPlaying=false, finaleStarted=false;
pageTotal.textContent=String(total).padStart(2,'0');

function makeDust(){const box=document.getElementById('filmDust');for(let i=0;i<45;i++){const d=document.createElement('span');d.className='dust';d.style.left=Math.random()*100+'%';d.style.animationDelay=Math.random()*6+'s';d.style.animationDuration=(4+Math.random()*6)+'s';box.appendChild(d)}}
makeDust();
async function startMusic(){try{await music.play();musicPlaying=true;musicToggle.classList.add('on');musicToggle.textContent='♫';if(audioHint)audioHint.textContent='Soundtrack unlocked.'}catch(e){if(audioHint)audioHint.textContent='Add music/maiyya-mainu.mp3 to enable the soundtrack.'}}
musicToggle.addEventListener('click',()=>{if(musicPlaying){music.pause();musicPlaying=false;musicToggle.textContent='◼'}else startMusic()});

function updateNav(){pages.forEach((p,i)=>{const prev=p.querySelector('.nav-btn.prev'),next=p.querySelector('.nav-btn.next');if(prev)prev.disabled=i===0;if(next)next.disabled=i===pages.length-1})}
function showPage(index){if(index<0||index>=pages.length||index===current)return;const oldPage=pages[current],newPage=pages[index];oldPage.classList.remove('active');oldPage.classList.add('exit');newPage.classList.add('active');setTimeout(()=>oldPage.classList.remove('exit'),500);current=index;pageNo.textContent=String(current+1).padStart(2,'0');if(current===pages.length-1&&!finaleStarted){finaleStarted=true;runFinale()}}

document.querySelectorAll('.page-nav').forEach(nav=>{const prev=nav.querySelector('.prev'),next=nav.querySelector('.next');prev?.addEventListener('click',()=>showPage(current-1));next?.addEventListener('click',()=>{if(next.dataset.action==='start')startMusic();showPage(current+1)})});
updateNav();

function runFinale(){const countdown=document.getElementById('countdown'),countText=document.getElementById('countText'),finalMessage=document.getElementById('finalMessage');let n=3;countdown.textContent=n;const timer=setInterval(()=>{countdown.animate([{transform:'scale(.45)',opacity:0,filter:'blur(12px)'},{transform:'scale(1.12)',opacity:1,filter:'blur(0)'},{transform:'scale(1)',opacity:1}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});n--;if(n>0)setTimeout(()=>countdown.textContent=n,100);else{clearInterval(timer);setTimeout(()=>{countdown.style.display='none';countText.style.display='none';finalMessage.classList.remove('hidden');launchConfetti()},700)}},1100)}
function launchConfetti(){const chars=['✦','•','✧','+'];for(let i=0;i<100;i++){const c=document.createElement('span');c.className='confetti-piece';c.textContent=chars[i%chars.length];c.style.left=Math.random()*100+'%';c.style.setProperty('--x',((Math.random()-.5)*280)+'px');c.style.animationDelay=Math.random()*1.3+'s';c.style.animationDuration=(3+Math.random()*3)+'s';c.style.color=['#e0aa96','#f2e1c9','#fff','#a97868'][i%4];confetti.appendChild(c)}}

document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='Enter')showPage(current+1);if(e.key==='ArrowLeft')showPage(current-1)});
document.addEventListener('pointerdown',e=>{const r=document.createElement('span');r.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:18px;height:18px;border:1px solid rgba(255,255,255,.65);border-radius:50%;pointer-events:none;z-index:1300;transform:translate(-50%,-50%);animation:ripple .7s ease-out forwards`;document.body.appendChild(r);setTimeout(()=>r.remove(),750)});
const style=document.createElement('style');style.textContent='@keyframes ripple{to{transform:translate(-50%,-50%) scale(6);opacity:0}}';document.head.appendChild(style);
