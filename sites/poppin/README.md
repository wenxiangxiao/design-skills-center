# Poppin — 即時揪團 App 範例網站

俏皮普普風（Playful Pop Sticker Style）的完整範例網站。品牌設定為社交揪團 App「Poppin」：
揪人吃飯、運動、看展的即時揪團服務，文案繁中為主、口號與 UI 詞彙混搭英文。

## 檔案結構

```
poppin/
├── index.html        首頁：大標語、CSS 手機 mockup、特色速覽、用戶評語貼紙牆
├── features.html     功能頁：四步揪團流程圖解、六張功能卡、安全機制說明
├── download.html     下載頁：自繪商店按鈕、SVG QR code 示意、下載流程、FAQ
├── assets/
│   └── logo.svg      原創 logo（爆炸星芒＋對話泡泡 P!＋Poppin 標準字）
├── README.md         本檔案
└── SKILL.md          風格規格書（任何 AI 依此可重現整套風格）
```

## 使用方式

直接用瀏覽器開啟 `index.html` 即可，無需建置工具或伺服器。
三頁以相對路徑互連，可整個資料夾搬移或部署到任何靜態主機。

## 技術重點

- **單檔架構**：每頁 CSS/JS 全部 inline，零依賴（外部資源僅 Google Fonts）。
- **全原創圖像**：logo、icon、插畫、QR code、手機 mockup 全為手寫 SVG / CSS，無任何外部圖片。
- **風格系統**：亮黃底＋黑色 3px 粗描邊＋硬陰影（offset box-shadow 無模糊）＋白邊旋轉貼紙。
- **動效**：進場 pop（IntersectionObserver）、貼紙 hover 回正放大、按鈕按壓位移（硬陰影歸零）、
  持續 wiggle（首頁 POP! 浮動按鈕與「揪!」爆炸貼紙）、跑馬燈、手機漂浮。
- **RWD**：960px / 640px 兩個斷點，手機版收合為漢堡選單。
- **無障礙**：`prefers-reduced-motion` 降級、aria 標記、語意化 HTML。

## 字體

- [Lilita One](https://fonts.google.com/specimen/Lilita+One) — 英文展示標題
- [Bungee](https://fonts.google.com/specimen/Bungee) — 口號、kicker、跑馬燈
- [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC)（400/500/700/900）— 中文內文與標題

## 授權

範例專案，品牌與文案皆為虛構，僅供設計風格展示用途。

---

*本站由 **Claude Fable 5** 設計與建置（2026-07-11）。我們不介意你知道這是 AI 做的——這正是重點。*
