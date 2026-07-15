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

### 2.3 AI 建置標示（透明原則）

Chris 不介意大家知道這是 AI 做的——這正是本館的賣點之一，也用來比較不同模型的能力。每個範例站**必須**標明建置模型，共三處：

1. `index.html` 的 `SITES` 陣列該筆資料加 `builtBy:"<模型名稱>"`（例：`"Claude Fable 5"`、`"Claude Opus 4.8"`），藝廊卡片會自動顯示「BUILT BY …」。
2. 站點 `README.md` 尾註：`*本站由 **<模型名稱>** 設計與建置（YYYY-MM-DD）。*`
3. 根 `README.md` 館藏表格的「建置模型」欄。

填**實際執行建置的模型名稱**，不可留空或亂填；一站由多模型協作時全部列出（例：`"Claude Fable 5 + Opus 4.8"`）。

另須區分**產出方式**：在主對話中由 Chris 盯場手工完成的，只寫模型名（例：`"Claude Fable 5"`）；由排程任務自主完成的，加註「· 排程 Agent」（例：`"Claude Opus 4.8 · 排程 Agent"`），README 尾註同步標明「（排程 Agent 自動執行）」。這讓館藏能同時對照「模型世代」與「有人監督 vs 全自動」兩個維度的品質差異。

### 2.4 版面原型輪替（結構層去AI化——最高優先）

2026-07-12 Chris 檢視全館後的核心回饋：**風格皮膚各異，但骨架大同小異**——21 站中 18 站開場是「大標 hero」、20 站導覽是「置頂列」。配色字體再怎麼換，同一副骨架就是新的 AI tell。因此：

1. **建站前必讀 `ledger.json`**（repo 根目錄）：記錄每站的 opening（開場原型）、nav（導覽原型）、signature（動效簽名）。原型清單也在檔案裡（12 種開場、6 種導覽，可提出新原型擴充清單）。
2. **硬規則**：
   - 新站 opening **不得**與「最近 5 站」的任何一站相同；
   - `hero-bigtype` 家族已嚴重超載，**在全館占比降到 40% 以下前，禁止再選 hero-bigtype**；
   - 每連續 4 站中，至少 1 站的 nav 不是 topbar（side-rail／masthead／hamburger-full／bottom-dock／anchor-index）；
   - signature 不得與任何既有站重複（帳本裡都列著）。
3. **開場原型是設計題不是填空題**：選 toc-first 就把首頁做成真正好用的目錄；選 os-metaphor 就讓介面隱喻服務產業敘事（如唱片廠牌做成混音台）。原型要與產業×風格合理契合，不是為不同而不同。
4. **插畫語言也要輪替（2026-07-12 Chris 第二次收斂回饋）**：細線幾何線描（線框小屋、單線物件）已氾濫成新的反射動作。ledger.json 新增 `illust` 欄位與 `_illust_roster` 技法清單（版畫、疊印、半調網點、交叉排線、剪紙拼貼、等角視圖、藍晒圖、點描、字符畫、色塊構成、生成藝術、圖樣織紋、立體構成…）。硬規則：新站插畫技法**不得與最近 4 站相同**；**thin-lineart 暫禁**直到全館占比 <30%；技法必須服務該站風格（版畫配報紙、藍晒圖配建築、半調網點配普普）。
5. **氛圍與語彙輪替（2026-07-15 Chris 第三次收斂回饋）**：收斂會不斷轉移陣地——這次逃到「色彩氛圍」與「動效/文案語彙」。診斷數據：過半站點是米白紙感底；「揭示進場」「數字計數」「按壓硬陰影」「dashoffset 描繪」重複出現；「EST. 19xx」徽章 8 站。因此：
   - **mood 欄位**：ledger 記錄每站底色氛圍（roster 見 `_mood_roster`）。硬規則：mood 不得與最近 3 站相同；**paper-light 米白紙感底暫禁**直到占比 <45%——多用彩色中間調底（深綠、磚紅、藍灰、芥末）、雙色域、粉彩、單色墨階。
   - **動效語彙頻率自查**：建站前檢視 `_overused_watchlist` 並統計帳本 signature，語彙出現 ≥3 次即過載禁用。通用淡入可用，但不得作為 signature 主打。
   - **文案禁令**：「EST. 19xx」徽章禁用；「老街屋/巷弄改建」開場敘事非必要不得再用；標題避免「把 X 變成 Y」模板。品牌敘事要從產業本身長出來。
   - **收斂是移動標靶**：Chris 每次點名的新收斂軸，都應轉譯成 `_overused_watchlist` 新條目與硬規則，並更新統計日。
6. **風格冷卻與家族輪替（2026-07-15 Chris 第四次收斂回饋）**：Chris 點名兩組近似畫面——(a) LASCELLE／恆嶽法律／月殿影展：Art Deco 被重用 3 次且每次都是「深底＋鎏金＋襯線徽章」同一公式；(b) 杏和堂／TANDVIK／MERIDIAN／CIVICA：北歐/瑞士/自然有機等近親風格排在一起就是四張「米白底資訊表」。因此（規則詳見 ledger `_style_reuse_rules` 與 `_style_families`）：
   - **同一風格全館最多 2 站**；重用時 mood、主色相家族、開場原型三者都必須與第一次不同。
   - **風格家族輪替**：血緣相近的風格（理性極簡家族、深色典雅家族等五族）不得連續出現，任一家族占比 ≤25%。選種子時先查自己屬於哪一族、上一站是哪一族。
   - **調色盤查重**：動手前掃 SITES 全部 palette，新站主色組合不得與任何既有站高度相似（同色相家族＋同明度結構＝相似）。
7. **七維配方（2026-07-15 擴充）**：種子庫擴充至 80 產業 × 48 風格，並新增 5 個變數維度（ledger `_variable_dims`：era 時代／locale 地域／voice 性格／texture 質感／density 密度）。每站建站時抽取各維度組成配方，**至少落實 3 項**並寫入站點 README（例：「1960s × 台式 × 幽默嘴砲 × 霓虹光 × 極密」的牙醫診所）。配方抽取避免與最近 3 站雷同。目的：把設計決策從模型預設品味手中拿走，交給配方。
8. **完成後 append `ledger.json`**，一站一筆（slug／opening／nav／signature／illust／mood）。QA 清單含此項。

## 3. 檔案與目錄規範

```
design-skills-center/
├── index.html      藝廊（卡片牆，資料驅動，見 §5）
├── seeds.html      種子庫（80 產業 × 48 風格 + 指令生成器）
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
3. **更新藝廊**：在 `index.html` 的 `SITES` 陣列**加一筆**（slug、name、en、industry、style、lang、desc、palette 5 色以內、**builtBy 建置模型**，見 §2.3）。卡片、篩選、live iframe 縮圖會自動生成，不需要手動加 HTML。
4. **更新首頁統計數字（務必！易漏）**：`index.html` hero 的四格統計是**硬編碼**的，新增站後一定要同步：
   - `#n-sites`（完整範例站）：等於 `SITES.length`（現行版本已加一段 JS 自動同步，但 HTML 預設值仍要一起改對，避免 JS 失效時顯示錯誤）。
   - `#n-pages`（頁面）：加上新站的頁數（例：新站 3 頁 → 舊值 `24+` 改 `27+`）。
   - `#n-ind`（產業種子）、`#n-sty`（風格種子）：為種子庫**總量**（80／48），除非 `seeds.html` 陣列真的增減種子，否則不動。
   - 藝廊 `VOL.0X — 2026` 卷號標籤與 README 標題保持一致。
5. **更新種子庫**：在 `seeds.html` 的 `INDUSTRIES` / `STYLES` 陣列，把用掉的產業與風格第二值改成 `1`（標記「已有範例」）。若該軸原本已是 `1`（重用情形），維持 `1` 不變即可——標記只代表「有沒有範例」，不計次數。
6. **更新 README.md**：館藏表格加一列，含「建置模型」欄（並確認 `## 目前館藏（Vol.0X）` 卷號與藝廊一致）；站點自身 README 加建置模型尾註（§2.3）。
7. **QA 清單**（全部通過才能推送）：
   - [ ] 所有內部連結存在（含跨頁 nav）
   - [ ] inline JS 通過 `node --check`
   - [ ] SKILL.md frontmatter 與章節齊全
   - [ ] favicon 為原創 inline SVG data URI
   - [ ] 無外部圖片、無 Lorem ipsum、無 emoji icon
   - [ ] 手機寬度（≤560px）版面不破
   - [ ] 首頁 hero 統計數字（站數／頁數／卷號）已同步（見第 4 步）
   - [ ] 未落入跨站重複模板；跑馬燈非反射式套用（見 §2.1）；本站有可辨識的獨特版面/互動
   - [ ] 已讀 `ledger.json` 並遵守 §2.4 輪替規則（opening 與最近 5 站不同、非 hero-bigtype、signature 不重複）；完成後已 append 帳本
8. **推送**：commit 訊息格式 `Add <slug>: <產業> × <風格> (Vol.XX)`。推送到 `main`，GitHub Pages 會自動部署。

## 6. Git 與部署

- 分支：只用 `main`。Pages 設定：Deploy from branch `main` / root。
- 認證：使用 Chris 提供的 GitHub PAT（若失效，向 Chris 索取新 token，不可自行嘗試其他認證途徑）。
- commit author：`Chris <wenxiang.xiao@gmail.com>`。
- repo 根目錄必須保留 `.nojekyll` 檔：停用 GitHub Pages 的 Jekyll 處理，否則所有 `.md`（含 SKILL.md 下載連結）會被 Jekyll 轉成 .html 導致 404。
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
