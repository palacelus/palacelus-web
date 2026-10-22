(()=>{
  const legacy=document.createElement('script');
  legacy.src='/script-old.js?v=20261021';
  legacy.onload=()=>{
    const style=document.createElement('style');
    style.textContent=`
      .pc-used-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.pc-used-card{display:grid;grid-template-columns:minmax(220px,.9fr) 1.1fr;background:#12171c;border:1px solid #2a343e;border-radius:24px;overflow:hidden}.pc-used-media{position:relative;min-height:360px;background:radial-gradient(circle at 50% 20%,rgba(59,130,246,.18),transparent 42%),#0e1318;display:grid;place-items:center;padding:24px}.pc-used-media img{width:100%;max-width:360px;max-height:340px;object-fit:contain;border-radius:18px}.pc-used-fallback{display:none;width:180px;height:280px;border:2px solid #33506d;border-radius:28px;place-items:center;font-size:64px;background:linear-gradient(160deg,#17263a,#0f1722)}.pc-photo-note{position:absolute;left:14px;bottom:12px;background:rgba(8,12,16,.82);border:1px solid #2e3943;border-radius:999px;padding:7px 10px;font-size:10px;color:#b7c2cc}.pc-used-info{padding:24px}.pc-used-info h3{font-size:28px;margin:6px 0 8px;letter-spacing:-.03em}.pc-used-info p{color:#9ca8b3;line-height:1.45}.pc-specs{display:flex;flex-wrap:wrap;gap:8px;margin:17px 0}.pc-specs span{border:1px solid #2b3741;background:#0f151a;border-radius:999px;padding:8px 10px;font-size:12px;color:#c5d0d9}.pc-used-price{font-size:24px;font-weight:900;margin:18px 0}.pc-used-actions{display:flex;gap:10px;flex-wrap:wrap}.pc-used-actions .btn{flex:1 1 180px}.pc-parts-intro{margin-bottom:16px;padding:15px 17px;border:1px solid #26323d;background:#0f151a;border-radius:16px;color:#9ca8b3;line-height:1.45}.pc-parts-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.pc-part-card{background:#12171c;border:1px solid #252e37;border-radius:20px;overflow:hidden}.pc-part-visual{height:150px;display:grid;place-items:center;font-size:58px;background:radial-gradient(circle at 50% 20%,rgba(45,212,167,.12),transparent 48%),#0e1317}.pc-part-body{padding:18px}.pc-part-body h3{margin:8px 0 7px;font-size:22px}.pc-part-body p{color:#99a5af;line-height:1.45;margin:0}.pc-part-hints{font-size:12px!important;margin:12px 0 16px!important;color:#7f8b96!important}.quick-card.reacondicionados{background:linear-gradient(160deg,#172338,#101722);border-color:#31527d}.pc-tag{display:inline-flex;align-items:center;border-radius:999px;padding:6px 9px;font-size:11px;font-weight:900;background:#17392f;color:#7ff0ca}.pc-tag.blue{background:#172b46;color:#9ec8ff}.pc-tag.gold{background:#3d2f12;color:#ffd36a}
      @media(max-width:850px){.pc-used-grid{grid-template-columns:1fr}.pc-used-card{grid-template-columns:1fr}.pc-parts-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pc-used-media{min-height:320px}}
      @media(max-width:560px){.pc-parts-grid{grid-template-columns:1fr}.pc-used-media{min-height:290px;padding:18px}.pc-used-info{padding:19px}.pc-used-info h3{font-size:24px}}
    `;
    document.head.appendChild(style);

    const homeText=document.querySelector('#home .hero p');
    if(homeText)homeText.textContent='Celulares nuevos y reacondicionados, repuestos por modelo, reparaciones, software y servicios. Elegí qué necesitás y entrá directo.';

    const quickGrid=document.querySelector('#home .quick-grid');
    const oldPartsCard=document.querySelector('[data-go="repuestos"]');
    if(oldPartsCard){
      oldPartsCard.innerHTML='<div class="icon">🧩</div><h3>Repuestos por modelo</h3><p>Buscá el equipo y consultá la pieza que necesitás.</p>';
    }

    if(quickGrid&&!document.getElementById('reacondicionados-link')){
      const usedCard=document.createElement('button');
      usedCard.id='reacondicionados-link';
      usedCard.className='quick-card reacondicionados';
      usedCard.dataset.go='reacondicionados';
      usedCard.innerHTML='<div class="icon">♻️</div><h3>Reacondicionados</h3><p>Equipos revisados, probados y listos para usar.</p>';
      usedCard.addEventListener('click',e=>{e.preventDefault();goTo('reacondicionados')});
      const newPhones=document.getElementById('catalogo-celulares-link');
      if(newPhones?.nextSibling)quickGrid.insertBefore(usedCard,newPhones.nextSibling);else quickGrid.prepend(usedCard);
    }

    if(!document.getElementById('reacondicionados')){
      const section=document.createElement('section');
      section.id='reacondicionados';
      section.className='panel';
      const wa=encodeURIComponent('Hola PalaCelus 👋 Quiero consultar por el Samsung Galaxy A21s 64GB azul reacondicionado.');
      section.innerHTML=`
        <div class="container">
          <div class="panel-head"><div><div class="eyebrow">EQUIPOS REVISADOS</div><h2>Celulares reacondicionados</h2><p>Equipos probados por PalaCelus, listos para usar.</p></div><button class="back" type="button">← Inicio</button></div>
          <div class="pc-used-grid">
            <article class="pc-used-card">
              <div class="pc-used-media">
                <img src="https://ak-asset.jarir.com/akeneo-prod/asset/m1images/5/4/549642.jpg" alt="Samsung Galaxy A21s azul - imagen de referencia" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
                <div class="pc-used-fallback">📱</div>
                <div class="pc-photo-note">Imagen de referencia · color azul</div>
              </div>
              <div class="pc-used-info">
                <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pc-tag">♻️ Reacondicionado</span><span class="pc-tag blue">🔓 Libre de fábrica</span><span class="pc-tag gold">⭐ Muy buen estado</span></div>
                <h3>Samsung Galaxy A21s</h3>
                <p>Equipo revisado y probado por PalaCelus. Ideal para quien busca un teléfono funcional, cuidado y listo para usar.</p>
                <div class="pc-specs"><span>💾 64 GB</span><span>🎨 Azul</span><span>✅ Funcionamiento verificado</span><span>🛡️ Garantía PalaCelus</span></div>
                <div class="pc-used-price">Precio: consultar</div>
                <div class="pc-used-actions"><a class="btn primary" href="https://wa.me/5491164676844?text=${wa}" target="_blank" rel="noopener">RESERVAR EQUIPO</a></div>
              </div>
            </article>
          </div>
        </div>`;
      document.querySelector('main')?.appendChild(section);
      section.querySelector('.back')?.addEventListener('click',()=>goTo('home'));
    }

    const partsPanel=document.getElementById('repuestos');
    if(partsPanel){
      partsPanel.innerHTML=`
        <div class="container">
          <div class="panel-head"><div><div class="eyebrow">REPUESTOS ORIGINALES RECUPERADOS</div><h2>Repuestos por modelo</h2><p>Buscá el modelo del equipo y consultanos por la pieza que necesitás.</p></div><button class="back" type="button">← Inicio</button></div>
          <div class="pc-parts-intro">En vez de publicar pieza por pieza, agrupamos los repuestos por el modelo del teléfono del que provienen. Elegí el equipo, decinos qué necesitás y te confirmamos disponibilidad en el momento.</div>
          <div class="controls"><input id="partsModelSearch" type="search" placeholder="Ej: Moto E20, A12, Redmi 9..."><select id="partsBrandFilter"><option value="all">Todas las marcas</option><option>Motorola</option><option>Samsung</option><option>Apple</option><option>Xiaomi</option></select></div>
          <div id="partsModelGrid" class="pc-parts-grid"></div>
          <div id="partsEmptyState" class="empty-state hidden"><h3>No encontramos ese modelo</h3><p>Escribinos igual: puede que haya ingresado y todavía no esté cargado.</p><a class="btn primary" href="https://wa.me/5491164676844?text=Hola%20PalaCelus%2C%20estoy%20buscando%20un%20repuesto%20para%20el%20modelo%3A%20____" target="_blank" rel="noopener">Consultar por WhatsApp</a></div>
        </div>`;
      partsPanel.querySelector('.back')?.addEventListener('click',()=>goTo('home'));

      const partsModels=[{brand:'Motorola',model:'Moto E20',status:'Disponible para repuestos'}];
      const pGrid=document.getElementById('partsModelGrid');
      const pSearch=document.getElementById('partsModelSearch');
      const pBrand=document.getElementById('partsBrandFilter');
      const pEmpty=document.getElementById('partsEmptyState');
      const norm=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      const partCard=p=>{
        const msg=encodeURIComponent(`Hola PalaCelus 👋 Estoy buscando un repuesto para ${p.brand} ${p.model}.\n\nNecesito: ____\n\n¿Lo tenés disponible?`);
        return `<article class="pc-part-card"><div class="pc-part-visual">📱</div><div class="pc-part-body"><span class="pc-tag">🟢 ${p.status}</span><h3>${p.brand} ${p.model}</h3><p>Consultá por la pieza que necesitás y te confirmamos si sigue disponible.</p><p class="pc-part-hints">Pantalla · cámara · flex · parlante · carcasa · botones · placa · otros</p><a class="btn primary" href="https://wa.me/5491164676844?text=${msg}" target="_blank" rel="noopener">CONSULTAR REPUESTO</a></div></article>`;
      };
      const renderParts=()=>{
        const q=norm(pSearch?.value.trim());
        const brand=pBrand?.value||'all';
        const filtered=partsModels.filter(p=>(!q||norm(`${p.brand} ${p.model}`).includes(q))&&(brand==='all'||p.brand===brand));
        if(pGrid)pGrid.innerHTML=filtered.map(partCard).join('');
        pEmpty?.classList.toggle('hidden',filtered.length!==0);
      };
      pSearch?.addEventListener('input',renderParts);
      pBrand?.addEventListener('change',renderParts);
      renderParts();
    }

    const current=location.hash.replace('#','');
    if(current==='reacondicionados')goTo('reacondicionados');
  };
  legacy.onerror=()=>console.error('No se pudo cargar la base del sitio.');
  document.head.appendChild(legacy);
})();