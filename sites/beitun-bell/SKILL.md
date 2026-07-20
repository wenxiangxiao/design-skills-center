---
name: auction-board
description: High-contrast trading-floor aesthetic built around a descending auction clock — lamp-ring dials, condensed signage type, tabular readouts and a black hall lit only by red, amber and green.
---

# 拍賣電光牌風 Auction-Board

## 一、設計哲學

這套語言來自**交易現場**，不是來自品牌手冊。它的三個前提：

1. **畫面上每一個數字都會變，而且變動有代價。**排版要為「一眼讀到、立刻決定」服務，不為美感留白。
   標題可以小，價格必須大到坐在第三排也看得見。
2. **顏色是狀態，不是裝飾。**紅＝已經過去／成交；琥珀＝正在發生／該注意；綠＝可以動作／你的東西；
   白＝事實。沒有第五種顏色，也沒有「品牌色」這回事。
3. **暗場不是為了高級感，是因為現場真的暗。**黑底讓發光的部分成為唯一的訊息載體。
   任何在黑底上「不發光」的元素，就該是灰的。

它適用的產業遠不只拍賣：期貨與現貨交易、開獎與抽籤、票務即時席位、賽事計時、
排隊叫號、機房監控、任何「多人同時看同一個會變的數字」的場合。**不適用**於需要溫柔、需要慢、
需要讓人流連的產業（療癒、婚紗、繪本、香氛）——這套語言會讓那些內容顯得咄咄逼人。

## 二、色彩系統

| 角色 | Hex | 用途 | 佔比 |
|---|---|---|---|
| 場內夜黑 | `#0B0D0C` | 全站底色 | 46% |
| 面板黑 | `#141917` | 卡片、表格、面板底 | 18% |
| 次面板 | `#1C2320` | 表單控制項、次階層區塊 | 6% |
| 分格線 | `#2E3833` | 1px／2px 實線分格、未點亮燈位 | 8% |
| **鐘紅** | `#E01B22` | 已掠過的燈位、主按鈕、成交狀態、警示 | 8% |
| **電光黃** | `#FFC61A` | 目前燈位、連結、可注意的狀態、批號 | 6% |
| **花市綠** | `#00A86B` | 章節眉標、你的東西、可動作、莖與梗 | 4% |
| 冷白 | `#F2F5F1` | 主文字、指針、大數字 | 4% |
| 弱化字 | `#8B9A93` / `#5C6863` | 次要說明、單位、註記 | — |

規則：

- **三個亮色不得同時出現在同一個元件上。**一個元件只能有一種狀態色。
- 紅永遠代表「已經發生、不能改了」；不要拿紅來做「可按的按鈕」以外的正向 CTA。
  （主按鈕用紅是例外，且必須配 `box-shadow: 0 4px 0 #7C0E12` 的實體壓桿感，讓它看起來是硬體而不是網頁按鈕。）
- 禁止漸層當背景。唯一允許的漸層是暗場燈罩：`radial-gradient(circle at 50% 40%, #161D1A, #0C100E 72%)`。
- 禁止任何模糊陰影。陰影一律 0 模糊、純色、偏移 3–4px（硬體按鍵感）。

## 三、字體系統

Google Fonts 三支，各司其職，不可互換：

| 用途 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 招牌／大數字／按鈕 | `Big Shoulders Display` | 800 | 高瘦條體，字寬窄、可塞進窄欄；`letter-spacing: .02–.10em` |
| 讀數／代號／表頭／標籤 | `Share Tech Mono` | 400 | 等寬，`font-variant-numeric: tabular-nums`；`letter-spacing: .08–.24em` |
| 中文正文與標題 | `Noto Sans TC` | 400 / 700 / 900 | 標題一律 900，正文 400 |

字級 scale（桌機）：

```
巨價   64px / .9    Big Shoulders 800     ← 只有目前價格用
頁標   38px / 1.05  Noto Sans TC 900
區標   24px / 1.15  Noto Sans TC 900
卡標   16.5px       Noto Sans TC 900
正文   14px / 1.8   Noto Sans TC 400      色 #C6D0CB
表格   13.5px / 1.6
讀數   10.5–12px    Share Tech Mono       色 #8B9A93，字距 .12em
註記   9.5px        Share Tech Mono       色 #5C6863
```

硬規則：**所有會變動的數字一律等寬且 tabular-nums**，避免跳動時版面抖動。
中文不使用細字重（300 以下），暗場下會糊掉。

## 四、版面與網格

- **無圓角。**所有 `border-radius: 0`。
- **1px 分格線構成骨架**，重要分界用 2px。區塊之間不靠留白分隔，靠線。
- 主容器 `max-width: 1180px`，左側固定 96px 導覽軌道（`body { padding-left: 96px }`）。
- 核心操作區採**不等寬三欄**：`minmax(320px,1fr) 268px 296px`，欄與欄之間只有 1px 線、無 gap。
  左欄是「正在發生的事」，中欄是「這是什麼」，右欄是「別人在做什麼」。
- 密度極高：卡片內距 12–16px，列高 5–7px padding。**留白只留給大數字周圍**。
- 全站底層加一層極淡掃描線讓黑底不死：
  `repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0 1px, transparent 1px 4px)`。
- 斷點：`≤1060px` 三欄轉兩欄（第三欄跨滿）、`≤900px` 導覽轉底部欄、`≤700px` 全單欄、大數字降為 50px。

## 五、元件配方

### 5.1 台車軌道導覽 trolley-lane

左側 96px 固定軌道；虛線軌道 `repeating-linear-gradient(180deg, var(--line) 0 9px, transparent 9px 15px)`；
四台側視台車（自繪 SVG：車斗＋兩輪＋載貨）停在軌道上。

```css
.cart{transform:translateX(-10px);transition:transform .28s cubic-bezier(.2,.9,.3,1)}
.cart:hover{transform:translateX(-2px)}
.cart[aria-current="page"]{transform:translateX(6px);box-shadow:-4px 0 0 0 var(--red);border-color:var(--amber)}
```

語意是**佇列順序與推進**：現用頁的台車被推到軌道前端。行動版攤平為底部四格，頁尾另備完整連結。

### 5.2 燈環鐘 lamp-ring dial

100 顆燈位均分 360°（每格 3.6°），第 i 顆在 `(50+cos(−90°+3.6i°)·41, 50+sin(...)·41)`：

```
已掠過  r=1.7  fill #E01B22  opacity .55
目前    r=4.2  fill #FFC61A  opacity 1
未到    r=1.5  fill #2E3833
指針    line 中心→燈位，#F2F5F1，stroke-width 1.6，rotate(3.6·i, 50, 50)
```

**不要用 CSS transition 讓指針平滑轉動**——它必須是逐格跳的，那是機構的真實行為，也讓使用者能數格。

### 5.3 硬體按鈕

```css
#bid{background:var(--red);color:#fff;border:0;padding:14px 44px;
     font:800 26px/1 'Big Shoulders Display';letter-spacing:.08em;box-shadow:0 4px 0 #7C0E12}
#bid:active{transform:translateY(3px);box-shadow:0 1px 0 #7C0E12}
#bid:disabled{background:#242C29;color:#5C6863;box-shadow:0 4px 0 #171D1B}
```

次要按鈕一律 ghost：透明底、`border:2px solid var(--line)`、hover 才轉琥珀。

### 5.4 席位列 seat row

`grid-template-columns: 9px 26px 1fr auto`：狀態燈（9px 圓）／代號（等寬）／名稱＋小字說明／右側讀數。
狀態靠燈色切換（灰＝觀望、琥珀＝手已在按鈕上、紅＝得標），退場者整列 `opacity:.34`。

### 5.5 表格

表頭 `Share Tech Mono` 10.5px、字距 .12em、底色 `#111614`；每列 1px 底線；
數字欄靠右且等寬；「你的」列整列底色 `#0E2A1E`（暗綠）。

### 5.6 讀數列 floorbar

`position: sticky; top: 0`，等寬 11.5px、字距 .06em，項目之間 18px gap，
格式一律「**標籤（灰） 值（白）**」，開頭放一顆紅點 `● 開拍中`。

### 5.7 表單控制項

`background:#1C2320; border:1px solid var(--line); color:var(--white); padding:5px 8px`，等寬字。
不使用自訂下拉樣式，保留原生 `<select>` 行為。

### 5.8 footer

三欄（1.4fr / 1fr / 1fr），欄標為綠色等寬 10.5px 字距 .16em，內容 12.5px 灰。
最下方一條 1px 線與 10.5px 免責註記。

## 六、動效規則

這套風格的動效原則是**只有機構會動，介面不動**。

| 對象 | 觸發 | 做法 | 時長／曲線 |
|---|---|---|---|
| 燈環與指針 | 每個 tick | 直接改屬性，**逐格跳，無補間** | 0（每 150ms 一格） |
| 台車 | hover / focus / 現用頁 | `translateX` | 280ms `cubic-bezier(.2,.9,.3,1)` |
| 按鈕下壓 | `:active` | `translateY(3px)` ＋ 陰影收為 1px | 即時 |
| 席位燈 | 狀態改變 | 換色，無過渡 | 0 |
| 提示訊息 | 觸發後 2.6s 自動消失 | `opacity 0→1` | 200ms linear |
| 成交紀錄 | 新列插入 | **不做進場動畫**，直接出現 | — |

禁止：任何 fade-in-on-scroll 揭示、數字滾動計數（價格是真的在降，不是動畫）、跑馬燈、
視差、彈跳緩動、旋轉載入圈。`prefers-reduced-motion` 下把所有 transition/animation 降為 0.001ms。

## 七、插畫與圖像風格：花序排列構圖

**不描外形，寫排列規則。**題材若有內在的生長／組裝／排列邏輯，就把那個邏輯寫成程式，讓圖從規則長出來。
本風格的範例是花序型態學：

```js
// 頭狀花序：黃金角 137.508°，半徑 ∝ √i
for(var i=0;i<n;i++){
  var t=i*137.507764*Math.PI/180, r=R*Math.sqrt(i/n);
  dot(cx+r*Math.cos(t), cy+r*Math.sin(t), 1.5-0.7*r/R);
}
// 聚繖花序：中央先開，兩側各自遞迴
function br(x,y,a,L,dep){ if(!dep) return leaf(x,y);
  var x2=x+cos(a)*L, y2=y-sin(a)*L; line(x,y,x2,y2); leaf(x2,y2);
  br(x2,y2,a-30-rnd()*10,L*.62,dep-1); br(x2,y2,a+30+rnd()*10,L*.62,dep-1); }
```

規則：

1. **一個題材配一組原語。**先決定 5–8 種「排列型」（此處為八種花序），每一型對應一個真實存在的結構分類。
2. **顏色不承擔辨識。**整套圖只用場內三到四色，兩張圖的差別必須來自結構，不能來自色相。
3. **同一識別碼恆得同一張圖。**識別碼 → FNV-1a → mulberry32 → 所有隨機參數。
4. **縮圖尺度退化。**次級單元小於 ~5 單位時退化為單點——辨識訊息在排列不在細節，這也讓檔案不爆炸。
5. **靜態頁在建置時烘成 SVG**，無 JavaScript 也看得到；即時頁用同一支函式渲染。
6. 禁止：等寬單色細線幾何線描（thin-lineart）、任何外部圖檔、emoji。

## 八、Logo 與 Favicon

**Logo**：左側一枚燈環鐘標記（外環 3px 灰圈／紅色扇形代表已掠過區段／五顆琥珀燈位／白色指針指向右下／白色軸心），
右側上行中文 `Noto Sans TC 900`，下行英文 `Share Tech Mono` 綠色、字距 .24em。整體置於 240×64 黑底矩形內。

原則：標記必須是**一個會動的機構的靜止一格**，不是抽象幾何。指針不指向 12 點，指向工作中的角度。

**Favicon**：同一枚鐘簡化到 32×32，只留外環、紅扇形、琥珀指針、白軸心，寫成 inline SVG data URI 放在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E
%3Crect width='32' height='32' fill='%230B0D0C'/%3E
%3Ccircle cx='16' cy='16' r='11' fill='none' stroke='%232E3833' stroke-width='3'/%3E
%3Cpath d='M16 5 A11 11 0 0 1 25.5 21.5 L16 16 Z' fill='%23E01B22'/%3E
%3Cline x1='16' y1='16' x2='23.4' y2='24' stroke='%23FFC61A' stroke-width='2.8' stroke-linecap='round'/%3E
%3Ccircle cx='16' cy='16' r='2.8' fill='%23F2F5F1'/%3E%3C/svg%3E">
```

（實際使用時需移除換行。）

## 九、即時對抗賽局標準配方

本站的核心是一個**有時限、有對手、結果不可逆**的互動。要在別的產業重現它，照以下六節做：

**1. 把整場寫成純函數。**狀態只存三樣東西：`{seed, t0, userActions}`。
任何時刻的畫面都由 `f(seed, now − t0, userActions)` 算出來。好處是：使用者離開再回來，
你不必「暫停／續播」，直接把中間發生的事重算出來給他看——而且對手的行為完全可重現。

**2. 對手要有內在狀態，不是亂數。**每個代理至少要有：預算（會耗盡）、參與率（不是每一輪都出手）、
偏好（對某些標的加價）、心理價（由標的屬性算出）、反應延遲（人手不是零延遲）。
代理的決策時刻應**在該輪開始時一次算完**，之後只是等時間走到——這樣才可重播。

**3. 給使用者一個可觀察但不完整的情報面。**此處是「每家上一批的成交價」與「手已經在按鈕上」的燈號。
完全資訊會讓遊戲變成算術，零資訊會讓它變成賭博。

**4. 讓總量有限、預算會耗盡。**這是唯一能讓「後期」與「前期」不一樣的機制。
本站八家的預算合計約等於全場貨值的 1.15 倍，於是後段中位成交價自然比前段低約 8%——
沒有任何一行程式寫「後面要變便宜」。

**5. 先給練習輪。**前一到兩輪不計分、不扣資源，讓使用者按壞它。

**6. 事後給一張對帳單，不要給評語。**輸出可驗證的數字（溢價率、空手率、支出），
再附一句從數字長出來的話。不要用「做得很好！」這種回饋——交易現場不安慰人。

**時限的無障礙處理**：WCAG 允許「即時事件」與「時限為活動本質」的例外，此處成立。
但必須做到兩件事：頁面上明說時限無法關閉並解釋原因，以及提供內容一樣完整的靜態替代頁。

## 十、Do & Don't

**Do**

- 大數字、小標題。使用者要的是那個會變的值。
- 用線分格，不用留白分格。
- 顏色只表達狀態，一個元件一個狀態色。
- 所有動的東西都是機構的物理行為（跳格、下壓、推進）。
- 文案用現場口氣：「按下即成交，不得反悔」「拍賣鐘不等人」「今天空手，明天你的客人就去別家」。
- 給具體數字：手續費 3.5%、保證金 30,000、02:00 進貨、每格 0.15 秒。

**Don't**

- 不要圓角、不要模糊陰影、不要玻璃擬態。
- 不要紫藍漸層 hero、不要「大標＋副標＋兩顆按鈕＋三張卡片」。
- 不要 emoji 當 icon，icon 一律自繪 SVG。
- 不要跑馬燈／ticker——這個風格最容易反射性地掉進去，但捲動的橫幅會讓所有讀數同時貶值。
- 不要 Lorem ipsum、不要「在當今快節奏的世界」、不要「EST. 19xx」徽章。
- 不要讓指針平滑補間、不要讓數字做計數動畫。
- 不要用溫柔的文案來緩衝壞消息。空手就是空手。

## 十一、頁面骨架範例

```html
<body>
  <a class="skip" href="#main">跳到主要內容</a>

  <nav class="rail" aria-label="主導覽（台車軌道）">
    <span class="dock">拍賣台</span>
    <span class="track" aria-hidden="true"></span>
    <div class="carts">
      <a class="cart" href="index.html" aria-current="page">
        <svg width="30" height="20" viewBox="0 0 30 20" aria-hidden="true">…</svg>
        <span class="lb">拍賣場</span><span class="en">FLOOR</span>
      </a>
      …
    </div>
    <span class="tail">TRACK&nbsp;01</span>
  </nav>

  <div class="floorbar"><div class="in">
    <span class="live">● 開拍中</span>
    <span>批號 <b class="num" id="lotno">6 / 24</b></span>
    <span>可用額度 <b class="num" id="remain">$9,000</b></span>
  </div></div>

  <div class="brandbar"><img src="assets/logo.svg" alt="…" width="240" height="64"><p>地址　營業時間</p></div>

  <main id="main">
    <div class="hall">
      <div class="clockbox">
        <svg class="clocksvg" viewBox="0 0 100 100" role="img" aria-label="降價拍賣鐘">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#2E3833"/>
          <g id="bulbs"></g>
          <line id="hand" x1="50" y1="50" x2="50" y2="14" stroke="#F2F5F1" stroke-width="1.6"/>
          <circle cx="50" cy="50" r="2.6" fill="#F2F5F1"/>
        </svg>
        <p class="phase p-red">開拍中 RUNNING</p>
        <p class="bigprice">$490</p>
        <p class="unit">元 / 把（每把 10 支）</p>
        <p aria-live="polite" class="sr"></p>
      </div>
      <div>…標的資料＋程序生成插圖…</div>
      <div>…對手席位…</div>
    </div>

    <div class="bidbar">
      <button id="bid" type="button">按　鐘</button>
      <p class="bidhint">按下即成交，<b>不得反悔</b>。</p>
    </div>

    <div class="wrap">
      <section class="two">
        <div><p class="eyebrow">成交紀錄 ／ SALES LOG</p><table>…</table></div>
        <div><p class="eyebrow">對帳單 ／ SETTLEMENT</p><div class="settle">…</div></div>
      </section>
    </div>

    <noscript><p>…說明機構無法運作，並導向完整的靜態頁…</p></noscript>
  </main>

  <footer>…三欄＋免責註記…</footer>
</body>
```

CSS 變數起手式：

```css
:root{
  --ink:#0B0D0C; --panel:#141917; --panel2:#1C2320; --line:#2E3833;
  --red:#E01B22; --amber:#FFC61A; --green:#00A86B; --white:#F2F5F1; --dim:#8B9A93;
  --mono:'Share Tech Mono',ui-monospace,monospace;
  --sign:'Big Shoulders Display','Noto Sans TC',sans-serif;
  --han:'Noto Sans TC',sans-serif;
}
```
