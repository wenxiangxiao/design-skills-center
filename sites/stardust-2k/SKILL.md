---
name: y2k-millennium
description: Y2K millennium web aesthetic — chrome bevel typography, aqua-and-bubblegum palette, glossy pill buttons, star sparkles, desktop-window panels and cursor sparkle trails, evoking 1999–2003 optimism.
---

# Y2K 千禧風（Y2K Millennium Aesthetic）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「音樂祭」這個題材。STARDUST 2K 只是它的一次示範。

---

## 一、設計哲學

Y2K 千禧風誕生於 1999–2003 年那段「未來就要來了」的樂觀期：透明 iMac、翻蓋手機、鉻金屬 logo、水感圖示（Frutiger Aero 的前身）。它的情緒是**過度樂觀、亮晶晶、有點廉價但充滿自信**——不是冷科技，而是塑膠糖果般的科技樂園。

三個不可動搖的原則：

1. **反光即質感**：所有元素都想「發亮」。鉻金屬立體字、玻璃反光藥丸、內光澤。平面元素也要有一道高光。
2. **甜而電**：配色是螢光糖果（桃紅、電青、酸綠）配深靛底，飽和、對撞，但用深色描邊壓住不刺眼。
3. **介面即裝飾**：桌面視窗框、訪客計數器、星形游標、情緒環——把「舊網路的 UI 物件」當成裝飾語彙來玩，帶懷舊的天真感。

適合題材：音樂祭、潮流服飾、飲料、美妝、遊戲、社群 App、派對活動、次文化品牌。不適合需要嚴肅可信度的題材（律師、醫療）。

## 二、色彩系統

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 薰衣草底 Lilac | `#ECE9F5` | 主背景（淺、透亮） | 46% |
| 深靛墨 Ink | `#171433` | 描邊、文字、footer、硬陰影 | 22% |
| 泡泡桃紅 Pink | `#FF3EA5` | 主強調、CTA、重音 | 12% |
| 水感電青 Aqua | `#37E0E6` | 次強調、玻璃按鈕、清涼面 | 12% |
| 酸性螢光綠 Lime | `#C6FF3D` | 點綴、標籤、計數器數字 | 8% |

鉻金屬不是單一色，而是**由白→淺藍灰→深藍灰的直向漸層**（`#ffffff → #9fb0d8 → #5b6aa0`），中段有一條突然變暗再變亮的「金屬折線」，這是 chrome 的靈魂。

規則：

- 背景用**三個柔和 radial-gradient 光暈**（青／粉／綠）疊在淺底上，製造「果凍感」，但**避免紫藍直向漸層 hero**（那是被禁的 AI tell）。
- 桃紅是重音不是背景：一個畫面出現 2–4 次。
- 所有亮色都用 `2.5px` 深靛墨描邊壓邊，避免螢光刺眼與「AI 柔霧」感。

## 三、字體系統

- **顯示字（Display）**：`Chango`（Google Fonts）——圓潤厚重的展示體，拿來做鉻金屬立體標題與 logo。字重單一，靠 `-webkit-text-stroke` 加墨邊、`background-clip:text` 填鉻金屬漸層、`drop-shadow` 加硬投影三件套變立體。
- **技術字／數字（Tech）**：`Orbitron`（500/700/900）——方正的太空感字體，用於標籤、時間、價格、計數器、按鈕文字，一律 `letter-spacing:.08–.28em` + `text-transform:uppercase`。
- **內文（Han）**：`Noto Sans TC`（400/500/700/900）——中文內文與說明，行高 1.6。

字級 scale（clamp 響應）：巨標 `clamp(56px,13vw,150px)`／區標 `clamp(28px,5.4vw,46px)`／內文 15–17px／標籤 11–13px。

## 四、版面與網格

- **不對稱**：三舞台區用 `1.2fr .8fr` 兩欄，主舞台跨兩列（`grid-row:span 2`）。避免三張等寬卡並排。
- **桌面視窗框（招牌版面）**：內容裝進「作業系統視窗」——頂部有藍灰漸層標題列、左側檔名（`readme.txt`、`info.sys`）、右側三顆彩色方形按鈕（min/max/close，用綠青粉），主體白底 `border-radius:14px` + `6px 6px 0` 硬陰影。這是本風格辨識度最高的容器。
- 留白適中偏鬆，卡片間距 18–22px；圓角 12–16px（比一般 Y2K 收斂，避免過度可愛）。
- 主容器 `max-width:1180px`，左右 padding 22px。

## 五、元件配方

- **Nav**：sticky、半透明毛玻璃底（`backdrop-filter:blur(8px)`）、`2.5px` 底線；連結是 Orbitron 小字藥丸，hover 變白底描邊，current 頁填酸綠。
- **玻璃藥丸按鈕（Glossy pill）**：`border-radius:40px`、`2.5px` 墨邊、`box-shadow:0 4px 0 墨 + inset 0 2px 3px rgba(255,255,255,.9)`（底部硬陰影 + 頂部內高光），背景是白→青→深青→淺青的直向漸層模擬玻璃反光。hover 時 `translateY(2px)` 並縮短底部陰影（像被按下去）。粉色版用於主 CTA。
- **票券／腕帶卡**：`border-radius:16px` 硬陰影卡，中段用 `border-top:3px dashed` + 兩側 `::before/::after` 挖半圓（用底色圓形蓋住）模擬撕票穿孔。
- **情緒環（Mood ring）**：`conic-gradient` 彩虹圓 + `inset` 內光暈 + 硬陰影，點擊隨機切換一種「今日祭典色」文字。
- **訪客計數器（Hit counter）**：深底 + 酸綠 Orbitron 數字的小方塊並排，`inset` 內陰影模擬 LED。
- **Footer**：深靛墨底、青色小標、鉻金屬大字品牌名。

## 六、動效規則

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| 游標星塵拖尾 | `pointermove`（節流 70ms） | 650ms | ease-out | 隨機色星形 SVG 在游標處生成後縮小旋轉淡出（本站動效簽名） |
| 按鈕按下 | `:hover` | 120ms | linear | translateY + 陰影縮短 |
| 情緒環切換 | 點擊／Enter | 200ms | — | 隨機色 + 短暫 `saturate` 閃動 |
| 計數器 | 載入 | — | — | 依時間戳生成 6 位數字 |

**所有動畫都必須包在 `@media(prefers-reduced-motion:reduce){*{animation:none;transition:none}}` 內降級**，游標拖尾則在 JS 端以 `matchMedia` 判斷後完全停用。

**跑馬燈警語**：Y2K 雖常見「welcome 捲動字」，但本館跑馬燈比例已過高。除非該站真的需要，優先用游標星塵、情緒環、計數器承擔動效重點，不要反射式加 marquee。

## 七、插畫與圖像風格

- 全部原創 SVG／CSS：星形（8 角尖 star burst）、泡泡（白色半透明圓 + 墨邊）、波浪線、conic 彩虹。
- 壓軸卡底圖用飽和單色底 + 幾何（星、圓、波、方塊旋轉）疊白色半透明形狀，模擬千禧海報。
- 高光一律加：白色 radial-gradient 小圓（`.glo`）放在角落當反光。

## 八、Logo 與 Favicon 設計指南

- **Logo**：鉻金屬展示字 + 一顆桃紅描邊星星（中心嵌酸綠小圓）。字填 chrome 直向漸層 + 墨色 stroke。副標用 Orbitron 排「2000 · 2K」。
- **Favicon**：圓角深靛墨方底（`rx=9`）+ 青色八角星 + 中心桃紅小圓，寫成 inline SVG data URI。

## 九、Do & Don't

**Do**：鉻金屬立體字、玻璃藥丸、桌面視窗框、星形火花、深色描邊壓住螢光、Orbitron 全大寫標籤、真實可信的虛構文案（人名、票價、地址、電話、時間）。

**Don't**：
- ❌ 紫藍直向漸層 hero（被禁的 AI tell）
- ❌ 置中大標＋副標＋兩顆按鈕＋三張等寬圓角卡的模板
- ❌ emoji 當 icon（星星、火花一律自繪 SVG）
- ❌ 無描邊的柔霧漸層卡（會變回 AI 感）
- ❌ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）
- ❌ 反射式套用跑馬燈

## 十、頁面骨架範例

```html
<!-- 玻璃藥丸按鈕 -->
<a class="star-btn pink" href="tickets.html">搶票 GET TICKETS</a>

<!-- 桌面視窗框（招牌容器） -->
<div class="win">
  <div class="bar"><span class="t">readme.txt</span>
    <span class="dots"><i></i><i></i><i></i></span></div>
  <div class="body"><p>把內容裝進作業系統視窗裡。</p></div>
</div>

<!-- 鉻金屬巨標 -->
<h1 class="chrome-title">STARDUST<br>2K</h1>

<!-- 情緒環 -->
<div class="mood" role="button" tabindex="0"><div class="mood-i"></div></div>
```

關鍵 CSS：

```css
.chrome-title{
  font-family:'Chango',sans-serif;
  background:linear-gradient(180deg,#fff 0%,#dfe6ff 38%,#7f8dc0 50%,#4a5892 52%,#b9e7ea 66%,#37E0E6 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  -webkit-text-stroke:2.5px #171433;
  filter:drop-shadow(4px 5px 0 rgba(23,20,51,.85));
}
.star-btn{border-radius:40px;border:2.5px solid #171433;
  background:linear-gradient(180deg,#fff,#37E0E6 46%,#17c6cd 54%,#b6f6f9);
  box-shadow:0 4px 0 #171433, inset 0 2px 3px rgba(255,255,255,.9);}
```

驗收標準：一個從未看過 STARDUST 2K 的 AI，只讀本 SKILL.md 就能做出風格一致（鉻金屬字、玻璃藥丸、視窗框、星塵拖尾）、但產業／內容完全不同的新網站。
