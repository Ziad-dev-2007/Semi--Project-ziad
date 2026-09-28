let lang='en';try{lang=localStorage.getItem('lang')||'en'}catch(e){}
const $=id=>document.getElementById(id),sky=document.querySelector('.sky');
const LB={en:['Sunset over the dunes','Blue hour','Midnight, Milky Way overhead'],ar:['غروب الشمس فوق الكثبان','الساعة الزرقاء','منتصف الليل ودرب التبانة فوق رأسك']};
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
const C=[[[242,166,90],[226,112,58],[138,59,74]],[[60,50,110],[30,32,80],[14,19,48]],[[14,19,48],[10,14,38],[6,8,26]]];
let sv=85;
function setSky(v){sv=v;const p=v/50,i=Math.min(Math.floor(p),1),t=p-i;
sky.style.background=`linear-gradient(${C[i].map((x,k)=>`rgb(${mix(x,C[i+1][k],t)})`)})`;
sky.style.setProperty('--night-lvl',Math.max(0,(v-25)/75).toFixed(2));
const l=$('skyLabel');if(l)l.textContent=LB[lang][v<30?0:v<70?1:2];}
if(sky){for(let i=0;i<90;i++){const s=document.createElement('i');s.className='star';
s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*70}%;--o:${.3+Math.random()*.7}`;sky.prepend(s);}
const r=$('skyRange');if(r)r.addEventListener('input',e=>setSky(+e.target.value));setSky(r?+r.value:85);
sky.insertAdjacentHTML('afterbegin','<i class="shoot"></i><i class="shoot" style="top:30%;inset-inline-start:30%;animation-delay:5s"></i>');}
const f=$('plan');function calc(){if(!f)return;const P={siwa:1900,white:2400,fayoum:1300},d=+f.days.value,g=+f.guests.value;
let t=P[f.dest.value]*d*g;if(f.stars.checked)t+=350*g;if(f.camel.checked)t+=450*g;if(f.food.checked)t+=300*g*d;
$('total').textContent=t.toLocaleString()+(lang=='ar'?' ج.م':' EGP');}
if(f){f.addEventListener('input',calc);}
const c=$('contact');if(c)c.addEventListener('submit',e=>{e.preventDefault();c.classList.add('d-none');$('thanks').classList.remove('d-none')});
function setLang(l){lang=l;try{localStorage.setItem('lang',l)}catch(e){}
const h=document.documentElement;h.lang=l;h.dir=l=='ar'?'rtl':'ltr';
$('bs').href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap'+(l=='ar'?'.rtl':'')+'.min.css';
document.querySelectorAll('[data-ar]').forEach(e=>{if(!e.dataset.en)e.dataset.en=e.innerHTML;e.innerHTML=l=='ar'?e.dataset.ar:e.dataset.en});
$('langBtn').textContent=l=='ar'?'English':'العربية';if(sky)setSky(sv);calc();}
$('langBtn').addEventListener('click',()=>setLang(lang=='ar'?'en':'ar'));setLang(lang);
// count-up
document.querySelectorAll('[data-count]').forEach(e=>{const end=+e.dataset.count,dec=String(end).includes('.')?1:0;
new IntersectionObserver((en,o)=>{if(!en[0].isIntersecting)return;o.disconnect();const t0=performance.now();
(function s(n){const p=Math.min((n-t0)/1400,1);e.textContent=(end*p).toFixed(dec);if(p<1)requestAnimationFrame(s)})(t0)}).observe(e)});
// reveal
const ro=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){const e=x.target;e.classList.add('in');ro.unobserve(e);setTimeout(()=>e.classList.remove('rv','in'),1500)}}),{threshold:.15});
document.querySelectorAll('.camp,.panel,.tl>div,.tile,.accordion-item,.frame,.quote').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%4)*90+'ms';ro.observe(e)});
// navbar + gallery
const nb=document.querySelector('.navbar');addEventListener('scroll',()=>nb.classList.toggle('sc',scrollY>40));
document.querySelectorAll('[data-f]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-f]').forEach(x=>x.classList.remove('btn-ember'));b.classList.add('btn-ember');
document.querySelectorAll('.g').forEach(g=>g.classList.toggle('d-none',b.dataset.f!='all'&&g.dataset.c!=b.dataset.f))}));
document.querySelectorAll('.tile').forEach(t=>{const o=()=>{$('lbBody').innerHTML=t.innerHTML;new bootstrap.Modal($('lb')).show()};t.addEventListener('click',o);t.addEventListener('keydown',e=>e.key=='Enter'&&o())});
