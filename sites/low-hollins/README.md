# 荷林斯種子借閱所 Low Hollins Seed Library

> 傳家種子借閱所 × 十字繡樣本繡 Cross-stitch Sampler

英格蘭坎布里亞郡 Staveley 村，Kent 河邊一間舊閱覽室改成的種子圖書館：312 個英國老品種免費借，一人一季最多六包；十月三十一日前還一包種子回來，再在北牆那卷 14.6 公尺的歸還卷上繡一方自己的姓名縮寫和年份。

## 品牌設定

| 項 | 內容 |
|---|---|
| 館名 | 荷林斯種子借閱所 Low Hollins Seed Library |
| 地址 | The Old Reading Room, Brow Lane, Staveley, Cumbria LA8 9PH |
| 電話 | 015394 82117 |
| 開放 | 週三 14:00–19:00・週六 10:00–16:00（十二月、一月只開週六）；週四 18:30 針線會 |
| 人 | Margery Tyson（創館、看抽屜）、Ellen Dockray（針線會） |
| 數字 | 傳家品種 312 種・借閱人 1,140 位・去年歸還率 71%・歸還卷 3,806 方 |

## 頁面

| 檔案 | 頁 | 內容 |
|---|---|---|
| `index.html` | 樣本繡 SAMPLER | 首屏一整塊 89×132 格的樣本繡（字母、數字、房子與院子、散點母題、格言、署名、藤邊框）＋縫上去的營業標籤；可翻到背面；最下面一行依真實時刻從午夜繡到午夜 |
| `seeds.html` | 種子目錄 SEEDS | 散點樣本繡式目錄：9 個品種，各有繡出的母題、播種／收成月帶、借出與還回包數；依類別篩選 |
| `stitch.html` | 一方繡 STITCH | 核心功能：照繡樣卡繡一方，翻過來由真實針序算出背面並評分，完成可縫進歸還卷 |
| `return.html` | 歸還卷 RETURN | 歸還卷（預置 16 方＋你縫進來的）、借還規矩、2026–27 年日子、交通 |

## 風格關鍵字

counted cross-stitch・marking sampler・band / spot sampler・Aida / 28-count linen over two・5×7 marking alphabet・mirror-symmetric motifs・strawberry-vine border・madder / weld / indigo / iron-black・Danish method・back of the work

## 八維配方

| 維度 | 本站 |
|---|---|
| industry | 傳家種子借閱所（種子圖書館・借種還種・歸還卷） |
| style | 十字繡樣本繡 Cross-stitch Sampler（型錄「繪畫與材質／刺繡 Sashiko／十字繡」條目的十字繡半身，全館第 1 站） |
| era / locale | 1700–1850 英國女學校樣本繡 × 2026 坎布里亞郡村落 |
| voice | 閱覽室值班的人：具體、有數字、會說「週三 Margery 在」 |
| texture | 生麻布的格與孔、兩股絲線的光澤 |
| density | 首屏一塊滿版的布，其餘分帶疏排 |
| opening | **sampler-first 樣本繡直開場** |
| nav | **charted-to-stitched 繡樣卡→已繡**：現用頁已繡、其他頁還是印刷繡樣，hover 當場繡上 |
| illust | **counted-cross 計數十字構成** |
| mood | **raw-linen-faded-floss 生麻與褪色絲線** |
| function | 〈一方繡〉：照繡樣卡繡，翻面看背面評分（遊戲＋蒐集型，非模擬） |
| **tech 技術** | Canvas 2D 精靈貼圖 drawImage＋createPattern（A）／CSS 3D preserve-3d＋backface-visibility 翻面（B）／IndexedDB 跨頁歸還卷＋由針序推算背面（E） |

## 認領的首創

**由真實針序推算的織物背面（back-of-work derived from stitch order）**：全館第一個把「作品的背面」當成可計算、可評分的頁面狀態。每一條腿有兩個孔，演算法依使用者實際下針的順序，選較近的孔入針、把上一針出針點到這一針入針點畫成背線；跳線、線頭、背線總長全部由此得出。同一個圖案、同樣繡對，正面完全相同，背面卻會因順序不同而整齊或一團亂——這是十九世紀針線老師把樣本繡翻過來打分數的那個判準，第一次被做成網頁互動。

## 動效預算

- **ambient**：首頁最下面一行「今天」依真實時刻從午夜繡到午夜；針在最新一格上下起落、線尾擺動
- **input-driven**：任何繡布上的「數格子」虛線十字準線＋列／格／色讀數；導覽 hover 當場繡上
- **transition**：CSS 3D 沿垂直軸翻到背面（背面預先鏡像繪製）
- **signature**：**丹麥式往返繡**——每一段同色的橫排，先由左到右鋪完所有「／」，再由右到左回來蓋上「＼」

四種皆有 `prefers-reduced-motion` 降級，降級後直接顯示最終狀態，資訊零損失。

---

*館名、人名、地址、電話與數字皆為虛構示意；品種名（Carlin、Crimson Flowered、Painted Lady、Sweet William、Baron Solemacher、Bull's Blood、Red Brunswick、Pentland Brig）為真實的英國傳家品種。*

*本站由 **Claude Opus 5.5** 設計與建置（2026-09-23，排程 Agent 自動執行）。*
