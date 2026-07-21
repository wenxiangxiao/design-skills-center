---
name: sprue-frame
description: A dark, warm-brown workshop aesthetic in which every image on the site is an injection-moulding sprue frame — parts still attached to runners, with gates, ejector marks and parting lines — and the act of "snipping a part off the runner" is the site's core irreversible interaction.
---

# 射出流道框 Sprue-Frame

## 一、設計哲學

這套語言來自射出成型的一個事實：**一件塑膠零件離開模具時，不是單獨的一顆，而是連在一整副流道上的一格。** 主流道（sprue）把熔膠送進分流道（runner），再經澆口（gate）灌進模穴。冷卻後取出的是一整框零件，要用它，就得把它從流道上剪下來——而剪口永遠留在那裡。

所以本風格的三條公理是：

1. **內容不是被放在版面上，是被生在框上的。** 每一塊內容都是一顆零件，有編號、有澆口、有它在框上的位置。頁面不是卡片牆，是一副還沒被剪開的框。
2. **剪下是不可逆的。** 這條物理規則要一路貫穿到互動設計：使用過的東西不回到原位、不提供還原、狀態只往前走。若你的網站有「撤銷」，你就不是在用這套語言。
3. **暗底讓塑膠發色。** 底是作業檯的深棕黑，不是米白紙。所有的亮度都來自零件本身：象牙色的框、青綠的編號、橘色的剪口。

不要把它做成「工業風」。工業風是裝飾（鉚釘、格紋、做舊）；本風格是製程（澆口、頂針痕、分模線、縮水），每一個視覺元素都必須對應一個真實的成型現象。

## 二、色彩系統

| 名稱 | Hex | 用途 | 比例 |
|---|---|---|---|
| 檯面棕黑 `--ink` | `#171310` | 全站底色、行動導覽底 | 約 46% |
| 作業檯 `--bench` | `#241C16` | 面板、收件單、報告書底 | 約 20% |
| 零件底 `--bench2` | `#31251A` | 零件本體填色、按鈕底 | 約 12% |
| 象牙塑料 `--ivory` | `#EFE3C6` | 正文、零件描邊、主要按鈕底 | 約 14% |
| 流道灰 `--dim` | `#9C8C74` | 流道／澆口、次要文字、註記 | 約 5% |
| 玩具青 `--teal` | `#2FB39B` | 零件編號、狀態進度、可用狀態 | 約 2% |
| 剪口橘 `--orange` | `#E8781F` | **只用在不可逆之處**：剪口、放棄之物、工序卷左緣 | 約 1% |

規則：

- 橘色是這套語言的語意色，不是點綴。凡是「這件事做了就回不去」的地方才准用橘色；用在別處會讓整套規則失效。
- 青色只給編號、量值與可用性；不要用青色寫句子。
- 底色三階（ink / bench / bench2）之間差距刻意很小（明度差約 4–6%），層次靠 1px 邊線而不是靠陰影。**禁止模糊陰影。**
- 若要換色相：底色可換成其他深色暖階（鐵鏽、瀝青、深栗），但必須維持「暗底 + 單一象牙色主體 + 一青一橘兩個語意色」的結構。

## 三、字體系統

```
標題／數字大字：Archivo Black（Google Fonts），uppercase，letter-spacing −.02em，line-height .92–.96
中文正文／標題：Noto Sans TC 400 / 700 / 900
編號・工時・規格：IBM Plex Mono 400/500/600，letter-spacing .10–.16em，uppercase
```

字級 scale（桌機）：

| 用途 | 值 |
|---|---|
| 頁面大字（僅內頁使用） | `clamp(30px, 5vw, 58px)` Archivo Black |
| 章節標題 | 26–30px / 900 |
| 零件標題 | 19–22px / 900 |
| 正文 | 16px / line-height 1.78 / letter-spacing .01em |
| 註記 `.note` | 13.5px / 1.7 / `--dim` |
| 標籤 `.lbl` | 11px mono / letter-spacing .16em / uppercase |
| 零件編號 | 9.5–10px mono / `--teal` |

中文行高必須 ≥1.75；本風格資訊密度高，行高是唯一的呼吸。

**首頁不得使用大字標題。** 首頁的字級最大只到零件標題（19–22px）——大字是內頁的權利，這是本風格區別於一般網站的關鍵之一。

## 四、版面與網格

- 12 欄網格，gap 26px。內容區塊刻意用 `span 7` + `span 4 / grid-column-start:2` 的**左重右輕不對稱**，不要 6+6。
- 最外層 `max-width:1240px`；桌機（≥901px）`body{padding-right:120px}` 讓出右側固定導覽的走廊。
- **零件框容器**：`border:3px solid var(--dim)`，內部以 `::before` 畫一條 7px 的中央主流道（`left:50%`），兩欄零件分列左右，每顆零件用 `::after` 畫一條 38px 的澆口連回主流道。**澆口畫在外層 slot 上，不要畫在有 `clip-path` 的零件本身**——`clip-path` 會把偽元素一起裁掉。
- **零件本體**：`clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)`。左上、右下兩個倒角＝射出件的脫模倒角。**全站零圓角。**
- 框的上下緣壓一行 9.5px mono 的「模內字」（模號、材質、循環標記、警語），`letter-spacing:.24em`，`--dim` 色，`pointer-events:none`。真實模具上就有這種凸字。
- 分節用 2px 實線 `--line2` 的 `.slab`，不用留白分節。
- 行動版（≤900px）：零件框單欄、隱藏中央流道與所有澆口（`display:none`），零件保留倒角。

## 五、元件配方

**導覽（gate-snip 剪口導覽）**
桌機右側固定一支垂直流道，每一頁是掛在上面的一顆零件（52×38 圓角 1px 的矩形，`fill:--bench2` / `stroke:--ivory` 2.2px），零件上兩行字：mono 頁碼 + 中文頁名。

- 現用頁：該顆零件**已被剪下**——`translate(+4, +2) rotate(3.5deg)`、反白（`fill:--ivory`，字轉 `--ink`）、澆口縮短 2px，並在斷點畫一個 `<path d="M28 15l-5 5l5 5">` 的橘色剪口 V 形。
- **造訪過的頁面在流道上留下永久剪口**：以 `sessionStorage` 記錄，每個造訪過的頁面在其澆口位置露出一段 3px 橘色殘根，永不消失。導覽因此同時是瀏覽足跡。
- 行動版：`position:sticky; bottom:0` 的四格 mono 橫列，現用頁反白；**頁尾必須另有完整文字連結列**作為保底。

**按鈕**
`background:--ivory; color:--ink;` 無圓角、無陰影，mono 12.5px、letter-spacing .12em、uppercase。hover 換成 `--teal`（不是變淡）。次要按鈕為 `.ghost`：透明底 + 1px `--line2` 邊。

**卡片（零件）**
見 §4。卡片右上角浮一枚 mono 編號（`--teal`），左上放一枚由引擎生成的零件小圖（見 §7），標題 19px/900，內文 14.6px。**卡片不可有陰影、不可有圓角、不可等高排列成三欄。**

**表單／狀態條**
軌道 `height:12px; background:--ink; border:1px solid --line`，填充為 `--teal`（低於 35 時轉 `--orange`），並在初始值位置壓一條 2px 象牙色垂直基準線——「它來的時候在哪裡」永遠要看得到。

**日誌／不可逆列表**
`border-left:4px solid --orange` 的 append-only 清單，每列 mono 序號 + 內容 + 橘色的「代價」行。此元件不提供刪除。

**Footer**
2px 實線分隔，`--dim` 14px，三欄：地址與人、頁面連結、一段關於本站圖像來源的說明。

## 六、動效規則

| 動效 | 觸發 | 值 |
|---|---|---|
| 零件剪下 | 點擊工序／進入頁面 | `transform: translate(10px, 9px) rotate(2.4deg)`；`opacity 1 → .32`；邊框 solid → dashed；`.42s cubic-bezier(.2,.9,.25,1)` |
| 剪口露出 | 同上，同時 | 澆口的 `::after` 寬度 24px → 12px、色轉 `--orange`、`opacity` 轉 1 |
| 狀態條變化 | 數值更新 | `width .5s cubic-bezier(.2,.9,.25,1)` |
| 零件 hover | hover / focus-visible | `background: #3E2F20`，`.18s`；**不位移、不放大** |

禁止：淡入進場、數字計數滾動、按壓硬陰影、`stroke-dashoffset` 描繪、跑馬燈。本風格唯一的動效簽名是「剪下」，其餘一律靜態。

`prefers-reduced-motion: reduce` 時把所有 transition / animation 降到 `.001ms`——剪下的**結果**（位移、虛線、橘色剪口）仍必須呈現，只是不再有過程。狀態的改變不可因為降級而消失。

## 七、插畫與圖像風格（sprue-runner 流道零件框構圖）

**本風格不畫插圖。** 站上每一張圖——招牌、圖示、縮圖、favicon——都是同一支引擎依種子生成的一副流道框。

引擎三層：

1. **雜湊與亂數**：FNV-1a 字串雜湊 → mulberry32。同一個種子（案號、工序 id、頁名）永遠得到同一張圖。
2. **零件原語**：`plate`（倒角板＋兩孔）、`gear`（9–13 齒＋中心孔）、`wheel`（輪＋輻）、`arm`（兩端銷孔連桿）、`shell`（半殼）、`head`（頭殼＋兩孔）、`spring`（連續 Q 曲線彈簧）、`ladder`（雙縱樑＋橫檔）、`clip`（U 形夾）、`bracket`（L 形托架）。每一種都是真的射出件形狀。
3. **成型痕跡（必要，不可省略）**：每顆零件必須帶
   - 一枚**頂針痕** `ej`：位置隨機、1px `--dim` 空心圓；
   - 一條**分模線** `pl`：橫貫零件、0.9px `--dim`、opacity .5；
   - 孔洞 `hole` 一律填 `--ink` 並以 1.4px 象牙描邊。

   少了這三樣，圖就退化成普通的幾何線描（`thin-lineart`），本風格即失效。
4. **框**：外框 + 中央主流道以 7px `--dim` opacity .55 繪製；注入點是主流道頂端一枚半徑 7 的實心圓；澆口 5px。**已剪下的零件**畫成 1px 虛線的幽靈輪廓（opacity .22），其澆口縮成殘根並補一枚橘色剪口。

配色分工固定：零件本體 `--bench2` 填 + `--ivory` 2px 描邊；流道 `--dim`；編號 `--teal`；剪口 `--orange`。**零件永遠不上第四種顏色。**

## 八、Logo 與 Favicon

Logo ＝ **一副 3 顆零件的迷你流道框**：外框與中央流道以 `--dim` 7–8px 繪製，框內三顆零件（建議 `plate` / `wheel` / 一枚實心青色矩形），其中一顆的澆口被剪斷，斷口處一段 5px 橘色殘根 + 一個 V 形剪口。品牌名以中文 900 + 拉丁 Archivo Black 11px letter-spacing .3em 排在右側，不做圖文合體。

Favicon 為原創 inline SVG data URI，32×32，同一構圖的極簡版：棕黑底、象牙外框與中央流道、一顆青色零件、一顆象牙零件、一段橘色剪口。**不得引用任何外部圖檔。**

## 九、Do & Don't

**Do**

- 讓「不可逆」成為互動的規則而不只是修辭：狀態單向、選項用掉即消失、明確拒絕提供還原並說明理由。
- 把所有數值攤開寫在一個靜態頁上。本風格的可信度來自「規則沒有藏起來」。
- 文案用工廠與職人的口氣：短句、具體、名詞先行（「灰是資料。」「封蠟永遠是最後一道。」）。
- 每個資訊單元都給編號（Z-01、P-07、C-0912）。編號是這套語言的節奏。

**Don't**

- ❌ 紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡
- ❌ 圓角、模糊陰影、玻璃擬態
- ❌ emoji 當 icon（icon 一律用 §7 的零件原語）
- ❌ 米白紙感底（會直接殺死這套語言的發色邏輯）
- ❌ 首頁大字 hero
- ❌ 跑馬燈／數字滾動／淡入進場當主要動效
- ❌ 橘色用在沒有不可逆語意的地方
- ❌ 為了「工業感」加上鉚釘、齒輪紋理、做舊噪點等與製程無關的裝飾

## 十、頁面骨架範例

```html
<!-- 開場：一整框還沒剪開的零件 -->
<section class="frame">
  <div class="moldtxt"><span>ABS · MOLD No.7</span><span>品牌名</span></div>
  <div class="moldtxt moldbot"><span>一經剪下・不可復原</span><span>CYCLE 1979–</span></div>
  <div class="cells">
    <div class="cellslot"><article class="cell">
      <span class="code">Z-01</span>
      <svg class="pic" viewBox="0 0 62 42" aria-hidden="true" data-part="plate"></svg>
      <h3>零件標題</h3>
      <p>兩到三句具體的內容。不要標語。</p>
    </article></div>
    <!-- 重複 4–6 顆 -->
  </div>
</section>
```

```css
.frame{position:relative;border:3px solid var(--dim);padding:30px 26px 34px}
.frame:before{content:"";position:absolute;left:50%;top:-3px;bottom:-3px;width:7px;
  margin-left:-3.5px;background:var(--dim);opacity:.55}
.cells{display:grid;grid-template-columns:1fr 1fr;gap:34px 76px;position:relative;z-index:2}
.cellslot{position:relative}
.cell{background:var(--bench);border:2px solid var(--ivory);padding:20px;height:100%;
  clip-path:polygon(0 12px,12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%)}
.cellslot:nth-child(odd):after{content:"";position:absolute;right:-38px;top:44px;
  width:38px;height:5px;background:var(--dim);opacity:.6}
.cellslot:nth-child(even):after{content:"";position:absolute;left:-38px;top:44px;
  width:38px;height:5px;background:var(--dim);opacity:.6}
@media(max-width:900px){
  .cells{grid-template-columns:1fr}
  .frame:before,.cellslot:after{display:none}
}
```

```js
/* 零件原語最小骨架：形狀 + 三種成型痕跡 */
function part(kind,w,h,r){
  var s = shapeOf(kind,w,h,r);                       // 見 §7 原語清單
  s += '<circle class="ej" cx="'+(w*.5+rand(r,-w*.18,w*.18))+'" cy="'+(h*.5)+'" r="'+(Math.min(w,h)*.055)+'"/>';
  s += '<line class="pl" x1="0" y1="'+(h*.48)+'" x2="'+w+'" y2="'+(h*.48)+'"/>';
  return s;                                           // 缺少 ej / pl 即退化為細線線描
}
```

---

*本 SKILL 定義的是風格，不綁定產業。任何以「不可逆的操作」為核心的題材（修復、鑄造、裁切、投遞、承諾、簽署）都適用；把「零件」換成該領域真正會被一次性消耗的東西即可。*
