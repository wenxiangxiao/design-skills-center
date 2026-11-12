# Sola Firme 穩底鞋匠

里斯本 Bairro Alto 的換鞋底店，兼幫客人「問路」。

**風格**：葡式碎石路 Calçada Portuguesa。

整個網頁的地就是一條即時鋪出來的石頭路：黑玄武岩、白石灰岩、砂縫。內容是嵌在路上的石灰岩牌，導覽是門口三塊用石頭拼字的門墊。游標走過，會在石頭上留下會乾的濕鞋印。

| 頁 | 內容 |
|---|---|
| `index.html` 店 ENTRADA | Rossio〈Mar Largo〉石浪路面鋪石進場、店史（1959 年鋪路工在自己鋪的白石上滑倒）、三件事、你上次問的路、來店 |
| `solas.html` 鞋底 SOLAS | 菱格星芒路面、三種照路取名的鞋底（Rossio 波紋／Chiado 菱格／Carmo 方塊）、價目、四種石頭濕了各滑多少 |
| `caminho.html` 走哪條 CAMINHO | 核心功能：點出發地與目的地、選天氣與鞋底，Dijkstra 算出最穩與最短兩條路，紅石鋪出路線、建議換底並留單 |

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 換鞋底／補鞋（sapataria） |
| 風格 | 葡式碎石路 Calçada Portuguesa（型錄「在地與文化視覺」新增條目） |
| era 時代 | 1849 Rossio 鋪面 → 1959 → 今日 |
| locale 地域 | 里斯本 Chiado／Bairro Alto／Baixa |
| voice 性格 | 老師傅的實話：哪條路會滑就說哪條 |
| texture 質感 | 手敲石塊、砂縫、雨後濕亮 |
| density 密度 | 疏：大片空路面＋少量石牌 |
| function 功能 | 〈走哪條〉路線工具（圖論最短路），附換底建議與留單 |

**原型**：

- opening `pavement-plan-first` 俯看石路開場
- nav `tapete-doormat-nav` 門前石毯導覽
- illust `field-aligned-calcada-stones` 沿紋座標鋪石
- mood `basalt-limestone-after-rain` 雨後黑白石

## 首創

**石心量化圖樣著色器＋會乾的濕鞋印**（stone-quantised pattern shader with drying footprints）。

這是全館第一個在片段著色器裡同時做三件事的站：

1. 依圖樣走向建立石格座標。
2. 把圖樣在「石心」取樣，讓黑白邊界量化到整顆石頭。
3. 以 uniform 環形緩衝接收游標鞋印，濕印由邊緣往內乾。

首頁的波相位會緩慢前進，石頭本身不動，只有顏色隨浪頭整顆翻面，叫做「石浪」。

## motion-library 元件

| ID | 名稱 | 頁 | 角色 | 承載 |
|---|---|---|---|---|
| TXT-B-38 | Text Mosaic | 店 | transition | hero 店名由粗方塊細化成字＝石頭拼字 |
| BG-B-39 | Minimal Wave | 店 | ambient | 頁尾 Mar Largo 黑波帶 |
| SHP-30 | Grid Cascade | 鞋底 | transition | 6×6「一方試鋪」石頭依對角落定 |
| BG-B-15 | Truchet Tiles | 鞋底 | ambient | 價目前的四分之一圓弧鋪面帶 |
| TXT-A-02 | Letter Sequence | 走哪條 | transition | 標題 CAMINHO 逐字落位 |

**來源**：motion-library 1.39.0 @bafd6002。以 `tools/ml-embed.js` 依頁產生子集，`tools/ml-smoke.js` smoke ok。

---

*店名、人名、門牌、電話、價格、街道石材與坡度皆為虛構示意。以下為真實背景：里斯本 calçada portuguesa 史實（1840 年代 São Jorge 城堡、1848 年核准／1849 年完工的 Rossio〈Mar Largo〉、黑玄武岩與白石灰岩、Burle Marx 的 Copacabana 海濱）與街名。所有圖像皆由程式即時鋪石繪製。*

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-12，排程 Agent 自動執行）。*
