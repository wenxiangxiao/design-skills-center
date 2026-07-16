# SCUFF 磨損滑板 — Skate Shop × Dada Collage

台北公館一間會積水的滑板店。整站是一本影印拼貼的龐克 zine：勒索信剪字標題、雙色套印刻意錯位、半調網點顆粒。開場是滿版拼貼海報（fullbleed-art），導覽是全螢幕拼貼選單（hamburger-full），核心功能是一套完整可玩的線上店——加入購物袋、改數量、輸暗號折扣、結帳、吐一張影印收據。

## 八維配方（本站設計指紋）

| 維度 | 值 |
|---|---|
| **產業 Industry** | 滑板店（種子庫 0 → 1，廣度優先） |
| **風格 Style** | 達達拼貼 Dada（種子庫 0 → 1，全新落實・未分類前衛家族） |
| **era 時代** | 1990s — 影印 zine／龐克 DIY 文化 |
| **locale 地域** | 台灣本土 — 台北公館，混美式街頭滑板血統 |
| **voice 性格** | 幽默嘴砲 — 自嘲、直白、反行銷腔 |
| **texture 質感** | 塑膠 — PU 輪、楓木板、砂紙的實體感 |
| **density 密度** | 中等 — 拼貼滿但留呼吸，價格與資訊清楚 |
| **function 功能** | **購物車與結帳流** — 分類篩選商品＋自組板配置器（板面/圖/輪硬度/橋即時算價）→ 加入購物袋抽屜（增減數量、刪除）→ 折扣碼 GRIP10／FREESHIP → 結帳表單（姓名/手機/地址驗證＋付款方式）→ 生成單號 SCF-YYMMDD-XXX 的影印收據 |

era / locale / voice / texture / density 五項全數落實（≥3 達標）。

## 頁面

1. **index.html** — 滿版拼貼封面（fullbleed-art）：撕紙色塊＋半調網點＋勒索信剪字「SKATE OR DON'T」＋本月新到 riso 卡＋店宣言 zine。hamburger-full 全螢幕拼貼選單。
2. **shop.html** — 逛店（核心功能）：商品分類篩選、riso 套印縮圖 hover 錯位；**自組板配置器**即時算價；右側滑出購物袋抽屜（增減/刪除/折扣/運費/合計）；結帳彈窗表單驗證；影印收據 + 單號。
3. **crew.html** — 店與人：主理人與店員拼貼肖像、公館到景美八個滑點、造訪與營業資訊。

## 風格關鍵字

達達拼貼 · 影印 zine · 勒索信剪字（ransom note）· 雙色套印錯位（riso overprint）· 半調網點顆粒 · 撕紙色塊 · Anton 巨體 + Space Mono + DM Serif Display 混排 · 橘紫黑撞色於報紙灰底 · hamburger-full 全螢幕選單 · 硬位移陰影 · 去AI化

## 輪替與去AI化自查（對照 ledger 與 PLAYBOOK §2.4）

- **opening**：`fullbleed-art`（滿版拼貼海報），不與最近 5 站（masthead / catalog-first / os-metaphor / map-first / schedule-first）相同，亦不與同批前一站（toc-first）相同，非 hero-bigtype。
- **nav**：`hamburger-full`（全螢幕拼貼選單），非 topbar。
- **signature**：勒索信剪字標題＋雙色套印 hover 錯位＋自組板→購物袋→影印收據——全館唯一。
- **illust**：`riso-overprint 雙色疊印`，不與最近 4 站（barcode-label / flat-shape / papercut / 前一站 hatching）相同，非 thin-lineart。
- **mood**：`vivid-bold`（橘紫黑撞色），不與最近 3 站（mid-tone / pastel-soft / 前一站 duotone）相同，非 paper-light，且與同批前一站調性拉到最開（安靜牛皮 vs 吵鬧龐克）。
- **func**：`購物車與結帳流`，不與最近 5 站的功能重複，也不與同批前一站（資料庫篩選）相同。
- **語彙自查**：signature 主打剪字與套印錯位與購物流程，刻意避開 watchlist 過載動效（數字計數／按壓硬陰影當主打／stroke-dashoffset 描繪／通用淡入揭示）；文案雖出現戲謔的「EST. 這條巷子從來沒平過」為反諷用法、非年份徽章，無「老街屋改建」開場敘事、無「把 X 變成 Y」句式。
- **風格家族**：達達拼貼屬未分類前衛家族，與前站（檔案卡片風、剪紙風）非血緣家族、不連續；palette（報紙灰／墨黑／安全橘／電光紫／混凝土灰）刻意避開 petal-press 的 riso 粉藍黃三色與 rakurs 的紅黑鋼藍赭黃，經查與既有站無高度相似（橘×紫互補撞色為本站獨有）。

## 技術

單檔 HTML（CSS/JS inline）、原創 SVG logo 與 inline SVG favicon、所有商品/肖像/板面皆為程序生成 SVG，零外部圖片、僅載入 Google Fonts（Anton / Archivo / Space Mono / DM Serif Display）、購物流程為純前端記憶體狀態（無外部請求、不真的扣款）、支援 `prefers-reduced-motion`、RWD。

---

*本站由 **Claude Opus 4.8** 設計與建置（2026-07-16，排程 Agent 自動執行）。品牌、人物、商品、價格與訂單皆為虛構示意。*
