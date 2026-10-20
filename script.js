const products=[{brand:'Samsung',model:'A32',name:'Cámara trasera',condition:'Original recuperada',price:'Consultar',code:'PC-0001',icon:'📸'},{brand:'Samsung',model:'A32',name:'Batería',condition:'Original recuperada',price:'Consultar',code:'PC-0002',icon:'🔋'},{brand:'Samsung',model:'A52',name:'Pin de carga',condition:'Probado',price:'Consultar',code:'PC-0003',icon:'🔌'},{brand:'Apple',model:'iPhone 11',name:'Cámara trasera',condition:'Original recuperada',price:'Consultar',code:'PC-0004',icon:'📷'},{brand:'Apple',model:'iPhone XR',name:'Parlante inferior',condition:'Original recuperado',price:'Consultar',code:'PC-0005',icon:'🔊'},{brand:'Motorola',model:'Moto G54',name:'Flex de encendido',condition:'Probado',price:'Consultar',code:'PC-0006',icon:'⚡'},{brand:'Xiaomi',model:'Redmi Note 12',name:'Cámara frontal',condition:'Original recuperada',price:'Consultar',code:'PC-0007',icon:'🤳'},{brand:'Samsung',model:'A14',name:'Tapa trasera',condition:'Recuperada',price:'Consultar',code:'PC-0008',icon:'📱'},{brand:'Apple',model:'iPhone 12',name:'Auricular',condition:'Original recuperado',price:'Consultar',code:'PC-0009',icon:'🎧'}];

function goTo(id){
  const target=document.getElementById(id)||document.getElementById('home');
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p===target));
  history.replaceState(null,'','#'+(id==='home'?'':id));
  window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();goTo(el.dataset.go)}));
const initial=location.hash.replace('#','');if(initial&&document.getElementById(initial))goTo(initial);

const grid=document.getElementById('productGrid'),emptyState=document.getElementById('emptyState'),searchInput=document.getElementById('searchInput'),brandFilter=document.getElementById('brandFilter');
function normalize(t=''){return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function whatsappLink(p){const m=`Hola PalaCelus, quiero consultar por este repuesto:\n\n${p.brand} ${p.model}\n${p.name}\nEstado: ${p.condition}\nCódigo: ${p.code}`;return`https://wa.me/5491164676844?text=${encodeURIComponent(m)}`}
function card(p){return`<article class="product-card"><div class="product-visual">${p.icon}</div><div class="product-body"><div class="product-meta"><span class="badge">${p.condition}</span><span>${p.code}</span></div><h3>${p.brand} ${p.model}</h3><p>${p.name}</p><div class="price">${p.price}</div><a class="btn primary" href="${whatsappLink(p)}" target="_blank" rel="noopener">Consultar</a></div></article>`}
function render(){if(!grid||!searchInput||!brandFilter)return;const q=normalize(searchInput.value.trim()),brand=brandFilter.value,filtered=products.filter(p=>{const text=normalize(`${p.brand} ${p.model} ${p.name} ${p.condition} ${p.code}`);return(!q||text.includes(q))&&(brand==='all'||p.brand===brand)});grid.innerHTML=filtered.map(card).join('');emptyState?.classList.toggle('hidden',filtered.length!==0)}
searchInput?.addEventListener('input',render);brandFilter?.addEventListener('change',render);render();

const repairForm=document.getElementById('repairQuoteForm');
repairForm?.addEventListener('submit',e=>{e.preventDefault();const brand=document.getElementById('repairBrand').value,model=document.getElementById('repairModel').value.trim(),issue=document.getElementById('repairIssue').value,detail=document.getElementById('repairDetail').value.trim();const msg=`Hola PalaCelus, quiero cotizar una reparación.\n\nMarca: ${brand}\nModelo: ${model}\nProblema: ${issue}${detail?`\nDetalle: ${detail}`:''}`;window.open(`https://wa.me/5491164676844?text=${encodeURIComponent(msg)}`,'_blank','noopener')});

const tvForm=document.getElementById('tvDemoForm');
tvForm?.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('tvName').value.trim(),device=document.getElementById('tvDevice').value;const msg=`Hola PalaCelus, quiero consultar por una demo de PalaCelus TV.\n\nNombre: ${name}\nDispositivo: ${device}`;window.open(`https://wa.me/5491164676844?text=${encodeURIComponent(msg)}`,'_blank','noopener')});

const mobileCapable=document.createElement('meta');mobileCapable.name='mobile-web-app-capable';mobileCapable.content='yes';document.head.appendChild(mobileCapable);
const appleCapable=document.createElement('meta');appleCapable.name='apple-mobile-web-app-capable';appleCapable.content='yes';document.head.appendChild(appleCapable);
const appleTitle=document.createElement('meta');appleTitle.name='apple-mobile-web-app-title';appleTitle.content='PalaCelus';document.head.appendChild(appleTitle);
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/service-worker-v2.js',{scope:'/'}).then(r=>r.update()).catch(()=>{}));}

// Consulta de IMEI: intenta mostrar IMEIpro dentro de PalaCelus.
// Si el proveedor bloquea iframes, dejamos un acceso directo para abrirlo aparte.
const imeiStyle=document.createElement('style');
imeiStyle.textContent=`
.imei-wrap{display:grid;gap:14px}.imei-note{background:#111820;border:1px solid #26323d;border-radius:16px;padding:14px 16px;color:#aeb8c2;font-size:13px;line-height:1.45}.imei-frame-wrap{position:relative;background:#fff;border:1px solid #2b353f;border-radius:20px;overflow:hidden;min-height:680px}.imei-frame{display:block;width:100%;height:680px;border:0;background:#fff}.imei-actions{display:flex;gap:10px;flex-wrap:wrap}.imei-fallback{color:#8f9aa6;font-size:12px}.quick-card.imei{background:linear-gradient(160deg,#122019,#0f1713);border-color:#2b4938}
@media(max-width:560px){.imei-frame-wrap,.imei-frame{min-height:760px;height:760px}.imei-actions .btn{width:100%}}
`;
document.head.appendChild(imeiStyle);

const quickGrid=document.querySelector('#home .quick-grid');
if(quickGrid&&!document.querySelector('[data-go="imei"]')){
  const imeiCard=document.createElement('button');
  imeiCard.className='quick-card imei';
  imeiCard.dataset.go='imei';
  imeiCard.innerHTML='<div class="icon">🔎</div><h3>Consultar IMEI</h3><p>Chequeá el estado del IMEI usando IMEIpro.</p>';
  imeiCard.addEventListener('click',e=>{e.preventDefault();goTo('imei')});
  quickGrid.appendChild(imeiCard);
}

if(!document.getElementById('imei')){
  const section=document.createElement('section');
  section.id='imei';
  section.className='panel';
  section.innerHTML=`<div class="container"><div class="panel-head"><div><div class="eyebrow">CONSULTA DE IMEI</div><h2>Verificá un IMEI</h2><p>La consulta se realiza mediante IMEIpro. El captcha y el resultado pertenecen al proveedor externo.</p></div><button class="back" type="button">← Inicio</button></div><div class="imei-wrap"><div class="imei-note">Ingresá el IMEI y completá el captcha dentro de la ventana. Si IMEIpro no permite mostrarse dentro de PalaCelus, usá el botón de apertura directa.</div><div class="imei-actions"><a class="btn primary" href="https://imeipro.info/" target="_blank" rel="noopener">Abrir IMEIpro aparte</a></div><div class="imei-frame-wrap"><iframe class="imei-frame" src="https://imeipro.info/" title="Verificador IMEIpro" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="imei-fallback">Si ves una pantalla en blanco o un mensaje de seguridad, significa que IMEIpro bloquea la carga dentro de otras webs. En ese caso, el botón de arriba sigue funcionando.</div></div></div>`;
  document.querySelector('main')?.appendChild(section);
  section.querySelector('.back')?.addEventListener('click',()=>goTo('home'));
}

// Catálogo de celulares nuevos.
if(quickGrid&&!document.getElementById('catalogo-celulares-link')){
  const catalogCard=document.createElement('a');
  catalogCard.id='catalogo-celulares-link';
  catalogCard.className='quick-card green';
  catalogCard.href='/catalogo.html';
  catalogCard.innerHTML='<div class="icon">🛍️</div><h3>Celulares nuevos</h3><p>Catálogo con Samsung, Motorola, Xiaomi y más.</p>';
  quickGrid.prepend(catalogCard);
}

// Catálogo de MacBook nuevas en stock.
if(quickGrid&&!document.getElementById('catalogo-macbook-link')){
  const macCard=document.createElement('a');
  macCard.id='catalogo-macbook-link';
  macCard.className='quick-card blue';
  macCard.href='/macbook.html';
  macCard.innerHTML='<div class="icon">💻</div><h3>MacBook nuevas</h3><p>Modelos Apple disponibles con stock confirmado.</p>';
  const catalogCard=document.getElementById('catalogo-celulares-link');
  if(catalogCard?.nextSibling)quickGrid.insertBefore(macCard,catalogCard.nextSibling);else quickGrid.appendChild(macCard);
}

// Mejora de compatibilidad para accesos a Configuración desde Chrome Android.
// Algunos navegadores no resuelven intents sin esquema/componente explícito.
const androidToolCards=[...document.querySelectorAll('#software .app-card')];
const settingsCard=androidToolCards.find(a=>a.querySelector('strong')?.textContent.trim()==='Ajustes');
const accessibilityCard=androidToolCards.find(a=>a.querySelector('strong')?.textContent.trim()==='Accesibilidad');
const securityCard=androidToolCards.find(a=>a.querySelector('strong')?.textContent.trim()==='Seguridad');
if(settingsCard){
  settingsCard.href='intent://com.android.settings/#Intent;scheme=android-app;end';
}
if(accessibilityCard){
  accessibilityCard.href='intent:#Intent;action=android.settings.ACCESSIBILITY_SETTINGS;package=com.android.settings;component=com.android.settings/.Settings$AccessibilitySettingsActivity;end';
}
if(securityCard){
  securityCard.href='intent:#Intent;action=android.settings.SECURITY_SETTINGS;category=android.intent.category.DEFAULT;package=com.android.settings;end';
}
