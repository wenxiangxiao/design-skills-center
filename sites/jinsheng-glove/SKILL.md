---
name: folk-woodblock
description: A Taiwanese folk woodblock-print (nianhua) style for glove puppetry, temple-fair, opera and folk-craft brands — cinnabar-lacquer red field with ink and paper-panel prints, key-fret and playbill framing, seal-brush display type, hand-cut SVG woodcut illustration, a side-rail nav, and an optional cursor-as-puppeteer verlet marionette you can perform live.
---

# 版印民俗・木刻年畫（Folk Woodblock / Nianhua）

一套為布袋戲、掌中戲、歌仔戲、廟會陣頭、民俗工藝、宮廟文創等題材設計的視覺語言。它借用廟埕戲報、木刻年畫、雕版套印與彩樓戲台的語彙：朱漆紅底、松煙墨線、宣紙印版、回紋邊框、泥金點金。最大膽的核心體驗是——首頁不是靜態海報，而是一尊可用滑鼠當「操偶師的手」實時操演的物理戲偶。

## 設計哲學

1. **戲報即介面**：整個版面像一張貼在廟口的木刻戲報。標題用刻字般的粗筆、邊框用回紋與雙線、角落壓印章，資訊像戲單一樣一格一格排。
2. **朱墨雙色紀律（duotone）**：以朱漆紅為場（頁底），松煙墨為線（描邊與文字），宣紙米只出現在「印版面」（卡片、表單、戲摺）上——像紅紙上刷墨、墨版印在宣紙。泥金當唯一貴金屬點綴，靛青極少量點在臉譜與水袖。避開米白紙感通底與深色沉穩兩個舒適區。
3. **手刻感，非印刷平滑**：線條要有木刻的頓挫與缺口，色塊可微微套印錯位。用硬邊、去圓角、實心位移陰影（`box-shadow: 5px 5px 0`），不用模糊陰影與漸層柔光。
4. **偶要動得活**：這個風格的靈魂是「操演」。首頁的戲偶必須能被使用者的游標牽動——有重量、有慣性、有水袖甩尾、有亮相定格。拿掉它，就只是一張好看的年畫；有了它，才是一座戲棚。
5. **文案講戲班的話**：用棚、齣、籠、行當、走棚、亮相、後場、出將入相這些行話，語氣可以浮誇張揚（金光戲的口白本就誇飾），但地址電話價格要具體可信。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 朱漆紅（頁底／戲台場） | `#7C1512` | 40% |
| 硃砂紅（重點／印章／標籤／CTA） | `#A81F16` | 12% |
| 松煙墨（描邊／內文／木刻線） | `#1A1310` | 16% |
| 宣紙米（印版面／卡片／表單底） | `#EEE4CB` | 18% |
| 泥金（框線／副標／金額／點金） | `#C89B3C` | 10% |
| 靛青（臉譜／水袖口／少量點綴） | `#245C6B` | 4% |

紅是「場」不是點綴：頁面底色就是朱漆紅，宣紙米只鋪在需要閱讀的印版面上。深紅陰影用 `#6A100D`。

## 字體系統

- **標題／戲名（poster）**：`ZCOOL QingKe HuangYou`（站酷慶科黃油體，方正飽滿如刷漆招牌）與 `Noto Serif TC` 900。戲名用 `clamp(30px,7vw,78px)`，字距 `.04em`，配 `text-shadow: 3px 3px 0 底深色` 做木刻凸版感。
- **內文（serif）**：`Noto Serif TC` 500／700，行高 1.75。
- **毛筆點題（brush）**：`Ma Shan Zheng`（馬善政毛筆）用於對聯、印章、行當單字、戲摺印記——只用在短字，不用於長段。
- **數字**：內文襯線 + `font-variant-numeric: tabular-nums`，金額、編號、里程對齊。

字級 scale：78 / 38 / 22（legend）/ 19（lede）/ 15 / 13 / 11.5。

## 版面與網格

- **shell**：左側 96px 垂直側欄（side-rail）＋右側主欄，`max-width:1180px`。手機收合成單欄，側欄變頂部橫向捲動。
- **開場（opening = masthead 戲報刊頭）**：不設「大標＋副標＋兩顆按鈕」的 hero。首屏是一張置中的木刻戲報：小字 kicker → 巨大戲名（附英文）→ 一副對聯（兩條直書紅籤）→ 一行 meta（戲路／主事／地域）。四角壓金色角標。
- **不對稱**：戲報置中，但其下的區塊用「編號＋標題＋虛線延伸」的戲條式標頭（`其一/其二/沿革/行當…`）左右錯落，卡片用 `5px 5px 0` 硬陰影往左上偏。
- **留白**：印版面（卡片）內距 `11–22px`；區塊 `band` 上下 `34px`。密度中等偏密，像戲單但不擁擠。
- **回紋與雙線**：分隔用回紋帶（key-fret，見元件）、雙線（`3px double`）與虛線金框。全站零圓角。

## 元件配方

- **side-rail 導覽（戲偶吊掛）**：垂直側欄頂部一條木色橫桿（`.rod`），其下掛數個直書標籤（`writing-mode:vertical-rl; text-orientation:upright`），每個標籤上方用 `::before/::after` 畫一條吊線與金釘，`hover` 時 `translateY(4px) rotate(-1.2deg)` 像被風吹動。當前頁標籤反白為硃砂紅底金框。底部壓一枚方形印章（seal SVG）。
- **戲報刊頭**：`radial-gradient` 由中心亮紅向外壓深；四角絕對定位的金色 L 形角標；對聯用直書紅籤 `writing-mode:vertical-rl` 加金框硬陰影。
- **印版卡片（.pc）**：宣紙米底、`2px` 墨邊、`5px 5px 0` 深紅硬陰影，`hover` 位移。上半是木刻插畫（`aspect-ratio:3/4`），下半是說明；分類標籤 `.k`（傳統齣＝硃砂紅底，金光齣＝泥金底黑字）。
- **按鈕（.btn）**：硃砂紅底、金框、`4px 4px 0` 深紅硬陰影，`hover` 往左上位移並加深陰影；`.ghost` 透明金字。
- **表單／wizard**：步驟條（`.track`）水平五格，當前格硃砂紅反白、已完成格靛青字；選項卡 `.opt` 用 `:has(input:checked)` 換成泥金底＋紅框＋硬陰影；輸入框 `2px` 墨邊、`focus` 時 `outline:3px solid 泥金`；錯誤 `.bad` 換紅框淡紅底。
- **回紋帶（.fret）**：`repeating-linear-gradient` 做的鑰匙紋分隔，泥金色，footer 上緣用。
- **footer**：深紅底、`3px double` 金雙線分隔，三欄（劇團地址／接戲洽詢／戲路連結），底部一行細字放建置標示與虛構聲明。

## 動效規則

- **戲偶操演（signature，見末章）**：`requestAnimationFrame` verlet；游標即操偶桿，`0.13` 慣性 lerp；閒置 >2.6s 自動小碎步 sway。
- **亮相定格**：`pointerdown` 對雙手施加向上脈衝，觸發「鏘」字 `gongpop` 動畫（`.55s ease-out`，scale 0.4→1.05→1.15 淡出）。
- **卡片 hover**：`transform: translate(-2px,-3px)`，`.16s`。
- **側欄標籤 hover**：`translateY(4px) rotate(-1.2deg)`，`.16s`。
- **戲目篩選**：純切換 `hidden`，不做花俏轉場。
- **降級**：`@media (prefers-reduced-motion: reduce)` 關閉所有 hover 位移與捲動平滑；戲偶引擎偵測到 reduce 時**不啟動 rAF 迴圈**，改渲染一個靜態「亮相」姿勢。

## 插畫與圖像風格（illust = woodcut 木刻）

- **技法**：全部用原創 inline SVG 模擬雕版木刻——粗墨輪廓（`stroke-width 2–3`）、交叉排線 hatching 做陰影、雲紋（`回紋/如意雲`）做地、色塊只上朱紅／泥金／靛青三色，可微套印錯位。零外部圖片。
- **母題**：戲曲人物（紅面武將、白鬚老生、水袖花旦、破帽濟公、劍俠）、彩樓戲台、臉譜、雲龍、印章。
- **戲偶臉譜**：生（端正金冠）、旦（黑髮紅唇）、淨（紅底分臉、金鼻樑）、末（白鬚黑帽）、丑（鼻樑白豆腐塊）——用臉譜色與線條區分行當。
- **禁忌**：不用細線幾何線描（thin-lineart）、不用漸層網格、不用照片。

## Logo 與 Favicon 設計指南

- **Logo**：朱漆紅底、回紋金框內，左為木刻戲偶頭（金冠＋宣紙臉＋硃砂臉譜）＋上方一角戲台頂棚，右為毛筆「金聲閣」三字＋泥金小字副標。純 SVG。
- **Favicon**：`32×32` inline SVG data URI——朱紅底、金回紋框、一枚正面戲偶頭（金冠、宣紙臉、墨眉墨眼、紅唇）。零圓角。

## Do & Don't

**Do**：朱漆紅通底、宣紙米只鋪印版面、木刻粗線＋交叉排線、回紋雙線硬框、毛筆短字點題、行話文案、首頁放一尊可操演的物理戲偶。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片 ❌ emoji 當 icon（一律自繪 SVG）❌ rounded-2xl＋模糊陰影 ❌ Lorem ipsum 與 AI 腔 ❌「EST. 19xx」年份徽章 ❌「把 X 變成 Y」句式 ❌ 米白紙感通底（紅才是場）❌ 細線幾何線描。

## 頁面骨架範例

```html
<div class="shell">
  <aside class="rail"><div class="rod"></div>
    <nav><a class="on">戲棚</a><a>戲籠</a><a>戲目</a><a>請戲</a></nav>
  </aside>
  <div class="main">
    <header class="playbill">
      <span class="corner c1"></span><!-- 四角金標 -->
      <div class="kicker">虎尾・掌中戲</div>
      <h1>金聲閣<span class="en">JINSHENG GLOVE PUPPET</span></h1>
      <div class="couplet"><span>一口道盡千古事</span><span>十指弄成百萬兵</span></div>
    </header>
    <div class="stage-frame"><div class="canopy"></div>
      <div id="stage"><svg class="puppet">…</svg><div class="stage-floor"></div></div>
    </div>
    <section class="band">
      <div class="rule-lead"><span class="no">其一</span><h2>標題</h2><span class="ln"></span></div>
      …
    </section>
    <footer>…建置標示＋虛構聲明…</footer>
  </div>
</div>
```

## 第五章・首創技術實作配方：掌中戲偶提線物理（Cursor-as-Puppeteer Verlet Marionette）

本站認領的全館首創——把游標變成操偶師的手，牽動一尊有物理的提線戲偶。以下是可直接複用的配方。

### 骨架（verlet 質點與約束）

質點（各有 `x,y,px,py`，`px/py` 為上一幀位置）：
`AC` 操偶桿中心（被游標牽引，不做重力）、`H` 頭、`C` 胸（肩由此推導）、`Hp` 臀、`LH/RH` 左右手。

```js
function verlet(p,g,fr){var vx=(p.x-p.px)*fr,vy=(p.y-p.py)*fr;p.px=p.x;p.py=p.y;p.x+=vx;p.y+=vy+g;}
function link(a,b,len,stiff){var dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||.001,
  k=(len-d)/d*stiff*.5;a.x-=dx*k;a.y-=dy*k;b.x+=dx*k;b.y+=dy*k;}
function maxlink(anchor,p,len){var dx=p.x-anchor.x,dy=p.y-anchor.y,d=Math.hypot(dx,dy);
  if(d>len){var f=(d-len)/d;p.x-=dx*f;p.y-=dy*f;}}
```

每幀：對 `H,C,Hp` 施小重力、對 `LH,RH` 施較大重力（讓水袖下墜）；迭代 12–14 次約束：
`AC` 釘在平滑後的操偶桿位置 → `link(AC,H)`（脖線，硬）→ `link(H,C)`、`link(C,Hp)` → 令 `C.x` 微向 `H.x` 回正（保持軀幹直立）→ 由 `C` 推出雙肩 `s.L/s.R` → 手受兩條「提線」約束：`maxlink(桿左端, LH, 線長)` 與 `maxlink(肩, LH, 臂長)`（右手同理）。線是「最大長度」約束：只有拉直時才牽引，故甩動桿時手會先落後、再被線甩起 → 水袖甩尾。

### 操控

游標座標經 `getBoundingClientRect` 映射進 SVG viewBox；`target` 夾在台內。操偶桿以 `barCentre += (target-barCentre)*0.13` 追隨，產生慣性。閒置 >2.6s 讓 `target` 走正弦小碎步，戲偶始終「活著」。`pointerdown`／空白鍵＝亮相：對雙手灌向上脈衝（改 `px/py`）並觸發「鏘」字。

### 渲染（純 SVG，零函式庫、零外部圖）

每幀更新既有 SVG 元素屬性：操偶桿 `line` 兩端＝桿左右端；三條 `strH/strL/strR` 提線；`robe` 用肩→腰→臀→下擺的 `path`；水袖用 `M 肩 Q 中點下垂 手` 的粗 `stroke`（`stroke-width≈22`、圓端），末端壓墨拳 `circle`；頭 `<g>` 用 `transform:translate(H) rotate(tilt)`，`tilt` 由 `H.x-C.x` 決定，讓頭隨擺動側傾。

### 效能與備援（必做）

單一 rAF；質點 6 顆、迭代 14 次，行動裝置無壓力。`prefers-reduced-motion` 時**不啟動迴圈**，呼叫 `poseStatic()` 擺出亮相姿勢後 `render()` 一次即停。此技法為 2D SVG＋Canvas 數學，不依賴 WebGL，無需非 WebGL 備援；但務必確保：即使 JS 未載入，戲台仍有背景與說明文字、導覽與各頁連結照常可達（破格但可用）。

### 移植到別的產業

同一套提線物理可換皮成：舞獅／布偶／機器人手臂／時裝模特／風鈴。換的是 SVG 造型與約束長度，物理與操控不變。核心價值恆定：**訪客用游標操演一個有重量的角色**，這是別站沒有的。

---

*本站由 **Claude Opus 4.8** 設計與建置（2026-07-18，排程 Agent 自動執行）。所有品牌、人名、地址、電話、價格與戲齣資料皆為虛構示意。*
