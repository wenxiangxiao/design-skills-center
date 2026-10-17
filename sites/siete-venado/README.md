# 七鹿可可 SIETE VENADO

> 屏東內埔老埤・種在檳榔蔭下的可可園兼 bean-to-bar 工坊 × **米斯特克—普埃布拉古抄本風格 Mixteca-Puebla Codex Style**（Codex Zouche-Nuttall／Borgia Group）

## 品牌設定（虛構）

- **店名**：七鹿可可 SIETE VENADO——創辦人鍾秀琴（1968–）生於 1968 年 6 月 2 日，依 Caso 相關式換算日名為「7 鹿 *siete venado*」。
- **來歷**：1993 年文藻西語科畢業後到瓦哈卡教中文，週末在 20 de Noviembre 街的可可磨坊顧石磨；1995 年買到 Dover 1975 年重印的《Codex Nuttall》，看到八鹿王婚約頁上新娘捧著的可可杯（學者讀作 *ynodzehua*「嫁妝」）；2009 年回老埤，在父親的檳榔園下種四百株可可；2014 年 10 月 6 日（8 豹）第一次開莢；2016 年 12 月 10 日（11 犬）第一片 70%。
- **人物**：鍾秀琴（園主）、林國棟（1966–，烘焙與石磨）、林宜蓁（1996–，包裝圖版）。
- **地址**：屏東縣內埔鄉老埤村龍潭路 172 巷 9 號（屏科大後門往東 1.8 km）・(08) 778-2009
- **營業**：門市週四至週一 10:00–17:30，週二、三休；園區導覽週六・日 09:30／14:00（100 分鐘，NT$480，4–12 歲 NT$240）。
- **商品**：檳榔蔭 70% NT$260／50 g・開莢日單批 85% NT$300／50 g（每週一開莢，一批以開莢日的日名命名）・研磨杯磚瓦哈卡式 NT$380／4 塊・生可可碎 NT$220／100 g・婚約杯禮盒 NT$720／盒（十二盒起，工期十四天，盒面印兩人的婚約圖）。

## 頁面

| 檔案 | 卷 | 內容 |
|---|---|---|
| `index.html` | 卷一・來歷 | **摺頁屏開場**：首屏即七張古抄本圖版的橫向摺頁屏（拖曳／方向鍵翻頁，窄螢幕改直排並在左右交替斷開紅線）；第七張為即時「今日日名」、營業狀態與本週批次；讀法圖例；婚約杯禮盒 |
| `twenty.html` | 卷二・二十日 | 13 × 20 的 tonalpohualli 曆表（十字準線 hover、方向鍵移動、點選釘住，右側即時算出下一次落在西曆哪天）；最近十個開莢批次的即時狀態；四款包裝（背面紅線並排可接成一條） |
| `naming.html` | 卷三・取日名 | **核心功能**：填兩個生日→兩個日名，選穿著／衣色／座位／婚約日，畫成一頁婚約圖；下載 SVG、複製可分享連結（?ba=&bb=…）、試算禮盒盒數與交期 |
| `visit.html` | 卷四・往老埤 | 古抄本式路線圖（點山→足印走到可可園）、導覽四段、票價、三種交通、常見問題 |

## 風格關鍵字

恆寬黑框線、平塗零漸層、石膏白底、胭脂紅／瑪雅藍／赭黃／草綠／可可棕、紅色導讀線兼地面、boustrophedon 讀序、摺頁屏、點數 1–13（無槓）、二十日符、細線牽名、側面大頭人物、鐘形山地名符、足印即行走、說話捲、蓆與豹皮座、起泡的可可杯。

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 屏東可可園兼 bean-to-bar 工坊 |
| 風格 | 米斯特克—普埃布拉古抄本 Mixteca-Puebla Codex Style（型錄「在地與文化視覺」2026-10-17 新增，全館第 1 站） |
| era 時代 | 14–16 世紀中美洲摺頁古抄本 × 1990s 瓦哈卡 × 2009 年後的屏東可可 |
| locale 地域 | 瓦哈卡（米斯特克）× 屏東內埔老埤（客家庄、檳榔園） |
| voice 性格 | 家譜式的敘述：日期、地名、人名、做了什麼，不形容 |
| texture 質感 | 石膏白鹿皮底、平塗礦物色、零光影 |
| density 密度 | 中：每張圖版一件事，正文在圖下 |
| function 功能 | 〈取日名・畫婚約頁〉——個人化產出＋下單試算（非模擬儀器台） |

- 開場原型：**screenfold-first 摺頁屏開場**（新）
- 導覽原型：**footprint-trail 足跡道導覽**（新）
- 插畫技法：**codex-frame-line 恆寬框線部件化平塗**（新）
- 氛圍：**gesso-mineral 石膏底礦物平色**（新）
- 簽名動效：**footprint-walk 足印行走**——換頁前，一串足印從目前那座山一步一步蓋到目的地那座山，然後整卷摺起；取日名時點數一顆一顆數進來、日符落定、足印走到座位上；路線圖上點哪座山就從哪裡走過來。
- 技術：SVG `<g>` 部件庫＋`vector-effect: non-scaling-stroke`／container queries＋`cqi`／自寫 tonalpohualli（Caso 相關式 JDN）＋`Intl.DateTimeFormat` 民國曆與農曆

## 首創

**曆名即命名的婚約頁產生器**：全館第一個以真實的曆法相關式（Alfonso Caso：儒略曆 1521-08-13＝1 Coatl）把任意西曆日換算成中美洲 260 日曆的日名，並把結果直接畫成古抄本式人物「細線牽名」構圖的站；同時是全館第一個把 `vector-effect: non-scaling-stroke` 當成風格本體（古抄本的恆寬框線）、讓同一套部件從 22px 導覽到 600px 圖版都維持同一條 2.2px 黑線的站。


## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-38` | Zigzag Energy | primary #B02A1F／secondary #1C1612／bg #EFE6D2、duration 8、density 1、intensity 1、seed 7 | ambient：胭脂紅與碳黑的鋸齒帶左右交錯推移——古抄本邊框的階梯回紋（xicalcoliuhqui）帶；斜接角、恆寬線、零透明。 |
| naming.html | `TXT-A-35` | Stripe Mask | primary #B02A1F／secondary #1C1612／bg #EFE6D2、text 取日名、duration 1.4、aspectRatio 16:9、seed 7（一次性，進視窗播放、點擊重播） | input：「取日名」被十四道硬邊直條一條一條印上、紅色刮線走過——像在石膏底上一格一格塗色；只有有色／無色，沒有半透明。 |
| twenty.html | `TXT-B-16` | Circle Text | primary #3B8A8F／secondary #1C1612／bg #EFE6D2、text 二十日符、duration 1.8、aspectRatio 16:9、seed 20（一次性，進視窗播放、點擊重播） | input：四個字先排成一圈、再展開成一行——260 日曆的日符本來就是繞著圈數的；開頭有約 0.1 秒的出現，其餘只有位移與旋轉。 |
| visit.html | `BG-B-02` | Halftone Wave | primary #1C1612／secondary #B02A1F／bg #EFE6D2、duration 9、density 1、intensity 0.9、seed 13 | ambient：一整片黑點隨波起伏變大變小——古抄本的數字就是點（1–13 個圓點），這裡把點數排成一片會呼吸的田；實心圓、零透明。 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-17，排程 Agent 自動執行）。*
