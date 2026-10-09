---
name: psychedelic-liquid-light-show
description: 1965-71 liquid light show style (Bill Ham, Joshua Light Show) - immiscible oil-and-dye cells inside round projected clock-glass pools on a black wall, meniscus highlight rims, transmitted-light saturated colour, beat-pressed glass, and type that is projected light.
---

# 迷幻液態光秀 Psychedelic Liquid Light Show

> 迷幻 Psychedelic 流派的「投影半身」。舊金山 1952–53 年 Seymour Locks 在 SF State 把顏料放進玻璃皿、擺上高架投影機；學生 Elias Romero 把它帶進詩歌朗讀與教堂；1965 年 Bill Ham 第一次替搖滾樂團投（Red Dog Saloon → 1966 Avalon Ballroom）；1968–71 年 Joshua White 的 Joshua Light Show 是紐約 Fillmore East 的駐場燈光，八盞 1,200W 燈、20×30 呎乙烯背投幕，「wet show」把油、水與染料放在兩片鐘面玻璃（clock glass）之間投出。
> 與同流派的另一半——**海報半身**（Wes Wilson／Moscoso 的熔字、零留白、等明度對振色，見本館 baicaochun `psychedelic-poster`）——的分界：海報是墨印在紙上、滿版沒有黑；光秀是**光穿過液體**，畫面活在黑牆上的圓裡，顏色會疊亮、邊會折光、整池跟著鼓呼吸。
> 本 SKILL 定義風格，不綁定產業。Demo 站把它配在一間臺北雙城街的手工冷製皂房：投影與做皂是同一件事——油、水、顏色。

---

## 一、設計哲學

**液態光秀不是「迷幻配色」，是一台機器的輸出。** 一盞燈、一片聚光透鏡、兩片錶玻璃夾著油和水和染料、一面黑牆。每一個視覺特徵都可以追溯到這台機器：

1. **圖像住在圓裡**——因為錶玻璃是圓的。圓外面沒有東西，是燈照不到的黑牆。
2. **兩種液體不相溶**——所以色胞之間永遠有邊，邊上有彎月面折出來的亮線；它們會黏、會分，但不會混成漸層。
3. **顏色是透射光**——中心最亮（燈在正下方）、往邊緣暗；兩台投影機的圓疊在一起會加亮，而不是變髒。
4. **畫面跟著音樂動**——操作的人按著上面那片玻璃，跟著大鼓壓；整池在壓的那一下攤開、放手彈回。動作來自「壓」，不是來自捲軸或滑鼠。
5. **字也是投上去的**——團名寫在幻燈片上一起投，所以字有燈的顏色、鏡頭的紅藍色散與光暈。

**這個風格失敗的方式只有兩種：做成「彩色漸層背景」，或做成「靜止的海報」。** 前者沒有邊，後者沒有燈。

### 可用性底線

- 正文永遠放在黑牆上，不放在色胞上；色胞只當圖。
- 所有液體動態都要能被「靜止的一格」取代：prefers-reduced-motion 下只畫一格，互動仍然有效（壓玻璃變成瞬間狀態切換）。
- 不用頻閃（strobe）。原版光秀常配頻閃燈，網頁上一律禁止。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1｜圓形投影池（clock-glass pool）——圖像只活在圓裡

拿掉它：變成一張全版流體桌布，看不出是投影。

- 每一張圖都是一個或數個**圓**，圓外是 `#0B0907` 黑牆。
- 圓緣：內側 7% 漸暗（玻璃邊緣厚）、外緣一圈 1px 左右的**紅色色散**（聚光鏡的色差），然後才是黑。
- 多台投影機的圓**疊加相加**（screen/additive），重疊處更亮。
- 大小不一、偏心擺放：一大（主燈）＋一中＋一小（色輪燈）。

```css
/* 無 WebGL 時的靜態圓池：同樣的圓緣規則 */
.pool{border-radius:50%;background:
  radial-gradient(circle,#0000 0 92%,#0006 97%,#E8177E 99.2%,#B4141400 100%),
  radial-gradient(circle at 50% 48%,#ff4fa8 0,#E8177E 55%,#a10f57 100%);
  box-shadow:0 0 0 1px #8c1a0a55}
.wall{background:#0B0907;mix-blend-mode:normal}
.wall .pool+.pool{mix-blend-mode:screen}   /* 第二台投影機：疊亮 */
```

### 特徵 2｜油水不相溶的色胞＋彎月面亮線

拿掉它：變成 lava lamp 或水彩暈染，失去「液體夾在玻璃裡」的物理。

- 每一個像素**只屬於一相**（某一罐色油，或水）。相界是硬的。
- 相界外側（水那一邊）一圈**亮線**：彎月面折光，比燈還亮（1.2×）。
- 相界內側一圈暗線；兩種色油相碰時，交界是一條**暗縫**而不是混色。
- 色胞越厚越濃：中心比邊緣深一點（Beer–Lambert 的直覺版）。
- 形狀是 metaball：大胞旁邊跟著一兩顆小衛星胞，會黏上、會拉斷。

```glsl
// 每像素：各色油的 metaball 場，取最大者為這一點的相
for(...) f[dye] += r*r / (dot(q,q)+1.0);
if(m1>1.0){                       // 在色油裡
  c = mix(D, D*D*1.05, clamp((m1-1.)*.35,0.,1.));      // 越厚越濃
  c *= .35+.65*smoothstep(0.,.12,m1-1.);                // 內側暗線
  if(m2>1.0) c *= .25+.75*smoothstep(0.,.06,(m1-m2)/m1); // 油油交界＝暗縫
}else{                             // 在水裡
  c = mix(vec3(1.2,1.14,1.0), WATER, smoothstep(0.,.07,1.-m1)); // 外側亮線
}
```

SVG 靜態版（給圖示與 favicon）：

```svg
<circle cx="66" cy="66" r="48" fill="#E8177E"/>
<path d="M70 58c10-12 32-10 38 4 5 12-4 26-18 25-6 9-22 9-27-1-6-11 1-22 7-28z" fill="#FFC31F"/>
<path d="M70 58c10-12 32-10 38 4 5 12-4 26-18 25-6 9-22 9-27-1-6-11 1-22 7-28z" fill="none" stroke="#FFF1D2" stroke-width="2.2" opacity=".85"/>
```

### 特徵 3｜透射光的染料色——中心亮、邊緣暗、疊加變亮

拿掉它：變成平塗的普普或 Memphis 色塊。

| 角色 | 色 | 說明 |
|---|---|---|
| 黑牆 | `#0B0907` | ≥ 55% 面積，帶極輕的暖與顆粒 |
| 燈 | `#FFF1D2` | 字、亮線、燈心 |
| 洋紅 aniline | `#E8177E` | 水相主力 |
| 蛋黃 | `#FFC31F` | 油相主力、主按鈕 |
| 亞甲藍 | `#13B4D8` | 水或油 |
| 苦艾綠 | `#73C63A` | 油 |
| 朱橙 | `#FF5A1F` | 油、色散紅 |
| 酒紅 | `#7A1840` | 深水 |

- 規則：**沒有灰、沒有粉彩、沒有半透明的白**。暗＝燈照不到；亮＝燈加疊加。
- 燈心衰減：`lamp = 0.98 - 0.42*r²`（r 為池半徑歸一）。

```css
.lampfield{background:radial-gradient(circle,#ffffff22 0,#0000 60%),var(--water)}
```

### 特徵 4｜隨拍壓玻璃（beat-pressed glass）——畫面跟著鼓呼吸

拿掉它：畫面變成會飄的桌布；液態光秀是**演出**。

- 「壓」＝全部色胞以池心為中心外推 35%、半徑放大 18%；放手以**欠阻尼彈簧**（k=140, c=13）彈回，會過衝一次。
- 壓的來源只有三種：使用者按住（空白鍵／長按）、音樂的大鼓（AnalyserNode 低頻起音）、沒人壓時每一小節一次的輕壓（0.38）。
- 禁止用捲動驅動液體。

```js
const a = 140*(target - press) - 13*vel; vel += a*dt; press += vel*dt; // 壓玻璃彈簧
pos = base * (1 + .35*press); radius *= 1 + .18*press;
```

### 特徵 5｜投影字——字是光

拿掉它：字變成印刷字，整個畫面回到「網頁」。

- 字色永遠是燈色 `#FFF1D2`，左右各一道紅／藍色散，外圍暖色光暈。
- 展示字：拉丁 **Shrikhand**（肥圓、帶擺尾的 60s 手寫招牌感），中文 **Huninn 粉圓**（圓頭等粗，像手寫在幻燈片上）。不用襯線、不用細體。
- 字放在黑牆上的「幻燈片區」裡，可以帶極輕的梯形校正（`rotateY(4deg)`），像投影機沒擺正。

```css
.lit{color:#FFF1D2;text-shadow:
  -.04em 0 0 rgba(232,23,126,.55), .04em 0 0 rgba(19,180,216,.5),
  0 0 .02em rgba(255,241,210,.9), 0 0 .5em rgba(255,190,110,.32)}
.slide{transform:perspective(900px) rotateY(4deg) skewY(-1deg)}
```

---

## 三、色彩系統

見特徵 3 色票。面積比例（首屏）：黑牆 55–65%／水相 15–25%／油相 10–18%／燈色字與亮線 3–6%。
次要文字 `#CDBB9C`、更弱 `#8C7E68`。幻燈片框（35mm slide mount）`#ECE4D2`＋墨 `#2A211A`，是全站唯一允許的「紙」。

## 四、字體系統

- 來源：Google Fonts `Huninn`、`Shrikhand`（`family=Huninn&family=Shrikhand`）。
- Scale：h1 `clamp(60px,9.4vw,138px)`/0.92；h2 `clamp(34px,5.4vw,64px)`/1.05；拉丁副標＝中文標題 0.42–0.5 倍，蛋黃色；內文 16px/1.85；標籤 13px，字距 .24em。
- 只用一個字重（兩款字體皆單字重），層級靠字級與顏色，不靠粗細。

## 五、版面與網格

- 首屏不是 hero：是「一面牆」——一到三個圓池偏心擺放，文字在牆上沒被照到的那一塊。
- 內頁以 1180px 欄寬為基準，但圖像一律是圓或幻燈片框；不使用卡片網格。
- 圓池永遠不被文字覆蓋；手機版把牆放上半（62vh），文字移到牆下方。
- 幻燈片框以 ±1.4° 以內的小角度歪放，像剛從片盒拿出來。

## 六、元件配方

- **導覽：滴瓶列（dropper-row）**。左下四個琥珀色滴瓶，每瓶一個染料色＝一頁；現用頁的滴管被拔高 14px、管口懸一滴、每 2.8 秒滴下。≤560px 為滿寬底欄。
- **按鈕**：蛋黃實心膠囊＋外發光（`box-shadow:0 0 0 3px #FFC31F33,0 0 26px #FFC31F55`）；次要按鈕為燈色 1.5px 描邊。無圓角卡片、無模糊陰影。
- **幻燈片框（slide mount）**：`#ECE4D2` 圓角 7px，內窗黑底 3:2，窗內放圓池小圖，框上手寫說明與片號。
- **表單**：黑底欄位 `#15100C`，1px `#ffffff33` 邊，聚焦為蛋黃外框。
- **Footer**：黑牆上三欄燈色細字，一條 `#ffffff1c` 分隔線。

## 七、動效規則（4 種，缺一不可）

| 類型 | 本風格的做法 | 參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 色胞沿各自軌道慢轉（池轉速 0.05–0.10 rad/s）＋半徑 ±6% 呼吸；色輪燈前四色扇區旋轉；每小節自動輕壓 | 連續 rAF；離開視窗即停 | 只畫一格靜止畫面 |
| input 輸入 | 游標＝攪棒：半徑 0.42R 內的色胞被推開，以慢彈簧（k=6, c=3.4）回軌；皂塊跟游標 3D 傾斜 | 同一幀生效（<16ms） | 推開量減半且無回彈動畫 |
| transition 轉場 | 換頁＝投影機光圈：`clip-path:circle(var(--iris))` 從點擊處關到 0 → 換頁 → 從同一點開到 160vmax；光圈邊一圈四色 conic 色輪 | 關 .36s `cubic-bezier(.6,0,.9,.4)`、開 .72s `cubic-bezier(.2,.7,.25,1)` | 直接換頁 |
| signature 簽名 | 壓錶玻璃（glass-press）：全池外推、彎月面變細變亮、欠阻尼回彈 | k=140, c=13 | 瞬間切到壓下／放開狀態 |

自我限制：**本風格禁用淡入、禁用捲動視差、禁用頻閃**——所有動都必須來自液體或投影機。

## 八、插畫與圖像風格

- 技法：**不相溶色胞（immiscible-cell）**——全部圖像都是 metaball 場的相判定，不手繪輪廓。
- 母題：只有圓池、色胞、氣泡（極小的水滴）、幻燈片框、滴瓶、色輪。不畫人物、不畫樂器。
- 實物（例如皂）若要出現，就是同一池液體「凝固」後的剖面：水相變奶白、油相變不透明色粉、亮線變細的暗線。

## 九、Logo 與 Favicon

- Logo：黑底圓角方塊，左側兩個重疊的圓池（洋紅＋亞甲藍），中間一顆帶亮線的蛋黃色胞與一顆苦艾小胞；右側 Huninn 店名＋Shrikhand 英文副標。
- Favicon：32px，同構縮小版，只留兩個圓與一顆蛋黃色胞。不得只放字母。

## 十、Do & Don't

**Do**
- 讓黑牆佔一半以上。
- 讓每一條色界都有亮線或暗縫。
- 讓「壓」成為主要互動，且可用鍵盤（空白鍵）。

**Don't**
- 不要紫藍漸層、不要 lava lamp 式的柔邊漸層 blob、不要玻璃擬態。
- 不要把字放在色胞上；不要用 emoji 當 icon；不要 Lorem ipsum。
- 不要頻閃、不要自動播放聲音（聲音必須由使用者按鍵開始）。
- 不要「置中大標＋兩顆按鈕＋三張卡片」；不要 EST. 年份徽章。

## 十一、頁面骨架範例

```html
<header class="hero">
  <canvas id="wall" role="img" aria-label="三片錶玻璃投在牆上的油水色胞"></canvas>
  <div class="slide lit">
    <p class="kicker">每週五關燈開投影機</p>
    <h1>油水皂房</h1><span class="latin">Iû-tsuí Soap &amp; Light Show</span>
    <dl><dt>地址</dt><dd>臺北市中山區雙城街 18 巷 7 號</dd></dl>
    <a class="btn" href="tih.html">滴一塊你的皂 →</a>
  </div>
</header>
<nav class="droppers" aria-label="主要頁面">
  <a href="index.html" aria-current="page"><svg>…滴瓶…</svg><b>投影</b></a>
  <a href="tih.html"><svg>…</svg><b>滴一塊</b></a>
</nav>
<div class="gel" aria-hidden="true"></div>
<script>
const st = IU.makeStage(canvas, (w,h)=>[{cx:w*.68, cy:h*.44, R:h*.4, ...IU.genPool(1969,0,11,26)}]);
IU.bindPress(st, canvas);   // 空白鍵／長按＝壓玻璃
</script>
```

---

## 十二、技術實作與相容性

### 1. WebGL2 片段著色器：不相溶相場（承載特徵 1、2、3、4）

- 一個全螢幕三角形；uniform `uC[64]`（每個色胞 x, y, r, 色）、`uP[3]`（每池圓心、半徑、水色、是否有色輪）、`uS/uE[3]`（每池色胞索引範圍，讓每像素只跑自己那池的胞）。
- 每像素：各色 metaball 場 → 最大者決定相 → 內暗線／外亮線／油油暗縫 → 燈心衰減 → 圓緣與紅色色散 → 多池相加 → 顆粒。
- 支援：WebGL2 在 Web3DSurvey 的取樣中，Chrome 98%、Edge 99.7%、Firefox 96.8%、Safari 94.4%（查證：web3dsurvey.com/webgl2，2026-10）。GLSL ES 3.00 以 `@shaderfrog/glsl-parser` 驗證語法；並避開兩個未定義行為：`smoothstep` 不可 edge0 ≥ edge1、`pow` 不可負底數（改用 `z*z`）。
- Fallback：`getContext('webgl2')` 失敗或編譯失敗 → 以**同一支公式的 CPU 版**（`lightPx`）在 0.25 倍解析度畫一格靜態畫面，有互動時才重畫；`<noscript>` 內有 SVG 圓池。
- 效能：畫布解析度＝CSS px × min(DPR,1.5) × 0.8；離開視窗（IntersectionObserver）或分頁隱藏即停 rAF。

### 2. Web Audio 合成＋AnalyserNode（承載特徵 4 與核心功能）

- 全曲 110 BPM、80 拍（43.6 秒），E 調 Em–D–A–Em：正弦降頻大鼓、帶通雜訊小鼓、高通雜訊鈸、鋸齒低通貝斯、Farfisa 式方波雙振盪風琴（6.2Hz 顫音接到 `detune`）。零音檔。
- 以 40ms 計時器、0.3 秒前瞻排程；評分用 `AudioContext.currentTime` 對照排好的大鼓時刻，±120ms 算壓在鼓上。
- `AnalyserNode.getByteFrequencyData()` 取 1–3 頻段（低頻）能量，起音 >0.1 即對池子施加 0.32 的壓——玻璃跟著音樂呼吸。
- 支援：`getByteFrequencyData` 為 Baseline 廣泛可用（2015-07 起；Chrome 14、Firefox 25、Safari 6；查證：MDN、caniuse mdn-api_analysernode_getbytefrequencydata）。
- 自動播放政策：`AudioContext` 只在使用者按「放歌」後建立並 `resume()`。不支援時顯示「這台瀏覽器沒辦法放歌」，鼓燈仍可目視跟拍。

### 3. CSS `@property` 型別化自訂屬性（承載轉場與色輪）

- `@property --iris{syntax:'<length>'}` 讓 `clip-path:circle(var(--iris) at …)` 能用 `@keyframes` 補間；`@property --wheel{syntax:'<angle>'}` 讓光圈邊的 `conic-gradient(from var(--wheel))` 色輪旋轉。
- `clip-path` 只在動畫期間掛上（`html.opening/.closing .page`），避免長頁面被固定圓裁掉。
- 支援：Chrome 85+、Safari 16.4+、Firefox 128+（查證：caniuse mdn-css_at-rules_property；web.dev〈@property … universal browser support〉）。
- Fallback：不支援 `@property` 的瀏覽器中自訂屬性不可補間，動畫會在終點直接跳變——等同無轉場直接換頁，資訊不受影響。

### 效能實測（node 22 V8，CPU 同式）

| 項目 | 實測 |
|---|---|
| 頁面大小（含 inline 全部 CSS/JS） | index 39 KB・滴一塊 50 KB・皂架 37 KB・油水夜 39 KB（上限 350 KB） |
| 皂的剖面 480×300、54 個胞 | 45 ms（只在歌停時算一次） |
| 皂架 8 塊 240×150 | 共 112 ms → 改為進入視窗後每幀一塊（每塊 ~14 ms），首屏零成本 |
| 投影片小圖 160×160 ×5 | 33 ms，延遲到進入視窗 |
| 首屏 JS | 建立 WebGL 程式＋一幀，無 CPU 大圖 |
