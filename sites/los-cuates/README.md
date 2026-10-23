# Vulcanizadora Los Cuates — 補胎行 × 墨西哥手繪招牌 Rótulos

伊斯塔帕拉帕 Ermita Iztapalapa 大道邊一間 1971 年開業、二十四小時不關門的補胎行（vulcanizadora），整個網站就是它那面三十二公尺的黃牆。牆上的字從 1983 年起都是招牌畫師 Beto Salgado 畫的；每次載入，他都依真實的上漆順序把牆重畫一遍：字面、右下的影、外框、白色亮點、最後簽名。

## 品牌設定（虛構）

- 店名：Vulcanizadora Los Cuates（Los Cuates＝墨西哥話「雙胞胎」）
- 地址：Calz. Ermita Iztapalapa 2318（門牌虛構），Iztapalapa，Ciudad de México
- 電話：55 5691 1971；24 horas・365 días；日班 Yoli、夜班 Kevin
- 創辦：Fidel 與 Fermín Olvera Ruiz（1949 年生於普埃布拉 Atlixco），1971 年以一台二手空壓機開業
- 招牌畫師：Alberto「Beto」Salgado（1957–），Rot. Beto Salgado 55 5582 0983
- 價目（MXN）：Tapón $60・Parche $120・Vulcanizado $250・Llanta usada desde $450・Balanceo $80・Montar $50・Nitrógeno $40・Rin enderezado $350・A domicilio +$150
- 真實背景：伊斯塔帕拉帕、Ermita Iztapalapa 大道、Metro 8 號線 Constitución de 1917、2023 年 Cuauhtémoc 區刷白約 1,500 個攤位的手繪廣告

## 頁面

| 檔案 | 牆 | 內容 |
|---|---|---|
| `index.html` | 黃牆 LA BARDA | 主招牌、24 HRS、服務清單、電話與簽名；「一個字的五道工序」；店史 |
| `precios.html` | 粉牆 LA LISTA | 畫在牆上的價目表（每列附傷口圖）、二手胎尺寸價 |
| `taller.html` | 藍牆 ¿TIENE ARREGLO? | 九十秒補胎分診遊戲，成績被重畫回牆上，開出 nota de remisión |
| `llegar.html` | 綠牆 CÓMO LLEGAR | 手繪位置圖、交通、營業與付款、招牌畫師 Beto |

## 風格關鍵字

rótulos mexicanos・rotulismo・barda・letra con filete y sombra・brillo・Bungee＋Yellowtail・乙烯漆平塗・tirol 灰泥・指路手 manita・畫師簽名

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 補胎行 vulcanizadora（24 小時） |
| 風格 | 墨西哥手繪招牌 Rótulos Mexicanos（型錄「在地與文化視覺」新增條目，全館第 1 站） |
| era 時代 | 1971 開業、1983 起每年十二月重畫的牆、2026 現在 |
| locale 地域 | 墨西哥城伊斯塔帕拉帕 |
| voice 性格 | 祈使句、價格先講、街口喊話（¡ÁNDALE!） |
| texture 質感 | 乙烯漆平塗＋灰泥 tirol 顆粒 |
| density 密度 | 中高：一面牆塞滿字，但只有三個數字最大 |
| function 功能 | 〈¿Tiene arreglo?〉九十秒補胎分診遊戲＋成績重畫上牆＋可分享的單 |

## 原型

- opening：barda-first 粉刷圍牆開場（首屏就是那面牆，招牌在你面前被畫出來）
- nav：manita-aqui 指路手導覽（現用頁的手指朝下＝你在這裡）
- illust：brillo-naif 素樸商品畫＋白色亮點
- mood：barda-vinilica 乙烯漆圍牆（每頁一面不同顏色的牆）
- signature：capa por capa 依招牌畫師上漆順序重畫

## 首創

全館第一個以「招牌畫師真實上漆順序」（字面→影→外框→亮點→簽名）為簽名動效、並用同一套三層字即時把遊戲成績重畫回牆上的站；第一個墨西哥 rótulo 站；第一個以補胎分診（看傷→選修法）為核心玩法的站。

## motion-library 元件（1.11.0 @dc24b44）

| ID | 名稱 | 頁 | 承載 |
|---|---|---|---|
| TXT-A-36 | Long Shadow | index | 「24 HRS」的實色長影＝放大的 sombra |
| BG-B-15 | Truchet Tiles | index | 胎紋 dibujo de llanta 帶狀飾邊 |
| TXT-B-08 | Number Slam | precios | $60 砸上粉牆 |
| TXT-B-18 | Letter Bounce | taller | 結果板 ¡ÁNDALE!／¡QUEDÓ! |
| BG-B-22 | Stripe Twist | llegar | 牆頂手刷 franjas 波浪飾帶 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-23，排程 Agent 自動執行）。*
