(()=>{
  const init=()=>{
    const card=document.getElementById('frp-xiaomi-feature');
    if(!card)return false;

    if(!document.getElementById('frp-multibrand-style')){
      const style=document.createElement('style');
      style.id='frp-multibrand-style';
      style.textContent=`
        #frp-xiaomi-feature{border-color:#6a3719!important;background:radial-gradient(circle at 100% 0,rgba(249,115,22,.18),transparent 38%),linear-gradient(145deg,#1b140f,#111315 64%)!important}
        #frp-xiaomi-feature:after{content:'FRP'!important;font-size:110px!important;color:rgba(249,115,22,.06)!important;right:-10px!important}
        #frp-xiaomi-feature .frp-xiaomi-logo{background:#f97316!important;color:#fff!important;font-size:13px!important}
        #frp-xiaomi-feature .frp-xiaomi-actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px!important;align-items:stretch!important}
        #frp-xiaomi-feature .frp-xiaomi-actions .btn{width:100%;min-height:54px;padding:13px 10px;font-size:13px;letter-spacing:.01em;border-radius:14px!important;color:#fff!important;box-shadow:0 10px 26px rgba(0,0,0,.18)}
        #frp-xiaomi-feature .frp-xiaomi-note{grid-column:1/-1;text-align:center;margin-top:1px}
        #frp-xiaomi-feature .frp-xiaomi-btn{background:linear-gradient(135deg,#f97316,#dd6b12)!important;border-color:#fb923c!important}
        #frp-zte-btn{background:linear-gradient(135deg,#ef4444,#991b1b)!important;border-color:#f87171!important}
        #frp-samsung-btn{background:linear-gradient(135deg,#1e5eff,#153fb4)!important;border-color:#4b80ff!important}
        #frp-motorola-btn{background:linear-gradient(135deg,#2c3138,#12161c)!important;border-color:#434b55!important}
        #frp-iphone-btn{grid-column:1/-1;background:linear-gradient(135deg,#1f2937,#090d12)!important;border-color:#64748b!important;color:#f8fafc!important;box-shadow:0 10px 28px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.08)!important;font-size:14px!important;letter-spacing:.02em!important}
        #frp-xiaomi-feature .frp-xiaomi-actions .btn:hover{filter:brightness(1.07);transform:translateY(-1px)}
        @media(max-width:390px){#frp-xiaomi-feature .frp-xiaomi-actions{grid-template-columns:1fr!important}#frp-iphone-btn{grid-column:1!important}}
      `;
      document.head.appendChild(style);
    }

    const title=card.querySelector('.frp-xiaomi-top h3');
    const logo=card.querySelector('.frp-xiaomi-logo');
    const text=card.querySelector('p');
    const pills=card.querySelector('.frp-xiaomi-pills');
    const actions=card.querySelector('.frp-xiaomi-actions');
    const xiaomi=card.querySelector('.frp-xiaomi-btn');
    const note=card.querySelector('.frp-xiaomi-note');

    if(title)title.textContent='FRP MULTIMARCA';
    if(logo)logo.textContent='FRP';
    if(text)text.innerHTML='¿Tenés un equipo con bloqueo FRP? Consultanos la <strong>marca, modelo y versión de Android</strong> y te confirmamos compatibilidad, valor y modalidad antes de comenzar.';
    if(pills)pills.innerHTML='<span>⚡ Atención remota</span><span>📱 Xiaomi · ZTE · Samsung · Motorola · iPhone</span><span>💬 Respuesta por WhatsApp</span>';
    if(!actions||!xiaomi)return false;

    xiaomi.textContent='🟠 FRP XIAOMI';
    xiaomi.href='https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20Xiaomi.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%2FHyperOS%3A%20____';

    const makeBtn=(id,label,href)=>{
      let btn=document.getElementById(id);
      if(!btn){
        btn=document.createElement('a');
        btn.id=id;
        btn.className='btn';
        actions.insertBefore(btn,note||null);
      }
      btn.href=href;
      btn.target='_blank';
      btn.rel='noopener';
      btn.textContent=label;
      return btn;
    };

    makeBtn('frp-zte-btn','🔴 FRP ZTE','https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20ZTE.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%3A%20____');
    makeBtn('frp-samsung-btn','🔷 FRP SAMSUNG','https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20Samsung.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%3A%20____');
    makeBtn('frp-motorola-btn','⚫ FRP MOTOROLA','https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20quiero%20consultar%20por%20FRP%20Motorola.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20Android%3A%20____');
    makeBtn('frp-iphone-btn','🍎 BYPASS IPHONE','https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20quiero%20consultar%20por%20un%20servicio%20para%20iPhone%20propio%20o%20autorizado.%0AModelo%3A%20____%0AVersi%C3%B3n%20de%20iOS%3A%20____%0AEstado%20del%20equipo%3A%20____');
    if(note)note.textContent='Servicios sujetos a compatibilidad. Solo sobre equipos propios o con autorización del titular.';
    return true;
  };

  if(!init()){
    let tries=0;
    const timer=setInterval(()=>{tries++;if(init()||tries>40)clearInterval(timer);},150);
  }
})();