# Knutsgården 掛畫行 — Dalarna 民間畫・kurbits Dalmålning (Kurbits Painting)

> 瑞典 Dalarna・Rättvik 的聖誕掛畫（bonad）出租行：手繪膠彩掛畫，第一個降臨主日上門掛、Tjugondag Knut（1 月 13 日）之後收走。全站畫面是一幅會被「點活」的 Dalarna 民間畫。

## 品牌設定

- **店名**：Knutsgården Bonaduthyrning（Knutsgården 掛畫行）——名字取自 Tjugondag Knut：瑞典民俗裡「Knut 把聖誕節趕出門」的那一天，也是掛畫收回來的日子。
- **地址**：Storgatan 14, Rättvik〔門牌虛構〕・電話 0248-123 26〔虛構〕
- **人物**：畫師 Karin Ersdotter（修教堂壁畫出身）、木工兼掛畫隊長 Anders Mattsson、學徒 Linnea Moberg、掛畫隊 Olle。
- **服務**：小幅 60×90 公分一季 650 克朗、大幅 92×180 公分 1 450 克朗（含掛與收）；點活夜每週四 18–21，450 克朗。
- **語氣**：鄉下畫室的口氣，具體、帶一點民俗典故；瑞典語作題字，中文作說明。

## 頁面

| 檔案 | 名稱 | 內容 |
|---|---|---|
| `index.html` | Väggen 牆 | 首屏一幅三拱 bonad（掛畫工扛畫／藍甕 kurbits／紅屋與馬），開場時只有底色，畫師的筆一個逗點一個逗點把它點活；可拖「畫師的手」前後走這道工、按〈重點一次〉倒轉重畫。真實日期驅動的季節倒數與「掛畫季木桿」時間軸、四步流程、畫師故事（文字沿 kurbits 輪廓繞排）、亞麻與紙。 |
| `bonader.html` | Bonaderna 掛畫 | 八幅可租的畫（程式即時繪製），交錯掛在木牆上；篩選後的畫從桿上垂下；點開以捲軸展開看大幅與故事，`?b=` 可分享；租單（sessionStorage）依牆寬算間距。 |
| `mala.html` | Liva upp 點活 | 核心功能〈點活一幅畫〉：一幅只上了底色的畫、一枝沾白的筆、一根九十秒的蠟燭、一碗有數的白漆。筆會黏到最近的輪廓；畫到沒有形的地方留下髒點。完成後評等（師傅／出師學徒／學徒／塗鴉）並給這一幅的網址；可看畫師的筆序；預約點活夜。 |

## 風格關鍵字

Dalmålning、kurbits、bonad、Rättvik／Leksand、Ullvi、膠彩 limfärg、白堊底、法倫紅、赭黃、銅綠、smalt 藍、墨線、白逗點點活 uppliva、horror vacui、圓拱拱廊、仿大理石邊 marmorering、帷幔與流蘇、十八世紀服裝、條紋圍裙、民俗木馬、法倫紅木屋。

## 八維配方

| 維度 | 本站 |
|---|---|
| style 風格 | Dalarna 民間畫・kurbits Dalmålning（型錄「在地與文化視覺」新增條目） |
| industry 產業 | 聖誕掛畫出租（季節性掛畫租賃＋上門掛收） |
| era 時代 | 1780–1870 年代 Siljan 湖畔流動畫師 ＋ 今日 |
| locale 地域 | 瑞典 Dalarna・Rättvik、Leksand、Mora、Siljan 湖 |
| voice 性格 | 畫室口氣：短句、典故、價錢講清楚 |
| texture 質感 | 白堊膠彩平塗、墨線、白逗點、亞麻布紋、法倫紅原木牆 |
| density 密度 | 高：horror vacui，空白要被花吃掉 |
| function 功能 | 〈點活一幅畫〉輪廓吸附筆刷遊戲＋評等（遊戲／創作類） |
| opening | grund-to-liv-first 底色到點活開場 |
| nav | liv-branch-nav 點活花枝導覽 |
| illust | dalmalning-flat-liv 膠彩平塗＋白逗點點活 |
| mood | falu-timber-chalk-bonad 法倫紅木牆・白堊畫幅 |

## 首創

**輪廓吸附的點活筆 contour-snapped liv brush**：全館第一個「筆畫被投射到最近輪廓上、變成垂直於輪廓的一串逗點」的筆刷互動——使用者只決定走到哪裡、壓多重，逗點的位置與方向由畫裡每一個形自己決定（取樣點在繪製花瓣、葉脈、莖時一併產生）；筆壓決定吸附半徑，離形太遠就留髒點。同一份取樣點也驅動首頁的簽名動畫（WAAPI 每顆逗點一支 Animation，可拖、可倒轉）。

## motion-library 元件

| ID | 名稱 | 頁 | 角色 | 承載 |
|---|---|---|---|---|
| BG-B-16 | Weave Grid | 牆 | ambient | 亞麻段的布紋——大幅 bonad 畫在手織亞麻上 |
| SHP-22 | Radial Fan | 牆 | transition | 流程段開頭的扇形花結一次展開，像一朵 kurbits 花冠打開 |
| BG-A-29 | Topo Lines | 掛畫 | ambient | 櫃門上的仿木紋 ådring——Dalarna 畫師也畫假木紋 |
| SHP-29 | Wave Dots | 掛畫 | ambient | 租單前的白點列分隔，像莖上點活的白點 |
| BG-A-17 | Flow Lines | 點活 | ambient | 頁首的仿大理石 marmorering 邊帶 |

來源：motion-library 1.39.0 @bafd6002（`tools/ml-embed.js` 子集、`tools/ml-smoke.js` smoke ok）。

---

*所有店名、人名、地址、電話、價格皆為虛構示意；Dalarna 民間畫史實（Siljan 湖周 18 世紀末興起、Ullvi 一帶 1780 年代的 kurbits、流動畫師到 Hälsingland 作畫、聖誕節掛 bonad 的習俗）為真實背景。圖像全部為程式原創繪製。*

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-12，排程 Agent 自動執行）。*
