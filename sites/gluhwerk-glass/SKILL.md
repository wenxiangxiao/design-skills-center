---
name: bauhaus-glasswork
description: A Bauhaus glass-workshop system — primary triads on a warm ember ground, thick black rules, circle/square/triangle geometry, and a live canvas physics of molten glass as the signature interaction.
---

# 包浩斯玻璃工坊 · Bauhaus Glasswork

> 一套把「包浩斯三原色幾何」與「熔融玻璃的物理」焊在一起的視覺＋互動語言。皮膚是圓／方／三角的粗黑分格，靈魂是一座用 canvas 即時模擬的爐前吹製台。讀完本檔，你不需要看 Demo 也能做出風格一致、且帶有可玩物理核心的新網站。

## 一、設計哲學

包浩斯相信「形隨機能」與最基本的幾何——圓、方、三角，紅、黃、藍。本風格不把它當懷舊裝飾，而是當**結構原則**：版面用粗黑實線硬分格（像鉛條分割彩繪玻璃），色塊各司其職，零圓角、零漸層陰影卡片。

與一般包浩斯站的差異在**溫度**：多數包浩斯落在米白紙感底，本風格刻意走**暖橘爐火主導**的高飽和撞色（vivid-bold），因為主題是玻璃工坊——爐膛是熱的，玻璃是發光的。冷靜的幾何 × 灼熱的色場，正是張力所在。

核心信念一句話：**幾何負責秩序，火負責意外。** 版面要極度理性，互動要真的有物理。

## 二、色彩系統

| 色票 | Hex | 用途 | 大約比例 |
|---|---|---|---|
| 爐火橘 Ember | `#E8480E` | 頁面主底／色場／重點 | 34% |
| 墨黑 Ink | `#141414` | 分格線（5px）、字、頁首頁尾底 | 22% |
| 玻璃奶白 Cream | `#F4EFE3` | 文字面板、閱讀區底 | 22% |
| 鈷藍 Cobalt | `#0E4C92` | 次色場、hover、幾何三角 | 10% |
| 琥珀黃 Amber | `#F2B705` | 強調、標籤、爐溫讀數、hover 反色 | 8% |
| 窯綠 Kiln Green | `#1F6F52` | 來訪／地圖區大色場 | 4% |

規則：橘是「環境色」（gutter、外框、大色場），文字一律落在奶白或黑底上確保對比；三原色（紅黃藍）＋黑白是圖形語彙，綠只在單一區塊當變奏。**嚴禁紫藍漸層**，也不要把橘拿去做柔和漸層——橘是實色平塗。玻璃體本身是唯一允許漸層之處（見第六章熱輝）。

## 三、字體系統

- **拉丁**：`Archivo`（500/700/900）。幾何無襯線，包浩斯正統。標籤、編號、英文標語用 700–900＋大字距（`.14em–.42em`）、常全大寫。
- **中文**：`Noto Sans TC`（500/700/900）。標題一律 900，`line-height:1.02–1.06`、`letter-spacing:-.01em`，堆疊成方正的字塊。
- 來源：Google Fonts（唯一允許的外部資源）。
- 字級 scale：H1 `clamp(30px,4.6vw,60px)`／H2 `clamp(24px,3.4vw,36px)`／H3 18–22px／內文 14.5–17px／標籤 10–12px。
- **禁止襯線體**。包浩斯是無襯線的。

## 四、版面與網格

- **粗黑分格**：全站以 `5px solid #141414` 硬線分割區塊，格與格之間無間隙、無圓角、無陰影。像窯燒彩玻的鉛條。
- **不對稱**：主內容用 `1.15fr 1fr`、`1.2fr 1fr` 這類非對稱雙欄；`grid-template-columns:repeat(3/4,1fr)` 的表格牆用「上＋左描邊、子項右＋下描邊」拼出連續格線。
- **旋轉/角度**：三角形是主要斜元素（logo、icon、色場切角），本身即提供 45°–60° 對角張力，版面本體維持正交，不做整體旋轉。
- **留白**：奶白閱讀面板 padding 20–42px；色場區塊可較滿。密度中等——資訊清楚但不塞爆。
- **masthead 開場**：頁首是墨黑幾何刊頭（logo＋導覽），首頁緊接「workbench-first」——不放大標 hero，而是把可操作的爐前台直接當第一屏的主角。

## 五、元件配方

**nav（masthead）**：墨黑底、底部 5px 黑線。左為三形 logo＋雙行字（中文 900 ＋ Archivo 小字距標語）。右為導覽連結，每個連結是 `border:3px solid cream` 的方塊，hover 翻成琥珀底黑字，`aria-current` 翻成奶白底。

**按鈕**：`.btn` 4px 黑框、墨黑底奶白字、900、字距 .03em、零圓角；hover 翻琥珀底黑字。`.ghost` 透明底黑字、hover 翻鈷藍。主要 CTA 可用爐火橘底。

**卡片／格**：不是浮動卡片，而是「格線裡的一格」。奶白底、5px 黑線分隔、內部圖在上（`aspect-ratio` 固定）＋底線＋文字區。**禁止 rounded-2xl＋模糊陰影**。

**表單**：input 3px 黑框、無圓角、白底；focus 時 `outline:3px solid amber; outline-offset:-3px`。label 用 Archivo 700 大寫小字距。錯誤態：框變 `#c02607`＋紅字提示。送出鈕爐火橘底、4px 黑框、hover 翻琥珀。

**footer**：墨黑底奶白字，`2fr 1fr 1fr` 三欄；標題 Archivo 琥珀色大寫小字距；底部 legal 列用 3px 深灰線分隔、Archivo 11.5px、透明度 .7，含「虛構示意」聲明。

## 六、動效規則

克制。包浩斯不炫技，動效集中在**玻璃物理**這一處，其餘近乎靜態。

- **熱輝漸層（唯一漸層）**：玻璃體填色是 5 段線性漸層，兩端暗、中央高光；顏色隨爐溫 `temp`(0–1) 在「料色 ↔ 橘白(255,190,110)/(255,240,205)」間線性內插。`temp>0.2` 時加 `shadowBlur:34*temp` 的橘色外發光。
- **物理步進**：`requestAnimationFrame`，`dt=min(40,Δt)/16.7`；力的係數見第七章。
- **FAQ 展開**：`max-height` 0↔320px、`transition:.3s ease`；`+`/`–` 符號切換、換色。
- **hover**：一律「翻色」而非位移／陰影（琥珀或鈷藍反底）。
- **禁用**：通用淡入位移當主 signature、數字計數滾動、按壓硬陰影、stroke-dashoffset 描繪、跑馬燈（本風格不需要捲動橫幅；藍色資訊帶是靜態的）。
- **`prefers-reduced-motion`**：停用 RAF 連續模擬與 scroll-behavior；玻璃台改為「載入預設剖面→靜態繪製」，每次操作（吹氣/回爐/換色/取型）只重繪一格，不做連續動畫。

## 七、canvas 物理吹製台實作配方（本風格首創核心）

把玻璃當**旋轉對稱剖面軟體**：沿垂直軸取 `N=48` 段，`r[i]` = 各高度半徑。渲染時左右鏡射 `cx±r[i]` 連成封閉路徑填熱輝漸層——因為真實吹製本就是旋轉對稱，這個模型省力又像真的。

**狀態**：`r[N]`（半徑）、`temp`(1熱→0冷)、`segH`（段高，會被重力拉長）、`color`、`oxide`。

**每幀五種力（順序很重要）**：
1. **吹氣內壓**（按住吹氣鈕/空白鍵）：`r[i]+=1.9*soft*wBlow(i)*dt`，其中 `soft=temp^1.3`（熱才軟）、`wBlow(i)` 是「口部不脹、腹部最脹」的鐘形權重 `sin(min(1,t*1.25)π)^1.3`；同時 `temp-=0.004*dt`（吹會降溫）。
2. **重力**：下半段微脹 `r[i]+=0.10*soft*(i/N)*dt`，整體 `segH+=0.006*soft*dt`（拉長，設上限）。
3. **拖曳塑形**：把游標所在高度的 `r` 推向 `|pointerX-cx|`，以 ±4 段的三角權重擴散：`r[i]+=(tgt-r[i])*0.22*w*(0.35+0.65*soft)`。這讓使用者能推腹、收頸、開口。
4. **表面張力**：Laplacian 平滑 `nr[i]=r[i]+(r[i-1]+r[i+1]-2r[i])*(0.10+0.16*soft)`，熱時更平滑（避免鋸齒）。
5. **邊界＋冷卻**：`r` clamp 於 `[6,120]`，口部(`i=0`)放寬至 `[4,118]`（容納寬口缽/杯），底(`i=N-1`)收攏至不超過上一段的 `0.72` 倍（圓底不失控收針）；`temp-=0.0012*dt*(1+avgR/120)`（越大散熱越快）。回爐＝`temp=min(1,temp+0.5)`。

**由剖面反推語意（配置器的關鍵）**：
- `ratio=heightPx/(2*maxR)`、`rim=(r0+r1+r2)/3`、`neck=上半最小半徑`、`vol=Σπr²·segH`。
- 器型（高度固定，改用**輪廓形狀**而非高寬比判別，並排除底部收攏段算 `bodyMin`）：`rim<maxR*0.6` → 窄口（`bellyF>0.38`→細頸瓶，否則花瓶）；否則 `spread=(maxR-bodyMin)/maxR<0.34` → 直身杯；否則 `rim>=maxR*0.78 && bellyF<0.42` → 寬口缽；其餘 → 圓身器。（`bellyF`=最寬段位置/N）
- 尺寸：定 `scale=26/(segH*N)` 讓滿高≈26cm，`hcm=heightPx*scale`、`wcm=2maxR*scale`、`ml≈vol*scale³*0.5`（cm³=ml，0.5 為中空係數）。
- 價格：`base(2600) + 容量級距(round(ml/70)*120) + 料色 + 氧化 + 收頸工序 + 寬口成型`，四捨五入到百位；即時顯示分項。

**訂單**：表單驗證（姓名≥2、手機 `^09\d{8}$`、Email 選填格式），並要求 `heightPx>40`（確認真的吹過一件）才放行；生成 `GLW-YYMMDD-NNN`（NNN 以 sessionStorage 遞增），依訂號雜湊畫原創直條碼。

**備援**：無 canvas → 顯示提示並停用；`prefers-reduced-motion` → 載入 4 種預設剖面（花瓶/缽/杯/瓶，直接寫死 `r[]` 陣列）＋靜態繪製，配置器仍完整可用。

## 八、插畫與圖像風格

- **幾何構成**：所有 icon／裝飾都是圓＋方＋三角的實色平塗組合（如「重力」＝圓內一條垂線、「體積」＝三角內一圓）。線寬 3.2–5px 黑。**禁止細線幾何線描（thin-lineart）**。
- **riso-overprint 半透明疊色**：作品預覽的玻璃器用同一剖面 path 疊三層——`fill-opacity:.72` 主色、平移偏位的 `.34` 副色、再描 2.4px 黑邊——模擬透明玻璃疊色與套印錯位，呼應「玻璃是透光的」。
- **原創、零外部圖片**：所有圖形 inline SVG／canvas 生成。地圖也是 SVG 幾何示意，不用地圖圖磚。

## 九、Logo 與 Favicon

- **Logo**：橘圓（中挖奶白孔＝吹管中空）＋黃三角＋藍方，三形交疊，右接「熾房」900＋「GLÜHWERK」大字距。三形即品牌，可單獨當標記。
- **Favicon**：墨黑底上縮小版三形，寫成 inline SVG data URI（`data:image/svg+xml;utf8,...`，內部用單引號、`%23` 表示 `#`）置於 `<head>`。

## 十、Do & Don't

**Do**：粗黑硬分格；圓方三角三原色；暖橘爐火主底；標題方正 900；hover 翻色；把「可玩物理」當第一屏主角；文案具體（人名、地址、電話、營業時間、價格、退火時程）。

**Don't**：紫藍漸層 hero；置中大標＋副標＋兩鈕＋三卡模板；emoji 當 icon；rounded-2xl＋模糊陰影卡片；細線線描；米白紙感當主底（那是別的包浩斯站）；跑馬燈反射式套用；Lorem／AI 腔；「EST. 19xx」年份徽章；「把 X 變成 Y」句式標題。

## 十一、頁面骨架範例

```html
<header><div class="mast">
  <a class="brand"><svg class="mark">…圓方三角…</svg><b>熾房</b><span>GLÜHWERK</span></a>
  <nav class="links"><a aria-current="page">爐前</a><a>訂製</a><a>工坊</a></nav>
</div></header>

<!-- workbench-first：首屏即爐前台，不放大標 hero -->
<div class="bench">                      <!-- grid:1.15fr 1fr，5px 黑線分隔 -->
  <div class="bench-copy">…kicker＋900 標題＋lead＋CTA…</div>
  <div class="stage">
    <canvas id="glass"></canvas>          <!-- 熔融玻璃物理台 -->
    <div class="readout">爐溫/器高/口徑</div>
    <div class="swatches">…料色…</div>
    <div class="tools"><button class="blow">吹氣</button><button>回爐</button><button>重取料</button></div>
  </div>
</div>

<section><div class="sec-head"><span class="num">01</span><h2>…</h2></div>
  <div class="grid-wall">…上左描邊＋子項右下描邊的連續格線…</div>
</section>

<footer>…墨黑底三欄＋琥珀標題＋legal「虛構示意」…</footer>
```

驗收：一個沒看過 Demo 的 AI，只讀本檔，應能做出「暖橘爐火底＋圓方三角粗黑分格＋一座可玩 canvas 物理台」的同風格新站，並把該物理台接成一個能判別器型、換算尺寸、試算價格、生成訂單的完整功能。
