---
name: windward-kite-chart
description: A dusty wind-blue sky field with paper-warm panels and vermilion / indigo / gamboge kite pigments — an airy, editorial "kite atelier" language where every image is a spar-and-sail kite drawn by one geometry engine.
---

# 風信紙鳶風 Windward Kite-Chart

## 設計哲學

這套語言長在一件事上：**天是大的，紙鳶是小的，線在你手上。** 它拒絕把畫面塞滿——留白就是那片風城的天空，內容像紙鳶一樣掛在其中。三個信念：

1. **一支引擎糊出全部的圖。** 站上沒有任何一張照片或外部圖檔。每一具紙鳶——放飛台上飛的那具、圖鑑二十四式、報名手印、logo、favicon——都是同一支「骨架帆面引擎」依 `{鳶型, 帆面, 提線點, 尾巴}` 幾何求解出來的。換一組參數就換一張圖，同參數恆得同圖。
2. **冷天配暖紙。** 底色是帶灰的風藍（風城入秋的陰空），面板是暖紙白（棉紙裱竹的鳶面），作用色只用三種傳統顏料——朱紅、靛藍、藤黃——在紙上跳出來。冷底、暖紙、三顏料，是這套皮膚的全部。
3. **物理即內容。** 提線點往後＝吃風斜、爬更高但易翻頂；尾巴愈長愈穩卻拖低線角。這些不是文案，是放飛台上真的會發生的因果。皮膚服務的是這套可玩的空氣動力。

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 風藍 sky | `#88A0AD` | 全站大面積地色（body 底） | ~44% |
| 深風藍 sky2 | `#5C7885` | 刊頭／footer／導覽底、深件 | ~10% |
| 暗風藍 skydk | `#42606D` | 刊頭漸層上緣、footer 底 | ~4% |
| 暖紙白 paper | `#F0E9DA` | 面板／卡片／鳶面亮部（承載內文） | ~24% |
| 深紙 paper2 | `#E3D9C4` | 次級面板、chip、表底 | ~6% |
| 墨 ink | `#182226` | 字、2–3px 描邊、骨架外輪 | ~9% |
| 朱紅 vermil | `#E14B2A` | 作用色：現用態／主按鈕／警示／鳶紅帆 | ~7% |
| 靛藍 indigo | `#274A6B` | 連結、次要鳶帆、尾巴線 | ~4% |
| 藤黃 gamboge | `#E7A92E` | 高亮、hover、鳶黃帆、尾結 | ~4% |
| 青碧 jade | `#3E8E7E` | 僅「定高認證✓／穩定」成功回饋 | <2% |

**鐵律**：底恆冷風藍；內文一定落在暖紙面板上（風藍上放長段文字對比不足）；朱靛黃三顏料是紙鳶的顏色，不可拿去當大面積底。青碧只給成功態，不他用。

## 字體系統（Google Fonts）

- **標題**：Noto Serif TC 900／700。字重壓在 900，字距 `.05em`，端正如招牌。
- **內文**：Noto Sans TC 400／500／700，行高 1.7–1.75。
- **讀數／編號／標籤**：Space Mono 400／700——線角、風速、留位號、`m/s`、`°` 全用等寬，強調它們是「量出來的值」。
- **眉標／圖說**：Fraunces italic（`opsz` 可變、斜體），只做小級數的英文眉標與 figcaption，帶一點手寫招貼的暖。

字級 scale：hero 標題 `clamp(23px,3.6vw,38px)`；區塊標題 20–24px；內文 15.5–16.5px；讀數 15–19px；標籤 10.5–13px。

## 版面與網格

- **極疏（density=極疏）**：內容欄 `max-width` 820–1080px 置中，四周留白即天空。放飛台是唯一的大塊面。
- **左側連凧導覽佔一條 70px 邊欄**（桌機 `body{padding-left:70px}`），內容不與它相撞。
- **不對稱**：刊頭左品牌、右地址 meta；配置器左預覽（150px 固定）、右控制（1fr）。
- **硬邊、無圓角修飾**：面板一律 3px 墨實線 + `6px 6px 0` 的硬投影（無模糊），像貼在牆上的紙。卡片 `border-radius` 僅 2–3px。
- **旋轉**：紙鳶預覽與卡片內的鳶固定 `rotate(-6°)`，給一點被風掀起的斜；導覽現用鳶 `translateY(-6px) rotate(-8deg)`（升上風裡）。

## 元件配方

- **導覽 kite-train rail（連凧列）**：桌機左緣一條 2px 虛線繩（`repeating-linear-gradient`），四頁是繩上四具小紙鳶 SVG，`justify-content:space-evenly`。現用頁那具 `translateY(-6px) rotate(-8deg)`、帆翻朱紅、頂翻藤黃、標籤常駐；其餘懸停才升起翻牌。**行動版**（≤900px）整條落為頂部 sticky 橫列，四鳶一排、標籤常駐。頁尾另備完整文字連結保底。
- **按鈕**：暖紙底 + 2px 墨邊 + 無圓角；hover 翻藤黃、active `translateY(1px)`。主行動（放飛／送出）`.go` 翻朱紅、白字。
- **卡片**：暖紙底 3px 墨邊 + 硬投影；上半是漸層「天」底（`#9fb4c0→#c9d3cd`）托一具紙鳶；下半標題（Serif）＋英文（Fraunces italic）＋mono 標籤 chip＋一行說明＋底部虛線分隔的 mono 規格。
- **滑桿**：軌 6px 深紙 + 1px 墨邊；把手 20px 圓、朱紅 + 2px 墨邊；focus 翻靛藍 + 光暈。
- **讀數格 / spec 格**：暖紙底 2px 墨邊；`k`（Fraunces italic 小標）＋`n`（Space Mono 大數，超標翻朱紅 `.hot`）＋`u`（單位小字）。
- **表單**：白底輸入框 2px 墨邊，focus 靛藍邊 + 3px 靛藍光暈；`.err` 朱紅粗體、預留 `min-height:1em` 不跳版。三步進度以 `.st`（mono）標示，`on` 朱紅、`done` 青碧。
- **footer**：深風藍底、暖紙字、3px 墨頂線；坊名 Serif 900 + mono 風格代號 + 虛構聲明 + 三頁連結。

## 動效規則

克制。**唯一的主動效是放飛台上那具紙鳶的飛行物理**（迎角、線角、陣風、失速、打轉），完全由使用者的放線／收線／曳線與風速輸入驅動。

- 紙鳶飛行：`requestAnimationFrame` 積分 θ（線角）的彈簧-阻尼（STIFF≈6、DAMP≈3.4）逼近力平衡角，疊加自激擺動 `wobA`（尾巴與穩定度作阻尼）；`dt` 上限 0.05s。
- 尾巴飄動：每 1/8 秒重糊一次（正弦相位）。風痕橫掠 `x += wind*0.35`，出界回捲。
- hover／focus：`transform .18–.2s ease`、`opacity .18s`。
- **避開四項過載語彙**：不以「揭示淡入／數字計數／按壓硬陰影／stroke-dashoffset 描繪」當簽名（讀數是功能性數值、非裝飾計數）。無跑馬燈、無自動輪播、無自動播放。
- `prefers-reduced-motion`：停止 RAF 迴圈，直接把紙鳶擺在「預估定飛線角」的靜態平衡位；圖鑑與報名手印本就是靜態 SVG。

## 插畫與圖像風格：kite-frame 骨架帆面

**全站沒有一張外部圖片、沒有一張描外形或色塊拼貼的自由插圖。** 所有圖像都是同一支 `kiteGeom(type, {area,bridle,tail})` 生成的紙鳶：

- **骨架 spars**：竹骨為墨色細線（`opacity .6`），縱骨＋橫骨（或八角的四對角骨、軟翼的雙豎骨）。
- **帆面 panels**：由骨架切出的多邊形色塊，填朱／靛／藤黃／紙四色循環，一律 2.2px 墨描邊、`stroke-linejoin:round`。
- **提線點 bridle**：沿縱骨依 `bridle 0..1` 內插的一點，牽兩條細線收一個墨結。
- **尾巴 tail**：由尾端垂下的正弦連筆（靛藍），每隔一節綴一枚藤黃交叉結，節數＝`tail`。
- 五種鳶型（菱形 diamond／六角 rokkaku／三角 delta／八卦 octagon／軟翼 sled）以幾何原語程序組成；同一支引擎再產出 logo、favicon 與報名手印（由資料 FNV-1a→mulberry32 決定型與參數，同資料恆得同鳶）。

**與別的技法的差別**：這不是等寬裝飾線框（thin-lineart），每條線是有結構語意的骨或帆；也不是自由生成美術，每一具鳶都能讀回它的型、提線點與尾巴。

## Logo 與 Favicon 設計指南

- **Logo**（`assets/logo.svg`）：深風藍方章上，一具朱紅/藤黃兩帆的菱形鳶（十字骨），一條墨線牽向左下角的手，一條靛藍尾。左上幾道風痕。方形、2px 墨邊、圓角 5px。
- **Favicon**：同一具菱形鳶的極簡版，寫成 `<head>` 內 inline SVG data URI（深風藍底＋朱/黃兩帆＋一條牽線），無外部檔。
- 兩者都是 kite-frame 引擎的產物，與站上所有鳶同源。

## Do & Don't

**Do**
- 讓天空大、紙鳶小，用留白承載「風」。
- 內文放暖紙面板；朱靛黃只當顏料點綴與作用色。
- 每一張圖都由 kite-frame 引擎生成，可讀回幾何。
- 動效只服務可玩的飛行物理；提供 reduced-motion 靜態平衡位與 `<noscript>` 保底（原理頁不需 JS 即完整可讀）。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- 不用 emoji 當 icon（導覽／logo／插圖一律自繪 SVG）。
- 不用千篇一律 rounded-2xl + 模糊陰影（本風用硬邊 + `6px 6px 0` 無模糊硬投影）。
- 不把風藍壓成近黑暗底（那會退化成深色儀器台）；不把朱靛黃鋪成大面積底。
- 不用 Lorem ipsum、不用「EST. 19xx」徽章、不用「把 X 變成 Y」句式；文案要從紙鳶與九降風本身長出來。

## 頁面骨架範例（可直接使用）

```html
<body>
  <!-- 連凧列導覽：桌機左緣一條繩掛四具小紙鳶，現用者升上風裡翻朱紅 -->
  <nav class="trainnav"><div class="rope"></div>
    <ul><li><a aria-current="page">
      <svg viewBox="0 0 40 48"><polygon class="kbody ktop" points="20,4 33,20 20,25 7,20"/>
        <polygon class="kbody" points="20,25 33,20 20,44 7,20"/>
        <line class="kbar" x1="20" y1="4" x2="20" y2="44"/><line class="kbar" x1="7" y1="20" x2="33" y2="20"/>
        <path class="ktail" d="M20 44 q-4 5 1 9 q5 4 0 8"/></svg><span class="lbl">放飛台</span></a></li>…</ul>
  </nav>

  <header class="mast"><div class="wrap row">
    <div class="brand"><img src="assets/logo.svg" alt="徽記">
      <div><h1>坊名</h1><p class="sub">ROMANISATION · 一句話</p></div></div>
    <div class="meta">地址<br><b>場所</b><br>職人</div>
  </div></header>

  <main class="wrap">
    <p class="lead"><span class="eyebrow">一句斜體眉標。</span> 內文，<b>朱紅</b>強調關鍵詞。</p>
    <div class="field"><svg viewBox="0 0 660 380"><!-- 天空 + 紙鳶 --></svg>
      <div class="status" role="status" aria-live="polite">狀態訊息</div></div>
    <!-- 讀數格 gauges / 配置器 cfg（型／帆面／提線點／尾巴 + 即時規格） -->
  </main>

  <footer><div class="wrap"><div class="b">坊名</div>
    <div class="fx">地址・電話・虛構聲明・三頁連結</div></div></footer>
</body>
```

CSS 變數起手式：

```css
:root{--sky:#88A0AD;--sky2:#5C7885;--skydk:#42606D;--paper:#F0E9DA;--paper2:#E3D9C4;
  --ink:#182226;--vermil:#E14B2A;--indigo:#274A6B;--gamboge:#E7A92E;--jade:#3E8E7E;}
body{background:var(--sky);color:var(--ink);font-family:"Noto Sans TC",sans-serif}
.field{background:var(--paper);border:3px solid var(--ink);box-shadow:6px 6px 0 rgba(24,34,38,.14)}
```

*風格與內容分離：本 SKILL 定義「風信紙鳶」的視覺與互動語言，不綁定紙鳶產業——同一套皮膚可用於任何「天空／飛行／輕盈／傳統手藝」題材。若換題材，保留 kite-frame 引擎的「單一幾何引擎生成全部圖像」原則，把紙鳶換成該題材的程序化母題即可。*
