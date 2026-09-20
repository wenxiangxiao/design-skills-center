# AMER DE LA COLLINE — 山丘草本苦酒蒸餾所

**產業**：草本苦味開胃酒蒸餾所（四季四款・坡上採集・石版酒標與扁額訂製）
**風格**：新藝術 Art Nouveau — 彩色石版直幅半身 Panneau Décoratif（既有流派，型錄「裝飾與世紀轉折」條目）

法國洛林、南錫南方二十八公里的 Colline de Sion-Vaudémont 坡腳下，
兩間石屋：前面蒸餾、後面窖藏。十一種草、四個季節、四塊石版。
酒標與扁額出自南錫 Atelier Marchal 的石版師 Hélène Guérin —— 她畫的字從來沒有兩個一樣。

**線上**：<https://wenxiangxiao.github.io/design-skills-center/sites/vaudemont/>

---

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | **四聯屏** — 春夏秋冬四條直幅，四款苦酒的母題、規格、飲法 |
| `atelier.html` | **結字檯 Nouage** — 核心功能：打一個詞，工坊當場畫成一枚扁額並開工單 |
| `herbier.html` | **草譜** — 十一種草：採期、在酒裡的角色、在版上的角色，＋ 十二個月採期表 |
| `maison.html` | **工坊** — 地址、四個人、石版五道工序、價目、常見問答 |
| `SKILL.md` | 風格規格書（含「5 個不可省略特徵」與「技術實作與相容性」兩章） |
| `assets/logo.svg` | 原創廠標 |

---

## 八維配方

| 維度 | 值 |
|---|---|
| **opening** | `panneau-first` 直幅四聯直開場 — 首屏不是大標、不是目錄、不是一件 1:1 實物，而是四個各自完整、卻被同一條線縫在一起的畫面 |
| **nav** | `tige-nav` 主莖行進導覽 — 一條有反曲點的莖，四個芽苞即四頁；露珠停在現用頁，樹液持續往上走 |
| **signature** | `enlacement` 套疊收緊（全館唯一）— 字母先各自落在正常字距上，再互相滑進對方的凹處直到幾何接觸，460ms 內整排收緊成一個互咬的整體 |
| **illust** | `contour-et-aplat` 輪廓與平塗構成 — 一條粗細分級的封閉輪廓線包住完全無階調的平塗；零網點、零漸層、零陰影、零筆觸 |
| **mood** | `louche` 混濁綠白 — 「加水之後」：沒有任何飽和純色，最深的不是黑是龍膽青，唯一暖色苦橙全站 ≤ 3 % |
| **func** | **結字檯 Atelier de Nouage**（題寫／畫字型互動）— 輸入一個詞與一個母題，引擎實測字母側影、互相套疊、末筆拉成鞭形曲線收成渦卷，並開出石版工單（版面／色數／石版塊數／套印序／工期／報價）。90 秒一輪，規則三句話 |
| **tech** | ① `SVGGeometryElement.isPointInStroke()` / `isPointInFill()`（A 渲染層）— 實測字母側影與「結」的落點<br>② CSS Motion Path `offset-path`／`offset-distance`／`offset-rotate`（B 動效與時間軸層）— 樹液與露珠沿同一條鞭形主莖行進<br>③ SVG `feMorphology operator="dilate"` ＋ `feComposite operator="in"`（A 渲染層）— 由母題自身長出地色反白環 |
| **era / locale / voice / texture / density** | 1894–1910／法國洛林・南錫 École de Nancy／工坊第一人稱、口氣短而篤定／彩色石版的硬邊平色與紙／中密度、留白由日輪決定 |

### 變數維度落實

- **era**：彩色石版的物理限制（一色一石、主版最後上、無中間調）直接寫成色彩規則。
- **locale**：Colline de Sion-Vaudémont 的石灰岩草坡植物相決定了十一種草與四款酒。
- **function**：見上表 func。

---

## 認領的首創

**以 SVG 幾何實測做字母互相套疊的 enlacement 排字器**（全館首創）。

本站沒有字距表、沒有字型的 kerning pair、沒有預先算好的位移表。
它在瀏覽器裡對每一個自繪字母建立離屏 path，沿 24 條掃描線由外向內探
（粗掃 4px → 逐 px 細修），實測出左右兩條側影並快取；
再把後一個字母往左推，推到任何一條掃描線上的墨距小於 9 個單位為止。
「結」的落點同樣是問出來的：候選點必須同時通過扁額輪廓的 `isPointInFill()`
與「沒有壓到任何一筆字」兩道檢查。

與既有站的分界：`the-homer` 的〈見方〉是把整行字拉到一個**矩形**的固定寬度
（可變字型寬度軸 ＋ 求解器）；本站不改變任何字母的寬度，
它改變的是**相鄰字母之間的相對位置**，依據是兩個非凸形狀的幾何接觸。

---

## 動效預算（四種俱全）

| 類型 | 內容 | reduced-motion 降級 |
|---|---|---|
| ambient | 樹液沿主莖循環行進（28s，`offset-path`） | `display:none`；現用頁改由露珠表達，資訊零損失 |
| input-driven | hover 母題 → 反白環以 `feMorphology` 膨脹一圈（90ms，< 100ms）；打字 → 整排字即時重排 | 直接到位，無過渡 |
| transition | 換頁時露珠沿莖滑到下一個芽苞（620ms）＋ 版心沿莖方向 `clip-path` 展開（560ms） | 直接切換 |
| signature | `enlacement` 套疊收緊（460ms，每字 stagger 22ms） | 直接畫出收緊後的最終形，結果完全一樣 |

---

## 備援

- **無 JavaScript**：手繪字在 HTML 裡本來就是真文字（`data-text` 同時是可見文字），
  退回 Cormorant Garamond 大寫加字距；結字檯另有一份建置時算好的靜態落樣扁額，
  工單、價目、工序、聯絡方式全部是靜態內容，資訊零損失。
- **`isPointInStroke` 不可用**：自動改走 `Path2D` ＋ `Canvas2D.isPointInStroke()`，排版結果相同；
  兩者皆不可用時退回名目字距，只是不再互咬。
- **`offset-path` 不支援**：兩個標記預設 `visibility:hidden`，導覽本身是原生 `<a href>`，不受影響。
- **SVG 濾鏡不支援**：少一圈反白環，母題直接畫在地色上。

---

## 去 AI 化自查

零外部圖片、零外部音檔（僅 Google Fonts 兩支字族）；零漸層、零圓角、零 box-shadow、零 blur；
零 emoji icon；零 Lorem ipsum；無跑馬燈；無「EST. 19xx」徽章；無置中三卡片模板。
所有插畫、廠標、favicon 為原創 SVG，由本站的 `botany.py` 造形基元生成。
品牌、人物、地址、電話、價格與產品皆為虛構示意。

---

*本站由 **Claude Opus 5** 設計與建置（2026-09-20，排程 Agent 自動執行）。*
