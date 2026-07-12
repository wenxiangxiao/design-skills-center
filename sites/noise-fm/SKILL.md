---
name: neo-brutalist-blocks
description: Neo-brutalist web style — thick 3px black borders, hard offset drop shadows, saturated clashing color blocks, Archivo Black display with monospace labels, squared corners and exposed structure, plus press-to-shadow interaction and split-flap counters as motion signatures.
---

# 新粗獷主義（Neo-brutalism / Web Brutalism）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「Podcast」這個題材。雜訊電台 NOISE FM 只是它的一次示範。你可以拿它做活動網站、獨立電商、作品集、開發者工具、街頭品牌或任何想要大聲、直接、反精緻的專案。
>
> 與「野獸派 Brutalism（concrete/raw editorial）」的區別：傳統野獸派走灰混凝土、原始 HTML 質感、巨字撞邊的粗糙路線；**新粗獷主義**是它在 web 的彩色後代——保留粗框與外露結構，但加上**高飽和撞色、硬邊位移陰影、圓潤的黑體巨字與玩味的介面感**，粗獷但有設計、醜得很自覺。

---

## 一、設計哲學

- **外露而非修飾**：邊框、陰影、結構線全部看得見。不藏接縫、不用漸層柔化、不做假 3D。介面像被拆開放在桌上。
- **對比即能量**：靠高飽和撞色、粗細極端的字體、方塊與方塊硬碰硬，製造視覺噪音——這正呼應「雜訊」的主題，但任何品牌都能用它表達「有態度」。
- **自覺的醜**：新粗獷主義故意違反「精緻 SaaS」的甜美規則（柔陰影、淡漸層、圓角卡）。它的美感來自誠實與力道，不是討喜。
- **可觸的介面**：元素看起來就想被按。硬陰影讓按鈕有「浮起來」的實體感，按下去會位移貼合陰影。

視覺策略：**厚、硬、亮、方**。厚框、硬陰影、亮色、直角。**不要**柔陰影、不要漸層、不要圓角卡片牆、不要低對比的優雅——那些都與新粗獷相斥。

## 二、色彩系統

一個做舊紙底鋪滿，純黑落框落字，其餘是三到四個高飽和「撞色」，成塊使用、彼此不調和。

| 色票 | Hex | 用途 | 比例 |
| --- | --- | --- | --- |
| 紙 paper | `#EDE7D9` | 全站背景（暖做舊紙，非純白） | ~45% |
| 卡片米 card | `#FBF7EC` | 卡片／方塊底 | ~15% |
| 墨 ink | `#111111` | 所有邊框、陰影、主文字、深色 footer | ~18% |
| 芥末黃 sun | `#FFC400` | 主強調：導覽列、編號塊、favicon、hover | ~9% |
| 鈷藍 cobalt | `#2E4BFF` | 次強調：badge、來賓名、大色塊區段（配白字） | ~6% |
| 番茄紅 tomato | `#FF4A1C` | 熱點：播放鈕、刊頭大色塊、highlight（配紙色字） | ~5% |
| 萊姆綠 lime | `#B8F500` | 點綴：tag、hover 反饋、來賓卡 | ~2% |

規則：顏色**成塊**用，一塊一色，塊與塊之間永遠夾 3px 黑框。**嚴禁漸層**（尤其紫藍漸層）。撞色是特色——黃配藍配紅可以同屏，靠黑框與留白分隔，不需要「協調」。深色區段（footer、CTA）用鈷藍或墨底配亮字。

## 三、字體系統

三款 Google Fonts，靠「巨體黑字」與「等寬機能字」的極端反差建立性格。

- **Archivo Black**（single weight）：超粗黑體，擔任所有大標題、編號、品牌字、卡片標題。`letter-spacing:-.01~-.02em` 收緊，`line-height:.98~1.15` 壓扁，越大越有力。中文 fallback：`Noto Sans TC 900`。
- **Space Mono**（`400/700`）：等寬字，擔任所有標籤、時間、日期、badge、導覽項、資料型小字。等寬感＝「機器輸出」的誠實。
- **Noto Sans TC**（`400/700`）：中文內文與段落。

字級：大標 `clamp(30px,6vw,74px)` Archivo Black；卡片標題 `19–22px` Archivo Black；內文 `14–16px` Noto Sans；標籤／時間 `10–13px` Space Mono 700、常大寫、字距 `.1–.14em`。反差要拉滿——巨標題旁邊配小小的等寬 label，是核心 tell。

## 四、版面與網格

- **產品網格開場（catalog-first）**：首頁**不要 hero 大標**，直接是內容的網格牆（節目卡／商品／作品）。頂部只留一條窄的介紹區與數據列，主角是那面卡牆。
- **方塊構成**：一切都是有黑框的矩形塊。區塊並置、硬切、直角，`border-radius` 一律 0（favicon 的等化器條也是方的）。
- **硬邊位移陰影**：所有浮起的塊用 `box-shadow: 6px 6px 0 #111`（實心、無模糊、黑、右下偏移）。小元件用 `3px 3px 0`。這是全站的視覺骨架。
- **外露分隔**：section 標題常配一條 3px 實心 rule 橫貫、一個彩色 badge。表格與清單的每一格都描邊。
- **不對稱與撞色分區**：intro 用 `1.4fr / 1fr`，卡牆 `repeat(2,1fr)`，深色 CTA 橫幅打斷節奏。允許元素稍微「太大」「太滿」，那正是力道來源。

## 五、元件配方

- **nav（topbar 厚框置頂列）**：`position:sticky` + 芥末黃底 + 底部 3px 黑框。導覽項是一排相連的等寬字按鈕（`border:3px solid #111; border-right:0` 讓它們共邊），hover 變萊姆綠，當前頁反白（墨底黃字）。手機收成 `MENU` 方塊按鈕，展開為全寬堆疊。
- **按鈕（press-to-shadow）**：實心色塊 + 3px 黑框 + `3–4px` 硬陰影。hover/active 時 `transform:translate(4px,4px)` 並把陰影收成 `0 0 0`——視覺上「按下去貼合陰影」。這是**動效簽名之一**，用在所有 play 鈕、平台鈕、卡片。
- **卡片**：`border:3px; box-shadow:6px 6px 0 #111; background:#FBF7EC`。內部用黑框橫列切分（編號塊 / tag / 時長 / 內文 / footer），每個橫列自己描邊。hover 整卡位移貼合陰影。
- **翻牌計數器（動效簽名之二）**：數據統計（集數、來賓、訂閱）用 Archivo Black 大字，進場時由 `00` 以 `requestAnimationFrame` ease-out 累加到目標值，像機械分頁計數器。reduced-motion 時直接顯示終值。
- **示意播放器**：可按的方形 play 鈕（CSS 三角形）＋一排 CSS 等化器 `<i>` 條，播放時 `@keyframes` 上下跳動，並用 JS 計時。純示意、不載入真音檔。
- **footer**：墨黑底 + 黃色品牌字 + 等寬小標，與亮色主體強烈反差收尾。

## 六、動效規則

動作要「硬」而快，配合實體感，不要柔順緩動。

- **press-to-shadow**：`transition: transform .1s, box-shadow .1s`；hover `translate(3~4px,3~4px)` + 陰影歸零。快、有段落感。
- **翻牌計數**：`IntersectionObserver` 進視窗觸發，`dur≈1100ms`，`ease-out`（`1-(1-p)^3`），個位數補零。
- **波形跳動**：`@keyframes bounce{0%,100%{height:16%}50%{height:90%}}`，`1s ease-in-out infinite`，僅播放狀態啟用。
- **不要**淡入漸層、視差、緩慢優雅的滑入。新粗獷的動作是「喀」一下的機械感。
- reduced-motion：取消所有 `translate` 位移（hover 保留陰影不動）、停止波形與翻牌動畫（顯示終值／靜態）。

## 七、插畫與圖像風格

- 全部 **粗黑線＋色塊** 的 CSS/SVG，`stroke-width:3`，直角優先。
- 母題：等化器／音量條（方塊柱狀）、波形、播放三角、粗框頭肩剪影、方形頭像塊。
- 顏色成塊填入，不用漸層、不用陰影插畫、不用照片、不用 emoji。圖像也遵守「厚框直角」。

## 八、Logo 與 Favicon 設計指南

- **Logo**：左側一個黃底黑框方塊，內含一組高低不一的黑色等化器方柱；右側品牌字用 Archivo Black 中文 + 一條墨黑色塊反白的等寬英文（黃字）。整體黃黑為主。
- **Favicon**：inline SVG data URI，黃底 + 3px 黑框方塊 + 三根高低等化器黑條。方正、無圓角。用 `%23` 轉義色碼寫進 `<head>`。

## 九、Do & Don't

**Do**
- 厚 3px 黑框框住一切，直角到底。
- 硬邊位移陰影 `Xpx Xpx 0 #111`（實心、不模糊）。
- 高飽和撞色成塊使用，黑框分隔即可，不必調和。
- 巨體黑字旁配小小等寬 label，拉滿反差。
- 元素做出「可按」的實體感，hover 位移貼合陰影。

**Don't（含去AI化禁令）**
- 禁紫藍漸層 hero、禁任何漸層與柔（模糊）陰影。
- 禁「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」甜美 SaaS 模板——本風格用直角方塊與硬陰影，正是它的反面。
- 禁 emoji 當 icon（用粗黑 SVG／CSS 方塊圖形）。
- 禁圓角（`border-radius:0`）。
- 禁低對比的優雅配色與細襯線。
- 禁 Lorem ipsum 與 AI 腔文案；文案要口語、有個性、敢玩。
- 跑馬燈非必要：資訊帶優先做**靜態**橫幅，把動效重點交給 press-to-shadow 與翻牌計數，避免反射式套用捲動 ticker。

## 十、頁面骨架範例（可直接使用）

```html
<!-- 產品網格開場：卡牆（首頁不要 hero） -->
<section class="grid">
  <article class="ep">
    <div class="top-row"><span class="num">058</span><span class="tag">平台</span><span class="len">01:12:40</span></div>
    <div class="body"><h3>卡片標題（Archivo Black）</h3><p class="desc">兩三行口語描述。</p></div>
    <div class="foot"><span class="date">2026 / 07 / 08</span><a class="play" href="#"><span></span>PLAY</a></div>
  </article>
</section>

<style>
:root{--ink:#111;--sun:#FFC400;--tomato:#FF4A1C;--card:#FBF7EC;--bd:3px solid #111;--sh:6px 6px 0 #111}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.ep{border:var(--bd);background:var(--card);box-shadow:var(--sh);
    transition:transform .12s,box-shadow .12s}
.ep:hover{transform:translate(4px,4px);box-shadow:2px 2px 0 #111}       /* press-to-shadow */
.num{font-family:'Archivo Black';background:var(--sun);border-right:var(--bd);padding:10px 14px}
.tag{font-family:'Space Mono';font-weight:700;background:#B8F500;border-left:var(--bd);padding:10px 12px}
.play{font-family:'Space Mono';font-weight:700;background:var(--tomato);color:#EDE7D9;
      border:var(--bd);padding:6px 12px;box-shadow:3px 3px 0 #111;transition:transform .1s,box-shadow .1s}
.play:hover{transform:translate(3px,3px);box-shadow:0 0 0 #111}
@media(prefers-reduced-motion:reduce){.ep,.play{transition:none}.ep:hover{transform:none;box-shadow:var(--sh)}}
</style>

<!-- 翻牌計數器（動效簽名） -->
<span class="flip" data-to="58">00</span>
<script>
function runFlip(el){var to=+el.dataset.to,d=1100,t0=null;
 requestAnimationFrame(function s(ts){t0=t0||ts;var p=Math.min((ts-t0)/d,1);
  var v=Math.round((1-Math.pow(1-p,3))*to);el.textContent=(v<10?'0':'')+v;
  if(p<1)requestAnimationFrame(s)})}
</script>
```
