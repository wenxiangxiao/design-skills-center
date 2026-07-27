---
name: bakelite-switchboard
description: A 1960s manual telephone-exchange style built around a jackfield-panel engine and a real-time patch-cord routing game; a two-domain duotone of ivory bakelite and oxblood red with thin brass detailing, amber line lamps, DM Mono line numbers, and an Oswald equipment-plate voice.
---

# 電木總機風 Bakelite-Switchboard

## 一、設計哲學

這個風格從一個動作長出來：**一支塞頭插進一個孔，一通電話就成立了。** 人工電話交換所沒有畫面、沒有提示音，只有一牆塞孔、一排指示燈、一擱架塞繩。全部的樂趣與焦慮都在「認孔、拉線、扳鈴、拆線」這四拍裡。因此本風格要做的，是把那股電木面板的沉、黃銅零件的亮、與塞繩台的手感，糊成一座能親手拉的操作台。

三個信念：

1. **面板即插畫。** 不畫外形，只畫機件。所有圖像都是同一支面板引擎照座標畫出來的塞孔、塞繩、燈與鍵——連 logo 與 favicon 都是。畫成一張「照片般的插圖」就退化了。
2. **狀態寫在燈與繩上。** 資訊不靠文字堆疊，靠燈號顏色（來話／占線／通話／待拆線）與塞繩的走向表達。使用者是用眼睛掃燈、用手指認孔。
3. **雙色域，不是深色。** 象牙電木與血牛津紅是兩塊都很大的地色，黃銅只做細線。避免落進「暗底＋量表」的儀器台公式——這是一座溫暖的操作台，不是一台冷儀器。

## 二、色彩系統

| 用途 | Hex | 佔比 | 說明 |
|---|---|---|---|
| 象牙電木 ivory（面板、卡片、亮面） | `#E7DCC4` | ~40% | 主地色之一；面板底、擱架標牌 |
| 象牙亮 ivory-2 | `#EFE7D3` | ~10% | 面板內襯、卡片 |
| 血牛津紅 oxblood（刊頭、側桿、footer、深件） | `#6E1D22` | ~24% | 第二地色域；標題帶、導覽底 |
| 牛津紅深 ox-d | `#571317` | ~2% | 陰影／描影 |
| 墨 ink（字、輪廓、3px 描邊） | `#201613` | ~10% | 全站描線與內文 |
| 黃銅 brass（塞頭尖、鍵框、細分隔） | `#C7A24A` | ~7% | 只做細線與金屬件，不做大面積 |
| 紙牌 paper（號簿標牌、便條） | `#DCCEAF` | ~4% | 訂戶標牌底 |
| 琥珀 amber（來話燈、待拆線燈） | `#E8A33D` | 作用 | 唯一暖訊號燈 |
| 銅綠 verd（通話中／確認態） | `#5E7F63` | 作用 | 通話與成功回饋 |
| 警示紅 | `#E24A2E` | 作用 | 振鈴中／誤接 |

比例守則：象牙與牛津紅兩塊地色都要「夠大」才成雙色域；黃銅永遠是線不是面；燈色（琥珀／銅綠／警示紅）只點在圓形燈上，不外溢成面積。**禁止**把牛津紅壓成幾乎全黑的暗底——那會退化成深色儀器台。

## 三、字體系統

- **標題（中文）**：`Noto Serif TC` 900／700。刊頭大標 900、區塊標題 900、機件名 700。字距 `.06em`。
- **英文設備牌／標籤**：`Oswald` 600／500，`text-transform:uppercase`，字距 `.12–.32em`。用於 sub 標語、區塊 tag、footer 品牌、按鈕。像壓在機殼上的琺瑯銘牌。
- **號碼／讀數／時鐘**：`DM Mono` 400/500。所有門號、報名序號、計時、統計數字一律 mono——這是「總機的字」。
- 字級 scale（桌機）：刊頭 h1 `clamp(22px,3.4vw,34px)`；區塊 h2 `clamp(18px,2.4vw,25px)`；內文 15–16px／行高 1.65；標籤 10–12px。
- 行文語氣：溫柔而簡短，句子像口白（「號碼請講」）。禁止 AI 腔與「在當今快節奏」之類套語。

## 四、版面與網格

- **jackfield-rail 側桿導覽**：桌機左緣固定寬 106px 的牛津紅直桿，上方原創 logo，下方四頁各是一個「塞孔」（墨黑圓孔＋黃銅內環）＋上方一盞指示燈＋中文頁名＋Oswald 英標。**現用頁**那孔翻黃銅、燈轉琥珀並發光（＝已插塞繩）。≤760px 時側桿收為頂部可橫捲的橫列。
- **刊頭 plate**：牛津紅整條 band，左為 h1＋Oswald sub，右為 DM Mono 的地址／單位／年代。底 3px 墨線收邊。
- **不對稱**：內容區 `max-width:1060px` 置中，但機件頁與沿革頁採 1.35:1 / 1:1 的雙欄非對稱；接線台的操作台佔滿寬、統計為五格柵。
- **留白**：中等密度。面板內部密（塞孔成排），但區塊之間留 22–26px 呼吸。
- **邊框語言**：一律 2–3px 實線墨框、**零圓角或極小圓角（≤4px）**、硬陰影（`box-shadow:3px 3px 0` 墨色）表達按壓。禁止模糊陰影與 rounded-2xl 卡片。

## 五、jackfield-panel 面板引擎（核心資產）

全站不放任何外部圖片。所有「圖」都由這支引擎程序生成：

- **塞孔 jack**：外圈象牙圓（r≈16–18）＋墨框，內墨黑圓（r≈9–10）＋黃銅內環。上方一枚指示燈圓（r≈6–8），底下 or 上方一張 `#DCCEAF` 標牌寫 DM Mono 門號＋商號。
- **指示燈 lamp**：純色圓＋墨框，狀態決定填色：來話＝琥珀（可閃）、占線＝黃銅、通話＝銅綠、振鈴＝警示紅（可閃）、待拆線＝琥珀閃、空閒＝暗墨。閃爍以 `blinkOn` 布林每 ~520ms 切換；`prefers-reduced-motion` 時恆亮不閃。
- **塞繩 cord**：兩塞座標間一條三次貝茲曲線，下垂 sag＝`max(y1,y2)+70`。畫兩層：墨黑底線 stroke-width 6–7＋內芯（丹寧藍/樺棕交錯）stroke-width 3。
- **塞頭 plug**：長方筒身（14×22 圓角 3）＋黃銅尖端＋象牙絕緣環。被選取時外加琥珀虛線圈。
- **鈴鍵 key**：墨黑基座＋黃銅框，內一枚可上下的小扳片（上＝警示紅振鈴、下＝黃銅待命）。
- **貝爾式話機**（沿革頁）：象牙聽筒＋牛津紅送話器杯＋黃銅描邊，全 SVG 原語組成。
- **logo/favicon**：一枚牛津紅 roundel＋象牙塞孔＋黃銅塞尖＋捲出的塞繩構成一個「C」，頂上一盞琥珀來話燈。favicon 為 32×32 精簡版，寫成 inline SVG data URI（`#` 以 `%23` 轉義）。

引擎重繪守則：狀態改變（應答／接續／振鈴／拆線／選取）時整幅 `render()` 重畫；因此互動元件（塞孔／塞頭／鈴鍵）皆為 `<g tabindex=0 role=button>` 並帶 `aria-label`，重畫後焦點需重新指派。

## 六、核心互動：即時接線遊戲（call-routing）

這是本風格的功能核心，也是它與所有「儀器台題型」的分野——它是**賽局／敏捷**，不是模擬看儀表。

- **純函數班表**：以 mulberry32(seed) 生成一串來話 `{at, from, to, patience, talk}`。到點即 spawn。因為只依賴 seed 與經過時間，離席可批次重算而非暫停，且可用 `?seed=` 或顯示 seed 重播。
- **狀態機**（每通）：`in 來話` → `answered 已應答（插後塞）` → `wired 已接續（插對前塞）` → `ringing 振鈴` →(1.2s)→ `conn 通話（計時 talk）` →(talk 到)→ `clearing 待拆線` →(拔線)→ `done`。歧路：來話逾 patience 未應答＝`missed 未接`；前塞插錯孔＝`wrong 誤接`（斷線）。
- **三種操作並存**：桌機以 pointer 事件拖塞頭到孔（拉線的手感）；亦支援「點塞頭選取→點塞孔落塞」；鍵盤 `Tab` 聚焦、`Enter` 選取/落塞/扳鍵。三者都走同一支 `attach()/throwKey()/pullPair()`。
- **回饋**：接通率＝接通/(接通+未接+誤接)、平均應答秒數、未接、誤接四項即時統計，外加逐通「接線單」log（含商號故事）。
- **難度**：來話間隔隨時間收斂（4.6s→2.0s），塞繩組數即同時可接通數；「慢速練習」拉長時間並停閃。

移植到別的產業時，把「訂戶／來話／接通」抽換為任何「資源→請求→配對」的即時調度（如氣送管、月台調車、餐廳帶位），但保留「純函數班表＋拉線手感＋接通率計分」三件事。

## 七、動效規則

- 燈號閃爍：`setInterval ~520ms` 切 `blinkOn`；僅來話／振鈴／待拆線三態閃。reduced-motion 恆亮。
- 塞頭拖曳：pointermove 即時更新座標並重畫塞繩曲線；放開時就近孔（半徑 ~38）吸附或回擱架。位移 <6px 視為點選。
- 通話計時：`requestAnimationFrame` 主迴圈推進板時（board-time），慢速模式將真實時間拉長 1.7 倍。
- 按壓：按鈕 `:active` `translate(3px,3px)` 並抹去硬陰影，模擬鍵程。duration 皆 ≤120ms、`ease`／線性；**不以揭示進場、數字計數、dashoffset 描繪為簽名**——本站簽名是拉線本身。

## 八、Logo 與 Favicon 設計指南

- Logo＝牛津紅圓牌上一枚象牙塞孔（墨框＋黃銅內環＋黃銅塞尖），塞繩自孔下捲出成「C」形，頂端一盞琥珀來話燈。可獨立使用於側桿（60×60）。
- Favicon＝同一枚亮孔的 32×32 精簡：牛津紅方底＋象牙圓＋墨黑孔＋黃銅環＋頂部琥珀燈。寫成 inline SVG data URI。
- 兩者都必須「由機件構成」，不可另畫話筒剪影或電話 emoji。

## 九、Do & Don't

**Do**
- 讓面板引擎承擔全部圖像；門號、讀數、時鐘一律 DM Mono。
- 用燈色與塞繩走向表達狀態；核心功能要完整可玩（有輸入／狀態／回饋）。
- 象牙與牛津紅雙大地色，黃銅只做線。
- 提供拖／點／鍵三通道與 reduced-motion 降級。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、置中大標＋三卡片模板、emoji 當 icon。
- ✗ 把牛津紅壓成近黑暗底＋一排量表——那是儀器台不是總機。
- ✗ 外部圖片／音檔（僅 Google Fonts）；✗ 千篇一律圓角模糊陰影卡。
- ✗ Lorem ipsum 與 AI 腔；✗「EST. 19xx」徽章、「把 X 變成 Y」標題、「老街屋改建」開場。
- ✗ 跑馬燈當反射動作——本站不需要捲動橫幅，資訊靠燈與繩。

## 十、頁面骨架範例

```html
<!-- jackfield-rail 側桿導覽 -->
<nav class="rail" aria-label="總機導覽">
  <img class="mark" src="assets/logo.svg" alt="城中電話交換所">
  <ul class="jacknav">
    <li><a href="index.html" aria-current="page">
      <span class="lamp"></span><span class="hole"></span>
      <span class="lbl">接線台</span><span class="en">Board</span>
    </a></li>
    <!-- …其餘三頁同構，現用頁 aria-current 使該孔翻黃銅、燈轉琥珀 -->
  </ul>
</nav>

<!-- 刊頭 plate -->
<header class="plate"><div class="inner">
  <div><h1>城中電話交換所</h1>
    <p class="sub">Manual Common-Battery Board · No. 2</p></div>
  <div class="num">懷寧街 15 號 · 城中局<br><b>接線生講習科</b></div>
</div></header>

<!-- 操作台：SVG 由 jackfield-panel 引擎重繪 -->
<div class="console"><svg id="sw" viewBox="0 0 900 560" role="application"
  aria-label="人工電話總機：來話亮燈時拖塞繩接線"></svg></div>
```

核心 CSS 變數：
```css
:root{--ivory:#E7DCC4;--ivory-2:#EFE7D3;--ox:#6E1D22;--ink:#201613;
  --brass:#C7A24A;--amber:#E8A33D;--verd:#5E7F63;--paper:#DCCEAF;}
```

驗收：一個沒看過 Demo 的 AI，只讀本檔，應能做出——雙色域電木面板、由面板引擎生成全部圖像、以「拉線接續」即時調度為核心功能、支援拖／點／鍵與 reduced-motion 的同風格新站，而不必新增任何外部圖片。
