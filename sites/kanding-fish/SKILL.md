---
name: logistics-barcode-label
description: A stark clinical-white auction-terminal style built from procedural barcodes, thermal-printed label cards, monospace lot codes and flat high-contrast creature silhouettes, in safety orange / auction red / cold blue signal colours.
---

# 物流標籤／條碼美學 — Logistics Barcode Label

## 設計哲學

把「貨」當主角。這個風格借用批發市場、物流倉、拍賣場的視覺語言：熱感印字的標籤、單號條碼、才數與等級印章、認牌不認人的編號系統。畫面是臨床的純白，配上厚重的墨黑條碼與三個高飽和訊號色（安全橘、拍賣紅、冷藍），資訊密度刻意拉高（極密），像一塊還在運轉的電子競標看板。情緒是熱血直球的：喊價、倒數、鎚音。

關鍵美學決策：底色用**純白 `#FFFFFF`**（臨床、無紙感），而非米白——這讓它遠離「紙感文青」，站到工業／系統那一邊。所有邊框是 2–4px 的實心墨黑、方角、硬位移陰影（`box-shadow:5px 5px 0`）。

## 色彩系統

| 用途 | Hex | 比例 |
|---|---|---|
| 主底（臨床白） | `#FFFFFF` | 55% |
| 墨黑（線框／條碼／文字） | `#111111` | 22% |
| 安全橘（主訊號／CTA／現流） | `#FF5A00` | 10% |
| 拍賣紅（成交／警示／倒數） | `#E4022B` | 6% |
| 冷藍（新鮮／你的最高／B 級） | `#0090D4` | 4% |
| 淺灰面板 | `#F1F1EF` | 3% |

三個訊號色各有語意，不可互換：橘＝行動與現流、紅＝成交與危急、藍＝「你」與冷鏈新鮮。

## 字體系統

- 巨型顯示（看板標題／編號）：**Anton**（單一超粗窄體，全大寫，字距 1–2px）。
- 資料／單號／價格／條碼文字：**Space Mono**（400／700，等寬，字距 1–3px）。
- 標籤／導覽／按鈕：**Archivo**（700–900，全大寫，字距 1–1.5px）。
- 中文品項與內文：**Noto Sans TC**（700／900 為主，極少 400）。
- Scale：看板巨標 `clamp(30px,5vw,58px)`；現價 `clamp(30px,5vw,46px)` 等寬；區塊標題 Archivo 12px 全大寫；資料 12–13px 等寬。
- 中英混排：英文用 Anton／Archivo 當「系統語」，中文 Noto 900 當「品項名」，兩者以字級與字重拉開層次。

## 版面與網格

- **控制台（console）**：主 `grid-template-columns:1.55fr 1fr`——左為現正競標面板，右為戰績／佇列／成交紀錄三疊。
- **終端狀態列（term）**：黑底等寬字，紅點呼吸表示 live，含主機名、筐數、牌號、凌晨時鐘。
- **標籤卡（label）**：2–3px 墨黑外框，內部以 `border-bottom:1px dashed` 分列（撕線感），每列左右對齊 `code / tag`、`品項 / 產地`、`才數 / 底價`。
- **極密**：資訊列多、留白少；用線與底色分割而非空白。
- RWD：≤980px console 單欄；≤600px 頁籤隱藏中文、bidbar 單欄。

## 元件配方

- **topbar**：白底、`border-bottom:4px solid`；品牌區右側 2px 分隔；每個 nav 項 `border-left:2px`、hover 反黑、當前頁亮橘。條碼分割感來自等寬的粗豎線分隔。
- **條碼（procedural）**：`seedRand(code)` 用 FNV-1a hash 產生穩定亂數；沿寬度鋪 `1–5px` 黑 `rect`（`rnd()>0.35` 才畫），底部印等寬單號文字。同一單號永遠得到同一條碼。
- **按鈕（bid）**：橘底白字、3px 黑框、`box-shadow:5px 5px 0 #111`；`:active` 位移 `translate(5px,5px)` 吃掉陰影（實體按壓感）。次要鈕白底。
- **計時器**：Anton 40px 數字；`timeLeft<=5` 整塊轉紅底白字（`.warn`）。
- **等級印章 .grade**：S＝紅、A＝橘、B＝藍，Archivo 800 小方塊。
- **flat-shape 生物剪影**：純黑 `path` 剪影＋橘色圓點眼睛＋白色（底色）內部線條分割；魚／扁魚／頭足／甲殼各一個原創 glyph。

## 動效規則

| 動畫 | 觸發 | 值 |
|---|---|---|
| 熱感印字（label print） | 新筐上板 | 每 `.lrow` `opacity+translateY(-6px→0)`，`steps(3) .34s`，逐列 delay 0.02→0.50s |
| 現價跳動（bump） | 出價成功 | `scale(1)→1.12（轉紅）→1`，0.3s ease（次要輔助，非 signature 主打） |
| 鎚定成交 | 倒數歸零且你最高 | `.calls` 顯示「鎚定成交！SOLD」，成交列插入紀錄流 |
| live 紅點 | 常駐 | `live 1.2s steps(1) infinite` |
| 倒數警示 | `timeLeft<=5` | timer 轉紅 |

`prefers-reduced-motion:reduce`：關閉所有 transition/animation、`scroll-behavior:auto`、標籤列直接顯示（不逐列印出）。

## 插畫與圖像風格

**零外部圖片。**兩種原創來源：(1) 程序生成條碼（見上）；(2) flat-shape 高反差生物剪影——用少量 `path`／`ellipse`／`line` 畫魚、扁魚、透抽、龍蝦，全黑填色、橘色眼點、底色線條當內部細節。剪影要「一眼認得、零漸層」，服務標籤／印刷的粗獷質感。等級與狀態用純色方塊印章，不用 emoji。

## Logo 與 Favicon

- **Logo**：左側一段黑色條碼（不等寬豎條）＋橘色魚形剪影（`path` 紡錘身＋三角尾＋白眼點）＋「崁頂魚市 / 拍賣行 · FISH AUCTION」黑橘紅三色字。
- **Favicon**：只留條碼豎條，鋪純白底，inline SVG data URI。

## Do & Don't

**Do**：純白臨床底；厚墨黑方框與硬位移陰影；程序生成條碼與單號；三訊號色各守語意；等寬字排數據；資訊密度拉高；剪影高反差零漸層。

**Don't**（含去 AI 化禁令）：
- ✗ 底色不用米白紙感（那會滑進文青紙感風；本風格要臨床白）。
- ✗ 不用紫藍漸層、不用置中大標＋兩鈕＋三卡模板。
- ✗ 不用 emoji 當 icon（鎚、魚、印章一律 SVG／純色方塊）。
- ✗ 不用圓角與模糊陰影；陰影一律硬邊實心位移。
- ✗ 數字計數不可當唯一動效主打（本站主打是熱感印字與鎚定）。
- ✗ 不寫「EST. 19xx」徽章、不寫「把 X 變成 Y」句式、敏感／交易情境標明「虛構示意」。

## 頁面骨架範例

```html
<div class="term"><span class="dot"></span><span>連線 <b>崁頂拍賣主機</b></span></div>
<section class="panel">
  <div class="ph"><span>現正競標</span><span>LOT 01 / 10</span></div>
  <div class="label printing">
    <div class="lrow"><span class="code">崁頂-0716-A03</span><span class="tag o">現流 FRESH</span></div>
    <div class="lrow"><span class="lot-name">現流黑喉</span><span class="tag">彭佳嶼</span></div>
    <div class="bc"><svg></svg></div>
  </div>
  <button class="bid" data-inc="100">出價 ＋100</button>
</section>
<script>
function seedRand(s){/* FNV-1a → mulberry32 */}
function barcode(svg,code){/* rnd()>0.35 才畫 1–5px 黑條 + 等寬單號 */}
</script>
```
