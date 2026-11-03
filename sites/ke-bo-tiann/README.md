# 雞母埕 Ke-bó-tiânn — 用 tenango 包起來的放牧雞蛋

> 風格：**Tenango 刺繡・奧托米緞面繡 Tenango Embroidery (Otomí / Hñähñu, Tenango de Doria)**（型錄「在地與文化視覺」2026-11-03 新增條目，全館第 1 站；既有流派，非自創）
> 產業：放牧雞蛋農場（花蓮富里・640 隻母雞在柚子樹下撿食・每天撿兩趟蛋・以 San Nicolás 手繡的 tenango 方巾包蛋）

## 品牌設定

- 花蓮縣富里鄉竹田村 26 號〔門牌虛構〕・(03) 883-2004〔虛構〕
- 埕邊小屋 週四至週一 08:00–16:30（週二三公休）；撿蛋 06:30／15:30；週六 09:00 撿蛋課 NT$250（含 6 顆）
- 鄭阿土（1940–2015）1968 年在柚子園下放雞；鄭文雄（1971–）2000–2004 在伊達爾戈州 Pachuca 做選礦工程，在市集認識 Rosa；Rosa Hernández Santiago（1977–，生於 San Nicolás, Tenango de Doria，母語 Hñähñu）是畫稿的人 dibujante，2005 年來富里；姊姊 Lucía、Marta 與姪女 Itzel 在 San Nicolás 繡；女兒鄭安娜（2008–）管訂單。
- 價目：一盒 10 顆 NT$160・一籃 30 顆 NT$450・四週訂閱每週 20 顆 NT$1,180／30 顆 NT$1,720・宅配 NT$150・現貨包蛋巾 30×30 cm NT$1,350（繡工 920／海運關稅 170／布線 110／畫稿 80／雞母埕 70）
- 品牌敘事從產業長出來：tenango 最常見的母題就是雞、狗、兔、鳥與花——正是一座雞埕的居民。Tenango de Doria、San Nicolás、1960 年代乾旱、dibujante、El Cirio 洞穴岩畫、2011 年 Hermès 合作與工資爭議為真實背景；人物、店名、地址、電話、價格皆虛構。

## 頁面

| 頁 | 內容 |
|---|---|
| `index.html` 埕前 | 首屏是一整塊 tenango 桌布（canvas 緞面繡，游標／手機傾角＝太陽）；布標上寫店名與即時營業狀態；三隻繡出來的雞沿布邊走；蛋價吊牌；〈一條線繡到底〉布的來歷 |
| `bu.html` 蛋與布 | 價目表與〈排一塊布〉：在左半邊排動物、右半邊自動鏡像，選條紋或單色，算針段數與價錢，按「繡出來」從鉛筆稿繡起，網址可分享，連同蛋訂閱下單（示意） |
| `lang.html` 埕與人 | 五個人的時間線、鉛筆稿→緞面的進度拉桿（單色鈷藍布）、布上的六種居民、一塊 NT$1,350 怎麼分、週六撿蛋課 |

## 風格關鍵字

manta 白棉布・緞面長針・針向分區・異向光澤・扁平側身剪影・布眼・中軸鏡像對稱・生命樹・條紋多色／整塊單色・藍色鉛筆稿・平針布邊

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1960 年代起的 San Nicolás tenango × 2005 年起的富里雞埕 |
| locale 地域 | 花蓮富里竹田（海岸山脈、六十石山）× 伊達爾戈 Tenango de Doria |
| voice 性格 | 撿蛋的人說話：短、具體、講時段與天氣 |
| texture 質感 | 平紋棉布＋緞面長針，針與針之間露出一點布 |
| density 密度 | 布上滿、頁面鬆：每塊布擠滿，布外留白 |
| function 功能 | 〈排一塊布〉編輯／訂製＋購物：鏡像排版、針數計價、URL 分享、連同蛋訂閱下單 |
| opening | cloth-spread-first 攤布開場（新原型） |
| nav | skein-nav 繡線束導覽（新原型：現用頁那綹線垂下一條線） |
| illust | satin-stitch-polygon 緞面針多邊形（新技法） |
| mood | manta-thread-bright 白棉布飽和繡線（新 mood） |
| tech | Canvas 2D 緞面針掃描＋Path2D 分桶（A）・DeviceOrientation／Pointer 光源（D）・URLSearchParams 狀態序列化（E） |

## 首創

**以針向決定亮暗的緞面繡材質模型**：全站插圖沒有一筆平塗——每個形是多邊形，以指定針向做掃描線求交（偶奇配對、布眼是洞）、超長的針錯縫切段，產生數千段「針」；每段的亮度只由「針向 vs. 光向」的 Kajiya–Kay 式異向反射決定，所以同一罐線、同一塊布，鏡像那一半因針向相反而一亮一暗；游標、手指或手機傾角就是太陽。同一套針也直接用於〈排一塊布〉的計價（針段數 × 0.5 元＝繡工）與進場時「鉛筆稿→繡上」的轉場。

## motion-library 元件

| ID | 名稱 | 頁 | 角色 | 承載什麼 |
|---|---|---|---|---|
| BG-A-17 | Flow Lines | index | ambient | 〈布的背面〉：洋紅與鈷藍短線沿流場游動，像翻過來的布背面那些過線 |
| TXT-A-10 | Follow Path | index | transition（一次性） | 「一條線繡到底」沿著一條鈷藍虛線（跑針）滑進來再拉直 |
| TXT-B-19 | Text Flag | bu | transition（一次性） | 「今天的蛋，自己的布」像晾在竹竿上的布巾飄一下再停 |
| BG-A-07 | Random Pop Dots | bu | ambient | 下單區背景：玉米黃與洋紅圓點彈出又縮回，像撒在埕上的飼料與 tenango 空隙裡的填點 |
| TXT-B-43 | Embroidery Stitch Title | lang | transition（一次性） | 「一針一針」在繡框裡以緞面針逐字繡出，接著講畫稿到繡布的工序 |

子集來源：motion-library 1.30.0 @9301b9d8（`tools/ml-embed.js` 逐頁產生，terser 壓縮後重跑 `tools/ml-smoke.js` 為 smoke ok）。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-03）（排程 Agent 自動執行）。*
