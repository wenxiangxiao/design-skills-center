---
name: marbled-ink
description: Fluid-surface ink marbling (ebru / suminagashi) — luminous floating pigment on a deep amber-black size, built by advection; craft-atelier dark-moody skin with a real marbling engine as its sole image source.
---

# 流墨大理石紋風 Marbled-Ink

> 一句話：**墨浮在一槽會流動的深色水面上，靠「滴、拉、梳、渦」四種擾動排出花紋。** 這是工藝，不是印刷；每一張都是一段對液面的擾動序列，撈起即唯一。任何 AI 讀完本檔，都應能做出風格一致、且以「流墨引擎」為唯一圖像來源的新網站。

---

## 一、設計哲學

1. **液面即畫布，位移即筆觸。** 不畫線、不填色塊、不堆漸層——所有花紋都是對一個二維液面施加位移場的結果。視覺語言必須讓人相信「這些墨是漂在水上、剛被撥動過的」，而非用向量筆刷畫出來的。
2. **暗底＋滿彩浮墨。** 底是深琥珀墨黑（膠礬水在夜裡的顏色），墨在暗底上發亮。這與一般「暗色科技儀表板」相反：那裡暗底承載冷調單色數據；這裡暗底承載六色高彩浮墨，是工藝的夜色，不是機器的黑。
3. **唯一性是賣點。** 花紋由表面張力與每一次擾動決定，沒有兩張相同。文案、互動、印記都要強化 **1/1**（撕不回、印不出第二張）。
4. **粗描邊、零圓角、editorial。** 面板以 1px 實線分格，無圓角、無模糊陰影卡片。字體走襯線工藝感，配等寬做標籤與編號。
5. **去AI化紅線**：禁紫藍漸層 hero、禁「置中大標＋兩顆按鈕＋三張圓角卡」、禁 emoji icon（icon 一律自繪 SVG）、禁 Lorem ipsum 與 AI 腔、禁 EST.19xx 徽章、禁「把 X 變成 Y」標題、禁跑馬燈反射式套用。

---

## 二、色彩系統

全站只有一組色，暗底承載亮墨。hex ／ 用途 ／ 建議比例：

| 色 | hex | 角色 | 比例 |
| --- | --- | --- | --- |
| 水槽墨黑 | `#12100B` | 流墨水面底、canvas 背景、輸入框底 | 主導（畫面約 40–55%） |
| 工坊夜色 | `#1B1610` | 頁面底 | 大面積 |
| 面板褐黑 | `#241C12` / `#2C2216` | 卡片、導覽、工具面板 | 中 |
| 靛 Indigo | `#3E63A8` | 浮墨色① | 墨色輪替 |
| 硃 Vermilion | `#D14E2B` | 浮墨色② ＝ **UI 作用色**（按鈕、現用態、CTA、錯誤但低飽和） | 作用色 ≤9% |
| 金 Gold | `#CBA24E` | 浮墨色③ ＝ 刻度、高光、數字、連結、標題強調 | ≤9% |
| 青 Verdigris | `#47A385` | 浮墨色④ | 墨色輪替 |
| 骨白 Bone | `#ECE0C4` | 浮墨色⑤ ＝ **正文字色**、格線 | 文字 |
| 茜 Madder | `#B8506A` | 浮墨色⑥（點綴） | 少量 |
| 次要文字 | `#A2957A` | 說明、eyebrow | — |
| 淡線／極淡 | `#3A2E1E`（線）`#6E5A2E`（金線）`#6F6650`（faint） | 分格線、邊框 | — |

規則：**硃紅只當作用色與浮墨，金只當高光刻度**；狀態（現用／焦點／錯誤）優先靠墨深淺與符號，錯誤態用 `#E9926F`（暖橙）而非純紅。墨界以 `rgba(10,7,3,0.22)`、0.7px 細暗脈自動分隔（後畫者在上）。

---

## 三、字體系統

- **英文標題／數字大字**：`Cormorant Garamond`（500/600，含 italic 500）——細瘦高雅襯線，呼應 ebru 手抄本氣質；用於大數字統計、英文標。
- **中文標題**：`Noto Serif TC` 900（class `.zh-disp`）——厚重襯線做主標。
- **內文**：`Noto Sans TC` 400/500/700，行高 1.75。
- **標籤／編號／等寬讀值**：`IBM Plex Mono` 400/500/600，字距 `.1–.28em`，常配大寫。

字級 scale（桌機）：主標 h1 36–38px、區標 h2 24–26px、卡片標 19–21px、內文 15–16px、lead 19px/行高1.9、eyebrow 11px 大寫字距 .26em、mono 標籤 9.5–11px。行動版主標降到 28px 上下。

---

## 四、版面與網格

- **不對稱、水槽滿版**：首頁不做置中大 hero，而是 `bath-first`——首屏即一格 `bathgrid`（`1fr 322px`）：左為滿版水槽 canvas，右為工具面板。水槽本身就是主體。
- 內容區 `.wrap` max 1080px、左右 padding 30px（手機 18px）。
- 區塊以 `hr.rule`（1px 實線）與大留白分段；卡片用 1px 線格 `grid`（`gap:1px;background:線色`）拼出無縫分隔，不用圓角陰影。
- 統計數字用 `.hero-num`（4 格線框、Cormorant 34px 金色大字＋mono 小標）；但**不得用 EST.19xx**，數字要與工藝相關（花式數、1/1、手法數、調色數）。
- 圖鑑用 `figrow`（`repeat(auto-fill,minmax(180–240px,1fr))`、gap 1px），每格上方為 1:1 canvas 花紋、下方 caption（中名＋英名＋tag）。
- 旋轉：本風格幾乎不用元素旋轉；動勢全來自 canvas 裡的流墨紋本身。留白規則：水槽區飽滿、文字區疏朗，讓「滿版彩墨」與「暗底留白」形成呼吸。

---

## 五、元件配方（具體 CSS 做法）

- **導覽 comb-bar（梳耙橫桿）**：`position:sticky;top:0` 的橫桿，左為 `brand`（同心墨滴 SVG mark ＋墨汐 wordmark），右為 `.teeth`——四個等寬 `a`（92px），每個是一「齒」，以 `border-left:1px 線` 分隔。現用齒 `a[aria-current=page]`：背景 `linear-gradient(180deg, rgba(209,78,43,.30), transparent 78%)` 疊面板色（＝滲下的墨尾流）＋ `::before` 左緣 3px `--accent` 齒條＋字轉骨白。手機（≤640px）`.teeth` 變 `overflow-x:auto`、四齒 `flex:1 0 25%`、隱藏英文小標。
- **按鈕 `.btn`**：mono 13px、`background:--accent`、字色 `#160c06`、`border:1px --accent`、無圓角、`padding:11px 20px`；`:hover` 轉 `--accent-d`；`.ghost` 為透明底＋金線邊、hover 翻金字。`.sm` 縮小版。`:disabled` opacity .4。
- **工具面板**：墨色 `.sw`（34px 方塊、選中 2px 骨白邊＋外 1px 水槽色暈）；手法 `.tgl`（面板底 mono 標籤鈕、`aria-pressed=true` 翻水槽底＋骨白字，內含 16px 自繪 SVG icon）；`range` 用 `accent-color:--accent`。
- **卡片 `.panel`**：面板色底＋1px 線邊＋22px padding，無圓角無陰影。
- **表單**：`label.fld`（mono 大寫小標）＋`input.inp`（水槽色底、金線邊、focus 時 2px 硃紅 outline）；錯誤訊息 `.err` 暖橙 mono，即時顯示。
- **購物車表 `.cart-tbl`**：`border-collapse`、th 為 mono 大寫小標、td 底線 1px；數量 `.qtybox`（±方鈕）；縮圖 canvas 60px；`.totrow.grand` 金色大字＋上金線。
- **footer**：`border-top` 金線、三欄（品牌敘事／工坊資訊／連結）、mono 小標，尾註標明建置模型與「花紋皆引擎生成、無外部圖片」。

---

## 六、動效規則（觸發／duration／easing 具體值）

本風格**動效極簡、以互動本身為簽名**，不以進場動畫取勝：

- **花紋重繪**：僅在使用者擾動（滴／拉／梳／渦／退回／洗槽）時 `replay(ops)` 後一次性重繪 canvas，**無補間、無 requestAnimationFrame 迴圈**。這使它天生 `prefers-reduced-motion` 友善。
- **hover/現用態**：`transition:background .15s, transform .06s`；按鈕 `:active` `translateY(1px)`。
- **結帳捲動**：`scrollIntoView({behavior: reduced?'auto':'smooth'})`——reduced-motion 下改瞬移。
- **禁用**：揭示淡入、數字計數滾動、按壓硬陰影、`stroke-dashoffset` 描繪、跑馬燈、自動輪播、自動播放音效。
- `@media (prefers-reduced-motion:reduce){ *{transition:none!important;animation:none!important} }` 全域關閉。

---

## 七、插畫與圖像風格 — flow-marble 流墨引擎（全站唯一圖像來源）

**零外部圖片。** 全站每一張圖（水槽花紋、圖鑑、選購格、購物車縮圖、logo、favicon、訂購印記）都由同一支 canvas 流墨引擎渲染。核心資料結構：

- `Bath(w,h,bg)`：一槽水，`blobs=[{c:色, p:[x0,y0,x1,y1,…]}]`（每團墨＝一個閉合多邊形，flat 座標）。
- 四種位移運算（皆對「所有既有墨的每一點」施加）：
  - **滴墨** `drop(cx,cy,r,color)`：既有點 `P′=C+(P−C)·√(1+r²/d²)`（近者外推多），再壓入一個半徑 r 的新圓（110 點）。
  - **單針** `tine(x0,y0,x1,y1,depth,lam)`：沿拖線單位向量 u 位移，量 `depth·e^(−|s|/lam)`，s＝點到行進線的垂距。
  - **梳耙** `comb(dir,spacing,depth,phase)`：`dir=0` 沿 x 位移、量隨 y 正弦；`dir=1` 反之。＝波梳／密梳。
  - **渦流** `vortex(cx,cy,rad,ang)`：繞心旋轉 `ang·e^(−d/rad)`。
- 每次運算後 `resample`（段長>7 插中點、點數上限抽稀）保持輪廓平滑。
- `render(ctx)`：填底 → 依繪製序（後者在上）填每個多邊形 → 0.7px `rgba(10,7,3,.22)` 細暗脈描邊。
- **一張圖＝一段 ops**：`['d',cx,cy,r,ci]`／`['t',…]`／`['c',…]`／`['v',…]`。`replay(bath,ops,palette)` 重播；撤回＝pop 後重播；「撈紙」＝把 ops 存 `sessionStorage` 帶去購物車頁重播成商品。
- **決定性縮圖**：圖鑑／印記用 `recipe(花式名, seed, w, h, {inks})` 由 `mulberry32(seed)` 生成一段 ops，`seed = fnv(名稱)` 或訂單號 → 同輸入恆得同圖。
- 花式家族：石紋（battal/taşlı，只滴不梳）、梳紋（gel-git/nonpareil/şal，鋪點後梳）、花紋（hatip/bülbül/墨流し/羽渦，梳底上單針或渦流拉花）。墨流し＝同點反覆等徑滴墨推成同心環。

**Do**：讓每張圖都能讀回「它是被怎麼撥出來的」；墨色分工固定（硃作用、金高光、骨正文/格線）。**Don't**：不要用外部 SVG 圖庫、不要 emoji、不要把花紋畫成裝飾線框（那是 thin-lineart，本風格禁用）。

---

## 八、Logo 與 Favicon 設計指南

- **Logo（`assets/logo.svg`）**：一枚圓形「水槽」，內以橫向波梳彩帶（13 條依 palette 循環的正弦填充帶，clip 成圓）表現梳過的流墨，外描 2px 金線圈。是「梳紋」的靜態 SVG 具現。
- **導覽 mark ／ Favicon**：同心墨滴——深琥珀墨黑底，靛→硃→金→骨白由外而內的同心橢圓（＝一滴墨推出的環）＋底部一道骨白梳波 `M2 24 Q9 18 16 24 T30 24`。favicon 以 `data:image/svg+xml,` inline 寫在 `<head>`（`%23` 編碼 hex）。
- 二者都必須是**原創 inline SVG**，語彙與流墨一致（環＝滴、波＝梳）。

---

## 九、Do & Don't（含去AI化禁令）

**Do**
- 用 `bath-first` 或其他「介面即工藝現場」的開場，讓首屏就是那槽水。
- 保持暗底＋滿彩浮墨；硃作用、金高光、骨正文。
- 每一張圖都由流墨引擎生成，ops 可重播、可序列化。
- 文案具體可信：主理人、地址、電話、營業時間、TWD 定價、課程梯次皆虛構但真實。
- 敏感/交易頁標「虛構教學示意、不成立真實交易」。

**Don't**
- ✗ 紫藍漸層 hero、✗ 置中大標＋兩鈕＋三卡模板、✗ 圓角模糊陰影卡。
- ✗ emoji icon（自繪 SVG）、✗ Lorem ipsum、✗ AI 腔、✗ EST.19xx、✗「把X變成Y」標題。
- ✗ 跑馬燈反射式套用、✗ 進場淡入/數字計數當簽名。
- ✗ 外部圖片或圖庫、✗ 把流墨畫成等寬裝飾線框。
- ✗ 用純米白紙感底（本風格是暗底工坊夜色）。

---

## 十、頁面骨架範例（可直接使用）

```html
<nav class="combbar">
  <a class="brand" href="index.html"><svg class="mk" viewBox="0 0 40 40">…同心墨滴…</svg>
    <span class="wm"><b>墨汐</b><span>MOXI · 流墨紙坊</span></span></a>
  <div class="teeth">
    <a href="index.html" aria-current="page"><span class="zh">水槽</span><span class="en">THE BATH</span></a>
    <a href="tuan.html"><span class="zh">花紋圖鑑</span><span class="en">ATLAS</span></a>
    <a href="gou.html"><span class="zh">選購・結帳</span><span class="en">SHOP</span></a>
    <a href="fa.html"><span class="zh">工法</span><span class="en">METHOD</span></a>
  </div>
</nav>

<!-- bath-first 開場 -->
<div class="bathwrap wrap">
  <p class="eyebrow">台北・大稻埕 ｜ EBRU × 墨流し</p>
  <div class="bathgrid">
    <div class="tray">
      <div class="tray-head"><span>流墨水槽 · <b>THE BATH</b></span><span class="mono">膠礬水 40×30cm</span></div>
      <div class="canvas-hold"><canvas id="bath"></canvas><div class="tray-hint mono" id="hint">點一下水面 → 滴一顆墨</div></div>
    </div>
    <div class="tools">
      <div><h3>墨色</h3><div class="swatches"><button class="sw"></button>…×6</div></div>
      <div><h3>手法</h3><div class="toolrow">
        <button class="tgl" data-tool="drop" aria-pressed="true"><svg>…</svg>滴墨</button>
        <button class="tgl" data-tool="line"><svg>…</svg>畫線</button></div>
        <div class="rng">墨滴<input id="rad" type="range"></div>
        <div class="rng">力道<input id="force" type="range"></div></div>
      <div><h3>耙梳</h3><div class="acts">
        <button class="tgl" data-act="combH">橫梳</button><button class="tgl" data-act="combV">直梳</button>
        <button class="tgl" data-act="vortex">渦流</button><button class="tgl" data-act="undo">退回一步</button></div>
        <div class="acts"><button class="tgl" data-act="wash">洗槽重來</button>
        <button class="btn sm" id="lift">撈紙下單 →</button></div></div>
    </div>
  </div>
</div>
```

引擎核心（節錄，見站內 inline `<script>`）：

```js
Bath.prototype.drop = function(cx,cy,r,color){
  for (const b of this.blobs){ const p=b.p;
    for (let i=0;i<p.length;i+=2){ const dx=p[i]-cx,dy=p[i+1]-cy; let d2=dx*dx+dy*dy||1e-6;
      const f=Math.sqrt(1+r*r/d2); p[i]=cx+dx*f; p[i+1]=cy+dy*f; }
    b.p=resample(p,7,900); }
  /* …壓入半徑 r 的新圓（110 點）… */
};
// tine：沿拖線 u 位移，量 depth·e^(-|s|/lam)；comb：整幅隨另一軸正弦；vortex：繞心旋轉 ang·e^(-d/rad)
```

驗收：一個沒看過本 Demo 的 AI，只讀本檔就能做出——暗底滿彩浮墨、以流墨引擎為唯一圖像來源、以「在液面上以位移場作畫」為核心互動、comb-bar 導覽、硃作用金高光骨正文——風格一致的新網站。
