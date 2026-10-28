# 蓮池行 LIÂN-TÎ — 白河蓮子行 × Mithila／Madhubani 繪畫

臺南白河的蓮子行（虛構）。林玉蘭（1958–）種、普莉雅・查 Priya Jha（1981–，比哈爾邦 Madhubani 縣 Jitwarpur 村人）畫，2012 年起每一盒蓮子都附一張手繪 Mithila 卡。

- 帶蓬鮮蓮蓬 NT$60／支・去芯鮮蓮子 300g NT$380・日曬乾蓮子 600g NT$720・蓮心茶 50g NT$260・蓮藕粉 400g NT$450・荷葉茶 30 包 NT$220・「成雙」禮盒 NT$1,280・手繪 Mithila 卡 NT$350
- 週六 Kachni 線畫課 09:30–12:00 NT$1,500・清晨賞蓮小船（6–9 月 05:30／06:30）NT$250
- 臺南市白河區蓮潭里竹門 47 號〔門牌虛構〕・07:00–17:00 週二公休・(06) 685-1218

白河蓮花季、國道 3 號白河交流道、Mithila 繪畫史（1934 地震與 W.G. Archer、1966 大旱與 Pupul Jayakar、Sita Devi／Ganga Devi／Baua Devi）為真實背景；店家、人物、門牌、價目皆為虛構。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` 蓮池 | 一口會游的池（兩對魚＋一隻龜沿 offset-path 環游、點水起漣漪）、十二個月、林家種普莉雅畫、Kachni／Bharni、來池邊 |
| `shop.html` 蓮子與時令 | Kachni 排線頁首、八樣品項、黃金角蓮蓬、供應月份表（今月自動標黃）、上課與坐船 |
| `card.html` 寄一池蓮 | 核心功能：選母題、寫一句話、空白自己長滿；?c= 連結寄出、對方打開會重畫一次；下載 SVG；請普莉雅手繪 |

## 風格關鍵字

Mithila・Madhubani・kohbar・Kachni 線・Bharni 色・雙線輪廓・horror vacui・層框・齒帶／蓮瓣帶／點帶・牛糞洗赭紙・燈煙墨・紅花紅・薑黃・靛・成雙的魚・有臉的太陽・側面大杏眼

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 蓮子行（白河蓮子、蓮藕粉、手繪卡、線畫課、賞蓮船） |
| 風格 | Mithila／Madhubani 繪畫（型錄「在地與文化視覺」新增條目，全館第 1 站，既有流派） |
| era | 1934–1970s 從牆到紙的轉折，與 2012 年的白河 |
| locale | 比哈爾邦 Mithila × 臺南白河 |
| voice | 兩個農婦的口吻，具體、短句、講月份與手感 |
| texture | 牛糞洗赭手抄紙、竹枝棉布筆的雙線 |
| density | 極高（不留白是規則） |
| function | 〈寄一池蓮〉社交／贈禮：90 秒做出一張卡、連結可分享、對方收到會重新畫一次 |

opening：`kohbar-frame-first 婚房層框開場`／nav：`frame-cartouche 框帶嵌牌`／illust：`kohbar-doubleline-kit 雙線母題組`／mood：`gobar-ochre-five-pigments 牛糞洗赭五罐色`

## 首創

**留白自生 void-fill（全館第一）**：頁面的空白不是設計出來的，而是執行時量出來的——每個容器把實心物件外框與文字逐行的 `Range.getClientRects()` 當障礙，用 Poisson-disk 取樣找出所有空位，再從最靠近內容的點往外一朵朵長出母題；視窗一變寬、明信片一多打一個字，空白就重新長滿。同一份內容（FNV-1a 雜湊為 seed）在任何人電腦上長出同一片花。

## motion-library 元件（1.20.0 @e45c261f）

| ID | 名稱 | 頁 | 承載 |
|---|---|---|---|
| BG-A-11 | Parallel Curves | index | 池水：Mithila 畫水的平行波線 |
| BG-B-24 | Crosshatch | shop | Kachni 交叉排線帶 |
| SHP-23 | Spiral Dots | shop | 蓮蓬黃金角點陣（一次性） |
| BG-A-29 | Topo Lines | card | 同心描線的回聲／漣漪 |
| BG-B-25 | Circle Pop | card | 下單成功的 bindu 吉祥點 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-28）（排程 Agent 自動執行）。*
