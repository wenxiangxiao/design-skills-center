# 飛倉搬家 PUE-TSHNG — 搬家公司 × 大和繪絵巻物 Yamato-e Emakimono

臺南市北區西門路三段 77 號（門牌虛構）的搬家公司。陳水木（1941–2015）1976 年在西門市場邊踩三輪車替人載家具，1983 年買第一台 3.5 噸中古貨車；陳淑芬（1968–）1995 年接手，立下「估價後加價不超過一成」；陳以恆（1993–）在京都讀日本美術史，2016 年春天在奈良國立博物館看〈信貴山縁起絵巻〉特展——金鉢把長者家的米倉整座載上天的那一卷——2020 年把店改名「飛倉」，從此每趟搬家附一卷手繪的「搬厝卷」。

學生套房 NT$3,800・無電梯公寓／電梯大樓 6,500・透天厝 8,800（含 3.5 噸車一台）・無電梯每多一層 +600・鋼琴 +3,500・神明桌擇時請神 +1,200・臺南市內 +1,200・北上臺北 +14,000・渡海澎湖 +11,800・手繪絹本搬厝卷 +2,800・每日 08:00–20:00（除夕、初一休）・(06) 222-1976。臺南西門市場、普濟殿、運河、安平、布袋—馬公車渡、奈良國立博物館 2016〈信貴山縁起絵巻〉特展為真實背景，其餘虛構。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 整個首頁就是一卷由右往左捲的〈飛倉縁起絵巻〉：表紙題簽 → 三輪車（1976）→ 飛倉（金鉢載米倉飛天）→ 四樓無梯（**異時同圖**：同一位師傅出現四次，捲到哪一個在卷心，哪一個才上色）→ 過橋（同一台車畫三次）→ 新家 → 奧書朱印 → 軸。卷外：川（BG-A-11）、搬家的四件事（SHP-27 疊紙箱）、三代 |
| `emaki.html` | 〈畫一卷你的搬家〉：選舊家、去處、最要緊的三樣家當與日子，按「落筆」——同一支繪製程式把你的搬家畫成三幅（舊家剖面、路上、新家），詞書依選擇以文法生成，奧書寫上民國曆日期、師傅名單與估價；卷號 `?m=` 可分享、可帶去訂日子。題頭 BG-A-17 |
| `price.html` | 價目（基本、樓層、大件、去處、其他）、三條規矩（直書）、訂日子表單（帶入卷號即時估價）；送出後以直書奧書回覆單號、蓋「飛倉受付」朱印，SHP-25 師傅行列由右入場。題頭 BG-B-18 |

## 風格關鍵字

Yamato-e・emakimono handscroll・right-to-left reading・fukinuki yatai（roofless oblique interior）・suyari-gasumi gold mist bands・tsukuri-e（ink underdrawing, opaque mineral pigment, ink re-outlining）・hikime kagibana faces・iji-dōzu continuous narration・kotobagaki vertical calligraphy・kinsunago gold dust・cover title slip・colophon & seal・roller

## 八維配方

| 維度 | 本站 |
|---|---|
| industry | 搬家公司（臺南，1976 年起；每趟附一卷搬厝卷） |
| style | 大和繪絵巻物 Yamato-e Emakimono（型錄「在地與文化視覺」2026-10-29 新增條目，全館第 1 站） |
| era | 十二世紀〈源氏物語絵巻〉〈信貴山縁起絵巻〉〈伴大納言絵詞〉× 1976 三輪車 × 2026 |
| locale | 平安京／奈良 × 臺南府城 |
| voice | 第三代的口吻：講樓梯轉角、講最重的那一件、講誰第一個進新家 |
| texture | 絹本、料紙、金泥金砂子、礦物顏料平塗、墨線描起 |
| density | 卷內滿、卷外疏：畫面大半留絹地，文字只在詞書 |
| function | 〈畫一卷你的搬家〉敘事類：輸入四個選擇 → 生成專屬繪卷與詞書 → 估價、卷號分享、帶去訂日子 |

opening：`handscroll-first 右起展卷開場`／nav：`daisen-slips 題簽導覽`／illust：`fukinuki-oblique-kit 吹拔斜投影組件`／mood：`kinsunago-silk 絹本金砂子`

## 動效（四種）

- ambient：すやり霞裡的金砂子步進閃；霞依場景離卷心距離上下分合（scroll-driven）；BG-A-11、SHP-27、BG-A-17、BG-B-18
- input：滾輪映射為往左捲、拖曳捲、方向鍵；游標停在人物上＝那一刻立即上色、旁註亮起（書入れ）
- transition：換頁時深群青表紙由左蓋上、新頁由右往左展開（前緣帶軸）；落筆後新卷 clip-path 右起展開；SHP-25 行列入場
- signature：**異時同圖捲動**——同一人物在一幅畫裡出現 3–4 次，捲動位置決定哪一個「現在」是上色的作り絵，其餘退回白描

## 首創

**異時同圖捲動 continuous-narration scroll（全館第一）**：全館第一個「右起左行」的整頁手卷（`direction:rtl` 橫捲容器＋直書詞書＋卷尾軸），也是第一個把絵巻的異時同圖做成捲動互動的站——同一人物在同一幅 SVG 裡畫多次，以 `data-k` 標時間順序，捲到哪一個位在卷心，哪一個才上色；無 JS 或減少動態時全部上色、旁註全部可讀。附帶：畫卷頁以文法生成詞書（FNV-1a 種子，同一組選擇永遠同一卷）。

## motion-library 元件（1.21.0 @e4f8c46c）

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| BG-A-11 | Parallel Curves | index | ambient | 卷外的川：群青平行波線＝流水紋 |
| SHP-27 | Shape Stack | index | ambient | 打包：黃土紙箱一個個疊上 |
| BG-A-17 | Flow Lines | emaki | ambient | 題頭的風與秋草：未落筆前的空絹 |
| BG-B-18 | Horizontal Lines | price | ambient | 題頭的金色橫帶＝すやり霞 |
| SHP-25 | Shape Parade | price | transition | 訂單送出後師傅行列由右入場（播一次） |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-29，排程 Agent 自動執行）。*
