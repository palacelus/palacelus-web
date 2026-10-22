(()=>{
  const GOOGLE_REVIEWS='https://share.google/cJlCov9rjp5xGGMMA';

  const init=()=>{
    const hero=document.querySelector('#home .hero');
    if(!hero||document.getElementById('pc-google-review'))return !!hero;

    const style=document.createElement('style');
    style.textContent=`
      .pc-hero-with-review{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:30px;align-items:center}
      .pc-hero-copy{min-width:0}
      .pc-review-card{background:linear-gradient(160deg,#151b20,#101419);border:1px solid #303a44;border-radius:22px;padding:20px;box-shadow:0 18px 38px rgba(0,0,0,.18)}
      .pc-review-google{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:900;letter-spacing:.06em;color:#cbd5df}
      .pc-review-g{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#fff;color:#4285f4;font-size:21px;font-weight:1000;letter-spacing:-.08em}
      .pc-review-card h3{margin:14px 0 6px;font-size:22px;letter-spacing:-.025em}
      .pc-review-card>p{margin:0;color:#96a2ad;font-size:13px;line-height:1.45}
      .pc-review-stars{margin:13px 0 12px;font-size:22px;letter-spacing:3px;color:#fbbc04;white-space:nowrap}
      .pc-review-text{width:100%;min-height:78px;resize:vertical;background:#0d1216;color:#fff;border:1px solid #2b3640;border-radius:13px;padding:11px 12px;outline:none;font:inherit;font-size:13px;line-height:1.4}
      .pc-review-text:focus{border-color:#2dd4a7}
      .pc-review-actions{display:grid;gap:8px;margin-top:10px}
      .pc-review-open{width:100%;border:0;border-radius:13px;padding:12px 13px;background:#fff;color:#111827;font-weight:900;cursor:pointer}
      .pc-review-open:hover{filter:brightness(.94)}
      .pc-review-see{text-align:center;color:#98a3ae;font-size:11px;text-decoration:underline}
      .pc-review-note{min-height:16px;margin-top:8px;color:#79dfb9;font-size:11px;line-height:1.35}
      @media(max-width:900px){.pc-hero-with-review{grid-template-columns:1fr;gap:20px}.pc-review-card{max-width:520px}.pc-hero-copy{max-width:850px}}
      @media(max-width:560px){.pc-review-card{padding:17px}.pc-review-card h3{font-size:20px}.pc-review-stars{font-size:20px}}
    `;
    document.head.appendChild(style);

    const copy=document.createElement('div');
    copy.className='pc-hero-copy';
    while(hero.firstChild)copy.appendChild(hero.firstChild);
    hero.appendChild(copy);
    hero.classList.add('pc-hero-with-review');

    const card=document.createElement('aside');
    card.id='pc-google-review';
    card.className='pc-review-card';
    card.innerHTML=`
      <div class="pc-review-google"><span class="pc-review-g">G</span><span>RESEÑAS EN GOOGLE</span></div>
      <h3>¿Cómo fue tu experiencia?</h3>
      <p>Si ya compraste o reparaste con nosotros, tu opinión ayuda muchísimo a otros clientes.</p>
      <div class="pc-review-stars" aria-label="5 estrellas">★★★★★</div>
      <textarea class="pc-review-text" id="pcReviewText" placeholder="Escribí tu reseña acá..."></textarea>
      <div class="pc-review-actions">
        <button class="pc-review-open" id="pcReviewOpen" type="button">Copiar y abrir Google →</button>
        <a class="pc-review-see" href="${GOOGLE_REVIEWS}" target="_blank" rel="noopener">Ver reseñas de PalaCelus</a>
      </div>
      <div class="pc-review-note" id="pcReviewNote">Escribila acá: te copiamos el texto y abrimos Google para que la publiques.</div>`;
    hero.appendChild(card);

    const textarea=document.getElementById('pcReviewText');
    const button=document.getElementById('pcReviewOpen');
    const note=document.getElementById('pcReviewNote');
    button?.addEventListener('click',async()=>{
      const text=textarea?.value.trim()||'';
      let copied=false;
      if(text){
        try{await navigator.clipboard.writeText(text);copied=true;}catch(_){
          try{textarea.focus();textarea.select();copied=document.execCommand('copy');}catch(__){}
        }
      }
      if(note)note.textContent=text?(copied?'✓ Texto copiado. En Google elegí las estrellas, pegalo y publicalo.':'Se abre Google. Copiá el texto de arriba y pegalo en tu reseña.'):'Se abre Google para que califiques y escribas tu reseña.';
      window.open(GOOGLE_REVIEWS,'_blank','noopener');
    });
    return true;
  };

  if(!init()){
    let tries=0;
    const timer=setInterval(()=>{tries++;if(init()||tries>20)clearInterval(timer);},150);
  }
})();
