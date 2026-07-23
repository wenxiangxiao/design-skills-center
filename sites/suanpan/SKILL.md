---
name: chalk-slate-abacus
description: A chalkboard-green schoolroom style where every number on the site is rendered as a real abacus (soroban) bead column; warm hinoki-amber beads, chalk-cream type, vermilion accents, and diamond-lozenge bead illustration.
---

# 粉筆黑板算術風 Chalk-Slate（算珠堂 SUANPAN）

> 一句話：把一塊教室綠板搬上網頁——上面找不到阿拉伯數字，每個數都撥成算珠。風格的靈魂不是配色，是「數字即算盤」這條渲染鐵律。

## 一、設計哲學

這個風格模擬一間台灣老珠算補習班的綠板現場：檜木算盤、粉筆字、乾淨的定位分節。三條原則貫穿全站：

1. **數字即算盤（最高律）**：頁面上凡是「數」——價目、電話、成績、留位號、圖鑑示例——一律用同一支 `miniAbacus(n)` 引擎撥成算珠列，而非打字。這是本風格與一切「教育／復古」風的分界；拿掉這條就退化成普通深色網站。
2. **綠板為地，粉筆為字**：大面積是低飽和的黑板墨綠，字是粉筆米白，重點用檜木琥珀與朱紅點掉。不要漸層、不要玻璃感、不要柔影——粉筆與木頭都是霧面的。
3. **職人的乾**：文案是老師傅口氣，短、實、不推銷。講「湊五」「去九加補」就講清楚，不包裝成靈感金句。

## 二、色彩系統

| 色票 | Hex | 用途 | 大致比例 |
|---|---|---|---|
| 黑板墨綠 | `#23372E` | 全站底色（大面積地色） | ~46% |
| 板面深綠 | `#2C4638` | 算盤框內、輸入框、次級面板 | ~14% |
| 板陰墨綠 | `#1B2A23` | 頁首／頁尾／卡片深底 | ~14% |
| 粉筆米白 | `#EDE5D0` | 主文字、橫樑、標題 | ~12% |
| 檜木琥珀 | `#CE9A4E`（亮 `#E0B36A`） | 算珠本體、木框、重點標籤、按鈕 | ~8% |
| 珠算朱紅 | `#C6402F` | 現用態／錯誤／焦點／入位珠（語意保留字） | <4% |
| 石板藍灰 | `#6E8A93` | 次級線、計數、正解提示 | <2% |
| 檜木暗 | `#7A4E28` | 算盤直桿、橫樑、框描邊 | 線用 |

用色紀律：朱紅只在「現用／錯誤／此刻在動的資料」出現，不當一般裝飾；珠子預設檜木琥珀，一旦「入位（貼樑）」翻亮琥珀或（小算盤中）翻朱，讓狀態一眼可讀。底色永遠是綠板，切勿把琥珀或朱紅鋪成大面積。

## 三、字體系統

Google Fonts 四支：

- **標題（中）**：`Noto Serif TC` 900／700 —— 招牌與大標，端正如板書。
- **標題／標籤（拉丁）**：`Zilla Slab` 700／500 —— 粗板厚實，配英文小標。
- **內文**：`Noto Sans TC` 400／500／700 —— 說明文字，行高 1.75–1.8。
- **數字與代號**：`Kode Mono` 500／700 —— 讀數大字、級別、留位號、mono 小標；等寬讓數字對齊如帳。

字級 scale：招牌 23–34px、區塊大標 `clamp(22px,3.6vw,30px)`、卡片標 16–19px、內文 14–15px、mono 標籤 10–12px（letter-spacing .2–.32em、大寫）。讀數大字 24–30px。行高：內文 1.75、方法頁 1.8。

## 四、版面與網格

- **開場（abacus-first）**：首屏不放大標 hero，正中央就是一具可撥的大算盤（左）＋檢定練習面板（右），上方一行「板書式」引言（kicker＋一句話＋小字）。桌機 `grid-template-columns:1.35fr 1fr`，≤860px 疊為單欄。
- **分節**：每個 `section.blk` 以 1.5px 粉筆線分隔（`border-top`），大標＋mono 英文小標。內容區塊多用 2 欄或 3 欄硬格線網格（`gap:1.5px;background:var(--line)` 造出板上分格感），不用圓角卡片浮層。
- **留白**：中等密度。區塊上下 padding 26–40px。算盤框內留足珠行程空間。
- **定位分節**：算盤每三檔畫一個朝上小三角（定位點），對應真實算盤的個十百千分節——這是識別細節，務必保留。
- **無旋轉**：本風格是端正的板書，不做斜軸；個性來自「珠」而非傾斜。

## 五、元件配方

**算盤（核心）**：SVG，`viewBox 0 0 560 320`。七檔（`COLS=7`），檔距 68、左起 42。橫樑 `y=118`（檜木粗條 8px＋粉筆細線）。每檔一根檜木直桿 3px。珠為菱形（lozenge）四點多邊形，寬約檔距 .42、半高約 15。上珠一顆：靜置在上、`heaven=1` 時下移貼樑。下珠四顆：靜置落底、`earth=k` 時最靠樑的 k 顆上移貼樑（active 群貼樑、inactive 群落底、中間留空隙才讀得對）。目前檔底部畫一條朱紅 2.5px 底線。點珠切換／方向鍵撥數。`transition:transform .16s cubic-bezier(.34,1.4,.5,1)`（帶一點回彈）。

**小算盤（全站數字）**：同幾何縮至 `cw=13`，`miniAbacus(n,minCols)` 回傳 inline SVG 字串，`role='img'` 且 `aria-label='算盤數字 N'`。入位珠翻朱紅、未入位檜木琥珀。凡顯示數字處一律呼叫它。

**nav（bead-dock）**：`position:fixed` 底部，最大寬 640 置中，一根橫貫的粉筆線（`::before`）當算珠桿；四頁為四顆菱形（`clip-path:polygon`）算珠，預設 `translateY(14px)`（落在桿下），現用頁 `translateY(-6px)` 撥上靠桿並翻朱紅。標籤在珠下，mono 英文更小。≤560px 隱英文。

**按鈕**：無圓角（`border-radius:2px`）。次要＝透明底＋1.5px 淡框，hover 檜木框＋淡琥珀底；主要＝檜木琥珀實底、深字。`:focus-visible` 亮琥珀外框。

**輸入框／select**：板面深綠底、1.5px 淡框、focus 翻琥珀框，無圓潤感。

**表格（方法頁）**：`border-collapse`，1px 粉筆線格；表頭 mono 琥珀字、淡琥珀底。補數表、九九表都走這套。

**footer**：板陰墨綠底、粉筆線分隔、mono 小標、細說明字。務必含「本站由 …（YYYY-MM-DD）」建置尾註與虛構聲明。

## 六、動效規則

克制。全站不放跑馬燈、不自動輪播、不做「揭示進場」淡入當簽名。允許的動效只有：

- **撥珠**：珠的 `transform:translateY`，`.16s cubic-bezier(.34,1.4,.5,1)`（微回彈，像木珠撞樑）。
- **nav 撥上**：`.18s` 同曲線。
- **示範撥數**：`setInterval` 每 180ms 撥一檔，逐位成形（`demoTo`）；`prefers-reduced-motion` 下直接設定終值、不逐步。
- **檢定回饋**：正解／誤以色塊即時出現（資料變化，非動畫）。

`@media(prefers-reduced-motion:reduce){*{transition:none!important}}`，且所有邏輯（計算、評級、驗證）都不依賴動畫完成。

## 七、插畫與圖像風格（soroban-bead 算珠構成）

**全站沒有一張外部圖片，也沒有一張「畫」的插圖**——所有圖像都是算珠。技法定義：

- 原語只有一種：菱形算珠（四點多邊形），配檜木直桿與粉筆橫樑。
- 一張「圖」＝一個數的算珠列（`miniAbacus`）。招牌、favicon、圖鑑二十四格、hero 統計、價目、電話、留位號印，全部由它生成。換一個數就是換一張圖。
- 入位／未入位以朱紅／琥珀分色，這條分工不可對調。
- 與 flat-shape 的差別：每顆珠都有算珠語意（作五或作一、入位與否），可被讀回一個數，不是自由色塊。與 thin-lineart 的差別：珠是有描邊的實心菱形、不是等寬裝飾線。

## 八、Logo 與 Favicon 設計指南

- **Logo**：一個綠板方框＋三檔算盤縮影，珠用菱形；三顆珠故意撥成不同位置（有琥珀有朱），暗示「這是活的算盤」。右接 `Noto Serif TC 900` 中文字標「算珠堂」＋ `Kode Mono` 英文 `SUANPAN · ABACUS`。
- **Favicon**：inline SVG data URI（寫在 `<head>`）。綠圓角底＋三直桿＋一道粉筆樑＋三顆菱形珠（兩琥珀一朱）。務必用 data URI，不連外。

## 九、Do & Don't

**Do**
- 凡數字必撥成算珠（`miniAbacus`），這是本風格的命脈。
- 綠板為大面積地色，粉筆米白為字，琥珀與朱紅點到為止。
- 算盤保留定位分節小三角、橫樑粉筆線、菱形珠與微回彈撥動。
- 文案走老師傅乾式短句，術語講清楚（湊五、去九加補、見取算、段級）。
- `prefers-reduced-motion`／RWD／aria-label（算盤數值、每則圖鑑）齊備。

**Don't（含去AI化禁令）**
- ✗ 不用阿拉伯數字直接打在版面上當主要數字呈現（退化成普通網站）。
- ✗ 不用紫藍漸層、玻璃擬態、模糊柔影、圓角浮卡。
- ✗ 不用置中大標＋副標＋兩鈕＋三卡模板；開場就是可撥算盤。
- ✗ 不用 emoji 當 icon、不用 Lorem ipsum、不用「EST. 19xx」徽章、不用「把 X 變成 Y」句式。
- ✗ 不放跑馬燈、不自動輪播、不用揭示淡入當動效簽名。
- ✗ 珠算規則不可亂寫：一四珠上一下四、上珠作五、五升十進、去九加補的補數對（1-9/2-8/3-7/4-6/5-5、湊五 1-4/2-3）要正確。

## 頁面骨架範例

```html
<!-- 開場：abacus-first -->
<section class="stage">
  <div class="lead">
    <span class="kicker">綠板上，數就是算盤</span>
    <p class="say">這張板子上找不到一個阿拉伯數字。<small>撥上珠、去九加補⋯</small></p>
  </div>
  <div class="deck">
    <div class="frame">
      <div class="rail"></div>
      <svg class="abx" viewBox="0 0 560 320" role="application"
           aria-label="可撥算盤，目前數值 0"></svg>
      <div class="read"><div class="num">0</div><div class="han">零</div></div>
    </div>
    <div class="panel"><!-- 檢定練習：選級別→出題→撥盤→確認 --></div>
  </div>
</section>
```

```js
/* 全站數字皆以算珠渲染 —— 一四珠 miniAbacus */
function miniAbacus(n,minCols){
  n=Math.max(0,Math.floor(n));var s=String(n);
  var cols=Math.max(minCols||1,s.length);s=s.padStart(cols,'0');
  var cw=13,x0=8,top=3,beam=17,bh=6.5,h=52,w=x0+(cols-1)*cw+8,out=
    "<svg width='"+(w*0.62)+"' height='"+(h*0.62)+"' viewBox='0 0 "+w+" "+h+"' role='img' aria-label='算盤數字 "+n+"'>";
  for(var i=0;i<cols;i++){var cx=x0+i*cw;
    out+="<line x1='"+cx+"' y1='"+top+"' x2='"+cx+"' y2='"+(h-2)+"' stroke='#7A4E28' stroke-width='1.4'/>";}
  out+="<line x1='"+(x0-5)+"' y1='"+beam+"' x2='"+(x0+(cols-1)*cw+5)+"' y2='"+beam+"' stroke='#EDE5D0' stroke-width='1.4'/>";
  for(var i=0;i<cols;i++){var cx=x0+i*cw,d=+s[i],hv=d>=5?1:0,ea=d>=5?d-5:d;
    out+=dia(cx,hv?(beam-3-bh/2):(top+1+bh/2),hv);              // 上珠：作五
    for(var j=0;j<4;j++)                                        // 下珠：各作一
      out+=dia(cx,(j<ea)?(beam+3+bh/2+j*bh):(h-3-bh/2-(3-j)*bh),j<ea);}
  return out+"</svg>";
  function dia(cx,cy,on){var ww=cw*0.42,hh=bh/2*0.95,c=on?"#C6402F":"#CE9A4E";
    return "<polygon points='"+(cx-ww)+","+cy+" "+cx+","+(cy-hh)+" "+(cx+ww)+","+cy+" "+cx+","+(cy+hh)+
      "' fill='"+c+"' stroke='#5f3c1e' stroke-width='.6'/>";}
}
```

```
補數對（刻進手指）
　湊五：1↔4、2↔3
　進十：1↔9、2↔8、3↔7、4↔6、5↔5
　加法過大 → 左檔進一、本檔減進十補數（去九加補）
　減法不足 → 左檔退一、本檔加回補數（退位）
```

---

*本 SKILL 由 Claude Opus 4.8 · 排程 Agent 撰寫（2026-07-24）。驗收標準：一個沒看過 Demo 的 AI，只讀本檔就能做出「每個數字都是算盤」且色氣一致的全新網站。*
