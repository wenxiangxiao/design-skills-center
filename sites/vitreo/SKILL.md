---
name: liquid-glass-glassmorphism
description: A glassmorphism web style built on frosted translucent panels, backdrop-blur, and a slowly drifting soft gradient mesh — deliberately avoiding the purple-blue cliche by pairing mint-teal with peach-amber; layered inner/outer shadows create floating depth, with a liquid-fill progress tube and breathing light orb as motion signatures.
---

# 液態玻璃（Glassmorphism / Liquid Glass）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「募資頁」這個題材。Vitreo Halo 只是它的一次示範；你可以拿它做 SaaS 儀表板、金融 App、旅宿訂房、香氛電商或個人作品集。
>
> **核心心法**：玻璃感不是「加一層模糊」而已，而是「光穿過霧面」的手感——底層要有夠豐富的色彩讓玻璃有東西可折射，面板要靠內外陰影同時塑造「浮起」與「透光」。最重要的去AI化守則：**遠離紫藍漸層**。那是 glassmorphism 被用爛的招牌 tell。

---

## 設計哲學

1. **底層要有戲，玻璃才有戲**：毛玻璃面板本身幾乎無色，它的美完全來自背後那層飄移的柔和漸層網格。先鋪好一個會慢慢流動的暖冷漸層，再把玻璃疊上去。
2. **暖冷對撞，拒絕紫藍**：用薄荷青 × 蜜桃橘這種一冷一暖的組合，讓玻璃回到「清晨窗霧」的自然感，而不是又一張科技感模板。
3. **浮，而不是貼**：每個玻璃面板都應該看起來像懸浮在畫面上——靠長距離、低透明度的投影，加上邊緣一圈高光白框。
4. **克制發光**：資訊層次靠透明度與模糊強度區分，不靠更多顏色。玻璃世界是安靜的。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 薄霧薄荷 paper | `#EAF4F1` | 頁面底色 | 基底 |
| 墨青 ink | `#1C2B2E` | 文字、深色 CTA | 文字主色 |
| 湖水青 teal | `#0FA697` | 主強調、連結、進度液體 | 強調 15% |
| 琥珀橘 amber | `#E8933B` | 次強調、eyebrow 標籤 | 點綴 8% |
| 蜜桃 peach | `#FFD9B0` | 漸層網格暖色團 | 背景 |
| 薄荷團 mint | `#B9EBDD` | 漸層網格冷色團 | 背景 |
| 玻璃 glass | `rgba(255,255,255,.42)` | 所有面板底 | 面板 |
| 高光框 | `rgba(255,255,255,.6)` | 面板 1px 邊框 | 邊框 |

**嚴禁**：`#8b5cf6`→`#3b82f6` 這類紫藍漸層 hero。若要冷色，走青綠或灰藍，並務必配一個暖色團。

## 字體系統

- 標題／品牌／數字大字：**Sora**（700–800），幾何無襯線，圓潤但俐落。
- 內文：**Inter**（400–600）；中文可接 `"Noto Sans TC"`。
- 標籤／讀數／等寬小字：**Space Mono**（700），給 eyebrow、集資數字、規格表用，帶一點儀器感。
- 字級 scale：hero 標題 `clamp(34px,5vw,58px)` / 區塊標題 `clamp(24px,3.4vw,40px)` / 內文 15–18px / 標籤 12–13px 加 `letter-spacing:2px` 全大寫。

## 版面與網格

- 容器 `width:min(1120px,92vw)` 置中。
- **開場用 split-screen**（本站示範）：`grid-template-columns:1.05fr .95fr`，一側視覺舞台、一側資訊面板；手機時堆疊且視覺移到最前（`order:-1`）。
- 區塊間距大方（`margin:56–70px auto`），留白讓玻璃有呼吸。
- 卡片圓角偏大（22–32px）——這是玻璃風少數該用圓角的地方，但避免千篇一律的 rounded-2xl 陰影卡：靠模糊與高光框做出區別。

## 元件配方

**玻璃面板（核心）**
```css
.glass{
  background:rgba(255,255,255,.42);
  backdrop-filter:blur(16px) saturate(1.25);
  -webkit-backdrop-filter:blur(16px) saturate(1.25);
  border:1px solid rgba(255,255,255,.6);
  border-radius:26px;
  box-shadow:0 22px 60px -28px rgba(28,43,46,.45);
}
```

**漂浮毛玻璃 nav（topbar）**：`position:fixed` 藥丸列，`transform:translateX(-50%)` 置中，同樣 `backdrop-filter`，比面板更高的模糊值（18px）。

**呼吸光球（品牌主視覺）**：多層疊加的 `radial-gradient` 圓 + `inset` 內陰影塑球體 + 外層 `blur` 光暈做 `breathe` 動畫。

**液體填充管（進度）**：直立圓角容器，內部 `.fill` 由 `bottom` 往上長高（`transition:height 2.2s`），頂端一個旋轉的半透明橢圓當波浪。

**按鈕**：深色墨青實心 + `border-radius:16–18px`，hover `translateY(-3px)` 加投影。強調按鈕可用 teal。

**漸層網格背景**：3–4 個大 `blob`（`filter:blur(60px)`，暖冷交錯），各自 `drift` 動畫 26–40s 慢速漂移。上面再疊一層 5% 透明的 SVG `feTurbulence` 顆粒噪點，破除數位平滑感。

## 動效規則

| 動畫 | 觸發 | duration / easing |
|---|---|---|
| 漸層團漂移 drift | 常駐 | 26–40s `ease-in-out` alternate |
| 光球呼吸 breathe | 常駐 | 6s `ease-in-out` |
| 光球漂浮 bob | 常駐 | 7s `ease-in-out` |
| 液體管灌注 | 進入視窗（IntersectionObserver） | 2.2s `cubic-bezier(.2,.8,.2,1)` |
| 數字滾動計數 | 同上 | 1.8s ease-out（`1-(1-k)^3`） |
| 按鈕上浮 | hover | .2s |

全部包在 `@media (prefers-reduced-motion:reduce)` 內關閉：`animation:none`，數字直接顯示終值。

## 插畫與圖像風格

零外部圖片。圖示一律自繪 line-icon SVG（`stroke-width:2.5`，圓端點，墨青主線 + teal/amber 點綴）。產品與剖面圖用多層 `radial-gradient` + `stroke-dasharray` 描繪，維持玻璃透光質感。

## Logo 與 Favicon

Logo：一顆抽象玻璃水滴／光球——teal 漸層圓 + 白色高光橢圓 + amber 液滴，右接 Sora 800 字標。Favicon：同一顆光球縮成 32×32 的 inline SVG data URI 寫在 `<head>`。

## Do & Don't

**Do**：暖冷漸層底、內外陰影塑浮起、大留白、Space Mono 讀數點綴、動效克制而連續。
**Don't**：❌ 紫藍漸層 hero ❌ emoji 當 icon ❌ 千篇一律 rounded-2xl 模糊卡 ❌ 玻璃疊在純色平面上（沒東西可折射就失去意義）❌ 到處發光炫技 ❌ 用跑馬燈當動效簽名。

## 頁面骨架範例

```html
<div class="mesh"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>
<div class="grain"></div>
<nav class="glass"> …藥丸列… </nav>
<header class="hero">           <!-- split-screen -->
  <div class="copy"> …標題＋液體管面板… </div>
  <div class="stage"> …呼吸光球… </div>
</header>
<section class="band"><div class="cols3"><article class="glass feat">…</article></div></section>
<footer> …三欄＋虛構示意聲明… </footer>
```

若題材涉及金額、數據等敏感內容，footer 必附「皆為虛構示意」聲明。
