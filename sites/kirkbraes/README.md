# Kirkbraes 薔薇圃 — KIRKBRAES ROSES

古典薔薇苗圃 × 格拉斯哥學派 Mackintosh（Glasgow Style）

蘇格蘭 East Renfrewshire、Uplawmoor 的一間古典薔薇苗圃。嫁接苗、高幹苗、接穗，十六個一九六〇年以前的品種。
圃口那一面牆上有七根莖：**莖畫多長，苗就是多高**——一公分二點四像素，牆上的空白是可以拿尺量的商品規格。
沒有型錄照片；要哪一株，用檢索表問出來。

線上：<https://wenxiangxiao.github.io/design-skills-center/sites/kirkbraes/>

---

## 品牌設定

| | |
|---|---|
| 商號 | Kirkbraes 薔薇圃 ／ KIRKBRAES ROSES |
| 行業 | 古典薔薇苗圃（嫁接苗・高幹苗・接穗・品種檢索） |
| 地址 | 蘇格蘭 East Renfrewshire，Uplawmoor，Kirkbraes Road 4 |
| 電話 | +44 1505 84 2217 |
| 營業 | 起苗季 11/1–3/15 週三至週六 09:00–16:00；其餘月份僅週六 10:00–14:00 |
| 人 | 圃長 Isobel Craig（嫁接與育苗，第三代）／ Tam Brodie（起苗、修剪、包裝）／ Aileen Muir（見習，接穗登錄） |
| 砧木 | 裸根灌木用 *Rosa laxa*，高幹用 *Rosa rugosa* |
| 價目 | 接穗 £3.20／裸根灌木苗 £14.50／半高幹 60cm £26／高幹 90cm £34／高幹 120cm £45／蔓性苗 £38／原種大株 £58／郵寄包裝 £6.80 |

> 商號、地址、電話、價目、株數與人名皆為示範用的虛構內容。
> 十六個品種名、育成年代與系統為真實的古典薔薇。

## 頁面

| 檔案 | 頁名 | 內容 |
|---|---|---|
| `index.html` | 圃口 The Yard | 七根莖的直開場、可拖曳的量尺、七項出貨規格表 |
| `key.html` | 檢索台 The Key | 核心功能：四問十六株的二分檢索表，加印刷版對句表 |
| `stock.html` | 名冊 The Book | 十六個品種的年代、系統、花色、香、習性、規格、價、株數 |
| `graft.html` | 嫁接房 Grafting Shed | T 字接四步、起苗季日曆、全部價目、圃裡的人 |
| `assets/logo.svg` | — | 原創 Logo（立桿＋玫瑰＋方格陣＋抽長字） |
| `SKILL.md` | — | 風格規格書 |

## 風格關鍵字

格拉斯哥學派、Mackintosh、The Four、Margaret Macdonald、Glasgow School of Art、Hill House、
Willow Tea Rooms、格拉斯哥玫瑰、縱向抽長、方格陣、石膏白、淡彩、圓弧構成、無金屬光澤

## 八維配方

| 維度 | 本站 |
|---|---|
| **style 流派** | 格拉斯哥學派 Mackintosh（既有型錄「裝飾與世紀轉折」類，全館第 1 站） |
| **era 時代** | 1897–1910 的格拉斯哥，室內而非印刷 |
| **locale 地域** | 蘇格蘭 East Renfrewshire 鄉間 |
| **voice 性格** | 少話、實務、不勸買；顏色是最不重要的那一項 |
| **texture 質感** | 石膏抹刀紋（97°，單向，永不平塗）＋ 黑漆細構件 |
| **density 密度** | 極稀。首屏 70% 以上是未著色的牆 |
| **function 功能** | 檢索台：四問十六株的二分檢索表（檢索／分類型，約 60 秒一輪） |
| **opening 開場** | `standardrose-first` 高幹苗直開場 |
| **nav 導覽** | `root-lifted` 起苗導覽 |
| **illust 插畫** | `anisotropic-stretch` 異向抽長構成 |
| **mood 氛圍** | `gessoed-white` 石膏白牆 |
| **signature 簽名動效** | `attenuate-growth` 抽長生節 |
| **tech 技術** | SVG `<marker>`（A）／ WAAPI `composite:'add'`（B）／ CSS `text-box-trim`（C） |

## 認領的首創

**空白即規格（whitespace as a dimensioned commodity）。**

全館第一個站，其版面上的空白不是留白、不是節奏、也不是氣質，而是**一個有單位、可以被使用者當場量出來、
並且直接標在價目表上的商品規格**。七根莖的長度以 `1cm = 2.4px` 的固定比例尺實際畫出，
頁面附一把可拖曳（也可用方向鍵操作）的量尺，量到的公分數就是價目表上的公分數、就是你收到的那一株離土後的高度。
於是「把版面留白變多」在本站等於「賣更貴的苗」——設計決定與商業事實是同一件事，改一個就改了另一個。

附帶的第二件事：**生長＝改變縱橫比，不是改變尺寸。**
檢索台上每長一節，動畫改變的只有 `scaleY`（0.06 → 1），所以節上的橫材在成長過程中由極薄長到全厚、
而縱向的莖從頭到尾一樣粗。全站沒有任何一條線是用 `stroke-dashoffset` 描出來的。

## 動效預算（四種）

1. **ambient**：七根莖各自搖曳（Web Animations 加法合成，振幅 0.34–0.60°，相位不同步）
2. **input-driven**：碰任一根莖 → 莖轉黑漆加粗、珠放大、量尺當場跳到它的公分數（無補間）
3. **transition**：換頁＝一道黑漆橫材由上緣落下再抽走（`clip-path: inset()`）
4. **signature**：**抽長生節**（`scaleY: 0.06 → 1`，540ms）

四種皆有 `prefers-reduced-motion` 降級，降級後資訊零損失。

## 技術與相容性摘要

| 技術 | 層 | 承載 | 支援 / fallback |
|---|---|---|---|
| SVG `<marker>` + `context-stroke` | A 渲染 | 所有線端的珠點，由渲染器強制 | marker 為 Baseline（2015-07）；`context-stroke` 不支援時退回 presentation attribute 的固定墨色 |
| WAAPI `composite:'add'` | B 動效 | 搖曳疊加在靜態姿態上 | Chromium 84+／Firefox／Safari；`try/catch` 失敗則莖靜止 |
| CSS `text-box-trim` | C 版面 | 抽長字以 cap-height 坐在橫材上 | Chrome/Edge 133+、Safari 18.2+（非 Baseline，Firefox 未支援）；`@supports not` 退回 `line-height:1` ＋ 可量測的 `--cap` |

單頁大小 26.8–41.4 KB（門檻 350 KB），零外部圖片、零音檔、零第三方 JS，外部資源僅 Google Fonts。

---

*本站由 **Claude Opus 5** 設計與建置（2026-09-16，排程 Agent 自動執行）。*
