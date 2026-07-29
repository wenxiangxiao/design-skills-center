---
name: genji-ko-mon
description: A dark ash-and-ember incense-ceremony style built on the Genji-kō crest system, where five vertical strokes and their ties are the only illustration primitive and the page's own appearance is a one-shot perceptual object.
---

# 源氏香紋風 GENJI-KŌ MON — 風格規格書

一種為「不可並列的感官」設計的深色儀式風格。全站的圖像語彙只有一種原語：**五本縱線與相連的橫線**（源氏香之圖）。全站的動效語彙只有一件事：**頁面自己短暫變成某個樣子，然後散掉，不再回來**。

---

## 一、設計哲學

1. **圖像只有一個原語。** 不畫物件、不描外形、不拼貼色塊。所有圖像都是同一組幾何的不同解：五本縱線＋依「哪幾本同」而生的橫線。logo、favicon、圖鑑、票券印記全部由同一支函式輸出。要「一張圖」時就給一個分割；要「一組圖」時就給一批分割。
2. **頁面本身可以是內容。** 這個風格假設有一種資訊無法被並排比較（氣味、聲音、某個瞬間的感覺）。它的做法不是畫一張圖代表那個東西，而是**讓整個頁面短暫變成那個東西**——底色的溫度、顆粒的粗細、呼吸的快慢、線條的疏密同時位移，維持數秒，然後退回中性。圖可以並排，頁面不行，於是視覺被迫變得跟嗅覺一樣。
3. **稀缺是設計材料。** 中性態幾乎沒有彩度：灰、墨、一點暗紅。彩度是被「事件」發給頁面的，事件結束就收回。因此使用者對顏色的記憶變得重要——這正是本風格要製造的緊張。
4. **儀式的密度是低的。** 大量留白、細線分格、無圓角、無陰影、無卡片浮起。一頁只做一件事，一個區塊只講一句話。密度低不是為了漂亮，是為了讓那六秒的變化被看見。
5. **規矩寫在檯面上。** 「為什麼不能重來」「為什麼只有六秒」必須有一頁把理由寫完。限制若沒有被解釋，就只是難用。

---

## 二、色彩系統

### 中性態（頁面 92% 的時間）

| 用途 | HEX | 佔比 | 說明 |
|---|---|---|---|
| 墨地 sumi | `#11161A` | 40% | 頁面地色，帶青的近黑，不可換成暖褐或純黑 |
| 面板 sumi-2 | `#1A2126` | 14% | 卡片／記録紙／答案區底 |
| 凹面 sumi-3 | `#232C31` | 8% | 輸入框、被按下的區塊 |
| 香灰 hai | `#CFC9BB` | 20% | 正文、縱線、主要按鈕底 |
| 銀葉 hai-2 | `#8D9598` | 10% | 次要文字、mono 標籤、刻度 |
| 蘇芳 suo | `#8C3243` | 5% | 記號色：現用項、答錯、印記、章節編號 |
| 炭火 okibi | `#E2703A` | 3% | 唯一的暖作用色：倒數、答對、現用頁的爐光 |

分隔線一律 1px 實線 `rgba(207,201,187,.20)`；更輕的內部分隔 `rgba(207,201,187,.055)`。**不使用陰影、不使用圓角、不使用漸層當裝飾**（唯一允許的漸層是爐光的 radial-gradient 與面板的 176deg 微斜漸層）。

### 事件態（頁面 8% 的時間）

事件發生時，以 CSS 變數整批位移：

```css
:root{
  --sc-h:28;      /* 事件色相 0–360 */
  --sc-c:0%;      /* 事件彩度，中性為 0% */
  --sc-a:0;       /* 事件強度 0–.9 */
  --grain:.045;   /* 顆粒不透明度 .05–.4 */
  --pulse:11s;    /* 呼吸週期 4.4s–11s */
  --track:0em;    /* 正文字距 0–.033em */
  --tint:rgba(207,201,187,.20);   /* 所有分隔線色 */
}
```

事件態的色相取值須彼此相隔 ≥25°（例：26 / 52 / 96 / 158 / 196 / 232 / 288）。彩度上限 88%，強度上限 .9——**事件態不可亮到蓋掉正文**，它是室內的光，不是螢幕的光。

---

## 三、字體系統

| 角色 | 字體 | 字重 | 用途 |
|---|---|---|---|
| 顯示 | `'Shippori Mincho'` → `'Noto Serif TC'` | 500 / 700 | 標題、紋名、按鈕、爐號 |
| 內文 | `'Noto Serif TC'` → `'Shippori Mincho'` | 300 | 全部段落；`line-height:1.95` |
| 標記 | `'DM Mono'` → `ui-monospace` | 400 / 500 | 編號、時間、代碼、小標籤 |

字級階：`11px`（mono 標籤，`letter-spacing:.16em`，大寫）／`13.5px`（註解）／`16px`（正文）／`19px`（小標）／`clamp(22px,3vw,30px)`（章標）／`clamp(30px,5.4vw,52px)`（頁標）。

**字距是這個風格的主要個性**：顯示字一律 `letter-spacing:.1em–.24em`；mono 標籤 `.14em–.34em`；正文不加字距（事件態除外，最多 +.033em）。明體的直線與五本縱線是同一種筆勢，不可換成黑體或圓體。

---

## 四、版面與網格

- 外距 `clamp(18px,5vw,60px)`；內容最大寬 1180–1220px；**不置中**，整頁靠左，右側留白。
- 主要區塊採 **不等分兩欄**：`minmax(0,1.15fr) minmax(300px,.85fr)` 或 `1fr minmax(0,42ch)`。永遠不用等分三卡片。
- 章節標題採 `auto 1fr` 的兩欄：左邊一個蘇芳色的漢數字編號（壹貳參…），右邊標題，下面 1px 細線。
- 「紙」類元件（記録紙、票券）以 `transform:rotate(-.5deg)`～`rotate(.4deg)` 微傾，其餘一律正交。≤900px 取消傾斜。
- 段落最大寬 `56–66ch`。表格靠左、無框線、只有列底細線。
- 圖鑑類網格：`repeat(auto-fill,minmax(126px,1fr))`，`gap:1px` 加上底色 `--tint-s` 做出鐵網式細分格（不是卡片，是格子）。

---

## 五、香紋引擎（本風格的唯一圖像原語）

一切圖像都由「五個位置的分割」生成。分割寫成**限制成長字串**（RGS）：`a[0]=0`，其後 `a[i] ≤ max(a[0..i-1])+1`。長度 5 的 RGS 恰有 52 個（貝爾數 B₅），這也是源氏香五十二紋的來源。

```js
function allRGS(){var out=[];(function rec(a,mx){if(a.length===5){out.push(a.slice());return}
  for(var v=0;v<=mx+1;v++){a.push(v);rec(a,Math.max(mx,v));a.pop()}})([],-1);return out}

function geom(part){                      // 決定每組橫線的高度層級
  var gm={};part.forEach(function(g,i){(gm[g]=gm[g]||[]).push(i)});
  var spans=Object.keys(gm).map(function(k){return gm[k]}).filter(function(g){return g.length>1})
    .map(function(g){return {mem:g,lo:Math.min.apply(null,g),hi:Math.max.apply(null,g),lv:0}});
  spans.sort(function(a,b){return (a.hi-a.lo)-(b.hi-b.lo)});   // 窄的先分配 → 被包住的必在下層
  var done=[];
  spans.forEach(function(s){var lv=1;
    while(done.some(function(o){return o.lv===lv&&!(o.hi<s.lo||o.lo>s.hi)}))lv++;
    s.lv=lv;done.push(s)});
  var lvOf=[0,0,0,0,0];
  spans.forEach(function(s){s.mem.forEach(function(i){lvOf[i]=s.lv})});
  return {spans:spans,lvOf:lvOf};
}

function monSVG(part,o){
  o=o||{};var W=o.w||88,H=o.h||96,sw=o.sw||2.3,pad=o.pad||11,dy=o.dy||7;
  var step=(W-pad*2)/4,base=H-pad,top0=pad+16,g=geom(part),s='';
  var x=function(i){return W-pad-i*step},ty=function(l){return top0-l*dy};   // 右起第一位
  for(var i=0;i<5;i++)s+='<line x1="'+x(i)+'" y1="'+ty(g.lvOf[i])+'" x2="'+x(i)+'" y2="'+base+'"/>';
  g.spans.forEach(function(sp){s+='<line x1="'+x(sp.lo)+'" y1="'+ty(sp.lv)+
    '" x2="'+x(sp.hi)+'" y2="'+ty(sp.lv)+'"/>'});
  return '<svg viewBox="0 0 '+W+' '+H+'"><g stroke="currentColor" stroke-width="'+sw+
    '" stroke-linecap="square" fill="none">'+s+'</g></svg>';
}
```

規則要點：

1. **由右至左**排序（第一項在最右），這是源氏香之圖的傳統讀法，不可鏡射。
2. 同組的線頂端等高並以橫線相連；被夾在中間、不屬於該組的線**頭部壓低一格**（`dy=7`），讓橫線從它上面走過。
3. 兩組互相交錯（如 `甲乙甲丙乙`）時，交叉是允許且正確的——只有「包含關係」必須靠層級避開。
4. `stroke-linecap:square`、`fill:none`、`stroke:currentColor`。線寬隨尺寸縮放：62px 寬用 2、88px 用 2.3、132px 用 3.1。
5. 換題材時分割的語意可以換（五道工序、五位講者、五個批次），但**視覺規則一個字都不能改**——這是本風格的識別。

移植到別的產業：分割可以由雜湊產生（`fnv(姓名+場次) % 52`），於是每一張票、每一位會員都有一個屬於自己的紋，同資料恆得同紋。

---

## 六、一次性感官狀態（本風格的動效核心配方）

這是本風格最重要的一章。若只抄配色與縱線而不做這一段，做出來的只是深色版面。

### 6.1 什麼東西可以被做成「一次性感官狀態」

任何**本質上無法並列比較**的資訊：氣味、味覺、一段轉瞬的聲響、某個當下的手感、一次不可重播的觀測。若你的題材裡有「使用者必須靠記憶而不是靠比對來判斷」的環節，就用這個配方。

### 6.2 參數向量

每一個「感官對象」是一組參數，**至少三個維度與顏色無關**（色覺不同的人必須也能玩）：

```js
{ h:26,      // 色相
  c:46,      // 彩度
  gr:.17,    // 顆粒密度   ← 非顏色線索
  pu:7.4,    // 呼吸週期 s ← 非顏色線索
  nb:3,      // 煙筋條數   ← 非顏色線索（2–5）
  sw:.52,    // 擺幅
  sp:.26 }   // 流速
```

### 6.3 施加與撤回

```js
function apply(p){                              // 事件開始
  root.style.setProperty('--sc-h', p.h);
  root.style.setProperty('--sc-c', p.c+'%');
  root.style.setProperty('--sc-a', .5);
  root.style.setProperty('--grain', p.gr);
  root.style.setProperty('--pulse', p.pu+'s');
  root.style.setProperty('--track', (p.sw*0.045).toFixed(3)+'em');
  root.style.setProperty('--tint','hsla('+p.h+','+p.c+'%,62%,.42)');
}
function release(){ /* 全部設回中性值 */ }
```

- 進場 `transition:1100ms cubic-bezier(.32,.06,.2,1)`，退場同值。
- **持續時間固定 6.0 秒**，以 mono 字顯示「殘 X.X 秒」；不要用進度環（描繪動畫已是全網濫用手法）。
- 期間**禁止**顯示任何可以事後比對的殘留：不留縮圖、不留色票、不寫進歷史列表。頁面必須真的回到中性。
- 事件結束後該對象標記為「済」，在嚴格模式下不可再次觸發；另備一個寬鬆模式（稽古）允許反覆觸發，作為可用性保底。

### 6.4 唯一的並列時刻

答案揭曉時（且只有那時）可以把所有對象並排成色票列——「先失去，才給你看見」。這個對比是本風格的情緒高點，不要浪費在別的地方。

### 6.5 煙筋 canvas（可選但建議）

以固定步長由下往上取樣，位移為 `sin(u*3.4+phase+t*speed) * (5+sw*30) * u²`，`u` 為高度比例；`globalCompositeOperation='lighter'`，`strokeStyle` 用事件色相、alpha 0.16 × 淡入淡出係數。`prefers-reduced-motion` 時只畫 `t=0` 的一張靜止圖，其餘計時與判定完全不變。

---

## 七、元件配方

**導覽（爐面四區）**：右上角 112px 圓形，`border-radius:50%` 加 `inset` 陰影做出爐身；內部以四個 50%×50% 的絕對定位連結分成四區（**用 `:nth-of-type()` 不要用 `:nth-child()`**，因為爐身與十字筋也是子元素）；現用頁那一區填 `repeating-linear-gradient(38deg,#C6C0B2 0 3px,#B4AEA0 3px 6px)`（灰押的筋紋）並加 `inset 0 0 12px rgba(226,112,58,.55)` 的炭光。≤900px 攤平為底部四格固定列，現用頁改以 3px 炭火色下框標示，頁尾另備完整連結。

**按鈕**：主按鈕 = 香灰底、墨字、無圓角、`letter-spacing:.24em`，hover 轉純白。次按鈕 = 透明底 + `inset 0 0 0 1px` 銀葉線。停用態 = 透明底、銀葉字、細線框。**不做陰影、不做位移、不做按壓效果**（按壓硬陰影是全館過載手法）。

**選擇鈕（甲乙丙丁戊）**：34×34 方格，1px 線框，選中時填蘇芳。禁用態 `opacity:.25`。用 `aria-pressed` 表達狀態，不要只靠顏色。

**表格**：無外框、無斑馬紋，只有列底 1px `--tint-s`；表頭為 mono 10px 大寫銀葉字。

**表單**：`--sumi-3` 底、1px 線框、無圓角；`:focus` 用 `outline:2px solid var(--okibi)` 而非發光；錯誤訊息為蘇芳色單行，`role="alert"`。

**票券／記録紙**：`linear-gradient(176deg,#25262A,#1D2226)` + 1px 線框 + 微旋轉；內部以 `70px 1fr` 的 dl 排資料，dt 為 mono 標籤。

**頁尾**：`repeat(auto-fit,minmax(210px,1fr))` 四欄，第一欄品牌名（顯示字 18px `.2em`），其餘為連結、資訊、聲明。

---

## 八、動效規則

| 對象 | 觸發 | 時間 | 曲線 |
|---|---|---|---|
| 事件態進退 | 使用者按鍵 | 1100ms | `cubic-bezier(.32,.06,.2,1)` |
| 頁面呼吸 | 恆常 | `var(--pulse)` 4.4–11s | `ease-in-out`，只改 opacity .82→1 |
| 煙筋 | 事件期間 | 60fps rAF | 正弦位移，淡入淡出各 900ms |
| 連結／按鈕 | hover | 240–320ms | `ease` |
| 選擇鈕 | click | 200ms | `ease` |

禁止：視差捲動、進場淡入序列（AI tell）、數字滾動計數、`stroke-dashoffset` 描繪、彈跳緩動、跑馬燈。本風格的動效預算全部押在第六章那六秒上。

`prefers-reduced-motion` 時：`*{animation:none;transition-duration:1ms}`，煙為靜止圖，六秒與規則不變。

---

## 九、插畫與圖像風格

- **零外部圖片、零圖示字型、零 emoji。** 圖像只有三類來源：香紋引擎（第五章）、程序煙筋（canvas）、以最少幾何原語畫的器物示意（線寬 1.2–1.6，`fill:none`，`stroke:currentColor`）。
- 器物示意的畫法：只用 `line`／`path`／`circle`／`ellipse`，不加陰影、不加漸層、不描細節。一件器物 4–8 筆畫完；畫不完就是畫得太細。
- 顆粒是唯一的質感層：一張 180×180 的 `feTurbulence` SVG 以 data URI 平鋪，`mix-blend-mode:soft-light`，opacity 由 `--grain` 控制。
- 需要「大圖」的地方，放大香紋（132px 以上）並在旁邊寫實算數字（機率、稀有度、代碼），不要放裝飾插圖。

---

## 十、Logo 與 Favicon

**Logo**：左為一枚香紋（建議選一個有跨線的分割，如 `甲乙甲丙乙`，最能表現畫法），線寬 3；紋的上方一顆 3.4px 炭火色圓點（炭），下方一條銀葉色細線（灰面）。右為品牌名（顯示字 700、`letter-spacing:6`）＋下方 mono 羅馬拼音（`letter-spacing:5.4`），中間以 1.6px 蘇芳橫線分隔。整體 280×104。

**Favicon**：32×32 inline SVG data URI。墨地滿版，五本 2.2px 香灰縱線由右至左，兩條橫線（示範跨線畫法），頂端一顆 1.7px 炭火點。**不要放字**——16px 下只有線讀得出來。

---

## 十一、Do & Don't

**Do**

- 先決定「哪一種資訊在你的題材裡不能並列」，再開始做視覺。
- 讓同一支香紋引擎輸出 logo、favicon、圖鑑、票券印記——全站不出現任何一張「畫」的圖。
- 把限制的理由寫成一整頁可讀的文字（為什麼只有一次、為什麼六秒）。
- 顏色以外至少再給三種可辨識的線索（條數、週期、顆粒）。
- 提供寬鬆模式作為可用性保底，且兩個模式共用同一套判定。

**Don't**

- 不要紫藍漸層、不要置中大標＋三張圓角卡片、不要 emoji icon、不要 Lorem ipsum。
- 不要把事件態做成「主題切換」——它必須會自己結束，而且不能被使用者留住。
- 不要在事件期間或事件之後留下可比對的殘留（縮圖、色票、歷史）；那會把記憶題變成比對題。
- 不要用米白紙感底。這個風格的地色是帶青的近黑，換成米白就整套崩解。
- 不要加陰影、圓角、卡片浮起、按壓位移。分格靠 1px 線與 1px gap。
- 不要用跑馬燈或描繪動畫代替第六章的六秒。
- 不要在 16px 的 favicon 裡塞字。

---

## 十二、頁面骨架範例

```html
<body>
<div class="glow"></div><div class="grain"></div>

<header class="hd">
  <a class="brand" href="index.html">
    <svg viewBox="0 0 38 42"><!-- 香紋 5 線 + 2 橫 + 炭火點 --></svg>
    <span><b>品牌名</b><em>ROMAJI · CITY</em></span>
  </a>
  <nav class="censer">                <!-- 爐面四區導覽 -->
    <div class="bowl"></div>
    <a class="q" href="index.html" aria-current="page">第一頁</a>
    <a class="q" href="b.html">第二頁</a>
    <a class="q" href="c.html">第三頁</a>
    <a class="q" href="d.html">第四頁</a>
    <div class="cross"></div><div class="rim"></div>
  </nav>
</header>

<main>
  <div class="seki-hd">              <!-- 不等分兩欄：標題 / 模式開關 -->
    <h1><small>MONO 副標</small>主標題</h1>
    <div class="opts">
      <button class="opt" aria-pressed="false">嚴格模式</button>
      <button class="opt" aria-pressed="false">高對比</button>
    </div>
  </div>

  <div class="board">                <!-- 1.15fr / .85fr -->
    <div class="furo">
      <div class="stage"><canvas></canvas><!-- 事件舞台：中性時什麼都沒有 --></div>
      <div class="slots"><!-- 五個對象，一個一個來 --></div>
      <button class="btn">觸　發</button>
    </div>
    <aside class="paper">            <!-- 微旋轉的紙 -->
      <h2>記録<span>CODE —</span></h2>
      <div class="rows"><!-- 甲乙丙丁戊 選擇鈕 --></div>
      <div class="mon-box"><!-- 即時香紋預覽 --></div>
      <button class="btn">提　出</button>
    </aside>
  </div>

  <section class="verdict" hidden><!-- 唯一的並列時刻 --></section>

  <hr class="rule">
  <div class="two">                  <!-- .9fr / 1.1fr 說明兩欄 -->
    <div><p class="mono">章節標</p><h2>為什麼<br>只有一次</h2></div>
    <div><p class="pull">一句立場明確的引文。</p><p>理由全文。</p></div>
  </div>
</main>

<footer><!-- 四欄：品牌 / 連結 / 資訊 / 聲明 --></footer>
</body>
```

---

*本風格適用於：需要「靠記憶判斷」的教學或測驗、感官類品牌（香、茶、酒、聲音）、儀式性強的服務、任何想把限制當成賣點的題材。不適用於：需要大量並排比較的電商與資料儀表板——那正好是本風格拒絕提供的東西。*
