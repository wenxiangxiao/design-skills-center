---
name: warli-rice-paste-wall
description: Warli painting for the web — one rice-paste white on a red-ochre mud wall, figures built only from circles, triangles, squares and stick lines, no horizon, the hand-linked tarpa spiral and the chauk frame as the sacred enclosure.
---

# 瓦爾利 · 米漿白赭泥牆 Warli Painting

> 這份規格書描述的是印度西部瓦爾利族（Warli／Varli）的牆畫傳統，網頁化為一套可重用的視覺語言。
> 範例站是花蓮富里一家碾米廠「稻埕碾米廠」，同一套語言也能做米店、農會、社區廚房、合唱團、托育中心、有機市集、陶工坊、民宿。
> 判準：**遮掉全部文字，懂設計的人三秒內要說得出「這是瓦爾利畫」。**
> 尊重條款寫在最前面：瓦爾利畫屬於瓦爾利族，2014 年取得印度地理標示（GI）。用這份規格做網站時，不要冒用「Warli painting」之名販售畫作、不要畫神祇與婚禮的 Palaghata、在頁面上寫明出處。

---

## 一、設計哲學

瓦爾利族住在印度馬哈拉施特拉邦北薩希亞德里山區（帕爾加爾、塔那一帶），以看天田種稻為生。牆畫原本是婚禮與收成時由婦女畫在屋內：牆先以泥與牛糞抹平、刷上 geru 紅土，白色是**米磨成粉加水做的漿**，筆是**咬開的竹枝**。1970 年代起，Jivya Soma Mashe（1934–2018）把它畫到紙與布上，讓外界認識，後獲頒 Padma Shri；他的〈Tarpana〉畫的就是收成後的 tarpa 舞——一人吹葫蘆做的 tarpa，眾人手牽手繞成螺旋。

所以這個流派的形是被**材料與手**決定的：

1. **只有一罐白**：米漿只有一種白，牆只有一種紅。沒有第二種顏料，就沒有色彩層級可用，所有層級都要靠「形的大小、重複與框」來做。
2. **只有三個原形**：圓（日、月）、三角（山、樹、人的身體）、方（chauk 聖域、田地）。人是兩個三角尖對尖、圓頭、線的四肢。
3. **畫面是一面牆，不是一扇窗**：沒有地平線、沒有透視；重要的大、次要的小，重複就是節奏，空白處填上日常。

網頁化的三條後果：

- **介面也只有一罐白**：字、線、按鈕、圖、焦點環全部是米漿白；狀態不靠換色，而靠「形」——舉起雙手、頭上一顆日、斷開的手。
- **圖全部由原形引擎生成**：同一支程式畫壁畫、導覽、米袋、遊戲結果，不手繪插圖、不用外部圖片。
- **重要的事用 chauk 框起來**，一頁至多兩個。

與相近條目的分界：
- 與 **Matisse 剪紙**、**Saul Bass 剪紙**：那些是多色平塊的有機形；這裡只有一色、只有幾何原形。
- 與 **Kalighat Pat 卡利加特單張畫**（同為印度）：那是加爾各答的水彩、粗黑輪廓與曲線人物；這裡是單白剪影、無輪廓、三角人。
- 與 **Mixteca-Puebla 古抄本**、**ISOTYPE**：那些有黑框線或可數符號表；這裡的人不計數、不框線，是群體與節奏。
- 與一般「stick figure」插圖：stick figure 是一條線的身體；瓦爾利的身體一定是**兩個實心三角**。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，它就不是瓦爾利了。

### 特徵 1：一罐米漿白在赭泥牆上（單色顏料）

地是赭泥 `#8C3A21`，畫與字只有米漿白 `#F3EBDC`。唯一允許的「第二白」是同一罐刷薄了的稀米漿 `#E0C2AB`（次級文字、輔線）。零漸層、零陰影、零透明疊色、零其他顏料。

```css
:root{--geru:#8C3A21;--dado:#3E2417;--paste:#F3EBDC;--thin:#E0C2AB}
body{background:var(--geru);color:var(--paste)}
svg .wf{fill:var(--paste)}                                   /* 實心形 */
svg .wl{stroke:var(--paste);fill:none;stroke-linecap:round;stroke-linejoin:round} /* 竹枝線 */
```

### 特徵 2：兩個三角尖對尖的人（以及只有圓・三角・方）

人＝倒三角上身＋正三角下身＋圓頭＋兩段折線的四肢；女性在腦後加一顆髮髻小圓。日月是圓、山樹是三角、田與聖域是方。曲線只出現在圓。

```svg
<!-- 一個站著的人，高 40；以 translate 擺位、rotate 讓他站在圈上 -->
<g transform="translate(100 120)">
  <path class="wf" d="M-6.8 -31.2L6.8 -31.2L0 -20.8Z M0 -20.8L5.6 -11.2L-5.6 -11.2Z"/>
  <circle class="wf" cx="0" cy="-36.2" r="3.9"/>
  <path class="wl" stroke-width="2.1" d="M-6.3 -30.4L-8.5 -22.7L-10 -15.8 M6.3 -30.4L8.5 -22.7L10 -15.8
     M-3.5 -11.2L-4.5 -5.3L-5.4 0.6 M3.5 -11.2L4.5 -5.3L5.4 0.6"/>
</g>
```

### 特徵 3：竹枝筆觸——圓頭線端、粗細略不勻

所有線 `stroke-linecap:round`、`stroke-linejoin:round`；線寬＝人高 × 0.052；每個頂點加 ±1.5% 人高的抖動（決定性亂數），讓「同一個人畫了一百個」而不是「電腦複製一百個」。

```js
const j = () => (rng() - .5) * .03 * s;   // s＝人高；每個三角頂點都 +j()
const sw = Math.max(1, s * .052);          // 竹枝線寬
```

### 特徵 4：沒有地平線的散點牆面＋手牽手的 tarpa 螺旋

畫面不設地平線與透視，場景浮在牆上；主題物件是**阿基米德螺線 r=a+bθ 上等弧長排列的人**，頭朝外、腳朝圈心，相鄰兩人肩→手（往圈心下垂）→肩連成**一條**鏈。

```js
// 等弧長排人：θ += 間距 / 目前半徑
for (let i = 0; i < n; i++) {
  const r = a + b * th, x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r;
  pts.push({ x, y, rot: th * 180 / Math.PI + 90 });   // +90°：頭朝外
  th += spacing / r;
}
```

### 特徵 5：chauk 方框——方框外一圈三角、內一圈點

最重要的那件事（店名卡、遊戲台、入圈號）用 chauk 框起。網頁用一張 42×42 的 SVG 當 `border-image`，`round` 讓三角平均分布。

```css
.chauk{border:14px solid var(--paste);padding:34px 32px 30px;
 border-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42' fill='%23F3EBDC'%3E%3Cpath d='M8 8H34V10.4H8Z M8 31.6H34V34H8Z M8 8H10.4V34H8Z M31.6 8H34V34H31.6Z M14 8L21 1L28 8Z M14 34L21 41L28 34Z M8 14L1 21L8 28Z M34 14L41 21L34 28Z M8 8L2 2L5 8Z M34 8L40 2L37 8Z M8 34L2 40L5 34Z M34 34L40 40L37 34Z'/%3E%3Ccircle cx='21' cy='14' r='1.7'/%3E%3Ccircle cx='21' cy='28' r='1.7'/%3E%3Ccircle cx='14' cy='21' r='1.7'/%3E%3Ccircle cx='28' cy='21' r='1.7'/%3E%3C/svg%3E") 14 round}
```

---

## 三、色彩系統

| 色票 | hex | 用途 | 面積 |
|---|---|---|---|
| 赭泥 geru | `#8C3A21` | 唯一大面積地色（牆） | ~70% |
| 手抹痕 | `#95422A` | 只用於 body 背景的弧形抹泥紋（同一層泥被手掌抹過） | 紋理 |
| 牆腳牛糞泥 | `#3E2417` | 刊頭帶、頁尾、手機版底部導覽 | ~14% |
| 米漿白 | `#F3EBDC` | 全部的字、線、形、按鈕底 | ~14% |
| 稀米漿 | `#E0C2AB` | 次級文字、說明、輔線 | ≤3% |

可讀性（WCAG）：米漿白對赭泥 6.4:1；稀米漿對赭泥 4.55:1；米漿白對牛糞泥 12.1:1。按鈕是米漿白底＋赭泥字（6.4:1）。
**狀態不換色**：現用頁＝那個人舉手＋頭上一顆日；錯誤＝手鬆開（斷鏈）；hover＝人舉手。

## 四、字體系統

- 標題、標籤、數字：**LXGW WenKai TC**（Google Fonts）700／400——像竹枝蘸漿寫的手寫楷。
- 內文、價目：**Noto Sans TC** 400／500／700，`font-variant-numeric:tabular-nums` 用於價目。
- 字級：h1 `clamp(2.1rem,3.5vw,3.3rem)` 字距 .1em；h2 1.7rem；內文 `clamp(14px,1.05vw,17px)` 行高 1.75；說明 .82–.9rem。
- 不用粗襯線、不用等寬體、不用全大寫英文長句。英文副標字距 .18–.32em、用 WenKai 400。

## 五、版面與網格

- 容器 `min(1180px,100% - 40px)`；首屏左 chauk 卡（0.8fr）＋右壁畫（1.45fr）。
- 無卡片牆：三件事做成**一條連續的牆畫長卷**（田→碾米機→圈），下方三欄文字對齊長卷的三段，以點列分隔。
- 分隔一律用**點列**（`radial-gradient` 硬邊點，16px 間距）或**鋸齒三角列**，不用細灰線。
- 旋轉只出現在圈上的人（依螺線切線），版面本身零旋轉。
- 留白：區段間 64px；手機 ≤860px 單欄、導覽落到底部牛糞泥 dock。

## 六、元件配方

- **刊頭**：牛糞泥帶，下緣一排 4px 圓點（`radial-gradient` 14px 間距）像泥牆腳的手印。
- **導覽 hand-chain 牽手人鏈**：四個人站在一條線上手牽手，各為一頁；現用頁那個人放開手、舉起雙手、頭上一顆日（鏈在他兩側斷開）。hover／focus 那個人舉手。手機版移到底部 dock。
- **按鈕**：米漿白實心方塊、赭泥字、零圓角零陰影；`:active` 位移 1px 2px。次按鈕為 2px 白框。
- **表單**：只有底線（2px 米漿白），select 2px 白框；checkbox `accent-color: var(--paste)`。
- **價目表**：兩欄 `dl`，每列以 2px 點線分隔，品名 WenKai、價格 tabular。
- **頁尾**：牛糞泥，上緣一排倒三角（牆腳的鋸齒），三欄＋虛構聲明。
- **焦點環**：`outline:3px dotted var(--paste)`——點列就是瓦爾利的邊飾。

## 七、動效規則

四種動效各有本站自製實作，motion-library 元件為額外。

| 類型 | 實作 | 觸發／duration／easing | 減少動態 |
|---|---|---|---|
| ambient 環境 | 首頁壁畫 SVG SMIL：圈 `animateTransform rotate` 140s 一圈；鳥群 `animateMotion` 34s；舂米兩婦人與扛米袋隊伍以 `calcMode="discrete"` 兩格交替（1.2s／0.9s，有限動畫）；日月依臺北時刻（Intl）切換 | 全部 `begin="indefinite"`，由 JS `beginElement()` 啟動；離屏 `pauseAnimations()` | 不啟動＝一張靜止的畫，資訊零損失 |
| input 輸入 | 壁畫上的人 hover 換成舉手姿勢（CSS 切 `.pA/.pB`，<1 幀）；導覽人鏈 hover 舉手；碾米試算拉桿即時改寫米袋（`steps(3)` 落袋）；工序長卷指到那段 `steps(2)` 上提 | 0–300ms | 位移取消，狀態照切 |
| transition 轉場 | 重抹一層泥：站內連結點下，一片赭泥帶手抹鋸齒邊（clip-path polygon 15 點、±3.5% 決定性抖動）從左抹過整頁 420ms `cubic-bezier(.6,0,.3,1)`，新頁再從左抹開 520ms | WAAPI | 直接換頁 |
| signature 簽名 | **圍舞螺旋牽手鏈**（〈進圈〉）：Web Audio 拍點上每按準一次，阿基米德螺線上多一個人、手接進同一條鏈；準到 ±75ms 那人雙手舉起；拍歪即在鏈尾斷手；整圈依拍速每拍轉 15°、每拍換一步 | 32 拍 84→112 BPM | 圈不轉，人照樣進圈、斷手照樣斷 |

自我限制：本站不用淡入、不用視差、不用 dashoffset 描線。

### motion-library 元件表（`wenxiangxiao/motion-library` v1.9.0 @6e9435f）

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| 首頁 | TXT-B-16 | Circle Text | text「圍一圈」、colors {primary #F3EBDC, secondary #E0C2AB, bg #8C3A21}、duration 2.4、loop:false、seed 11、16:9 | 字先站成一圈再放手排成一行——就是 tarpa 圈散場；赭泥底讓字色自動為近白，像米漿 | transition（一次性） |
| 碾 | BG-B-05 | Spiral Dots | 同色票、duration 16、density .9、intensity .8、seed 1988、1:1 | 黃金角排列的米粒在穀斗裡轉；只畫實心圓點，零線零漸層，符合「只有圓」 | ambient |
| 碾 | TXT-B-37 | Letter Assemble | text「碾米・代碾」、duration 1.8、loop:false、seed 62 | 字像散落的米粒聚回袋中 | transition（一次性） |
| 舞 | TXT-A-22 | Orbit | text「進圈」、duration 2.2、loop:false、seed 21 | 字沿橢圓軌道繞一圈再落定，預告這一頁的圈 | transition（一次性） |
| 牆 | BG-B-34 | Minimal Circle | duration 12、intensity .7、seed 2011、1:1 | 一個實心圓＋一道弧＋一個挖空小圓：瓦爾利的日與月 | ambient |

排除：帶 `softGrid` 格線背景的 SHP 元件（瓦爾利牆沒有格線）、帶 `shadowBlur`／`createLinearGradient` 的元件（零發光零漸層）、帶 `rr()` 圓角框的元件（只有圓與直角）。TEL／TRN 禁用。
掛載：子集 inline 為每頁第一個 `<script>`（`tools/ml-embed.js` ＋ `motion-player.js`），`TT.ml` 包裝等 `document.fonts.ready`、進視窗才 mount、離屏 `destroy()`；一次性文字 `loop:false` 只播一次；canvas `aria-hidden`、容器保留 `.ml-fb` 原 HTML 標題；減少動態時背景 `seek(.35)`、文字 `seek(1)`。開發 prompt 以 `MotionLib.prompt(id)` 取得。

## 八、插畫與圖像風格

技法名 **warli-primitive 瓦爾利原形**：全站沒有一張手繪插畫，全部由同一支引擎（`warli.js`）生成——
`fig(x,y,s,pose)` 人（14 種姿勢：站、走 A/B、舞 A/B、歡呼、頂罐、扛袋、舂米上/下、耙穀、割稻、簸米、吹 tarpa）、`tree()` L-system 樹（X→F[+X][-X]FX、F→FF、末梢長三角葉）、`mountains()`、`paddy()`（V 字秧苗列）、`sun()`／`moon()`、`bird()`（兩三角）、`hut()`、`mill()`、`chauk()`、`spiral()`、`bag(year)`。
種子：mulberry32(FNV-1a(seed))，同 seed 恆得同圖。建置期由 node 烘成靜態 SVG（無 JS 可見），瀏覽器端用同一支產生遊戲結果與入圈號小圖。

## 九、Logo 與 Favicon

- Logo：一個 chauk（方框＋外三角＋內點）裡十個人繞成小螺旋、中間一個吹 tarpa 的人。`assets/logo.svg`。
- Favicon：赭泥方塊上一個兩三角人（inline SVG data URI）。
- 永遠只有赭泥與米漿白兩色。

## 十、Do & Don't

**Do**
- 一頁只用一罐白；層級靠大小、重複與 chauk。
- 讓人群重複，讓節奏說話；每個人略有不同（決定性抖動）。
- 寫明瓦爾利族與出處；只畫自己的日常與產業。

**Don't**
- 不加第二種顏料（綠的樹、藍的河都是錯的）。
- 不畫透視、陰影、地平線、寫實人體。
- 不畫神祇、Palaghata、婚禮 chauk 的宗教內容；不把「Warli」當商品名販售畫作。
- 去 AI 化禁令照舊：無紫藍漸層、無置中三卡片、無 emoji icon、無 EST. 徽章、無 Lorem ipsum。

## 十一、頁面骨架範例

```html
<header class="top"><div class="wrap">
  <a class="brand" href="index.html"><svg><!-- chauk logo --></svg><span><b>店名</b><small>ROMAN NAME</small></span></a>
  <nav class="chain" aria-label="主要頁面"><svg aria-hidden="true"><!-- 四個人＋牽手鏈 --></svg>
    <a href="index.html" aria-current="page">圍<small>首頁</small></a> …</nav>
</div></header>
<main class="wrap">
  <section class="hero">
    <div class="chauk"><h1>店名</h1><p class="lede">…</p><a class="btn" href="…">主要動作</a></div>
    <svg class="mural smil" viewBox="0 0 1000 780"><!-- warli.js 烘焙的壁畫 --></svg>
  </section>
  <div class="dots"></div>
</main>
<footer class="foot">…</footer>
```

---

## 十二、技術實作與相容性

| 技術 | 用途 | 支援現況（查證） | fallback |
|---|---|---|---|
| SVG SMIL `animateTransform`／`animateMotion`／`animate calcMode=discrete` ＋ `beginElement()`／`pauseAnimations()`（B 層） | 首頁壁畫的圈轉、鳥飛、舂米與扛袋的兩格有限動畫 | MDN：SVGAnimateMotionElement／SVGAnimateTransformElement Baseline Widely available（2020-01 起全瀏覽器）；caniuse animateMotion path：Chrome 19+、Firefox 4+、Safari 6+ | 全部 `begin="indefinite"`：無 JS、減少動態、或不支援時就是一張完整靜止的畫 |
| L-system ＋ 決定性原形文法（E 層，自寫 `warli.js`） | 樹、人、田、日月、chauk、螺旋、16 張米袋、遊戲結果畫 | 純 ES5 字串運算，無相容問題；同一支在 node 建置期與瀏覽器執行 | 建置期已烘成靜態 SVG |
| Web Audio 合成（D 層）：OscillatorNode 鋸齒×2＋BiquadFilter 帶通＋LFO 顫音＝tarpa；正弦 128→52Hz 下滑＝鼓；AudioBuffer 白噪＝拍手；`AudioContext.currentTime` 當遊戲時鐘、25ms lookahead 排程 | 〈進圈〉的拍點與判定 | MDN Web Audio API Baseline Widely available；需使用者手勢啟動（按「吹 tarpa」） | 無 AudioContext 時退回 `performance.now()` 靜音時鐘，鼓點以數字閃示 |

輔助：Intl.DateTimeFormat（Asia/Taipei 日月與營業狀態）、IntersectionObserver（SMIL 與元件離屏暫停）、WAAPI clip-path（轉場）。

**效能實測**（建置後）：index 約 186KB、mill 121KB、dance 154KB、wall 308KB（皆 ≤350KB，含 inline motion-library 子集）。首屏 JS 只做 class 切換與 `beginElement()`；〈進圈〉每拍重建 ≤60 人的 SVG 字串一次，rAF 只改一個 `transform`。同一畫面同時運轉的 motion-library 元件 ≤2。
