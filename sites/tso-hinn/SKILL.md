---
name: shanghai-calendar-poster
description: Shanghai calendar-poster style (yuefenpai) — a charcoal rub-and-wash tonal ground carries all form, transparent watercolour glazes with drying edges carry only colour, a dual solar/lunar calendar band and vertical benediction rails frame the picture, and the whole sheet is brass-edged, hung for a year, and fades pigment by pigment.
---

# 月份牌　Shanghai Calendar Poster（擦筆水彩・彩色石印）

> 本規格書描述一九一〇至四〇年代上海、以及一九五〇年後由關蕙農等人在香港延續的「月份牌」廣告畫視覺語言。
> 它的技法本體是 **擦筆水彩**（先以炭精粉擦出連續明暗，再罩透明水彩）；
> 它的物件本體是 **一張要掛滿一年、上下軋銅邊、會褪色的紙**。
> 兩者缺一，畫面就只是「復古插畫」，不是月份牌。

---

## 〇、本風格的 5 個不可省略特徵

拿掉其中任何一項，畫面就不再是月份牌。每一項附可直接抄走的做法。

### 特徵一　擦筆炭底承擔全部造形（The rub-and-wash ground）

月份牌的立體感**不是顏色做的**。鄭曼陀在一九一四年前後把照相館的修版／放大著色技法帶進廣告畫：
先用羊毫或棉花團蘸炭精粉，在厚紙上反覆擦揉出連續明暗，把形、光、體積全部做完（約佔七成工時），
顏色才以透明水彩罩上去。

**驗收方法（本風格唯一的硬測試）：把畫面上所有顏色的不透明度設為 0。畫如果還在，就對了；如果只剩幾塊平色，就錯了。**

```css
/* 每一個色域底下先鋪一層連續明暗，這一層決定造形 */
.region { fill: url(#ground); }
```

```svg
<radialGradient id="ground" cx=".34" cy=".3" r=".85">
  <stop offset="0"   stop-color="#F0EAE2"/>
  <stop offset=".55" stop-color="#F0EAE2" stop-opacity=".55"/>
  <stop offset="1"   stop-color="#4A3E36"/>
</radialGradient>

<!-- 炭粉顆粒：整組炭底套一次，不要逐塊套（效能與接縫） -->
<filter id="grain" x="-4%" y="-4%" width="108%" height="108%">
  <feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" seed="17" result="n"/>
  <feColorMatrix in="n" type="saturate" values="0" result="ns"/>
  <feComponentTransfer in="ns" result="na"><feFuncA type="linear" slope=".30"/></feComponentTransfer>
  <feComposite in="na" in2="SourceGraphic" operator="in" result="grit"/>
  <feBlend in="SourceGraphic" in2="grit" mode="multiply"/>
</filter>
```

光源方向全畫面一致（習慣為左上，`cx≈.34 cy≈.30`），亮處留紙白不上白粉，只有最後提亮的三五點才點白。

### 特徵二　透明罩染與水痕邊（Glaze + drying edge）

顏色一律 `mix-blend-mode: multiply` 疊乘。透明水彩的飽和度本來就上不去——**不要用平塗色去追它**。
每一個色域的邊緣必須有一圈比自己深的線：那是水乾涸時顏料被推到邊上留下的痕，是本風格的指紋，不准修掉。

```css
.glaze, .edge { mix-blend-mode: multiply; }
```

```svg
<!-- 同一條路徑用兩次：先罩色，再描一圈深 38% 的水痕 -->
<path d="…" fill="#C2465E" opacity=".60"/>
<path d="…" fill="none" stroke="#782B3A" stroke-width="1.7" opacity=".55"/>
```

**層數即不透明度階**：一層 `.30`／兩層 `.60`／三層 `.90`。第三層會把炭底蓋死，全畫至多兩塊可以上到第三層。
膚色永不超過兩層，且不得用冷色（膚一上冷色就成了面具）。

### 特徵三　雙軌曆格與廠標橫額（The calendar band）

**沒有日曆的不是月份牌，是海報。** 月份牌能在牆上掛滿一年，理由是它有用。
版面上緣必有一條深色橫額印廠牌（金字、極寬字距），下緣必有一整片曆格：
陽曆用高對比襯線拉丁數字，農曆與二十四節氣用中文小字排在它下面。星期日與節氣轉紅，
今天那一格用**手畫的朱圈**框起來——圈是歪的，因為是人畫的。

```css
.head{ background:#2B2320; color:#D2A02E; text-align:center; padding:13px 20px 12px; }
.head .cn{ font-size:31px; font-weight:900; letter-spacing:.42em; text-indent:.42em; }

.grid7{ display:grid; grid-template-columns:repeat(7,1fr); gap:1px; background:rgba(43,35,32,.20); }
.cell{ background:#FAF1DE; min-height:50px; padding:3px 4px 4px; position:relative; }
.cell .g{ font-family:'Bodoni Moda',serif; font-size:19px; }   /* 陽曆 */
.cell .l{ font-size:10.5px; color:#6B5A50; }                   /* 農曆／節氣 */
.cell.sun .g, .cell.term .g{ color:#A2334B; }

/* 不圓的圓：四角半徑各不相同，才像手畫的 */
.cell.today::after{
  content:""; position:absolute; inset:2px;
  border:2.4px solid #C2465E;
  border-radius:48% 52% 47% 53% / 52% 47% 53% 48%;
}
```

### 特徵四　直排吉語與縦中横（Vertical benediction + tate-chū-yoko）

畫的左右各垂一條直排吉語（四字或七言，一條暖色一條冷色），中間夾的阿拉伯數字必須「縦中横」轉正並擠成一個字格。
這是中文直排的本體規則，不是效果。

```css
.bless{
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-weight: 900; font-size: 19px; letter-spacing: .30em; line-height: 1.25;
}
.tcy{ text-combine-upright: all; -webkit-text-combine: horizontal; }
```

```html
<p class="bless">一年三百六十日</p>
<p class="bless">民國<span class="tcy">115</span>年　第<span class="tcy">91</span>張</p>
```

只用 `all`，不要用 `digits`（支援度差很多）；只用在兩三位數的短跨度上。

### 特徵五　銅軋邊與掛環（The metal edge）

它是一張**要被掛一年的實體**，不是一個版面。上下各一條銅軋邊夾住紙，上緣打兩個掛環，右下角因受潮而微捲。
少了這三件，它只是一張圖片。

```css
.poster{ position:relative; background:#FAF1DE; }
.poster::before, .poster::after{
  content:""; position:absolute; left:0; right:0; height:13px;
  background:linear-gradient(#F6E9BE,#D9B75E 38%,#8A6A22 54%,#E3C778 74%,#8F6F27);
}
.poster::before{ top:0 } .poster::after{ bottom:0 }

.rings span{ width:19px; height:19px; border-radius:50%;
  border:3.5px solid #A8842E; background:transparent;
  box-shadow: inset 0 1px 0 #F6E9BE, 0 1px 0 rgba(43,35,32,.3); }

.curl{ position:absolute; right:0; bottom:13px; width:74px; height:74px;
  background:linear-gradient(225deg,#E4D3B6 0%,#D3BE9A 42%,transparent 43%);
  clip-path:polygon(100% 0,100% 100%,0 100%); transform-origin:100% 100%; }
```

---

## 一、設計哲學

1. **擦七分，罩三分。** 造形的預算全部給明暗，顏色只負責辨識與情緒。這一條決定了其他所有規則。
2. **它會老。** 海報貼一週，月份牌掛一年，所以它必然褪色，而且**不是整張一起褪**——
   有機的洋紅先走，藤黃次之，礦物性的花青與石綠穩得多，炭黑幾乎不動。設計時就要決定「三年後這張畫剩下什麼」。
3. **它有用。** 曆格是它被留在牆上的理由，不是裝飾。把曆格當花邊處理，就會立刻掉回「復古海報」。
4. **廠牌在最上面，畫在中間，日子在下面。** 這個三段式是硬結構，不要為了「創新」把它打散。
5. **拒絕硬邊。** 畫裡沒有一條幾何直線邊界（框與曆格除外），沒有一塊平色，沒有圓角，沒有模糊陰影。

---

## 二、色彩系統

底色是紙，不是白。所有顏色都必須帶明暗變化——**平色是本風格唯一的死罪**。

| 色票 | hex | 角色 | 面積比 |
|---|---|---|---|
| 生宣紙 | `#F1E4CE` | 全站地色（紙） | ~30% |
| 紙亮 | `#FAF1DE` | 畫面與卡片的紙 | ~14% |
| 紙暗 | `#E4D3B6` | 壓在下面的紙、空格 | ~6% |
| 炭墨 | `#2B2320` | 炭底最深、正文、橫額底 | ~20% |
| 炭中 | `#6B5A50` | 次級文字、農曆小字 | ~6% |
| 洋紅 | `#C2465E` | 罩染主體暖色、朱圈、印記（**圖用**） | ~8% |
| 深洋紅 | `#A2334B` | 連結、錯誤、節氣紅字（**字用**，對比 5.4:1） | ~2% |
| 粉桃 | `#E0A08D` | 膚色、淡暖 | ~4% |
| 藤黃 | `#D2A02E` | 廠標金字、現用態、金線 | ~5% |
| 石綠 | `#5F8A63` | 葉、冷色（字用 `#3E6B45`） | ~3% |
| 花青 | `#3D6F84` | 衣、水、冷色主力 | ~10% |
| 深靛 | `#23343E` | footer | ~4% |

**分溫規則（決定整張畫成不成立）**：暖＝洋紅／粉桃／藤黃；冷＝花青／石綠；炭墨不分溫。
**主體與地必須一冷一暖**，否則人會陷進背景。地上炭墨即為黑白照，不是月份牌。

**耐光度（相對次序才是可信的，數字為示意）**

| 顏料 | 石版 | 半衰期（掛牆天） | 一年後 | 三年後 |
|---|---|---|---|---|
| 洋紅 | 紅版 | 210 | 30% | 3% |
| 粉桃 | 紅版 | 265 | 38% | 6% |
| 藤黃 | 黃版 | 430 | 56% | 17% |
| 石綠 | 綠版 | 620 | 66% | 29% |
| 花青 | 藍版 | 950 | 77% | 45% |
| 炭墨 | 墨版 | 6000 | 96% | 88% |

實作建議：把六個顏料寫成六個 CSS 變數 `--k-rose`…`--k-ink`（0–1 的剩餘量），
罩染層的不透明度寫成 `calc(var(--k-rose,1) * .60)`。
這樣「褪色」只要改六個數字、不必重繪任何圖形，可以 60fps。

```css
:root{ --k-ink:1; --k-rose:1; --k-peach:1; --k-gamboge:1; --k-jade:1; --k-cyan:1; }
.glaze-rose{ opacity: calc(var(--k-rose,1) * .60); }
```

```js
// 半衰期模型：k = 2^(-掛牆天數 / 半衰期)
const HALF = {ink:6000, rose:210, peach:265, gamboge:430, jade:620, cyan:950};
const fade = (p, days) => Math.pow(2, -Math.max(0, days) / HALF[p]);
```

---

## 三、字體系統

| 用途 | 字體 | 字重 | 尺寸／行高 |
|---|---|---|---|
| 廠標橫額 | Noto Serif TC | 900 | 31px／1.25，`letter-spacing:.42em` |
| 標題 h2 | Noto Serif TC | 900 | 26px／1.42，`letter-spacing:.06em` |
| 標題 h3 | Noto Serif TC | 900 | 19px／1.42 |
| 正文 | Noto Serif TC | 400 | 16.5px／**2.0**（月份牌的行距鬆） |
| 直排吉語 | Noto Serif TC | 900 | 19px，`letter-spacing:.30em` |
| 陽曆數字・價目・編號 | Bodoni Moda | 400／700 | 依用途；高對比 didone 是本風格的洋派來源 |
| 農曆與節氣小字 | Noto Serif TC | 400 | 10.5px／1.5 |

Google Fonts：
`Noto+Serif+TC:wght@400;700;900` ＋ `Bodoni+Moda:ital,wght@0,400;0,700;1,400`。

**禁止**：無襯線黑體當正文（那是包浩斯或瑞士，不是月份牌）、等寬字、圓體。

---

## 四、版面與網格

### 月份牌本體（畫面主角，比例約 1:1.75 直式）

```
┌ 銅軋邊 13px ─────────────────────┐  ← 掛環 ×2（左右各距邊 82px）
│  橫額：廠標（墨底金字，字距 .42em）  │
│ ┌─46px─┬────── 主圖 ──────┬─46px─┐│
│ │直排吉語│  擦筆水彩畫（唯一的圖）  │直排吉語││
│ └──────┴─────────────────┴──────┘│
│  雙軌曆格（7 欄 × 5–6 列）           │
│  讀值列（今日：陽曆／農曆／干支）      │
│  資訊帶（墨底：館址・電話・時間）      │
└ 銅軋邊 13px ─────────────────────┘  ← 右下角捲角 74px
```

- 三段式（橫額／畫／曆）是硬結構。畫**不允許**出血到邊，它永遠被紙框著。
- 內文頁採不對稱兩欄 `1.35fr .95fr`，右上角留給導覽（見元件配方）。
- 分節線一律 `border-top:2.5px solid #2B2320`，無圓角。
- RWD：`≤1080px` 導覽攤為橫列；`≤560px` 側邊吉語欄收成 28px、曆格最小高 42px、陽曆數字降為 16px、捲角縮為 48px。

---

## 五、元件配方

### 導覽（pinstack 圖釘疊紙）

四頁＝四張用同一根圖釘釘在牆上的紙。**現用頁那張在最上面、完全展開**，其餘三張被壓在下面只露出 26px 的邊，
各自歪 −2.4°／1.6°／−1.1°，每張左上角都有一個銅色釘孔。語意是**疊序**，不是高亮。

```css
.pins{ position:fixed; top:20px; right:22px; width:212px; display:flex; flex-direction:column; }
.pins .pin{ position:relative; background:#FAF1DE; border:1px solid rgba(43,35,32,.42);
  box-shadow:2px 3px 0 rgba(43,35,32,.14); padding:8px 12px 9px; margin-top:-1px;
  transition: transform .18s cubic-bezier(.3,.9,.28,1); }
.pins .pin:not(.on){ height:26px; overflow:hidden; background:#E4D3B6; }
.pins .pin:nth-child(2):not(.on){ transform:rotate(1.6deg) }
.pins .pin:not(.on):hover{ height:44px; transform:rotate(0) translateX(-8px); background:#FAF1DE; }
.pins .pin.on{ order:-1; border:1.5px solid #2B2320; box-shadow:3px 5px 0 rgba(43,35,32,.22); }
.pins .pin.on::before{ content:""; position:absolute; inset:-1px auto -1px -1px; width:4px; background:#C2465E; }
.pin .hole{ position:absolute; left:6px; top:6px; width:7px; height:7px; border-radius:50%;
  background:radial-gradient(circle at 34% 30%,#8A6A22,#3A2C10); }
```

### 按鈕

```css
.btn{ font-weight:900; letter-spacing:.1em; background:#FAF1DE; color:#2B2320;
  border:1.5px solid #2B2320; padding:8px 16px; box-shadow:2px 2px 0 rgba(43,35,32,.35); }
.btn:hover{ background:#D2A02E; }
.btn:active{ transform:translate(2px,2px); box-shadow:0 0 0; }
.btn.pri{ background:#A2334B; color:#FAF1DE; }
```

### 卡片與表格

```css
.card{ background:#FAF1DE; border:1px solid rgba(43,35,32,.34); padding:16px 18px;
  box-shadow:2px 3px 0 rgba(43,35,32,.12); }           /* 實心位移影，不准模糊 */
.tbl th{ background:rgba(43,35,32,.07); font-weight:900; letter-spacing:.06em; }
.tbl th,.tbl td{ border-bottom:1px solid rgba(43,35,32,.26); padding:7px 9px; }
.tbl td.n{ font-family:'Bodoni Moda',serif; text-align:right; }
/* 顏料不要塗成整格底色（違反「不准平色」），用一枚色籤 */
.chip{ display:inline-block; width:12px; height:12px;
  border:1px solid rgba(43,35,32,.5); margin-right:6px; vertical-align:-1px; }
```

### 表單

```css
input,select,textarea{ background:#F1E4CE; border:1.5px solid rgba(43,35,32,.6); padding:5px 8px; }
:focus-visible{ outline:2.5px solid #3D6F84; outline-offset:2px; }
.err{ color:#A2334B; font-weight:700; font-size:13px; }
```

### Footer

深靛 `#23343E` 滿版、三欄、`13.5px/1.95`，連結用藤黃。

---

## 六、動效規則（四種，缺一不可）

| 類別 | 名稱 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient | 紙受潮微捲 paper-curl | 無 | `46s ease-in-out infinite alternate`；右下捲角 `rotate(0→-1.1deg) scale(1→1.06)` | 停在 `rotate(-.6deg)`，捲角仍在 |
| input | 曆格壓印 press-in | hover／focus 任一日格 | `<100ms`，無淡入：背景轉 `#FBF4E2` ＋ `inset 0 0 0 1.5px` ＋ 數字位移 `.5px,1px`；同時把該日的農曆／節氣／干支寫進讀值列 | 位移取消，讀值列照常更新（資訊零損失） |
| transition | 掀紙 sheet-lift | 換頁載入、換月 | `520–560ms cubic-bezier(.3,.9,.28,1)`；`perspective(1300px) rotateX(-15deg) translateY(-12px)` → `none`，`transform-origin:top center` | `animation:none`，直接是最終畫面 |
| signature | **掛久了 pigment-fade** | 真實日期＋竹尺 | 六個 `--k-*` 變數＝`2^(-天數/半衰期)`；只改變數、不重繪任何幾何 | 本來就是狀態不是動畫；拖桿照常可用，數值同步 |

```css
@keyframes sheet-in{ from{ transform:perspective(1300px) rotateX(-15deg) translateY(-12px); opacity:.5 }
                     to  { transform:none; opacity:1 } }
.sheet,.lift{ transform-origin:top center; animation:sheet-in 520ms cubic-bezier(.3,.9,.28,1) both; }
@keyframes curl{ from{transform:rotate(0) scale(1)} to{transform:rotate(-1.1deg) scale(1.06)} }
@media (prefers-reduced-motion:reduce){ .sheet,.lift{animation:none} .curl{animation:none;transform:rotate(-.6deg)} }
```

**禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、`stroke-dashoffset` 描繪、按壓硬陰影當簽名。
本風格的動效預算應該全部花在「紙的物質狀態」上。

---

## 七、插畫與圖像風格（rubwash-glaze 擦筆罩染構成）

全站**零外部圖片**。所有圖像由三種原語構成，且必須全部同源（logo、favicon、插圖、印記都出自同一支引擎）：

1. **炭底**：閉合有機路徑 ＋ 放射漸層（連續明暗）＋ 全組統一套一層 `fractalNoise` 顆粒。造形只在這裡。
2. **罩染**：同一條路徑以顏料色 `multiply` 疊上，外加一圈深 38% 的水痕描邊。
3. **金線與朱印**：`1.2px` 藤黃勾邊只給廠標、吉語框與曆格；朱文方印只給落款與回執。

形狀一律用參數化生成器產出，不要手抓座標：

```js
blob(cx,cy,r,seed,{n,irr,sx,sy,rot})  // 有機團塊（頭、肩、缸、山、鳥身）
petal(cx,cy,len,wid,ang,curl)         // 水滴形花瓣（花、帆、鰭）
leaf(x,y,len,wid,ang,bend)            // 葉（枝葉、竹葉、水草）
stem(x0,y0,x1,y1,w0,w1,bend)          // 由粗到細的錐帶（枝、竿、扇柄）
vessel(cx,yTop,yBot,[w…])             // 左右對稱旋轉體（瓶、缸）
```

輪廓點以 Catmull–Rom 轉三次貝茲收尾，確保沒有一段折線。
同一個 seed 恆得同一個形（FNV-1a → mulberry32），所以分享碼可以完整還原。

**判準**：把顏色抽掉，圖仍然完整；把炭底抽掉，只剩幾塊平色——後者就是做錯了。
**禁用**：細線幾何線描、半調網點、等角視圖、硬邊色塊、寫實照片描摹。

---

## 八、Logo 與 Favicon

- **Logo**（`320×120`）：上下各一條 9px 銅軋邊 → 左側一枚「擦筆罩染的圓」（炭底 ＋ 洋紅 multiply ＋ 水痕描邊，即本風格的縮影）
  → 兩枚掛環 → 右側店號（Noto Serif TC 900，字距 3）＋ 拉丁副名（Bodoni Moda，字距 2.4）→ 底部一條墨線代表曆格。
- **Favicon**（`32×32` 原創 inline SVG data URI）：紙底 → 上下兩條藤黃軋邊 → 一枚洋紅半透明圓（左上壓一枚紙色小圓＝高光）→ 底部一條墨線。
  **不要**畫相機、不要把 logo 全文縮小塞進去。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=…%3E">
```

---

## 九、Do & Don't

**Do**

- 先做炭底，再上色；隨時能把顏色關掉檢查造形。
- 每一塊顏色都帶明暗；每一個色域都有水痕邊。
- 曆格是真的曆：農曆要算對，節氣要標對。
- 主體與地一冷一暖；洋紅至多三塊；三層至多兩塊；膚不過兩層且不上冷色。
- 明講你的畫三年後會變什麼樣——這是本風格的內建敘事。
- 文字用深洋紅 `#A2334B`，圖形才用 `#C2465E`（對比）。

**Don't**

- ❌ 平塗色塊、圓角、模糊陰影、漸層按鈕、紫藍漸層 hero。
- ❌ 用無襯線黑體排正文，或用等寬字排數字。
- ❌ 把曆格當花邊、只印月份不印日子，或乾脆不放曆。
- ❌ 把畫出血到版面邊緣（月份牌永遠被紙框著）。
- ❌ 「EST. 19xx」徽章、emoji 圖示、Lorem ipsum、AI 腔文案。
- ❌ 用照片或 AI 生圖冒充擦筆水彩——本風格的辨識點正是「顏色抽掉畫還在」，照片做不到。
- ❌ 把褪色做成「懷舊濾鏡」（整張一起變黃）。它是**分顏料**的，方向性才是重點。

---

## 十、頁面骨架範例（可直接使用）

```html
<div class="poster" style="--k-ink:.98;--k-rose:.55;--k-peach:.62;--k-gamboge:.74;--k-jade:.81;--k-cyan:.88">
  <div class="rings" aria-hidden="true"><span></span><span></span></div>

  <div class="head">
    <span class="cn">曼真照相館</span>
    <span class="en">MAN CHAN PHOTO STUDIO　香港上環　一年一張</span>
  </div>

  <div class="body">
    <div class="bless">一年三百六十日<small>　丙午</small></div>
    <div class="plate">
      <svg class="mc-art" viewBox="0 0 640 860">
        <defs><radialGradient id="g0" cx=".34" cy=".3" r=".85">…</radialGradient></defs>
        <g class="mc-char" filter="url(#grain)"><path d="…" fill="url(#g0)"/></g>
        <g class="mc-glaze"><path d="…" fill="#C2465E"
             style="opacity:calc(var(--k-rose,1) * .60)"/></g>
        <g class="mc-edge"><path d="…" fill="none" stroke="#782B3A" stroke-width="1.7"
             style="opacity:calc(var(--k-rose,1) * .55)"/></g>
      </svg>
    </div>
    <div class="bless two">留得容光在紙間<small>　第<span class="tcy">91</span>張</small></div>
  </div>

  <div class="calband">
    <div class="cbhd">
      <span class="mo num">8<em>八月</em></span>
      <span class="gz">丙午年　<span class="lat">AUGUST 2026</span></span>
    </div>
    <div class="sheet">
      <div class="grid7" role="table">
        <div class="wd">日</div>…<div class="wd">六</div>
        <div class="cell today" tabindex="0"><span class="g num">19</span><span class="l">初七</span></div>
        <div class="cell term" tabindex="0"><span class="g num">23</span><span class="l">處暑</span></div>
      </div>
    </div>
    <p class="readout" aria-live="polite"><span>2026／08／19</span>　丙午年七月初七　乙丑日</p>
  </div>

  <div class="foot-strip">
    <span><b>館址</b> …</span><span><b>電話</b> …</span><span><b>開館</b> …</span>
  </div>
  <div class="curl" aria-hidden="true"></div>
</div>
```

---

## 十一、技術實作與相容性

本站三項核心技術、各自承載哪一個視覺特徵、以及查證結果（查證日 **2026-08-19**）。

### 1. `Intl.DateTimeFormat` 的 `chinese` 曆法（E 資料與生成層）

**承載特徵三**（雙軌曆格）與簽名動效的時間基準——「掛牆天數」是從**農曆正月初一**起算的，
沒有農曆換算就沒有這個起點。

- **支援現況**：`Intl.DateTimeFormat` 為 **Baseline Widely available**，自 2017-09 起跨瀏覽器（MDN《Intl.DateTimeFormat》／caniuse `intl.datetimeformat`）。
  `calendar` 選項與 `-u-ca-chinese` locale 擴充屬 ECMA-402；主流引擎（V8／SpiderMonkey／JavaScriptCore）皆隨附完整 ICU 資料。
  閏月在 `formatToParts()` 的 `month` 值上以 `"6bis"` 形式回報。
- **fallback**：本站在**建置階段**用同一支 API 把丙午年全年（農曆日、二十四節氣、日干支）算成一張 5.6 KB 靜態年表寫進 HTML；
  執行時先試 `Intl`（並以「2026-02-17 必須是正月初一」做自檢），失敗即退回年表。兩者在丙午年全年一致，資訊零損失。
  頁面讀值列會誠實標示「農曆來源：Intl／年表」。
- **二十四節氣**不是 `Intl` 提供的：本站以視太陽黃經每 15° 求根（Meeus 低精度日心經度＋章動修正，東八區）算出，
  與公開曆書對照 2026 年 24 個節氣**日期全數相符**（立春 2/4、春分 3/20、夏至 6/21、立秋 8/7、處暑 8/23、冬至 12/22…）。

### 2. CSS `writing-mode` ＋ `text-orientation` ＋ `text-combine-upright`（C 版面與樣式層）

**承載特徵四**（直排吉語與縦中横）。

- `writing-mode: vertical-rl`：**Baseline Widely available**，自 2017 年起跨瀏覽器，全球約 96%（caniuse `css-writing-mode`）。
- `text-combine-upright: all`：全球 **96.68%**（caniuse `mdn-css_properties_text-combine-upright`，2026-07 統計）——
  Chrome/Edge 48+、Firefox 48+、Safari 15.4+、Opera 35+、Samsung Internet 5+；
  Chrome 9–47／Safari 5.1–15.3／Opera 15–34 為舊名 `-webkit-text-combine`（本站一併宣告）。
- **規格陷阱**：`digits` 值的支援度遠低於 `all`（Firefox 不支援），故本站**只用 `all`**，且只包在兩三位數的短跨度上。
- **fallback**：不支援時數字沿直排方向逐字轉正排列，仍完全可讀，版面不破；退化是漸進的，不需要 `@supports`。

### 3. SVG filter `feTurbulence` ＋ `feComposite` ＋ `feBlend`（A 渲染層）

**承載特徵一**的炭粉顆粒——擦筆水彩的紙面顆粒是它與「向量插畫」的分野。

- **支援現況**：SVG filter 基本濾鏡（`feTurbulence`／`feColorMatrix`／`feComponentTransfer`／`feComposite`／`feBlend`）
  為 **Baseline Widely available**，自 2015-07 起跨瀏覽器（MDN《SVG filter primitives》）。
- **fallback**：不支援或濾鏡被停用時整個 `filter` 屬性被忽略，炭底的放射漸層與罩染完全保留，只是少了顆粒。
  造形、明暗、顏色與全部資訊零損失。
- **效能注意**：`feTurbulence` 每像素成本高。**只套在炭底那一組 `<g>` 上，一頁一次**，
  且**絕對不要動畫 `baseFrequency`**（會每幀重算整張噪聲）。本站環境動效只動 `transform`，
  簽名動效只改六個 CSS 自訂屬性——兩者都不觸發濾鏡重算，也不觸發 layout。

### 效能預算實測

| 項目 | 預算 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | ≤350 KB | index 58 KB／room 88 KB／craft 75 KB／book 71 KB |
| 首屏 JS | ≤100 ms | inline JS：index 9.3 KB／room 31 KB／book 10 KB／craft 0 KB；無網路請求、無同步 layout 讀取 |
| 主要動畫 | 60 fps | 簽名動效每次只寫 6 個 `setProperty`，零 `getBoundingClientRect`，不改幾何故不觸發 layout；ambient 只動 `transform` |
| 外部資源 | 僅 Google Fonts | 零外部圖片、零音檔、零函式庫 |

### 無障礙

- 四頁全部內容為可選取的一般 HTML 文字；曆格 `role="table"`，讀值列 `aria-live="polite"`。
- 每一個曆格 `tabindex="0"`，鍵盤可逐格讀出農曆／節氣／干支。
- 配色台的顏料鈕帶 `aria-label`（「旗袍：洋紅」）與 `aria-pressed`，不依賴顏色辨識；
  表格裡的顏料與紙況一律「色籤 ＋ 文字」，不用顏色單獨承載資訊。
- 對比：正文 `#2B2320` on `#F1E4CE` ≈ **12.3:1**；次級 `#6B5A50` ≈ **5.2:1**；連結 `#A2334B` ≈ **5.4:1**（最暗紙色上仍 4.8:1）。
- 四種動效皆有 `prefers-reduced-motion` 降級，且降級後資訊零損失。
