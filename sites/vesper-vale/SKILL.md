---
name: dark-academia-split
description: A Dark Academia web style built on a day/night split-screen — a bright, sunlit panel and a candle-lit dark panel divided by a brass seam and a wax seal, in warm ink-black, parchment, oxblood and candle-gold with Cormorant Garamond display serif and Latin mottos, using panels that grow on hover/toggle, wax-seal crack reveals and a rolling vintage odometer as motion signatures.
---

# 暗黑學院風 · 分屏版（Dark Academia — Day/Night Split）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「葡萄酒莊」這個題材。Vesper Vale 只是它的一次示範；你可以拿它做古書店、香水、私廚、劇場、獨立出版、精品旅宿或任何有「白晝／夜晚、公開／私藏」二元敘事的品牌。
>
> **核心心法**：暗黑學院風不是「把背景調黑就好」。它是燭光下的博學與收藏感——襯線、拉丁文、封蠟、羊皮與牛血紅。分屏把品牌的二元性（日光的藤園／夜裡的酒窖）擺在同一畫面對峙，讓使用者親手在晝夜之間滑動。氣氛優先於效率，但每個裝飾都要有出處。

---

## 設計哲學

1. **二元對峙即首頁**：不做行銷 hero，用左右分屏把品牌最核心的一組對立（日/夜、地上/地下、採收/陳釀、公開/私藏）並置。選 split-screen 就要讓兩側各自成立、各有入口。
2. **燭光而非聚光**：光來自畫面內的燭火／夕陽（radial-gradient 暖光暈），不是均勻打亮。暗處要留得住細節。
3. **封緘與儀式感**：火漆印、拉丁格言、羅馬數字、年份——用「需要親手啟封／翻找」的互動製造珍藏感。
4. **襯線承擔一切**：字體是這個風格的骨。用 Cormorant Garamond 的斜體與大字級製造書卷氣，中文用 Noto Serif TC。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 暖墨夜 night | `#15100B` | 全站背景、夜側 | ~50% |
| 石窖 cellar/panel | `#1E1712` / `#241B12` | 卡片、面板底 | ~16% |
| 羊皮米白 parch | `#E9DEC5` | 主文字、線稿 | ~12% |
| 奶油白 cream | `#F1E7CE` | 標題高光、日側文字底 | ~4% |
| 日光藤園 day | `#EAD9AF`（漸層 `#E4CE9E→#DFC98E`） | 分屏日側 | ~8% |
| 牛血酒紅 oxblood | `#8A2A20` / hover `#B24034` | 火漆、CTA、羅馬數字、強調 | ~5% |
| 燭金 gold | `#B98A3E` / `#D8B06A` | 線框、接縫、eyebrow、hover 底線 | ~5% |
| 藤葉苔綠 moss | `#4E5A3A` | 葉片、次要有機元素 | 點綴 |

原則：暗底＋羊皮字為主，燭金畫線與框、牛血紅只給最重要的動作與序號。禁止漸層紫藍；允許的漸層只有「暖色燭光暈」與「日側天光」。

## 字體系統

- **display 大標**：`Cormorant Garamond` 600（含 italic）。巨標 `clamp(2.2rem,5.4vw,4.6rem)`、`line-height:.98`，關鍵字用 `.it` 斜體並染燭金。
- **內文**：`Noto Serif TC` 400/600 為主、`EB Garamond` 承擔拉丁文與 label。`line-height:1.75`。
- **label／eyebrow**：`EB Garamond` 全大寫、`letter-spacing:.22–.34em`、.64–.72rem，染燭金；這是暗黑學院風的「小標籤」語彙。
- **拉丁格言**：EB Garamond italic，散落於刊頭與插畫（如 `Vinum · Nox · Memoria`），只作氣氛不作資訊。
- 首字放大：`.dropcap::first-letter` 用 display italic、`float:left`、`font-size:3.4em`、染牛血紅。

## 版面與網格

- **topbar**：`position:sticky`、半透明暗底＋`backdrop-filter:blur`、底 1px 燭金細線；徽記在左、導覽居中偏右、拉丁格言在最右（手機隱藏格言、導覽換行）。
- **分屏 split**：`display:flex;min-height:calc(100vh - 68px)`，兩 `.panel{flex:1}`。內容 `justify-content:flex-end`（文字沉在底部）。`≤820px` 改為上下堆疊、接縫轉水平。
- **內容區**：`max-width:1080px` 置中、左右 34px；區塊 `padding:96px 0` ＋ 1px 燭金/透明細線分節。
- 兩欄敘事用 `grid-template-columns:1.1fr .9fr`；清單用多欄 grid 而非卡片牆。

## 元件配方

- **分屏面板 panel**：`transition:flex-grow .7s cubic-bezier(.6,0,.2,1)`。hover 或 `.emph-day/.emph-night` 使一側 `flex-grow:1.55`、另一側 `.82`。日側暖色天光漸層、夜側 radial 燭光暈，各含一段 inline SVG 場景（藤列／木桶＋燭火）。
- **黃銅接縫 seam ＋火漆封印**：`position:absolute` 於 50%，`left` 隨 emphasis 以同一 easing 滑移（寬螢幕約 34.6% / 65.4%）；封印是 `<svg>` 圓形火漆＋斜體 VV 字母。
- **火漆筆記 note**：一枚可點擊的 SVG 火漆印（左右兩半 `path`）；`.open` 時兩半 `translateX(±26px) rotate(±16deg)` 裂開、底下 `.reveal` 淡入品飲筆記。支援鍵盤（`role="button"` + Enter/Space）。
- **年份轉盤 odometer**：每位數是 `overflow:hidden` 的視窗，內含 10 個等高 `<i>0…9</i>` 直排 `.strip`；選年時 `strip.style.transform=translateY(-(digit*10)%)`，`transition .8s`。滾動同時換酒款文字、酒瓶 `fill` 與酒標年份。
- **按鈕／CTA**：矩形零圓角；主 CTA 牛血底奶油字，或 `.go` 樣式——大寫 letterspaced ＋底線＋箭頭 hover 右移。
- **表單**：暗底、1px 燭金框、零圓角；focus 換金框＋淡金光暈。
- **肖像／頭像**：橢圓燭金線框內的抽象 SVG 半身剪影，非照片。

## 動效規則

- **分屏消長**：`flex-grow` `.7s cubic-bezier(.6,0,.2,1)`；接縫與封印同步。晝夜切換鈕用 `aria-pressed` 切 `.emph-*` class。
- **火漆裂開**：`.55s cubic-bezier(.5,0,.2,1)` 位移旋轉；筆記 `.reveal` 淡入延遲 .15s。
- **年份滾動**：digit strip `translateY` `.8s cubic-bezier(.5,0,.15,1)`。
- **hover 底線**：topbar 連結 `width 0→100%` `.3s`。
- **降級**：`prefers-reduced-motion:reduce` → 面板/接縫/封印/筆記/年份全部 `transition:none`，仍可用（直接跳到目標狀態）。

## 插畫與圖像風格

- 全原創 inline SVG／CSS，零外部圖片、零照片。
- 母題：**藤葉、葡萄串、木桶、燭火、火漆、羅馬數字、拉丁文、新月（vesper＝黃昏）**。
- 光影用暖色 radial-gradient；線稿用燭金細線；剪影用深褐塊面。避免擬真陰影與圓角。

## Logo 與 Favicon 設計指南

- **Logo**：`viewBox 0 0 120 120`，雙線橢圓封印（燭金）＋新月＋一株帶葡萄串（牛血紅）與苔綠葉的藤＋斜體 VV 字母。深底。
- **Favicon**：同母題（橢圓框＋新月＋葡萄串）壓成 64×64 inline SVG data URI 寫在 `<head>`，不可外連。

## Do & Don't

**Do**
- 用分屏把品牌的二元性擺上桌，兩側各自成立。
- 用火漆、拉丁文、羅馬數字、年份製造「珍藏／需要啟封」的儀式感。
- 燭光式打光、襯線大字、首字放大。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡片。
- ✗ 圓角卡片＋模糊陰影；本風格零圓角、線框收邊。
- ✗ emoji 當 icon、Lorem ipsum、AI 腔套語。
- ✗ 跑馬燈——本風格的動效簽名是分屏消長、火漆啟封與年份滾動。
- ✗ 把暗色風做成均勻打亮的「深色模式」；光要有來源。
- ✗ 酒精／敏感題材不標虛構聲明與健康警語。

## 頁面骨架範例（可直接使用）

```html
<div class="split" id="split">
  <div class="toggle"><button data-emph="day" aria-pressed="false">晝</button><button data-emph="night" aria-pressed="false">夜</button></div>
  <section class="panel day"><div class="scene"><!-- SVG 日景 --></div>
    <div class="body"><span class="eb">BY DAY</span><h1>向陽的<span class="it">那一面</span></h1><a class="go" href="#">進入 →</a></div>
  </section>
  <section class="panel night"><div class="scene"><!-- SVG 夜景 --></div>
    <div class="body"><span class="eb">BY NIGHT</span><h1>入夜的<span class="it">靜默</span></h1><a class="go" href="#">探看 →</a></div>
  </section>
  <div class="seam"></div><div class="seal-wrap"><!-- 火漆封印 SVG --></div>
</div>
```

```js
// 晝夜切換：切 class，接縫/封印隨 emphasis 位移
btns.forEach(b=>b.addEventListener('click',()=>{
  var on=b.getAttribute('aria-pressed')==='true';
  btns.forEach(x=>x.setAttribute('aria-pressed','false'));
  split.classList.remove('emph-day','emph-night');
  if(!on){b.setAttribute('aria-pressed','true');split.classList.add('emph-'+b.dataset.emph);}
}));
// 年份轉盤
strip.style.transform='translateY('+(-digit*10)+'%)';
```

驗收標準：一個從未看過 Vesper Vale 的 AI，只讀本 SKILL.md，就能替任何有晝夜／公開私藏二元敘事的產業，做出同樣以分屏開場、火漆啟封、襯線大字與燭金牛血配色的暗黑學院風網站。
