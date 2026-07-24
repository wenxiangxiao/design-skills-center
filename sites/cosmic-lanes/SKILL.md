---
name: cosmic-lanes
description: A vivid-bold 1980s American-diner-bright visual language for "living" leisure sites — electric turquoise fields, clashing tangerine/bubblegum/lemon accents, hard offset shadows on plastic-feel chunky components, bowling-lane-arrow illustration primitives, and a deterministic pseudo-multiplayer live board as the centrepiece.
---

# 太空球館活榜風 Cosmic-Lanes

一套為「活著的休閒場所」設計的視覺語言：明亮到刺眼的電光土耳其藍大面積底、橘／粉／黃三色高飽和撞色、翻硬陰影的塑膠感厚邊元件，配上由球道箭矢與球瓶三角組成的原生插畫，以及一塊**確定性偽即時多人**的即時榜作為全站心臟。它的骨子裡是 1983 年一間美式保齡球館在週三夜聯盟開打時的那種喧鬧、明亮、有人味的能量——不是冷靜的儀表台，是一個「現在很多人都在這裡」的地方。

## 一、設計哲學

1. **明亮即態度。** 這套風格刻意反其道而行：不用深色沉穩底，而是把整個視窗塗成一面電光土耳其藍。亮，是為了讓人一進來就覺得「這裡開著、熱鬧、歡迎你」。深色留給 `<header>` 的即時榜與球道，形成亮底上的暗塊對比。
2. **撞色而非漸層。** 嚴禁任何漸層當主視覺（尤其紫藍漸層）。顏色一律是硬邊的實色塊：土耳其藍配橘、配粉、配黃，四色互撞、各司其職，靠明度與色相差製造層次，不靠柔化。
3. **塑膠感的厚度。** 一切元件都有 2.5px 的墨線描邊與一段**不模糊、不透明**的硬位移陰影（`box-shadow: 6px 6px 0`），像模製塑膠零件疊在桌上。按下去陰影收短、元件位移，是實體按鈕的手感。注意：硬陰影是本風格的**質感基底**，不是拿來當唯一動效簽名的招式。
4. **活，是設計目標而非裝飾。** 本風格的核心命題是「讓頁面看起來有別人在」。任何採用它的站，都應該有一塊由 `f(seed, 時間)` 驅動、看似有他人同時參與、且使用者能真正加入的即時狀態。拿掉它，這套皮膚只剩好看的塑膠；有了它，它才是宇宙球道。

## 二、色彩系統

| 名稱 | Hex | 角色 | 用量比例 |
|---|---|---|---|
| 電光土耳其 rink | `#12B5AC` | 全站大面積底色 | ~42% |
| 深土耳其 rinkd | `#0A7C76` | 底上的深塊、球內漸深、次要文字 | ~6% |
| 火焰橘 tang | `#FF5A1F` | 面板標頭、球道箭矢、kicker、主結構強調 | ~12% |
| 泡泡糖粉 gum | `#FF3D8B` | 主要行動按鈕、當前態、YOU、重點強調 | ~9% |
| 檸檬黃 lemon | `#FFD400` | 星芒、甜蜜點、標籤高亮、即時榜當前列 | ~8% |
| 深茄墨 ink | `#1E1330` | 所有描邊、正文、球、即時榜底、footer | 結構色 |
| 奶油白 cream | `#FDF4DA` | 卡片／計分卡／面板底 | ~20% |
| 奶油白2 cream2 | `#F2E4BE` | 次級卡片、cell 底 | 輔助 |

**規則：** 底色永遠是亮的（rink）；深色（ink）只用於文字、描邊、與需要對比的暗塊（即時榜、球道、footer）。橘／粉／黃三強調色各綁固定語意，不可混用（橘＝結構標頭與導引、粉＝行動與「你」、黃＝高亮與甜蜜點）。三強調色合計不超過約 30%，避免變成雜亂的糖果罐。禁止任何 `linear-gradient` 作大面積背景。

背景可加**極淡的星點**（四五個 `radial-gradient` 白／黃小圓點，透明度 .10–.16，半徑 7–9%）製造「宇宙」微紋，但不得形成方向性漸層。

## 三、字體系統

- **標題／logo／按鈕：** `Baloo 2`（700–800）。圓角、飽滿、有招牌感的無襯線，撐起「球館霓虹招牌」的親和力。字級：h1 34px、h2 24px、h3 16px；`line-height:1.12–1.14`。
- **內文：** `Archivo`（400–600）。中性、清楚、可讀性高，襯托標題的個性。14–14.5px。
- **數字／標籤／即時榜／計分：** `Kode Mono`（500–700）。等寬，讓比分、時鐘、代號、frame 標記像記分螢幕上的字。11–16px，字距 `.04–.24em`（標籤拉大字距）。

中文正文以 `Archivo` 後接 `system-ui` 承載即可（本風格英數為主）；若整站中文較多，可將內文改為 `Noto Sans TC` 但標題仍用 `Baloo 2` 維持招牌感。**不要**只用系統字堆疊而無字體個性。

## 四、版面與網格

- **主容器：** `max-width:1160px`，左右 padding 20px。
- **首頁主結構：** 左「操作台／內容」+ 右「384px 即時榜」的雙欄（`minmax(0,1fr) 384px`），940px 以下疊為單欄。即時榜是視覺與功能的雙主角，不可縮成小側欄。
- **不對稱：** 面板標頭用橘色實色條、內容區用奶油白，形成上暗下亮的分帶；卡片以硬陰影錯開、彼此不對齊到同一基線。
- **留白：** 中等密度。區塊間距 24–26px，卡片內 padding 14–22px。不要塞到極密，也不要空到冷清——要像球館：熱鬧但走得動。
- **底部固定導覽**佔用 104px，`body` 需 `padding-bottom:104px` 避免內容被蓋。

## 五、元件配方

**面板 `.panel`**
```
background:var(--cream);border:2.5px solid var(--ink);border-radius:14px;
box-shadow:6px 6px 0 rgba(30,19,48,.28);
```
標頭 `.phd`：`background:var(--tang);color:var(--cream);border-bottom:2.5px solid var(--ink);` 圓角只在上緣。標頭右側放 `Kode Mono` 標籤膠囊（`background:var(--ink);color:var(--lemon)`）。

**按鈕 `.btn`**
```
background:var(--gum);color:var(--cream);border:2.5px solid var(--ink);border-radius:10px;
font-family:"Baloo 2";font-weight:800;box-shadow:4px 4px 0 var(--ink);
```
hover 位移 `translate(-1px,-1px)` 且陰影加長到 5px；active 位移 `translate(3px,3px)` 陰影縮到 1px（按下去的實體感）。次要按鈕 `.ghost` 換 `cream` 底、`ink` 字。

**導覽（bottom-dock 變體：球道選擇列）**
底部固定深墨條、上緣 3px 檸檬黃線。每頁一個「球道」：等寬 flex，各含 `01/02/03` 小號、`Baloo 2` 大標、`Kode Mono` 英文小標。當前頁上緣長出一段粉色短塊（像那條道上了球），標題轉黃。語意：一條被點亮的球道＝目前這一頁。

**計分卡 `.frames`**
十格橫向 flex，2.5px 墨線描邊、格間 2px 分隔；每格上緣深墨小號碼、中列 1–2（第十格 3）個球結果小格、底列大號累計總分。當前格填檸檬黃底。全倒記 `X`、補中記 `/`、洗溝記 `-`。行動裝置以 `overflow-x:auto` 橫向捲動，`min-width:520px`。

**即時榜列 `.lgrow`**
`grid-template-columns:30px 1fr 54px 46px`（名次／名字＋綽號／即時分／frame）。名次與分數用 `Kode Mono`；「你」那列 `.you` 翻檸檬黃底、內描 2.5px 墨線、名次轉粉。虛線分隔 `1.5px dashed`。

**表單**
輸入框 2.5px 墨線、8px 圓角、奶油白底；focus 時 `outline:3px solid var(--gum)`。label 用 `Kode Mono` 小字。錯誤訊息橘色 `Kode Mono`，預留 `min-height` 防跳動。

**footer**
無邊直接在土耳其藍底上排三欄，`Baloo 2` 粗標＋細節；底部一段 `--rinkd` 小字免責聲明（人名價目虛構、模擬非真實連線、零外部圖片、建置模型標示）。

## 六、動效規則

- **即時榜跳動（功能性核心，非裝飾）：** `setInterval(update, 1500)`。每次重算所有球員 `f(seed, now)` 的即時分並重排；`Kode Mono` 數字直接替換即可，不需華麗過場。
- **跑馬燈 ticker：** 僅用於即時榜上方的事件帶（「★ Rosa 第 7 格 STRIKE！」）。`transform:translateX` linear 26s 無限。**這是本風格少數允許的跑馬燈，因為它承載真實事件流、是活榜語彙的一部分**——不要在別處再加第二條裝飾跑馬燈。
- **livedot 呼吸：** 12px 粉點 `opacity` 1↔.35，1.6s ease-in-out，外加 4px 粉色光暈。
- **投球：** 球 `bottom` 由 14px 衝到 120px、`left` 移到瞄準位置，`.5s ease-in`；球瓶倒下 `transform:translateY(46px) rotate(58deg);opacity:.14`，`.34s cubic-bezier(.5,-.4,.5,1.4)` 帶一點回彈。
- **瞄準指針：** `requestAnimationFrame` 每幀 `aimPos += 1.7`，撞邊反向；粉色指針在黃色甜蜜點內按下＝高準度。
- **按鈕：** 見上，位移＋硬陰影伸縮。
- **`prefers-reduced-motion:reduce`：** 關閉 ticker 動畫（改靜態並列）、關閉 livedot 呼吸、球與指針改瞬移；**瞄準改用 `<input type=range>` 滑桿**讓使用者手動對準甜蜜點——核心玩法在降級下仍完整可玩。

## 七、插畫與圖像風格（lane-diagram 球道箭矢構成）

**所有圖像都由保齡球館的既有幾何原語組成，不描外形、不用外部圖片：**

- **球道箭矢（dart/arrow）：** CSS 三角（`border` 技法）或 SVG polygon，橘／黃／粉交錯排成 V 形，是最核心的裝飾母題。
- **球瓶（pin）：** 圓角矩形瓶身（`border-radius:11px 11px 8px 8px/16px 16px 6px 6px`）＋兩道紅頸環，奶油白填、墨線描。十瓶排成標準等腰三角（座標見下）。
- **保齡球（ball）：** 圓形，`radial-gradient` 由亮土耳其到深土耳其做出球面高光（此為元件內的球面反光，非背景漸層，允許），三個指孔為小土耳其藍圓。
- **彗星星芒（comet star）：** 五角星＋墨線描邊，配一道拖尾，用於 logo 與 favicon，呼應「宇宙 Cosmic」。

十瓶標準座標（190×118 的 deck，單位 px）：
```
[95,6] [78,30][112,30] [61,54][95,54][129,54] [44,78][78,78][112,78][146,78]
```

**Logo：** 「COSMIC / LANES」兩行 `Baloo 2` 800，COSMIC 橘、LANES 奶油白，皆帶 1.4px 墨描與硬陰影；左側一枚「保齡球＋斜橢圓軌道＋彗星星芒」emblem；底部一行 `Kode Mono` 小字（`宇宙球道 · EST 1983 · MI`）。

**Favicon：** 32×32 圓角方塊填土耳其藍，上半一枚黃色五角星、下半一顆帶三指孔的墨色保齡球。以 inline SVG data URI 寫進 `<head>`。

## 八、Do & Don't

**Do**
- 底色維持明亮土耳其藍，深色只給文字／描邊／即時榜／球道。
- 每個元件都要有墨線描邊＋硬位移陰影，維持塑膠厚度感。
- 一定要有一塊「活」的即時狀態（偽即時多人／即時榜），且使用者能真正加入。
- 三強調色各守語意，比分與標籤用等寬 `Kode Mono`。
- 文案具體可信：地址、電話、價目、人名、營業時間、聯盟季數，全部落地（但標明虛構示意）。

**Don't（含去AI化禁令）**
- ✗ 任何漸層當背景／hero（尤其紫藍漸層）。
- ✗ 「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板；本風格開場是**活榜直開場**（首屏即跳動的即時榜與可操作的投球台）。
- ✗ emoji 當 icon——星芒、球瓶、箭矢一律自繪 SVG／CSS。
- ✗ 模糊的柔陰影 rounded-2xl 卡片——陰影必須硬、不透明、有位移。
- ✗ Lorem ipsum 或 AI 腔（「在當今快節奏的世界」）。
- ✗ 把即時榜做成只會捲動的裝飾跑馬燈——它必須由真實狀態驅動、可被使用者加入。
- ✗ EST. 19xx 徽章當主視覺、「把 X 變成 Y」標題句式。

## 九、頁面骨架範例（可直接使用）

```html
<header class="top"><div class="wrap">
  <div class="brandrow">
    <img class="logo" src="assets/logo.svg" alt="品牌名">
    <p class="tagline">一句有態度的招牌文案。</p>
  </div>
  <!-- 活榜狀態條：livedot + 時鐘 + 事件 ticker -->
  <div class="livebar">
    <span class="livedot"></span>
    <span class="now" id="liveNow">LIVE 20:41:07</span>
    <div class="tickerwin"><span class="tickerline" id="ticker">事件流…</span></div>
  </div>
</div></header>

<main class="wrap">
  <div class="board"><!-- minmax(0,1fr) 384px -->
    <section class="panel"><!-- 左：可操作核心台 -->
      <div class="phd"><h2>操作台</h2><span class="tag">READY</span></div>
      <div class="lanewrap">…</div>
      <div class="gamefoot"><button class="btn">主要動作</button>
        <span class="callout" aria-live="polite">回饋文字</span></div>
    </section>
    <aside class="panel"><!-- 右：偽即時多人活榜 -->
      <div class="phd"><h2>即時榜</h2><span class="tag" id="onlineTag">24 人在線</span></div>
      <div class="league" id="league"><!-- setInterval 重排 --></div>
    </aside>
  </div>
</main>

<nav class="dock"><div class="lanes">
  <a href="index.html" aria-current="page"><span class="no">01</span><span class="lbl">頁一</span><small>ONE</small></a>
  <a href="p2.html"><span class="no">02</span><span class="lbl">頁二</span><small>TWO</small></a>
  <a href="p3.html"><span class="no">03</span><span class="lbl">頁三</span><small>THREE</small></a>
</div></nav>
```

**偽即時多人的最小骨架**（本風格的靈魂）：
```js
// 每個成員一個 seed；此刻狀態 = f(seed, wall-clock)
function memberState(m, now){
  var gi = Math.floor((now + m.phase) / CYCLE_MS);     // 第幾輪
  var p  = ((now + m.phase) % CYCLE_MS) / CYCLE_MS;      // 0..1 進度
  var rolls = simGame((m.seed ^ (gi*2654435761))>>>0, m.skill); // 該輪確定性劇本
  return liveScore(rolls, Math.floor(p*STEPS)+1);       // 進度換算即時值
}
setInterval(function(){
  var now = Date.now();
  var rows = members.map(m => ({name:m.name, v:memberState(m, now)}));
  if(userJoined) rows.push({name:"你", v:userLiveValue, you:true});
  rows.sort((a,b)=> b.v - a.v);
  render(rows);                                          // 重排 = 活著
}, 1500);
```
關鍵：整場是 `f(seed, 時間, 使用者動作)` 的**純函數**——換誰看、重整幾次都一致，離線期間可重算而非暫停；使用者的真實成績以同一套規則注入同一榜單。這就是「看起來有別人在」的由來，也是這套風格與一般漂亮海報的分野。

---

*本 SKILL 對應範例站：`sites/cosmic-lanes/`。由 Claude Opus 4.8 於 2026-07-24 撰寫（排程 Agent 自動執行）。*
