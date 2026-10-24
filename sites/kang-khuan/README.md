# 同款早餐 KĀNG-KHUÁN — 豆漿早餐店 × Fluxus 盒裝平面

新北市永和區竹林路 79 巷 6 號〔門牌虛構〕。林寶珠 1979 年推車賣豆漿，1988 年租下店面；兒子林以樂 2009–2012 年在紐約念書時看見 Fluxus 的事件譜卡，2018 年接店，把十樣早餐改寫成十首事件譜、店名改成台語「同款」（一樣的）。連續七天點同一份，第八天請客。

- 營業：05:30–11:30，週一公休 · (02) 2921-1979
- 價目：蛋餅 35・燒餅油條 45・鹹豆漿 40・豆漿 25・蘿蔔糕 40・飯糰 45・小籠湯包 70・荷包蛋 15・紅茶 25・蔥抓餅 40・郵購同款盒 No.47 NT$480
- 真實背景：永和、捷運頂溪站、Fluxus、George Maciunas、Alison Knowles〈The Identical Lunch〉；其餘人物、門牌、事件為虛構。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 盒 BOX：盒蓋標籤開場、即時網點鐵板、十格事件譜卡 |
| `slip.html` | 點單 ORDER：〈點一張譜〉核心功能（純 CSS 可用） |
| `paper.html` | 早報 PAPER：《同款早報》No.361、店史圖表、Knowles 紀念、分類小廣告 |
| `visit.html` | 來店 VISIT：路線譜、時間、郵購同款盒 |

## 風格關鍵字

Fluxus、George Maciunas、photostat、reverse printing、type as pattern、Fluxkit compartment box、event score、typewriter、black ink on coloured card stock、offset halftone

## 八維配方

- 產業：豆漿早餐店（新種子）｜風格：Fluxus 盒裝平面（型錄「戰後與反文化」新增條目，全館第 1 站）
- era：1962–1978 Fluxus／1979– 永和豆漿店｜locale：新北永和 × 紐約 SoHo｜voice：祈使句、一句一個動作｜texture：影印新聞紙、色卡紙、照相網點｜density：中高（分格盒）
- function：〈點一張譜〉——勾點單（純 CSS 即時加總價錢與分鐘數）→ 排成署名事件譜卡（照相放大標籤）→ 撕下、蓋「同款七格」、分享 ?o= 連結、列印
- 視覺家族：F2 編輯排版｜opening：flux-lid-first｜nav：order-slip-ticks｜illust：offset-sdf-halftone｜mood：black-ink-color-stocks

## 首創

**點單即事件譜 order-slip-as-score**：全館第一張「關掉 JavaScript 也能完整點餐並即時算總價」的點單——勾選、譜卡逐行生成、總價／演出分鐘數／首數都由 `:has()` 與 CSS 計數器從 DOM 推出；JS 只加上「照相放大」的署名標籤（逐行重新放大撐滿）、分享連結與連續七天同款的蓋章格。

## motion-library 元件（1.14.0 @30c55fe）

| ID | 名稱 | 頁 | 承載 |
|---|---|---|---|
| BG-B-04 | Halftone Sweep | 盒 | 網點每天從同一角度掃過（ambient） |
| TXT-A-27 | Typewriter | 點單 | 譜卡抬頭被打字機打出（transition） |
| TXT-B-14 | Domino Letters | 早報 | 本週演出標題骨牌倒下（transition） |
| TXT-B-30 | Checker Words | 來店 | 棋盤長滿、字被挖成反白（transition） |
| BG-B-07 | Halftone Checker | 來店 | 郵購盒旁的網點棋盤格（ambient） |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-25，排程 Agent 自動執行）。*
