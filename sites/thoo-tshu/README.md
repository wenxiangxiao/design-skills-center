# 土厝自學所 THÔO-TSHÙ — 全地型錄・新聞紙單墨 Whole Earth Catalog

**產業**：自力造屋與樸門自學所（花蓮縣壽豐鄉豐坪路三段 41 號〔門牌虛構〕・03-865-0417・週三至週日 09:00–17:00）
**風格**：全地型錄 Whole Earth Catalog（1968–1971，Stewart Brand／Portola Institute，Menlo Park）——型錄「印刷與製程」2026-11-12 新增條目，全館第 1 站

## 品牌設定

潘月嬌（1956–）1994 年在花蓮舊書攤買到一本 1970 年代美國回歸土地運動的工具目錄，1996 年和泥水師傅丈夫陳德旺（1952–2019）把自己在工地用過的工具、書和課寫成一本新聞紙目錄：自己打字、剪貼、送吉安的報社印，一年一本。2026–27 是第 31 期，由女兒陳以璇（1983–）編。評介一律簽縮寫：潘＝潘月嬌、璇＝陳以璇、阿松＝林松茂（竹師傅）、Ofad＝Ofad Lalan（樸門老師）。上目錄要過五關：有用、好而不貴、外面不好找、寄得到或拿得到、有人願意簽名。

課程：夯土牆二日班 NT$4,800／竹構屋架四日 NT$9,200／土窯麵包窯三日 NT$6,500／樸門 PDC 72 小時 NT$28,000／雨水撲滿一日 NT$1,800／乾式堆肥廁所 NT$2,200／太陽能小系統 NT$3,200／磨刀半日 NT$900；工具借用一天 NT$80，逾期罰來共工日搬一天土。

## 頁面

| 頁 | 檔案 | 內容 |
|---|---|---|
| 目錄 Catalog | `index.html` | 型錄跨頁開場：左黑封面（網點地球每 66ms 轉一格、BG-B-04 網點光帶、TXT-B-10「工具與門路」），右「用法」兩欄＋五關＋目次＋營業狀態；下方本期抽樣 |
| 門路 Access | `access.html` | 七類十九則條目（全局／土地／房舍／手藝／社群／遊牧／學習），三欄密排、蜿蜒分隔線、橢圓網點照、6× 布紋放大鏡 |
| 拼一頁 Paste-up | `pasteup.html` | func：把 13 條貼條拖進三欄 36 行版面，三欄貼滿按「拍版」，藍線消失、蓋付印章、印出報名單 |

## 風格關鍵字

newsprint single ink／Windsor-style soft heavy serif（Fraunces SOFT 100 WONK 1）／Univers-like sans／italic signed reviews／ACCESS block（price・FROM）／multi-column／hand-cut meander rules／oval AM halftone／thick dotted editor's box／striped size-reference ball／paste-up & non-repro blue

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1968–1971 美國反文化出版＋1996 起的花蓮翻版 |
| locale 地域 | 加州 Menlo Park → 花蓮壽豐縱谷 |
| voice 性格 | 工地師傅的簽名評介：短句、具體數字、承認缺點（「穹頂防水很難」） |
| texture 質感 | 新聞紙、65 線網點、剪刀歪線、蠟貼條 |
| density 密度 | 高：三欄密排、條目緊接 |
| function 功能 | 〈拼一頁〉排版拼圖＋報名單（編輯／遊戲類） |
| opening | catalog-spread-first 型錄跨頁開場 |
| nav | thumb-index-nav 拇指索引導覽 |

## 首創

**拍版 camera-ready dropout**：全館第一個把「製版相機看不見非複製藍」做成互動的終點——使用者親手拼版（Pointer Events 拖曳貼條、欄位行數硬上限），按下拍版後，所有只為拼版存在的東西（藍格線、欄框、行數讀數、蠟影、貼條紙色）以 steps(4) 從底片上掉光，留下的只有會被印出來的東西：黑字、點線框、以及被你貼歪的長條——印出的那一頁就是報名單。附帶：第一個以同一網點函式 6× 重新取樣的「布紋放大鏡」。

## motion-library 元件

| ID | 名稱 | 頁 | 角色 | 承載 |
|---|---|---|---|---|
| BG-B-04 | Halftone Sweep | 目錄 | ambient | 黑封面上斜掃的網點光帶 |
| TXT-B-10 | Stop Motion | 目錄 | transition | 「工具與門路」逐字定格貼上 |
| SHP-33 | Squiggle Draw | 門路 | ambient | 剪刀歪線的放大版，門路開章 |
| SHP-36 | Dash March | 拼一頁 | ambient | 非複製藍的「照片待補 FPO」框 |
| TXT-A-03 | Stamp In | 拼一頁 | transition | 拍版後的「付印」章 |

來源：motion-library 1.39.0 @bafd6002（`tools/ml-embed.js` 子集、`tools/ml-smoke.js` smoke ok）。

---

*所有品牌、人名、價格、地址皆為虛構示意。*

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-12，排程 Agent 自動執行）。*
