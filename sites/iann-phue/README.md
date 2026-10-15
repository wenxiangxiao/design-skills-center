# 影皮行 TOKO KOELIT

**產業**：皮帶打孔與皮件修改店兼後院通宵皮影戲（桃園市中壢區中平路 91 巷 6 號）
**風格**：爪哇皮影戲 Wayang Kulit Purwa（中爪哇梭羅／日惹宮廷樣式：鑿孔水牛生皮、側面風格化戲偶、kelir 影幕與 blencong 油燈、gunungan 宇宙山、四階 sunggingan 與金箔 prada）

陳德福（Tan Tek Hok，1941–2017）生在梭羅，家裡批水牛生皮，隔壁是鑿偶師傅的作坊。1959 年印尼 PP 10 禁止外籍華人在鄉間零售，1960 年他以僑生身分來台，行李裡是一套 32 支鑿偶刀和一片 gunungan。1968 年起在中壢巷口用鑿偶的圓口刀替人打皮帶孔，一個孔兩塊錢，後來不收錢。2019 年照顧過他的 Wulan Puspitasari 與孫女陳舒婷在後院拉起白布，每逢爪哇曆 Sabtu Legi 從晚上八點演到天亮。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 〈影幕〉首屏是一面被油燈照亮的 kelir：打孔的店名牌、依台北此刻落在哪一段 pathet 決定上場的偶（白天 gunungan 插在正中）；游標是戲偶師握著手籤的手、偶從燈邊巨影落到幕面；「翻面」走到戲偶師那側看鏡像的彩面。下接三幕店史、四塊「游標＝燈」的鑿孔皮樣、下一場 Sabtu Legi |
| `wayang.html` | 〈認影〉遊戲：一具偶從燈邊慢慢貼近影幕，影子 9 秒內由 7 倍大、糊成一團收成原寸；四選一認出角色，越早越高分；答完翻到彩面看真身；六張後收進皮箱、拿代碼 |
| `kulit.html` | 〈皮作〉Wulan 工作檯上的彩面 Arjuna（可拖手）；價目做成一條條皮帶（滑過會被拉一下、多打一個孔）；六枚書籤的皮箱（可拿到燈下看影子）；燈罩孔紋預覽 |
| `omah.html` | 〈來店〉打孔皮地圖（游標＝燈）、即時營業狀態、之後四場 Sabtu Legi、weton 查詢（生日 → 爪哇七日＋五日 pasaran＋neptu）、週六鑿孔課預約（帶入認影代碼） |

## 品牌設定

- 營業：週二至週日 11:00–20:00、週一休；後院通宵戲每逢 Sabtu Legi（35 天一輪）20:00 至天亮，免費
- 電話：(03) 425-1968
- 價目：皮帶打孔 免費・截短重打孔 NT$120・換扣 150・錶帶 680・植鞣皮帶 1,280・皮影書籤 220・gunungan 掛件 1,600・燈罩 2,400／3,800・全彩戲偶 12,000 起・鑿孔體驗課 1,200
- 人物：陳德福（1941–2017，創店）、陳家興（1970–，櫃台）、Wulan Puspitasari（1989–，鑿孔與上彩）、陳舒婷（1995–，網站與後院戲）、Ki Sutrisno（1968–，掌偶 dalang）

## 風格關鍵字

wayang kulit・kelir 影幕・plisir 紅邊・blencong 油燈・點光源投影・鑿孔 tatah（bubukan／inten-intenan／seritan）・側面戲偶 wanda・gapit 主籤與 tuding 手籤・gunungan／kayon・sunggingan 四階染・prada 金箔・poleng 格紋・pathet nem／sanga／manyura・gedebog 香蕉莖・Aksara Jawa

## 八維配方

- **era**：中爪哇宮廷皮影（18–20 世紀定型）× 1960 年代印尼華僑來台 × 2019 年後的移工社群
- **locale**：中壢車站前站・中平路巷弄
- **voice**：店家口吻、短句、技術名詞用爪哇語斜體並當場解釋
- **texture**：亞麻布、水牛生皮、透光孔、椰子油燈的暖光
- **density**：首屏低（一面幕、兩具偶），內頁中等
- **function**：〈認影〉從影子認角色的收集遊戲（非模擬儀器台、無量表、無參數滑桿；非購物〔kim-hoh〕、非紀念文件訂製〔siang-tshiok〕、非表演聲音〔phah-pan〕、非剪形創作〔tsioh-hue〕、非排字編輯〔sui-hing〕）
- **opening**：kelir-first 影幕直開場
- **nav**：gedebog-simpingan 香蕉莖插偶導覽（底部固定）

## 技術

1. **CSS `mask-image`**（A 渲染）：一張 SVG 同時當觀眾側的影子遮罩與戲偶師側的彩面——孔在兩面都透光
2. **requestAnimationFrame Verlet 積分**（B 動效）：兩節手臂以距離約束與彈簧追隨游標／方向鍵，放開後回休息姿勢擺盪
3. **Intl API＋爪哇曆計算**（E 資料）：台北時間決定首屏演哪一段 pathet、下一場 Sabtu Legi、weton 查詢

## 首創

**點光源透視投影的鑿孔剪影（point-light perspective projection of perforated silhouettes）**：全館第一個 wayang kulit 站，也是第一個讓「影子大小與糊度由燈—偶—幕三者距離決定」成為介面語言的站——每具偶在 `.proj` 層以 `s = 1/(1−d)` 繞燈點縮放、以 `火焰半徑×(s−1)/s` 為半影模糊，燈的 noise 晃動讓遠離幕面的影子晃得更大；同一份 SVG 同時作 `mask-image`（觀眾側）與 `background-image`＋`mask-image`（鏡像的戲偶師側）。〈認影〉把這個物理變成遊戲：9 秒內影子從巨大模糊收成清楚剪影，你得在輪廓還糊的時候認出角色。附帶首創：以 1945-08-17＝Jumat Legi 為錨點的爪哇五日 pasaran 曆法驅動演出時程與 weton 查詢；以 canvas 取樣字形打孔的店名牌。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-15，排程 Agent 自動執行）。店名、人物、門牌、電話、價格與演出時程皆為虛構示意；wayang kulit、梭羅 Surakarta、Pasar Klewer、PP 10/1959、中壢車站周邊印尼社群為真實背景。戲偶與 gunungan 皆為原創程序化圖形，非任何博物館藏品之複製。*
