# 插仔舞台車 TSHAH-Á BÚ-TÂI — Archigram 插件城市拼貼 Archigram Plug-in Megastructure Collage

**產業**：舞台車出租行（雲林縣北港鎮華南路 233 號〔門牌虛構〕・(05) 783-1979〔虛構〕・辦公室 08:00–20:00、出車 24 小時）
**風格**：Archigram 插件城市拼貼（倫敦 1961–1974；Plug-in City、Walking City、Instant City）——型錄「戰後與反文化」2026-11-12 新增條目，全館第 1 站

## 品牌設定

吳金柱 1979 年在 3.5 噸貨車斗上釘木板，載歌舞團跑北港、元長、四湖；1988 年換 11 米貨車加液壓兩翼，十分鐘從車變成 8×6 公尺的戲台；2009 年 LED 背牆取代手繪布景；2014 年訂下「TS-1 插座」——四顆定位銷、一組 220V 32A、一組 DMX／音訊——從此每個艙都能插任何一台車。2026 年女兒吳宜蓁接手，十一台車、六十二個艙，訂車改成「插」。

價目（每場）：基本車台 NT$18,000／LED 背牆 9,800／燈架 4,500／喇叭塔 5,200／發電機 3,600／遮雨棚 2,800／化妝艙 2,400／字幕機 1,200／泡泡機 800；北港出發 50 km 外來回每公里 45；23:00 後每小時 1,500。

## 頁面

| 頁 | 檔案 | 內容 |
|---|---|---|
| 車台 | `index.html` | 16:9 軸測拼貼首屏：插滿艙的巨構框、站在伸縮腳上的舞台車、塔式吊車擺錘插艙示範、飛艇布條、漫畫天空（BG-A-23）；這週出車（TXT-A-04「出車！」）、四十七年漫畫條、怎麼租 |
| 零件表 | `kit.html` | 一副 8 插座的框：點任一艙換到大插座，container queries 讓同一個艙攤開或收起；四種組合、TS-1 插座圖解、出車規矩；BG-B-13 軸測格背景 |
| 插上去 | `plugin.html` | func〈插上去〉：吊車擺錘遊戲，90 秒把七個艙放上車，插準才算、一次插準折 1%；結尾車伸腳站起來（TXT-A-01 KLUNK!），派車單即時試算；BG-B-03 網點天空 |

## 風格關鍵字

Archigram／Plug-in City／Walking City／Instant City／axonometric space-frame／capsule／Zip-a-tone／Letraset call-outs／comic balloon & starburst／cut-out collage with white border／crane／airship／telescopic legs

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1961–1974 倫敦 Archigram ＋ 1979 起的台灣舞台車 |
| locale 地域 | 雲林北港、元長、四湖、虎尾——廟埕與活動中心前 |
| voice 性格 | 司機兼技師的口氣：短句、規格與價錢先講，「插上去，就開演。」 |
| texture 質感 | 網點紙、轉印字、剪刀白邊、平影 |
| density 密度 | 中：首屏是一整張圖，內頁是插座框 |
| function 功能 | 〈插上去〉吊車擺錘街機遊戲＋派車單試算（遊戲類） |
| opening | megastructure-collage-first 巨構拼貼開場 |
| nav | power-strip-nav 排插導覽 |

## 首創

**吊車擺錘插艙 crane-pendulum plug-in**：全館第一個用「被台車加速度驅動的阻尼單擺＋拋體＋欠阻尼彈簧」做核心互動——租什麼由你親手放下去的東西決定，放歪的會彈到地上重吊；插準了才進派車單，一次插準的艙折 1%。附帶：第一個「同一個 DOM 艙依插座大小以 container queries 改版面」的零件表，以及第一個「排插」導覽（現用頁＝插到底亮綠燈的插頭）。

## motion-library 元件

| ID | 名稱 | 頁 | 角色 | 承載 |
|---|---|---|---|---|
| BG-A-23 | Comic Sky | 車台 | ambient | 拼貼的漫畫天空 |
| TXT-A-04 | Punch Zoom | 車台 | transition | 「出車！」撞出畫面 |
| BG-B-13 | Isometric Grid | 零件表 | ambient | 巨構框的軸測格、插座通電 |
| BG-B-03 | Comic Dots | 插上去 | ambient | 遊戲場的 Zip-a-tone 天空 |
| TXT-A-01 | Word Burst | 插上去 | transition | 全部插完那一下的 KLUNK! |

來源：motion-library 1.39.0 @bafd6002（`tools/ml-embed.js` 子集、`tools/ml-smoke.js` smoke ok）。

---

*所有品牌、人名、價格、地址、電話皆為虛構示意；Archigram 史實（成員、刊期、Plug-in City／Walking City 1964、Instant City 1968–70）為真實背景。*

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-12，排程 Agent 自動執行）。*
