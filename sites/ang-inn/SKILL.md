---
name: taiwanese-banquet-red
description: Taiwanese Banquet Red — the two-red vernacular of Taiwan's ritual food and outdoor feast culture: industrial vermilion plastic as ground colour, peach-red safflower-dyed offerings, vertical brush-written red paper slips with a single square seal, four injection-moulded plastic accents on wares only, and red-white-blue woven PE tarpaulin stripes at fixed width.
---

# 台式辦桌紅 Taiwanese Banquet Red

> 本規格書描述的是一個**文化視覺傳統**，不是一家店的皮膚。
> 它的產業綁定為零：粿舖、桌椅出租行、香舖、鑼鼓班、廟口攝影、免洗餐具工場、
> 甚至一個賣工業繩索的網站，只要照這裡的規則做，都會長成同一個看得出來的東西。

---

## 一、設計哲學

### 1.1 這個傳統長在哪裡

台灣自清治、日治以來的民俗筵席與供品文化，在戰後與塑膠工業相遇之後，
長出一套完全自己的顏色秩序。它的現場是廟埕、三合院的門口埕、或者直接封起來的大馬路：
搭起長型鐵架棚，底下擺一張張紅圓桌與鐵椅，由**總鋪師**主導十二道菜的流程，
底下是水腳（南部叫法）或小工（北部叫法）在切菜、上菜、洗碗。
與辦桌相對的「流水席」不限座位、不限時辰，來了就吃，吃完就走。

這套視覺的顏色不是設計出來的，是被兩件事決定的：

1. **民俗的紅**——喜事、壽事、謝神、繞境，能擺上桌的東西必須是紅的。
   紅龜粿的紅來自**紅花米**（紅色食用染料），紅紙的紅來自染紙。
2. **塑膠的紅**——1960 年代以後的射出成型與 PE 編織布，把「紅」變成一種可以無限便宜複製的工業色。
   紅圓桌面、紅色塑膠椅、紅色免洗盤、紅白藍條帆布，全部是這一批。

所以這個傳統的核心不是「紅」，是**兩個互不相讓的紅同時在場**。
一個是吃的（桃紅／偏冷），一個是拿的（朱紅／偏暖）。
台灣人分得出來，而且從不試圖把它們調和。

### 1.2 外部參照（可查、可比較、可指名）

- **「台灣紅」運動**：2000 年起文建會開始以桃紅色作為代表台灣的文化色；
  2003 年於北歐、英、法巡展以桃紅為台灣概念色，訴求民俗生活的熱度與廟會的豔。
  前文建會主委 **陳郁秀** 以十年研究提出「台灣紅／台灣青／台灣金」三色論——
  紅代表生命史、青代表自然生態、金代表土地信仰。學學文化色彩有專欄整理。
- **林磐聳**（1957– ），台灣視覺設計領域代表人物，2007 年國家文藝獎視覺藝術類最年輕得主，
  長期以台灣意象作為設計主題。
- **辦桌的物質文化**：紅白藍塑膠棚、黑松汽水玻璃杯、紅大圓桌、十二道菜；
  高雄內門一地約有 150 組總鋪師，幾乎每五戶就有一戶靠這一行為生。
- **供品的形制**：紅龜粿（龜甲紋）、壽桃、發粿、紅圓、米糕栫、草仔粿、芋粿巧，
  以及廟方的「乞龜／還龜」——粿的尺寸與紋樣不是裝飾選擇，是場合的規定。

### 1.3 這個傳統與鄰居的分界

| 鄰居 | 分界 |
|---|---|
| 墨西哥剪紙旗 Papel Picado | 那是**薄棉紙的鏤空與疊印**，主體是洞；本傳統零鏤空，主體是不透光的平塗色塊與紅紙 |
| 紙紮彩紙風 | 那是彩色薄紙的結構與骨架；本傳統只有兩個紅，而且紙一定是實心的、寫字的 |
| 港式霓虹 | 那是光；本傳統零發光、零漸層、零暈影 |
| 阿丁克拉／恩德貝勒 | 那些的圖案語言是母題系統；本傳統沒有母題系統，只有**圓與方的對立**與紋樣被「模刻」出來 |
| 中式喜慶紅金 | 那是紅配金；本傳統**沒有金**——金是廟宇與 Art Deco 的事，這裡的第二個色是另一個紅 |

---

## 二、本風格的 5 個不可省略特徵

> 這一章是本規格書的核心。拿掉任何一項，做出來的就不是台式辦桌紅。
> 每一項都附可直接複製的 CSS／SVG 片段。

### 特徵 1｜雙紅並置，而且紅是地色

朱紅（工業）與桃紅（染料）同時作為大面積色，合計 **≥ 52%** 的畫面。
兩個紅之間**只准夾白縫與黑墨**，不得加中間色、不得漸層過渡、不得半透明疊。
畫面上沒有任何米白紙底作為主色——**紙是紅的**。

```css
:root{
  --tsu:#CE1B22;   /* 朱紅：塑膠布、油漆、免洗盤、圓桌面、塑膠籃 —— 「拿的」 */
  --tho:#E4005A;   /* 桃紅：紅花米染的粞、紅紙、印泥 —— 「吃的」 */
  --ink:#16130F;   /* 墨 */
  --koe:#F0EBDC;   /* 粿白：只用在長文紙插與兩塊紅之間的白縫 */
}
body{ background:var(--tsu); color:var(--koe); }
.paper{ background:var(--tho); color:var(--ink); }
/* 兩塊紅相接處：一律 2px 硬白縫，絕不 gradient、絕不 box-shadow */
.paper + .paper{ margin-inline-start:2px; }
```

**拿掉它會怎樣**：只留一個紅，畫面立刻變成「中式喜慶模板」；
加了金，變成 Art Deco；加了漸層，變成任何一個 AI 預設的 hero。

### 特徵 2｜正圓是主角，方是容器，圓角不存在

從正上方看，**每一件「物」都是正圓**（桌、籠、桶、籃、篩、碗、盤、粿、燈泡）；
**每一件「承載物的東西」都是直角**（粿印、栫桶、界尺、紅紙、鐵架、棚）。
第三種形——圓角矩形——在這個傳統裡**不存在**，不是被禁止，是沒有。

```css
*{ border-radius:0; }                /* 全站唯一一條，寫在 reset 裡 */
.ware{ border-radius:50%; }          /* 器物：正圓，且必須是正圓（等寬等高） */
.holder{ border-radius:0; }          /* 容器：直角 */
```

唯一被允許的曲線有三種，三種都是物理的、不是造型的：

1. **正圓**（器物的俯視輪廓）
2. **布的自重垂弧**（sag；水平的裁邊，見特徵 5 與 §7.3）
3. **紙的捲邊弧**（curl；垂直的裁邊——紙的自由邊會捲，見 §7.4）

```svg
<!-- 圓桌俯視：十二道菜的位置，正圓 + 十二等分，零透視 -->
<svg viewBox="0 0 120 120"><g fill="none" stroke="#F0EBDC" stroke-width="3">
  <circle cx="60" cy="60" r="46"/><circle cx="60" cy="60" r="14"/>
</g></svg>
```

**拿掉它會怎樣**：一放圓角卡片，整個畫面就從「廟埕」掉回「SaaS 首頁」。

### 特徵 3｜紅紙上直排毛筆黑墨，末尾一枚方形硃印

**所有清單、菜單、價目、單據、名錄，一律**：紅紙為底、黑墨為字、
`writing-mode: vertical-rl`、右起直下、字距緊（`letter-spacing:.06–.12em`）、行間窄、
末尾蓋一枚**方形**印（不是圓章）。
橫排無襯線的表格在這個傳統裡等於「稅單」，不是給人看的東西。
長篇散文可以橫排，但必須搬到另一種紙上（粿白紙插），**不得與清單同底**。

```css
.slip{
  background:var(--tho); color:var(--ink);
  writing-mode:vertical-rl; text-orientation:upright;
  font-family:'Noto Serif TC',serif; font-weight:900;
  letter-spacing:.08em; line-height:1.5;
  padding:12px 10px 28px;
}
/* 直排表：整列由右往左讀 —— flex-direction:row-reverse 是這一步的關鍵 */
.vtab{ display:flex; flex-direction:row-reverse; gap:2px; overflow-x:auto; }
.vtab > div{ writing-mode:vertical-rl; text-orientation:upright; min-height:210px; }
/* 數字用窄體等寬，讓斤兩與價目對得起來 */
.num{ font-family:'Archivo Narrow',sans-serif; font-weight:700; font-variant-numeric:tabular-nums; }
/* 大寫國字：單據上的數目寫「十二」不寫「12」——寫阿拉伯數字會變成收據 */
```

硃印必須是**白文**（陰刻）：紅塊上以紙色走筆，而不是紙上蓋紅字。

```svg
<svg viewBox="0 0 74 74" width="74" height="74" role="img" aria-label="硃印">
  <rect width="74" height="74" fill="#E4005A"/>
  <g fill="#F0EBDC">
    <!-- 方框四筆 + 一個環 + 一橫：抽象，不寫成可讀的字 -->
    <rect x="7" y="7" width="60" height="3"/><rect x="64" y="7" width="3" height="60"/>
    <rect x="7" y="64" width="60" height="3"/><rect x="7" y="7" width="3" height="60"/>
    <circle cx="37" cy="34" r="17" fill="none" stroke="#F0EBDC" stroke-width="4"/>
    <rect x="22" y="56" width="30" height="3"/>
  </g>
</svg>
```

**拿掉它會怎樣**：清單一橫排，整站立刻變成「中文版 Bootstrap」。

### 特徵 4｜射出塑膠四彩只給器物，且零明度階

月桃綠 `#1E7A3C`、塑膠橙黃 `#F0B400`、塑膠寶藍 `#1B5FA8`（＋器物上的桃紅）
只准出現在**器物**上：籃、篩、桶、繩、椅、盤。
它們合計 **≤ 14%** 的畫面，而且**平塗、零高光、零漸層、零明度階**——
射出成型的塑膠沒有要模仿任何材質，所以它不反光。
地色的朱紅不計入這四色。

```css
.ware--green{ fill:#1E7A3C; }
.ware--amber{ fill:#F0B400; }
.ware--blue { fill:#1B5FA8; }
/* 明令禁止：任何加在塑膠件上的高光、內陰影、模糊陰影、材質漸層 */
.ware{ filter:none !important; box-shadow:none !important; background-image:none !important; }
```

**拿掉它會怎樣**：把四彩用在版面（按鈕、標題、背景）上，就變成 Memphis；
給塑膠加高光，就變成 Claymorphism。

### 特徵 5｜紅白藍等寬直條的 PE 編織帆布，條寬固定不隨螢幕變

遮陽、覆蓋、圍擋、換場——一律是**紅／白／藍等寬直條**的 PE 編織帆布。
條寬是**實物尺寸**，所以用固定像素，**不得用 % 或 vw**：換了螢幕，布還是那塊布，
只是你看到的塊數變了。布面必有可見的**經緯編織紋**。

```css
:root{ --band:22px; }              /* 手機可縮到 15px，但仍是固定值 */
.tarp{
  background-image:repeating-linear-gradient(90deg,
    #CE1B22 0 var(--band), #EDE9DE var(--band) calc(var(--band)*2),
    #1B5FA8 calc(var(--band)*2) calc(var(--band)*3), #EDE9DE calc(var(--band)*3) calc(var(--band)*4));
  background-size:calc(var(--band)*4) 100%;
}
/* PE 編織紋：經緯兩組硬停點細條交織，1px 實／2px 空 */
.weave{ position:relative; }
.weave::after{
  content:''; position:absolute; inset:0; pointer-events:none;
  background-image:
    repeating-linear-gradient(90deg, rgba(0,0,0,.17) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(0deg,  rgba(255,255,255,.13) 0 1px, transparent 1px 3px);
}
```

**拿掉它會怎樣**：條紋改成 % 寬度，它就從「工業織品」變成「裝飾條紋」；
少了編織紋，它就從布變成色塊。

---

## 三、色彩系統

| 色票 | 名稱 | 用途 | 比例 |
|---|---|---|---|
| `#CE1B22` | 朱紅（工業） | 地色、塑膠布、油漆、免洗盤、圓桌面、籃 | **38%** |
| `#E4005A` | 桃紅（染料） | 紅紙、粿身、印泥、直排清單的紙 | **21%** |
| `#16130F` | 墨 | 紅紙上的字、footer、規矩板、直排標題塊 | 17% |
| `#F0EBDC` | 粿白 | 長文紙插、兩塊紅之間的白縫、帆布的白條 | 16% |
| `#1E7A3C` | 月桃綠 | 葉、塑膠籃繩（器物限定） | 4% |
| `#F0B400` | 塑膠橙黃 | 篩、當前狀態標記（器物限定） | 2.5% |
| `#1B5FA8` | 塑膠寶藍 | 桶、帆布的藍條（器物限定） | 1.5% |
| `#8F0C12` | 深朱 | 只用在「失禮／超量／虛構聲明」等一種語意上 | <0.5% |

**硬規則**

1. 兩個紅合計 ≥ 52%，其中朱紅必須是**最大面積的單一色**。
2. 器物三彩（綠／橙黃／寶藍）合計 ≤ 14%，且只准在器物上。
3. **零漸層**（帆布條紋與編織紋是硬停點的 repeating-gradient，不算漸層）。
4. **零模糊陰影、零內陰影、零暈影、零半透明疊色。**
5. **零金**。要第二個亮色，就用另一個紅。
6. 粿白絕不作為大面積地色；它是紙插與白縫，不是背景。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 字級 |
|---|---|---|---|
| 直排標題／店招 | `Noto Serif TC` | 900 | `clamp(46px, 8.4vw, 92px)` |
| 直排清單／紙條 | `Noto Serif TC` | 900（標）／500（內文） | 15px |
| 橫排長文（粿白紙插） | `Noto Serif TC` | 500 | 16px／`lede` 18px |
| 數字・羅馬字・台羅 | `Archivo Narrow` | 700 | 13px，`letter-spacing:.34em` |

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Archivo+Narrow:wght@500;700&display=swap');
body{ font-family:'Noto Serif TC',serif; font-weight:500; line-height:1.66; }
h1,h2,h3,h4{ font-weight:900; letter-spacing:.012em; line-height:1.12; }
```

**規則**

- 標題**只用 900**，不用 700 當標題——這個傳統的字是刷出來的，沒有中間字重。
- 直排時一律 `text-orientation:upright`，拉丁字母與數字也直立（台羅除外，台羅橫著讀）。
- 台羅拼音（ÂNG-ÎNN-HŌ）用 `Archivo Narrow` 700 + `letter-spacing:.34em`，
  它的作用是招牌上那一行小字，不是副標題。
- **禁止**：黑體做標題（會變成賣場 DM）、可變字重動畫、字體堆疊沒有指定第一順位。

---

## 五、版面與網格

### 5.1 唯一長度單位

```css
:root{ --u:8px; }   /* 全站每一個間距、padding、gap 都是 --u 的整數倍 */
```

### 5.2 貼牆（pasted wall）：本風格的開場原型

首屏不是 hero、不是目錄、不是大標，是**一整面貼滿紅紙條的牆**。
紙條長短不一、直排、右起、**新的貼在左邊並壓在舊的上面**（層層相疊）。
資訊階層由三件事決定：紙條的**寬度**、離右邊**多遠**、以及**被壓掉多少**。

```css
.wall{
  display:flex; flex-direction:row-reverse; flex-wrap:wrap; align-items:flex-start;
  padding:24px 16px 40px; min-height:62vh;
}
.wall .slip{
  width:112px; height:var(--h,190px);
  margin-left:-58px;   /* 後一條往右吃掉前一條被壓住的那 58px —— 必須是物理外距 */
  margin-bottom:12px;  /* 紙條是 vertical-rl，margin-inline-* 會跑到上下去 */
}
/* 手貼的紙一定歪，但紙本身是直角矩形 —— 只准 ≤1.4° */
.wall .slip:nth-child(odd){ transform:rotate(-.7deg); }
.wall .slip:nth-child(3n) { transform:rotate(.9deg); }
.wall .slip:nth-child(7n) { transform:rotate(-1.3deg); }
```

### 5.3 直排標題塊

章節標題是一塊**墨黑的直排小牌**，貼在內容區的左外緣，不是內容上方的一行字。

```css
.sec{ position:relative; padding-inline-start:40px; }
.sec > h2{
  position:absolute; inset-inline-start:-8px; top:16px;
  writing-mode:vertical-rl; text-orientation:upright;
  background:var(--ink); color:var(--koe);
  padding:12px 6px; font-size:20px; letter-spacing:.14em;
}
```

### 5.4 留白規則

- 留白不是白的，是**朱紅的**。大面積的空就是布，不是紙。
- 兩塊紅之間的縫固定 `2px`，不是 `8px`、不是 `--u`。這是裁紙刀的寬度，不是版面的呼吸。
- 長文的行寬上限 `74ch`，並且一定在粿白紙插裡。

### 5.5 RWD

- `≤560px`：`--band` 從 22px 降到 15px（仍固定）；紙牆紙條字級 13.5px；
  直排清單保持直排（**不得改橫排**，改了就不是這個風格），改成橫向捲動。
- 固定在右緣的掛牌導覽在手機改躺到底部軌上並改為橫排——這是可用性讓步，
  也是唯一允許直排變橫排的地方。

---

## 六、元件配方

### 6.1 紙條 slip（最重要的元件）

```html
<div class="slip" tabindex="0">
  <b>九月初八</b>　林厝<br>紅龜粿十二
  <span class="hid"><br>辰時交　已收定<br>承底：月桃葉</span>
</div>
```

紙條被壓住的那半邊（左邊的直行）**一直在 DOM 裡、一直可被搜尋與朗讀**，只是不在剪裁區裡（見第七章）。

### 6.2 掛牌導覽 langpai（非 topbar、非 side-rail）

四張紙牌掛在同一根釘上，固定於視窗右緣中段，**互相遮住**，
未指向時只露出各自最上面幾個字；掀起才露出頁名與一行說明。

```css
.langpai{ position:fixed; right:0; top:26%; display:flex; flex-direction:row-reverse; align-items:flex-start; }
.langpai a{
  --cut:26%;
  --edge:calc(100% - var(--cut) - 74% * var(--lift));
  position:relative;
  background:var(--koe); color:var(--ink);
  writing-mode:vertical-rl; text-orientation:upright;
  font-weight:900; letter-spacing:.12em;
  width:150px; padding:12px 6px;
  margin-left:-112px;              /* 露出右邊 38px ≈ 一個直行 */
  border-right:2px solid var(--ink);
  /* clip-path 同 §7.4 的垂直裁邊 */
}
.langpai a:first-child{ margin-left:0; }
.langpai a:hover, .langpai a:focus-visible{ --lift:1; z-index:5; }
.langpai a[aria-current="page"]{ background:var(--nga); }
body{ padding-inline-end:56px; }   /* 讓掛牌不壓到內容 */
```

### 6.3 直排紅紙表 vtab

見特徵 3。表頭是**墨黑的那一格**，放在最右邊（`row-reverse` 的第一個）。

### 6.4 按鈕

```css
.btn{
  background:var(--ink); color:var(--koe); border:0; border-radius:0;
  padding:10px 20px; font-weight:900; letter-spacing:.12em; cursor:pointer;
}
.btn:hover,.btn:focus-visible{ background:#1E7A3C; }   /* 綠是「動作」的語意 */
```

**禁止**：按壓硬陰影（`box-shadow: 4px 4px 0`）——那是 Neubrutalism 的簽名，不是這個傳統的。

### 6.5 表單

```css
form.order{ background:var(--koe); color:var(--ink); padding:24px; max-width:70ch; }
form.order input, form.order select{
  border:2px solid var(--ink); border-radius:0; background:#fff; padding:8px;
  font-family:'Noto Serif TC',serif; font-size:16px;   /* 16px 以上，手機不放大 */
}
```

表單在粿白紙上（因為要填）；**輸出的單據在桃紅紙上直排**（因為要貼、要跟著貨走）。

### 6.6 footer

墨黑底、粿白字、左邊一枚硃印，三格：店號與地址／營業時間／連結。
店號、電話、地址、營業時間、公休日**必須具體**——這是虛構但可信的最低門檻。

---

## 七、動效規則

本風格的動效總量為 **4 種**，觸發源各自不同，缺一不可。
**安靜不是風格，安靜是沒做完。**

### 7.1 環境 ambient｜起風（時間驅動）

整面牆的紙條裁邊（捲邊弧）以相位差起伏，9s 循環，幅度 `2px → 10px → 5px`。
每一條的 `animation-delay` 由 `--i` 算出（`-0.42s × i`），所以風是**一條一條過去**的。

```css
@property --sag{ syntax:'<length>'; inherits:false; initial-value:2px }
.wind{ animation:wind 9s ease-in-out infinite; animation-delay:calc(var(--i,0) * -.42s); }
@keyframes wind{ 0%,100%{ --sag:2px } 46%{ --sag:10px } 72%{ --sag:5px } }
```

第二個環境動效：帆布條紋的極慢橫移（`74s linear infinite`），
位移量正好一個四條循環——所以它永遠看不出起點。

### 7.2 輸入 input-driven｜掀角（游標／鍵盤，起動 <100ms）

`hover` / `focus-within` 令 `--lift: 0 → 1`，`transition:--lift .16s cubic-bezier(.2,.85,.3,1)`。

```css
@property --lift{ syntax:'<number>'; inherits:false; initial-value:0 }
.slip:hover, .slip:focus-visible, .slip:focus-within{ --lift:1; }
```

### 7.3 轉場 transition｜落布（導覽驅動，240ms）

點內部連結時，一整片紅白藍條帆布從上垂落覆蓋畫面（垂弧往下掃過），再導頁。
**自寫，不用 View Transitions API**。

```css
#drop{ position:fixed; inset:0; z-index:200; pointer-events:none; display:none; }
#drop.on{ display:block; animation:dropcloth .24s cubic-bezier(.3,.7,.2,1) forwards; }
@keyframes dropcloth{ from{ --lift:0 } to{ --lift:1 } }
```

### 7.4 簽名 signature｜解剪即揭示 unclip-as-reveal

**全站零 `opacity`、零 `height`、零 `transform`、零 `display` 的顯示切換。**
每一次「露出」都是元素**自己的 `clip-path: shape()` 弧線往旁邊讓位**——
所以掀起來看到的不是背面、不是底層、不是新插入的節點，
是**它自己原本被裁掉的那一段字**。字一直在那裡，只是不在剪裁區裡。

#### 直排的紙，裁邊在左邊——這一點做錯就整個壞掉

在 `writing-mode: vertical-rl` 裡，`<br>` 不是換到下一行，是**換到左邊的下一「行」（直行）**。
所以「文字的後段」在**左邊**，不是在下面。
把紙的下緣裁掉，只會切斷每一直行的尾巴，被藏起來的字反而會跑到左邊那一行的頂端，
**完全遮不住**。直排的紙必須從**左緣**裁：

```css
.slip{
  --cut:48%;                                        /* 未掀時從右邊算起只留 48% */
  --edge:calc(100% - var(--cut) - 52% * var(--lift)); /* --cut + 倍率 = 100% */
  writing-mode:vertical-rl; text-orientation:upright;
  clip-path:shape(
    from 100% 0,
    vline to 100%,
    hline to calc(var(--edge) + var(--sag)),
    curve to calc(var(--edge) + var(--sag)) 0
      with calc(var(--edge) - var(--sag)*2 - 9px) 76%
         / calc(var(--edge) - var(--sag)*2 - 9px) 24%,
    close);
}
.slip:hover, .slip:focus-within{ --lift:1; z-index:20; }   /* 掀起＝解剪 ＋ 提到最上層 */
```

`z-index` 是必要的，因為紙牆是層層相疊的：被壓住的那一張解開自己的剪裁之後，
還得被提到上層才看得見。**`z-index` 不是顯示切換**（它不改變元素是否被繪製），
所以簽名的「零 opacity／height／transform／display」仍然成立。

同一片牆的排版與剪裁要對得起來：紙條給**固定寬度**，
相鄰紙條用**負的物理外距**吃掉被壓住的那一段（不是 `margin-inline-*`——
在 vertical-rl 裡 inline 軸是垂直的，邏輯外距會跑到上下去）：

```css
.wall{ display:flex; flex-direction:row-reverse; flex-wrap:wrap; align-items:flex-start; }
.wall .slip{ width:112px; height:var(--h,190px); margin-left:-58px; }  /* 露出右邊 54px ≈ 兩直行 */
```

橫排的東西（落布、籠層）才用水平裁邊的**自重垂弧**：

```css
#drop{ clip-path:shape(from 0 0, hline to 100%,
  vline to calc(118% * var(--lift)),
  curve to 0 calc(118% * var(--lift))
    with 74% calc(118% * var(--lift) + 34px) / 26% calc(118% * var(--lift) + 34px), close); }
```

高潮事件為**開籠**：一疊六層的籠，六層的剪裁弧線由下而上依序收掉（每層 150ms），
一層讓出一層的粿，最後蓋「清」印。

### 7.5 prefers-reduced-motion 降級（資訊零損失）

```css
@media (prefers-reduced-motion:reduce){
  *{ animation:none !important; transition:none !important; }
  .wind{ --sag:6px; }        /* 風停在中值，垂弧還在（它是形，不是動畫） */
  .slip{ --lift:1; }         /* 紙條永久掀開 —— 被壓住那半邊的字直接可見 */
  .langpai a{ --lift:1; }
  .lang .tier.off{ --lift:1; }
  #drop{ display:none !important; }   /* 轉場改為即時導頁 */
}
```

---

## 八、插畫與圖像風格：毛筆實筆構成 brush-solid

**零外部圖片。** 所有圖像都是**毛筆的實筆**：起筆、行筆、收筆，
含筆鋒、岔毫與乾擦的缺口，寬度隨行筆變化。
**沒有輪廓線、沒有填色區、沒有浮雕、沒有網點、沒有細線線描、沒有等角視圖。**

構成規則：**每一件器物都從正上方看**，所以輪廓是正圓（見特徵 2）。

### 8.1 引擎：可變寬度實筆

一條中心線（Catmull-Rom 重取樣）配一條寬度包絡，
輸出**填充輪廓 path**（左側前進、右側倒回、閉合），而不是 `stroke`。
用 `stroke` 畫不出毛筆——`stroke-width` 是常數，毛筆不是。

```js
function lcg(s){s=s>>>0;return function(){s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}}
function brush(pts, w /* [起,行,收] */, o){
  o=o||{}; var n=o.n||34, S=samp(pts,n), R=lcg(o.seed||7), nt=[], nd=Math.round((o.dry||0)*3);
  for(var i=0;i<nd;i++) nt.push([.16+R()*.66, .03+R()*.055, .28+R()*.46]);  // 乾擦缺口
  function wid(t){
    var b = t<.5 ? w[0]+(w[1]-w[0])*(t/.5) : w[1]+(w[2]-w[1])*((t-.5)/.5);
    b *= 1 - .72*Math.pow(Math.max(0,(t-.85)/.15),1.6);   // 收筆提尖
    b *= 1 - .20*Math.pow(Math.max(0,(.09-t)/.09),1.4);   // 起筆稍按
    for(var k=0;k<nt.length;k++){ var d=Math.abs(t-nt[k][0]);
      if(d<nt[k][1]) b *= 1-nt[k][2]*(1-d/nt[k][1]); }
    return Math.max(.3,b);
  }
  var L=[],Rt=[];
  for(var i=0;i<n;i++){
    var p=S[i], a=S[Math.max(0,i-1)], b2=S[Math.min(n-1,i+1)];
    var dx=b2[0]-a[0], dy=b2[1]-a[1], m=Math.hypot(dx,dy)||1, h=wid(i/(n-1))/2;
    L.push([p[0]-dy/m*h, p[1]+dx/m*h]); Rt.push([p[0]+dy/m*h, p[1]-dx/m*h]);
  }
  var d='M'+L[0][0].toFixed(1)+' '+L[0][1].toFixed(1);
  for(var i=1;i<n;i++) d+='L'+L[i][0].toFixed(1)+' '+L[i][1].toFixed(1);
  for(var i=n-1;i>=0;i--) d+='L'+Rt[i][0].toFixed(1)+' '+Rt[i][1].toFixed(1);
  return d+'Z';
}
```

### 8.2 環一定要有搭接

真毛筆畫圈收不回原點。所以環走 **1.04 圈**，留一道可見的搭接，**不要修它**。

```js
function ringPts(cx,cy,r,a0,turn,wob){
  var pts=[],N=32;
  for(var i=0;i<=N;i++){ var a=a0+(turn||1.04)*Math.PI*2*i/N, rr=r*(1+(wob||0)*Math.sin(a*3+1.1));
    pts.push([cx+Math.cos(a)*rr, cy+Math.sin(a)*rr]); }
  return pts;
}
```

### 8.3 紋樣

供品的紋樣是**模刻出來的**，所以每一個紋都是有限筆數、有明確語意的圖形：
龜甲六格、桃形雙瓣、裂四瓣、素面一點、連錢四圓相扣、米字八分、六花繞心……
**不要生成隨機的裝飾**：紋樣對應場合，一個場合一個紋。

---

## 九、Logo 與 Favicon

- **Logo**：朱紅方塊（承載）＋粿白方框四筆（界尺）＋桃紅筆環（紅圓）＋墨心一點。
  全部由第八章的引擎輸出，不用字型、不用外部圖檔。
- **Favicon**：inline SVG data URI 寫在 `<head>`。16px 下只剩三件事看得見：
  朱紅底、桃紅環、墨心點——**favicon 不是縮小的 logo，是同一個概念的三筆版本**。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23CE1B22'/%3E%3Ccircle cx='16' cy='16' r='9' fill='none' stroke='%23E4005A' stroke-width='3.2'/%3E%3Ccircle cx='16' cy='16' r='3.4' fill='%2316130F'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

### Do

- 兩個紅並置，朱紅當地色，桃紅當紙。
- 清單一律直排紅紙黑墨，末尾一枚方印。
- 器物俯視正圓，承載物直角，圓角一個都不要。
- 帆布條寬固定像素，布面有編織紋。
- 店號、電話、地址、營業時間、價目、工序都寫具體的數字。
- 四種動效都做，四種都有 reduced-motion 降級。
- 器物三彩只上器物，合計不過一成四。

### Don't

- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ 任何漸層、模糊陰影、內陰影、暈影、半透明疊色、圓角。
- ❌ 加金。要第二個亮色就用另一個紅。
- ❌ 米白紙底當主色（那是里索／瑞士／包浩斯的事）。
- ❌ 清單橫排、表格用無襯線黑體。
- ❌ 單據上寫阿拉伯數字（寫「十二」不寫「12」）。
- ❌ 塑膠件加高光或材質漸層。
- ❌ 條紋用 `%` 或 `vw` 寬度。
- ❌ emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、「老街屋改建」開場敘事。
- ❌ 跑馬燈／ticker：這個傳統的資訊是**貼**上去的，不是捲過去的。
- ❌ 按壓硬陰影（`box-shadow:4px 4px 0`）——那是網頁新粗獷，不是廟埕。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜店號</title>
<link rel="icon" href="data:image/svg+xml,...">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Archivo+Narrow:wght@500;700&display=swap" rel="stylesheet">
<style>
@property --lift{syntax:'<number>';inherits:false;initial-value:0}
@property --sag{syntax:'<length>';inherits:false;initial-value:2px}
:root{--tsu:#CE1B22;--tho:#E4005A;--ink:#16130F;--koe:#F0EBDC;
      --hioh:#1E7A3C;--nga:#F0B400;--lam:#1B5FA8;--u:8px;--band:22px}
*{box-sizing:border-box;margin:0;padding:0;border-radius:0}
body{background:var(--tsu);color:var(--koe);font-family:'Noto Serif TC',serif;
     font-weight:500;line-height:1.66;padding-inline-end:56px}
/* ... 特徵 1–5 與第七章的片段照抄 ... */
</style>
</head>
<body>
<a class="skip" href="#main">跳到內容</a>

<!-- 濾鏡：印泥厚度（見第十二章） -->
<svg class="defs" aria-hidden="true"><defs>
  <filter id="inkpad" x="-16%" y="-16%" width="136%" height="136%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="bump"/>
    <feDiffuseLighting in="bump" surfaceScale="4.2" diffuseConstant="1.18" lighting-color="#fff" result="lit">
      <feSpotLight x="-26" y="-42" z="118" pointsAtX="37" pointsAtY="37" pointsAtZ="0"
                   specularExponent="6" limitingConeAngle="48"/>
    </feDiffuseLighting>
    <feComponentTransfer in="lit" result="step">
      <feFuncR type="discrete" tableValues="0.46 0.74 1"/>
      <feFuncG type="discrete" tableValues="0.46 0.74 1"/>
      <feFuncB type="discrete" tableValues="0.46 0.74 1"/>
    </feComponentTransfer>
    <feComposite in="step" in2="SourceGraphic" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="mul"/>
    <feComposite in="mul" in2="SourceAlpha" operator="in"/>
  </filter>
</defs></svg>

<div id="drop" class="tarp weave" aria-hidden="true"></div>

<nav class="langpai" aria-label="籠牌">
  <a href="index.html" aria-current="page">舖頭<span class="note">　一行說明</span></a>
  <a href="b.html">第二頁<span class="note">　一行說明</span></a>
</nav>

<header class="wall" aria-label="貼牆">
  <div class="slip sign wind" style="--i:0"><h1>店號</h1><div class="rom">TÂI-LÔ</div></div>
  <div class="slip wind" tabindex="0" style="--i:1">九月初八　林厝<br>紅龜粿十二
    <span class="hid"><br>辰時交　已收定</span></div>
  <!-- …二十幾條… -->
</header>

<main id="main">
  <section class="sec"><h2>本舖</h2>
    <div class="inset"><p>橫排長文只在粿白紙插裡。</p></div>
  </section>
  <section class="sec"><h2>價目</h2>
    <div class="vtab">
      <div class="hdr"><b>價目</b><br>乙巳年九月</div>
      <div><b>紅龜粿</b><br>一粒 <span class="pr">3.5</span> 元</div>
    </div>
  </section>
</main>

<footer>
  <div class="shop">
    <svg class="seal" viewBox="0 0 74 74" width="74" height="74" role="img" aria-label="硃印">
      <rect width="74" height="74" fill="#E4005A"/>
      <g filter="url(#inkpad)" data-ill="seal" data-col="#F0EBDC"></g></svg>
    <div><b>店號</b><br>具體地址<br>電話 <span class="num">05-374 2168</span></div>
    <div>每日 <span class="num">04:30–13:00</span><br>每週三公休</div>
  </div>
  <p class="fict">本站資料為虛構示意。</p>
</footer>

<noscript><p>不靠 JavaScript 傳遞資訊：清單、價目、規矩全部寫在頁面裡。</p></noscript>
<script>/* 第八章引擎 + 落布轉場 */</script>
</body>
</html>
```

---

## 十二、技術實作與相容性

本風格用到三項核心技術，一項在 C 層（版面與樣式）、一項在 A 層（渲染）、一項在 E 層（資料與生成）。

### 12.1 `clip-path: shape()`（C 層）— 承載特徵 5 與簽名動效

**它在這裡承載什麼**：布的自重垂弧與紙的捲邊弧。這兩條弧不是造型，是物理——
而且它們必須是**活的**：風一過，弧線本身重新求值。
`polygon()` 畫不出弧；`path()` 只吃 px 且不能插值；
SVG `clipPath` 吃不到 CSS 變數，也不能用 `transition`。
`shape()` 同時解決三件事：可用 `%`／`calc()`／CSS 變數、可插值、可動畫。

**支援現況（查證於 2026-09-19）**

| 瀏覽器 | 版本 |
|---|---|
| Chrome / Edge | **135**+ |
| Safari | **18.4**+ |
| Firefox | **148**+ |

來源：Chrome for Developers，Noam Rosenthal，〈Use shape() for responsive clipping〉
（<https://developer.chrome.com/blog/css-shape>，2025-04-08；該頁 Browser Support 區塊列出上表），
與 MDN `<basic-shape>` / `shape()` 參考頁。規格見 CSS Shapes 2 `#shape-function`。
`shape()` 於 2026 年 2 月進入 Baseline（newly available），因此**仍須附 fallback**。

**語法要點**（照抄可用）

```css
/* 水平裁邊（布的自重垂弧） */
clip-path: shape(
  from 0 0,
  hline to 100%,
  vline to calc(72% - var(--sag)),
  curve to 0 calc(72% - var(--sag))
    with 74% calc(72% + var(--sag)*2 + 10px) / 26% calc(72% + var(--sag)*2 + 10px),
  close);

/* 垂直裁邊（紙的捲邊弧）；直排的紙一定用這一種，理由見 §7.4 */
clip-path: shape(
  from 100% 0,
  vline to 100%,
  hline to calc(var(--edge) + var(--sag)),
  curve to calc(var(--edge) + var(--sag)) 0
    with calc(var(--edge) - var(--sag)*2 - 9px) 76% / calc(var(--edge) - var(--sag)*2 - 9px) 24%,
  close);
```

`curve to <終點> with <控制點1> / <控制點2>` 為三次貝茲；`close` 可省略（會隱式補上）。
要動畫化弧深，必須先用 `@property` 註冊那個自訂屬性（`syntax:'<length>'`），
否則自訂屬性是字串，不會插值。

**Fallback 的具體行為**

以漸進增強寫：先寫**一定合法**的 `polygon()` 八段折線近似，再用 `@supports` 換成 `shape()`。

```css
.slip{
  --edge:calc(100% - var(--cut) - 52% * var(--lift));
  clip-path:polygon(100% 0,100% 100%,
    var(--edge) 100%,
    calc(var(--edge) - 5px) 76%,
    calc(var(--edge) - 9px) 50%,
    calc(var(--edge) - 5px) 24%,
    var(--edge) 0);
}
@supports (clip-path: shape(from 0 0, line to 100% 100%)){
  .slip{ clip-path:shape(/* …見 §7.4… */); }
}
```

舊瀏覽器得到的是**折線的捲邊**：略硬，但裁切位置、掀起幅度、版面尺寸、
以及「掀起才露出被壓住那半邊的字」的行為**完全相同**，資訊零損失。
若連 `@property` 都不支援（`--lift` 不插值），掀角變成瞬間切換而非過渡——仍然可用。

### 12.2 SVG `<feSpotLight>` ＋ 三階量化（A 層）— 承載特徵 3 的印泥厚度

**它在這裡承載什麼**：硃印的**印泥厚度**。
一枚真的印不是平的色塊：印泥堆在筆畫邊緣，斜光下才看得出那一圈稜。
`feDiffuseLighting` 把 `SourceAlpha` 當高度場（先 `feGaussianBlur` 造出邊緣坡），
`feSpotLight` 給一個**有位置、有指向、有錐角**的光源——
這正是舖裡那盞吊燈：光是一圈**有邊界**的光潭，不是環境光。

關鍵在最後一步：把光照結果用 `feComponentTransfer type="discrete"` 壓成**三階**，
所以畫面上不會出現任何平滑漸層（符合特徵 1 的零漸層）。
`tableValues="0.46 0.74 1"` 即三階；要四階就寫四個值。

**支援現況（查證於 2026-09-19）**：MDN `<feSpotLight>` 標示
**Baseline Widely available，自 2015 年 7 月起全瀏覽器可用**。
`feDiffuseLighting`、`feComponentTransfer`、`feComposite operator="arithmetic"` 同為 SVG 1.1 濾鏡基本元素。

**注意**：`feSpotLight` 的 `x/y/z`、`pointsAtX/Y/Z` 在 `primitiveUnits` 的座標系裡
（預設 `userSpaceOnUse`），所以它們是**該 SVG viewBox 的座標**，不是 CSS 像素。
本例的印是 `viewBox="0 0 74 74"`，光源指向 `(37,37,0)`、`z=118`、`limitingConeAngle="48"`。

**Fallback 的具體行為**：把濾鏡掛在**內層 `<g>`** 上、紅底用 `<rect>` 畫在 SVG 裡，
而不是靠 CSS `background` ——這樣濾鏡失效時，印仍然是「紅塊＋粿白筆畫」的完整白文印，
只少了那一圈印泥稜。**不得**把濾鏡掛在外層 `<svg>` 並用 CSS `background` 當紅底：
那個組合在不同引擎下對 `SourceGraphic` 的認定不一致。

### 12.3 自寫可變寬度毛筆實筆引擎（E 層）— 承載第八章

見 8.1／8.2。它同時輸出：全站每一筆器物與紋樣、`logo.svg`、硃印的筆畫。
`logo.svg` 由建置腳本呼叫**同一份原始碼**產生，所以 logo 與站上的筆是同一支筆。

**決定性**：隨機來源只有一個 32 位 LCG（`s*1664525+1013904223`），
每一筆給固定 seed，所以同一筆永遠長一樣——重新整理不會變，兩台機器不會不同。

### 12.4 效能預算（實測值）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | **44.7 – 52.5 KB** | ≤ 350 KB |
| 引擎輸出路徑數（全站 21 個圖形） | **147 條 path**，座標皆在 viewBox 內 | — |
| 首屏 JS（引擎 + 繪製 + 綁定） | 一次性、無 rAF 迴圈；jsdom 環境下 4 頁皆 **0 error** | ≤ 100 ms |
| 動畫 | 全為 CSS（`--sag`／`--lift`／`background-position`），無 JS 逐幀、無 layout thrashing | 60fps |
| 外部資源 | **僅 Google Fonts 兩支**；零外部圖片、零音檔、零第三方 JS | — |

**為什麼沒有 rAF 迴圈**：風、落布、掀角、開籠全部是 CSS 自訂屬性的插值，
交給合成器；JS 只做三件事——產生 path、綁事件、算還禮簿的規矩。
這也是 `clip-path: shape()` 值得選的理由：把一個會動的幾何交給 CSS，而不是每幀重算 SVG path 字串。

---

## 十三、驗收：三秒辨識測試

遮掉全部文字，只看首屏。一個懂設計的人要能在三秒內說出
「這是台灣廟口／辦桌那種紅」。做不到就回去加強下面五件事，而不是加強引擎：

1. 朱紅有沒有真的當地色（不是當強調色）？
2. 桃紅的紙有沒有成塊出現（不是只有幾行字）？
3. 有沒有一整面**直排**的紙？
4. 畫面上有沒有一個**正圓**的器物與一個**直角**的承載物同時在場？
5. 紅白藍條帆布在不在，條寬是不是固定像素？
