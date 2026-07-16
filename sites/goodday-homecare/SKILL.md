---
name: wayfinding-signage-style
description: Build entire websites in the visual language of hospital and metro wayfinding systems — color-coded service lines, ISO-style flat pictograms, station badges, directional arrows, matte-metal sign panels, and a bottom platform-indicator dock.
---

# 導視系統風格（Wayfinding Signage Style）

以「日安到宅居家護理所」示範站為例，說明如何把醫院／捷運導視語言整站化：資訊像指標系統一樣被編碼、分線、標號、指向。適用於服務項目可被「路線化」的產業（醫療、物流、園區、展館、行政服務）。

## 一、設計哲學

導視系統的本質是**在焦慮中給出方向**。使用者（家屬、病患）帶著不確定感抵達，網站的責任不是渲染情緒，而是像捷運站一樣回答三個問題：我在哪裡、有哪些線、下一步往哪走。因此：

- 一切內容先「編碼」再呈現：服務＝路線（W/T/C），項目＝編號（W-1、T-2），地區＝站點。
- 語氣冷靜理性：短句、可驗證的數字（收費區間、時段、名額），溫度來自「把資訊講清楚」而非形容詞。
- 方向箭頭是第一等公民：每個 CTA 都是「往⋯⋯」的月台指標，不是行銷按鈕。
- 開場即地圖（map-first）：不用標語轟炸，第一屏直接給路網圖，讓使用者自己定位。

## 二、色彩系統

中間調底色＋高飽和路線色＋深板岩看板，三層結構：

| 角色 | 色票 | 用途 |
|---|---|---|
| 環境底 | `#B9C4C9` → `#ADBAC0` 縱向漸層 | 頁面背景（淺灰藍中間調，禁米白、禁深黑） |
| 看板面 | `#EDF1F2`／`#DDE4E7` | 霧面金屬看板、次級色塊 |
| 板岩深 | `#22343B` | 頁首、dock、標題牌、表頭（深但非純黑） |
| W 傷口線 | `#BF4522` | 暖紅，路線／編號／區段色帶 |
| T 管路線 | `#1F6FA5` | 號誌藍 |
| C 慢病線 | `#2E7D4F` | 標示綠 |
| 警示黃 | `#F0B429` | 箭頭、當前狀態、免責帶、focus ring |
| 錯誤 | `#A6321F` | 表單驗證訊息 |

規則：路線色只用於「屬於該線」的元素，不作裝飾；黃色永遠表示「方向／注意／現在位置」；文字主色 `#182A30`，次級 `#42565E`，對比度維持 AA 以上。

## 三、字體系統

- **中文**：Noto Sans TC。900 用於站名級標題、700 用於標示與導覽、400/500 內文。字距 `letter-spacing:.06–.1em` 模擬指標字。
- **西文／數字**：Barlow Condensed（DIN 感）。所有編號（W-1）、代碼（GD-W1-0722-XXXX）、價格（NT$1,200）、英文副標（`letter-spacing:.2–.3em` 全大寫）一律用它，與中文形成「站名／站碼」的雙層結構。
- 禁用襯線體與手寫體；英文副標永遠是輔助資訊，字級不超過中文的 60%。

## 四、版面與網格

- 主容器 `max-width:1120px`（功能頁可縮至 980px），左右 padding 20px。
- 密度中等：區段間距 30–36px，看板內 padding 16–22px，資訊列以 2px `--panel-2` 分隔線切分（像時刻表）。
- 版面以「看板（plate）」為單位組裝：每個區塊都是一塊有圓角（14px）與陰影的標示牌，牌上再分「色帶頭部＋內容體」。
- 拒絕置中三卡片：服務線用**全寬橫幅看板**堆疊（色帶＋內容＋前往箭頭三欄）；團隊用雙欄站名牌。
- body 需保留 `padding-bottom:104px` 給底部 dock。

## 五、元件配方

- **色帶（band）**：區塊頭部或側邊的路線色實色帶；三線並列時用 `linear-gradient(90deg, W 0 33.4%, T 33.4% 66.7%, C 66.7% 100%)` 硬切分段（無過渡），如 dock 頂緣、章節標題側柱。
- **反光膜高光**：`::after` 疊 `linear-gradient(115deg, transparent 42%, rgba(255,255,255,.2~.24) 50%, transparent 58%)`，`pointer-events:none`，一律靜態不動畫。
- **霧面金屬看板（plate）**：`linear-gradient(165deg,#F2F5F6,#EDF1F2 42%,#E3E9EB)` ＋ `inset 0 1px 0 rgba(255,255,255,.7)` 頂光 ＋ 柔和外陰影（禁按壓硬陰影）。
- **pictogram**：見第七章。全部無描邊色塊 SVG。
- **站牌圓標（codechip）**：正圓、路線色底、白字 Barlow Condensed 700，內容為「線字母＋數字」（W1、T-2）；轉乘站用白色膠囊底並列兩顆圓標。
- **箭頭**：統一的塊狀箭頭 path（`M2 6h9V2l6 7-6 7v-4H2z` 比例），黃色或深板岩色；「往」字＋目的地＋箭頭構成所有 CTA。
- **bottom-dock**：`position:fixed; bottom:0` 深板岩列，頂緣 5px 三線色帶；每項＝圖標＋中文標＋英文小標，首末項各帶反向／正向箭頭；當前頁 `aria-current="page"` 配黃色 inset 底線與淡黃底。

## 六、動效規則

- 動效只用於「狀態回饋」：hover 換底色、選取加黃色 ring、進度條寬度 `.3s ease`。不做進場動畫、視差、描線、計數器。
- 所有 transition ≤ 300ms、單屬性；高光膜與色帶永遠靜止（反光是材質，不是動畫）。
- 必附降級：`@media (prefers-reduced-motion:reduce){ *,*::before,*::after{ transition:none!important; animation:none!important; scroll-behavior:auto!important } }`。

## 七、插畫風格

- **flat-shape pictogram**：ISO 7001 精神——只用實心色塊（`fill`）構圖，`stroke` 僅允許出現在路網圖的「路線」本身；小人與器材由圓形、膠囊、圓角矩形、簡單 path 組合。
- 每個 pictogram 限 2–4 個色塊：主形用路線色或板岩色，輔形用同系淡色（如 `#BBD3E4`、`#8FBF9F`、`#EDD9C8`）。
- 禁：細線線描、水彩、半調網點、guilloché 紋、條碼美學、漸層填色、寫實陰影。
- 語意優先：繃帶＝斜向膠囊＋淺色帶；管路＝人形＋粗圓角路徑＋集尿袋方塊；慢病＝足形＋圓點；預約＝日曆格塊。看不懂就重畫，不加文字救場。

## 八、Logo 與 Favicon 指南

- **Logo**：站牌構圖——深板岩圓角橫牌，左側白色方塊內放「屋形＋進宅箭頭＋三線圓點」pictogram，中文全名（Noto Sans TC 900）＋英文縮排副標（Barlow Condensed、寬字距），右緣三段路線色短帶收尾。輸出為獨立 `assets/logo.svg`，頁首以等價 inline SVG 重繪小尺寸版。
- **Favicon**：inline SVG data URI（URL-encode `#`→`%23`）。取 Logo 最小語意單元：深板岩圓角方塊＋白色塊狀箭頭＋底部三色圓點。16px 下仍需可辨識「箭頭＋三線」。
- 禁徽章式 Logo（EST. 年份、月桂枝）、禁漸層字。

## 九、Do & Don't

**Do**
- 服務先編碼再排版：字母線＋數字項＋顏色，三者永遠一致。
- 收費、時段、名額給區間與數字，讓可信度來自資訊本身。
- 每頁固定 header／notice／footer／dock 四件套；免責聲明用警示黃帶＋三角 pictogram。
- 額滿、休診等「不可用狀態」要灰化並保留文字說明，像月台電子看板。

**Don't**
- 米白紙感或純黑底；紫藍漸層；置中三卡片英雄區。
- 跑馬燈、數字滾動計數器、揭示進場動畫、stroke-dashoffset 描線秀。
- 細線插畫、水彩、半調網點、guilloché、條碼裝飾、按壓硬陰影。
- 把路線色當裝飾色亂用；箭頭指向與實際動線不符。

## 十、頁面骨架範例

```html
<body><!-- padding-bottom:104px 預留 dock -->
  <a class="skip" href="#main">跳到主要內容</a>
  <header class="site-head"><!-- 板岩牌：logo＋立案字號＋專線；底緣三線色帶 --></header>
  <main id="main" class="wrap">
    <section class="hero"><!-- map-first：標題牌＋路網圖 SVG plate＋站點資訊 aside(aria-live) --></section>
    <section class="sec"><!-- 三線全寬橫幅看板（色帶｜內容｜前往箭頭） --></section>
    <section class="sec"><!-- 流程站序：圓形站點 1-4 串在色帶上 --></section>
    <section class="sec"><!-- 資訊看板：時段表＋收費速覽＋黃色大 CTA --></section>
  </main>
  <div class="notice"><!-- 警示黃免責帶：虛構示意，非醫療建議 --></div>
  <footer><!-- 板岩底三欄：機構資訊／快速前往／合作據點 --></footer>
  <nav class="dock-nav" aria-label="主導覽（月台指標列）">
    <a class="dock-item" aria-current="page">路網總覽</a>
    <a class="dock-item">服務線與收費</a>
    <a class="dock-item">預約到宅訪視</a>
  </nav>
</body>
```
