# 城南分館・青嶼市立圖書館 — Branch Library × Index-card Catalogue

一座「還在用卡片目錄思考」的社區圖書館分館。整個網站的骨架，就是它真正的目錄：一面會拉開的抽屜牆、一疊索引卡、幾枚蓋歪的橡皮章。首頁不是大標開場，而是把館藏分類做成可拉開的抽屜索引（toc-first）；核心功能是一套卡片式館藏檢索（OPAC），可多條件篩選、翻卡看借閱記錄。

## 八維配方（本站設計指紋）

| 維度 | 值 |
|---|---|
| **產業 Industry** | 市立圖書館分館（種子庫 0 → 1，廣度優先） |
| **風格 Style** | 檔案卡片風 Index-card（種子庫 0 → 1，全新落實） |
| **era 時代** | 1960s — 卡片目錄與打字機的黃金期 |
| **locale 地域** | 台灣本土 — 虛構「青嶼市城南里」社區脈絡（延續 CIVICA 的青嶼市宇宙） |
| **voice 性格** | 冷靜理性 — 館員語氣，寡言、精確、帶一點人情 |
| **texture 質感** | 紙感 — 牛皮索引卡、樟木目錄櫃、橡皮章油墨 |
| **density 密度** | 極密 — 抽屜格點、卡片欄位、密排的借閱章 |
| **function 功能** | **資料庫查詢與多條件篩選（卡片式 OPAC）** — 關鍵字檢索 ＋ 分類/語言/年代/在架狀態四組多選 ＋ 五種排序，結果為可翻面的索引卡，背面是蓋滿的還書章 |

era / locale / voice / texture / density 五項全數落實（≥3 達標）。

## 頁面

1. **index.html** — 目錄大廳（toc-first）：抽屜牆索引，點一格抽屜彈性拉出、顯示該類導引卡，二次點擊進入該類檢索；開放時間、本週告示。
2. **catalogue.html** — 館藏檢索（核心功能）：卡片式 OPAC。關鍵字 ＋ 分類/語言/年代/在架狀態多條件即時篩選、五種排序；每筆結果是一張索引卡（含交叉排線雕版小插圖），點擊翻面顯示借閱記錄橡皮章。
3. **visit.html** — 館舍與沿革：記錄卡時間軸（1961–2026）、樓層導引、館員、造訪與借閱資訊。

## 風格關鍵字

檔案卡片 · 索引卡 OPAC · 橡皮章 · 打字機字 Courier · Newsreader 襯線 · 牛皮 duotone（墨黑×朱紅雙色印於卡）· 側欄目錄櫃導覽 · 抽屜拉出 · 卡片翻面 · 交叉排線雕版小插圖 · 淡藍格線 · 硬式位移陰影 · 去AI化

## 輪替與去AI化自查（對照 ledger 與 PLAYBOOK §2.4）

- **opening**：`toc-first`（抽屜目錄索引），不與最近 5 站（masthead / catalog-first / os-metaphor / map-first / schedule-first）相同，非 hero-bigtype。
- **nav**：`side-rail`（樟木目錄櫃側欄），非 topbar。
- **signature**：抽屜彈性拉出＋索引卡 3D 翻面看借閱章＋橡皮章油墨——全館唯一。
- **illust**：`hatching 交叉排線雕版`（每類一枚原創蝕刻小插圖），不與最近 4 站（halftone / barcode-label / flat-shape / papercut）相同，非 thin-lineart。
- **mood**：`duotone`（牛皮＋墨黑＋朱紅），不與最近 3 站（vivid-bold / mid-tone / pastel-soft）相同，非 paper-light。
- **func**：`資料庫查詢與多條件篩選`，不與最近 5 站的功能重複。
- **語彙自查**：signature 主打抽屜拉出與翻卡蓋章，刻意避開 watchlist 過載動效（數字計數／按壓硬陰影／stroke-dashoffset 描繪／通用淡入揭示）；文案無「EST. 19xx」徽章、無「老街屋改建」開場敘事、無「把 X 變成 Y」句式。
- **風格家族**：檔案卡片風屬未分類家族，與前站（剪紙風 papercut）非血緣家族、不連續；palette（牛皮／墨黑／朱紅／淡藍格線）經查與既有站無高度相似。

## 技術

單檔 HTML（CSS/JS inline）、原創 SVG logo 與 inline SVG favicon、零外部圖片、僅載入 Google Fonts（Newsreader / Courier Prime / Noto Serif TC）、支援 `prefers-reduced-motion`、RWD 手機以頂列導覽取代側欄。

---

*本站由 **Claude Opus 4.8** 設計與建置（2026-07-16，排程 Agent 自動執行）。文案、館藏、借閱記錄與人物皆為虛構示意。*
