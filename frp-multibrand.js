(()=>{
  const WA='https://wa.me/5491164676844?text=';

  const links={
    xiaomi:WA+'Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20Xiaomi.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%2FHyperOS%3A%20____',
    zte:WA+'Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20ZTE.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%3A%20____',
    samsung:WA+'Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20Samsung.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%3A%20____',
    motorola:WA+'Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20Motorola.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%3A%20____',
    iphone:WA+'Hola%20PalaCelus%2C%20quiero%20consultar%20por%20un%20servicio%20para%20iPhone%20propio%20o%20autorizado.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20iOS%3A%20____%0AEstado%20del%20equipo%3A%20____'
  };

  const ensureStyle=()=>{
    if(document.getElementById('frp-multibrand-style'))return;
    const style=document.createElement('style');
    style.id='frp-multibrand-style';
    style.textContent=`
      #frp-xiaomi-feature{position:relative;overflow:hidden;margin:0 0 24px;padding:24px;border:1px solid #6a3719;border-radius:24px;background:radial-gradient(circle at 100% 0,rgba(249,115,22,.18),transparent 38%),linear-gradient(145deg,#1b140f,#111315 64%)!important;box-shadow:0 18px 44px rgba(0,0,0,.22)}
      #frp-xiaomi-feature:after{content:'FRP';position:absolute;right:-10px;bottom:-30px;font-size:110px;line-height:1;font-weight:1000;color:rgba(249,115,22,.06);pointer-events:none}
      #frp-xiaomi-feature .frp-xiaomi-top{display:flex;align-items:center;gap:14px;margin-bottom:14px;position:relative;z-index:1}
      #frp-xiaomi-feature .frp-xiaomi-logo{width:52px;height:52px;border-radius:16px;background:#f97316;color:#fff;display:grid;place-items:center;font-weight:1000;font-size:13px}
      #frp-xiaomi-feature .frp-xiaomi-kicker{font-size:11px;font-weight:900;letter-spacing:.14em;color:#fb923c}
      #frp-xiaomi-feature h3{margin:3px 0 0;font-size:30px;letter-spacing:-.03em}
      #frp-xiaomi-feature p{position:relative;z-index:1;margin:0;color:#aeb8c2;max-width:760px;line-height:1.5}
      #frp-xiaomi-feature .frp-xiaomi-pills{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;margin:17px 0}
      #frp-xiaomi-feature .frp-xiaomi-pills span{border:1px solid #3d2a1e;background:#17130f;border-radius:999px;padding:8px 11px;color:#d8c6b8;font-size:12px;font-weight:800}
      #frp-xiaomi-feature .frp-xiaomi-actions{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:stretch}
      #frp-xiaomi-feature .frp-xiaomi-actions .btn{width:100%;min-height:54px;padding:13px 10px;font-size:13px;letter-spacing:.01em;border-radius:14px!important;color:#fff!important;box-shadow:0 10px 26px rgba(0,0,0,.18)}
      #frp-xiaomi-btn{background:linear-gradient(135deg,#f97316,#dd6b12)!important;border-color:#fb923c!important}
      #frp-zte-btn{background:linear-gradient(135deg,#2563eb,#1d4ed8)!important;border-color:#60a5fa!important}
      #frp-samsung-btn{background:linear-gradient(135deg,#1e5eff,#153fb4)!important;border-color:#4b80ff!important}
      #frp-motorola-btn{background:linear-gradient(135deg,#2c3138,#12161c)!important;border-color:#434b55!important}
      #frp-iphone-btn{grid-column:1/-1;background:linear-gradient(135deg,#1f2937,#090d12)!important;border-color:#64748b!important;color:#f8fafc!important}
      #frp-xiaomi-feature .frp-xiaomi-note{grid-column:1/-1;text-align:center;margin-top:1px;font-size:11px;color:#7f8b96}
      @media(max-width:560px){#frp-xiaomi-feature{padding:19px}#frp-xiaomi-feature h3{font-size:25px}}
      @media(max-width:390px){#frp-xiaomi-feature .frp-xiaomi-actions{grid-template-columns:1fr}#frp-iphone-btn{grid-column:1}}
    `;
    document.head.appendChild(style);
  };

  const ensureCard=()=>{
    const software=document.querySelector('#software .container');
    if(!software)return false;

    let card=document.getElementById('frp-xiaomi-feature');
    if(!card){
      card=document.createElement('div');
      card.id='frp-xiaomi-feature';
      const first=software.querySelector('.service-grid,.apps-section,.download-section');
      if(first)software.insertBefore(card,first);else software.appendChild(card);
    }

    card.innerHTML=`
      <div class="frp-xiaomi-top">
        <div class="frp-xiaomi-logo">FRP</div>
        <div><div class="frp-xiaomi-kicker">SERVICIO REMOTO</div><h3>FRP MULTIMARCA</h3></div>
      </div>
      <p>¿Tenés un equipo con bloqueo FRP? Consultanos la <strong>marca, modelo y versión del sistema</strong> y te confirmamos compatibilidad, valor y modalidad antes de comenzar.</p>
      <div class="frp-xiaomi-pills"><span>⚡ Atención remota</span><span>📱 Xiaomi · ZTE · Samsung · Motorola · iPhone</span><span>💬 Respuesta por WhatsApp</span></div>
      <div class="frp-xiaomi-actions">
        <a id="frp-xiaomi-btn" class="btn" href="${links.xiaomi}" target="_blank" rel="noopener">🟠 FRP XIAOMI</a>
        <a id="frp-zte-btn" class="btn" href="${links.zte}" target="_blank" rel="noopener">🔵 FRP ZTE</a>
        <a id="frp-samsung-btn" class="btn" href="${links.samsung}" target="_blank" rel="noopener">🔷 FRP SAMSUNG</a>
        <a id="frp-motorola-btn" class="btn" href="${links.motorola}" target="_blank" rel="noopener">⚫ FRP MOTOROLA</a>
        <a id="frp-iphone-btn" class="btn" href="${links.iphone}" target="_blank" rel="noopener">🍎 BYPASS IPHONE</a>
        <span class="frp-xiaomi-note">Servicios sujetos a compatibilidad. Solo sobre equipos propios o con autorización del titular.</span>
      </div>`;
    return true;
  };

  ensureStyle();
  if(!ensureCard()){
    let tries=0;
    const timer=setInterval(()=>{tries++;if(ensureCard()||tries>60)clearInterval(timer);},150);
  }
})();