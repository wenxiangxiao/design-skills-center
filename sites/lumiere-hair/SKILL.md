---
name: hand-drawn-magazine-style
description: Build hand-drawn magazine-style websites with paper textures, SVG doodles, marker highlights, tilted polaroid frames, washi tape, and handwritten annotations.
---

# 手繪雜誌風網站 SKILL

這份文件是一套完整可複製的設計系統。任何 AI 或設計師照著做,就能為**全新的品牌與內容**做出同風格的網站。範例實作見同目錄的 `index.html`、`services.html`、`booking.html`。

## 1. 設計哲學

- **像一本被人翻爛的獨立雜誌**:每個版面都要有「人的痕跡」——貼歪的紙膠帶、畫過頭的螢光筆、旋轉的拍立得、頁邊的手寫註記。完美對齊是錯的,刻意的不完美才是對的。
- **紙是底、墨是主、螢光是重點**:整站是一張米色紙。文字用近黑的墨色,重點不用粗體堆疊,而是用「螢光筆劃過」與「手繪圈圈/底線」來標。
- **內容先寫成真的,再排版**:文案必須像真實店家/品牌會說的話——有具體地址、具體價格、具體人物、具體怪癖(「放鳥兩次會被記在小黑板上」)。禁止空話。
- **每個區塊只有一個視覺焦點**,其餘元素(塗鴉、便條、箭頭)都是配角,尺寸小、透明度可降。
- **單檔交付**:每頁一個 HTML,CSS/JS inline,圖像全部用行內 SVG 畫,外部資源只允許 Google Fonts。

## 2. 色彩系統

| 變數 | Hex | 用途 |
|---|---|---|
| `--paper` | `#f7f1e3` | 全站底色(米色紙) |
| `--paper2` | `#fffdf6` | 卡片、拍立得、表單紙(比底色亮一階) |
| `--ink` | `#33302b` | 文字、描邊、footer 底色(暖黑,不用純黑 #000) |
| `--coral` | `#e05a3a` | 主強調:CTA、描邊動畫、手寫英文、箭頭 |
| `--mustard` | `#eba937` | 次強調:底線塗鴉、陰影色塊、星星 |
| `--leaf` | `#5f7d54` | 插畫植物、成功狀態 |
| `--teal` | `#38726c` | 手寫註記文字、次要塗鴉 |
| `--hiy` | `rgba(255,228,80,.62)` | 黃色螢光筆(半透明必須) |
| `--hip` | `rgba(255,150,168,.45)` | 粉色螢光筆 |

輔助色(不設變數,直接用):紙膠帶黃 `rgba(238,210,138,.72)`、紙膠帶橘紅 `rgba(224,120,96,.4)`、便條紙黃 `#f3e4b8`、插畫底 `#efe6cf`、膚色 `#f5ddc4`。

規則:
- 底色永遠是紙色系,**禁止白底、禁止漸層底、尤其禁止紫藍漸層**。
- 彩色只出現在「強調與塗鴉」,正文永遠是 `--ink`。
- 螢光筆一定用半透明色,才有「畫在字上」的感覺。
- 換品牌時可替換 coral/mustard/leaf/teal 四色(例如咖啡店改成 espresso 棕+橄欖綠),但紙色+暖黑的骨架不變。

### 紙張質感(必備)

body 疊一層 SVG noise(data URI,無外部請求):

```css
body{
  background-color:var(--paper);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.18 0 0 0 0 0.15 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## 3. 字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Noto+Serif+TC:wght@500;700;900&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 規則 |
|---|---|---|
| 中文標題 | Noto Serif TC 900 | `clamp()` 流式字級:H1 `clamp(2.1rem,5vw,3.9rem)`、H2 `clamp(1.5rem,3.4vw,2.5rem)`;`letter-spacing:.04–.08em`;`line-height:1.3` |
| 中文內文 | Noto Serif TC 500 | `1rem/1.75`,段落寬度上限約 34em |
| 手寫英文/註記 | Caveat 500–700 | 只當「鉛筆註記」用:kicker、拍立得圖說、便條、價目吐槽。字級比同層中文大 20–35%(手寫字視覺偏小),常配 `transform:rotate(-2deg)` |
| 強調 | 螢光筆 `<mark>` | 不靠加粗,靠劃記 |

手寫體使用鐵則:**Caveat 只寫英文或極短句**,大段中文仍用 Noto Serif TC,否則會顯得廉價。中文的「手寫感」由旋轉角度與擺放位置營造。

## 4. 版面與網格

- 容器 `max-width:1100–1120px`,左右 padding 26px。
- **不對稱雙欄**是預設版型:`grid-template-columns: 1.15fr .85fr` 或 `.9fr 1.1fr`,兩欄用不同的 `margin-top` 錯位(20–60px)。
- **三欄禁止等寬等高**:`1.05fr .95fr 1fr` + 第二欄 `margin-top:52px`,且三個項目用三種不同容器(便條紙/手繪框/無框),打破「三張卡」模板。
- **旋轉角度範圍**:
  - 文字區塊、卡片:±0.6°–1.6°
  - 拍立得、便條:±2°–6°
  - 紙膠帶、標籤:±3°–6°(與宿主反向)
  - 同一排元素的角度必須交錯(-3°, +2°, -1.5°, +3°),再加不同的 `translateY` 錯位。
- 區塊間距 70–90px,不用分隔線;區塊之間可以用一條斜 1° 的跑馬燈色帶或波浪 SVG 換氣。
- 裝飾塗鴉用 `position:absolute` 疊在版面邊緣(圈圈套住標題一角、箭頭從文案指向圖),小尺寸、可被裁切,不佔文檔流。

## 5. 元件配方

### 手繪邊框(全站核心 trick)

不規則 border-radius 讓直線變「手畫的」:

```css
.wobbly{ border:2.5px solid var(--ink);
  border-radius:255px 18px 225px 18px / 18px 225px 18px 255px; }
```

### 導覽列

- `position:sticky` + 紙色底;捲動後才加陰影(JS toggle `.scrolled`)。
- 左:SVG logo + 中文店名(Serif 900)+ 下方一行 Caveat 英文名(rotate -2°)。
- 中右:文字連結,**hover 時底下一條 SVG 波浪線描邊畫出來**(見動效 6.2);當前頁 `aria-current` 直接顯示該線。
- 最右:一顆 wobbly 深色小按鈕當 CTA。
- header 底部不用 border,放一條手繪波浪 `<svg>`(`q30 -6 60 0 t60 0 ...` 重複)。

### 按鈕

```css
.btn{ font-weight:900; color:var(--paper2); background:var(--coral);
  padding:.75em 1.6em; border:2.5px solid var(--ink);
  border-radius:255px 18px 225px 18px/18px 225px 18px 255px;
  transform:rotate(-1.2deg); box-shadow:5px 5px 0 var(--ink); transition:.18s; }
.btn:hover{ transform:rotate(-1.2deg) translate(3px,3px); box-shadow:1px 1px 0 var(--ink); }
```

硬陰影(offset 純色,無 blur)+ hover 往陰影方向壓下去 = 印章手感。次要按鈕 `.ghost`:紙色底、mustard 陰影。

### 拍立得卡片

```html
<div class="pola" style="transform:rotate(-3deg)">
  <span class="tape"></span>
  <svg class="photo" viewBox="0 0 300 240"><!-- 原創插畫 --></svg>
  <span class="cap">Caveat 手寫圖說</span>
</div>
```

```css
.pola{ background:var(--paper2); padding:12px 12px 46px; /* 下緣特厚=拍立得 */
  box-shadow:0 8px 22px rgba(51,48,43,.18); position:relative; }
.tape{ position:absolute; width:92px; height:26px; top:-13px; left:50%;
  transform:translateX(-50%) rotate(-5deg);
  background:rgba(238,210,138,.72); box-shadow:0 1px 3px rgba(0,0,0,.12); }
```

hover(可點擊時):轉正 + 上浮 + 陰影加深。

### 紙膠帶區塊標籤(section tag)

Caveat 字 + 半透明黃底 + rotate(-3°),左右邊緣用 `clip-path: polygon(...)` 做鋸齒,模擬撕開的膠帶。

### 螢光筆

```css
mark{ background:transparent;
  background-image:linear-gradient(104deg,transparent 1%,var(--hiy) 6%,var(--hiy) 94%,transparent 99%);
  padding:0 .15em; -webkit-box-decoration-break:clone; box-decoration-break:clone; }
```

斜角漸層讓兩端有下筆/收筆的缺口;`box-decoration-break:clone` 讓換行也自然。

### 表單

- 表單整體是一張「紙」:`--paper2` 底 + 頂部紙膠帶 + rotate(-0.6°)。
- 輸入框全部 wobbly 邊框、紙色底;`:focus` 變白 + `box-shadow:3px 3px 0 var(--mustard)`。
- label:中文粗體 + 尾巴跟一個 Caveat 小英文(coral)。
- checkbox 做成「圖章 chip」:隱藏原生 input,label 用 wobbly 邊框,`:checked` 反白成墨色+coral 硬陰影+rotate(-1.5°)。
- 送出後顯示綠色虛線框手寫確認訊息(純前端示意要註明)。驗證失敗:欄位閃 coral 硬陰影,不用紅字轟炸。

### 價目表

不用 `<table>`,用 `<ul>` 每列 flex:

```html
<li><span class="mi-name"><b>品項</b><small>一句人話說明</small></span>
    <span class="mi-dots"></span><span class="mi-price">NT$ 1,600</span></li>
```

- 中間 `.mi-dots{flex:1;border-bottom:2px dotted}` 做菜單引導點。
- 列與列之間 1.5px 虛線;招牌品項名稱加 `<mark>`,旁邊放一個 rotate(-3°) 的 Caveat 吐槽(「最多人指定!」)。
- 每個分類是一張獨立的紙卡(rotate 交錯 + 紙膠帶),卡底加一條 mustard 左框線的備註。

### Footer

- 墨色(`--ink`)底 + 米白字;**上緣先放一條同色波浪 SVG**,讓紙「撕」進深色區。
- 欄位標題用 Caveat(coral);連結用虛線下框線,hover 變 mustard。
- 角落藏一顆線稿星星;版權列旁邊放一句 Caveat 品牌口頭禪。

## 6. 動效規則

全部走「紙上動畫」:短、有彈性、無炫技。缓動統一 `cubic-bezier(.2,.7,.2,1)`。

1. **進場(首屏)**:hero 子元素 `rise` keyframe(上移 26px + fade),0.12s 間隔 stagger,只做一次。
2. **手繪描邊(招牌動效)**:所有塗鴉線條(nav 底線、標題底線、箭頭)用 `stroke-dasharray` + `stroke-dashoffset` 從 0 畫到滿。hover 觸發用 transition,滾動觸發用 animation:
   ```css
   .rv-draw path{stroke-dasharray:var(--len,600);stroke-dashoffset:var(--len,600)}
   .rv-draw.in path{animation:draw 1.4s ease forwards .2s}
   @keyframes draw{to{stroke-dashoffset:0}}
   ```
3. **滾動觸發**:`IntersectionObserver`(threshold ~0.16)給 `.rv` 加 `.in`,元素從 `translateY(30px) rotate(.4deg)` 回正;觸發過就 `unobserve`,不重播。
4. **hover**:按鈕壓陰影、拍立得轉正上浮、chip 微浮。位移 2–6px 以內。
5. **循環動畫最多兩個**:如慢速自轉的星星(14s linear)、跑馬燈色帶(24–30s,內容複製一份做無縫)。
6. 不用視差、不用 blur 動畫、不用彈跳 3D。

## 7. 插畫與圖像風格

- **一律行內 SVG 手繪**,禁止外部圖片、icon font、emoji。
- 線稿規則:描邊 `--ink` 2.5–3px、`stroke-linecap:round`;路徑多用 `q`(二次貝茲)帶一點歪斜,**不許用完美的 rect/circle 當主角**(圓要用 `q` 拼出來的「歪圓」)。
- 上色:大色塊平塗(coral/leaf/teal/mustard + 膚色),不打漸層、不打陰影;高光用一條白色粗短弧線。
- 場景插畫(放進拍立得):底色 `#efe6cf` + 底部一條深一階的地面色帶,主體 2–3 件(理髮椅+鏡子+植物),角落撒 2–3 筆 mustard 小線條當「空氣感」。
- 人物頭像:歪圓臉 + 大色塊頭髮(用髮型和髮色區分角色)+ 極簡五官(兩點/兩弧眼 + 一條微笑線)+ 半透明 coral 腮紅。同一套模板換髮型,全員風格才一致。
- 手繪地圖:路=粗淺褐色帶 + 兩側細墨線;地標=歪方塊小房子;路線=coral 虛線;目的地=mustard 星星 + Caveat「we are here!」;再加一個手繪指北針。
- 塗鴉庫(隨處可用):雙筆觸圈圈、波浪底線、轉彎箭頭(帶開叉箭頭頭)、五角線稿星、三短線「閃光」。

## 8. Logo 與 Favicon 設計指南

- **Logo 結構**:手繪圖記(雙筆觸歪圓 + 品牌隱喻元素)+ 中文字標(Noto Serif TC 900、letter-spacing 加寬)+ Caveat 英文名(rotate -1~-2°)+ 一條螢光筆底線壓在中文字標下。存成獨立 `assets/logo.svg`,nav 內用簡化版(只留圖記)。
- 圖記要「一個圓 + 兩個品牌元素」以內:本例=太陽圈(光)+ 葉子(合成)+ 剪刀(髮室)。換品牌就換元素,構圖不變。
- **Favicon**:32×32 viewBox 重畫極簡版(不是縮小 logo):一個粗描邊色塊主體 + 一個配角元素,線寬 ≥1.8。以 URL-encoded data URI 直接寫進 `<head>`(`#` 要編碼成 `%23`):

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E...%3C/svg%3E">
```

## 9. Do & Don't

**Do**
- 紙色底 + 暖黑墨字 + 半透明螢光筆。
- 每個旋轉都交錯方向;每組卡片都錯位。
- 重點用 `<mark>` 和手繪圈線,說明用 Caveat 小註記。
- 硬陰影(offset 純色無 blur)。
- 文案寫具體的人、價、地址、小怪癖;繁體中文為主,英文只當裝飾。
- 每頁單檔、行內 SVG、`prefers reduced` 心態:動效短而少。

**Don't**
- 紫藍漸層、玻璃擬態、純白底、大圓角陰影卡片流水線(rounded-2xl 症候群)。
- 「置中大標+副標+兩顆按鈕+三張等寬卡」的 AI 模板版型。
- emoji 當 icon;Lorem ipsum;「歡迎來到我們的網站」式 AI 腔文案。
- 手寫體排大段中文;超過 ±6° 的旋轉(會像出車禍);blur 柔陰影。
- 外部圖片、placeholder 圖、icon CDN。

## 10. 頁面骨架範例(可直接使用)

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>頁名｜品牌名</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='17' r='10' fill='%23ffe46b' stroke='%2333302b' stroke-width='1.8'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Noto+Serif+TC:wght@500;700;900&display=swap" rel="stylesheet">
<style>
:root{--paper:#f7f1e3;--paper2:#fffdf6;--ink:#33302b;--coral:#e05a3a;
  --mustard:#eba937;--leaf:#5f7d54;--teal:#38726c;--hiy:rgba(255,228,80,.62)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Serif TC',serif;color:var(--ink);line-height:1.75;
  background-color:var(--paper);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.18 0 0 0 0 0.15 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")}
.hand{font-family:'Caveat',cursive}
.wrap{max-width:1120px;margin:0 auto;padding:0 26px}
mark{background:transparent;padding:0 .15em;background-image:linear-gradient(104deg,transparent 1%,var(--hiy) 6%,var(--hiy) 94%,transparent 99%);box-decoration-break:clone;-webkit-box-decoration-break:clone}
.btn{display:inline-block;font-weight:900;letter-spacing:.1em;color:var(--paper2);background:var(--coral);padding:.75em 1.6em;border:2.5px solid var(--ink);border-radius:255px 18px 225px 18px/18px 225px 18px 255px;text-decoration:none;transform:rotate(-1.2deg);box-shadow:5px 5px 0 var(--ink);transition:.18s}
.btn:hover{transform:rotate(-1.2deg) translate(3px,3px);box-shadow:1px 1px 0 var(--ink)}
.nlink{position:relative;text-decoration:none;font-weight:700;color:var(--ink)}
.nlink svg{position:absolute;left:-5px;bottom:-7px;width:calc(100% + 10px);height:12px;overflow:visible}
.nlink svg path{fill:none;stroke:var(--coral);stroke-width:3;stroke-linecap:round;stroke-dasharray:150;stroke-dashoffset:150;transition:stroke-dashoffset .45s}
.nlink:hover svg path{stroke-dashoffset:0}
.pola{background:var(--paper2);padding:12px 12px 46px;box-shadow:0 8px 22px rgba(51,48,43,.18);position:relative;transform:rotate(-3deg)}
.tape{position:absolute;width:92px;height:26px;background:rgba(238,210,138,.72);top:-13px;left:50%;transform:translateX(-50%) rotate(-5deg)}
@keyframes rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.rise{animation:rise .8s cubic-bezier(.2,.7,.2,1) both}
.rv{opacity:0;transform:translateY(30px);transition:.75s cubic-bezier(.2,.7,.2,1)}
.rv.in{opacity:1;transform:none}
</style>
</head>
<body>
<header style="position:sticky;top:0;background:var(--paper);z-index:80">
  <nav class="wrap" style="display:flex;align-items:center;gap:24px;padding:12px 26px">
    <a href="index.html" style="font-weight:900;text-decoration:none;letter-spacing:.12em">品牌名
      <span class="hand" style="display:block;color:var(--coral);font-size:1rem;transform:rotate(-2deg)">Brand EN</span></a>
    <div style="margin-left:auto;display:flex;gap:26px;align-items:center">
      <a class="nlink" href="index.html">首頁<svg viewBox="0 0 80 12" preserveAspectRatio="none"><path d="M2 8 q20 -6 38 -2 q20 4 38 -1"/></svg></a>
      <a class="btn" style="font-size:.9rem;padding:.45em 1.1em" href="booking.html">CTA</a>
    </div>
  </nav>
  <svg style="display:block;width:100%;height:10px" viewBox="0 0 1200 10" preserveAspectRatio="none"><path d="M0 5 q30 -6 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#33302b" stroke-width="2"/></svg>
</header>

<main>
  <section class="wrap" style="display:grid;grid-template-columns:1.15fr .85fr;gap:40px;padding:56px 26px">
    <div>
      <span class="hand rise" style="color:var(--coral);font-size:1.6rem;transform:rotate(-2deg);display:inline-block">kicker in English</span>
      <h1 class="rise" style="font-size:clamp(2.3rem,5.6vw,3.9rem);line-height:1.28;animation-delay:.12s">大標題,<mark>重點劃螢光筆</mark>。</h1>
      <p class="rise" style="max-width:30em;animation-delay:.26s">具體、有人味的品牌文案。</p>
      <a class="btn rise" style="animation-delay:.4s;margin-top:24px" href="booking.html">主要 CTA</a>
    </div>
    <div class="pola rise" style="animation-delay:.26s"><span class="tape"></span>
      <svg viewBox="0 0 300 240" style="display:block;width:100%;background:#efe6cf"><!-- 原創插畫 --></svg>
      <span class="hand" style="position:absolute;left:0;right:0;bottom:8px;text-align:center;font-size:1.35rem">手寫圖說</span>
    </div>
  </section>
  <section class="wrap rv" style="padding:80px 26px"><!-- 下一區塊 --></section>
</main>

<svg style="display:block;width:100%;height:16px;margin-bottom:-2px" viewBox="0 0 1200 16" preserveAspectRatio="none"><path d="M0 16 L0 8 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 L1200 16 z" fill="#33302b"/></svg>
<footer style="background:var(--ink);color:#efe8d8;padding:56px 0 34px">
  <div class="wrap">地址・營業時間・頁面連結・<span class="hand" style="color:var(--mustard)">a handwritten motto.</span></div>
</footer>

<script>
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.16});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
</script>
</body>
</html>
```

RWD 收尾:`@media (max-width:900px)` 所有多欄 grid 收成單欄、錯位 margin 歸零;`@media (max-width:560px)` nav 允許換行、卡片 padding 縮小、拍立得置中。
