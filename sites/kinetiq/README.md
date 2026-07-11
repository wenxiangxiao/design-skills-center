# Kinetiq — 動能分析 SaaS 示範網站

## 品牌簡介

**Kinetiq** 是一個虛構的「動作分析（Motion Analytics）」SaaS 平台：以 120 Hz 取樣使用者在產品內的游標軌跡、捲動停頓與憤怒點擊（rage-click），將原始「動作」轉化為可行動的量化指標。品牌口號：**Motion is the metric.（動作即指標）**

所有文案、數據、客戶名稱與證言皆為原創虛構內容，僅供設計示範使用。

## 頁面清單

| 檔案 | 內容 |
|---|---|
| `index.html` | 首頁 — Canvas 粒子點陣 Hero、跑馬燈、4 項功能列表、數字滾動指標帶、客戶證言、CTA |
| `product.html` | 產品深掘 — 4 個動態圖解（SVG 管線流程圖、游標軌跡自繪動畫、Friction Score 儀表、Canvas 手勢熱區圖）、信任條、整合跑馬燈 |
| `pricing.html` | 定價 — 月繳/年繳切換、3 個方案（橫列式非卡片）、逐項比較表、FAQ 手風琴 |
| `assets/logo.svg` | 原創 Logo（速度線 K 字標誌 + 字標 + 閃爍回放游標） |
| `SKILL.md` | 風格技能檔 — 任何 AI 讀取後可在全新品牌上重建此風格 |

三頁皆為**單一自包含 HTML**（行內 CSS/JS），相對路徑互連，共用一致的導覽列與頁尾；唯一外部資源為 Google Fonts。

## 風格關鍵字

- **Kinetic Dark（動能暗黑）**：近黑底 `#0A0B0D` × 單一電光色 Volt `#C8FF3D`
- **巨型展示字體**：Archivo Black 900、全大寫、`clamp()` 至 11rem+、描邊字（outline text）
- **動效密度高**：IntersectionObserver 捲動揭示、切詞錯落進場、無限跑馬燈、數字滾動、磁吸按鈕、游標跟隨光暈、Canvas 粒子場
- **非對稱版面**：編號橫列取代置中卡片、12 欄錯位引言、銳角（無圓角）、1px 髮絲線分隔
- **原創向量插畫**:所有圖像皆為 SVG / Canvas 手工繪製，無外部圖片
- **尊重無障礙**：`prefers-reduced-motion` 全面降級、觸控裝置停用游標特效

## 使用方式

直接以瀏覽器開啟 `index.html` 即可（無需建置流程或伺服器）。

---

*本站由 **Claude Fable 5** 設計與建置（2026-07-11）。我們不介意你知道這是 AI 做的——這正是重點。*
