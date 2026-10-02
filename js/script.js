document.addEventListener('DOMContentLoaded',()=>{const h=document.querySelector('.hamb'),nav=document.querySelector('.mainnav');if(h){h.addEventListener('click',()=>nav.classList.toggle('open'))}document.querySelectorAll('.drop>a').forEach(a=>a.addEventListener('click',e=>{if(window.innerWidth<=950){const li=a.parentElement;if(li.querySelector('ul')){e.preventDefault();li.classList.toggle('open')}}}));const y=document.getElementById('ano');if(y)y.textContent=new Date().getFullYear()});async function submitBemaForm(form){
  const status=form.querySelector('.form-status');
  const button=form.querySelector('button[type="submit"]');
  if(status){status.className='form-status';status.textContent='A enviar...';}
  if(button) button.disabled=true;
  const tipo=form.dataset.formType==='livro'?'Sugestão de livro — BEMA':'Contacto — BEMA';
  const data={_subject:tipo,_template:'table',_honey:'',email:'',nome:'',sobrenome:'',titulo:'',autor:'',mensagem:''};
  new FormData(form).forEach((value,key)=>{data[key]=value});
  data._honey='';
  try{
    const response=await fetch('https://formsubmit.co/ajax/bibliotecademanhente@aeaf.edu.pt',{
      method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)
    });
    const result=await response.json().catch(()=>({}));
    if(!response.ok || result.success===false) throw new Error('Falha no envio');
    if(status){status.className='form-status ok';status.textContent='Obrigado! A tua mensagem foi enviada para a BEMA.';}
    form.reset();
  }catch(error){
    if(status){status.className='form-status error';status.textContent='Não foi possível enviar agora. Tenta novamente dentro de instantes ou usa o email da BEMA.';}
  }finally{if(button)button.disabled=false;}
  return false;
}
function normalizeSearchText(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function searchSite(){const q=(document.getElementById('siteSearch').value||'').trim();if(!q)return;location.href='arquivo.html?q='+encodeURIComponent(q)}
function renderGlobalSearch(q){
  const box=document.getElementById('globalSearchResults');
  const archive=document.getElementById('archive');
  if(!box||!window.BEMA_SEARCH_INDEX)return;
  const terms=normalizeSearchText(q).split(/\s+/).filter(Boolean);
  const results=window.BEMA_SEARCH_INDEX.filter(item=>{
    const hay=normalizeSearchText(item.title+' '+item.text);
    return terms.every(term=>hay.includes(term));
  });
  box.innerHTML='';
  const heading=document.createElement('div');
  heading.className='search-results-heading';
  heading.innerHTML='<h2>Resultados da pesquisa</h2><p>'+results.length+' resultado'+(results.length===1?'':'s')+' para <strong>“'+escapeHtml(q)+'”</strong></p>';
  box.appendChild(heading);
  if(archive) archive.style.display='none';
  if(!results.length){
    const empty=document.createElement('div');
    empty.className='search-empty';
    empty.innerHTML='<h3>Não encontrámos resultados</h3><p>Tenta outra palavra ou expressão.</p>';
    box.appendChild(empty);
    return;
  }
  const list=document.createElement('div');
  list.className='global-search-list';
  results.forEach(item=>{
    const article=document.createElement('article');
    article.className='global-search-result';
    article.innerHTML='<h3><a href="'+encodeURI(item.url)+'">'+escapeHtml(item.title)+'</a></h3><p>'+escapeHtml(item.excerpt)+'</p><a class="search-result-link" href="'+encodeURI(item.url)+'">Abrir página →</a>';
    list.appendChild(article);
  });
  box.appendChild(list);
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function filterArchive(){const q=(document.getElementById('archiveSearch').value||'').trim();if(q)renderGlobalSearch(q);else{const box=document.getElementById('globalSearchResults');const archive=document.getElementById('archive');if(box)box.innerHTML='';if(archive)archive.style.display='';}}
document.addEventListener('DOMContentLoaded',()=>{const p=new URLSearchParams(location.search);const q=p.get('q');const s=document.getElementById('archiveSearch');if(q&&s){s.value=q;renderGlobalSearch(q)}});
