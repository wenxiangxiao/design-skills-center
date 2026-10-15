---
name: wayang-kulit-shadow-screen
description: Javanese wayang kulit purwa shadow-puppet theatre as a web style — the page is a lit linen screen (kelir) with a red-and-black border, perforated rawhide puppets in extreme stylised profile with long jointed arms on horn rods, a flickering oil-lamp point light whose shadows grow and blur as a figure moves toward it, a leaf-shaped gunungan used as the curtain between scenes, and a mirrored "dalang side" where the same figures appear in stepped-gradient gold-leaf colour.
---

# 爪哇皮影戲・Wayang Kulit Purwa（影幕、油燈、鑿孔生皮）

> 範例站：影皮行 TOKO KOELIT（桃園中壢的皮帶打孔店，1960 年從梭羅帶來一套 32 支鑿偶刀；每逢爪哇曆 Sabtu Legi 在後院演一整晚皮影）。整站是一面影幕：游標＝戲偶師握著手臂竹籤的手，油燈會晃，偶離燈越近影子越大越糊；右上「翻面」走到戲偶師那一側，看同一批偶的彩面。

**歷史座標**：wayang 一詞在爪哇語就是「影子」；最早的文獻證據是 9 世紀的中爪哇碑銘（903 年 Mantyasih／Balitung 碑記「Galigi 為神演出 Bima 的故事」），1035 年 Mpu Kanwa 的《Arjunawiwaha》已用 *kelir*（影幕）作比喻。今天的爪哇 wayang kulit purwa 在 16–18 世紀伊斯蘭化的馬打蘭宮廷定型——以 Mahabharata／Ramayana 為本，梭羅（Surakarta）與日惹（Yogyakarta）兩個宮廷樣式 *gagrak* 至今並行。2003 年 UNESCO 列為人類口述與非物質遺產代表作（2008 年轉入代表名錄）。

**為什麼長這樣**（製作與演出條件決定了視覺）：

- **材料**：曬乾、不鞣的水牛生皮（parchment）——硬、半透光、鑿下去不起毛。所以花紋不是畫的，是用木槌敲 *tatah* 鑿刀打穿的孔；觀眾那側看不到顏色，只看到光從孔裡漏出。
- **觀看方式**：觀眾坐在幕的另一側看影子，所以剪影必須在「純輪廓」下就認得出是誰——側臉、眼形、鼻長、站姿全是角色編碼（*wanda*）。
- **光源**：一盞掛在戲偶師頭上的椰子油燈 *blencong*（點光源）。偶貼著幕，影子銳利原寸；偶往燈靠，影子放大、變糊——這是演出語彙本身（巨人登場、角色逼近）。
- **操作**：偶身一根牛角主籤 *gapit*，雙臂肩、肘兩節以角釘鉚接，各有一根手籤 *tuding*；所以手臂又長又細、垂到膝下，動起來是會晃的鐘擺。
- **時間結構**：從天黑演到天亮，三段 *pathet*（nem／sanga／manyura）；開場、換段、收場都把葉形的 *gunungan*（kayon）轉一圈插回幕上——它就是爪哇戲台的幕簾與分節符號。

---

## 1. 設計哲學

1. **頁面是一面被點亮的布，內容是落在布上的影子。** 首屏不是 hero，是 *kelir*：米白亞麻布、上紅下紅的 *plisir* 邊、一個偏上的暖色光暈。所有圖像都必須能「投影」——先決定燈在哪裡，再決定影子的大小與糊度。
2. **一張皮，兩個面。** 觀眾側只有剪影與光孔；戲偶師側（彩面）是同一張皮的金箔與階染，而且是**左右鏡像**的。同一份圖形資產要能兩面使用，絕不分開畫兩套。
3. **輪廓即身分。** 不靠字、不靠顏色：細長杏眼低頭＝細緻型 *alus*；圓眼抬頭大步＝剛猛型 *gagah*；前凸下巴獠牙＝妖魔 *buta*；圓肚圓臀＝丑角 *punakawan*。
4. **光是被允許通過的，不是被畫上去的。** 亮點一律是「孔」：mask 的透明處，下面墊光。不得用白色圓點去「畫」孔。
5. **段落用 gunungan 隔開。** 換頁、換段、翻面，都是一片葉形宇宙山甩進來、在中央顫三下、再撤到右邊。

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--night` | `#1C130E` | 戲台外的夜／頁面底 | ~35% |
| `--teak` | `#2A1C14` | 次要暗底（柚木箱、頁尾） | ~10% |
| `--kelir` | `#F1E4C3` | 影幕亮面、主要文字（暗底上） | ~25% |
| `--kelir2` / `--kelir3` | `#D9C394` / `#B9A274` | 影幕暗角（燈照不到的四周） | 漸層用 |
| `--shade` | `#2B1D14` | 影子本色（不是純黑：布與燈是暖的） | ~12% |
| `--plisir` | `#8E2318` | 影幕上下紅邊、警示、強調 | ~4% |
| `--hide` / `--hide2` | `#D8B98A` / `#B8925C` | 生皮（按鈕、價目條、皮樣） | ~8% |
| `--gold` / `--gold2` | `#C9A04A` / `#E8CF8A` | 金箔 *prada*（彩面）、小標 | ~3% |
| 彩面 sunggingan 四階 | 青 `#173F3C→#2E6F6A→#4E9A8C→#9CCFBF`；紅 `#5E1610→#B4322A→#D9644E→#F0A38E`；金 `#7A5A1E→#A9802F→#C9A04A→#E8CF8A`；藍 `#1B2A55→#2F4C8C→#5E7FC0→#AFC3E8` | 只出現在彩面 | — |
| 光孔 | `#FFF4CC → #FFC870 → #7A4A20` | 孔下的光（徑向） | 只在孔裡 |

規則：觀眾側只能有 kelir 階調＋shade＋plisir 紅；顏色（青、紅、金階染）**只屬於彩面**。臉色是角色碼：金 *prada*、黑（沉穩）、紅（暴躁）、白（純真／丑角）。

## 3. 字體系統

- **Noto Serif TC 400/600/900**（Google Fonts）：標題與內文。標題 900，字距 .04–.06em。
- **Spectral italic 400/600**：所有爪哇／印尼語羅馬字詞（*pathet sanga*、*Sabtu Legi*、*tatah*）一律斜體，像民族誌圖版說明。
- **Noto Sans Javanese 400/700**：爪哇字母 Aksara Jawa（ꦮꦪꦁ、ꦏꦼꦭꦶꦂ），只當章節的小標前綴與導覽籤上的第二行，不承載必要資訊。
- 字級：h1 clamp(46px, 7vw, 92px)／h2 clamp(28px, 4.4vw, 48px)／h3 21–30px／內文 16px 行高 1.75／說明 13–15px。
- **打孔字**：店名可以是「孔」——以 canvas 取樣字形，取樣點落在筆畫內就打一個 r≈2.4 的圓孔（見第 11 章 ④）。

## 4. 版面與網格

- **首屏三欄**：左 64px 直排欄（Aksara Jawa＋羅馬字地名）｜中央 kelir（佔滿剩餘寬、高 ≥440px）｜右 248px 說明欄。幕下方一排段落切換鈕（白天／第一幕／第二幕／第三幕）。≤980px 收成單欄，kelir 高 68svh。
- **燈的位置**：水平 50%、垂直 18–22%（偏上，像掛在戲偶師頭上）。所有投影以此點為中心。
- **地平線**：偶的腳底在幕高 90–93%，手籤與主籤一路伸出幕外被裁掉——裁切是對的，戲偶師的手在幕下。
- **偶的尺度**：一具偶（頭頂到腳底）佔幕高 64–76%；兩具對話時 x 在 30% 與 70%，面對面（右邊那具 `scaleX(-1)`）。
- **內容段落**：dark 段（night/teak）與 hide 段（生皮色底、墨色字）交替；hide 段裡的圖像是「皮樣」，光從孔裡來。
- **不對稱**：皮樣網格用 12 欄、四塊大小不一（5/4、1/1 下沉 60px、3/5 直條、7/3 橫條），不要等寬三卡片。
- 留白：段落上下 80–110px；首屏 18–22px 外框，讓幕四周留一圈「夜」。

## 5. 元件配方

**Kelir（影幕）**
```css
.kelir{position:relative;overflow:hidden;
  background:radial-gradient(ellipse 70% 80% at 50% 22%,#FFF6DF 0,#F1E4C3 32%,#D9C394 78%,#B9A274 100%);
  border-top:9px solid #8E2318;border-bottom:14px solid #8E2318;
  box-shadow:inset 0 3px 0 #120b07,inset 0 -3px 0 #120b07,inset 6px 0 0 #120b07,inset -6px 0 0 #120b07}
.kelir::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.22;mix-blend-mode:multiply;
  background:repeating-linear-gradient(0deg,rgba(80,60,30,.25) 0 1px,transparent 1px 3px),
             repeating-linear-gradient(90deg,rgba(80,60,30,.18) 0 1px,transparent 1px 4px)} /* 亞麻布紋 */
.kelir .glow{position:absolute;inset:-12%;mix-blend-mode:soft-light;
  background:radial-gradient(circle at 50% 30%,rgba(255,206,120,.85),rgba(255,180,100,0) 42%)}
.kelir.side-col .layer{transform:scaleX(-1)} /* 戲偶師側＝鏡像 */
```

**導覽：gedebog 香蕉莖＋simpingan 插偶** — 底部固定 64px 的香蕉莖（橄欖綠縱向漸層＋纖維條紋），每頁是一枚插在莖上的葉形生皮籤（中文頁名＋爪哇字母），現在頁的籤被「拔起來」上移 22px 並換成金色。
```css
.gedebog{position:fixed;inset:auto 0 0;height:64px;background:linear-gradient(180deg,#9AA06A,#6B7240 18%,#4D5430 60%,#3A3F24)}
.simping{transform:translateY(18px);transition:transform .32s cubic-bezier(.3,1.5,.5,1)}
.simping[aria-current=page]{transform:translateY(-22px)}
.simping .tag{background:#D8B98A;mask:var(--tagm) 0 0/100% 100%} /* 葉形＋邊緣一圈孔 */
```

**按鈕：皮籤** — 生皮底、左端切成箭頭（像皮帶尾），hover 換淡金。
```css
.btn{background:#D8B98A;color:#1A1009;font:700 16px/1 "Noto Serif TC";padding:14px 22px 14px 18px;
  clip-path:polygon(0 50%,12px 0,100% 0,100% 100%,12px 100%)}
.btn.dark{background:#2B1D14;color:#F1E4C3}
```

**價目：皮帶條** — 每一列是一條皮帶（右端尖、上下一道縫線虛線、右側一排打好的孔）；hover 時皮帶被往左拉 26px，下一個孔「打」出來。
```css
.strap{clip-path:polygon(0 0,calc(100% - 40px) 0,100% 50%,calc(100% - 40px) 100%,0 100%);
  background:linear-gradient(180deg,#E2C69A,#D8B98A 30%,#C9A574);transform:translateX(var(--pull,0))}
.strap:hover{--pull:-26px}.strap .holes i.n{transform:scale(0)}.strap:hover .holes i.n{transform:scale(1)}
```

**皮樣／打孔地圖** — 兩層：下層是跟著游標的光（radial-gradient），上層是生皮色塊、以 mask 挖出孔。光只從孔裡出來。
```css
.swatch .light{position:absolute;inset:0;background:radial-gradient(circle at var(--mx) var(--my),#FFF4CC 0,#FFC870 12%,#7A4A20 34%,#2A1C14 60%)}
.swatch .hidel{position:absolute;inset:0;background:#C9A06A;mask:var(--sm) 0 0/100% 100%}
```

**表單** — 暗底、1.5px 柚木色框、focus 金色描邊；送出後吐出一張上緣一排半圓孔的「收執聯」。

**Footer** — teak 底、6px plisir 紅頂邊、三欄（地址／品項／本站說明），虛構聲明另起一行。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做什麼 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| **ambient 環境：油燈** | 燈點以兩個頻率的 1D value noise 晃動（位置 ±3.2px／±2.2px，2.3Hz／1.7Hz），光暈透明度 0.86±0.14；所有影子依投影公式跟著反向晃，離燈越近晃越大 | 常駐 rAF | 皮樣與地圖的光點以 0.3–0.4Hz noise 漂移 | 燈靜止、光暈固定 0.9 |
| **input 輸入：戲偶師的手** | 游標（或方向鍵）是前手竹籤的尖端；兩節手臂以 Verlet 積分（阻尼 0.86、重力、每幀 4 次距離約束）追上去；放開後回到休息姿勢並緩慢擺盪 | pointermove／keydown | 追隨彈簧 k=0.32、回休息位 k=0.06 | 不擺盪，但游標仍可驅動（無自動動作） |
| **transition 轉場：gunungan** | 換頁／換段／翻面：葉形 gunungan 從右側甩入（translate 70vw→0、rotate 18°→−7°），在中央顫三下（+5°/−3°/0），再撤到右側插下；整頁 kelir 底色淡入淡出 | 連結點擊、段落按鈕、翻面 | 進 760ms `cubic-bezier(.3,.6,.3,1)`、出 820ms `cubic-bezier(.6,0,.4,1)` | 直接切換，無 gunungan |
| **signature 簽名：nyedhak blencong（近燈巨影落幕）** | 每具偶登場時從燈邊（d=0.78–0.86）貼近幕面（d=0.03）：影子由 5 倍大、6px 半影收成原寸銳利；〈認影〉整個遊戲就是這個過程拉長成 9 秒 | 載入、換段、遊戲每回合 | ease-out cubic 1.5s（遊戲 9s） | 直接落在幕面 d=0.03 |

自我限制：本風格**不用淡入**當進場（影子不會淡入，只會從糊變清）；不用陰影 box-shadow 表現深度（深度只能來自點光源投影）。

## 7. 插畫與圖像風格（tatah-sungging 鑿孔生皮）

- **全部程序化生成的 SVG**：每具偶拆成 5 個部件（身體含頭與主籤、後上臂、後前臂＋手籤、前上臂、前前臂＋手籤），每個部件同時輸出 `mask`（白＝皮、黑＝孔）與 `col`（彩面）。
- **輪廓**：Catmull-Rom 平滑閉合路徑，指定點可設為尖角（鼻尖、腳尖、裙擺尖）。全部面朝右；左側角色以 `scaleX(-1)` 翻面。
- **比例**：頭小、脖子長、肩寬腰細的正面軀幹＋側面頭與腳；雙臂兩節合計約等於肩到膝；細腿、長尖腳。
- **鑿孔四法**：`bubukan` 交錯格點圓孔、`inten` 菱孔、`seritan` 沿線細縫（旋轉橢圓）、沿線一排圓孔（項鍊、臂環、髮帶）。孔只落在指定區域多邊形內、離邊 ≥ inset。
- **gunungan**：葉形外框＋頂尖、內部生命樹（主幹＋四對枝，各一排孔＋一排縫）、葉間 bubukan、兩側 inten、底部兩扇門縫與門楣、下接木柄。
- **彩面**：每個區塊填四階硬邊漸層（sunggingan），1.1px 墨線描邊，裙面加一圈 1.2/3.4 虛線白點（*cawi*）；Werkudara 與 Hanoman 的裙是 *poleng* 黑白格＋紅金點。

## 8. Logo 與 Favicon

- Logo：kelir 底、上下 plisir 紅邊；左邊一片 gunungan 的影（含全部孔），右邊 900 字重「影皮行」＋Spectral 斜體 *Toko Koelit · 1968*，下方一條深色皮帶上 36 個光孔。
- Favicon：64×64 kelir 色圓角方塊、深色葉形 gunungan＋木柄、四個菱孔與兩扇門縫——`fill-rule="evenodd"` 一條 path 完成，<1KB。

## 9. Do & Don't

**Do**
- 先決定燈的位置；所有影子以 `p' = L + s(p − L)`、`s = 1/(1−d)` 投影。
- 用 mask 挖孔、孔下墊光。
- 剪影本身就要能辨認角色；配色只在彩面出現。
- 兩面要鏡像；彩面看得到 *blencong* 油燈本體（金屬鳥形、火焰 1.6s 搖晃）。
- 以 gunungan 做所有轉場；以 pathet（入夜／半夜／黎明）組織長內容。

**Don't**
- 不要在觀眾側畫顏色、漸層填色或描邊——那一側只有影子和光。
- 不要用 `box-shadow`／`drop-shadow` 假裝影子：影子是另一個圖層，會放大、會糊、會跟燈反向晃。
- 不要正面畫臉、不要寫實比例、不要把手臂畫短。
- 不要用 emoji、不要用跑馬燈、不要用紫藍漸層、不要「EST. 19xx」徽章。
- 不要把真實的宮廷戲偶或博物館藏品描摹上網：用構件語彙生成新的偶。
- 涉及爪哇信仰（weton、Kliwon 夜）只作曆法與文化介紹，不寫成算命。

## 10. 頁面骨架範例

```html
<header class="stagewrap">
  <div class="rail"><span class="jv" lang="jv">ꦮꦪꦁꦏꦸꦭꦶꦠ꧀</span></div>
  <div id="k" class="kelir side-shade" tabindex="0" role="group" aria-label="影幕：游標＝戲偶師的手">
    <div class="glow"></div>
    <svg class="blencong" viewBox="0 0 96 120" aria-hidden="true">…</svg>
    <div class="layer"></div>
  </div>
  <div class="side"><h1>店名<span class="lat">Romanised name</span></h1>
    <button class="btn" id="flip">翻到戲偶師這側 →</button></div>
  <div class="acts"><button data-p="nem">第一幕<i>pathet nem</i></button>…</div>
</header>
<footer class="gedebog"><nav>
  <a class="simping" href="index.html" aria-current="page"><span class="tag"><b>影幕</b><i lang="jv">ꦏꦼꦭꦶꦂ</i></span><span class="rod"></span></a>
  …
</nav></footer>
<script>
const st = new EN.Stage(document.getElementById('k'), { lampFy: .2, flame: 6 });
const a = st.add('arjuna', { x: 300, y: 560, face: 1 });   // 面朝右
const b = st.add('semar',  { x: 700, y: 560, face: -1 });  // 面朝左
st.active = a;                     // 游標驅動 a 的前手
st.approach(a, 1500, .78, .03);    // 簽名：近燈巨影落幕
</script>
```

## 11. 本風格的 5 個不可省略特徵

### ① 鑿孔剪影 tatahan——亮點是孔，不是畫上去的點（拿掉它就只是黑色剪紙）

同一張圖同時當彩面的 `background-image` 與兩面的 `mask-image`；孔是 mask 裡的黑色，所以兩面都看得穿。
```html
<!-- mask：白＝皮、黑＝孔 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
    <path fill="#fff" d="M10 20Q60 0 110 20L100 110H20Z"/>
    <g fill="#000"><circle cx="40" cy="50" r="3"/><circle cx="51" cy="50" r="3"/><circle cx="45.5" cy="59.5" r="3"/>
      <path d="M60 80L66 76L72 80L66 84Z"/><ellipse cx="80" cy="40" rx="1.6" ry="5" transform="rotate(20 80 40)"/></g>
  </mask></defs>
  <rect width="120" height="120" fill="#000" mask="url(#m)"/></svg>
```
```css
.pt{mask:var(--m) 0 0/100% 100% no-repeat;-webkit-mask:var(--m) 0 0/100% 100% no-repeat}
.side-shade .pt{background:#2B1D14}                       /* 觀眾側：影 */
.side-col  .pt{background:var(--c) 0 0/100% 100% no-repeat} /* 偶師側：彩 */
```

### ② 側面極度風格化的偶——輪廓即身分（拿掉它就是一般剪影人物）

側臉＋側腳、正面軀幹；兩節長臂各一根手籤、身體一根主籤伸出幕外。角色碼寫在輪廓上：
```js
// 細緻型 alus：額頭到鼻尖一直線、低頭、細長杏眼（一道斜縫）
'<ellipse cx="250" cy="96" rx="10" ry="2.6" transform="rotate(26 250 96)"/>'
// 剛猛型 gagah：抬頭、圓眼（孔中留一顆瞳）
'<circle cx="262" cy="80" r="7.5"/><circle cx="262" cy="80" r="2.4" fill="#fff"/>'
// 長臂：上臂≈前臂≈肩到腰；手籤從手腕再伸出 180–200 單位
{ ua: [136, 15, 12], fa: [128, 12, 9] }
```

### ③ Kelir＋blencong——點光源透視投影（拿掉它就沒有「影戲」，只剩圖）

亞麻米白布、上下紅邊、偏上暖光；影子大小與糊度由燈—偶—幕距離決定。
```js
// d：偶離幕的距離（燈到幕＝1）
const s = 1 / (1 - d);                       // 放大倍率
const blur = flame * (s - 1) / s;            // 半影（在縮放前的座標）
proj.style.transform = `translate(${(1-s)*Lx}px,${(1-s)*Ly}px) scale(${s})`;
proj.style.filter = blur > .35 ? `blur(${blur}px)` : '';
proj.style.opacity = 0.93 - Math.min(.5, (s - 1) * .12);   // 越遠越淡
```
注意：`filter` 會被同元素的 `mask` 裁掉，所以 blur 放在外層 `.proj`、mask 放在內層 `.pt`。

### ④ 彩面 sunggingan 四階硬邊漸層＋金箔 prada（拿掉它就看不出是爪哇偶）

```svg
<linearGradient id="teal" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#173F3C"/><stop offset=".25" stop-color="#173F3C"/>
  <stop offset=".25" stop-color="#2E6F6A"/><stop offset=".5" stop-color="#2E6F6A"/>
  <stop offset=".5" stop-color="#4E9A8C"/><stop offset=".75" stop-color="#4E9A8C"/>
  <stop offset=".75" stop-color="#9CCFBF"/><stop offset="1" stop-color="#9CCFBF"/>
</linearGradient>
<path d="…" fill="url(#teal)" stroke="#1A1009" stroke-width="1.1"/>
<path d="…" fill="none" stroke="#F4EEE0" stroke-width="1.4" stroke-dasharray="1.2 3.4"/> <!-- cawi 白點線 -->
```
打孔字（店名牌）：
```js
ctx.font = '900 86px "Noto Serif TC"'; ctx.fillText('影皮行', W/2, H/2);
const d = ctx.getImageData(0,0,W,H).data;
for (let y=18; y<H-14; y+=6.2) for (let x=16+((y/6.2)%2?3.1:0); x<W-12; x+=6.2)
  if (d[((y|0)*W+(x|0))*4+3] > 120) holes.push(`<circle cx="${x}" cy="${y}" r="2.4"/>`);
```

### ⑤ Gunungan 宇宙山——開場、換段、收場（拿掉它就沒有戲台的節奏）

```css
.kayon{position:absolute;left:50%;top:50%;width:min(64vh,90vw);aspect-ratio:360/640;translate:-50% -50%;
  background:#2B1D14;mask:var(--m) 0 0/100% 100% no-repeat}
```
```js
kayon.animate([
  { transform:'translate(70vw,8vh) rotate(18deg) scale(.7)' },
  { transform:'translate(0,0) rotate(-7deg) scale(1)', offset:.55 },
  { transform:'translate(0,0) rotate(5deg)', offset:.72 },
  { transform:'translate(0,0) rotate(-3deg)', offset:.86 },
  { transform:'translate(0,0) rotate(0)' }], { duration:760, easing:'cubic-bezier(.3,.6,.3,1)', fill:'forwards' });
```
白天（戲還沒開始）時 gunungan 插在幕的正中（*kayon tancep*）；段落標題前可放一片 110px 的金色 gunungan 當分節記號。

## 12. 技術實作與相容性

| 技術 | 層 | 在本站承載什麼 | 支援現況（查證） | 不支援時 |
|---|---|---|---|---|
| **CSS `mask-image`（SVG data-URI，`mask-size:100% 100%`）** | A 渲染 | 特徵 ①③④：每個偶部件、gunungan、導覽籤、皮樣、打孔地圖、燈罩；同一張 SVG 同時作 mask 與彩面 background | MDN〈mask-image〉：Baseline 2023（2023-12 起最新版 Chrome／Edge／Firefox／Safari 全支援）；`mask` shorthand、`mask-composite` 同為 Baseline 2023。另寫 `-webkit-mask` 給較舊 Safari | 以 `CSS.supports('mask-image','url("x.svg")')`（及 `-webkit-` 版）偵測；不支援時不建立戲偶圖層（否則會是實心矩形），影幕上改顯示一行說明，店家資訊與遊戲線索都另以文字寫在頁面上；無 JS 時 noscript 內嵌一張靜態 SVG 剪影（SVG 內部 `<mask>` 自 SVG 1.1 即通用） |
| **requestAnimationFrame Verlet 積分**（兩節手臂、距離約束、彈簧） | B 動效與時間軸 | 輸入動效：游標／方向鍵＝手籤；休息擺盪；遊戲中的偶 | rAF 為 Baseline Widely available；純 JS 無相容風險 | `prefers-reduced-motion` 時不做自動擺盪，只在有輸入時解算 |
| **Intl API＋自寫爪哇曆**（`Intl.DateTimeFormat` 的 `timeZone:'Asia/Taipei'`、`formatToParts`、`Intl.RelativeTimeFormat`） | E 資料與生成 | 環境動效的時間來源（台北此刻屬於哪個 *pathet* → 首屏預設演哪一幕）、下一場 Sabtu Legi、weton 查詢、預約週六選單 | MDN：`Intl.DateTimeFormat` timeZone 與 `formatToParts`、`Intl.RelativeTimeFormat` 皆 Baseline Widely available（RelativeTimeFormat 2020-09）。pasaran 以 1945-08-17＝Jumat Legi 為錨點（印尼獨立宣言日），每 5 日一輪；已以 2026-10-31＝Sabtu Legi（印尼曆網站 kalenderku.id）與 2026-10-11＝Minggu Legi（Katadata）交叉驗證 | 不支援 `formatToParts` 的環境退回本機時間；資訊（營業時間、場次規則）以靜態文字同時寫在頁面上 |

輔助（非核心）：Web Animations API 用於 gunungan 轉場（無 `Element.animate` 時直接換頁）；Canvas 2D `getImageData` 取樣字形做打孔店名（字型未載入前先用 serif，載入後重打一次孔）；`sessionStorage` 帶遊戲代碼到預約表單。

**效能實測（node 22 於建置機上量測）**：首頁首屏需要的 2 具偶＋gunungan＋店名牌，SVG 字串生成與 data-URI 編碼共 **≈11.5ms**；六具偶全部生成 ≈2.7ms（快取後）。頁面大小：index 92KB／wayang 63KB／kulit 92KB／omah 62KB（皆含全部 inline CSS/JS，遠低於 350KB）。每幀工作：每具偶 2 支手臂 × 4 次約束＋一個 `transform` 字串；投影只改 `.proj` 的 `transform`（合成層），`filter:blur()` 量化到 0.5px 且變化 >0.2px 才寫入，避免每幀重新柵格化。

**已知限制**：投影是「把整張剪影等比放大」的一階近似（實際點光源下，偶的不同部位離燈距離不同）；半影以高斯模糊近似圓形光源。

---

*參考：Wikipedia〈Wayang kulit〉（Brandon 1970／2009、Robson & Wibisono 2002 等）；Museum Sonobudoyo〈Blencong〉；roots.gov.sg〈Behind the Shadows: Javanese Wayang Kulit Puppets〉；UNESCO〈Wayang puppet theatre〉。本規格書中的戲偶為原創程序化圖形，不複製任何特定藏品。*
