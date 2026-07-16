---
name: dada-collage-zine
description: A loud photocopied punk-zine design language — ransom-note cut letters, deliberately mis-registered two-colour overprint, halftone grain, torn-paper blocks and hard offset shadows on newsprint.
---

# 達達拼貼 Dada Collage Zine — 風格規格書

一套「像一本影印龐克 zine」的設計語言。核心手法是拼貼與破壞：勒索信剪字標題、雙色套印刻意對不準、半調網點顆粒、撕紙色塊、歪斜圖章。刻意反行銷、反精緻。適合滑板／街頭服飾／獨立唱片／地下活動／龐克餐酒等要「粗、吵、真」的品牌。

## 設計哲學

- **不完美即風格**：套色錯位、旋轉歪斜、噪點顆粒都是刻意的。校準得太準就失去了 zine 感。
- **拼貼優先**：畫面由撕紙色塊、半調圓、剪字、圖章堆疊，允許重疊、出血、壓字。用 `mix-blend-mode:multiply` 模擬油墨疊印。
- **反行銷語氣**：文案自嘲、直白、嘴砲。不吹「生活風格」，只講會磨破、會摔、會壞的真東西。
- **去AI化**：無漸層 hero、無圓角卡、無模糊陰影、無 emoji icon。陰影一律硬式位移（`Xpx Ypx 0`）。

## 色彩系統

在報紙灰底上壓橘、紫、黑三色油墨（互補撞色，刻意不用 riso 經典粉藍黃以避免撞款）：

| 用途 | Hex | 比例 |
|---|---|---|
| 報紙灰底 paper | `#E7E1D0` | 55%（主底） |
| 微深底 paper2 | `#DED7C2` | 10%（區塊分層） |
| 影印墨黑 ink | `#151113` | 20%（文字、粗框、深色 nav） |
| 安全橘 orange | `#F4531B` | 9%（強調、標籤、CTA） |
| 電光紫 purple | `#7A22CC` | 5%（第二強調、套印錯位層） |
| 混凝土灰 grey | `#8C877B` | 1%（次要說明） |

原則：橘與紫互補、都很吵，用在標籤/CTA/剪字塊；黑扛結構與文字；灰只做 mono 註記。禁止把橘紫調成漸層。

## 字體系統

刻意混排（ransom note 精神）：

- **巨體標題**：`Anton`（Google Fonts）。hero 剪字、區塊標題、選單、按鈕。`letter-spacing:1px`。
- **內文**：`Archivo`（400/600/800）。
- **數據/標籤/價格 mono**：`Space Mono`（400/700）。價格、單號、暗號、footer。
- **反差襯線**：`DM Serif Display`（italic）。夾在剪字裡製造字體衝突，或做斜體引言。
- 字級：hero 剪字 `clamp(44–128px)`／區塊標題 `clamp(28–58px)`／內文 17–18px／mono 11–13px。

## 版面與網格

- **滿版拼貼開場（fullbleed-art）**：`.cover` 至少 `100vh`；絕對定位的撕紙色塊 `.torn`（大色塊 `rotate(±3–8deg)`）＋半調圓 `.halftone`（`radial-gradient` 圓點＋`mix-blend-mode:multiply`）鋪底；剪字標題疊在最上層。
- **半調網點顆粒**：全站固定覆蓋層 `body::after`，`radial-gradient(rgba(...) .6px,transparent .7px); background-size:3px 3px; mix-blend-mode:multiply; opacity:.5`，模擬影印顆粒。
- 粗框：`2.5–4px` 實線墨框，**無圓角**。陰影一律硬位移（`3–9px … 0`），可用橘或紫做彩色投影。
- 元素允許 `rotate(±1–8deg)` 讓畫面像手貼上去的。
- 留白規則：主欄 `padding:88px 6vw`（頂部留給固定 bar）；區塊間 4px 粗線分隔。

## 元件配方

- **nav（hamburger-full）**：固定 `.bar`（logo＋購物袋鈕＋漢堡鈕，皆 `rotate` 微歪）。漢堡開啟 `.menu` 全螢幕墨黑覆蓋層，選單項 `Anton` `clamp(40–86px)` 巨體、各項不同顏色、hover `skewX(-8deg)` 位移。ESC 或 ✕ 關閉，開啟時鎖 body 捲動。
- **剪字標題（ransom note）**：每字一個 `.l` 塊，隨機 `--r` 旋轉、隨機底色（`.b-ink/.b-org/.b-pur/.b-pap`）、硬位移陰影；個別字可切 `DM Serif Display`（`.b-serif`）製造字體衝突。
- **套印縮圖（riso overprint）**：`.riso` 容器內兩層 `.layer`（`.l-a` 純色塊、`.l-b` 內含 SVG 圖形），皆 `mix-blend-mode:multiply`；hover 時兩層反向位移（`.l-a` 左下、`.l-b` 右上）製造「套印跑位」。所有商品/肖像/板面皆程序生成 SVG。
- **按鈕**：`.btn/.add/.checkout` 粗框、硬位移陰影，hover `translate(3px,3px)` 吃掉陰影、active 再吃一層（觸感）。CTA 用 `Anton` 大字。
- **購物袋抽屜**：`.drawer` 從右 `translateX(100%)` 滑入＋半透明 `.backdrop`；行項 `.line` 有縮圖章、品名、`.qty` 加減、刪除；`.foot2` 放折扣碼、`.totals`（小計/折扣/運費/合計）、結帳鈕。
- **結帳與收據**：彈窗 `.modal` 內先表單（即時 `.err` 驗證），送出後換成 `.receipt`（`Space Mono`、虛線分隔、`repeating-linear-gradient` 撕邊、歪斜「PAID」圖章、單號 `SCF-YYMMDD-XXX`）。
- **footer**：墨黑底反白、`Anton` 橘色小標＋mono 資訊；末行放版權與 `BUILT BY …`。

## 動效規則

| 動作 | 觸發 | duration / easing |
|---|---|---|
| 套印縮圖跑位 | hover（`.l-a/.l-b` 反向位移） | `transform .18s` |
| 卡片微歪 | hover（`rotate(-1~-1.5deg)`） | `transform .14s` |
| 購物袋抽屜滑入 | 開袋（`translateX`） | `.28s cubic-bezier(.3,.7,.2,1)` |
| 按鈕按壓 | hover/active（吃陰影） | `transform/box-shadow .1s` |
| 選單巨字 | hover（`skewX`＋位移） | `.12s` |
| 購物袋數字 | 加入時（`scale` 回彈） | `160ms` JS timeout |

**reduced-motion**：全站 `transition:none; animation:none`；hover 位移全部取消（套印層與卡片不再跑位），純靠色彩與框線辨識。功能（篩選/加袋/結帳）不依賴動畫，皆可正常完成。

## 插畫與圖像風格

`riso-overprint 雙色疊印`：所有圖像（滑板板面、輪、橋、衣、貼紙、人物肖像）皆為原創 SVG，以「純色塊底層＋墨線圖形層」兩層 multiply 疊出套印感，hover 錯位。半調圓與噪點以 CSS/SVG 生成。**零外部圖片**。板面預覽會依配置器選項即時重繪（換底色、雙色錯位圖層、輪距標記）。

## Logo 與 Favicon

- **Logo**：勒索信剪字「SCUFF」——每字獨立方塊、不同底色、各自旋轉、硬位移陰影，配一塊撕紙滑板剪影＋mono 副標。
- **Favicon**：inline SVG data URI，報紙灰底上一塊歪斜滑板（橘紫雙輪），寫在 `<head>`。

## Do & Don't

**Do**：拼貼、重疊、出血；套色故意錯位；混排四種字體製造衝突；硬位移彩色陰影；文案自嘲直白（具體地址、電話、價格、人名）；功能做完整可玩（篩選→加袋→改量→折扣→結帳→收據）。

**Don't**：紫藍漸層 hero（橘紫也不准調成漸層）；置中大標＋兩按鈕＋三圓角卡模板；emoji icon；模糊陰影；把套印校準得太乾淨；Lorem ipsum 與 AI 腔；用計數器/描邊當 signature 主打；真正的「EST. 19xx」年份徽章（本風格若用「EST.」須為反諷語句而非年份）。

## 頁面骨架範例

```html
<header class="bar">
  <img class="lg" src="assets/logo.svg" alt="SCUFF">
  <button class="cartbtn">■ 購物袋<span class="n">0</span></button>
  <button class="burger"><span></span><span></span><span></span></button>
</header>
<section class="cover">
  <div class="torn t1"></div><div class="halftone h1c"></div>
  <div class="ransom">
    <span class="l b-ink" style="--r:-4deg">S</span>
    <span class="l b-org" style="--r:3deg">K</span>
    <span class="l b-pap b-serif" style="--r:-2deg">8</span>
  </div>
  <a class="btn fill" href="shop.html">衝去逛店 →</a>
</section>
```

驗收：一個沒看過本 Demo 的 AI，只讀本檔即可做出風格一致的「影印龐克拼貼」網站——報紙灰底、橘紫黑撞色、剪字與套印錯位、可完整操作的購物到結帳流程，而不落入任何去AI化禁令。
