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

// Descargas directas oficiales de asistencia remota para Windows.
const downloadLinks=document.querySelector('#software .download-links');
if(downloadLinks){
  if(!document.getElementById('download-ultraviewer')){
    const ultra=document.createElement('a');
    ultra.id='download-ultraviewer';
    ultra.className='btn';
    ultra.href='https://www.ultraviewer.net/es/UltraViewer_setup_6.6_es.exe';
    ultra.target='_blank';
    ultra.rel='noopener noreferrer';
    ultra.textContent='⬇ UltraViewer';
    downloadLinks.appendChild(ultra);
  }
  if(!document.getElementById('download-anydesk')){
    const anydesk=document.createElement('a');
    anydesk.id='download-anydesk';
    anydesk.className='btn';
    anydesk.href='https://download.anydesk.com/AnyDesk.exe';
    anydesk.target='_blank';
    anydesk.rel='noopener noreferrer';
    anydesk.textContent='⬇ AnyDesk';
    downloadLinks.appendChild(anydesk);
  }
}

// Utilidades rápidas: generador QR guiado y calculadora ARS / USD / USDT.
const utilityStyle=document.createElement('style');
utilityStyle.textContent=`
.pc-tools{margin-top:28px;padding-top:26px;border-top:1px solid #252e37}.pc-tools h3{margin:0 0 6px;font-size:25px}.pc-tools>p{margin:0 0 16px;color:#98a3ae}.pc-tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.pc-tool{background:#12171c;border:1px solid #252e37;border-radius:20px;padding:18px}.pc-tool h4{margin:0 0 6px;font-size:18px}.pc-tool p{margin:0 0 14px;color:#8f9aa6;font-size:13px;line-height:1.4}.pc-field{display:grid;gap:6px;margin-top:10px}.pc-field label{font-size:12px;color:#aeb8c2;font-weight:800}.pc-field input,.pc-field textarea,.pc-field select{width:100%;background:#0f1419;color:#fff;border:1px solid #2c3741;border-radius:12px;padding:12px 13px;outline:none}.pc-field textarea{min-height:86px;resize:vertical}.pc-field input:focus,.pc-field textarea:focus,.pc-field select:focus{border-color:#2dd4a7}.pc-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.pc-result{margin-top:12px;background:#0d1317;border:1px solid #26313a;border-radius:13px;padding:12px 13px;font-weight:900}.pc-qr-types{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.pc-qr-type{border:1px solid #2c3741;background:#0f1419;color:#b9c3cc;border-radius:12px;padding:10px 8px;cursor:pointer;font-size:12px;font-weight:900;transition:.15s}.pc-qr-type:hover{border-color:#43515d}.pc-qr-type.active{background:#17392f;border-color:#2dd4a7;color:#7ff0ca}.pc-qr-fields{display:none}.pc-qr-fields.active{display:block}.pc-qr-preview{display:none;margin-top:14px;text-align:center;background:#fff;border-radius:15px;padding:14px}.pc-qr-preview img{display:block;max-width:260px;width:100%;height:auto;margin:auto}.pc-qr-preview small{display:block;color:#4b5563;margin-top:10px;font-size:11px}.pc-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:12px}.pc-actions .btn{flex:1 1 150px}.pc-mini{font-size:11px;color:#7f8b96;margin-top:8px}.pc-qr-error{min-height:18px;margin-top:8px;color:#fda4af;font-size:12px}.pc-rate-saved{color:#2dd4a7;font-size:11px;margin-top:6px;min-height:16px}
@media(max-width:760px){.pc-tools-grid{grid-template-columns:1fr}.pc-row{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.pc-qr-types{grid-template-columns:1fr 1fr}}
@media(max-width:430px){.pc-row{grid-template-columns:1fr}}
`;
document.head.appendChild(utilityStyle);

const softwareContainer=document.querySelector('#software .container');
if(softwareContainer&&!document.getElementById('pc-tools')){
  const tools=document.createElement('div');
  tools.id='pc-tools';
  tools.className='pc-tools';
  tools.innerHTML=`
    <div class="eyebrow">UTILIDADES RÁPIDAS</div>
    <h3>Herramientas PalaCelus</h3>
    <p>Utilidades rápidas para usar desde el taller, el celular o una PC.</p>
    <div class="pc-tools-grid">
      <div class="pc-tool">
        <h4>🔳 Crear código QR</h4>
        <p>Elegí qué querés compartir. La web te muestra solamente los datos que necesitás completar.</p>
        <div class="pc-qr-types" role="tablist" aria-label="Tipo de QR">
          <button class="pc-qr-type active" type="button" data-qr-type="whatsapp">💬 WhatsApp</button>
          <button class="pc-qr-type" type="button" data-qr-type="wifi">📶 Wi‑Fi</button>
          <button class="pc-qr-type" type="button" data-qr-type="text">📝 Texto</button>
          <button class="pc-qr-type" type="button" data-qr-type="link">🔗 Enlace</button>
        </div>

        <div class="pc-qr-fields active" data-qr-fields="whatsapp">
          <div class="pc-field"><label for="pcQrWhatsappNumber">Número de WhatsApp</label><input id="pcQrWhatsappNumber" inputmode="tel" placeholder="Ej: +54 9 11 6467 6844"></div>
          <div class="pc-field"><label for="pcQrWhatsappMessage">Mensaje opcional</label><textarea id="pcQrWhatsappMessage" placeholder="Ej: Hola PalaCelus, quería consultar por..."></textarea></div>
          <div class="pc-mini">Usá el número con código de país. Al escanear, abre directamente el chat.</div>
        </div>

        <div class="pc-qr-fields" data-qr-fields="wifi">
          <div class="pc-field"><label for="pcQrWifiName">Nombre de la red Wi‑Fi</label><input id="pcQrWifiName" autocomplete="off" placeholder="Ej: PalaCelus WiFi"></div>
          <div class="pc-row">
            <div class="pc-field"><label for="pcQrWifiSecurity">Seguridad</label><select id="pcQrWifiSecurity"><option value="WPA">WPA / WPA2</option><option value="WEP">WEP</option><option value="nopass">Sin contraseña</option></select></div>
            <div class="pc-field" id="pcQrWifiPasswordWrap"><label for="pcQrWifiPassword">Contraseña</label><input id="pcQrWifiPassword" autocomplete="off" placeholder="Contraseña Wi‑Fi"></div>
          </div>
          <div class="pc-mini">Al escanear desde un celular compatible, ofrece conectarse a la red automáticamente.</div>
        </div>

        <div class="pc-qr-fields" data-qr-fields="text">
          <div class="pc-field"><label for="pcQrPlainText">Texto</label><textarea id="pcQrPlainText" placeholder="Escribí el texto que querés mostrar al escanear"></textarea></div>
        </div>

        <div class="pc-qr-fields" data-qr-fields="link">
          <div class="pc-field"><label for="pcQrLink">Enlace</label><input id="pcQrLink" inputmode="url" placeholder="Ej: palacelus.com.ar"></div>
          <div class="pc-mini">Si escribís una web sin https://, PalaCelus lo agrega automáticamente.</div>
        </div>

        <div class="pc-qr-error" id="pcQrError"></div>
        <div class="pc-actions"><button class="btn primary" id="pcQrGenerate" type="button">Generar QR</button><a class="btn" id="pcQrOpen" href="#" target="_blank" rel="noopener noreferrer" style="display:none">Abrir QR</a></div>
        <div class="pc-qr-preview" id="pcQrPreview"><img id="pcQrImage" alt="QR generado"><small>Escanealo con otro celular para probarlo.</small></div>
      </div>
      <div class="pc-tool">
        <h4>💵 Calculadora USD / USDT</h4>
        <p>Ingresá tu cotización del día y convertí pesos ↔ USD/USDT al instante.</p>
        <div class="pc-field"><label for="pcRate">Cotización ARS por 1 USD/USDT</label><input id="pcRate" inputmode="decimal" placeholder="Ej: 1600"></div>
        <div class="pc-rate-saved" id="pcRateSaved"></div>
        <div class="pc-row">
          <div class="pc-field"><label for="pcArs">Pesos (ARS)</label><input id="pcArs" inputmode="decimal" placeholder="Ej: 160000"></div>
          <div class="pc-field"><label for="pcUsdt">USD / USDT</label><input id="pcUsdt" inputmode="decimal" placeholder="Ej: 100"></div>
        </div>
        <div class="pc-result" id="pcConversionResult">Cargá una cotización y un importe.</div>
        <div class="pc-mini">La cotización queda guardada solamente en este navegador.</div>
      </div>
    </div>`;
  softwareContainer.appendChild(tools);

  const qrTypeButtons=[...document.querySelectorAll('.pc-qr-type')];
  const qrFieldGroups=[...document.querySelectorAll('.pc-qr-fields')];
  const qrBtn=document.getElementById('pcQrGenerate'),qrImg=document.getElementById('pcQrImage'),qrPreview=document.getElementById('pcQrPreview'),qrOpen=document.getElementById('pcQrOpen'),qrError=document.getElementById('pcQrError');
  const wifiSecurity=document.getElementById('pcQrWifiSecurity'),wifiPasswordWrap=document.getElementById('pcQrWifiPasswordWrap');
  let qrType='whatsapp';

  const resetQrResult=()=>{qrError.textContent='';qrPreview.style.display='none';qrOpen.style.display='none';qrImg.removeAttribute('src');};
  const setQrType=type=>{
    qrType=type;
    qrTypeButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.qrType===type));
    qrFieldGroups.forEach(group=>group.classList.toggle('active',group.dataset.qrFields===type));
    resetQrResult();
  };
  qrTypeButtons.forEach(btn=>btn.addEventListener('click',()=>setQrType(btn.dataset.qrType)));
  wifiSecurity?.addEventListener('change',()=>{wifiPasswordWrap.style.display=wifiSecurity.value==='nopass'?'none':'grid';});

  const escapeWifi=value=>String(value||'').replace(/([\\;,:"])/g,'\\$1');
  const buildQrData=()=>{
    if(qrType==='whatsapp'){
      const raw=document.getElementById('pcQrWhatsappNumber').value.trim();
      const number=raw.replace(/\D/g,'');
      const message=document.getElementById('pcQrWhatsappMessage').value.trim();
      if(number.length<8)throw new Error('Ingresá un número de WhatsApp válido con código de país.');
      return `https://wa.me/${number}${message?`?text=${encodeURIComponent(message)}`:''}`;
    }
    if(qrType==='wifi'){
      const ssid=document.getElementById('pcQrWifiName').value.trim();
      const security=document.getElementById('pcQrWifiSecurity').value;
      const password=document.getElementById('pcQrWifiPassword').value;
      if(!ssid)throw new Error('Ingresá el nombre de la red Wi‑Fi.');
      if(security!=='nopass'&&!password)throw new Error('Ingresá la contraseña del Wi‑Fi.');
      return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${security==='nopass'?'':escapeWifi(password)};;`;
    }
    if(qrType==='text'){
      const text=document.getElementById('pcQrPlainText').value.trim();
      if(!text)throw new Error('Escribí el texto que querés poner en el QR.');
      return text;
    }
    const value=document.getElementById('pcQrLink').value.trim();
    if(!value)throw new Error('Ingresá el enlace que querés compartir.');
    return /^[a-z][a-z0-9+.-]*:\/\//i.test(value)?value:`https://${value}`;
  };

  qrBtn?.addEventListener('click',()=>{
    resetQrResult();
    try{
      const data=buildQrData();
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=16&data=${encodeURIComponent(data)}`;
      qrImg.src=url;qrPreview.style.display='block';qrOpen.href=url;qrOpen.style.display='inline-flex';
    }catch(err){qrError.textContent=err?.message||'Revisá los datos e intentá de nuevo.';}
  });

  const rateInput=document.getElementById('pcRate'),arsInput=document.getElementById('pcArs'),usdtInput=document.getElementById('pcUsdt'),result=document.getElementById('pcConversionResult'),saved=document.getElementById('pcRateSaved');
  const parseLocalNumber=v=>{const s=String(v||'').trim().replace(/\s/g,'');if(!s)return NaN;if(s.includes(',')&&s.includes('.')){return s.lastIndexOf(',')>s.lastIndexOf('.')?Number(s.replace(/\./g,'').replace(',','.')):Number(s.replace(/,/g,''));}if(s.includes(','))return Number(s.replace(',','.'));return Number(s);};
  const fmtArs=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:2}).format(n);
  const fmtUsdt=n=>new Intl.NumberFormat('es-AR',{minimumFractionDigits:0,maximumFractionDigits:4}).format(n);
  const savedRate=localStorage.getItem('palacelus_usdt_rate');
  if(savedRate){rateInput.value=savedRate;saved.textContent='✓ Cotización guardada';}
  const saveRate=()=>{const rate=parseLocalNumber(rateInput.value);if(rate>0){localStorage.setItem('palacelus_usdt_rate',rateInput.value);saved.textContent='✓ Cotización guardada';}else saved.textContent='';};
  const fromArs=()=>{const rate=parseLocalNumber(rateInput.value),ars=parseLocalNumber(arsInput.value);if(!(rate>0)||!(ars>=0)){result.textContent='Cargá una cotización y un importe.';return;}const usdt=ars/rate;usdtInput.value=Number.isFinite(usdt)?usdt.toFixed(2):'';result.textContent=`${fmtArs(ars)} = ${fmtUsdt(usdt)} USD/USDT`;saveRate();};
  const fromUsdt=()=>{const rate=parseLocalNumber(rateInput.value),usdt=parseLocalNumber(usdtInput.value);if(!(rate>0)||!(usdt>=0)){result.textContent='Cargá una cotización y un importe.';return;}const ars=usdt*rate;arsInput.value=Number.isFinite(ars)?ars.toFixed(2):'';result.textContent=`${fmtUsdt(usdt)} USD/USDT = ${fmtArs(ars)}`;saveRate();};
  arsInput?.addEventListener('input',fromArs);usdtInput?.addEventListener('input',fromUsdt);rateInput?.addEventListener('change',()=>{saveRate();if(arsInput.value)fromArs();else if(usdtInput.value)fromUsdt();});
}
