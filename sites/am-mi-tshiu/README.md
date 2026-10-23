# 暗暝樹 夜觀社 ÀM-MÎ-TSHIŪ NIGHT WALKS

南投縣鹿谷鄉內湖村的夜間生態導覽（虛構）。每晚 19:00 帶十二個人走孟宗竹林、柳杉老林與茶園邊溪溝，只用紅光。第三代帶隊員張以樂把所有地圖、夜單與招牌改用中印度 **Pardhan Gond 繪畫**的方法畫在黑紙上：樹枝長成鳥、樹根是蛇、每一位住戶有自己的簽名紋。

- **風格**：Gond 繪畫・Jangarh Kalam（黑紙絹印面貌）——型錄「在地與文化視覺」新增條目，全館第 1 站
- **產業**：夜間生態導覽（夜觀）
- **語言**：繁體中文（臺語羅馬字點綴）

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 照樹：首屏一棵 Gond 生命之樹＋〈照一棵樹〉手電筒遊戲、夜單（可分享 `?n=`）、三代故事 |
| `residents.html` | 住戶：八位夜間住戶沿一根會隨捲動長高的樹幹左右掛上，紋一筆一筆印上去；先用耳朵找；出現月份表 |
| `walks.html` | 走一晚：四種夜＋包場價目、路線圖（路是一條蛇）、夜票試算（依季節與星期驗證、讀取遊戲找到的住戶自動推薦）、山上的規矩 |

## 風格關鍵字

黑紙、不透明平塗、剪影、bharna 簽名紋（點／短劃／梳線／魚鱗／種子／鋸齒）、生命之樹、枝成鳥根成蛇、digna 鋸齒帶、點線框、杏仁葉形按鈕、霞鶩文楷、Baloo 2

## 功能〈照一棵樹〉

1. 熄燈後移動手電筒，在九十秒內找出樹上的八位住戶。
2. 白光看得到顏色，但照在牠身上超過 0.8 秒，牠會跳到別的枝上。
3. 切成紅光（R 鍵或按鈕）停在牠身上 0.8 秒，就記進你的夜單。

結束後得到夜單（找到的住戶、推薦的那一晚、可分享連結），可直接帶到〈走一晚〉開夜票。

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 夜間生態導覽（南投鹿谷內湖村） |
| 風格 | Pardhan Gond 繪畫（Jangarh Kalam，黑紙絹印） |
| era 時代 | 1980 Bharat Bhavan → 2006 Tara Books 黑紙絹印 → 2026 |
| locale 地域 | 中印度中央邦 Patangarh／博帕爾 × 臺灣南投鹿谷 |
| voice 性格 | 帶隊員的低聲口吻，規矩講得很清楚 |
| texture 質感 | 消光黑紙、不透明絹印色、筆尖點紋 |
| density 密度 | 畫面極滿（每個剪影填滿紋）、文字區疏 |
| function 功能 | 手電筒尋找遊戲（觀察／搜尋類，非模擬儀器台）＋夜票試算 |
| opening | night-painting-first 黑紙夜畫開場 |
| nav | perch-birds 棲枝小鳥導覽 |
| illust | bharna-fill 簽名紋填充 |
| mood | black-paper-silkscreen 黑紙絹印 |

## 首創

**紋即簽名、以 isPointInFill 填出的 Gond bharna**：全館第一個以 `SVGGeometryElement.isPointInFill()` 在瀏覽器內為任意剪影沿紋向取樣、生成填紋的站——同一套剪影宣告 `data-b/k/a/s` 就能換紋型、紋色、紋向；並把找到的動物做成「紋醒」漣漪（每顆紋依離眼距離延遲放大）。附帶：全館第一個以「紅光／白光」雙模式手電筒遮罩作為遊戲規則（白光可見但會嚇跑、紅光只見輪廓但可記錄）的站，與第一個以「小鳥睜眼」標記現用頁的導覽。

## motion-library 元件

來源 `wenxiangxiao/motion-library` v1.11.0 @22220a4（`tools/ml-embed.js` 子集＋`src/motion-player.js`，smoke ok）。

| ID | 名稱 | 頁面 | 角色 | 承載 |
|---|---|---|---|---|
| BG-A-37 | Dot Swarm | index | ambient | 樹後的螢火蟲群，熄燈後黑紙上只剩牠們 |
| TXT-B-40 | Float Drift | index | transition | 「你的夜單」字像 mahua 花飄落定位 |
| TXT-A-10 | Follow Path | residents | transition | 「樹上的住戶」沿短劃虛線（夜觀的路）走進來 |
| BG-B-21 | Ripple Rings | residents | ambient | 蛙鳴與鴞叫的同心圓 |
| BG-A-11 | Parallel Curves | walks | ambient | 茶園邊溪溝的平行波線 |

## 技術

1. `SVGGeometryElement.isPointInFill()` bharna 生成器（E 層）
2. CSS `mask-image: radial-gradient()`＋`@property --tr` 手電筒與熄燈（A／C 層）
3. CSS scroll-driven animations `animation-timeline: view()／scroll()` 落墨與長樹（B 層）

*本站人物、店號、門牌、電話與價目皆為虛構；鹿谷、內湖村、溪頭、921 地震、八種物種、Gond 繪畫、Jangarh Singh Shyam、Bharat Bhavan 與 Tara Books〈The Night Life of Trees〉為真實背景。*

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-23，排程 Agent 自動執行）。*
