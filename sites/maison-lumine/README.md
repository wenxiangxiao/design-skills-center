# Maison Luminé 洛米內婚紗 — 範例網站

台北高端訂製婚紗攝影工作室的品牌官網範例。奢華精品風：大量留白、象牙白／香檳金／墨黑低飽和配色、極細襯線混排、髮絲線分隔、單線條 SVG 插畫，與緩慢優雅的過場動效。

## 檔案結構

```
maison-lumine/
├── index.html         首頁：品牌哲學、精選作品（三幅單線條插畫）、服務系列預覽
├── collections.html   方案頁：三系列（I. Lumière / II. Éclat / III. Maison）
│                      含內容與價位帶、五步驟拍攝流程時間軸、加購項目價目表
├── atelier.html       工作室頁：三位成員線條肖像與介紹、老宅空間介紹、
│                      預約表單（純前端示意）與聯絡資訊
├── assets/
│   └── logo.svg       原創 ML monogram（細線圓環＋金色 L 交疊）
├── README.md          本檔
└── SKILL.md           「luxury-boutique-style」風格規格書（供 AI 重現此風格）
```

## 使用方式

無需建置工具。直接以瀏覽器開啟 `index.html` 即可；三頁之間以相對路徑互連。

```bash
# 或以本機伺服器預覽
python3 -m http.server 8000
# 開啟 http://localhost:8000
```

## 技術重點

- **單檔頁面**：每頁 CSS／JS 全部 inline，無外部相依（僅 Google Fonts：Cormorant Garamond、Noto Serif TC、Jost）。
- **Favicon**：inline SVG data URI，與 `assets/logo.svg` 同源的 ML monogram。
- **插畫**：全站圖像皆為原創 SVG 單線條藝術（新娘剪影、捧花、緞帶對戒、肖像、老宅立面），無任何外部圖片。
- **動效**：IntersectionObserver 進場 fade＋上移（1.1s、`cubic-bezier(.19,1,.22,1)`）、SVG `pathLength="1"` 描線動畫（3s＋層疊延遲）、hover 金色底線由左緩慢展開（0.7–0.9s）。`prefers-reduced-motion` 時全數降級為靜態。
- **RWD**：900px 與 520px 兩個斷點；行動版導覽保留單列、雙欄版面收合為單欄。
- **表單**：`atelier.html#reserve` 的預約表單為純前端示意，攔截 submit 後顯示確認訊息，不會送出任何資料。

## 內容說明

品牌、人物、地址、電話與價格皆為虛構示意，僅供設計範例使用。價位帶（NT$ 68,000／128,000／258,000 起）參考台北高端婚紗攝影市場行情設定，非真實報價。

---

*本站由 **Claude Fable 5** 設計與建置（2026-07-11）。我們不介意你知道這是 AI 做的——這正是重點。*
