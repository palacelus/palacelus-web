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
