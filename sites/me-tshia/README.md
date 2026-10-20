# 暝車客運 MÊ-TSHIA NIGHT COACH — 企鵝平裝三段式封面 Penguin Horizontal Grid

臺北太原路巷子裡的夜班客運。1979 年 3 月，中山高速公路全線通車的第二年，葉明德開著兩台二手遊覽車跑臺北—高雄夜班，在牯嶺街舊書攤買了 140 本平裝書，一個椅背袋放一本：坐到哪，讀到哪。1986 年起自己印「暝車文庫」——每條路線一種顏色，每本的厚度剛好是一趟車程。2009 年女兒葉素琴接手。（公司、人物、地址、電話、班次、票價皆為虛構；中山高速公路、蘇花改與各休息站、地名為真實背景。）

## 頁面

| 檔案 | 頁 | 內容 |
|---|---|---|
| `index.html` | 封面 | 可掀開的三段式封面（下有扉頁與目次）、封底文案、今晚的四本（小車依臺北真實時間走在書脊上）、沿革 |
| `read.html` | 讀一本 | 核心功能〈一夜一本〉：挑一本書、翻六頁、三個選擇，最後一頁的版權頁就是車票（純 CSS `:has()` 狀態機） |
| `routes.html` | 書目 | 四條路線＝四本書；點書名從架上抽出書卡（popover），看時刻表、選日期張數留位；附錄：包車、寄物、除夕停駛 |
| `colophon.html` | 版權頁 | 創立、候車室、售票、乘車須知、位置示意圖 |

## 風格關鍵字

Penguin 1935 水平網格、三段色帶、顏色＝分類、Gill 式人文無襯線大寫、橢圓 cartouche、書脊、扉頁、目次點線、頁碼置下中、版權頁、白線雕圓框

## 八維配方

- **industry**：夜班客運兼椅背袋文庫
- **style**：企鵝平裝三段式封面 Penguin Horizontal Grid（型錄「印刷與製程」2026-10-20 新增條目，全館第 1 站）
- **era**：1935–1949（Edward Young → Jan Tschichold）× 1979–2026 夜班客運
- **locale**：倫敦平裝書 → 臺北太原路、國道一號、蘇花、南迴
- **voice**：司機的短句——「書留在位子上就好，明天晚上它會回臺北。」
- **texture**：平裝書——米色書頁、平塗色帶、1.5px 墨線
- **density**：中低；正文欄寬 ≤34em，大量留白
- **function**：〈一夜一本〉分歧小說（敘事）＋車票（非模擬儀器台、無量表、無參數滑桿）

## 八維之外

- opening：`tri-band-cover-first` 三段式封面開場（新原型）
- nav：`spine-rack` 書脊架導覽（新原型）
- illust：`line-tint-roundel` 白線雕圓框（新技法）
- mood：`paperback-cream-bands` 平裝米頁・分類色帶（新 mood）
- tech：CSS `:has()`＋radio 狀態機（E）・`@starting-style`＋`allow-discrete`＋Popover（B）・`text-wrap`／`hanging-punctuation`／counters（C）

## motion-library 特效

| 頁 | 元件 | 承載 |
|---|---|---|
| 封面 | BG-B-18 Horizontal Lines | 一疊平放平裝書的側面色帶（ambient） |
| 讀一本 | TXT-A-02 Letter Sequence | 標題「一夜一本」逐字排進版（transition，一次性） |
| 讀一本 | BG-B-37 Minimal Stripes | 書架上滑過的一排書脊（ambient） |
| 書目 | SHP-31 Domino Fall | 除夕停駛：架上的書一本推一本倒下（transition，一次性） |
| 版權頁 | TXT-A-08 Slide Text | 「版權頁」滑入並畫出白帶裡的那條短線（transition，一次性） |

來源：motion-library v1.8.0 @3020d75（繪製核心子集＋motion-player.js）。

## 首創

**分歧小說（gamebook）作為核心功能，且由純 CSS `:has()` 狀態機驅動**：全館第一個以「選擇你的路線」敘事當核心互動的站——4 本書 × 6 頁 × 3 個二選一由 19 個隱藏 radio 持有，`:has()` 決定顯示哪一頁、哪一條路線的段落、拼出哪一種結局，並在無 JavaScript 時仍能從頭讀完並拿到車票；結局頁是一張「版權頁＝車票」（著者＝司機、本刷＝今夜、座位＝你選的窗或走道）。同時是全館第一個 Penguin 三段式平裝流派站，以及第一個「整站的上下色帶就是目前所在系列」的分類色帶簽名（色即目錄）。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-20）（排程 Agent 自動執行）。*
