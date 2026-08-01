---
name: mineral-spectrum-relight
description: Spectral-rendition shop style where every colour is a 31-point reflectance curve integrated live against switchable illuminants — deep azurite ground, mineral-pigment accents, porcelain palette-dish motifs, dual-illuminant colour judging, and metameric hidden marks.
---

# 礦彩演色風 Mineral-Spectrum Relight

## 一、設計哲學

本風格的母題是**演色**：色彩不是資產，是「光 × 物 × 眼」三方積分的即時結果。整個網站被當成一間顏料舖來設計——礦物顏料的高飽和色、白瓷梅花碟、驗色的燈。三個不可妥協的原則：

1. **顏色沒有 hex，只有光譜。**任何出現在畫面上的色，其單一真相來源都是一條 400–700nm 的反射率曲線；hex 只是它在現用燈下被積分出來的樣。CSS 裡的色值全部是執行期寫入的變數。
2. **燈是全站的第一互動。**頁首常駐一排燈掣（至少含一個連續光源、一個暖色溫黑體、一個窄峰螢光），切燈時整站——底色、文字、色板、插圖、導覽——同場重演色，且跨頁生效。任何新頁面加入本站，第一件事是把自己的顏色接上演色引擎。
3. **同色異譜是站的靈魂，不是註腳。**至少要有一處「兩個此刻相同、換燈分裂的色」讓使用者親手戳破；判色的規則永遠是多光源的（單燈合格＝退件）。

## 二、色彩系統

以下 hex 為 **D65 之下的參考演色**（本風格中它們必須由光譜算出，不可寫死）：

| 名 | D65 參考 | 光譜配方（教學式） | 用途 | 比例 |
|---|---|---|---|---|
| 石青底 | `#22374b` | `0.028+0.075·gauss(λ,478,30)` | 全站底色（疊 7px 橫紋 2% 白） | ~45% |
| 檯面板 | `#2d4358` | `0.042+0.095·gauss(λ,478,32)` | 面板、卡片、圖底 | ~15% |
| 界線 | `#4d637c` | `0.10+0.15·gauss(λ,476,36)` | 1–2px 邊線 | 線用 |
| 胡粉紙 | `#f1f1ed` | `0.88−0.04·gauss(λ,430,40)` | 紙盒、亮字、瓷碟 | ~12% |
| 胡粉二 | `#e2e2dc` | `0.76−0.05·gauss(λ,435,45)` | 色板底、藏印底 | 局部 |
| 朱砂 | `#f6582d` | `0.05+0.82·sigm(λ,585,11)` | 主行動、印、必填 | ~5%，只給要緊事 |
| 藤黃金 | `#f8d02d` | `0.07+0.74·sigm(λ,517,16)` | 標籤、讀數、現用態 | ~4% |
| 石綠 | `#00a953` | `0.06+0.50·gauss(λ,522,36)+0.10·sigm(λ,682,22)` | 合格態、輔助 | 少量 |
| 墨 | `#3f3f3f` | 平坦 `0.05` | 紙上文字 | 文字用 |
| 藍灰 | `#8f9cab` | `0.30+0.12·gauss(λ,470,55)` | 次要文字 | 文字用 |

規則：無圓角（碟與孔例外——它們是圓的）；無漸層 hero；朱砂與藤黃不得同時大面積出現；深底上的彩色一律取礦物顏料的光譜，不可憑感覺調 hex。

## 三、字體系統

- 標題與正文：**Noto Serif TC**（900 標題／700 小標／500 正文），來源 Google Fonts。標題 `clamp(30px,4.6vw,52px)`，行高 1.3；正文 16px，行高 1.85。
- 數字、讀數、標籤、台羅記音：**IBM Plex Mono**（400–600）。凡是「儀器說的話」（ΔE、波長、價格、單號）一律 mono。
- 字距：標籤類 `letter-spacing:.3em` 起跳；品牌字 `.14em`。
- 直書：左緣固定欄以 `writing-mode:vertical-rl` 直書店號，字距 `.42em`。

## 四、版面與網格

- 桌機左緣 64px 固定直書欄（店號＋印記），主內容 `max-width:1060px` 置中，`padding:36px 22px`。
- 頁首 sticky：品牌左、燈掣右（`margin-left:auto`）。燈掣是一個帶 2px 邊框的儀表組，永遠可及。
- 導覽不佔橫列：右上固定一只 106px 梅花碟（SVG），四孔＝四頁；≤900px 時碟收起、換頁首下一列 chip 導覽，頁尾備完整連結。
- 區塊間距 58px，區塊以 `klabel`（mono 小標籤框）＋ serif 900 標題開場。
- 不對稱：雙欄格 `5fr/6fr` 或 `1.4fr/1fr`，禁止三張等寬圓角卡的模板構圖。

## 五、演色引擎標準配方（本風格的核心資產）

任何實作本風格的站，必須內建這支引擎（約 120 行，零函式庫）：

1. **取樣**：400–700nm、10nm 步、31 點。CIE 1931 2° 觀察者 x̄ȳz̄ 與 D65 用表列值（教學級即可，全表見本站 `fa.html`）。
2. **光源**：D65 表列；鎢絲以普朗克式 `S(λ)∝1/[λ⁵(e^(c₂/λT)−1)]`（T=2856K，560nm 歸一）；螢光以 435/545/612nm 三支高斯峰＋弱底合成。光源數可增，但至少一連續、一黑體、一窄峰。
3. **積分**：`X=kΣSRx̄`（k 令白 Y=100）→ sRGB 線性矩陣 → γ。順應鈕做 von Kries：XYZ 各除現用白點、乘回 D65 白點。
4. **混色**：單常數 Kubelka–Munk：`K/S=(1−R)²/2R`，加權相加後反解 R。顏料庫以 `sigm`（長波反射的紅黃系）與 `gauss`（帶通的青綠系）參數化。
5. **同色異譜對**：把光源×觀察者寫成 3×31 度量矩陣，Gram–Schmidt 正交化三列，任意擾動向量減去在三列上的投影即得「異譜黑」；`R₂=clamp(R₁+α·b)`。α 越大越易撞 0/1 邊界而洩底——把這件事做成 UI 讀數。
6. **全站重演色**：UI 色以 CSS 變數承載，`relight()` 重算全部變數＋登記元素（`regSpec(el,spec,prop)`），最後 `dispatchEvent('relight')` 讓 canvas 重繪。燈態存 sessionStorage 跨頁生效。變色過渡 `.5s ease`，`prefers-reduced-motion` 下移除。

## 六、元件配方

- **燈掣**：`border:2px solid line` 的橫列，內含 mono 小按鈕（各帶一粒代表燈色的圓點）；現用鈕反白（紙底墨字）；「順應」鈕虛線框、開啟時藤黃底。
- **梅花碟導覽**：SVG 白瓷圓碟＋四孔（孔內 fill 接引擎）；現用孔加金圈＋白色高光橢圓（濕的顏料）；碟下 mono 標示現頁名。
- **色板**：無圓角矩形，左上 mono 角標（半透明墨底白字）；比對用色板做左右對半。
- **ΔE 條**：`110px 標籤＋軌道＋讀數` 三欄格；軌道上 24% 處立一支金色門檻線（ΔE=3）；達標時條轉石綠。
- **紙盒**：`paperbox`——胡粉紙底、墨字、2px 邊線，用於店務、表格等「紙上的事」。
- **表單**：深底輸入框＋1px 邊線；錯誤訊息 mono 朱砂；送出鈕朱砂底白字 `letter-spacing:.28em`。
- **回執印記**：FNV-1a 雜湊 → 圓環＋16 位元刻痕＋兩粒由雜湊選出的顏料孔，全部走引擎上色——同單恆同印。

## 七、動效規則

- **換燈**是唯一的大動效：全站 `background-color/color/border-color` 過渡 `.5s ease`，一次、同場、不排隊。reduced-motion：瞬時切換，資訊零損失。
- 曲線圖不做進場動畫——它們是儀器讀數，不是表演。hover 只做邊線變金（`.15s`）。
- 禁止：視差、打字機、數字滾動計數、marquee、進場淡入接力。

## 八、插畫與圖像風格（spectral-swatch 光譜色票製圖）

全站不畫「描外形的插圖」。圖像語彙只有四種原語，且顏色一律出自引擎：

1. **色板**（大面積演色矩形，可對半、可四聯）；
2. **光譜曲線**（canvas 折線，座標軸 mono 標波長；目標虛線、使用者實線）;
3. **三燈演色格**（同一光譜在各燈下的並列小格——本風格的「證據圖」）；
4. **器物幾何**（梅花碟、印紋——方勝／回紋／雙錢等傳統幾何紋，stroke 走引擎色）。

## 九、Logo 與 Favicon 設計指南

Logo＝白瓷梅花碟俯視：外圓碟身（胡粉）＋四至五孔顏料（朱砂、石綠、藤黃、墨、石青）＋中孔「彩」字。Favicon 同構：32×32 深底＋圓碟＋四粒色點，inline SVG data URI。印章紅方塊（朱砂底白「彩」字）作輔助識別，用於直書欄與回執。

## 十、Do & Don't

**Do**：色彩一律由光譜算出；每個判色功能都給多光源讀數；台語語感（「目睭會予燈騙，光譜袂」）；價格具體到每兩；公式全公開並附教學簡化聲明。

**Don't**：寫死彩色 hex（違反本風格的存在理由）；紫藍漸層 hero；三等寬圓角卡；emoji icon；marquee；EST. 年份徽章；「在當今快節奏的世界」腔；外部圖片音檔（僅 Google Fonts 可外連）。

## 十一、頁面骨架範例

```html
<body>
<aside class="rail"><span class="vt">店號直書</span></aside>
<header class="top">
  <a class="brand" href="index.html"><b>店號</b><span>ROMANIZATION・地名</span></a>
  <div class="lsw"><span class="lab">燈</span>
    <button data-l="d65">日光</button><button data-l="a">鎢絲</button>
    <button data-l="f">省電</button><button id="adaptBtn" class="tog">順應</button></div>
</header>
<nav class="dish"><svg><!-- 梅花碟四孔，data-wpig 接引擎 --></svg></nav>
<main>
  <section><span class="klabel">標籤</span><h1>標題</h1>
    <div class="twinrow"><div class="tw" id="twA"></div><div class="tw" id="twB"></div></div>
  </section>
</main>
<footer>…（虛構聲明＋建置模型）</footer>
<script>/* 演色引擎（§五）→ regSpec 登記 → bootLight() */</script>
</body>
```

**驗收標準**：從未看過 Demo 的 AI 只讀本文件，做出的新站應該（a）切燈時整站同場換色、（b）至少一處親手可戳破的同色異譜、（c）所有彩色皆可回答「這是哪一條光譜」。
