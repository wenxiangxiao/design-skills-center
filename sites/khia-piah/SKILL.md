---
name: swiss-new-wave-film-montage
description: Basel New Wave in its film-montage phase (Wolfgang Weingart, Kunstkredit posters, mid-1970s–1980s) — a page built as transparent film positives stacked on a light table, coarse enlarged halftone and line screens that overprint into moiré, staircase typesetting whose step is a real angle, heavy rules and reversed bars, and one variable grotesk pushed across its whole width axis.
---

# 瑞士新浪潮・膠片蒙太奇半身 Swiss New Wave — Film Montage

> 風格規格書。讀完它，你應該能替任何產業做出一個一眼看得出「這是 Weingart 七〇年代後期那種疊片海報」的網站。
> 本流派為既有設計史流派（型錄「當代網頁與品牌｜瑞士新浪潮 Swiss New Wave」），非自創。全館第 2 站：第 1 站 `qingtan` 是**鉛字規線半身**（Weingart 1960s–70s 初的排字實驗：極端字距、四階規線穿過字、單一方格被當面違反）；本站是**膠片蒙太奇半身**。

**血緣與參照**

- Wolfgang Weingart（1941–2021），1968 年起在巴塞爾設計學校（Allgemeine Gewerbeschule Basel）開進修課程，反對前任 Emil Ruder 那一套冷靜、匿名的瑞士秩序；他要學生「先學會規則，才能打破它」。
- 1970 年代中期起，他把重心從鉛字轉到**照相製版**：用製版相機（repro／PMT camera）把字與照片翻成正片，遮光片（rubylith／amberlith）刀切遮罩，再把多張正片與網點片疊在燈箱上曬版——「film montage combined with multilayered dot screens」。
- 代表作：巴塞爾各美術館每年委託的 **Kunstkredit** 年度購藏展海報（例：1976/77 Kunsthalle Basel 版，文字、幾何形與建築照片的拼貼；LACMA 藏 1982/83 版平版印刷）；宣言〈Is This Typography Worth Supporting, or Do We Live on the Moon?〉以多層字疊在色塊上。
- 查證來源：Palomar College〈Wolfgang Weingart〉（引 Armstrong《Graphic Design Theory》2009、Weingart《My Way to Typography》Lars Müller 2000、Design Quarterly no.130 1984）；V&A Collections O1155283〈Kunsthalle Basel Kunstkredit 76/77〉；LACMA collections object 207619。
- 為什麼長成這樣：在平版印刷時代，「疊」是唯一的合成方法。每一張正片只能是黑或透明，所以階調只能靠網點；兩張片疊在一起就一定會相乘（黑＋黑仍是黑，網點＋網點生出摩爾紋）；正片可以被手推動，所以「對不準」本身就是一種構圖手段。這套製程限制，就是本風格的五個特徵。

---

## 一、設計哲學

1. **頁面是燈箱，不是紙。** 背景是一張亮著的燈箱（或它的灰框），所有內容都是放在上面的透明片。片有邊、有定位孔、有膠帶。
2. **合成只有一種：相乘。** 片與片重疊時一律 `mix-blend-mode: multiply`。你不准用第三個色票去「畫」重疊處——那個顏色要由疊印自己生出來。
3. **秩序是一個角度。** 瑞士齊左＝90°；字開始爬樓梯，是因為某個真實的量把它推斜了（本站是岩壁的傾角）。階梯不是裝飾，是資料。
4. **照片永遠是網點。** 不放連續調圖片；任何圖像都先過一道粗網屏。
5. **一支 grotesk 撐完整個字寬軸。** 從 wdth 25 的極窄到 151 的極寬都在同一頁出現，而且差異要有理由。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是膠片蒙太奇了。

### 特徵 1｜疊片正片：片邊、定位孔、膠帶、相乘

```css
.table{background:#F3F2EA;border:14px solid #7F8B84;outline:2px solid #141414;outline-offset:-16px}
.film{position:absolute;mix-blend-mode:multiply;background:rgba(197,207,202,.22);border:1px solid rgba(20,20,20,.28)}
.film>.edge{position:absolute;inset:0 0 auto 0;height:16px;background:rgba(150,168,160,.42);border-bottom:1px solid rgba(20,20,20,.25)}
.film>.edge::before,.film>.edge::after{content:"";position:absolute;top:4px;width:8px;height:8px;border-radius:50%;background:#F3F2EA;box-shadow:0 0 0 1px rgba(20,20,20,.35)}
.film>.edge::before{left:10px}.film>.edge::after{right:10px}
.tape{position:absolute;width:54px;height:16px;background:rgba(233,223,168,.78);mix-blend-mode:multiply}
/* 遮光片：刀切多邊形；被切掉的字＝燈箱色（相乘後露出底下） */
.ruby{background:rgba(214,62,42,.9);clip-path:polygon(0 0,100% 0,100% 74%,86% 100%,0 100%,0 22%,6% 14%)}
.ruby p{color:#F3F2EA}
```
判準：每一張圖都說得出它在第幾張片上；任何兩張片重疊處都看得到相乘的第三色。

### 特徵 2｜放大網點 × 線網 = 摩爾紋

網點 45°、約 10 LPI（螢幕上一格 7–12px），面積∝階調；另一張片是 0° 直線網，兩者相疊、其中一張慢慢轉，就會生出會走的摩爾紋。

```js
// 一個 path 就是一張網點片
function htPath(w,h,cell,deg,tone){const a=deg*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),R=Math.hypot(w,h)/2+cell,d=[];
 for(let j=-R;j<R;j+=cell)for(let i=-R;i<R;i+=cell){const x=w/2+i*ca-j*sa,y=h/2+i*sa+j*ca;if(x<-cell||y<-cell||x>w+cell||y>h+cell)continue;
  const t=tone(x/w,y/h);if(t<=.02)continue;const r=cell*.6*Math.sqrt(Math.min(1.2,t));
  d.push(`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`);}return d.join('');}
```
```css
/* 無 JS 的備援網點 */
.ht{background-image:radial-gradient(circle,#141414 38%,transparent 41%);background-size:9px 9px}
/* 線網片慢轉：環境動效＝摩爾紋漂移 */
.lines-film{animation:drift 17s ease-in-out infinite alternate}@keyframes drift{from{rotate:-1.6deg}to{rotate:1.6deg}}
```

### 特徵 3｜階梯排字：每一級＝行高 × tan(角度 − 90°)

```css
@property --ang{syntax:'<number>';inherits:true;initial-value:110}
.stair{--t:calc((var(--ang) - 80) / 55);--step:calc(.82em * tan((var(--ang) - 90) * 1deg));
 --wd:calc(151 - var(--t) * 96);--wg:calc(280 + var(--t) * 620);line-height:.86;padding-left:.64em}
.stair .ln{display:block;white-space:nowrap;transform:translateX(calc(var(--i) * var(--step)));
 font-variation-settings:"wdth" var(--wd),"wght" var(--wg),"opsz" 144}
```
```html
<h1 class="stair" style="--ang:120"><span class="ln" style="--i:0">徛壁</span><span class="ln" style="--i:1">KHIĀ-</span><span class="ln" style="--i:2">PIAH</span></h1>
```
規則：角度越大，字越窄、越重、越往右退；90° 時全部齊左（＝瑞士國際主義）。字可以斷在詞中間（KHIĀ- / PIAH）。

### 特徵 4｜粗尺規條與反白條

```css
.r1{border-top:2px solid #141414}.r6{border-top:6px solid #141414}.r14{border-top:14px solid #141414}
.bar{display:inline-block;background:#141414;color:#F3F2EA;padding:.08em .4em .12em;font-variation-settings:"wdth" 130,"wght" 800}
.rot{writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;letter-spacing:.24em}
```
小字群組一律坐在尺上；一頁至少一條 14px 粗尺、一條直排小字。

### 特徵 5｜一支可變 grotesk 撐滿字寬軸

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap" rel="stylesheet">
```
```css
.price{font-variation-settings:"wdth" 25,"wght" 900,"opsz" 144}   /* 數字：極窄極黑 */
.tag{font-variation-settings:"wdth" 151,"wght" 900}               /* 標記：極寬 */
.lbl{font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-variation-settings:"wdth" 120,"wght" 600}
```
中文只用 Noto Sans TC 400／900，不加襯線、不加第三種字體。

---

## 三、色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 片基灰綠 base | `#AEB8B1` | 頁面地（燈箱關著的灰） | ~40% |
| 燈箱光 glow | `#F3F2EA` | 燈箱、卡片、被切掉的字 | ~25% |
| K 墨 | `#141414` | 網點、字、尺、反白條 | ~20% |
| 紅遮光片 ruby | `#D63E2A` | 刀切遮罩、強調、第二張路線片 | ~8% |
| 琥珀片 amber | `#E39B2D` | 線網、第三張片 | ~5% |
| 燈箱框 | `#7F8B84` | 14px 框 | 少量 |
| 片邊 | `rgba(150,168,160,.42)` | 正片上緣 | 少量 |

紅×琥珀、紅×網點相乘生出的暗紅褐，是**唯一合法的第三色**，不另立色票。零漸層（燈箱本身除外）、零模糊陰影、零發光。

## 四、字體系統

- 拉丁：Roboto Flex（Google Fonts，wdth 25–151、wght 100–1000、opsz 8–144）。
- 中文：Noto Sans TC 400／900。
- 字級：展示 clamp(46px, 8.6vw, 142px)／h2 clamp(40px,7vw,104px) 行高 .86／h3 22–30px／內文 16px 行高 1.45／標記 11–12px 字距 .14em。
- 數字一律 `font-variant-numeric: tabular-nums`。

## 五、版面與網格

- 左側固定階梯導覽，`main` 左留 11vw（≤176px）。
- 首屏是一張燈箱（16:10，手機 3:4），上面 4–5 張片以 % 絕對定位、互相交疊，至少一張片越過另一張。
- 內容區以粗尺起頭；小區塊以 `translateY(var(--i)*30px)` 排成階梯。
- 留白規則：片與片之間不留白——它們疊；區塊之間留 80–100px。
- 旋轉只有兩種：線網片 ±1.6°、直排小字 90°。其餘一律正交。

## 六、元件配方

- **導覽（stair-step-nav）**：每個連結 `transform: translateX(calc(var(--i) * 22px * tan((var(--ang) - 90) * 1deg)))`；現用頁改為 K 底反白、往左長到邊緣；hover 時 `wdth` 70→151（steps(3)）。≤760px 落為底部三等分。
- **按鈕**：K 底燈箱色字、零圓角，hover 換紅片色；次按鈕為 2px 內框。
- **卡片**：沒有卡片——只有「片」（`.film`）與「燈箱窗」（`.table`）。
- **表格／價目**：每列 `padding-left: calc(var(--i) * 1.4em * tan(11deg))` 形成緩階梯；價格 wdth 25／wght 900 右齊。
- **表單／選擇**：片架（直排的小正片按鈕，`aria-pressed`），被選中＝K 底反白。
- **頁尾**：14px 粗尺起頭、直排小字、極窄大字店名、6px 尺分欄。

## 七、動效規則

| 種類 | 本站實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 琥珀線網片 ±1.6° 慢轉，和 K 網點生出走動的摩爾紋 | 自動 | 17s ease-in-out alternate | 停在 0°，摩爾紋靜止仍可見 |
| input | 階梯字的游標近接：180px 內字母 wdth +48、wght +120；燈箱上每張片可 Pointer 拖曳、即時顯示總偏移 mm、「重新對位」420ms 回位 | pointermove／pointerdown | 即時（rAF） | 近接停用；拖曳仍可、回位無補間 |
| transition | 換頁時一張紅遮光片由左拉過全畫面（clip-path inset 380ms cubic-bezier(.7,0,.2,1)），下一頁由左向右抽走（520ms）；到站時每張片從未套準位置滑進定位（900ms，錯開 110ms） | 點站內連結／載入 | 見左 | 直接換頁、片直接在位 |
| signature | **傾角階梯字**：捲過四面牆時，scroll-driven animation 把 `--ang` 由 80°→90°→110°→135°（每面停一段），階梯的每一級位移、字寬、字重同步改變；垂直牆時全部齊左 | 捲動 | animation-timeline: view（contain 0%–100%） | 每面牆進視窗時直接切到該角度（IntersectionObserver），角度數字與牆名照樣顯示 |

自我限制：本站不用淡入當主打、不用跑馬燈、不用數字計數。

**motion-library 元件**（motion-library 1.x @36b8f8e，`MotionLib.prompt(id)` 可取得原始規格；嵌入：`node tools/ml-embed.js <ml>/src/motion-lib.js <IDs> 36b8f8e`，掛載照 ka-to 的包裝：fonts.ready 後掛、離屏 destroy、canvas aria-hidden、`.ml-fb` 保留 HTML 文字）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| BG-A-14 | Halftone Blob | 首頁燈箱「粉袋」片 | primary `#D63E2A`、secondary `#E39B2D`、bg `#F3F2EA`、duration 9、density .9、seed 420、1:1 | 一張會動的網點片：metaball 在固定網格上長縮網點，正是 Weingart 放大網點的語彙；放在片裡、multiply 疊在別張片上 | ambient |
| TXT-B-23 | Weight Grow | 首頁〈四面牆〉標題 | text「四面牆」、bg `#AEB8B1`（亮底→近黑字）、duration 1.6、loop:false | 字由細描邊長成粗黑——字重是本流派的變數，一次性播放 | transition |
| TXT-A-11 | Repeat Lines | 本週路線標題 | text「本週路線」、bg `#AEB8B1`、duration 2.2、loop:false | 同一行字重複描出、左右錯開後合成——像同一張字片被曬了好幾次 | transition |
| SHP-32 | Stairs Rise | 本週路線〈V0 TO V8〉 | primary `#141414`、secondary `#D63E2A`、bg `#F3F2EA`、duration 3.2、4:5 | 一級一級長高的方柱＝難度階梯，也是階梯排字的圖形版；零圓角零發光 | ambient |
| BG-B-04 | Halftone Sweep | 來館頁首帶 | primary `#D63E2A`、bg `#F3F2EA`、duration 8、seed 206、16:9 | 紅網點沿對角線一波波掃過燈箱，上面壓 multiply 的階梯字 | ambient |

元件不擔任 signature；同畫面同時運轉 ≤2。reduced-motion：背景 `seek(.35)`、文字 `seek(1)`。

## 八、插畫與圖像風格（film-montage-halftone 膠片蒙太奇網點）

全站零圖檔。圖像只有四種原語：
1. **網點片**：程序化「照片」（本站：岩牆的面板縫、T 型螺帽格、岩點與體積塊、頂光）→ 45° 粗網點，單一 path。
2. **線網片**：0° 直線網，線寬沿高度起伏。
3. **遮光片**：刀切多邊形（只有直線與 45° 切角），字被切成燈箱色。
4. **片的物件性**：片邊、兩個定位孔、膠帶、刻在片邊的小字說明（「K · 網點 45° · 10 LPI」）。

岩點是 7 點不規則多邊形（刀切），起點兩條短帶、終點一條橫帶——全是片上能刀切出來的形。

## 九、Logo 與 Favicon

四條 K 粗條排成往右下退的階梯（＝階梯排字的圖形）、右上一顆紅色刀切岩點（multiply）、底部 14px 粗尺。燈箱色底。favicon 為同一 SVG 的 data URI。不加字、不加圓角。

## 十、Do & Don't

**Do**：讓片真的疊；把角度寫成資料；網點要粗到看得見；字寬從 25 到 151 都用；小字坐在尺上。
**Don't**：紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡片、emoji icon、Lorem ipsum、EST. 徽章；連續調照片；第三個「疊印色」色票；soft shadow／glow；隨手亂歪（每一個偏移都要說得出原因：被拖了、被角度推了、或是片的套準誤差）。

## 十一、頁面骨架範例

```html
<nav class="stairnav" data-ang="120"><a href="index.html" style="--i:0" aria-current="page">01 WALLS<span>四面牆</span></a><a href="lines.html" style="--i:1">02 LINES<span>本週路線</span></a></nav>
<main>
 <header class="wrap"><div class="table" style="aspect-ratio:16/10;position:relative;overflow:hidden">
  <div class="film" style="left:3%;top:7%;width:55%;height:84%"><div class="edge"><b>K · 網點 45°</b></div><svg viewBox="0 0 600 640"><path d="…htPath…"/></svg></div>
  <div class="film" style="left:52%;top:6%;width:44%;height:50%"><div class="edge"><b>RUBY</b></div><div class="ruby"><p>每週三換一面牆</p></div></div>
  <div class="film" style="left:6%;top:12%"><div class="edge"><b>K · 字片</b></div><h1 class="stair" style="--ang:120"><span class="ln" style="--i:0">徛壁</span><span class="ln" style="--i:1">KHIĀ-</span></h1></div>
 </div></header>
 <section class="r14 wrap"><span class="lbl">今天</span><p>…</p></section>
</main>
<footer><span class="rot">KHIĀ-PIAH · KAOHSIUNG</span>…</footer>
```

---

## 十二、技術實作與相容性

| 技術 | 用在哪 | 支援現況（查證） | 不支援時 |
|---|---|---|---|
| CSS scroll-driven animations（`view-timeline`、`animation-timeline`、`animation-range: contain`）＋ `@property --ang` | signature：四面牆捲動時的傾角 | caniuse〈animation-timeline: view()〉（2026-09 資料）：Chrome／Edge 115+、Safari／iOS Safari 26.0+、Firefox 159+、Samsung 23+，全球約 88%。動畫包在 `@supports (animation-timeline: view())` 裡——否則 0 秒的動畫會以 fill:both 蓋掉 JS 寫的值 | JS 以同一張分段表 `[[0,80],[.08,80],[.25,90],[.41,90],[.58,110],[.75,110],[.92,135],[1,135]]` 依捲動比例寫 `--ang`；reduced-motion 時 IntersectionObserver 逐面切換 |
| `font-variation-settings`（Roboto Flex wdth／wght／opsz）＋CSS `tan()` | 特徵 3、5、input：字寬字重隨角度、游標近接撐寬 | Roboto Flex 軸範圍 wdth 25–151、wght 100–1000（Google Fonts CSS2 API；本館 gin-so 已實際使用同一 URL）；`font-variation-settings` 與 `tan()` 均為現行主流瀏覽器支援 | 字型未載入時退回 Noto Sans TC（無寬度軸，階梯位移仍在）；`tan()` 不支援時位移失效＝齊左，內容完整 |
| Pointer Events＋`setPointerCapture()` | 首頁拖片、本週路線片架→燈箱拖放 | MDN：`setPointerCapture()` Baseline Widely available（2020-07 起） | 片架按鈕可點選／Enter 加片；無 JS 時 `<noscript>` 顯示 12 條路線表 |

輔助：WAAPI（換頁紅片、片入位）、IntersectionObserver（元件掛卸）、sessionStorage（今晚的片帶回首頁）、URL `?f=` 還原、FNV-1a 代號。

**效能預算實測**（建置時 node 量測）：首頁網點片 5,000+ 點產生 15ms、四張剖面圖 16ms；三頁大小 index ≈ 267KB／lines ≈ 272KB／visit ≈ 257KB（含 motion-library 子集約 230KB），皆 ≤350KB。同畫面同時運轉的 motion-library 元件 ≤2。未能在本輪以實機瀏覽器量測 fps（排程環境無瀏覽器），已以 jsdom 跑過全部頁面腳本零錯誤。
