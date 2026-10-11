---
name: ming-zhumo-commentary-edition
description: Late-Ming vermilion-and-black overprinted commentary editions (zhumo taoyin pingdian ben, Wuxing c.1600–1640) as a web style — vertical right-to-left text on a fixed grid of ruled columns (nine columns of eighteen characters per half-leaf) inside a double-ruled block frame, black plate for the text and one colour plate per reader for circles, dots, strike-lines, top-margin comments and end comments, small two-line interlinear notes, no punctuation glyphs, and the fishtail block-heart and colophon cartouche as the only ornaments.
---

# 朱墨套印評點本 ‧ 一色一讀者

## 0. 血緣與定位

- **流派**：明代套印評點本（朱墨本、閔凌刻本）。型錄「印刷與製程」類 2026-10-11 新增條目，全館第 1 站。
- **年代地域**：萬曆末至崇禎（約 1600–1640），浙江烏程（吳興）晟舍。閔齊伋、凌濛初兩家盛用兩色以至三四色套印：**墨印正文，朱印圈點及評語**，世稱「朱墨本」「閔刻本」。
- **代表作**：萬曆丙辰（1616）孫鑛批點《春秋左傳》朱墨套印本（USC Libraries 藏，被列為晚明雙色套印的代表）；凌氏一族另有多色套印本傳世。同一時代的評點閱讀風氣延續到金聖歎評《水滸》（1641）與清代時文選本——評點本本來就是**科舉作文的讀本**。
- **為什麼長成這樣**：雕版一版一色，要讓「讀者的意見」與「作者的原文」同時在紙上又分得開，最便宜的方法就是**多刻一塊版、換一罐顏色**。所以顏色不是裝飾，顏色是「誰說的」。行款（九行十八字）是刻工計字計價的單位，所以格子是固定的；雙行小字夾注是為了把注解塞進正文行裡又不打亂行款；正文不加標點，句讀由讀者（朱版）來點。
- **與鄰近流派的分界**：與 Kelmscott 書頁（tang-kiann：橫排、朱標題字＋藤蔓邊框、一色紅只做 rubric）不同，本風格是直排、紅色是「另一個讀者」而非標題；與活版 Letterpress（壓痕、單色）不同；與浮世繪（多色木版但為圖像）不同。

## 1. 設計哲學

一頁紙上同時有好幾個人：寫的人用墨，讀的人各用一色。介面的每一層都是「一塊版」，可以抽離、可以對位、可以少一個讀者。版面是格子，不是流動的；字是刻上去的，不是排上去的。安靜的直排正文，旁邊有一排紅圈在說話——**這個風格的主角是旁邊那排紅圈。**

## 2. 本風格的 5 個不可省略特徵

### ① 行款格：四周雙邊版框＋烏絲界行＋固定「半葉九行行十八字」，直排右起

拿掉它就只是「直排中文」。每一行是一個固定高度 18 字的格子，換段一律另起一行（不縮排），天頭寬、地腳窄。

```css
.leaf{--tian:5.4em;--di:1.3em;--side:.9em;padding:var(--tian) var(--side) var(--di);background:#EADCB9}
.ink{display:flex;flex-direction:row-reverse;border:1px solid #221D18;outline:3px solid #221D18;outline-offset:3px;width:max-content}
.hang{writing-mode:vertical-rl;text-orientation:upright;width:2em;line-height:2em;height:18em;white-space:nowrap;
      border-left:1px solid rgba(34,29,24,.62)}          /* 一行一個 div：行款由排版器決定，不靠瀏覽器斷行 */
.hang:last-child{border-left:0}
```

### ② 一色一讀者：墨版正文、朱版／藍版／黃版各是一位讀者，零漸層，色版固定錯位疊印

色版是**獨立圖層**：同一份行款 clone 成數層，每層只讓自己的顏色可見；圖層之間有 0.5px 級的固定套印誤差，並以 multiply 疊在墨版上。

```css
:root{--mo:#221D18;--zhu:#BE3A22;--dai:#2B4C7E;--huang:#B07C0C}
.o{text-emphasis:open circle;text-emphasis-color:var(--cz)}   /* 所有記號顏色都是「版變數」 */
.plated>.ink:not(.plate){--cz:transparent;--cb:transparent}   /* 墨版只留墨 */
.plate{position:absolute;top:var(--tian);left:var(--side);--ct:transparent;--cz:transparent;--cb:transparent;mix-blend-mode:multiply}
.p-z{--cz:var(--zhu);transform:translate(.55px,-.45px)}        /* 朱版：謝批 */
.p-b{--cb:var(--dai);transform:translate(-.4px,.5px)}           /* 藍版：林評 */
```

### ③ 字：匠體宋印正文、寫刻楷印批語；正文零標點，句讀是朱版上的小圈小點、不佔格；數字一律漢字

```css
.hang{font-family:"Noto Serif TC",serif;font-weight:500}
.mei,.zt,.bt{font-family:"LXGW WenKai TC","Noto Serif TC",serif}
.ju::after{content:"";position:absolute;left:-.12em;bottom:-.16em;width:.34em;height:.34em;border:1.6px solid var(--cz);border-radius:50%}  /* 句 */
.du::after{content:"";position:absolute;left:-.06em;bottom:-.16em;width:.2em;height:.26em;background:var(--cz);border-radius:50% 50% 50% 0;transform:rotate(-20deg)} /* 讀 */
```

排版器把 。！？ 變成前一字的 `.ju`、，、；： 變成 `.du`，原標點字元不進版面。

### ④ 版面手法：眉批在天頭對準它評的那一行；雙行小字夾注夾在行中、兩小字一格、跨行接續；尾批「批曰」另起行

```css
.mei{position:absolute;top:.45em;right:anchor(right);writing-mode:vertical-rl;font-size:.6em;height:8.2em;color:var(--zhu)}
/* <aside class="mei z" style="position-anchor:--A1c3">開門見山</aside> */
.wr{display:inline-block;position:relative;width:2em;height:calc(var(--r)*1em);vertical-align:top}  /* --r = ceil(字數/2) 格 */
.wi{position:absolute;top:0;right:.94em;writing-mode:vertical-rl;font-size:.5em;line-height:1em;width:2.1em;height:calc(var(--r)*1em);
    transform:scaleY(2);transform-origin:top right;white-space:normal}            /* 小字半寬全高＝「小字雙行同」 */
```

### ⑤ 裝飾母題：圈點符號系統＋版心魚尾黑口＋牌記——沒有別的花

| 記號 | 意思 | CSS |
|---|---|---|
| ○ 圈 | 好句 | `text-emphasis: open circle` |
| ﹅ 點 | 可留 | `text-emphasis: filled sesame` |
| ◎ 密圈 | 全篇最好的一句 | `text-emphasis: "◎"` |
| ｜ 抹 | 該刪 | `text-decoration: line-through 2px var(--cz)` |
| ◦ ▲ | 第二位讀者（藍） | `open dot`／`filled triangle` |

```html
<svg viewBox="0 0 46 18"><path d="M0 0h46v18L23 8 0 18z" fill="#221D18"/></svg>  <!-- 黑魚尾 -->
<div style="writing-mode:vertical-rl;border:4px double;padding:12px 8px;font-weight:900">丙午仲秋紅筆齋梓行</div>  <!-- 牌記 -->
```

## 3. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 書案楠木 | #36271C → #2A1E15 | 頁面底（桌面），書頁放在上面 | 40% |
| 竹紙 | #EADCB9（邊 #C9B385） | 葉面 | 42% |
| 墨 | #221D18 | 正文、版框、界行、魚尾 | 12% |
| 朱 | #BE3A22 | 第一讀者：圈點、句讀、眉批、尾批 | 4% |
| 黛藍 | #2B4C7E | 第二讀者 | 1.5% |
| 藤黃 | #B07C0C | 使用者自己（第三讀者） | 0.5% |
| 桌面字 | #E9DAB4／#B9A57E | 書案上的說明文字 | — |

規則：一色只屬於一個讀者；不得用朱色做按鈕以外的 UI 裝飾；零漸層（紙紋與燈光除外）；零紫藍漸層、零玻璃擬態。

## 4. 字體系統

- 正文：Noto Serif TC 500（明朝體正是由明刻匠體演變而來）；卷端題名 900。
- 批語：LXGW WenKai TC 400/700（寫刻楷）。
- 書案上的現代說明：同 Noto Serif TC，橫排 15–17px、行高 1.75–1.9。
- 葉面字級：`--leaf: clamp(13.5px, (100vw − 40px)/20.6, 21px)`；眉批 .6em；夾注 .5em×scaleY(2)；句讀 .34em。

## 5. 版面與網格

- 一半葉＝9 行 × 18 格，行寬 2em（圈點落在行右側的 .5em 半行距裡）。兩個半葉並排成一葉（spread），右先左後，`flex-direction:row-reverse`。
- 書案上：葉在右，說明、版架、浮簽在左（同樣右起閱讀）。
- 手機 ≤760px：半葉單欄堆疊，版心導覽變底部橫列。
- 排版器規則：大字 1 格；夾注 ceil(n/2) 格，剩餘格數不夠時切開、下一行頂端接續；段落另起行；眉批記在「下一個字會落的那一行」。

## 6. 元件配方

- **版心導覽**：右側 74px 竹紙直條＝書頁的版心：黑口、上魚尾、書名、卷次（卷一…卷四）、下魚尾、葉碼。下魚尾會游到游標所指的卷次，離開回到現卷。
- **版架（分版開關）**：每一塊版一個按鈕（墨版／朱版／藍版），按下＝把那塊版從紙上抽走（位移＋旋轉＋淡出），文案說「少一塊版，就少一個讀者」。
- **浮簽**：現代資訊（價目、地址、阿拉伯數字）一律寫在貼上去的浮簽上（淺紙、上緣一條讀者色、微旋轉、上方一段半透明紙膠）。
- **按鈕**：朱底竹紙字、直角；次要按鈕為 1.5px 墨框。
- **表單**：底線輸入（1.5px 墨），標籤 700。
- **牌記 footer**：雙邊直排框寫「某年某月某齋梓行」。

## 7. 動效規則（四種全有，皆有 reduced-motion 降級）

| 類 | 本站做法 | 參數 | reduced-motion |
|---|---|---|---|
| ambient | 蠹魚（衣魚）沿第一葉的版框外緣慢爬，隨機停頓 | 14px/s，停 1–4s | 靜止停在右上角 |
| input | 下魚尾游到指向的卷次；滑過一行時該行淡朱底、它的眉批上浮 3px；蠹魚被游標靠近時九倍速逃跑 | .2s／.08s | 無位移，狀態仍標示 |
| transition | 翻葉：離頁 `clip-path: inset(0 100% 0 0)` 往左收、進頁從右往左展開 | .32s／.5s | 直接換頁 |
| signature | **〈三讀者分版套印〉**：墨版先壓（blur→清晰），朱版 .5s 後、藍版 1s 後從上方 26px 斜落入版、過衝後停在固定錯位；四角閃出「十」字套準記號；眉批隨自己的版落下 | dropZ .8s cubic-bezier(.25,.8,.25,1.1) | 色版直接在位，無動畫 |

## 8. 插畫與圖像風格：明刻分版插圖

墨版刻一切（粗細線、實黑塊、短排線木紋、冰裂紋窗），朱版只刻「讀者的東西」（朱砂碟、筆尖、紙上的圈、地圖上的店）。兩組 `<g class="svg-m">`／`<g class="svg-z">` 分開、可分版。不畫人物表情，不用漸層與描邊陰影。

## 9. Logo 與 Favicon

Logo：四周雙邊的豎長版框＋三條界行，中行黑魚尾下直排「紅筆齋」，右行三個朱圈（整組錯位 1px），左行兩個藍三角。Favicon：竹紙方塊、雙邊框、一條墨行、兩個朱圈。

## 10. Do & Don't

- Do：先決定「誰是讀者」，一個讀者一個顏色；所有圈點用原生 `text-emphasis`，讓它們可被選取與朗讀。
- Do：價目與細節用雙行夾注；現代資訊放浮簽。
- Don't：把紅色當強調色到處用；橫排正文；在正文裡留標點字元；用 emoji 當圈；用 opacity 做淺色版。
- Don't（去AI化）：紫藍漸層、置中大標＋三卡片、EST. 徽章、Lorem ipsum。

## 11. 頁面骨架範例

```html
<nav class="banxin"><div class="kou"></div><svg class="yw">…</svg><a class="shu" href="index.html">紅筆齋課藝</a>
  <ol><li><a href="index.html" aria-current="page"><i>卷一</i>齋序</a></li>…</ol><svg class="mark">…</svg><span class="ye">葉一</span></nav>
<main><div class="row">
  <div class="spread">
    <section class="leaf" data-plate aria-label="齋序・第1半葉">
      <div class="ink">
        <div class="hang" data-a="--A1c0" style="anchor-name:--A1c0"><span class="ti">紅</span>…</div>
        <div class="hang" data-a="--A1c2" style="anchor-name:--A1c2">紅筆齋在臺中<span class="o">我們只做</span><span class="wr" style="--r:5"><span class="wi">夾注小字</span></span></div>
      </div>
      <aside class="mei z" data-a="--A1c2" style="position-anchor:--A1c2">開門見山</aside>
    </section>
  </div>
  <div class="side">版架＋浮簽</div>
</div></main>
<footer class="paiji"><div class="box">丙午仲秋紅筆齋梓行</div>…</footer>
```

DSL（建置期與 pi.html 共用排版器）：`⟨o:圈⟩ ⟨d:點⟩ ⟨O:密圈⟩ ⟨x:抹⟩ ⟨b:藍圈⟩ ⟨e:藍點⟩ ⟦z:朱字⟧ ［夾注］ 【z:眉批】`。

## 12. 技術實作與相容性

### 12.1 writing-mode 直排＋text-emphasis 圈點（C 版面與樣式層）

- `writing-mode: vertical-rl` 全瀏覽器支援（caniuse：Chrome 48+、Firefox 41+、Safari 10.1+）。
- `text-emphasis` 系列：Chrome 99 起無前綴（之前需 `-webkit-`），Firefox 46+，Safari 以 `-webkit-text-emphasis` 支援；本站兩種寫法並列。`text-emphasis-position: over right` 讓直排圈點落在行右側。來源：caniuse「text-emphasis styling」、caniuse mdn-css_properties_text-emphasis-position、MDN 鏡像（2022-03 起跨瀏覽器可用）。
- Fallback：`@supports not (text-emphasis-style:circle)` 時改以 radial-gradient 背景在字右側畫一顆圈。

### 12.2 CSS anchor positioning（C 版面與樣式層）

- 眉批 `position-anchor: --A1c3; right: anchor(right)` 綁在它評的那一行；同一行第二則眉批加 `.shift` 改用 `anchor(left)` 讓位到左一行上方。
- 支援：Chrome/Edge 125、Safari 26、Firefox 147（web.dev〈New to the web platform in January 2026〉宣告 Baseline Newly available）；Adobe 相容表對 Safari 26.4 仍有細節修正，故保留 fallback。
- Fallback：`CSS.supports('anchor-name: --a')` 為假時，JS 以 `getBoundingClientRect()` 量該行右緣、設定 `left`，並在 resize 與字型載入後重算。

### 12.3 行款排版器＋雙行夾注求解＋評點規則引擎（E 資料與生成層）

- 排版器：`Intl.Segmenter` 切字（不支援時 `Array.from`），逐字填 18 格；夾注需 ceil(n/2) 格，剩餘格 r 不夠時切下 2r 字留在本行、餘下接到下一行頂端；標點轉為前一字的句讀 class。建置期（Node）預先產出靜態 HTML，〈批一段〉在瀏覽器端用同一份程式即時排。
- 分版：`cloneNode(true)` 把墨版複製成色版圖層、移除 anchor-name 與 id、標 `aria-hidden`；noscript 時不分版，所有顏色直接在單層上，資訊零損失。
- 評點規則引擎（使用者自己的段落）：以句讀切子句，套語表（我覺得、總而言之、在這個快速變遷的時代…）→ 抹；具體名詞／感官字／數詞加分、抽象詞扣分 → 最高分 ◎、次二句 ○、再二句 ﹅；眉批依最佳句的感官類型（聲／色／身體）選語。
- 效能實測（建置後檔案大小）：index 約 50KB、pi 約 56KB、ka 約 36KB、lai 約 42KB（皆含 inline CSS/JS/SVG，遠低於 350KB）；排版 162 字＋分版 clone 於桌機 <5ms；所有動畫只動 transform／opacity／clip-path。

---

*本規格書由 Claude Opus 5.5（排程 Agent）撰寫，2026-10-11。*
