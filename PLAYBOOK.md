# PLAYBOOK — Design Skills Center 開發憲章

> **給接手的 AI（Opus 4.8 或任何後繼模型）：這份文件是本專案的唯一真相來源（Single Source of Truth）。**
> 開始任何開發前，先完整讀完本文件。所有產出必須符合這裡的規範，規範本身若要修改，需經 Chris（repo 擁有者）同意。
>
> Repo：`wenxiangxiao/design-skills-center`（公開）
> 線上站：https://wenxiangxiao.github.io/design-skills-center/
> 初版由 Claude Fable 5 於 2026-07-11 建立（Vol.01，5 個範例站）。

---

## 1. 專案使命

建立一座「去AI化」網頁設計風格圖書館。每個館藏（範例站）同時交付：

1. **Demo 網站** — 3 頁以上、完整可瀏覽、含原創 Logo/favicon/SVG 插畫/動畫的真實網站。
2. **README.md** — 品牌設定、頁面清單、風格關鍵字。
3. **SKILL.md** — 核心資產。將整套視覺語言寫成任何 AI 讀完即可重現的規格書。

使用者的工作流程：逛藝廊 → 看中風格 → 下載 SKILL.md → 交給 AI 開發同風格的新網站。**風格與內容分離**：SKILL 定義風格，不綁定產業。

## 2. 核心設計原則（不可妥協）

### 2.1 去AI化禁令

- 禁止紫藍漸層 hero
- 禁止「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板
- 禁止 emoji 當 icon（icon 一律自繪 SVG）
- 禁止千篇一律 rounded-2xl + 模糊陰影卡片
- 禁止 Lorem ipsum 與 AI 腔文案（「在當今快節奏的世界」之類）
- 禁止預設字感（直接用系統字體堆疊而無字體個性）

### 2.2 必須做到

- 不對稱版面、有個性的字體配置、獨特配色語言
- 品牌文案虛構但真實可信：具體的人名、價格、地址、電話、營業時間
- 所有圖像原創（SVG／CSS／canvas），**零外部圖片**；外部資源僅允許 Google Fonts
- 每站必有符合該風格的動畫與互動；提供 `prefers-reduced-motion` 降級
- RWD 響應式，手機可用
- 若涉及金融等敏感題材，頁面需標示「資料皆為虛構示意」

## 3. 檔案與目錄規範

```
design-skills-center/
├── index.html      藝廊（卡片牆，資料驅動，見 §5）
├── seeds.html      種子庫（48 產業 × 28 風格 + 指令生成器）
├── guide.html      使用指南
├── README.md
├── PLAYBOOK.md     本文件
└── sites/<slug>/   範例站，slug 用小寫英文-連字號
    ├── index.html          首頁（必要）
    ├── <page2>.html        內頁（至少 2 個）
    ├── assets/logo.svg     原創 Logo
    ├── README.md           繁中
    └── SKILL.md            風格規格書
```

技術規範：每頁**單檔 HTML**（CSS/JS 全 inline）、頁面間用相對路徑互連、全站頁面共用一致的導覽列與 footer、favicon 用原創 inline SVG data URI 寫在 `<head>`。

## 4. SKILL.md 格式（嚴格遵守）

YAML frontmatter：`name`（英文 kebab-case 風格代號，全館不可重複）、`description`（英文一句話）。

內文繁體中文，章節依序：**設計哲學／色彩系統（hex 色票+用途+比例）／字體系統（來源、字級 scale、字重行高）／版面與網格（含旋轉角度、留白規則）／元件配方（nav、按鈕、卡片、表單、footer 的具體 CSS 做法）／動效規則（每種動畫的觸發、duration、easing 具體值）／插畫與圖像風格／Logo 與 Favicon 設計指南／Do & Don't（含去AI化禁令）／頁面骨架範例（可直接使用的 HTML 片段）**。

驗收標準：一個從未看過 Demo 的 AI，只讀 SKILL.md 就能做出風格一致的全新網站。

## 5. 新增範例站標準流程（SOP）

1. **選種子**：從 `seeds.html` 的清單挑一組尚未做過的「產業 × 風格」。優先消化風格種子（每種風格至少要有一個完成品），同產業避免重複風格。
2. **建站**：在 `sites/<slug>/` 依 §2–§4 建立全部檔案。
3. **更新藝廊**：在 `index.html` 的 `SITES` 陣列**加一筆**（slug、name、en、industry、style、lang、desc、palette 5 色以內）。卡片、篩選、live iframe 縮圖會自動生成，不需要手動加 HTML。
4. **更新種子庫**：在 `seeds.html` 的 `INDUSTRIES` / `STYLES` 陣列，把用掉的種子第二個值改成 `1`（標記 DONE）。
5. **更新 README.md**：館藏表格加一列。
6. **QA 清單**（全部通過才能推送）：
   - [ ] 所有內部連結存在（含跨頁 nav）
   - [ ] inline JS 通過 `node --check`
   - [ ] SKILL.md frontmatter 與章節齊全
   - [ ] favicon 為原創 inline SVG data URI
   - [ ] 無外部圖片、無 Lorem ipsum、無 emoji icon
   - [ ] 手機寬度（≤560px）版面不破
7. **推送**：commit 訊息格式 `Add <slug>: <產業> × <風格> (Vol.XX)`。推送到 `main`，GitHub Pages 會自動部署。

## 6. Git 與部署

- 分支：只用 `main`。Pages 設定：Deploy from branch `main` / root。
- 認證：使用 Chris 提供的 GitHub PAT（若失效，向 Chris 索取新 token，不可自行嘗試其他認證途徑）。
- commit author：`Chris <wenxiang.xiao@gmail.com>`。
- 若在掛載目錄遇到 git lock 問題（`HEAD.lock: Operation not permitted`），改用 clone 到 `/tmp` → rsync 工作區（排除 `.git`）→ commit → push 的流程。

## 7. 主站（hub）設計語言

主站自己也遵守去AI化。現行語言：紙白 `#F5F1E8`、墨黑 `#141414`、國際橘 `#FF4D00`；Noto Serif TC 900 標題 + Space Grotesk 編號/標籤；2px 實線分格、無圓角、editorial index 風。修改主站時維持此語言，不要引入新配色。

## 8. 擴充路線圖（建議，非強制）

- Vol.02：優先補齊高需求風格——瑞士國際主義、野獸派、奢華精品風、和風極簡、Y2K。
- 每站可考慮加 `preview.png`（供社群分享 OG image），但 iframe 縮圖仍是藝廊主要預覽方式。
- 館藏超過 20 站時：seeds.html 與藝廊合併搜尋、SITES 陣列外移為 `sites.json`。
- 未來若加入多人貢獻：SKILL.md 增加 `version` 與 `changelog` 欄位。

## 9. 承接檢查清單（新模型上工第一天）

1. 讀完本 PLAYBOOK 與 `guide.html`。
2. 瀏覽線上站，實際打開至少 2 個 Demo 與其 SKILL.md，校準品質基準。
3. 檢查記憶（memory graph）中的 `Design Skills Center` 實體，取得最新狀態與待辦。
4. 執行一次 §5 SOP 產出新站，推送前跑完 QA 清單。
5. 有任何規範衝突或不確定，先問 Chris，不要自行改規範。

---

*最後更新：2026-07-11 by Claude Fable 5*
