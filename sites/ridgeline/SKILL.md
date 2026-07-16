---
name: topographic-survey-relief
description: A cartographic "topographic survey" style for outdoor, alpine, mapping and expedition brands, whose centrepiece is a draggable Three.js 3D terrain relief (procedural heightfield, elevation-banded colours, ridge routes and hut markers) set on a cool slate palette with coordinate-mono typography and 2px hard-line grids.
---

# 地形測繪風・立體浮雕（Topographic Survey Relief）

一套為高山、戶外、測繪、探勘類品牌設計的視覺語言。它的核心不是把風景拍給你看，而是**把地形交到你手上**：首頁就是一塊可以拖曳旋轉、上下傾斜的真 3D 高山浮雕，路線畫在山體上、山屋標在真實海拔上。整套視覺像一張活起來的等高線地圖——冷色調、座標感、硬線分格、零裝飾。

## 設計哲學

1. **地形即介面**：3D 浮雕不是背景裝飾，而是導覽與決策工具。使用者用手轉動地形來理解坡度、位置與暴露段。3D 是核心，抽掉它這個站就不成立。
2. **測繪不濫情**：用座標、海拔、比例尺、方位角說話。文案冷靜理性，像一份可信的登山簡報，不用形容詞堆砌。
3. **色彩承載資訊**：地形著色不是美感選擇而是資料——森林綠、岩屑褐、裸岩灰、雪白、圈谷冰藍，一眼分出植被帶與雪線。
4. **硬線、去圓角、冷底**：2px 實線分格、無圓角、無模糊陰影；底色是冷霧灰而非暖米白，避免落入紙感文青的舒適區。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 底色・冷霧灰 | `#D3DAD6` | 34% |
| 面板／卡片 | `#E4E8E4` / `#EDF0EC` | 20% |
| 板岩深藍（框線・側欄・頁尾） | `#243138` | 22% |
| 墨黑（本文） | `#161D1F` | 10% |
| 冰河青（強調・數據・剖面） | `#1E7A82` / 亮階 `#2A9BA3` | 7% |
| 繩索橘（警示・當前・峰標） | `#E4572E` | 5% |
| 雪白 / 髮絲線 | `#F4F6F3` / `#BEC7C0` | 2% |

3D 地形頂點色階（由低到高）：圈谷水 `rgb(31,122,130)` → 森林 `(46,74,56)` → 中海拔 `(71,87,64)` → 岩屑 `(110,107,92)` → 裸岩 `(140,140,128)` → 雪 `(235,240,232)`。舞台背景用 `linear-gradient(180deg,#1a2529,#0f171a)` 的深谷色，襯托亮色浮雕。

## 字體系統

- **顯示標題 / 拉丁字**：`Archivo` 800–900（壓縮無襯線，測繪機構感），H1 `clamp(2rem,6vw,5.2rem)`、`letter-spacing:-.02em`、`line-height:.92`。
- **中文標題**：`Noto Sans TC` 900，字距 `.01–.02em`。
- **座標／數據／標籤**：`IBM Plex Mono` 400–600，`letter-spacing:.04–.24em`，常大寫；海拔、GPS、方位角、編號一律用它，強化「儀器讀數」感。
- **中文本文**：`Noto Sans TC` 400，`line-height:1.72`。
- 只用 Google Fonts；`Three.js` 自 cdnjs 載入（3D 核心站的例外）。

## 版面與網格

- 全站底鋪 `44px` 兩向 1px 網格（`--hair`），像測繪方格紙。
- **side-rail 導覽**：固定左側 78px 深板岩直欄，logo 在頂、直排中文選單（`writing-mode:vertical-rl`），底部一段海拔／座標尺（mono 小字 + 短 tick 線）。窄於 720px 轉為 52px 頂列。
- 內容區 `max-width:1160px`；區塊以 `1.5px solid var(--slate)` 硬線分隔，卡片相鄰用 `margin-bottom:-1.5px` 讓邊線合一。
- 舞台／表格採「深底亮件」對比：3D 舞台與剖面圖放在深谷色底上。

## 元件配方

- **nav（side-rail）**：`position:fixed;width:78px;background:#243138`；連結 `writing-mode:vertical-rl;text-orientation:upright`，`aria-current` 加 `box-shadow:inset 2px 0 0 var(--rope)`。
- **按鈕**：方角、`1.5px` 邊、mono 大寫字；主按鈕深板岩底白字，hover 轉繩索橘；次要按鈕透明底。無圓角、無漸層。
- **卡片（山屋/路線）**：`1.5px` 硬邊、淺面板底；左欄可用深板岩反白放標題與海拔；資料以 `border-left:2px solid var(--teal)` 的「規格欄」呈現。
- **海拔剖面 SVG**：深底 `#0a1215`、青色面積 `rgba(30,122,130,.22)` + 亮青描邊線，山屋以繩索橘小三角 + 垂直細線標於對應點。
- **stepper / 表單**：方角硬邊，focus `outline:2px solid var(--teal2)`；錯誤態邊框轉繩索橘並顯示 mono 錯誤字。
- **footer**：深板岩底、頂部 `3px` 繩索橘線；mono 小字聲明「虛構示意」。

## 動效規則

- **地形自轉**：閒置時 `spin.rotation.y += 0.0016 / frame`；使用者一拖曳即停。`prefers-reduced-motion` 下完全不自轉，只在互動時渲染。
- **拖曳**：水平位移 → `yaw`（`*0.006`）；垂直位移 → `tilt`（`*0.004`，夾在 `-1.15 ~ -0.18`）。滑鼠與 touch 皆綁定，touchmove `preventDefault` 防頁面捲動。
- **山屋點亮**：選路線後，該路線行經的山屋標記 `scale` 由 `0.01` 逐一彈到 `1.15`（`setTimeout` 錯開 140ms／座）；reduced-motion 直接定格放大。
- **一般進場**：僅用極輕淡入（`0.3s`），不作為 signature 主打；避免數字計數、按壓硬陰影、dashoffset 描繪等館內過載語彙。

## 插畫與圖像風格

技法為 **topographic-relief 等高線地形浮雕**：全部由 WebGL 網格 + 程序生成，零外部圖片。輔助圖形（logo、pictogram、剖面、沿稜索引）用單線幾何 + 三角峰標 + 座標數字，維持測繪語彙。所有插圖用板岩／冰河青／繩索橘三色，忌用照片與漸層。

## Logo 與 Favicon 設計指南

- **Logo**：巢狀等高線三角峰 + 頂部測量控制點十字（繩索橘）+ 底部基準線（冰河青），右接 `Archivo` 800 字標「RIDGELINE」與中文小字。線條 `2–2.4px`、方角。
- **Favicon**：深板岩方底，內置白色三角峰 + 青色內層等高線 + 橘色測量十字的 inline SVG data URI。

## Do & Don't

- **Do**：冷色測繪底、座標 mono、硬線分格、3D 為核心互動、海拔決定顏色、文案像登山簡報。
- **Do**：3D 站務必附 `prefers-reduced-motion` 降級與非 WebGL 靜態 SVG 剖面備援。
- **Don't**：暖米白紙感底、圓角卡片、模糊陰影、紫藍漸層 hero、emoji 當 icon、把 3D 當純裝飾旋轉物、Lorem ipsum、「在當今快節奏的世界」式 AI 腔、EST.19xx 徽章、「把 X 變成 Y」句式。

## 首創技術實作配方（Three.js 真 3D 地形浮雕）

> 這是本風格的靈魂。以下可直接照做出同款可拖曳地形。

**1｜載入（僅 3D 核心站）**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**2｜程序式高度場**（確定性、無外部資料）
```js
function hash(x,y){var n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)}
function vn(x,y){var xi=~~x,yi=~~y,xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  return hash(xi,yi)*(1-u)*(1-v)+hash(xi+1,yi)*u*(1-v)+hash(xi,yi+1)*(1-u)*v+hash(xi+1,yi+1)*u*v}
function fbm(x,y){var s=0,a=.5,f=1;for(var i=0;i<5;i++){s+=a*vn(x*f,y*f);f*=2;a*=.5}return s}
function height(nx,ny){                     // nx,ny ∈ [-1,1]
  var ridge=Math.exp(-Math.pow((ny-0.22*Math.sin(nx*2.1))*2.3,2)); // 沿正弦稜線的山脊
  var peak =Math.exp(-Math.pow((nx+0.12)*1.7,2)-Math.pow((ny-0.05)*1.9,2))*0.55; // 主峰
  var fall =Math.max(0,1-Math.pow((nx*nx+ny*ny)*0.52,1.5));         // 邊緣下降到谷
  return Math.max(0,(ridge*0.72+peak+fbm(nx*2.3+3,ny*2.3+7)*0.5)*(0.5+0.5*fall));
}
```

**3｜建網格 → 浮雕面感**：以 `PlaneGeometry` 邏輯手建 `SEG≈92–104` 的索引三角網，`position.y = height()*HSCALE`；`computeVertexNormals()` 後 **`geo = geo.toNonIndexed()`**，材質開 `flatShading:true` 得到測繪浮雕的分面感（低多邊形）。

**4｜依海拔上色**：逐頂點讀 `y/maxH`，用門檻（`.045 / .30 / .47 / .63 / .80`）指派色階，寫入 `color` attribute；材質 `MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:.94})`。打一盞暖白 + 一盞冰河青方向光。

**5｜路線與山屋**：沿 `ridgeXY(t)=[-0.72+1.44t, 0.22*sin(nx*2.1)]` 取樣成 `THREE.Line`（繩索橘）；山屋用小 `ConeGeometry` 錐標 + 細 `CylinderGeometry` 立柱，行經者 `emissive` 點亮並放大。

**6｜互動（不用 OrbitControls，cdnjs 版不含）**：外層 `pivot` 控 `rotation.x`（tilt）、內層 `spin` 控 `rotation.y`（yaw）；pointer/touch 拖曳改兩值，閒置自轉。

**7｜降級與備援（必做）**：
- `matchMedia('(prefers-reduced-motion: reduce)')` 為真 → 不自轉、不逐格動畫，只在互動時 `render` 一次。
- `typeof THREE==='undefined'`、`new WebGLRenderer` 失敗或 `getContext()` 為空 → 移除 canvas，插入一張手繪 **靜態 SVG 地形剖面** 承載相同資訊，頁面其餘功能（路線、剖面、訂床）純 DOM/SVG 不受影響。

## 頁面骨架範例

```html
<aside class="rail">…logo…<nav>直排選單</nav><div class="scale">海拔尺</div></aside>
<header class="hero wrap">
  <p class="eyebrow">座標 · 場域 · 用途</p>
  <h1>LATIN BIGTYPE<span class="han">一句冷靜的中文副標</span></h1>
</header>
<div class="stage">                <!-- 深谷色底 -->
  <div class="stagegrid">
    <div class="viewport"><canvas id="terrain"></canvas></div>  <!-- 3D -->
    <div class="readout">路線選擇器 + 海拔剖面 SVG</div>
  </div>
</div>
```

---

*本 SKILL 由 Claude Opus 4.8 撰寫（2026-07-17，排程 Agent）。範例文案與地形皆為虛構示意。*
