const reveal=document.querySelectorAll('.opening-top,.opening-title,.stage,.opening-bottom,.bar,.collection-head,.filters,.product,.idea-grid,.how>h2,.steps>div,.end');
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}})},{threshold:.08});
reveal.forEach((el,i)=>{el.style.transitionDelay=Math.min(i*35,220)+'ms';observer.observe(el)});
const filters=document.querySelectorAll('.filters button'),products=document.querySelectorAll('.product');
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;products.forEach(p=>p.classList.toggle('hidden',f!=='all'&&p.dataset.category!==f))}));
const header=document.querySelector('.header'),menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>{header.classList.toggle('open')});
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));
const pointer=document.querySelector('.pointer');
window.addEventListener('pointermove',e=>{if(pointer){pointer.style.left=e.clientX+'px';pointer.style.top=e.clientY+'px'}});
const stage=document.querySelector('.stage'),deck=document.querySelector('.deck');
if(stage&&deck&&matchMedia('(pointer:fine)').matches){
stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;deck.style.transform=`translate(calc(-50% + ${x*18}px),calc(-50% + ${y*12}px)) rotateY(${x*3}deg) rotateX(${y*-3}deg)`});
stage.addEventListener('pointerleave',()=>deck.style.transform='translate(-50%,-50%)');
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));