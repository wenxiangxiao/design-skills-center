---
name: frutiger-metro-tileboard
description: Frutiger Metro / Windows Phone style — pure black canvas, one accent colour, giant 200-weight sans headlines cropped by the canvas edge, and flat solid tiles in three sizes where size equals information density.
---

# Frutiger Metro／Windows Phone　磚板風格規格書

> 微軟 2010–2015 年的 Metro／Modern UI（設計主導 Albert Shum、Jeff Fong）。它的宣言叫 *authentically digital*：不要模仿真實世界的材質，螢幕就該長得像螢幕。它自認的祖宗是機場與地鐵的指示牌——Adrian Frutiger 為戴高樂機場做的 Univers 標示系統、Massimo Vignelli 的紐約地鐵手冊。所以它的規則全部繞著同一件事：**遠遠一眼看得懂**。字要大要輕，可以被畫布切掉；顏色要少要純；框、陰影、圓角、材質全部拿掉，因為「內容就是外框」（content is the chrome）。

---

## 一、設計哲學

1. **內容即外框**。畫面上不存在「裝內容的容器」。磚不是卡片——它沒有邊框、沒有陰影、沒有圓角，它只是一塊被塗成某個顏色的區域，而那個區域本身就是內容。
2. **大小即資訊密度**。三種磚：小（1 格）只放一個數字，中（2 格）多一行說明，寬（4 格）才輪得到走勢圖。要說得多就得佔得大，這是可以量的，不是品味。
3. **字被切斷是規格**。巨型輕體標題貼齊左緣、從右緣出畫。它在告訴你：右邊還有東西，往那邊走。
4. **一個強調色統治全站**。純黑底、白字，加一個強調色。第二個色只給「要注意的事」，灰只給「沉默的東西」。
5. **橫向優先**。章節往右躺（panorama），不是往下疊。標題比內容走得慢，所以標題會被內容追過。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉它，這就不是 Metro 了。

### 特徵 1　被畫布切斷的巨型輕體標題（200–300 字重）

標題不是 700 也不是 900，是 **200**。字級大到 clamp 上限 140px，字距收到 −0.025em，行高 0.9，貼齊左緣，然後讓它從右緣出畫。切斷不是失誤，是在說「往右還有」。

```css
h1{font-family:"Source Sans 3","Noto Sans TC",sans-serif;
   font-weight:200;font-size:clamp(54px,11.5vw,140px);
   letter-spacing:-.025em;line-height:.9;margin:0}
.crop{overflow:hidden;width:100%}
.crop h1{white-space:nowrap;margin-left:-.055em;width:132%}
```
`margin-left:-.055em` 是把第一個字的左側字身空隙吃掉，讓字真的貼在版心線上——Metro 的標題永遠切齊，不是靠目測。

### 特徵 2　實色磚，只有三種尺寸，6px 溝縫，零圓角零陰影零邊框

四欄網格。小＝1 欄（1:1）、中＝2 欄（2:1）、寬＝4 欄（4:1），三者等高。溝縫固定 6px，永遠不變。

```css
.board{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;grid-auto-flow:row dense}
.tile{background:#2B2B2B;color:#fff;border:0;border-radius:0;box-shadow:none;
      aspect-ratio:1/1;position:relative;overflow:hidden}
.tile.m{grid-column:span 2;aspect-ratio:2/1}
.tile.w{grid-column:span 4;aspect-ratio:4/1}
```
**禁止**：`border-radius`、`box-shadow`、`filter:blur`、`backdrop-filter`、任何 `linear-gradient` 當底色、任何圖片背景。磚只能是一塊實色。

### 特徵 3　大小＝資訊密度（由容器查詢實作，不是由裝置寬度）

同一塊磚，變大就自己多說一句。這條規則必須由**磚自己的寬度**決定，不能由視窗寬度決定——因為同一個視窗裡三種磚要同時存在。

```css
.tile{container-type:inline-size}
.tile .cap,.tile .viz{display:none}
.tile .v{font-size:clamp(26px,9cqi,58px);font-weight:200;line-height:.9;letter-spacing:-.03em}
@container (min-width:150px){ .tile .cap{display:block} }        /* 中磚起：加一行說明 */
@container (min-width:250px){ .tile .viz{display:block} }        /* 寬磚起：加走勢色塊 */
@container (min-width:430px){ .tile .face{flex-direction:row;align-items:flex-end;gap:18px} }
```

### 特徵 4　一個強調色統治全站，純黑底

```css
:root{
 --k:#000000;   /* 底　56%　必須是純黑，不是 #111 也不是 #0A0A0A */
 --w:#FFFFFF;   /* 字　16% */
 --lime:#A4C400;/* 強調　17%　現用態、可動作的東西、正面的數字 */
 --amber:#F0A30A;/* 注意　7%　截止、失格、退件 */
 --g1:#2B2B2B;  /* 沉默的磚　4% */
 --g3:#8A8A8A;  /* 次要文字 */
}
```
規則：**強調色只有一個**。琥珀不是第二強調色，它是警示語意，面積 ≤8%。灰階不帶任何色偏。連結不用藍色，用強調色加 2px 底線。

### 特徵 5　按下去會歪（tilt），不是「hover 變色」

Metro 的磚有厚度。按哪一角，它就朝那一角傾，放開彈回。這是這個介面唯一的「物理」，也是它跟一堆平面 UI 的分界線。

```js
el.addEventListener("pointerdown",function(e){
  var r=el.getBoundingClientRect();
  var px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
  el.style.transform="perspective(760px) rotateY("+(px*16).toFixed(2)+"deg) rotateX("+(-py*16).toFixed(2)+"deg) scale(.985)";
});
["pointerup","pointerleave","pointercancel","blur"].forEach(function(k){
  el.addEventListener(k,function(){el.style.transform="";});
});
```
```css
.tile{transition:transform .12s cubic-bezier(.2,.8,.2,1);will-change:transform}
```

---

## 三、色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 純黑 | `#000000` | 全站底色。不可用近黑代替 | 56% |
| 純白 | `#FFFFFF` | 所有文字、白磚 | 16% |
| 萊姆 | `#A4C400` | 唯一強調色：現用態、連結、可動作、正面數字 | 17% |
| 琥珀 | `#F0A30A` | 警示語意：截止、失格、退件 | 7% |
| 磚灰 | `#2B2B2B` | 沉默的磚底 | 4% |
| 描邊灰 | `#4C4C4C` | 幽靈按鈕的 inset 描邊 | — |
| 次文字灰 | `#8A8A8A` | 說明文字、標籤 | — |

換強調色時整站只換一個變數。Windows Phone 原本就有二十種 accent，這是這個風格的功能。**不要同時用兩個強調色**。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 尺寸 |
|---|---|---|---|
| 巨型標題 h1 | Source Sans 3 / Noto Sans TC | **200** | `clamp(54px,11.5vw,140px)` |
| 章節 h2 | 同上 | **200** | `clamp(38px,7vw,86px)` |
| 小標 h3 | 同上 | 300 | `clamp(20px,2.6vw,30px)` |
| 磚上的數值 | 同上 | **200** | `clamp(26px,9cqi,58px)` |
| 內文 | 同上 | 400 | 16px / 1.7 |
| 標籤 `.lbl` | 同上 | 600 | 12.5px，`letter-spacing:.26em`，全大寫 |

- Segoe UI／Segoe WP 是原版，網頁上取 **Source Sans 3**（人文主義無襯線，開放字腔、單層 a、直切尾）最接近其精神；中文取 **Noto Sans TC** 200/300/400/700（微軟正黑體的角色）。
- **禁止襯線字、禁止等寬字**。等寬會立刻把畫面變成終端機，那是另一個風格。
- 所有大字一律負字距（−0.02 至 −0.03em）；標籤一律正字距（+0.2em 以上）。這個反差是 Metro 的字級節奏。

```html
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400;600&family=Noto+Sans+TC:wght@200;300;400;700&display=swap" rel="stylesheet">
```

---

## 五、版面與網格

- **四欄磚網格**，溝縫 6px，`grid-auto-flow:row dense`。一屏＝四欄六列＝24 格。
- **一屏上限**：磚總格數不得超過 24。超過就是另一屏。
- **橫向全景**：章節橫排，`scroll-snap-type:x mandatory`，每面寬 `min(100%,1080px)`，面間距 44px。必附「前一面／下一面」按鈕與 ←/→ 鍵。
```css
.pano{display:grid;grid-auto-flow:column;grid-auto-columns:min(100%,1080px);gap:44px;
      overflow-x:auto;scroll-snap-type:x mandatory}
.pano>section{scroll-snap-align:start;min-width:0}
```
- **留白規則**：磚與磚之間只有 6px，但磚陣與長文之間至少 56px。密的地方要非常密，鬆的地方要非常鬆，中間值是 Metro 最忌諱的東西。
- **不置中**。所有文字靠左，所有標題貼齊同一條版心線。整站不出現一個 `text-align:center`。
- **RWD**：≤640px 時導覽降為兩欄；磚網格維持四欄（小磚會變得很小，那是對的——Windows Phone 本來就是手機介面）。

---

## 六、元件配方

### 導覽（tile-size 磚級導覽）
四頁＝四塊磚。**現用頁那塊變成寬磚（跨兩欄）並吐出一行副資訊**，其餘維持小磚。現用態不是高亮、不是底線、不是反相——是它比別人大，而且大了之後說得比較多。

```css
.nav{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.nav a{background:#2B2B2B;color:#fff;padding:12px 13px 13px;min-height:78px;display:block}
.nav a .n{font-size:12px;font-weight:600;letter-spacing:.2em;color:#8A8A8A}
.nav a .p{font-weight:300;font-size:21px;letter-spacing:-.01em;margin-top:2px}
.nav a .x{display:none;font-size:12.5px;margin-top:5px;line-height:1.4}
.nav a.on{background:#A4C400;color:#000;grid-column:span 2}
.nav a.on .x{display:block}
```

### 磚（雙面）
正面／背面各是一份不同的資料，`rotateX` 翻面。
```css
.tile{perspective:900px}
.tile .face{position:absolute;inset:0;padding:11px 12px;display:flex;flex-direction:column;
  justify-content:space-between;backface-visibility:hidden;
  transition:transform .5s cubic-bezier(.25,.9,.3,1)}
.tile .back{transform:rotateX(180deg)}
.tile.flip .front{transform:rotateX(-180deg)}
.tile.flip .back{transform:rotateX(0)}
```

### 按鈕
```css
.btn{background:#A4C400;color:#000;border:0;font-weight:600;font-size:14px;
     letter-spacing:.16em;padding:15px 22px;cursor:pointer}
.btn:hover{background:#fff}
.btn:active{transform:scale(.97)}
.btn.gh{background:transparent;color:#fff;box-shadow:inset 0 0 0 2px #4C4C4C}
```
**沒有圓角，沒有陰影，沒有 hover 位移。**

### 表單
```css
input,select,textarea{border:0;background:#2B2B2B;color:#fff;padding:11px 12px;width:100%}
input:focus{outline:2px solid #A4C400;outline-offset:0}
label{font-size:12px;font-weight:600;letter-spacing:.2em;color:#8A8A8A;text-transform:uppercase}
```
欄位沒有框線，只有一塊比底色亮一階的灰。focus 才長出強調色外框。

### Footer
無背景色，只有一條 1px `#2B2B2B` 上框線，內容三欄。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 時值與 easing |
|---|---|---|---|
| ambient | 值班色帶 | 無需輸入。依訪客本地時鐘判斷是否營業，色帶上一格亮塊持續掃過 | `4.5s linear infinite`，非營業時段轉灰 |
| input-driven | 按壓傾斜 tilt | `pointerdown` | `.12s cubic-bezier(.2,.8,.2,1)`，最大 ±16°，回彈 scale .985→1 |
| transition | turnstile 旋轉門 | 頁面切換 | 以左緣為軸 `rotateY(-92deg → 0)`，`.34s cubic-bezier(.4,0,.2,1)`；新頁元素以 26ms 階梯 `rotateY(78deg → 0)` 依序轉正 |
| signature | 對角波前接力翻面 | 每 7.5 秒自動一輪 | 每塊延遲 ＝ `((x/W)+(y/H))*3*300ms`，`rotateX 180°`，`.5s cubic-bezier(.25,.9,.3,1)` |

```css
#stile{position:fixed;inset:0;z-index:200;background:#000;pointer-events:none;opacity:0;
 transform-origin:left center;transform:perspective(1400px) rotateY(-92deg);
 transition:transform .34s cubic-bezier(.4,0,.2,1),opacity .1s}
#stile.on{opacity:1;transform:perspective(1400px) rotateY(0)}
@keyframes enterY{from{opacity:0;transform:perspective(1400px) rotateY(78deg);transform-origin:left center}
                  to{opacity:1;transform:perspective(1400px) rotateY(0)}}
```

**`prefers-reduced-motion` 降級（資訊零損失）**
- ambient：色帶不掃，改為整條靜態上色（開放＝萊姆，非開放＝灰）。
- tilt：改為 `scale(.985)` 的瞬時回饋。
- turnstile：整個覆蓋層 `display:none`，直接跳轉。
- 接力翻面：**停止自動翻面**，改為「點磚即翻」並在板子下方明寫一行「已依你的系統設定停用自動翻面，點一下就會翻到背面，資訊完全一樣」。

**禁止**：淡入當主要動效、視差捲動、數字滾動計數、stroke-dashoffset 描繪。這個風格的動態全部是**剛性的旋轉與位移**，沒有任何漸隱。

---

## 八、插畫與圖像風格（datablock-mosaic 資料實色磚）

**全站沒有一張照片、沒有一張描外形的插圖、沒有一條曲線。** 所有圖像只有三種原語：

1. **實色資料格**：把一列數字量化到 3px 一階的格子上，畫成 5px 寬、1px 溝縫的實心柱。判準是「拿掉文字仍讀得出這列數字的形狀」。
```js
function viz(series,H){
  H=H||24; var n=series.length,max=Math.max.apply(null,series)||1,r="";
  for(var i=0;i<n;i++){
    var q=Math.max(1,Math.round(series[i]/max*(H/3))), h=q*3;
    r+='<rect x="'+(i*6)+'" y="'+(H-h)+'" width="5" height="'+h+'"/>';
  }
  return '<svg width="'+(n*6-1)+'" height="'+H+'" style="fill:currentColor;opacity:.72">'+r+'</svg>';
}
```
2. **單線幾何字符**：只用水平線、垂直線、45° 斜線與正圓，線寬固定 4，`fill:none`，**無圓角**（不設 `stroke-linecap:round`）。
3. **實色矩形**：logo、favicon、回執印記都只是格子上的實色方塊。

配色一律 `currentColor`，因為磚的底色會變，圖必須跟著磚走。

---

## 九、Logo 與 Favicon

- **Logo**：左邊一組 6px 溝縫的實色磚陣（萊姆／白／灰／琥珀各一塊，其中一塊挖出四條黑色橫槓當標記），右邊 200 字重的大寫廠牌名分兩行，底下一條萊姆＋一小段琥珀的色條。整枚 logo 就是「一面縮小的板子」。
- **Favicon**：純黑底上的 3×3 磚陣，萊姆一塊、白兩塊、琥珀一塊、灰一塊，`inline SVG data URI` 寫在 `<head>`。
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23000'/%3E%3Crect x='6' y='6' width='24' height='24' fill='%23A4C400'/%3E%3Crect x='34' y='6' width='24' height='10' fill='%23fff'/%3E%3Crect x='6' y='34' width='52' height='10' fill='%23fff'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 純黑底，一個強調色，四種顏色以內。
- 標題 200 字重、貼左、被右緣切斷。
- 磚只有三種尺寸，溝縫恆為 6px。
- 大小決定內容多寡，用 `@container` 實作。
- 按壓要傾斜，切頁要旋轉門。
- 每一張圖都是實色格子，且承載可讀回的數列。

**Don't**
- ❌ 圓角、投影、模糊、玻璃擬態、漸層底色、紫藍漸層 hero。
- ❌ 把磚做成有邊框的卡片（有框就變成 Bento Grid，那是另一個風格，而且是 AI 的反射動作）。
- ❌ 襯線字、等寬字、粗體大標（700 以上的巨型字是 Y2K／未來派，不是 Metro）。
- ❌ 置中排版、三張一模一樣的圓角卡片、emoji 當 icon。
- ❌ 照片、材質貼圖、noise 顆粒。Metro 的底是純黑，不是「有質感的黑」。
- ❌ 淡入、視差、數字滾動計數。
- ❌ 同時用兩個強調色。
- ❌ 用 `@media` 假裝容器查詢——那會讓三種磚在同一個視窗裡顯示同樣的內容量，特徵 3 就死了。

---

## 十一、頁面骨架範例

```html
<div class="wrap" style="padding-top:20px">
  <nav class="nav">
    <a href="./index.html" class="on"><span class="n">01</span><div class="p">看　板</div>
       <div class="x">今日歸返 38／52，最後一羽 11:42 進舍</div></a>
    <a href="./race.html"><span class="n">02</span><div class="p">本季賽制</div><div class="x">…</div></a>
    <a href="./board.html"><span class="n">03</span><div class="p">排看板</div><div class="x">…</div></a>
    <a href="./join.html"><span class="n">04</span><div class="p">入　會</div><div class="x">…</div></a>
  </nav>
</div>

<div class="wrap" style="padding-top:26px">
  <div class="lbl">北岸競翔會・石門老梅</div>
  <div class="crop off"><h1>今天的板子</h1></div>
</div>

<div class="wrap">
  <div class="board live">
    <div class="tile w lime" tabindex="0">
      <div class="face front">
        <div class="col"><span class="t">今日歸返</span><div class="v">38/52</div></div>
        <div class="col"><div class="cap">最後一羽 11:42 進舍</div><svg class="viz">…</svg></div>
      </div>
      <div class="face back">
        <div class="col"><span class="t">歸返率</span><div class="v">73%</div></div>
        <div class="col"><div class="cap">本季第二關・全會 41 舍平均</div></div>
      </div>
    </div>
    <div class="tile m"> … </div>
    <div class="tile s"> … </div>
  </div>
</div>
```

---

## 十二、技術實作與相容性

本站的視覺與動效由三項技術承載。三項分屬不同層（C 版面／B 動效／D 輸入），且皆為畫面的主要承載者而非裝飾。

### 1. CSS Container Queries ＋ 容器查詢單位（C 版面與樣式層）
**承載**：特徵 3「大小＝資訊密度」。`@container (min-width:…)` 讓每一塊磚依**自己的寬度**決定顯示到哪一層資訊，`9cqi` 讓數值字級隨磚寬連續縮放。這件事媒體查詢做不到——同一個視窗裡三種磚必須同時顯示不同的內容量。

**查證（2026-08-10，MDN《CSS container queries》／caniuse）**：容器查詢自 2023 年底起為 Baseline，Chrome/Edge 105+、Firefox 110+、Safari 16+，全球覆蓋約 93%。容器查詢單位（`cqw/cqh/cqi/cqb/cqmin/cqmax`）支援版本與容器查詢相同（Chrome/Edge 105+、Firefox 110+、Safari 16+、Opera 91+、Samsung Internet 20+），惟其 Baseline 標記尚未與容器查詢同步。

**Fallback 具體行為**：`.cap` 與 `.viz` 的預設值為 `display:none`，僅在 `@container` 內開啟。舊瀏覽器不認得 `@container` 時，磚上仍有**標籤與數值**（磚的主要資訊），且說明文字在同一頁的表格與內文中另有完整敘述——資訊零損失，只是磚變安靜。`9cqi` 寫在 `clamp()` 中間項，不支援時退回 `clamp` 的下界 26px，字級仍可讀。

### 2. FLIP 版面轉場（B 動效與時間軸層）
**承載**：使用者拖曳重排磚時，每一塊磚從舊位置平滑滑到新位置。CSS Grid 的重排本身沒有動畫，只有 FLIP（First → Last → Invert → Play）能補上這一段。

**實作要點**：一次 read（`getBoundingClientRect`）→ 一次 write（`transform`）→ `requestAnimationFrame` 內清除 transform，**避免 layout thrashing**。DOM 節點必須被 `appendChild` 搬移而非 `innerHTML` 重建，否則舊節點與新節點沒有身分對應，FLIP 會整段失效。

```js
function flip(container,mutate){
  var els=[].slice.call(container.children);
  var first=els.map(function(e){return e.getBoundingClientRect();});
  mutate();                                   // 只搬移既有節點
  var now=[].slice.call(container.children);
  var last=now.map(function(e){return e.getBoundingClientRect();});
  now.forEach(function(e,i){
    var k=els.indexOf(e); if(k<0)return;
    var dx=first[k].left-last[i].left, dy=first[k].top-last[i].top;
    e.style.transition="none";
    e.style.transform="translate("+dx+"px,"+dy+"px)";
  });
  requestAnimationFrame(function(){
    now.forEach(function(e){e.style.transition="transform .34s cubic-bezier(.2,.85,.25,1)";e.style.transform="";});
  });
}
```
**查證**：`Element.getBoundingClientRect()`、`requestAnimationFrame`、CSS `transform`／`transition` 皆為 Baseline Widely available。無支援缺口。**Fallback**：`prefers-reduced-motion: reduce` 時 `flip()` 在 mutate 後直接 return，磚瞬間到位，排序結果完全相同。

### 3. 拖曳排序（D 輸入與感測層，以 Pointer Events 自寫，非 HTML5 Drag & Drop）
**承載**：核心功能「排你自己的看板」。選用 Pointer Events 而非 HTML5 Drag & Drop 的理由是後者在觸控裝置上支援不穩、且無法自訂拖曳影像；Pointer Events 一套程式同時吃滑鼠、觸控與觸控筆。

**實作要點**：`pointerdown` 記錄起始索引；`pointermove` **掛在 `window` 上**（因為重排會替換／搬移節點，掛在容器上會在第一次重排後失去事件）；以 `document.elementFromPoint()` 找出游標下的磚並即時交換次序，再由 FLIP 補動畫。拖曳中的磚需 `touch-action:none`，否則行動裝置會把拖曳當成捲動。

**查證（MDN）**：Pointer Events（`pointerdown/move/up/cancel`、`setPointerCapture`）與 `document.elementFromPoint()` 皆為 Baseline Widely available，2020 年起跨瀏覽器；CSS `touch-action` 同為 Baseline。**Fallback**：每一塊磚下方另備「←／→」兩顆按鈕，可用鍵盤完成完全相同的重排；磚本身 `tabindex="0"`，Enter／Space 可翻面。沒有指標裝置的環境下功能完整。

### 效能預算實測
| 項目 | 門檻 | 本站 |
|---|---|---|
| 單頁大小（含 inline CSS/JS，不含 Google Fonts） | ≤350KB | index 37KB／race 24KB／board 91KB／join 27KB |
| 外部圖片、音檔 | 0 | 0（僅 Google Fonts 兩個字族） |
| 首屏 JS 執行 | ≤100ms | 首屏僅綁事件與一次 `duty()` 時鐘判斷，無版面計算 |
| 主要動畫 | 60fps | 全部動畫只改 `transform` 與 `opacity`，不觸發 layout；FLIP 為一 read 一 write |
| layout thrashing | 無 | FLIP 內 read／write 分離；接力翻面的 `getBoundingClientRect` 只在每 7.5 秒一次的批次中讀取 |

board.html 較大（91KB）的原因是十四塊磚的完整雙面 HTML 與資料被 inline 進頁面，讓使用者的每一次重排都不需要再向伺服器要任何東西。

---

## 十三、驗收

1. 遮掉全部文字看首屏，三秒內認得出「純黑底＋一個強調色＋大小不一的實色磚＋被切斷的細大字」＝ Metro。
2. 五個不可省略特徵在畫面上全部找得到。
3. 四種動效都在，且 `prefers-reduced-motion` 下資訊零損失。
4. 全站沒有一個圓角、一道陰影、一張照片、一個置中對齊。
5. 關掉 JavaScript，所有磚的正面資訊、全部表格與長文仍完整可讀。
