#!/usr/bin/env node
/* ml-embed — 從 motion-library 的 src/motion-lib.js 抽出「引擎核心＋指定元件」，產生可 inline 進單檔 HTML 的子集。
 * 用法：node tools/ml-embed.js <motion-lib.js> <ID,ID,...> [commit] > subset.js
 * 規則見 PLAYBOOK §2.8。只允許 BG-A／BG-B／TXT-A／TXT-B／SHP；TEL／TRN 會畫示範場景（REC、SCENE A/B），禁止嵌入。 */
const fs=require('fs');
const [src,idArg,commit='']=process.argv.slice(2);
if(!src||!idArg){console.error('usage: ml-embed.js <motion-lib.js> <ID,ID> [commit]');process.exit(2);}
const code=fs.readFileSync(src,'utf8');
const ids=idArg.split(',').map(s=>s.trim()).filter(Boolean);
const bad=ids.filter(i=>/^(TEL|TRN)-/.test(i));if(bad.length){console.error('禁止嵌入 TEL／TRN（會畫示範場景）：'+bad.join(','));process.exit(3);}
// 以完整原始碼取得 ID→名稱
global.window={};new Function('window',code)(global.window);const ML=global.window.MotionLib;
const names=new Set();for(const id of ids){const it=ML.byId[id];if(!it){console.error('查無元件 '+id);process.exit(4);}if(it.pending){console.error(id+' 為待核對佔位');process.exit(5);}names.add(it.name);}
// 逐行過濾五張對照表（BG/TX/SH/TL/TR）的條目：條目以「兩格縮排＋'名稱':」開頭，到下一條目或「};」為止
const lines=code.split('\n'),out=[];let inMap=false,keep=true;
for(const l of lines){
 if(/^const (BG|TX|SH|TL|TR) = \{/.test(l)){inMap=true;keep=true;out.push(l);continue;}
 if(inMap&&/^\};/.test(l)){inMap=false;out.push(l);continue;}
 if(inMap){const m=l.match(/^  '([^']+)':/)||l.match(/^  (_\w+):/);if(m)keep=m[1].startsWith('_')||names.has(m[1]);if(keep)out.push(l);continue;}
 out.push(l);}
let sub=out.join('\n').replace(/^\/\*![\s\S]*?\*\//,'');
// 去掉行首縮排與純註解行以省空間（不動字串內容）
sub=sub.split('\n').filter(l=>!/^\s*\/\/[^'"`]*$/.test(l)).map(l=>l.replace(/^\s+/,'')).join('\n');
const head=`/* motion-library ${ML.version}${commit?' @'+commit:''} 子集：${ids.join(', ')}（tools/ml-embed.js 產生，勿手改） */\n`;
// 驗證：子集仍能載入、指定元件都在
const w2={};new Function('window',sub)(w2);for(const id of ids){if(!w2.MotionLib.byId[id])throw new Error('子集缺 '+id);}
process.stdout.write(head+sub+'\n');
console.error('ok',ids.join(','),(Buffer.byteLength(head+sub)/1024).toFixed(1)+'KB');
