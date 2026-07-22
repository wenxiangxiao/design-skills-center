---
name: nishiki-e-brocade
description: A Japanese multicolor woodblock (nishiki-e) skin — sumi key-block outlines, beni-vermilion seals, washi cards on a mid-tone pond-slate ground, seigaiha waves and registration marks — where every illustration is generated from data rather than drawn.
---

# 錦絵風 Nishiki-e Brocade — 設計規格書

> 本 SKILL 定義「錦絵風（多色木版画）」的視覺語言。風格與內容分離：任何產業都能套用。範例站為錦鯉育種場「錦鱗園」，但這套皮膚同樣適用於和菓子舖、版元書肆、染物工房、能楽堂、文具老舖等。
> 核心精神：**錦絵是「刷版」出來的，不是「畫」出來的。** 每一塊顏色都對應一塊版；圖像由結構（在範例站是基因型）產生，而非手繪筆觸。

## 一、設計哲學

錦絵（にしきえ）是江戸多色木版画的巔峰，「錦」意指其色彩之華麗如織錦。它的視覺邏輯有三：

1. **主版（キー版）統御一切**——先刷一塊墨線輪廓版，所有色塊都被墨線框住、對齊套色記號（見当）。因此本風格**一律用 2px 純黑實線描邊，零圓角、零模糊陰影**。
2. **色版有限、面積為王**——一張錦絵通常只用 4–6 塊色版，靠平塗大色塊與少量暈染（ぼかし）構成，而非漸層與光影。所以本風格**避免 hero 漸層、避免柔和投影**，改用平塗色域＋硬邊色塊。
3. **紙是暖白、地是水色**——版元用的是溫暖的和紙（washi）；但整個版面的「地」不是紙白，而是浮世繪常見的水色（藍鼠・錆青）中間調。**紙白只出現在承載內文的卡片上，不作全站底色**（避開已過載的米白紙感底）。

去AI化重點：不要把它做成「日式極簡留白」。錦絵是**密實、對比強、線條硬、色塊大**的，與極簡是相反的兩極。

## 二、色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 藍鼠 pond-slate | `#3F5B66` | 全站「地」色、版面底 | ~50% |
| 錆青 deep-slate | `#33505A` | 波紋底、次級面板 | ~12% |
| 和紙 washi | `#EDE4CE` | 內文卡片、魚體白地、正文字 | ~22% |
| 緋 beni | `#C8331F` | 落款印・強調・目標按鈕・錦鯉之緋 | ~9% |
| 墨 sumi | `#1B1815` | 主版描邊、正文於紙上、錦鯉之墨 | ~5% |
| （補）金茶 gold | `#C39A47` | 金賞徽章・稀用金色 | <2% |

規則：緋只用在「有語意的強調」（印章、目標品種、優勝章），不當裝飾濫用。墨永遠是線與字，不作大面積填色（黑地錦鯉除外，那是內容不是皮膚）。魚體上的緋・墨・白屬**內容色**，可飽和鮮明，不受地色中間調的限制——如同錦絵畫中人物的衣色可以很艷，但畫的「地」是水色。

## 三、字體系統

- 來源：Google Fonts。三族——`Noto Serif TC`（400/700/900）、`Noto Sans TC`（400/500/700）、`Cormorant Garamond`（italic 500/600）。番号與數值用系統 `ui-monospace`（或 `DM Mono`）。
- **題字**一律 `Noto Serif TC` 900（明朝体的濃重感，對應木版刻字的力道）；字級 scale：h1 40px／h2 24–26px／h3 18–20px／正文 16px／標籤 11–13px。行高正文 1.75、標題 1.15。
- 段標可用**縦書き短冊**：`writing-mode:vertical-rl` 的墨底白字直排小標，貼在段首，像版画上的題簽。
- 拉丁與副標用 `Cormorant Garamond` 斜體，字距 `.02em`，作為西洋古書的對照口吻；全大寫英文標籤字距放大到 `.2–.32em`。

## 四、版面與網格

- 最大寬 1120px，左右 padding 22px。非對稱：開場用 `1fr 300px` 的雙欄（主敘事＋數據卡），內頁用 `1.1fr .9fr`。
- **見当（套色記號）**：四角固定 22px 的十字形套準記號（`.ken`），是錦絵套版的招牌細節，桌機顯示、手機隱藏。
- **青海波（seigaiha）**：以疊圓弧 radial-gradient 生成的波紋帶，只用在 hero/footer 的窄帶，透明度 ~.5，不鋪滿全頁。
- 卡片一律 `background:washi; color:sumi; border:2px solid sumi;` 無圓角。留白靠 border 與間距，不靠陰影。
- RWD：≤900px 收起角落導覽、改底部 dock、雙欄轉單欄；≤620px 隱藏刊頭 tag。

## 五、元件配方

- **nav（血統枝／pedigree-branch）**：桌機右上角一張 washi 小卡，內含一個 SVG 系譜圖——四個節點以線相連如家系分枝，現用頁節點填緋、其餘填和紙；節點下方附中文頁名，現用頁緋色加底線。語意是**世代分枝**（不是方位、不是順序、不是持有）。≤900px 改底部四格 dock、現用格反白緋底；footer 恆備完整連結。
- **按鈕**：`.btn` 和紙底、2px 墨框、明朝体 700；hover/focus 整塊翻緋底白字（130ms）。`.ghost` 為透明和紙框版。禁用態 opacity .42。
- **卡片/魚牌**：和紙底墨框；hover 上移 3px＋硬投影 `4px 4px 0 rgba(sumi,.28)`（硬邊位移陰影，非模糊）。選中態 `box-shadow:0 0 0 3px beni`。
- **落款印（seal）**：緋色圓角方塊、和紙字、`rotate(-3deg)`，內外雙描邊模擬鈐印。品牌識別的簽名元件。
- **表格**：墨框、表頭墨底和紙字明朝体；數值欄右對齊 mono。
- **footer（版元奧付）**：頂 2px 和紙分線，落款印＋版元資訊＋彫師摺師署名（此處標建置模型）＋虛構示意聲明。

## 六、動效規則

錦絵是靜物，動效要**克制且硬**，避免任何「AI 感」的通用淡入濫用：

- 按鈕/魚牌換色：`transition:background .13s, color .13s`（整塊翻色，非漸變透明度）。
- 卡片 hover 位移：`transform .12s`＋硬投影。
- 進度條（品評採點）：寬度 `.12s`，緋色實心。
- **魚體漂游**：`@media (prefers-reduced-motion:no-preference)` 下，池中錦鯉做 6–7.3s 的 ±3px 上下微擺＋±1.5° 旋轉（`@keyframes drift`），錯開週期模擬水流；reduced-motion 下完全靜止。
- **禁用**：揭示式進場當主 signature、數字計數動畫、stroke-dashoffset 描繪、按壓硬陰影 hover——這四項為館內過載語彙。無跑馬燈、無自動播放。

## 七、插畫與圖像風格（本站首創技法）

**基因斑紋場 genome-mon**：本風格不畫插圖——每一張圖都是一組資料（在範例站是二倍體基因型）被表現引擎渲染出來的。

- 魚體＝固定的上見輪廓 SVG path（頭上尾下、含胸鰭），內部以 `clipPath` 夾住。
- 斑紋＝一組「斑基因」`{x,y,s,rot,k}`（正規化座標），每個基因用 seeded PRNG（mulberry32）繞中心取 12 點生成有機多邊形（際 kiwa 為硬邊、非羽化）。緋斑、墨斑各一組。
- 白地魚：先刷緋、再刷墨；黑地魚：黑為底，先刷白地（shiroji）、再刷緋。這對應真實錦鯉的刷版順序。
- **同一組基因永遠得到同一張圖**（決定論）。靜態頁的圖在建置時以同一支引擎烘成 SVG，無 JS 亦可見；互動頁即時渲染。
- 與生成藝術（generative-canvas）不同：這裡每一塊斑都有語意（是哪個基因座的表現），能被指認；與砂粒聚積（grain-accretion）不同：那畫的是粒子堆積的結果，本技法畫的是基因型的表現。

移植到其他產業時，把「基因型」換成任何可結構化的資料（菓子的配方、染物的型紙、紋章的規則），讓圖由資料長出來，即保有此風格的靈魂。

## 八、Logo 與 Favicon 設計指南

- **Logo**：圓形紋章（roundel）內置一尾上見錦鯉線描——`none` 填色＋2px `currentColor` 描邊，配一枚緋斑一枚墨斑。以 `currentColor` 繪製，故在深地與淺地上都可用。
- **Favicon**：緋色圓底（roundel）＋和紙色錦鯉剪影＋墨眼緋斑，inline SVG data URI 寫在 `<head>`，64×64 viewBox。原創、零外部檔案。

## 九、Do & Don't

**Do**：2px 純黑主版線框；平塗大色塊；水色中間調地＋和紙卡片；緋只作語意強調；縦書き墨底短冊小標；見当與青海波細節；圖由資料生成；硬邊位移陰影。

**Don't**：紫藍漸層 hero；圓角卡片＋模糊陰影；米白紙感當全站底；emoji 當 icon（一律自繪 SVG）；Lorem ipsum 與 AI 腔（「在當今快節奏…」）；置中大標＋副標＋兩顆按鈕＋三張卡的模板；跑馬燈反射式套用；手繪筆觸插圖（本風格的圖必須是刷版感／資料生成）。

## 十、頁面骨架範例

```html
<!-- 段標：縦書き短冊 + 說明 -->
<div class="shead">
  <div class="vt">品評</div>
  <div class="sx"><h2>品評席 — 本池最佳個体の採点</h2><p>依錦鯉品評基準……</p></div>
</div>

<!-- 魚牌（和紙卡・墨框・硬投影 hover） -->
<button class="fish">
  <span class="fk"><svg viewBox="0 0 120 300" width="72"><!-- 基因斑紋場渲染 --></svg></span>
  <span class="fmeta"><b class="mono">FKB84</b>
    <span class="fv">大正三色</span><span class="fs mono">78 点 · 銀賞</span></span>
</button>

<!-- 落款印 -->
<span class="seal">錦鱗</span>
```

```css
:root{--ground:#3F5B66;--washi:#EDE4CE;--ink:#1B1815;--beni:#C8331F;--gold:#C39A47;}
body{background:var(--ground);color:var(--washi);font-family:"Noto Sans TC",sans-serif}
h1,h2,h3,.mincho{font-family:"Noto Serif TC",serif;font-weight:900}
.card,.fish{background:var(--washi);color:var(--ink);border:2px solid var(--ink)} /* 無圓角 */
.btn{background:var(--washi);border:2px solid var(--ink);transition:background .13s,color .13s}
.btn:hover{background:var(--beni);color:var(--washi)}
.shead .vt{writing-mode:vertical-rl;background:var(--ink);color:var(--washi);font-weight:900;padding:10px 6px}
```

---

*一個從未看過 Demo 的 AI，只讀本 SKILL 就應能做出風格一致的全新錦絵風網站：水色地、和紙卡、2px 墨線、緋色落款、縦書き短冊、以及「圖由資料生成」的插畫哲學。*
