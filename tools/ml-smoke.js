#!/usr/bin/env node
/* ml-smoke — 無瀏覽器的冒煙測試：用假 Canvas 2D 逐格呼叫 renderFrame，抓 render error 與例外。
 * 用法：node tools/ml-smoke.js <subset.js> <ID,ID,...> */
const fs=require('fs');const [f,idArg]=process.argv.slice(2);
const calls={n:0,err:[]};
function ctx(){const t={canvas:null,measureText:s=>({width:String(s).length*50}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),
 createPattern:()=>({}),getImageData:(x,y,w,h)=>({data:new Uint8ClampedArray(w*h*4),width:w,height:h}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4),width:w,height:h}),
 fillText:(s)=>{calls.n++;if(/render error/.test(s))calls.err.push(s);},isPointInPath:()=>false,getTransform:()=>({a:1,d:1})};
 return new Proxy(t,{get:(o,k)=>k in o?o[k]:(typeof k==='string'&&/^[a-z]/.test(k)&&!/(Style|Width|Alpha|font|Align|Baseline|Cap|Join|Blur|Color|Offset|Operation|Limit|filter|direction)/.test(k)?(()=>{calls.n++;}):o[k]),set:(o,k,v)=>{o[k]=v;return true;}});}
function canvas(){const c={width:640,height:360,style:{},getContext:()=>{const x=ctx();x.canvas=c;return x;}};return c;}
const w={document:{createElement:()=>canvas()},devicePixelRatio:1,console};
new Function('window','document',fs.readFileSync(f,'utf8'))(w,w.document);
let fail=0;for(const id of idArg.split(',')){for(const p of [0,.13,.37,.5,.71,.95,1]){calls.err=[];try{w.MotionLib.renderFrame(canvas(),{id,text:'鉸刀林 KA-TO',colors:{primary:'#E0522B',secondary:'#141210',bg:'#ECE2CC'}},p,p*4);}catch(e){calls.err.push(e.message);}
 if(calls.err.length){fail++;console.log('FAIL',id,p,calls.err[0]);}}}
console.log(fail?'smoke FAIL':'smoke ok',idArg,'draw calls',calls.n);process.exit(fail?1:0);
