# Eight Count — 有氧舞蹈教室 × 加州新浪潮（Greiman／Emigre 早期麥金塔數位後現代）

洛杉磯 Culver City 的高低衝擊有氧教室（虛構）：Washington Blvd 10924 號、輪胎行樓上的藍門，2,400 平方呎彈性楓木地板，每週 25 堂課，每一堂都以「八拍」計數，速度 118–138 BPM。站點語言為英文（場景在洛杉磯）。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | Floor：首屏是一張起拍前的層疊海報（count-in-first）——粉紅色場、藍灰透視格線地板、點陣「5678」、浮在空中投下硬影的紅錐黃球藍方塊、一只 Mac 視窗計數器。按 ▶ 或空白鍵，整張海報的圖層依合成節拍跳一段四個八拍的招牌組合；八拍說明、BPM 階梯、四位教練 |
| `classes.html` | Classes：週課表，七欄日期、每堂課一張傾斜色塊卡；滑過時方塊依該課 BPM 閃爍；高／低衝擊篩選以 FLIP 逐格轉場；五種課型說明 |
| `routine.html` | Cue Card（核心功能）：把八個動作排進四個八拍、選課速、按播放——左側整張海報照你的組合跳 36 拍，最後印出一張點陣 cue card（編號、適合的課、兩到三條教練註記、可分享連結） |
| `visit.html` | Visit：首堂免費、四種價目（點陣價格的傾斜卡片）、抽象路口圖、交通與營業時間、新手 FAQ；若剛印過 cue card，會出現在頁首 |

## 品牌設定

- 地址：10924 Washington Blvd, Culver City, CA 90232（Overland 與 Sepulveda 之間，輪胎行左側藍門上樓）
- 電話：(310) 555-0128（555 虛構號段）
- 營業：週一至五 6:00–21:00／週六 8:00–13:00／週日 9:00–12:00
- 人：Denise Arroyo（創辦人，1987 年起教 hi/lo）、Kenji Tamura（踏板）、Lorna Pike（低衝擊與 55+）、Marcus Bell（Hi/Lo 與週五 Count-In）
- 價目：單堂 $22（55+ $12）／十堂卡 $185／月無限 $119／首堂免費
- 課型：Low 118／Step 126／Hi/Lo 132／Interval 138／55+ Low 120／Friday Count-In

## 風格關鍵字

California New Wave、April Greiman、Emigre、Zuzana Licko、Rudy VanderLans、Macintosh 1984、MacPaint 8×8 填充圖樣、72 dpi 點陣字、解析度衝突、空間中的字、透視格線地板、浮空幾何原形與硬投影、粉彩＋三原色、斜軸疊層、Weingart 巴塞爾轉譯

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 有氧舞蹈教室（hi/lo、step、低衝擊、55+） |
| 風格 | 型錄「戰後與反文化」類「曼菲斯後現代 Postmodern（April Greiman／Carson）」條目的 **Greiman／Emigre 數位新浪潮半身**，全館第 1 站 |
| era 時代 | 1984–1990：第一台 Macintosh、MacPaint、Emigre 雜誌創刊（1984）、Design Quarterly #133（1986） |
| locale 地域 | 洛杉磯西區 Culver City |
| voice 性格 | 帶課教練：以拍數說話、每句都有數字、「marching is always legal」 |
| texture 質感 | 1-bit 點陣、8×8 填充圖樣、硬邊投影、零漸層 |
| density 密度 | 中：層疊但每層只有一件事 |
| function 功能 | Cue Card（聲音＋編排型：四個八拍排組合、合成節拍播放、印出 cue card） |

## 技術

1. **SVG 點陣字引擎＋`shape-rendering:crispEdges`＋整數倍放大**（A 渲染層）：自繪 5×7 原創點陣字面 EC-72，每列連續像素合併成一條 path，只允許整數像素倍率。
2. **Web Audio API 前瞻排程（lookahead scheduler）**（D 輸入與感測層／聲音）：25ms 輪詢、120ms 前瞻，在 `AudioContext.currentTime` 上排定每一拍的大鼓、拍手、閉鈸、貝斯與第 7 拍的牛鈴提示；全部即時合成、零音檔。
3. **Web Animations API：`Animation.currentTime` 由音訊時鐘驅動**（B 動效與時間軸層）：每個圖層一條 36 拍的 KeyframeEffect，暫停後每幀以 `(ctx.currentTime − outputLatency − t0)` 寫回 `currentTime`。

## 首創

**音訊時鐘驅動的版面編舞（audio-clock-slaved layout choreography）**：全館第一個讓整張版面的圖層「照著使用者自己排的動作序列、以樣本精度跟合成節拍同步跳舞」的站——動畫沒有自己的時鐘，Web Animations 的播放頭每一幀都被聲卡的時鐘校正，所以分頁卡頓、掉幀都不會讓畫面和拍子分家。與 luyi（響度→字重）的差別：那是聲音的振幅驅動排版；這裡是節拍的時間軸驅動版面，而內容（動作序列）由使用者編寫。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-09-23，排程 Agent 自動執行）。*
