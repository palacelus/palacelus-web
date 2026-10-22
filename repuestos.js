(()=>{
  const init=()=>{
    const panel=document.getElementById('repuestos');
    const grid=document.getElementById('partsModelGrid');
    const search=document.getElementById('partsModelSearch');
    const brand=document.getElementById('partsBrandFilter');
    const empty=document.getElementById('partsEmptyState');
    if(!panel||!grid||!search||!brand||!empty)return false;
    if(panel.dataset.repuestosV2==='1')return true;
    panel.dataset.repuestosV2='1';

    const intro=panel.querySelector('.pc-parts-intro');
    if(intro)intro.textContent='Agrupamos los repuestos por modelo para no publicar pieza por pieza. La mayoría de los equipos disponibles para desarme no incluye pantalla. Elegí el modelo, decinos qué necesitás y te confirmamos stock en el momento.';

    search.placeholder='Ej: E14, G04, G04S...';

    const models=[{
      brand:'Motorola',
      model:'E14 / G04 / G04S',
      search:'Moto E14 Motorola E14 Moto G04 Motorola G04 Moto G04S Motorola G04S',
      status:'Disponible para repuestos'
    }];

    const normalize=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const card=p=>{
      const msg=encodeURIComponent(`Hola PalaCelus 👋 Estoy buscando un repuesto para Motorola E14 / G04 / G04S.\n\nModelo exacto: ____\nPieza que necesito: ____\n\n¿Lo tenés disponible?`);
      return `<article class="pc-part-card"><div class="pc-part-visual">📱</div><div class="pc-part-body"><span class="pc-tag">🟢 ${p.status}</span><h3>Motorola ${p.model}</h3><p>Repuestos varios recuperados. Consultanos por la pieza y te confirmamos disponibilidad.</p><p class="pc-part-hints">Cámaras · flex · parlantes · carcasa/tapa · botones · placa · conectores · otros</p><p style="margin:-7px 0 15px;color:#fbbf24;font-size:12px;font-weight:800">⚠️ Generalmente sin pantalla</p><a class="btn primary" href="https://wa.me/5491164676844?text=${msg}" target="_blank" rel="noopener">CONSULTAR REPUESTO</a></div></article>`;
    };

    const render=()=>{
      const q=normalize(search.value.trim());
      const selected=brand.value;
      const filtered=models.filter(p=>{
        const haystack=normalize(`${p.brand} ${p.model} ${p.search}`);
        return(!q||haystack.includes(q))&&(selected==='all'||p.brand===selected);
      });
      grid.innerHTML=filtered.map(card).join('');
      empty.classList.toggle('hidden',filtered.length!==0);
    };

    const freshSearch=search.cloneNode(true);
    const freshBrand=brand.cloneNode(true);
    search.replaceWith(freshSearch);
    brand.replaceWith(freshBrand);

    freshSearch.addEventListener('input',()=>{
      const q=normalize(freshSearch.value.trim());
      const selected=freshBrand.value;
      const filtered=models.filter(p=>{
        const haystack=normalize(`${p.brand} ${p.model} ${p.search}`);
        return(!q||haystack.includes(q))&&(selected==='all'||p.brand===selected);
      });
      grid.innerHTML=filtered.map(card).join('');
      empty.classList.toggle('hidden',filtered.length!==0);
    });
    freshBrand.addEventListener('change',()=>freshSearch.dispatchEvent(new Event('input')));
    freshSearch.dispatchEvent(new Event('input'));
    return true;
  };

  if(!init()){
    let tries=0;
    const timer=setInterval(()=>{tries++;if(init()||tries>30)clearInterval(timer);},150);
  }
})();