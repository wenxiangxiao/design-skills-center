---
name: latex-pop
description: A high-key party-craft visual language of glossy inflated latex forms on matte pastel grounds, where objects are drawn as fat round-capped balloon segments with a specular streak and a single hard contact shadow — never a soft blurry card.
---

# 乳膠糖果風 Latex-Pop

> 一套從「造型氣球攤子」長出來的視覺語言：所有圖像都是**充飽氣的乳膠節**——用圓頭粗線段畫出來的一顆顆氣球，帶一道白色反光、底下墊一條**硬邊**的接地影子。底色是霧面的粉丁香紫、墨是柔和的葡萄黑，配上桃紅、薄荷、鵝黃、天藍四顆糖果色，每一顆只在對的地方出現。整體氣質是「派對現場」而不是「AI 生成的可愛」：圓，但圓得有重量、有反光、有一點手作的歪。

這套風格刻意閃開一般 pastel 設計最常見的 AI 味——柔和的模糊陰影卡片、置中大標配兩顆按鈕、萬用漸層。它用的是**充氣物件的物理**：反光、接地影、扭結、鼓脹。

---

## 一、設計哲學

三個信念撐起這套風格：

1. **圓要有重量。** 圓角不是為了「柔和」，而是因為氣球本來就是圓的。所有圓角都來自「這是一個充了氣的東西」，因此一定伴隨一道**高光反光**和一條**硬邊接地影**——沒有這兩樣，圓角就退化成廉價的 rounded-2xl。
2. **顏色是狀態，不是裝飾。** 桃紅／薄荷／鵝黃／天藍四色各有語意（現用、正向、焦點、資訊），不當背景大面積亂鋪。底永遠是霧面粉紫，讓糖果色像真的氣球一樣「浮」在派對牆前面。
3. **手作的歪比對齊的完美可信。** 版面刻意不置中、不對稱；插圖的氣球節角度是程序亂數決定的、不是描摹的乾淨線。要的是「攤子上林恬隨手扭的那隻」，不是「印刷品」。

---

## 二、色彩系統

| 色票 | Hex | 角色 | 大約比例 |
|---|---|---|---|
| 粉丁香底 | `#EEE6F5` | 全站霧面地色（派對牆） | ~50% |
| 丁香面板 | `#E4D9F0` | 次級面板、nav 底、標籤底 | ~12% |
| 亮面板 | `#F7F2FB` | 卡片／輸入框底（比地色更亮一階） | ~14% |
| 葡萄墨 | `#3A2E46` | 文字、3px 描邊、接地影邊 | ~10% |
| 葡萄墨2 | `#5A4A6B` | 次要文字、mono 標籤 | — |
| 桃紅乳膠 | `#FF7FA6` | 現用態／主要行動／重點 | ~5% |
| 薄荷乳膠 | `#66CFB0` | 正向／完成／進度 | ~3% |
| 鵝黃乳膠 | `#FFC24B` | 焦點／被選中／打氣鈕 | ~3% |
| 天藍乳膠 | `#88C4F0` | 資訊／篩選選中 | ~2% |
| 葡萄紫乳膠 | `#B98BE0` | 第五顆氣球色、命名彩蛋 | <2% |

**規則**：底色（粉丁香 `#EEE6F5`）是唯一的大面積色，其餘糖果色加起來不超過 ~15%。深色 `#3A2E46` 只用在描邊與文字，**絕不**當底色（這不是深色風）。四顆糖果色不要在同一個元件上同時出現超過兩顆。

---

## 三、字體系統

- **展示字（拉丁／數字／標題）**：`Baloo 2`（Google Fonts）。字重 700／800。它的圓頭與飽滿字腔呼應充氣感，用在 h1–h3、按鈕、品牌字、難度星、數字。
- **內文（中文為主）**：`Noto Sans TC`。400／500 內文、700 小標、900 保留給少數需要力量的中文大標。
- **等寬（標籤／價目／代碼／留位號）**：`DM Mono` 400／500，`letter-spacing:.1–.14em`、常配 `text-transform:uppercase`。價目、cm 數值、留位號一律走 mono，做出「收據 / 標籤機」的手感。

字級 scale（桌機）：h1 `clamp(28px,4.6vw,50px)`；h2 `24–26px`；h3 `17–20px`；內文 `16px`／行高 `1.75`；mono 標籤 `11px`。中文標題行高壓到 `1.12–1.16`。

---

## 四、版面與網格

- **容器**：`max-width:1080px`（圖鑑／首頁）、`720–820px`（表單／長文）。左右 padding 20px。
- **不置中原則**：hero 用左右不等分 grid（`1.15fr .85fr`），左邊是可操作的物件（打氣筒／工作台）、右邊才是標題文案。**不要**做「置中大標＋副標＋兩顆按鈕」。
- **卡片牆**：圖鑑 4 欄（900px→3 欄、640px→2 欄、400px→1 欄）。
- **邊框即結構**：所有容器用 `3px solid #3A2E46` 實線描邊、`border-radius:14–24px`。**不用**模糊陰影分層，改用實色描邊 + 單一硬偏移。
- **留白**：中等密度。區塊間距 `30–34px`，卡片內距 `12–20px`。
- 底部固定導覽佔 78px，body 需 `padding-bottom:78px`。

---

## 五、元件配方

**接地影（本風格的簽名細節，務必到位）**：任何「浮在牆前」的圓形物件，底下墊一條**不模糊**的橢圓或偏移實色，例：`box-shadow:3px 3px 0 #3A2E46`（硬偏移，非 blur），或 SVG 內 `<ellipse fill="#E0D4EE">` 當接地影。**禁止** `filter:blur()` 的柔和投影。

**按鈕**：
```css
.btn{font-family:'Baloo 2';font-weight:800;border:3px solid #3A2E46;border-radius:14px;
  background:#FF7FA6;color:#fff;padding:11px 20px;box-shadow:3px 3px 0 #3A2E46;
  transition:transform .08s, box-shadow .08s;cursor:pointer}
.btn:active{transform:translate(3px,3px);box-shadow:0 0 0 #3A2E46} /* 按下去像壓扁一顆氣球 */
```
主行動用桃紅、打氣／焦點用鵝黃、次要用亮面板底。

**膠囊晶片（chip / 標籤）**：`border:2.5px solid #3A2E46;border-radius:30px;` 選中態換糖果色底。分類用薄荷、難度用鵝黃、一般用天藍。

**卡片**：`background:#F7F2FB;border:3px solid #3A2E46;border-radius:18px;padding:16px`。角落標籤用膠囊晶片絕對定位在右上。

**輸入框**：`border:2.5px solid #3A2E46;border-radius:12px`，`:focus` 用 `outline:3px solid #88C4F0`。錯誤訊息桃紅／`#C0392B`、`min-height` 預留避免跳動。

**導覽（bottom balloon dock）**：固定底部，4 頁做成 4 顆「氣球節」膠囊，每顆前面一個小圓點（未選鵝黃、現用白）。現用態 `background:#FF7FA6;color:#fff;transform:scale(1.08)`——像被捏亮的那一節。≤560px 隱藏英文小標。頁尾另備完整文字連結保底。

**footer**：唯一的深色區塊（`#3A2E46` 底、淺紫字），與全站的亮調形成收束。含建置模型尾註。

---

## 六、動效規則

克制。派對感來自顏色與造型，不是滿場亂動。

- **按壓**：按鈕 `:active` 用 `translate(3px,3px)` + 移除硬影，`.08s`，模擬壓扁一顆氣球。
- **現用態放大**：nav 現用節 `transform:scale(1.08)`，`.12s ease`。
- **打氣**：hero 氣球長度由 JS 改 SVG path 即時重繪（跟著滑桿／按鈕走），不是自動播放的動畫。
- **物件生成**：造型一節一節「出現」用資料變化（`stepIdx` 增加後重繪）承載，不做逐一淡入。
- **爆破**：失敗時直接畫出「啵！」文字並停止，是狀態回饋不是特效。
- **禁止**：跑馬燈／marquee、自動輪播、視差、`stroke-dashoffset` 描繪、數字滾動計數、通用淡入當主打。
- `prefers-reduced-motion` 下：關閉所有 transition 與 `setTimeout` 動畫序列（示範改為瞬間完成），所有邏輯與可讀性不受影響。

---

## 七、插畫與圖像風格（balloon-segment 氣球節構圖）

**核心技法**：畫面上的每一個「圖」都是氣球節，不是描線稿也不是自由色塊。一顆氣球節 = 一條 **round-cap 粗線段**：

```
先畫深墨底線（stroke #3A2E46, 較粗 = girth+5, linecap round）
再疊糖果色線（stroke 糖果色, girth, linecap round）
起點附近點一顆白色小圓當反光（opacity .75）
```

- 多節相接組成造型：狗＝鼻+耳(鎖)+脖+前腳(鎖)+身+後腳(鎖)+尾；圈（耳朵／腿／花瓣）＝線段回到共用端點。
- **girth 隨氣球節大小變**（小 0.78 / 中 1 / 大 1.26），所以「扭太大」的節會明顯變胖。
- 圖鑑縮圖用**種子亂數**（名稱雜湊）生成幾節不同角度的氣球，保證每格不同、且是程序生成而非外部圖片。
- 與 `flat-shape` 無描邊色塊的差別：氣球節一定有 girth（粗度）、反光與扭點，是「有厚度的充氣物」而非平面色塊。
- 與 `thin-lineart` 的差別：這裡沒有等寬細描線，全是**粗圓段**，線本身就是體積。

---

## 八、Logo 與 Favicon 設計指南

- **Logo**：四顆不同色、不同大小、互相重疊的氣球節叢集（桃紅最大在左下，薄荷／鵝黃／天藍圍上去），每顆 `3px` 墨描邊、點白反光，底下一段打結的線與一個小三角結。右接 `Baloo 2` 800 中文字＋`DM Mono` 英文副標。刻意不對齊工整，像手綁的一束。
- **Favicon**：同一束氣球叢集塞進 32×32 圓角方（`rx:8`）粉紫底，去掉線與文字，留 3–4 顆彩色圓＋白反光點。用 inline SVG data URI 寫在 `<head>`，不引外部檔。

---

## 九、Do & Don't

**Do**
- 底色永遠霧面粉丁香紫，糖果色點綴不超過 ~15%。
- 每個浮起的圓物件都要有反光 + 硬接地影。
- 圖像一律用氣球節（粗圓段）畫，程序生成、零外部圖片。
- 文案用具體、帶點嘴砲的口語（「扭太緊會爆給你看」），有真實店名、地址、電話、價目、營業時間。
- 版面不對稱，hero 左邊放可操作的物件。

**Don't（去AI化禁令）**
- ✗ 紫藍漸層 hero、任何萬用漸層。
- ✗ 模糊柔和的 drop-shadow 卡片（本風格的陰影一律硬邊實色）。
- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片模板。
- ✗ emoji 當 icon 或裝飾圖形（所有 icon 與圖形一律自繪 SVG；情緒回饋用文字「啵！」或 SVG 氣球，不用 emoji）。
- ✗ 跑馬燈、自動輪播、數字滾動、dashoffset 描繪當簽名。
- ✗ Lorem ipsum、「在當今快節奏的世界」這類 AI 腔。
- ✗ 深色 `#3A2E46` 當大面積底色（只描邊與文字）。

---

## 十、頁面骨架範例（可直接改用）

```html
<header class="top"><div class="wrap">
  <a class="brand" href="index.html">
    <svg width="40" height="34" viewBox="0 0 40 34"><!-- 氣球叢集 mark --></svg>
    <span><b>店名</b><span class="en">MONO SUBTITLE</span></span>
  </a>
  <div class="warn">營業時間<br>資料為虛構示意</div>
</div></header>

<main class="wrap">
  <!-- hero：左物件、右文案，不置中 -->
  <div class="lead" style="display:grid;grid-template-columns:1.15fr .85fr;gap:26px;align-items:end">
    <div class="interactive-object"><!-- 可操作的核心物件 --></div>
    <div class="pitch"><span class="tag">TAG</span><h1>具體的<span style="color:#FF7FA6">重點</span>句</h1><p>口語文案。</p></div>
  </div>
</main>

<!-- 底部氣球節導覽 -->
<nav class="knuckle"><div class="kn">
  <a href="index.html" aria-current="page"><span class="seg"><span class="dot"></span>頁名</span></a>
  <!-- ...其餘頁 -->
</div></nav>

<footer><!-- 唯一深色區塊 + 建置模型尾註 --></footer>
```

一個從未看過本 Demo 的 AI，只讀本檔就能替任何產業做出風格一致的 Latex-Pop 網站：霧面粉紫牆、糖果色氣球節、硬邊接地影、圓頭 Baloo 標題、mono 標籤、不對稱版面、克制動效。
