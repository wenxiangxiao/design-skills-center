---
name: rosta-window-stencil
description: Soviet ROSTA Window agitprop poster grammar — a nine-panel narrative grid of stencil-cut silhouettes printed in three opaque distemper plates (ink, ochre, vermilion) with visible mis-registration, rhymed imperative caption bands, and bridge-safe cut geometry.
---

# 窗口風｜ROSTA 窗・模版三色套印

> 本規格書描述的是 **Окна сатиры РОСТА**（ROSTA 諷刺之窗，莫斯科，1919–1921）的視覺語言。
> 那是一批用**模版（трафарет）**刷在空店面玻璃上的**分格海報**，由馬雅可夫斯基（Владимир Маяковский）
> 與切列姆內赫（Михаил Черемных）等人一天畫完、一天貼上，給**看不懂字的人**看的。
> 它不是「復古蘇聯風」也不是「構成主義」——構成主義是照片蒙太奇與對角幾何，
> 本流派是**手割模版的剪影敘事**：連續分格、極少的顏色、押韻的命令句、看得見的套色偏差。
>
> 這份 SKILL 不綁定產業。只要你的內容能被拆成「一格一件事、最後一格要人動」，它就適用。

---

## 一、設計哲學

**三句話：**

1. **一扇窗，不是一張海報。** 最小單位是 6–12 格（標準九格）的一整組，格與格之間有先後。單獨拿掉任何一格，這個風格就垮了——因為它的資訊結構是**連讀**，不是構圖。
2. **有顏色的地方，是模版上沒有材料的地方。** 每一個造形都必須「割得下來」：沒有細於 4 單位的刀路、沒有懸空的孤島、沒有漸層與陰影。這條物理限制決定了全部的形狀語彙。
3. **讀不懂是刻的人的錯，不是看的人的錯。** 這是本流派唯一的驗收標準。字帶存在，但它是**補充**；把字全部遮掉還讀得出來，才算完成。

**它為什麼長成這樣：** 1919 年的莫斯科沒有印刷機能供應日更的海報，紙也缺。於是他們改用模版——一張母版割一次，用刷子隔著它刷，一天可以複製 100–300 份，分送各城市的空櫥窗。模版限制了顏色數（一色一片銅／紙板）、限制了線的粗細（刷子會把細線糊掉）、限制了形狀（懸空的島會掉下來）。**這些不是風格選擇，是製程後果**——而正因為是後果，它們才長得那麼一致，那麼難假造。

---

## 二、本風格的 5 個不可省略特徵

> 這五項任一缺席，做出來的東西就不是 ROSTA 窗。每一項都附可直接複製的片段。

### 特徵 1｜分格連讀的敘事網格（拿掉它 → 變成一張普通海報）

等大方格排成 3×3（或 2×N、4×N），格與格之間隔的是**紙**（8–12px 的空隙）而不是線。閱讀順序左上→右下。**最後一格一定是要人做的那件事，而且一定有箭頭。**每一格的四條橫向軌道——格號帶／圖區／刀痕帶／字帶——必須在整扇窗上對齊成一氣。

```css
.window{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;
        background:var(--paper);padding:10px}
.cell{display:grid;grid-row:span 4;grid-template-rows:subgrid;row-gap:6px}
@supports not (grid-template-rows:subgrid){
  .cell{grid-row:auto;grid-template-rows:22px 1fr 10px auto}}
/* 手工貼的紙不會正 */
.cell:nth-child(3n+1){rotate:-.32deg}
.cell:nth-child(3n+2){rotate:.18deg}
.cell:nth-child(3n+3){rotate:-.14deg}
```

### 特徵 2｜模版可割造形（拿掉它 → 變成一般扁平插畫）

三條硬規則，違反就退回重刻：

| 規則 | 數值 | 為什麼 |
|---|---|---|
| 最小刀寬 | ≥ 4 單位（畫布 100 單位制） | 更細的洞刷子會糊掉 |
| 懸空孤島 | 0 塊 | 被墨完全包住的銅片會掉下來 |
| 漸層／陰影／網點 | 一律 0 | 模版只有「有洞」與「沒洞」兩種狀態 |

因此**輪廓一律用「沿邊刷一道、兩端留連橋缺口」的分段桿**，而不是描邊路徑；**環形一律留缺口**。

```js
// 輪廓：沿每一條邊刷一道，兩端各留 gap 的連橋缺口 → 永不產生孤島
function outline(pts,t,gap){var o=[],n=pts.length;gap=gap==null?t*0.95:gap;
  for(var i=0;i<n;i++){var a=pts[i],b=pts[(i+1)%n];
    var dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1;
    if(L<=2*gap+t)continue;var ux=dx/L,uy=dy/L;
    o.push(bar(a[0]+ux*gap,a[1]+uy*gap,b[0]-ux*gap,b[1]-uy*gap,t))}
  return o}
function frame(x,y,w,h,t,gap){
  return outline([[x+t/2,y+t/2],[x+w-t/2,y+t/2],[x+w-t/2,y+h-t/2],[x+t/2,y+h-t/2]],t,gap)}
```

### 特徵 3｜三塊不透明水膠版 + 永不修正的套色錯位（拿掉它 → 變成向量圖示）

**墨 → 赭 → 朱**，三塊，沒有第四塊。三塊之間永遠有 1–3px 的偏移，**而且不修**。重疊處的顏色不是設計出來的，是疊出來的（`mix-blend-mode: multiply`）。

```css
.cut{isolation:isolate}          /* 每一枚圖自成疊印堆疊脈絡 */
.pl{mix-blend-mode:multiply}     /* 三塊版互相疊印，重疊處自動變深 */
.p-i path{fill:#181410}          /* 墨 */
.p-r path{fill:#C4271A}          /* 朱 */
.p-o path{fill:#C4902C}          /* 赭 */
.p-r{translate:var(--rx) var(--ry)}
.p-o{translate:var(--ox) var(--oy)}
```

### 特徵 4｜押韻兩行的命令句字帶（拿掉它 → 變成無聲的圖示牆）

每一格底下一條字帶，**兩行，行末押韻，語氣是命令句或第二人稱直述**。字是「畫」上去的，所以字重極粗（900）、字寬撐滿格寬、行高壓到 1.34。不押韻的退回重寫——押韻是為了讓看不懂字的人**聽別人唸一次就記得**。

```css
.verse{font-weight:900;font-size:clamp(13px,1.55vw,17px);line-height:1.34;
       letter-spacing:.02em;padding:5px 4px 7px;background:var(--paper)}
.verse b{display:block;font-weight:900}
```

```html
<span class="verse"><b>名字寫不出來</b><b>按個指印就在</b></span>
```

### 特徵 5｜粗實心箭頭與指示手（拿掉它 → 沒有人知道要做什麼）

裝飾母題只有兩種：**箭頭**與**指示的手**。沒有花飾、沒有邊框紋樣、沒有徽章。箭頭桿寬 ≥15、頭寬 ≥34（頭再窄會被讀成雨傘）；箭頭一律用朱。

```js
function arrow(x1,y1,x2,y2,w,hw,hl){
  var dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux;
  var bx=x2-ux*hl,by=y2-uy*hl;
  return[[x1+nx*w/2,y1+ny*w/2],[bx+nx*w/2,by+ny*w/2],[bx+nx*hw/2,by+ny*hw/2],[x2,y2],
         [bx-nx*hw/2,by-ny*hw/2],[bx-nx*w/2,by-ny*w/2],[x1-nx*w/2,y1-ny*w/2]]}
// 用法：arrow(4,52,54,52,15,34,22)  ← 桿 15、頭寬 34、頭長 22
```

---

## 三、色彩系統

三塊版 + 兩種底。**沒有第四塊版**——需要第四個顏色時，答案永遠是「用疊印」或「用留白」。

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 磁磚牆 `--wall` | `#6E8781` | 頁底：貼窗的那面牆。永遠有 2px 深一階的磚縫格 | ~30% |
| 磚縫 `--wall-d` | `#5C7570` | 只做 2px 硬邊格線，不做陰影 | ~2% |
| 包裝紙 `--paper` | `#DCCFB2` | 窗紙。**所有長文一律在紙上，不在牆上** | ~28% |
| 紙暗 `--paper-d` | `#CDBE9C` | 圖區底、次要列、選項底 | ~6% |
| 墨 `--ink` | `#181410` | 墨版、正文、資訊帶。不是純黑（純黑刷不出來） | ~22% |
| 朱 `--red` | `#C4271A` | **只給：要人動的事、要人小心的事、現用態、箭頭** | ~14% |
| 赭 `--ochre` | `#C4902C` | 色域填充、地平線、次要標記 | ~6% |
| 銅 `--brass` | `#9A8F72` | 模版銅片本身（導覽、對版台、蓋住字帶的那片） | ~5% |

**硬規則**

1. **朱有語意，不是品牌色。** 不能拿朱當「主色」貼在 logo、標題底、hover 底。朱出現＝有事要你做。
2. **零漸層。** 唯一允許的 gradient 函數是**硬停格**的 `repeating-linear-gradient`（磚縫、刀痕虛線），不得有任何柔性色彩過渡。
3. **零模糊陰影。** 需要立體感時用實心位移色塊或 2–3px 的硬邊框。
4. **重疊處不指定顏色。** 讓 `multiply` 算。朱疊赭 = 暗紅、墨疊任何 = 墨。
5. **牆不放長文。** 牆是牆，紙是紙。

```css
body{background:#6E8781;background-image:
  repeating-linear-gradient(0deg,#5C7570 0 2px,transparent 2px 62px),
  repeating-linear-gradient(90deg,#5C7570 0 2px,transparent 2px 62px)}
```

---

## 四、字體系統

| 角色 | 字體 | 字重 | 尺寸 |
|---|---|---|---|
| 字帶（押韻兩行） | Noto Sans TC | **900** | `clamp(13px,1.55vw,17px)` / lh 1.34 |
| 版頭大標 | Noto Sans TC | **900** | `clamp(30px,6.4vw,64px)` / lh 1.06 |
| 章節標 | Noto Sans TC | 900 | `clamp(20px,2.7vw,28px)` |
| 正文 | Noto Sans TC | 400／500 | 16px / lh 1.72 |
| 格號・數值・拉丁 | **Archivo Black** | — | 12–22px，`letter-spacing:.04–.1em` |

規則：

- **只有兩支字體。** 一支極粗黑體承擔全部中文，一支極粗拉丁黑體承擔全部數字與編號。沒有襯線體，沒有第三支。
- **字帶永遠是 900。** 中間字重（500/700）只出現在正文與表格；標題與字帶一律頂到最粗，因為它們模擬的是刷子。
- **不用等寬字。** 這不是終端機。數字用 Archivo Black。
- **標題疊印：** 版頭大標同一段文字疊三層（朱／赭／墨），朱與赭層套用與圖版同一組偏移變數：

```html
<span class="ptitle">
  <span class="lay r" aria-hidden="true">今晚七點，門在左手邊</span>
  <span class="lay o" aria-hidden="true">今晚七點，門在左手邊</span>
  <span class="base">今晚七點，門在左手邊</span>
</span>
```
```css
.ptitle{position:relative;display:block;font-weight:900;isolation:isolate}
.ptitle .lay{position:absolute;inset:0;mix-blend-mode:multiply;pointer-events:none}
.ptitle .lay.r{color:#C4271A;translate:var(--rx) var(--ry)}
.ptitle .lay.o{color:#C4902C;translate:var(--ox) var(--oy)}
.ptitle .base{position:relative;color:#181410}
```

---

## 五、版面與網格

- **首屏＝一整扇窗。** 不做「大標＋副標＋兩顆按鈕」。版頭是一條墨底資訊帶（窗號／單位名／日期／貼窗處），底下直接是九格。
- **紙的邊緣不切齊。** 用 `clip-path` 給每張紙 0.2–0.6% 的不規則四角：
  ```css
  .sheet{background:#DCCFB2;padding:26px;
         clip-path:polygon(0.4% 0.5%,99.6% 0%,100% 99.4%,0.2% 100%)}
  ```
- **每格微傾 0.14–0.32°**（特徵 1 的片段）。全站不得有第二種旋轉角。
- **留白率約 18–24%**：比迷幻海報的 horror vacui 鬆，比瑞士國際的網格緊。紙上的空白是「還沒刷到的地方」，不是設計留白。
- **RWD：** ≤760px 三欄→兩欄；≤560px→單欄，`--gut` 降到 8px，字帶字級升到 15px（單欄時每格變寬，字要跟著長大）。導覽從一列四片改成兩列兩片。

---

## 六、元件配方

### 導覽：cutout-plate 鏤空模版

四頁＝一片銅版上的四個開口。**現用頁那一格是被割穿的**——銅片沒了，底下的朱透上來；其餘三格還是實心的銅。語意是「有顏色的地方＝沒有材料的地方」，導覽自己也遵守這條本體規則。

```css
.navplate{background:#C4271A;padding:7px;display:flex;gap:7px;position:sticky;top:0}
.navplate a{flex:1;background:#9A8F72;color:#181410;font-weight:900;padding:9px 10px 8px;
  border-top:2px solid #B4A886;border-bottom:2px solid #7C7259;text-decoration:none}
.navplate a[aria-current="page"]{
  background:transparent;color:#DCCFB2;                 /* 割穿：露出底下的朱 */
  border-top:2px dashed rgba(24,20,16,.7);border-bottom:2px dashed rgba(24,20,16,.7);
  box-shadow:inset 2px 0 0 rgba(24,20,16,.7),inset -2px 0 0 rgba(24,20,16,.7)}  /* 刀痕 */
```

### 按鈕

朱底紙字，零圓角、零陰影，hover 只上移 2px（那是紙被掀起來）。次要按鈕是紙底加 3px 內描邊。

```css
.btn{background:#C4271A;color:#DCCFB2;font-weight:900;border:0;padding:11px 20px;
     letter-spacing:.04em;transition:translate .1s linear}
.btn:hover{translate:0 -2px}
.btn.q{background:#CDBE9C;color:#181410;box-shadow:inset 0 0 0 3px #181410}
```

### 卡片＝格（不要做圓角卡片）

一格由四列組成，順序不可改：`格號帶` → `圖區` → `刀痕帶` → `字帶`。刀痕帶是一排 9px 實 / 6px 空的墨色虛線，平時 32% 透明，hover 才滿——那是模版上的刀路。

```css
.cell .no{font-family:"Archivo Black";font-size:15px;color:#DCCFB2;background:#181410;
          padding:1px 8px;justify-self:start;letter-spacing:.06em}
.cell .fig{background:#CDBE9C;padding:6px;display:flex;align-items:center;justify-content:center}
.cell .knife{height:10px;opacity:.32;transition:opacity .12s linear;
  background:repeating-linear-gradient(90deg,#181410 0 9px,transparent 9px 15px)}
.cell:hover .knife,.cell:focus-visible .knife{opacity:1}
```

### 表單／選項

選項是左緣 7px 粗墨條的紙塊。選中＝墨條轉朱；答對＝整塊翻朱底紙字；答錯＝轉赭並刪除線。**不用勾與叉圖示，不用綠色。**

### 資訊帶（footer 與版頭）

墨底紙字的橫帶，`display:flex` + `gap:6px 26px`，欄與欄之間不放分隔線。鍵名用赭色 900、`letter-spacing:.1em`。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 做什麼 | 觸發 | 時值／曲線 |
|---|---|---|---|
| **ambient 環境** | 三塊版各自以互質週期輕微漂移（±0.7 / ±0.7 / ±0.25px），**永遠對不準** | 無（持續） | 17s／23s／29s `linear infinite` |
| **input-driven 輸入** | 游標在某一格上時，該格的朱版與赭版朝游標反向各錯開 2–5px；刀痕帶由 32% 轉滿 | `pointermove` | 即時寫 CSS 變數，`opacity .12s linear` |
| **transition 轉場** | 點一格 → 就地放大成審視台；答完 → 銅片掀開換成字帶 | 點擊 | `document.startViewTransition()`，0.26s |
| **signature 簽名** | **套不準（register drift）**：滑架每刷一張就爬一點，套色偏移＝印張數的對數函數 | 任何瀏覽行為 | 位移即時、對版 snap `.26s cubic-bezier(.2,1.5,.4,1)` |

```css
@keyframes wob-r{0%{transform:translate(.7px,-.3px)}33%{transform:translate(-.5px,.6px)}
  66%{transform:translate(.2px,.7px)}100%{transform:translate(.7px,-.3px)}}
.p-r{translate:var(--rx) var(--ry);animation:wob-r 17s linear infinite}
```
（`translate` 屬性承載走版量、`transform` 承載環境漂移——兩個屬性各自獨立，不會互相覆蓋。）

```js
// signature：走版量＝印張數的對數；一個方向（滑架只往一邊爬）
var U=[0.862,-0.507], MAXN=200, MAXPX=6.4;
function drift(n){return MAXPX*Math.log1p(n)/Math.log1p(MAXN)}
function apply(n,s){var k=drift(n)-s,r=document.documentElement.style;
  r.setProperty('--rx',(U[0]*k).toFixed(2)+'px'); r.setProperty('--ry',(U[1]*k).toFixed(2)+'px');
  r.setProperty('--ox',(U[0]*k*0.7).toFixed(2)+'px'); r.setProperty('--oy',(U[1]*k*0.7).toFixed(2)+'px')}
```

**`prefers-reduced-motion` 降級（四種都要，且資訊零損失）**

| | 降級後 |
|---|---|
| ambient | 漂移停止，三塊版停在當前偏移量——**錯位仍在**（錯位是風格本體，不是動畫） |
| input | 位移取消，刀痕帶仍由 32% → 100%（狀態改用不透明度表達，不用位移） |
| transition | 不呼叫 `startViewTransition`，直接切 DOM；捲動改 `behavior:auto` |
| signature | 走版量照算照套，只是不補間（瞬間跳）；印張數與偏移量本來就以**文字**同時顯示，故零損失 |

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  ::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}}
```

**禁用清單：** 淡入進場、視差、數字計數、stroke-dashoffset 描繪、彈跳緩動、模糊。這個風格是刷出來的，不是滑進來的。

---

## 八、插畫與圖像風格：stencil-bridge 模版連橋造形

**全站零外部圖片。**所有圖像由五種原語程序生成，每一種都自帶「這一刀有多寬」：

| 原語 | 簽名 | 自帶刀寬 |
|---|---|---|
| `rect(x,y,w,h)` | 實色方 | `min(w,h)` |
| `ngon(cx,cy,r,n,rot)` | n 邊形（n ≥ 10，圓一律用多邊形） | `2r·cos(π/n)` |
| `bar(x1,y1,x2,y2,w)` | 粗桿（方切口，**不設 linecap:round**） | `w` |
| `arrow(x1,y1,x2,y2,w,hw,hl)` | 實心箭頭 | `w` |
| `carc(cx,cy,r,t,a0,a1)` | 弧帶（**a1−a0 < 2π，永遠留缺口**） | `t` |

複合：`outline()`／`frame()`（特徵 2 的片段）、`person()`（頭＝12 邊形、身＝梯形、四肢＝粗桿）、`handPoint()`（掌＝方、指＝桿、袖＝方）。

**判準：** 拿掉全部顏色，仍讀得出「這是一個人／一扇門／一枚指印」。人物一律是**剪影加一兩刀內部切口**，不描外輪廓線、不畫五官、不畫正面肖像（正面肖像會讓人以為窗裡在賣東西）。

**分版規矩（最重要的一條）：** 墨版只做剪影與輪廓，**絕不壓在要看得見的赭／朱色域上**——因為 multiply 之下墨壓任何顏色都變墨。要「暗底上的亮字」時，做法是把底改成輪廓框（`frame()`）＋赭填充，而不是在墨塊上加亮色。

### 刀路檢查（把驗收寫成程式）

```js
function polyWidth(p){                    // 原語自帶 w；手繪多邊形用旋轉卡尺補算
  if(p.w)return p.w;
  var n=p.length,mn=1e9;
  for(var i=0;i<n;i++){var a=p[i],b=p[(i+1)%n],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);
    if(L<1e-6)continue;var mx=0;
    for(var j=0;j<n;j++){var d=Math.abs((p[j][0]-a[0])*dy-(p[j][1]-a[1])*dx)/L;if(d>mx)mx=d}
    if(mx<mn)mn=mx}
  return mn>1e8?0:mn}
// 孤島：把整塊版光柵化到 100×100，找「不接觸畫布邊界」的銅片連通區（4-連通泛洪）
// 判定：minCut ≥ 4 且 islands === 0，否則退回重刻
```

實測（本站 16 枚母題，逐版檢查）：

| 母題 | 最小刀寬 | 孤島 | 母題 | 最小刀寬 | 孤島 |
|---|---|---|---|---|---|
| looker | 5.0 | 0 | doorArrow | 6.0 | 0 |
| letter | 5.5 | 0 | pen | 6.0 | 0 |
| thumb | 4.4 | 0 | queue | 5.1 | 0 |
| lamp | 4.0 | 0 | book | 4.5 | 0 |
| clock7 | 4.2 | 0 | bell | 5.5 | 0 |
| bench | 6.0 | 0 | chalk | 6.0 | 0 |
| child | 4.2 | 0 | window9 | 6.0 | 0 |
| coinNo | 8.0 | 0 | paste | 5.0 | 0 |

全部通過。16 枚全檢一次 25ms（Node 22，100×100 光柵）。

---

## 九、Logo 與 Favicon

**Logo：** 九格窗的縮影（3×3 墨線格 + 赭紅交錯的格心）+ 一條 9px 墨橫槓 + 900 字重的字號 + 一枚朱箭頭。不要做圓形標誌、不要做字母組合、不要做漸層。

**Favicon（原創 inline SVG data URI，寫在 `<head>`）：** 紙底 + 3×3 墨格 + 右下一格朱（那是「割穿的那一格」）+ 左上一格赭。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23DCCFB2'/%3E%3Cg fill='%23181410'%3E%3Crect x='3' y='3' width='26' height='3'/%3E%3Crect x='3' y='26' width='26' height='3'/%3E%3Crect x='3' y='3' width='3' height='26'/%3E%3Crect x='26' y='3' width='3' height='26'/%3E%3Crect x='11.5' y='3' width='3' height='26'/%3E%3Crect x='19.5' y='3' width='3' height='26'/%3E%3Crect x='3' y='11.5' width='26' height='3'/%3E%3Crect x='3' y='19.5' width='26' height='3'/%3E%3C/g%3E%3Crect x='22.5' y='22.5' width='4' height='4' fill='%23C4271A'/%3E%3Crect x='6' y='6' width='5.5' height='5.5' fill='%23C4902C'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先把內容拆成 6–12 件事，每件一句話、一枚圖；拆不出來就不要用這個風格。
- 最後一格永遠是行動，永遠有朱箭頭。
- 字帶押韻。押不上就改內容，不要改規則。
- 讓套色偏著。偏差是製程的簽名。
- 導覽、按鈕、狀態全部用「模版／刷子／紙」的語彙解釋得通，解釋不通就換做法。

**Don't**

- ❌ 第四個顏色。需要就疊印或留白。
- ❌ 圓角、模糊陰影、柔性漸層、玻璃擬態。
- ❌ 細於 4 單位的線、`stroke-linecap:round`、描邊路徑（`stroke`）當輪廓。
- ❌ emoji 當 icon、外部圖片、照片、寫實描繪、五官、正面肖像。
- ❌ 把朱當品牌色到處鋪。朱是語意色。
- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ 「EST. 19xx」徽章、Lorem ipsum、AI 腔文案。
- ❌ 跑馬燈。這個風格的重點資訊靠**格序**承擔，不靠捲動。
- ❌ 把它做成「蘇聯懷舊」或「構成主義」。沒有照片蒙太奇、沒有 45° 對角構成、沒有鐮刀錘子。

---

## 十一、頁面骨架範例（可直接使用）

```html
<nav class="navplate" aria-label="主導覽">
  <a href="index.html" aria-current="page"><em>TODAY</em>今天這扇窗</a>
  <a href="read.html"><em>READ</em>讀窗</a>
  <a href="archive.html"><em>ARCHIVE</em>窗庫</a>
  <a href="about.html"><em>SCHOOL</em>關於</a>
</nav>

<main class="wrap">
 <div class="sheet">
  <div class="band" style="margin:-26px -26px 18px">
    <span class="k">ОКНО № 1207</span><b>單位名</b><span>正式全名</span>
    <span class="k">2026 年 8 月 20 日</span><span>貼窗處：⃝⃝ 街 41 號</span>
  </div>
  <p class="tag">今天這扇窗</p>
  <h1><span class="ptitle">
    <span class="lay r" aria-hidden="true">標題</span>
    <span class="lay o" aria-hidden="true">標題</span>
    <span class="base">標題</span></span></h1>
  <p class="lead">一段直述：這扇窗是給誰看的、怎麼讀。</p>
  <div class="rule r"></div>

  <div class="window">
    <div class="cell">
      <span class="no">01</span>
      <span class="fig"><svg class="cut" viewBox="-4 -4 108 108" aria-hidden="true">
        <g class="pl p-o"><path d="…赭版…"/></g>
        <g class="pl p-r"><path d="…朱版…"/></g>
        <g class="pl p-i"><path d="…墨版…"/></g></svg></span>
      <span class="knife" aria-hidden="true"></span>
      <span class="verse"><b>第一行</b><b>第二行押韻</b></span>
    </div>
    <!-- …共九格，第九格必為行動＋朱箭頭… -->
  </div>
 </div>
</main>

<footer><div class="in">
  <div><h3>單位</h3>地址<br>電話</div>
  <div><h3>時間</h3>開放時段</div>
  <div><h3>備註</h3>體例仿 РОСТА 窗（莫斯科，1919–1921）</div>
</div></footer>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術，每一項都是**視覺特徵要求的**，不是裝飾。

### 1. CSS Grid `subgrid`（C 版面與樣式層）— 承載特徵 1

九格的四條橫向軌道（格號帶／圖區／刀痕帶／字帶）必須在**整扇窗上**對齊；每一格自己 `grid-template-rows: auto…` 只能在格內對齊，一旦某一格的字帶長了一行，整排就散。`subgrid` 讓每一格把自己的列軌道交還給外層網格。

- **查證（2026-08-20）：** MDN《Subgrid》與 caniuse `css-subgrid`：**Baseline Widely available（2026-03-15 起）**；Firefox 71+（2019）、Safari 16+（2022）、Chrome / Edge 117+（2023-09）。全球覆蓋約 97%。
- **Fallback：** `@supports not (grid-template-rows:subgrid)` 改用固定四列 `22px 1fr 10px auto`。版面完整，只是字帶多一行時該格會比鄰格高一點——**資訊零損失**。

### 2. `mix-blend-mode: multiply`（A 渲染層）— 承載特徵 3

三塊版必須真的疊印：朱壓赭要自動得到暗紅、墨壓任何要得到墨。若手工指定重疊色，錯位量一變（走版是動態的）重疊區就得重算，做不到。

- **查證（2026-08-20）：** MDN《mix-blend-mode》：**Baseline Widely available，2020-01 起跨瀏覽器**；Chrome 41+、Edge 79+、Firefox 32+、Safari 7.1+。
- **注意：** 必須在容器上加 `isolation:isolate`，否則混合會穿透到頁面底（牆色）去。
- **Fallback：** 不支援時三塊版以正常疊放呈現（後者蓋前者），因分版規矩已保證「墨不壓在要看見的色域上」，圖形仍完整可讀。

### 3. View Transitions API（同文件，B 動效與時間軸層）— 承載轉場動效

點一格就地放大成審視台、答完把銅片換成字帶：這些是**同一份 DOM 的狀態切換**，用 VT 可以讓元素在原地變形而不重畫、不閃爍。

- **查證（2026-08-20）：** MDN《Document: startViewTransition()》與 web.dev〈Same-document view transitions have become Baseline Newly available〉：同文件轉場 **Baseline Newly available（2025-10 起）**；Chrome / Edge 111+、Safari 18+、**Firefox 144+**。
- **跨文件（MPA）轉場另計：** 至 2026 年年中 Firefox 仍未支援，因此**本風格的跨頁導覽不依賴 VT**，只當漸進增強。
- **Fallback：**
  ```js
  function go(fn){ if(document.startViewTransition && !reducedMotion){
      try{ return document.startViewTransition(fn) }catch(e){} }
    fn(); return null }
  ```
  沒有 VT 時 DOM 直接切換，內容一模一樣。`prefers-reduced-motion` 時一律走 `fn()`。

### 效能預算（實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | ≤ 350KB | 首頁 49KB／讀窗 51KB／窗庫 107KB／夜校 36KB |
| 外部資源 | 僅 Google Fonts | 2 支字體，零圖片、零音檔、零函式庫 |
| 首屏 JS 執行 | ≤ 100ms | 九格 SVG 於建置階段就算完寫進 HTML，首屏 JS 只做讀取 sessionStorage + 寫四個 CSS 變數，< 5ms |
| 主要動畫 | 60fps | ambient 只動 `transform`（合成層）；input 只寫 CSS 變數，不讀布局 → 無 layout thrashing |
| 刀路檢查 | 互動即時 | 單枚母題約 1.6ms、16 枚 25ms（100×100 光柵，只在點開時跑） |

### 無 JavaScript 時

整扇窗、全部押韻字帶、窗庫二十四扇與所有營業資訊都是**建置階段輸出的靜態 HTML**。關掉 JS 只失去三樣：套色停在建置時的偏移量、對版台不能拖、讀窗改看頁尾以 `<details>` 直接印出的九條答案表。

---

*本 SKILL 描述的是流派本身，不綁定產業。示範站是一間夜間識字班，但同一套語法可以用在任何「要把幾件事按順序講給人聽、而且要人做一件事」的內容上：防災須知、投票流程、就診指引、施工圍籬、社區公告、菜單、產品開箱步驟。*

*外部參照：Окна сатиры РОСТА（Российское телеграфное агентство），莫斯科，1919–1921；主要作者 Михаил Черемных、Владимир Маяковский、Иван Малютин；製程為手割模版（трафарет）＋刷子分色套印，日產 100–300 份分送各城市空櫥窗。*
