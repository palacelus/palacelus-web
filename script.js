const products=[{brand:'Samsung',model:'A32',name:'Cámara trasera',condition:'Original recuperada',price:'Consultar',code:'PC-0001',icon:'📸'},{brand:'Samsung',model:'A32',name:'Batería',condition:'Original recuperada',price:'Consultar',code:'PC-0002',icon:'🔋'},{brand:'Samsung',model:'A52',name:'Pin de carga',condition:'Probado',price:'Consultar',code:'PC-0003',icon:'🔌'},{brand:'Apple',model:'iPhone 11',name:'Cámara trasera',condition:'Original recuperada',price:'Consultar',code:'PC-0004',icon:'📷'},{brand:'Apple',model:'iPhone XR',name:'Parlante inferior',condition:'Original recuperado',price:'Consultar',code:'PC-0005',icon:'🔊'},{brand:'Motorola',model:'Moto G54',name:'Flex de encendido',condition:'Probado',price:'Consultar',code:'PC-0006',icon:'⚡'},{brand:'Xiaomi',model:'Redmi Note 12',name:'Cámara frontal',condition:'Original recuperada',price:'Consultar',code:'PC-0007',icon:'🤳'},{brand:'Samsung',model:'A14',name:'Tapa trasera',condition:'Recuperada',price:'Consultar',code:'PC-0008',icon:'📱'},{brand:'Apple',model:'iPhone 12',name:'Auricular',condition:'Original recuperado',price:'Consultar',code:'PC-0009',icon:'🎧'}];

const grid=document.getElementById('productGrid'),emptyState=document.getElementById('emptyState'),searchInput=document.getElementById('searchInput'),brandFilter=document.getElementById('brandFilter');
function normalize(t=''){return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function whatsappLink(p){const m=`Hola PalaCelus, quiero consultar por este repuesto:\n\n${p.brand} ${p.model}\n${p.name}\nEstado: ${p.condition}\nCódigo: ${p.code}`;return`https://wa.me/5491164676844?text=${encodeURIComponent(m)}`}
function card(p){return`<article class="product-card"><div class="product-visual">${p.icon}</div><div class="product-body"><div class="product-meta"><span class="badge">${p.condition}</span><span class="product-code">${p.code}</span></div><h3>${p.brand} ${p.model}</h3><p>${p.name}</p><div class="price">${p.price}</div><div class="product-actions"><a class="btn btn-primary" href="${whatsappLink(p)}" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div></article>`}
function render(){const q=normalize(searchInput.value.trim()),brand=brandFilter.value,filtered=products.filter(p=>{const text=normalize(`${p.brand} ${p.model} ${p.name} ${p.condition} ${p.code}`);return(!q||text.includes(q))&&(brand==='all'||p.brand===brand)});grid.innerHTML=filtered.map(card).join('');emptyState.classList.toggle('hidden',filtered.length!==0)}
searchInput.addEventListener('input',render);brandFilter.addEventListener('change',render);render();

const tvPrice=document.querySelector('.tv-price strong');if(tvPrice)tvPrice.textContent='$9.999,99';

const shippingStyle=document.createElement('style');
shippingStyle.textContent=`.shipping-strip{padding:0 0 34px}.shipping-box{display:flex;align-items:center;justify-content:space-between;gap:24px;background:linear-gradient(135deg,#172018,#111915);border:1px solid #294332;border-radius:22px;padding:22px 24px;box-shadow:0 16px 45px rgba(0,0,0,.18)}.shipping-info{display:flex;align-items:center;gap:16px}.shipping-icon{font-size:36px}.shipping-box h3{margin:0 0 5px;font-size:22px}.shipping-box p{margin:0;color:#aeb9b1}.shipping-btn{white-space:nowrap;background:#34d399;color:#062017}@media(max-width:720px){.shipping-box{align-items:flex-start;flex-direction:column}.shipping-btn{width:100%}}`;
document.head.appendChild(shippingStyle);

const repuestos=document.getElementById('repuestos');
if(repuestos){
  const shipping=document.createElement('section');
  shipping.className='shipping-strip';
  shipping.innerHTML=`<div class="container"><div class="shipping-box"><div class="shipping-info"><div class="shipping-icon">🛵</div><div><h3>Envíos rápidos en el día</h3><p>Coordinamos envíos por moto / mensajería, incluyendo Uber Moto según zona y disponibilidad. También podés retirar por Banfield.</p></div></div><a class="btn shipping-btn" href="https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20quiero%20consultar%20por%20un%20env%C3%ADo.%0AProducto%3A%20____%0ADirecci%C3%B3n%3A%20____" target="_blank" rel="noopener">Consultar envío por WhatsApp</a></div></div>`;
  repuestos.insertAdjacentElement('afterend',shipping);
}

const reviewStyle=document.createElement('style');
reviewStyle.textContent=`.reviews-strip{padding:34px 0}.reviews-box{display:flex;align-items:center;justify-content:space-between;gap:24px;background:linear-gradient(135deg,#171717,#101010);border:1px solid #2d2d2d;border-radius:24px;padding:24px 26px;box-shadow:0 18px 50px rgba(0,0,0,.2)}.reviews-main{display:flex;align-items:center;gap:18px}.reviews-stars{font-size:28px;letter-spacing:2px;white-space:nowrap}.reviews-box h3{margin:0 0 6px;font-size:24px}.reviews-box p{margin:0;color:#aeb4bc}.reviews-btn{white-space:nowrap;background:#fff;color:#111}@media(max-width:720px){.reviews-box{align-items:flex-start;flex-direction:column}.reviews-main{align-items:flex-start}.reviews-btn{width:100%;text-align:center}}`;
document.head.appendChild(reviewStyle);

const contacto=document.getElementById('contacto');
if(contacto){
  const reviews=document.createElement('section');
  reviews.className='reviews-strip';
  reviews.innerHTML=`<div class="container"><div class="reviews-box"><div class="reviews-main"><div class="reviews-stars">⭐ ⭐ ⭐ ⭐ ⭐</div><div><h3>113 reseñas en Google</h3><p>La experiencia de nuestros clientes también habla por nosotros. Mirá las reseñas de PalaCelus en Google.</p></div></div><a class="btn reviews-btn" href="https://share.google/cJlCov9rjp5xGGMMA" target="_blank" rel="noopener">Ver reseñas en Google</a></div></div>`;
  contacto.insertAdjacentElement('beforebegin',reviews);
}

const heroBadges=document.querySelector('.hero-badges');
if(heroBadges){
  const googleBadge=document.createElement('span');
  googleBadge.textContent='⭐ 113 reseñas en Google';
  heroBadges.appendChild(googleBadge);
}
