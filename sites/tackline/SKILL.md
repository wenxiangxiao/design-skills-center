---
name: signal-flag-semaphore
description: A maritime signalling design language built from international code flags, halyard rules and a compass-rose navigation, where flat primary-colour blocks on a saturated indigo field carry meaning rather than decoration.
---

# 信號旗語風（Signal-Flag Semaphore）

這套語言來自海上的一件事實：**船與船之間沒辦法喊話。** 於是人類設計了一套 26 面旗子的字母表，每一面都是最單純的幾何——對分、橫條、直條、十字、斜劃、棋盤、圓點——因為它必須在兩公里外、在晃動的甲板上、在逆光裡被正確認出來。

所以這是一套「為了被遠距離辨識而生」的視覺系統：**沒有漸層、沒有圓角、沒有陰影、沒有中間色**。所有顏色都是高飽和的原色，所有形狀都是可以用尺畫出來的。它天生反對現在網頁上那種柔軟、模糊、什麼都圓一點的預設品味。

它的第二個特徵是：**顏色與形狀本身就是內容**。旗子不是裝飾在標題旁邊的圖案，它就是那個標題的意思。用這套語言時，最大的錯誤是把旗子當成好看的色塊貼上去——它必須真的在指涉什麼（分類、狀態、等級、警告）。

適用於任何「有一套自己的代碼系統」的產業：航海、航空、鐵路、氣象、消防、賽事、工地安全、物流分級、醫療檢傷、電競隊伍識別。也適用於任何需要「一眼分辨狀態」的介面。

## 設計哲學

1. **顏色即語意，不是情緒。** 這套語言只有五個顏色，每一個都被指派了固定職責（紅＝警告與上標、黃＝行動與最佳值、藍＝地與結構、白＝文字與船、麻繩色＝分隔與註記）。決定用什麼顏色之前先問「它代表什麼」，不要問「哪個好看」。
2. **旗繩是唯一的分隔線。** 不要用細灰線分區。用一條麻繩色的一像素線，兩端各釘一個 7px 實心方塊——那是繩結。整站只用這一種分隔法，重複到變成識別。
3. **零圓角、零模糊陰影。** 沒有例外。按鈕是矩形描邊或實心色塊，卡片是一像素線框，狀態標籤是帶底色的矩形。任何 `border-radius` 與 `box-shadow: blur` 都會立刻讓這套語言變成一般網站。
4. **導覽可以不是一條列。** 這套語言允許把導覽做成一個羅經玫瑰、一支旗繩、一排浮標——只要**標籤全程可見**。破格的前提是仍然找得到路。
5. **數字用等寬體，而且要大。** 儀表、方位、距離、費用一律 tabular-nums 等寬字，字級比內文大一到兩階。海上的介面是拿來讀數字的。
6. **文案是「先講會出什麼事」。** 這個產業的語氣來自安全簡報：先說風險，再說作法，最後才說原因。不要寫「讓我們一起航向夢想」，要寫「救生衣在離開碼頭前扣好，回到碼頭才准解開」。

## 色彩系統

**結構色（占 92%）**

| 用途 | 變數 | 色票 | 比例 |
|------|------|------|------|
| 頁底・信號靛 | `--sea` | `#16467F` | 約 52% |
| 版面／面板・深靛 | `--deep` | `#0E3260` | 約 24% |
| 舞台／頁尾・海溝 | `--abyss` | `#08203E` | 約 12% |
| hover 提亮 | `--sky` | `#2E67AC` | 互動時 |
| 文字・浪沫白 | `--foam` | `#F0F1EA` | 全部文字 |
| 分隔／描邊 | `--line` | `rgba(240,241,234,.20)` | 1px |

**信號色（占 8%，一律代表意義）**

| 職責 | 變數 | 色票 |
|------|------|------|
| 警告・上標・主要行動 | `--red` | `#E1362C` |
| 最佳值・下標・目前頁面・強調數字 | `--yellow` | `#F5C518` |
| 分隔線・小標・註記・繩索 | `--hemp` | `#C9A46A` |

**旗面專用色（僅用於信號旗繪製，不外流到版面）**

`#0B5FB0` 旗藍／`#DA2B24` 旗紅／`#F5C518` 旗黃／`#F4F4EE` 旗白／`#131519` 旗黑

規則：

- **底色一定是飽和的靛藍，不是深藍黑。** 這是這套語言最容易做錯的一步——把底調暗會立刻掉進「深色典雅」的老套裡。`#16467F` 明度必須維持在可以讓白字舒服、又讓紅黃跳出來的中間調。
- 紅與黃**永遠不並排大面積使用**，它們是兩種不同的訊號。同一個畫面裡黃色只出現在「最佳／目前／可行動」，紅色只出現在「警告／目標／主要按鈕」。
- 麻繩色不用於正文，只用於：分隔線、小標籤、圖說、繩索與旗桿。它是這套配色裡唯一的暖色，用來把冷靜的藍拉回「這是一個手工的、有繩子的行業」。

## 字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Azeret+Mono:wght@400;600&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 設定 |
|------|------|------|
| 英文大標／按鈕／品牌字 | **Archivo 900** | `letter-spacing:-.015em`；品牌字可到 `-.045em`、`line-height:.82` |
| 中文標題 | **Noto Sans TC 900** | 與 Archivo 混排時中文字級略小一階 |
| 儀表・數字・代碼・小標籤 | **Azeret Mono 400/600** | `font-variant-numeric:tabular-nums`；小標籤 `10.5–12px / letter-spacing:.14em / 全大寫` |
| 內文 | **Noto Sans TC 400** | `16px / line-height:1.8` |

字級 scale：`10.5 · 12 · 14 · 16 · 20 · 26 · clamp(28,5vw,58) · clamp(52,11.5vw,168)`

**關鍵**：`.kicker`（章節上方的小標）一律是 `Azeret Mono 600 / 11px / letter-spacing:.28em / 全大寫 / 黃色`。這個元素出現的頻率高到本身就是識別。

## 版面與網格

- **不對稱**：主內容左側永遠留出 `216px + 40px` 給固定的羅經玫瑰導覽（`--rose` 變數控制），右側只留 40px。整站因此天生偏右，不置中。
- **章節頭三件組**：`旗令組（2–3 面旗）` ＋ `kicker` ＋ `h2`，水平排列、底部對齊（`align-items:flex-end`）。旗令要跟該章節內容有關（例如安全章節掛 A、V＝潛水員下水／我需要援助）。
- **章節分隔**：`padding:78px 0` ＋ `border-top:1px solid var(--line)`。段落之間不用留白區隔，用線。
- **表格優先於卡片**。這套語言的資訊天生適合表格：航班、費用、規格、時段。只有在每個單元都需要一面旗或一個狀態標籤時才改用格線卡片（`gap:1px` ＋ 背景色當格線，做出「印刷分格」而非「浮起卡片」）。
- **極少旋轉**。這是一套講求辨識度的語言，不要斜排。唯一允許的角度是圖示內部（旗子的斜劃、斜紋）。

## 元件配方

**羅經玫瑰導覽（本語言的招牌）**

```css
.rose{position:fixed;top:18px;left:18px;width:216px;height:216px;z-index:60;
 background:rgba(8,32,62,.80);border:1px solid rgba(240,241,234,.38);backdrop-filter:blur(7px)}
.rose .disc{position:absolute;left:50%;top:50%;width:96px;height:96px;transform:translate(-50%,-50%)}
.rose .ndl{transform-origin:50% 50%;transition:transform .8s cubic-bezier(.2,.9,.2,1)}
.rose a{position:absolute;width:84px;text-align:center;text-decoration:none;opacity:.66}
.rose a b{font-family:var(--mono);font-size:10px;color:var(--hemp)}   /* 方位度數 */
.rose a span{font-weight:700;font-size:13px}                          /* 頁名 */
.rose a[aria-current="page"]{opacity:1;background:var(--yellow);color:var(--abyss)}
.rose .p-n{left:50%;top:6px;transform:translateX(-50%)}
.rose .p-e{right:2px;top:50%;transform:translateY(-50%)}
.rose .p-s{left:50%;bottom:6px;transform:translateX(-50%)}
.rose .p-w{left:2px;top:50%;transform:translateY(-50%)}
```

磁針以 `style="transform:rotate(Ndeg)"` 指向目前頁面的方位（000/090/180/270）。**行動版（≤860px）整組轉成底部四格橫列**，磁針隱藏，方位度數縮小為 9px 副標——不要在小螢幕硬留一個圓盤。

**旗繩分隔線**

```css
.halyard{position:relative;height:1px;background:var(--hemp);opacity:.55}
.halyard::before,.halyard::after{content:"";position:absolute;top:-3px;width:7px;height:7px;background:var(--hemp)}
.halyard::before{left:0}.halyard::after{right:0}
```

**按鈕**

```css
.btn{display:inline-flex;gap:10px;padding:13px 20px;border:2px solid var(--foam);background:transparent;
 color:var(--foam);font-family:'Archivo';font-weight:900;font-size:14px;letter-spacing:.08em;
 text-transform:uppercase;transition:background .16s,color .16s}
.btn:hover{background:var(--foam);color:var(--abyss)}
.btn.pri{background:var(--red);border-color:var(--red)}
.btn.pri:hover{background:var(--yellow);border-color:var(--yellow);color:var(--abyss)}
```

反白即是全部的 hover 效果。不要位移、不要縮放、不要陰影。

**狀態標籤**

```css
.st{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;padding:2px 7px}
.st.ok{background:var(--yellow);color:var(--abyss)}   /* 可用 */
.st.fix{background:var(--red)}                        /* 停用 */
.st.race{background:var(--foam);color:var(--abyss)}   /* 保留 */
```

**表單**：`background:var(--abyss)` ＋ `1px` 邊框 ＋ `outline:2px solid var(--yellow); outline-offset:-2px` 的 focus。label 一律是 mono 小大寫。

**Footer**：`border-top:4px solid var(--hemp)`（唯一一條粗線，代表主旗繩）＋ `--abyss` 底 ＋ 三欄。最後放一段 mono 小字的聲明。

## 動效規則

這套語言的動效原則是**「儀器的動效」**：慢、線性、有阻尼，不彈跳。

| 元素 | 觸發 | 時間 / 曲線 |
|------|------|------|
| 羅經磁針 | 換頁 | `800ms cubic-bezier(.2,.9,.2,1)`（有慣性的指針） |
| 按鈕反白 | hover / focus | `160ms` linear |
| 連結列反白 | hover | `180ms` |
| VMG 進度條 | 每幀 | `180ms linear`（儀表要跟得上，但不要抖） |
| 提示橫幅 | 事件 | `200ms` 淡入、`1500ms` 後淡出 |
| canvas 風場 | 逐幀 | 以半透明底色（`alpha .16–.20`）覆蓋做拖尾，不用 `clearRect` |

**明令禁止**：進場揭示（fade-in-up）、數字滾動計數、按壓硬陰影位移、`stroke-dashoffset` 描繪。這四項在本館已經過載，且都與「儀器」的氣質相反。

`prefers-reduced-motion` 降級：所有 transition/animation 壓到 `.001ms`；canvas 動畫改為**一次性繪製的靜態向量網格**（保留全部資訊，只是不動）；捲動改為 `auto`。

## 插畫與圖像風格（flag-heraldry）

全部以程序化 SVG 生成，**零外部圖片**。核心是一組四個繪製原語，26 面旗都由它們組成：

```js
var FC={B:'#0B5FB0',R:'#DA2B24',Y:'#F5C518',W:'#F4F4EE',K:'#131519'};
function _r(x,y,w,h,c){...}            // 矩形（橫條、直條、方格）
function _p(pts,c){...}                // 多邊形（燕尾、對角、三角）
function _c(cx,cy,r,c){...}            // 圓（I 旗的黑點）
function _sal(c,w){...}                // 斜十字（M、V 旗）
```

在 `viewBox="0 0 60 40"`（3:2，國際信號旗的標準比例）裡作畫，例如：

```js
C:{d:function(){return _r(0,0,60,8,'B')+_r(0,8,60,8,'W')+_r(0,16,60,8,'R')
                     +_r(0,24,60,8,'W')+_r(0,32,60,8,'B');}, m:'是（肯定）'}
N:{d:function(){var s='';for(var y=0;y<4;y++)for(var x=0;x<4;x++)
                  s+=_r(x*15,y*10,15,10,(x+y)%2?'W':'B');return s;}, m:'否（否定）'}
```

每面旗加 `box-shadow:0 0 0 1px rgba(8,32,62,.55)` 當作旗布邊緣，讓白旗在淺底上也有輪廓。以 `data-hoist="GHK"` 屬性宣告旗組，載入後由 `paintHoists()` 一次填入——**HTML 裡不寫死 SVG**。

其他圖像同樣是程序生成：極曲線圖由極座標表直接畫出 path、地圖為色塊與粗線構成的示意圖、浮標是圓形加三角頂標。原則是「畫得出來的形狀才畫」，不要試圖畫寫實的東西。

## Logo 與 Favicon

**Logo**：一支旗桿（麻繩色 6px 直線）＋ 桿頂的黃色圓球 ＋ 一條微微下垂的旗繩（`C` 曲線）掛著三面旗（用品牌縮寫的字母旗），下方是 Archivo 900 的品牌字，末段換成黃色。核心概念是「品牌名稱本身就掛在旗繩上」。

**Favicon**：inline SVG data URI，`viewBox="0 0 64 64"`，靛底 ＋ 一支麻繩色桅杆 ＋ 兩面白／黃三角旗 ＋ 一顆紅點。在 16px 下要能認出「桅杆上有東西」即可，不要放字母。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2316467F'/%3E%3Crect x='12' y='8' width='5' height='48' fill='%23C9A46A'/%3E%3Cpolygon points='17,12 56,20 17,28' fill='%23F0F1EA'/%3E%3Cpolygon points='17,32 50,38 17,44' fill='%23F5C518'/%3E%3Ccircle cx='27' cy='20' r='4' fill='%23E1362C'/%3E%3C/svg%3E">
```

## 首創技術實作配方：風場對抗式航行物理

這是本站認領的全館首創。若要在別的產業重現「環境場作為對手」的互動（滑翔傘的熱氣流、划船的潮流、無人機的側風、賽車的胎溫），照下面四步做。

**一、風場＝可查詢的連續場，不是幾個參數**

```js
function WindField(cfg){ /* twd 基準風向, tws 基準風速, cells 陣風胞, shadows 遮蔽物 */ }
WindField.prototype.at=function(x,y){
  var dir=this.twd, spd=this.tws;
  // 1. 大尺度擺盪：真實海面每 3–6 分鐘轉一次向
  dir+=6.5*Math.sin(this.t*0.052+x*0.0016)+3.2*Math.sin(this.t*0.031-y*0.0021);
  // 2. 陣風胞：高斯權重疊加，胞本身順風漂移
  for(...) { var w=Math.exp(-(dx*dx+dy*dy)/(c.r*c.r)); spd+=c.ds*w; dir+=c.dd*w; }
  // 3. 遮蔽物風影：沿順風軸投影，錐狀擴張、越遠越弱
  //    along = 沿風軸距離, across = 橫向距離, wide 隨 along 線性擴張
  spd*=1-drop*(1-along/len)*(1-across/wide);
  return {dir:dir,spd:spd};
};
```

三層疊加缺一不可：擺盪讓風「活著」、陣風胞給玩家**可以主動去找的好處**、風影給玩家**必須主動避開的壞處**。只有基準風的話，這個機制在體感上等同於沒有。

**二、極曲線讓「直行」在物理上不可行**

```js
var POLAR=[[0,0],[28,0],[33,.26],[38,.47],[42,.55],[45,.59],[50,.63],[60,.70],
           [75,.77],[90,.82],[100,.84],[110,.83],[120,.79],[135,.72],[150,.62],[180,.47]];
function polar(twa){ /* 對表線性內插，回傳船速占真風速的比例 */ }
var target=polar(Math.abs(twa))*wind.spd;
// 加速慢、減速快：這一步決定了「換舷有代價」
var tau=(target>spd)?3.4:1.5;
spd+=(target-spd)*(1-Math.exp(-dt/tau));
```

`[28,0]` 這一行是整個設計的核心：**風角 28° 以內回傳 0**。玩家把船頭指向目標時速度歸零，於是「斜著走反而比較快」這件反直覺的事不需要用文字解釋，玩三十秒就懂了。換舷的懲罰不需要另外寫——穿越死角時速度自然掉下來，加速又比減速慢三倍，代價是物理算出來的。

**三、舵效隨速度衰減**

```js
var eff=0.35+0.65*Math.min(1,spd/3.2);
hdg+=rudder*62*eff*dt;
```

一行程式帶來最重要的教學效果：停下來的船轉不動，玩家會親身體會「保持速度」的意義。

**四、把對抗過程直接當成評分輸入**

逐幀累積四項，完成後換算：

```js
vmg = spd*Math.cos(角度差(航向, 目標方位));            // 朝目標的有效速度
best = bestVMG(是否上風).vmg * 當地風速;               // 該風速下的理論最佳
效率 += clamp(vmg/best, 0, 1.15);                      // 主要分數
if(|twa|<30) 死角秒數 += dt;
if(當地風速 < 基準*0.80) 風影秒數 += dt;
if(換舷) 次數++;
score = 效率%*100 - 死角*1.5 - max(0,次數-5)*2.6 - 風影*0.55;
```

**設計要點：分數必須換算成該產業的語言。** 本站把 0–100 換成四個課程等級，並用一組由 `FNV-1a` 雜湊決定的四面信號旗當成識別碼——同樣的表現一定得到同樣的旗令。不要輸出「你得了 73 分」，要輸出「你可以進進階戰術班，這是你的旗令」。

**五、備援（不可省略）**

- `prefers-reduced-motion`：風場改靜態箭頭網格，模擬邏輯完全保留。
- 提供**自動示範**（AI 沿最佳搶風角航行、到延伸線才換舷，帶遲滯與冷卻避免抖動），讓不想操作或無法操作的人也能取得完整結果。
- 觸控：兩顆大面積的左右舵鈕（`pointerdown/up` 而非 `click`）＋ 一顆自動換舷鈕。
- 逾時保護：超過固定秒數自動結算，不讓玩家卡死。
- `<noscript>`：以文字說明航線構成與評分標準。

## Do & Don't

**Do**

- 用旗子當章節標籤，而且旗子的含義要對得上章節內容
- 底色維持飽和中間調靛藍，讓紅黃跳出來
- 數字用 Azeret Mono、tabular-nums、比內文大
- 分隔一律用麻繩色旗繩線，重複到成為識別
- 導覽允許破格（羅經玫瑰／旗繩／浮標），但標籤必須全程可見
- 文案先講風險再講作法，用該行業真正在講的話（搶風、延伸線、繞標、換舷、風影）

**Don't**

- ❌ 任何 `border-radius`、任何模糊陰影卡片
- ❌ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片
- ❌ emoji 當 icon（旗子與圖示一律程序化 SVG）
- ❌ 把旗子當純裝飾色塊隨便貼
- ❌ 進場揭示、數字計數、按壓硬陰影、dashoffset 描繪四種過載動效
- ❌ 「EST. 19xx」年份徽章、「把 X 變成 Y」句式標題、AI 腔套語
- ❌ 把底色調成深藍黑（會變成另一個「深色典雅」站）
- ❌ 行動版硬留圓盤導覽（改成底部方位列）

## 頁面骨架範例

```html
<body>
<a class="skip" href="#main">跳到主要內容</a>
<nav class="rose" aria-label="羅經導覽">
  <svg class="disc" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="47" fill="none" stroke="#C9A46A" stroke-width="1.4" opacity=".8"/>
    <g class="ndl" style="transform:rotate(90deg)">
      <polygon points="50,10 55.5,50 50,44 44.5,50" fill="#E1362C"/>
    </g>
    <circle cx="50" cy="50" r="3.2" fill="#F5C518"/>
  </svg>
  <a class="p-n" href="index.html"><b>000°</b><span>母港</span></a>
  <a class="p-e" href="sail.html" aria-current="page"><b>090°</b><span>試航診斷</span></a>
  <a class="p-s" href="fleet.html"><b>180°</b><span>船隊與旗語</span></a>
  <a class="p-w" href="club.html"><b>270°</b><span>課程與入社</span></a>
</nav>

<main id="main"><div class="shell">
  <section class="sect">
    <div class="sect-h">
      <span data-hoist="GHK" data-fw="36"></span>
      <div><p class="kicker">訓練架構</p><h2>三個階段，一支旗子代表一階</h2></div>
    </div>
    <table>
      <tr><th>梯次</th><th>時段</th><th>費用</th></tr>
      <tr><td class="num">A</td><td class="num">05:30–08:00</td><td class="num">NT$ 1,200</td></tr>
    </table>
  </section>
</div></main>

<footer class="ft">…</footer>
<script>/* FLAGS 定義 + paintHoists() */</script>
</body>
```

驗收：把上面這份規格交給一個沒看過 Demo 的 AI，它應該能做出一個**靛藍底、掛著旗子、有一支羅經導覽、全部直角、數字用等寬體**的網站——而且如果那個產業有自己的代碼系統，它會知道要把旗子換成那套代碼。
