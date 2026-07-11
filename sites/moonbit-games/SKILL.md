---
name: pixel-8bit-style
description: Colorful 8-bit pixel aesthetic for narrative game studio sites — midnight-blue base, neon cyan/magenta/yellow accents, stepped box-shadow borders, steps() easing, and rect-built SVG sprites.
---

# Pixel 8-bit Style — 像素風設計系統

適用對象：遊戲工作室、像素藝術家、復古主題品牌。
參考實作：月位元 MOONBIT GAMES（index.html / games.html / studio.html）。

**定位區隔**：這是「彩色像素遊戲」風格——深夜藍底＋三色螢光點綴、有角色與插畫。
它不是綠磷光金融終端機風（單色、等寬、資料密集），兩者只共享「低保真」精神，不共享配色與元件。

---

## 1. 設計哲學

1. **每一格都是決定。** 像素風的說服力來自「刻意的低解析」——所有圖形都以整數格繪製，
   禁止半格位移、禁止抗鋸齒、禁止模糊濾鏡。`shape-rendering:crispEdges` 與
   `image-rendering:pixelated` 是底線，不是選配。
2. **遊戲介面即網頁介面。** 對話框、血條、金幣計數、LV 標籤——直接借用遊戲 HUD 的語彙，
   讓瀏覽像在玩一款安靜的冒險遊戲。但借語彙不裝可愛：文案保持職人語氣。
3. **動要動得像卡帶。** 所有動效一律 `steps()`，拒絕平滑補間。8-bit 世界沒有 ease-in-out。
4. **深夜藍是畫布，螢光色是光源。** 大面積永遠是深夜藍階；青／洋紅／黃只當「發光體」：
   燈籠、螢幕、月亮、重點文字。比例失守就會變成玩具反斗城。

## 2. 色彩系統（hex + 比例）

| 角色 | 色票 | 建議比例 |
|---|---|---|
| 底色 深夜藍 | `#0b1026` | ~55% |
| 次底／面板 | `#111838` / `#161e46` | ~25% |
| 弱邊框 | `#273065` | ~5% |
| 主文字 | `#e8ecf8`；次文字 `#98a2cc` | ~8% |
| 螢光青（主互動色） | `#2ee6d6`（暗階 `#12857b`） | ~3% |
| 像素黃（強調、金幣、月亮） | `#ffd23f`（暗階 `#c79616`） | ~2% |
| 洋紅（點綴、警示、燈籠） | `#ff4fa3`（暗階 `#a3235f`） | ~2% |

規則：
- 每個螢光色都要配一個「暗階」，用於按鈕側面、內緣陰影——這就是 8-bit 的「色階」，
  一色最多兩階，不做漸層。
- **禁止任何 CSS 漸層**當作配色（僅允許 `repeating-linear-gradient` 做掃描線／血條條紋等功能性紋理）。
- 插畫另有輔助色：膚色 `#f2c9a0`、木色 `#8a5a33`、貓灰 `#454b78`、剪影 `#12172e`。

## 3. 字體系統

```css
--pxfont: 'Press Start 2P','DotGothic16',monospace;   /* 標題、UI 詞彙 */
font-family: 'Noto Sans TC',sans-serif;                /* 內文 */
```

- **Press Start 2P**：拉丁字與數字的像素標題字。無 CJK，故 fallback 到 **DotGothic16**
  （像素感日系黑體，涵蓋漢字）——中英混排標題會自然各取所需，這是刻意設計。
- **DotGothic16**：也單獨用於「對話框」與「評價引言」正文，強化遊戲文本感。
- **Noto Sans TC**：長段落內文。像素字體只能短用，超過兩行的中文一律回到 Noto。
- 尺寸紀律：pixel 字型 8–12px 為主（letter-spacing 1–2px），標題 clamp(15px, 2.6vw, 22px)；
  H1 可到 clamp(20px, 4.2vw, 34px)。Press Start 2P 行高至少 1.6。

## 4. 版面與網格（像素邊框做法）

- 主欄 `max-width:1080px`，段落間距 70–80px；560px 以下單欄。
- **像素邊框（核心技法）**：不用 `border`，用四向 box-shadow 各推出一格——
  四個角自然缺角，形成階梯狀像素角：

```css
.pxbox{
  --px:4px;
  background:var(--panel);
  box-shadow:
    0 calc(var(--px)*-1) 0 0 var(--bd),
    0 var(--px)          0 0 var(--bd),
    calc(var(--px)*-1) 0 0 0 var(--bd),
    var(--px)          0 0 0 var(--bd);
}
```

- 邊框色透過 `--bd` 換色（弱邊框 `#273065`、強調用螢光色）。
- 因 box-shadow 不佔版面，父層需預留 ≥ 4px 的間隙（grid gap ≥ 8px 即安全）。
- 分隔線同技法：`box-shadow: 0 -4px 0 0 var(--line)` 取代 `border-top`。
- 星空背景：一顆 3px 方點元素 + 一長串 `box-shadow: Xvw Yvh 0 color` 疊出，固定定位、opacity ≈ .55。
- CRT 掃描線（可選、務必淡）：`repeating-linear-gradient(0deg, rgba(5,8,24,.16) 0 1px, transparent 1px 3px)`
  蓋整頁，`pointer-events:none`。透明度超過 20% 就會搶戲。

## 5. 元件配方

**像素框**：見上方 `.pxbox`。對話框變體＝底色改最深藍、邊框改主文字色 `#e8ecf8`（高對比白框）。

**按鈕（按壓感）**：四向 shadow 畫框 + 底部再疊 10px 暗階當「厚度」；`:active` 位移吃掉厚度：

```css
.btn{
  color:var(--night); background:var(--cyan);
  box-shadow: 0 -4px 0 0 var(--cyan), 0 4px 0 0 var(--cyan),
              -4px 0 0 0 var(--cyan), 4px 0 0 0 var(--cyan),
              0 10px 0 0 var(--cyan-d), -4px 10px 0 0 var(--cyan-d), 4px 10px 0 0 var(--cyan-d);
}
.btn:active{ transform:translateY(6px); /* shadow 移除厚度層 */ }
```

**對話框（NPC 語彙）**：`.dlg` 白色像素框＋角色名列（pixel 字型 8px 青色）＋
DotGothic16 正文＋閃爍下三角 cue（`steps(2)` 上下 3px）。

**血條／進度條**：外框白色像素框（3px），內填 `repeating-linear-gradient(90deg, 主色 0 8px, 暗階 8px 10px)`
做出格狀填充；標籤用 `72 / 100` 這種遊戲式計數。

**徽章／chip**：pixel 字型 8–9px、3px 像素框、night2 底。平台徽章一律自繪 8×8 rect 圖示
（螢幕、掌機、手把），**不得使用平台官方 logo**。

## 6. 動效規則

- **全域紀律：只用 `steps()`。** 標準參數：
  - 進場揭示：`animation: bitreveal .55s steps(6,end) both;`（translateY 28px → 0 + 淡入），
    IntersectionObserver threshold .12–.15 觸發，兄弟元素以 `--d` 延遲 0.05–0.25s 錯開。
  - 雙幀 sprite 動畫（眨眼、揮手、尾巴）：兩個 `<g>` 幀互換 visibility，
    `steps(1,end)` + 對稱 keyframes（0–49% 顯示 / 50–100% 隱藏）。揮手週期 .46s、尾巴 1.3s、
    眨眼 2.2s（86% 前睜眼）。
  - 跳躍：`steps(5,end)`、.5s、translateY 峰值 -22px。
  - 掉落物（金幣）：`steps(7,end)`、.8s、上飄 64px 後淡出，`animationend` 移除節點。
- **簽名互動（每站一個就好）**：本站是「可互動像素貓」——proximity 偵測
  （`pointermove` 算與精靈中心距離 < 160px 加 `.near`）+ 點擊跳躍掉金幣計數。
  換品牌時換主角（寶箱、月亮、角色），機制骨架可重用。
- **降級**：`@media (prefers-reduced-motion: reduce)` 內全域
  `animation:none!important; transition:none!important`，並讓 `.io` 直接可見；
  JS 端同步以 `matchMedia` 判斷，略過跳躍與掉幣，但保留計數與對話（互動語意不消失）。
- 禁止：marquee 跑馬燈、平滑 parallax、模糊光暈、彈簧曲線。

## 7. 插畫與圖像風格（sprite 拼法規則）

- 一律 inline SVG + `shape-rendering="crispEdges"`，只用 `<rect>`，座標與寬高全是整數。
- 網格規格：icon 8×8、頭像 12×12、角色 16×16、場景 48×30 或 64×40。CSS 放大顯示，
  `svg{image-rendering:pixelated}`。
- 拼法紀律：
  1. 先鋪底色 rect，再由遠到近疊圖層（天空 → 建物 → 道具 → 角色）。
  2. 同色像素合併為長條 rect（一排燈用一個 `<g fill>` 包多個 rect），控制節點數。
  3. 光源永遠是螢光色：螢幕發青光、燈籠發洋紅／黃光，光體旁加 1–2 顆更亮的 highlight 像素
     （如 `#c8fff8`、`#fff3c4`）。
  4. 人物與貓可用剪影色 `#12172e` + 螢光眼點，比全彩更有夜的氛圍。
  5. 場景 SVG 要給 `role="img"` + 中文 `aria-label` 描述。
- 頭像配方：底色磚（每人一色）→ 髮型 2–3 rect → 膚色臉 6×4 → 眼 2 點 → 嘴 1 條 → 肩膀色塊。
  眼鏡、耳機、髮長是辨識度來源。

## 8. Logo 與 Favicon 指南

- **Logo（assets/logo.svg）**：32×32 viewBox、16×16 格放大 2 倍。構成＝黃色弦月（開口朝右）
  ＋一顆脫離月面的青色「位元」方塊＋洋紅星點。內緣加 `#c79616` 暗階增加體積。
  概念：月亮缺的那一角，就是飛出去的 bit。
- **Favicon**：8×8 精簡版（僅弦月 C 形 + 一顆青色 bit），以 URL-encoded inline SVG data URI
  直接放 `<link rel="icon">`，不需外部檔案。
- Nav 品牌列：8×8 favicon 版 logo（26px）＋「月位元 <b>MOONBIT</b>」pixel 字型 12px，
  MOONBIT 用黃色。

## 9. Do & Don't

**Do**
- 全部圖形自己用 rect 拼；整數格、crispEdges、pixelated。
- 螢光色只給「會發光的東西」；大面積永遠是深夜藍階。
- 每個動效都問一次：換成 steps() 了沒？
- 遊戲 HUD 語彙（COIN、LV、HP、PRESS START）小量點綴，配上認真的中文內容。
- 規格表、售價、地址寫到可信：新台幣定價、實際捷運出口、具體年份。

**Don't**
- 不用 marquee 跑馬燈；不用紫藍漸層；不做置中三卡片模板。
- 不用 emoji 當 icon（要 icon 就畫 8×8 rect sprite）。
- 不用平台官方商標；平台徽章自繪示意圖示。
- 不把 CRT 濾鏡開濃、不加曲面／色差特效——本站是彩色像素遊戲，不是綠磷光終端機。
- 像素字型不排長文；中文長段落回 Noto Sans TC。

## 10. 頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁名｜月位元 MOONBIT GAMES</title>
  <link rel="icon" href="data:image/svg+xml,…像素月亮…">
  <link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Noto+Sans+TC:wght@400;500;700&family=Press+Start+2P&display=swap" rel="stylesheet">
  <script>document.documentElement.classList.add('js');</script>
  <style>/* :root 色票 → 星空/掃描線 → .pxbox/.btn → nav → 版面 → .io 揭示 → RWD/降級 */</style>
</head>
<body>
  <div class="stars" aria-hidden="true"><i></i></div>
  <header class="nav"> 品牌列 + 首頁/作品/工作室 </header>
  <main class="wrap">
    <section class="pagehead io on"> kicker + H1 + 引言 </section>
    <section class="io"> 內容區（.pxbox 卡、規格表、對話框…） </section>
  </main>
  <footer> 三欄：品牌 / 導覽 / 聯絡 + copyline「PRESS START」 </footer>
  <script>/* IntersectionObserver 揭示 + 簽名互動（含 reduced-motion 分支） */</script>
</body>
</html>
```
