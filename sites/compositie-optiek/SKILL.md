---
name: de-stijl-3d-showroom-style
description: A De Stijl web style with a Mondrian-grid topbar, mid-tone gallery-grey surfaces, primary-color blocks divided by thick black lines, and a fully procedural Three.js 3D product showroom (primitive-geometry modeling, hand-rolled drag rotation with inertia and idle auto-spin, strict performance rules and an SVG fallback) as its signature.
---

# 風格派 3D 展示台（De Stijl 3D Showroom）

> 本 SKILL 定義兩件事：一套 **De Stijl 風格派視覺語言**，加上一份**可整章照抄的 Three.js 3D 商品展示台標準配方**。前者可單獨用於任何產業的 2D 站；後者是全館 3D 站的規範範本——任何 AI 讀完第五章，即可為傢俱、腕錶、陶器、樂器、自行車等任何「有形商品」做出同級的程序化 3D 展示站。
>
> **核心心法**：De Stijl 不是「加幾個紅黃藍方塊」，而是**用黑色粗直線把版面切成不對稱的格**，再讓少數格子填上原色。3D 的核心心法則是：**商品必須是幾何體「建」出來的，不是模型檔「載」進來的**——因為基本幾何體的構成本身，就是風格派的宣言。

---

## 一、設計哲學

1. **線先於色**：先鋪黑色粗線網格（結構），再決定哪幾格上色（點題）。顏色永遠是少數格，多數格留白或留灰。
2. **不對稱的均衡**：格子比例用 1.4fr / 1fr / 1.2fr 這類不等分，禁止等分九宮格。蒙德里安的畫沒有一張是對稱的。
3. **中間調展廳**：底色是展廳灰 `#ADB0A8`——不是米白紙感、不是深黑底。白卡片浮在灰底上，像掛在灰牆上的畫。
4. **商品即構成**：3D 鏡框由圓環、方柱、圓柱構成；2D 插畫由色塊直線構成。整個站從模型到地圖都服從同一套幾何語彙。
5. **文案直白**：荷蘭式的冷靜理性——「驗光是工序，不是儀式」「顏色是立場」。不賣情懷，給規格與理由。

## 二、色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 展廳灰 bg | `#ADB0A8` | 頁面底色 | 基底 |
| 舞台灰 stage | `#A2A59C`（3D 清除色 `0x9DA09A`） | 3D 展示區、插畫底 | 大面 |
| 白卡 card | `#FFFFFF` | 卡片、面板、topbar | 主要面 |
| 墨 ink/line | `#161616` | 文字、所有格線 | 結構 |
| 構成紅 | `#CE2B1E`（3D `0xC0261B`） | 主強調、active 條、CTA | 少數格 |
| 構成黃 | `#F0C300`（3D `0xD9AB00`） | 次強調、hover、選中底 | 少數格 |
| 構成藍 | `#1F4FA0`（3D `0x1D4A99`） | 第三強調、資訊類 | 少數格 |

規則：三原色**永遠隔著黑線出現**，不直接相鄰、不做漸層。3D 用的 hex 比 CSS 略深（材質受光後會提亮）。**嚴禁**紫藍漸層、米白紙感底、深黑底。

## 三、字體系統

- 標題／數字／拉丁標籤:**Archivo**(700–800),幾何無襯線,與直線構成同語系。
- 內文:**Noto Sans TC**(400–900);中文標題用 900 配 `letter-spacing:2–3px`。
- 拉丁 eyebrow 一律大寫 + `letter-spacing:3px`,可夾荷語詞(TOONZAAL、VRAAG、PRIJSLIJST)當地域簽名。
- 字級:h1 `clamp(26px,3.4vw,38px)`/區塊標題 `clamp(22px,2.6vw,30px)`/內文 15–16px/標籤 12–13px。

## 四、版面與網格（黑線 gap 網格）

**全站最重要的一個 CSS 技巧**——用 grid 的 gap 透出黑底,做出蒙德里安格線:

```css
.mondrian{
  display:grid;grid-template-columns:1.4fr 1fr 1.2fr; /* 不等分 */
  gap:4px;background:#161616;border:4px solid #161616;
}
.mondrian > *{background:#fff} /* 少數格改 --red/--yellow/--blue */
```

- **topbar**:`grid-template-columns:auto 1fr auto`(品牌｜連結｜2×2 色塊格),分隔全用 4px 黑 border;active 連結底部壓一條 9px 原色橫條。
- **開場 split-screen**:左 3D 舞台 `1.12fr`、右白色控制面板 `.88fr`,中縫即黑線;≤980px 上下堆疊(3D 在上)。
- 線寬只有兩種:`--lw:3px`(元件)與 `--lww:4px`(結構)。
- footer 頂部放一條不等分的紅白白黃藍色帶(`2fr 1fr 3fr 1.2fr 1fr`)。

## 五、3D 展示台標準配方（全館 3D 站規範，照抄即可）

### 5.1 載入與唯一外部資源

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

r128 注意:**沒有 `CapsuleGeometry`**(膠囊形用 Cylinder + Sphere 拼);**OrbitControls 不在 core**,不要引 examples——拖曳旋轉自己寫(見 5.4)。全域變數 `THREE`。

### 5.2 場景、相機、光、影（參數直接抄）

```js
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2)); // 上限 2
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x9da09a);      // 中性展廳灰
scene.fog = new THREE.Fog(0x9da09a, 9.5, 17);      // 霧色=背景色,邊界消失

camera = new THREE.PerspectiveCamera(36, w/h, 0.1, 40);
camera.position.set(0, 0.55, 7.4);                  // 直式畫面改 z=8.9
camera.lookAt(0,0,0);

// 柔和三點光
scene.add(new THREE.AmbientLight(0xffffff, 0.55));                 // 環境
const key = new THREE.DirectionalLight(0xfff6e8, 0.9);             // 主光(暖)
key.position.set(3.2, 4.6, 3.6); key.castShadow = true;
key.shadow.mapSize.set(1024,1024);
key.shadow.camera.left=-6; key.shadow.camera.right=6;
key.shadow.camera.top=6; key.shadow.camera.bottom=-6;
key.shadow.camera.near=0.5; key.shadow.camera.far=20;
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.5);             // 輪廓(冷)
rim.position.set(-4.5, 2.2, -4);

// 展示台 = 只接影子的地板
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30,30),
  new THREE.ShadowMaterial({opacity:0.26})
);
floor.rotation.x = -Math.PI/2; floor.position.y = -1.72; floor.receiveShadow = true;
```

### 5.3 程序化建模拆件（禁止外部模型檔）

商品放進一個 `root` Group(旋轉的是它,不是 camera)。材質三件套:

```js
paint = new THREE.MeshStandardMaterial({color:烤漆色, metalness:0.72, roughness:0.3});
steel = new THREE.MeshStandardMaterial({color:0xB9BDC1, metalness:0.9, roughness:0.28});
lens  = new THREE.MeshPhysicalMaterial({
  color:片色, metalness:0, roughness:0.06, clearcoat:1, clearcoatRoughness:0.1,
  transparent:true, opacity:0.14~0.32, side:THREE.DoubleSide, depthWrite:false
}); // depthWrite:false 避免多片透明排序破面
```

鏡框四款的拆件表(其他商品同理:先拆成「圓環/方柱/圓柱」清單再組):

| 部件 | 幾何體 | 關鍵參數 |
|---|---|---|
| 圓框框圈 | `TorusGeometry(0.92, 0.075, 20, 56)` | 置於 x=±1.14 |
| 圓框鼻樑 | `TorusGeometry(0.33, 0.06, 14, 28, Math.PI)` | 半圓弧,arc=π |
| 圓鏡片 | `CylinderGeometry(0.86,0.86,0.05,48)` | `rotation.x=π/2` 轉正面 |
| 眉框眉樑 | `BoxGeometry(1.82, 0.22, 0.15)` | 烤漆;下圈用細 Torus(tube 0.032)配鋼材質 |
| 方框四邊 | 4×`BoxGeometry`(橫 1.98×0.1、豎 0.1×1.42) | 方鏡片用薄 `BoxGeometry(1.82,1.28,0.05)` |
| 八角框圈 | `TorusGeometry(0.95, 0.06, 14, 8)` | **tubularSegments=8 即八角**;`rotation.z=π/8` 讓頂邊水平 |
| 八角鏡片 | `CylinderGeometry(0.9,0.9,0.05,8,1,false,Math.PI/8)` | thetaStart=π/8 對齊框圈 |
| 鏡腿直臂 | `CylinderGeometry(0.05,0.05,2.5,12)` | `rotation.x=π/2` 指向 -z |
| 鏡腿耳彎 | `CylinderGeometry(0.05,0.042,0.72,12)` | `rotation.x=-(π/2+0.85)` 下折 |
| 鉸鏈/鼻墊 | 小 `BoxGeometry` | 鼻墊 `rotation.z=±0.28` 內傾 |

規則:所有 mesh `castShadow=true`;換款式=整組 rebuild(舊 geometry/material 逐一 `dispose()`);**換色只改 `material.color.setHex()` 與 `opacity`,不 rebuild**。

### 5.4 自實作拖曳旋轉（r128 無 OrbitControls）

```js
let dragging=false,lastX,lastY,velY=0,lastInteract=performance.now();
el.addEventListener("pointerdown",e=>{ dragging=true; velY=0;
  lastX=e.clientX; lastY=e.clientY; el.setPointerCapture(e.pointerId); });
el.addEventListener("pointermove",e=>{ if(!dragging)return;
  const dx=e.clientX-lastX, dy=e.clientY-lastY; lastX=e.clientX; lastY=e.clientY;
  root.rotation.y += dx*0.0052;
  root.rotation.x = Math.max(-0.55, Math.min(0.7, root.rotation.x + dy*0.003));
  velY = dx*0.0052; lastInteract=performance.now(); needsRender=true; });
el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up);
```

render loop 內(非拖曳時):

```js
if(Math.abs(velY)>0.00004){ root.rotation.y+=velY; velY*=0.94; }   // 慣性衰減
if(!reduceMotion && now-lastInteract>4000){                         // 閒置 4 秒
  const ease=Math.min(1,(now-lastInteract-4000)/2200);              // 緩入
  root.rotation.y += 0.0045*ease;                                   // 自動展示
}
```

canvas 必加 `touch-action:none`(否則手機拖曳會捲頁)與 `cursor:grab`。

### 5.5 效能規則（標準,一條不可少）

1. `renderer.setPixelRatio(Math.min(devicePixelRatio,2))` — 上限 2。
2. **分頁不可見即暫停**:`visibilitychange` → `document.hidden ? cancelAnimationFrame : 重啟 loop`。
3. `needsRender` 髒旗標:只有旋轉中/材質變更才 `renderer.render()`,靜止畫面不重繪。
4. `prefers-reduced-motion: reduce` → 關閉自動旋轉與 smooth scroll,**保留手動拖曳**。
5. shadow map 1024 就好;場景一盞 castShadow 燈,不要多盞。
6. resize 用容器尺寸 `renderer.setSize(w,h,false)`,直式畫面把 camera 拉遠。

### 5.6 降級備援（頁面永不空白）

```js
function initThree(){
  if(!window.THREE) return false;                    // CDN 失敗
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }
  catch(e){ return false; }                          // WebGL 建立失敗
  if(!renderer.getContext()) return false;
  ...; return true;
}
if(!initThree()) enableFallback();
```

備援 = **原創 SVG 正視圖 + 一行說明文字**,且切換控制項照常更新 SVG(寫一個 `frameSVG(款,框色,片色)` 字串產生器,系列卡與備援共用)。頁面其餘內容(規格、診斷、門市)完全不依賴 WebGL。

### 5.7 跨頁交棒協定

診斷頁用 URL 參數把推薦構成送上展示台:`index.html?frame=octagon&color=red&lens=clear&from=fitting`。展示台啟動時讀 `URLSearchParams`,合法值才採用;`from=fitting` 額外顯示「已載入診斷結果」黃色橫條。

## 六、元件配方

- **色票 swatch**:44×36px 方塊、3px 黑框,active 用 `outline:3px solid #161616; outline-offset:3px`(雙框),下方 11px 小字標名。
- **款式切換鈕**:2×2 黑線格,active = 黃底 + 左緣 7px 紅條。
- **規格表**:`border-collapse` 表格,th 淺灰底、黑線右框,全表 3px 黑框——像博物館展品標籤。
- **按鈕**:白底 3px 黑框,hover `translate(-2px,-2px)` + `box-shadow:4px 4px 0 #161616`(位移出黑色平行投影,非按壓陰影);主 CTA 紅底白字。
- **進度指示**:等寬格條,完成格依序填紅→黃→藍→黑,不用百分比條。
- **理由列表**:每條前置 12px 原色小方塊(輪替),取代圓點 bullet。

## 七、動效規則

| 動效 | 觸發 | 參數 |
|---|---|---|
| 3D 慣性旋轉 | 拖曳放手 | 每幀 ×0.94 衰減 |
| 3D 自動展示 | 閒置 4s | 0.0045 rad/幀,2.2s 緩入 |
| 按鈕位移投影 | hover | .15s ease |
| 計分條長出 | 結果顯示 | width .5s ease |

就這四個。De Stijl 是靜態構成的藝術——**不做**進場揭示、視差、描線動畫、數字滾動。`prefers-reduced-motion` 時全關(拖曳除外)。

## 八、插畫與圖像風格（flat-shape 色塊構成）

零外部圖片。所有 2D 圖像 = **原色色塊 + 黑粗線的 flat-shape SVG**:商品正視圖(黑線描外形、原色填色塊、鏡片半透明 fill-opacity)、工藝圖示(方塊構成的抽象暗示,不畫實物)、地圖(街道=黑粗線、街區=色塊、店址=眼鏡色塊,即「蒙德里安地圖」)。**禁**細線線描、點描、hatching、riso 顆粒、generative canvas 當主插畫。

## 九、Logo 與 Favicon

Logo:白底黑框方塊內做蒙德里安分格(紅黃藍各佔一格),前景壓一副黑線眼鏡剪影,右側 900 字重中文字標 + 荷語小字。Favicon:同構成縮到 32×32 的 inline SVG data URI(URL-encode `#`→`%23`),每頁 `<head>` 直接內嵌。

## 十、Do & Don't 與頁面骨架

**Do**:黑線 gap 網格、不等分格、原色隔黑線出現、展廳灰底白卡、荷語標籤簽名、規格與理由給好給滿、3D 五章配方整套照抄。
**Don't**:❌ 外部 3D 模型檔 ❌ OrbitControls(r128 沒有) ❌ 等分九宮格/置中三卡片 ❌ 紫藍漸層、米白紙感、深黑底 ❌ 跑馬燈、揭示進場、數字滾動、dashoffset 描線 ❌ emoji 當 icon ❌ 無備援的 WebGL。

```html
<header class="topbar">品牌｜連結｜2×2 色塊格</header>
<section class="showroom">          <!-- split-screen,黑線中縫 -->
  <div class="stage">canvas + 角落標籤 + SVG 備援</div>
  <aside class="panel">名稱/價格/款式/色票/規格表/CTA</aside>
</section>
<section>系列總覽(黑線四格,各卡「送上展示台」)</section>
<section>雙格導引 → 診斷頁/工坊頁</section>
<footer>色帶 + 三欄 + 「本站內容為虛構示意」</footer>
```

涉及價格、門市、醫療性內容(驗光)一律標註虛構示意。
