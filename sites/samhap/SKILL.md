---
name: patchwork-quilt
description: American patchwork quilt style — Amish solid-colour blocks on a deep ground, visible seam ridges, woven cloth texture on every surface, hand-piecing error, and an independent running-stitch quilting grid over everything.
---

# 拼布被 American Patchwork Quilt

> 阿米什素面被（Amish solid quilt, Lancaster / Holmes County, 1870s–1940s）＋ Gee’s Bend 即興拼布。
> 這不是「幾何色塊風」。幾何色塊拿掉裝飾還是幾何色塊；這個風格拿掉織紋、縫份與壓線，就變成荷蘭風格派。
> 差別全在那五件事上。

---

## 一、設計哲學

拼布被是一個**被規範逼出來的視覺系統**。阿米什教規禁止印花布、禁止具象圖案、禁止炫耀，於是留給做被人的只剩三件事：**素色、幾何、針法**。因為不能用圖案，顏色只好一整塊一整塊地放；因為顏色一整塊會悶，底色只好壓到很深，讓上面的素色跳出來；因為不能有裝飾，唯一的表現餘地就跑到針上——一吋十針的壓線，走一套跟拼接完全無關的紋路。

同時，這個風格的每一個決定都有**成本**。一塊布只有那麼大；一塊版只能縫直線；一吋十針就是一吋十針，快不了。所以做這個風格的網站時，設計決策要看得見它的代價：多一個顏色就是多一塊布，多一道接縫就是多一道工。**畫面上不該出現「不用付出任何代價就存在的東西」**——沒有裝飾線、沒有陰影效果、沒有為了好看而加的圓角。

Gee’s Bend 補上另一半：那裡的被子用穿破的工作服拼成，所以布的來歷本身就是內容——**一床被裡有幾個人的衣服，就有幾個人的年份**。整齊不是目標，「一眼看得出是店裡買的」才是失敗。

三個口訣：

1. **沒有背景。** 畫面上每一塊都是一塊布，包括最大那塊。地色不是背景色，它是「地」這個角色用掉的那件衣服。
2. **每一條邊都是一道縫。** 兩塊顏色不是靠邊框分開的，是靠一道有厚度、有倒向、有針腳的縫接起來的。
3. **針要看得見。** 壓線是這個風格唯一被允許的裝飾，而它同時是結構——它把三層縫成一件。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1｜每一塊都是布，不是色塊（織紋）

任何一塊有顏色的區域，底下都必須有**經緯**。四種織法各有脾氣：平織（兩面一樣）、斜紋（看得出斜向紋路）、燈芯絨（縱向絨溝）、針織（線圈）。拿掉織紋，這個風格立刻塌成 De Stijl。

```css
/* 平織：經線與緯線交錯，明暗各一組 */
.cloth{position:relative;background:#A8243A}
.cloth::after{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8"%3E%3Cg fill="%23fff" fill-opacity=".07"%3E%3Crect width="4" height="8"/%3E%3Crect y="4" width="8" height="4"/%3E%3C/g%3E%3Cg fill="%23000" fill-opacity=".13"%3E%3Crect x="4" width="4" height="8"/%3E%3Crect width="8" height="4"/%3E%3C/g%3E%3C/svg%3E')}
/* 斜紋：45° 一明一暗兩組線，錯開約 0.4 個間距 */
.cloth.twill::after{background-image:url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8"%3E%3Cpath d="M-2 6L6 -2M2 10L10 2" stroke="%23fff" stroke-opacity=".10" stroke-width="2.2" fill="none"/%3E%3Cpath d="M0 8L8 0M4 12L12 4" stroke="%23000" stroke-opacity=".16" stroke-width="1.6" fill="none"/%3E%3C/svg%3E')}
```

強度規則：白線 opacity 0.05–0.10、黑線 0.12–0.18，**永遠不要超過 0.2**——超過就變成條紋圖案，不是布了。織紋的格距在 3–4px（螢幕上約等於實際布的 40 支紗）。

### 特徵 2｜縫份有厚度（接縫是稜，不是線）

兩塊布相接處不是一條分隔線，是一條**稜**：縫份被燙倒向其中一邊，那一邊的布被墊高約 1mm，光一打就分得出來。所以每一道接縫都是「一條亮線＋一條暗線」，而且**兩條線的順序表示縫份倒向哪一邊**。

```css
/* 一道縫：亮在上、暗在下 = 縫份倒向下方那一塊 */
.seam{position:absolute;left:0;right:0;height:1.5px;
  background:rgba(255,255,255,.30);box-shadow:0 1.5px 0 rgba(0,0,0,.58)}
.seam.rev{background:rgba(0,0,0,.58);box-shadow:0 1.5px 0 rgba(255,255,255,.30)}
```

SVG 版（一次畫完整床被的全部接縫）：把每一塊的輪廓畫三遍，暗的往右下位移、亮的往左上位移、針腳畫在正中間。

```html
<defs><g id="seams"><path d="…每一塊的輪廓…"/></g></defs>
<use href="#seams" style="stroke:rgba(0,0,0,.55);stroke-width:.9;transform:translate(.45px,.45px)"/>
<use href="#seams" style="stroke:rgba(255,255,255,.20);stroke-width:.9;transform:translate(-.45px,-.45px)"/>
<use href="#seams" style="stroke:rgba(232,226,212,.62);stroke-width:.45;stroke-dasharray:1.4 1.9"/>
```

### 特徵 3｜手的誤差要留著

每一塊的每一個頂點都要有 **±0.5 個單位（約 ±1mm 實尺）**的偏移，用決定性亂數產生（同一床被永遠長一樣）。相鄰兩塊因此不會完全密合，會露出一絲底色——那正是手縫被面的樣子。**角對得完美的那床，不是手做的。**

```js
var jit = pts.map(p => [p[0]+(rnd()-0.5)*1.05, p[1]+(rnd()-0.5)*1.05]);
```

同時：整床被在版面上要**歪 0.4°–0.8°**（它是掛著的，不是貼上去的），文字紙標歪 0.6°–0.9°，導覽的布片歪 1.5°。**不要讓任何東西正好是 0°，也不要超過 3°**——超過就變成手作風的刻板印象。

### 特徵 4｜壓線是第二層線（跨過所有接縫）

壓線（quilting）與拼接（piecing）是**兩套完全獨立的線**。拼接的縫決定圖案，壓線的針決定這床被會不會散。壓線走菱格（9 公分一格，45°）、貝殼紋或羽毛紋，**它一定跨過接縫**，不會沿著接縫走。針距：手縫一吋 10 針（`stroke-dasharray:1.4 2.0`），機縫一吋 6 針（`2.6 1.2`）。

```html
<g style="stroke:rgba(232,226,212,.28);stroke-width:.5;stroke-dasharray:1.5 2.1;fill:none">
  <path d="M-210 0L0 210 M-199 0L11 210 …"/>  <!-- 45° -->
  <path d="M-210 210L0 0 M-199 210L11 0 …"/>  <!-- 135° -->
</g>
```

### 特徵 5｜深素底配高彩素面（阿米什規則）

深色地佔畫面 40% 以上，且**地色永遠有織紋**（它不是「背景色」，它是布）。素色一律**平塗、無漸層、無印花、無外框描邊**——兩塊顏色靠縫接起來，不是靠 border 隔開。強調色最多兩個，其餘顏色都是布的顏色。

```css
:root{
  --ink:#14161F;   /* 墨黑：頁底與最深的布，約 40% */
  --field:#1A1E2B; --field2:#232A3E;
  --paper:#E8E2D4; /* 生成棉：所有文字與紙標 */
  --red:#A8243A; --teal:#2E9C8A; --must:#C9922B;
  --lav:#9A7FB0;  --slate:#52708C; --brick:#B4562A; --moss:#4A5F35;
}
*{border-radius:0!important}       /* 布沒有圓角 */
.card{box-shadow:4px 4px 0 rgba(0,0,0,.6)}  /* 陰影一律實心位移，不准模糊 */
```

---

## 三、色彩系統

| 角色 | 色票 | 面積 | 用途 |
|---|---|---|---|
| 墨黑（地） | `#14161F` | ~40% | 頁底、最深的布、footer。**必須帶織紋**，不能是純黑 |
| 深靛（次地） | `#1A1E2B` / `#232A3E` | ~14% | 分區、卡片底、導覽布片 |
| 生成棉白 | `#E8E2D4` | ~12% | 所有正文、紙標（`.paper` 反白區塊） |
| 茜紅 | `#A8243A` | ≤8% | 布色；退件與警告 |
| 芥黃 | `#C9922B` | ≤8% | **唯一的現用態與連結色**；布色 |
| 亮鴨綠 | `#2E9C8A` | ≤6% | 布色；肯定語意 |
| 藕紫 `#9A7FB0`／灰藍 `#52708C`／磚橘 `#B4562A`／苔綠 `#4A5F35`／深赭 `#6E3B2A` | | 各 ≤5% | 布色，永不當 UI 色 |

規則：

- **UI 色與布色分開。**芥黃是唯一同時擔任 UI 的顏色。布色只能出現在「一塊布」上，不能拿去當按鈕底或連結色。
- **零漸層。**唯一允許的「漸層」是接縫的一亮一暗兩條實線。
- **零外框描邊。**兩塊顏色相接必須是縫（亮線＋暗線），不能是 `border`。
- 淺色（明度 ≥ 60）在整床被裡不得超過一個角色，否則深底就撐不住了。

---

## 四、字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;800&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
```

| 用途 | 字體 | 字重 | 大小 |
|---|---|---|---|
| 標題 | Noto Serif TC | 900 | `clamp(25px,3.7vw,40px)`，line-height 1.28，letter-spacing .015em |
| 段落 | Noto Serif TC | 400 | 16.5px / line-height **1.88**（被子是慢的，行距要鬆） |
| 小標與標籤 | Noto Serif TC | 700 | 13.5–17px |
| 數字、編號、尺寸、金額 | **Bitter**（slab serif） | 400/600 | `font-variant-numeric:tabular-nums` |

不要用手寫體、不要用圓體、不要用任何有「溫馨手作」聯想的字。阿米什的美學是**樸素**不是**可愛**：字要老實、有骨、不修飾。標題不加字距擴張、不加陰影、不做描邊。

---

## 五、版面與網格

- 內容寬 1140px，左右 padding 26px（≤560px 時 16px）。
- **不對稱**：主要區塊用 `1.15fr .85fr` 或 `1.2fr .8fr`，不要 50/50。
- **一律用 1px 實線分格，不留空白通道**——布跟布之間只有縫，沒有間隙。`gap:1px;background:var(--hair)` 是這個風格的分隔手法（格線就是縫）。
- 旋轉角度：被 ±0.4–0.8°、紙標 ±0.6–0.9°、導覽布片 −1.5°。
- 被面本身固定 `aspect-ratio:180/210`（六尺×七尺）。

### subgrid：接縫要跨塊對齊

拼布的十字接縫必須對齊，否則一眼看得出來。卡片列表也一樣：每張卡片內部的每一條橫線都要落在整個版面的同一條線上。

```css
.cat{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));
  border-top:1px solid var(--hair);border-left:1px solid var(--hair)}
.cat>li{grid-row:span 6;display:grid;grid-template-rows:subgrid;
  border-right:1px solid var(--hair);border-bottom:1px solid var(--hair)}
.cat>li>*{border-bottom:1px solid rgba(232,226,212,.10)}
@supports not (grid-template-rows:subgrid){
  .cat>li{grid-row:auto;grid-template-rows:auto}
}
```

---

## 六、元件配方

### 導覽：疏縫與正縫（basted vs. sewn）

現用頁那一片**已經被縫上去了**（不歪、不浮、有縫份稜線、針腳密）；其餘幾片只用大針距**疏縫**別著（歪 1.5°、浮起 2px、實心位移陰影、虛線大針腳、上緣一根別針）。語意是「固定的程度」，不是位置或高亮。

```css
.nav a{position:relative;width:74px;height:56px;padding:8px 9px;background:#232A3E;color:#E8E2D4;
  transform:rotate(-1.5deg) translateY(-2px);box-shadow:3px 3px 0 rgba(0,0,0,.6)}
.nav a::before{content:"";position:absolute;inset:4px;--sd:5px;--sc:rgba(232,226,212,.42);
  background-image:
    repeating-linear-gradient(90deg,var(--sc) 0 var(--sd),transparent var(--sd) calc(var(--sd)*2)),
    repeating-linear-gradient(90deg,var(--sc) 0 var(--sd),transparent var(--sd) calc(var(--sd)*2)),
    repeating-linear-gradient(0deg,var(--sc) 0 var(--sd),transparent var(--sd) calc(var(--sd)*2)),
    repeating-linear-gradient(0deg,var(--sc) 0 var(--sd),transparent var(--sd) calc(var(--sd)*2));
  background-size:100% 1px,100% 1px,1px 100%,1px 100%;
  background-position:0 0,0 100%,0 0,100% 0;background-repeat:no-repeat}
.nav a::after{content:"";position:absolute;top:-6px;left:16px;width:2px;height:15px;
  background:#C9C0A9;transform:rotate(20deg)}                    /* 別針 */
.nav a[aria-current=page]{transform:none;background:#C9922B;color:#14161F;
  box-shadow:inset 1.5px 1.5px 0 rgba(255,255,255,.42),inset -1.5px -1.5px 0 rgba(0,0,0,.42)}
.nav a[aria-current=page]::after{display:none}                    /* 別針拔掉了 */
.nav a[aria-current=page]::before{--sd:2.2px;--sc:rgba(20,22,31,.62);inset:5px}  /* 針腳變密 */
```

`--sd` 就是針距，這是這個風格唯一需要的「狀態變數」：**5px = 疏縫（暫時）、2.2px = 正縫（固定）**。

### 按鈕

```css
.btn{padding:13px 22px;background:#C9922B;color:#14161F;border:0;font-weight:700;
  box-shadow:4px 4px 0 rgba(0,0,0,.6)}
.btn:active{transform:translate(3px,3px);box-shadow:1px 1px 0 rgba(0,0,0,.6)}
.btn[disabled]{background:#232A3E;color:#C9C0A9;box-shadow:none}
```

### 紙標（.paper）

深底上的一切長文都印在「紙」上，不印在「布」上。

```css
.paper{background:#E8E2D4;color:#14161F;padding:22px 24px;
  box-shadow:5px 5px 0 rgba(0,0,0,.45);transform:rotate(.7deg)}
```

### 表單

輸入框深底、1px 生成白細框、focus 用芥黃 2px outline。錯誤訊息用茜紅，且**必須說出理由與怎麼改**（見 Do & Don’t）。

### footer

深靛 `#1A1E2B` 通欄，三欄 `1.4fr 1fr 1fr`，字級 14.5px。

---

## 七、動效規則（四式，缺一不可）

| 類型 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient | **棉絮浮塵** | 無需輸入 | 15 顆 1.6–5px 的白絮，`animation-duration` 38–92s linear infinite，往上飄並帶 ±38px 橫移；`animation-delay` 全部為負值，載入時已在半空中 |
| input | **布塊來歷／縫份倒向** | hover、pointer | <100ms。hover 布塊：接縫稜線反向（亮暗互換），代表縫份倒到另一邊；hover 導覽布片：拉出 2px、多歪 1.1° |
| transition | **疏縫→正縫** | 進頁 | 區塊由 `translateY(-3px) rotate(-.75deg)` 落定，同時外圈的疏縫虛線（`--sd:6px`）以 `steps(7)` 淡出、正縫顯露。480ms，`.e2/.e3/.e4` 各延遲 100ms |
| signature | **斜紋走形 bias-stretch** | 拖曳 | 見下 |

### 簽名動效：斜紋走形（bias stretch）

布只有兩個方向是老實的。沿**經或緯**（0°／90°）拖，它不變形；沿**斜向**（45°／135°）拖，整塊被拉成菱形，鬆手**只回彈七成**，而且歪掉的織紋永遠留著（`localStorage`）。

變形量的核心是 `sin(2θ)`：在經緯方向為 0，在正斜向為 ±1。

```js
el.addEventListener('pointerdown',ev=>{
  const x0=ev.clientX,y0=ev.clientY; let cur=base;
  const mv=e=>{
    const dx=e.clientX-x0, dy=e.clientY-y0, L=Math.hypot(dx,dy);
    if(L<2) return;
    const bias=Math.sin(2*Math.atan2(dy,dx));          // 經緯 0，斜向 ±1
    cur=Math.max(-17,Math.min(17, base + bias*L*0.16));
    el.style.setProperty('--sx',cur.toFixed(2)+'deg');
    el.style.setProperty('--sy',(cur*.55).toFixed(2)+'deg');
  };
  const up=()=>{ base += (cur-base)*0.30; save(base); /* 只回彈七成 */ };
  …
});
```

```css
.grain{transform:skew(var(--sx,0deg),var(--sy,0deg));
  transition:transform .34s cubic-bezier(.2,.9,.3,1)}
.dragging>.grain{transition:none}     /* 手在動的時候不要補間 */
```

**降級**：`prefers-reduced-motion` 下四式全部有對應處理——棉絮不生成、進場動畫不播（直接是最終狀態）、hover 反轉瞬間完成、拖曳照常運作（它是控制項不是動畫）。資訊零損失。另備鍵盤替代：`←/→` 沿斜向拉 1.4°／次，`Home` 歸零。

---

## 八、插畫與圖像風格

**零外部圖片、零照片、零寫實描繪。**所有圖像由四種原語構成，且必須拆得出「哪一塊是哪一塊布」：

1. **布塊**：帶織紋的封閉多邊形，每個頂點 ±0.5 單位手工誤差，平塗無描邊。
2. **接縫**：一亮一暗兩條 0.9 寬的線（位移 ±0.45）＋中間一條 `1.4 1.9` 的針腳虛線。
3. **壓線網**：與拼接完全無關的第二層連續線，45°／135° 菱格，9 單位一格，`1.5 2.1` 針腳。
4. **滾邊**：整床被最外緣 2.6 寬的一圈實色，用另一塊布的顏色。

判準：**拿掉全部顏色，仍讀得出哪兩塊之間有一道縫、以及那道縫的縫份倒向哪一邊。**

明文禁用：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描（thin lineart）、任何寫實描繪、任何 emoji 圖示、`stroke-linecap:round`（布邊是剪出來的，是方的）。

---

## 九、Logo 與 Favicon

Logo 是**一塊被**，不是一個字標：外框、地、內框、中心菱四層，加一組跨過全部的壓線虛線，右下角露出被面／棉胎／被裡三層的斷面。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <rect width="160" height="160" fill="#A8243A"/>
  <rect x="17" y="17" width="126" height="126" fill="#1A1E2B"/>
  <rect x="38" y="38" width="84" height="84" fill="#E8E2D4"/>
  <rect x="46" y="46" width="68" height="68" fill="#2E9C8A"/>
  <path d="M80 47 113 80 80 113 47 80Z" fill="#C9922B"/>
  <g stroke="#E8E2D4" stroke-opacity=".62" stroke-width="1.4" stroke-dasharray="3 3.6" fill="none">
    <path d="M8 26h144M8 62h144M8 98h144M8 134h144"/></g>
  <g><rect x="112" y="126" width="40" height="6" fill="#C9C0A9"/>
     <rect x="112" y="133" width="40" height="9" fill="#E8E2D4"/>
     <rect x="112" y="143" width="40" height="6" fill="#52708C"/></g>
</svg>
```

Favicon 用同一塊被縮成 32×32，只留四層與一組壓線，寫成 inline SVG data URI 放在 `<head>`：

```html
<link rel="icon" href='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" fill="%23A8243A"/%3E%3Crect x="4" y="4" width="24" height="24" fill="%231A1E2B"/%3E%3Crect x="8" y="8" width="16" height="16" fill="%23E8E2D4"/%3E%3Cpath d="M16 9.5 22.5 16 16 22.5 9.5 16Z" fill="%23C9922B"/%3E%3C/svg%3E'>
```

---

## 十、Do & Don’t

**Do**

- 每一塊有顏色的區域都上織紋，強度 ≤0.2。
- 每一條顏色邊界都畫成一道有亮暗的縫。
- 壓線一定跨過接縫，而且是另一套紋路。
- 手工誤差留著：±1mm 的頂點偏移、0.4–0.8° 的旋轉。
- 長文一律印在「紙」上（`.paper`），不印在「布」上；正文對比 ≥ 7:1。
- 每一個限制都說出理由與代價：布不夠就報出還差多少、縫不起來就說是哪個角。
- 文案講具體的東西：民國幾年、幾尺、幾工、幾錢、誰的衫。

**Don’t**

- ❌ 圓角、模糊陰影、任何漸層（縫的亮暗兩條實線除外）。
- ❌ 用 `border` 分隔兩塊顏色（那是描邊，不是縫）。
- ❌ 印花、圖案布、貼圖式材質照片。
- ❌ 把布色拿去當按鈕色或連結色。
- ❌ emoji 圖示、Lorem ipsum、「EST. 19xx」徽章、紫藍漸層 hero、置中大標＋兩顆按鈕＋三張卡片。
- ❌ 手寫體、圓體、任何「溫馨手作感」的字體選擇——阿米什的美學是樸素，不是可愛。
- ❌ 完美對齊。全部角都對得上的被面，是機器打的，不是這個風格。
- ❌ 只用淡入當唯一動效（本風格四式缺一不可）。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant-TW"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;800&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--ink:#14161F;--field:#1A1E2B;--field2:#232A3E;--paper:#E8E2D4;
      --must:#C9922B;--red:#A8243A;--hair:rgba(232,226,212,.20);--sd:5px}
*{box-sizing:border-box;margin:0;padding:0;border-radius:0!important}
html{background:var(--ink);color:var(--paper)}
body{font:400 16.5px/1.88 "Noto Serif TC",serif;background-image:var(--t0)}
.wrap{max-width:1140px;margin:0 auto;padding:0 26px}
.num{font-family:Bitter,serif;font-variant-numeric:tabular-nums}
.paper{background:var(--paper);color:var(--ink);padding:22px 24px;box-shadow:5px 5px 0 rgba(0,0,0,.45)}
.grid{display:grid;gap:1px;background:var(--hair);border:1px solid var(--hair)}
.grid>*{background:var(--ink);padding:19px 18px}      /* 格線就是縫，不留空白通道 */
</style></head><body>
<nav class="nav">…疏縫／正縫四片布…</nav>
<main id="main"><div class="wrap">

  <!-- 開場：不要大標 hero。掛一件成品出來，資訊印在它旁邊的紙標上 -->
  <section class="pole">
    <div class="line">
      <figure class="hang"><div class="clip"></div>
        <div class="quilt">…布塊 divs + 縫與壓線的 SVG…</div>
        <figcaption class="paper">…被號、版式、布是誰的衫…</figcaption>
      </figure>
    </div>
  </section>

  <!-- 資訊區：不對稱兩欄，左紙右布 -->
  <section class="shopcard enter"><i class="bst"></i>
    <div class="paper">…地址、電話、營業時間、師傅、工期…</div>
    <div class="side">…敘事…</div>
  </section>

  <!-- 規格區：1px 分格，每格一件不可省略的事 -->
  <section class="grid">…</section>

</div></main>
<footer>…</footer>
</body></html>
```

一床被的 DOM 結構（每一塊布是一個元素，縫與壓線疊一層 SVG）：

```html
<div class="quilt" style="--bk:#191C26">
  <div class="pt w1" style="left:12.2%;top:10.4%;width:75.6%;height:14.3%;
       --c:#A8243A;--wv:1;--wsd:46;clip-path:polygon(0% 0%,100% .4%,99.7% 100%,0% 98.4%)">
    <i class="gr"></i>          <!-- 織紋層，斜紋走形時 skew 的是它 -->
  </div>
  …
  <svg class="qsv" viewBox="0 0 180 210" preserveAspectRatio="none">
    <defs><g id="sm">…每一塊的輪廓…</g></defs>
    <g class="qlt"><path d="…45°…"/><path d="…135°…"/></g>   <!-- 壓線 -->
    <use href="#sm" class="sd"/><use href="#sm" class="sl"/><use href="#sm" class="st"/>
    <rect class="bd" x="1.3" y="1.3" width="177.4" height="207.4" style="stroke:#E8E2D4"/>
  </svg>
</div>
```

---

## 十二、技術實作與相容性

本站三項核心技術，各承載一個不可省略的特徵，分屬渲染層／版面層／生成層。

### 1. CSS Painting API（paint worklet）— 承載特徵 1「織紋」

- **它承載什麼**：頁面上每一塊布的經緯與竹節紗。四種織法是四支程序，依 `--wv`（織法）與 `--wsd`（種子）逐元素繪製，因此**每一塊布的紗都不一樣、且不會出現重複的貼圖接縫**——這是靜態貼圖做不到的，一塊 2.6㎡ 的地色如果用 8px 貼圖平鋪，重複格會被看出來。
- **維持單檔的做法**：worklet 規格要求外部模組，本站把程式碼字串包成 `Blob` 再 `URL.createObjectURL()` 餵給 `CSS.paintWorklet.addModule()`，全站仍是單一 HTML 檔、零外部資源。

```js
if (typeof CSS!=='undefined' && CSS.paintWorklet) {
  CSS.paintWorklet.addModule(URL.createObjectURL(new Blob([WORKLET_SRC],{type:'text/javascript'})))
    .then(()=>document.documentElement.classList.add('paintok'));
}
```
```css
.gr{background-image:var(--t0)}                    /* 預設：SVG 貼圖 */
html.paintok .gr{background-image:paint(cloth)}    /* 支援時才升級 */
```

- **支援現況（2026-09-03 查證 MDN《CSS Painting API》）**：MDN 明列 **Limited availability / Experimental — “This feature is not Baseline because it does not work in some of the most widely-used browsers.”** 目前為 Chromium 系（Chrome / Edge）支援，Safari 僅部分，Firefox 仍在評估。因此**不能當作前提**。
- **Fallback 的具體行為**：預設狀態就是四張 8×8 / 9×6 / 10×9 的 inline SVG 織紋貼圖（`--t0`…`--t3`，data URI，寫死在 `:root`），四種織法一樣分得出來、對比與可讀性完全相同；差別只在大面積時看得到 8px 的貼圖重複，以及沒有逐塊不同的竹節紗。**特徵 1 在任何瀏覽器都成立**，paint worklet 只是把它畫得更好。不使用 polyfill（那會引入外部資源）。

### 2. CSS `subgrid` — 承載特徵 3 的另一面「接縫要對齊」

- **它承載什麼**：舊衣圖鑑十二張卡片，每張內部有六列（布樣／名稱／主人與年／布種／明度與面積／破損）。用 subgrid 讓十二張卡片的六條橫線落在**同一組列軌**上，於是那六條線跨過整面版子都不會斷——這正是拼布的十字接縫要對齊的意思。用巢狀 grid 做不到，因為每張卡片的文字長度不同，各自的列高會不一樣。
- **支援現況（2026-09-03 查證 MDN《CSS grid layout / subgrid》與 web.dev）**：Firefox 71（2019）、Safari 16（2022）、Chrome 117 / Edge 117（2023-09），**Baseline newly available 2023-09-15，並於 2026-03-15 進入 Baseline widely available**，全球覆蓋約 97%。
- **Fallback 的具體行為**：`@supports not (grid-template-rows:subgrid)` 時，卡片改為各自獨立的 grid（`grid-row:auto`），內容完全不變、全部可讀，只是各卡片的橫線不再對齊——頁面上會同時顯示一行紅字說明「你的瀏覽器不支援 subgrid，圖鑑各欄的橫線沒有對齊——這正是接縫沒對上的樣子」。資訊零損失。

### 3. 遞迴斷頭台切割判定（guillotine partition solver）— 承載核心功能與特徵 2

- **它承載什麼**：一台縫紉機只會走直線，所以一床被縫不縫得起來，等於問「這個多邊形分割能不能被一連串貫穿全幅的直線遞迴切開」。演算法：對每個候選方向（0°／90°／45°／135°）把每一塊投影成區間，找一個切點使得每一塊都完全落在切點的一側；找得到就分成兩堆各自遞迴，找不到就代表有幾塊圍成一個角，非用 Y 字接縫（set-in seam）不可。**成功時把切的順序倒過來，就是縫合工序單**——這是使用者實際拿到的產出物。
- **相容性**：純 JavaScript，無瀏覽器 API 依賴，無支援缺口。搭 FNV-1a → mulberry32 決定性偽亂數，同一組輸入永遠得到同一床被，`?q=` 分享碼因此可完整還原。
- **實測（Node 22，單執行緒）**：六種版式共 13–25 塊，判定耗時 0–8ms（八角星最久，搜尋 6,454 個候選切點後判定不可縫）。全部六種版式的塊面積總和皆等於 180×210＝37,800 cm²，確認分割無重疊無缺口。
- **它為什麼不是模擬引擎**：沒有物理、沒有隱藏真值、沒有可調參數、沒有一根滑桿。它回答的是一個離散幾何問題，答案是「縫得起來／縫不起來」加上一張工序單。

### 效能預算（實測）

| 項目 | 預算 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤350KB | index 87KB／布與版式 101KB／四件舊衣 53KB／工錢與委託 43KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零圖片、零音檔、零函式庫） |
| 首屏 JS 執行 | ≤100ms | 三床被在建置期就渲染成靜態 HTML；載入時只有日期比對與（日期不同才跑的）重繪，斷頭台判定 ≤8ms |
| 主要動畫 | 60fps | 棉絮為 15 個元素的純 CSS `transform` 動畫，不觸發 layout；斜紋走形只寫兩個自訂屬性再由 `skew()` 消化，零 `getBoundingClientRect`，無 layout thrashing |

### 無 JavaScript 時

首頁三床被、店家資訊、五個特徵的示範布塊、交件簿、十二件舊衣圖鑑、六種版式與其塊數／縫合道數／用布量、工錢價目表、店史——**全部是靜態 HTML，關掉 JavaScript 完整可讀**。只有「四件舊衣，一床被」的排被功能與委託單驗證需要 JavaScript，該頁另附 `<noscript>` 指路到已列完整資料的頁面。

