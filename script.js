const body=document.body;
const nav=document.getElementById('navMenu');
const menuToggle=document.getElementById('menuToggle');
const themeToggle=document.getElementById('themeToggle');
const progress=document.getElementById('progress');
const year=document.getElementById('year');

year.textContent=new Date().getFullYear();
menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='dark') body.classList.add('dark');
themeToggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme',body.classList.contains('dark')?'dark':'light');
  themeToggle.textContent=body.classList.contains('dark')?'☾':'☼';
});
themeToggle.textContent=body.classList.contains('dark')?'☾':'☼';

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=max>0?`${(window.scrollY/max)*100}%`:'0%';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const modal=document.getElementById('imageModal');
const modalImage=document.getElementById('modalImage');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  modalImage.src=item.dataset.full;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalImage.src=''}
document.getElementById('closeModal').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
