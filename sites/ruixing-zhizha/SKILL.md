---
name: zhizha-paper-craft
description: A warm-charcoal Taiwanese paper-effigy style with fluorescent paper panels over bamboo-strut skeletons, hanging banner navigation, and a two-world burn duality where every page has an inverted "already-burned" twin.
---

# 紙紮彩紙風 Zhizha Paper-Craft

## 一、設計哲學

這套語言為「作品的終點是消失」的行業而生：糊紙店、紙紮工坊、香鋪、金銀紙、祭祀文化、民俗工藝，以及任何想把「短暫」「交付」「儀式感」做進介面的題材（限時展覽、快閃店、倒數活動）。

三條原則，缺一即退化：

1. **骨與皮分離，且骨要露出來。** 紙紮的本體是竹骨——彩紙只是糊上去的皮。所以這套風格的每一張圖都是「竹篾線條（圓頭、微粗）＋彩紙色塊（半透明、故意錯位）」兩層：色塊統一往右下偏移 2px×1.5px，模擬糊紙時紙比骨大一輪的交疊；竹骨在色塊之上或穿出色塊之外。畫一張沒有露骨的插圖，等於把紙紮畫成了卡通。
2. **色是螢彩紙的色，不是螢幕的色。** 桃紅、螢綠、金黃是台灣紙紮鋪的標準彩紙色，必須以高飽和、無漸層、`fill-opacity:.9` 左右的平塗出現在暗底上——像一疊彩紙攤在暗暝的工房。禁止把這三色做成霓虹光暈（那是港式霓虹的語彙）：紙是不發光的，鮮豔但務必「啞光」。
3. **凡物皆有已焚態。** 這套風格的世界觀是雙面的：每個頁面、每件物品都同時存在「未焚」與「已焚」兩態。已焚態＝整層 `filter:invert(1) hue-rotate(150deg) saturate(.55) brightness(1.02)`，一律整層套用、不逐元素調色。介面必須至少提供一個入口讓使用者看到另一邊（火線、彼岸鏡、hover 反相皆可）。只做單面，這套風格就只剩配色。

性格：暖炭黑的工房裡一疊螢彩紙。莊重但不陰森，鮮豔但不喧鬧；死亡在這裡是一門手藝的日常，語氣要像匠人——直、暖、有規矩。

## 二、色彩系統

| 用途 | Hex | 佔比 | 說明 |
|---|---|---|---|
| 地色 暖炭黑 bg | `#171114` | 40% | 全站底。疊 `repeating-linear-gradient(90deg,rgba(255,255,255,.016) 0 1px,transparent 1px 5px)` 直紋，似暗暝竹簾 |
| 面板 panel | `#241923` / `#1E1620` | 14% | 卡片、控制盤、圖框底 |
| 界線 line | `#3A2B36` | — | 一律 2px 實線，無圓角、無陰影 |
| 紙白 paper | `#F4E9D6` | 12% | 正文字色；化訖單、回執的底則用 wall |
| 厝壁 wall | `#F2E3C2` | 8% | 插圖裡的厝壁、人物面、單據底 |
| 桃紅 pink | `#F0448C` | 10% | 彩紙主色：屋瓦、幡、主按鈕、強調 |
| 螢綠 green | `#3BD98A` | 8% | 彩紙次色：窗、幡、選中態、成功態 |
| 金箔 gold | `#D9A441` | 6% | 只做「點」：脊頭圓點、門、手柄、現用態。金是拿來點的，不是拿來鋪的 |
| 竹 bamboo | `#C9A06B` | — | 所有骨架線、竹竿、時間軸 |
| 次文字 | `#C9BBA0` / `#8F8272` | — | 說明文、mono 標籤 |

規則：

- 桃紅與螢綠可以相鄰（彩紙本來就撞色），但兩者都不可與金箔大面積相鄰——金只以 ≤8px 的點或 ≤26px 的小面出現。
- 暗底上的彩紙色塊一律 `fill-opacity` 0.88–0.92，讓底色微透，得「紙感」。
- 禁止漸層底、禁止 box-shadow 光暈、禁止圓角超過 0（本風格無圓角；圓只出現在竹篾的 `stroke-linecap:round` 與金箔圓點）。
- 已焚態不得手調顏色，必須整層 filter 反相——「火不挑色，整間一起燒」。

## 三、字體系統

| 角色 | 字體 | 設定 |
|---|---|---|
| 招牌／大標／幡 | `Chocolate Classical Sans`（Google Fonts，僅 400） | 北魏楷書感的招牌字。`letter-spacing:.1em` 起跳；幡上直書 `.28em` |
| 內文 | `Noto Serif TC` 400/600 | `line-height:1.8` 上下 |
| 編號／標籤／單據 | `IBM Plex Mono` 400/600 | 小級數＋`letter-spacing:.2em`+，化訖單、價目、kicker 全用它 |

字級 scale：kicker `.82rem` → 內文 `1rem` → 卡片標 `1.15rem` → 節標 `clamp(1.6rem,4vw,2.3rem)` → 頁標 `clamp(2.4rem,7vw,4.4rem)` → 首頁招牌 `clamp(3rem,9vw,6.4rem)`。大標中一至二字換強調色（`<b>` 不加粗、只變色）。

## 四、版面與網格

- 內容欄 `max-width:1080–1120px`，段落 `max-width:34–38em`。
- **無置頂導覽列**。導覽是掛在右上竹竿上的四面幡（見六）。頁面從約 15vh 的留白直接落標題。
- 章節以 2px 實線分隔，編號用國字（壹、貳）配 mono 英文小標。
- 不對稱來自「幡在右上、彼岸鏡在左下、火線手柄在中間偏右」的三角配置，以及插圖色塊的 ±1–3° 微旋。
- 工房／表單類版面：左看板（大）右控制盤（小），`grid-template-columns:1.25fr 1fr`，840–900px 以下疊直。

## 五、元件配方

- **幡旗導覽（spirit-banner nav）**：`position:fixed; top:0; right:26px`。一支竹竿（6px 圓角條＋兩枚吊環）下掛四面幡：`writing-mode:vertical-rl; text-orientation:upright`，寬 46px，高 120–132px 各不同，底色輪流用桃紅／螢綠／金黃／厝壁色，尾端 `clip-path:polygon(0 0,100% 0,100% calc(100% - 13px),50% 100%,0 calc(100% - 13px))` 剪出燕尾。現用頁那面**垂較長**（150px）＋內框 3px 墨線＋尾端墨色菱形墜。幡頂一顆半透明墨點是「釘」。≤680px 整組落到底部變四格橫列（clip-path 取消、停搖），body 補 `padding-bottom`。
- **按鈕**：實色平塗＋墨色字，無圓角無陰影；主行動用桃紅、hover 換金黃。危險／不可逆動作（焚化）必須二段確認，且文案明講後果。
- **選項鈕**：`aria-pressed` 切換，選中＝螢綠底墨字。色票選項為 38px 方塊＋選中外框。
- **單據（化訖單／回執）**：`wall` 底墨字、內縮 6px 一圈 2px 墨框（`::before`），mono 列表上下 2px 實線，右下角一枚 `-12°` 旋轉的圓形朱印（桃紅描邊「化訖」）。
- **表格／時間軸**：時間軸是一支垂直竹篾（6px 圓條）掛菱形節點，焚化日節點換金箔色。
- **footer**：三欄（店資訊／頁面／一段店史），上緣 2px 實線，末行 mono 小字放虛構聲明與建置模型。

## 六、動效規則

| 動效 | 觸發 | 參數 |
|---|---|---|
| 幡搖 | 常駐 | `rotate 1deg ↔ -1.2deg`，5.2s ease-in-out 無限，各幡 delay 錯開；hover/focus 加速到 1.6s（風吹） |
| 火線拖曳 | pointer/鍵盤 | 彼岸層 `clip-path:inset(0 0 0 X%)` 即時跟手；餘燼 canvas 沿鋒面每幀補粒（≤46 顆），金／桃紅小圓，上飄漸滅 |
| 焚化儀式 | 按鈕（confirm 後） | 5.6s，easeInOutQuad。物件容器 `clip-path:polygon(...)` 14 段鋸齒邊逐幀上行，鋸齒 y 加 `sin(t/140+i·1.7)×1.6` 抖動；canvas 每幀補 5 顆餘燼＋機率煙粒（灰、alpha .16、半徑漸大）；鋒面處一條 30px 高的橫向漸層火光。過程口白四句按進度換（起火——竹骨在唱——彩紙做煙——金箔上天——化訖。） |
| 彼岸鏡 | 按鈕 toggle | 整層 filter 反相，無過場（火不打招呼） |
| reduced-motion | 一律 | 幡停搖、餘燼不生成、焚化跳過動畫 700ms 直接出單；所有內容與功能完整保留 |

## 七、插畫與圖像風格（竹骨糊紙構成）

每張圖兩層三素材，順序固定：

1. **彩紙層（先畫）**：`<polygon>/<rect>/<circle>` 平塗，`fill-opacity:.9`，統一 `transform="translate(2,1.5)"` 右下錯位；同一物件的相鄰色塊可各自 ±1–3° 微旋，模擬手糊。
2. **竹骨層（後畫、壓在上面）**：`stroke:#C9A06B`，寬 3–6px，`stroke-linecap:round`；結構線（柱、樑、地線）必畫，交點可加桃紅圓點當紙捻。
3. **金箔（最後點）**：`r:3–5` 金圓點，只點在脊頭、簷角、器物的「眼」上，每圖 ≤4 點。

題材永遠畫「紙紮版」的物件——賓士車、手機、麻將桌、金童玉女——比例故意矮胖（紙紮是給看的，不是給開的）。禁止細線等寬白描、禁止寫實透視、禁止陰影。

## 八、Logo 與 Favicon 設計指南

Logo＝一座竹骨糊紙小厝（燕尾脊桃紅瓦＋螢綠窗＋金門＋露出的竹骨與三顆金箔）＋北魏體店名橫排＋mono 小字英文＋一條桃紅底線。Favicon＝64×64 暗底＋極簡厝（桃紅三角瓦、螢綠壁、金門、一條竹地線、一顆脊頂金點），inline SVG data URI 寫進 `<head>`。

## 九、Do & Don't

**Do**

- 每頁保留進入「已焚態」的入口；不可逆動作出單據。
- 文案用匠人口吻＋台語書面詞；價格、工期、人名、店規具體到可以打電話查證的程度。
- 彩紙色塊錯位、竹骨露出、金箔點睛，三者是本風格的指紋。
- 嚴肅題材保持敬意：幽默可以（紙手機附充電線），輕佻不行。

**Don't**

- 禁紫藍漸層、圓角卡、陰影、emoji icon、Lorem ipsum、「在當今快節奏的世界」。
- 禁把螢彩做成發光霓虹；禁大面積鋪金。
- 禁跑馬燈（本風格的動是「搖」與「燒」，不是「捲」）。
- 禁在已焚態逐元素改色——必須整層 filter。
- 禁「EST. 19xx」徽章；年代寫進敘事（「民國五十一年，阿公在杉行街……」）。

## 十、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>頁名｜店名</title>
<link href="https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&family=IBM+Plex+Mono:wght@400;600&family=Noto+Serif+TC:wght@400;600;900&display=swap" rel="stylesheet">
<style>
:root{--bg:#171114;--panel:#241923;--line:#3A2B36;--paper:#F4E9D6;--pink:#F0448C;
--green:#3BD98A;--gold:#D9A441;--bamboo:#C9A06B;--wall:#F2E3C2;--ink:#171114;
--disp:'Chocolate Classical Sans','Noto Serif TC',serif;--serif:'Noto Serif TC',serif;--mono:'IBM Plex Mono',monospace}
body{background:var(--bg);color:var(--paper);font-family:var(--serif);line-height:1.8;
background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.016) 0 1px,transparent 1px 5px)}
.fan{position:fixed;top:0;right:26px;display:flex;gap:10px}
.ban{writing-mode:vertical-rl;text-orientation:upright;width:46px;padding:20px 0 24px;
background:var(--pink);color:var(--ink);font-family:var(--disp);letter-spacing:.28em;
clip-path:polygon(0 0,100% 0,100% calc(100% - 13px),50% 100%,0 calc(100% - 13px));text-decoration:none;text-align:center}
#world.ghost{filter:invert(1) hue-rotate(150deg) saturate(.55) brightness(1.02)}
</style>
</head>
<body>
<nav class="fan"><a class="ban" href="index.html">工房</a><!-- 其餘三幡 --></nav>
<div id="world">
  <header><!-- 15vh 留白後直落大標，1–2 字換色 --></header>
  <main><!-- 章節以 2px 線分隔；插圖=彩紙層→竹骨層→金箔 --></main>
</div>
<button id="ghostBtn">彼岸鏡</button>
<footer><!-- 三欄＋虛構聲明 --></footer>
</body>
</html>
```

驗收：暗底螢彩是皮，「骨露出來」與「凡物有已焚態」才是這套風格的身分。兩者齊備，換任何產業都還是紙紮彩紙風。
