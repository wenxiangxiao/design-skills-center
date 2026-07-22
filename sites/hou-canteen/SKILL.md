---
name: papercut-solar-canteen
description: A vivid cinnabar-and-rice-paper papercut (jianzhi) style keyed to the 24 solar terms, built for small warm eateries and community shopfronts; window-flower medallions, pegged paper tickets, cream cards on a bold red field.
---

# 剪紙節氣風 — Papercut Solar-Term Canteen

## 一、設計哲學

這是一套「紅紙剪出來的」視覺語言。它的根不是螢幕，是一張對摺再對摺、用剪刀鏤空的紅紙——窗花。三個信念貫穿全站：

1. **底色要夠紅，紅到像喜事。** 主場是飽和硃紅，不是米白紙感底（那是別家的溫吞）。所有溫柔都發生在紅底之上的一張張米紙卡裡。紅是節慶、是市場、是熱鬧的門口；米紙是坐下來以後的安靜。
2. **圖像是剪出來的負形，不是描出來的線。** 沒有一條裝飾性細線框。所有插圖——窗花、座上客、菜碗、logo——都是色塊，該有洞的地方讓底色透上來。崩邊與飛白（剪紙壓印時墨色不勻的白點）由程序生成，賦予手作的不完美。
3. **時間是設計的一部分。** 這是節氣風：內容跟著二十四節氣、七十二候走。UI 要能承載「今天是什麼日子」「這一味還剩幾份」這類會隨時間變的資訊，並讓變化本身可被看見。

檢驗：把紅底換成米白、把剪紙換成線描 icon，這套語言就死了。若你的成品拿掉紅與剪紙還成立，代表你沒做到位。

## 二、色彩系統

| 用途 | 色票 | 比例 | 說明 |
|---|---|---|---|
| 主場地色 | 硃紅 `#C1362A` | ~46% | body 底、hero、大面積 |
| 深硃分隔 | `#8E2318` | ~14% | 頁首下框、footer、卡片投影 |
| 最深硃 | `#5E140C` | ~3% | deckle 花邊底、極深處 |
| 米紙卡 | `#F2E9D6` / 亮 `#FBF5E6` | ~22% | 所有承載內文的紙卡、票 |
| 紙暗邊 | `#E4D6B8` / `#D2BE95` | ~5% | 卡片邊線、座位板底 |
| 墨字 | `#201A16` / `#3C332B` | ~5% | 米紙上的正文 |
| 竹青 accent | `#2E7D57` / 深 `#1C4A34` | ~4% | 唯一的第二色相：當令、正向狀態（入座／尚餘）、叫號數字、木夾、剪紙人物變化 |

規則：這是**硃紅 × 竹青的雙色域（duotone）**——紅是大面積場地，竹青是唯一的第二色相（承擔當令、正向狀態、數字與人物變化），米紙與墨為中性。紅配綠是剪紙年節的本色，**不得再引入第三個色相**，也不得把紅綠混成裝飾漸層。禁止任何漸層 hero。米紙卡上正文一律墨黑，紅字只用於價格、印記等小處。

## 三、字體系統

- 來源：Google Fonts。`Noto Serif TC`（700/900，標題與剪紙字標）、`Noto Sans TC`（400/500/700，內文）、`Chivo Mono`（400/600，號碼、時刻、英文小標、統計數字）。
- 字級 scale（rem 概念，桌機）：h1 clamp(26–40px) / h2 clamp(22–36px) / h3 18–20px / body 15px / 小標·單位 10.5–12px。
- 字重行高：標題 `font-weight:900; line-height:1.3; letter-spacing:.04em`；內文 `line-height:1.72; letter-spacing:.02em`。
- **中文標題一律用 Serif 900 並加寬字距**（`.04em~.14em`），取「印在紅紙上的方正感」；所有數字、時刻、份數、英文 kicker 一律 Mono 並 `font-variant-numeric:tabular-nums`，取「號碼牌」的機械感。兩種字感的對比（毛筆味 vs 打號機）是本風格的識別。

## 四、版面與網格

- 容器 `max-width:1140px` 置中，左右 padding `clamp(14px,3.5vw,40px)`。
- **不對稱主舞台**：核心頁用 `1.55fr / 1fr` 兩欄（左＝現場／內容，右＝操作面板 aside），行動版塌成單欄、面板移到內容之後。
- 卡片一律**硬陰影**（`box-shadow:3px 4px 0 #8E2318`）、1px 實邊、**零圓角**（剪紙沒有圓角）；票、chip、印記允許輕微旋轉（`rotate(-3deg~3deg)`）製造「別上去」的手感。
- 留白偏中等偏密：紅底上資訊密集但靠紙卡分區，不追求極簡大留白。
- 頁面頂緣用 **deckle 花邊**（半圓齒狀 repeating-radial 背景）模擬剪紙的鋸齒邊，寬 16px。

## 五、元件配方

**nav（pegline 晾票繩）**：頁首一條虛線「票繩」（`repeating-linear-gradient` 橫線），其上以 flex 排四張 `.chit`（米紙票，`clip-path` 切成不規則四邊形、輕微旋轉、硬陰影），每張頂端一枚竹青「木夾」（小圓角矩形絕對定位）。現用頁：票別正（`rotate(0) translateY(6px)`）、換竹青底、白字。hover 票扶正下沉。≤560px 縮小字級；語意保底：頁尾恆有完整文字連結列。

**按鈕**：`.btn` 深硬陰影、2px 邊、`letter-spacing:.06em`；hover `translate(-1px,-1px)`、active `translate(1px,2px)` 併陰影收扁（像壓下一枚印）。正向動作用 `.btn.go`（竹青）；紅底上的次要動作用 `.btn.ghost`（透明＋米紙邊）。

**卡片 `.paper`**：米紙底、墨字、硬陰影、`.kicker`（Mono 深紅小標＋字距 .28em）起頭。

**表格**：米紙上以 `#D2BE95` 細線分隔；表頭用 Sans 700 墨字（非 Mono），欄寬左窄右寬。

**表單 / 選擇器**：人數用「分段按鈕」（`aria-pressed`，選中深紅底白字）；範圍與清單選項用米紙按鈕、選中換竹青。所有互動元件都要有 `aria-pressed / aria-current / aria-label`。

**footer**：最深硃底、竹青上框；四頁完整連結（Serif 700）＋地址電話（Mono）＋營業時間＋**虛構示意聲明＋建置模型標示**。

## 六、動效規則

- **本站的動效簽名不是轉場，是「時間流逝」**：一個內部候位機時鐘每 ~980ms 前進 1 分（`setInterval`），驅動座位圖、叫號板、動態紀錄即時重繪。這是內容的動，不是裝飾的動。
- 叫號「輪到你」狀態：`@keyframes pulse` 竹青光暈呼吸，1.1s ease-in-out infinite。
- 按鈕壓印：transform 120ms；票扶正：180ms ease。
- **reduced-motion**：`prefers-reduced-motion:reduce` 時關閉所有 transition/animation，且時鐘**預設暫停**、改由「推進 3 分」按鈕手動前進；首屏靜態即完整可讀。
- 通用淡入不作為簽名主打；禁止數字滾動計數、按壓硬陰影以外的花俏位移。

## 七、插畫與圖像風格（papercut 剪紙）

**核心技法：剪出負形，非描線。** 以 SVG `mask` 實作——一塊 accent 色的實心矩形/圓，透過 mask 把「該鏤空處」挖掉，露出底色。

- **窗花（window-flower）**：程序生成。取一個扇形楔子（`360/fold` 度），在其極座標外緣用 LCG 亂數抖出鋸齒半徑、內部挖 1–2 個花瓣孔，再繞中心旋轉鏡射 `fold`（6 或 8）次成放射對稱。同一 seed 恆得同一朵。用於 logo 印記、頁面裝飾、憑條印章。
- **座上客（figure）**：極簡剪影色塊（半圓髮＋梯形身），依「客人類型」上色，但全部落在紅／綠／墨三調內（墨＝上班族、竹青＝午休兩人與一家、深硃＝老夫妻與老主顧、硃紅＝你）。用色即身分，且不越出雙色域。
- **菜碗、地圖、圖標**：一律色塊構成，允許少量鏤空表達蒸氣、門洞。
- **崩邊與飛白**：剪紙外緣用 LCG 啃出缺角、內部撒向邊緣集中的白點，模擬手剪與壓印不勻。
- 禁止：`thin-lineart` 等寬描邊線框、emoji、任何外部點陣圖。

## 八、Logo 與 Favicon

- **Logo**：紅底橫幅，左為一枚米紙六摺窗花印記，右為 Serif 900 中文字標（寬字距）＋ Mono 英文副標＋竹青底線。
- **Favicon**：inline SVG data URI 寫在 `<head>`。紅底＋米紙的一朵小窗花（八角星）＋一只碗剪影，最簡化即可。
- 字標與窗花可同色系內反白，不引入新色。

## 九、Do & Don't

**Do**：紅底大面積、米紙卡承載內文、Serif 標題 vs Mono 數字的字感對比、竹青為唯一第二色相、剪紙負形圖像、硬陰影零圓角、票／印記輕微旋轉、時間可被看見、reduced-motion 降級、虛構聲明。

**Don't**：紫藍漸層或任何漸層 hero；米白紙感當主底（本風格主底是紅）；置中大標＋副標＋兩顆按鈕＋三張圓角卡片模板；rounded-2xl 模糊陰影卡；線描 icon 或 emoji；紅底上長段紅字（不可讀）；跑馬燈反射式套用；引入第三色相或把紅綠混成裝飾漸層；AI 腔文案（「在當今快節奏的世界」）。

## 十、頁面骨架範例

```html
<div class="deckle"></div>
<header class="mast"><div class="wrap"><div class="row">
  <!-- 六摺窗花 SVG(米紙色) -->
  <div class="brand"><h1>店名</h1><span class="en">ROMAJI · TAGLINE</span></div>
  <div class="tag">一句店況<br>當令 <b>立秋</b>　涼風至</div>
</div></div></header>

<div class="wrap">
  <nav class="pegline"><div class="twine"></div><ul>
    <li><a href="a.html" aria-current="page"><span class="peg"></span>
      <span class="chit">頁名<span class="en">EN</span></span></a></li>
  </ul></nav>
</div>

<section class="wrap">
  <span class="eyebrow">MONO 小標</span>
  <h2>紅底上的米色 Serif 大標，字距放寬</h2>
  <div class="stage">            <!-- 1.55fr / 1fr 不對稱 -->
    <div class="left"><!-- 現場／內容 --></div>
    <aside class="paper"><span class="kicker">面板小標</span><!-- 操作 --></aside>
  </div>
</section>

<footer><div class="wrap">
  <div class="foot-nav"><a>…四頁完整連結…</a></div>
  <p class="mono">地址 · 電話</p><p>營業時間</p>
  <p class="fine">虛構示意聲明 · 建置模型</p>
</div></footer>
```

核心 CSS 變數：

```css
:root{
  --red:#C1362A; --red-d:#8E2318; --red-dd:#5E140C;
  --paper:#F2E9D6; --cream:#FBF5E6; --ink:#201A16;
  --bamboo:#2E7D57; --bamboo-d:#1C4A34;   /* 唯一的第二色相 */
  --ser:"Noto Serif TC",serif; --san:"Noto Sans TC",sans-serif; --mon:"Chivo Mono",monospace;
}
body{background:var(--red);color:var(--paper);font-family:var(--san)}
.paper{background:var(--paper);color:var(--ink);border:1px solid #D2BE95;box-shadow:3px 4px 0 var(--red-d)}
```

驗收：一個從未看過本 Demo 的 AI，只讀本檔即應能做出「紅底剪紙、Serif×Mono 字感對比、竹青為唯一第二色相、時間可見、reduced-motion 降級」的全新節氣店家網站，而不需要看到候食堂本身。
