#!/usr/bin/env node
/* ml-retrofit — 把 motion-library 元件補進「既有」範例站（PLAYBOOK §2.8）。
 * 用法：node tools/ml-retrofit.js <config.json> <motion-lib.js> <commit> [--dry]
 * config：{ slug, components:[{ page, id, anchor:{match, where:"before"|"after"}, box:{kind:"band"|"block", height, maxWidth, margin, rotate, align}, opts:{colors,text,duration,density,intensity,seed,loop,once,scroll,clickReplay}, role, why }] }
 * - anchor.match 必須是該頁 HTML 裡「唯一」的一段字串；容器插在它前面或後面。
 * - 每頁只注入一次子集＋runtime（</body> 前），CSS 一次（</head> 前）。重複執行會先移除舊注入。 */
const fs=require('fs'),path=require('path'),cp=require('child_process');
const [cfgPath,mlPath,commit,dry]=process.argv.slice(2);
const cfg=JSON.parse(fs.readFileSync(cfgPath,'utf8'));const dir=path.join(__dirname,'..','sites',cfg.slug);
const ids=[...new Set(cfg.components.map(c=>c.id))];
const sub=cp.execFileSync('node',[path.join(__dirname,'ml-embed.js'),mlPath,ids.join(','),commit||''],{stdio:['ignore','pipe','inherit']}).toString();
const RT=`(function(){var RM=false;try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
function ml(el,o){var cx=null;try{cx=document.createElement('canvas').getContext('2d');}catch(_){}if(!window.MotionLib||!cx){el.remove();return null;}
 var m=null,done=false;
 function sc(){if(!m)return;var b=el.getBoundingClientRect(),p=1-(b.top+b.height)/(innerHeight+b.height);m.seek(Math.max(0,Math.min(1,p)));}
 function mount(){if(m)return;m=MotionLib.mount(el,Object.assign({},o,{paused:true}));m.canvas.setAttribute('aria-hidden','true');m.canvas.removeAttribute('role');el.classList.add('ml-live');
  if(o.scroll)return sc();if(RM)return m.seek(o.once?1:.35);if(o.once&&done)return m.seek(1);m.replay();if(o.once)done=true;}
 function unmount(){if(m){m.destroy();m=null;}}
 if(o.scroll)addEventListener('scroll',sc,{passive:true});
 var go=function(){if('IntersectionObserver' in window)new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?mount():unmount();});},{rootMargin:'80px'}).observe(el);else mount();};
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(go);
 return {replay:function(){if(m&&!RM){m.replay();done=true;}}};}
[].forEach.call(document.querySelectorAll('[data-dscml]'),function(el){var o;try{o=JSON.parse(el.getAttribute('data-dscml'));}catch(e){return;}var a=ml(el,o);if(a&&o.clickReplay){el.style.cursor='pointer';el.addEventListener('click',a.replay);}});})();`;
const CSS=`.dscml{position:relative;overflow:hidden;display:block}
.dscml canvas{display:block}
.dscml-band canvas{position:absolute;left:0;top:50%;transform:translateY(-50%)}
.dscml-block{width:100%}`;
const M0='<!--dscml:start-->',M1='<!--dscml:end-->';
const strip=h=>h.replace(/<!--dscml:start-->[\s\S]*?<!--dscml:end-->/g,'').replace(/<!--dscml:c-->[\s\S]*?<!--\/dscml:c-->/g,'');
const pages=[...new Set(cfg.components.map(c=>c.page))];const report=[];
for(const pg of pages){const f=path.join(dir,pg);let h=strip(fs.readFileSync(f,'utf8'));
 for(const c of cfg.components.filter(x=>x.page===pg)){const n=h.split(c.anchor.match).length-1;if(n!==1)throw new Error(`${pg} ${c.id}: anchor 出現 ${n} 次（必須唯一）：${c.anchor.match}`);
  const b=c.box||{},st=[];if(b.kind==='band')st.push('height:'+(b.height||'72px'));if(b.maxWidth)st.push('max-width:'+b.maxWidth);if(b.margin)st.push('margin:'+b.margin);if(b.rotate)st.push('transform:rotate('+b.rotate+')');if(b.align==='right')st.push('margin-left:auto');if(b.align==='center')st.push('margin-left:auto;margin-right:auto');
  st.push('background:'+((c.opts.colors||{}).bg||'transparent'));
  const opts=Object.assign({id:c.id},c.opts);
  const el=`<!--dscml:c--><div class="dscml dscml-${b.kind||'block'}" aria-hidden="true" data-dscml='${JSON.stringify(opts).replace(/'/g,'&#39;')}' style="${st.join(';')}"></div><!--/dscml:c-->`;
  h=c.anchor.where==='before'?h.replace(c.anchor.match,el+c.anchor.match):h.replace(c.anchor.match,c.anchor.match+el);report.push(pg+' '+c.id);}
 if(!/<\/head>/.test(h)||!/<\/body>/.test(h))throw new Error(pg+' 缺 </head> 或 </body>');
 h=h.replace('</head>',`${M0}<style>${CSS}</style><noscript><style>.dscml{display:none!important}</style></noscript>${M1}</head>`);
 const i=h.lastIndexOf('</body>');h=h.slice(0,i)+`${M0}<script>\n${sub}</script>\n<script>${RT}</script>${M1}\n`+h.slice(i);
 const kb=Buffer.byteLength(h)/1024;if(kb>350)throw new Error(pg+' 超過 350KB：'+kb.toFixed(1));
 if(!dry)fs.writeFileSync(f,h);report.push(pg+' '+kb.toFixed(1)+'KB');}
const missing=fs.readdirSync(dir).filter(f=>f.endsWith('.html')&&!pages.includes(f));if(missing.length)throw new Error('這些頁沒有元件：'+missing.join(','));
console.log((dry?'[dry] ':'')+cfg.slug,ids.length+' ids',report.join(' | '));
