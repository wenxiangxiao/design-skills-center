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
- 避免「跨站重複的結構性模板」——即使配色字體不同，若每個站都長同一副骨架，就是新的 AI tell。**跑馬燈（marquee/ticker）不是被禁止，而是出現比例過高**：目前約 7/9 站都有，變成了反射動作。規則是**控制比例、不要每站都放**——放之前先自問「這個風格真的需要捲動橫幅嗎？」。只有當它是該風格語彙的一部分時才用（如復古終端機的報價帶、普普風的貼紙帶）；其餘情況優先用別的「動效簽名」承擔重點資訊（靜態資訊列、hover 反色、進場揭示、時刻表、對角構成等）。核心目標：每站至少有一個「別站沒有」的識別性版面或互動，整個館藏的動效手法要**分散**而非收斂到同一招

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

1. **選種子（廣度優先，之後可重用）**：從 `seeds.html` 挑一組「產業 × 風格」。
   - **`1`（DONE）的真正意義是「此軸已有 ≥1 個範例」，不是「退休、不可再用」。** seeds.html 的標記只影響外觀，程式不會鎖住已標記的種子。
   - **廣度優先**：只要還有第二值為 `0` 的風格，就優先選沒有任何完成品的風格；同理盡量補沒碰過的產業。目標是先讓每種風格、每個產業都至少有一個範例。
   - **全部覆蓋後允許重用**：當風格（或產業）都已是 `1`，即可自由重用——同一種風格搭不同產業（美術館×瑞士 vs 咖啡廳×瑞士）是兩個不同作品，都算有效新館藏。48×28=1344 種組合，`1` 只是廣度階段的進度條，不封頂。
   - **唯一性看「組合」不看單軸**：真正不可重複的是「產業＋風格」這一對。動手前**先掃 `index.html` 的 `SITES` 陣列**，確認要做的 industry×style 組合尚未存在即可。
2. **建站**：在 `sites/<slug>/` 依 §2–§4 建立全部檔案。
3. **更新藝廊**：在 `index.html` 的 `SITES` 陣列**加一筆**（slug、name、en、industry、style、lang、desc、palette 5 色以內）。卡片、篩選、live iframe 縮圖會自動生成，不需要手動加 HTML。
4. **更新首頁統計數字（務必！易漏）**：`index.html` hero 的四格統計是**硬編碼**的，新增站後一定要同步：
   - `#n-sites`（完整範例站）：等於 `SITES.length`（現行版本已加一段 JS 自動同步，但 HTML 預設值仍要一起改對，避免 JS 失效時顯示錯誤）。
   - `#n-pages`（頁面）：加上新站的頁數（例：新站 3 頁 → 舊值 `24+` 改 `27+`）。
   - `#n-ind`（產業種子）、`#n-sty`（風格種子）：為種子庫**總量**（48／28），除非 `seeds.html` 陣列真的增減種子，否則不動。
   - 藝廊 `VOL.0X — 2026` 卷號標籤與 README 標題保持一致。
5. **更新種子庫**：在 `seeds.html` 的 `INDUSTRIES` / `STYLES` 陣列，把用掉的產業與風格第二值改成 `1`（標記「已有範例」）。若該軸原本已是 `1`（重用情形），維持 `1` 不變即可——標記只代表「有沒有範例」，不計次數。
6. **更新 README.md**：館藏表格加一列（並確認 `## 目前館藏（Vol.0X）` 卷號與藝廊一致）。
7. **QA 清單**（全部通過才能推送）：
   - [ ] 所有內部連結存在（含跨頁 nav）
   - [ ] inline JS 通過 `node --check`
   - [ ] SKILL.md frontmatter 與章節齊全
   - [ ] favicon 為原創 inline SVG data URI
   - [ ] 無外部圖片、無 Lorem ipsum、無 emoji icon
   - [ ] 手機寬度（≤560px）版面不破
   - [ ] 首頁 hero 統計數字（站數／頁數／卷號）已同步（見第 4 步）
   - [ ] 未落入跨站重複模板；跑馬燈非反射式套用（見 §2.1）；本站有可辨識的獨特版面/互動
8. **推送**：commit 訊息格式 `Add <slug>: <產業> × <風格> (Vol.XX)`。推送到 `main`，GitHub Pages 會自動部署。

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
