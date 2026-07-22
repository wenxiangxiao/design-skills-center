---
name: coin-op-nightshift
description: A dark 3am launderette aesthetic built from enamel machine panels, seven-segment readouts and porthole glass, driven by ambient co-presence of strangers.
---

# 夜光投幣機風 Coin-Op Nightshift

> 一種「凌晨三點自助洗衣店」的視覺語言：琺瑯機身、七段顯示器、玻璃艙門、日光燈綠。
> 它不是為了漂亮，是為了讓人感覺到——在別人睡著的時候，這個公共空間裡有陌生人正非同步地共用著它。

## 一、設計哲學

三個信念，缺一不可：

1. **介面即機器面板**。頁面不是「網站」，是一台投幣機的操作面。資訊擠在琺瑯鐵板、七段顯示器、投幣槽、按鈕與貼紙之間。沒有大留白的置中 hero，沒有圓角卡片牆——有的是鐵板的直角、燈管的嗡鳴、硬幣的黃銅。
2. **深夜的公共性**。這是一個「無人駐點、多人非同步共用」的空間。畫面要照著現在幾點即時改變（哪台在轉、誰洗好了沒收），並保留其他人的痕跡（公告欄紙條）。孤獨與陪伴同時存在，這是本風格的情緒核心。
3. **冷硬的機器，溫熱的人話**。視覺是不鏽鋼與螢光綠的冷；文案是手寫紙條的暖（「拜託別動我的衣服，馬上回來」）。兩者的溫差就是這個風格的張力，不可只做冷、不可只做暖。

## 二、色彩系統

暗底霓虹（vivid-bold）：近黑舞台鋪滿，強調色一律高飽和霓虹、每個色只代表一種狀態，以「日光燈綠 × 黃銅 × 紙條暖白」為情緒三角。

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 夜底 night | `#0E1412` | 全站背景（帶極微綠調的近黑） | 46% |
| 琺瑯 panel | `#132A26` / `#0F1F1C` | 機身、卡片、面板 | 20% |
| 不鏽鋼 steel | `#2E3B38` / `#46554F` | 邊框、分隔、按鈕框 | 10% |
| 日光燈 tube/fluor | `#7DF2A8` / `#CFF7DB` | 燈管、主強調、標題點綴 | 8% |
| 段碼綠 seg | `#35E08A`（亮）/ `#183129`（滅） | 七段顯示器數字 | 4% |
| 黃銅 brass | `#E0A24B` | 硬幣、投幣槽 | 3% |
| 琥珀 amber | `#F2B33D` | 運轉中／警示狀態 | 3% |
| 洗衣藍 water | `#4FB0E6` | 玻璃艙內水光、泡泡 | 2% |
| 停止紅 stop | `#E5533C` | 占用／停止／圖釘 | 2% |
| 紙條 paper | `#ECE6D2`（底）/`#2A2C22`（字） | 公告欄紙條（唯一的暖色塊） | 2% |
| 墨字 ink / mut | `#DCE7E2` / `#849690` | 內文／次要文字 | — |

規則：**強調色只有兩種身分**——螢光綠＝「可用／你的／活著的」，琥珀＝「別人在用／該收了」。紅只給占用與圖釘。紙條暖白是整站唯一大面積暖色，務必保留其稀有性以製造溫差。禁止把紫藍漸層、粉彩、米白紙感底當主底。

## 三、字體系統

Google Fonts 兩支，各司其職：

- **Noto Sans TC**（400/500/700/900）：所有中文與內文。標題用 900、標籤 700。字面工整、無襯線，像機台上的印刷標。
- **Share Tech Mono**（等寬）：所有數字、代號（W3／NT$50）、英文標籤、七段顯示器語境、時刻。letter-spacing `.04em`。

字級 scale（clamp 響應）：hero `clamp(25px,4.6vw,44px)`／h2 `22px`／h3 `15px`／body `15–16px/1.7`／eyebrow `11px letter-spacing:.32em`／seg 大數字 `40px`（領洗票）。行高：標題 1.12，內文 1.7。

## 四、版面與網格

- **開場＝樓面地圖（map-first）**，不是大標 hero。首屏直接給機台網格，標題退為左上一句話，右上放即時在場讀數。
- **機台網格**：`grid-template-columns:repeat(4,1fr)`，`gap:12px`；≤860px 轉 3 欄，≤560px 轉 2 欄。分「洗衣區／烘衣區」兩帶，帶標題用 mono 小字＋一條延伸細線。
- **認領區**：`1.15fr .85fr` 雙欄（左表單、右領洗票＋動態），≤860px 疊成單欄。
- 直角為主，圓角僅出現在「玻璃艙門」（圓形）與硬幣（圓形）。卡片圓角 ≤8px。分隔一律 1px 實線 `--line`，不用模糊陰影當分隔（陰影只在 hover 抬升時出現）。
- 版面密度：中等偏密。資訊像貼在鐵板上一樣並排，允許 mono 小字塞在角落（狀態、讀數、代號）。

## 五、元件配方

**日光燈頁首（tube header）**：sticky 頂條，中央一根 6px 高的漸層「燈管」`linear-gradient(90deg,transparent,var(--tube),var(--fluor),var(--tube),transparent)` + `box-shadow:0 0 14px rgba(125,242,168,.55)`。左為 logo 字標，右為 mono pill「24H · 亮著就是開著」。

**機台磚（.mach）**：`linear-gradient(160deg,#16302a,#0f211d)`，1px steel 邊框，圓角 6px。內含 ①頂標（代號 + 容量）②玻璃艙門 ③狀態列（七段 + 小字）④使用者列（圓點 + 匿名）。hover `translateY(-2px)` + 邊框轉亮 + 陰影。占用態加 `.busy`（cursor:not-allowed，取消 hover 抬升）。

**玻璃艙門（.porthole）**：`aspect-ratio:1.55/1` 的深色橢圓底，內嵌一個圓形玻璃（`border:3px solid`）。運轉態 `.run` 讓玻璃 `animation:spin 2.4s linear infinite` 並在上緣加一條半透明水光。你的機台 `.mine` 邊框轉段碼綠並內發光；洗好 `.done` 轉琥珀。

**七段顯示器（.seg）**：`font-family:Share Tech Mono`，色 `--seg` + `text-shadow:0 0 8px rgba(53,224,138,.65)`，深色底 `#081512` + 1px 邊框，`padding:2px 8px`。變體 `.amber`／`.stop`／`.off`。倒數用 `.blink`（`animation:bl 1.05s steps(1) infinite`，reduced-motion 下取消）。

**硬幣（.coin）**：26px 圓，`radial-gradient(circle at 38% 34%,#f2c877,#E0A24B,#a86f24)`，中央 mono「10」。以「投幣＝幾枚十元」把價格具象化，是本風格的簽名細節。

**按鈕（.btn）**：實心螢光綠底、黑字、直角（3px）、700。hover 發綠光 `box-shadow:0 0 18px rgba(125,242,168,.4)`。次要用 `.ghost`（透明底綠字）。

**紙條（.slip）**：唯一暖色元件。紙白底、深字、`transform:rotate(±1.4deg)`、頂端一顆 `::before` 紅色圓形圖釘（你的紙條圖釘轉綠）、底部 mono 署名與時刻。用 `box-shadow:0 5px 12px rgba(0,0,0,.4)` 讓紙條浮在鐵板上。

**底部控制面板導覽（bottom-dock）**：fixed 底欄，做成機台按鈕列。每頁一顆按鈕：中文標 + mono 英文小標 + 右上一顆 LED 圓點；現用頁 `aria-current="page"` 讓 LED 亮綠發光、邊框轉綠。≤560px 隱藏英文小標。

**footer**：1px 上邊框，左為地址＋「凌晨也有燈」，右為 mono「投幣 NT$50 起｜資料皆為虛構示意」。

## 六、動效規則

| 動效 | 觸發 | duration / easing |
|---|---|---|
| 玻璃滾筒旋轉 | 機台運轉中 | `spin 2.4s linear infinite` |
| 七段倒數閃爍 | 你的機台倒數中 | `bl 1.05s steps(1) infinite`（冒號/數字微暗） |
| 機台 hover 抬升 | 指標移入可用機台 | `transform/box-shadow .12s` |
| 認領錯誤震動 | 點到占用機台 | `element.animate` 位移 ±4px，240ms |
| 領洗票數字 | 每秒 | 直接更新 mmss，無過場 |
| 燈管輝光 | 常駐 | 靜態 box-shadow，不動 |

**reduced-motion**：`*{animation:none!important;transition:none!important}`，`.blink` 恆亮。倒數數字仍逐秒更新（那是資訊不是裝飾），但取消滾筒轉、閃爍、抬升與震動。

## 七、插畫與圖像風格（segment-display 段碼顯示構圖）

**全站零外部圖片**。所有圖像由三種原語程序組成，且都能「讀出讀數」：

1. **七段／點陣數字**：用 SVG `rect` 拼出段碼字形（見 logo 與面板 SVG），是本風格的圖像基本單位。
2. **琺瑯色塊**：無描邊的實色矩形（機身、按鈕、標牌），承擔面積。
3. **玻璃圓＋水光泡泡**：圓形 + 一條半透明弧光 + 兩三顆藍色小圓，代表「洗」這件事。

與 thin-lineart 的差別：這裡幾乎不描外框，圖像由「機器會亮的東西」（段碼、燈、琺瑯牌）構成，且每張插圖都對應一個真實機件（顯示器、投幣槽、艙門、按鈕）。招牌可用 SVG `<text>` 配 `drop-shadow` 做霓虹字，但那是燈管不是圖片。

## 八、Logo 與 Favicon 設計指南

**Logo**：一個圓角方形機身，內含玻璃艙門圓；艙門裡是一彎**新月**（夜）＋兩顆藍色泡泡（洗），頂端一顆小圓像投幣孔。月＝深夜、艙＝洗衣，兩個字面疊在一起。字標「夜滾自助洗衣 / NIGHTSPIN LAUNDERETTE」用 900 中文 + mono 英文，英文 letter-spacing `.42em`。

**Favicon**：同一枚艙門月亮，去掉字標，inline SVG data URI 寫在 `<head>`。配色沿用 night/steel/tube/water。

## 九、Do & Don't

**Do**
- 讓畫面照真實時鐘活著；保留他人痕跡。
- 用七段顯示器、硬幣、圖釘紙條這些「機台語彙」承載資訊。
- 維持冷機器與暖人話的溫差。
- 每個狀態一個顏色身分（綠＝活／你、琥珀＝他人／該收、紅＝占用）。

**Don't**
- ❌ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片。
- ❌ emoji 當 icon（一律 SVG 段碼／琺瑯／玻璃圓）。
- ❌ 千篇一律的 rounded-2xl 模糊陰影卡片。
- ❌ Lorem ipsum 與「在當今快節奏的世界」AI 腔；紙條與守則要像真人半夜寫的。
- ❌ 把紙條暖白鋪成大底，破壞溫差。
- ❌ 把跑馬燈當反射動作硬塞——本風格的動效簽名是「滾筒轉＋段碼倒數＋即時在場」，不是捲動橫幅。

## 十、頁面骨架範例

```html
<header class="tube"><div class="tube-in">
  <a class="wordmark" href="index.html"><!-- logo svg --><b>夜滾自助洗衣</b></a>
  <span class="bar"></span>
  <span class="openpill mono">24H · 亮著就是開著</span>
</div></header>

<main>
  <p class="eyebrow">Floor · 現場樓面</p>
  <div class="floorhead">
    <h1>凌晨三點，這裡還有幾台在轉。</h1>
    <div class="presence"><span class="mono">現在店裡 2 人 · 3 台運轉中</span></div>
  </div>

  <div class="floor">
    <button class="mach">
      <div class="tag"><span class="id">W3</span><span>8kg 洗衣</span></div>
      <div class="porthole run"><div class="glass"></div></div>
      <div class="state"><span class="seg amber blink">12:04</span><small>運轉中 · 標準</small></div>
      <div class="owner"><span class="dot"></span><span>赤峰街的貓</span></div>
    </button>
    <!-- …更多機台… -->
  </div>
</main>

<nav class="dock"><div class="dock-in">
  <a href="index.html" aria-current="page"><span class="led"></span><span class="lbl">現場</span></a>
  <a href="rates.html"><span class="led"></span><span class="lbl">洗程・投幣</span></a>
  <a href="night.html"><span class="led"></span><span class="lbl">夜間守則</span></a>
</div></nav>
```

核心互動（可直接沿用的邏輯）：以 `f(machineId ^ dateSeed, now)` 的 seeded PRNG 為每台機器產生「當日排程」，用當地時鐘 `nowMin(now)` 判斷此刻是運轉／剛洗好未收／空機；跨午夜以前一日排程 spillover 補齊，讓深夜也有活動。使用者「認領」一台空機的狀態與公告欄紙條寫入 `localStorage`，重整後倒數繼續、紙條仍在，與 seeded 的他人痕跡混在一起——這就是「偽即時多人共同在場」。
