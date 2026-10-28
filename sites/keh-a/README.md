# 格仔西服 KEH-Á TAILORS — 格紋西服店 × 蘇格蘭格紋 Highland Tartan

高雄市鹽埕區新樂街 211 號（門牌虛構）的格紋專門西服店。蔡清標（1936–2012）1961 年開「清標西服」，替跑船的人與委託行客人做毛料西裝；蔡麗卿（1964–）1990 年接手做制服與禮服；蔡允中（1990–）2013 年起在蘇格蘭邊區 Galashiels 念紡織、課後在小織廠學整經與「對格」，2019 年改名格仔西服，只做格紋，並排了四款店譜：〈鹽埕〉〈高雄港〉〈愛河〉〈委託行〉。

格紋直筒裙縫製 NT$6,800（布另計）・長褲 11,800・背心 7,600・單排外套 18,800・三件式 32,000・蘇格蘭裙 8 碼手打褶 26,000・店譜格布每碼 2,180–2,480・舊衣改對格 2,400 起・週六對格課 1,500・11:00–20:00 週一公休・(07) 551-1961。鹽埕新樂街、捷運鹽埕埔站、Galashiels、Scottish Register of Tartans、Wilsons of Bannockburn 為真實背景，其餘虛構。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 首屏一台織機：經線已上機，緯線一梭四線照譜打進去（簽名動效），上方字譜同步亮起；書名頁、四款店譜吊牌；一條格的五條規矩（可轉 90°、可拿掉白細線）；依格／依線打褶；價目。BG-B-37 整經帶、SHP-13 打褶 |
| `setts.html` | 格譜：四款店譜各一張大板、半譜、軸心、色名、循環長度；四種色調（Modern／Ancient／Muted／Weathered）落染缸切換。BG-B-16 平紋對照 |
| `cut.html` | 〈對一條格〉裁布台：把直筒裙四片版型拖到 300×150 公分的格布上，側縫、後中、前中三處對格，裁單即時算出對格多用的布與金額；示範排法。BG-A-21 打版紙 |
| `visit.html` | 店史（1961–2019）、營業時間、預約量身（帶入裁單）。BG-A-01 預約格 |

## 風格關鍵字

Highland tartan・sett・threadcount・half-sett & pivots・2/2 twill・warp = weft・overcheck・Modern / Ancient / Muted / Weathered colourways・pattern book plates・Scotch Roman capitals・pinking shears・selvedge・fringe・pleated to the sett / to the stripe・plaid matching

## 八維配方

| 維度 | 本站 |
|---|---|
| industry | 格紋專門西服店（高雄鹽埕新樂街，1961 年起） |
| style | 蘇格蘭格紋 Highland Tartan（型錄「繪畫與材質」新增條目） |
| era | 1819 Wilson 樣本冊／1842 Vestiarium × 1961 鹽埕委託行 × 2026 |
| locale | 蘇格蘭邊區 Galashiels × 高雄鹽埕 |
| voice | 第三代裁縫的口吻：講線數、講對格、講多用幾碼布 |
| texture | 精紡羊毛斜紋、粉片、打版紙、鋸齒剪口 |
| density | 中：布塊大而滿，版面是譜冊頁的留白 |
| function | 〈對一條格〉工具＋購物：拖版型對格、即時估布估價、帶裁單預約 |

opening：`loom-pick-first 上梭開場`／nav：`pinked-swatch-tickets 鋸齒布樣吊牌導覽`／illust：`sett-mask-weave 譜即布`／mood：`sett-book-leaf-modern-dye 譜冊頁・現代染`

## 首創

**對格排料 plaid-matching marker layout（全館第一）**：全館第一個把「格紋對格」寫成模算術的功能。布每公分 8 線、一個循環 S 公分，三條規則——下襬同餘、後中鏡像 `yL+yR+34 ≡ 2·a0 (mod S)`、前中壓軸 `yF+32 ≡ a0 (mod S/2)`——即時判定，放手時吸附到最近的可行解；「示範排法」窮舉軸心位置求最短用布，裁單比較「不對格最省排法」多用幾碼。附帶：**數紗鏡 pick glass**——任何一塊布上游標所在那一點的經線與緯線各屬哪一段譜（色、線數），十倍放大真實斜紋即時讀出。

## motion-library 元件（1.20.0 @e45c261f）

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| BG-B-37 | Minimal Stripes | index | ambient | 整經帶：紅與海軍藍經線被排上機 |
| SHP-13 | Fold Unfold | index | ambient | 打褶段落的一摺一展 |
| BG-B-16 | Weave Grid | setts | ambient | 平紋對照組（格紋用的是斜紋） |
| BG-A-21 | Graph Paper | cut | ambient | 打版紙與曲線板描線 |
| BG-A-01 | Grid Fill | visit | ambient | 一格一格排滿的預約表 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-28，排程 Agent 自動執行）。*
