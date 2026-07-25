# VAIRCOURT 韋爾閣紋章院

**產業：** 紋章設計院（College of Arms）　**風格：** 彩飾盾徽紋章風 Emblazon-Illuminated（dark-moody 皇家紫暗底）

一間架空的歐陸執業紋章院。本站的核心不是一張漂亮的盾牌海報，而是一支**文法引擎**：這裡不畫紋章，只以 blazon（宣讀文法）一層一層砌——底色、榮譽紋帶、紋章物、安排、聯姻四分、幼子差痕——引擎即時 emblazon（彩飾）成盾徽，同時生成它的正規 blazon（英文＋中文釋讀）。**異色律**（金屬不置金屬、顏色不置顏色）會在你把顏色疊上顏色時當場攔下你、指出違例，違例的盾本院不予登錄。全站每一張圖像（盾徽、紋章物、logo、favicon、授證印記、單色刻線）都是同一支引擎的輸出，零外部圖片。

## 品牌設定

- **院名：** VAIRCOURT 韋爾閣紋章院（vair 為紋章之一種毛皮紋）
- **地點：** Rue de l'Écu 12, Vaircourt-sur-Meuse（虛構歐陸小城）
- **職掌：** 新授紋章、既有紋章登錄、幼子差痕頒定、聯姻四分
- **院訓：** *Non pingimus — blasonamus.*（我們不畫紋章，我們以文法宣讀之。）
- **首席紋章官：** Léonor de Vaux（韋爾閣首席紋章官）
- **電話：** +33 3 55 01 88（虛構示意）
- **在錄家系：** 二十四族（de Vaux、Aldreth、Morleigh、Brière、Caldwell、Revel、Thorne、d'Aumont…皆虛構）

## 頁面清單

1. **index.html — 盾面工作台 ATELIER**：核心互動。以 blazon 文法組構台逐層砌盾（底色／分區→榮譽紋帶→紋章物與數目→聯姻四分→幼子差痕），即時 emblazon 並生成 blazon 文句，異色律即時校驗（違例駁回並指出違例處）；可切換單色刻線（hatching）、產生 `?arms=` 盾徽碼分享、一鍵「授一面合法盾」。
2. **armory.html — 紋章名鑑 ROLL OF ARMS**：二十四族家系的紋章名鑑，每面盾由同一支引擎彩飾，可依底色、榮譽紋帶、紋章物即時檢索＋家系搜尋＋計數，每張卡可帶 `?arms=` 碼回工作台開啟。
3. **blazonry.html — 盾徽之法 BLAZONRY**：紋章學規則全文靜態可讀——色系與刻線對照表、異色律（合律 vs 違律示範盾）、九種榮譽紋帶、十七種紋章物、聯姻四分、六種幼子差痕、要略，皆配程序生成之示範盾。
4. **grant.html — 授證委託 GRANT OF ARMS**：三步驟委託表單（擇服務→備家系資料含驗證→確認授證），可貼入盾徽碼即時預覽，通過驗證後生成登錄號 `VC-YYMMDD-NNN` 與彩飾印記證書。

## 風格關鍵字

皇家紫暗底、金線分格、blazon 文法引擎、emblazon 盾徽構成、異色律即時校驗、heraldic hatching 單色刻線、聯姻四分、幼子差痕、Cormorant Garamond × Noto Serif TC × Spline Sans Mono、歐陸中世紀泥金抄本、去AI化。

## 八維配方

- **era：** 當代（執業紋章院，行中世紀傳承之藝）
- **locale：** 歐陸（虛構法語系小城 Vaircourt-sur-Meuse）
- **voice：** 嚴肅職人（紋章官的儀典式短句，行話由紋章學長出）
- **texture：** 金屬（金箔／金線／tincture 的實色感）
- **density：** 中等
- **function（必做核心）：** 客製化配置器——盾徽 blazon composer：選底色／分區→榮譽紋帶→紋章物與數目→聯姻四分→幼子差痕，即時 emblazon＋異色律驗證＋blazon 文字生成＋`?arms=` 分享碼＋一鍵授合法盾。有輸入、有狀態變化（盾面即時重繪、合律判語翻轉、刻線切換）、有結果回饋（可登錄／不予登錄＋違例指認、可帶去授證登錄）。與 jiaobai（摺染對稱群配置器）、xiulu（鐵窗花 WFC 配置器）的差別：本站的互動對象是受 blazon 文法統治、受異色律約束、可 marshalling 記錄血脈的紋章構成，而非對稱群或約束傳播。

## 首創（登記於 ledger `_first_registry`）

**紋章文法（blazon）作為互動範式與全站 emblazon 引擎（emblazon-illuminated / vaircourt）**：全館第一個以「一段可宣讀的盾面文法」為核心互動的站。使用者不是選色換皮，而是以 field→ordinary→charge→arrangement→marshalling→cadency 的文法逐層砌盾，引擎即時彩飾並生成正規 blazon；三條真實紋章法則被寫成規則引擎——異色律（rule of tincture）即時駁回金屬疊金屬／顏色疊顏色、marshalling 四分記錄聯姻血脈、cadency 差痕別長幼。與 shaft-eight（織法矩陣渲染平面布料）、yongzi-foundry（字形骨架合成）、jiaobai（對稱群作用於防染基本域）、xiulu（WFC 約束傳播）皆不同：本站的被渲染物是一個**紋章描述文法**的解，且其合法性由一套會拒絕使用者的紋章法則裁定。

## 動效與去AI化自查

- 動效自查避開四項過載語彙：不以「揭示淡入」當簽名、無數字計數、不以按壓硬陰影當簽名、無 stroke-dashoffset 描繪。無跑馬燈、無自動輪播、無自動播放。識別性來自「宣讀→彩飾→校律」的核心互動本身。
- 版面骨架去AI化：無置頂列（改用四分盾導覽／底部 dock）、無置中大標＋兩鈕＋三圓卡、無圓角泡泡＋模糊陰影、無紫藍漸層 hero（本站紫為實色暗底非漸層）。
- 文案無 EST.19xx 徽章、無「老街屋改建」敘事、無「把 X 變成 Y」句式；行話由紋章學長出（blazon／emblazon／tincture／rule of tincture／marshalling／cadency／dexter／proper）。
- reduced-motion 下關閉所有 transition 與滾動補間，核心玩法不減；各頁附 `<noscript>` 保底指向靜態規則頁與電話。
- 零外部圖片與音檔、零 3D、零 WebGL、零第三方函式庫，僅 Google Fonts（Cormorant Garamond＋Noto Serif TC＋Spline Sans Mono）。

## 驗證

- 四頁 inline JS 全通過 `node --check`；以 jsdom 實跑四頁無 JS 錯誤。
- emblazon 引擎：24 族家系與 17 種紋章物程序渲染皆為合法 SVG、無 NaN／undefined；刻線模式同。
- 異色律校驗：金屬疊金屬／顏色疊顏色即判「不予登錄」並指認違例，更正後翻為「可登錄」（已於互動測試驗證）。
- 授證表單：稱呼≥2、家系非空、手機 `^09\d{8}$`、Email 選填格式驗證；通過後生成 `VC-YYMMDD-NNN` 登錄號與印記證書（已於互動測試驗證）。
- 盾徽碼 `?arms=` encode／decode round-trip 一致；名鑑卡片可帶碼回工作台。

---

*院名、人名、地址、電話、費用、家系與其紋章、登錄號、年份均為虛構教學示意。紋章學規則（異色律、marshalling、cadency）依歐洲傳統通例簡化編寫，供風格示範，正式授紋依各國紋章主管機關規章。授證委託表單為前端模擬，不送出、不留存任何資料。*

*本站由 **Claude Opus 4.8**（排程 Agent 自動執行）設計與建置（2026-07-25）。*
