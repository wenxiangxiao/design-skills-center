---
name: thai-temple-gold-lacquer
description: Thai temple gold-lacquer (lai rot nam) — two-value gold-leaf-on-black-lacquer ornament built from the kranok flame grammar, with orpiment-resist yellow and vermilion as the working and second grounds, mirror-glass as the only specular.
---

# 泰式廟宇金漆 ลายรดน้ำ — 風格規格書

## 一、設計哲學

**這個風格的圖像不是畫出來的，是洗出來的。**

`ลายปิดทองรดน้ำ`（lai pit thong rot nam，常簡稱 `ลายรดน้ำ`）字面就是做法：「貼上金箔、用水沖出來的紋」。黑漆打底，用雌黃 `หรดาล`（orpiment，一種黃色礦物）調的膠液把**不要金的地方**整片塗掉，整面貼滿金箔，隔約二十小時沖水——膠化開，蓋在膠上的金隨水走；沒塗到的地方，金留下。

這個工序決定了三件事，是整套風格的地基：

1. **只有兩個值。** 有金，或沒金。沒有半金、沒有漸層金、沒有金色陰影。做這個風格的網頁如果出現金屬漸層或發光的金，那就不是這個風格了。
2. **金是大面積的漏地，不是描邊。** 裝飾區的金覆蓋率通常在 55–75%。把金當成細線去勾，會做成別的東西（多半會變成 Art Deco）。
3. **紋不能改。** 沖水只有一次，錯了整塊重來。所以紋在下筆前就已經照文法排好了——這套文法就是 `ลายไทย`，而其中的動詞是 `กระหนก`。

年代與地域：大城朝（Ayutthaya）十七至十八世紀中為巔峰，吞武里、拉達那哥欣延續至今；最完整的例子在寺院的經櫃 `ตู้พระธรรม` 門板、殿門、窗扇上。

**不要和這些混淆：** 這不是 Art Deco（Deco 的金是細線、對稱、幾何，地是深藍或黑但金只佔幾個百分比）；不是日本蒔繪（蒔繪的金是撒粉，有明暗與景深）；不是「奢華風」（沒有玫瑰金、沒有柔光、沒有大理石）。

---

## 二、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」。

### 特徵 I — 兩個值：有金／沒金

金只有一個主色值 `#C8983A` 與一個亮面值 `#E8C26A`，不做由深到淺的金屬漸層。允許的唯一變化是**沿一個方向緩慢移動的極低對比光帶**（模擬整面金箔的反光），而且它必須是週期性、全域的，不是綁在某個元素上的高光。

```css
:root{
  --rak:#0B0705;        /* 漆黑：唯一的地 */
  --thong:#C8983A;      /* 金箔 */
  --thong-hi:#E8C26A;   /* 金箔亮面（只用在光帶與細節） */
}
/* 禁止：background:linear-gradient(#E8C26A,#8A6A22) 這種「金屬條」 */
/* 允許：整面同一個金，配一條會慢慢走過去的光帶 */
```

```svg
<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0.35">
  <stop offset="0"   stop-color="#A9791F"/>
  <stop offset=".42" stop-color="#E8C26A"/>
  <stop offset=".58" stop-color="#F6E0A6"/>
  <stop offset="1"   stop-color="#A9791F"/>
  <animateTransform attributeName="gradientTransform" type="translate"
    values="-1.1 0;1.1 0;-1.1 0" dur="17s" repeatCount="indefinite"/>
</linearGradient>
```

### 特徵 II — กระหนก 的文法：右三角骨架、等分的齒、同向的尖

`กระหนก`（Kranok；寫成 `กนก` kanok 時意思是「金」，梵語字根 kra-nok 是「刺」）是泰國寺院九成以上裝飾的根。四條規矩，缺一就不像：

1. **骨架是直角三角形。** 脊線從直角走到尖。一列紋裡，**所有三角的尖必須同向**——這是最容易破的一條（把兩支紋鏡射對放，會立刻變成一座拱門，不是泰國紋）。
2. **外廓要被缺口等分。** 缺口開在外廓（背）那一側，等距。
3. **齒 `หยัก` 就是小的 กระหนก。** 每一顆齒不是三角刺，是一支縮小的同形紋——所以這個文法是遞迴的。
4. **尖 `ยอด` 最重要。** 舊譜原話：身形比例再好，尖太強，整支就毀了。尖要比身體收得快。

以下是可以直接複製的產生器（本站全部金飾都由它產出；同一顆種子同一塊板）：

```js
function KR(){
 var F=v=>Math.round(v*10)/10;
 function SP(x,y,L,a0,h,N,T){                 // 對數螺線脊：轉角後載（POW 1.8）＝先直後捲
  var D=.95,P=1.8,s0=L*(1-D)/(1-Math.pow(D,N)),cx=x,cy=y,p=[[x,y]];
  for(var i=0;i<N;i++){var t=(i+.5)/N,a=a0+h*T*Math.pow(t,P),s=s0*Math.pow(D,i);
   cx+=Math.cos(a)*s;cy+=Math.sin(a)*s;p.push([cx,cy]);} return p;}
 function TG(sp){return sp.map(function(p,i){var o=sp[Math.max(i-1,0)],q=sp[Math.min(i+1,sp.length-1)],
   dx=q[0]-o[0],dy=q[1]-o[1],l=Math.hypot(dx,dy)||1;return[dx/l,dy/l];});}
 function BODY(x,y,L,a0,h,T){                 // 背 0.62 / 腹 0.38：不對稱是重點
  var N=L>55?24:13,W=L*.225,w=t=>W*Math.pow(1-t,1.45);
  var sp=SP(x,y,L,a0,h,N,T),tg=TG(sp),bk=[],be=[];
  for(var i=0;i<sp.length;i++){var t=i/(sp.length-1),p=sp[i],Tv=tg[i],nx=-Tv[1],ny=Tv[0],ww=w(t);
   bk.push([p[0]-nx*h*ww*.62,p[1]-ny*h*ww*.62]);be.push([p[0]+nx*h*ww*.38,p[1]+ny*h*ww*.38]);}
  var d='M'+F(be[0][0])+' '+F(be[0][1])+'L'+F(bk[0][0])+' '+F(bk[0][1]);
  for(i=1;i<bk.length;i++){var pv=bk[i-1],cu=bk[i];
   d+='Q'+F(pv[0])+' '+F(pv[1])+' '+F((pv[0]+cu[0])/2)+' '+F((pv[1]+cu[1])/2);}
  var tp=sp[sp.length-1];d+='L'+F(tp[0])+' '+F(tp[1]);
  for(i=be.length-1;i>0;i--){cu=be[i];pv=be[i-1];
   d+='Q'+F(cu[0])+' '+F(cu[1])+' '+F((cu[0]+pv[0])/2)+' '+F((cu[1]+pv[1])/2);}
  return {d:d+'Z',sp:sp,tg:tg,bk:bk};}
 function KRANOK(x,y,L,a0,h,depth,out){       // 齒＝遞迴的小 กระหนก
  var b=BODY(x,y,L,a0,h,depth>=2?2.0:2.3);out.push(b.d);
  if(depth<=0||L<13)return out;
  var nb=depth>=2?5:3;
  for(var k=0;k<nb;k++){var t=.12+.70*(nb===1?.5:k/(nb-1)),i=Math.round(t*(b.sp.length-1));
   var Tv=b.tg[i],ta=Math.atan2(Tv[1],Tv[0]);
   var bx=b.sp[i][0]*.35+b.bk[i][0]*.65,by=b.sp[i][1]*.35+b.bk[i][1]*.65;
   KRANOK(bx,by,L*.36*(1-t*.45),ta-h*.72,h,depth-1,out);}   // 0.72 rad：子紋要「順著走」不是垂直岔出
  return out;}
 return {BODY:BODY,KRANOK:KRANOK,TG:TG};
}
// 用法：var out=[]; KR().KRANOK(0, 0, 160, -Math.PI/2+0.10, 1, 2, out);
//       out.map(d=>`<path d="${d}"/>`).join('')  → 填 var(--thong)
```

**調參紅線：** 主體 `TURN` 2.0 rad（約 115°）、`POW` 1.8。轉角超過 2.6 rad 會捲成拱門；`POW` 小於 1.2 會從底部就開始彎，變成珊瑚或鹿角。子紋出射角 `0.72 rad` 是「順著走」，加到 1.2 以上會變成鹿角。

### 特徵 III — 雙地系統：漆黑地 ＋ 硃地，雌黃是工序色

**不是「深色底＋金點綴」。** 地有兩個：漆黑 `รัก` 是常態地，硃 `ชาด` 是「現用的／還熱的」那一個（當前頁、當前狀態、當前那一道縫）。雌黃 `หรดาล` 是第三個角色——它不是配色，它是**工序中途才會看到的顏色**，只用在「還沒完成」的狀態（草稿線、未完成的紋、進行中的步驟）。

```css
:root{
  --rak:#0B0705;   --rak2:#150E09;  --rak3:#1E140C;   /* 漆黑三階：唯一的暗面層次 */
  --chat:#8E2116;  --chat-hi:#C3402B;                 /* 硃：現用／還熱 */
  --horadan:#C2B23C;                                  /* 雌黃：未完成 */
  --ink:#E9DCC0;   --ink-dim:#9A8A6C;                 /* 字：象牙，不是白 */
}
.nav-item.current{
  background:linear-gradient(180deg,rgba(142,33,22,.55),rgba(142,33,22,.12));
  border-bottom:2px solid var(--chat-hi);   /* 硃只在這裡用滿 */
}
.draft path{ fill:#2A2318; stroke:var(--horadan); stroke-width:1.3; }  /* 未完成 */
```

### 特徵 IV — 金是啞的，只有鏡片會閃

金箔本身**不反光成一條線**，它的表面只是不勻。唯一允許出現硬高光的是 `กระจกเกรียบ`——手切的彩色玻璃碎鏡，斜切面才吃得到光。綠、孔雀藍、銀三色為主，紅色只留給最中心一片。

```svg
<!-- 金箔：用 alpha 當 bump map，低角度點光源，做「不勻」不是「反光條」 -->
<filter id="leaf" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.62 0.78" numOctaves="3" seed="7" result="g"/>
  <feSpecularLighting in="g" surfaceScale="2.1" specularConstant="0.62"
                      specularExponent="18" lighting-color="#FFF3D2" result="s">
    <fePointLight x="160" y="-120" z="150"/>
  </feSpecularLighting>
  <feComposite in="s" in2="SourceAlpha" operator="in" result="si"/>
  <feComposite in="si" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0.88" k4="0"/>
</filter>

<!-- 鏡片：高 specularExponent（34）＝小而硬的閃點 -->
<filter id="glass" x="-14%" y="-14%" width="128%" height="128%" color-interpolation-filters="sRGB">
  <feTurbulence type="turbulence" baseFrequency="0.09" numOctaves="1" seed="10" result="g"/>
  <feSpecularLighting in="g" surfaceScale="4.4" specularConstant="1.25"
                      specularExponent="34" lighting-color="#EAFBFF" result="s">
    <fePointLight x="40" y="-60" z="70"/>
  </feSpecularLighting>
  <feComposite in="s" in2="SourceAlpha" operator="in" result="si"/>
  <feComposite in="si" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
</filter>

<!-- 一片鏡：等腰三角，錯相閃爍（SMIL） -->
<g filter="url(#glass)" transform="translate(54 52) rotate(15)">
  <path d="M0 -7L6.4 5.2L-6.4 5.2Z" fill="#1E4A46"/>
  <path d="M0 -7L6.4 5.2L-6.4 5.2Z" fill="#F4E6BC" opacity=".14">
    <animate attributeName="opacity" values=".10;.92;.18;.10"
             keyTimes="0;.14;.4;1" dur="5.6s" begin="0.6s" repeatCount="indefinite"/>
  </path>
</g>
```

### 特徵 V — 雙線框與同向紋帶，零圓角零陰影

每一塊面都被「粗線 3px ＋ 細線 1.2px」的雙框圍住（經櫃門板的漆邊），區段之間用 2px 實線分隔，底部或側邊壓一條**同向**的 `กระหนก` 帶。全站沒有一個圓角、沒有一個模糊陰影。

```css
.panel{ border:2px solid var(--thong-dim); border-radius:0; box-shadow:none; }
.sec{ border-top:2px solid var(--thong-dim); margin-top:64px; padding-top:26px; }
```

```svg
<path d="M22 22h596v426H22Z" fill="none" stroke="var(--thong)" stroke-width="3"/>
<path d="M31 31h578v408H31Z" fill="none" stroke="var(--thong)" stroke-width="1.2"/>
<!-- 帶：全部同一個 hand、同一個 lean，不要鏡射對放 -->
```

---

## 三、色彩系統

| 色票 | 名 | 用途 | 佔比 |
|---|---|---|---|
| `#0B0705` | รัก 漆黑 | 全站主地 | 60–70% |
| `#150E09` / `#1E140C` | 漆黑二階／三階 | 區塊分層、hover | 8% |
| `#C8983A` | ทองคำเปลว 金箔 | 全部裝飾、標題、框線 | 15–22% |
| `#E8C26A` | 金箔亮面 | 光帶、連結、強調字 | 4% |
| `#8E2116` / `#C3402B` | ชาด 硃 | 現用頁、還熱的那一道、編號 | 3–5% |
| `#C2B23C` | หรดาล 雌黃 | 未完成狀態、草稿線、工序中 | ≤3% |
| `#1E4A46` `#2E6B86` `#3C6E5C` | กระจกเกรียบ 鏡片 | 碎鏡三角（唯一高光來源） | ≤1% |
| `#E9DCC0` / `#9A8A6C` | 象牙字／弱字 | 內文 | — |

**規則：** 白色 `#FFF` 不得作為文字或面積色（漆器上沒有白）。純黑 `#000` 也不用——漆黑是帶褐的。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 用途 |
|---|---|---|---|
| 顯示／編號 | `Chonburi`（Google Fonts，泰＋拉丁楔形襯線） | 400 | 標題、泰數字 ๐–๙、標籤 |
| 泰文內文 | `Noto Serif Thai` | 400 / 700 | 泰文名稱、工序名 |
| 中文內文 | `Noto Serif TC` | 400 / 600 | 主要內文 |

```html
<link href="https://fonts.googleapis.com/css2?family=Chonburi&family=Noto+Serif+TC:wght@400;600&family=Noto+Serif+Thai:wght@400;700&display=swap" rel="stylesheet">
```

字級 scale（16px 基準）：`11 / 13 / 14 / 16 / 19 / 25 / clamp(25,3.6vw,40)`。行高：內文 **1.85**（泰文有上下標記，行距不能省）、標題 1.25。字距：拉丁與標籤 `.12–.34em`，中文 `.01em`。

**泰數字必用。** 章節編號、日期、時刻、道次一律用 ๐๑๒๓๔๕๖๗๘๙——這是這個風格最便宜也最有效的一招。價格用阿拉伯數字（要能比價）。

---

## 五、版面與網格

- **左側固定金漆直帶** `--band:76px`：`position:fixed`，內含一列**同向**的 `กระหนก`（`rotate(90)`），右邊界 2px 金線。`body{padding-left:var(--band)}`。≤560px 時 `--band:0` 並隱藏。
- **內容不置中**：`max-width:1080px; padding:0 30px`，靠左，右側留白。段落 `max-width:64ch`。
- **區段**：`border-top:2px` ＋ 泰數字編號 ＋ 標題（中文大字／泰文小字副標）。區段間距 64px。
- **旋轉**：本風格不用傾斜版面。紋樣本身就是曲線，版面必須是正的（漆盤是方的）。
- **留白即黑漆**：大面積的黑不是「空」，是地。不要急著填。

---

## 六、元件配方

### 導覽（缽口箍型）
```html
<nav class="rim"><div class="rim-in">
  <a class="rim-mark" href="…"><span class="n">๑</span><span class="t">ชื่อ</span><span class="s">說明</span></a>
  <span class="rim-mark on"><span class="n">๒</span>…</span>
</div></nav>
```
```css
.rim{position:sticky;top:0;background:var(--rak);border-bottom:2px solid var(--thong-dim)}
.rim-in{display:flex;min-height:66px}
.rim-mark{flex:1;padding:9px 14px;border-left:1px solid rgba(200,152,58,.26)}
.rim-mark.on{background:linear-gradient(180deg,rgba(142,33,22,.55),rgba(142,33,22,.12))}
.rim-mark.on::after{content:"";position:absolute;inset:auto 0 -2px 0;height:2px;background:var(--chat-hi)}
```

### 連結（反色，不是變色）
```css
a{color:var(--thong-hi);border-bottom:1px solid rgba(200,152,58,.42);text-decoration:none}
a:hover{color:var(--rak);background:var(--thong-hi);border-bottom-color:var(--thong-hi)}
```

### 按鈕（漆盤上的一格，不是藥丸）
```css
button{background:var(--rak2);color:var(--ink);border:none;border-radius:0;padding:11px 13px;text-align:left}
.bar{display:flex;gap:2px;background:var(--thong-dim)}  /* gap 露出的金線就是分隔 */
button:hover:not(:disabled){background:var(--rak3)}
button:disabled{opacity:.34}
```

### 表格（漆邊細線）
```css
table{border-collapse:collapse}
th{color:var(--thong);font-weight:400;font-size:13px;letter-spacing:.12em;border-bottom:2px solid var(--thong-dim)}
td{border-bottom:1px solid rgba(200,152,58,.24);padding:9px 12px}
td.num{font-family:"Chonburi",serif;color:var(--thong-hi)}
```

### 步驟列（工序）
```css
.steps li{counter-increment:s;display:grid;grid-template-columns:54px 1fr;gap:16px;
  padding:15px 0;border-top:1px solid rgba(200,152,58,.24)}
.steps li::before{content:"๐" counter(s);font-family:"Chonburi",serif;color:var(--chat-hi)}
```

### Footer
黑漆二階底、2px 金線分隔、`repeat(auto-fit,minmax(220px,1fr))` 四欄，最後一段小字說明虛構範圍與建置模型。

---

## 七、動效規則（四種，缺一不可）

全部用 **SVG SMIL** 驅動，不需要動畫 JS。

| 種類 | 做法 | duration / easing |
|---|---|---|
| **ambient 環境** | 鏡片錯相閃爍 `<animate attributeName="opacity" values=".10;.92;.18;.10" keyTimes="0;.14;.4;1">`；金面光帶 `<animateTransform attributeName="gradientTransform">` | 5.6s / 17s，`repeatCount="indefinite"`，每片 `begin` 錯開 0.6s |
| **input-driven 輸入** | hover／focus 時長出一支小 กระหนก：`<animateTransform type="scale" from="0.02" to="0.40" begin="el.mouseover;el.focusin" fill="freeze">`，離開時反向 | 進 0.30s `keySplines=".16 .8 .3 1"`；出 0.22s。**必須同時綁 `focusin`／`focusout`**，鍵盤要看得到 |
| **transition 轉場** | 貼金：`<mask>` 內一個白 `<rect>` 的 `width` 由 0 長到滿，遮罩內容套靜態 `feTurbulence→feDisplacementMap`（`scale="17"`）＝金箔的撕邊 | 0.78s，`keySplines=".35 0 .18 1"` |
| **signature 簽名** | **รดน้ำ 沖水顯金**：`<mask>` 內「整面白 ＋ 一個由上往下長高的黑 `<rect>`」，黑 rect 套 `feTurbulence`（`baseFrequency="0.014 0.09"`，`scale="26"`）＝水痕；同步一條硃色濕邊 `<animateTransform type="translate">` 跟著水線走 | 2.5s，`keySplines=".32 0 .24 1"` |

**本風格的自我限制：** 不用淡入、不用滾動視差、不用 `stroke-dashoffset` 描繪。紋不是被畫出來的，是被洗出來的——用描繪動畫等於把工序講錯了。

**`prefers-reduced-motion` 降級（資訊零損失）：**
```js
var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (RM) {
  leafRect.setAttribute('width','760');   // 貼金：直接滿
  washRect.setAttribute('height','580');  // 沖水：直接洗完
  lip.classList.add('hid');               // 濕邊不出現
  svgRoot.pauseAnimations();              // 停掉 ambient（SVGSVGElement 標準方法）
}
```
四種動效降級後畫面仍停在同一個最終狀態，文字敘述照常。

---

## 八、插畫與圖像風格

**技法代號：`resist-and-leaf` 漏地貼金構成。** 三條原語：

1. **所有圖像只有兩個值。** 金或漆。沒有灰階、沒有描邊、沒有網點。需要層次時用**形的疏密**，不是明暗。
2. **所有裝飾由同一支 `KRANOK()` 產生。** 角花、帶、中心花 `ประจำยาม`、邊欄，全部是同一個母題的不同尺度與 depth。零外部圖片。
3. **同向。** 一條帶上的所有紋同一個 `hand`、同一個 lean。要對稱，只在真正的中軸上鏡射一次（中心花、門板），而且中間必須有一個東西坐鎮（`ประจำยาม` 或一支莖）。

母題詞彙（`แม่ลาย`）：`กระหนก` 火焰紋／`ตัวเหงา` 捲首／`หยัก` 齒／`ก้าน`(`ก้านขด`) 莖／`ใบเทศ` 葉／`ยอด` 尖／`ประจำยาม` 四瓣方框花／`พุ่มข้าวบิณฑ์` 米堆花。

**連續莖的做法（本站接紋檯用的）：** 維護一條密取樣的折線當莖，每加一節就把折線延長 8 個子步（方向左右交替 `±0.34–0.52 rad`），整條莖用一個 `RIB(pts, W, 1.3)` 的錐形帶重畫；裝飾紋掛在每一節起點的背側。這樣莖永遠是連續的，不會變成一疊各自為政的鉤子。

---

## 九、Logo 與 Favicon

**Logo**（正方，`assets/logo.svg`）：黑漆地、雙線框、中央一個主體物件（本站是缽），物件上方左右各長出一支**向外捲**的 `กระหนก`（左邊那支是右邊那支的 `scale(-1,1)`——這是唯一允許的鏡射）。金與硃兩色，零文字。

**Favicon**（原創 inline SVG data URI，寫在 `<head>`）：
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230B0705'/%3E%3Ccircle cx='16' cy='16' r='11' fill='none' stroke='%23C8983A' stroke-width='2.4'/%3E%3Cg stroke='%238E2116' stroke-width='1.3'%3E%3Cpath d='M16 5v22M5 16h22M8.2 8.2l15.6 15.6M23.8 8.2L8.2 23.8'/%3E%3C/g%3E%3Ccircle cx='16' cy='16' r='2.6' fill='%23C8983A'/%3E%3C/svg%3E">
```
16px 下要能看出「黑底、金圈、放射線」三件事，細節一律砍掉。

---

## 十、Do & Don't

**Do**
- 金當面積用（裝飾區覆蓋 55–75%），不要只當描邊。
- 一列紋的尖同向。
- 泰數字 ๐–๙ 用在編號、道次、時刻。
- 硃只給「現用的那一個」，用滿一點才有力。
- 雌黃只給「還沒完成的」。
- 內文行高 1.85 起跳（泰文需要）。
- 大面積留黑——那是漆，不是空白。

**Don't（含去 AI 化禁令）**
- ❌ 金屬漸層、發光金、金色 `box-shadow`、`filter:drop-shadow`。
- ❌ 圓角。一個都不要。
- ❌ 兩支紋鏡射對放形成拱門（會變成馬蹄鐵，不是泰國紋）。
- ❌ 把 `กระหนก` 的轉角開到 2.6 rad 以上（捲成拱門）或子紋出射角開到 1.2 rad 以上（變成鹿角）。
- ❌ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片。
- ❌ emoji 當 icon（圖示一律由 `KRANOK()` 或手繪 SVG 產生）。
- ❌ 淡入／滾動視差／`stroke-dashoffset` 描繪當主要動效。
- ❌ Lorem ipsum、AI 腔、「EST. 19xx」徽章。
- ❌ 純白 `#FFF` 與純黑 `#000`。
- ❌ 把這個風格做成 Art Deco（細金線、扇形、對稱幾何、深藍地）。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Chonburi&family=Noto+Serif+TC:wght@400;600&family=Noto+Serif+Thai:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--rak:#0B0705;--rak2:#150E09;--rak3:#1E140C;--thong:#C8983A;--thong-hi:#E8C26A;
 --thong-dim:#8E6C28;--horadan:#C2B23C;--chat:#8E2116;--chat-hi:#C3402B;
 --ink:#E9DCC0;--ink-dim:#9A8A6C;--band:76px}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--rak);color:var(--ink);font-family:"Noto Serif TC","Noto Serif Thai",serif;
 font-size:16px;line-height:1.85;padding-left:var(--band)}
.dp{font-family:"Chonburi",serif}
@media(max-width:560px){:root{--band:0px}.rail{display:none}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style></head><body>
<a class="skip" href="#main">跳至內容</a>

<!-- 左側金漆直帶：一列同向 กระหนก -->
<div class="rail" aria-hidden="true"><svg viewBox="0 0 120 1400" preserveAspectRatio="xMidYMin slice">
  <g fill="var(--thong-dim)"><!-- <g transform="translate(60,N) rotate(90) scale(.62)">…KRANOK…</g> × n --></g>
</svg></div>

<!-- 缽口箍導覽 -->
<nav class="rim"><div class="rim-in">…</div></nav>

<main id="main">
 <!-- 首屏：一個徑向／單物件的開場，不是大標＋按鈕列 -->
 <section class="open">…</section>
 <div class="wrap">
  <section class="sec"><div class="num">๑</div>
   <h2>中文標題<span class="sub th">ชื่อภาษาไทย</span></h2>
   <p class="lead">…</p>
  </section>
 </div>
</main>

<footer>…（含虛構聲明與建置模型）</footer>
</body></html>
```

---

## 十二、技術實作與相容性

### (a) 所用 API 的支援現況與查證來源

| 技術 | 現況 | 查證來源（2026-09-17 查閱） |
|---|---|---|
| **SVG SMIL**（`<animate>` / `<animateTransform>` / `begin="el.mouseover"`） | **全球可用率 97.03%**。Chrome 5+、Edge 79+、Firefox 4+、Safari 6+、Opera 9+、Samsung Internet 4+、Chrome for Android、Safari on iOS 6+。不支援：IE 全系列、Opera Mini。Chrome 45 曾宣告棄用，**該棄用已被撤回**，現行版本持續出貨。 | [caniuse.com/svg-smil](https://caniuse.com/svg-smil)（Global usage 97.03%，StatCounter 2026-08 資料）；[MDN — SVG animation with SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL) |
| **`feSpecularLighting` + `fePointLight`** | **Baseline Widely available**——「已跨瀏覽器可用，自 2015 年 7 月起」。 | [MDN — `<feSpecularLighting>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting)（頁面 Baseline 標示）；[MDN — `<feSpotLight>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpotLight) |
| **`feTurbulence` + `feDisplacementMap`** | SVG 1.1 濾鏡原語，與上表同批，Baseline Widely available（2015-07）。 | 同上 MDN 濾鏡原語系列 |
| **SVG `<mask>` ＋ 對遮罩內容套 `filter`** | SVG 1.1 核心，全瀏覽器可用。本站只動遮罩**幾何**（`width`／`height`），濾鏡本身是靜態的——這是刻意的：避免每幀重跑濾鏡。 | MDN `<mask>` / `mask` 屬性 |

**未使用的東西也記一筆：** 沒有用 `mask-composite`、`@property`、View Transitions、Houdini Paint、CSS 三角函數——本館最近六站已經用過那些，而且這個風格不需要。

### (b) 不支援時的 fallback 具體行為

| 情境 | 行為 |
|---|---|
| **SMIL 不支援**（Opera Mini、IE） | 所有 `<animate>` 被忽略，元素停在**基底屬性值**。設計上把基底值設成「最終有意義的狀態」：金面光帶 = 靜態金（`<linearGradient>` 的 stops 本身就是完整的金）、鏡片 = `opacity=".14"` 的靜態微光、hover 生長的小紋 = `scale(0.02)`（等於不出現，不影響資訊）。示範盤與接紋檯的貼金／沖水改由 JS 直接 `setAttribute('width','760')` / `setAttribute('height','580')` 一步到位——**沒有任何資訊只存在於動畫中**。 |
| **SVG 濾鏡不支援／被關閉** | `filter` 屬性被忽略，金面退成平塗 `url(#sheen)` 的金、鏡片退成平塗三角、水線與金箔邊退成直線。畫面仍是「金在黑漆上」，特徵 I／II／III／V 完全不受影響，只失去特徵 IV 的質感。 |
| **JavaScript 關閉** | 每一頁的首屏、全部工序文字、價目表、文法說明、母題詞彙表都是靜態 HTML。示範盤（`laai.html`）預設就渲染**沖完水的成品**；接紋檯（`tolaai.html`）預設渲染師傅接好的一支金紋，互動列以 `class="hid"` 隱藏（由 JS 移除）。沒有內容被鎖在 JS 後面。 |
| **`prefers-reduced-motion: reduce`** | 見第七節。四種動效全部跳到最終狀態，並呼叫 `svgRoot.pauseAnimations()` 停掉 ambient。資訊零損失。 |
| **`getBBox()` 不可用／拋錯** | 接紋檯的自動置中（`fit()`）以 `try/catch` 包住，失敗就不套 transform，紋照樣畫在原座標。 |

### (c) 效能預算實測值

| 頁 | 單檔大小（含全部 inline 資源） | 說明 |
|---|---|---|
| `index.html` | ~95 KB | 首屏缽 SVG ＋ 左欄紋 ＋ 兩個濾鏡 |
| `bat.html` | ~47 KB | 最輕：主要是表格與步驟列 |
| `laai.html` | ~241 KB | 最重：示範盤的紋樣路徑資料出現兩次（`mask` 一次、雌黃層一次） |
| `tolaai.html` | ~67 KB | 紋由 runtime 產生，不進 HTML |

全部 **≤350 KB** 硬門檻內。外部資源只有 Google Fonts，零外部圖片、零音檔、零 JS 函式庫。

**執行成本：**
- 首屏 JS：`index.html` 與 `bat.html` **0 bytes JS**（所有動效都是 SMIL）。`laai.html` 約 2 KB、`tolaai.html` 約 4 KB（含產生器），初始化只做 DOM 查詢與事件綁定，遠低於 100ms。
- 動畫成本：濾鏡全部是**靜態的**——`feSpecularLighting` 只在元素首次光柵化時算一次，之後動的是 `<mask>` 幾何與合成，走 GPU 合成路徑，60fps。**絕對不要去 animate `baseFrequency` 或 `fePointLight` 的座標**，那會讓濾鏡每幀重算，在大面積上直接掉到 10–20fps。
- 路徑資料精度取到**小數一位**、脊線取樣 `N=24`（大）／`13`（小）。取到兩位、`N=34` 會讓路徑資料翻倍而肉眼看不出差別。
- 無 layout thrashing：`fit()` 的 `getBBox()` 讀取被 `setTimeout` 排到動畫結束之後，不與寫入交錯。

### (d) 給接手 AI 的最短路徑

1. 貼上第二節的 `KR()` 產生器，先 `KRANOK(0,0,160,-Math.PI/2+0.1,1,2,out)` 產一支，填 `#C8983A` 放在 `#0B0705` 上——**先確認這一支看起來對**，再往下做。
2. 照第三節鋪色、第四節上字（泰數字一定要用）。
3. 用第五節的骨架排版，第六節配元件。
4. 四種動效照第七節裝齊，SMIL 寫在標記裡。
5. 最後遮掉全部文字看首屏：**三秒內看得出「黑漆上的泰國金紋」，才算完成。**
