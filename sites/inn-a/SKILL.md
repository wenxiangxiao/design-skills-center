---
name: american-traditional-tattoo-flash
description: American Traditional tattoo flash — bold even black outlines, a four-pot palette packed flat with wet-edge pooling, black whip/pepper shading, bare-paper highlights, ribbon banners with hand-lettered words, and numbered, priced designs crammed onto one varnished manila sheet pinned to a shop wall.
---

# 美式傳統刺青 Flash 圖稿風 American Traditional Tattoo Flash

> 範例站：燕仔泡泡糖 ÌNN-Á（基隆廟口・每顆糖紙裡夾一張刺青貼）。風格不綁產業——任何「一面牆上掛滿可以點的圖」的生意都能用：冰店、花店、徽章、手工餅乾、紀念品、運動團體、婚禮小物。

## 1. 設計哲學

Flash 是刺青店牆上那一整張預先畫好、可以直接指著點的圖稿。它在二十世紀前半的美國被「量產」：Percy Waters（1888–1952，Detroit／Anniston）以郵購目錄把成套 flash 與機器賣到全國；Norman "Sailor Jerry" Collins（1911–1973，Honolulu）把水手母題畫到極致並混入日式構圖；Amund Dietzel（Milwaukee）、Bert Grimm（Long Beach）、Ed Hardy（《Tattootime》1982–）讓它成為一套可辨識的語言。今天它被叫作 American Traditional 或 Old School。

它長成這樣是因為**技術限制**：
- 墨會在皮膚裡擴散，細線幾年後就糊掉——所以線要粗、要等寬（行話「bold will hold」）。
- 早年可靠的顏料只有幾罐：碳黑、朱紅、綠、黃（赭）、棕，藍與紫較晚、較少。
- 白色在皮膚上撐不久，最亮的地方乾脆不畫，讓皮膚自己當光。
- 牆上的圖是給客人「點」的：每張要有號碼、要有價錢、要大小擠在一張紙上省牆面。
- 圖要在十步外就讀得懂：一個圖一個主角、寓意直白（燕子＝回家、錨＝穩住、心＋緞帶＝獻給某人）。

**一句話：先上黑線，再填四罐色，黑點往裡撒當陰影，留白是光；字寫在緞帶上；所有圖都有號碼，擠在同一張上過亮光漆的黃紙上。**

## 2. 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 牆（菸草木牆） | `#33261C`／`#271C14` | 頁面底，直向木板條 | 25% |
| 馬尼拉紙 | `#ECDDB4`（亮 `#F4E8C8`、暗 `#D6BF8A`） | flash 紙＝所有內容的地 | 45% |
| 墨黑 | `#17120F` | 線、陰影、字 | 12% |
| 朱紅 | `#C4271C`（深 `#8E1C14`） | 心、玫瑰、緞帶、價錢、強調 | 7% |
| 綠 | `#2E7A3C` | 葉、蛇、CTA 底 | 3% |
| 黃（赭） | `#E3A52A` | 金屬、繩、光芒、按鈕 | 3% |
| 棕 | `#7A4422` | 木頭、毛、舵輪 | 2% |
| 藍 | `#2A5A8C` | 只給燕背、海、錨 | 2% |
| 轉印紫 | `#7B5BB0` | 只出現在「還沒上色」的轉印線稿狀態 | <1% |

規則：零漸層（光暈與紙漬除外）、零白顏料、同一個母題最多 3 色＋黑；色塊一律被黑線圍住。

## 3. 字體系統

- **CJK 招牌字**：Noto Sans TC 900，紅字＋`-webkit-text-stroke:.05em #17120F`＋`paint-order:stroke fill`＋實黑錯位陰影 `.05em .06em 0`。字級 `clamp(44px,7.4vw,112px)`，小標 `clamp(30px,4.4vw,58px)`。
- **拉丁／號碼／價錢**：Rye（木活字西部體，承擔 flash 上的 No.7、5元、HOLD FAST）。
- **內文**：Noto Serif TC 500，16px／1.75。
- 號碼永遠紅色 Rye 14px，放在圖的左上角；價錢紅色 Rye 緊跟在名稱後。

## 4. 版面與網格

- 每一頁是**一張或多張釘在牆上的 flash 紙**：`rotate` −0.6°～+0.7°、四角圖釘、內縮 12px 的鉛筆雙框。
- flash 紙內是 **6 欄 grid、`grid-auto-flow: dense`**，大圖 2×2、高圖 1×2、資訊 2×1，**不留整齊的格子**：圖跟圖擠在一起，每格 −2.6°～+2.4° 隨機微轉。
- 資訊也畫成 flash：營業時間在紅緞帶裡、價目表是一卷捲軸、地址在米色緞帶裡、CTA 是一支綠色箭頭牌——每個都有自己的號碼（No.13–16）。
- ≥1001px 用 grid-template-areas 手排、≤1000px 4 欄、≤560px 2 欄並把紙的旋轉歸零。

## 5. 元件配方

**flash 項目（可點）**
```css
.fl{position:relative;background:none;border:0;rotate:var(--r);transition:rotate .08s,translate .08s}
.fl .no{position:absolute;left:4px;top:0;font:400 14px Rye;color:#C4271C}
.fl .st{position:absolute;inset:0;opacity:0;translate:7px 6px;transition:opacity .08s,translate .08s}/* 紫色轉印線稿 */
.fl:hover,.fl:focus-visible{rotate:0deg;translate:0 -4px}
.fl:hover .st{opacity:.95;translate:9px 8px}
```
**緞帶 ribbon**（標籤、標題、按鈕狀態）
```css
.ribbon{position:relative;display:inline-block;padding:.32em 1.4em;background:#F4E8C8;border:3px solid #17120F;margin:0 1.5em;z-index:1}
.ribbon::before,.ribbon::after{content:"";position:absolute;top:.45em;bottom:-.55em;width:1.6em;background:#D6BF8A;border:3px solid #17120F;z-index:-1}
.ribbon::before{left:-1.45em;clip-path:polygon(0 0,100% 0,100% 100%,0 100%,38% 50%)}
.ribbon::after{right:-1.45em;clip-path:polygon(0 0,100% 0,62% 50%,100% 100%,0 100%)}
.ribbon.red{background:#C4271C;color:#FFF1D2}.ribbon.red::before,.ribbon.red::after{background:#8E1C14}
```
**導覽 anchor-banner**：左側 96px 深木條，一支藍錨＋黃繩貫穿上下，四個頁名是纏在錨桿上的緞帶，奇偶 ±7° 交錯；現用頁＝紅緞帶、轉正、加寬。≤760px 改為底部一排緞帶。
**按鈕**：墨黑底奶油字 Noto Sans TC 900、零圓角；主要 CTA 是綠底黃字箭頭牌 `clip-path:polygon(0 0,86% 0,100% 50%,86% 100%,0 100%,6% 50%)`。
**表單**：3px 墨框、亮馬尼拉底、零圓角；送出鈕紅底。
**footer**：直接寫在木牆上，馬尼拉暗色字、黃色連結。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 種類 | 做法 | 參數 | 降級 |
|---|---|---|---|
| ambient 環境 | 紙繞上緣圖釘擺動＋一道亮光漆反光橫掃 | `rotate` ±.35°、9s ease-in-out alternate；反光 `translate` −100%→300%、16s linear；視窗外的紙 `animation-play-state:paused` | 全部停止，反光停在 60% |
| input 輸入 | hover／focus flash 圖：轉正、上提 4px、底下浮出紫色轉印線稿 | 80ms ease-out | 無過渡，直接切換 |
| transition 轉場 | 點圖 → 從牆上「拔下來」的 popover：`@starting-style` 從 scale .42／rotate −14°／下移 60px 彈出；關閉時往上 −40px 轉 9° 飛走 | .34s `cubic-bezier(.2,1.5,.4,1)`＋`transition-behavior:allow-discrete` | 無動畫開關 |
| signature 簽名 | **水貼撕背紙**：背紙沿「角點與游標的垂直平分線」摺起，被掀起那半以摺線鏡射畫成翻起的紙，紙背有摺痕陰影，底下露出已轉印、濕亮的刺青；按壓不足處龜裂、殘墨留在翻起的紙上 | 手動跟手；自動撕 1100ms ease-in-out；轉印後濕亮光 1600ms 褪去 | 「撕開」直接完成，無動畫，結果相同 |

禁用：stroke-dashoffset 描線、數字滾動、按壓硬陰影位移、通用淡入當主打。

## 7. 插畫與圖像風格（flash-pack）

所有圖由同一份母題資料（100×100 座標的路徑＋色鍵）畫出，順序固定：
1. **紫色轉印線**（只在未收集／教學狀態出現）
2. **黑線**：線寬＝圖寬的 1/40～1/20，等寬、圓角接頭
3. **填色**：Canvas 2D 平塗 94% 不透明＋顆粒（source-atop 疊噪點 16–26%）＋**濕邊**（clip 在區塊內描 5.5 單位寬的深色邊 42%）
4. **鞭狀陰影**：區塊減去「往左上偏移 d 的自己」得到右下月牙，d＝9／5.2／2.1 三層：稀點→密點→實黑
5. **留白高光**：`destination-out` 擦掉一筆弧線，露出紙
6. 緞帶與字最後上

母題詞彙（每個都要帶寓意）：燕、玫瑰、心＋緞帶、蝴蝶、錨（HOLD FAST）、航海星、燈塔、舵輪、匕首、黑豹、蛇、骰子。

## 8. Logo 與 Favicon

Logo：兩隻相對的燕子（藍背紅胸黃喙）銜著一條紅緞帶，緞帶上奶油色「燕仔」黑描邊——即一張 flash。Favicon：64px 馬尼拉方塊上一隻燕子，3px 黑線。皆為 inline SVG。

## 9. Do & Don't

**Do**：黑線先上／每張圖有號碼與價錢／字寫在緞帶上／圖擠在一張紙上／留白當光／寓意寫出來。
**Don't**：細線、漸層填色、白顏料、超過 3 色＋黑的單一母題、整齊等大卡片格、圓角陰影卡、紫藍漸層、emoji、Lorem ipsum、EST. 19xx 徽章；不要把真實刺青師的名字或作品當成店家的作品。

## 10. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 flash 了。

**① 粗而等寬的黑框（bold will hold）**——所有色塊都被同一粗細的黑線圍住，圓角接頭。
```js
ctx.lineJoin='round'; ctx.lineCap='round';
ctx.strokeStyle='#17120F'; ctx.lineWidth=2.4*(S/112); ctx.stroke(path); // 每個區塊填完立刻描
```
```css
svg.flash path{stroke:#17120F;stroke-width:2.4;stroke-linejoin:round}
```

**② 四罐顏料平塗、零白、留白是光**——色只來自固定色票；最亮處用擦的。
```js
const INK={k:'#17120F',r:'#C4271C',g:'#2E7A3C',y:'#E3A52A',b:'#2A5A8C',n:'#7A4422'};
ctx.fillStyle=INK.r; ctx.globalAlpha=.94; ctx.fill(path);
ctx.save(); ctx.clip(path); ctx.strokeStyle='#7E140D'; ctx.globalAlpha=.42; ctx.lineWidth=5.5; ctx.stroke(path); ctx.restore(); // 濕邊積深
ctx.save(); ctx.globalCompositeOperation='destination-out'; ctx.lineWidth=2.2; ctx.stroke(new Path2D('M34 30C38 24 44 21 50 20')); ctx.restore(); // 留白高光
```

**③ 黑色鞭狀／胡椒陰影**——從線往內撒黑點，越近越密，只在背光側。
```js
function shade(ctx,path,T,layer,pats){const lx=layer.getContext('2d');
  for(const [fill,d,a] of [[pats.sparse,9,.9],[pats.dense,5.2,.9],['#17120F',2.1,.82]]){
    lx.setTransform(1,0,0,1,0,0); lx.clearRect(0,0,layer.width,layer.height);
    lx.setTransform(T); lx.fillStyle=fill; lx.fill(path);
    lx.globalCompositeOperation='destination-out'; lx.translate(-d,-d*1.15); lx.fill(path); lx.globalCompositeOperation='source-over';
    ctx.save(); ctx.clip(path); ctx.setTransform(1,0,0,1,0,0); ctx.globalAlpha=a; ctx.drawImage(layer,0,0); ctx.restore(); }}
```

**④ 緞帶卷軸與手寫字**——兩端摺回、尾巴燕尾剪口、摺處一個黑三角。
```svg
<path d="M7 42Q50 52 93 42L93 58Q50 68 7 58Z" fill="#F1E2BC" stroke="#17120F" stroke-width="2.4"/>
<path d="M10 46L-3 46L2 54L-3 62L10 62Z" fill="#D9C390" stroke="#17120F" stroke-width="2.4"/>
<path d="M7 58L10 62L10 58Z" fill="#17120F"/>
<text x="50" y="52" text-anchor="middle" font-family="Rye,'Noto Sans TC'" font-weight="900" font-size="11">HOLD FAST</text>
```

**⑤ 編號、標價、擠在一張上過亮光漆的馬尼拉紙上**——圖稿牆本身就是版面。
```css
.sheet{background:radial-gradient(120% 70% at 85% 8%,rgba(176,120,40,.18),transparent 60%),#ECDDB4;rotate:-.5deg;
  box-shadow:0 2px 0 rgba(0,0,0,.25),0 22px 34px -18px rgba(0,0,0,.75)}
.sheet::before{content:"";position:absolute;inset:12px;border:1.5px solid rgba(23,18,15,.42)}
.flash-grid{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-flow:row dense;gap:14px}
.fl.b{grid-column:span 2;grid-row:span 2}
```
```html
<button class="fl b" style="--r:-2.2deg"><span class="no">No.1</span>…<span class="nm">燕<em>5元</em></span></button>
```

## 11. 頁面骨架範例

```html
<nav class="rail"><!-- 錨＋四條緞帶 --></nav>
<main id="main">
  <section class="sheet hero"><span class="tack tl"></span><span class="tack tr"></span>
    <header class="mast"><div class="mo" data-m="logo"></div>
      <div><p class="pencil">FLASH 第 47 版 · 2026 秋</p><h1 class="letter">店名</h1>
      <p><span class="ribbon red">一句定位</span></p></div></header>
    <div class="flash-grid">
      <button class="fl b" popovertarget="pop-1"><span class="no">No.1</span><div class="mo" data-m="inn"></div><span class="nm">燕<em>5元</em></span></button>
      <div class="fl info price b"><span class="no">No.13</span><div class="scroll"><h2>價目</h2><ul>…</ul></div></div>
    </div>
  </section>
  <div id="pop-1" popover class="card"><div class="sheet">…寓意…</div></div>
</main>
```

## 12. 技術實作與相容性

### 12.1 Canvas 2D（A 渲染層）——承載特徵①②③⑤的「圖稿」本體
- `new Path2D(svgPathString)`：MDN〈Path2D() constructor〉標示 Baseline Widely available（2016-08 起跨瀏覽器；Edge 79 前不支援字串參數）。
- `globalCompositeOperation`（source-atop／destination-out／multiply）、`createPattern`、`getImageData/putImageData`、`setTransform(DOMMatrix)`：長期普遍支援。
- 同一份資料在建置期輸出 SVG `<symbol>`（平塗＋黑線＋緞帶字）作為**無 JS／不支援 Canvas 時的備援**；JS 可用時以 IntersectionObserver 排隊、每幀 ≤9ms 地把 SVG 換成水彩 Canvas（`.mo.painted>svg.flat{visibility:hidden}`）。
- 水貼引擎：按壓品質 q＝按住秒數／3，逐像素以 value noise＋邊緣係數決定未轉印像素（`v = n·.85 + (1−邊距)·.5 > .5 + q·.95`）；120px 貼紙 @2x 實測 8ms。撕紙以 Sutherland–Hodgman 半平面裁切＋反射矩陣 `[1−2nx², −2nxny, −2nxny, 1−2ny², 2(M·n)nx, 2(M·n)ny]` 繪製翻起的背紙。

### 12.2 Popover API＋`@starting-style`＋`transition-behavior: allow-discrete`（B 動效層）——承載「從牆上拔下來」轉場
- `transition-behavior`：Chrome/Edge 117、Safari 17.4、Firefox 129（MDN 相容表）；`@starting-style` 與 allow-discrete 自 2024-08 Firefox 129 起為 Baseline Newly available（web.dev〈Baseline entry animations〉）。
- `overlay` 屬性的 allow-discrete 退場仍視為漸進增強：不支援時 popover 退場無動畫、直接關閉，資訊不受影響。
- 不支援 Popover API 的舊瀏覽器：`[popover]` 元素維持隱藏，圖稿牆上每張圖的名稱與價錢仍在牆上，寓意另見〈工廠〉頁。

### 12.3 Pointer Events＋`setPointerCapture`＋`getCoalescedEvents()`（D 輸入層）——承載水貼三段操作
- 拖曳貼紙→按住沾濕（rAF 累積 held）→從任一角撕；`getCoalescedEvents` 不存在時退回單一事件。
- 鍵盤完整替代：Enter＝貼上／撕開，空白鍵按住＝沾濕；畫面下方三顆按鈕同功能；狀態以 `aria-live` 朗讀。

### 12.4 效能實測（Chromium 130 headless、軟體繪圖、1280×900）
- 單頁大小：index 131KB／gum 123KB／factory 95KB／visit 97KB（≤350KB）。
- 首屏 JS 執行（performance.measure，自 script 開頭至結尾）：index 1ms（試撕區延至首幀後初始化）、gum 75ms、factory 1ms、visit 20ms（≤100ms）。
- 主要動畫：4 頁皆 60–61fps；擺動與反光只動 `rotate`／`translate`（合成器屬性），視窗外的紙暫停動畫。初版反光用 `mix-blend-mode:soft-light` 實測掉到 13–30fps，已改為純 alpha 漸層。

查證來源：MDN〈Path2D() constructor〉、MDN〈transition-behavior〉、MDN〈overlay〉、web.dev〈Baseline entry animations〉。
