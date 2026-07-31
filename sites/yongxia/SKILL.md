---
name: goa-tai-sequin
description: Taiwanese open-air opera stage aesthetic — peacock-teal ground, matte sequin gold, vermilion brush marks, scallop valance, vertical hun-pai boards, and dual-line "khiang-line" tone-melody counterpoint diagrams.
---

# 外台金蔥風 Goa-tai Sequin

## 一、設計哲學

這個風格來自台灣廟口外台歌仔戲棚：絨布繡帳、金蔥滾邊、後台粉牌、硃筆圈名。三條心法：

1. **金是布上的金，毋是螢幕的金。** 金色一律啞光（無 glow、無漸層發光），靠深色地烘托——戲服的金蔥是繡出來的，不是霓虹。
2. **字是主角。** 歌仔戲「依字行腔」，本風格「依字排版」：超大字重明體、直書元素、字距拉開；裝飾線條永遠在字的下位。
3. **規矩要看得見。** 界線用實線、標籤用小 mono、重要的事用硃紅圈起來——像戲班的粉牌與罰錢規矩，明明白白。

## 二、色彩系統

| 色票 | 用途 | 比例 |
|---|---|---|
| `#114B44` 孔雀青（stage） | 全站大面積地色，疊 7px 直紋 `repeating-linear-gradient(90deg, rgba(0,0,0,.045) 0 1px, transparent 1px 7px)` 模擬帳布織紋 | ~40% |
| `#082722` 墨青（deep） | 報頭、頁尾、圖表底、回執底 | ~20% |
| `#0D3B35`／`#0A332D` 面板青 | 卡片、桌面、表單 | ~14% |
| `#E9B84C` 織金（gold）＋ `#B98A2F` 舊銅（brass） | 主強調：粗線、框、按鈕、幕沿；brass 作次級框線與標籤 | ~14% |
| `#F2EAD8` 絹白（silk）＋ `#D8CBAE` 舊絹 | 內文與細線；舊絹作次級文字 | ~9% |
| `#E04A33` 硃砂（chu） | 只給「圈名、倒字、錯誤、印記」——硃筆才用的地方 | <3% |
| `#7FC7B8` 湖青（lake） | 羅馬字、mono 小標 | 點綴 |

**禁**：米白大底、紫藍漸層、發光金、粉彩。

## 三、字體系統

- 標題／內文：`Noto Serif TC`（900 標題、700 小標、400 內文）；標題 letter-spacing `.1em`–`.24em`。
- 羅馬字／編號／小標籤：`IBM Plex Mono`（400/600），字級 .5rem–.72rem，letter-spacing `.12em`–.35em`。
- 字級 scale：h2 1.7rem／h3 1.15–1.2rem／內文 .84–.92rem／mono 標籤 .58–.72rem。行高 1.75–1.8。
- 台文用漢字書寫、台羅置於 mono 小字，二者永遠成對出現。

## 四、版面與網格

- 主欄 max-width 1120px；**右側預留 128px 給粉牌導覽**（`padding: 34px 128px 40px 26px`），版面因此天生不對稱。
- 區塊間隔 44px；分區以 2px brass 上邊線＋帶狀標題（h3 左側 5px 金槓）。
- 直書元素（`writing-mode: vertical-rl`）至少出現於導覽與一處標籤，是本風格的識別。
- 無圓角（印記的圓與圈名的橢圓除外——那是「印」與「筆」，不是 UI）。陰影只用硬陰影 `6px 6px 0 rgba(0,0,0,.3)`。

## 五、元件配方

- **報頭 mast**：40px 腔線 logo 方章＋班名（900）＋右側兩行小語；下接**繡帳幕沿**——SVG scallop 波浪（金描邊、面板青填色）壓在 10px 舊銅槓下，全站每頁同一條。
- **粉牌導覽 hun-pai**：桌機 fixed 右上 96px 墨底（#0B120F）2px brass 框硬陰影；頁名直書 700、字距 .3em，下綴 mono 羅馬字；**現用頁以硃紅橢圓「圈名」**（border-radius 不規則 50%/46%…＋rotate(-4deg)），下掛「搬演中」小籤。≤900px 塌為底部四格橫列 sticky，頁尾另備完整連結。
- **按鈕**：金底墨字（主）／透明金框（次），字距 .14em–.2em，hover 換絹白底。禁用圓角與漸層。
- **表格**：1px brass 全框線、th 墨青底金字 mono。
- **表單**：墨青底輸入框、focus 金色 2px outline、錯誤訊息硃紅小字常駐佔位。
- **回執印記**：雙圓硃紅框＋內部七段腔線（種子 FNV-1a→mulberry32 決定性生成）＋「湧霞班記」四字。

## 六、動效規則

- 本風格**幾乎無自動動效**：無跑馬燈、無進場揭示、無視差。動的東西只有兩類——(1) 使用者按了才響的聲音；(2) hover 的邊框變色（無 transition 也可）。
- 聲音一律由使用者手勢啟動（`AudioContext` 於 click 內 resume），頁面載入靜止。
- `prefers-reduced-motion: reduce` 下全域 `transition/animation: none`；功能照常。

## 七、插畫與圖像風格：腔線對位製圖 khiang-line

全站唯一圖像語言。規格：

1. 底 `#082722`，五條 `#12433C` 水平格線＝五度制調值階（1 低～5 懸）。
2. **細絹白線（2px）＝聲調輪廓**（語言）；**粗織金線（4.4–5px、圓頭、上移 3–4px）＝旋律輪廓**（音樂）。粗細與明度分工不可對調——字是底、腔是面。
3. 兩線相逆處打一枚**硃紅空心圓（倒字結）**，stroke 2.6–3.4px。
4. 每格上方置該字（Noto Serif TC 13–15px 絹白舊色）。入聲字線段只畫 55% 長（短促）。
5. logo、favicon、曲調骨架圖、牌例圖版、回執印記全部由同一套規格輸出；印記版本把七段腔線收進雙圓硃紅框。

**禁**：細線幾何線描裝飾畫、與資料無關的插圖——畫面上每一條線都必須讀得出「哪個字、什麼調、什麼腔」。

## 八、Logo 與 Favicon

- Logo：brass 細框內，一粗金一細白兩條曲線交纏（旋律與聲調），交點打一枚硃紅圈；班名 900 明體壓在線上方。
- Favicon：inline SVG data URI——孔雀青方地＋金粗線與白細線交纏的極簡版。兩者同構，缺一線即不成立。

## 九、Do & Don't

**Do**：金屬啞光；硃紅只給筆與印；直書；台羅小字成對；表格陳列價目；規則寫明（罰錢、訂金、順延條款）；聲音手勢啟動。

**Don't**：紫藍漸層 hero；置中大標＋雙按鈕＋三卡模板；emoji icon；圓角卡片與模糊陰影；跑馬燈；「EST. 19xx」徽章；Lorem ipsum；AI 腔（「在當今快節奏的世界」）；發光霓虹金；自動播放聲音。

## 十、頁面骨架範例

```html
<header class="mast">
  <svg class="mark" viewBox="0 0 64 64"><!-- 金粗線＋白細線交纏 --></svg>
  <h1>班名<small>ROMANIZATION · PLACE</small></h1>
  <div class="slog">兩行小語<br><b>金字班訓</b></div>
</header>
<svg class="valance" viewBox="0 0 1200 44" preserveAspectRatio="none"><!-- 舊銅槓＋scallop 幕沿 --></svg>
<nav class="hunpai"><div class="hp-t">直書小題</div>
  <ul><li class="now"><a href="#" aria-current="page">頁名<small>MONO</small></a></li>…</ul>
</nav>
<main class="wrap"><!-- padding-right 128px，內容不對稱 -->
  <h2>大題 <span class="en">MONO SUBTITLE</span></h2>
  <section class="desk"><!-- 2px brass 框＋硬陰影＋左上金籤 --></section>
</main>
<footer><div class="cols"><!-- 三欄：班社／齣頭／請戲 --></div>
  <p class="fict">虛構聲明與簡化聲明</p></footer>
```

驗收：未看過 Demo 的 AI 只讀本文件，做出的新站應有——孔雀青織紋地、絹白明體大字、啞光金線、硃紅圈名的直書粉牌、scallop 幕沿、以及至少一張「兩線一結」的腔線圖。
