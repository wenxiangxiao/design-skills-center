# 北門鏡畫行 KIÀNN-UĒ — 玻璃鏡畫行 × Hlebine 學派玻璃背畫

新竹市北區北門街 112 號（門牌虛構）的玻璃行兼鏡畫店。林添福（1931–2004）1956 年開「添福玻璃」，白天裁窗玻璃、磨鏡子，晚上在玻璃背面貼金箔字、描牡丹，做開業與婚嫁賀禮的鏡匾；林美惠（1959–）1987 年接手，改做鋁門窗與浴室鏡；林亦舟（1991–）2014 年在札格雷布交換時看見 Ivan Generalić 的玻璃背畫，2018 年回店改名「鏡畫行」，照阿公的順序、用 Hlebine 的題材畫頭前溪的冬夜。

小鏡畫 30×20 NT$2,400・中 45×30 4,200・大 60×40 7,800・開業賀匾 60×90（含四字）12,800・金箔字 +220／字・檜木框 +900・舊鏡匾重描 1,800 起・週六背繪課 1,600・10:00–18:30 週一公休・(03) 522-1956。Hlebine、Generalić、Hegedušić、新竹北門街為真實背景，其餘虛構。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 首屏一面照真實筆序「倒著」畫出來的鏡畫（簽名動效）、翻到背面看四層、四層玻璃拆解圖（可拖轉）、店裡資訊；TXT-B-17 店名倒影 |
| `hua.html` | 〈畫鏡台〉在玻璃背面作畫：墨線／種樹／放鷺鷥 → 高光 → 平塗 → 倒天空，翻到正面看層序評語，加金箔字、選尺寸下訂、下載 PNG；SHP-33 描線示範 |
| `pian.html` | 鏡匾價目：四面錯落掛著的鏡畫（點一下翻面看背面）、價目表、送禮問答、訂製四步；TXT-A-02 賀匾金字、BG-B-39 河線 |
| `su.html` | 三代：1956 鏡匾、1987 浴室鏡、2018 鏡畫行；Hlebine 學派年表與參考；週六背繪課；BG-A-37 鷺鷥群 |

## 風格關鍵字

Hlebine School・Croatian naïve art・reverse glass painting（Hinterglasmalerei）・Ivan Generalić・paint the front first・every-twig winter tree・flat stacked bands・only the sky is graded・glass sheen・dark wooden frame・gold-leaf lettering

## 八維配方

| 維度 | 本站 |
|---|---|
| industry | 玻璃行兼鏡畫／鏡匾（新竹北門街，1956 年起） |
| style | Hlebine 學派玻璃背畫（型錄「繪畫與材質」新增條目） |
| era | 1930–60 年代克羅埃西亞素人畫 × 1956 臺灣鏡匾 × 2026 |
| locale | Podravina・Hlebine × 新竹頭前溪 |
| voice | 第三代的口吻：講順序、講乾燥時間、講阿公教的第一件事 |
| texture | 玻璃、油彩平塗、金箔、黑漆木框 |
| density | 中：畫面裡細節極密，版面本身留白 |
| function | 〈畫鏡台〉創作工具＋訂製：在背面倒著畫、翻面看層序評語、下訂與下載 |

opening：`glass-reverse-build 倒序成畫開場`／nav：`hanging-plaques 掛畫導覽`／illust：`reverse-layer-strokes 背繪筆序`／mood：`glass-winter-night 玻璃冬夜`

## 首創

**背繪反序合成 reverse-order compositing（全館第一）**：全館第一個用 Canvas 2D `destination-over` 把「畫的順序」與「看的順序」做成相反的站。每一面畫都是一串筆，同一串筆以 destination-over 正向合成就是正面、以 source-over 左右鏡像合成就是背面；訪客在畫鏡台是真的在玻璃背面作畫——後畫的每一筆都落到先畫的後面，倒下天空後背面只剩一片天，翻過來才看見自己的畫，並依實際像素算出「墨線看得見幾 %、天空之後又畫了幾筆」。

## motion-library 元件（1.20.0 @e45c261f）

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| TXT-B-17 | Water Reflection | index | transition | 店名「鏡畫」升起並留下一道倒影 |
| SHP-33 | Squiggle Draw | hua | ambient | 第一階段「先描線」的示範墨線 |
| TXT-A-02 | Letter Sequence | pian | transition | 賀匾「百年好合」金字一個一個貼上 |
| BG-B-39 | Minimal Wave | pian | ambient | 價目表上方的河線 |
| BG-A-37 | Dot Swarm | su | ambient | 頁首歸巢的鷺鷥群 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-28，排程 Agent 自動執行）。*
