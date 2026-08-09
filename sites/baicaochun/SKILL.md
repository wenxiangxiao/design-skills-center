---
name: psychedelic-poster
description: San Francisco 1966-68 dance-hall poster style - lettering squeezed into hand-drawn envelopes, zero whitespace, equal-luminance vibrating inks, whiplash curves and wobbling hand-inked edges.
---

# 迷幻海報風 Psychedelic Poster

> 舊金山 Fillmore／Avalon 舞廳海報，一九六六–六八。代表人物：Wes Wilson、Victor Moscoso、Rick Griffin、Stanley Mouse & Alton Kelley（合稱 The Big Five）。
> 血緣來自新藝術（Alphonse Mucha 的鞭形曲線與滿版植物母題）與維也納分離派（Alfred Roller 一九〇二年的分離派海報字），再加上網版印刷可以印高飽和螢光油墨這件事——這三件事湊在一起才長出這個流派。
> 本 SKILL 定義風格，不綁定產業。Demo 站把它配在一間青草茶舖上，你可以配在任何地方。

---

## 一、設計哲學

**這個流派的前提是：海報不是拿來一眼看完的，是拿來停下來讀的。**

一九六六年的舊金山，海報貼在電線桿上、唱片行櫥窗上、大學佈告欄上，和幾十張別的海報擠在一起。Wes Wilson 的解法不是把字放大到最大——那是所有人都在做的事——而是反過來：**把字做到你必須停下來、走近、歪著頭才讀得出來**。停下來的那三秒鐘，就是這張海報贏過旁邊那三十張的地方。

所以這個風格的每一條規則都服務同一件事：

1. **字被形狀統治，不是形狀被字統治。** 先畫兩條手繪曲線把版位框住，字再一個一個擠進去填滿。寬處字胖、窄處字瘦，字距隨形狀變。這叫 envelope lettering，是這個流派的本體。
2. **沒有留白。** 空隙一律讓植物母題長滿。留白在這個流派裡不是呼吸，是失誤。
3. **色彩要打架。** 兩個高飽和、明度接近的顏色直接相鄰，中間不放黑線、不放陰影、不放漸層。眼睛對不準邊界，畫面就會微微振動。這是 Moscoso 從 Josef Albers 課堂上帶走的東西，然後拿去做了完全相反的用途。
4. **手是看得見的。** 這些海報是手繪原稿曬版印出來的，每一條邊都在抖。數學上的直線會立刻讓整張畫面塌掉。

**這個風格會失敗的唯一方式，是你把它做得太乾淨。**

### 可用性的底線（現代網頁的必要修正）

一九六七年的海報可以不管可讀性，二〇二六年的網站不行。本風格的紀律是：

- **熔字只用在標題與識別**（店名、頁名、單品名、印記）。正文一律用可選取、可縮放、對比 ≥4.5:1 的一般 HTML 文字。
- 每一塊熔字 SVG 都要 `role="img"` + `aria-label` 帶原文。
- 所有靠顏色傳達的狀態，另外給一個非顏色的線索（填實、圈記、文字）。

---

## 二、本風格的 5 個不可省略特徵

**拿掉任何一項，它就不是迷幻海報風了。** 這五項在 Demo 站上全部看得見。

### 特徵 1｜熔字（envelope lettering）

字被擠進上下兩條手繪曲線之間。核心做法是**逐字定寬**：先依字符權重把整條帶的寬度分給每一個字，再讓每個字用 `textLength` + `lengthAdjust="spacingAndGlyphs"` 撐滿自己那一格，垂直用 `scale(1, 包絡高/名目字高)` 拉滿，斜率用 `skewY` 跟著中線走。**不需要讀字型度量，不需要 canvas 量字，靜態就算得出來。**

```js
// 字符權重：中日韓 1.0，窄字 0.34，寬字 0.84，其餘 0.66
const CJK=/[⺀-鿿豈-﫿　-〿＀-｠]/;
const chW=c=>CJK.test(c)?1:('Il1i.·:!|'.includes(c)?.34:('MWQO@'.includes(c)?.84:.66));
const chH=c=>CJK.test(c)?86:70;   // font-size:100 時的名目視覺高
const chDy=c=>CJK.test(c)?43:35;  // 從基線到視覺中心的位移

function meltCells(text,x0,x1,top,bot){          // top/bot 各為 3 個 y 控制點
  const cs=[...text],ws=cs.map(chW),S=ws.reduce((a,b)=>a+b,0),W=x1-x0;
  let cur=0; return cs.map((c,i)=>{
    const cw=W*ws[i]/S, cx=x0+cur+cw/2, t=(cx-x0)/W;
    const tp=crom(top,t), bt=crom(bot,t), h=bt-tp;
    const e=.005, c1=(crom(top,t-e)+crom(bot,t-e))/2, c2=(crom(top,t+e)+crom(bot,t+e))/2;
    cur+=cw;
    return {c, cx, cy:(tp+bt)/2, cw, sy:h/chH(c), sk:Math.atan2(c2-c1,2*e*W)*180/Math.PI, dy:chDy(c)};
  });
}
// crom = 通過控制點的 Catmull-Rom 內插（見下）
function crom(p,t){const n=p.length-1,s=Math.min(Math.floor(t*n),n-1),u=t*n-s;
  const y0=p[Math.max(0,s-1)],y1=p[s],y2=p[s+1],y3=p[Math.min(n,s+2)];
  return .5*(2*y1+(-y0+y2)*u+(2*y0-5*y1+4*y2-y3)*u*u+(-y0+3*y1-3*y2+y3)*u*u*u);}
```

輸出成 SVG：

```html
<text textLength="118.4" lengthAdjust="spacingAndGlyphs" text-anchor="middle"
      font-size="100" y="43"
      transform="translate(214.2,148.0) skewY(-3.10) scale(1,2.014)">草</text>
```

**驗收：** 同一個字在版面左端和右端必須明顯不一樣胖。如果每個字一樣寬，你做的是「彎曲的文字」，不是熔字。

### 特徵 2｜零留白（horror vacui）

版面上不能有一塊乾淨的紙。空隙由植物母題長滿，母題要**溢出邊界**，不要對齊、不要留邊。

```js
// 抖動網格灑點：落在字帶上的格子跳過，其餘一律長一片葉子
for(let cx=0;cx<13;cx++) for(let cy=0;cy<rows;cy++){
  const x=(cx+.5+(r()-.5)*.9)*W/13, y=(cy+.5+(r()-.5)*.9)*H/rows;
  const t=(x-x0)/(x1-x0);
  if(t>=-.01&&t<=1.01 && y>crom(top,t)-pad-9 && y<crom(bot,t)+pad+9) continue;
  draw(leaf(hash(cx,cy), 20+r()*40, (cx+cy)%3?inkA:inkB, r()*360, x, y));
}
```

版面層級同樣適用——區塊之間**不要用留白分隔，用另一條藤蔓分隔**：

```css
/* 錯：section + section { margin-top: 64px } */
/* 對：兩個區塊之間塞一條滿版藤蔓橫幅，高 56–64px，preserveAspectRatio="none" */
.vs{display:block;width:100%;height:auto}
```

### 特徵 3｜等明度對振色（vibrating colour）

兩個高飽和、**相對亮度差 <0.06** 的顏色直接相鄰。中間不准出現黑線、白線、陰影、外框或漸層——那些東西的存在意義就是消除振動。

```css
@property --vib{syntax:'<number>';inherits:false;initial-value:0}
.vib{
  transition:--vib 90ms linear;               /* 需要 @property 才補得動 */
  background:color-mix(in srgb, var(--grn) calc((1 - var(--vib))*100%), var(--mag));
  color:color-mix(in srgb, var(--mag) calc((1 - var(--vib))*100%), var(--paper));
}
.vib:hover,.vib:focus-visible{--vib:1}
```

挑色檢查（sRGB 相對亮度）：`#0E6B3C` = 0.129，`#D51E6A` = 0.135 → 差 0.006，會抖。
`#0E6B3C` 對 `#F5C518` = 0.60 → 差太大，不會抖，只會刺眼。

### 特徵 4｜鞭形曲線與大致鏡射（whiplash + mirrored armature）

版面的骨是一組長 S 形曲線，左右**大致**鏡射（不是精確鏡射——精確會死板）。整張版面裡不應該存在一條水平或垂直的分隔線。

```js
// 兩個不同頻率的正弦相加 + 沿途振幅漸增，就是新藝術那條鞭子
let d='M0,0';
for(let i=1;i<=48;i++){const t=i/48;
  const y=amp*(Math.sin(ph+t*Math.PI*f1)*.72 + Math.sin(ph*1.7+t*Math.PI*f2)*.3)*(.35+t*.75);
  d+=' L'+(L*t).toFixed(1)+','+y.toFixed(1);}
```

### 特徵 5｜手抖邊（hand-inked wobble）

所有邊都在抖：字緣、色塊邊、藤蔓。用一組 `feTurbulence` + `feDisplacementMap` 一次套在整個圖層上，不要逐物件套。

```html
<filter id="wob" x="-14%" y="-22%" width="128%" height="144%">
  <feTurbulence type="fractalNoise" baseFrequency="0.021" numOctaves="3" seed="18" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="6"
                     xChannelSelector="R" yChannelSelector="G"/>
</filter>
<g filter="url(#wob)"> … 葉子、字帶、字 … </g>
```

`scale` 建議 4–8：小於 3 看不出來，大於 10 字會爛掉。大標題可以到 7，小字絕對不要套。

---

## 三、色彩系統

三色網版 + 紙色。**顏色少、飽和度高、明度接近**，這是網版的物理限制，也是這個流派的力量來源。

| 角色 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 紙 paper | `#E8D8B0` | 牛皮／甘蔗紙底色，唯一的大面積淺色 | 30% |
| 紙深階 paper2 | `#DCC894` | 拉條、次要按鈕、未選態 | 5% |
| 綠 ink-A | `#0E6B3C` | 第一版油墨：字帶、說明塊、葉子 | 27% |
| 桃紅 ink-B | `#D51E6A` | 第二版油墨：與綠對振的那一色、現用態、警告 | 24% |
| 橘 ink-C | `#F2701B` | 第三版（最薄的一版）：只給「煮出來的東西」——價錢、火、被選中的東西 | 8% |
| 墨綠 ground | `#08442A` | 紙以外的世界：頁面外底色、footer、外框線 | 5% |
| 墨 ink | `#241C10` | 只給極小的法律級文字 | 1% |

規則：

- **綠與桃紅永遠直接相鄰，中間不放任何東西。**
- 橘不得超過 10%，一旦鋪開就變成廟會而不是海報。
- 不用黑色描邊。要分隔就換一塊實心色，不要畫線。
- **不用漸層。** 網版印不出漸層（半調另當別論），漸層一出現整張就假了。
- 換色可以，但換的是**整組**：例如橘/藍紫（Moscoso 常用）、洋紅/朱（Griffin）。不要只換一色。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 熔字（拉丁） | `Titan One` | 400（本身即極粗） | 刷子寫出來的胖體，是這個流派最接近的免費替代 |
| 熔字（中日韓） | `Noto Sans TC` | 900 | 極粗黑體被擠壓後才有手寫招牌感 |
| 標題 h2/h3 | 同上（不熔） | 900 | |
| 正文 | `Noto Sans TC` | 500 | 16.5px / line-height 1.85 |
| 小標籤 | `Noto Sans TC` | 900 | 12.5px / letter-spacing .24em |

```css
:root{
  --disp:'Titan One','Noto Sans TC',sans-serif;
  --body:'Noto Sans TC','Titan One',sans-serif;
}
```

字級 scale：熔字不設字級——它的大小由包絡決定。其餘 `clamp(23px,3.4vw,34px)` / `clamp(18px,2.2vw,22px)` / 16.5px / 13.5px / 12.5px。

**不要用手寫體、不要用圓體、不要用襯線。** 迷幻海報的字不是「可愛的字」，是「被壓扁的粗黑體」。

---

## 五、版面與網格

- **沒有網格。** 有的是「帶」（band）：一條上下由手繪曲線界定的水平區域，字塞在裡面。頁面由三到六條帶疊起來，帶與帶之間用藤蔓橫幅分隔。
- 內容區最大寬 1180px，紙面左右各壓一條 16px 的雙色油墨邊（`repeating-linear-gradient`，24px 一格），手機縮到 10px。
- 紙的左右邊緣用 `clip-path` 撕開（每頁不同）：

```css
.sheet{clip-path:polygon(4.2px 0, 100% 0, …);}  /* 26 段，x 隨機 0–9px */
```

- 旋轉角度：拉條 −1.4°／+2.6°，色塊本身不旋轉（旋轉的是曲線，不是矩形）。
- 留白規則：**沒有留白規則，只有填滿規則**（見特徵 2）。唯一允許的留白是正文段落的行距。
- RWD：≤900px 拉條縮窄、字級降一階；≤560px 紙邊縮到 10px、`.pad` 固定 20px、拉條隱藏英文副標。

---

## 六、元件配方

### 導覽：拉條（tear-off tab）

電線桿廣告底下那排可撕的電話拉條。四頁＝四條，**現用頁那一條是「已經被撕下來」的**：位移下沉、反色、傾斜、上緣露出膠痕、右下壓一枚指印。

```css
.tabs{position:fixed;left:0;right:0;bottom:0;display:flex;justify-content:center;z-index:50}
.tabs .strip{width:min(23vw,168px);background:var(--paper2);color:var(--grn2);
  padding:9px 4px 12px;text-align:center;border-left:3px solid var(--grn2);
  box-shadow:0 -3px 0 var(--grn2);transform-origin:50% 0;
  transition:transform .16s cubic-bezier(.3,1.5,.5,1)}
.tabs .strip:hover{transform:translateY(5px) rotate(-1.4deg)}
.tabs .strip[aria-current]{background:var(--mag);color:var(--paper);
  transform:translateY(12px) rotate(2.6deg)}
.tabs .strip[aria-current] .glue{position:absolute;top:-9px;left:0;right:0;height:9px;
  background:repeating-linear-gradient(90deg,var(--grn2) 0 5px,transparent 5px 11px)}
```

頁尾必須另備一組純文字連結保底。

### 按鈕

```css
.btn{font-family:var(--disp);background:var(--org);color:var(--ink);border:0;
  outline:3px solid var(--grn2);outline-offset:-3px;padding:11px 20px}
.btn:hover{background:var(--mag);color:var(--paper);outline-color:var(--paper)}
```

沒有圓角、沒有陰影、沒有漸層。`outline-offset:-3px` 讓框長在色塊裡面，像網版套色沒對準。

### 卡片

```css
.chip{padding:13px 13px 15px;outline:3px solid var(--grn2);outline-offset:-3px;border:0}
```
卡片不留間距（`gap:0`），彼此邊靠邊，像海報上排在一起的貼紙。卡片內先放一張程序生成的葉子插圖，再放名稱。

### 說明塊

```css
.slab{background:var(--grn);color:var(--paper);padding:clamp(20px,3vw,34px)}
.slab.mag{background:var(--mag)}
```
正文一律放在實心色塊上，不要直接放在紙上——紙要留給字帶和藤蔓。

### 表單

`.field` 用 3px `outline` 而非 `border`，focus 時把框換成桃紅。驗證訊息用文字說明具體原因（「六帖以上要煎四個鐘頭，上午來不及」），不要只變紅框。

### Footer

墨綠底、紙色字，左邊壓一枚圓印記，右邊放全部連結。虛構聲明放在最下面。

---

## 七、動效規則

**四種，缺一不可。** 這個流派不安靜——它本來就是要在你眼睛裡動的。

| 類 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient | 灶上的湯氣 | 時間，無輸入 | 5 片煙形 `transform: translateY(30px→-104px) scale(.5→1.5)`，7s linear infinite，各延遲 1.4s；底下一層 `@property --brew` 0→1，9s ease-in-out alternate，補間 `radial-gradient` 裡的 `color-mix` |
| input-driven | 對振換色 | hover／focus | `transition:--vib 90ms linear`，延遲 <100ms |
| transition | 撕條轉場 | 點導覽 | 墨綠遮片自下而上 `translateY(100%→0)`，180ms `cubic-bezier(.5,0,.7,.4)`，上緣為鋸齒 `clip-path`；到位後才 `location.href` |
| **signature** | **熔字重排** | 拖曳／方向鍵 | 每一幀重算 `meltCells` 並寫回 `transform`／`textLength`；**無補間**（手在移動，不是動畫在播） |

簽名動效的紀律：

- 拖曳中**關掉 wobble 濾鏡**（`.dragging .wob{filter:none}`），放開才重新套上——像墨還沒乾。這也是效能保險：濾鏡不會每幀重算。
- 上下包絡至少保持 44 單位間距，否則字會被壓成一條線。
- 手機用 Pointer Events（`setPointerCapture`），鍵盤用上下方向鍵 ±7。

`prefers-reduced-motion: reduce` 的降級（資訊零損失）：

```css
@media (prefers-reduced-motion:reduce){
  .steam{animation:none;opacity:.22;transform:translateY(-38px) scale(1.15)} /* 煙停在半空 */
  .stove{animation:none;--brew:.5}                                          /* 火定在中間值 */
  .vib{transition:none}
  .vib:hover{outline:3px solid var(--ink);outline-offset:-3px}              /* 改用墨線標示 */
  .tabs .strip{transition:none}
}
```
撕條轉場在 reduced-motion 下直接跳頁。**熔字拖曳不關閉**——那是控制項，不是動畫。

---

## 八、插畫與圖像風格

技法代號 `melt-fill 熔字填隙`：**全站沒有一張描外形的插圖，也沒有一張外部圖片。** 所有圖像由兩種原語程序生成：

1. **葉**（`leafPath(seed,L)`）：由 4–8 個鋸齒節點構成的雙側曲線閉合路徑，可選一組葉脈。同一個 seed 恆得同一片葉。
2. **藤**（`vine(seed,L,amp)`）：兩個不同頻率正弦相加的折線，沿途每 5 段生一片葉。

由這兩種原語組出：藤蔓橫幅、版面填隙、卡片插圖、圓印記、logo、favicon。

```js
function leafPath(seed,L){
  const r=rng(seed), n=4+Math.floor(r()*5), wid=L*(.26+r()*.22), cur=(r()-.5)*.5;
  const pts=[]; for(let i=1;i<=n;i++){const t=i/n;
    pts.push([L*t, -wid*Math.sin(Math.PI*Math.pow(t,.72))*(1-.13*(i%2)) + cur*L*t*t]);}
  /* 上緣以 Q 串接（每節外推 L/(3n) 造出鋸齒），下緣鏡射回原點，閉合 */
}
```

圓印記（seal）：以 `FNV-1a(字串)` 決定花瓣數（8–14）與六片葉的落點，同一字串恆蓋同一枚印。用在 footer、帖印、表單回執。

**不要用**：照片、漸層網格、3D、細線線描、圖示字型、emoji。

---

## 九、Logo 與 Favicon

**Logo** 就是店名的熔字，關在一條字帶裡，兩端各一片葉，下面壓羅馬字。它不是另外設計的圖形——這個流派裡，字就是圖形。

```html
<svg viewBox="0 0 400 190">
  <rect width="400" height="190" fill="#E8D8B0"/>
  <g filter="url(#wob)">
    <path d="<bandPath(top,bot,30,370,16)>" fill="#0E6B3C"/>
    <g fill="#D51E6A"><!-- meltCells 產生的 text --></g>
    <!-- 左右各一片葉 -->
  </g>
</svg>
```

**Favicon** 用 inline SVG data URI，內容是最小可辨識單位：紙色方 + 綠圓 + 桃紅葉 + 紙色葉脈。**不要**把熔字塞進 16px，看不見。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-16 -16 32 32'%3E%3Crect x='-16' y='-16' width='32' height='32' fill='%23E8D8B0'/%3E%3Ccircle r='14' fill='%230E6B3C'/%3E%3Cpath d='M-11,4 Q-4,-13 0,-11 Q4,-13 11,4 Q0,10 -11,4Z' fill='%23D51E6A'/%3E%3Cpath d='M0,-11 L0,7' stroke='%23E8D8B0' stroke-width='2.2'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先畫包絡，再放字。永遠是這個順序。
- 每一塊空隙都問一次：這裡可以長什麼？
- 挑色之前先算相對亮度，差 <0.06 才配得起來。
- 每一頁換一組不同的撕邊與不同的藤蔓 seed。
- 熔字旁一定有可選取的正文，把資訊講清楚。

**Don't**

- ❌ 紫藍漸層 hero；本風格根本不用漸層
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ❌ emoji 當 icon（圖示一律用葉／藤原語生成）
- ❌ rounded-2xl＋模糊陰影卡片；這個流派沒有圓角也沒有陰影
- ❌ Lorem ipsum 與 AI 腔文案
- ❌ 「EST. 19xx」徽章
- ❌ 把熔字用在正文——那是耍帥，不是風格
- ❌ 在對振的兩色中間加一條白線或黑線——那等於把這個風格關掉
- ❌ 跑馬燈：這個流派的資訊是**擠**進去的，不是**捲**過去的
- ❌ 對稱置中的完美鏡射；要鏡射但要歪

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant-TW"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,…">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap">
<style>
@property --vib{syntax:'<number>';inherits:false;initial-value:0}
@property --brew{syntax:'<number>';inherits:false;initial-value:0}
:root{--paper:#E8D8B0;--paper2:#DCC894;--grn:#0E6B3C;--grn2:#08442A;
      --mag:#D51E6A;--org:#F2701B;--ink:#241C10;
      --disp:'Titan One','Noto Sans TC',sans-serif;--body:'Noto Sans TC',sans-serif}
body{background:var(--grn2);font-family:var(--body);font-weight:500;line-height:1.85}
.sheet{max-width:1180px;margin:0 auto;background:var(--paper);position:relative;
       clip-path:polygon(/* 撕邊 26 段 */)}
.sheet::before,.sheet::after{content:"";position:absolute;top:0;bottom:0;width:16px;
  background:repeating-linear-gradient(180deg,var(--grn) 0 24px,var(--mag) 24px 48px)}
.sheet::before{left:0}.sheet::after{right:0}
.pad{padding:0 clamp(26px,3.6vw,48px)}
</style></head><body>
<div class="grain" aria-hidden="true"></div>   <!-- feTurbulence 紙紋，multiply，opacity .4 -->

<main class="sheet">
  <div class="stove" aria-hidden="true">…五片湯氣…</div>          <!-- ambient -->

  <svg class="melt" viewBox="0 0 1000 300" role="img" aria-label="店名"
       data-melt='{"t":"店名","x0":36,"x1":964,"top":[56,18,50],"bot":[236,268,240],"pad":18}'>
    <defs><filter id="wob1" x="-14%" y="-22%" width="128%" height="144%">
      <feTurbulence type="fractalNoise" baseFrequency="0.021" numOctaves="3" seed="18" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
    </filter></defs>
    <g class="wob" filter="url(#wob1)">
      <!-- ① 填隙葉子 ② 字帶 path.band ③ g.cells 裡逐字 text -->
    </g>
    <g class="knobs"><!-- 六顆可拖白點 --></g>
  </svg>

  <svg class="vs" viewBox="0 0 1000 64" preserveAspectRatio="none" aria-hidden="true">…藤蔓…</svg>

  <section class="grid" style="grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:0">
    <article class="slab">…</article>
    <article class="slab mag">…</article>
  </section>

  <footer class="foot">…印記／地址／全部連結／虛構聲明…</footer>
</main>

<div class="tabhold"></div>
<nav class="tabs" aria-label="主導覽（拉條）">
  <a class="strip" href="a.html"><b>頁一</b><s>ONE</s></a>
  <a class="strip" href="b.html" aria-current="page"><span class="glue"></span><b>頁二</b><s>TWO</s><span class="thumb"></span></a>
</nav>
</body></html>
```

**建置順序建議：** ① 先在 node 裡把 `meltCells` 跑通、輸出靜態 SVG ② 再把同一份程式碼搬進頁面做拖曳重排 ③ 最後才配色與填隙。順序反過來會做出一張「彎彎的網頁」而不是一張海報。

---

## 十二、技術實作與相容性

本風格靠三項技術承載，全部查證過現況支援度。

### 1. SVG 濾鏡 `feTurbulence` + `feDisplacementMap`（承載：特徵 5 手抖邊、紙紋）

- **支援現況：** MDN 標示 **Baseline Widely available，自 2015 年 7 月起跨瀏覽器可用**（Chrome／Edge／Firefox／Safari 皆支援）。位移公式為 `P'(x,y) ← P(x + scale·(XC(x,y)−0.5), y + scale·(YC(x,y)−0.5))`。
  查證來源：MDN `<feDisplacementMap>` 與 `<feTurbulence>` 參考頁。
- **fallback：** 不支援時濾鏡整個被忽略，字帶與葉子以**乾淨邊**呈現——版面、字距、可讀性完全不變，只是少了手感。無需另寫程式。
- **效能：** 濾鏡只套在靜態圖層上；**拖曳期間以 `.dragging .wob{filter:none}` 停用**，避免每幀重算濾鏡。實測拖曳時每幀工作量為 3–9 個 `<text>` 的屬性寫入 + 一條 `path` 的 `d`，無版面重排（SVG 屬性變更不觸發 CSS layout）。
- **注意：** 濾鏡預設在 `linearRGB` 色空間運算，若要求精確色請加 `color-interpolation-filters="sRGB"`。本風格用不到（位移不改色）。

### 2. CSS `@property` 註冊自訂屬性（承載：特徵 3 對振補間、ambient 火色）

- **支援現況：** **Baseline Newly available，自 2024 年 7 月 9 日起三大引擎全支援**（web.dev 官方公告；預計 2027-01-09 進入 Widely available）。用途是給自訂屬性一個型別，讓 `<number>`／`<color>` 能被補間——沒有它，`color-mix()` 裡的百分比與 gradient 裡的顏色都補不動。
  查證來源：web.dev〈@property: Next-gen CSS variables now with universal browser support〉、MDN `@property`、caniuse `wf-registered-custom-properties`。
- **fallback：** 舊瀏覽器忽略 `@property`，`--vib` 退回未註冊的字串型自訂屬性 → 顏色**直接跳變**而非補間，`--brew` 停在 `initial` 值 → 火色固定。兩者資訊零損失，只是少了 90ms 的過渡。
- **注意：** `transition:--vib` 必須寫在有 `@property` 宣告的同一份樣式表；`inherits:false` 才不會讓整棵子樹跟著動。

### 3. SVG `textLength` + `lengthAdjust="spacingAndGlyphs"`（承載：特徵 1 熔字）

- **支援現況：** SVG 1.1 既有屬性，Chrome／Firefox／Safari／Edge 全支援；`spacingAndGlyphs` 會同時調整字距**與字身**，這正是熔字需要的「把字撐胖」。
  查證來源：MDN `textLength` 與 `lengthAdjust` 參考頁。
- **為什麼選它而不是量字：** `getComputedTextLength()` 需要字型載入完成才準，首屏會閃一次；`textLength` 是**宣告式**的——建置階段就能算完整版面並輸出靜態 SVG，**沒有 JavaScript 也看得到完整的熔字**。
- **fallback：** 若瀏覽器忽略 `textLength`，字仍會畫在正確的 x/y 上、仍有垂直縮放與斜率，只是不撐滿格子——退化成「彎曲的粗體字」，仍可讀。
- **字型度量假設：** `chH`／`chDy` 是對 `font-size:100` 的名目值（中日韓 86／43，拉丁大寫 70／35）。換字型要重調這四個數字，方法是印一個字量它的視覺高與中心。頁面另在 `document.fonts.ready` 後重跑一次 `meltCells`，吸收字型替換造成的差異。

### 效能預算實測

| 項目 | 上限 | 本 Demo 實測 |
|---|---|---|
| 單頁大小（含全部 inline 資源） | 350 KB | 64–109 KB（最大為配帖工坊 109 KB） |
| 外部請求 | 只允許 Google Fonts | 2 個（Noto Sans TC、Titan One），零圖片、零音檔、零函式庫 |
| 首屏 JS 執行 | ≤100 ms | 主要成本為 `meltCells`×2（<1 ms）與事件綁定；無版面量測、無同步 reflow |
| 主要動畫 | 60 fps | ambient 全為 `transform`／`opacity`（合成層）；拖曳每幀僅寫 SVG 屬性且停用濾鏡 |

### 已知限制

- 熔字在極窄視窗（<340px）會壓到單字寬 <14px；解法是縮短標題字數，不是縮小包絡。
- 對振效果在部分低色域螢幕與夜間模式濾鏡下會減弱——這是光學現象，無法用程式補救；文字資訊不依賴它。
- `feDisplacementMap` 的 `scale` 是像素單位，在 `viewBox` 縮放後會跟著放大；大螢幕上抖動會比小螢幕明顯。可接受（手繪本來就這樣），若要固定請改用 `filterUnits="userSpaceOnUse"`。
