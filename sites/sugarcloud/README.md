# 糖雲 Sugar Cloud｜範例網站

台中棉花糖甜點店「糖雲 Sugar Cloud」的三頁式形象網站，採用「糖果粉彩（Candy Pastel）」設計風格：粉彩色系、圓潤 blob 有機形狀、果凍感互動與波浪分隔線。

## 檔案結構

```
sugarcloud/
├── index.html        首頁：品牌世界觀、鎮店三朵雲、品牌故事、門市預覽
├── menu.html         完整菜單：雲朵甜點 6 品項＋夢幻飲品 6 品項，各附原創 SVG 插畫與價格
├── stores.html       門市頁：SVG 手繪風地圖、兩間門市卡片（含店面插畫）、訂位與外送資訊
├── assets/
│   └── logo.svg      原創 logo（雲朵吉祥物＋中英文字標）
├── README.md         本檔案
└── SKILL.md          風格規格書（candy-pastel-style），供 AI 重現此風格
```

## 使用方式

純靜態網站，無建置流程。直接用瀏覽器開啟 `index.html` 即可，或起一個本機伺服器：

```bash
cd sugarcloud
python3 -m http.server 8000
# 開啟 http://localhost:8000
```

## 技術重點

- **單檔架構**：每頁 CSS/JS 全部 inline，三頁以相對路徑互連，導覽列與 footer 一致。
- **外部資源僅 Google Fonts**：`Baloo 2`（英文/數字圓體）＋ `Noto Sans TC`（繁中）。
- **圖像全原創**：所有插畫（菜單品項、地圖、店面、吉祥物）皆為手寫 inline SVG，favicon 為 SVG data URI，無任何外部圖片。
- **動效**：
  - 進場彈跳：IntersectionObserver + `cubic-bezier(.34,1.56,.64,1)`
  - 果凍壓扁 hover：`squish` keyframes（按鈕與導覽 CTA）
  - 持續動畫：漂浮糖果（`floaty`）、橫向飄雲（`drift`）、糖粒撒落（首頁 `sprinkleFall`）、blob 變形（`blobMorph`）、地圖大頭針脈動
- **RWD**：820px 以下收合為漢堡選單，卡片與菜單列轉為單欄。

## 品牌設定（虛構）

- 品牌：糖雲 Sugar Cloud，2021 年創立於台中審計新村旁。
- 門市：審計本店（西區民生路364巷12號）、崇德二店（北屯區崇德路二段188號）。
- 招牌：烤雲朵塔 NT$150（每日限量 100 份）。
- 本站所有店家資訊、電話、統編皆為示範用虛構內容。

## 風格重現

若要讓 AI 以相同風格製作其他頁面，請將 `SKILL.md` 全文提供給模型，內含色彩系統、字體、元件配方、動效參數與 Do & Don't。

---

*本站由 **Claude Fable 5** 設計與建置（2026-07-11）。我們不介意你知道這是 AI 做的——這正是重點。*
