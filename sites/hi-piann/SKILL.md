---
name: security-print-iris-voucher
description: Security-printing / banknote engraving as a web style, in its gift-voucher and share-certificate half — every surface is built from equal-weight hairline guilloche (rose-engine rosettes and rope borders made of 18–30 phase-shifted closed curves), an iris (split-duct) underprint of fine wave lines whose colour drifts marigold→persimmon→lilac, one dark intaglio ink whose tone comes only from the thickness of contour-following parallel lines, red numbering-machine serials with a check digit plus microtext rules, and a symmetrical certificate frame with corner denomination medallions and a perforated counterfoil; a latent image hidden in a line screen appears only under a decoder film.
---

# 證券印刷・提貨券半身 Security Print — Iris Voucher

> 型錄條目：「印刷與製程」類〈凹版雕刻 Intaglio／鈔券〉第 2 站（第 1 站 vaubernier 為葡萄酒莊「車紋直開場＋橢圓開窗＋淡青淡玫瑰底紋＋墨綠胭脂雕線」）。
> 本站取的是同一流派的另一半：**商家有價證券／禮券／股票**——彩虹印刷底紋、紅色號碼機流水號、存根騎縫、潛像。主色相換成藤紫雕線＋萬壽菊→柿橘→藤紫彩虹墨。
> 範例：鳳和喜餅（臺中成功路，1958 年創業、1967 年起印提貨券）。

## 1. 設計哲學

鈔券與證券的樣子不是為了好看長出來的，是為了**難以複製**：照相製版做不出同寬髮絲線的交織、做不出一支墨槽裡的漸變、做不出凸起的凹版墨、做不出帶檢查碼的連號。每一個視覺特徵都是一道防偽工序。所以這個風格的規矩是：**畫面上每一個元素都要能說出它防的是什麼**。裝飾＝工序。

在網頁上，它傳達的是「這張紙值錢、要收好」。適合任何把一個承諾印成紙的生意：禮券、提貨券、會員證、股東憑證、門票、保單、獎狀、限量序號。

## 2. 色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 券紙 Paper | `#F4EFE6` | 券面底、所有面板 | ~45% |
| 桌面 Desk | `#E7DFD2` | 頁面底（券放在桌上） | ~20% |
| 凹版藤紫 Intaglio | `#3A2347` | 唯一的雕線色：玫瑰章、繩紋、線雕、標題 | ~20% |
| 淡藤紫 | `#6A4C7A` | 微縮字、次要說明 | ~3% |
| 號碼紅 Numbering | `#C8232C` | 流水號、印鑑、「已撕」章；**每屏 ≤3 處** | ~2% |
| 彩虹墨 I1 萬壽菊 | `#F2C14E` | 只用在底紋細線（iris） | — |
| 彩虹墨 I2 柿橘 | `#EE8C6A` | 同上 | — |
| 彩虹墨 I3 藤紫 | `#B79AD6` | 同上 | ~10%（三色合計） |

規則：雕線永遠單色；彩虹只在底紋；紅只給號碼與印。零漸層填色（彩虹是**線的顏色**在變，不是面）、零陰影、零圓角（驗券片 5px 例外，它是塑膠片）。

## 3. 字體系統

- 中文：**Noto Serif TC** 900（券名、面額）、600（「憑券提取…」寬字距行）、400（內文）。標題 letter-spacing .06–.14em，憑證行 .36em。
- 拉丁：**Cinzel** 700，全大寫、letter-spacing .2–.27em——雕刻羅馬大寫，用於英文店名與 `GUILLOCHE` 類小標。
- 號碼：**Courier Prime** 700，紅色，letter-spacing .06em。
- 簽名：**Pinyon Script** 只用一次（店主簽名）。
- 字級：券名 50（SVG 單位，依字數自動縮至 300/字數）、面額 40、憑證行 25、資訊 13、微縮字 3.6–4；HTML 內文 16/1.75、表格 14.5、存根 13。

## 4. 版面與網格

- **券簿骨架**：`grid-template-columns: 200px 1fr`——左存根、右券面，中間一排打孔騎縫（`radial-gradient` 圓孔 12px 間距）。≤900px 存根移到券面下方，騎縫改成橫排。
- **券面比例 1000×560**（≈1.79，鈔券比例），所有圖都在這個 viewBox 裡算座標，等比縮放。
- 券面分區：左 1/2 主玫瑰章（中心 290,300）；右上券名與憑證行；右中潛像帶（478,300,200×126）；右緣直排紅號碼；右下凹版線雕小圖；四角面額章（66/934, 66/494）；上下繩紋邊 y=48/512；左右直繩紋 x=48/952。
- 對稱只在框；內部不對稱（玫瑰章偏左、資訊偏右）。
- 留白規則：券面內部**沒有空白**——空的地方由彩虹底紋填滿；空白只在券外（桌面）。

## 5. 元件配方

- **導覽＝號碼機**：左下固定，深藤紫機頭＋六顆號碼輪（Courier Prime 22px、`#F07A70` on `#2A1A33`），旁接四格頁名 `01 券面…04 提貨`；點擊後末位輪滾到新頁號、機頭壓一下，再撕券換頁。
- **按鈕**：1px 實線＋內縮 2px 細線雙框（`::before{inset:2px;border:1px solid}`），hover 反白為藤紫底；紅按鈕＝最後一步。
- **區塊標題**：羅馬數字方框（雙線：`border`＋`outline-offset:3px`）＋中文標題＋Cinzel 小字英文。
- **表格＝帳本**：首列上緣 2px 藤紫線、每列 1px 細線、數字欄 Courier Prime 右對齊。
- **存根**：`dl` 欄位＋點線底，像手填的存根聯。
- **收執**：券紙底、上緣一排半圓齒孔（撕下來的那一邊）。
- **印鑑**：2.5px 紅框方章、旋轉 −4°、`mix-blend-mode:multiply`。
- **footer**：2px 藤紫線開頭三欄＋虛構聲明細字。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做法 | 觸發 | 時值 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 兩層同一朵彩虹大玫瑰反向慢轉（560s／430s），交疊處莫列紋持續漂移 | 無需輸入 | linear infinite | 停在 0° |
| input 輸入 | 游標 x 位置推動所有彩虹漸層的 `gradientTransform`（墨槽在紙上滑動），rAF 0.35 追隨；〈印券〉打字 90ms 後整朵玫瑰章依名字重車 | pointermove／input | <16ms 一幀 | 直接設定，不補間 |
| transition 轉場 | 離頁：券沿騎縫撕下（WAAPI 470ms，先微抬再甩出）；進頁：新券從存根裡抽出（`clip-path: inset(0 100% 0 0)→0` 620ms）；〈印券〉撕存根、收執由上而下展開 | 點導覽／按鈕 | cubic-bezier(.2,.7,.2,1) | 立即換頁、立即顯示 |
| signature 簽名 | **驗券片**：拖一片線網膠片過潛像帶，藏在線紋裡的字浮出；上下移動半格（3 單位）正負像翻轉；放手吸附到半格 | pointer drag／方向鍵 | 吸附 140ms | 吸附無補間，揭示本身是靜態幾何，不受影響 |

號碼機：末位輪 WAAPI 380ms `cubic-bezier(.3,1.5,.5,1)`（有回彈，像彈簧輪）、機頭 180ms 下壓。

## 7. 插畫與圖像風格（iris-intaglio 彩虹底紋凹版線雕）

全部由數學曲線生成，**零點陣圖**：
- 玫瑰章：極座標 `r(t)=R+a·sin(k·t+φᵢ)+b·sin(m·t−φᵢ·tw)`，`φᵢ=i·2π/n`，n=18–30 條閉合曲線，線寬 .4–.55。
- 繩紋：`y=y₀+a·sin(u+φᵢ)+a₂·sin(2u−φᵢ)`，n=9。
- 底紋：整面細波線 `y+a·sin(x·w₁+y·p₁)+a₂·sin(x·w₂−y·p₂)`，間距 4.6，彩虹漸層描邊。
- 凹版線雕：高度場（大餅＝扁圓盤、綠豆椪＝穹頂、西點＝枕形、雙層＝鐵盒）＋Lambert 光（左上），每條掃描線抬升 `h·0.35`，線寬 `wmin+(wmax−wmin)(1−L)^1.35` 畫成填色多邊形。大餅上另疊紅囍（multiply），像餅面蓋的印。

## 8. Logo 與 Favicon

- Logo：240×240 圓章——外圈 12 條扭索玫瑰、環形微縮字「鳳和喜餅 · HONG-HO HI-PIANN · 臺中成功路」、雙線圓框、中央「鳳和」900、下方紅框「1958」。
- Favicon：64×64 券紙底、7 條小玫瑰、中央紅點（號碼紅）。inline SVG data URI。

## 9. Do & Don't

Do：每一條線同寬；濃淡只靠疏密與粗細；彩虹只在底紋；紅色只給號碼；四角面額章；騎縫與存根；微縮字當框線；資訊照證券格式寫（不記名、效期、字軌、號碼起訖）。

Don't：
- 不用漸層「填色」做彩虹（那是 2010 年的按鈕，不是 iris printing）。
- 不畫紙鈔上的人像與國徽、不寫任何真實貨幣的面額與國名——本風格做的是**商家禮券**，不是仿鈔。
- 不用金色（那是 Art Deco）；不用深底鎏金。
- 不用 stroke-dashoffset 慢慢描出玫瑰章（全館過載）。
- 不用 emoji、不用紫藍漸層 hero、不用置中三卡片、不寫「EST. 19xx」徽章。
- 不把凹版線雕換成灰階照片或填色插畫。

## 10. 頁面骨架範例

```html
<div class="booklet">
  <aside class="stub" aria-label="存根">
    <h2>存根</h2><div class="lat">COUNTERFOIL</div>
    <dl><dt>號碼</dt><dd class="serial">鳳A 004211 9</dd><dt>面額</dt><dd>壹盒・大餅</dd></dl>
  </aside>
  <div class="face"><main class="sheet">
    <svg id="v1" class="voucher" viewBox="0 0 1000 560" role="img" aria-label="提貨券…"></svg>
    <section class="sec"><header><span class="no">I</span><h2>一盒餅，印成一張券</h2><span class="lat">WHAT THIS PAPER IS FOR</span></header>…</section>
  </main></div>
</div>
<nav class="numberer" data-page="1"><div class="head"><span class="wheels"></span></div><ol>…</ol></nav>
<script>
HP.voucher(document.getElementById('v1'),{id:'v1',seed:HP.fnv('鳳和1967'),denom:'壹',serial:HP.serial('鳳A',4211),
  shape:'disc',stamp:'囍',latent:'囍',lx:478,ly:300,lw:200,lh:126,lens:{x:700,y:372,w:170,h:108}});
</script>
```

## 11. 本風格的 5 個不可省略特徵

### ① 扭索紋 Guilloche（拿掉它，就只是一張有邊框的收據）
同一粗細的髮絲線，n 條閉合曲線只差相位，交織成網；濃淡只看疏密，**零填色**。
```js
function rosette(cx,cy,R,a,k,b,m,n,steps){let d='';for(let i=0;i<n;i++){const ph=i*2*Math.PI/n;
  for(let j=0;j<steps;j++){const t=j*2*Math.PI/steps,r=R+a*Math.sin(k*t+ph)+b*Math.sin(m*t-ph);
    d+=(j?'L':'M')+(cx+r*Math.cos(t)).toFixed(1)+' '+(cy+r*Math.sin(t)).toFixed(1)}d+='Z'}return d}
// <path d="${rosette(290,300,148,31,9,9,4,27,340)}" fill="none" stroke="#3A2347" stroke-width=".52"/>
```

### ② 彩虹底紋 Iris underprint（拿掉它，券面就是一張單色版畫）
一支墨槽並排三色、滾筒抹成漸層；**只印在最底層細波線上**，色是「線的顏色」在變。
```svg
<linearGradient id="iris" gradientUnits="userSpaceOnUse" x1="0" x2="1000" spreadMethod="reflect">
  <stop offset="0" stop-color="#F2C14E"/><stop offset=".5" stop-color="#EE8C6A"/><stop offset="1" stop-color="#B79AD6"/>
</linearGradient>
<path d="M24 26 … (每 4.6 單位一條正弦波線)" fill="none" stroke="url(#iris)" stroke-width=".62"/>
```

### ③ 凹版線雕 Intaglio line engraving（拿掉它，餅就成了扁平插畫）
明暗＝平行線的粗細；線隨曲面隆起而彎；每條線是填色多邊形。
```js
// 每條掃描線 y：取樣 x，h=高度場(x,y)，L=Lambert(法線, 左上光)
w = .18 + (2.1-.18) * Math.pow(1-L, 1.35);          // 背光變肥
pt = [cx + x*s, cy + (y - h*.35)*s];                 // 線隨曲面抬升
// 上緣 pt.y - w/2 正走、下緣 pt.y + w/2 反走 → 閉合多邊形 fill="#3A2347"
```

### ④ 紅號碼＋微縮字 Serial & microtext（拿掉它，這張紙就不能拿來換東西）
左上與右緣直排兩組紅號，最後一碼 Luhn 檢查碼；框線是 3.6 單位高的店名微縮字。
```svg
<text x="112" y="112" font-family="Courier Prime" font-weight="700" font-size="21" fill="#C8232C"
      letter-spacing="1.5" style="mix-blend-mode:multiply">鳳A 004211 9</text>
<path id="row" d="M40 31H960"/>
<text font-size="3.6" fill="#6A4C7A"><textPath href="#row">鳳和喜餅 HONG-HO 臺中成功路 鳳和喜餅 …</textPath></text>
```
```js
const luhn=s=>{let t=0,d=true;for(let i=s.length-1;i>=0;i--){let n=+s[i];if(d){n*=2;if(n>9)n-=9}t+=n;d=!d}return(10-t%10)%10};
```

### ⑤ 證券框＋四角面額章＋存根騎縫 Certificate frame（拿掉它，就看不出哪一聯是你的）
```css
.stub::after{content:"";position:absolute;top:0;bottom:0;right:-5px;width:10px;
  background:radial-gradient(circle at 5px 50%,#E7DFD2 3.1px,transparent 3.6px) 0 0/10px 12px repeat-y}
```
```svg
<rect x="12" y="12" width="976" height="536" fill="none" stroke="#3A2347" stroke-width="1.8"/>
<rect x="20" y="20" width="960" height="520" fill="none" stroke="#3A2347" stroke-width=".5"/>
<!-- 四角：r=38 券紙圓 → 14 條小玫瑰 → r=17 雙線圓 → 面額字 900 -->
```

## 12. 技術實作與相容性

### (a) 核心技術與查證

| 層 | 技術 | 在本站承載什麼 | 支援現況（查證來源） |
|---|---|---|---|
| E 資料與生成 | 程序化圖樣生成：極座標玫瑰章、繩紋、波線場、高度場凹版線雕；FNV-1a＋xorshift 決定性種子 | 特徵①②③全部；〈印券〉以兩人名字＋日期為種子重車整朵玫瑰章、每對新人一朵 | 純 JS 數學，無相容性問題；`Math.imul` 為 ES2015（MDN Baseline Widely available） |
| A 渲染 | SVG `<pattern patternUnits="userSpaceOnUse">` 線網格＋`<mask>`＋`mix-blend-mode:multiply` | 簽名〈驗券片〉：潛像帶內外兩種相位錯開半格的線網，膠片上的線網隨膠片平移，相位＝`y mod 6`；號碼紅與印鑑的疊印 | MDN：`mix-blend-mode` Baseline Widely available（2020-01），適用所有元素含 SVG；`SVGPatternElement` Baseline Widely available（2015-07），`patternTransform` 同（2020-01） |
| B 動效與時間軸 | Web Animations API（`Element.animate`、`.finished` promise） | 號碼機輪滾動→機頭下壓→撕券→換頁的 promise 串接；新券抽出、收執展開、存根撕走 | MDN：`Element.animate()` Baseline Widely available（2020-03）；`Animation.finished` 同（MDN 現行頁面 2020-03） |

### (b) Fallback 具體行為

- 無 JS：券面 SVG 內有靜態版（外框＋券名＋憑證行＋效期＋紅號碼＋面額），`<noscript>` 說明；所有店家資訊在 HTML 表格與存根，零損失。
- 無 `Element.animate`：號碼機直接換頁、無撕券與抽出動畫。
- `mix-blend-mode` 不支援：驗券片線條為不透明藤紫——潛像仍然顯現（線疊在線上＝條紋、線填進空隙＝實心），只是少了一點透明感。
- `prefers-reduced-motion`：四種動效全停（見 §6），潛像揭示是幾何結果不是動畫，照樣可用；驗券片可用 Tab＋方向鍵移動（↑↓ 每次半格＝正負像翻轉），或按「請素琴幫我驗」自動就位。
- 無 IntersectionObserver（餅目頁）：四張券一次全部生成。

### (c) 效能實測（建置環境 Node 22 / jsdom 量測，桌機 Chrome 依比例估）

- 單頁大小：index 54KB、piann 49KB、kuan 53KB、lai 50KB（含 inline CSS/JS，遠低於 350KB）；logo.svg 20KB。
- 一張全細節券面的幾何生成：約 30–45ms（Node），輸出約 0.77MB path 字串由瀏覽器一次 `innerHTML` 解析；餅目頁四張券改 `lite` 參數（底紋間距 6、玫瑰 ≤20 條、去掉第二層轉盤）並以 IntersectionObserver 延後到捲入前 300px 才生成，首屏只算一張。
- 動畫只動 `transform`／`clip-path`／`gradientTransform` 一個屬性；轉盤用 CSS `animation`（合成器執行），游標彩虹在 rAF 內寫屬性、收斂後停 rAF。
