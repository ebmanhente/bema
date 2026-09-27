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
function filterArchive(){const q=(document.getElementById('archiveSearch').value||'').toLowerCase();document.querySelectorAll('.archive-item').forEach(x=>x.style.display=x.innerText.toLowerCase().includes(q)?'grid':'none')}function searchSite(){const q=(document.getElementById('siteSearch').value||'').trim();if(!q)return;location.href='arquivo.html?q='+encodeURIComponent(q)}
document.addEventListener('DOMContentLoaded',()=>{const p=new URLSearchParams(location.search);const q=p.get('q');const s=document.getElementById('archiveSearch');if(q&&s){s.value=q;filterArchive()}});
