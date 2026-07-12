---
name: editorial-magazine-spread
description: Editorial magazine-spread aesthetic — oversized high-contrast serif display, visible-gutter two-page spreads, running heads and page folios, drop caps and pull quotes, on a dark bookish palette with original line-art illustration.
---

# 雜誌對開排版風（Editorial / Magazine Spread）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「香氛」這個題材。SILLAGE 只是它的一次示範。

---

## 一、設計哲學

雜誌對開排版風把「一本高級印刷雜誌的內頁」搬上網頁。它的情緒是**編輯感、戲劇性的尺度對比、有敘事節奏**——網頁不是產品目錄，而是一本讓人一頁頁翻讀的刊物。

三個不可動搖的原則：

1. **尺度即戲劇**：巨型襯線標題與小級數內文並置，靠字級落差製造版面張力。標題可以大到裁切、可以壓過圖，但內文要安靜好讀。
2. **對開即結構**：版面模擬「跨頁」——中間有一條可見的中縫（gutter），左右兩頁不對稱地分配圖與文。頁碼（folio）、跑頭（running head）、期號讓它像真的一本誌。
3. **閱讀的節奏**：首字放大開場、拉頁引言換氣、Q&A 收尾。內容有起承轉合，不是資訊的平鋪。

適合題材：香氛、時裝、選物、餐飲主廚、藝文、旅誌、獨立品牌、訪談型內容。不適合追求即時轉換的電商或工具型產品。

## 二、色彩系統

暗色書卷調，單一暖強調色。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 墨黑 Ink | `#14110F` | 主背景 | 56% |
| 骨白 Bone | `#EDE7DB` | 主要文字、線稿 | 20% |
| 陶血紅 Oxblood | `#8A3B2E` | 唯一暖強調：首字、期號、重點線 | 7% |
| 暗金 Gold | `#B9A582` | 標籤、跑頭、輔助說明 | 6% |
| 暖炭 Char | `#241F1B` | 圖框底、footer、卡片底 | 11% |

規則：

- **暗底、骨白字**。整體偏暖、偏沉、像油墨印在再生紙上。
- **只用一個暖強調色**（陶血紅），出現在首字、期號、引言邊線；一個畫面 2–4 次。
- 暗金只當「印刷輔助資訊」（標籤、跑頭、頁碼），不當標題色。
- 禁止任何漸層（尤其紫藍漸層）與螢光。層次靠墨黑／暖炭／分隔線的實色階。分隔線一律 `1px #3a332d`。

## 三、字體系統

- **顯示字（Serif）**：`Playfair Display`（500/700/900＋italic）——高對比 Didone 襯線，做巨型標題、期號、引言、頁碼。斜體用來製造「編輯手感」。
- **內文（Han）**：`Noto Serif TC`（400/500/700），中文報導體，行高 1.75–1.8。中文也用襯線，維持書卷氣。
- **標籤／跑頭（Sans）**：`Archivo`（400–700）——中性無襯線，全大寫 + `letter-spacing:.16–.34em`，用於 kicker、running head、folio、按鈕。與襯線標題形成冷熱對比。

字級 scale：封面大標 `clamp(52px,10vw,128px)`／區標 `clamp(30px,5vw,52px)`／引言 `clamp(22px,3vw,32px)`／內文 15–16px／標籤 11px。**尺度落差要大**，這是本風格的靈魂。

## 四、版面與網格

- **跑頭（running head）**：頁面最上一條細列，三欄放刊名／期號／頁碼區間，Archivo 小字。像翻開雜誌頁眉。
- **封面 hero**：左文右圖兩欄，左欄放期號＋巨型襯線刊名＋斜體引文，右欄暖炭底放原創瓶身／主視覺線稿，附直排小標籤。
- **對開版（招牌版面）**：`grid-template-columns:1fr 1fr`，左頁 `border-right:1px` 當中縫；左右不對稱分配（一頁敘事、一頁引言）。奇偶段可交替左右順序（`order`）製造翻頁感。
- **首字放大（drop cap）**：段落 `::first-letter` 放大 3.8–4.1em、`float:left`、陶血紅。
- **拉頁引言（pull quote）**：斜體襯線大字 + 左側陶血紅 `2px` 邊 + Archivo 署名。
- **目次（TOC）**：`grid` 三欄（編號｜標題＋副標｜頁碼），細線分隔，像雜誌 Contents。
- 主容器 `max-width:1240px`，左右 padding 30px。

## 五、元件配方

- **Nav**：sticky、`rgba(20,17,15,.9)` + `blur`、`1px` 底線；連結 Archivo 大寫，hover 變暗金，current 頁底部陶血紅線。行動選單按鈕文字用「目次」。
- **按鈕**：方形、`1px` 骨白邊、透明底，hover 反白（`transition .3s` 慢一點，優雅）。主 CTA 用陶血紅實心。無圓角、無陰影。
- **氣味／規格金字塔（Note pyramid，招牌互動）**：三列 key-value（前調/中調/尾調），平常 notes 半透明 + 微左移，hover／點擊該列時淡入歸位（`opacity`+`transform`）。可鍵盤操作（`role=button`、`aria-expanded`）。這是把「規格」變成「可讀層次」的手法，任何產業都能改成材料表、行程表、成分表。
- **圖框**：暖炭底 + `1px` 邊，內放置中的原創線稿。
- **Footer**：暖炭底、暗金小標、Playfair 大字刊名。

## 六、動效規則（克制）

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| 金字塔展開 | hover／focus／click | 350ms | ease | notes `opacity .55→1` + `translateX` 歸位（本站互動簽名） |
| 進場揭示 | IntersectionObserver（.14） | 700ms | ease | `translateY(16px)`→0 淡入，只做一次 |
| 按鈕反白 | `:hover` | 300ms | ease | 色彩互換，刻意慢、優雅 |

**全部包在 `@media(prefers-reduced-motion:reduce)` 內降級**，reveal 直接顯示。編輯風重版面不重特效，動效要慢而少。

**跑馬燈警語**：本風格**不要**用跑馬燈——它與「翻頁閱讀」的靜態氣質相衝。重點資訊用跑頭、頁碼、對開版、金字塔承擔。

## 七、插畫與圖像風格

- 全部原創 SVG 線稿：香水瓶、調香桌、氣味符號，`1.4–2px` 骨白線 + 陶血紅／暗金點綴，暖炭底。像雜誌內頁的鋼筆插畫，不用實拍照片。
- 需要「氛圍」時用大留白 + 單一線稿，而非填滿的照片牆。

## 八、Logo 與 Favicon 設計指南

- **Logo**：左側小 flacon（香水瓶）線稿 + 一道陶血紅弧線（餘香痕跡），右側 Playfair 大寫刊名 + Archivo 寬字距中文副名。整體像雜誌報頭。
- **Favicon**：墨黑方底 + 骨白 flacon 外框 + 陶血紅小弧線，寫成 inline SVG data URI。

## 九、Do & Don't

**Do**：巨型高對比襯線標題、對開版可見中縫、跑頭與頁碼、首字放大、拉頁引言、暗色書卷調、單一陶血紅重音、原創線稿、真實可信的虛構文案（人名、地址、電話、配方、價格、營業時間）。

**Don't**：
- ❌ 漸層與紫藍漸層 hero（被禁的 AI tell）
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡的模板
- ❌ emoji 當 icon（瓶身、符號一律自繪 SVG）
- ❌ rounded-2xl + 模糊陰影卡
- ❌ Lorem ipsum 與 AI 腔文案
- ❌ 跑馬燈、浮誇轉場
- ❌ 均一級數的排版（沒有尺度落差就沒有編輯感）

## 十、頁面骨架範例

```html
<!-- 跑頭 -->
<div class="runhead"><div class="r">
  <span>SILLAGE · 餘香誌</span><span>ISSUE 05 — 霧與火</span><span>台北・迪化街</span>
</div></div>

<!-- 對開版（可見中縫） -->
<div class="pages">
  <div class="pg left"><p class="dropcap">首字放大的開場段落……</p></div>
  <div class="pg"><blockquote class="pullquote">一句拉頁引言。<cite>署名</cite></blockquote></div>
</div>

<!-- 氣味／規格金字塔 -->
<div class="pyramid">
  <div class="prow" role="button" tabindex="0" aria-expanded="false">
    <span class="tier">前調<b>TOP</b></span>
    <span class="notes"><em>佛手柑</em> · 粉紅胡椒 · 白葡萄柚</span>
  </div>
</div>
```

關鍵 CSS：

```css
.pages{display:grid;grid-template-columns:1fr 1fr}
.pages .pg.left{border-right:1px solid #3a332d}      /* 中縫 */
.dropcap::first-letter{font-family:'Playfair Display',serif;font-weight:900;
  font-size:4.1em;line-height:.72;float:left;padding:6px 12px 0 0;color:#8A3B2E}
.pullquote{font-family:'Playfair Display',serif;font-style:italic;
  border-left:2px solid #8A3B2E;padding-left:22px}
```

驗收標準：一個從未看過 SILLAGE 的 AI，只讀本 SKILL.md 就能做出風格一致（巨型襯線、對開中縫、跑頭頁碼、首字放大、金字塔）、但產業／內容完全不同的新網站。
