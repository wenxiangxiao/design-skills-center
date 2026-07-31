---
name: daymark-lightchar
description: Maritime daymark stripes and time-encoded light characters — identity lives in rhythm, bold enamel red/white bands by day, blinking timing engines by night.
---

# 航標日標風 Daymark Light-Character

## 設計哲學

海上的識別系統有兩套衣服：白天穿條紋（日標 daymark），晚上穿節奏（燈質 light character）。本風格把這兩套系統直接搬進網頁——大面積紅白橫帶承擔版面骨架與品牌識別，關鍵資訊則「藏進時間裡」：每個重要對象配一組明暗節奏，靠計時與比對才能讀出身分。這不是裝飾動畫：**節奏本身是內容**，拿掉閃爍就必須用時間條（timing diagram）把同一份資訊攤回空間，這也是本風格的無障礙降級策略。

三條硬原則：

1. **時間即編碼**：識別性資訊至少有一處以節奏承載（導覽現用態、對象身分、狀態指示）。閃爍必須用階躍（瞬亮瞬滅），不得淡入淡出——燈是開關，不是呼吸燈。
2. **語意用色**：黃＝燈光／點亮時間，紅白條帶＝日標／結構，墨＝夜海／儀器面。顏色不做氛圍用，做編碼用（紅光＝紅色燈、綠光＝綠色燈）。
3. **工程圖式**：插圖全部是「讀得出數據的圖」——構造圖帶尺寸標註、時間圖帶秒刻、光弧圖帶方位角。畫得漂亮但先要「查得到」。

## 色彩系統

| 色票 | 用途 | 比例 |
|---|---|---|
| `#C7331B` 航標朱 | 日標紅帶、頁首色帶、主按鈕、強調 | 25% |
| `#F4EEE1` 燈白 | 白晝區底色、日標白帶、反白文字 | 30% |
| `#101C26` 夜海墨 | 夜間面板、導覽、儀器區底 | 30% |
| `#FFD75C` 燈光黃 | 一切「亮」的東西：燈點、時間條亮段、通過態 | 8% |
| `#35707E` 海圖青 | 標註線、次要說明、海圖線稿 | 7% |

輔助：`#FF7A5C` 紅色燈光（紅光航標專用，與航標朱區分——one is paint, one is light）、`#26394A` 滅燈態、`#2C3E4E` 夜面板分隔線、`#1B2B39` hover 面板。禁止漸層當背景；夜海墨上文字用 `#B9C8D2`／`#8FA6B5` 兩階。

## 字體系統

- **Noto Sans TC**（Google Fonts）：400 內文／700 小標／900 標題與琺瑯站名板。標題字距 3–6px——公家路牌的鑄字感。
- **IBM Plex Mono**（Google Fonts）：400/600。所有「表列數據」一律用它：燈質記法、方位角、座標、編號、時間。燈質記法（`Fl(2) W 10s`）永遠 mono、永遠不翻譯進中文句子裡。
- 字級 scale：11 / 12.5 / 14 / 15 / 18 / 22–26 / clamp(24px,3.4vw,34px)。行高內文 1.75，標題 1.3。

## 版面與網格

- 內容寬 1080px 置中，左右 padding 24px。
- **橫帶結構**：頁面由整寬色帶（section）堆疊——墨帶（夜海／儀器）、朱帶（公告／站務）、白帶（表格／文件）交替，模擬日標條紋的節奏。相鄰帶用 3px 墨色實線或 6px 朱色實線分隔。
- 零圓角、零模糊陰影。立體感只允許「按鍵下壓」：border-bottom 6px→2px＋translateY(4px)。
- 資料表格用 2–3px 實線框、格線全畫（工程圖傳統），th 反白於墨底。
- 不對稱來自「琺瑯站名板」：導覽左側一塊朱底雙框站名板（inset box-shadow 做雙線琺瑯邊），其餘導覽是深色夜平線。

## 元件配方

- **導覽（燈列導覽）**：深墨橫帶，內含一條 1px 水平線（海平線）。每個頁面連結＝一盞燈點（13px 圓）＋頁名＋mono 燈質記法。各連結的燈依自己的燈質即時閃爍；**現用頁改掛定光 F（恆亮）並標注「F 定光（本頁）」**。導覽下緣掛一行右對齊 mono 小字說明規則。行動版（≤620px）攤成 2×2 格。頁尾必備完整文字連結保底。
- **燈點**：`span.ldot`，滅態 `#26394A`，亮態填燈色＋`box-shadow: 0 0 12px 3px 燈色`。切換用 class，無 transition（階躍）。
- **按鈕**：主按鈕朱底白字 900 字重字距 3px；亮色 CTA 用燈光黃底墨字外加 3px 墨框＋3px 黃色外框。跟按鍵類「實體鍵」用白底＋6px 灰褐 border-bottom，:active 時下壓。
- **卡片**：外框 3px 墨線的網格容器，內部卡 1px 墨線相接（共用邊線，不留縫），hover 換 `#EAE2D0` 底。不用陰影。
- **表單**：墨底輸入框 1px `#2C3E4E` 框，focus 框轉燈光黃。range 滑桿自訂 thumb 為黃色五邊形游標（方位環）。
- **footer**:墨底三欄＋6px 朱色頂線；最末一行 mono 免責聲明，前綴虛線分隔。

## 動效規則

- **燈質引擎（全站唯一動效主角）**：`requestAnimationFrame` 迴圈，`t=(performance.now()/1000)%period`，落在任一 `[on,off)` 區間即亮。閃光 0.7–0.8s、急閃 0.25s/0.5s 輪、明暗光明段 75%、等明暗各 50%。多盞燈共用同一時鐘（同一片海的同一個夜晚）。
- **prefers-reduced-motion**：所有閃爍停止，每盞燈原地換成等寬**燈質時間條**（SVG：墨底、黃亮段、秒刻），同一資訊改用空間長度呈現。互動挑戰改走「讀時間條→手動指認」路徑。這是語意等價降級，不是拿掉功能。
- 進場動畫、滾動視差、跑馬燈：一律不用。頁面本身是靜的，會動的只有燈。
- hover 只做底色階躍與邊框變色，duration 0（或 ≤120ms step）。

## 插畫與圖像風格（seamark-schema 航標圖式製圖）

一切圖像由三種工程圖式構成，全部 inline SVG：

1. **構造側視圖**：航標立面＝色塊堆疊（塔身橫帶、燈室、頂標），3px 墨描邊，旁邊必配青色虛線尺寸標註（燈高、頂標名）。地平線 3px 實線。
2. **時間圖 timing diagram**：墨底橫條，亮段為燈色矩形，底緣每秒一刻。這是本風格的「萬用插圖」——logo、印記、練習題、對照圖全是它的變體。圓形版（時間環）：週期映射 360°，亮段成弧——用於 logo 與合格證印記。
3. **海圖／光弧圖**：墨底、青色線稿海岸與淺堆斜線、黃色星形燈位符號、mono 標註。光弧圖以扇形半透明疊色（白弧/紅弧）。

禁止：描外形的裝飾線畫、與數據無關的「情境插圖」、任何外部圖片。

## Logo 與 Favicon 設計指南

- **Logo**：時間環包塔。外環＝站主燈的燈質環（如 Fl(2) W 10s→兩段 28.8° 黃弧＋秒刻），環心立紅白橫帶塔＋黃燈。墨底方形。
- **Favicon**：inline SVG data URI，32 視窗：墨底＋紅白四帶塔身＋黃色燈點。條帶要粗（4px/帶）才能在 16px 存活。

## Do & Don't

**Do**

- 燈質記法全站一致：`節奏(閃數) 顏色 週期`，mono 字體。
- 每個閃爍元素都要有非時間的替代表達（時間條、文字標注、aria-label）。
- 文案寫「值更人」的口吻：短句、口訣、帶鹽味的職人註記（「白是路，紅是牆」）。
- 虛構資料要具體到可查：燈高到小數、電池規格、巡檢日期、漆料編號。

**Don't**

- 不用紫藍漸層、不用置中大標 hero＋雙按鈕＋三卡模板、不用 emoji icon、不用圓角卡與模糊陰影。
- 閃爍不用 CSS transition/ease——燈是階躍的。
- 不把燈光黃當大面積底色（它是「光」，光一多就不稀罕）。
- 不用跑馬燈；資訊帶用靜態表格或色帶。
- 免責聲明不可省：涉航行安全題材必標「虛構示意，不得用於航行」。

## 頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>頁名｜機關名</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--red:#C7331B;--white:#F4EEE1;--ink:#101C26;--lamp:#FFD75C;--teal:#35707E;--line:#2C3E4E}
body{font-family:'Noto Sans TC',sans-serif;background:var(--white);color:var(--ink);line-height:1.75;margin:0}
.skyline{background:var(--ink);color:var(--white);border-bottom:6px solid var(--red);display:flex}
.plate{background:var(--red);color:var(--white);padding:14px 20px;font-weight:900;letter-spacing:4px;
  box-shadow:inset 0 0 0 3px var(--red),inset 0 0 0 5px var(--white);text-decoration:none}
.hz{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:12px 8px;text-decoration:none;color:inherit}
.ldot{width:13px;height:13px;border-radius:50%;background:#26394A}
.ldot.lit{background:var(--c,#FFD75C);box-shadow:0 0 12px 3px var(--c,#FFD75C)}
.band{padding:56px 0}.band.red{background:var(--red);color:var(--white)}
.band-inner{max-width:1080px;margin:0 auto;padding:0 24px}
</style>
</head>
<body>
<header class="skyline">
  <a class="plate" href="index.html">站名</a>
  <nav style="flex:1;display:flex">
    <a class="hz" href="index.html" aria-current="page"><span class="ldot lit" data-fixed="1"></span><b>本頁</b><i>F 定光</i></a>
    <a class="hz" href="page2.html"><span class="ldot" data-char="fl2"></span><b>頁二</b><i>Fl(2) W 10s</i></a>
  </nav>
</header>
<section class="band red"><div class="band-inner"><h2>朱帶區塊</h2></div></section>
<script>
const CHARS={fl2:{period:10,on:[[0,.8],[1.6,2.4]],c:"#FFD75C"}};
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function litAt(s,t){t=((t%s.period)+s.period)%s.period;return s.on.some(p=>t>=p[0]&&t<p[1]);}
if(!RM)(function loop(){const now=performance.now()/1000;
  document.querySelectorAll('.ldot[data-char]').forEach(el=>{
    const s=CHARS[el.dataset.char];if(s)el.classList.toggle('lit',litAt(s,now));});
  requestAnimationFrame(loop);})();
/* RM 時：把每個 .ldot[data-char] 換成等寬 SVG 時間條（墨底黃亮段＋秒刻） */
</script>
</body>
</html>
```

驗收：一個沒看過 Demo 的 AI 讀完本文件，應能做出「識別資訊以節奏編碼＋紅白日標條帶骨架＋工程圖式插圖」三位一體的新站，且 reduced-motion 下資訊零損失。
