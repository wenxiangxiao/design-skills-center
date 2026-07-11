# NULLPOINT ESPORTS 斷點戰隊 — 電競戰隊 × 賽博龐克

一支虛構但可信的台北職業電競戰隊範例站，示範「賽博龐克霓虹 HUD」視覺語言在電競產業的落地。近黑底、硬邊霓虹、掃描線與故障（glitch）位移，全站零外部圖片、僅載入 Google Fonts。

## 品牌設定

- **戰隊全名**：斷點電子競技俱樂部 NULLPOINT ESPORTS CLUB
- **定位**：台北南港的職業電競戰隊，主力征戰《Valorant》與《英雄聯盟》
- **成立**：2021 年
- **基地**：台北市南港區三重路 66 號 8 樓（南港軟體園區）
- **聯絡**：02-2655-0142 · team@nullpoint.gg
- **先發選手（6 名）**：V01D（陳品睿・隊長）、GHOSTLY（林哲宇）、RENZO（Renzo Alvarez・PH）、KASU（松本一輝・JP）、APEX9（黃冠霖・場上指揮）、NOVA（김서준・KR）
- **教練團**：SABER（吳承恩・總教練）、DELTA（周敏華・數據分析師）、ROOK（許家豪・副教練）
- **贊助商**：迴路能量 CIRCUIT ENERGY、幀率科技 FRAMERATE、極域外設 KYBER GEAR、台北星鏈 STARLINK TPE、零度飲料 ZERO°
- **粉絲會**：零點會 Fan Club（年費 NT$ 990）

> 本站所有戰績、選手資料、地址電話皆為虛構示意，僅供設計展示。

## 頁面清單

| 檔案 | 頁面 | 重點內容 |
| --- | --- | --- |
| `index.html` | 首頁 | 故障標題 hero、下一場賽事 HUD 卡片、count-up 統計、先發三人預覽、贊助商牆 |
| `roster.html` | 選手名冊 | 6 名選手 HUD 資料卡（hover RGB 故障位移＋掃描線）＋ 3 位教練團 |
| `schedule.html` | 賽程戰績 | 即將開打賽程表、近期比分 scoreboard 網格、獎盃紀錄、門票與粉絲會 |

## 風格關鍵字

賽博龐克 · 霓虹 HUD · 掃描線 · 故障位移 glitch · 對角 clip-path 切割 · 硬邊霓虹 · 單寬科技字體 · 近黑底 · 青／洋紅／酸黃綠

## 技術說明

- 每頁單檔 HTML，CSS/JS 全 inline；頁面間相對路徑互連，共用一致 nav + footer。
- 字體僅用 Google Fonts：`Chakra Petch`（科技單寬感）＋ `Noto Sans TC`（中文）。
- 所有圖像原創：隊徽、選手剪影、贊助商標、獎盃、favicon 皆為 inline SVG；掃描線、故障、網格背景以 CSS 生成。**零外部圖片、零 emoji icon**。
- favicon 為原創 inline SVG data URI，寫在每頁 `<head>`。
- 招牌識別：選手 HUD 卡片 hover 時的 RGB 故障位移＋掃描線、對角 clip-path 面板、靜態 scoreboard 網格、HUD count-up 計數器。**不使用跑馬燈**，改用故障 hover 與進場揭示承擔動效重點。
- 所有動畫皆提供 `@media (prefers-reduced-motion: reduce)` 降級；手機（≤560px）有行動選單、版面不破。

*本站由 **Claude Opus 4.8**（排程 Agent 自動執行）設計與建置（2026-07-12）。*
