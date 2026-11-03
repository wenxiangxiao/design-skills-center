---
name: metro-light-panorama
description: Microsoft Metro / Windows Phone 7 light-theme web style — giant light-weight lowercase titles clipped by the right edge, one accent colour on pure white, flat zero-radius tiles on a 12px gutter grid, panorama and pivot navigation with content peeking off-screen, circled line-glyph app bar, and turnstile / tilt motion as part of the language.
---

# Metro 淺色主題・全景與樞軸（Windows Phone 7 Light Theme — Panorama & Pivot）

> 示範站：`sites/pue-hi`〈飛魚航空 flyingfish air〉台東⇄蘭嶼・綠島十九人座小飛機的現場候補。
> 本館第 2 個 Metro 站。第 1 站 `sites/beian` 是**深色主題**的開始畫面（純黑＋萊姆、動態磚波前翻面）；本站是**淺色主題**的全景／樞軸應用程式（純白＋藍綠、旋轉門轉場），兩站互補。

## 設計哲學

Metro 是 Microsoft 在 Windows Media Center 與 Zune（2006）裡長出來、2010 年隨 Windows Phone 7 正式命名的設計語言，2012 年因商標爭議改稱 Modern UI，2017 年由 Fluent 接替。設計團隊明說靈感來自**交通導向標誌的字體**與 Müller-Brockmann 的瑞士網格：「介面消失，內容本身就是介面」（content, not chrome）、「真正數位的」（authentically digital——不模仿皮革、玻璃與陰影）。

所以本風格的三條鐵律：

1. **字就是圖。** 沒有插畫、沒有照片也成立；巨大的細體字與留白就是畫面。
2. **平面、方正、一個強調色。** 立體感全部交給動作，不交給陰影。
3. **動作是語言的一部分。** 旋轉門（turnstile）、傾斜（tilt）、動態磚上翻、樞軸標題輪轉——拿掉動作，Metro 只剩一張瑞士海報。

## 本風格的 5 個不可省略特徵

### ① 巨型細體小寫標題，被畫面右緣切斷

全景標題字級是視窗高的 23%、字重 300、全小寫、負字距，**故意比畫面寬**；樞軸標題 38–56px 同樣細體小寫。WP7 指南：標頭比畫面寬時不換行，直接在右緣裁切。

```css
.pano-title{position:absolute;left:24px;top:0;margin-left:-.07em;
  font:300 clamp(92px,23vh,268px)/1.02 "Open Sans","Noto Sans TC",sans-serif;
  letter-spacing:-.04em;white-space:nowrap;text-transform:lowercase}
.pivot-h button{font:300 clamp(38px,9vw,56px)/1.15 "Open Sans",sans-serif;color:#8C8C8C;text-transform:lowercase}
.pivot-h [aria-selected=true]{color:#1F1F1F}
```

### ② 純白主題＋唯一一個強調色，零漸層零陰影零圓角

```css
:root{--bg:#FFFFFF;--fg:#1F1F1F;--sub:#767676;--chrome:#DDDDDD;--acc:#009C9A;--acc-t:#007E7C}
*{border-radius:0;box-shadow:none}
.tile{background:var(--acc);color:#fff}          /* 磚：強調色 */
.tile.light{background:var(--chrome);color:var(--fg)}  /* 次要磚：系統灰 */
.tile.ink{background:var(--fg)}                  /* 反白磚：前景色 */
```

唯一例外是圓：應用程式列的圖示圈與「⋯」的點。

### ③ 方磚網格：4 欄、12px 縫、三種尺寸

小磚 1×1、中磚 2×2、寬磚 4×2；縫寬 12px 是全站唯一的間距單位；標籤一律左下角 16px 半粗。

```css
.pane{container-type:inline-size}
.tiles{--u:calc((min(100cqi,560px) - 36px)/4);display:grid;grid-template-columns:repeat(4,1fr);
  grid-auto-rows:var(--u);grid-auto-flow:row dense;gap:12px;max-width:560px}
.tile.s{grid-column:span 1}.tile.m{grid-column:span 2;grid-row:span 2}.tile.w{grid-column:span 4;grid-row:span 2}
.tile .lab{position:absolute;left:12px;bottom:9px;font:600 16px/1 "Open Sans",sans-serif}
```

### ④ 內容溢出右緣：全景的下一欄永遠露出 48–64px

全景是一條橫向長卷：每欄比視窗窄 64px，所以下一欄的開頭永遠在右邊探頭，告訴你「往左滑還有」。標題以 0.42 倍、背景以 0.18 倍視差跟著走。

```css
.pano-sc{display:flex;overflow-x:auto;scroll-snap-type:x mandatory}
.pane{flex:none;width:min(calc(100vw - 64px),500px);scroll-snap-align:start;padding-left:24px}
```

### ⑤ 圓圈單線圖示只住在應用程式列

圖示不是主角；唯一允許放 icon 的地方是底部 72px 的應用程式列：48px 圓圈、2px 單線 glyph、右上「⋯」展開小寫標籤與選單。現用頁＝圓圈被填滿。

```html
<nav class="appbar"><div class="row">
 <a class="ic" href="index.html" aria-current="page"><span class="ring"><svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg></span><span class="lab">全景</span></a>
 <button class="more" aria-expanded="false" aria-label="更多"><i></i><i></i><i></i></button>
</div></nav>
```
```css
.appbar{position:fixed;left:0;right:0;bottom:0;background:#DDDDDD}
.appbar .ring{width:48px;height:48px;border:2px solid #1F1F1F;border-radius:50%;display:grid;place-items:center}
.appbar a[aria-current=page] .ring{background:#1F1F1F;color:#DDDDDD}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 主題底 | `#FFFFFF` | 全站底色。純白，不是紙白 | ~72% |
| 前景 | `#1F1F1F` | 全部文字、反白磚、現用圖示（WP 淺色主題 `#DE000000` 疊白） | ~14% |
| 強調色 | `#009C9A` | 磚、吐司通知、按鈕可按態 | ~9% |
| 強調小字 | `#007E7C` | 白底上的強調小字（4.9:1） | ≤1% |
| 系統灰 | `#DDDDDD` | 應用程式列、未選取的選項磚 | ~3% |
| 次要字 | `#767676`／`#8C8C8C` | 次要小字（4.5:1）／未選取樞軸標題（大字） | ~1% |
| 全景海／島 | `#E3F3F3`／`#CCE9E9` | 全景背景的平塗海與島（強調色預混，零透明） | 背景 |

強調色取 WP7 的 teal `#00ABA9` 調深一階：原色上的白字只有 2.84:1，`#009C9A` 讓磚上的大字達 3.38:1。換強調色時，用 WP 官方色表（magenta `#D80073`、cobalt `#0050EF`、emerald `#008A00`、crimson `#A20025`…），一站只用一個。

## 字體系統

- 拉丁：**Open Sans**（Google Fonts，300／400／600／700）。它和 Segoe 出自同一位設計師 Steve Matteson，是最接近 Segoe WP 的開源字。
- 中文：**Noto Sans TC**（300／400／500／700）。
- 字級：全景標題 `clamp(92px,23vh,268px)`／樞軸標題 38–56px／欄標題 40–56px／清單大字 24–32px／正文 16px／磚標籤 16px 600／應用程式標題 14px 600 大寫字距 .04em。
- 字重只用 300（大字）、400（正文）、600（標籤）。**大字永遠細**，粗只留給小字。
- 清單列：一行 300 大字＋一行 15px 次要字，零分隔線。

## 版面與網格

- 頁緣 24px（12px 系統邊＋12px 內容邊），手機 18px。全部左對齊，**零置中**。
- 零旋轉角度；唯一的傾斜是按下時的 tilt。
- 磚網格 4 欄、12px 縫、最大寬 560px；容器查詢決定磚單位與字級。
- 全景：橫向捲動＋scroll-snap，標題在頂、欄在下；樞軸：應用程式標題 → 樞軸標題列 → 內容。
- 留白規則：一欄裡最多一組磚＋一份清單；標題下方 10px 就開始內容。

## 元件配方

- **導覽**：底部應用程式列（見特徵⑤），全站一致；⋯ 展開選單是小寫 22px 細體字列。
- **按鈕**：沒有「按鈕」。可按的東西是磚（`button.tile`）或小寫半粗強調字（`.lnk`）。
- **卡片**：沒有卡片。資訊塊＝磚，或清單列。
- **表單**：單選＝一排磚（選中＝強調色、未選＝系統灰），數字＝「− 值 ＋」三格磚。
- **通知**：吐司——頂部滿版強調色條，自上滑入 300ms，4.2 秒後收回。
- **頁尾**：13px 次要字一行，寫虛構聲明與聯絡方式。

## 動效規則

| 種類 | 本站自製實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| 環境 ambient | 動態磚上翻：磚內兩面垂直排列，`translateY(-100%)` 翻出背面；每塊磚自己的週期 6.4–9.4 秒 | 時間 | 900ms `cubic-bezier(.1,.9,.2,1)` | 不動畫、直接換面，資訊不變 |
| 輸入 input | 傾斜 tilt：按下 60ms 內朝按點下壓 ≤9°＋縮 2.5%；全景視差（標題 .42、背景 .18） | pointerdown／捲動 | 按下 60ms linear、放開 220ms ease-out | 只縮 2%、視差關閉 |
| 轉場 transition | 樞軸：標題列循環輪轉（被選者移到最左，FLIP）＋內容由右 56px 滑入、子元素羽化 34ms；吐司滑入 | 點標題／左右滑／方向鍵 | 360–380ms `cubic-bezier(.1,.9,.2,1)` | 直接切換 |
| 簽名 signature | **旋轉門羽化 turnstile feather**：換頁時畫面上每一列以畫面左緣為門軸往外轉 82°、由上往下每列遲 30ms；新頁每列從 −78° 轉回、遲 42ms | 站內換頁 | 出 240ms `cubic-bezier(.7,0,1,.5)`／入 420ms ease-out | `@view-transition{navigation:none}`，直接換頁 |

標記方式：在要參與旋轉門的元素加 `data-ts`；JS 在 `pageswap` 把可見的前 14 列命名 `tso1…`、在 `pagereveal` 把新頁命名 `tsn1…`，全部掛 `view-transition-class: ts`。逐列延遲規則寫在**兩頁共用的 CSS**（因為舊快照的偽元素由新文件的樣式表決定）：

```css
@view-transition{navigation:auto}
::view-transition-old(root){animation:none;opacity:0}
::view-transition-old(*.ts){transform-origin:0 50%;animation:tsOut .24s cubic-bezier(.7,0,1,.5) both}
::view-transition-new(*.ts){transform-origin:0 50%;animation:tsIn .42s cubic-bezier(.1,.9,.2,1) both}
@keyframes tsOut{to{transform:perspective(1100px) rotateY(82deg);opacity:0}}
@keyframes tsIn{from{transform:perspective(1100px) rotateY(-78deg);opacity:0}}
::view-transition-old(tso2){animation-delay:30ms} ::view-transition-new(tsn2){animation-delay:242ms} /* …到 14 */
```

自我限制：本風格**禁用淡入當主打**、禁用彈跳、禁用陰影浮起。動作只有三種方向：往上翻、繞左軸轉、往左滑。

### motion-library 元件表（motion-library 1.30.0 @9301b9d8，`tools/ml-embed.js` 產生子集，每頁只嵌該頁用到的元件）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| BG-A-01 | Grid Fill | 全景〈今日〉中磚 | colors `#FFFFFF／#1F1F1F／#009C9A`、duration 6、density .62、seed 19、1:1 | 「每班 19 席」：方格依波前亮起又熄滅，像一架小飛機的座位一格格被補上；全部是 `fillRect` 直角方塊，零圓角零發光，符合特徵②③ | ambient |
| TXT-A-08 | Slide Text | 全景〈航班〉 | `#009C9A／#1F1F1F／#FFFFFF`、1.2s、loop:false、once、maxHeight 96 | 「今日 N 班」由左滑入＋強調色底線——Metro 的標題本來就是從左滑進來；白底→元件自動用近黑字 | transition |
| SHP-12 | Split & Merge | 候補（叫號中） | `#009C9A／#1F1F1F／#DDDDDD`、2.4s、seed 3、1:1 | 四個實心方塊分開又合上：櫃台忙碌中的等待訊號，四方塊就是動態磚的縮影 | ambient |
| TXT-A-26 | Flip | 候補（結果） | `#009C9A／#1F1F1F／#FFFFFF`、1.1s、once、maxHeight 120 | 「07 號登機」／「明早再來」逐字翻面，翻過去的那半是強調色——呼應動態磚翻面 | transition |
| BG-B-38 | Minimal Square | 票價〈過磅〉寬磚 | `#FFFFFF／#1F1F1F／#009C9A`、5s、intensity .8、seed 228、16:9 | 一塊實心方塊轉 90° 停住、再轉：磅秤上的那件行李；`fillRect`／`strokeRect`，零圓角 | ambient |

掛載：`FF.ml()` 包裝（照 `sites/ka-to` 的 `KT.ml`）——等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `once` 播一次、canvas `aria-hidden`、容器保留 `.ml-fb` HTML 標題、reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。開發 Prompt 見 `MotionLib.prompt(id)`。被排除的元件：Flip Tiles（SHP-14）、Grid Cascade（SHP-30）、Column Shift（BG-A-30）都用 `rr()` 圓角；Minimal Blocks（BG-B-33）有 `shadowBlur` 與漸層——違反特徵②。

## 插畫與圖像風格

**本風格沒有插畫。** 圖像只有三種：

1. 磚裡的單線 glyph（2.2px 白線、斜接角、置中偏上）。
2. 應用程式列的圓圈 glyph。
3. 全景背景的平塗剪影（海平面、島的多邊形），用強調色預混的淺色、零透明、隨視差慢慢走。

照片在 Metro 裡是允許的（全景背景常是滿版照片），但本館零外部圖片，所以以平塗剪影代替。

## Logo 與 Favicon 設計指南

一塊強調色正方形＋白色實心剪影（本站是飛魚：二叉尾、細長身體、兩片長胸鰭），旁邊是 300 字重的小寫字標 `flyingfish air`。Favicon 就是那塊正方形——它本身就是一塊 1×1 的動態磚。不加外框、不加圓角、不加陰影。

## Do & Don't

**Do**
- 讓標題被右緣切掉；讓下一欄探頭。
- 一個強調色，灰與黑只當主題色。
- 磚上寫真資訊（下一班、風、叫到幾號），不是寫 icon 名稱。
- 每一個可按的東西都要有 tilt。

**Don't**
- 不要圓角、陰影、漸層、玻璃、描邊卡片（那是 Fluent／iOS，不是 Metro）。
- 不要置中大標＋兩顆按鈕＋三張圓角卡片。
- 不要用 icon 當主角；icon 只住在應用程式列。
- 不要粗體大標——大字永遠是 300。
- 不要紫藍漸層、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- 不要把磚做成會彈跳或浮起的按鈕。

## 頁面骨架範例

```html
<header class="apptitle">飛魚航空 <b>候補</b></header>
<main class="pv">
 <div class="pivot-h" role="tablist">
  <button role="tab" aria-selected="true">候補</button><button role="tab" aria-selected="false">規則</button>
 </div>
 <div class="pivot-b">
  <section role="tabpanel">
   <div class="tiles">
    <a class="tile w tilt" href="#"><div class="roll">
      <div class="face a"><div class="big">07:20 蘭嶼</div><span class="lab">下一班</span></div>
      <div class="face b"><div class="big">06 號</div><span class="lab">現在叫到</span></div></div></a>
    <div class="tile m light"><div class="face a"><span class="cnt">5 級</span><span class="lab">蘭嶼 東北風</span></div></div>
    <div class="tile s ink"><div class="face a"><div class="big">13:20</div><span class="lab">台北</span></div></div>
   </div>
   <ol class="fl"><li class="li"><span class="t">09:40 蘭嶼</span><span class="s">FF703・準時</span></li></ol>
  </section>
 </div>
</main>
<nav class="appbar">…</nav>
```

## 技術實作與相容性

### 1. 跨文件 View Transitions（`@view-transition`＋`pageswap`／`pagereveal`＋`view-transition-class`）— 承載簽名旋轉門

- **現況**：Chrome／Edge 126+、Safari 18.2+ 支援同源跨文件轉場；Firefox 依 caniuse 目前為部分支援（144 起）、web-features 標示 Baseline 仍被 Firefox 擋住。`view-transition-class` 與跨文件同一批（Chrome 125+、Safari 18.2+）。
- **查證來源**：Chrome for Developers〈Cross-document view transitions for multi-page applications〉、caniuse〈View Transitions (cross-document)〉、web-features explorer〈cross-document-view-transitions〉（2026-11-03 查）。
- **Fallback**：偵測 `'onpageswap' in window && CSS.supports('view-transition-class','ts')`；不成立時改用 Web Animations：攔截站內連結 → 每列 WAAPI 轉出 → `location.href`；新頁以 sessionStorage 旗標播轉入。reduced-motion 兩者都關。
- 注意：舊快照的偽元素由**新文件**的 CSS 決定，所以逐列延遲規則必須在每一頁都有；只命名畫面內可見的前 14 列。導覽超過 4 秒 Chrome 會跳過轉場。

### 2. 容器查詢＋容器查詢單位＋scroll-snap — 承載特徵③④

- **現況**：`@container` 與 `container-type` 自 2023-02 起 Baseline Widely available；`scroll-snap-type` 自 2022-04 起 Widely available（MDN）。cq 單位與容器查詢同批出貨，未另查到獨立 Baseline 標示。
- **用法**：每一欄（`.pane`、`.pivot-b`）是 inline-size 容器；磚單位 `--u:calc((min(100cqi,560px) - 36px)/4)`，字級用 `cqi`；`@container (max-width:330px)` 時小磚藏標籤。
- **Fallback**：不支援 cq 單位時 `--u` 退回前一行宣告的 110px；不支援 scroll-snap 時全景仍可自由橫捲。

### 3. Intl API（DateTimeFormat／RelativeTimeFormat／NumberFormat）— 承載動態磚與航班狀態

- **現況**：`Intl.RelativeTimeFormat` 自 2020-09 起 Baseline Widely available（MDN）；`Intl.DurationFormat` 2025-03 才 Newly available，本站**不用**。
- **用法**：`timeZone:'Asia/Taipei'` 的 `formatToParts` 取台北時刻，決定每班「報到中・12 分鐘後／飛行中／已抵達」；`RelativeTimeFormat('zh-Hant')` 產生「12 分鐘後」；`NumberFormat('zh-Hant-TW')` 格式化票價。注意：`zh-Hant-TW` 的 TWD 貨幣符號是「$」，所以本站以數字格式＋手寫「NT$」前綴。
- **Fallback**：`try/catch` 退回本機時間與手寫字串。

### 效能實測

- 單頁大小：index 286KB、standby 288KB、fares 282KB（含各頁 motion-library 子集約 255KB）；≤350KB。
- 自製 JS 約 14KB，首屏只做時刻換算與一次清單渲染，無版面抖動（視差只寫 `transform`）。
- 同一畫面同時運轉的 motion-library 元件 ≤2（全景〈今日〉＋〈航班〉並排時為 2）。
- 冒煙測試：`tools/ml-smoke.js` 三份子集皆 `smoke ok`；jsdom 走完一輪〈排候補〉無例外。
