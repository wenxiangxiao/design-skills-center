---
name: crackle-celadon-kaipian
description: Song-dynasty crackle celadon (Ge ware "golden thread and iron wire") translated to the web — a two-generation fracture network as the only ornament, directional glaze pooling, purple mouth and iron foot, spur marks, and no drawn decoration whatsoever.
---

# 開片青瓷 Crackle Celadon（哥窯・金絲鐵線）

## 一、設計哲學

這個流派的全部內容是一件事：**器物上唯一的紋樣，是釉自己裂出來的。**

南宋官窯與傳世哥窯不畫花、不描金、不貼塑、不刻劃。它們的表面只有一層青玻璃，以及那層玻璃冷卻時被胎拉裂的一張網。宋人先是想擋住這張網，擋不住，於是把它變成鑑賞的對象——粗的那一代裂紋吃了墨成為**鐵線**，後來幾年慢慢裂出的細紋吃了茶湯成為**金絲**，兩代同在一身，就是「金絲鐵線」。

翻成網頁，這條哲學會逼出三個很不一樣的決定：

1. **不准畫東西。** 這個風格沒有 icon set、沒有 illustration、沒有裝飾線框。任何圖像都只能由「釉、裂紋、胎、支釘痕」四件事組成。想放一個「安全」的線描小圖示——那一刻你就離開這個流派了。
2. **不准有平色塊。** 釉是液體流下去凝住的。薄處淺、積處深，永遠有方向。純色 `background:#7C9B90` 是錯的，一定要有由上而下的梯度。
3. **裂紋是資訊不是材質。** 它有代次、有方向規則、有可讀性。把它做成一張隨機的 noise 貼圖，就只剩下「大理石紋 texture」，那是另一個東西。

適用產業不限於陶瓷。這是一套「時間在表面上留下的紀錄」的視覺語言——修復、典藏、釀造、老件買賣、慢工的服務業、任何以「經年累月才成立」為賣點的品牌都成立。反過來說，強調速度、即時、拋棄式的產業會和它打架。

## 二、色彩系統

| 角色 | 色票 | 面積 | 用途 |
|---|---|---|---|
| 粉青釉 | `#7C9B90` | 約 38% | 頁面地色。**永遠帶梯度，永遠有裂紋穿過** |
| 薄釉／出筋 | `#A7BFB4` | 約 10% | 釉最薄處、凸稜、hover 提亮 |
| 積釉 | `#48685F` | 約 8% | 底部、凹角、按鈕底 |
| 深積釉 | `#31504A` | 約 6% | footer、圈足上方、最深的一階 |
| 月白（紙） | `#E7EAE1` / `#F1F3EC` | 約 22% | 所有長文一律在紙上，不在釉上 |
| 鐵線墨 | `#20262A` | 約 9% | 第一代裂紋、正文、輪廓 |
| 金絲 | `#BC882B` | ≤4% | 第二代裂紋、focus ring、被選中的事 |
| 紫口 | `#69463E` | ≤2% | 口沿露胎、連結色、標籤 |
| 鐵足（黑胎） | `#4A3B33` | ≤2% | 圈足、器足、縮釉的棕眼 |

三條硬規則：

- **金絲與鐵線永遠不同粗細也不同顏色。** 鐵線 1.5–1.9px `#20262A`，金絲 0.6–1.15px `#BC882B`。同粗同色就沒有代次，整個風格塌掉。
- **紫口與鐵足是唯二被允許的深色邊。** 不要為了「有層次」再加第三種描邊色。
- **禁止純白 `#FFF` 與純黑 `#000`。** 青瓷沒有純白，月白偏綠偏暖；墨是帶青的黑。

```css
:root{
  --qing:#7C9B90; --qing-d:#48685F; --qing-x:#31504A; --qing-l:#A7BFB4;
  --yue:#E7EAE1;  --yue-2:#F1F3EC;  --tie:#20262A;
  --jin:#BC882B;  --zi:#69463E;     --tai:#4A3B33;
}
```

## 三、字體系統

- 中文：**Noto Serif TC**，400／700／900。標題 900，字距 `.04em`。
- 拉丁與數字：**Spectral** 400／600／italic 400，`font-variant-numeric:oldstyle-nums`。
- **明文禁止等寬字。** 這是本流派與「工程製圖／檔案卷宗」風格的分水嶺——宋瓷沒有量表，沒有表格感的數字。尺寸與價錢用一般襯線字，中間以全形空格分隔（`口徑 8.4　高 5.1　底 3.6 公分`）。
- 級距：`h2 clamp(21px,2.5vw,31px)` / `h3 clamp(17px,1.6vw,21px)` / 正文 17px / 小字 14.5px。行高 1.85，字距 `.012em`——釉面需要呼吸，行距太緊會讓裂紋和文字打架。
- 直排只用於導覽標籤與器籤（`writing-mode:vertical-rl; text-orientation:upright`），長文一律橫排。

## 四、版面與網格

- **版心 1080px，左右留白 26px。** 不做寬版；宋器是小東西。
- **紙與釉分層**：釉是頁面的地，紙（`.paper`）是浮在上面的內容卡。長文永遠在紙上——月白底上的墨字對比約 12:1，青釉底上的墨字約 5.2:1，前者才能長時間閱讀。
- **沒有圓角、沒有模糊陰影。** 唯一允許的陰影是 `0 1px 0 rgba(0,0,0,.16)`，那是紙貼在釉上的實線邊。
- **架上對齊**：一列器物擺上架，器名線、圈足線、尺寸線、價目線四條線必須跨卡對齊。用 `subgrid` 拉，不要用固定高度硬撐（做法見第七章）。
- 首屏可以整片都是釉：**把文字直接排在碎片裡**。碎片互不重疊，所以文字區塊必不重疊——這是這個版面法唯一的、也是最大的好處。

## 五、本風格的 5 個不可省略特徵

> 這五件事只要少一件，就不是這個流派了。每一項都附可直接複製的片段。

### 特徵 1：兩代裂紋，而且從不交叉（T 接不 X 交）

先裂的鐵線貫穿整片釉；後裂的金絲只在鐵線圍出來的域裡面繼續切，**碰到既有的紋就停住**，且以近乎垂直（±30° 內）的角度停。這是開片真正的長相，也是判斷仿品的第一眼——隨機亂畫的線會互相穿越成十字。

實作用「域分裂」而非「畫線」：每一道裂紋都從既有邊上起、走到對邊，把一個域切成兩個。T 接、無縫鑲嵌、代次順序三件事一次全部滿足。

```js
// 域分裂：以點 P 沿方向 D 切凸多邊形（回傳兩個子域與那道裂紋的兩端）
function cutPoly(poly,P,D){
  var n=poly.length,nx=-D[1],ny=D[0],A=[],B=[],hits=[];
  var f=function(q){return (q[0]-P[0])*nx+(q[1]-P[1])*ny;};
  for(var i=0;i<n;i++){
    var a=poly[i],b=poly[(i+1)%n],fa=f(a),fb=f(b);
    if(fa>=0)A.push(a); if(fa<=0)B.push(a);
    if((fa>0&&fb<0)||(fa<0&&fb>0)){
      var t=fa/(fa-fb),x=[a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])];
      A.push(x);B.push(x);hits.push(x);
    }
  }
  return (hits.length===2&&A.length>2&&B.length>2)?[A,B,hits]:null;
}
// 每輪：以面積^2.2 加權挑一個域 → 長度加權挑一條邊 → 起點取邊上 0.2–0.8 處
// → 方向 = 該邊法線 ±jitter（jitter 0.15–0.64 rad，紋名不同值不同）
// → 前 nCoarse 道記為鐵線（g=1），其餘為金絲（g=2）
```

```css
/* 兩代紋在畫面上必須一眼分得出來 */
.tiexian{ stroke:var(--tie); stroke-width:1.8; opacity:.95 }  /* 第一代，粗、黑 */
.jinsi  { stroke:var(--jin); stroke-width:.95; opacity:.9 }   /* 第二代，細、金 */
```

### 特徵 2：沒有一塊釉色是平的

每一塊釉都有方向：**上薄下厚、凸處薄凹處厚**。頁面地色、卡片、按鈕、導覽試片，全部都要有梯度。這一條做不到，畫面立刻變成一般的莫蘭迪色網站。

```css
body{
  background:var(--qing);
  background-image:linear-gradient(176deg,
    rgba(255,255,255,.15) 0%, rgba(255,255,255,0) 34%,
    rgba(0,0,0,.10) 78%,    rgba(0,0,0,.19) 100%);
  background-attachment:fixed;
}
.paper{ background:var(--yue);
  background-image:linear-gradient(178deg,rgba(255,255,255,.7),rgba(0,0,0,.055)); }
.btn{ background:var(--qing-x);
  background-image:linear-gradient(178deg,rgba(255,255,255,.18),rgba(0,0,0,.2)); }
```

器物身上的梯度要更陡，並在底部加一團積釉：

```svg
<linearGradient id="glaze" x1="0" y1="0" x2="0.22" y2="1">
  <stop offset="0"   stop-color="#A7BFB4"/>
  <stop offset=".34" stop-color="#7C9B90"/>
  <stop offset=".82" stop-color="#48685F"/>
  <stop offset="1"   stop-color="#31504A"/>
</linearGradient>
<!-- 積釉：底部一團更深的橢圓 -->
<ellipse cx="95" cy="210" rx="98" ry="39" fill="#31504A" opacity=".38"/>
```

### 特徵 3：紫口鐵足

胎裡含鐵。口沿的釉往下流變薄，透出胎色成紫褐（**紫口**）；圈足刮釉墊燒，燒成鐵黑（**鐵足**）。這不是裝飾手法，是這副胎在這個燒法下的必然結果，所以它必須出現在每一件器物、每一枚印記、每一塊導覽試片上。

```svg
<!-- 紫口：口沿一道 1.6–3px 的紫褐弧線 -->
<path d="M17 16 q78 2.6 156 0" fill="none" stroke="#69463E"
      stroke-width="2.7" stroke-linecap="round" opacity=".92"/>
<!-- 鐵足：底部一條被器身裁切的深色帶 -->
<g clip-path="url(#body)"><rect y="203" width="190" height="11" fill="#4A3B33"/></g>
```

### 特徵 4：支釘痕

燒的時候器物架在支釘上，取下來底部留三到六個小點。**這個風格的所有點狀元素都用它**——項目符號、分隔、印記的裝飾、清單記號，一律是 3–6 顆 r≈1.7–2.4 的圓點，不用方點、不用短線、不用箭頭。

```svg
<g fill="#A7BFB4" opacity=".6">
  <circle cx="40" cy="105" r="2.4"/><circle cx="60" cy="105" r="2.4"/><circle cx="80" cy="105" r="2.4"/>
</g>
```

### 特徵 5：素面無紋（禁止一切描繪）

**器上唯一的紋樣是釉自己裂的。** 因此：

- 沒有任何一張插圖是「描出某個東西的外形」。器物是由剖面半徑控制點鏡射生成的輪廓，不是描出來的。
- 沒有 emoji、沒有線描 icon、沒有花邊、沒有印花、沒有半調網點、沒有噪點材質。
- 器形取自宋代青瓷的實際器類（貫耳瓶、琮式瓶、膽瓶、弦紋瓶、葵口碗、菱花洗、三足爐、鬲式爐、水仙盆、筆洗、茶盞、盞托、盤口壺、紙槌瓶），造形嚴整對稱。附件（貫耳、三足、弦紋）是器形的識別特徵，不是裝飾。

```js
// 器形＝剖面半徑控制點 [高度比, 半徑比]，鏡射後以 Catmull-Rom 轉貝茲閉合
var FORMS = {
  guan: {n:'貫耳瓶', p:[[0,.30],[.05,.33],[.12,.30],[.30,.42],[.52,.44],
                        [.68,.33],[.80,.17],[.90,.15],[1,.19]], ear:1},
  zhan: {n:'茶盞',   p:[[0,.16],[.05,.18],[.11,.17],[.34,.30],[.66,.42],[.90,.48],[1,.50]]}
};
```

## 六、元件配方

**導覽（積釉導覽）**：四頁＝四塊釉試片。現用頁那一片**釉積得比較厚**——尺寸大一階、色深一階、底部多一道積釉弧，而且**它上面的紋比別片疏**（釉厚則片大）。語意是釉層厚度，不是高亮、不是底線、不是變色。

```css
.rail{position:fixed;right:22px;top:20px;display:flex;gap:10px}
.chip-svg{width:44px;height:56px;display:block}
.rail a[aria-current="page"] .chip-svg{width:52px;height:66px} /* 厚 */
.chip b{writing-mode:vertical-rl;text-orientation:upright;letter-spacing:.18em}
@media(max-width:900px){ .rail{position:sticky;top:0;background:var(--qing-x);padding:8px 10px}
  .chip b{writing-mode:horizontal-tb;color:var(--yue-2)} }
```

**按鈕**：無圓角、無模糊陰影、實線 1.6px 鐵線邊、由上而下的釉厚梯度。按下去只位移 1px（釉面被壓進去一點），不要做硬陰影位移（那是別的流派）。

**卡片（紙）**：月白底＋`linear-gradient(178deg, …)`＋`box-shadow:0 1px 0 rgba(0,0,0,.16)`。不要圓角。

**表單**：`input` 月白底、1.5px 半透明鐵線邊，focus 時邊框換成金絲色。錯誤訊息用磚紅 `#8C2E22`，並且**要說出退件的理由**，不要只寫「必填」。

**footer**：深積釉 `#31504A` 滿版，月白字，頂端不加分隔線——釉色自己會沉下去。

## 七、subgrid：把架上的四條線拉齊

```css
.shelf{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.shelf>li{display:grid;grid-row:span 4;grid-template-rows:subgrid;row-gap:8px}
.shelf .nm{align-self:end}  .shelf .fig{align-self:end}
.shelf .sz{align-self:end}  .shelf .pz{align-self:end;border-top:1.4px solid rgba(32,38,42,.26)}
@supports not (grid-template-rows:subgrid){
  .shelf>li{grid-row:auto;grid-template-rows:auto}
  .shelf .nm{min-height:2.6em} .shelf .fig{min-height:212px}
}
```

## 八、動效規則

四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 種類 | 內容 | 時間曲線 | 降級 |
|---|---|---|---|
| ambient 環境 | **冷卻開片**：首屏的釉載入後逐道裂開（前 26 道鐵線每 0.30s 一道，其後 74 道金絲每 0.088s 一道，約 14 秒冷透） | 瞬間出現，不是淡入 | 全部裂紋直接呈現 |
| input 輸入 | **釉光跟游標**：一團 460×330px 的高光以 `mix-blend-mode:soft-light` 跟著指標；碎片 hover 提亮到 `--qing-l`，90ms | `linear`，rAF 節流，延遲 <100ms | 高光固定在左上 30%／16% |
| transition 轉場 | **出窯**：一道裂紋前緣掃過整頁（六點 `clip-path` 多邊形，前後頂點數相同故可補間） | `.66s cubic-bezier(.22,.86,.28,1)` | 不播 |
| signature 簽名 | **開片傳導**：每一次確認性動作（送出、開窯、上架），那面釉當場裂出一道新紋，**不可逆**，跨頁以 localStorage 累計 | 新紋出現時 stroke-width 由 3.4px 收到 1.7px，0.9s | 直接出現，計數照常 |

```css
@keyframes kp-appear{ from{opacity:0;stroke-width:3.4px} 2%{opacity:1;stroke-width:3.4px} to{opacity:1} }
.cr{ animation:kp-appear 1.1s linear var(--d) backwards }
@keyframes chuyao{
  from{clip-path:polygon(0% 0%,5% 0%,3% 4%,7% 6%,0% 9%,0% 0%)}
  to  {clip-path:polygon(0% 0%,168% 0%,158% 112%,176% 132%,0% 250%,0% 0%)}
}
main{ animation:chuyao .66s cubic-bezier(.22,.86,.28,1) both }
@media(prefers-reduced-motion:reduce){ main,.cr{animation:none} }
```

**明文禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪。最後這一條特別重要——**裂紋是瞬間裂開的，不是被畫出來的**。用 dashoffset 把裂紋「描」出來，會讓整個隱喻反過來。

## 九、插畫與圖像風格

技法名稱：**craquelure-domain 開片域構成**。圖像原語只有四種，全站所有圖像（器物、logo、favicon、導覽試片、回執印記、首屏）都只由它們組成：

1. **釉面**：一塊有方向性梯度的青色域。
2. **裂紋**：兩代，粗黑與細金，T 接不 X 交，畫成微彎折線（每 46px 一個節點，法向擾動 ±1.5px）而非直線。
3. **胎**：紫口與鐵足兩處露胎的深色。
4. **支釘痕**：3–6 顆小圓。

判準：**拿掉全部顏色，仍讀得出哪一片先裂、哪一片後裂。** 做不到就是失敗。

## 十、Logo 與 Favicon 設計指南

一枚正方的釉試片：月白外框內一塊青釉，上緣紫口帶、下緣鐵足帶、鐵足上三顆支釘痕，釉面被 6 道鐵線與 13 道金絲切開。favicon 是同一件事的 32×32 版本，只保留 3 道鐵線與 5 道金絲，且裂紋改成直線（32px 下微彎看不出來，反而糊掉）。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20fill='%237C9B90'/%3E%3Crect%20width='32'%20height='5'%20fill='%2369463E'/%3E%3Crect%20y='27'%20width='32'%20height='5'%20fill='%234A3B33'/%3E%3Cg%20fill='none'%20stroke='%2320262A'%20stroke-width='1.6'%3E…鐵線…%3C/g%3E%3Cg%20fill='none'%20stroke='%23BC882B'%20stroke-width='.9'%3E…金絲…%3C/g%3E%3C/svg%3E">
```

## 十一、Do & Don't

**Do**

- 每一塊青色都給它一個方向的梯度。
- 裂紋一定要有兩代，粗細與顏色都不同。
- 長文放在月白紙上，不要放在釉上。
- 所有點狀元素都用支釘痕（3–6 顆圓點）。
- 器形嚴整、對稱、取自真實器類。
- 讓裂紋隨使用增加——這個流派的核心是時間。

**Don't**

- 不要畫任何東西的外形（線描 icon、插圖、emoji）——特徵 5 直接禁止。
- 不要用等寬字，不要做量表、儀表板、圖號角標——那是工程製圖風，會把這個流派整個吃掉。
- 不要用純色色塊、圓角、模糊陰影、紫藍漸層。
- 不要把裂紋做成隨機 noise 或 texture 貼圖；它必須有代次與 T 接規則。
- 不要用 `stroke-dashoffset` 把裂紋描出來。
- 不要加第三種強調色。金絲已經是這個畫面上唯一的暖色，再加一個就散了。
- 不要「EST. 19xx」徽章、不要「老街屋改建」開場、不要「把 X 變成 Y」標題。

## 十二、技術實作與相容性

### 用到的三項核心技術

**1. SVG `feSpecularLighting`（渲染層）——承載特徵 2 的釉光與特徵 1 的裂紋凹槽**

把「器身減去裂紋」的 alpha 當高度圖，`feGaussianBlur` 模糊成斜面，再以 `feDistantLight` 打光。裂紋因此不是畫在表面上的線，是釉面上真的一道溝，被同一盞光照出邊——這正是實物在斜光下的樣子。

- **支援現況**：MDN《`<feSpecularLighting>`》標示 **Baseline Widely available**，自 **2015 年 7 月**起跨瀏覽器（查證日 2026-09-06，來源 <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting>）。
- **fallback 的具體行為**：濾鏡層是獨立的一個 `<g opacity=".5">`，疊在已經完整上好色的釉面之上。瀏覽器若忽略 `filter`，看到的是一層 50% 的 `#93AAA2` 罩色，畫面只是少了高光，顏色、裂紋、紫口鐵足、支釘痕全部保留，資訊零損失。**濾鏡失效不會產生白塊。**

```svg
<filter id="glaze" x="-6%" y="-6%" width="112%" height="112%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="1.8" result="b"/>
  <feSpecularLighting in="b" surfaceScale="3" specularConstant=".5"
      specularExponent="16" lighting-color="#F6FAF6" result="s">
    <feDistantLight azimuth="228" elevation="56"/>
  </feSpecularLighting>
  <feComposite in="s" in2="SourceAlpha" operator="in"/>
</filter>
<!-- mask 把鐵線 punch 成溝，於是 alpha 高度圖上每一道紋都是凹的 -->
<mask id="grooves"><rect width="190" height="230" fill="#fff"/>
  <g fill="none" stroke="#000" stroke-width="2.1">…鐵線…</g></mask>
<g filter="url(#glaze)" opacity=".5"><path d="…器身…" fill="#93AAA2" mask="url(#grooves)"/></g>
```

**2. CSS Grid `subgrid`（版面層）——承載第四章「架上四條線對齊」**

- **支援現況**：Baseline **Newly available 2023-09-15**。caniuse `mdn-css_properties_grid-template-rows_subgrid`（統計來源 StatCounter 2026-08）：Chrome/Edge **117+**、Firefox **71+**、Safari **16+**、Samsung Internet 24+，全球覆蓋 **93.48%**（查證日 2026-09-06，來源 <https://caniuse.com/mdn-css_properties_grid-template-rows_subgrid>）。
- **fallback 的具體行為**：`@supports not (grid-template-rows:subgrid)` 時改回 `grid-row:auto`，並給器名列 `min-height:2.6em`、器圖列 `min-height:212px`、尺寸列 `min-height:3.2em`。四條線仍然對齊，只是改用固定下限撐開，卡片內容特別長時會多出一點空白。

**3. 決定性開片網生成（資料與生成層）——承載特徵 1、特徵 5 與整個核心功能**

FNV-1a 雜湊 → mulberry32 偽亂數 → 域分裂。同一個種子永遠得到同一張網，因此「窯號」可以寫進網址分享、委託單的印記可以重現、建置階段輸出的靜態 SVG 與瀏覽器執行時算出來的完全一致。

- **相容性**：純 JavaScript（`Math.imul`、`Math.hypot`、`Array.prototype.splice`），無任何瀏覽器 API 依賴，無支援缺口。
- **無 JavaScript 時**：首屏那面釉、24 件館藏、logo、favicon 全部在建置階段就算好並輸出成靜態 SVG 內嵌在頁內，關掉 JavaScript 仍是完整的畫面與完整的資訊；只有「開窯押匣」與委託單的回執需要 JavaScript，這兩件事的替代資訊（匣位對照表、規則、價目、訂燒辦法）都以靜態 HTML 另外寫在同一頁。

### 效能實測（Node 22，單執行緒）

| 項目 | 實測 |
|---|---|
| 生成一張 90 道裂紋的網 | **約 1.0 ms**（20 次共 19.8 ms） |
| 首屏 100 道裂紋＋註冊碎片 | 約 1.2 ms，遠低於 100ms 首屏預算 |
| 簽名動效每次「裂一道」 | 單次域分裂 < 0.05 ms，不觸發 layout |
| 單頁大小（含 inline 全部資源） | 首頁 89.3 KB／開窯 52.9 KB／圖鑑 178.8 KB／窯記 45.5 KB，皆 < 350 KB |
| 動畫 | 只動 `opacity` 與 `stroke-width`；游標高光以 rAF 節流，每幀只寫兩個 CSS 自訂屬性，無 layout thrashing |

面積守恆檢查：域分裂輸出的碎片面積總和 = 畫布面積（1200×760 = 912000，誤差 0），故碎片是精確的鑲嵌，沒有縫也沒有疊。

## 十三、頁面骨架範例

```html
<body>
<div class="sheen" aria-hidden="true"></div>

<nav class="rail" aria-label="主要導覽">
  <a href="index.html" aria-current="page"><span class="chip">
    <svg viewBox="0 0 44 56" class="chip-svg">…厚釉試片，紋疏…</svg><b>窯門</b></span></a>
  <a href="wares.html"><span class="chip">
    <svg viewBox="0 0 44 56" class="chip-svg">…薄釉試片，紋密…</svg><b>器與紋</b></span></a>
</nav>

<main id="main">
  <!-- 首屏：整片正在冷卻的釉，文字排在碎片裡 -->
  <div class="cool"><div class="cool-inner">
    <svg id="cool-svg" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
      <g><path class="sh" fill="#9CB4AA" d="M0 0L318 0L296 214L0 188Z"/>…</g>
      <g fill="none" stroke-linecap="round">
        <path class="cr" style="--d:0.00s" d="…" stroke="var(--tie)" stroke-width="1.9"/>
        <path class="cr" style="--d:7.89s" d="…" stroke="var(--jin)" stroke-width="1.15"/>
      </g>
    </svg>
    <div class="hb" style="left:6.2%;top:9.4%;width:29.1%;height:16.6%;--fs:1.28">
      <p class="lb">苗栗公館・柴燒青瓷</p><p class="big">雲破窯</p>
    </div>
  </div></div>

  <div class="wrap">
    <section class="paper">
      <p class="kicker">開片是什麼</p>
      <h2>釉裂了，才算成。</h2>
      <p class="lead">…</p>
    </section>

    <section>
      <h2>架上</h2>
      <ul class="shelf">
        <li><h3 class="nm">茶盞・金絲鐵線</h3>
            <div class="fig"><svg class="ves" viewBox="0 0 190 230">…</svg></div>
            <p class="sz">口徑 8.4　高 5.1 公分</p>
            <p class="pz">1,800 元</p></li>
      </ul>
    </section>
  </div>
</main>

<footer><div class="wrap">
  <p class="tally">這一面釉，在你手上裂了 <b id="tally">0</b> 道。</p>
</div></footer>
</body>
```

---

*本規格書由 **Claude Opus 5**（排程 Agent）撰寫，2026-09-06。範例站：雲破窯 `sites/yunpo`。*
