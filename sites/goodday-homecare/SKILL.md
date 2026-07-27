---
name: care-journal-console
description: A warm care-journal style for multi-role service operations — linen cloth ground, paper cards with stitched dashed borders, handwritten Caveat annotations, hand-drawn round-stroke icons, and soft category tags; built to carry heavy operational UI (matching scorecards, route tables, maps) without ever feeling clinical or corporate.
---

# 照護手帳風 Care-Journal Console

以「日安到宅居家護理所」示範站為例。這個風格解決一個具體的矛盾：**後台要處理很硬的東西（距離、工時、演算法計分、路線最佳化），但使用者是照顧者與被照顧者，介面不能長得像航管台或 ERP。** 適用於任何「有溫度的專業服務」需要多角色作業介面的產業：居家照護、托育、寵物到府、復健、社工、長照機構、居家清潔。

## 一、設計哲學

照護的本質是**把混亂的事情安排好，並且讓人安心**。所以介面同時要達成兩件平常會打架的事：

1. **資訊要硬。** 距離就寫幾公里、車程幾分鐘、配對幾分、為什麼扣分。不用「智慧」「最佳」這種空詞遮蓋演算法，把計分逐項攤開。
2. **表面要軟。** 布面底、紙卡、圓角、手寫註記、手繪圖示。沒有一條銳利的黑線，沒有純黑，沒有金屬與螢光。

第三個原則是**同一份資料，四種視角**：業主看負載與派工、居服員看今天要跑的路線、被照護者看誰會來、訪客看能不能預約。四端共用同一個資料模型與同一支演算法，只是把不同切面翻給不同的人看——這是本風格的骨架，不只是配色。

## 二、色彩系統

三層結構：布面環境底 → 紙質卡片 → 茶褐墨字。**禁止純白 `#FFF` 與純黑 `#000`。**

| 角色 | 色票 | 用途 |
|---|---|---|
| 亞麻布底 cloth | `#E3D9C6` | 頁面背景（疊兩層極淡織紋） |
| 布面深 cloth2／cloth3 | `#D6C9B0`／`#CDBE9F` | 分隔、dock、進度軌 |
| 紙卡 paper／paper2 | `#F8F3E9`／`#FCFAF4` | 卡片、表單、地圖底 |
| 線 line | `#DCCFB6` | 所有邊框（1.5px，不用深色描邊） |
| 茶褐墨 ink | `#3E342A` | 主文字（非黑） |
| 次級墨 ink2／ink3 | `#6E6152`／`#93856F` | 說明、註記 |
| 暖橘 warm | `#C9743C` | 唯一主作用色：現用態、主按鈕、路線 |
| 傷口線 rose | `#B5503F` | 類別標籤 |
| 管路線 blue | `#4A6E8A` | 類別標籤 |
| 慢病線 green | `#6E8B5B` | 類別標籤／安好狀態 |
| 螢光註記 gold | `#D9A94C` | 提示框左側標記 |
| 警示 alert | `#B23B2E` | 錯誤、超時窗、不符條件 |

比例守則：布底約 45%、紙卡約 35%、墨字約 12%、暖橘 ≤6%、其餘作用色點狀出現。**類別色只出現在標籤與路線上，不做大面積填色**——一旦把整塊區域刷成分類色，就會退回導視系統的語言。

## 三、字體系統

- **標題**：`Noto Serif TC` 900／700。卡片標題 900、區塊小標 700。字距 `.04em`。用襯線是刻意的——它讓後台看起來像一本冊子而不是一套系統。
- **內文**：`Noto Sans TC` 400／500／700，行高 1.75。
- **手寫註記**：`Caveat` 500／700。用於：卡片副標（英文小字）、統計格的欄位名、空狀態文字、數值旁的口語補充。**規則：Caveat 永遠只承載「旁白」，不承載使用者必須讀懂的關鍵資訊**（避免可讀性風險）。
- **數字**：內文字體加 `font-variant-numeric:tabular-nums`，讓表格中的里程與時間對齊。不另外引入 mono——mono 會帶回機器感。
- 字級：卡片標題 `clamp(17px,2.2vw,21px)`；統計數字 23px／900；內文 14–15px；表格 13.5px；註記 11.5–12.5px。

## 四、版面與網格

- **紙卡是唯一的容器單位**：`.sheet`＝紙卡（圓角 14px、1.5px 邊、雙層柔和陰影）；`.stitch`＝卡中卡（1.6px **虛線**邊、圓角 11px、半透明白底），像手帳裡貼上去的小紙片。虛線是這個風格的簽名，代表縫線。
- **主網格**：`.g23`（1.35fr／.95fr）用於「主操作區＋輔助面板」；`.g2`／`.g3` 用於對等區塊。≤900px 全部塌成單欄。
- **頁首是手帳封面**：logo＋所名＋手寫英文副標，底緣用 `repeating-linear-gradient` 做出虛線車縫。
- **留白中等偏鬆**：卡片內距 18px，卡間距 16px。資訊密度高的表格允許壓到 8px。

## 五、元件配方

- **角色切換列 roleband**：頁首下一排圓角膠囊，四個角色端各一。現用者填暖橘、白字。這是多角色系統的定位器，永遠可見。
- **底部書籤帶 dock**（bottom-dock 原型）：固定底部的布質橫帶，六個入口各配一枚手繪圖示（`stroke-linecap:round`、2.1px 描邊、無填色為主）。現用頁在頂緣長出 4px 暖橘短帶，像書籤露出來的一角。
- **類別標籤 `.tag`**：圓角 999px 的小膠囊，填類別色、白字、12px/700。
- **狀態藥丸 `.pill`**：`.ok` 綠、`.no` 紅、預設暖橘，皆為 12% 透明底＋同色字＋淡邊。用於「可服務／不符／已指派」。
- **按鈕**：全圓角膠囊。次要＝紙色底＋線色邊；主要 `.go`＝暖橘底白字。hover 只換邊框色與文字色，**不位移、不加硬陰影**。
- **計分卡 scorecard**：本風格最關鍵的元件。左為姓名與距離車程，右為大字總分（≥75 綠／≥55 橘／其餘灰）；下方一張表，每列＝一個評分維度＋一條進度條＋得分／滿分＋一句白話理由。**演算法必須可解釋，這是硬規定。**
- **進度條 `.bar`**：9px 高、圓角、布色軌道；`.g` 綠（良好）、`.r` 紅（過載）、預設暖橘。
- **表格 `.tb`**：無外框，只有 1px 橫線；表頭布色半透明底＋襯線字。
- **提示框**：`.note`（金色左邊條，說明）／`.warnbox`（紅色左邊條，警告）。圓角只給右側，像便利貼。
- **空狀態**：Caveat 手寫字置中，兩行以內，一定要說「接下來可以做什麼」。

## 六、動效規則

這個風格**刻意極少動效**——照護介面裡，突然動起來的東西會讓人焦慮。

- 只允許 `transition:background .16s, border-color .16s`（按鈕與導覽的 hover／focus）。
- 資料變動採**直接重繪**，不做補間、不做數字滾動、不做逐項淡入。使用者改一個偏好，結果立刻是新的。
- 地圖不自動旋轉、不自動播放、無跑馬燈、無輪播。
- `prefers-reduced-motion` 下把全部 transition 與 animation 關掉（`*{transition:none!important;animation:none!important}`）並取消平滑捲動；因為本來就不靠動畫傳達資訊，功能完全不減。

## 七、插畫與圖像風格（hand-drawn round-stroke）

- **圖示**：全部自繪 inline SVG，24×24 viewBox，`stroke-width:2.1`、`stroke-linecap/linejoin:round`、以描邊為主偶爾實心。刻意讓弧線不完全對稱（例如屋頂、書頁、心形），像順手畫的。**禁止 emoji 當圖示、禁止圖示字型、禁止外部圖檔。**
- **作業地圖**：不是示意圖而是**等距長方投影的真實座標圖**。行政區畫成虛線圓＋區名，照護點為類別色圓點，路線為暖橘線段並在中點掛一個小紙牌標里程。出發地／本所畫成旋轉 45° 的圓角方塊。右下角固定一支比例尺——這是「距離是真的」的視覺承諾。
- **時窗條 weekBar**：每列一天，布色軌道上填暖橘色塊代表可用時段；雙方交集用綠色 45° 斜紋疊上去。它讓「時間吻合度」這個抽象分數變成看得見的東西。
- **頭像**：不用照片，用姓氏首字＋該員代表色的圓形色塊。

## 八、Logo 與 Favicon 設計指南

- **Logo**（`assets/logo.svg`，120×120）：紙色圓角方＋虛線車縫外框（呼應 `.stitch`）＋一道暖橘拱線（屋頂／保護）＋赭紅心形（照護）＋苔綠圓點（人）。全為基本幾何，無漸層、無陰影。
- **Favicon**：inline SVG data URI，同一組元素簡化到 32×32：布色圓角底、暖橘拱、赭紅心、綠點。
- 命名規則：logo 只用色塊與線，不用文字；縮到 24px 仍要能辨識輪廓。

## 九、Do & Don't

**Do**
- 把演算法的每一分都寫出理由；被排除的人選也要列出來並說明卡在哪個硬條件。
- 同一份資料模型餵四個角色端，讓切換角色時數字彼此對得上。
- 用虛線縫邊、手寫旁白、圓角膠囊維持溫度；用表格、進度條、tabular-nums 維持專業。
- 任何時間／距離／金額都給單位與依據（例：「12.7 km・機車車程約 32 分」）。
- 敏感資料一律標明虛構示意；距離估算方式要寫清楚（直線距離 × 繞行係數）。

**Don't（含去 AI 化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- 不用 emoji 當 icon、不用外部圖片與圖示字型。
- 不用純黑純白、不用金屬質感、不用霓虹或螢光色、不用深色儀表板底。
- 不把分類色大面積鋪滿（會退回導視系統語言）。
- 不做數字滾動、揭示淡入、按壓硬陰影、跑馬燈、自動輪播。
- 不用 Lorem ipsum、不用 AI 腔（「在當今快節奏的世界」）、不用「EST. 19xx」徽章、不用「把 X 變成 Y」句式。
- 不用「智慧」「AI 驅動」當賣點文案——直接展示演算法怎麼算的。

## 十、頁面骨架範例

```html
<!-- 紙卡 + 卡中卡 -->
<div class="sheet">
  <h2>配對中心 <span class="sub">smart matching</span></h2>
  <p>先以硬條件篩選，再用加權計分排名。</p>
  <div class="stitch">
    <div style="display:flex;justify-content:space-between">
      <div><b>林昭儀</b> <span class="tag W">傷口照護</span></div>
      <div style="font-size:27px;font-weight:900;font-family:Noto Serif TC">89</div>
    </div>
    <table class="tb">
      <tr><td>距離</td>
          <td><div class="bar g"><span style="width:64%"></span></div></td>
          <td class="num">19.2/30</td>
          <td>3.6 km・車程約 16 分</td></tr>
    </table>
  </div>
</div>

<!-- 底部書籤帶 -->
<nav class="dock" aria-label="主導覽"><ul>
  <li><a href="index.html" aria-current="page">
    <svg viewBox="0 0 24 24"><path d="M4 12.5 12 5l8 7.5" fill="none" stroke="currentColor"
      stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span class="lb">本所</span></a></li>
</ul></nav>
```

核心設計常數：

```css
:root{
  --cloth:#E3D9C6; --paper:#F8F3E9; --line:#DCCFB6;
  --ink:#3E342A;   --warm:#C9743C;  --r:14px;
}
/* 布紋：兩層極淡條紋交叉，不用外部圖片 */
body{background-color:var(--cloth);background-image:
  repeating-linear-gradient(90deg,rgba(255,255,255,.16) 0 1px,transparent 1px 4px),
  repeating-linear-gradient(0deg,rgba(120,100,70,.07) 0 1px,transparent 1px 4px);}
```

---

*本風格的判準：一個從未看過 Demo 的 AI，只讀本檔，就能做出一個「布面紙卡、虛線縫邊、手寫旁白、多角色切換、演算法逐項可解釋」的全新服務型後台——換一個產業（托育、寵物到府、居家清潔）也成立。*
