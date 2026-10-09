---
name: lichtenstein-benday-panel
description: Roy Lichtenstein-style Pop Art (1961–1966) — one comic panel blown up to canvas size, fixed-size Ben-Day dots, two-weight heavy black contours, five flat Magna colours, and speech/thought balloons with caption boxes.
---

# 普普藝術 Pop Art ‧ Lichtenstein 網點漫畫半身（Ben-Day Blow-up）

## 0. 血緣與定位

- **流派**：普普藝術 Pop Art（型錄「戰後與反文化」類）之 **Lichtenstein 網點漫畫半身**——全館第 1 站。同條目另一半為 Warhol 照相絹印連作半身（tsai-lai）；兩半視為同一流派，合計已達全館 2 站上限。
- **年代地域**：紐約，1961–1966。起點是〈Look Mickey〉1961（第一張把漫畫格整格搬上畫布的畫），高峰是 1963 年的愛情漫畫系列〈Drowning Girl〉（MoMA 藏）、戰爭漫畫系列〈Whaam!〉（Tate 藏），以及 1965–66 年把「筆觸」本身畫成網點與輪廓的〈Brushstrokes〉系列。
- **素材來源**：DC 的《Girls' Romances》《Secret Hearts》等愛情漫畫、《All-American Men of War》等戰爭漫畫，與電話簿、報紙上的小廣告。
- **製作技術與限制——它為什麼長成這樣**：
  1. 漫畫原稿以四色凸版印在廉價新聞紙上，膚色、天空這些「中間調」只能靠 **Ben-Day 網點**（1879 年 Benjamin Day 發明的網屏，點大小一致）。Lichtenstein 把一公釐不到的點放大成肉眼可數的圓——先試過手點（〈Look Mickey〉），後來改用打孔金屬網當鏤版、以牙刷把顏料刷過孔洞。
  2. 先以鉛筆在小草稿上**改寫、簡化、重新裁切**原格，再用不透明投影機放大描到畫布上，最後以粗黑線描邊。所以**輪廓永遠是兩階**：外輪廓粗、內細節細，沒有中間灰線。
  3. 顏料用剛問世的壓克力 **Magna**：平、亮、不透明，色票只有紅、黃、藍、黑、白——模仿的是印刷油墨，不是繪畫。
  4. 對話框與旁白框是原格的一部分，被一起放大：它們讓一張「純繪畫」同時是一句被打斷的話。
- **外部參照**：MoMA〈Drowning Girl〉1963 館藏頁；Tate〈Whaam!〉1963 館藏頁；Roy Lichtenstein Foundation catalogue raisonné；Wikipedia〈Roy Lichtenstein〉〈Ben-Day process〉。
- **與相鄰條目的分界**：
  - 與 **Warhol 絹印連作半身（tsai-lai）**：那是照片＋單一閾值黑版、同一張圖零間距重複、套不準是本體；本半身是**手繪線稿**、**一格只出現一次**、套得非常準。
  - 與 **半調網點 Halftone（forty-five-degrees）**：那是調幅 AM 網點，點的**面積**隨明暗改變、四色網角疊出玫瑰紋；本半身的點**永遠同一大小**，一區一色，不承載明暗。
  - 與 **俏皮普普風（poppin）**：那是泛用的粗描邊撞色；本半身必有網點、對話框、裁切的單格，色只有五個。
  - 與 **City Pop（ho-jit）**、**清線派 Ligne claire**：那些是均勻細線與大面積平塗、零網點；本半身線分兩階、膚與天一定是點。

## 1. 設計哲學

**一格，放大到對方沒辦法假裝沒看見。** 這個風格的動作只有一個：從一本廉價的印刷品裡挑出一格、裁切、簡化、放大。放大之後，原本看不見的印刷技術（網點、套色、描邊）變成畫面的主角；原本只是劇情中的一句話，變成一個無法收回的宣告。

1. 畫面永遠是**一格被放大的漫畫**，不是一幅插畫。
2. 印刷的限制要被看見：點是點、線是線、色是油墨。
3. 情緒要用通俗劇的方式說——淚、電話、窗、信、「……」與「！」——冷靜地畫，戲劇地說。

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就退化成「粗線條卡通」或「一般普普風」。

### 特徵 1：定尺寸 Ben-Day 網點——同一大小、交錯格、一區一色

膚色＝白底紅點，天空與陰影＝白底藍點。點的直徑永遠相同，不做漸層、不做大小變化、不疊色。

```svg
<pattern id="dR" width="9" height="9" patternUnits="userSpaceOnUse">
  <rect width="9" height="9" fill="#FBFAF4"/>
  <circle cx="2.25" cy="2.25" r="2.05" fill="#E0201B"/>
  <circle cx="6.75" cy="6.75" r="2.05" fill="#E0201B"/>
</pattern>
<!-- 臉：<path d="…" fill="url(#dR)" stroke="#111" stroke-width="6"/> -->
```

```css
.dR{--c:#E0201B;background:
  radial-gradient(circle,var(--c) 0 2.05px,transparent 2.6px) 0 0/9px 9px,
  radial-gradient(circle,var(--c) 0 2.05px,transparent 2.6px) 4.5px 4.5px/9px 9px,#FBFAF4}
```

規則：點距（pitch）與點徑比固定 9 : 4.1；放大時整組一起放大（pattern 用 `userSpaceOnUse` 跟著 viewBox 縮放），絕不在同一格裡混用兩種點距。

### 特徵 2：兩階粗黑輪廓＋實黑塊

外輪廓 6（以 400×300 viewBox 計），內細節 2.6–4，眼線與上眼瞼 7–12。陰影、髮影、睫毛一律是**實黑填色**，不是灰。圓角接頭。

```svg
<path d="…" fill="url(#dR)" stroke="#111" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M188 174Q207 158 227 171" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round"/>
<path d="M96 146l-22 -26l32 16z" fill="#111"/><!-- 睫毛＝實黑三角 -->
```

### 特徵 3：五色 Magna 平塗——紅、黃、藍、黑、白

```css
:root{--r:#E0201B;--y:#FFDD00;--b:#1D5FB4;--k:#111111;--w:#FBFAF4}
```

不混色、不調淡、零漸層、零 opacity 填色、零模糊陰影。「淺藍」只能是白底藍點，「粉紅」只能是白底紅點。頭髮可以是藍色平塗（這是這個流派的招牌之一），嘴唇與指甲是紅色平塗。

### 特徵 4：單格放大與裁切

畫面是一格被放大的漫畫：人物被框裁掉（頭頂、下巴、手被切到）、近景特寫（一隻眼、一支話筒、一封信），格框是 5px 黑線，格與格之間是白色間溝（gutter）。用 `preserveAspectRatio="xMidYMid slice"` 讓同一張 4:3 格在任何比例的格子裡都是「被裁過」的。

```css
.pn{position:relative;border:5px solid #111;overflow:hidden}
.pn>svg{display:block;width:100%;height:100%}
.grid{display:flex;gap:14px} /* 白色 gutter */
```

### 特徵 5：對話框、思考泡泡與旁白框

- 對話框：白橢圓＋尖尾，尾巴指向說話者的嘴（或指向格外——說話的人不在畫面裡）。橢圓與尾巴**共用一條輪廓**：先畫黑色 8px 描邊層，再疊無描邊白色層。
- 思考泡泡：扇貝雲形＋三顆遞減小圓指向頭部。
- 旁白框：黃色矩形、黑框 4px、貼在格的上緣，寫時間與地點（「1966 年，北門郵局對面……」）。
- 字：黑體 900、置中、拉丁字一律大寫，句尾一定是「……」「！」「？」之一。

```svg
<g class="bl say">
  <path d="TAIL" fill="#111" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
  <ellipse cx="136" cy="69" rx="122" ry="62" fill="#111" stroke="#111" stroke-width="8"/>
  <path d="TAIL" fill="#FBFAF4"/><ellipse cx="136" cy="69" rx="122" ry="62" fill="#FBFAF4"/>
  <text text-anchor="middle" font-weight="900">…</text>
</g>
<rect x="6" y="6" width="220" height="40" fill="#FFDD00" stroke="#111" stroke-width="4"/>
```

## 3. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 畫布白 | `#FBFAF4` | 地色、網點底、對話框 | 約 40% |
| 群青藍 | `#1D5FB4` | 天空網點、頭髮平塗、虹膜、連結 focus | 約 22% |
| 鎘紅 | `#E0201B` | 膚色網點、嘴唇、指甲、現用態、價格 | 約 15% |
| 鉻黃 | `#FFDD00` | 旁白框、牆面、頁尾、轉場卡 | 約 13% |
| 墨黑 | `#111111` | 輪廓、文字、實黑陰影 | 約 10% |

規則：只有這五色。對比：黑字對白 18.1:1、黑字對黃 14.0:1、藍對白 6.0:1、黃字對紅 3.6:1（只用於 19px 以上 900 粗體；小字現用態改黑底黃字）。

## 4. 字體系統

- **Noto Sans TC 900**（Google Fonts）：對話框、標題、旁白框。漫畫字沒有細體。
- **Noto Sans TC 500/700**：內文 17px／1.7。
- **Bangers**（Google Fonts）：英文擬聲字與小標（如 `GHOST LETTER`），大寫、字距 .04em。
- **LXGW WenKai TC**（Google Fonts）：只用在紅鉛筆註記（裁切角旁的「放大這裡？」），模擬畫家在原稿上的手寫，全站唯一的手寫字。
- 字級：H1 clamp(30px,4.6vw,54px)；H2 clamp(24px,3.4vw,38px)；對話框（viewBox 單位）19；旁白框 17。

## 5. 版面與網格

- 每一頁都是一張漫畫頁：格子用 flex／grid 排，gutter 固定 14px 白色，格框 5px 黑。
- 格子大小**一定不等**：一大配兩小、一寬配一窄，禁止三等分卡片。
- 文字放在格子的下半（像格子裡的旁白），或格子旁的黃色旁白框裡。
- 零旋轉（這個流派的格子是正的）；唯一傾斜的是信封、話筒等物件與紅鉛筆字（−4°）。
- 硬陰影：只有「整本畫刊」與控制面板可以有 `box-shadow:8–10px 8–10px 0 #111`，格子本身沒有陰影。

## 6. 元件配方

- **導覽（旁白框導覽 caption-box nav）**：左上角固定一疊黃色旁白框，每一框是一頁，前綴是漫畫的時間轉場語：「此刻——」「然後……」「同時……」「很久以前……」。現用頁翻成紅底黃字並放大。≤760px 改為頂部 sticky 橫向捲動列。
- **按鈕**：紅底黃字黑框 4px，`box-shadow:4px 4px 0 #111`，按下位移 4px。
- **主要 CTA**：做成一個對話框——白色橢圓（`border-radius:50%`）＋黑框＋CSS 三角尾巴。
- **卡片（格子）**：上半 SVG 場景（4:3，slice 裁切），下半白底文字，中間 5px 黑線分隔。
- **表單**：黃色面板、黑框 5px；輸入框白底黑框 4px；單選鈕做成小格子縮圖，選中時紅框。
- **頁尾**：黃色滿版，上緣 6px 黑線。

## 7. 動效規則

四種動效，全部 `prefers-reduced-motion` 降級且資訊零損失。

1. **環境 ambient**：窗格裡的雨（`steps(3)` 0.45s 循環位移）、霓虹招牌閃一下（`steps(1)` 2.4s，黃↔白，不用透明度）、淚滴下滑（`steps(4)` 3.2s）、電話捲線擺動（`steps(2)` 1.8s alternate）。全部是 steps——漫畫沒有補間。降級：全部靜止。
2. **輸入 input-driven**：游標移到任何格子上，四個紅鉛筆裁切角跟著游標框出格子的 56%，旁邊手寫「放大這裡？」——你正在做畫家挑格子的動作（rAF 節流，延遲一幀）。〈寫一格〉的文字輸入會即時重解對話框（0.013ms／次），對話框可拖曳、方向鍵移動。降級：裁切角是即時跟隨、本身無動畫，維持。
3. **轉場 transition**：點站內連結時，一張黃色旁白卡以 `clip-path: inset()` 由左向右 `steps(5)` 260ms 蓋滿全螢幕，寫著目的頁的轉場語（「然後……寫一格」）；新頁載入後同一張卡 `steps(6)` 340ms 向右退出。降級：直接換頁。
4. **簽名 signature——退回原稿 pull-back**：首屏是一格放大到滿版的漫畫；往下捲時，整本 1967 年畫刊的那一頁以 scroll-driven 動畫從 ×3 退回 ×1，網點從可數縮回一公釐，最後 10% 紅鉛筆裁切角出現並標註實際倍率（依視窗計算，桌機約 ×3.2）。放大倍率取「整格完整可見」的 contain 值×0.96，讓四周露出鄰格的邊——看得出它是一頁裡的一格。0–16% 停在放大、16–80% 退回、80–100% 停在原稿。降級：取消 360vh 舞台，直接顯示原稿頁與裁切角，文字全在。

## 8. 插畫與圖像風格

- 技法：**benday-contour 網點粗輪廓**。所有圖都是 400×300 viewBox 的 inline SVG：網點 pattern 填色＋兩階黑線＋五色平塗。
- 母題：通俗劇的道具——電話與捲線、雨窗與霓虹、一隻含淚的眼、航空信封與郵票、紅色郵筒、擬聲星形爆炸框（「叩！」）。
- 臉：只畫漫畫的臉——藍色或黑色平塗頭髮配黑色髮流線、紅點膚、黑色眼線、紅色嘴唇。不畫真人肖像。
- 永遠裁切：至少一邊的物件要被格框切掉。

## 9. Logo 與 Favicon 設計指南

- Logo：黃底上一個**紅點網點填色的對話框**（黑色合併輪廓），中間一塊白色旁白框寫「心聲」Noto Sans TC 900，下方 Bangers 字 `SIM-SIANN`。
- Favicon：64×64 黃底、白色對話框、三顆紅點（＝「……」），inline SVG data URI。

## 10. Do & Don't

**Do**
- 一格只說一句話，句尾用「……」「！」「？」。
- 讓網點大到可以數。
- 讓格框裁掉東西。

**Don't**
- 不用漸層、透明度、模糊陰影、圓角卡片。
- 不用可變大小的網點（那是調幅網點，是另一個條目）。
- 不加第六個顏色；不用灰色線。
- 不重製 Lichtenstein 的任何一幅畫或任何現有漫畫角色——構圖、人物、台詞都要原創。
- 不用 emoji、不用紫藍漸層、不用置中三卡片、不用「EST. 19xx」徽章、不用 Lorem ipsum。

## 11. 頁面骨架範例

```html
<nav class="capnav"><a href="index.html" aria-current="page"><i>此刻——</i>首頁</a><a href="write.html"><i>然後……</i>寫一格</a></nav>
<section class="stage" id="stage">
  <div class="sticky">
    <div class="book" id="book">
      <div class="row"><div class="pn"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><!-- 場景＋對話框 --></svg></div></div>
      <div class="row"><div class="pn"></div><div class="pn" id="hero"></div></div>
    </div>
  </div>
</section>
<style>
.js .stage{height:360vh;view-timeline:--pull block}
.js .sticky{position:sticky;top:0;height:100vh;display:grid;place-items:center;background:#FFDD00}
.js .book{transform-origin:var(--ox) var(--oy);animation:pull linear both;animation-timeline:--pull;animation-range:contain 0% contain 100%}
@keyframes pull{0%,16%{transform:translate(var(--tx),var(--ty)) scale(var(--s))}80%,100%{transform:none}}
</style>
```

## 12. 技術實作與相容性

### 12.1 CSS scroll-driven animations（B 動效與時間軸層）

- 用法：`.stage{view-timeline:--pull block}`；`.book{animation:pull linear both;animation-timeline:--pull;animation-range:contain 0% contain 100%}`。JS 只在載入與 resize 時量一次放大格的位置，寫入 `--s --tx --ty --ox --oy` 五個自訂屬性，捲動期間零 JS。
- 支援現況（2026-10 查證）：MDN〈view()〉標示 *Limited availability*、非 Baseline；caniuse：Chrome／Edge 115+ 支援，Safari／iOS Safari 26.0+ 支援，Firefox 預設關閉（114–154 為 flag），Firefox Android 不支援。來源：developer.mozilla.org/docs/Web/CSS/animation-timeline/view、caniuse.com/mdn-css_properties_animation-timeline_view。
- Fallback：`CSS.supports('animation-timeline: view()')` 為假時，改以 passive scroll＋rAF 計算同一條進度曲線，直接寫 `transform`，結果一致；reduced-motion 時不加 `.js` 類，舞台退為一般高度，原稿頁與裁切角直接可見。

### 12.2 SVG `<pattern>` 定尺寸網點＋雙層合併輪廓（A 渲染層）

- `patternUnits="userSpaceOnUse"`，網點跟著 viewBox 一起縮放——同一張圖在縮圖、原稿頁、放大格中就是三種倍率的網點，這正是 pull-back 的視覺本體。對話框以「黑色 8px 描邊層＋白色無描邊層」疊合，讓尾巴與橢圓共用一條輪廓。
- 支援：SVG pattern、patternTransform、clipPath 為 Baseline Widely available。

### 12.3 對話框求解器＋URL 狀態序列化（E 資料與生成層）

- 求解：CJK 逐字斷行（避頭標點 `，。、！？…」`）→ 1–8 行窮舉 → 以最小外接橢圓 `a=W/√2+0.75fs`、`b=H/√2+0.7fs` 逼近 1.75:1 → clamp 到場景的可放區（有旁白框時可放區自動下移）→ 尾巴以橢圓參數角對準嘴點，長度上限 150。
- 序列化：整格 `{s,k,x,bx,by}` → JSON → UTF-8（TextEncoder）→ base64url 放進 `?p=`；對方回覆後網址帶 `{a,b}` 成為雙聯。解碼失敗或欄位不合法即忽略、回到空白編輯。TextEncoder／btoa／URLSearchParams 皆 Baseline Widely available。
- 實測（Node 22 aarch64 沙盒）：求解 0.013 ms／次；單格網址 104 字元起，雙聯約 200–260 字元。

### 12.4 效能預算

- 頁面大小（含全部 inline CSS／JS／SVG）：index 46 KB、write 47 KB、prices 22 KB、story 27 KB，皆遠低於 350 KB。
- 首屏 JS：只有一次 `fit()` 版面量測與一次求解，無迴圈。
- 動畫：簽名動效全在合成器以 transform 進行；環境動效全為 steps()。建置沙盒內沒有瀏覽器，**60fps 未能實機量測**——若在低階手機上放大階段掉幀，將 `.book` 加上 `will-change:transform` 換取合成，代價是放大時可能略糊。
