---
name: motif-band-folkloristics
description: A saturated wine-and-vermillion fieldwork archive style whose entire image language is a horizontal band of motif glyph tiles, where every illustration is the data structure of a story rather than a picture of it.
---

# 母題記號帶風 Motif-Band Folkloristics

## 一、設計哲學

這套語言為「把口述內容當成資料結構的機構」而生：民間故事採集會、口述歷史工作室、方言調查所、族譜研究會、劇本結構分析、任何需要把「同一件事的不同版本」並排比較的地方。

三條原則，缺一即退化：

1. **不畫故事，畫故事的骨。** 全站沒有一張「插圖」。所有圖像——logo、favicon、章節圖示、圖鑑縮圖、表單回執——都是同一支引擎產出的**話帶**：一列方形記號格，一格＝一個母題，由左到右＝敘述順序。換一則內容就換一條帶，同樣的輸入恆得同樣的帶。若你在這套風格裡放了一張「示意插畫」，整套語言當場失效。
2. **底色承載職務，不承載美感。** 每一格的底色是它在敘事裡擔任的職務（準備／加害／對抗／解決／後加），不是設計師挑的顏色。因此一條帶的配色分布本身就是可讀的資訊：橘色格聚在中段代表這是一則衝突集中的故事，末尾出現青綠虛線格代表有人在後面加了東西。**顏色是欄位，不是裝飾。**
3. **版面服從「並排比較」。** 這種機構的核心動作是把兩三個版本擺在一起看差別。所以主結構永遠是「一條帶／多條帶」的水平列與垂直堆疊，不是卡片牆、不是雜誌大圖。留白讓給帶與帶之間，不讓給標題。

風格性格：酒紅底、螢光橘、薄荷青的三色撞擊，配 900 字重的黑體襯線標題與 Space Mono 編號。飽和、硬邊、無圓角、無陰影——像一份被印在紅紙上的機關檔案，而不是一個文化網站。

## 二、色彩系統

| 用途 | Hex | 佔比 | 說明 |
|---|---|---|---|
| 地色 深紅紫 wine | `#6E1B3C` | 34% | 全站背景。疊 `repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 4px)` 的橫向細紋，模擬紅紙纖維 |
| 地色深 wine-d | `#4A1029` | 8% | 眉標列底 |
| 地色最深 wine-dd | `#2C0A18` | 10% | 面板底、頁尾底 |
| 墨紫黑 ink | `#1A0F16` | 6% | 橘／青綠／骨白底上的文字與線 |
| 螢光橘 ember | `#FF7A1F` | 18% | 「加害・違反」格底、強調、現用態、法則編號。**大面積使用，不是點綴** |
| 薄荷青 mint | `#3BD1C4` | 8% | 「對抗」格底、正解、數據值、後加虛線格 |
| 骨白 bone | `#F4E7C9` | 24% | 正文、「解決」格底、閱讀面板、結果卡 |
| 骨白次 bone-2 | `#D8C7A2` | — | 次級文字 |
| 骨白暗 bone-3 | `#A8956F` | — | mono 標籤、註記 |

規則：

- 橘與青綠**永不相鄰接觸**（中間必有骨白或酒紅隔開），否則震動刺眼。
- 骨白面板上的強調色只能用 wine 與 ember；青綠在骨白上對比不足，只能當小面積填色。
- 不使用任何漸層當背景（除了地色上那一層 5% 的極淡 radial 暖光），不使用陰影。分隔一律 2px 或 3px 實線。
- 首頁大面積的酒紅必須壓過 30%，否則會變成「白底彩色卡片」的一般網站。

## 三、字體系統

```
標題　　Noto Serif TC 900　　letter-spacing .08–.16em　line-height 1.3
內文　　Noto Sans TC 400/500　16px / line-height 1.8
編號標籤 Space Mono 400/700　10.5–12px　letter-spacing .06–.18em
```

級距：34 / 30 / 23 / 21 / 19 / 17 / 16 / 15.4 / 14 / 12 / 11 / 10.5 / 9.5px。

- 全站**沒有超大字 hero**。最大字級 34px，只用於頁面標題，且該標題永遠在一段實質內容之後或旁邊，不獨占首屏。
- Space Mono 只用於「機構會產生的編號」：卷號、話型號、採錄號、法則號、電話、日期、統計值。看到 mono 就應該是可被引用的識別碼。
- 中文標題字距拉寬到 .08em 以上，讓 900 字重的襯線體有機關公文的沉重感；內文字距為 0。
- 記號格下方的說明文字用 mono 9–10.5px，`word-break:keep-all`。

## 四、版面與網格

- 容器 `max-width:1180px`，左右 padding 24px。桌機 `body{padding-right:168px}` 為右上角導覽保留固定槽位。
- 主軸單位是**帶（band）**：`display:flex; gap:9px; overflow-x:auto`，帶下方 padding 14px，帶身後方以 `:before` 畫一條貫穿的 2px 骨白 20% 水平線（＝口傳的那條線），格子壓在線上。
- 記號格尺寸：主帶 64×77px，比較用小帶 46×55px，圖鑑 54×65px，回執印記 58×70px。四種尺寸，不再增加。
- 兩欄比例固定 `1.28fr .72fr`（左：可讀的內容；右：機構的紀錄）。三欄只用於並排異本，`repeat(3,1fr)`，≤1080px 落為單欄。
- 一切邊框 2px 實線 `rgba(244,231,201,.28~.34)`，標題列另加底部 2px。**無圓角、無陰影、無模糊。**
- 不用置中排版。頁面標題、段落、帶，一律左對齊；唯一置中的是記號格下方的小標。

## 五、元件配方

**眉標列 brow**：`background:var(--wine-d)`，下框 2px。左為機構名（Serif 900 / 19px / letter-spacing .16em），中為英文全名（mono 11px / ember），右為地址電話（mono 11.5px / bone-3，`margin-left:auto`）。這一列取代了傳統的置頂導覽列，只提供身分，不提供連結。

**導覽 relay-ring（口傳環）**：右上角 fixed 132px 的 SVG。一個 r=42 的虛線圓，圓周四個側面人頭（`circle r=8` ＋ `path` 肩線），四頁配於上／右／下／左；圓周上四枚小三角指出順時針的傳遞方向。現用頁那顆頭**填實骨白**、肩線加粗至 4.4px、並在頭部外側長出三道橘色同心語音弧（`opacity:1`）；其餘頁 hover/focus 時語音弧以 .65 透明度浮現。每個節點下方一行 mono 7.4px 的英文頁名。≤900px 整組換成底部四格 sticky dock（現用格填 ember）。

**記號格 tile**：`viewBox="0 0 100 128"`。三層：
1. `<rect x=1.5 y=1.5 width=97 height=119>` 為底，`fill` 與 `stroke` 由職務決定；「後加」職務用 `stroke-dasharray="6 5"`。
2. 核心圖形：`stroke-width:6.4`、`round` 端點與接合、`fill:none`（實心點另用 `<circle>`）。
3. 記號：右上角起，`stroke-width:5`，每多一個記號向下位移 30 單位；數量點畫在 y=124 一列，`r=4`，最多 9 顆。

**職務底色對照（不可改）**：

| 代碼 | 職務 | fill | stroke | 記號色 |
|---|---|---|---|---|
| p | 準備 | none | `#F4E7C9` | `#FF7A1F` |
| v | 加害・違反 | `#FF7A1F` | `#1A0F16` | `#F4E7C9` |
| s | 對抗 | `#3BD1C4` | `#1A0F16` | `#6E1B3C` |
| k | 解決・收場 | `#F4E7C9` | `#6E1B3C` | `#FF7A1F` |
| x | 後加 | none（虛線框） | `#3BD1C4` | `#3BD1C4` |

**節點卡 node**（鏈狀流程）：186px 寬、2px 框、`rgba(0,0,0,.16)` 底。卡與卡之間 26px 間距，以 `:before` 畫 27px 連接線、`:after` 畫一枚 6px 橘色三角箭頭。起點卡加 `.src`：框改骨白、底改骨白 9%。

**按鈕**：主按鈕 Serif 900 17px、骨白底墨字、2px 框，hover 翻 ember。次按鈕透明底、mono 12.5px、骨白 40% 框。**不用圓角、不用漸層、不用陰影。**

**表單**：`.row` 為 `150px 1fr` 的 grid，標籤用 mono 12px；輸入框底 wine-dd、1.5px 骨白 40% 框、focus 時 `outline:2px solid ember`。錯誤訊息用 mono 11.5px ember，且**每個欄位恆保留 1em 高度**避免版面跳動；錯誤文字要寫成人話（「電話格式看起來不對，市話請含區碼。」），不要寫「欄位無效」。

**頁尾**：上框 4px 骨白、底 wine-dd、三欄 `1.4fr 1fr 1fr`。欄標題用 mono 11px ember、letter-spacing .18em。最下一條 disclaimer 用 mono 10.5px bone-3。

## 六、動效規則

只有一個簽名動效，其餘一律不做。

**話帶變異（band mutation）**——當帶的內容改變時：

- **位移**：以 FLIP 實作。重繪前記錄每一格的 `left`，重繪後計算差值 `d`，`element.animate([{transform:'translateX(d px)'},{transform:'none'}], {duration:420, easing:'cubic-bezier(.22,.9,.24,1)'})`。格子不淡入淡出，它們**滑到新位置**，讓「有東西被抽掉了」變成看得見的動作。
- **新增**：`[{transform:'perspective(400px) rotateY(84deg) scale(.7)', opacity:0},{transform:'none', opacity:1}]`，同樣 420ms。新格子像一張牌被翻正。
- **文字**：同步重寫的段落套 `.newp`，`inkin .5s`（`opacity 0→1`＋`translateY(4px)→0`）。只有真的改變的段落才套，沒變的段落不准動。

其他允許的動效只有：hover 時的 `border-color` / `opacity` 變化（≤.2s）。

**禁止**：通用揭示淡入當主視覺、數字滾動計數、按壓硬陰影位移、`stroke-dashoffset` 描繪、視差、自動輪播、跑馬燈。

`prefers-reduced-motion: reduce` 時：全部 `animation-duration` 與 `transition-duration` 降為 .001ms，FLIP 與翻牌整段跳過（程式層以 `matchMedia` 判斷後直接 `return`），`scrollIntoView` 改 `behavior:'auto'`。內容與判定完全不受影響。

## 七、插畫與圖像風格

**技法名稱：motif-glyph 母題記號帶構成。**

全站零外部圖片。所有圖像由一支 `glyph(spec)` 函式產生，`spec = {core, g, marks, dots}`：

- **core（核）**：28 種筆畫式圖形，畫在 100×120 的字身框裡——人／獸／門／夜／口／指／索／樹／鼎／火／冊／水／山／舟／錢／鳥／魚／刀／官／廟／猴／蛇／鬼／仙／田／月／鐘／鹿。每一個核都是 6.4px 等寬圓端筆畫，**不上色、不填面**（眼睛等實心點除外）。新增核時必須維持這個筆畫感，不可以畫成寫實圖示。
- **g（職務底色）**：見第五節表。
- **marks（記）**：5 種修飾——危（斜十字）／異（驚嘆）／問（問號）／升（上箭）／夜（弦月），畫在右上角。
- **dots（點）**：底緣一列圓點，表示數量（次數、天數、人數）。

**組成規則**：一格只能放一個核。要表達兩件事就用兩格；真的合併，那本身是內容上的一次「合併」，要在資料裡標記。**這一條是本風格與一般 icon set 的分界**：icon 是替內容配圖，記號格是內容本身的一個欄位。

與其他技法的分界：
- 與 `flat-shape` 的差別：每一格都能讀回「哪一個母題、擔任什麼職務」，不是自由色塊構成。
- 與 `pixel-sprite` / `thin-lineart` 的差別：它不是等寬裝飾外框，而是帶語意欄位的資料格；把底色拿掉、把職務資訊拿掉，這套技法立即退化成一排線描圖示。
- 與 `pattern-motif` 的差別：不是重複填充，一條帶是一則具體內容的解。

**烘焙原則**：不依賴 JavaScript 的頁面（規範／方法說明頁）必須在建置時把記號格烘成靜態 inline SVG，用同一份 CORE/MARK/GROUND 定義產生，確保與即時渲染完全一致。

## 八、Logo 與 Favicon

**Logo**：一條四格話帶（人・準備／門・加害／獸・對抗／樹・解決）＋右側機構名。帶本身就是本機構最常處理的那則故事的骨架——**logo 是一條可以被讀出來的帶，不是一個符號**。機構名用 Serif 900 46px、字距 8；下方兩行為 mono 英文全名（ember）與中文全名（bone-2）。整塊置於酒紅實底上，無邊框。

**Favicon**：取話帶中最有辨識度的一格，做成 32×32：酒紅滿版底，內縮 4px 的螢光橘方塊，上面用 2.1px 墨紫筆畫畫獸首（含兩枚實心眼點）。**一格即一枚**——favicon 與網站主視覺是同一個系統的最小單位，不另行設計圖形。

## 九、Do & Don't

**Do**

- 先決定資料模型（有哪些母題、每個母題擔任什麼職務），再開始畫。這套風格的視覺完全由資料決定。
- 讓顏色可讀：每一頁至少放一次職務底色的圖例。
- 讓機構會產生的編號到處出現（卷號、案號、日期、統計），並且格式一致。
- 文案用具體的人、地、時間、金額。「陳阿葉（78 歲，務農，員林鎮出水里）」勝過「一位年長的講述者」。
- 至少一個頁面在關閉 JavaScript 時仍完整可讀，且要真的完整——包含全部規則與正解。

**Don't**

- 不要放任何一張「示意插畫」、照片、外部圖示庫。
- 不要用紫藍漸層、不要置中大標＋三張圓角卡、不要 emoji 當圖示。
- 不要把螢光橘降級成小面積點綴色——它是本風格的第二主色，必須有大面積色塊。
- 不要加圓角與陰影。這套語言的所有邊界都是硬的。
- 不要寫「在這個快速變遷的時代，口述傳統正在消失」這種 AI 腔開場。要寫「數字小的那幾種，通常表示最後一個會講的人已經很老了。」
- 不要用跑馬燈、輪播、視差。
- 不要讓 hero 佔滿首屏。首屏第一眼就要看到可操作的內容。

## 十、頁面骨架範例

```html
<body>
  <nav class="ring" aria-label="口傳環導覽">
    <svg viewBox="0 0 150 150" aria-hidden="true">
      <circle cx="75" cy="72" r="42" class="arrow" stroke-dasharray="5 6"/>
      <a href="index.html" aria-current="page" aria-label="採話台（目前頁面）">
        <g class="say" transform="translate(75,30) rotate(-90)">
          <path d="M13 -7a9 9 0 0 1 0 14"/><path d="M19 -12a15 15 0 0 1 0 24"/>
        </g>
        <circle class="head" cx="75" cy="30" r="8"/>
        <path class="body" d="M64 50a11 11 0 0 1 22 0"/>
        <text class="lbl" x="75" y="13" text-anchor="middle">PAGE-EN</text>
      </a>
      <!-- 另外三頁配於 (117,72) / (75,114) / (33,72) -->
    </svg>
    <div class="dock"><!-- ≤900px 的四格保底連結 --></div>
  </nav>

  <div class="brow"><div class="wrap">
    <span class="nm">機構名</span>
    <span class="en">INSTITUTION IN ENGLISH</span>
    <span class="meta">地址・電話</span>
  </div></div>

  <main class="wrap">
    <p class="slugline">卷號 第七・類型 <b>T-01</b>・錄於民國六十三年十一月三日</p>

    <div class="chain"><!-- 節點卡鏈：起點 + 若干處理者 + 加入槽 --></div>

    <div class="bandbox">
      <div class="hd"><h2>話帶</h2><span class="n">母題 <b>13</b> 格</span></div>
      <div class="band">
        <div class="tile">
          <svg viewBox="0 0 100 128">
            <rect x="1.5" y="1.5" width="97" height="119" fill="#FF7A1F" stroke="#FF7A1F" stroke-width="3"/>
            <g fill="none" stroke="#1A0F16" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M28 22h44v88H28zM28 66h44"/>
            </g>
            <g fill="none" stroke="#F4E7C9" stroke-width="5" stroke-linecap="round">
              <path d="M74 10 96 32M96 10 74 32"/>
            </g>
          </svg>
          <div class="cap">開門</div>
        </div>
        <!-- …更多格 -->
      </div>
      <div class="legendrow"><span><i></i>準備</span><span><i class="v"></i>加害</span>…</div>
    </div>

    <div class="cols">
      <div class="prosebox">…可讀的內容（骨白底、墨字）…</div>
      <div class="logbox">…機構的紀錄（暗底、mono 標籤）…</div>
    </div>
  </main>

  <footer>…三欄：機構／頁面／出版…<div class="disc">虛構聲明</div></footer>
</body>
```

CSS 起手式：

```css
:root{
  --wine:#6E1B3C; --wine-d:#4A1029; --wine-dd:#2C0A18; --ink:#1A0F16;
  --ember:#FF7A1F; --mint:#3BD1C4;
  --bone:#F4E7C9; --bone-2:#D8C7A2; --bone-3:#A8956F;
  --ser:'Noto Serif TC',serif; --sans:'Noto Sans TC',sans-serif; --mono:'Space Mono',monospace;
}
body{
  background:var(--wine);
  background-image:
    repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 1px,transparent 1px 4px),
    radial-gradient(140% 70% at 82% -10%,rgba(255,122,31,.16),transparent 62%);
  color:var(--bone); font-family:var(--sans); line-height:1.8;
}
@media (min-width:901px){ body{padding-right:168px} }   /* 為口傳環留槽 */
```
