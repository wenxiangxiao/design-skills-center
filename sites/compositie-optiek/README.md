# 構成眼鏡 Compositie Optiek — De Stijl × Three.js 真 3D 展示台

> Design Skills Center 館藏範例站 · **全館第一個 Three.js 真 3D 站，並定位為之後所有 3D 站的「3D 標準範本」**

台北赤峰街一間虛構的風格派（De Stijl）獨立眼鏡行。四款鏡框全是直線與正圓的構成主義設計，紅黃藍與墨黑烤漆——而它們不是照片，是**在瀏覽器裡用 Three.js 基本幾何體即時程序化建模出來的 3D 商品**：可拖曳旋轉、即時換框色與鏡片色、靜置四秒自動展示。

## 八維配方

| 維度 | 值 |
|---|---|
| 產業 industry | 眼鏡行（獨立配鏡工坊） |
| 風格 style | De Stijl 風格派（蒙德里安格線、三原色、黑色粗直線） |
| 年代 era | 1920s 風格派 × 當代 |
| 地域 locale | 歐陸（荷蘭）× 台北赤峰街 |
| 語氣 voice | 冷靜理性，帶一點荷蘭式直白（「驗光是工序，不是儀式」） |
| 質感 texture | 玻璃（半透明鏡片）＋ 烤漆金屬（MeshStandard/PhysicalMaterial） |
| 密度 density | 中等 |
| 功能 function | 測驗／診斷（臉型 × 用途五題適配診斷 → 推薦 → 一鍵送上 3D 展示台） |

**硬性輪替**：開場原型 = split-screen（左 3D 展示台、右規格控制，手機上下堆疊）；nav = topbar（蒙德里安格線：黑粗線分格＋紅黃藍小色塊）；插畫 = flat-shape 原色色塊構成；mood = mid-tone（展廳灰 `#ADB0A8` 底＋白卡片＋原色色塊）。

## 首創認領：Three.js 真 3D 程序化商品展示台

全館首次引入真 3D。核心原則——**鏡框 3D 模型完全用基本幾何體程序化建模，禁止外部模型檔**：

- `TorusGeometry` → 圓框框圈、八角框（tubularSegments=8）、圓框鼻樑（半圓弧 arc=π）
- `BoxGeometry` → 眉框眉樑、方框四邊、鉸鏈、鼻墊
- `CylinderGeometry` → 鏡腿直臂與耳彎、鏡片圓片（八角片用 radialSegments=8）
- `MeshPhysicalMaterial`（transparent + clearcoat + depthWrite:false）→ 半透明鏡片，三種片色即時切換
- `PlaneGeometry + ShadowMaterial` → 只接影子的展示台地板

互動全部自實作（r128 無 OrbitControls）：pointer 拖曳旋轉鏡框 group、放手後慣性衰減（×0.94/幀）、無操作 4 秒後緩慢自動旋轉展示。

**效能與備援標準**（已寫入 SKILL，為全館 3D 站規範）：`pixelRatio ≤ 2`、分頁不可見暫停 render loop、`prefers-reduced-motion` 關閉自動旋轉（仍可手動拖曳）、WebGL 建立失敗時以原創 SVG 正視圖備援且控制項照常運作。

## 頁面

1. `index.html` — split-screen 3D 展示台：四款鏡框程序化建模、框色 × 鏡片即時切換、規格表、系列總覽（各卡可「送上展示台」）、製框三原則。
2. `fitting.html` — 臉型 × 用途適配診斷：五題（臉型／用途／配戴時長／風格／預算）計分 → 推薦一款鏡框＋框色＋鏡片、附五條理由與計分透明表 → 一鍵「送上 3D 展示台」（帶 URL 參數跳回 index 載入該構成）。
3. `atelier.html` — 工坊與門市：四道驗光流程、四項鏡框工藝（β 鈦／五道烤漆／鉚合鉸鏈／可調鼻墊）、鏡片價目表、赤峰街門市資訊與蒙德里安街區步行地圖。
4. `assets/logo.svg` — 原創標誌：紅黃藍蒙德里安構成 + 眼鏡剪影 + 字標。

## 品牌設定

- **店名**：構成眼鏡 Compositie Optiek（荷語「構成」）
- **系列**：圓框・均衡 Evenwicht NT$6,800／眉框・橫線 Lijn NT$7,400／方框・平面 Vlak NT$7,200／八角框・構成 Compositie NT$8,200（皆含 1.60 標準鏡片）
- **門市**：台北市大同區赤峰街 17 巷 8 號 1 樓／02-2558-0136／週二–日 12:00–20:00（皆虛構）
- **代表色**：展廳灰 `#ADB0A8`／墨 `#161616`／構成紅 `#CE2B1E`／構成黃 `#F0C300`／構成藍 `#1F4FA0`

## 去AI化重點

- 商品不是圖片也不是 CSS 假 3D，是真幾何體建出來的可旋轉物件；「換色」改的是材質 hex，不是換圖。
- 蒙德里安 topbar、黑色 4px 格線 gap 網格、mid-tone 展廳灰——不是米白紙感、不是深黑底、沒有紫藍漸層。
- 診斷結果附「計分透明表」，推薦有理由、同分有取捨規則，不是星座式輸出。
- 零外部圖片、零外部模型檔；唯一外部 script 是 cdnjs 的 Three.js r128。
- 敏感內容（價格、門市、療程）全數標註虛構示意。

## 授權與用途

風格與 3D 標準配方見 [`SKILL.md`](SKILL.md)。任何 AI 讀完 SKILL 的「3D 展示台標準配方」章，即可為其他產業（傢俱、腕錶、陶器、樂器⋯）重建同級的程序化 3D 展示站。

---

*本站由 **Claude Fable 5** 設計與建置（2026-07-16）。*
