# 日課田 JIT-KHÒ TSHÂN

**池上稻米月令箱 × 哥德時禱書 Gothic Book of Hours（國際哥德・曆頁半身）**

臺東池上縱谷兩公頃一分的有機稻田，一年兩期稻、田埂外種金針、冬天撒油菜花。第三代潘以諾在巴黎讀中世紀藝術史，2025 年夏天在尚蒂伊城堡看到拆開並排展出的《貝里公爵的豪華時禱書》十二張月曆頁，回來把自家的田做成一本時禱書：每月寄一箱，附一頁那個月的手繪月曆頁。整個網站就是那本書——曆頁、月令、題獻與時辰。

> 店名、人物、地址、電話、價格皆為虛構示意。池上、伯朗大道、新武呂溪、臺鐵池上站、尚蒂伊城堡孔代博物館與 2025 年 6/7–10/5 月曆頁並排展為真實背景。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 曆頁對開開場：左頁本月月令細密畫（黃道拱楣＋菱格天），右頁 KL 曆表（當年真算的主日字母、金數新月、羅馬計日、節氣、紅字日）；本田的時禱書、一箱一頁 |
| `yue-ling.html` | 十二月令：大幅細密畫（錦幔天）＋該月農事與箱內容，十二張縮圖、← → 翻頁 |
| `ding.html` | 〈訂一冊你家的時禱曆〉：選月份、寫下紅字日、題獻→上金封裝，得到你家那一年的曆頁、出貨日、合計與分享連結 |
| `shi-chen.html` | 田裡的八個時辰（此刻時辰會敲鐘）、來田裡：地址、交通、門市、割稻體驗 |

## 品牌

- 潘春木（1938–2016）1962 年承租第一塊田；潘美珠（1965–）1998 年轉有機；潘以諾（1995–）2026 年一月起做月令箱；田頭林文昌「阿昌」。
- 每箱 NT$1,280（本島含運），6 箱 95 折、12 箱 9 折；滿 6 箱附 A3 手繪時禱曆（否則 +480）；離島每箱 +180；每月第二個週六出貨。
- 門市 08:00–17:30，週三公休；割稻體驗 6 月下旬、10 月下旬週六 06:30–09:30，NT$650。(089) 862-1962。

## 風格關鍵字

時禱書 Book of Hours、Livre d'heures、Très Riches Heures（林堡兄弟 c.1411–16）、Jean Pucelle、國際哥德式、Kalendarium、KL 合字、主日字母、金數、羅馬計日、rubric 紅字、Textura、磨金 burnished gold on gesso、群青 lapis、朱 vermilion、常春藤框條 ivy-leaf bar border、頁緣怪趣 drôleries、菱格 diaper、錦幔 cloth of honour、黃道拱楣 zodiac tympanum、Labours of the Months。

## 八維配方

| 維度 | 本站 |
|---|---|
| style | 哥德時禱書 Gothic Book of Hours・曆頁半身（型錄「裝飾與世紀轉折」2026-10-30 新增條目，全館第 1 站） |
| industry | 有機稻米月令箱（訂閱） |
| era 時代 | 1380–1420 巴黎／布爾日國際哥德 × 2026 池上 |
| locale 地域 | 臺東池上縱谷 × 法國貝里公國 |
| voice 性格 | 田裡的人說話：日期、天氣、誰在做什麼，偶爾一句拉丁文 |
| texture 質感 | 犢皮毛孔、磨金、劃格線 |
| density 密度 | 中高：曆表一天一列，頁緣有邊飾 |
| function 功能 | 購物＋訂閱配置：〈訂一冊你家的時禱曆〉 |
| opening | kalendarium-spread-first 曆頁對開開場 |
| nav | signaculum-ribbons 書籤絲帶導覽 |
| illust | gothic-miniature-kit 哥德細密畫組件 |
| mood | vellum-lapis-burnish 犢皮青金磨金 |

## 動效

- **ambient**：燭光磨金——所有金面的光帶緩慢漂移抖動；＋ML 菱格天、錦幔、時辰鐘、菱形地
- **input**：游標是燭光，金跟著亮；怪趣小動物在游標旁停步、福壽螺縮眼；曆表列 hover 鋪金
- **transition**：翻犢皮頁（換頁）、月令大圖 rotateY 翻月、封裝結果 steps(14) 逐行展開；＋ML 行末填飾
- **signature**：**頁緣怪趣巡行**——福壽螺、稻草人騎士、白鷺、吹螺兔沿常春藤框線以 CSS offset-path 走路，騎士遇到福壽螺會停下來比武

## 首創

**即時曆算的中世紀曆頁 live computus kalendarium**：全館第一個把中世紀抄本的曆算（主日字母、金數、羅馬計日 Kalends/Nones/Ides、復活節）當成資料引擎的站——曆頁不是寫死的裝飾，而是依你打開網頁的那一年真算出來；訂購頁把使用者家裡的紅字日寫進這套曆法，跟節氣（太陽黃經）、新月（Meeus 平朔修正）、田事排在同一張 subgrid 曆表裡。

## motion-library 元件

元件庫 1.25.0 @9b3a7ba8（每頁同一份子集；`tools/ml-smoke.js` smoke ok）。

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| BG-A-01 | Grid Fill | index | ambient | 月令圖天空的金朱方格菱格 diaper |
| BG-B-16 | Weave Grid | yue-ling | ambient | 月令大圖背後的藍朱錦幔 |
| SHP-33 | Squiggle Draw | ding | transition | 封裝時畫出的行末填飾 |
| SHP-15 | Ring Expand | shi-chen | ambient | 此刻時辰的鐘聲 |
| BG-A-15 | Triangle Grid | shi-chen | ambient | 來田裡資訊牌背後的菱形地 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-30，排程 Agent 自動執行）。*
