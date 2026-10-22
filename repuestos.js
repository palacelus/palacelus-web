(()=>{
  const init=()=>{
    const panel=document.getElementById('repuestos');
    const grid=document.getElementById('partsModelGrid');
    const search=document.getElementById('partsModelSearch');
    const brand=document.getElementById('partsBrandFilter');
    const empty=document.getElementById('partsEmptyState');
    if(!panel||!grid||!search||!brand||!empty)return false;
    if(panel.dataset.repuestosV3==='1')return true;
    panel.dataset.repuestosV3='1';

    const intro=panel.querySelector('.pc-parts-intro');
    if(intro)intro.textContent='Agrupamos los repuestos por modelo para no publicar pieza por pieza. Elegí el equipo, decinos qué necesitás y te confirmamos disponibilidad en el momento.';

    const models=[
      {
        brand:'Motorola',
        model:'Moto E20',
        search:'Motorola Moto E20 E20',
        status:'Disponible para repuestos',
        parts:'Cámaras · flex · parlantes · carcasa/tapa · botones · placa · conectores · otros',
        note:'Sin pantalla'
      },
      {
        brand:'Motorola',
        model:'E14 / G04 / G04S',
        search:'Moto E14 Motorola E14 Moto G04 Motorola G04 Moto G04S Motorola G04S',
        status:'Disponible para repuestos',
        parts:'Cámaras · flex · parlantes · carcasa/tapa · botones · placa · conectores · otros',
        note:'Consultar pieza disponible'
      }
    ];

    const normalize=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const makeCard=p=>{
      const msg=encodeURIComponent(`Hola PalaCelus 👋 Estoy buscando un repuesto para Motorola ${p.model}.\n\nPieza que necesito: ____\n\n¿Lo tenés disponible?`);
      return `<article class="pc-part-card"><div class="pc-part-visual">📱</div><div class="pc-part-body"><span class="pc-tag">🟢 ${p.status}</span><h3>Motorola ${p.model}</h3><p>Repuestos varios recuperados. Consultanos por la pieza y te confirmamos disponibilidad.</p><p class="pc-part-hints">${p.parts}</p><p style="margin:-7px 0 15px;color:#fbbf24;font-size:12px;font-weight:800">⚠️ ${p.note}</p><a class="btn primary" href="https://wa.me/5491164676844?text=${msg}" target="_blank" rel="noopener">CONSULTAR REPUESTO</a></div></article>`;
    };

    const freshSearch=search.cloneNode(true);
    const freshBrand=brand.cloneNode(true);
    search.replaceWith(freshSearch);
    brand.replaceWith(freshBrand);
    freshSearch.placeholder='Ej: E20, E14, G04, G04S...';

    const render=()=>{
      const q=normalize(freshSearch.value.trim());
      const selected=freshBrand.value;
      const filtered=models.filter(p=>{
        const haystack=normalize(`${p.brand} ${p.model} ${p.search}`);
        return(!q||haystack.includes(q))&&(selected==='all'||p.brand===selected);
      });
      grid.innerHTML=filtered.map(makeCard).join('');
      empty.classList.toggle('hidden',filtered.length!==0);
    };

    freshSearch.addEventListener('input',render);
    freshBrand.addEventListener('change',render);
    render();
    return true;
  };

  if(!init()){
    let tries=0;
    const timer=setInterval(()=>{tries++;if(init()||tries>30)clearInterval(timer);},150);
  }
})();