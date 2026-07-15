# 夜鳴愛樂管弦樂團 Nocturne Philharmonic｜交響樂團 × 樂譜/五線譜美學

一個虛構但可信的歐陸交響樂團官網示範。以樂譜／五線譜（musical staff-notation）作為版面骨架，深夜靛藍為底、朱批紅點題，墨線落於五線之上。極疏的留白、嚴肅的職人語氣，像一份為深夜印製的音樂會節目單。

---

## 品牌設定

- **名稱**：夜鳴愛樂管弦樂團 Nocturne Philharmonic
- **常駐廳**：Rheinhalle 音樂廳，Konzertplatz 3, Verholm（虛構歐陸城市）
- **音樂總監／首席指揮**：Elias Vondra
- **樂團首席（Konzertmeister）**：Mira Sølund
- **編制**：約 92 名常任團員（弦樂 60／木管 14／銅管 13／打擊 5）
- **售票**：+49 (0)30 1180-4400
- **票價**：€28 / €45 / €68 / €92
- **樂季**：2026 Sep – 2027 Jun（2026–27 樂季）
- **曲目**：Sibelius 第二號交響曲（Op. 43）、Mahler 第五號交響曲、Beethoven 第七號交響曲（Op. 92）、Ravel《達夫尼與克羅埃》第二號組曲，以及委創新作 **林悅《墨線 Ink Lines》（世界首演）**；以 Allegro／Adagio／Op. 等義大利術語點綴。
- **音樂會標題**：北方之夜、墨與火、節奏之神、黎明之園（皆 2026–27，開演 19:30，Rheinhalle）。
- footer 明示：「設計示範，虛構樂團」。

## 頁面

- **index.html** — 章節式捲動的四樂章敘事首頁（樂團序曲、本季識別、音樂總監 Elias Vondra、赴約邀請），含 playhead 掃描五線譜與指揮棒游標拖尾。
- **season.html** — 2026–27 樂季曲目，四套主要節目以「刻版節目單」呈現（日期、標題、曲目與作曲家／Op.、獨奏者、地點、票價），以五線譜分隔線分段。未使用 count-up 跳動計數。
- **ensemble.html** — 樂團編制與音樂家（弦樂／木管／銅管／打擊），音樂總監與首席簡介，Rheinhalle 舞台座位圖以原生 SVG（半調網點＋五線譜風格）繪製。
- **assets/logo.svg** — clef-on-staff 實心墨字標。

## 版面原型

- **opening = chapter-scroll**：無巨型 hero；首頁以第一至第四樂章（I–IV）的捲動敘事流動，讀譜線隨捲動掃過五線譜。
- **nav = side-rail**：固定左側直排導覽，以羅馬數字標示樂章／段落（I 樂團、II 樂季、III 編制），含品牌標記；≤560px 收合為頂部橫列。三頁共用同一 side-rail 與 footer，以相對連結串接。
- **signature = playhead 掃描 ＋ 指揮棒游標拖尾 ＋ 樂章翻頁位移**：捲動驅動的垂直讀譜線沿五線譜移動，經過的音符依序點亮／短暫放大（IntersectionObserver ＋ requestAnimationFrame，無音訊）；hero／五線譜區指標移動時留下數段衰減的朱紅拖尾如一次運弓；切換段落時五線譜整體位移如翻頁。`prefers-reduced-motion: reduce` 時凍結讀譜線、關閉拖尾與翻頁位移。
- **illust = halftone 半調網點**：樂器剪影、指揮／樂手肖像、座位圖皆以原生 SVG 變半徑點陣（dot-screen）在深底上以 ivory／steel 生成；五線譜線條為 UI 結構，插畫技法為半調網點。零外部圖片。

## 七維配方

| 維度 | 值 |
| --- | --- |
| 產業 | 交響樂團 |
| 風格 | 樂譜／五線譜美學（musical staff-notation aesthetic） |
| era | 當代 |
| locale | 歐陸 |
| voice | 嚴肅職人（serious craft） |
| texture | 墨水（ink on staff paper） |
| density | 極疏（大量留白） |

## 風格關鍵字

深夜靛藍、墨線、五線譜、朱批紅、刻版節目單、半調網點、極簡指揮手勢、留白、attacca、pianissimo、engraved、nocturne。

## 配色

| 色 | Hex | 用途 |
| --- | --- | --- |
| Ink Black | `#0A0E1A` | 頁面主底 |
| Midnight Indigo | `#121A2E` | side-rail／footer／卡片底 |
| Staff Ivory | `#E9E3D2` | 五線譜線、主要文字、音符墨形 |
| Conductor's Red 朱批 | `#D6452F` | 讀譜線、重點、hover、委創標記 |
| Steel Blue | `#6E8BB0` | 次級標籤、義大利術語、半調點陣 |

> 禁令：不用金色（避免 Art-Deco）、不用白／米色頁面底、不用圓角軟卡與模糊陰影、不用 thin lineart 作主插畫。

---

*本站由 **Claude Opus 4.8 · 排程 Agent** 設計與建置（2026-07-15，排程 Agent 自動執行）。*
