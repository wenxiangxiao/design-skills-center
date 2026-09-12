---
name: suprematist-void
description: Russian Suprematism as a web system — an untextured white void with no horizon, six primitive shapes, one discrete tilt family, one dominant mass, and gaps that never close.
---

# 至上主義 SUPREMATISM — 白虛空風格規格書

> 流派：至上主義 Suprematism（Kazimir Malevich，1915–1920s，俄國）
> 範例站：相對・編隊跳傘會（屏東潮州跳傘場，四人編隊跳傘）
> 適用：任何「位置關係本身就是內容」的產業——運動編隊、物流佈局、天文、舞蹈、
> 座位與空間、資料關係圖、極簡精品、當代美術館、建築事務所。
> **本規格書不綁定產業。** 換一個產業，只要換掉文字與那十一塊平面承載的資訊。

---

## 一、設計哲學

一九一五年十二月，馬列維奇在彼得格勒的「0,10 最後的未來派展覽」把《黑方塊》
掛在展廳的一個上角——俄國家庭掛聖像的位置。那不是一張畫掛歪了，那是一個宣告：
繪畫從此不再描繪世界上的東西，它描繪的是「感覺本身」。他把這個方向叫做
Suprematism，至上主義：造形感覺至上，物象為零。

一九一八年他畫了《白上白》：一個白色的方，浮在一片白裡，只靠邊界與一點點色溫差
被看見。這是這個流派最極端也最重要的一步——**白不是背景，白是空間**。

所以做一個至上主義的網站，第一件要放棄的事是「背景色」這個概念。畫面上那片白
不是襯托元素的底，它是元素所在的無限空間；元素沒有落在任何一條基線上，
它們飄浮，而飄浮感完全來自它們之間那些永遠不會闔上的空隙。

第二件要放棄的是「絕對座標」。馬列維奇畫的是飛行的感覺（他自己說過至上主義的
構圖來自航空攝影與失重感），一個飄浮的構圖沒有上下——把整幅畫轉九十度，
它還是同一幅畫。這一條可以直接翻譯成互動：**使用者選誰，誰就是原點**。

第三件是紀律。至上主義不是「隨便擺一些幾何圖形」。它的形有限（六種）、
角度有限（一個離散的斜角族）、顏色有限（黑、朱紅、白，偶爾群青與黃）、
質感為零（沒有紋理、沒有漸層、沒有陰影、沒有外框、沒有圓角）。
**限制愈嚴，飄浮感愈強。** 只要加一道模糊陰影，整片虛空就塌成一張紙。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，畫面就不再是至上主義。每一項都附可直接複製的片段。

### 特徵 1｜無地平線的白虛空：白是空間，不是底色

冷白（非純白 `#FFF`，純白在黑塊旁會產生眩光邊）、零紋理、零顆粒、零漸層、
零暈影、零外框、零圓角。畫面上沒有任何一條水平線可以被讀成地平線，
沒有任何元素坐落在容器底部。虛空面積 ≥ 55%。

```css
:root{ --void:#F0F1EE; --void2:#E1E4E0; --ink:#121512; --red:#CE2B1F; --blue:#24378F; }
body{ background:var(--void); }
/* 這一條是規格不是偏好：整站禁止圓角與模糊陰影 */
*,*::before,*::after{ border-radius:0 !important; box-shadow:none !important; }
/* 不准有任何紙紋、noise、texture、backdrop-filter、gradient */
```

### 特徵 2｜有限的原始形詞彙：只有六種形，平塗，無外框

正方 / 長條（矩形，長寬比 ≥ 4）/ 正圓 / 十字 / 三角 / 直線。**沒有第七種。**
不准描邊、不准填漸層、不准用 `stroke` 做輪廓，形只有 `fill`。

```html
<!-- 六種原始形。全部置於方形 viewBox 中心，旋轉後仍落在內切圓內 -->
<svg viewBox="0 0 120 120"><rect x="26" y="26" width="68" height="68" fill="var(--ink)"/></svg>
<svg viewBox="0 0 120 120"><rect x="10" y="54" width="100" height="12" fill="var(--ink)"/></svg>
<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="34" fill="var(--ink)"/></svg>
<svg viewBox="0 0 120 120"><g fill="var(--ink)">
  <rect x="12" y="54" width="96" height="12"/><rect x="54" y="12" width="12" height="96"/></g></svg>
<svg viewBox="0 0 120 120"><path d="M60 18 106 96 14 96Z" fill="var(--red)"/></svg>
<svg viewBox="0 0 120 120"><rect x="8" y="58" width="104" height="4" fill="var(--blue)"/></svg>
```

### 特徵 3｜單一斜角族統治所有角度：角度是身分，不是動畫

整個站的旋轉角只能取自 22.5° 的整數倍（`0 / ±22.5 / ±45 / ±67.5 / 90 …`），
而且大多數元素共用同一個角度，形成一條看不見的對角動勢軸。
**角度一旦給定就不再改變**——位置可以動、參考系可以換、顏色可以換，角度不動。
這正是必須使用 CSS 獨立變換屬性的理由：`rotate` 放在最內層元素上，
外層的 `translate` 動畫（漂移、換參考系）碰不到它；用複合的 `transform`
寫，任何一次位移都會把旋轉一起覆寫掉。

```css
.plane{ translate:-50% -50%; }                    /* 定位層 */
.drift{ animation:drift 60s ease-in-out infinite alternate; } /* 環境漂移層 */
@keyframes drift{ from{translate:0 0} to{translate:9px -11px} }
.form { rotate:var(--ang); }                      /* 身分層：只有這裡出現 rotate */
/* 斜角族取值 */
:root{ --fam:22.5deg; }
.tilt-a{rotate:calc(var(--fam) * -1)}  .tilt-b{rotate:calc(var(--fam) * 2)}
.tilt-c{rotate:calc(var(--fam) * 3)}   .tilt-d{rotate:calc(var(--fam) * -3)}
```

### 特徵 4｜主重量與遞減衛星：非對稱的質量平衡

每個構圖必有一塊面積壓倒性的主形（面積 ≥ 其餘所有形面積總和的 40%），
其餘為尺度遞減的衛星。平衡靠質量分佈，**不靠對稱、不靠置中、不靠網格**。
本範例站首頁的主重量是一塊 236×236 的黑方，佔其餘十塊總面積的 76%。

```css
/* 資料驅動的構圖：位置與尺寸寫成百分比自訂屬性，不用網格系統 */
.void{ position:relative; width:100%; aspect-ratio:1200/700; }
.plane{ position:absolute; left:var(--x); top:var(--y); width:var(--w); }
/* 主重量 */ .plane.mass{ --x:27.5%; --y:50.3%; --w:25%; }
/* 衛星   */ .plane.sat1{ --x:61.8%; --y:24.0%; --w:22%; }
```

驗算（動手前先跑，別憑眼睛）：

```js
// 任兩塊之間必須留白隙：以外接方框的內切圓為保守界
for(let i=0;i<P.length;i++) for(let k=i+1;k<P.length;k++){
  const d=Math.hypot(P[i].cx-P[k].cx, P[i].cy-P[k].cy);
  if(d < (P[i].box+P[k].box)/2) throw new Error('接觸違規 '+P[i].id+'×'+P[k].id);
}
```

### 特徵 5｜白隙與白上白：形永不接觸，且必有一塊白上白

任兩塊形之間必留白隙，最小間隙 = 較小塊短邊的 1/6；**永不相接、永不共邊、
永不重疊**。飄浮感百分之百來自這些間隙——闔上一個，那兩塊就變成一個圖案。
另外，每個構圖裡必須有一塊「第二白」：與虛空同色系、只差一階明度的大塊面，
它只靠邊界被看見。這是《白上白》，也是這個流派最容易被省略、
一省略就變成「幾何裝飾」的一項。

```css
/* 第二白：只靠邊界被看見，禁止加描邊或陰影去「幫」它 */
.w2{ background:var(--void2); }           /* #E1E4E0 on #F0F1EE，ΔL* ≈ 3.4 */
/* 兩塊之間的關係若要表達「連結」，用一枚浮在空隙裡的小方，不要畫線 */
.link{ width:14px; height:14px; background:var(--red); }
```

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 虛空白 | `#F0F1EE` | 空間本體。不是背景，不鋪任何質感 | ~54% |
| 第二白 | `#E1E4E0` | 白上白的大塊面，只靠邊界被看見 | ~17% |
| 黑 | `#121512` | 主重量、正文、導覽、頁尾 | ~17% |
| 朱紅 | `#CE2B1F` | **唯一的動作色**：現用態、選中、連結底線、握點、錯誤 | ~9% |
| 群青 | `#24378F` | **只給客觀量**：編號、時刻、數字、量表標籤。永不當品牌色 | ~3% |
| 冷灰 | `#A7ABA5` | 停用態。除此之外不得出現 | <1% |

硬規則：

1. 虛空白**不得**是 `#FFFFFF`。純白在大塊黑旁邊會沿邊界產生眩光，飄浮感會變成刺眼。
2. 朱紅只有一個語意：**這裡有動作**。它不是強調色、不是品牌色、不是漂亮的紅。
   一頁上朱紅的總面積超過 10% 就是誤用。
3. 群青只包數字與編號。看到群青，讀者就知道那是一個可被量的東西。
4. **零漸層**（含 `linear-gradient` / `radial-gradient` / `conic-gradient`）、
   **零模糊陰影**、**零 `opacity` 疊色**。需要第二層次就換明度，不要換透明度。
5. 深色反轉只准用在頁尾：底 `#121512`、字 `#F0F1EE`、連結底線朱紅 3px。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 設定 |
|---|---|---|---|
| 中文標題 | Noto Sans TC | 900 | `letter-spacing:-.02em; line-height:1.06` |
| 中文內文 | Noto Sans TC | 400 / 700 | `line-height:1.75` |
| 拉丁與數字 | Archivo | 400 / 700 / 900 | `font-variant-numeric:tabular-nums` |
| 標籤 / 眉標 | Archivo | 700 | `11px; letter-spacing:.2em; text-transform:uppercase` |

至上主義是無襯線的、幾何的、沒有書法性的。**禁止襯線體、禁止手寫體、
禁止任何有「筆觸」聯想的字**。等寬字也不要——等寬字會把畫面拉向終端機／工程製圖，
那是別的流派。數字用 Archivo 的 tabular figures 就夠了。

字級 scale（1.32 倍）：

```css
h1{font-size:clamp(34px,6vw,72px)}  h2{font-size:clamp(26px,4.2vw,44px)}
h3{font-size:clamp(18px,2.4vw,24px)} .lead{font-size:clamp(16px,1.5vw,19px)}
body{font-size:16px} .tag{font-size:11px} .fine{font-size:13px}
```

排版紀律：**長文一律水平、一律可選取、對比 ≥ 8:1。** 傾斜的是塊面不是段落。
這是原作不需要處理、而網頁必須處理的問題——馬列維奇不必讓人讀完他的畫。

---

## 五、版面與網格

**沒有網格。** 至上主義的構圖是質量平衡，不是欄位對齊。
但為了可維護，用兩套並存的系統：

- **虛空區（構圖）**：一個固定比例的座標空間（本站用 `1200×700`，行動版 `640×920`），
  每塊平面以百分比定位。位置由手工構圖決定，寫進資料，再用上面那段驗算程式
  檢查沒有任何兩塊相接。
- **文本區（可讀）**：`width:min(1180px, 92vw)` 置中，`2 欄 / 3 欄` 的一般 grid，
  分隔一律用 **3px 實線**（`border-top:3px solid var(--ink)`），永不用細線、
  永不用淺灰線、永不用留白代替分隔。

留白規則：

- 虛空區留白 ≥ 55%，且構圖必被容器至少一邊切斷（暗示空間延伸出畫面）。
- 區塊間距 96px（行動版 62px），永遠是同一個值，不做「呼吸感」微調。
- **禁止置中對齊的段落**。所有文字齊左。

RWD（≤640px）：
虛空改用第二套座標，並把浮在形旁邊的標籤整批隱藏，改在虛空下方輸出一份
一般 HTML 的資訊列——構圖在小螢幕上仍然完整，資訊零損失。

```css
@media (max-width:640px){
  .void{aspect-ratio:640/920}
  .plane{left:var(--mx);top:var(--my);width:var(--mw)}
  .plane .lbl{display:none}
  .voidlist{display:block}
}
```

---

## 六、元件配方

### 導覽：`level-off` 打平

四頁＝四條共用斜角的實心黑條，現用頁那一條**轉正到 0°**，並在右端浮出一枚
朱紅小方。現用態不是被高亮、不是被反白、不是變大——是它比別人「正」。

```css
.nav{position:fixed;right:26px;top:26px;z-index:60}
.nav ol{list-style:none;display:flex;flex-direction:column;gap:13px}
.nav a{display:block;position:relative;width:168px;height:26px;background:var(--ink);
  rotate:calc(var(--fam)*-1);
  transition:rotate 260ms cubic-bezier(.22,.9,.24,1),background 90ms linear}
.nav a:hover{background:var(--red)}
.nav a[aria-current="page"]{rotate:0deg}
.nav a[aria-current="page"]::after{content:"";position:absolute;right:-19px;top:7px;
  width:12px;height:12px;background:var(--red)}
@media (max-width:900px){ .nav{position:static} .nav ol{flex-direction:row}
  .nav a{rotate:0deg;flex:1;height:34px} .nav a[aria-current="page"]{background:var(--red)} }
```

### 按鈕

實心黑塊、零圓角、大寫拉丁、字距 `.16em`。hover 換成朱紅（不位移、不縮放、
不加陰影）。focus 用 4px 朱紅外框。

```css
.btn{background:var(--ink);color:var(--void);border:none;padding:14px 26px;
  font:700 13px/1 "Archivo",sans-serif;letter-spacing:.16em;text-transform:uppercase;
  cursor:pointer;transition:background 90ms linear}
.btn:hover{background:var(--red)}
.btn:focus-visible{outline:4px solid var(--red);outline-offset:4px}
.btn[disabled]{background:var(--grey);cursor:not-allowed}
```

### 卡片

**沒有卡片。** 不要容器、不要外框、不要底色塊。一個「卡片」是：
一張構成圖 + 一條 3px 黑分隔線 + 線下的標題與說明。hover 時分隔線轉朱紅。

```css
.card{background:none;border:none;padding:0;display:block;width:100%;text-align:left}
.card .cap{border-top:3px solid var(--ink);padding-top:7px;margin-top:6px;
  display:flex;justify-content:space-between;align-items:baseline}
.card:hover .cap{border-top-color:var(--red)}
```

### 表單

輸入框只有一條 3px 底線，聚焦轉朱紅，錯誤訊息是朱紅粗體文字（不是紅底色塊、
不是圖示、不是 emoji）。標籤在上方，Archivo 700 / 10px / 字距 `.2em` / 大寫。

```css
.frow input,.frow select{font:700 16px/1.4 inherit;background:var(--void);border:none;
  border-bottom:3px solid var(--ink);padding:9px 2px;width:100%;appearance:none}
.frow input:focus{outline:none;border-bottom-color:var(--red)}
.frow.bad input{border-bottom-color:var(--red)}
.ferr{font-size:12.5px;font-weight:700;color:var(--red)}
```

### 頁尾

唯一的反轉區：黑底白字，三欄，連結一律 2px 朱紅底線。

---

## 七、動效規則

四種、性質不同、觸發源不同，缺一不可。全部備 `prefers-reduced-motion` 降級，
且降級後資訊零損失。

| 類型 | 內容 | 觸發 | duration / easing | 降級 |
|---|---|---|---|---|
| ambient 環境 | **無地平線漂移**：每塊平面各以 44–116s 的獨立正弦在原地漂 ≤11px。角度一度不動。 | 無 | `44–116s ease-in-out infinite alternate` | `animation:none`，構圖停在起點，仍是完整構圖 |
| input 輸入 | **實心位移影子**：hover / focus 時，該塊形在 11px 外原地印出一枚同形的朱紅實心塊；同時它的相對讀數顯示出來。延遲 <100ms。 | hover / focus | `opacity 90ms linear` | `transition:none`，影子瞬間出現，狀態語意不變 |
| transition 轉場 | **跨文件 View Transitions**：導覽條與主重量方塊在四頁之間不重畫、只移動；新頁內容以 −40° 方向的 `clip-path` 楔形推入。 | 換頁 | `620ms cubic-bezier(.22,.9,.24,1)` | 不支援或 reduced-motion 時是一般的即時換頁 |
| signature 簽名 | **換參考系 frame-swap**（見下） | 點任一塊平面 | `translate 700ms cubic-bezier(.22,.9,.24,1)` | `transition:none`，瞬間到位，參考系照樣換得成 |

```css
/* transition：把 @view-transition 包在 no-preference 裡，降級即為即時換頁 */
@media (prefers-reduced-motion:no-preference){ @view-transition{ navigation:auto } }
@keyframes vt-in{ from{clip-path:polygon(-40% 0,-40% 0,-10% 100%,-10% 100%)}
                  to  {clip-path:polygon(-40% 0,150% 0,150% 100%,-10% 100%)} }
::view-transition-new(root){ animation:vt-in 620ms cubic-bezier(.22,.9,.24,1) both }
::view-transition-old(root){ animation:vt-out 200ms linear both }
.nav{ view-transition-name:navrail } .mass{ view-transition-name:mark }
```

### 簽名動效：換參考系 frame-swap

**被重算的不是元素，是座標原點。** 使用者點任一塊平面，那一塊被釘在畫面的錨點上
不動，其餘所有東西連同容器一起做剛體平移補償——元素之間的相對關係一格都沒變，
每塊自己的 `rotate` 也一度都沒動。畫面上因此沒有「絕對位置」這回事：
同一個構成有無限多個等價畫面，它們全是同一件事。

```css
.voidinner{ translate:0 0; transition:translate 700ms cubic-bezier(.22,.9,.24,1); }
@media (prefers-reduced-motion:reduce){ .voidinner{transition:none} }
```

```js
function setFrame(i){                  // i<0 = 回到畫面中心
  var ox=ANCHOR_X, oy=ANCHOR_Y;
  if(i>=0){ ox=+planes[i].dataset.cx; oy=+planes[i].dataset.cy; }
  var fx=(ANCHOR_X-ox)/SPACE_W*100, fy=(ANCHOR_Y-oy)/SPACE_H*100;
  inner.style.translate = (i<0 ? '0 0' : fx.toFixed(3)+'% '+fy.toFixed(3)+'%');
  planes.forEach(function(q,k){        // 讀數改成相對這個原點
    q.setAttribute('aria-pressed', k===i ? 'true':'false');
    var dx=+q.dataset.cx-ox, dy=+q.dataset.cy-oy;
    q.querySelector('.r').textContent = k===i ? '原點' :
      Math.round((Math.atan2(dx,-dy)*180/Math.PI+360)%360)+'° / '+
      (Math.hypot(dx,dy)/UNIT).toFixed(1)+' 身位';
  });
}
```

**明文禁用**（這些在別的站已經過載，且與本流派牴觸）：
淡入式滾動揭示、視差、數字滾動計數、跑馬燈、按壓硬陰影、`stroke-dashoffset`
描繪、彈跳 easing、任何 `scale` 的 hover 放大。至上主義的形不會變大，
它只會換位置——因為它在飄。

---

## 八、插畫與圖像風格

技法名稱：**`relational-plane` 關係平面構成**。

全站沒有一張外部圖片、沒有一張描外形的插圖。所有圖像（構成、卡片、標記、
Logo、Favicon、回執印記）由同一支引擎輸出，原語只有第二章那六種形，規則五條：

1. 平塗、零漸層、零陰影、零外框、零圓角。
2. 所有旋轉角取自 22.5° 的整數倍。
3. 任兩塊之間必留白隙（≥ 較小塊短邊的 1/6），永不相接或重疊。
4. 一張圖裡元素數 ≤ 11，且必有一塊主重量（面積 ≥ 其餘總和 40%）。
5. 構圖必被畫布至少一邊切斷，且必含一塊第二白。

與 `flat-shape 無描邊色塊構成` 的差別：後者只規定「沒有描邊」。本技法額外要求
離散斜角族、絕不接觸的白隙、主重量比例、元素數上限、被邊切斷與白上白；
而且**本技法的每一張圖都編碼一組可讀回的相對位置關係**——本範例站的每張構成
都能反讀出四個人的兩兩距離與朝向，把整張圖轉九十度，讀出來的六個數完全不變。

```js
/* 一個「物件」= 一條長條（身）＋一枚小方（頭），兩者永不相接 */
var BL=86,BW=15,HD=15,GAP=9;
function glyph(x,y,a,fill){
  return '<g transform="translate('+x+','+y+') rotate('+a+')">'
    +'<rect x="'+(-BW/2)+'" y="'+(-BL/2)+'" width="'+BW+'" height="'+BL+'" fill="'+fill+'"/>'
    +'<rect x="'+(-HD/2)+'" y="'+(-BL/2-GAP-HD)+'" width="'+HD+'" height="'+HD+'" fill="'+fill+'"/></g>';
}
/* 兩個物件之間的「關係」畫成浮在空隙裡的一枚朱紅小方，兩邊都不碰 */
function link(a,b){ return '<rect x="'+((a[0]+b[0])/2-7)+'" y="'+((a[1]+b[1])/2-7)
  +'" width="14" height="14" fill="var(--red)"/>'; }
/* 第二白永遠在半徑 194 以外，因此與任何物件都不相接 */
function ground(rot){ return '<g transform="rotate('+rot+')">'
  +'<rect x="-560" y="-262" width="1120" height="66" fill="var(--void2)"/>'
  +'<rect x="150" y="152" width="96" height="96" fill="var(--void2)"/></g>'; }
```

**明文禁用**：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描、等角視圖、
交叉排線、任何寫實描繪、任何 `stroke` 輪廓。

---

## 九、Logo 與 Favicon 設計指南

Logo 不是字，是一個構成。做法：一塊主重量方（傾斜於斜角族）、
兩到三塊遞減衛星（一條、一圓、一枚朱紅小方）、一條被切斷的第二白帶，
右側才是字標。字標一律 Archivo 900 + 一行 `letter-spacing:3.4` 的群青拉丁副標。

Favicon 用原創 inline SVG data URI 寫在 `<head>`，內容是 Logo 的三塊主要元素：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23F0F1EE'/%3E%3Crect x='0' y='3' width='64' height='8' fill='%23E1E4E0'/%3E%3Crect x='8' y='18' width='32' height='32' fill='%23121512' transform='rotate(-22.5 24 34)'/%3E%3Crect x='48' y='46' width='12' height='12' fill='%23CE2B1F'/%3E%3C/svg%3E">
```

檢查：把 favicon 縮到 16px，還讀得出「一條淺帶 + 一塊斜的黑方 + 一枚紅點」
三個層次就對了。讀不出來就是元素太多。

---

## 十、Do & Don't

**Do**

- 先手工構圖，再寫程式驗算「沒有任何兩塊相接」。
- 每一頁都問一次：主重量是哪一塊？看不出來就重排。
- 讓構圖被容器邊切斷至少一處。
- 把「連結／關係」畫成浮在空隙裡的記號，不要畫線把兩塊接起來。
- 長文一律水平、齊左、可選取、對比 ≥ 8:1。傾斜的是塊面。
- 現用態用「姿態」表達（轉正、成為原點），不要用高亮色塊。

**Don't**

- ❌ 純白 `#FFFFFF` 底、紙紋、noise、任何材質。
- ❌ 漸層、模糊陰影、圓角、外框、`backdrop-filter`。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片的模板。
- ❌ 紫藍漸層 hero、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章。
- ❌ 讓兩塊形相接、共邊或重疊——一接上，飄浮感立刻死掉。
- ❌ 用 `transform: rotate() translate()` 複合寫法（位移動畫會覆寫掉旋轉身分）。
- ❌ 把朱紅當品牌色到處撒；它只有「這裡有動作」一個語意。
- ❌ 加上第七種形。想不出來就用已經有的六種重新組合。
- ❌ 「安靜」當風格——四種動效缺一不可，少一種就是沒做完。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜站名</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
@media (prefers-reduced-motion:no-preference){@view-transition{navigation:auto}}
:root{--void:#F0F1EE;--void2:#E1E4E0;--ink:#121512;--red:#CE2B1F;--blue:#24378F;--fam:22.5deg}
*{box-sizing:border-box;margin:0;padding:0}
*,*::before,*::after{border-radius:0!important;box-shadow:none!important}
body{background:var(--void);color:var(--ink);font:400 16px/1.75 "Noto Sans TC",sans-serif}
.wrap{width:min(1180px,92vw);margin:0 auto}
.void{position:relative;width:100%;aspect-ratio:1200/700}
.voidinner{position:absolute;inset:0;translate:0 0;
  transition:translate 700ms cubic-bezier(.22,.9,.24,1)}
.plane{position:absolute;left:var(--x);top:var(--y);width:var(--w);translate:-50% -50%;
  background:none;border:none;padding:0;cursor:pointer}
.drift{display:block;animation:drift var(--dur,60s) ease-in-out infinite alternate}
@keyframes drift{from{translate:0 0}to{translate:var(--dx,8px) var(--dy,-11px)}}
.form{rotate:var(--ang);display:block;width:100%;height:auto;overflow:visible}
.shade{opacity:0;transition:opacity 90ms linear}
.plane:hover .shade,.plane:focus-visible .shade{opacity:1}
.rule{border-top:3px solid var(--ink);margin-bottom:26px}
.tag{font:700 11px/1.2 "Archivo",sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--blue)}
h2{font-weight:900;font-size:clamp(26px,4.2vw,44px);letter-spacing:-.02em;line-height:1.06}
@media (prefers-reduced-motion:reduce){.drift{animation:none}.voidinner{transition:none}}
</style>
</head>
<body>
<nav class="nav" aria-label="主導覽"><ol>
  <li><a href="a.html" aria-current="page"><span>VOID</span><b>虛空</b></a></li>
  <li><a href="b.html"><span>POOL</span><b>籤池</b></a></li>
</ol></nav>

<main>
<section class="wrap">
  <p class="tag">章節眉標</p>
  <div class="void"><div class="voidinner" id="vi">
    <!-- 主重量 -->
    <button class="plane" data-cx="330" data-cy="352"
      style="--x:27.5%;--y:50.3%;--w:25%;--ang:-22.5deg;--dur:44s;--dx:-8px;--dy:-11px">
      <span class="drift"><svg class="form" viewBox="0 0 300 300">
        <g class="shade"><rect x="43" y="43" width="236" height="236" fill="var(--red)"/></g>
        <rect x="32" y="32" width="236" height="236" fill="var(--ink)"/>
      </svg></span>
      <span class="lbl"><span class="k">CLUB · 001</span><span class="v">主重量承載的那則資訊</span>
        <span class="r">—</span></span>
    </button>
    <!-- 其餘衛星平面照抄，改 --x/--y/--w/--ang 與形 -->
  </div></div>
</section>

<section class="wrap" style="margin-top:96px">
  <div class="rule"></div>
  <h2>齊左，永遠齊左</h2>
  <p style="max-width:62ch">長文一律水平、可選取、對比 ≥ 8:1。傾斜的是塊面不是段落。</p>
</section>
</main>

<footer style="margin-top:110px;background:var(--ink);color:var(--void);padding:52px 0">
  <div class="wrap"><p>頁尾是全站唯一的反轉區。</p></div>
</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，每一項的選擇理由都是「這個流派的視覺特徵需要它」，
不是「這個技術很酷」。全部於 2026-08-27 查證。

### 1｜CSS 獨立變換屬性 `rotate` / `translate` / `scale`（C 版面與樣式層）

**承載**：特徵 3「角度是身分」。旋轉放在最內層 `.form` 上，
定位（`translate:-50% -50%`）、環境漂移（`@keyframes` 動 `translate`）、
簽名動效（容器的 `translate` 補償）分別放在三層不同的祖先元素上，
四件事互不干擾。用複合的 `transform` 寫，任何一次位移動畫都會把旋轉一起覆寫，
於是「角度是身分」這條規則在實作上就不成立。

**支援現況**（查證來源：web-features explorer `individual-transforms`、MDN
`translate` / `rotate` / `scale`）：**Baseline Widely available（自 2025-02-05）**。
Firefox 72（2020-01-07）、Safari 14.1（2021-04-26）、Chrome / Edge 104（2022-08）。
規格為 CSS Transforms Module Level 2 §individual-transforms。
**注意**：獨立屬性的套用順序固定為 `translate → rotate → scale → transform`，
與宣告順序無關，這是它與 `transform` 最容易踩到的差異。

**Fallback**：不支援時三個屬性一起被忽略，元素落在未旋轉、未位移的原位——
畫面會壞。因此本站對「一定要有」的旋轉（Logo、Favicon、九式構成圖）
一律改用 SVG 內部的 `transform` 屬性（SVG 1.1，無支援缺口），
CSS 的 `rotate` 只用在互動層與導覽的姿態表達。實測：關掉 CSS 獨立變換屬性後，
所有構成圖仍完整，只有導覽條變成四條水平黑條、現用態改由朱紅小方標示。

### 2｜View Transitions API 跨文件轉場（B 動效與時間軸層）

**承載**：「虛空是連續的」。四個頁面不是四個空間——導覽條與主重量方塊帶著
`view-transition-name`，換頁時它們不重畫、只從舊位置移到新位置。
這正是至上主義的空間觀：元素沒有頁面歸屬，它們在同一片虛空裡換位置。

**支援現況**（查證來源：web-features `cross-document-view-transitions`、
MDN《Using the View Transition API》、Chrome for Developers
《Cross-document view transitions for multi-page applications》）：
跨文件版屬 **Limited availability** — Chrome / Edge 126+（2024-06）、
Safari 18.2+（2024-12）、**Firefox 尚未支援**（同文件版已於 Firefox 144 / 2025-10
支援，整體 View Transitions 於 2025-10-14 成為 Baseline newly available，
但跨文件版仍被 Firefox 缺口擋住）。

**Fallback**：`@view-transition` 與 `view-transition-name` 在不支援的瀏覽器
會被整條忽略，換頁退為一般的即時導覽，**版面、內容與可用性完全不變**。
另外本站把 `@view-transition` 包在 `@media (prefers-reduced-motion:no-preference)`
裡，因此使用者要求減少動態時也是即時換頁。

### 3｜鍵盤為主要操作通道 ＋ `:focus-visible` 焦點指示（D 輸入與感測層）

**承載**：本站核心功能的輸入，以及「焦點指示本身也必須是至上主義的形」。
這是刻意不採用拖曳的決定——至上主義的元素不被拖動，它們被選為原點。
核心功能（上機認籤）以 `1`–`9` 數字鍵直接點牌，滑鼠與觸控只是等價的第二通道；
每一個可互動元素都是原生 `<button>`，Tab 順序即閱讀順序。
焦點指示不用瀏覽器預設的細虛線外框（那不屬於這個流派），
改成一塊 3px 朱紅的實心矩形框——它是第六種原始形「直線」的組合。

**支援現況**（查證來源：MDN `:focus-visible`、caniuse `css-focus-visible`）：
**Baseline Widely available**；最後一塊拼圖是 Safari 15.4（2022-03），
其後所有主要瀏覽器的 UA stylesheet 都改用 `:focus-visible` 決定預設焦點環。
`KeyboardEvent.key` 與 `element.closest()` 皆為 Baseline Widely available。

**Fallback**：`@supports` 不需要——不支援 `:focus-visible` 的瀏覽器會落回
`:focus`（本站另寫了 `:focus` 的等價樣式），焦點仍然看得見。
無指標裝置、無鍵盤（例如純觸控）時，所有牌都是原生按鈕，觸控即可點。

### 效能預算實測（2026-08-27）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | ≤ 350KB | index 36.5KB / pool 45.8KB / dive 46.4KB / join 31.9KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零外部圖片、零音檔、零函式庫） |
| 構成圖生成 | — | 單張 0.0036ms；一次重排九張 0.032ms（Node 22 單執行緒，10,000 次平均） |
| 首屏 JS 執行 | ≤ 100ms | 首頁 JS 的全部工作是「渲染九張縮圖 + 綁 11 個 listener」，構成生成合計 <0.05ms |
| 主要動畫 | 60fps | 環境漂移與換參考系只改 `translate`（合成層屬性）不觸發 layout；每次換參考系只做 1 次 `style.translate` 寫入 + 11 次 `textContent` 更新，零 `getBoundingClientRect`，無 layout thrashing |

**無 JavaScript 時**：四頁的全部資訊（含九式構成圖、結構讀數、二十四筆抽籤紀錄、
價目、課程、聯絡方式）都是建置階段輸出的靜態 HTML 與 SVG，完整可讀；
失去的只有換參考系、整面轉籤、與上機這一關（上機需要計時器，
該頁明寫此事並指向籤池頁的完整靜態內容）。
