---
name: index-card-catalogue
description: A quiet archival design language built from library index cards — kraft manila stock, typewriter mono, rubber-stamp red, ruled lines, drawer pulls and flipping catalogue cards.
---

# 檔案卡片風 Index-card Catalogue — 風格規格書

一套從圖書館卡片目錄長出來的設計語言。核心物件是一張牛皮索引卡：有紅色左邊界、淡藍橫格線、打字機字、橡皮章。介面用「抽屜／卡片／橡皮章」三種隱喻承載所有內容，安靜、精確、帶檔案室的人情味。適合圖書館、檔案館、地方文獻、選品目錄、老派專業服務。

## 設計哲學

- **介面即目錄**：不做行銷式首頁。首頁就是分類抽屜牆，內容以「一張卡＝一筆資料」呈現。資訊密度高，但每張卡欄位固定、可掃讀。
- **雙套並行的敘事**：機器記帳（條碼、編號）與手工記人情（橡皮章、手抄）並存。卡片正面是規格，背面是歷史。
- **克制的動作**：動效只服務「翻找」這件事——抽屜拉出、卡片翻面、蓋章。不用計數器、不用進場淡入當主角。
- **去AI化**：無圓角卡片、無模糊陰影、無漸層 hero、無 emoji icon。陰影一律硬式位移（`Xpx Ypx 0`）。

## 色彩系統

以「牛皮上的雙色油墨」為基調（duotone）：

| 用途 | Hex | 比例 |
|---|---|---|
| 牛皮卡背景 kraft | `#E4D8BC` | 60%（主底） |
| 目錄櫃/深牛皮 kraft-2 | `#DCCEAC` | 12%（側欄、slab 底） |
| 打字機墨黑 ink | `#1A1712` | 18%（文字、邊框、深色 nav） |
| 橡皮章朱紅 red | `#9E3B2E` | 7%（強調、左邊界、章、hover） |
| 淡藍格線 rule | `#7C8B94` | 2%（卡片橫格、極淡結構線） |
| 卡面亮牛皮 card | `#EFE7D2` | 抽屜/卡片面 |

原則：紅只用於強調與蓋章，不成片；藍只當格線，永不當文字或按鈕。深色區塊用純墨黑，反白字用牛皮色。

## 字體系統

- **標題／內文襯線**：`Newsreader`（Google Fonts，opsz 6–72，400/600，含 italic）。作者名、引文用 italic。中文標題輔以 `Noto Serif TC` 600/900。
- **資料／標籤／編號 mono**：`Courier Prime`（400/700，含 italic）。所有索書號、欄位標籤、kicker、時間、章戳文字都用它，字距 `.5–1.5px`。
- 字級 scale：hero `clamp(38–74px)`／區塊標題 25–26px／卡片書名 21–22px／內文 16–18px／mono 標籤 11–13px。
- 行高：內文 1.62、標題 1.12。kicker `letter-spacing:3px; text-transform:uppercase`，紅色。

## 版面與網格

- **雙欄骨架**：左固定 `236px` 側欄目錄櫃（side-rail）＋右主欄。側欄頂部有「目錄鐵桿」條紋（`repeating-linear-gradient` 直條），選單項像抽屜標籤，hover 內縮。
- 背景鋪極淡橫格線：`repeating-linear-gradient(0deg,transparent 0 31px,rgba(124,139,148,.16) 31px 32px)`，`mix-blend-mode:multiply`，模擬卡片橫格與紙感。
- 分隔一律 `1.5–2.5px` 實線或 `dashed` 牛皮線，**無圓角**。卡片用 `4–6px 硬位移陰影 rgba(26,23,18,.28)`，可帶 `rotate(±1–1.3deg)` 讓卡片像隨手擺上桌。
- 留白規則：主欄 `padding:36–46px`；區塊標題用 `.section-head`（左標題右 mono 註記，底線分隔）。密度偏高，但欄位間距固定。

## 元件配方

- **nav（側欄）**：`.rail` 深牛皮底、右 2.5px 墨線；`nav a` 打字機字、底 1px 分隔、hover `padding-left` 內縮＋亮牛皮底；當前頁 `.here` 墨黑底反白＋左側 `▸`。側欄底部固定一枚「到期章」小字塊。手機 `≤900px` 隱藏側欄，改頂部 `.topbar`：logo＋方框 tab。
- **索引卡（catalogue card）**：`.face` 亮牛皮底、2px 墨框、硬位移陰影；`::before` 畫紅色左邊界（`left:14px`）；`::after` 疊淡藍橫格；左上 mono 索書號、書名 Newsreader 600、作者 italic、右下角 hatching 小插圖、底部 mono meta；右上角 `.status` 在架（綠框）／借出（紅框）方章。
- **卡片翻面**：`.rec .flip` 用 `transform-style:preserve-3d`＋`rotateY(180deg)`，`.face.back` 顯示 `CIRCULATION` 借閱章群（`.stamp2` 紅框、各自 `rotate(±3–7deg)`、`opacity:.85`）。點擊或 Enter/Space 翻。
- **抽屜（drawer）**：`.drawer` 亮牛皮，`.front` 可 `translateX(74%)` 拉出、露出後方 `.cards` 導引清單；`.pull` 是底部小把手。首頁抽屜牆 3 欄格點。
- **按鈕**：`.btn` 墨黑底反白、mono、`text-transform:uppercase`；hover 轉朱紅。`.btn.ghost` 透明描邊，hover 反黑。無圓角。
- **slab / 表格**：`.slab` 深牛皮框，標題 mono 紅字＋底線；表格 mono、`dotted` 分隔、右欄置右淡色。
- **footer**：頂 2.5px 墨線、深牛皮底、多欄 mono；`.colophon` 一行放版權與 `BUILT BY …`。

## 動效規則

| 動作 | 觸發 | duration / easing |
|---|---|---|
| 抽屜拉出 | click / Enter（`.open`） | `transform .34s cubic-bezier(.2,.8,.2,1)` |
| 導引卡顯露 | 隨抽屜開 | `opacity .3s .12s` |
| 索引卡翻面 | click（`.flipped`） | `transform .5s cubic-bezier(.3,.7,.2,1)` |
| 側欄項 hover | hover | `background/padding .18s` |
| 按鈕 hover | hover | `background/transform .15s` |

**reduced-motion**：全站 `transition:none`；抽屜改為 `outline` 標示開啟、不位移；翻面改為直接切換正/背面（`display`），不做 3D 旋轉。避免任何持續動畫。

## 插畫與圖像風格

`hatching 交叉排線雕版`：每個分類一枚原創 SVG 小插圖，用 `<pattern>` 畫 35° 斜線交叉排線鋪底（`stroke-width:.7; opacity:.5`）＋簡潔輪廓母題（書、腦、廟、貝殼與丘、扳手、卷宗、豎琴、書頁、雙人），置於卡片右下角。全部程序繪製，零外部圖片。橡皮章亦為純 CSS/SVG（圓框＋mono 字＋旋轉）。

## Logo 與 Favicon

- **Logo**：一張索引卡（紅左界、藍橫格、mono 索書號、蓋歪的圓形橡皮章）＋右側 `Newsreader` 中文字標與 `Courier Prime` 英文副標。
- **Favicon**：inline SVG data URI，簡化的索引卡（紅左界＋三條藍格線），寫在 `<head>`。

## Do & Don't

**Do**：把內容拆成「一張卡一筆」；紅只點綴；用硬位移陰影與 `rotate` 讓卡片有實體感；動效只做翻找；文案精確、帶館員人情（具體人名、年代、索書號、電話、地址）。

**Don't**：紫藍漸層 hero；置中大標＋兩按鈕＋三圓角卡模板；emoji icon；模糊陰影；把藍色用成主色；用計數器/描邊/淡入當 signature 主打；Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；「EST. 19xx」徽章。

## 頁面骨架範例

```html
<div class="wrap">
  <aside class="rail">
    <div class="rod"></div>
    <div class="brand"><object type="image/svg+xml" data="assets/logo.svg"></object></div>
    <nav>
      <a class="here" href="index.html"><span class="cn">案</span>目錄大廳</a>
      <a href="catalogue.html"><span class="cn">索</span>館藏檢索</a>
    </nav>
  </aside>
  <main class="main">
    <div class="face"><div class="row">
      <span class="cn mono">■ 673.2 8834　6 史地</span>
      <div class="ti">臺灣通史</div>
      <div class="au">連橫</div>
      <div class="vig"><!-- hatching SVG --></div>
      <div class="meta mono">1920　中文　借閱 57 次</div>
    </div><span class="status out">借出</span></div>
  </main>
</div>
```

驗收：一個沒看過本 Demo 的 AI，只讀本檔即可做出風格一致的「卡片式目錄」網站——牛皮雙色、打字機字、抽屜與翻卡、橡皮章，而不落入任何去AI化禁令。
