---
name: signal-decay
description: A monochrome analog-signal aesthetic built from scanlines, oxide ink steps and machine-panel hairlines, where visual quality itself is an interactive parameter.
---

# 訊號衰減風 Signal-Decay

> 一套把「畫質」變成介面變數的視覺語言。整站活在單一氧化褐墨階裡，所有圖像由水平掃描線構成，
> 版面像一台可以被調校的機器面板。適用於任何「有損耗、有還原、有精度」的產業：檔案修復、
> 精密量測、聲學工程、天文觀測、醫學影像、資料鑑識、老件保養。

---

## 一、設計哲學

1. **衰減是主題，不是裝飾。** 這個風格的核心命題是：訊號從來源到眼前的路上一直在變差，而介面是攔截它的地方。因此畫面必須看得出「有東西正在流失」——掃描線之間的黑帶、脫落的行、抖動的邊緣。不要把它做成「賽博龐克故障風」：沒有霓虹、沒有色差 RGB 分離、沒有隨機亂碼美學。這裡的損壞是物理的、可量測的、可被修好的。

2. **單一色相是紀律。** 全站只有一個色相（氧化褐）的七個明度階。放棄第二色相會逼你用明度、線寬、密度與留白去做層級——這正是這個風格的力量來源。任何一點彩色都會立刻把整個系統的張力洩掉。

3. **圖像由線構成，不由面構成。** 沒有照片、沒有填色插圖。所有形體都是水平掃描線的位移量，就像映像管一次只能畫一條線。這讓插畫、資料視覺化與 UI 使用同一套語法。

4. **機器面板的誠實。** 每一個控制項都應該對應一個可以被說出口的物理量（追蹤、時基、偏磁、增益）。標籤用中英雙行：中文給人看，英文小字給機器感。不要有「探索更多」這種按鈕。

5. **可調的品質。** 這個風格允許「畫質」本身是使用者能操作的參數。可以是校正、可以是對焦、可以是增益——但一定要有一個回到清晰的路徑，而且不能藏起來。

---

## 二、色彩系統

單一氧化褐色相的七階墨。**不要新增第二色相。**

| 變數 | Hex | 用途 | 概略比例 |
|---|---|---|---|
| `--i0` | `#0E0C0A` | 頁面底色、影像區底 | 46% |
| `--i1` | `#171310` | 面板／側欄／頁尾底 | 18% |
| `--i2` | `#241D17` | 次級面板、選中列、提示條 | 6% |
| `--i3` | `#3A2F26` | 主分隔線（`--rule`）、滑軌 | 8% |
| `--i4` | `#6B5A48` | 標籤、單位、次要說明文字 | 8% |
| `--i5` | `#9C8570` | 內文次要、圖形填塊、按鈕框線 | 8% |
| `--i6` | `#CFC2AF` | 內文主色 | 4% |
| `--i7` | `#EDE3D4` | 標題、數值、掃描線墨、反白按鈕底 | 2% |

補充：髮線分隔 `--hair:#2A231C`（比 `--rule` 更輕，用於表格列與密集清單）。

使用規則：

- **反白即強調**：唯一的「主色按鈕」是把 `--i7` 當底、`--i0` 當字。不要做外框發光、不要做漸層。
- **深底恆定**：任何區塊都不得使用淺底大面積反轉（那會變成另一個風格）。要提亮只能提到 `--i1`。
- **不透明度取代色階**：掃描線本身用 `rgba(237,227,212, 0.30–0.85)` 表現遠近與損傷，不要用不同色票。
- **禁止**：任何綠色終端機螢光、任何洋紅／青的色差特效、任何暖橘爐火感。這三者會把它推進別的家族。

---

## 三、字體系統

Google Fonts 兩款，不再多。

```html
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;500;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

- **Martian Mono**（`--mono`）：所有編號、時間碼、數值、單位、英文標籤、按鈕文字。它的字身偏寬、字腔方正，放大寫加寬字距後非常像儀器面板網印。**永遠加字距**：標籤 `.18–.34em`，數值 `.08–.14em`。
- **Noto Sans TC**（`--han`）：所有中文。標題用 900，小標 700，內文 400。

字級 scale（桌機）：

| 角色 | 字級 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| H1 | `clamp(28px, 7.4vw, 74px)` | 900 | 1.06 | -.01em |
| H2 | `clamp(21px, 3vw, 30px)` | 900 | 1.20 | .02em |
| H3 | 16–19px | 700 | 1.4 | .04em |
| 內文 | 15px | 400 | 1.75 | .01em |
| 次要內文 | 13–13.5px | 400 | 1.7 | 0 |
| 面板標籤 | 9–10px mono | 300/500 | 1.4 | .20–.24em |
| 大數值 | 26–44px mono | 700 | .9 | .14em |

排版規則：H1 一律手動斷行成 2–3 行，讓它形成一個矩形量塊；中文標題不要標點。內文 `max-width:62ch`。

---

## 四、版面與網格

**骨架：頂列 ＋ 左磁軌尺 ＋ 主欄。**

```
┌──────────────────────────────────────────┐
│ 磁帶計數器列（sticky, 58px）              │
├────┬─────────────────────────────────────┤
│磁軌│  主欄（區塊之間用 1px 實線切開）      │
│尺  │  ┌──────────────┬────────────────┐  │
│84px│  │ 操作／內容    │ 影像／讀數     │  │
│    │  └──────────────┴────────────────┘  │
└────┴─────────────────────────────────────┘
```

- **左磁軌尺**：寬 84px，底紋為 `repeating-linear-gradient(180deg, var(--hair) 0 1px, transparent 1px 14px)`，內容為 sticky 的直排英文標籤（`writing-mode: vertical-rl`）＋一個 7×7 實心方點＋一組時間碼。≤900px 隱藏。
- **分格全用 1px 實線**，顏色 `--rule`。**零圓角、零模糊陰影**。需要強調邊界時用「登記標記」：面板四角各放一個 9×9 的 L 形線角（`.tick`），這是印刷對位記號的挪用。
- **不對稱**：主要區段一律採 `minmax(0,1.15fr) minmax(300px,.85fr)` 之類的偏比例，不要 50/50。左重右輕（操作在左、讀數在右）是預設方向。
- **區段內距**：桌機 `52px 40px`（緊湊區段 `30px 40px`），手機 `38px 20px`。
- **留白規則**：區段之間**不留外距**，全靠 1px 線切開；留白只存在於區段內部。這讓整頁像一張連續的機箱面板而不是卡片流。
- **RWD**：≤900px 收成單欄、磁軌尺隱藏、頂列導覽換行成滿寬橫捲列、所有二欄網格降為一欄並改以水平線分隔。

---

## 五、元件配方

### 5.1 導覽（磁帶計數器列）

```css
.tb{position:sticky;top:0;z-index:800;background:var(--i1);border-bottom:1px solid var(--rule);
    display:grid;grid-template-columns:auto 1fr auto;min-height:58px}
.tb .brand{display:flex;align-items:center;gap:10px;padding:0 16px;border-right:1px solid var(--rule)}
.tbnav a{display:flex;flex-direction:column;justify-content:center;padding:6px 18px;
         border-right:1px solid var(--hair)}
.tbnav a .t{font-family:var(--mono);font-size:8.5px;letter-spacing:.2em;color:var(--i4)} /* T1 軌號 */
.tbnav a .n{font-size:13.5px;font-weight:700;letter-spacing:.1em;color:var(--i6)}        /* 中文頁名 */
.tbnav a[aria-current="page"]{background:var(--i7)}
.tbnav a[aria-current="page"] .n{color:var(--i0)}
```

每個導覽項是「軌號 ＋ 中文頁名」的兩行結構（T1／校正台）。右端固定放兩個讀數：訊號品質 `Q98` 與一個隨捲動位置跳動的四位計數器 `0247`。目前頁用整格反白，不用底線。

### 5.2 按鈕

```css
.btn{font-family:var(--mono);font-size:11px;letter-spacing:.16em;padding:11px 18px;
     border:1px solid var(--i5);background:transparent;color:var(--i7);cursor:pointer;
     transition:background .12s linear,color .12s linear}
.btn:hover{background:var(--i7);color:var(--i0)}
.btn.solid{background:var(--i7);color:var(--i0);border-color:var(--i7)}
```
只有兩種：線框與反白。hover 一律整塊反色，**不做位移、不做陰影、不做圓角**。

### 5.3 面板

```css
.panel{border:1px solid var(--rule);background:var(--i1);position:relative}
.panel>.ph{display:flex;justify-content:space-between;padding:9px 14px;
           border-bottom:1px solid var(--rule);font-family:var(--mono);
           font-size:9.5px;letter-spacing:.22em;color:var(--i5)}
.tick{position:absolute;width:9px;height:9px;border:1px solid var(--i4)}
.tick.tl{top:-1px;left:-1px;border-right:0;border-bottom:0} /* 其餘三角同理 */
```
面板頭一律左右兩段小字（英文代號 ／ 中文說明）。四角登記標記只用在重要面板，不要每個框都加。

### 5.4 表單

- `input/select/textarea`：`background:var(--i0)`、`border:1px solid var(--rule)`、`font-family:var(--mono)`、字距 `.06em`、無圓角。focus 只把邊框提到 `--i5`，不加光暈。
- `label`：mono 9.5px、字距 `.20em`、`--i4`、置於欄位上方 6px。
- **checkbox 自繪**：隱藏原生 input，用 11×11 的方框 `.bx`；勾選時整塊填 `--i7`（不畫勾），文字提亮到 `--i7`。整個 `.opt` 是可點的區塊，區塊之間用 1px `--rule` 間隙（`gap:1px;background:var(--rule)`）拼成密接網格。
- **錯誤訊息**：不要紅色。用 `.err`＝`--i2` 底、左側 2px `--i5` 實線、mono 10px。訊息要寫明正確格式與範例。
- **range 滑桿**：軌 2px `--i3`，拇指是 3px 寬、22–26px 高的實心長條 `--i7`（像機械指針）。務必同時寫 `::-webkit-slider-thumb` 與 `::-moz-range-thumb`。

### 5.5 資料表與時間軸

表格：`th` 用 mono 9px `--i4` 常規字重＋大字距；`td` 底線用 `--hair`；數值欄右對齊並套 mono ＋ `--i7`。
時間軸列採 `grid-template-columns:120px 1fr auto`（日期／內容／狀態徽章），列高 14px 內距，hover 換底 `--i1`，選中換 `--i2`。狀態徽章是 mono 9px 的方框，三態：線框（預定）／亮框（已完成）／反白（進行中）。

### 5.6 頁尾

`--i1` 底、上方 1px `--rule`、三欄 `1.4fr 1fr 1fr`：品牌與一句定位／地址電話時間（mono 10.5px、行高 2）／頁面連結。最後一行放 mono 9px `--i3` 的極小聲明。

---

## 六、動效規則

**總原則：這個風格的動態幾乎全部來自訊號本身，UI 元件幾乎不動。**

| 對象 | 觸發 | 時長 | 曲線 | 內容 |
|---|---|---|---|---|
| 按鈕／導覽反白 | hover | 120ms | linear | 只換 `background` 與 `color` |
| 滑桿讀數與量表 | input | 120ms | linear | 量表寬度過渡 |
| 掃描線訊號 | 持續 rAF | — | — | 逐線抖動、時基正弦擺盪、隨機整行脫落 |
| 訊號雜訊帶 | 持續 rAF | — | — | 一條高 6–32px 的極淡橫帶以 40–260px/s 由上往下掃 |
| 自動校正 | 點擊 | 1500ms | `1-(1-p)³` | 三軸同步趨近真值 |
| 文字劣化 | 品質值改變 | 即時 | — | 依品質重算被替換的字元（不做逐字動畫） |

明確**不使用**：淡入揭示進場、數字滾動計數、按壓硬陰影位移、`stroke-dashoffset` 描繪、視差捲動、彈跳緩動。

`prefers-reduced-motion` 降級（必做）：
- 停止 rAF 迴圈，只畫一幀靜態訊號；
- 站體以「已鎖定」狀態載入，不做文字劣化；
- 全域 `transition/animation` 壓到 `0.001ms`；
- 全域掃描線覆蓋 `opacity` 由 0.55 降到 0.22。

---

## 七、插畫與圖像風格：`scanline-raster` 掃描線光柵

**唯一的圖像語法。** 把母題寫成隱函數場 `f(u,v) → 0..1`（墨量），再以等距水平掃描線取樣：每條線的 y 位移量與不透明度就是該處的調子。等於用映像管的方式畫圖。

```js
var MOTIF = {
  reel: function(u,v){                       // 膠卷盤
    var x=u-0.5, y=v-0.5, r=Math.sqrt(x*x+y*y), a=Math.atan2(y,x);
    var ring=(r>0.30&&r<0.44)?1:0, hub=(r<0.085)?1:0;
    var spoke=(r>0.10&&r<0.30&&Math.abs(Math.sin(a*3))>0.86)?0.85:0;
    return Math.max(ring, Math.max(hub, spoke));
  }
};

function raster(host, motif, o){
  var W=o.w, H=o.h, step=o.step||4, amp=o.amp||9, dmg=o.dmg||0, f=MOTIF[motif];
  var seed=o.seed||7;
  function rnd(){ seed=(seed*1664525+1013904223)%4294967296; return seed/4294967296; }
  var p=['<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="'+o.alt+'">'];
  for(var y=step; y<H; y+=step){
    var v=y/H;
    var dx=(rnd()-0.5)*dmg*11 + Math.sin(v*Math.PI*3.4)*dmg*16;  // 抖動＋時基擺盪
    if(dmg>0.12 && rnd()<dmg*0.20) continue;                      // 整行脫落
    var d='', pen=false;
    for(var x=0;x<=W;x+=3){
      var u=(x-dx)/W, dens=(u<0||u>1)?0:f(u,v);
      if(dmg>0.3 && ((x*7+y*13)%211) < dmg*30){ pen=false; continue; } // 局部脫落
      var yy=y-dens*amp;
      d += (pen?'L':'M')+x+' '+yy.toFixed(2); pen=true;
    }
    p.push('<path d="'+d+'" fill="none" stroke="#EDE3D4" stroke-width="'+(0.9+(1-dmg)*0.5).toFixed(2)
          +'" opacity="'+(0.34+(1-dmg)*0.5).toFixed(2)+'"/>');
  }
  host.innerHTML = p.join('')+'</svg>';
}
```

參數建議：`step:4`、`amp:8–10`（約 2.1×step）、線寬 0.9–1.4、不透明度 0.34–0.84。
`dmg` 是**語意參數**：0.95＝到件狀態、0.44＝掃描後、0.02＝交件母帶。同一組母題用不同 `dmg` 渲染，就得到一整套「同一張圖的不同世代」，這是本風格最有效的敘事工具。

母題寫法要點：用距離場、正弦帶、橢圓遮罩三種原語組合即可；避免細節超過一條掃描線的高度（會消失）。

全站覆蓋層（讓所有內容看起來在同一支螢幕上）：

```css
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:900;
  background:repeating-linear-gradient(180deg,rgba(0,0,0,.30) 0 1px,rgba(0,0,0,0) 1px 3px);
  opacity:var(--sl);mix-blend-mode:multiply}
```

**禁止**：細線幾何線描、半調網點、等角視圖、任何填色插圖、任何外部圖片。

---

## 八、Logo 與 Favicon

**構成邏輯**：三條水平掃描線，中央那條被切開一個缺口，缺口裡放一個實心方塊——「缺的那一格被補回來」。上下各四個 `--i3` 的小方塊代表齒孔。字標為 Noto Sans TC 900 中文（字距 6）＋下方 Martian Mono 8.5px 英文（字距 4.6）。

Logo 尺寸關係：線寬 3.4、線間距 16、補格方塊 18×13 並加 1.2 白框。導覽列版縮成 26×26 的純記號（去掉齒孔與字標）。

Favicon（原創 inline SVG data URI，寫在 `<head>`）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230E0C0A'/%3E%3Cg stroke='%23EDE3D4' stroke-width='2.4'%3E%3Cpath d='M5 9h22'/%3E%3Cpath d='M5 15h9'/%3E%3Cpath d='M19 15h8'/%3E%3Cpath d='M5 21h22'/%3E%3C/g%3E%3Crect x='13' y='12' width='7' height='6' fill='%239C8570'/%3E%3C/svg%3E">
```

換產業時只需替換「中央被補回的那一格」的語意：量測風格可換成刻度缺口，聲學可換成波形缺口。三線結構不要動。

---

## 九、Do & Don't

**Do**

- 只用一個色相的明度階；用線寬與密度做層級。
- 每個控制項對應一個可命名的物理量，標籤中英雙行。
- 圖像一律走 `scanline-raster`，並以 `dmg` 參數串起敘事。
- 區塊之間只用 1px 實線切開，不留外距。
- 數值一律 mono ＋ `--i7`；單位與標籤一律 mono ＋ `--i4` ＋大字距。
- 文案寫具體的機器、時數、溫濕度、費率與失敗案例。技術名詞不要解釋成廣告詞。
- 任何「破格」互動都要配自動完成與略過的出口，以及無 JS 可讀的內容。

**Don't**

- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片
- ✗ 任何圓角、任何模糊陰影、任何漸層填色
- ✗ emoji 當 icon；icon 一律自繪 SVG（本風格甚至建議少用 icon，改用文字代號）
- ✗ 螢光綠終端機、RGB 色差故障美學、蒸氣波霓虹——那是另一個家族
- ✗ 「EST. 19xx」年份徽章、「把 X 變成 Y」句式標題、「在當今快節奏的世界」式開場
- ✗ 跑馬燈橫幅（本風格的動態應該來自訊號，不是捲動的字）
- ✗ Lorem ipsum、外部圖片、外部音檔（僅允許 Google Fonts）
- ✗ 讓劣化效果寫進 HTML 原始文字（必須是乾淨 HTML＋JS 覆寫，否則搜尋引擎與無障礙全毀）

---

## 十、首創技術實作配方：損毀—校正式站體

這是本站認領的全館首創，也是本風格最具辨識度的一招。**要點：網站自己就是那個受損的訊號。**

### 10.1 三軸模型

定義 N 個軸（建議 3 個），每軸有隱藏真值：

```js
var TARGET = {trk:63, tbc:37, bias:72};   // 追蹤 / 時基 / 偏磁
var st     = {trk:14, tbc:88, bias:21};   // 初始值刻意遠離
function axisLock(k){ return Math.max(0, 1 - Math.abs(st[k]-TARGET[k])/46); }
function quality(){
  var q = axisLock('trk')*0.40 + axisLock('tbc')*0.34 + axisLock('bias')*0.26;
  return Math.round(Math.pow(q,1.35)*100);   // 冪次讓最後 10 分要真的調準
}
```

**可用性關鍵**：每軸都要顯示自己的「鎖定度 %」量表。不告訴使用者方向，但告訴他冷熱——這讓爬山式調整成立，否則就是亂猜。真值必須寫死，不可每次重載亂數，否則使用者的肌肉記憶會被背叛。

### 10.2 三軸各自對應一種可見的破壞

| 軸 | 誤差表現 | 實作 |
|---|---|---|
| 追蹤 TRACKING | 逐線水平抖動 | 每條掃描線 `dx += (rnd()-0.5)*err*95` |
| 時基 TIMEBASE | 整體正弦擺盪／翻滾 | `dx += Math.sin(v*PI*3.2 + t*1.4)*err*70` |
| 偏磁 BIAS | 整行脫落＋局部斷點 | `if(rnd() < err*0.42) continue;` 與 `((x*7+y*13+t)%223) < err*44` |

三者必須表現不同，否則使用者分不出是哪一軸在錯。

### 10.3 文字劣化（最關鍵的一步）

HTML 裡永遠是乾淨文字；劣化只由 JS 在載入後覆寫 TextNode：

```js
var GLY='▓▒░▚▞╳◼◻┃━┊┈╱╲', nodes=[];
document.querySelectorAll('[data-degrade] h1,[data-degrade] p,[data-degrade] td').forEach(function(h){
  var w=document.createTreeWalker(h, NodeFilter.SHOW_TEXT, null), n;
  while((n=w.nextNode())) if(n.nodeValue.trim()) nodes.push({n:n,o:n.nodeValue});
});
function degrade(q){
  var p = Math.max(0,(92-q)/92) * 0.52;          // 上限 52%，超過就讀不出結構
  nodes.forEach(function(it){
    if(p<=0.001){ it.n.nodeValue = it.o; return; }
    var out='';
    for(var j=0;j<it.o.length;j++){
      var ch=it.o[j];
      out += (ch===' ') ? ch : (crnd()<p ? GLY[(crnd()*GLY.length)|0] : ch);
    }
    it.n.nodeValue = out;
  });
}
```

三個必守的界線：**空白字元不替換**（保住斷詞與版面）、**替換率上限 0.52**（再高就變成純噪音，使用者會直接離開）、**亂數必須是可重現的種子式 PRNG 並以品質值餵種**（否則每次重繪字都在跳，看起來像壞掉的網站而不是壞掉的訊號）。

### 10.4 跨頁沿用

```js
SIG.set(q);                                    // sessionStorage
document.documentElement.style.setProperty('--sl', (0.16+(100-q)/100*0.62).toFixed(3));
```
其他頁只讀值、只調整全域掃描線濃度，**不做文字劣化**——同一招在第二頁就不有趣了，而且會變成阻礙。

### 10.5 出口（破格≠難用）

必備四項，缺一不可：

1. 「自動校正」按鈕，1500ms 內三軸緩動到真值；
2. 「略過校正，直接鎖定」連結，放在校正台上方而不是藏在下面；
3. `prefers-reduced-motion` 直接以鎖定狀態載入，且不啟動 rAF；
4. `<noscript>` 說明＋乾淨 HTML：關掉 JS 時全站文字完整可讀。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…原創 SVG…">
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;500;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--i0:#0E0C0A;--i1:#171310;--i2:#241D17;--i3:#3A2F26;--i4:#6B5A48;--i5:#9C8570;
      --i6:#CFC2AF;--i7:#EDE3D4;--rule:#3A2F26;--hair:#2A231C;--sl:.3;
      --mono:'Martian Mono',monospace;--han:'Noto Sans TC',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--i0);color:var(--i6);font-family:var(--han);font-size:15px;line-height:1.75}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:900;
  background:repeating-linear-gradient(180deg,rgba(0,0,0,.3) 0 1px,rgba(0,0,0,0) 1px 3px);
  opacity:var(--sl);mix-blend-mode:multiply}
.shell{display:grid;grid-template-columns:84px 1fr;min-height:100vh}
.rail{border-right:1px solid var(--rule);
  background:repeating-linear-gradient(180deg,var(--hair) 0 1px,transparent 1px 14px)}
.sec{border-bottom:1px solid var(--rule);padding:52px 40px}
.kick{font-family:var(--mono);font-size:9.5px;letter-spacing:.3em;color:var(--i4);margin-bottom:14px}
h1{font-weight:900;font-size:clamp(28px,7vw,74px);line-height:1.06;color:var(--i7)}
@media(max-width:900px){.shell{grid-template-columns:1fr}.rail{display:none}.sec{padding:38px 20px}}
@media(prefers-reduced-motion:reduce){*{transition-duration:.001ms!important}body::after{opacity:.22}}
</style>
</head>
<body>
<header class="tb">
  <a class="brand" href="index.html"><!-- 26×26 記號 --><span><b>品牌</b><i>BRAND</i></span></a>
  <nav class="tbnav">
    <a href="index.html" aria-current="page"><span class="t">T1</span><span class="n">首頁</span></a>
    <a href="b.html"><span class="t">T2</span><span class="n">第二頁</span></a>
  </nav>
  <div class="tbq"><span>SIG</span><b id="qread">Q98</b><span class="ctr" id="ctr">0000</span></div>
</header>

<div class="shell">
  <aside class="rail"><div class="stick">
    <span class="vtxt">TRACK 01 / SECTION</span><span class="dot"></span><span class="tcode">00:00:00:00</span>
  </div></aside>
  <main>
    <section class="sec" data-degrade>
      <div class="kick">SECTION / 區段</div>
      <h1>兩行以內<br>的量塊標題</h1>
      <p>具體、可查證、有數字的內文。</p>
    </section>

    <section class="split">
      <div class="a"><!-- 操作 --></div>
      <div class="b"><div id="art"></div><!-- scanline-raster --></div>
    </section>
  </main>
</div>

<footer>…三欄：品牌／地址電話時間／連結…</footer>
<script>/* raster()、applySignal()、degrade() */</script>
</body>
</html>
```

---

*風格代號 `signal-decay`。原始範例站：補格影音修復所 PATCHFRAME（影音檔案修復所）。*
