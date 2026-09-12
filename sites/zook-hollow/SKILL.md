---
name: amish-quilt
description: A Lancaster County Amish quilt style — plain solid cloth with no printed pattern, saturated jewel colours held inside a dark aubergine border, concentric frames with contrasting corner blocks, a few large centre-dominant geometric shapes, and a second layer of curvilinear quilting that is lit as a relief instead of drawn as a line.
---

# 阿米希拼布（Amish Quilt）

> 賓州蘭開斯特郡，約 1870–1940。範例站：〈祖克窪蜂場 Zook Hollow Apiary〉（蜂蜜農場）。

## 一、設計哲學

這個風格的成立條件不是「幾何拼布」，是三件互相咬住的事：

1. **規矩先於美感。** 教會的 Ordnung 不准穿印花衣裳，於是婦女手上能有的布只有素色平織——洋裝的靛藍、圍裙的酒紅、襯裡的漂白棉。**「只用素布」不是設計選擇，是規矩的殘餘。**做這個風格時，任何一個像「材質」「花紋」「漸層」的東西出現，這個立場就垮了。
2. **形少、形大、置中對稱。** 因為布是衣服剩下來的，一塊夠大的布很珍貴，所以整床被只放得下幾個大形：一個中心菱形、四個角三角、幾圈框。它跟同時期英美繁複的碎布拼布（scrap quilt）走的是完全相反的方向。
3. **兩層各走各的。** 拼縫（piecing）是直的、方的、有色的；絎縫（quilting）是彎的、繞的、無色的。它們在同一個平面上但互相不理會——**看得見顏色的那層決定構圖，看不見顏色的那層決定質感。**這是本風格最容易被漏掉、也是最貴的一層。

1971 年紐約惠特尼美術館把這批被掛上牆，展名叫〈Abstract Design in American Quilts〉。掛的人以為那是抽象藝術；做的人只知道那是要蓋的東西，而且要照規矩做。**設計網頁時要站在做的人那一邊，不要站在掛的人那一邊**——不要做成「一張色塊構成的海報」，要做成「一件有厚度、有針、有邊、有背面的東西」。

搭配產業時挑「東西是慢慢做出來的、有季節、有社群、有規矩」的行業：農場、蜂場、烘焙、木作、家具、保險互助、殯葬、書店、種苗。**不要配科技、夜生活、時尚快消**——不是不能，是這個風格的核心是「節制」，配上「新奇」就互相抵銷。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，做出來的就不是這個風格。每一項都附可以直接複製的片段。

### 特徵 1：只用素色，一朵花也沒有

畫面上每一塊色域都是**單一實色**。沒有印花、沒有漸層、沒有 noise、沒有紙紋、沒有布紋圖片、沒有 `feTurbulence`。這是唯一一條沒有例外的規則。

唯一准出現的「非實色」是絎縫造成的明暗（特徵 5），而那是光，不是圖案。

```css
/* 所有色域都長這樣。沒有 background-image，沒有 gradient。 */
.patch{ background:#1D3A6E; }

/* 明文禁止清單 —— 出現任何一項就不是這個風格了 */
/* background-image: linear-gradient(...)  ✗ */
/* background-image: url(noise.png)        ✗ */
/* filter: url(#turbulence)                ✗ */
/* opacity 疊色做出的中間調                 ✗ 中間調要另外染一塊布 */
```

### 特徵 2：深色包著亮色，而且用 OKLab 的明度去驗

外圈永遠是全畫面**最暗**的一塊（茄紫、深靛、黑）。高彩度的孔雀藍、酒紅、金黃只能被關在裡面。沒有那圈暗的，整床被就是吵。

比例基準：暗地 ≈ 38%、紙 ≈ 20%、其餘三到四塊寶石色分掉剩下的，**任何一塊寶石色都不得超過 20%**。

相鄰兩塊色的明度差要用 **OKLab 的 L**，不要用 sRGB 的 relative luminance——sRGB 會把高彩度色的明度算錯（本站的孔雀藍 `#2E9DAE` 與酒紅 `#A81D57` 在 sRGB 亮度上幾乎一樣，OKLab 上差 0.157，而肉眼看到的是後者）。

```css
:root{
  --aub:#251C2E;  /* 地 L=0.246 —— 全畫面最暗，占 38% */
  --ind:#1D3A6E;  /* L=0.356 */
  --grn:#0F5540;  /* L=0.402 */
  --mag:#A81D57;  /* L=0.486 */
  --brk:#B8482C;  /* L=0.548 */
  --tur:#2E9DAE;  /* L=0.643 */
  --gld:#D8A21C;  /* L=0.743 —— 最亮，面積必須最小 */
  --paper:#EFE7D6;/* 紙：所有長文一律在紙上，不在布上 */
}
```

```js
// 相鄰色驗收：ΔL(OKLab) —— 主形對地色 ≥ 0.11，記號色對底 ≥ 0.09
function _s2l(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function okL(h){
  var r=_s2l(parseInt(h.slice(1,3),16)),g=_s2l(parseInt(h.slice(3,5),16)),b=_s2l(parseInt(h.slice(5,7),16));
  var l=Math.cbrt(0.4122214708*r+0.5363325363*g+0.0514459929*b),
      m=Math.cbrt(0.2119034982*r+0.6806995451*g+0.1073969566*b),
      s=Math.cbrt(0.0883024619*r+0.2817188376*g+0.6299787005*b);
  return 0.2104542553*l+0.7936177850*m-0.0040720468*s;
}
var dL=(a,b)=>Math.abs(okL(a)-okL(b));
```

### 特徵 3：一圈套一圈，四個角一定有角石

滾邊 → 外框 → 內框 → 中心方，**同心、正方、不歪**。每一圈的四個角換一塊色，那叫角石（corner block）。**沒有角石的框是一條腰帶，不是一個框。**

這條規則要一路貫徹到 UI：卡片、表單、按鈕都是同心矩形，全站 `border-radius:0`。

```html
<svg viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" fill="#251C2E"/>                      <!-- 滾邊+外框 -->
  <rect x="20"  y="20"  width="166" height="166" fill="#D8A21C"/>        <!-- 外框角石 ×4 -->
  <rect x="814" y="20"  width="166" height="166" fill="#D8A21C"/>
  <rect x="20"  y="814" width="166" height="166" fill="#D8A21C"/>
  <rect x="814" y="814" width="166" height="166" fill="#D8A21C"/>
  <rect x="186" y="186" width="628" height="628" fill="#B8482C"/>        <!-- 內框 -->
  <rect x="186" y="186" width="70"  height="70"  fill="#D8A21C"/>        <!-- 內框角石 ×4 -->
  <rect x="744" y="186" width="70"  height="70"  fill="#D8A21C"/>
  <rect x="186" y="744" width="70"  height="70"  fill="#D8A21C"/>
  <rect x="744" y="744" width="70"  height="70"  fill="#D8A21C"/>
  <rect x="256" y="256" width="488" height="488" fill="#1D3A6E"/>        <!-- 中心方 -->
  <path d="M500 256 744 500 500 744 256 500Z" fill="#2E9DAE"/>           <!-- 菱形 -->
</svg>
```

### 特徵 4：色域之間沒有描邊線，只有一暗一亮的縫份陰影

**這是本風格與所有「描邊系」民俗風格（印度卡車藝術、剪紙、彩繪玻璃）的分野。**兩塊布縫在一起，縫份倒向一邊，所以接縫的一側微暗、另一側微亮。畫面上因此沒有任何一條「線」，只有厚度。

實作成 0 模糊半徑的 inset box-shadow，全站每一個元件都套：

```css
:root{ --shade:rgba(12,6,16,.52); --lift:rgba(255,255,255,.17); }
.seam{
  border:0; border-radius:0;
  box-shadow: inset  1.2px  1.2px 0 var(--lift),
              inset -1.2px -1.2px 0 var(--shade);
}
/* hover 時縫份「被拉緊」——加深，不是變色也不是發光 */
.seam:hover{
  box-shadow: inset  2.4px  2.4px 0 var(--lift),
              inset -2.4px -2.4px 0 var(--shade);
}
/* 投影一律實心位移色塊，永遠 blur=0 */
.paper{ box-shadow: inset 1.2px 1.2px 0 rgba(255,255,255,.7),
                    inset -1.2px -1.2px 0 rgba(80,60,40,.28),
                    5px 6px 0 rgba(0,0,0,.30); }
```

### 特徵 5：絎縫是壓下去的，不是畫上去的

拼縫是直的方的；絎縫是彎的繞的——羽毛環、繩索紋、南瓜籽、45° 棋盤格。兩層**完全無關**：絎縫線大方地橫越拼縫，不停也不轉。

關鍵在於它**不是一條有顏色的線**。線在下面把三層拉緊，中間的鋪棉就在線的兩邊鼓起來，所以你看到的是**明暗**。做法：把絎縫路徑當成高度場（用 alpha 通道當 bump map），過 `feDiffuseLighting`，再以 `mix-blend-mode:overlay` 疊回布上。

`diffuseConstant` 必須設成 `0.5 / sin(elevation)`，讓平坦處算出剛好 0.5 的中灰——overlay 對中灰是恆等運算，於是只有針的兩側會變亮變暗，其餘畫面完全不受影響。elevation=42° 時該值為 **0.7472**。

```html
<svg viewBox="0 0 1000 1000">
  <defs>
    <!-- 絎縫：凹陷（surfaceScale 為負） -->
    <filter id="sink" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3.4" result="bm"/>
      <feDiffuseLighting in="bm" surfaceScale="-7" diffuseConstant="0.7472" lighting-color="#ffffff">
        <feDistantLight azimuth="228" elevation="42"/>
      </feDiffuseLighting>
    </filter>
    <!-- 縫份：隆起（surfaceScale 為正） -->
    <filter id="ridge" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="bm2"/>
      <feDiffuseLighting in="bm2" surfaceScale="5.5" diffuseConstant="0.7472" lighting-color="#ffffff">
        <feDistantLight azimuth="228" elevation="42"/>
      </feDiffuseLighting>
    </filter>
  </defs>

  <g class="q-piece"><!-- 特徵 3 的實色拼接 --></g>

  <g filter="url(#ridge)" style="mix-blend-mode:overlay" fill="none" stroke="#fff" stroke-width="6">
    <path d="…拼接縫的全部矩形與菱形…"/>
  </g>
  <g filter="url(#sink)"  style="mix-blend-mode:overlay" fill="none" stroke="#fff" stroke-width="3.4">
    <path d="…羽毛環／繩索／南瓜籽／棋盤格…"/>
  </g>
  <!-- 線本身：淡、細、虛線＝走針。它只是證據，明暗才是主體 -->
  <g fill="none" stroke="#EFE7D6" stroke-width="1.7" stroke-dasharray="5.2 4.4" opacity=".52">
    <path d="…同一組路徑…"/>
  </g>
</svg>
```

---

## 三、色彩系統

| 角色 | Hex | OKLab L | 比例 | 用途 |
|---|---|---|---|---|
| 茄紫（地） | `#251C2E` | 0.246 | 38% | 全站底、外框、頁尾。**全畫面最暗，永遠是它** |
| 茄紫暗 | `#1A1420` | 0.196 | 6% | 頁首、讀數盒、被的凹槽 |
| 茄紫亮 | `#3B2E45` | 0.324 | 8% | 未選中的布塊按鈕、卡片底 |
| 生紙 | `#EFE7D6` | 0.926 | 20% | **所有長文一律在紙上**。紙不是布，紙上不套縫份陰影而是紙的陰影 |
| 靛藍 | `#1D3A6E` | 0.356 | ≤14% | 大面積寶石色（中心方、內框） |
| 松綠 | `#0F5540` | 0.402 | ≤8% | 次要寶石色 |
| 酒紅 | `#A81D57` | 0.486 | ≤8% | 次要寶石色 |
| 磚紅 | `#B8482C` | 0.548 | ≤10% | 拒絕、退件、錯誤（本風格的紅不是警示色，是一塊布，所以它也要夠大） |
| 孔雀藍 | `#2E9DAE` | 0.643 | ≤12% | 主形（中心菱形） |
| 金黃 | `#D8A21C` | 0.743 | ≤6% | **最亮，所以面積最小**：現用態、連結、主要動作、角石 |
| 漂白棉 | `#F2EDE2` | 0.947 | — | **只准用在滾邊與裡布，不上被面。**網頁上等同於「不當色域使用」 |

規則：

- **一床被最多四種色（含外框）。**做網頁時同一屏內的色域數也照這條。第五種色出現就是這個風格死掉的地方。
- 灰階零色偏；沒有中性灰——中間調要另外找一塊布（霧藍 `#7C93A8`），不要用 opacity 兌出來。
- 紅在這裡不是語意色是布色，所以錯誤訊息用磚紅整塊上，不要只給一行紅字。

---

## 四、字體系統

被上唯一有字的地方是十字繡的姓名縮寫與年份。所以**這個風格沒有 display 字體**——字要老實、要有重量、不要有個性表演。

| 角色 | 字體 | 字重 | 字級 | 行高／字距 |
|---|---|---|---|---|
| 中文標題 | Noto Serif TC | 900 | 32 / 24 / 19px | 1.24 / +0.01em |
| 中文正文 | Noto Serif TC | 400 | 16.5px（手機 15.5） | 1.78 / +0.012em |
| 拉丁與數字 | Bitter（slab serif） | 700 | 隨層級 | tabular-nums 必開 |
| 標籤／小標 | Noto Sans TC | 500 | 11.5px | letter-spacing **0.30em**、全大寫 |

- 數字一律 `font-variant-numeric:tabular-nums`——這個風格的數字是量出來的（幾針／吋、幾吋寬、多少錢），不是排出來的。
- 拉丁字用 slab（Bitter／Zilla Slab／Roboto Slab 皆可）。**不要用 Playfair、Cormorant 這類高對比襯線**——那是「典雅」的語彙，阿米希不典雅。
- 標籤的 0.30em 字距是本風格唯一的「裝飾性排版手法」，因為它模仿的是十字繡逐格排字：字與字之間有格子。

---

## 五、版面與網格

- **針距格：全站所有間距是 12.5px 的倍數**（12.5 / 25 / 37.5 / 50 / 75）。這是「9 針／吋」換算出來的格，不是隨手挑的 8pt grid。
- **同心結構**：頁面 = 外框（頁首頁尾的暗地）→ 內容區 → 紙。任何區塊都可以再套一層。
- **對稱優先於不對稱**。這是本風格與構成主義／瑞士風的關鍵差異：中心對稱是規則，不是保守。標題不置中沒關係，但**主視覺一定要置中**。
- **零圓角、零模糊陰影、零外框線**。分隔線只有一種：`border-top:1.2px rgba(255,255,255,.14)` + `border-bottom:1.2px rgba(0,0,0,.42)`，也就是一條縫。
- 版心 1160px；主欄 + 318px 側欄（紙牌釘在旁邊）。
- 斷點：900px 收成單欄；560px 導覽攤成兩列、卡片不再傾斜。

```css
.wrap{max-width:1160px;margin:0 auto;padding:0 25px}
.band{padding:75px 0}
hr.st{border:0;height:0;
  border-top:1.2px solid rgba(255,255,255,.14);
  border-bottom:1.2px solid rgba(0,0,0,.42);margin:50px 0}
```

---

## 六、元件配方

### 導覽（pin-seam 別針與縫合）

四頁 = 四塊布並排。**現用頁那一塊是真的被縫上去的**：不歪、不浮、沒有投影，左緣有一道走針；其餘三塊只用大頭針別著：歪 −0.9°、下沉 2px、有實心位移投影、右上角插一根 SVG 別針。

語意是「縫合 vs 只是別著」，不是高亮。

```css
nav.pins a{position:relative;display:block;padding:13px 25px 15px;min-width:150px;
  background:#3B2E45;color:#EFE7D6;text-decoration:none;
  box-shadow:inset 1.2px 1.2px 0 var(--lift), inset -1.2px -1.2px 0 var(--shade), 4px 5px 0 rgba(0,0,0,.34);
  transform:rotate(-.9deg) translateY(2px);transform-origin:left top;
  transition:transform .09s linear, box-shadow .09s linear;margin-right:12.5px}
nav.pins a:hover{transform:rotate(-2deg) translateY(-2px);
  box-shadow:inset 1.2px 1.2px 0 var(--lift), inset -1.2px -1.2px 0 var(--shade), 7px 8px 0 rgba(0,0,0,.38)}
nav.pins a[aria-current="page"]{transform:none;background:#EFE7D6;color:#20181C;padding-left:33px;
  box-shadow:inset 1.2px 1.2px 0 rgba(255,255,255,.75), inset -1.2px -1.2px 0 rgba(80,60,40,.3)}
nav.pins a[aria-current="page"] .pin{display:none}
```

```html
<!-- 別針 -->
<svg class="pin" viewBox="0 0 26 26" aria-hidden="true"><g transform="rotate(28 13 13)">
<path d="M13 8v14" stroke="#CFC3AE" stroke-width="1.6"/>
<path d="M13 22l1.5 3-1.5-1-1.5 1z" fill="#CFC3AE"/>
<circle cx="13" cy="6.4" r="4.2" fill="#B8482C"/>
<circle cx="11.6" cy="5" r="1.3" fill="#EFE7D6" opacity=".7"/></g></svg>
<!-- 走針（現用頁左緣的翻開縫份） -->
<svg class="sewn" viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
<path d="M3 0v100" stroke="#8A7350" stroke-width="1.4" stroke-dasharray="4 3.6"/>
<path d="M9 0v100" stroke="#8A7350" stroke-width="1.4" stroke-dasharray="4 3.6" opacity=".55"/></svg>
```

### 按鈕

```css
.btn{padding:13px 30px;border:0;border-radius:0;font-weight:700;background:#D8A21C;color:#241703;
  box-shadow:inset 1.2px 1.2px 0 rgba(255,255,255,.5), inset -1.2px -1.2px 0 rgba(0,0,0,.35), 4px 5px 0 rgba(0,0,0,.35)}
.btn:hover{transform:translate(1px,1px);
  box-shadow:inset 1.2px 1.2px 0 rgba(255,255,255,.5), inset -1.2px -1.2px 0 rgba(0,0,0,.35), 3px 4px 0 rgba(0,0,0,.35)}
/* 布塊按鈕：左邊一枚 19px 實色布樣 */
.sw{display:inline-flex;align-items:center;gap:10px;padding:9px 15px;border:0;background:#3B2E45;color:#EFE7D6;
  box-shadow:inset 1.2px 1.2px 0 var(--lift), inset -1.2px -1.2px 0 var(--shade)}
.sw i{width:19px;height:19px;display:block;
  box-shadow:inset 1.2px 1.2px 0 rgba(255,255,255,.35), inset -1.2px -1.2px 0 rgba(0,0,0,.5)}
.sw.on{background:#EFE7D6;color:#20181C}   /* 選中 = 換成紙，不是加邊框 */
```

### 卡片（釘在牆上的紙牌）

**注意：這不是「圓角卡片」，是一張紙。**傾斜 −0.6°、上緣中央插一枚大頭針、實心位移投影。長文一律進紙牌，不要放在布上。

```css
.card{background:#EFE7D6;color:#20181C;padding:25px;position:relative;transform:rotate(-.6deg);
  box-shadow:inset 1.2px 1.2px 0 rgba(255,255,255,.7), inset -1.2px -1.2px 0 rgba(80,60,40,.28), 5px 6px 0 rgba(0,0,0,.32)}
.card .pinhead{position:absolute;left:50%;top:-11px;margin-left:-13px;width:26px;height:26px}
```

### 表單

輸入框是「凹進去的」（inset 方向與布塊相反），錯誤用整條磚紅內框而不是紅色細線。

```css
input,select,textarea{width:100%;padding:11px 13px;border:0;border-radius:0;background:#F7F2E6;color:#20181C;
  box-shadow:inset 1.2px 1.2px 0 rgba(80,60,40,.36), inset -1.2px -1.2px 0 rgba(255,255,255,.8)}
.bad input,.bad select{box-shadow:inset 0 0 0 2.4px #B8482C}
.err{display:none;font-size:13px;color:#B8482C;font-weight:700;margin-top:6px}
.bad .err{display:block}
```

### 目錄（subgrid）

24 張被的卡片，卡內五行（縮圖／名／縫者／針數／價）**必須跨卡對齊**——這是「同一副繃架縫出來的」在版面上的說法。用 subgrid，不要用固定高度。

```css
.dcat{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:37.5px 25px}
@supports (grid-template-rows:subgrid){
  .dcard{grid-row:span 5;grid-template-rows:subgrid}
}
.dcard{display:grid;gap:0;padding:12.5px;background:#3B2E45;
  box-shadow:inset 1.2px 1.2px 0 var(--lift), inset -1.2px -1.2px 0 var(--shade)}
```

### 頁尾

暗地 + 四到五欄 + 一塊「架上那床被的一角」布樣（帶 `#sink`/`#ridge` 濾鏡，讓斜光在每一頁都看得到）。

---

## 七、動效規則

四種缺一不可，全部有 `prefers-reduced-motion` 降級且資訊零損失。

| 種類 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient | **日光偏移** | 真實時刻（`new Date()`），每 60 秒 | 06:00→19:00 之間 `azimuth` 198°→258°、`elevation` 26°→56°→26°，直接寫進所有 `feDistantLight`。整床被的浮雕陰影一天之內會換邊 |
| input-driven | **對光** | `pointermove` | 容器 `perspective(1500px) rotateX/rotateY ±1.7°`，`transition .09s linear`（<100ms）；另有布塊 hover 的縫份加深（1.2px→2.4px，90ms） |
| transition | **縫進來** | 頁面載入、面板切換、表單回執出現 | 45° 縫線推移的 `clip-path` 多邊形，400ms `cubic-bezier(.32,.86,.36,1)`，錯開 60ms |
| signature | **針行推進** | 縫程進度（跨頁持久） | 見下 |

### 簽名動效：針行推進（quilting-front）

**全站的被永遠沒有縫完。**一根針沿著下一行絎縫路徑走 1250ms（`getPointAtLength` 逐幀取點），走完那一行才「落」到被上——不是描線動畫，是一行一行地出現，因為手縫就是一行一行的。行數存在 `localStorage`，**跨頁、跨造訪繼續**：你離開再回來，它從上次那一行接下去。

```js
function run(){
  if(front>=n) return;                              // 縫完了
  var p=svg.querySelector('#qr-'+uid+'-'+front);    // 下一行的路徑（在 <defs> 裡）
  var len=p.getTotalLength(), t0=0, dur=1250;
  requestAnimationFrame(function step(ts){
    if(!t0) t0=ts; var k=Math.min(1,(ts-t0)/dur);
    var pt=p.getPointAtLength(len*k), s=svg.clientWidth/1000;
    needle.style.transform='translate('+(pt.x*s-9)+'px,'+(pt.y*s-25)+'px) rotate('+(-38+k*14)+'deg)';
    if(k<1) requestAnimationFrame(step);
    else{ addRow(front); front++; localStorage.setItem('front',front); setTimeout(run,520); }
  });
}
```

**明文禁用**：`stroke-dashoffset` 描繪動畫（線不是被畫出來的）、淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影彈跳。

降級：`prefers-reduced-motion` 下 `quiltingFront()` 直接標示「已縫 17/17」並保留整床縫完的靜態被——這正好等於無 JavaScript 時的狀態，資訊零損失。

---

## 八、插畫與圖像風格

**技法名稱：solid-piecing relief（素色拼接浮雕構成）。**全站沒有一張外部圖片、沒有一張描外形的插圖、沒有一條自由曲線。所有圖像由四種原語構成：

1. **實色布塊**：矩形或菱形，單一實色，無描邊。
2. **縫份陰影**：每條拼接線經 `#ridge` 濾鏡（`surfaceScale` 正）產生的一暗一亮。
3. **絎縫針跡**：虛線 path，走羽毛環／繩索／南瓜籽／45° 棋盤格四種圖案，**與拼接幾何完全無關**。
4. **鋪棉隆起**：由 3 經 `#sink` 濾鏡（`surfaceScale` 負）產生的高度場。

判準：**拿掉全部顏色，仍讀得出哪裡是拼接縫、哪裡是絎縫線、哪裡鼓起來。**

四種絎縫圖案的生成（可直接抄）：

```js
// 繩索紋：兩條反相正弦交纏，走在外框上
function cable(x0,y0,x1,y1,amp,per){
  var len=Math.hypot(x1-x0,y1-y0),ux=(x1-x0)/len,uy=(y1-y0)/len,nx=-uy,ny=ux,d='';
  for(var s=0;s<2;s++){ var ph=s*Math.PI,seg='M';
    for(var i=0;i*9<=len;i++){ var t=i*9,o=Math.sin(t/per*Math.PI*2+ph)*amp;
      seg+=(i?'L':'')+(x0+ux*t+nx*o).toFixed(1)+' '+(y0+uy*t+ny*o).toFixed(1); }
    d+=seg; } return d;
}
// 羽毛環：一圈中心脊 + 沿脊排開的羽瓣，走在主形內部
function featherWreath(cx,cy,R,n,inner){
  var d='M'+(cx+R)+' '+cy;
  for(var i=1;i<=72;i++){var t=i/72*Math.PI*2;d+='L'+(cx+R*Math.cos(t)).toFixed(1)+' '+(cy+R*Math.sin(t)).toFixed(1);}
  d+='Z';
  for(var j=0;j<n;j++){ var a0=j/n*Math.PI*2,w=Math.PI*2/n*.62;
    var lob='M'+(cx+R*Math.cos(a0)).toFixed(1)+' '+(cy+R*Math.sin(a0)).toFixed(1);
    for(var s=1;s<=9;s++){ var t=s/9,ang=a0-w/2+w*t,rr=R+Math.sin(t*Math.PI)*inner;
      lob+='L'+(cx+rr*Math.cos(ang)).toFixed(1)+' '+(cy+rr*Math.sin(ang)).toFixed(1); }
    d+=lob; } return d;
}
```

45° 棋盤格要**只留在主形以外**，用述詞取樣裁切（直線只需留頭尾兩點，這是檔案大小的關鍵）：

```js
function clipStraight(pts,pred){
  var out=[],cur=[];
  pts.forEach(function(p){ if(pred(p[0],p[1]))cur.push(p); else{ if(cur.length>1)out.push(cur); cur=[]; } });
  if(cur.length>1)out.push(cur);
  return out.map(function(s){var a=s[0],b=s[s.length-1];
    return 'M'+a[0].toFixed(1)+' '+a[1].toFixed(1)+'L'+b[0].toFixed(1)+' '+b[1].toFixed(1);}).join('');
}
```

**明文禁用**：寫實描繪、人物鳥獸房屋、細線幾何線描（thin-lineart）、半調網點、`feTurbulence` 手抖濾鏡、`stroke-linecap:round`（阿米希的邊是剪出來的，不是圓的）。

---

## 九、Logo 與 Favicon 設計指南

Logo 就是一床被的縮影，同一組原語：外框 → 四角角石 → 內框 → 中心方 → 菱形 → 中心小菱形，最外圈再走一圈虛線走針。64×64 的網格上每一塊都對齊 1/64。

```svg
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="祖克窪蜂場">
<rect width="64" height="64" fill="#251C2E"/>
<rect x="4" y="4" width="56" height="56" fill="#1D3A6E"/>
<rect x="4" y="4" width="11" height="11" fill="#D8A21C"/><rect x="49" y="4" width="11" height="11" fill="#D8A21C"/>
<rect x="4" y="49" width="11" height="11" fill="#D8A21C"/><rect x="49" y="49" width="11" height="11" fill="#D8A21C"/>
<rect x="15" y="15" width="34" height="34" fill="#B8482C"/>
<path d="M32 15 49 32 32 49 15 32Z" fill="#2E9DAE"/>
<path d="M32 22 42 32 32 42 22 32Z" fill="#D8A21C"/>
<path d="M32 26.5 37.5 32 32 37.5 26.5 32Z" fill="#251C2E"/>
<g fill="none" stroke="#EFE7D6" stroke-width="1.15" stroke-dasharray="2.6 2.4" opacity=".62">
<path d="M9.5 4v56M54.5 4v56M4 9.5h56M4 54.5h56"/>
<path d="M32 18.5 45.5 32 32 45.5 18.5 32Z"/></g></svg>
```

Favicon 用同一段 SVG 轉 data URI 寫在 `<head>`：`<link rel="icon" href="data:image/svg+xml,ENCODED">`。16×16 下仍讀得出「暗框 + 四個亮角 + 中心菱形」——這是本風格在最小尺寸下的識別。

---

## 十、Do &amp; Don't

**Do**

- 先決定那圈最暗的地色，再往裡面放亮色。順序反了就會做出一張吵的海報。
- 色域數控制在四以內（含地色），寧可重複用同一塊布。
- 主視覺置中對稱；長文一律在紙上。
- 每個框都要有角石。
- 絎縫層一定要做，而且要跟拼縫層無關；沒有它畫面只是色塊。
- 間距全部走 12.5px 的針距格。
- 數字用 tabular-nums，因為這個風格的數字是量出來的。

**Don't**

- ✗ 任何漸層、noise、紙紋、布紋貼圖、模糊陰影、圓角。
- ✗ 色域之間加描邊線（那是印度卡車藝術／剪紙／彩繪玻璃的語彙）。
- ✗ 把絎縫畫成有顏色的線，或用 `stroke-dashoffset` 把它「描」出來。
- ✗ 用漂白棉／純白當大面積色域（白只給滾邊與裡布）。
- ✗ 高對比襯線（Playfair、Cormorant）或手寫體。這個風格不典雅、不浪漫。
- ✗ 「EST. 18xx」徽章、緞帶、印章、做舊紙張、咖啡漬。
- ✗ Lorem ipsum、emoji icon、紫藍漸層 hero、置中三張圓角卡片。
- ✗ 把它做成「幾何抽象藝術網站」。它是規矩的產物，不是自由創作的產物。

---

## 十一、頁面骨架範例

```html
<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:wght@500;700;800&family=Noto+Sans+TC:wght@500&family=Noto+Serif+TC:wght@400;700;900&display=swap">
<style>
:root{--aub:#251C2E;--aub-d:#1A1420;--aub-l:#3B2E45;--paper:#EFE7D6;--gld:#D8A21C;--brk:#B8482C;
      --shade:rgba(12,6,16,.52);--lift:rgba(255,255,255,.17)}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--aub);color:var(--paper);font-family:"Noto Serif TC",serif;font-size:16.5px;line-height:1.78}
.wrap{max-width:1160px;margin:0 auto;padding:0 25px}
.band{padding:75px 0}
.paper{background:var(--paper);color:#20181C;padding:37.5px;
  box-shadow:inset 1.2px 1.2px 0 rgba(255,255,255,.7),inset -1.2px -1.2px 0 rgba(80,60,40,.28),5px 6px 0 rgba(0,0,0,.30)}
</style>
</head>
<body>
<header class="mast">
  <div class="in"><a class="brand" href="index.html"><!-- logo svg --><span class="btxt"><b>品牌</b><i>Latin Subtitle</i></span></a>
    <div class="mastinfo">地址　電話<br>營業時間</div></div>
  <nav class="pins" aria-label="主導覽">
    <a href="index.html" aria-current="page"><!-- sewn svg --><span class="n">首頁</span><span class="e">Home</span></a>
    <a href="two.html"><!-- pin svg --><span class="n">第二頁</span><span class="e">Two</span></a>
  </nav>
</header>
<main>
  <section class="band"><div class="wrap">
    <div class="frame">
      <div class="rig"><div class="rail"></div>
        <div class="qhold tilt"><!-- 特徵 3 + 特徵 5 的整床被 SVG --></div>
        <div class="rail"></div></div>
      <div class="card"><!-- 釘著的紙牌：地址、電話、時間、數字 --></div>
    </div>
  </div></section>

  <section class="band tight"><div class="wrap"><div class="paper">
    <div class="hd"><h2>五條規矩</h2><span class="cap">The five rules</span></div>
    <ol class="rules">…</ol>
  </div></div></section>
</main>
<footer class="ft"><div class="wrap"><div class="grid">…</div>
  <p class="fine">虛構示意聲明</p></div></footer>
<noscript>…無 JavaScript 時的完整替代說明…</noscript>
</body></html>
```

---

## 十二、技術實作與相容性

本站以三項技術承載三個視覺特徵。以下為 2026-08-14 查證結果、fallback 具體行為與效能實測值。

### 1. `feDiffuseLighting` / `feSpecularLighting`（A 渲染層）— 承載特徵 5

- **承載什麼**：絎縫的凹痕、縫份的隆起、針身的金屬高光。沒有它，絎縫只能退化成「一條有顏色的線」，而那正是本風格明文禁止的。
- **支援現況**：MDN《`<feDiffuseLighting>`》標示 **Baseline: Widely available**（"well established and works across many devices and browser versions"）；BaseWatch 對 `mdn-svg_elements_feDiffuseLighting` 的統計為全球 **95.4%**，自 **2015-07** 起跨瀏覽器可用。`feSpecularLighting` 同一批。（查證來源：MDN `<feDiffuseLighting>`、BaseWatch `mdn-svg_elements_feDiffuseLighting`，2026-08-14）
- **關鍵參數**：`diffuseConstant = 0.5 / sin(elevation)`。elevation 42° → **0.7472**。這讓平坦處算出 0.5 中灰，配 `mix-blend-mode:overlay` 就是恆等，只有針的兩側被提亮／壓暗。若照預設 `diffuseConstant=1`，整床被會被整體提亮 0.17，顏色全跑掉。
- **`color-interpolation-filters="sRGB"` 必寫。**濾鏡預設在 linearRGB 運算，明暗會過強且與 CSS 端的色彩不一致。
- **Fallback**：不支援濾鏡時 `<g filter>` 內的路徑照常以 `stroke="#fff"` 描出——為避免退化成一片白線，本站把「可見的線」交給另一個不帶濾鏡的 `.q-thread` 群組（淡色虛線，即走針本身），濾鏡群組只在支援時提供明暗。因此不支援濾鏡的環境看到的是「淺色虛線的絎縫」——少了立體感，但拼接、色彩、圖案與全部資訊完全不變。
- **不支援 `mix-blend-mode` 時**（極舊環境）：濾鏡層會直接蓋成灰面，故本站把 `mix-blend-mode` 寫在同一條 CSS 規則裡；若要保險可加 `@supports not (mix-blend-mode:overlay){.q-sink,.q-ridge{display:none}}`。

### 2. CSS Grid `subgrid`（C 版面與樣式層）— 承載特徵 3

- **承載什麼**：被譜 24 張卡片的內部五行（縮圖／名／縫者／針數／價）跨卡對齊。這是「同心格線貫穿內外」在資訊版面上的說法；巢狀 grid 各自算列高就會對不齊，固定高度則會截斷長書名。
- **支援現況**：**Baseline Newly available 2023-09-15**、**Baseline Widely available 2026-03-15**。Firefox 71（2019）、Safari 16.0（2022）、Chrome/Edge 117（2023-09-12／09-15）。caniuse 全球支援 **>92%**。（查證來源：MDN《Subgrid》、web.dev《CSS subgrid》、caniuse `css-subgrid`，2026-08-14）
- **Fallback**：整段包在 `@supports (grid-template-rows:subgrid)` 內。不支援時卡片是各自獨立的 grid，內容完全相同、順序完全相同，只是列高各卡不一致——**資訊零損失，只損失對齊**。

### 3. OKLab 明度差作為配色驗收（E 資料與生成層）— 承載特徵 2

- **承載什麼**：「深色包著亮色」這條規則要能被機器驗。核心功能（換布棚）的兩條退件條款就是 ΔL 門檻，畫面上的讀數與布的挑選一一對應。
- **為什麼不用 sRGB 亮度**：本站孔雀藍 `#2E9DAE` 與酒紅 `#A81D57` 的 sRGB relative luminance 幾乎相同，OKLab L 差 **0.157**；照 sRGB 判會把一組看得出來的配色判成看不出來。
- **支援現況**：CSS 的 `oklch()` / `oklab()` 為 **Baseline Widely available**，自 **2023-05** 起跨瀏覽器（Chrome/Edge 111+、Firefox 113+、Safari 15.4+）；`color-mix()` 為 Chrome/Edge 111+、Firefox 113+、Safari 16.2+。（查證來源：MDN《oklch()》《oklab()》、web-platform-dx features explorer `oklab`，2026-08-14）
- **本站的作法與 fallback**：CSS 端一律以 hex 宣告色票（無支援缺口），OKLab 只在 **JavaScript 端**做數值運算（純算術，無瀏覽器 API 依賴，故無相容性問題）。想在 CSS 端用 `oklch()` 微調時，寫成 `color: #A81D57; color: oklch(48.6% .17 5);` 兩行，舊瀏覽器吃第一行。

### 效能預算實測（2026-08-14，Node 22 / 單執行緒）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | index 83.1KB／蜜 56.4KB／換布棚 54.3KB／被譜 97.5KB | ≤350KB ✓ |
| 整床被 SVG 產生 | **1.5ms**／床（31.6KB）；縮圖版 **0.02ms**／床（1.7KB） | 首屏 JS ≤100ms ✓ |
| 被譜 24 張縮圖 | 建置階段輸出為靜態 SVG，執行期 0ms | — |
| 絎縫路徑總量 | 17 行、29.4KB path data，以 `<defs>`+`<use>` 只存一份 | — |
| 濾鏡重繪頻率 | 每 1.77 秒一次（一行絎縫落下時），非每幀 | 60fps ✓ |
| 針的動畫 | 每幀只寫一次 `transform`，零 `getBoundingClientRect`、零 layout | 無 layout thrashing ✓ |

**檔案大小的關鍵手法**：(a) 絎縫路徑放 `<defs>`，`.q-sink` 與 `.q-thread` 各以 `<use href>` 引用，省掉一整份重複的 path data（單床 61.3KB → 31.6KB）；(b) 45° 棋盤格是直線，裁切後只留頭尾兩點而不是 200 個取樣點（166.8KB → 61.3KB）；(c) 所有座標 `toFixed(1)`。

**濾鏡的效能紅線**：`feDiffuseLighting` 的成本與濾鏡區域面積成正比，且**每次群組內容變動就整區重繪**。所以絎縫必須「一行一行落下」（1.77 秒一次）而不是「每幀畫一針」——後者在 1000×1000 的濾鏡區上會直接掉幀。這是本站把 signature 設計成離散逐行而非連續描繪的技術原因，剛好也與手縫的真實節奏一致。

---

*本 SKILL.md 隨範例站〈祖克窪蜂場 Zook Hollow Apiary〉發布。外部參照：Lancaster County Amish quilts c. 1880–1940；Jonathan Holstein &amp; Gail van der Hoof,《Abstract Design in American Quilts》, Whitney Museum of American Art, 1971；The Esprit Collection of Amish quilts（Doug Tompkins, 1970s–80s）。*
