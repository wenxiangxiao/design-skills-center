# FERRAROTTI — Taller de fueyes, Almagro

阿爾馬格羅區的班多紐（bandoneón）修繕工房（虛構示意）。一九六一年開業，六十五年在同一個門牌後面：調音、換風箱皮、整修按鍵軸，以及每台出廠的琴掛上的那一塊 fileteado 銘牌。

整站的視覺語言取自 **fileteado porteño（布宜諾斯艾利斯車體繪）**——二〇一五年列入 UNESCO 人類非物質文化遺產代表名錄的傳統招牌繪畫技藝。

線上：`sites/fueye-porteno/index.html`　·　規格書：[SKILL.md](SKILL.md)

---

## 品牌設定

| 項目 | 內容 |
|---|---|
| 店名 | FERRAROTTI — Taller de fueyes |
| 地址 | Av. Medrano 358, Almagro, C1178 CABA, Buenos Aires |
| 電話 | +54 11 4862-3071 |
| 營業 | martes a sábado 10:00–19:00（週一公休） |
| 人 | Mercedes Ferrarotti（調音師・創辦人孫女）／Rubén Paladino（風箱師・1989 年入行）／Nélida Bracamonte（繪師・每月第一與第三個週四） |
| 工項 | 全機調音 142 音／風箱換皮 18 摺／按鍵軸整修 71 鈕／訂製銘牌 |
| 語氣 | 不推銷、不抒情。報工期、報價錢，並寫明「哪些地方我們不會動」。 |

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | **El eje 軸** — 今天在台上的六台琴、等候十一台、本月交件四台、六十五年；三道工序與價目表 |
| `taller.html` | **El taller 工房** — 這間店的來歷、三位師傅；「風箱是雙音的」：一顆鈕開合兩個音，附可以當場推拉的示範鈕 |
| `chapa.html` | **La chapa 銘牌檯**（核心功能）— 四個問題、每顆鈕推拉各一個答案，母題成對長在軸的兩側，最後一句話寫上緞帶 |
| `motivos.html` | **Los motivos 母題** — 八個有名字的母題；五個不可省略特徵的現場示範（含「把高光拿掉」開關）；流派的來歷與禁令 |

## 八維配方

| 維度 | 本站取值 |
|---|---|
| **風格 style** | fileteado porteño（既有流派，型錄「在地與文化視覺」新增條目，全館第 1 站） |
| **產業 industry** | 班多紐修繕工房（樂器修繕・布宜諾斯艾利斯 Almagro） |
| **opening 開場** | `eje-first` 對稱軸直開場：首屏沒有大標 hero，是一塊掛在中軸上的銘牌 |
| **nav 導覽** | `voluta-nav` 渦卷導覽：四個頁面＝銘牌框的四個角，左右兩角是同一個形的鏡像 |
| **signature 簽名動效** | `fuelle-cinta` 風箱緞帶：緞帶波幅改變 → 弧長改變 → 同一句話的字自己散開或收攏。零 `letter-spacing`、零 `textLength` 參與 |
| **illust 插畫** | `filete-pincelada` 一筆兩色筆觸構成：同一個 `d` 描三次（暗／身／亮），全畫面幾乎零 `fill` |
| **mood 氛圍** | `negro-y-cinta` 煙黑與緞帶：深底 + 暖白高光 + 鉻黃／朱紅／綠，無任何一色的淡版，零漸層底 |
| **func 功能** | 〈La chapa〉銘牌檯：四題、推拉雙音作答、母題成對上板、sentencia 上緞帶、當場結價 |
| **tech 技術** | ① SVG `<textPath>` ＋ `paint-order`（A 渲染層）② SMIL `<animateMotion>` ＋ `<mpath>`（B 動效層）③ Pointer Events ＋ `setPointerCapture()`（D 輸入層） |
| **era 時代** | 二十世紀初起的車廂廠手繪傳統，現役而非做舊 |
| **locale 地域** | 布宜諾斯艾利斯 Almagro；西班牙文（rioplatense）為主、繁中為註 |
| **voice 性格** | 師傅的口氣：短句、具體、會拒絕 |
| **density 密度** | 中高——邊緣不留白（框貼邊），但內部不填滿 |

## 認領的首創

**推拉雙音控制項（bisonoric controls）** — 全館第一個站，其主要控制項是**雙音的**：同一顆鈕，往內推（cerrando）與往外拉（abriendo）會得到兩個不同的答案，就像班多紐同一顆鈕在閉合與開啟時發出不同的音。方向在本站是一個真正的**輸入維度**，不是動畫方向：銘牌檯的四題全部以此作答，`taller.html` 的示範鈕也是。鍵盤 ← / → 等價，兩個答案永遠印在鈕的兩側，無 JS 時另有整頁靜態對照表，所以「破格」沒有換來難用。

## 四種動效

| 種類 | 名稱 | 觸發 | 降級後 |
|---|---|---|---|
| ambient | `brillo` 緞帶巡光（SMIL `<mpath>`，9s） | 無需輸入 | 光點停在緞帶上常駐，不消失 |
| input-driven | `luz de pincel` 筆肚轉向（`--lx/--ly`，rAF） | `pointermove` | 光源鎖在左上，亮側與暗側全數保留 |
| transition | `abre-el-eje` 從中軸開卷（340ms，零淡入） | 載入／版塊出現 | 版塊直接是開的 |
| signature | `fuelle-cinta` 風箱緞帶（420ms easeInOutQuad） | 推或拉 | 直接跳到終點波幅，文字照常寫上緞帶 |

---

*本站由 **Claude Opus 5** 設計與建置（2026-09-22，排程 Agent 自動執行）。*
