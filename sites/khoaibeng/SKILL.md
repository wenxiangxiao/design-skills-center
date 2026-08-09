---
name: letterpress-ticket
description: A letterpress job-printing style — warm paper ground, two spot inks (indigo blue for content, vermilion red for action), double-rule ticket borders, misregistration shadows, and multiply-blended overprints.
---

# 活版 Letterpress（票券雙墨）

## 一、設計哲學

這套風格重現的是**活版票券印刷（letterpress job printing）**的視覺傳統：老名片行、票券行、打字謄寫社的那種「紙白＋藍紅雙專色」印件。三個立場：

**一、兩色油墨，各司其職。** 傳統活版件為省成本只開兩色版：一色排內容、一色做強調。本風格照辦——**藍墨（indigo）給一切「內容」**：正文重點、表格線、框、盤上的字；**朱墨（vermilion）給一切「動作與標記」**：按鈕、路徑、圈選、警示、現用態。第三種顏色不存在，需要層次就用同墨的濃淡與網紋。

**二、紙是真的紙。** 暖米白地（不是純白），疊細橫紋模擬紙纖，卡片是「一張票」：外粗內細的雙線框（double rule）是活版票券最招牌的框式，角上可押飾角。深色區塊是「印滿版藍的票背」。

**三、印刷的不完美是特徵不是瑕疵。** 標題帶輕微紅版套印錯位（misregistration）且緩慢漂移；紅墨壓過藍墨處用 `mix-blend-mode:multiply` 真實混色成深茄紫——油墨是透明的，疊起來會變色，這正是 3 秒認出活版的關鍵。

**去AI化效果**：無漸層、無圓角、無模糊陰影、無 emoji；首屏即可操作的內容，不是標語。

## 二、本風格的 5 個不可省略特徵（§2.7.2）

拿掉任何一項，它就不是活版票券了：

**1. 雙線票券框（double rule）** — 外 2px 實線＋內縮 4px 的 1px 細線：
```css
.card{border:2px solid #1D4E89;position:relative;background:#F7F1E2}
.card::after{content:"";position:absolute;inset:4px;border:1px solid rgba(29,78,137,.5);pointer-events:none}
```
**2. 藍紅雙專色分工** — 藍=內容、紅=動作，全站不得出現第三個彩色：
```css
:root{--pap:#EDE5D0;--blue:#1D4E89;--red:#C0392B;--ink:#2A2620}
```
**3. 套印錯位標題** — 紅版偏移 1–2px 的 text-shadow（可配 @property 緩慢漂移）：
```css
h1{color:var(--blue);text-shadow:1.4px 1.4px 0 rgba(192,57,43,.55)}
```
**4. multiply 疊印** — 紅線壓過藍字必須透墨混色，不得不透明蓋掉：
```css
.overprint{mix-blend-mode:multiply}
```
**5. 紙纖底紋＋粗細分隔** — 暖米白地上 7px 週期細紋；區塊間用 6px double 紅線（鉛條）：
```css
body{background:#EDE5D0;background-image:repeating-linear-gradient(0deg,rgba(42,38,32,.035) 0 1px,transparent 1px 7px)}
.rule{border-top:6px double var(--red)}
```

## 三、色彩系統

| 用途 | hex | 佔比 | 說明 |
|---|---|---|---|
| 票紙（大面積地） | `#EDE5D0` | 40% | 暖米白＝老紙。卡面亮一階 `#F7F1E2`、盤面暗一階 `#E4DABF` |
| 藍墨（內容專色） | `#1D4E89` | 20% | 文字重點、框線、表格、盤上鉛字；滿版票背 `#16385E`、頁尾 `#0F2A49` |
| 朱墨（動作專色） | `#C0392B` | 8% | 按鈕、路徑、圈選、錯誤、現用態；深階 `#8E2A20` |
| 鉛墨（正文） | `#2A2620` | 內文 | 帶暖的黑，正文與註記 |
| 票背淡藍字 | `#C4D2E2` | — | 深藍底上的次要文字 |

規則：紅**永遠是少數**（≤8%）；紅藍相疊處必 multiply；禁止第三彩色與漸層。

## 四、字體系統

- **標題／內文**：Noto Serif TC。行名與大標 900、字距 .18–.24em（木刻活字的擠壓感）；內文 400、line-height 1.85–1.95。
- **號碼／讀數**：IBM Plex Mono 400–500 配 `tnum`。票號、公分數、價錢一律 mono 且多用朱墨。
- 層級靠字重與字距，不靠超大字級；大標 ≤26px。

## 五、版面與網格

- 版心 ≤1120px（內文頁 880px）；卡片全部直角。
- 區塊分隔用「鉛條」：`border-bottom:6px double var(--red)`（店招）或藍墨滿版帶（票背區）。
- 主格局二欄 grid，≤960px 塌單欄；行動版導覽塌為底部四格藍底橫列。
- 表格是正式文體：1px 藍線滿框、表頭 `#E4DABF` 藍字。

## 六、元件配方

**店招**：滿版藍墨底、行名 900 反白＋紅版錯位 text-shadow、下緣 6px double 紅線。
**滑架定位導覽（carriage-stop）**：右上固定 SVG——一條深藍軌、四個定位鍵、現用頁上停一台滑架（深藍座＋白紙＋紅壓條）。行動版塌為底部四格，現用格紅底。
**按鈕**：紙底藍框藍字；主要動作紅底白字（紅墨版）；`:active{transform:translateY(1px)}` 模擬壓印下沉，無陰影。
**票券卡**：見特徵 1；標題字距 .22em、下加細藍線。
**表單**：欄位 `#FDF8EA` 底 1px 藍框，focus 2px 朱紅 outline；錯誤朱紅 12.5px。

## 七、動效規則（§2.7.4 四式）

| 類型 | 實作 | 觸發 | 參數 |
|---|---|---|---|
| ambient 環境 | 標題紅版套印錯位緩慢漂移（@property --mrx/--mry 補間 text-shadow 偏移） | 常駐 | 7s ease-in-out alternate |
| input 輸入 | 盤格 hover 朱紅淡染＋右上角「字模」放大預覽（mouseover 即時）；按鈕壓印下沉 | hover/active | <100ms，transition .08s |
| transition 轉場 | 跨頁 View Transitions（`@view-transition{navigation:auto}`，.16s crossfade）；打件單／回執以「出紙」clip-path 進場 | 導頁／結果產出 | .16s／.35s ease-out |
| signature 簽名 | 揀字手程即時計費：每揀一字紅墨折線多一段、公分數即時累加，multiply 疊印在藍字盤上 | 揀字 | 即時 append，無補間 |

`prefers-reduced-motion`：錯位漂移停在靜態偏移、出紙與轉場瞬時完成、字模預覽不縮放——資訊零損失。

## 八、插畫與圖像風格（pickpath-grid 揀字路徑格陣・雙墨版）

全站不存在描外形的插圖。唯一圖像原語四件：**藍墨格陣**（票紙底、藍細線、藍鉛字）、**朱墨路徑**（1.8–2.2px 折線 multiply 疊印、起點圓終點方）、**成本讀數**（mono 公分數必註於旁）、**頻率熱度**（格底藍墨按頻率開方染色）。logo、favicon、示意圖、回執印記同構。判準：拿掉文字仍讀得出「從哪到哪、花多少」；印出來只需兩塊版。

## 九、Logo 與 Favicon

Logo＝雙線票框內：左側小格陣＋一格藍底反白「快」＋朱紅揀字路徑，右側行名藍墨 900 疊半透明紅版錯位。Favicon 同構：紙底、藍格線、一格藍、一條紅折線。皆 inline SVG / data URI。

## 十、Do & Don't

**Do**：兩色專墨分工；雙線框；multiply 疊印；套印錯位僅 1–2px；數字 mono；表格優先；紙感底紋。
**Don't**：第三彩色；漸層；圓角；模糊陰影；不透明的紅蓋藍；錯位超過 2px（變成故障風就跑到 glitch 家族了）；emoji icon；置中三卡片；Lorem ipsum；「EST. 19xx」徽章。

## 十一、首創技術實作配方（介面幾何作為被優化的對象）

1. **資料**：`TRAY`（456 字，格序即座標）＋`GID`（類別碼）＋三卷真實語料。期望手程對語料連續字對直接累加，不用抽象頻率表，讀者可自行驗算。
2. **成本函數**：`手程 = Σ hypot(Δcol,Δrow) × 0.8cm`，起點歸位格、盤外字 22cm。打字台計費、排盤室儀表、三盤對照、貪心建議**四處共用同一支函數**。
3. **可尋性**：同類鄰接率＝左右鄰同類比率全盤平均（類聚盤 95.9%／頻率盤 10.2%）。兩錶並列即「快與找得到互相出賣」。
4. **頻率盤**：字按頻率降冪、格按距歸位格升冪貪心對位；同時是「貪心建議照單全收的終點」的實物證明。
5. **跨頁佈局**：`localStorage["km-tray"]`（456 字字串）；打字台可用自己的盤重打同件，成果以公分差呈現。
6. **決定性印記**：FNV-1a(姓名+類別)→mulberry32；印記＝該字串的揀字路徑投影到 12×12 格。
7. **保底**：公式與實測數字靜態頁全文可讀；noscript 明示並指路。

## 十二、技術實作與相容性（§2.7.3）

**tech 組合**：① View Transitions API（跨文件，B 層）② mix-blend-mode multiply 疊印＋CSS @property 補間（A/C 層）③ 決定性偽隨機 FNV-1a→mulberry32＋localStorage 跨頁狀態（E 層）。

| 技術 | 支援現況（2026-08 查證：caniuse「cross-document-view-transitions」「view-transitions」、MDN ViewTransition） | fallback 行為 |
|---|---|---|
| `@view-transition{navigation:auto}` 跨文件轉場 | Chrome/Edge 126+、Safari 18.2+；Firefox 尚在旗標後（同文件 API Firefox 133+ 已支援） | 不支援的瀏覽器忽略該 at-rule，導頁為即時跳轉，零功能損失 |
| `mix-blend-mode:multiply` | 全主流瀏覽器 Baseline 多年 | 無需 fallback；極舊環境紅線不透墨、仍可讀 |
| CSS `@property` 型別化自訂屬性 | Chrome 85+、Safari 16.4+、Firefox 128+ | 不支援時 text-shadow 停在 initial 偏移（靜態錯位），動畫自動失效 |
| `localStorage` | 全面 | 拒寫時介面提示「存不進去」，其餘功能不受影響 |

**效能預算實測**：index.html 22.9KB／pan.html 21.4KB／fa.html 14.5KB／tuo.html 15.6KB（含全部 inline 資源，皆 ≪350KB）；字盤 456 格一次性 innerHTML 生成 <30ms；揀字與對調為單節點 class 切換與 polyline append，無 layout thrashing；唯一常駐動畫為 compositor 上的 text-shadow 變數補間。貪心「建議一手」最壞 42×456 次全語料重算 ≈ 2×10⁶ 次浮點，實測 <90ms 同步完成。

---

*本 SKILL 由 **Claude Fable 5** 撰寫（2026-08-09，排程 Agent 自動執行）。*
