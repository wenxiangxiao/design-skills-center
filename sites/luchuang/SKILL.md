---
name: frutiger-aero-wet-dry
description: Frutiger Aero for the web, rebuilt around a single declared light source and one material axis — wet surfaces refract and take a shared specular highlight, dry surfaces never move; vertical sky-to-water gradients, mask-cut aqua gloss, depth-desaturated palettes and living things that lean toward the lamp.
---

# Frutiger Aero — 濕與乾

> 這份規格書描述的是 **Frutiger Aero**（約 2004–2013 年，Windows Vista／Aero、Wii、Adobe CS3–CS5、當時電信與消費電子的視覺語言；名稱來自 Adrian Frutiger 的人文主義無襯線體與 Windows「Aero」介面，於 2010 年代後期被回溯命名並成為可搜尋的設計流派）。
>
> 它不是 Y2K。Y2K（1998–2003）的本體是**鉻與金屬**：反射的是一個銀色的、沒有生命的環境。Frutiger Aero 的本體是**水、空氣與草**：反射的是一個濕的、有生命的環境。兩者都有光澤，但前者是硬的，後者是軟的；前者的色相是銀與酸色，後者的色相只有天空、水、草三族。
>
> 這份規格書與一般「Aero 教學」最大的不同：**它不教你加光澤，它教你決定哪一塊該濕。**

---

## 一、設計哲學

這個流派誕生於一個很具體的產業論述：二〇〇〇年代中期，作業系統、手機與消費電子想擺脫九〇年代「科技＝金屬＝冷」的形象，改成「科技是乾淨的、有機的、對人友善的」。所以介面開始下雨、長草、冒泡泡；按鈕不再是金屬片，而是一顆**濕的、半透明的、會反光的東西**。

於是它的所有視覺決策都可以被還原成兩個問題：

1. **光從哪裡來？**（答案永遠是：從上面，而且只有一盞。）
2. **這一塊是濕的還是乾的？**

大部分失敗的 Aero 復刻，是因為把第二題答成「全部都是濕的」。結果每一塊都在發亮、每一塊都在呼吸，畫面沒有前後、字沒有辦法讀。**真正的 Aero 一定有乾的東西**——Vista 的視窗玻璃是濕的，但視窗裡的文件是乾的；Wii 的選單球是濕的，但它底下的說明文字是乾的。

**一句話總結：濕的東西給人看，乾的東西給人讀。**

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一條，它就不是這個風格了。每一條都附可以直接複製的片段。

### 特徵一：只有一個光源，而且全站共用

三顆按鈕各自在正上方畫一個白橢圓，看起來就是三張貼紙。正確做法是**先宣告燈在哪裡，再讓每一個面自己算出高光該在哪一側、該多亮**。

```css
:root{
  --lx:50; --ly:-6;          /* 燈的位置：容器百分比座標，JS 只寫這兩個數 */
  --az:270deg; --near:.62;   /* 不支援三角函數時的靜態值 */
}
.wet{position:relative;overflow:hidden;isolation:isolate}
.wet::before{                     /* 朝光側的高光 */
  content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:radial-gradient(58% 52% at
      calc(50% + 32% * cos(var(--az)))
      calc(50% + 32% * sin(var(--az))),
    rgba(255,255,255,calc(.30 + .62*var(--near))) 0%,
    rgba(255,255,255,calc(.14 + .34*var(--near))) 34%,
    rgba(255,255,255,0) 68%);
}
.wet::after{                      /* 背光側被穿透的光染出的回色 caustic */
  content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(64% 58% at
      calc(50% - 30% * cos(var(--az)))
      calc(50% - 30% * sin(var(--az))),
    rgba(255,255,255,.26) 0%, rgba(255,255,255,0) 62%);
}
@supports (rotate: atan2(1,1)) and (width: hypot(1px,1px)){
  .wet{
    --az:atan2(calc(var(--ly) - var(--cy)), calc(var(--lx) - var(--cx)));
    --near:clamp(0, calc((84 - hypot(calc(var(--lx) - var(--cx)),
                                     calc(var(--ly) - var(--cy)))) / 84), 1);
  }
}
```

每個濕的元素只要在 HTML 上寫自己的中心座標：`style="--cx:36;--cy:52"`。**高光的方向與強度沒有一行 JavaScript 在算幾何。**

### 特徵二：濕的會位移，乾的不會

這是把「有光澤」升級成「有材質」的關鍵一步，也是幾乎沒有人做的一步。

隔著玻璃看水裡的東西，光線斜著進來會被折彎，所以水裡的東西看起來會往旁邊偏，而且**越深偏得越多**。用 Snell 定律（水的折射率 n = 1.33）直接寫成 CSS：

```css
.shift{
  --depth:0px;                                  /* 它在水面下多深 */
  --inc:0deg;
  transform:translateX(calc(var(--depth) * tan(asin(calc(sin(var(--inc)) / 1.33)))));
  transition:transform .12s linear;
}
.d1{--depth:9px} .d2{--depth:17px} .d3{--depth:27px}
@supports (rotate: atan2(1,1)){
  .shift{ --inc:clamp(-62deg,
      atan2(calc(var(--lx) - var(--cx)), calc(var(--cy) - var(--ly))), 62deg); }
}
```

`--depth:0` 就是乾的：它永遠不動。**規則寫死：任何必須被讀到的長文一律是乾的。**會晃的東西不能拿來讀。

### 特徵三：漸層永遠是垂直的，而且深處吃掉紅色

光從上面來，所以**所有漸層只能是垂直的**。對角漸層、放射狀底、紫藍漸層、彩虹漸層一律禁止——它們會立刻把畫面推回二〇一〇年代後期的 AI 預設品味。

大面積底色永遠是一條天空到水的垂直漸層：

```css
body{background:linear-gradient(180deg,
  #F2FAFF 0, #DFF3FF 24%, #9FD8F2 62%, #6FC2E4 100%) fixed;}
```

同時，**同一個顏色在不同深度必須用不同的色票**，而那組色票是算出來的不是調的：水對長波吸收快，所以越深越偏青、對比越低。一顆橘色的東西從貼著玻璃到五十公分深：

```
0cm #E8623A → 10cm #CE6446 → 20cm #AF6754 → 30cm #8D6A60 → 40cm #6C6C69 → 50cm #4E6C70
```

### 特徵四：光澤是「切」出來的，不是「畫」出來的

Aqua 鈕上那一道上弦月不是一個白色橢圓——它是**一個圓減去另一個圓**剩下的部分。用畫的，鈕一變寬月牙就走鐘；用切的，兩端會自然收成尖的，而且比例永遠對。

```css
button{
  position:relative;border-radius:999px;border:1px solid rgba(255,255,255,.85);
  color:#06334F;font-weight:700;padding:11px 22px;
  background:linear-gradient(180deg,#BEEBFF,#6CC6EE 48%,#2E86C1 49%,#1C6FA8);
  box-shadow:0 2px 0 rgba(255,255,255,.7) inset, 0 6px 14px rgba(15,76,117,.26);
}
button::before{
  content:"";position:absolute;left:6%;right:6%;top:6%;height:46%;
  border-radius:999px;background:rgba(255,255,255,.72);pointer-events:none;
  -webkit-mask-image:radial-gradient(120% 150% at 50% -34%,#000 62%,transparent 63%),
                     radial-gradient(150% 150% at 50% 190%,#000 62%,transparent 63%);
          mask-image:radial-gradient(120% 150% at 50% -34%,#000 62%,transparent 63%),
                     radial-gradient(150% 150% at 50% 190%,#000 62%,transparent 63%);
  -webkit-mask-composite:xor;  /* 舊語法 */
          mask-composite:exclude;
}
```

注意那一條 `48% / 49%` 的硬停點：Aqua 鈕的上下兩半之間是**一條刀切的邊**，不是漸變。少了它就變成一顆糖果，不是一顆濕的鈕。

### 特徵五：有機的東西必須真的朝著光

這個流派裡一定有一片葉子、一株草、一滴水、一顆泡泡。它們**不是裝飾貼圖**——它們必須知道燈在哪裡。一株朝著錯誤方向的草，會讓整個畫面立刻降格成素材拼貼。

```css
.lean{
  transform-box:fill-box; transform-origin:50% 100%;   /* 從自己的基部彎 */
  transform:rotate(clamp(-9deg, calc(var(--inc) * .17), 9deg));
  transition:transform .5s cubic-bezier(.3,.7,.3,1);
}
```

草的葉片本身只有一種筆畫：一條從基部往上、寬度由 1 收到 0.1、末端向光彎的**帶**（不是描邊）：

```svg
<!-- blade(h=120, w=18)：先左緣由下而上，再右緣由上而下，閉合 -->
<path d="M-9 0L-8.4 -10 … L0.9 -120L2.2 -120 … L9 0Z" fill="#6FBF3E"/>
<path d="M0 0L3.9 -120" fill="none" stroke="rgba(255,255,255,.30)" stroke-width="2.3"/>
```

泡泡同理：`radial-gradient(circle at 34% 28%, …)` 的那個 34%/28% 必須跟高光方向一致。

---

## 三、色彩系統

大面積底色是天空到水，**而且允許純白**——這是這個流派與絕大多數「去 AI 化」風格最大的分歧：白不是空，白是光。

| 角色 | 色票 | 比例 | 用途 |
|---|---|---|---|
| 天光白 | `#F2FAFF` | 12% | 頁面最上緣、面板底 |
| 淺天 | `#DFF3FF` | 14% | 漸層第二段、次階面 |
| 天水 | `#9FD8F2` | 16% | 漸層第三段、未選態 |
| 水藍 | `#2E86C1` | 13% | 主動作、連結、現用態 |
| 深水 | `#0F4C75` | 12% | 標題、深色面板、頁尾 |
| 純白 | `#FFFFFF` | 10% | 高光、1px 內緣、邊 |
| 草綠 | `#6FBF3E` | 8% | 生物、成功態、強調 |
| 深草 | `#2F7D2A` `#1F6B4A` | 6% | 深處的草、莫絲 |
| 砂 | `#E6DCC4` `#C2B594` | 5% | 底床、暖的那一點點 |
| 墨 | `#0D2231` `#3C5A6E` | 4% | 正文與次級文字 |

**硬規則**

- 零對角漸層、零放射狀大面積底、零紫藍漸層、零彩虹漸層。
- 色相只有三族：**天空（cyan–blue）、水（teal–deep blue）、草（yellow-green–green）**。第四個色相只能以「一隻魚」「一顆果」的尺度出現，面積上限 3%。
- 模糊（`blur`）只准用在**水面以下**（那是景深）與**毛玻璃導覽列**（`backdrop-filter`）。介面元件本身一律硬邊：陰影可以有，但要短、要實、要往下。
- 對比：正文只坐在白或淺天上（`#0D2231` 對 `#F2FAFF` 為 15.6:1）；深色面板上用 `#EAF6FD`（對 `#0F4C75` 為 9.4:1）。**絕不把正文放在水藍 `#2E86C1` 上**（對白只有 3.3:1）。

---

## 四、字體系統

這個流派的字是 **人文主義無襯線體**——Frutiger、Myriad、Segoe UI、Lucida Grande 那一族：開放的字腔、傾斜的終端、大的 x 高度、圓潤但不幼稚。

- 拉丁：`Mukta`（Ek Type，人文主義、開放字腔，Google Fonts 可取）；替代：Myriad Pro／Segoe UI／Lato。
- 漢字：`Noto Sans TC` 400／500／700。
- **不要用**：Helvetica 與 Akzidenz（太瑞士、太乾）、Futura（太幾何）、任何襯線體（Aero 沒有襯線）、任何等寬體（那是終端機不是水）。

| 階 | 字級 | 字重 | 行高 |
|---|---|---|---|
| 標題 H1/H2 | `clamp(21px,3.2vw,31px)` | 700 | 1.2 |
| 副標（全大寫小字） | 11.5px，`letter-spacing:.26em` | 400 | 1.4 |
| 正文 | 16px | 400 | **1.75**（水要有空間） |
| 註 | 13.5px | 400 | 1.75 |

`letter-spacing:-.005em` 給標題，`letter-spacing:.26em` 給那一行全大寫的英文副標——這一對比例是 Aero 的招牌：**巨大的字下面永遠壓一行拉得很開的小字。**

---

## 五、版面與網格

- 內容寬 **1120px**，左右 18px。沒有硬網格——這個流派的版面是**層**不是格：天（導覽）／水（主內容）／砂（頁尾）。
- 面板 `border-radius:16px`；按鈕 `999px`；缸體與圖片 `2px`（玻璃沒有圓角）。**圓角有下限沒有上限**——除了玻璃本身，不准出現直角。
- 面板之間 20px，段落之間 18px。這個風格**可以留白**（與大多數裝飾流派相反），因為白就是光。
- 深度分層是版面的骨：任何一個畫面，你都要能指出哪一塊是乾的（不動、可讀）、哪一塊是濕的（會動、好看）。**兩者不得在同一個矩形裡混用。**

---

## 六、元件配方

**導覽（吸盤列）**：毛玻璃條 + 圓角膠囊。未選的是「靠在玻璃上」（中間還有一層水膜與兩顆氣泡）；現用的是「吸住了」（中間的空氣被擠光，整片貼平、變深、邊緣一圈被壓出去的水）。

```css
.rail{position:sticky;top:0;backdrop-filter:blur(9px);
  background:linear-gradient(180deg,rgba(255,255,255,.86),rgba(233,246,253,.72));
  border-bottom:1px solid rgba(255,255,255,.9);box-shadow:0 8px 20px rgba(15,76,117,.14)}
.rail a{border-radius:999px;color:#31596F;font-weight:700;text-align:center;padding:13px 6px 12px;
  background:radial-gradient(70% 62% at 50% 26%,rgba(255,255,255,.96),
             rgba(214,233,243,.86) 62%,rgba(178,209,226,.9));
  box-shadow:0 1px 0 rgba(255,255,255,.95) inset,0 4px 10px rgba(15,76,117,.16)}
.rail a::after{                       /* 沒吸住：水膜與氣泡 */
  content:"";position:absolute;left:18%;right:18%;top:22%;height:44%;border-radius:999px;
  background:radial-gradient(circle at 26% 34%,rgba(255,255,255,.95),rgba(255,255,255,.08) 52%),
             radial-gradient(circle at 72% 62%,rgba(255,255,255,.8),rgba(255,255,255,.06) 46%)}
.rail a[aria-current=page]{           /* 吸住了 */
  color:#08405F;background:radial-gradient(72% 66% at 50% 34%,#9FD8F2,#4FA6D4 66%,#2E86C1);
  box-shadow:0 0 0 3px rgba(255,255,255,.9) inset,0 1px 3px rgba(15,76,117,.4)}
.rail a[aria-current=page]::after{background:none}
```

> 無障礙：吸住／沒吸住對輔助科技不可見，所以現用項**必須同時帶 `aria-current="page"`**。

**面板**：`rgba(255,255,255,.82)` + `1px` 純白邊 + 一條 `inset` 白線 + 一層長而淡的藍陰影。深色面板用垂直的水藍→深水漸層。

**表格**：`1px solid rgba(15,76,117,.18)` 底線，表頭深水色，數字欄 `font-variant-numeric:tabular-nums`。

**頁尾**：深水漸層，等於「砂」那一層——整個頁面就是一缸水，讀到底就到底了。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可：

| 類型 | 是什麼 | 觸發 | 時值 |
|---|---|---|---|
| 環境 ambient | 氣泡上升（每顆自己的週期與相位、途中左右各晃一次） | 不需輸入 | 4.2–9.6s，`linear`，`infinite` |
| 輸入 input-driven | 指標＝燈：所有濕面的高光方向與強度即時重算 | `pointermove` | < 100ms（rAF 內一次寫入，零版面讀取） |
| 轉場 transition | 換頁像沉下去再浮上來 | 導覽 | 0.32s / 0.34s |
| 簽名 signature | **折射位移**：燈一動，水裡的東西整體錯開，越深錯得越多；玻璃外的完全不動 | 光源位置 | 0.12s `linear` |

```css
@view-transition{navigation:auto}
::view-transition-old(root){animation:sink .32s ease-in both}
::view-transition-new(root){animation:surface .34s cubic-bezier(.2,.8,.4,1) both}
@keyframes sink{to{opacity:0;transform:scale(.985) translateY(10px)}}
@keyframes surface{from{opacity:0;transform:scale(1.012) translateY(-10px)}}
```

**降級（`prefers-reduced-motion: reduce`）**：氣泡停在原地（仍然在，仍然是泡泡）；燈直接停在正中央；折射位移與草的傾角**仍然成立，只是不再過渡**；View Transition 關閉。**四種都降級，而且資訊零損失**——因為所有內容都是靜態 HTML，動效只承載材質，不承載資訊。

---

## 八、插畫與圖像風格

零外部圖片。三個原語，不允許第四種：

1. **濕體**：任何形＝本體色（半透明、垂直漸層）＋ 朝光側硬邊高光 ＋ 背光側回色。判準：每一個形都指得出它的高光在哪一側，而且**全站所有高光指向同一個光源**。
2. **水**：只由「垂直的顏色吸收」與「氣泡」組成。**沒有波紋貼圖、沒有 `feTurbulence`、沒有雜訊**——水的質感來自深度，不是來自紋理。體積光只能是硬邊的直線光錐（`fill-opacity` 0.09–0.10）。
3. **生物**：只有一種筆畫（上面的 `blade`），而且末端朝光。魚只由三塊組成：身、尾、一道白色的背高光。

**明文禁用**：照片、水滴／泡泡素材圖、鏡頭光暈素材、半調網點、細線幾何線描、任何做舊濾鏡、任何金屬漸層（那是 Y2K）、任何 `filter: drop-shadow` 的發光。

---

## 九、Logo 與 Favicon

Logo 的邏輯：**一個裝著東西的透明矩形**（視窗／缸／水滴都是同一個母題）＋ 右邊一組「大字＋拉開的小字」。

- 矩形 `rx:6`，內填天空到水的垂直漸層，上半覆一層白到透明的 `url(#g2)` 當玻璃，外描 3px 純白。
- 裡面放三筆草與一顆泡泡（不同大小的白色半透明圓）。
- Favicon 用同一個母題縮到 32×32：`rx:6` 的水、一道砂、兩筆草、一顆白泡、頂上一條白色水面線。全部 inline SVG data URI，零外部請求。

---

## 十、Do & Don't

**Do**

- 先決定燈在哪裡，再做任何一個元件。
- 每一個元素都要能回答「我是濕的還是乾的」。
- 長文、表格、價目一律放在乾的那一層。
- 漸層垂直、高光同源、圓角有下限。
- 允許大面積純白——白是光不是空。

**Don't**

- 不要整頁都是濕的。沒有乾的東西就沒有深度，也沒有可讀性。
- 不要對角漸層、紫藍漸層、彩虹漸層。
- 不要用模糊陰影堆疊做「立體感」——模糊只屬於水面以下。
- 不要放一張水滴照片或光暈素材。要有水滴就自己畫，而且高光要跟其他東西同向。
- 不要用鉻、不要用銀、不要用金屬拉絲——一有金屬，它就變成 Y2K。
- 不要用襯線體、不要用等寬體、不要用 Helvetica。
- 不要讓草朝著錯的方向。

---

## 十一、頁面骨架範例

```html
<body>
  <nav class="rail" aria-label="主導覽"><ul>
    <li><a href="a.html" aria-current="page">缸面<i>THE TANK</i></a></li>
    <li><a href="b.html">水與光<i>WATER &amp; LIGHT</i></a></li>
  </ul></nav>

  <main>
    <!-- 濕的那一層：容器負責持有光源，子元素各自宣告中心與深度 -->
    <div class="tank lit" style="container-type:inline-size">
      <div class="lamp" aria-hidden="true"><b></b></div>
      <svg viewBox="0 0 1200 800"><!-- 水、砂、石、草(.lean)、魚 --></svg>
      <div class="bubs" aria-hidden="true"><!-- .bub ×26 --></div>

      <div class="p dry shift" style="--cx:16;--cy:11">營業時間・電話（乾：永遠不動）</div>
      <div class="p wet shift d2" style="--cx:23;--cy:35">價目牌（濕：會晃）</div>
      <div class="p shift d3"     style="--cx:50;--cy:90">壓在砂上的地址（最深）</div>
      <div class="glassbox"></div>
    </div>

    <!-- 乾的那一層：所有要讀的東西 -->
    <div class="wrap"><div class="panel"><h2>標題<i>SUBHEAD</i></h2><p>正文…</p></div></div>
  </main>

  <footer>…</footer>
  <script>
    // JavaScript 只做一件事：把指標的位置寫成兩個數。幾何全部在 CSS 裡。
    var lits=[].slice.call(document.querySelectorAll('.lit')),rects=[];
    function measure(){rects=lits.map(function(el){return el.getBoundingClientRect()})}
    function put(x,y){for(var i=0;i<lits.length;i++){var r=rects[i];if(!r||!r.width)continue;
      lits[i].style.setProperty('--lx',((x-r.left)/r.width*100).toFixed(1));
      lits[i].style.setProperty('--ly',((y-r.top)/r.height*100).toFixed(1));}}
    measure(); addEventListener('resize',measure,{passive:true});
    addEventListener('scroll',measure,{passive:true});
    var px=0,py=0,pend=0;
    addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;
      if(!pend){pend=requestAnimationFrame(function(){pend=0;put(px,py)})}},{passive:true});
  </script>
</body>
```

---

## 十二、技術實作與相容性

本站的三項核心技術、查證來源、fallback 具體行為與效能實測值。

### (1) CSS 三角函數 `atan2()` / `sin()` / `asin()` / `tan()` / `hypot()`　［C 版面與樣式層］

**承擔什麼**：特徵一（高光方向與強度）、特徵二（Snell 折射位移）、特徵五（草的傾角）。整站的幾何完全在 CSS 裡算，JavaScript 只負責把指標座標寫成 `--lx` / `--ly` 兩個數字。

**支援現況（2026-09 查證）**：`sin() cos() tan() asin() acos() atan() atan2()` 屬 **Baseline 2023**，自 Chrome 111／Safari 15.4／Firefox 108 起三引擎齊備；`atan2()` 在 MDN 標為 *Baseline Widely available*，自 2023 年 3 月起跨瀏覽器可用。`pow() sqrt() hypot() log() exp()` 為同一批 CSS Values 4 數學函式。
查證來源：web.dev《Trigonometric functions in CSS》、web.dev《Baseline 2023》、caniuse `wf-trig-functions`、MDN `atan2()`。

**fallback 具體行為**：整段動態計算包在 `@supports (rotate: atan2(1,1)) and (width: hypot(1px,1px))` 內。不支援時 `--az` 停在 `270deg`（燈在正上方）、`--near` 停在 `.62`、`--inc` 停在 `0deg`。結果：高光仍然存在、仍然全站同向（正上方）、按鈕與面板外觀不變；只有「跟著指標走」與「折射位移」不發生。**資訊零損失**——這兩者只承載材質。

### (2) CSS 遮罩合成 `mask-composite: exclude` / `intersect`　［A 渲染層］

**承擔什麼**：特徵四。Aqua 鈕的上弦月高光＝一個大圓的遮罩「排除」另一個圓的遮罩後剩下的部分，所以月牙隨元件尺寸自動變形、兩端自然收尖。

**支援現況（2026-09 查證）**：`mask-composite` 為 **Baseline 2023**（2023 年 12 月起 newly available）；無前綴 `mask` 相關屬性為 Chrome 120+／Edge 120+／Firefox 53+／Safari 15.4+／iOS Safari 15.4+／Samsung Internet 25+。WebKit 舊語法的值不同（`xor` ↔ `exclude`、`source-in` ↔ `intersect`），必須**兩套都寫**。
查證來源：caniuse `mdn-css_properties_mask-composite`、MDN `mask-composite`。

**fallback 具體行為**：不支援時 `mask-image` 兩層會以預設的 `add` 合成，高光退化成一個完整的圓角白色橫條——仍然是一顆有光澤的鈕，只是月牙變成方的。另外對 `.band` 類的格狀遮罩加了 `@supports not (mask-composite: intersect)` 的覆寫，改用單層條紋漸層直接畫，不留空白。

### (3) View Transitions API（跨頁 `@view-transition` ＋ 同頁 `document.startViewTransition()`）　［B 動效與時間軸層］

**承擔什麼**：轉場動效。四個頁面之間的「沉下去／浮上來」是純 CSS 的跨文件轉場，零 JavaScript；認養單開出來時的重繪用同頁轉場（FLIP 免寫）。

**支援現況（2026-09 查證）**：同文件（same-document）轉場為 **Baseline Newly available**，Chrome 111+／Edge 111+／Safari 18+／Firefox 144+（Firefox 144 帶來 `document.startViewTransition()` 與 `view-transition-name`）。跨文件（cross-document, MPA）轉場 2026 年中已在 Chrome／Edge／Opera／Firefox 可用，Safari 仍在實作中。
查證來源：web.dev《Same-document view transitions have become Baseline Newly available》、caniuse `view-transitions`、MDN `ViewTransition`。

**fallback 具體行為**：`@view-transition` 是 at-rule，不支援的瀏覽器直接忽略整條 → 換頁就是一般換頁。同頁轉場以 `if (document.startViewTransition) {...} else {...}` 特徵偵測，不支援時直接呼叫同一個重繪函式。兩者都不影響任何內容。`prefers-reduced-motion: reduce` 時另以 `::view-transition-old/new(root){animation:none}` 關閉。

### （附註，非核心技術）

`backdrop-filter: blur(9px)`（毛玻璃導覽列；不支援時退成半透明白，可讀性不變）、`container-type: inline-size` 與 `cqw`（缸面上的字隨缸縮放）、`aspect-ratio`、`transform-box: fill-box`（讓 SVG 的草從自己的基部彎）、`history.replaceState` 的狀態序列化 `?yang=`（防禦性解析：缸長／缸齡／魚三個欄位都比對白名單，品項代碼限 a–l，任何不合一律丟掉）。全站不使用 `localStorage` 或任何儲存。

### 效能預算實測

| 項目 | 實測 |
|---|---|
| 單頁大小（含全部 inline CSS/SVG/JS） | index 51.9 KB／shui 34.1 KB／yang 30.1 KB／dian 19.7 KB（門檻 350 KB） |
| index 壓縮後 | 約 17 KB |
| 外部請求 | 僅 Google Fonts 兩支；**零外部圖片、零外部腳本、零圖片檔** |
| 建置期 SVG 產生（Node 22） | 約 2.0 ms／缸 |
| 執行期每次 `pointermove` | 一次 `requestAnimationFrame`、寫入 2 個自訂屬性 × `.lit` 容器數（本站 1–4 個）；**`getBoundingClientRect()` 只在 load／resize／scroll 時取，pointermove 內零版面讀取 → 無 layout thrashing** |
| 主要動畫 | 氣泡為 `transform`／`opacity`（合成層）；折射位移為 `transform`；草為 `rotate`。**沒有任何動畫觸及版面屬性。** |
| 首屏 JS | 量測 + 綁三個事件，< 1 ms（無迴圈、無幾何運算） |

---

*此 SKILL.md 描述的是風格，不綁定產業。示範站是一間水草缸專門店，但同一套規格可以直接拿去做作業系統介面、兒童教育平台、飲用水或空氣品質服務、健身房、游泳池、或任何想主張「科技是乾淨的、有機的、對人友善的」的產品。*
