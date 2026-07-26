---
name: formation-choreography
description: A warm 1970s Taiwanese community-hall style built around dancer tokens on a wooden floor and the interlacing "walked-path traces" of named dance figures; parquet mid-tone ground, kerchief-red and indigo folk roles, mimeographed-songbook typography.
---

# 隊形走位圖風 Formation-Choreography

## 一、設計哲學

這個風格從一件事長出來：**一組人站成一個圈，一個口令下去，全場一起走位。** 它不是資訊網站的皮膚，而是把「呼舞—走位—回原位」這件民俗身體活動，用最少的原語畫在一塊被鞋底磨亮的木地板上。

三個信念：

1. **人是 token，不是插圖。** 舞者一律是圓身＋一顆頭點＋一道肩線的小記號，只用兩種顏色分角色。所有「圖」都由同一支隊形引擎生成——舞者的位置、走過的路徑。沒有一張是「畫」出來的，也沒有一張外部圖片。
2. **線是走出來的，不是描出來的。** 本風格的插畫技法叫**走位跡（formation-trace）**：把某個圖形的走位路徑跑一遍、沿路取樣，串成細線。一張圖＝一段舞。放射線是進退、大圈弧是繞行、小圈是雙人或四人各自轉、反向交織是穿花。看得懂線，就讀得出舞。
3. **暖，但不甜。** 底色是木地板的中明度暖棕，不是米白紙感、也不是糖果撞色。這是一個社區活動中心二樓的氛圍：麥茶、西瓜、三十年的老社員。文案要有具體的人、時間、地址、費用，像真的貼在公佈欄上。

一句話自我審查：拿掉這層皮膚，底下仍有一個**別站沒有的東西**——一組被 named-figure 幾何變換統治、且能被「回原位」規則驗證的隊形系統。

## 二、色彩系統

中明度暖棕木地板為大面積通版底（mid-tone，非 paper-light）。

| 色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 木地板棕 | `#8A5A34` | 全站通版底色（配 herringbone 斜紋疊紋） | ~44% |
| 深棕 | `#734625` | 底色漸深、次級線、印記中心 | ~6% |
| 紙白／米胚 | `#F0E4CE` | 面板、卡片、文件紙面 | ~24% |
| 紙白暗 | `#E7D6B6` | 面板頭、次級底 | ~8% |
| 墨 | `#241A12` | 內文、2px 描邊、token 外輪 | ~9% |
| 硃紅（領巾） | `#C7402B` | 角色 A、現用態、行動按鈕、「移了位」警示 | ≤9% |
| 靛藍 | `#2E5A7A` | 角色 B、次要語意 | ≤5% |
| 草綠 | `#5E8A54` | 「回原位 ✓」徽章 | <3% |
| 黃銅 | `#C79A46` | 圓圈刻度、印記邊、頁碼高光 | <3% |

**分工不可對調**：紅＝角色 A／作用色，藍＝角色 B，綠＝只給「回原位」成功徽章，黃銅＝圈與刻度。底恆暖棕，紙面恆米胚。

## 三、字體系統

全部來自 Google Fonts。

- 標題／品牌：**Noto Serif TC** 900。溫暖有重量的襯線，像手寫招牌與活動中心的匾額。字級：h1 32–34px、h2 22–27px、h3 17–20px。行高 1.15–1.18。
- 內文：**Noto Sans TC** 400／500／700。16px、行高 1.66–1.72。
- 標籤／編號／英文小標／數據：**Space Mono** 400／700。字距 `.06em`。用於頁碼、拍數、社員編號、英文圖形名（CIRCLE LEFT）、mono 讀值——像油印歌本上的鉛字註記。

原則：中文用襯線與黑體，數字與代號用等寬。三者混排即成「油印歌本 × 木匾」的語感。

## 四、版面與網格

- **開場（floor-first）**：首屏不是大標 hero，而是**一塊舞池**。左（主）是圓形舞台卡（正方 aspect-ratio 1/1，內含八個等距 token 站在大圈上），右（副）是呼點面板。內容從「你呼了什麼」長出。刊頭 logo 靠上、以 3px 墨線收邊，統計與品牌敘事排在舞池之後。
- **導覽（figure-ring）**：桌機左上角固定一枚小圓，四頁是圈上四個 token；現用頁那顆翻硃紅、放大、頭點朝內。**不是置頂文字列**。≤820px 收成底部四格 dock（現用格翻紅底）。
- **對稱性**：舞台本身是徑向對稱（圈），但頁面版面刻意不對稱——主副 2:1 或 320px 固定副欄；卡片一律 `box-shadow: 7px 7px 0` 的硬投影、2px 墨框、無圓角。
- 留白中等密度（density: 中等）：資訊分段清楚，但不極簡也不轟炸。分節用 `sec-h`（漢字序號「壹貳參」＋mono 小號）。

## 五、隊形引擎（本風格的核心資產）

這是讓本風格「拿掉皮膚仍有東西」的引擎。任何重現本風格的站都應照此配方實作，題材可換（不一定是土風舞——任何「一組單位受命令做隊形變換」的題材都適用：儀隊、花式游泳、桌球雙打站位、無人機表演）。

**座標系**：N 個單位在半徑 R 的圈上，slot j 的角度 `-90° + j·(360/N)`。`slotPos(j)` 回傳圈上座標。相鄰為一對「舞伴」。

**圖形（figure）= 一次排列 + 一種走法**：每個圖形是一個物件 `{id, zh, en, beats, style, apply(occ)->occ'}`。
- `occ[slot] = 單位id`，記錄目前誰站哪。`apply` 回傳新的 occ（純函數）。
- **回原位圖形**（進退／背對背／勾轉／星／穿花）：`apply` 為單位排列（什麼都沒動）。
- **移位圖形**（大圈左右行＝環面旋轉 ±k；對位互換＝兩兩對調）：`apply` 改變 occ。

**走位（pathOf）**：`pathOf(fig, unitId, fromSlot, toSlot, t)`，t∈[0,1] 回傳 `{x,y}`。依 `style` 分支：
- `radial` 進退：沿自身角度徑向 `R·(1−0.3·sin(πt))`。
- `ring` 繞圈：角度從 `a(from)` 線性到 `a(from)+dir·k·(360/N)`，半徑不變。
- `dosido`／`allemande`：繞舞伴中點的小圓 orbit（背對背略外凸、勾轉半徑收 0.82）。
- `swap`：沿短弧從 from 到 to，角色 A 外凸、B 內凹（`R ± 26·sin(πt)`）避免重疊。
- `star`：四人一組繞子群形心 orbit，半徑先收後放（`0.7+0.3cos(πt)`）。
- `chain` 穿花：角色 A 順時針、B 逆時針各走滿一圈（回原 slot＝單位排列），半徑疊 `16·sin(N·π·t)·dir` 正弦織波，模擬輪流穿肩。
- easing：`t<.5 ? 2t² : 1−(−2t+2)²/2`。

**回原位規則（validity）**：把一支舞的圖形依序把 `apply` 合成，若最終 occ 等於 home 即「回原位」。這給了設計一個真實、可即時顯示的判定：呼一個就合成一次，牌子翻「回原位 ✓／尚未回原位」。移位圖形必須成對收回（左行 k×＝右行 k×；互換做偶數次）。

**渲染**：舞者 token = `<g>` 內含 `<circle r=13 fill=角色色>`＋墨框＋頭點＋肩線＋編號；每幀更新 `transform: translate`。走位跡畫在底層 `<canvas>`：每幀在單位位置點一個半透明小圓（紅／藍依角色），累積成線；換一支舞前清空。**縮圖用 `pathOf` 逐點取樣烘成 `<polyline>` SVG**，靜態頁無 JS 也看得到。

## 六、動效規則

- **動效簽名 = 走位動畫本身**（call-driven walking），不倚賴通用淡入。禁用：揭示淡入當主打、數字計數、按壓硬陰影當簽名、stroke-dashoffset 描繪、跑馬燈／自動輪播／自動播放。
- 每個圖形的時長 ∝ 拍數（`max(520, beats·95) ms`）；圖形之間留 ~140ms 換氣。
- easing 用上述 in-out 二次式，走位有「起步—巡航—到位」的體感。
- **reduced-motion**：`prefers-reduced-motion: reduce` 時，動畫時長設 0（瞬間到位），問答／縮圖改用**烘好的靜態走位跡**，資訊完全不損。
- 表單、篩選、比分為功能性更新，不加裝飾動畫。

## 七、插畫與圖像風格（走位跡 formation-trace）

- 唯一的圖像來源是隊形引擎。**沒有描外形的插圖、沒有外部圖片、沒有 emoji。**
- 舞者 token：圓身（角色色）＋墨框＋米胚頭點＋一道肩線；需要編號時用 mono 小字。
- 走位跡：`pathOf` 取樣成的細線（`stroke-width 2–2.4, opacity .72`），紅線給角色 A、藍線給角色 B，分工不可對調；底線（大圈）用暗棕細虛線。
- 印記（seal）：把社員編號 FNV-1a → mulberry32 決定性生成一枚「圈上八個 token」的圓印，同號恆得同印。
- logo：一圈六個 token 手牽手（黃銅連手弧）＋襯線堂號。favicon：暖棕底＋黃銅圈＋四顆紅藍 token 的 inline SVG data URI。

## 八、Logo 與 Favicon 設計指南

- **Logo**：`viewBox` 約 240×96。左側一枚「隊形徽」——六個 token 均分在一個圈上、相鄰以黃銅細弧表示牽手，紅藍交替；右側堂號用 Noto Serif TC 900 ＋一行 Space Mono 英文副名。徽本身就是引擎邏輯的縮影。
- **Favicon**：32×32，暖棕方底、黃銅圈、上下左右四顆紅藍 token。全部 inline SVG，寫成 `data:image/svg+xml,%3Csvg…`，不連外。

## 九、Do & Don't

**Do**
- 先想「一組單位怎麼被命令變隊形」，再配皮膚。核心互動要能被一條規則驗證（回原位／隊形正確與否）。
- 用暖棕木地板中明度底、紅藍兩角色、綠只給成功徽章。
- 文案具體：真人名、真地址、真時刻、真費用（本站為虛構示意，但要「像真的」）。
- 縮圖與問答一律烘成靜態走位跡，確保無 JS 與 reduced-motion 可用。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋兩顆按鈕＋三張圓角卡」。
- 不用 emoji 當 icon、不用 Lorem ipsum、不用「在當今快節奏的世界」式 AI 腔。
- 不用「EST. 19xx」年份徽章、不用「老街屋改建」開場、不用「把 X 變成 Y」標題句式。
- 不放跑馬燈當反射動作；不把通用淡入當動效簽名。
- 米白紙感底暫禁——這個風格的底是木頭色。

## 十、頁面骨架範例

```html
<!-- 舞池卡（floor-first 開場核心） -->
<div class="floorcard">
  <div class="hd"><h1>呼舞台</h1><span class="k">四對舞者・大圈</span></div>
  <div class="stage">
    <canvas id="trace" aria-hidden="true"></canvas>   <!-- 走位跡 -->
    <svg viewBox="0 0 400 400" role="img" aria-label="八位舞者圍成的大圈">
      <g id="floordeco"></g>   <!-- 圈刻度、中心醒目點 -->
      <g id="dancers"></g>     <!-- 八個 token，engine 每幀 translate -->
    </svg>
  </div>
  <div class="readout">
    <span class="badge home">回原位</span>   <!-- 綠=home / 紅棕=away / 黃銅=走位中 -->
    <span class="k">舞序 0 拍</span>
  </div>
</div>
```

```js
// 圖形物件：一次排列 + 一種走法
var CIRCLE_L = {
  id:'circle_l', zh:'大圈左行', beats:8, style:'ring', dir:1, span:2,
  apply:function(o){ var n=[]; for(var s=0;s<N;s++) n[(s+2)%N]=o[s]; return n; }
};
// 判定回原位：把整支舞的 apply 依序合成，比對 home
function isHome(seq){
  var o=HOME.slice(); seq.forEach(function(id){ o=FIG[id].apply(o); });
  return o.every(function(v,i){ return v===HOME[i]; });
}
```

驗收：一個沒看過 Demo 的 AI，只讀本檔，應能做出「一組單位在場上受命令走隊形、且有一條規則即時驗證隊形是否成立」的全新網站——換個題材（儀隊、花式游泳、雙打站位）也成立。
