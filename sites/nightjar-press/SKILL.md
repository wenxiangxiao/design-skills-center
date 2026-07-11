---
name: dark-academia
description: Dark Academia web style — warm near-black grounds, parchment cream text, oxblood and antique-gold accents, all-serif typography with drop caps and thin gilt rules, engraving-style original illustration, and slow candlelit motion.
---

# 暗黑學院風（Dark Academia）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「出版社」這個題材。夜鴞出版社只是它的一次示範（律師事務所、香水品牌、私廚、古典音樂廳都適用）。

---

## 一、設計哲學

暗黑學院風源自對舊圖書館、燭光、羊皮手稿與古典人文學科的懷舊。它的核心情緒是**沉靜、博學、微微的憂鬱與神秘**。畫面像一間深夜仍亮著一盞燈的書房：底色是暖黑而非純黑，光來自燭火般的金，重點以酒紅點題。設計不追求明亮與效率，而追求**質地與時間感**——彷彿每個像素都被翻閱過。與「科技感深色模式」的差別在於：這裡沒有霓虹、沒有無襯線、沒有發光邊框，只有紙、墨、金箔與襯線字。

三條心法：暖不冷（所有黑與灰都偏暖）、慢不快（動效克制優雅）、繁不簡（容許裝飾線、花飾字符 ❦、首字放大）。

## 二、色彩系統

| 色票 | Hex | 用途 | 比例 |
| --- | --- | --- | --- |
| 暖墨 Ink | `#12100C` | 主背景（偏暖的近黑，非 #000） | 60% |
| 稍亮墨 Ink 2 | `#1B1813` | 卡片／區塊底、footer 前景 | 12% |
| 羊皮米白 Parchment | `#E9DFC6` | 主要文字、標題 | 15% |
| 暗米 Parchment 2 | `#C9BE9F` | 次要內文 | 5% |
| 牛血紅 Oxblood | `#7A2721` | 強調、首字放大、按鈕、書脊底座 | 3% |
| 黃銅金 Gold | `#B08D4C` | 分隔線、標籤、邊框、hover | 3% |
| 亮金 Gold 2 | `#D8BE86` | 標題重點字、價格、金箔感 | 1% |
| 暗苔綠 Moss | `#41513C` | 第二強調（少量，冷卻畫面） | 1% |

規則：背景永遠是暖墨或稍亮墨；金只用於**線與小字**，不大面積填色（金箔是稀有的）；酒紅是唯一「有溫度的紅」，用於情感重點；純白 `#FFF` 禁用，一律用羊皮米白。分隔線用 `rgba(176,141,76,.25~.4)` 的半透明金，營造若隱若現的燙金。

## 三、字體系統

**全站襯線，無一例外。** 拉丁字用 `Cormorant Garamond`（顯示／標題，愛用 italic 500）＋ `EB Garamond`（內文）；中文用 `Noto Serif TC`（標題 900／700，內文 400）。三者皆來自 Google Fonts。

字級 scale（clamp 流體）：Hero 標題 `clamp(40px,7vw,86px)`／區塊標題 `clamp(28px,4vw,44px)`／前導 lede italic `clamp(22px,3vw,30px)`／內文 18–19px／標籤 12px。行高：內文 1.8–1.85（襯線需要呼吸）；標題 1.04–1.1。字距：小標籤字距極寬 `.42em` 且大寫（`text-transform:uppercase`），中文標題字距 `.1~.14em`。

簽名手法：**首字放大（drop cap）**——段落 `::first-letter` 用 Cormorant 4.2em、`float:left`、牛血紅。標題常做中英混排：中文粗明體＋一段小級 italic 拉丁副題。

## 四、版面與網格

不對稱、編輯感、大量負空間。Hero 用 `1.35fr .95fr` 的雙欄，文字靠左、插圖偏右下對齊（`align-items:end`）。內容頁用 `max-width:760px` 的窄欄，模仿書頁。區塊之間以**半透明金的 1px 上緣線**分隔，而非卡片陰影。留白規則：section 上下 `padding:66px 0`；行文段距 24px。禁用圓角（`border-radius` 一律 0 或 2px 書脊除外）；禁用模糊陰影，需要層次時用 1px 金線或內陰影 `inset`。旋轉角度幾乎不用——這是靜的風格，個性來自質地而非傾斜。

## 五、元件配方

**Nav**：sticky、`rgba(18,16,12,.92)` + `backdrop-filter:blur(6px)`、底部 1px 金線。連結為 Cormorant 17px，hover 時金色底線由左至右展開（`::after` 寬度 `right:100%→0`，`transition .4s`）。品牌區為圓形社徽 SVG ＋ 粗明體社名 ＋ 小級大寫拉丁副名。

**按鈕**：無圓角，牛血紅底＋米白字，Cormorant 大寫字距 `.2em`；hover 轉金底墨字。次要按鈕為透明底＋1px 金框。

**卡片／書封**：`aspect-ratio:3/4.4` 的直式書封，1px 金框、暖墨漸層底、內含原創版畫 SVG。列表項（書目）用 `grid` 四欄（編號／書名作者／類別／價格），hover 時整列淡金背景 `rgba(176,141,76,.05)`。

**表單**：透明底、1px 金框輸入框，focus 時 `outline:1px solid gold`。

**Footer**：更深的 `#0C0A07`、頂部金線、三欄（社介＋通信訂閱／導覽／地址），底部一行版權＋「虛構示意」聲明，全用 Cormorant italic 小字。

## 六、動效規則

克制是關鍵——**慢、少、有意義**。

- **進場揭示**：`.rv{opacity:0;translateY(18~22px)}` → `IntersectionObserver`（threshold .1）加 `.in`，`transition:opacity .8~.9s, transform .9s cubic-bezier(.2,.8,.2,1)`。
- **燭火微顫**：`@keyframes flick` 2.6s ease-in-out infinite，`transform:scale(1↔1.06) rotate(-1deg↔1.5deg)`＋opacity .95↔1，`transform-origin:bottom center`。
- **書脊抽出**：`.spine` hover／focus 時 `transform:translateY(-26px)`，`transition:.5s cubic-bezier(.2,.85,.25,1)`。
- **nav 底線**：金線 `.4s` 展開。
- **hover 淡金**：列表列背景 `.3s` 漸變。

一律提供 `@media(prefers-reduced-motion:reduce)`：關閉所有 `animation`、揭示直接顯示、書脊 hover 不位移、`scroll-behavior:auto`。**不使用跑馬燈／自動輪播**——此風格的動效簽名是「靜止中的微光」與「翻閱式揭示」。

## 七、插畫與圖像風格

全部原創 inline SVG，風格是**古典版畫／銅版線描（engraving）**：細線（stroke-width 1–1.6）、無填色或極少填色、米白或金的線在暖墨上。母題取自書房與自然史——夜鳥、燭台、弦月、羽毛、幾何星圖、線裝書。書封用「1px 金框＋中央單一象徵圖形＋底部書名」的極簡構成。肖像用圓框內的極簡線描頭像。禁用照片、禁用漸層插畫、禁用 emoji。

## 八、Logo 與 Favicon 設計指南

**Logo**：圓形社徽——外圈 1px 金環，內含弦月（金）＋微星（米白）＋一道酒紅弧線（如棲木或水平線），旁附粗明體名稱與 Cormorant italic 拉丁副名（含 `est.` 年份，可用羅馬數字 MMIX 增添古典感）。

**Favicon**：同一弦月母題的極簡版——暖墨方底、金色弦月、一顆米白小星，寫成 inline SVG data URI 置於 `<head>`。範例：
`data:image/svg+xml,%3Csvg ... %3Crect fill='%2312100C'/%3E%3Cpath d='弦月' fill='%23B08D4C'/%3E%3Ccircle 小星 fill='%23E9DFC6'/%3E%3C/svg%3E`

## 九、Do & Don't

**Do**：暖黑打底、金只用於線與小字、全襯線、首字放大、花飾字符 ❦、版畫線描、不對稱編輯版面、克制的慢動效、`prefers-reduced-motion` 降級。

**Don't**（含去AI化禁令）：
- 禁純黑 `#000` 與純白 `#FFF`（一律暖墨與羊皮米白）。
- 禁紫藍漸層 hero、禁霓虹發光、禁無襯線標題。
- 禁「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- 禁 emoji 當 icon（icon 一律自繪版畫 SVG）。
- 禁 rounded-2xl＋模糊陰影卡片；層次用金線與 inset。
- 禁 Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；文案要有具體人名、書名、地址、年份。
- 禁跑馬燈反射式套用。

## 十、頁面骨架範例

```html
<header class="mast"><div class="bar">
  <a class="brand" href="index.html">
    <svg class="mk" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="none" stroke="#B08D4C"/>
      <path d="M24 8a12 12 0 1 0 8 20 9.5 9.5 0 0 1-8-20z" fill="#B08D4C"/>
      <circle cx="14" cy="15" r="1.4" fill="#E9DFC6"/></svg>
    <b>你的品牌</b><span>Latin Subtitle · est. MMXX</span>
  </a>
  <nav><ul><li><a href="index.html">首頁</a></li><li><a href="two.html">第二頁</a></li></ul></nav>
</div></header>

<section class="hero"><div class="wrap grid">
  <div>
    <p class="lbl"><span class="n">✦</span>小標籤・大寫寬字距</p>
    <h1>粗明體大標，<em>夾一段 italic 拉丁</em></h1>
    <p class="lead">首字放大的導言，用 ::first-letter 做酒紅色 drop cap……</p>
  </div>
  <div class="hero-art"><svg><!-- 版畫線描：夜鳥／燭台 --></svg></div>
</div></section>

<style>
:root{--ink:#12100C;--parch:#E9DFC6;--ox:#7A2721;--gold:#B08D4C;--gold2:#D8BE86;
  --disp:'Cormorant Garamond',serif;--han:'Noto Serif TC',serif;}
body{background:var(--ink);color:var(--parch);font-family:var(--han);line-height:1.85}
.lead::first-letter{font-family:var(--disp);font-size:4.2em;float:left;color:var(--ox);padding:6px 14px 0 0}
.rule{border:0;border-top:1px solid rgba(176,141,76,.3)}
</style>
```

---

*本 SKILL 由 Design Skills Center 提供。示範站：夜鴞出版社 Nightjar Press（獨立出版 × 暗黑學院風）。*
