# 金獅病媒防治 KIM-SAI PEST CONTROL

**產業**：病媒防治（基隆仁愛區・1979 年起：白蟻監測誘餌、美洲／德國蟑螂、屋頂鼠封堵、衣魚、粉蠹蟲；基隆市區免費勘查）
**風格**：迦納流動電影院手繪海報 Ghanaian Mobile Cinema Poster（迦納 1985–1995 前後：招牌畫師在縫起來的麵粉袋上以招牌漆手繪錄影帶電影海報；D. A. Jasper、Leonardo、Heavy Jay；Ernie Wolfe《Extreme Canvas》、Poster House《Baptized by Beefcake》2019）

## 品牌設定

基隆一年下兩百天雨。林金獅 1979 年開店抓蟲；1989 年他當遠洋漁船廚師的弟弟林金樹在迦納特馬港帶回一張畫在麵粉袋上的巨蟻電影海報，從此金獅把每一個案子畫成一部片。第二代林佳蓉 2012 年接手；畫師阿堯（蔡志堯）以前在基隆戲院畫電影看板。施工那天，海報釘在你家門口一個禮拜。

- 地址：基隆市仁愛區愛四路 58 巷 3 號（虛構門牌）
- 電話：(02) 2428-1979（虛構）・LINE @kimsai1979
- 營業：週一至週六 08:00–19:00；分飛季（4–6 月）每晚 21:00 前有人接電話

## 頁面

| 頁 | 內容 | motion-library |
|---|---|---|
| `index.html` 今晚上映 | 路邊看板上的主海報《白蟻王的復仇》（發電機燈泡、飛蛾、肌肉凸透鏡、〈加料〉五道）、今日放映表、海報由來、分飛季警報 | TXT-A-24 Extrude、BG-B-19 Line Burst |
| `lineup.html` 認犯人 | 〈認犯人〉：十張證物卡選三張、六名嫌犯蓋「無罪」、開演後當場畫出判決海報＋方案＋價格＋預約放映券 | BG-A-32 Shock Lines |
| `shows.html` 片單 | 六部片的小海報、施工內容、保固、價格；雙片連映 85 折；放映須知 | TXT-B-08 Number Slam |
| `crew.html` 劇組・放映處 | 演職員表、一張海報的五道工序、畫師的話、手繪地圖與聯絡資訊 | BG-A-16 Zap Marks |

## 風格關鍵字

麵粉袋畫布・縫線・袋印鬼影・招牌漆三階剛邊・黃字面紅擠出黑邊・三帶硬邊天空・主角比房子大・爆炸墊背・人物出框・什麼都有肌肉・刷字標語・簽名留電話

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1985–1995 錄影帶流動電影院 × 2020s 基隆 |
| locale 地域 | 迦納海岸港口（Tema）× 基隆仁愛區 |
| voice 性格 | 很認真地誇張：片名式服務名、票價式價錢、阿嬤的藍白拖 |
| texture 質感 | 麻布織紋、縫線、袋印鬼影、招牌漆平塗 |
| density 密度 | 海報內極高（空隙全塞標語）、海報外中等 |
| function 功能 | 〈認犯人〉證物推理 → 判決海報 → 方案價格 → 預約 |
| opening | `roadside-board-first` 路邊看板開場 |
| nav | `slat-board` 釘板木條導覽 |

## 動效

- ambient：發電機燈泡串 `steps(1)` 不規則明滅、三隻飛蛾繞燈
- input-driven：肌肉凸透鏡（feImage 位移圖＋feDisplacementMap，跟游標）；木條導覽以釘子為軸擺動；證物卡翻起
- transition：跨文件 View Transitions——舊頁像麵粉袋捲上去、新頁放下來
- signature：〈加料 MORE DRAMA〉——同一張海報五道誇張度升級，每一道以乾刷鋸齒遮罩刷上

## 首創

**加料 Escalating Poster**：全館第一個「同一張插圖依使用者要求逐級加戲」的範式——五道料各自是一組新物件（會飛的蟑螂、眼睛放電、火燒與第二次爆炸、主角長大、「看了才相信」），以 `<mask>` 內經 feTurbulence＋feDisplacementMap 扭成乾刷鋸齒邊的矩形由左刷到右；也是全館第一個迦納流動電影院手繪海報流派站，以及第一個「證物指認 lineup → 判決海報」互動範式（證物指到的嫌犯留在燈下、其餘蓋無罪，主角一位成單片、兩位成雙片連映、三位成三片大混戰）。

## motion-library 元件

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| TXT-A-24 | Extrude | index | transition | 「比電影精彩」長出紅色擠出面＝招牌師立體字 |
| BG-B-19 | Line Burst | index | ambient | 分飛季警報背後一直噴出的黃紅線段 |
| BG-A-32 | Shock Lines | lineup | ambient | 判決海報背後的放射爆光 |
| TXT-B-08 | Number Slam | shows | transition | 「85」折從天砸下 |
| BG-A-16 | Zap Marks | crew | ambient | 畫師引言背後的漫畫閃電 |

來源：`wenxiangxiao/motion-library` v1.6.0 @0a806bc（子集 57.3KB，inline 為每頁第一個 `<script>`）。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-19，排程 Agent 自動執行）。店家、人物、價格、電話皆為虛構；迦納流動電影院手繪海報、基隆氣候與臺灣家白蟻 4–6 月分飛為真實背景。*
