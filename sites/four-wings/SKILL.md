---
name: mid-century-minimal-realism
description: Mid-century modern flat-shape illustration system where every picture is a countable list of untinted, unoutlined geometric shapes and all depth comes from multiply overlap.
---

# 中世紀現代・極簡寫實 Mid-Century Minimal Realism

> 一九五〇至六五年的美國平面設計裡有一條很硬的紀律：**把對象減到最少的形，然後停手。**
> Charley Harper 說他畫鳥的方法是「我不數羽毛，我數翅膀」（I don't count the feathers, I count the wings）。
> 這份規格書把那條紀律寫成可執行的規則。

---

## 一、設計哲學

這個流派長成這樣，是因為它的製作條件：

- **絲網印刷與有限套色**。一九五〇年代的雜誌插畫、教育出版品（Ford Times、Golden Book of Biology、國家公園手冊）與企業識別多以少數專色印刷。一塊色就是一塊版，**顏色的數量是錢**，於是設計師學會用「兩塊色疊出第三塊色」而不是再加一塊版。
- **限量動畫（limited animation）**。UPA（Gerald McBoing-Boing 1950、Mr. Magoo 1949）用一秒十二張甚至更少的張數對抗迪士尼的全動畫，做法是取消中割：動作直接從 A 格跳到 B 格。這養出了一整套「硬邊、平塗、跳格」的視覺語言。
- **戰後的科普與現代主義樂觀**。畫的目的不是抒情，是**讓人認得出來**。所以「識別特徵」優先於「像不像」。

三條可直接執行的信條：

1. **減到不能再減，然後停。**每一塊形都要能回答「拿掉它會不會少一個識別特徵」。答案是「不會」就刪掉。
2. **不畫輪廓線。**輪廓線是把形描出來的偷懶做法；本流派用**色域直接相接**與**相乘疊印**造出邊界與深度。
3. **顏色是被算出來的，不是被挑出來的。**先定五個母色，畫面上其他所有顏色都必須是它們相乘的結果。

反面：這不是扁平插畫風（flat illustration）、不是「幾何動物 icon」、也不是北歐簡約。差別在於本流派的每一塊形都**綁定一個真實的識別特徵**，而不是為了造形好看而擺的色塊。

---

## 二、本風格的 5 個不可省略特徵

> 這一章是本規格書的核心。以下五項，**拿掉任何一項就不是這個風格了**。每項附可直接複製的片段。

### 特徵 1｜極簡寫實：一個對象＝一份可數的形的清單

對象不是被描出來的，是被**列舉**出來的。先寫清單再畫圖：每一塊形記下 `{原語, 位置, 大小, 顏色, 疊序, 它代表哪一個識別特徵}`。原語只有六種：橢圓、三角、梯形、膠囊、點列、短線列。

```js
// 一份形的清單就是一張圖。順序即疊序。
const bee = [
  {k:'e', x:80,  y:118, w:52,  h:50, c:'#16302A', z:30, feat:'頭'},
  {k:'e', x:136, y:122, w:70,  h:68, c:'#16302A', z:40, feat:'胸'},
  {k:'e', x:206, y:124, w:98,  h:66, c:'#E3A62A', z:20, feat:'腹'},
  {k:'c', x:180, y:124, w:52,  h:7,  c:'#16302A', z:25, feat:'腹部斑紋', op:'multiply'},
  {k:'e', x:196, y:66,  w:102, h:30, c:'#EFE7D2', z:70, feat:'前翅',   op:'multiply', rot:-30}
];
```

**圓角規則**：`border-radius` 只有兩個合法值——`0` 或 `999px`（完整半圓）。**沒有中間值**。`8px`、`12px`、`rounded-2xl` 一律禁止，那是另一個時代的語言。

```css
.hard  { border-radius: 0; }
.pill  { border-radius: 999px; }   /* 膠囊：端點必為完整半圓 */
```

### 特徵 2｜零輪廓線、零投影、零漸層——深度來自相乘

畫面上不准出現 `stroke`、`border`（分隔用的實心色帶除外）、`box-shadow`、`filter: drop-shadow`、任何 `gradient`。兩塊色重疊時用 `mix-blend-mode: multiply` 自然生出第三色，那個第三色就是「陰影」。

```css
/* 疊印形：與底下的東西相乘。遮蓋形：不設 blend mode，直接蓋住。 */
.overlap { mix-blend-mode: multiply; }
.solid   { mix-blend-mode: normal; }
/* 若某個容器不希望與頁面底色相乘，用 isolation 切一個新的堆疊脈絡 */
.plate   { isolation: isolate; background: #2C6459; }
```

```svg
<!-- 翅膀疊在腹部上：不畫線，交界自己會出現 -->
<path d="…腹…" fill="#E3A62A"/>
<path d="…翅…" fill="#EFE7D2" style="mix-blend-mode:multiply"/>
```

**推論（很重要）**：`multiply` 是可交換的（a×b = b×a），所以**疊序只對「遮蓋形」有意義**。要讓 z-order 產生視覺後果，畫面上必須同時存在遮蓋形與疊印形兩種墨性。這條性質是本站簽名動效的物理基礎。

### 特徵 3｜灰化的有限調色盤＋一塊平塗的地色

五個母色＋一個記號色，全部**加了灰**（彩度刻意壓低），不是原色。而且**地色是一塊色，不是白紙**——白底會讓整套色系立刻塌成「現代扁平風」。

```css
:root{
  --g:#2C6459;  /* 地　鴨綠。約 38%，它是地面不是背景 */
  --b:#EFE7D2;  /* 紙　骨白。約 22%，所有長文都在這上面 */
  --h:#E3A62A;  /* 蜜　芥末。約 15%，現用態、價錢、被選中的事 */
  --k:#CE5228;  /* 警　柿橘。約 10%，拒絕、危險、不接的案子 */
  --d:#16302A;  /* 墨　深墨綠。約 12%，正文、對象的身體、頁尾 */
  --l:#8FBFAE;  /* 記號 淡青。≤3%，只給點與短線，不當面積用 */
}
```

規則三條：(a) 母色以外的顏色一律不得手寫 hex，必須由相乘產生；(b) 記號色不得當面積用；(c) 純白 `#FFF` 與純黑 `#000` 皆禁用。

### 特徵 4｜質感只用點與短線，且被外形裁掉

材質貼圖、紙紋、noise、`feTurbulence` 一律禁止——本流派是印刷平塗，沒有材質。要表達「有毛」「有絨」「有紋」，只准用**等距的圓點**與**等寬的短線**，而且它們必須被對象的外形裁掉，不得跨出邊界。

```svg
<defs>
  <clipPath id="body"><ellipse cx="136" cy="122" rx="35" ry="34"/></clipPath>
</defs>
<g clip-path="url(#body)" style="mix-blend-mode:multiply">
  <circle cx="112" cy="101" r="2.7" fill="#8FBFAE"/>
  <circle cx="119" cy="104" r="2.7" fill="#8FBFAE"/>
  <circle cx="126" cy="100" r="2.7" fill="#8FBFAE"/>
</g>
```

### 特徵 5｜幾何無襯線＋實心磚符號帶

字用幾何無襯線（Futura 家族：圓形的 O、單層的 a、幾何化的 t）。分隔線**不用細線**——用一條由實心幾何磚拼成的 Girard 式符號帶。細線 rule 是編輯排版的語言，不是這個流派的。

```css
body{ font-family:"Jost","Noto Sans TC",system-ui,sans-serif; }
.lat{ letter-spacing:.22em; text-transform:uppercase; font-weight:500; }
```

```js
// Truchet 實心磚：四種磚 × 四個旋轉，決定性亂數排一整條，永不重複也永遠接得起來
const TILES = [
  x => `<path d="M${x} 0H${x+24}V24Z"/>`,                       // 對角實心三角
  x => `<path d="M${x} 0h24a24 24 0 0 1-24 24Z"/>`,             // 四分之一圓
  x => `<circle cx="${x+12}" cy="12" r="7.2"/>`,                // 實心圓點
  x => `<path d="M${x} 0h12v24h-12Z"/>`                         // 半格實心
];
```

---

## 三、色彩系統

| 色票 | 角色 | 面積 | 只用在 |
|---|---|---|---|
| `#2C6459` 鴨綠 | 地 | ~38% | 頁面底、圖版底。它是地面，永遠有東西站在上面 |
| `#EFE7D2` 骨白 | 紙 | ~22% | 卡片、表格、所有長文的底 |
| `#E3A62A` 芥末 | 蜜 | ~15% | 現用態、價錢、被選中的事、hover |
| `#CE5228` 柿橘 | 警 | ~10% | 拒絕、危險、不接的案子、次要動作鈕 |
| `#16302A` 深墨綠 | 墨 | ~12% | 正文、對象身體、頁尾 |
| `#8FBFAE` 淡青 | 記號 | ≤3% | 點與短線的紋理，**不得當面積用** |

**相乘生出來的第三色（不要手寫，讓它自己出現）**：
芥末 × 鴨綠 → 橄欖；柿橘 × 鴨綠 → 深赭；骨白 × 鴨綠 → 灰青；芥末 × 骨白 → 淡金。
換掉地色，全站的交疊色會自己跟著換——這是本色彩系統唯一的維護方式。

**換色時的替代組合**（保持結構：一塊中明度地色 + 一塊暖紙 + 一個亮記號 + 一個警示 + 一個墨）：
磚紅地 `#A8452F` / 芥末地 `#C9922B` / 藍灰地 `#3F5A72` / 苔綠地 `#556B3C`。
禁止：白底、純黑底、任何雙色都是高彩度原色的組合。

---

## 四、字體系統

- 拉丁與數字：**Jost**（Futura 的開源後裔）400／500／700。
- 中文：**Noto Sans TC** 400／700／900。宣告順序 `"Jost","Noto Sans TC"`，讓拉丁走 Jost、中文自動落到 Noto。
- 級距（1.32 倍）：`13 / 15 / 17 / 20 / 26 / 34 / 46 / 66`。正文 17px，行高 **1.72**（平塗畫面需要空氣）。
- **標籤字**：11px、`letter-spacing:.22em`、全大寫、weight 500。這是本流派的招牌處理，用在 eyebrow、導覽英文、單位。
- 數字一律 `font-variant-numeric: tabular-nums`。
- 標題 weight 700、`line-height:1.14`、`letter-spacing:.01em`。**不要用 900 以上**——幾何無襯線一粗就變成新粗獷主義。
- 禁止：襯線體、手寫體、等寬體（等寬是工程製圖的語言）。

---

## 五、版面與網格

- 外框 `max-width:1180px`，左右 padding `clamp(18px,3vw,40px)`。
- 主要版型只有三種：`1fr 1fr`、`repeat(3,1fr)`、`1.35fr 1fr`（圖版在左、讀數在右）。
- **段落節奏**：`section` 上下 `clamp(34px,5vw,68px)`。
- **不對稱是靠內容重量做的，不是靠偏移做的**：把圖版放進較寬那一欄即可，不要旋轉、不要負 margin 裝飾。
- **零旋轉**：本流派的版面不歪。傾斜是達達與迷幻的語言。唯一允許旋轉的是圖裡的原語（翅膀、腿）。
- 分隔一律用符號帶或實心色帶（≥14px），**不用 1px 細線**。
- 響應式：≤900px 全部落成單欄、導覽攤成一列；≤560px 隱去英文副標、表格字級降到 14px。

---

## 六、元件配方

```css
/* 導覽：疊形。四頁＝四個互相重疊的實心形，現用頁那一形不透明並疊到最上層 */
nav.stack a{ position:relative; width:82px; margin-left:-22px; text-align:center }
nav.stack .sh svg{ width:82px; height:66px; mix-blend-mode:multiply }
nav.stack a[aria-current="page"]{ z-index:9 }
nav.stack a[aria-current="page"] .sh svg{ mix-blend-mode:normal }  /* 遮蓋形：疊序在此才有意義 */
nav.stack a:hover .sh{ transform:translateY(-7px) }

/* 按鈕：膠囊，hover 換成蜜色並上抬。轉場一律 steps，不用 ease */
button{ border:0; border-radius:999px; background:#EFE7D2; color:#16302A;
        padding:11px 18px; font-weight:700;
        transition:transform 100ms steps(2,jump-none), background 100ms steps(2,jump-none) }
button:hover{ background:#E3A62A; transform:translateY(-3px) }
button:disabled{ background:#8FBFAE; color:#2C6459 }

/* 卡片：直角、實心、零陰影 */
.card{ background:#EFE7D2; color:#16302A; padding:clamp(18px,2.4vw,30px); border-radius:0 }

/* 表格：只有上緣一條 2px 實線；hover 整列相乘染成蜜色 */
tbody tr td{ border-top:2px solid #2C6459 }
.card tbody tr:hover td{ background:#E3A62A; mix-blend-mode:multiply }

/* 表單：底線用 2px 實線，focus 換成柿橘，不用 outline 光暈 */
input,select{ border:0; border-bottom:2px solid #2C6459; background:transparent;
              font:inherit; padding:6px 0 }
input:focus{ border-bottom-color:#CE5228; outline:none }

/* footer：墨底，三欄，零裝飾 */
footer{ background:#16302A; color:#EFE7D2; padding:40px 0 54px }
```

**符號帶（分隔線的替代品）**：見特徵 5 的 Truchet 片段，`height:24px`，兩份並排並以 `translateX(-1536px)` 60 秒線性循環。

---

## 七、動效規則

四種動效缺一不可，全部走 `steps()`——**這個流派沒有補間**。

| 類型 | 內容 | 值 |
|---|---|---|
| ambient 環境 | 符號帶橫向平移 | `60s linear infinite`，位移 = 磚寬 × 磚數 |
| ambient 環境 | 三格振翅（UPA 有限動畫） | `.42s steps(3,jump-none) infinite`，角度 `0° / -9° / +7°` |
| input 輸入 | 按鈕、導覽形、表格列 | `100ms steps(2,jump-none)`，延遲 <100ms |
| transition 轉場 | 頁面進場五格推過 | `clip-path:inset(0 100% 0 0) → inset(0)`，`440ms steps(5,jump-end)` |
| transition 轉場 | 狀態切換橢圓擴張 | `clip-path:ellipse(6% 8%) → ellipse(150% 150%)`，`480ms steps(5,jump-end)` |
| signature 簽名 | 換種重落 stack-swap | 三格，`110ms` 一格，見下 |

```css
@keyframes beat{ 0%,100%{transform:rotate(0)} 33%{transform:rotate(-9deg)} 66%{transform:rotate(7deg)} }
[data-f="wing"]{ transform-origin:150px 92px; animation:beat .42s steps(3,jump-none) infinite }

@keyframes pageOpen{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }
main{ animation:pageOpen 440ms steps(5,jump-end) both }
```

**簽名動效 `stack-swap` 換種重落**：同一份形的清單，換一組參數與疊序，就是另一個對象。不新增、不刪除任何一塊形。因為 SVG 的 `d` 屬性不能用 CSS 補間，改用 JS 在三個時間點各重繪一次——這正好就是限量動畫的做法。

```js
function stackSwap(el, from, to, t=[0.34,0.68,1]){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ el.innerHTML=render(to); return; }
  t.forEach((k,i)=> setTimeout(()=> el.innerHTML = render(blend(from,to,k)), 110*(i+1)));
}
// blend()：數值參數線性內插，離散參數（顏色、種類、疊序）在 t=0.5 直接跳
```

**`prefers-reduced-motion` 降級（四種都要）**：符號帶停在固定位移；振翅停在第二格（不是停在 0°，停在 0° 會看起來像沒畫完）；轉場動畫全部取消並直接顯示最終狀態；`stackSwap` 一次到位。**資訊零損失**：以上任一降級後，畫面內容與可讀文字完全相同。

---

## 八、插畫與圖像風格

技法名稱：**minimal-realism stack 極簡寫實疊形**。

- 全站不得出現照片、外部圖檔、寫實描繪、細線幾何線描、半調網點、紙紋濾鏡。
- 每一張圖都必須能被拆回一份清單：用了幾塊形、每塊形叫什麼、代表哪個識別特徵。
- **判準**：把圖交給第三人，他要能數出形的數量；刪掉任何一塊，圖就掉一個識別特徵。
- 圖與圖之間的差別，優先來自**參數與疊序**，其次才是形的增減。同一份清單能長出一整個系列。
- 對象一律側面正投影，**不畫透視、不畫背景、不畫地面陰影**。
- 每一張圖要有一塊「安靜的大面積」（通常是身體），紋理只出現在其中一小塊上。

---

## 九、Logo 與 Favicon

- Logo 用同一套原語：兩組相乘的骨白橢圓（＝四片翅）＋一顆芥末實心圓＋一條膠囊色帶。
- 不用字標描邊、不用漸層、不用外框。整個 logo 必須在 32×32 仍然讀得出來。
- Favicon 用原創 inline SVG data URI 寫在 `<head>`，構成與 logo 同源、再減兩塊形。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%232C6459'/%3E%3Cg style='mix-blend-mode:multiply'%3E%3Cellipse cx='19' cy='11' rx='11' ry='4' fill='%23EFE7D2' transform='rotate(-28 19 11)'/%3E%3Cellipse cx='17' cy='16' rx='8' ry='3' fill='%23EFE7D2' transform='rotate(-4 17 16)'/%3E%3C/g%3E%3Ccircle cx='11' cy='20' r='6' fill='%23E3A62A'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先寫形的清單，再畫圖。清單寫不出來就代表還沒想清楚。
- 讓每一塊色都有一個名字與一個職務（地／紙／蜜／警／墨／記號）。
- 用相乘生出第三色，並且在文案裡老實說明這件事。
- 動效一律 `steps()`；寧可三格，不要三十格。
- 大量留白給地色，讓平塗的形有地方站。

**Don't**

- ✗ 輪廓線、`stroke`、描邊字、外框卡片
- ✗ `box-shadow`、`drop-shadow`、任何模糊
- ✗ 任何 `gradient`（含紫藍漸層 hero）
- ✗ 中間值圓角（`8px`、`rounded-2xl`）
- ✗ 白底或純黑底；純白 `#FFF`、純黑 `#000`
- ✗ 材質貼圖、紙紋、noise、`feTurbulence`
- ✗ 細線 rule 當分隔（改用實心符號帶）
- ✗ emoji 當 icon、Lorem ipsum、AI 腔文案、「EST. 19xx」徽章
- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ✗ 版面旋轉、視差、淡入式滾動揭示、跑馬燈
- ✗ 為了「可愛」而加的形。每一塊形都要能說出它代表哪個識別特徵

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
 :root{--g:#2C6459;--b:#EFE7D2;--h:#E3A62A;--k:#CE5228;--d:#16302A;--l:#8FBFAE}
 *{margin:0;padding:0;box-sizing:border-box}
 body{background:var(--g);color:var(--b);font:17px/1.72 "Jost","Noto Sans TC",sans-serif}
 .wrap{max-width:1180px;margin:0 auto;padding:0 clamp(18px,3vw,40px)}
 .sec{padding:clamp(34px,5vw,68px) 0}
 .card{background:var(--b);color:var(--d);padding:clamp(18px,2.4vw,30px);border-radius:0}
 .eyebrow{font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--l);font-weight:600}
 .grid{display:grid;gap:clamp(18px,3vw,40px)}
 .g23{grid-template-columns:1.35fr 1fr}
 @media(max-width:900px){.g23{grid-template-columns:1fr}}
 @keyframes pageOpen{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
 main{animation:pageOpen 440ms steps(5,jump-end) both}
 @media(prefers-reduced-motion:reduce){main{animation:none;clip-path:none}}
</style></head><body>

<div class="wrap">
  <div style="display:flex;justify-content:space-between;padding:22px 0 6px">
    <a href="index.html">…logo…</a>
    <nav class="stack">…四個疊形…</nav>
  </div>
</div>

<div class="gband" aria-hidden="true">…Truchet 實心磚符號帶…</div>

<main><section class="sec"><div class="wrap"><div class="grid g23">
  <div>
    <p class="eyebrow">圖版</p>
    <div style="isolation:isolate;background:var(--g)">
      <svg viewBox="6 28 278 198" role="img" aria-label="對象名稱">
        <path d="…腹…" fill="var(--h)"/>
        <path d="…胸…" fill="var(--d)"/>
        <path d="…翅…" fill="var(--b)" style="mix-blend-mode:multiply"/>
      </svg>
    </div>
  </div>
  <div>
    <p class="eyebrow">這一塊形告訴你什麼</p>
    <ul style="list-style:none">
      <li style="border-top:2px solid rgba(239,231,210,.34);padding:10px 0">
        <b style="display:block;font-size:12px;letter-spacing:.18em;color:var(--h)">形 05 ／ 翅</b>
        四片。前後翅各一對，這是膜翅目。
      </li>
    </ul>
  </div>
</div></div></section></main>

<footer style="background:var(--d);padding:40px 0 54px"><div class="wrap">…</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，皆為視覺特徵的主要承載者，不是裝飾。

### 1. `mix-blend-mode: multiply`（渲染層）— 承載特徵 2

- **它承載什麼**：全站沒有一條輪廓線與一個投影，所有邊界與深度都由兩塊平塗色相乘生出。同時它是導覽 `stack-shape`（疊序語意）與表格 hover 的底層機制。
- **支援現況（2026-08-13 查證 MDN《mix-blend-mode》）**：Baseline **Widely available**，自 **2020 年 1 月**起跨瀏覽器可用。同頁另載明本屬性會建立堆疊脈絡；與 `isolation: isolate` 併用可控制是否把容器底色算進混合。
- **實作要點**：(a) 疊印形設 `multiply`、遮蓋形不設 blend mode，兩種墨性必須同時存在，否則 z-order 不會產生任何視覺後果（multiply 可交換）；(b) 需要切斷與頁面底色的相乘時，在容器上加 `isolation:isolate`。
- **Fallback**：不支援時 `mix-blend-mode` 被忽略，疊印形變成不透明色塊直接覆蓋。畫面仍是完整的平塗構成，五個母色仍在，**所有文字與資料零損失**；損失的只有第三色。因此本站刻意不讓任何資訊只以交疊色編碼。

### 2. `steps()` 逐格動畫（動效與時間軸層）— 承載特徵 1 與簽名動效

- **它承載什麼**：這個流派的動態語言來自 UPA 的限量動畫——**取消中割**。全站每一個 `transition` 與 `animation` 的 timing function 都是 `steps()`，沒有一條 `ease`。振翅只有三格，頁面轉場只有五格，按鈕回饋只有兩格。
- **支援現況（2026-08-13 查證 MDN《steps()》）**：Baseline **Widely available**，自 **2015 年 7 月**起跨瀏覽器可用。`jump-start` / `jump-end` / `jump-both` / `jump-none` 四個關鍵字皆在同一頁記載；`jump-end` 等同舊寫法 `end`。
- **實作要點**：循環動畫（振翅）用 `jump-none`，讓第一格與最後一格都被看見；單向轉場用 `jump-end`，讓最終狀態確實落定。
- **Fallback**：`steps()` 在極舊環境不支援時退回線性補間，動作變成平滑——風格弱化，功能與資訊完全不受影響。
- **JS 端的對應實作**：SVG 的 `d` 屬性無法用 CSS 補間，因此簽名動效 `stack-swap` 以 `setTimeout` 在三個時間點各重繪一次，等價於 `steps(3)`。

### 3. Truchet 實心磚程序化圖樣（資料與生成層）— 承載特徵 5

- **它承載什麼**：Girard 式的民俗符號帶。以四種實心磚 × 四個旋轉，配 FNV-1a → mulberry32 決定性偽亂數排列，得到一條**任意長度、永不重複、但每一塊都接得起來**的分隔帶。用重複 `background-image` 做不到「不重複」，用手排做不到「任意長度」。
- **支援現況**：純 JavaScript 字串組合 + SVG 1.1 的 `<path>`／`<circle>`／`transform`，**無瀏覽器 API 依賴，無相容性缺口**。
- **實作要點**：磚一律為實心（原始的 Truchet 磚 1704 年就是黑白對分的方格），不得使用 `stroke`——用弧線描邊會直接違反特徵 2。
- **Fallback**：SVG 被停用時符號帶消失，版面高度不變（帶為固定 24px 的容器），內容不受影響。
- **決定性**：同一個 seed 恆得同一條帶，因此建置階段就能把帶烘成靜態 SVG 寫進頁內，**沒有 JavaScript 也看得到完整的符號帶**。

### 效能預算實測（2026-08-13，Node 22 單執行緒）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤350KB | index 53.5KB／wings 78.5KB／kinds 74.4KB／honey 40.6KB |
| 形引擎單次完整渲染（九塊形） | — | **0.032ms**（2000 次共 64.2ms） |
| 首屏 JS 執行 | ≤100ms | 引擎解析＋首次渲染 <5ms |
| 簽名動效 stack-swap | 60fps | 三格共 3 次渲染＝約 0.1ms，其餘時間 GPU 閒置 |
| layout thrashing | 無 | 全站零 `getBoundingClientRect`；動效只改 `transform` 與 `clip-path` |

### 可行性紀錄

- 曾考慮以 CSS 直接補間 SVG `d` 來做形變（`stack-swap`）：**不可行**，`d` 只在 `<animate>`（SMIL）或 Houdini 之下可補間，且要求路徑指令數相同。改為三格重繪，反而與「限量動畫」的流派本質一致——這是本輪「可行性優先於炫技」的落點。
- 曾考慮以 `feTurbulence` 做印刷顆粒：**主動放棄**。本流派明文禁止材質，加了會立刻變成里索或迷幻海報。

---

*本規格書隨 `sites/four-wings/` 交付。一個從未看過 Demo 的 AI，只讀本文件即可做出風格一致的全新網站。*
