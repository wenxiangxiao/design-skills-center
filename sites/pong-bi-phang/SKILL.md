---
name: rubber-hose-two-strip-cartoon
description: 1920s–30s American rubber hose animation rendered as a website — jointless hose limbs with four-finger white gloves, pie-cut eyes, everything squashing on one shared beat at 12 fps "on twos", a two-strip Technicolor palette with no true blue or yellow, film-gate grain, title-card lettering and iris transitions.
---

# 橡皮管動畫 Rubber Hose Animation × 雙色 Technicolor｜規格書

> 範例站：磅米芳 PŌNG BÍ-PHANG（彰化埤頭爆米香代磅所，虛構）。這份規格不綁產業：任何「有節奏、有動作、會發出一聲」的品牌都適用——麵包店的出爐鈴、洗衣店的脫水、樂器行、遊樂園、早餐店。

---

## 一、設計哲學

**橡皮管動畫**是 1920 年代到 1930 年代中期美國劇場卡通短片的主流畫法。一般把它歸功於 Bill Nolan（他在 1922–24 年把 Felix 的身體改圓、讓動作更順也更好畫），Fleischer 的《Out of the Inkwell》（1921–26）是早期例子，到 1930 年代中期幾乎每一家片廠都在用；Disney 在 1930 年代後期刻意轉向寫實與全動畫，這個畫法就退場了。2017 年的遊戲讓它重新被認出來，但它從來不是「復古濾鏡」，而是**一組生產限制的產物**：

| 限制 | 長出來的視覺 |
|---|---|
| 一個人一週要畫好幾千張 | 四肢沒有關節，畫一條彎曲的管子就好；手畫成手套，省得每張都畫指節 |
| 黑白片、明暗只能靠墨 | 角色身體一律墨黑平塗，臉留白；眼睛畫成黑瞳挖一刀白（派切眼）才看得見方向 |
| 有聲片（1928 起）要對嘴對拍 | 全世界跟著曲子彈跳——樹、房子、雲都在拍子上擠壓伸展（後來叫 Mickey-Mousing） |
| 每秒 24 格但只畫 12 張 | 「一拍兩格 on twos」：動作是一格一格跳的，不是順滑補間 |
| 雙色 Technicolor（約 1929–1934 的彩色片）只有紅與綠兩道 | 色域裡沒有真正的藍與黃：藍變成藍綠，黃變成橙；畫面是紅橙／藍綠／膚色／米 |

本規格的口訣：**一條管子、一雙手套、一個拍子、兩道顏色、一個光圈。**它是熱鬧的，但熱鬧有紀律——所有東西在**同一個**拍子上動。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「可愛的扁平插畫」，不再是橡皮管卡通。

### 特徵 1・橡皮管四肢＋四指白手套

手腳是**等粗、無關節**的單條曲線，端點圓頭；長度固定，所以手靠近肩膀時管子會彎成弧，拉遠時會繃直、變細（體積守恆）。手一律是白手套：三指＋拇指、袖口一圈、手背三道縫線。

```js
/* 定長二次貝茲：給肩 a、手 b、管長 L，二分法找控制點讓弧長＝L */
function qlen(ax,ay,cx,cy,bx,by){let l=0,px=ax,py=ay;for(let i=1;i<=10;i++){const t=i/10,u=1-t,
  x=u*u*ax+2*u*t*cx+t*t*bx,y=u*u*ay+2*u*t*cy+t*t*by;l+=Math.hypot(x-px,y-py);px=x;py=y}return l}
function hose(ax,ay,bx,by,L,side){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1e-6,
  mx=(ax+bx)/2,my=(ay+by)/2,nx=-dy/d*side,ny=dx/d*side;if(d>=L)return [mx,my];
  let lo=0,hi=L;for(let k=0;k<14;k++){const h=(lo+hi)/2;qlen(ax,ay,mx+nx*h,my+ny*h,bx,by)<L?lo=h:hi=h}
  return [mx+nx*lo,my+ny*lo]}
// path.setAttribute('d',`M${a} Q${c} ${b}`); stroke-width = 10*sqrt(L/max(L,d)); stroke-linecap:round
```

```svg
<!-- 白手套（原點在腕、朝 -y；再 rotate 到管子切線方向） -->
<g fill="#F1E4CB" stroke="#1B1612" stroke-width="3" stroke-linejoin="round">
  <rect x="-12.5" y="-44" width="9" height="30" rx="4.5"/><rect x="-4.5" y="-48" width="9" height="30" rx="4.5"/>
  <rect x="3.5" y="-44" width="9" height="30" rx="4.5"/><rect x="-25" y="-28" width="9" height="20" rx="4.5" transform="rotate(-40 -17 -20)"/>
  <circle cx="0" cy="-20" r="14"/><rect x="-13" y="-8" width="26" height="11" rx="5"/>
</g>
<path d="M-5 -27v10M0 -27v10M5 -27v10" stroke="#1B1612" stroke-width="2" stroke-linecap="round"/>
```

### 特徵 2・派切眼＋墨黑身體

角色身體墨黑平塗；眼睛是米白橢圓眼眶＋黑瞳，黑瞳**挖掉一個楔形**（像被切掉一片的派）。瞳孔位置就是角色的注意力——跟著游標走。嘴是一塊紅、外框米白。

```svg
<ellipse cx="0" cy="0" rx="19" ry="26" fill="#F1E4CB" stroke="#1B1612" stroke-width="3"/>
<g transform="translate(0 4)"><ellipse rx="10.5" ry="16" fill="#1B1612"/>
  <path d="M0 0 L1.6 -16.8 L11 -7.2 Z" fill="#F1E4CB"/></g>
```

### 特徵 3・全世界踩同一拍（on twos）

頁面上所有東西——字、導覽、商品、地圖上的小鍋——都在**同一個 BPM** 上擠壓伸展，且**每秒只換 12 格**。拍點落地（壓扁）、拍間騰空（拉長），`scaleX = 1/scaleY` 體積守恆。不准每個元素各跳各的、不准 60fps 順滑。

```css
@property --bob{syntax:'<number>';inherits:true;initial-value:0}
.bob {transform-origin:50% 100%;
  transform:translateY(calc(var(--bob)*-5px)) scale(calc(1/(1 + var(--bob)*.06)),calc(1 + var(--bob)*.06))}
.bob3{/* 反拍：用 1 - var(--bob) */}
```
```js
// 主迴圈：f = floor(t*12) 變了才寫 --bob；拍相位來自聲卡時鐘（有聲）或 performance.now()（無聲）
const ph = ((now - t0) / (60/bpm)) % 1, bob = Math.sin(Math.PI*ph) ** 2;
document.documentElement.style.setProperty('--bob', Math.round(bob*100)/100);
```

### 特徵 4・雙色 Technicolor 色域＋片門

只有五色：墨、賽璐珞米、二色紅（紅橙）、二色藍綠、膚。**禁純藍、禁檸檬黃、禁紫、禁漸層、禁模糊陰影**——雙色片拍不出來。整頁裝在一個圓角片門裡，上面有底片顆粒（4 張噪聲磚 steps 換磚）、每 1/12 秒的亮度閃爍、1px 的片框游移。

```css
.gate{position:fixed;inset:0;pointer-events:none;border:14px solid #1B1612}
.gate::before{content:"";position:absolute;inset:0;border-radius:38px/30px;box-shadow:0 0 0 40px #1B1612}
.flick{position:fixed;inset:0;background:#1B1612;opacity:0;animation:flick 1.5s steps(1) infinite}
@keyframes flick{8%{opacity:.035}17%{opacity:0}75%{opacity:.045}83%{opacity:0}}
.weave{animation:weave 2s steps(1) infinite}
@keyframes weave{12%{transform:translate(0,1px)}25%{transform:translate(1px,0)}50%{transform:translate(0,-1px)}}
```

### 特徵 5・片頭卡字＋iris 光圈

標題是胖圓體（拉丁 Titan One、中文 Huninn 粉圓），**紅或藍綠字面＋墨色外框＋右下硬影**，放在放射光芒或緞帶 banner 上；頁與頁、片頭與劇終之間一律用**圓形光圈**開合，收到滑鼠點的那一點。

```css
.card-t{font-family:"Titan One","Huninn",sans-serif;color:#D4502F;
  -webkit-text-stroke:3px #1B1612;paint-order:stroke fill;text-shadow:4px 5px 0 #1B1612}
@property --iris{syntax:'<length>';inherits:false;initial-value:0px}
.iris{position:fixed;left:var(--ix);top:var(--iy);width:calc(var(--iris)*2);height:calc(var(--iris)*2);
  margin:calc(var(--iris)*-1) 0 0 calc(var(--iris)*-1);border-radius:50%;box-shadow:0 0 0 300vmax #1B1612}
.iris.out{animation:irisOut .62s cubic-bezier(.6,0,.9,.5) forwards}
@keyframes irisOut{from{--iris:150vmax}88%{--iris:14px}to{--iris:0px}}
```

---

## 三、色彩系統

| Token | Hex | 用途 | 面積 |
|---|---|---|---|
| `--cel` 賽璐珞米 | `#F1E4CB` | 頁底、手套、眼眶、卡片 | ~45% |
| `--ink` 墨 | `#1B1612` | 角色身體、外框、硬影、片門、頁尾 | ~25% |
| `--teal` 二色藍綠 | `#2F8C83` | 天空、光芒、段落底、次要按鈕 | ~14% |
| `--red` 二色紅 | `#D4502F` | 標題字面、主要按鈕、嘴、火 | ~10% |
| `--peach` 膚 | `#EDB38A` | 火心、強調小字、判定「準」 | ~3% |
| `--cel2` 舊米 | `#E3CDA6` | 插畫底、米袋 | ~2% |
| `--teald`／`--redd` | `#1E5F59`／`#9E3420` | 緞帶摺邊、光芒暗條（同色相壓一階，非漸層） | <1% |
| `--sepia` | `#7E6A55` | 鍋箍、失敗判定 | <1% |

規則：所有「暗面」都是**另一個平塗色**，不是透明疊黑；光芒用 `repeating-conic-gradient` 的**硬停點**（兩色之間零過渡）。

## 四、字體系統

- 標題：**Titan One**（Google Fonts）＋**Huninn 粉圓**（justfont 開源圓體，Google Fonts 有收）。H1 `clamp(84px,15vw,200px)`、H2 `clamp(34px,5.4vw,64px)`，字距 .02–.04em，行高 1。
- 內文：Huninn 17px／1.75。
- 小標 kicker：Titan One 13px、字距 .22em、全大寫拉丁，藍綠。
- motion-library 文字元件畫的是 Unbounded 800，只用拉丁字（PŌNG!／MENU），以 `&text=` 子集載入。

## 五、版面與網格

- 最大寬 1180px，左右 34px（手機 20px）。版面是**片頭卡＋底片條**：首屏一張卡、說明放進帶齒孔的黑色底片條（每格一個動作）。
- 卡片圓角用 **橢圓角**（`30px/24px`），像賽璐珞片框；按鈕全圓。
- 外框一律 3px 墨線＋右下 4–6px 硬影。
- 斜置：緞帶 −3°、價格牌 −4°、「碰！」字卡 −8°；其餘水平。

## 六、元件配方

- **導覽「緞帶展開 banner-unfurl」**：每頁一條緞帶（左右各一個燕尾摺邊），非現用頁**捲起只露一個字**（max-width 46px），現用頁整條展開成紅色並露出「開演・THE SHOW」；hover 打開一半。展開以 `steps(4)` 跳格。≤860px 移到底部一列。
- **按鈕**：全圓、紅底米字、3px 墨框、硬影；hover 時 `--sq` 由 0 → 1（橫向胖 8%、縱向扁 8%），按下 −1.4（反向擠壓），以 `@property --sq` 讓 transition 能補間，曲線 `cubic-bezier(.3,1.8,.5,1)` 回彈。
- **卡片（.prod）**：米底、橢圓角、上方一張小插畫；hover 時插畫跳起來（steps(3)）。
- **表單**：輸入框全圓、米底墨框；放在墨底面板上。
- **頁尾**：墨底米字三欄，最下一行虛構聲明與建置模型。

## 七、動效規則

全站四種自製動效，每一種都有 `prefers-reduced-motion` 降級且資訊零損失：

| 類型 | 本站實作 | 觸發 | 時值 | 降級 |
|---|---|---|---|---|
| ambient 環境 | **同拍彈跳＋底片**：`--bob` on twos 寫入；顆粒 1s steps(1)、閃爍 1.5s、片框游移 2s | 時間（聲卡時鐘或 performance.now） | 112 BPM 起；12 fps | 全部停住 |
| input 輸入 | **橡皮管伸手＋派切眼追游標**：右手在 420 單位內會伸向游標（彈簧 k=120、c=14），瞳孔偏向游標；按鈕 `--sq` 擠壓 | pointermove／hover／active | ≤83ms（一拍兩格） | 手回舞步定格、瞳孔置中 |
| transition 轉場 | **iris 光圈**：點連結時黑幕從點擊處收成一點（.62s），下一頁從中心張開（.7s） | 站內連結 click | 見上 | 直接換頁 |
| signature 簽名 | **「碰！」全頁 take**：以鍋蓋為圓心的衝擊波，每個元素依距離延遲 d/1.7 ms，做 預備蹲（scale 1.12/.86）→ 彈起拉長（−34px、1.16）→ 落地壓扁 → 小回彈；同時 70 顆米粒仔噴發、重力彈跳；畫面抖四格 | 每天 :00 :20 :40 倒數歸零／「碰一下！」／遊戲開花 | 620ms＋延遲 | 只顯示「碰！」字卡，宣讀於 aria-live |

自我限制：**禁止淡入**（卡通沒有淡入，只有 iris 與硬切）；跳跳球是唯一每幀更新的東西（它是判拍依據），其餘自製動畫一律 on twos。

### motion-library 元件表（PLAYBOOK §2.8；motion-library 1.12.0 @61e24ce；重現：`MotionLib.prompt(id)`）

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-23 | Comic Sky | index | colors {primary #2F8C83, secondary #F1E4CB, bg #1B1612}, duration 16, density .8, intensity 1, seed 1953, 1:1 cover | ambient | 片頭卡背後的放射光芒＋墨線卡通雲——1930 年代片頭卡的 sunburst；平塗、無漸層，雲是墨描邊 |
| TXT-B-18 | Letter Bounce | index | text "PŌNG!", primary #D4502F, secondary #2F8C83, bg #F1E4CB, duration 1.8, loop:false, 16:9 | transition（進視窗一次） | 「怎麼磅」段標的字母一個個掉下來、落地壓扁——正是 Fleischer 片頭字的彈跳 |
| BG-A-32 | Shock Lines | pong | primary #D4502F, secondary #1B1612, bg #F1E4CB, duration 6, density .7, seed 8, 1:1 cover | ambient | 場記單背後的爆炸放射楔形——卡通「碰」的衝擊線；實心楔形、零模糊 |
| SHP-19 | Bubble Pop | pong | primary #F1E4CB, secondary #D4502F, bg #2F8C83, duration 2.4, density 1, intensity 1.1, seed 16, 16:9 | ambient | 米花一顆顆脹大再爆開——產品本身的動作；圓形＋米／紅兩色 |
| TXT-A-06 | Stretch Pop | menu | text "MENU", primary #D4502F, secondary #2F8C83, bg #F1E4CB, duration 1.4, loop:false, 16:9 | transition（進視窗一次） | 字被拉長再彈回原形——橡皮管的伸縮原理直接作用在字上 |
| BG-B-19 | Line Burst | visit | primary #D4502F, secondary #2F8C83, bg #F1E4CB, duration 3.2, density .9, seed 418, 1:1 cover | ambient | 「歡迎光臨」招牌後方往外噴的短線，像米花剛碰開；圓頭短線與橡皮管同一種筆觸 |

掛載方式：子集 inline 為每頁第一個 `<script>`（ml-embed＋motion-player）；站內包裝 `PB.ml()` 等字型（含 `document.fonts.load('800 60px Unbounded', text)`）就緒才掛、離屏 `destroy()`、一次性文字 `loop:false`、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格

- **hose-rig 橡皮管骨架生成**：角色由程式組裝——身體一個橢圓、眼睛 `pieEye()`、四肢 `hose()`、手 `glove()`、鞋一個墨橢圓＋米色高光弧。四肢每格重算，不存靜態路徑。
- 物件擬人：鍋、米粒、米袋都可以有派切眼；人類角色以剪影帶過，不畫寫實五官。
- 一切平塗；高光只能是一道米色短弧（鞋、鍋蓋）；陰影只能是腳下一塊墨橢圓。
- **不得**畫任何既有卡通角色（老鼠、貓、兔子、杯子人……）或其可辨識特徵組合；角色必須從產業本身長出來（本站是一台鑄鐵爆米香鍋）。

## 九、Logo 與 Favicon

- Logo：藍綠放射圓牌（八道墨光芒）中間一顆墨黑鍋臉（派切眼、紅嘴、右側鍋蓋），下方紅緞帶「PŌNG!」。
- Favicon：墨圓＋兩顆派切眼＋紅嘴，inline SVG data URI。

## 十、Do & Don't

**Do**
- 先定一個 BPM，讓所有動畫都從同一個時鐘拿拍子；有聲音就用 `AudioContext.currentTime` 當主鐘。
- 四肢用 stroke 畫、長度固定；拉長就變細。
- 每一個「暗」都換成另一個平塗色。
- 讓使用者觸發一次「全頁 take」——那是這個風格最好玩的地方。

**Don't**
- 不要用漸層、模糊陰影、玻璃、發光；不要用純藍 #0000FF 系、檸檬黃、紫。
- 不要讓手肘、膝蓋出現折角。
- 不要 60fps 順滑補間（跳跳球除外）；不要淡入。
- 去AI化禁令照舊：禁紫藍漸層 hero、禁置中三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。
- 不要畫任何既有卡通角色或其服裝組合（紅短褲＋兩顆鈕扣等）。

## 十一、頁面骨架範例

```html
<div class="gate" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div><div class="flick" aria-hidden="true"></div>
<header class="top">
  <a class="brand" href="index.html">…logo…<b>店名</b></a>
  <ul class="ribs">
    <li><a class="rib bob" href="index.html" aria-current="page"><span class="band"><i>開</i><em>開演・THE SHOW</em></span></a></li>
    <li><a class="rib bob3" href="menu.html"><span class="band"><i>芳</i><em>目錄・MENU</em></span></a></li>
  </ul>
</header>
<main class="weave">
  <section class="card burst">
    <div class="mlbg" id="sky" aria-hidden="true"></div>
    <span class="reel bob2">A ○○ CARTOON・REEL ONE</span>
    <h1 class="card-t bob">店名</h1>
    <div class="banner bob3"><b>一句招牌</b></div>
    <div id="hero"><!-- PB.Pong(host) 或你自己的 hose-rig 角色 --></div>
  </section>
  <section class="sec tlb"><div class="strip"><div class="frames"><article class="frame">…</article></div></div></section>
</main>
```

---

## 十二、技術實作與相容性

| 技術 | 層 | 在本站承載什麼 | 支援現況（查證） | 不支援時 |
|---|---|---|---|---|
| `requestAnimationFrame` 彈簧阻尼積分＋定長貝茲 hose rig | B | 特徵 1、3：四肢弧長約束、手追游標、全站 on twos 主迴圈 | rAF 全面支援（MDN） | 無 JS：角色不出現，`<noscript>` 一句話代替；所有文字與價格都在 HTML |
| CSS `@property` 型別化自訂屬性（`--iris <length>`、`--sq <number>`、`--bob <number>`） | B | 特徵 5 的 iris 光圈能用 CSS 動畫補間；按鈕擠壓能 transition | MDN：Baseline 2024（Chrome/Edge 85、Firefox 128、Safari 16.4） | 未註冊的自訂屬性無法補間：iris 直接跳到終值（等於硬切換頁）、按鈕擠壓變成瞬間 |
| Web Audio 合成＋lookahead 排程（使用者手勢啟動） | D | oom-pah 兩拍子配樂、音效；**聲卡時鐘＝全站主拍**，遊戲判拍扣除 `outputLatency`／`baseLatency` | AudioContext 全面支援；`outputLatency` 不支援時退用 `baseLatency` 或 0 | 沒聲音：改用 `performance.now()` 當拍子，畫面與遊戲照常 |

查證來源：MDN `@property`（developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@property，Baseline 2024 newly available）；MDN Web Audio API；Google Fonts Huninn specimen（fonts.google.com/specimen/Huninn）。風格史：Wikipedia〈Bill Nolan (animator)〉、Cartoon Brew〈The Wild Classics of Rubber Hose Animation〉、Wikipedia〈Technicolor〉（雙色法為紅＋綠，藍會呈藍綠）。

**效能實測（jsdom，無版面引擎，僅供相對參考）**：`hose()` 單次 9–37µs；建一隻碰仔＋第一格 2.7–9.3ms；每格 4 條管子。頁面大小 168–181KB（含 motion-library 子集約 125KB）。同一畫面同時運轉的 motion-library 元件：index 首屏 1、捲到段標 1；pong 結果區 2；menu 1；visit 1。
