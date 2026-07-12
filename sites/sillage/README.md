# 餘香 SILLAGE — 雜誌對開排版風（Editorial Magazine Spread）

> Design Skills Center 館藏範例站 · 產業 × 風格：**香氛品牌 × 雜誌對開排版風**

一間虛構的台北迪化街獨立香氛研究室，把整個品牌做成一本會翻頁的雜誌。整站示範**雜誌對開排版風（Editorial / Magazine Spread）**：巨型高對比襯線標題、可見中縫的對開版面、頁碼與跑頭（running head）、首字放大、拉頁式引言、暗色編輯調性、原創香水瓶線稿與可互動的氣味金字塔。動效克制、以版面戲劇性與閱讀節奏取勝。

## 品牌設定

- **中文名**：餘香（餘香誌）
- **英文名**：SILLAGE
- **調香師**：溫如霜（前茶行走味鑑定，虛構）
- **成立**：2019・台北迪化街
- **本期**：ISSUE 05 — 霧與火 Mist &amp; Ember
- **地點**：台北市大同區迪化街一段 148 號 2 樓（虛構）
- **一句話**：香水走過之後，空氣裡留下的那道痕跡——我們把它寫成一本誌。
- **聯絡**：atelier@sillage.tw／02-2557-0619（皆虛構）
- **代表色**：墨黑 `#14110F`／骨白 `#EDE7DB`／陶血紅 `#8A3B2E`／暗金 `#B9A582`／暖炭 `#241F1B`

## 頁面清單

| 檔案 | 頁面 | 重點 |
| --- | --- | --- |
| `index.html` | 封面 | 雜誌封面 hero（期號＋大標＋直排標籤）、對開版主筆文（首字放大＋拉頁引言）、封面作品＋氣味金字塔、雜誌式目次 |
| `collection.html` | 香譜 | 四支香水的左右交替對開版，各附原創瓶身線稿、前中尾調氣味金字塔（hover／點擊展開）、試香集導引 |
| `atelier.html` | 研究室 | 專訪開場大跨版標題＋工作桌插畫、雙欄報導體（首字放大）、Q&A、造訪資訊與預約試香流程 |

## 風格關鍵字

雜誌對開、Editorial、magazine spread、Playfair Display、高對比襯線、跑頭 running head、頁碼 folio、首字放大 drop cap、拉頁引言 pull quote、中縫 gutter、氣味金字塔、暗色編輯調性。

## 技術

- 每頁單檔 HTML，CSS／JS 全 inline，頁面以相對路徑互連。
- 所有圖像為原創 inline SVG（香水瓶、調香桌、氣味符號）與 CSS 版面，零外部圖片；外部資源僅 Google Fonts（Playfair Display + Archivo + Noto Serif TC）。
- favicon 為原創 inline SVG data URI；`assets/logo.svg` 為原創 flacon 字標。
- 互動：行動選單（目次）、氣味金字塔 hover／點擊展開、進場揭示，全部支援 `prefers-reduced-motion` 降級與 RWD（≤560px 不破版）。
- 刻意不使用跑馬燈：以「可見中縫的對開版面＋頁碼跑頭＋氣味金字塔」作為本站的識別性版面與互動簽名。

## 想用這個風格？

下載本資料夾的 `SKILL.md`，交給任何 AI，即可產出風格一致、但產業／內容完全不同的新網站。SKILL 定義的是視覺語言，不綁定香氛這個題材。

---

*本站由 **Claude Opus 4.8**（排程 Agent 自動執行）設計與建置（2026-07-12）。我們不介意你知道這是 AI 做的——這正是重點。*
