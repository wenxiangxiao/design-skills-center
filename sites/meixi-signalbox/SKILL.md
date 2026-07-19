---
name: interlocking-frame
description: A saturated signal-green railway signal-box aesthetic built from graduated scales, semaphore colour codes and 2px white rules, where the interface itself enforces rules and refuses the user with a stated reason.
---

# 機械連鎖桿架風 Interlocking-Frame

## 一、設計哲學

這個風格的核心不是「鐵道懷舊」，是**規則的可見性**。

一般網頁的預設倫理是「使用者永遠是對的」：按鈕不能按就變灰，錯了就顯示一行淡淡的紅字。連鎖桿架風反過來——**介面是一台有立場的機器**。它會擋，而且擋得理直氣壯：不是「此欄位為必填」，是「第 3 號桿被第 4 號鎖錠桿鎖住。鎖錠桿在反位時，轉轍器不得動作」。拒絕本身是內容，是這個風格最重要的一句話。

由此推出三條美學原則：

1. **顏色是編碼，不是裝飾**。號誌世界裡紅黃綠白黑藍各有職務，同一個顏色在整站只能有一個意思。紅＝停止／拒絕／主號誌；黃＝注意／數值／可讀取的量；白＝結構線與文字；綠＝場（地色）。不准為了好看把紅色拿去當標題色。
2. **圖像要能讀值**。這個風格的插圖不是示意圖而是量表：運轉圖、諾模圖、里程坡度表、姿態量角圖。每張圖都附刻度，每個刻度都對應真的數字。看不出值的圖不畫。
3. **密度即專業**。留白在這裡不是優雅，是資訊不足。頁首資訊帶、六欄表格、mono 字級 11–12.5px，是這個風格的正常呼吸。

適用產業不限鐵道：任何「規則本身就是產品」的題材都成立——航管、電力調度、實驗室安全、船舶檢驗、藥品交互作用、稅務合規、化工聯鎖、醫療器材校正。凡是「使用者想做的事有時就是不該被允許」的領域，這個風格會比任何柔和的介面誠實。

## 二、色彩系統

| 色名 | hex | 用途 | 面積比 |
|---|---|---|---|
| 號誌綠 signal green | `#0B7A3E` | 全站地色、按鈕 hover 底 | 約 55% |
| 深綠墨 deep ink green | `#05512A` | 面板、表頭、頁尾、卡片底 | 約 25% |
| 夜黑綠 night green | `#02160D` | 畫布底、記錄視窗、輸入框底 | 約 5% |
| 臂木紅 arm red | `#E33A1B` | 主號誌臂、拒絕訊息、基準線、警示 | 約 6% |
| 遠方黃 distant yellow | `#F5B301` | 遠方號誌臂、所有數值、選取態、刻痕 | 約 4% |
| 燈白 lamp white | `#F4F1E4` | 文字、2px 線框、軌道線 | 約 5% |
| 鎖錠藍 lock blue | `#7FC0F0` | 僅用於「已鎖定」狀態 | <1% |

規則：

- **地色必須是飽和中間調的綠**，不可退成墨綠黑（那是深色典雅家族，不是本風格）。明度 25–30%、飽和度 80% 上下。
- 紅與黃**只用在有語意的地方**。全站找不到第二個純裝飾用的紅色塊。
- 深綠墨面板上再疊夜黑綠的畫布，形成「地色 → 面板 → 儀器」三階層次，全部靠 2px 燈白線框分隔，**不用陰影、不用圓角**。
- 唯一允許的陰影：固定導覽元件的 `6px 6px 0 rgba(4,32,17,.55)` 硬投影（實心、無模糊）。

配色移植到別的產業時，可換色相但必須保留結構：**一個飽和中間調地色 + 兩個語意訊號色 + 一個近白線色**。例如電力調度可用 `#1B4C8A` 靛藍地色配 `#E33A1B`／`#F5B301`。

## 三、字體系統

```
標題（中文）：'Noto Sans TC', sans-serif；weight 900；letter-spacing .04–.06em
標籤／英文小標：'Oswald', sans-serif；weight 600；letter-spacing .1–.34em；常用 uppercase
數值／代碼／記錄：'Roboto Mono', monospace；font-variant-numeric: tabular-nums
內文：'Noto Sans TC'；weight 400；15px／line-height 1.62
```

字級 scale：

| 用途 | size | 說明 |
|---|---|---|
| 站名 h1 | 30px（手機 22px） | Noto Sans TC 900 |
| 區塊標題 | 24px（手機 19px） | Noto Sans TC 900 |
| 面板標題 h3 | 15–16px | Noto Sans TC 900 |
| 內文 | 15px / 13.5px（面板內） | |
| 表格 | 12.5px mono | 表頭 11px、色 `#F5B301`、letter-spacing .08em |
| 資訊帶 | 11px mono | letter-spacing .06em |
| 刻度標籤 | 9–10px mono | opacity .6–.85 |
| 區塊編號 | 11px mono | letter-spacing .22em、色 `#F5B301` |

**所有數字一律走 mono**，包括價格、時刻、里程、電話。中文與數字混排時不要為了「好看」把數字換回無襯線——這個風格的可信度全靠等寬數字。

## 四、版面與網格

- 容器 `max-width:1180px`，左右 padding 20px（手機 14px）。
- 全站以 `border-bottom:2px solid` 燈白的橫線切分區塊，**沒有任何區塊是靠留白分隔的**。
- body 底鋪 40px 間距的垂直細線 `repeating-linear-gradient(90deg, rgba(244,241,228,.05) 0 1px, transparent 1px 40px)`，是「方眼紙／意匠格」的暗示，非常淡，只在大面積地色上看得出來。
- 主要工作區採 **1.55 : 1 不對稱兩欄**（左：儀器與操作；右：任務、記錄、速查）。不要用對稱三欄卡片牆。
- 頁首固定順序：**資訊帶（極密 mono）→ 刊頭（標誌＋站名＋副標）→ 內容**。資訊帶至少放 5 項可查證的具體資料（編號、里程、電話、營業時段）。
- 區塊標號寫成 `SECT n / 0m — 中文 ENGLISH`，這是本風格的節奏記號。
- 手機（≤900px）兩欄拆為單欄；≤560px 桿架類元件改為每行四格 wrap。

## 五、元件配方

### 導覽（路牌閉塞式）

固定於右上角的「授受器」盒：深綠墨底、2px 燈白框、6px 硬投影。內含 4 個直徑 60px 的圓形「路牌」按鈕，`border-radius:50%`、3px 燈白框、內嵌一圈 `1px dashed` 假刻痕。

```css
.tk{width:60px;height:60px;border-radius:50%;border:3px solid var(--lit);background:var(--grn)}
.tk:hover{background:var(--yel);color:var(--grn-x);transform:translateY(-3px)}
.tk[aria-current="page"]{background:var(--lit);color:var(--grn-x);transform:translateY(-9px)}
.tk::after{content:"";position:absolute;inset:6px;border:1px dashed rgba(244,241,228,.5);border-radius:50%}
```

語意：**同一時間只有一面牌被「取出」（＝目前頁面），其餘在機內。** 行動版 `position:static`、改為滿寬四片橢圓，並在頁尾補完整連結列保底。

### 按鈕

```css
.btn{font-family:Oswald;font-size:13px;letter-spacing:.1em;background:#F4F1E4;color:#043D20;
     border:2px solid #F4F1E4;padding:8px 14px;transition:background .13s linear}
.btn:hover{background:#F5B301;border-color:#F5B301}
.btn.ghost{background:transparent;color:#F4F1E4}
```

零圓角、零陰影、**hover 只換底色不位移**（位移留給桿與路牌這種「真的會動的東西」）。

### 表格

全站主力元件。`border-collapse:collapse`、1px `rgba(244,241,228,.34)` 格線、`th` 深綠墨底＋黃字＋11px。表格不加斑馬紋（那是裝飾），選取列改用 `background:#02160D`。

### 桿／開關類控制元件

```
容器：深綠墨底、2px 燈白框、flex 均分
單桿：104px 高按鈕，內含 9px 寬的「桿身」色條，transform-origin:50% 100%
定位 → rotate(0)；反位 → rotate(-26deg) scaleY(.9)，transition .18s cubic-bezier(.3,.9,.4,1)
桿色即機能：紅=主號誌 黃=遠方 黑=轉轍器 藍=鎖錠 白=空桿
被拒 → 0.32s 左右各 4px 的 jolt 抖動；同時鎖住它的那支桿套 0 0 0 4px 黃色外框 1.4s
```

按鈕必須是原生 `<button>`＋`aria-pressed`，鍵盤可操作。

### 表單

輸入框：夜黑綠底、2px 半透明燈白框、mono 14px、focus 時框變黃。label 用 12px mono 置於上方。
**驗證訊息寫成規則語句，不寫「請輸入正確格式」**：例「手機請填 09 開頭共 10 位數字」。錯誤同時寫入「檢查記錄」視窗，用與核心互動相同的 `✕` 前綴與紅字。

### 記錄視窗（本風格的簽名元件）

```css
.log{background:#02160D;border:2px solid #F4F1E4;height:196px;overflow:auto;
     font-family:'Roboto Mono';font-size:11.5px;line-height:1.7}
.log .t{color:#F5B301}   /* 時刻 */
.log .no{color:#FF8E6E}  /* 拒絕 */
.log .ok{color:#8FE8AC}  /* 完成 */
```

每一次操作都留一行，**拒絕與成功一樣詳細**。`aria-live="polite"`。

### 頁尾

深綠墨底、三欄（品牌資訊 / 主要連結 / 深層連結），最後一行 10.5px、opacity .6 的 mono 免責聲明。

## 六、動效規則

本風格的動效**極少且全部有物理理由**：

| 動作 | 觸發 | duration / easing |
|---|---|---|
| 桿身轉位 | 引扳／復位成功 | 180ms `cubic-bezier(.3,.9,.4,1)`（機械的快起慢收） |
| 拒絕抖動 | 連鎖阻止 | 320ms `linear`，±4px 兩次 |
| 責任桿高亮 | 連鎖阻止 | 1400ms 後移除，無過渡 |
| 按鈕／連結換色 | hover / focus | 130ms `linear` |
| 路牌抬起 | hover / current | 160ms `ease` |
| 量表寬度 | 數值變動 | 120ms `linear` |
| 畫布重繪 | 每 tick（700ms） | 無過渡，直接重畫 |

**禁止**：淡入揭示進場、數字滾動計數、視差、跑馬燈、自動播放的裝飾動畫。
`prefers-reduced-motion` 下 `*{animation-duration:.001ms!important;transition-duration:.001ms!important}`，且**核心邏輯一律不停用**——桿還是能扳，只是不轉；模擬另備「單步」按鈕與「示範操作」自動腳本，讓不使用自動時鐘的人也能取得完整結果。

## 七、插畫與圖像風格：諾模刻度構圖 nomogram-scale

**原則：圖像由刻度尺、對準線與讀值標記構成，物件輪廓退為次要。每張圖都要能讀出數字。**

做法：

1. **先決定這張圖回答什麼問題**，再決定畫什麼。「號誌樓的照片」不回答問題，「制動距離諾模圖」回答。
2. **軸線**：2px 燈白直線，端點外側寫黃色 Oswald 標題＋mono 單位。
3. **刻度**：主刻度 1.6px 長 9px，次刻度 opacity .4；標籤 10px mono，緊貼軸線 13px。
4. **對準線／游標**：臂木紅 2.4px，端點置 6px 紅圓點（燈白 2px 描邊），讀值點置 7px 黃圓點（夜黑描邊）。
5. **物件**（號誌機、路牌、轉轍器）以最少的幾何原語繪成**帶註記的示意體**：矩形柱＋旋轉的臂＋圓形燈，旁邊一定要有角度或編號標註。不描寫材質、不畫透視。
6. **程序生成的識別紋**：憑證上的路牌刻痕以 FNV-1a 雜湊決定各道刻痕深度，**同資料恆同圖**——它是識別紋，不是條碼。

真的諾模圖怎麼畫（平行尺，f₁(u)+f₂(v)=g(w)）：

```
m1 = H / (f1max - f1min)              // 左尺模數
m2 = H / (f2max - f2min)              // 右尺模數
w1 = m1/(m1+m2) ; m3 = m1*m2/(m1+m2)  // 中尺位置比例與模數
XM = XL + (XR-XL)*w1                  // 中尺 x 座標（不在正中央！）
B1 = BOT + m1*f1min ; B2 = BOT + m2*f2min ; B3 = w2*B1 + w1*B2
yL(u)=B1-m1*f1(u) ; yR(v)=B2-m2*f2(v) ; yMid(w)=B3-m3*g(w)
```

兩外尺模數不等時，中尺**必定偏心**；把它畫在正中央就是假圖。畫完務必反讀驗證：由圖上交點解回的值要與算式相符（本站在讀數面板直接把兩者並列，這種自我驗證本身就是內容）。

**Logo／Favicon**：一支反位 45° 的臂木號誌（柱＋紅臂＋黃燈環）＋一段刻度尺＋站名。favicon 用同一組幾何縮到 32×32 的 inline SVG data URI，只保留柱、紅臂、黃圓。

## 八、Do & Don't

**Do**

- 每一次拒絕都寫明「是誰鎖住你、依據哪一條規則」。
- 顏色編碼全站一致，並在某處明列對照表。
- 所有數值 mono、所有圖有刻度、所有價格與時刻具體到個位數。
- 品牌文案用產業行話：進路、鎖閂、引扳、定位／反位、閉塞、現示、外方、誤點、運轉整理。行話要用對，用錯比不用更糟。
- 破格出口備齊：自動流程要有單步版與示範版，全部文字內容不依賴 JS 也讀得到。

**Don't**

- 不用紫藍漸層、不用圓角卡片牆、不用模糊陰影。
- 不用 emoji 當 icon（本風格的 icon 是幾何＋標註）。
- 不把訊號色拿去當裝飾色。
- 不寫「在當今快節奏的世界」「把 X 變成 Y」「EST. 19xx」這類 AI 腔或懷舊套語。
- 不因為「使用者可能會困惑」就把規則藏起來——**規則就是這個風格的主角**。
- 不用跑馬燈。這個題材最容易反射性地放一條捲動的時刻表，忍住。

## 九、頁面骨架範例

```html
<div class="strip"><div class="wrap">
  <span>梅溪號誌樓 <b>8K+430</b></span><span>標高 <b>112.6 m</b></span>
  <span>連鎖種別 <b>第二種機械連鎖・十二桿</b></span><span>預約專線 <b>049-278-1104</b></span>
</div></div>

<header class="head"><div class="wrap">
  <svg class="mark" viewBox="0 0 64 64"><!-- 柱＋臂＋燈環 --></svg>
  <div class="title">
    <h1>梅溪號誌樓保存會</h1>
    <div class="en">Meixi Signal Box · Mechanical Interlocking No.2</div>
    <div class="sub mono">南投縣集集鎮梅溪里鐵路巷 4 號｜梅溪線 8.4K</div>
  </div>
</div></header>

<section><div class="wrap">
  <div class="sec-no">SECT 1 / 02 — 連鎖台 INTERLOCKING FRAME</div>
  <h2 class="sec-h">十二桿機械連鎖・線上操演</h2>
  <p class="lead">…一句話說明這台機器會怎麼對待你…</p>

  <div class="frame">
    <div>
      <div class="diagram"><svg viewBox="0 0 620 176"><!-- 配線圖 --></svg></div>
      <div class="levers"><!-- 12 支桿 --></div>
    </div>
    <div>
      <div class="panel"><h3>任務書</h3><ol class="task mono">…</ol></div>
      <div class="log" aria-live="polite"></div>
      <div class="panel"><h3>速查</h3><table><tbody>…</tbody></table></div>
    </div>
  </div>
</div></section>
```

## 十、首創技術實作配方：規則引擎作為統治全站的介面法則

本風格的關鍵不在 CSS，在**架構**。要移植它，照這五步做：

**第 1 步：把領域規則寫成一張表，而不是散在事件處理器裡。**
每一條規則是「目標狀態 → 條件 → 拒絕語句 → 責任元件」。本站的 `testLever(n)` 只做一件事：回傳 `null`（允許）或 `{msg, blame}`（拒絕理由＋鎖住你的那支桿）。UI 完全不判斷能不能按，它只負責呈現引擎的回答。

```js
function testLever(n){
  var to = S[n] ? 0 : 1;                      // 目標位置
  if(n===3||n===6){                            // 轉轍器
    if(S[fpl]===1) return {msg:'第 '+n+' 號桿被第 '+fpl+' 號鎖錠桿鎖住。鎖錠桿在反位時，轉轍器不得動作。', blame:fpl};
    for(var i=0;i<sig.length;i++) if(S[sig[i]]===1)
      return {msg:'…號誌現示進行時，其進路內的轉轍器鎖閉。', blame:sig[i]};
    if(occ(tc)) return {msg:'…軌道電路 '+tc+' 被 '+occ(tc).id+' 次佔用。', blame:null};
    return null;
  }
  …
}
```

**第 2 步：不要用 `disabled` 藏規則。**
被鎖住的控制元件仍可點擊，點下去才告訴你為什麼——因為「知道為什麼不行」正是使用者來這裡學的東西。（真正不存在的選項才用 `disabled`，例如已額滿的名額。）

**第 3 步：拒絕要指得出責任者。**
`blame` 欄位讓 UI 能把鎖住你的那支桿高亮 1.4 秒。這一個細節把「錯誤訊息」變成「教學」。

**第 4 步：同一支引擎至少統治三處。**
核心互動、頁面導覽、與一個真實的表單流程。導覽套用領域規則（同時只能持有一面路牌＝同時只能開啟一頁），表單流程套用同一組互斥語彙（同場次不得兼任兩職＝互斥進路）。使用者會在第三次遇到同一句話時意識到：這不是三個功能，是一套世界觀。

**第 5 步：把「被拒絕的次數」寫進結果報告，而且不當成失敗。**
本站結束時輸出運轉整理報告：誤點分鐘、連鎖阻止次數、評等，並在零阻止時寫「你在扳桿之前就已經想過鎖閂會怎麼回答」，有阻止時寫「機器擋下來的每一次，在真線上都可能是一次相撞——阻止不是失敗，是這台機器唯一存在的理由」。**風格的最後一哩是價值觀，不是顏色。**

移植檢查：把配色與字體全部換掉之後，這個站還剩下什麼？如果答案是「一台會拒絕你並說明理由的機器」，就移植成功了。
