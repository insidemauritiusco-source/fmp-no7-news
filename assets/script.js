const toggle=document.querySelector('.mobileToggle'),nav=document.querySelector('#siteNav');
if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});

/* Live Mauritius clock and accurate, automatic news timestamp rendering.
   All displayed dates use Indian/Mauritius regardless of visitor location.
   Do not replace an article's actual publication date with the current date. */
(()=>{
const timeZone='Indian/Mauritius';
const dateFormat=new Intl.DateTimeFormat('fr-MU',{timeZone,weekday:'long',year:'numeric',month:'long',day:'numeric'});
const clockFormat=new Intl.DateTimeFormat('fr-MU',{timeZone,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
const postFormat=new Intl.DateTimeFormat('fr-MU',{timeZone,dateStyle:'long',timeStyle:'short',hourCycle:'h23'});
function updateClock(){
 const now=new Date();
 const value=dateFormat.format(now)+'  ·  '+clockFormat.format(now)+' (MUT / UTC+4)';
 document.querySelectorAll('[data-now]').forEach(el=>{if(el.textContent!==value)el.textContent=value});
}
function ageLabel(iso,now){
 const ms=now-new Date(iso).getTime();
 if(!Number.isFinite(ms))return '';
 if(ms<0)return '· Publication programmée';
 const minutes=Math.floor(ms/60000);
 if(minutes<1)return '· à l’instant';
 if(minutes<60)return '· il y a '+minutes+' min';
 const hours=Math.floor(minutes/60);
 if(hours<24)return '· il y a '+hours+' h';
 const days=Math.floor(hours/24);
 if(days<30)return '· il y a '+days+' j';
 const months=Math.floor(days/30.44);
 if(months<12)return '· il y a '+Math.max(1,months)+' mois';
 const years=Math.floor(days/365.25);
 return '· il y a '+years+' an'+(years>1?'s':'');
}
function updatePosts(){
 const now=Date.now();
 document.querySelectorAll('[data-published-at]').forEach(el=>{
  const iso=el.getAttribute('data-published-at');
  const parsed=new Date(iso);
  if(!iso||Number.isNaN(parsed.getTime()))return;
  el.textContent=postFormat.format(parsed)+' (Maurice)';
  el.setAttribute('datetime',parsed.toISOString());
 });
 document.querySelectorAll('[data-post-age-for]').forEach(el=>{
  const iso=el.getAttribute('data-post-age-for');
  const label=ageLabel(iso,now);
  if(label&&el.textContent!==label)el.textContent=label;
 });
}
updateClock();
updatePosts();
setInterval(updateClock,1000);
setInterval(updatePosts,60000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){updateClock();updatePosts()}});
})();

const contact=document.querySelector('#contactForm');if(contact)contact.addEventListener('submit',event=>{event.preventDefault();const info=document.querySelector('#formInfo');if(info)info.textContent="Aucun message transmis : l'adresse officielle n'est pas encore configurée."});
(()=>{
const prefix='fmp7:engagement:';
function load(id){try{const value=JSON.parse(localStorage.getItem(prefix+id)||'{}');return{liked:value.liked===true,comments:Array.isArray(value.comments)?value.comments.slice(-50):[]}}catch(e){return{liked:false,comments:[]}}}
function save(id,value){try{localStorage.setItem(prefix+id,JSON.stringify(value));return true}catch(e){return false}}
document.querySelectorAll('.post-engagement').forEach(group=>{
 const id=group.dataset.postId,like=group.querySelector('.like-button'),comment=group.querySelector('.comment-button'),panel=group.querySelector('.comment-panel'),list=group.querySelector('.comments-list'),form=group.querySelector('.comment-form'),feedback=group.querySelector('.action-feedback');
 if(!id||!like||!comment||!panel||!list||!form)return;
 const say=t=>{if(feedback)feedback.textContent=t};
 function render(){const state=load(id);like.setAttribute('aria-pressed',String(state.liked));group.querySelector('.like-label').textContent=state.liked?'Aimé':'J’aime';group.querySelector('.like-button .action-symbol').textContent=state.liked?'♥':'♡';group.querySelector('.comment-label').textContent='Commenter'+(state.comments.length?' ('+state.comments.length+')':'');list.replaceChildren();if(!state.comments.length){const p=document.createElement('p');p.className='no-comments';p.textContent='Aucun commentaire enregistré sur cet appareil.';list.appendChild(p)}state.comments.forEach(item=>{if(typeof item.text!=='string')return;const e=document.createElement('article');e.className='comment-entry';const time=document.createElement('time');time.textContent=new Intl.DateTimeFormat('fr-MU',{dateStyle:'medium',timeStyle:'short',timeZone:'Indian/Mauritius'}).format(new Date(item.date));const p=document.createElement('p');p.textContent=item.text;e.append(time,p);list.appendChild(e)})}
 render();
 like.addEventListener('click',()=>{const state=load(id);state.liked=!state.liked;save(id,state);render();say('Votre choix est enregistré sur cet appareil uniquement.')});
 comment.addEventListener('click',()=>{panel.hidden=!panel.hidden;comment.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)panel.querySelector('textarea')?.focus()});
 form.addEventListener('submit',e=>{e.preventDefault();const message=String(form.elements.comment?.value||'').trim().slice(0,800);if(!message)return say('Veuillez écrire un commentaire.');const state=load(id);state.comments.push({text:message,date:new Date().toISOString()});state.comments=state.comments.slice(-50);const stored=save(id,state);form.reset();render();say(stored?'Commentaire enregistré sur cet appareil uniquement.':'Le stockage local est indisponible. Aucun commentaire partagé.')});
 group.querySelector('.share-button')?.addEventListener('click',async()=>{const url=new URL(group.dataset.postUrl||location.href,document.baseURI).href;try{if(navigator.share){await navigator.share({title:group.dataset.postTitle||'FMP No.7',url});return}}catch(e){if(e.name==='AbortError')return}try{await navigator.clipboard.writeText(url);say('Lien copié.')}catch(e){const i=document.createElement('input');i.className='share-fallback';i.value=url;i.setAttribute('aria-label','Lien à copier');feedback.replaceChildren(i);i.select()}});
});window.addEventListener('storage',()=>document.querySelectorAll('.post-engagement').forEach(group=>{ /* Les autres onglets mettent à jour leurs données au prochain affichage. */ }));
})();
