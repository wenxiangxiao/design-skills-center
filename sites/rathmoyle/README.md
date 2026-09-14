# RATHMOYLE DEALG 拉莫依結板作

手打銀環形胸針（penannular）、臂環、結板墜與修補。愛爾蘭米斯郡基爾貝，拉莫依十字路口。

**風格：島嶼抄本 Insular Illumination**（Book of Kells／Lindisfarne Gospels／Book of Durrow，
7–9 世紀愛爾蘭與諾森布里亞繕寫室；同一套語彙也長在塔拉胸針等金工上）。
型錄「在地與文化視覺」類，全館第 1 站。

線上：<https://wenxiangxiao.github.io/design-skills-center/sites/rathmoyle/>

---

## 頁面

| 檔 | 頁 | 內容 |
|---|---|---|
| `index.html` | 作坊 | 地毯頁開場（由外往內讀）、示範結板、價目摘要、三族紋樣預告、近期出爐 |
| `patterns.html` | 紋樣三族 | 五條不可省略的規矩，含「把上下交替關掉」的對照、兩種隔的示範、顏料表 |
| `oneband.html` | 結板台：兩條 | **核心功能**。在格點上放隔，把一面板收成恰好兩條、長短差 ≤6 格 |
| `commission.html` | 委製與價目 | 價目、修補章程、下單流程、地址與營業時間、常見問題 |
| `assets/logo.svg` | — | 原創 Logo：開口銀環＋交織帶面＋兩顆獸首＋長針＋一圈朱點 |
| `SKILL.md` | — | 風格規格書 |

## 品牌設定（全部虛構）

- 行號：RATHMOYLE DEALG（拉莫依結板作），第三代
- 地址：Rathmoyle Cross, Kilbeg, Co. Meath, Ireland ／ 電話 +353 46 927 4118
- 營業：週二至週六 10:00–17:30；週一送料、週日休；八月頭兩週停爐
- 匠人：Máire Ní Bhraonáin（結板、放樣）、Tomás Ó Cadhla（鍛焊拋光）、Éabha Ryan（學徒第三年）
- 料：925 銀線 1.8 mm，結板一格 = 6.4 mm 銀線
- 店規：「板上沒有一條走不通的帶子。」不打平織——平織是蓆子，不是結。

## 風格關鍵字

交織帶 interlace ／ 上下交替 over-under alternation ／ 斷點 break ／ 三曲腿 triskele ／
喇叭口 trumpet ／ 盾形 pelta ／ 獸首 zoomorphic terminal ／ 朱點輪廓 red-dot outlining ／
遞減首字 diminuendo ／ 地毯頁 carpet page ／ 犢皮 vellum ／ 雌黃 orpiment（島嶼藝術的「金」）／
銅綠 verdigris ／ 鉛丹 minium ／ 菘藍 woad ／ 滿版分格 horror vacui ／ 零透視零陰影

---

## 八維配方

| 維 | 值 |
|---|---|
| **style**（流派） | 島嶼抄本 Insular Illumination（型錄既有流派，非自創；`invented:false`） |
| **industry**（產業） | 手打銀環形胸針作坊（penannular 胸針・臂環・結板墜・修補） |
| **opening**（開場原型） | `carpetpage-first` 地毯頁直開場 —— 整頁純裝飾，資訊編織在框格裡，**由外往內讀** |
| **nav**（導覽原型） | `woven-through` 織入 —— 現用頁那一段與整條框帶是同一個連通分量 |
| **illust**（插畫技法） | `insular-triad` 島嶼三族紋樣構成（交織帶／螺旋盤／獸首 ＋ 強制朱點輪廓） |
| **mood**（氛圍） | `vellum-mineral` 犢皮礦彩 —— 零金箔、零漸層、零陰影，不透明礦物平塗 |
| **signature**（簽名動效） | `strand-walk` 穿織巡帶 —— 朱點沿帶子路徑走，在上浮出、在下鑽入 |
| **func**（核心功能） | 結板台「兩條」—— 放隔把板收成恰好兩條、長短差 ≤6 格（解謎／構成型） |

### 六變數維度

- **era 時代**：7–9 世紀繕寫室 × 當代小作坊的實務語氣
- **locale 地域**：愛爾蘭米斯郡（Rathmoyle／Kilbeg／Kells／R164），愛爾蘭文標籤與人名
- **voice 性格**：有主見的匠人。會退貨、會說「打不了」、會嫌觀光紋樣
- **texture 質感**：犢皮毛孔與纖維（硬邊週期，非漸層雲霧）；厚度一律硬邊實色方塊
- **density 密度**：滿版分格（horror vacui），但格與格不相通，動線由格決定
- **function 功能性**：見上表 func

## 三項核心技術

1. **自寫島嶼結繩引擎**（E 資料與生成層）— 全站唯一渲染器。上下交替由主／次格點的局部規則保證（400 組隨機配置、違規 0 次）；8×6 板求解 2000 次 = 50 ms。
2. **`offset-path` / `offset-distance` / `offset-rotate`**（B 動效與時間軸層）— 承載簽名動效。Baseline widely available（2022-09）。
3. **container queries + `cqi` 單位**（C 版面與樣式層）— 承載「紋樣密度由格自己決定」。Baseline（2023-02）。

漸進增強（非核心）：CSS scroll-driven animations 讓遞減首字隨捲動降下來；
此特性非 Baseline（Firefox 穩定版仍在旗標後），整段包在 `@supports` 內，不支援時字級停在靜態階。

## 認領首創

**拓撲連通分量作為互動目標，且該不變量同時統治導覽的現用狀態。**

使用者編輯的不是外觀，而是一個紐結圖的**斷點集合**；判定與目標是一個拓撲不變量
（帶子的連通分量數 = 2，且兩者格數差 ≤ 6）。同一支引擎回頭統治導覽：
現用頁不是被標示、被反相或被放大，而是**與整條框帶屬於同一個連通分量**。
版面上另一個被幾何逼出來的結果是獸首的數量——矩形板四個角必為帶端，所以每面板正好四顆頭。

與既有站的分辨：`shaft-eight` 的織法引擎輸出的是布面外觀，沒有連通分量與拓撲目標；
`foldpoint` 是剛性摺疊運動學（連續角度，不是離散不變量）；
`wanjie` 繩結研習所處理的是三維實體繩索的絞製與打結，本站的對象是平面紐結圖，
從頭到尾沒有任何東西被「綁」起來——只有帶子接得通與接不通。

## 動效預算（四種俱全）

| 類 | 內容 | 降級後 |
|---|---|---|
| ambient | 點朱：朱點一顆一顆亮起，繞完一圈重來 | 全部朱點靜態常亮 |
| input-driven | 指到任何一段，整條帶子（連通分量）立刻保持不透明，其餘降到 .28（<100ms） | 同（不受影響） |
| transition | 劃線揭頁：乾筆把格線劃滿再一格一格掀開（520ms steps(13)） | 不顯示遮幕 |
| signature | 穿織巡帶：朱點沿帶子走，在上浮出、在下鑽入 | 改以一行文字給出交點數／上幾次／下幾次／兩端在哪 |

---

*本站由 **Claude Opus 5** 設計與建置（2026-09-14，排程 Agent 自動執行）。*
