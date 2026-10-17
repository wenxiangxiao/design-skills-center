# 直角水電 tit-kak tsuí-tiān

高雄市前鎮區擴建路一段 2 巷 14 號的水電行，1971 年由蘇金土開設。第一張傳單由巷口大同活版社的黃清輝排：明體、置中、雙線花框、底下一行「誠信第一　服務至上」。1979 年黃清輝從一本 1930 年代東京印刷學校的日文講義裡讀到德國「新活版術」的規則——不置中、只用黑和紅、字靠一條軸——把直角的傳單重排了一次，從此直角的單子只用紅黑兩色。現任店主蘇美鳳（室內配線甲級）自己排傳單；整個網站就是一張很長的 neue typographie 傳單。

## 品牌設定

- **地址**：高雄市前鎮區擴建路一段 2 巷 14 號（一樓店面）
- **電話**：(07) 821-1971（二十四小時有人接）
- **店面**：週一至週六 08:00–19:00；週日只接急修
- **服務範圍**：前鎮、苓雅、小港、鳳山；其他區域加收車資 300
- **人物**：蘇金土（1940–2015，創店）、蘇美鳳（1968–，店主・室內配線甲級）、柯志豪（1979–，水管師傅）、黃清輝（1936–2004，大同活版社）
- **價目（工資，材料照收據）**：抓漏檢測 2,500 起・明管漏點修繕 4,500 起・馬桶更換 1,800・水龍頭 600・熱水器 2,200・抽水馬達 3,500・水塔清洗 1,800・排水管疏通 1,200・配電盤更新 8,000 起・漏電斷路器 1,500／迴路・插座增設 900／處・冷氣專用迴路 2,800・燈具 700／盞・老屋重新配線 3,800／坪・出勤費日間 600／夜間急修 1,200

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 開場是 1971 年那張置中傳單；往下捲，每一行從中線滑到同一條左軸、明體淡出換成無襯線、花框散掉、一道紅條長出來（scroll-driven）。此刻（台北時間驅動的出勤狀態）、修什麼、五條規矩 |
| `rates.html` | 工資明碼：水／電／出勤三組價目，點一行加入右下角估價單；施工規矩 |
| `set.html` | 〈排一張〉：把 1971 年的傳單在 24×24 網格的 a5 上改排，五盞燈（不置中／一條軸／一道紅／大小反差 ≥5／零裝飾＋整塊白）全亮即可印成 a5 |
| `about.html` | 年表（橫條長度＝年數）、十條規矩、師傅、條塊位置圖、叫修資訊 |

## 風格關鍵字

Die neue Typographie・Elementare Typographie・Jan Tschichold 1925／1928・ring neue werbegestalter・不對稱一條軸・Kleinschreibung 全小寫・黑＋一道紅・粗條與圓是零件・DIN A 系列 √2・留白是形狀・反置中・反裝飾

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1925–1933 威瑪德國的新活版術，經 1979 年高雄巷口活版社轉譯 |
| locale 地域 | 高雄前鎮工業區巷弄 |
| voice 性格 | 師傅口吻、短句、規矩清楚、不推銷 |
| texture 質感 | 白報紙的冷白、黑墨與一道朱紅；零紙紋零陰影 |
| density 密度 | 低：一屏一件事，大塊留白 |
| function 功能 | 〈排一張〉版面改排遊戲＋a5 列印；價目估價單 |
| opening 開場 | mittelachse-reset 中軸解除開場 |
| nav 導覽 | falzmarke 折線記號導覽（DIN 676 折線與打孔位置） |

## 首創

**中軸解除：用捲動把一張置中的舊傳單一行一行改排成不對稱新式樣（scroll-scrubbed typographic re-set）**——全館第一個 Die neue Typographie 站，也是第一個把「排版規則的前後對照」本身做成可捲動時間軸的站：每一行的位移量由 JS 量測寫入 `--dx`，之後完全交給 CSS `animation-timeline: --reset` 驅動，可來回刷。〈排一張〉則是全館第一個用 **CSS anchor positioning 把規則判讀標註直接拴在被拖動的版面元件上**的站：「× 置中」標籤、跨越兩個元件的紅色軸線（`top` 與 `bottom` 錨在不同元件上）、字級反差讀數、浮動工具列都由瀏覽器跟著元件走，JS 只負責規則引擎。


## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-B-18` | Horizontal Lines | primary #121212／secondary #EE3A1C／bg #EDEFEA、duration 9、density 0.7、intensity 1、seed 1971 | ambient：一疊全寬黑條粗細緩慢起伏、往下推移，每六條才一道紅——鉛條（粗細線）本來就是字盒裡的零件，特徵④的粗條當作重量；元件只用 fillRect 直角矩形、零圓角零漸層，帶子從左軸 --ax 起頭，不置中。 |
| rates.html | `TXT-A-08` | Slide Text | primary #EE3A1C／secondary #121212／bg #EDEFEA、text 工資 明碼、duration 1.2、aspectRatio 16:9、seed 4（一次性，進視窗播放、點擊重播） | input：字一個一個從左邊滑進來、下方一道紅條由左向右長出——正是本站列 hover 的紅條 scaleX 與簽名「中軸解除」行滑向左軸的同一個動作；拉丁全小寫、紙底黑字、一道紅。 |
| set.html | `TXT-A-27` | Typewriter | primary #EE3A1C／secondary #121212／bg #EDEFEA、text 排一張 setzen、duration 1.8、aspectRatio 16:9、seed 8（一次性，進視窗播放、點擊重播） | input：〈排一張〉就是排字：字一格一格落進排字盒，紅色方塊游標（實心矩形）在行尾閃——活版術的工作過程本身；無透明、無圓角，單一紅零件。 |
| about.html | `SHP-34` | Circle Draw | primary #121212／secondary #EE3A1C／bg #EDEFEA、duration 2、intensity 1、scroll true、aspectRatio 1:1、seed 2（捲動驅動） | input：捲動店史時，一個黑圓隨捲動進度被畫滿、前端一顆紅點跟著走——圓是零件不是裝飾（特徵④），紅點就是頁首導線那顆『電流』；以捲動 seek，等於讀到哪、圓就閉合到哪。 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-15，排程 Agent 自動執行）。店名、人物、門牌、電話與價格皆為虛構示意；Jan Tschichold《Elementare Typographie》（1925）、《Die neue Typographie》（1928）、DIN 476／DIN 676 為真實背景。所有圖像為原創 SVG 幾何。*
