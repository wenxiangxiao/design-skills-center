---
name: playful-pop-halftone
description: A loud pop-art system in cream and comic primaries, built on Ben-Day halftone dots, hard black outlines, offset comic shadows and a bottom dock — energetic, print-inspired and unmistakably hand-silkscreened.
---

# 俏皮普普風 · Playful Pop (Halftone)

> 一套「吵、硬、印刷感」的普普視覺語言。靈感來自 Lichtenstein 漫畫、老海報網版、與台灣夜市招牌。核心識別＝**Ben-Day 半調網點 + 3px 純黑描邊 + 硬邊位移陰影**。適合街頭服飾、玩具、飲料、音樂、活動、任何想被聽見的品牌。

## 設計哲學

1. **吵得有秩序**：飽和原色大膽用，但靠統一的黑描邊與網點紋理綁在一起，才不會亂成一團。
2. **印刷是主角**：半調網點不是裝飾，是整個品牌的隱喻——把數位影像「印壞」成粗點，反而有溫度。
3. **實體感**：硬邊位移陰影（`Nx Ny 0`，不模糊）＋按壓時陰影歸零，模擬貼紙、按鈕、鉛字的物理觸感。
4. **功能當開場**：不放大標 hero，直接把商品牆／目錄鋪成第一屏（catalog-first），像翻開一本漫畫的跨頁。

## 色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 奶油 Cream | `#FBF3E2` | 背景（帶淡網點） | 50% |
| 墨黑 Ink | `#17140F` | 描邊、文字、陰影、footer | 20% |
| 漫畫紅 Red | `#E9482E` | 主強調、SFX、價格 | 10% |
| 普普藍 Cyan | `#1FA7D8` | 次強調、band | 8% |
| 招牌黃 Yellow | `#FFC426` | 按鈕、tag、高亮 | 8% |
| 泡泡粉 Pink | `#F27BA0` | 第三色、panel | 4% |

原色一律搭 3px 黑描邊。**禁止**漸層 hero、柔和低彩度、任何「高級簡約」白底。

## 字體系統

- **標題／SFX／價格／導覽**：`Anton`（單一字重，Impact 替補），`text-transform:uppercase`，`line-height:.98`，字距 `.5–2px`。
- **內文**：`DM Sans`（400/500/700），`line-height:1.55`；正文常用 500 加粗以撐住吵鬧版面。
- 字級：hero `clamp(38px,8vw,104px)`／H2 `clamp(26px,5vw,56px)`／H3 `22px`／body `14–17px`／標籤 `10–13px`。
- 巨字可用「填色鏤空」：`-webkit-text-stroke:3px ink; color:cream` 做出海報描邊字。

## 版面與網格

- 置中容器 `max-width:1000–1200px`，`.wrap` 控制左右 padding。
- **catalog-first**：首頁去掉大標開場，用 `.chead`（系列標題＋期數 meta）當窄橫幅，接著立刻 `grid` 商品牆（`repeat(3,1fr)`，手機降至 1–2 欄）。
- 一切區塊都是「漫畫格」：3px 黑邊 + `box-shadow:6px 6px 0 ink`（硬邊、不模糊）。
- 標題用 4px 粗底線分段；tag／badge 輕微旋轉（`rotate(-4deg~9deg)`）增添手貼感。
- 底部留 `padding-bottom:92px` 給 bottom-dock。

## 元件配方

- **bottom-dock nav**：`position:fixed;bottom:16px;left:50%;transform:translateX(-50%)`；奶油底 3px 黑邊硬陰影；每項＝自繪 SVG 線圖標＋Anton 小字；`.on` 為漫畫紅底白字；含購物袋計數泡泡（紅圓＋黑邊）。手機收起文字只留圖標。
- **product card**：3px 邊＋硬陰影，hover `translate(-3px,-3px)` 陰影加大到 `10px`；圖面 `.art` 疊三層＝底色 + 商品 SVG + `.dots`（`radial-gradient` 網點 `mix-blend-mode:multiply`）。
- **按鈕**：黃底黑邊 Anton 字，`box-shadow:3–5px 3–5px 0 ink`；`:active` 時 `translate` 進位＋陰影歸零（按壓感）。
- **對話框 speech**：白框硬陰影 + CSS 三角尾巴（雙層 border 疊出黑邊白面）。
- **SFX 爆炸貼**：星爆多邊形 `clip-path`／SVG，原色底黑邊，載入時 `scale(0)→1` 帶 overshoot。

## 動效規則

| 動效 | 觸發 | 值 |
|---|---|---|
| SFX 爆炸貼彈入 | 載入 | `pop .5s cubic-bezier(.2,1.4,.4,1)`，錯開 350/620ms |
| Ben-Day 放大鏡 | `.art` mousemove | 圓形 lens 跟游標，內含放大網點（`background-size` 加倍），`opacity .12s` |
| 加入袋計數彈跳 | click | `.count` `bump .4s cubic-bezier(.2,1.6,.4,1)`；游標處噴 `+1` 飛出淡出 |
| 漫畫分格 / DROP 滑入 | 進入視窗 (IntersectionObserver) | 每格延遲 `i*110~140ms`，`.5s cubic-bezier(.2,.8,.3,1)` |
| 卡片 hover 浮起 | hover | `.18s`，陰影 6→10px |

全部包 `@media(prefers-reduced-motion:reduce)`：關閉 animation/transition，SFX 與分格直接顯示最終狀態。

## 插畫與圖像風格（halftone 半調網點）

- 商品／物件用**硬邊色塊 + 3px 黑描邊**畫成扁平漫畫，再疊 `radial-gradient` 網點做陰影層次（`multiply` 混合）。
- 網點三種尺度：背景淡點 `9px`、插畫陰影 `8px`、放大鏡 `16–18px`。點色一律墨黑。
- 全部 inline SVG，配色用品牌原色；不使用任何點陣圖或外部圖片。

## Logo 與 Favicon 設計指南

- **Logo**：星爆徽記（黃星＋紅圓＋`P!`）＋ `Anton` 雙行字標（PULP 墨黑 / CLUB 紅），下方一條網點底線。
- **Favicon**：黃底方塊＋紅圓＋`P!`，inline SVG data URI（`%23` 編碼 `#`）。

## Do & Don't

**Do**：飽和原色配黑描邊、Ben-Day 網點紋理、硬邊位移陰影、巨型 Anton 標題、catalog 當開場、bottom-dock、按壓物理感、輕微旋轉手貼。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋三張圓角卡片 ❌ 模糊柔陰影 ❌ 圓角 rounded-2xl ❌ emoji 當 icon（一律自繪 SVG）❌ 低彩度「高級簡約」白底 ❌ Lorem ipsum／AI 腔文案。

## 頁面骨架範例

```html
<div class="strip">◆ 跑動資訊帶（此風格允許：普普貼紙帶）◆</div>
<header class="wrap"><div class="top"><a class="logo">…星爆+字標…</a><span class="tag">TAG</span></div></header>
<main class="wrap">
  <div class="chead"><h1>系列 <span class="o">鏤空字</span></h1><div class="meta">期數/現貨</div><span class="sfx pop">NEW!</span></div>
  <div class="grid" id="grid"><!-- 商品卡：.art(底色+SVG+.dots+.lens)+.info(價格+加入袋) --></div>
  <section class="band">大字宣言 + 網點角落</section>
</main>
<footer>…墨底三欄…</footer>
<nav class="dock">圖標×3 + 分隔 + 購物袋計數</nav>
```

換產業（飲料、玩具、音樂祭、活動）只要替換商品插畫主題與文案，網點＋黑邊＋硬陰影＋bottom-dock 的骨架不動，即可產出風格一致的新站。
