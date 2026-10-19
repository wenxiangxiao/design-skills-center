# 相黏照相打字行 SIO-LIÂM PHOTOTYPE

> 喜帖印刷 × Lubalin 字象派・ITC《U&lc》照相排字表現主義（Lubalin Typographics / Phototype Expressive Typography）

臺南西門路二段 166 巷的照相打字行，1974 年開機。只做一件別人不太做的事：把兩個人的名字排到剛好碰在一起，做成喜帖上的字標，再用喜紅與墨兩罐專色印成喜帖。全站沒有一張圖片——每一組字標都由瀏覽器即時「碰字」：先量出每個字在每一條掃描線上的左右墨緣，再讓下一個字滑過去，滑到兩張輪廓第一次相碰的那一格為止。

## 品牌設定

- **店名**：相黏照相打字行 SIO-LIÂM PHOTOTYPE（臺語「相黏」＝黏在一起）
- **地址**：臺南市中西區西門路二段 166 巷 7 號・(06) 222-1974
- **營業**：週二至週六 10:00–19:00；週日預約看樣；週一暗房換藥水休息
- **人物**：黃秀鑾（1949–）1974 年開業；鄭文雄（1946–2012）暗房與雙色平版；鄭依婷（1979–）2011 年接手，把推字手感寫成程式
- **價目**：喜帖字標 NT$1,800・喜帖 100／200／300 份 NT$3,600／5,800／7,900・謝卡 100 份 NT$1,200・照相打字標題一行 NT$120・招牌字稿 NT$2,400 起
- **口號**：緊，但不要黏。要黏，就黏得漂亮。

店家、人物、價格、電話皆為虛構；Herb Lubalin、ITC、《U&lc》、Photo-Typositor 與照相打字年代為真實背景。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 首頁：可拖動的碰字字標「相黏 SIO&LIÂM」、網點帶、《緊排》週報三欄（字距的三種狀態實排）、價目條 |
| `lockup.html` | 〈相黏機〉核心功能：輸入兩個名字，調距離／曝光／鏡頭／斜鏡，即時求解字標、民國曆喜帖打樣、印量試算、打樣單號 |
| `specimen.html` | 〈字樣〉：捲動驅動的曝光（字重）＋字距、Photo-Typositor 鏡頭變形表、撐滿一欄的變形字、十二對連字咬合表、中文負字距 |
| `shop.html` | 〈本行〉：價目表、1974–2011 沿革、營業時間、FAQ、位置示意圖 |

## 風格關鍵字

tight-but-touching・kiss kerning・negative leading・word as image・swash ampersand・geometric caps vs Didone italic・tabloid scale explosion・newsprint + one spot red・Photo-Typositor anamorphic squeeze

## 八維配方

| 維度 | 本站 |
|---|---|
| industry 產業 | 照相打字行兼喜帖印刷 |
| style 風格 | Lubalin 字象派・ITC《U&lc》照相排字表現主義（型錄既有流派新增條目，非自創） |
| era 時代 | 1960–1981 紐約照相排字（Photo-Typositor 1959 起、ITC 1970、《U&lc》1973 創刊）×1974 年臺南照相打字行 |
| locale 地域 | 紐約麥迪遜大道的字體 × 臺南西門路的巷弄打字行 |
| voice 性格 | 老師傅的短句：嚴格、好笑、不解釋太多 |
| texture 質感 | 新聞紙＋兩罐專色（喜紅、粉）＋墨；零漸層、零陰影、零圓角 |
| density 密度 | 週報式高密度三欄 × 一個爆炸大字 |
| function 功能 | 〈相黏機〉名字字標編輯器＋打樣與印量試算（工具／編輯類） |
| opening | `kiss-lockup-first` 可拆字標開場 |
| nav | `font-filmstrip` 字模底片條導覽 |

## 動效

- **ambient**：首頁字標的「鏡頭呼吸」——整組字以 9 秒週期在 scaleX .975↔1.03 之間緩慢變形，像 Photo-Typositor 的變形鏡在轉
- **input-driven**：任何字標裡的任何一個字都拖得動（Pointer Events），放手滑回；〈相黏機〉三支桿每動一格即重新求解（40ms 去抖）；〈字樣〉捲動驅動曝光與字距
- **transition**：暗房擦拭——點內部連結時一張相紙由左推過畫面（前緣一道喜紅），下一頁再往右抽走；〈相黏機〉切換排法時整組字重新碰字飛入
- **signature**：**碰字 kiss**——字從鬆排滑進來，在輪廓接觸的那一格壓扁 6% 再彈回；拉開的字放手後同樣在碰到鄰字那一格壓扁

## 首創

**輪廓碰撞字距 contour-collision kiss kerning**：全館第一個「字距不是設定值，而是兩個字形輪廓接觸的結果」的站——每個字先畫進離屏 canvas，逐掃描線取得左右墨緣（±1.2% 字級的列膨脹防止斜邊穿透），下一個字的原點＝與前面所有字在共有掃描線上最小間距恰等於 gap 的位置；上下兩行以逐欄墨緣做同樣的垂直碰撞。gap 正為緊、零為碰、負為疊，同一支引擎排出全站每一組字標、十二對連字咬合表、中文負字距與〈相黏機〉。也是全館第一個 Lubalin／《U&lc》照相排字表現主義流派站。

## motion-library 元件

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| BG-B-01 | Halftone Expand | index | ambient | 首頁字標下方的新聞紙網點帶：喜紅與粉兩罐專色輪流長滿，U&lc 印在新聞紙上的網點 |
| TXT-B-21 | Magnet Pull | index | transition | 「TIGHT」逐字從磁鐵邊被拉出、一個咬一個排回原位——字與字之間有吸力，正是緊排的道理 |
| TXT-B-23 | Weight Grow | lockup | transition | 「EXPOSE」由細描邊長成實心：照相打字多曝半秒、墨就往外吃 |
| TXT-A-02 | Letter Sequence | specimen | input | 「SPECIMEN」隨捲動逐字落位，字樣單的標題由讀者自己排上去 |
| SHP-33 | Squiggle Draw | shop | transition | 〈本行〉標題下一筆喜紅花飾線，Lubalin 字標旁慣用的 swash |

來源：`wenxiangxiao/motion-library` v1.6.0 @0a806bc（子集 54.8KB，inline 為每頁第一個 `<script>`）。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-19，排程 Agent 自動執行）。店家、人物、價格、電話皆為虛構；Herb Lubalin、ITC、《U&lc》、Photo-Typositor 與照相打字年代為真實背景。*
