(()=>{
  const load=(src)=>{
    const s=document.createElement('script');
    s.src=src;
    s.defer=false;
    document.head.appendChild(s);
  };
  load('/script-enhancements.js?v=20261021-3');
  load('/reviews.js?v=20261021-1');
  load('/repuestos.js?v=20261021-3');
  load('/frp-multibrand.js?v=20261021-1');
})();