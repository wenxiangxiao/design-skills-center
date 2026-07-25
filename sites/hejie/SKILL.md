---
name: lacquer-board-duotone
description: A vermilion-and-indigo duotone visual language built entirely from an engraved-disc game-piece engine — every image (the board's two coloured territories split by a river, endgame thumbnails, logo, favicon, seals) is a rendered board position, never a drawing; bone discs carry vermilion or ink glyphs, gold hairlines mark the palace, and the identity lives in a playable rules engine rather than decoration.
---

# 漆枰朱墨風 Lacquer-Board Duotone

一套為「棋枰／盤面遊戲」而生的視覺語言。它的核心命題不是把棋盤畫得漂亮，而是把整套視覺**收束成一具棋子引擎**：畫面上每一張圖——核心對局盤、殘局縮圖、走法示意、logo、favicon、報名棋印——都是同一支引擎照一組座標渲染出來的**棋盤局面**，無一張是描摹的、無一張外部圖片。底盤刻意做成 **靛墨×硃紅的雙色域**：一半染靛、一半染硃，中央一道金字河界把它切成兩塊領土（楚河漢界）。骨白的圓形棋子浮在其上，硃紅或墨黑的雕字分辨敵我。

風格的骨子裡是一間棋院的秩序感：不誇張、不漸層、不圓角泡泡；只有交叉線的網格、金線分格的九宮、實心圓的棋子，與一種「每一張圖都能讀回一個座標、一個局面」的嚴謹。這套風格與內容分離——它定義的是「盤面遊戲的視覺語言」，可套在任何以棋盤／格子為核心的產業上，不綁定象棋。

## 一、設計哲學

1. **不畫，而擺（render, don't draw）。** 這是全風格的第一原則。盤面不是自由繪畫，而是一組可序列化、可複現的座標（`[列, 行, 子型, 方]`）。任何採用本風格的站，其視覺主體都應由一組結構化參數（一份局面資料）驅動生成，而非手貼 PNG。同一份局面由任何人渲染，結果一致——這是本風格「去AI化」最強的訊號：圖是規則與座標的解，不是模型的品味。
2. **雙色域即領土。** 底盤是兩塊對峙的色場：靛墨 `#1E2C3E` 一側、硃紅 `#D0402E` 一側，中間一道金字分界。這不是裝飾漸層，而是把「兩軍隔河對壘」直接畫進底色。深靛作頁面統一底，硃紅作標題、現用態、紅軍與己方領土的主色。
3. **棋子是唯一的圖元。** 一顆棋子＝一個骨白實心圓＋一圈雕字內線＋一個硃或墨的字。所有圖像都由這一種圖元的陣列構成：一張「圖」就是一批棋子擺在座標上。logo 是兩顆對望的子、favicon 是一顆子、殘局縮圖是一整盤子、報名棋印是由雜湊生成的一盤子。
4. **規則會拒絕你。** 本風格的靈魂是背後那具會執行規則的引擎——它判定哪一步合法、哪一步將軍、哪一步將死。介面因此有了「會說不」的骨氣：非法的落子不予接受，被將的一方必須應將。風格的識別性來自這具引擎，而非皮膚。
5. **一切可讀回座標。** 盤面在變，右側的著法記錄同步在變（國字記譜：子名・縱線・進退平）。使用者永遠能把眼前的盤讀成一行字、也能把一行字擺回盤上。

## 二、色彩系統

雙色域＋骨白＋金，比例指全站像素佔比的概略值。

| 名稱 | Hex | 角色 | 用量比例 |
|---|---|---|---|
| 靛墨（底） | `#1E2C3E` | 全站大面積底色、黑方領土場 | ~44% |
| 靛墨深 | `#182333` / `#1c2a3d` | footer、panel2、盤底 | ~14% |
| 靛墨面板 | `#243449` | card、panel | ~12% |
| 硃紅 | `#D0402E`（深 `#a8321f`） | 標題強調、現用態、紅軍字、己方領土場、主要按鈕 | ~9% |
| 骨白 | `#EDE1C8`（次 `#c9bd9f`） | 棋子面、格線、主要文字、盤面亮部 | ~14% |
| 金黃 | `#D8A63C` | 九宮金線、河界字、現用標記、kicker、選中態 | ~4% |
| 松綠 | `#4E8E6E`（亮 `#9fd6ba`） | 次級語意（主題標籤、安全提示） | <3% |

**雙色域規則**：頁面底一律靛墨；棋盤上半（黑方）疊一層 `rgba(34,50,71,.55)` 更靛，下半（紅方）疊一層 `rgba(208,64,46,.13)` 微硃——兩塊領土一眼可辨。棋子恆為骨白圓底：紅軍描邊與字用硃紅 `#D0402E`、黑軍用墨 `#1A1512`。狀態不靠換底色，而靠：現用＝金框、上一手＝金色虛線、將軍＝硃紅光暈。

## 三、字體系統

三族分工，全部取自 Google Fonts：

- **Noto Serif TC**（`500/700/900`）：所有中文標題、棋子雕字（`700`）、品牌字（`900`）、殘局局名。棋子字務必用襯線體，方正有雕感。字級 scale：品牌 23px／大標 `clamp(26px,4.6vw,40px)`／`h2` 20–24px。
- **Noto Sans TC**（`400/500/700`）：正文、說明、表單、按鈕。行高 `1.7–1.78`。
- **Kode Mono**（`500/600`）：kicker 小標（`letter-spacing:.34em; text-transform:uppercase`）、著法記錄、留位號、`?p=` 局面碼、頁碼式導覽小標、費用。等寬體的機械感與棋院的秩序相配。

## 四、版面與網格

- **不對稱雙欄。** 對弈廳為 `minmax(0,1fr) 340px`（棋盤舞台｜對局控制）。殘局譜為 3 欄卡牆（`repeat(3,1fr)`，≤900px 轉 2 欄、≤560px 單欄）。弈法為 `200px minmax(0,1fr)`（目錄｜正文）。報名為 `minmax(0,1fr) 300px`（表單｜須知）。
- **交叉線網格、零圓角。** 棋盤是九直十橫的線網，棋子落在**交叉點**上（非格子中）。panel 用 `1px solid rgba(237,225,200,.22)`；棋盤框四角以 `::before/::after` 畫金色 L 形角標。一律 `border-radius:0–3px`。
- **首屏即盤面。** 不設 hero 大標——第一屏就是一局可操作的棋盤局面（局面直開場）。棋盤 viewBox `0 0 900 1000`（9×10，交叉點在 `(c·100+50, r·100+50)`）。
- **棋子尺寸隨盤縮放。** 以 `--sq:clamp(30px,8.6vw,52px)` 控制格距，棋子為格距的 82%，手機上自動縮小不破版。

**棋盤幾何（務必沿用）：** 9 條直線 × 10 條橫線；中央第 4–5 橫之間為河界空帶，寫金字「楚河・漢界」；兩端 `列3–5 × 橫0–2 / 橫7–9` 為九宮，以兩條金色對角線標記。棋子座標系：`r=0` 為上方（黑方底線），`r=9` 為下方（紅方底線），`c=0..8` 由左至右。

## 五、元件配方

- **棋子（core disc）：** `border-radius:50%`；面為 `radial-gradient(circle at 38% 32%, #fff8ea, #EDE1C8 62%, #c9bd9f)` 做出骨質微凸；`box-shadow:0 2px 4px rgba(0,0,0,.45)` 使其浮起；`border:2.5px solid` 硃或墨；內側 `::after` 再描一圈 1px 同色細線（雕字盤的雙線邊）。字用 Noto Serif TC 700，字級為格距的 0.5。
- **九宮將位導覽（nav）：** 桌機右上角一個 `井` 字九宮 SVG（外框＋兩對角線＋中心點），四頁配在對角十字的四個端點上，各為一枚小方牌（頁名＋羅馬頁碼小標）；現用頁翻硃紅底、金框、微放大。行動版（≤820px）降為頂部等寬四格 sticky 列。**非置頂文字列**——它是有「將帥在九宮斜線上落位」隱喻的角落導覽。
- **按鈕：** 方角 `border-radius:2px`；預設 `background:#1c2a3d; border:1.5px solid var(--line)`；hover 邊框轉金；主要動作（新局、擺上對弈廳）用硃紅實底、hover 轉深硃並鑲金框。切忌圓角膠囊與模糊陰影。
- **卡片（殘局／班別）：** 靛墨面板、1px 細線、`border-radius:3px`；hover 邊框轉金、`translateY(-2px)`。殘局卡上緣為程序生成的盤面縮圖（同一支引擎），下方為局名＋主題／難度標籤＋子力＋解說＋「擺上對弈廳」硃紅鈕。
- **著法記錄：** Kode Mono 等寬三欄表（回合數／紅著／黑著），紅著硃紅、黑著淺靛，捲動容器 `max-height` 固定。
- **footer：** 三欄（院訊／院內連結／時間地點）＋跨欄細線註記；靛墨深底、金色小標。

## 六、動效規則

識別性來自核心對弈，動效克制。全部避開四項過載語彙（揭示淡入／數字計數／按壓硬陰影／dashoffset 描繪）。

- **落子：** 選子時棋子 `transform:scale(1.04)` 並鑲金框（`.12s ease`）；落點以金色小圓點提示，可吃之點為金色空心環。移動即重繪，不做飛行補間。
- **院手回手：** 使用者落子後延遲 `~420ms`（reduced-motion 下 `60ms`）再由搜尋演算走子，模擬「思考」的節奏——這是功能性延遲，非裝飾動畫。
- **將軍：** 被將的將（帥）棋子 `box-shadow` 轉硃紅光暈（狀態變化，非閃爍動畫）。
- **toast：** 提示訊息從底部 `translateY(20px)→0` 淡入 `.25s`。
- **reduced-motion：** 全域 `*{transition:none!important}`；院手延遲縮到最短；核心玩法（落子、判定、記譜）完全不減。

## 七、插畫與圖像風格

技法名 **xiangqi-relief 象棋子雕構成**：全站沒有一張描外形或自由色塊的插圖——所有圖像都是棋子引擎照座標渲染的盤面。三種身分共用同一支引擎：

1. **一張「圖」＝一批棋子。** logo 是一枚硃帥與一枚墨將隔金色河界對望；favicon 是一枚硃帥圓子；殘局縮圖是一整盤棋子；報名棋印是由留位號經 FNV-1a→mulberry32 決定性生成的一盤棋子（同號恆得同印）。
2. **走法示意** 也由引擎生成：實心子為該子、金色空心環為它此刻能走到的交叉點。
3. **分工不可對調：** 棋子面恆骨白、紅軍字硃紅、黑軍字墨、格線骨白、九宮線與河界字與現用標記金。換一批座標就是換一張圖。

與 flat-shape 自由色塊的差別：每一枚圓都有「子」的語意（可讀回是哪一子、哪一方、在哪一格）、且受規則約束；與 hanabi-mon 放射家紋、volvelle-astral 曆輪、emblazon-heraldic 盾徽的差別：本技法的圖元是棋盤網格上的棋子，圖＝一個局面。

## 八、Logo 與 Favicon 設計指南

- **Logo：** 一枚硃紅描邊的「帥」圓子與一枚墨黑描邊的「將」圓子，錯位對望，中間一道金色虛線河界；右側配「河界棋院」Noto Serif TC 900 ＋ Kode Mono 英文小標。存為 `assets/logo.svg`，無 JS 亦可見。
- **Favicon：** 單一枚硃帥圓子（骨白底＋硃紅雙描邊＋硃紅「帥」字），以 inline SVG data URI 寫在 `<head>`。
- 兩者都是「棋子引擎」的最小輸出，與全站圖像同源。

## 九、Do & Don't（含去AI化禁令）

**Do：** 首屏即可操作的盤面；棋子落在交叉點；雙色域分領土；金線九宮；棋子引擎渲染一切圖像；國字著法記譜；規則引擎會拒絕非法動作；reduced-motion 與鍵盤操作與 `<noscript>` 保底。

**Don't：** ✗ 紫藍漸層 hero ✗ 置中大標＋兩鈕＋三圓卡 ✗ 圓角膠囊按鈕＋模糊陰影卡 ✗ emoji 當 icon（一律棋子 SVG）✗ Lorem ipsum 與 AI 腔 ✗ 跑馬燈反射式套用 ✗ EST.19xx 徽章 ✗「把 X 變成 Y」句式 ✗ 把棋子畫成 PNG 或裝飾插圖（必須由座標渲染）✗ 用米白紙感當底（本風格底為靛墨雙色域）。

## 十、頁面骨架範例（可直接使用）

棋盤容器與棋子渲染的最小骨架：

```html
<div class="board" style="position:relative;width:calc(var(--sq)*9);aspect-ratio:9/10">
  <svg class="grid" viewBox="0 0 900 1000" preserveAspectRatio="none"><!-- territory rects, lines, palace diagonals --></svg>
  <div class="riverlab"><span>楚 河</span><span>漢 界</span></div>
  <!-- pieces: absolutely positioned buttons at ((c+0.5)/9*100)% , ((r+0.5)/10*100)% -->
</div>
```

```css
:root{--ink:#1E2C3E;--bone:#EDE1C8;--red:#D0402E;--gold:#D8A63C;--sq:clamp(30px,8.6vw,52px)}
.pc{width:82%;aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-family:"Noto Serif TC",serif;font-weight:700;
  background:radial-gradient(circle at 38% 32%,#fff8ea,var(--bone) 62%,#c9bd9f);
  box-shadow:0 2px 4px rgba(0,0,0,.45);border:2.5px solid var(--red);color:var(--red)}
.pc.b{border-color:#1A1512;color:#1A1512}
```

驗收標準：一個從未看過 Demo 的 AI，只讀本 SKILL，就能做出一個以「棋盤局面／格子遊戲」為核心、靛墨×硃紅雙色域、棋子引擎渲染全站圖像、首屏即可操作、規則引擎會拒絕非法動作的全新網站——不必是象棋（可以是圍棋、跳棋、任何格子盤面）。
