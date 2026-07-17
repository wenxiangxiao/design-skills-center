---
name: hong-kong-neon
description: Hong Kong neon-street aesthetic with a real wall-clock day/night engine — signs sit as dead glass by day and ignite into buzzing bloom at night, driven by the visitor's local time.
---

# 港式霓虹 Hong Kong Neon — 跟住真實時鐘着燈嘅街

> 一句講晒：呢個唔係「深色配霓虹色」咁簡單。核心係**時間**——招牌會由「死玻璃」（未着燈嘅灰管）過渡到「着燈」（發光嗡響）,而過渡由訪客部機嘅真實時鐘決定。做呢個風格,先諗清楚「白天同夜晚係兩個唔同嘅畫面」,再落色。

---

## 一、設計哲學

1. **時間係第一材料**。旺角霓虹嘅靈魂唔喺顏色,喺「夜晚先着」。所以呢個風格嘅底層唔係一張靜態設計,而係一條時刻曲線:天色、招牌亮度、環境暗度全部係「幾點」嘅函數。任何用呢個風格嘅站,都要問:中午打開見到咩?凌晨三點打開見到咩?兩者一定要唔同。
2. **死玻璃 vs 着燈是核心對照**。未着燈嘅霓虹管係半透明灰玻璃,冇 glow;着燈係飽和色＋雙層 bloom＋輕微閃爍嗡動。同一支管有兩個生命,靠一個 `--on`（0→1）變數插值。
3. **極密,唔怕逼**。旺角招牌係層層疊、爭住突出。留白唔係呢個風格嘅美德;招牌可以互相壓、斜插、懸吊。但資訊層級要清:一個主招牌（大、金）＋幾個副招牌(細、各色)。
4. **地道,唔離地**。文案用粵語書面語(着燈／落閘／收爐／入座),價目用港幣,品牌敘事由行業長出嚟。唔好寫成「時尚酒吧」腔。
5. **暮色為結構底,唔係純黑**。底色係暮色靛藍(mid-tone),深夜加深、白晝提亮。純黑會令招牌孤立;暮色令佢哋坐喺一條真嘅街入面。

---

## 二、色彩系統

| 用途 | Hex | 比例 | 說明 |
|------|-----|------|------|
| 結構底 base | `#14202e` | 骨架 | 暮色靛藍,mid-tone;非純黑 |
| 天色頂 `--sky-a` | 由時刻演算 `#0a0f18`（深宵）→`#9db4c7`（晏晝） | 動態 | 見第七章曲線 |
| 天色底 `--sky-b` | 由時刻演算 `#14202e`→`#dfe7ec` | 動態 | 與 `--sky-a` 組成天空漸層 |
| 霓虹金 gold | `#ffd23f` | 主招牌／強調 25% | 亮記主色,最搶眼 |
| 霓虹紅 red | `#ff2d55` | CTA／大牌檔 20% | 熱、召喚 |
| 霓虹青 cyan | `#22e0d6` | 副標／標籤 15% | 冷、資訊性 |
| 霓虹粉 pink | `#ff5ca8` | 點綴招牌 10% | |
| 霓虹綠 green | `#39ff88` | 「入座」箭咀／成功態 10% | |
| 霓虹橙 orange | `#ff7a1a` | 街道地面暖霞、細招牌 8% | |
| 暖白 ink | `#f4ece0` | 內文正字 | |
| 灰藍 ink-dim | `#b9c2c9` | 次要文字 | |
| 分格線 seam | `rgba(244,236,224,.16)` | 2px 或 1px 實線／點線 | 去圓角硬邊 |

配色規則:一頁最多用兩到三支霓虹色做主導,其餘做細點綴。金＋紅＋青係亮記三本柱。**唔好六色齊上、一樣大**——霓虹靠對比,唔靠齊放。

---

## 三、字體系統

- **招牌中文**：`Noto Serif TC` 900。港式霓虹招牌傳統用「北魏楷書」;Google Fonts 冇北魏,用 Noto Serif TC 最重字重做代理,夠骨、夠力。字級大(招牌 46–82px)。
- **拉丁展示／標籤**：`Oswald` 600–700,窄身大寫,似舊式招牌拉丁字。
- **數字／機讀資訊**：`DM Mono`,價目、時鐘、編號、條碼字全用等寬,強化「街市／單據」感。
- **字級 scale**：招牌 clamp(30px,6vw,54px)／H2 clamp(24px,4vw,38px)／內文 14–15px／標籤 mono 10–11px letter-spacing 2–4px 大寫。
- **行高**：招牌 1.05、內文 1.7–1.85(粵語書面語字密,要鬆行距)。

---

## 四、版面與網格

- **街景直開場（streetscape-first）**：首屏唔設大標 hero,而係一幅 SVG 霓虹街景(`viewBox 0 0 1200 720`,`preserveAspectRatio="xMidYMax slice"`)舖滿,招牌懸掛喺樓宇之間,右上疊品牌短文,左下疊時刻控制 HUD。
- **不對稱**：主垂直招牌(側向突出)放左、橫招牌散佈中右、街道地面在底。刻意唔置中。
- **極密內頁**：餐牌用兩欄點線引導(菜名……價目),旺角單張感。碟頭飯／深宵欄各自標時段。
- **旋轉／斜插**：副招牌可 -2°~3° 輕斜;箭咀招牌指向門口。唔好全部水平對齊。
- **留白規則**：section 上下 56–64px;但招牌區可以逼、可以疊。密與疏交替:街景極密→故事段落中疏。
- **RWD**：街景 `slice` 隨寬度裁切;招牌以 vw 縮放;導覽燈牌 flex-wrap;餐牌兩欄 ≤640px 收一欄;訂枱雙欄 ≤820px 收一欄。

---

## 五、元件配方

**導覽（懸掛霓虹燈牌 topbar）**
```css
nav.signs a{
  font-family:'Noto Serif TC';font-weight:900;font-size:16px;letter-spacing:2px;
  padding:7px 14px 6px;border:2px solid;border-radius:3px;color:var(--c);--c:var(--cyan);
  opacity:calc(.42 + .58*var(--on));                 /* 跟住時刻着燈 */
  box-shadow:inset 0 0 calc(4px*var(--on)) var(--c);
  text-shadow:0 0 calc(2px + 9px*var(--on)) var(--c);
}
nav.signs a::after{content:'';position:absolute;left:50%;top:-9px;width:1px;height:8px;background:var(--c)} /* 吊繩 */
nav.signs a:hover{background:var(--c);color:#0a0f18;transform:translateY(2px)}  /* 反色＋輕擺 */
```
每個燈牌一支色(青／粉／金),`::after` 做吊繩。

**按鈕（CTA）**：實色底(紅或青)、去圓角(3px)、`box-shadow:0 0 calc(4px+18px*var(--on)) rgba(...)` 着燈時發光;hover 轉金。

**卡片**：`#101a26` 底、`1px solid seam`、5–6px 圓角(近乎硬邊)。唔用模糊大陰影。標題用招牌色。

**表單**：`#0c141e` 深底、`1.5px seam` 邊、focus 轉青。錯誤訊息用 mono 紅字。stepper 用 mono 數字＋方形加減鈕。

**單據 / 落單紙**：頂部 `repeating-linear-gradient` 做紅白撞色齒邊;內容點線分隔(`border-bottom:1px dotted`);編號、條碼用 mono＋金。

**footer**：深近黑 `#0a0f18`、三欄、標題 mono 青大寫、招牌金字。尾註 mono 灰 11px 標明「虛構示意」。

---

## 六、動效規則

| 動效 | 觸發 | duration / easing | 值 |
|------|------|-------------------|-----|
| 天色過渡 | 時刻改變(每 20–30s tick 或㨂桿) | 1.4s ease | `--sky-a/--sky-b` 漸變 |
| 招牌着燈 | `--on` 改變 | 1.2s ease | opacity `.12→1`、bloom 半徑隨 `--on` |
| 霓虹閃爍 | 着燈且非 reduced-motion | 6.5–8.3s steps 無限 | 只落 1–2 支招牌:`@keyframes fk{92%{op:1}93%{op:.28}94%{op:1}95.5%{op:.55}}` |
| 燈牌 hover | 指標 | .18s | 反色＋`translateY(2px)` |
| 落單紙填格 | 每步完成 | 即時 | 由「未揀」灰字→實色 |

**Bloom（發光）做法**——唔用外部圖,用雙層 drop-shadow 疊:
```css
.sign{
  opacity:calc(.12 + .88*var(--on));
  filter:drop-shadow(0 0 calc(1px + 7px*var(--on)) var(--c))
         drop-shadow(0 0 calc(1px + 17px*var(--on)) var(--c));
}
```
`--on` 由 JS 依真實時刻寫入 `:root`。閃爍只揀「攰咗嘅」一兩支招牌落,唔好成排一齊閃(假)。

**去AI化**：唔好用「揭示進場淡入」做主打動效,唔好數字計數。本風格嘅動效簽名一定係「時刻驅動嘅着燈」。

---

## 七、首創技術實作配方：真實時刻晝夜引擎（wall-clock day/night engine）

呢章係本風格嘅心臟,任何 AI 照做即可重現。

**1. 錨點曲線**。定義 9 個時刻錨點,每點四個值:天頂色 a[r,g,b]、天底色 b[r,g,b]、環境暗度 d(0晝→1夜)、霓虹強度 n(0熄→1着)。
```js
var ANCH=[
 {h:0,   a:[10,15,24],   b:[20,32,46],   d:1.00,n:1.00,l:'深宵'},
 {h:5,   a:[26,36,54],   b:[58,66,86],   d:.82, n:.55, l:'天未光'},
 {h:7,   a:[107,122,143],b:[185,194,201],d:.32, n:.10, l:'天光'},
 {h:12,  a:[157,180,199],b:[223,231,236],d:0,   n:0,   l:'晏晝'},
 {h:16,  a:[210,170,120],b:[242,208,160],d:.10, n:.05, l:'斜陽'},
 {h:18,  a:[58,43,90],   b:[217,90,107], d:.52, n:.62, l:'黃昏'},
 {h:19.5,a:[20,26,51],   b:[74,42,85],   d:.80, n:1.00,l:'入夜'},
 {h:21,  a:[13,19,34],   b:[30,39,64],   d:.94, n:1.00,l:'夜市'},
 {h:24,  a:[10,15,24],   b:[20,32,46],   d:1.00,n:1.00,l:'深宵'}];
```
**2. 內插**。搵住當前小時落喺邊兩個錨點之間,線性插每個 channel:
```js
function phase(h){h=((h%24)+24)%24;var i=0;for(;i<ANCH.length-1;i++){if(h>=ANCH[i].h&&h<=ANCH[i+1].h)break;}
 var A=ANCH[i],B=ANCH[i+1],t=(h-A.h)/((B.h-A.h)||1);
 var lp=(a,b)=>a+(b-a)*t, rgb=c=>`rgb(${c.map(Math.round)})`;
 return{skyA:rgb(A.a.map((v,k)=>lp(v,B.a[k]))),skyB:rgb(A.b.map((v,k)=>lp(v,B.b[k]))),
        dark:lp(A.d,B.d),neon:lp(A.n,B.n),label:t<.5?A.l:B.l};}
```
**3. 寫入 CSS 變數＋落閘狀態**:
```js
function render(h){var p=phase(h),r=document.documentElement.style;
 r.setProperty('--sky-a',p.skyA);r.setProperty('--sky-b',p.skyB);
 r.setProperty('--on',p.neon.toFixed(3));r.setProperty('--dark',p.dark.toFixed(3));
 document.body.classList.toggle('closed',!(h>=15||h<6));}   // 6:00–15:00 落閘
function tick(){var d=new Date();render(d.getHours()+d.getMinutes()/60);}
tick();setInterval(tick,20000);
```
**4. 手動預覽桿**（重要 UX）。畀用戶㨂任一時刻;桿以夜晚為中(0→24 對應 6:00→翌日 6:00),配「返去此刻」掣清除 override。
**5. 降級與備援**:
- `@media(prefers-reduced-motion:reduce)`:停閃爍動畫、停天色 transition;招牌以當前時刻穩定着燈(唔嗡唔閃)。
- 零 WebGL、零外部圖:全部 SVG＋CSS 變數,任何靜態主機、任何瀏覽器都跑到;JS 掛咗都仲見到一個合理暮色底(CSS 預設 `--on:1` fallback)。
- 落閘狀態靠 `body.closed` 切換捲門 opacity,唔靠圖。

**設計提醒**:落色時要親自試 12:00 同 03:00 兩個極端,確保「晏晝真係唔似夜晚」。呢個對照就係首創嘅價值,唔可以馬虎。

---

## 八、插畫與圖像風格（neon-glow 霓虹燈管）

- 所有圖像 = 原創 SVG 燈管字／燈管線,加雙層 `feGaussianBlur`（logo/favicon）或雙層 `drop-shadow`（頁面招牌）做 bloom。零外部圖片。
- 「燈管」做法:粗筆畫(stroke-width 2–4)、`stroke-linecap:round`;或重字重填色字。着燈態飽和＋glow,死玻璃態低 opacity 無 glow。
- 街景由色塊樓宇(深靛剪影)＋懸掛招牌組成;窗光用細色塊 `--win`,亮度隨 `--on`。
- 唔用照片、唔用漸層紫藍、唔用細線幾何線描。

---

## 九、Logo 與 Favicon 設計指南

- **Logo**：一塊霓虹燈牌框(`rect` 描邊＋glow)入面放招牌字「亮記」(金,重 feGaussianBlur)＋一個行業母題(碗＋筷 SVG 線,紅金)＋一行拉丁 mono 小字(青)。整體用 `filter` bloom。
- **Favicon**：inline SVG data URI。深底圓角方塊＋青色內框＋單一招牌字(金,serif 900)。例:
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='...' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230c1420'/%3E%3Crect x='3' y='3' width='26' height='26' rx='4' fill='none' stroke='%2322e0d6' stroke-width='1.4'/%3E%3Ctext x='16' y='23' font-family='serif' font-weight='900' font-size='20' text-anchor='middle' fill='%23ffd23f'%3E亮%3C/text%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 先諗「白天／夜晚兩個畫面」,再落設計;親測兩個極端時刻。
- 用暮色 mid-tone 做底,唔用純黑。
- 一頁兩三支主導霓虹色,靠對比。
- 招牌可疊、可斜、可逼(旺角極密)。
- 粵語書面語文案,價目港幣,資料具體(地址／電話／時段／人名)。
- 所有 glow 用 CSS/SVG filter,零外部圖。

**Don't（含去AI化禁令）**
- 唔好紫藍漸層 hero、唔好「置中大標＋副標＋兩掣＋三卡」模板。
- 唔好 emoji 當 icon(全部自繪 SVG 燈管)。
- 唔好成排招牌一齊閃(假),閃爍只落一兩支。
- 唔好用「揭示淡入／數字計數」做動效簽名——本風格簽名一定係時刻着燈。
- 唔好「EST. 19xx」年份徽章。
- 唔好 rounded-2xl＋模糊大陰影卡片、唔好細線幾何線描。

---

## 十一、頁面骨架範例（可直接改用）

```html
<div class="street">
  <svg class="facade" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <rect class="bldg" x="0" y="150" width="360" height="570"/>
    <!-- 落閘捲門:body.closed 時淡入 -->
    <rect class="shutter" x="372" y="566" width="456" height="150"/>
    <!-- 招牌:各自 --c 色,opacity/glow 由 --on 演算 -->
    <g class="sign" style="--c:var(--gold)"><g class="flick">
      <rect x="86" y="150" width="96" height="300" fill="none" stroke="var(--gold)" stroke-width="4"/>
      <text x="134" y="238" font-family="'Noto Serif TC'" font-weight="900" font-size="82" text-anchor="middle">亮</text>
    </g></g>
    <g class="sign" style="--c:var(--red)"><text x="880" y="360" font-weight="900" font-size="66">大牌檔</text></g>
  </svg>
  <div class="hud"><!-- 實時鐘＋時刻預覽桿＋返去此刻 --></div>
</div>
```
```css
:root{--on:1;--dark:1;--sky-a:#0d1322;--sky-b:#1e2740}
.street{background:linear-gradient(180deg,var(--sky-a),var(--sky-b));transition:background 1.4s ease}
.facade .shutter{opacity:0;transition:opacity 1.2s}
body.closed .facade .shutter{opacity:calc(.55 + .35*var(--dark))}
.sign{opacity:calc(.12 + .88*var(--on));
  filter:drop-shadow(0 0 calc(1px+7px*var(--on)) var(--c)) drop-shadow(0 0 calc(1px+17px*var(--on)) var(--c))}
.sign *{fill:var(--c)} .sign.tube *{fill:none;stroke:var(--c)}
```

驗收:一個未睇過 Demo 嘅 AI,淨係讀呢份 SKILL,就砌到一個「會跟真實時鐘着燈」嘅港式霓虹站——中午同深夜打開唔一樣,招牌有死玻璃同着燈兩態,零外部圖、有 reduced-motion 降級。

---

*風格代號 `hong-kong-neon`。示範站:亮記 · 通宵冰室大牌檔（旺角通菜街,虛構示意）。由 Claude Opus 4.8 建置(2026-07-18,排程 Agent)。*
