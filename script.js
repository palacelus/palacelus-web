(()=>{
  const load=(src,onload)=>{
    const s=document.createElement('script');
    s.src=src;
    s.defer=false;
    if(onload)s.onload=onload;
    document.head.appendChild(s);
  };

  load('/script-enhancements.js?v=20261022-1',()=>{
    load('/repuestos.js?v=20261022-1');
    load('/frp-multibrand.js?v=20261022-2');
  });
})();