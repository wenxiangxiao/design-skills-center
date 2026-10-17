# 鳳和喜餅 HŌNG-HÔ HÍ-PIÁNN

臺中市中區成功路 143 巷 7 號的喜餅舖。1958 年陳德和開「鳳和餅行」；1967 年起請綠川東岸「萬益證券印刷所」的林萬益師傅雕版，把一盒餅印成一張提貨券——扭索玫瑰章、彩虹底紋、凹版線雕、紅色號碼。現由陳素琴經營，林萬益的孫女林佩君於 2016 年重繪券版並加入可藏新人姓氏的潛像。

- 風格：**凹版雕刻 Intaglio／鈔券**（型錄「印刷與製程」）——本站取其**證券／禮券半身 Security Print · Iris Voucher**：彩虹印刷底紋、扭索紋、凹版線雕、紅號碼＋檢查碼、微縮字、證券框與存根騎縫、潛像。全館第 2 站（第 1 站 vaubernier 為車紋＋橢圓開窗＋墨綠胭脂）。
- 產業：喜餅舖／訂婚大餅提貨券
- 風格關鍵字：guilloche、rose engine、iris printing、split-duct、intaglio line engraving、microtext、numbering machine、Luhn check digit、counterfoil、perforation、latent image、decoder film

## 頁面

| 檔案 | 頁 | 內容 |
|---|---|---|
| `index.html` | 01 券面 | 存根券簿開場：首屏就是一張壹號提貨券；拖驗券片找潛像；四種面額；券面上的五道工；1967 年的那塊版 |
| `piann.html` | 02 餅目 | 四種面額各一張券（各自的玫瑰章、字軌、凹版線雕、潛像字），加購與試吃、大餅的規矩 |
| `kuan.html` | 03 印你們的券 | 核心功能：填名字 → 驗潛像 → 撕存根，得到估價收執、號碼起訖、版號、SVG 券樣與分享網址 |
| `lai.html` | 04 提貨 | 提貨方式、凹版地圖（示意）、券號檢查碼驗號、預約表（帶入訂券收執） |

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1960s 臺灣商家證券印刷（車床玫瑰章、號碼機、彩虹印刷），2016 年數位重繪 |
| locale 地域 | 臺中中區成功路、綠川東岸印刷所、訂婚送大餅的習俗 |
| voice 性格 | 老店櫃台口吻：講規矩、講效期、講號碼對不對得上 |
| texture 質感 | 髮絲線交織、浮起的凹版墨、彩虹墨在紙上的漸變、打孔騎縫 |
| density 密度 | 中高：券面內部沒有空白，空白只在券外 |
| function 功能 | 〈印你們的券〉名字種子重車玫瑰章＋驗券片找潛像＋撕存根得收執（工具／訂製） |
| opening 開場 | stub-and-coupon-first 存根券簿開場 |
| nav 導覽 | numberer-wheel 號碼機導覽 |

## 首創

**潛像驗券片 decoder-film latent image**：全館第一個把證券防偽的「潛像／加密線網」做成可操作介面——潛像帶內外是同一種 3 單位線、相位錯開半格的 `userSpaceOnUse` 線網（以 `<mask>` 的字形分區），肉眼看是一塊均勻灰；驗券片是一片跟著指標移動、自帶同頻線網的膠片（`mix-blend-mode:multiply`），疊上去時字形外是「線疊線」、字形內是「線填縫」，字就浮出來；膠片每上下移半格，正負像翻轉。〈印你們的券〉的潛像字是兩位新人的姓，玫瑰章由名字與日期的 FNV-1a 種子決定，所以每一對新人的券都是獨一無二的版。


## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-11` | Parallel Curves | primary #EE8C6A／secondary #B79AD6／bg #F4EFE6、duration 10、density 1.2、intensity 0.8、seed 1987 | ambient：十幾條同寬 2.4px 的柿橘與藤紫細波線慢慢起伏——就是券面底下那層彩虹底紋（iris underprint）在呼吸；彩虹只出現在細線、不填色，符合「彩虹只在底紋」。 |
| kuan.html | `TXT-A-28` | Slot | primary #C8232C／secondary #3A2347／bg #F4EFE6、text No.000318、duration 1.6、aspectRatio 16:9、seed 318（一次性，進視窗播放、點擊重播） | input：號碼機的字輪一格一格轉、由左到右依序停定成流水號——「印你們的券」這頁產出的就是一本有號碼的券簿；滾動中的字用號碼紅、停定後轉墨色，紅色只給號碼。 |
| lai.html | `TXT-B-13` | Scramble Decode | primary #6A4C7A／secondary #3A2347／bg #F4EFE6、text 憑券兌換、duration 1.4、aspectRatio 16:9、seed 7（一次性，進視窗播放、點擊重播） | input：「憑券兌換」先以亂碼閃動、由左至右逐字解出——像櫃檯核對券號與騎縫；淡藤紫亂碼、墨色定字，沒有發光沒有漸層。 |
| piann.html | `BG-B-24` | Crosshatch | primary #3A2347／secondary #6A4C7A／bg #F4EFE6、duration 8、density 1.6、intensity 0.8、seed 5、scroll true（捲動驅動） | input：兩組同寬的交叉排線隨捲動相對滑動——凹版線雕「濃淡只靠疏密」的雕線語法；捲動即推動雕刀，只用凹版藤紫兩階。 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-16，排程 Agent 自動執行）。店名、人物、門牌、電話、價格與「萬益證券印刷所」皆為虛構示意；提貨券為商家禮券示意，不仿任何真實貨幣。台中訂婚分送大餅、喜餅業者以提貨券代替整盒禮餅為真實習俗；扭索紋、彩虹印刷、凹版線雕、號碼機與潛像為真實證券印刷工藝。所有圖像皆由瀏覽器以數學曲線即時生成，無外部圖片。*
