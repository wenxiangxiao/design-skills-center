# 暗暝行 ÀM-MÎ KIÂNN 夜觀社 × 銅版蝕刻・飛塵（Goya《隨想集》式）

臺北市文山區指南路三段 34 巷 9 號的夜觀社。黃秋霖〔1949–〕1974 年在馬德里學銅版、在國立版畫局看過哥雅《隨想集》八十塊原版；1976 年回木柵開工作室，1988 年起帶學生夜裡上山寫生，1996 年開始收費夜觀；女兒黃以晴〔1983–〕2012 年接手帶隊。走完夜路的隔天早上，誰想刻就回工作室蝕一塊版；黃秋霖自己的「暗暝八十景」刻到第四十七號，刻滿八十號退休。

- 夜觀 3 小時 NT$850（學生 650・12 歲以下 450）・夜觀＋蝕刻夜 NT$2,400（加印 300）・暗暝八十景原版畫每號 30 張 NT$5,800・包團 NT$9,600
- 夜觀 週二・四・六 19:00–22:00（4–9 月 19:30）・蝕刻夜 週日 10:00–12:30・週三工作室開放・週一休・(02) 2938-1996

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` 夜的版 | 一塊左右相反的銅版躺在壓印機上；往下捲，滾筒走過、紙蓋上、印出正向的〈暗暝第四十七〉，最後紙被掀起。年表、三種走法、今晚有沒有夜觀、哥雅 1799 年在香水店賣版畫 |
| `eyes.html` 八種眼睛 | 領角鴞、葉鼻蝠、大赤鼯鼠、白鼻心、莫氏樹蛙、黑翅螢、扁鍬形蟲、龜殼花，各一張即時蝕刻的飛塵版畫＋季節、地點、哥雅式題詞 |
| `etch.html` 蝕一張 | 〈蝕一張〉：畫三輪、浸三次酸（先畫的線最黑）、撒飛塵、擦版、轉滾筒，拿到一張左右相反、帶版痕與鉛筆編號的版畫（可存 PNG） |
| `visit.html` 來訪 | 一週場次、夜觀七條、樟湖步道路線圖（SVG 排線）、預約、常見問題 |

## 風格關鍵字

蝕刻 etching／aguafuerte・飛塵 aquatint／aguatinta・浸酸次數決定線的黑・松香網粒・停蝕＝光・版面殘墨・版痕・鉛筆編號・版號與題詞・Goya《Los Caprichos》1799・Rembrandt・Piranesi

## 八維配方

| 維度 | 值 |
|---|---|
| industry 產業 | 夜觀生態導覽社（兼銅版蝕刻工作室） |
| style 風格 | 銅版蝕刻・飛塵 Aguafuerte y Aguatinta（型錄「繪畫與材質」〈金屬蝕刻〉首站，Goya《隨想集》式） |
| era 時代 | 1799 馬德里 × 1976–2026 木柵 |
| locale 地域 | 指南路三段茶農倉庫・樟湖步道 |
| voice 性格 | 哥雅式短題詞＋版畫師傅的製程口吻 |
| texture 質感 | 棉紙纖維・松香網粒・殘墨・版痕 |
| density 密度 | 一屏一張版，文字住在紙邊 |
| function 功能 | 工序體驗＋產出：〈蝕一張〉 |

- 視覺家族：F5 手工質材（上一站 keh-a-phiann 為 F4）
- opening：`press-bed-first` 壓印機台開場（新原型）　nav：`pencil-margin` 鉛筆邊註導覽（新原型）
- illust：`etch-bite-aquatint`（新技法）　mood：`rag-plate-tone` 棉紙殘墨＋紅光（新 mood）
- 技術：OffscreenCanvas＋Worker／CSS scroll-driven animations（view-timeline）／SVG feDiffuseLighting 斜光（Pointer・DeviceOrientation）

## 首創

**分次腐蝕的時序繪圖（staged-bite drawing）**：全館第一個讓「筆畫的明度由它在第幾輪被畫下決定」的繪圖工具——線沒有筆刷粗細或顏色參數，只有它經歷過幾次浸酸；越早畫的線被咬越多次、越黑也越寬（側蝕），最後一輪畫完若沒有浸酸就印不出來。工作台上的線也依已受咬次數即時變色，讓「時間＝深度」這條銅版的核心規則成為可操作的介面；同時是全館第一個以捲動驅動「左右相反的銅版 → 正向的印張」的壓印轉換。


## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-29` | Topo Lines | primary #231A14／secondary #B26A43／bg #EEE5D1、duration 12、density 1.2、intensity 0.8、seed 1996 | ambient：兩座山的等高線一圈圈緩慢起伏——針在防蝕底上刮出的等寬細線，像夜裡樟湖步道的山形；只有線，濃淡靠線距，第五圈用銅色當版痕。 |
| etch.html | `BG-B-24` | Crosshatch | primary #231A14／secondary #4A3B2E／bg #EEE5D1、duration 8、density 1.8、intensity 0.7、seed 3、scroll true（捲動驅動） | input：兩組交叉排線隨捲動相對滑動——蝕刻用交叉排線堆暗部的語法；捲動越深、線越密集地交錯，像版子在酸裡一次次加深。 |
| eyes.html | `BG-A-20` | Diagonal Lines | primary #4A3B2E／secondary #231A14／bg #E5D9BF、duration 10、density 1.4、intensity 0.6、seed 8 | ambient：斜向細線緩慢平移——乾刻針順著同一方向一路刮下的斜線調子，也像紅光手電筒照到的夜雨；版痕內紙色底、墨線，零漸層。 |
| visit.html | `TXT-B-13` | Scramble Decode | primary #B26A43／secondary #231A14／bg #EEE5D1、text 暗暝行、duration 1.6、aspectRatio 16:9、seed 96（一次性，進視窗播放、點擊重播） | input：店名先以銅色亂碼閃動、再由左至右一字一字定成墨字——夜裡的形一點一點被認出來；元件用 600 字重 mono，不超過本站 600 上限，無淡入無發光。 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-17，排程 Agent 自動執行）。社名、人物、地址、電話與價格皆為虛構示意；Goya《Los Caprichos》1799 年於馬德里醒悟街一號的利口酒與香水店販售（320 里爾、300 套售出 27 套）、Calcografía Nacional、各物種學名與季節為真實參照。所有版畫皆為程式即時蝕刻算繪的原創圖像，未複製任何哥雅作品。*
