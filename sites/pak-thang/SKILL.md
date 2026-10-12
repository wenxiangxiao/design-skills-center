---
name: neumorphism-soft-ui
description: Neumorphism (Soft UI, 2019–2021) — every element is extruded from or pressed into one single low-saturation background material, defined only by a paired light/dark shadow from one global light source, with raised / flat / inset / convex / concave states, generous radii, skeuomorphic knobs and toggles, quiet rounded type, and exactly one accent colour reserved for what is happening now.
---

# 新擬物 Neumorphism／Soft UI

> 範例站：北窗豆腐 PAK-THANG（雲林西螺延平老街・1971 年起在同一扇左上方的窗底下做豆腐）。風格不綁產業——任何想要「安靜、觸感、單一材料、實體控件感」的品牌都能用：智慧家電、音響與耳機、牙醫與皮膚科、手工皂與陶瓷、冥想 App、銀行與記帳、豆製品與乳製品、白色家電維修、床墊與寢具。

## 1. 設計哲學

新擬物是 2019 年 11 月烏克蘭設計師 Alexander Plyuto 在 Dribbble 貼出〈Skeuomorph Mobile Banking〉之後長出來的一支：他請大家「想像一個擬物化沒有死、繼續在手機介面裡演化的維度」。2013 年 iOS 7 把擬物化（皮革、木紋、金屬）一刀砍成扁平；新擬物把擬物化剩下的唯一一件事撿回來——**光**。沒有材質貼圖、沒有第二種顏色，元件跟背景是同一塊材料，按鈕不是浮在畫面上，而是從底色裡**擠出來**或**壓進去**。名稱 Neumorphism（neo + skeuomorphism）隨後由 Michal Malewicz（HYPE4，UX Collective 2019-12〈Neumorphism in user interfaces〉）推廣；命名歸屬有爭議，Wikipedia 記為 Jason Kelley。2020 年 macOS Big Sur 的部分控件、neumorphism.io 這類陰影產生器讓它擴散；2021 年後因可及性批評而退燒，今天是「有意識地選用」的風格。

它長成這樣的原因只有一個：**在同色的世界裡，形狀只能靠光說話。**所以這個風格的全部紀律都在管光——一個光源、一個方向、兩道陰影、三種地形。北窗豆腐的故事是同一件事：豆腐什麼顏色都沒有，要看它好不好，只能看窗光從哪裡來、影子落在哪裡。

祖譜：Dieter Rams 時代 Braun 收音機、計算機上與機殼同色的實體按鍵（遠祖）→ 2007–2012 擬物化 → 2013 扁平 → 2019 新擬物 → 2020 Claymorphism（加彩色、加厚度，是另一支）／Glassmorphism（加透明，又是另一支）。

## 2. 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 材料 `--bg` | `#E6E1D6` 豆漿米 | 頁面底＋所有元件本體（**同一個值**） | ≈ 88% |
| 窗光側 `--hi` | `#FFFDF8` | 朝光陰影、凸面亮端 | 陰影用 |
| 背光側 `--lo` | `#BCB3A3` | 背光陰影、凹槽內緣 | 陰影用 |
| 凸面 `--cx1／--cx2` | `#F2EEE6／#D7D0C3` | 凸面／凹面圓鈕漸層兩端 | ≈ 3% |
| 主文字 `--ink` | `#3B352D` | 標題、內文（對底色約 10:1） | ≈ 6% |
| 次文字 `--ink2／--mute` | `#5A5348／#716A5E` | 說明、註記（皆 ≥ 4.5:1） | ≈ 2.5% |
| 強調 `--acc` | `#3A8F53` 蔥綠 | 只給「正在發生」：開門燈、選中、進度、光源點 | ≤ 0.5% |

推導規則：`--hi` 取底色明度 +8～10%、`--lo` 取底色明度 −15～18%、同色相同彩度。換底色時三個一起換（冷灰系：`#E0E5EC／#FFFFFF／#A3B1C6`；薄荷系：`#DDE8E3／#FAFFFC／#AFC2B9`）。**底色明度必須在 82–93% 之間**——太白亮影看不見、太深暗影看不見，新擬物就塌了。

## 3. 字體系統

- 中文：Noto Sans TC 400／500／700／900（Google Fonts）。
- 拉丁與數字：Nunito 600／700／800——圓頭端點呼應大圓角；價格與時間一律 `font-variant-numeric: tabular-nums`。
- 字級：H1 `clamp(40px,7vw,86px)`／H2 `clamp(28px,4.2vw,46px)`／H3 20px／內文 16px 行高 1.75／註記 13–14px／小標 12px 字距 .22em 全大寫。
- 裝飾大字可以做「同色凹字」（`.deboss`），**但它永遠不承載唯一資訊**：可讀的文字永遠是深墨色。

## 4. 版面與網格

- 最大寬 1180px、左右 28px（≤560px 改 16px）。
- **元件之間的間距 ≥ 陰影長度 × 2.5**（本站 24–34px）：陰影需要空氣，擠在一起會糊成一片。
- 不對稱網格：首頁品項 `1.5fr 1fr 1fr`、大卡跨兩列；故事區 `1fr 1.1fr`。不用置中三卡片。
- 圓角階：14（鍵）／22（卡）／36px（大板）。
- 不旋轉、不傾斜——光源是固定的，旋轉元件會讓影子跟形狀對不起來。
- 導覽：底部固定「壓鍵底座」（soft-segment dock），現用頁是被按下去的那一格。

## 5. 元件配方

```css
/* 光：全站只有一個 */
@property --la{syntax:'<angle>';inherits:true;initial-value:225deg} /* 0°=右、90°=下，指向光源 */
@property --depth{syntax:'<number>';inherits:true;initial-value:1}   /* 0＝全部攤平 */
@property --lf{syntax:'<number>';inherits:true;initial-value:1}      /* 光越低影越長 */
.nm,.in{--e:calc(var(--elev,8px)*var(--depth)*var(--lf));
  --ox:calc(cos(var(--la))*var(--e));--oy:calc(sin(var(--la))*var(--e));background:var(--bg)}
.nm{box-shadow:calc(-1*var(--ox)) calc(-1*var(--oy)) calc(2*var(--e)) var(--lo),
               var(--ox) var(--oy) calc(2*var(--e)) var(--hi)}
.in{--elev:6px;box-shadow:inset calc(-1*var(--ox)) calc(-1*var(--oy)) calc(2*var(--e)) var(--lo),
               inset var(--ox) var(--oy) calc(2*var(--e)) var(--hi)}
```

- **按鈕 `.key`**：平時 `.nm-s`（elev 4–6px），`:active`／`[aria-pressed=true]`／`[aria-current=page]` 換成內影——按下就是凹進去。左側一顆 8px LED：未啟用是凹的空洞，啟用時填蔥綠＋8px 光暈。
- **卡片**：`.nm`，圓角 22px，內距 22–30px；價格放在 `.in-s` 凹格裡（「價錢寫在凹下去的那一格」）。
- **表單**：輸入框是 `.in` 凹槽、無邊框；開關是凹軌道＋凸圓鈕，開啟時圓鈕變蔥綠；選項 chips 平時凸、選中變凹。
- **旋鈕／燈鈕**：圓形 `.cx` 凸面，上面一顆綠點以 `transform: rotate(var(--la)) translateX(17px)` 標示光向——這顆旋鈕就是光源控制。
- **Footer**：一整塊 `.nm` 大板，內含三欄。
- **高對比模式**：`html.hc` 加 1.5px 邊（`outline:1.5px solid #8C8373;outline-offset:-1.5px`）並加深文字，提供開關且記住選擇。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 種類 | 本站做法 | 觸發／時間 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 光向跟著西螺真實時間走（05:00 約 198°→18:30 約 252°，每分鐘以 2.4s 緩動更新）；首頁豆腐板上雲影讓明暗呼吸（0.21／0.53 Hz 疊加），偶爾一滴豆漿落下激起漣漪 | 時間驅動 | 不呼吸、不落滴；光向仍依時刻一次設定（資訊不丟） |
| input 輸入 | 拖燈鈕／天光盤／傾斜手機 → 全站每道陰影在同一幀轉向（CSS 三角函數，<16ms）；按任何鍵＝外影換內影 | pointer／deviceorientation／鍵盤 | 照常跟隨（這是操作不是動畫），只拿掉 2.4s 緩動 |
| transition 轉場 | **沉板換頁**：點內部連結時 `--depth` 1→0（0.26s，ease-in）整頁攤平成一塊同色平面，新頁 0→1（0.42s，含 1.12 輕微過衝）從平面長出來 | 換頁 | 直接換頁，無沉浮 |
| signature 簽名 | **豆腐面阻尼膜**：首頁與〈摸豆腐〉的豆腐是 WebGL2 高度場，按下去依材料硬度凹陷、放開後依離散二維波動方程（含彈性基底項）回彈晃動；嫩的晃久、老的一彈就停 | pointer／空白鍵 | 阻尼提高到 0.86（不晃、直接回平），並以文字報告「陷了幾 mm、晃幾下、幾秒停」——資訊零損失 |

自我限制：本站禁用淡入、滑入、視差——新擬物的物件「長出來」，不「飄進來」。

## 7. 插畫與圖像風格（monotone-relief 同色浮雕）

- 所有圖像都是**跟背景同色的浮雕**：inline SVG 填 `var(--bg)`，以兩道 `drop-shadow()` 跟著光（偏移由 `--la` 三角函數算出）；凹刻部分（豆干上的「北」、布紋線）把兩道影子顏色對調。
- 首頁主視覺不是圖，是一塊**被光照著的高度場**：板面、豆腐布經緯、木框壓痕、凹字店名全部畫在灰階高度圖上，GPU 依同一個光源著色——平的地方剛好等於底色。
- 地圖也是浮雕：街道與建物是凸起的同色條塊，只有店是一顆蔥綠點。
- 禁用：照片、彩色插畫、描邊線稿、陰影以外的任何明暗。

## 8. Logo 與 Favicon

- Logo：圓角方塊豆腐（同色、外雙影浮起）＋左上壓凹的四格窗＋右下一顆蔥綠點；右側「北窗豆腐」Noto Sans TC 900 墨色、「PAK-THANG · 1971」Nunito 800。見 `assets/logo.svg`（feDropShadow ×2 浮起、feOffset＋feComposite 環形內影壓凹）。
- Favicon：inline SVG data URI——底色方塊、凸面漸層方塊、左上一格凹窗、右下綠點。小尺寸下改用漸層模擬凸起（16px 時陰影會糊掉）。

## 9. Do & Don't

**Do**
- 全站一個光源變數，所有影子、凸面漸層、浮雕都從它推導。
- 文字用深色，陰影只負責「形」。可點元件同時要有形狀以外的線索（LED、字重、文字狀態）。
- 提供「加深輪廓」高對比模式（WCAG 2.1 1.4.11 非文字對比 3:1）。
- 元件間距給足，讓每一道影子有地方落。
- 一個強調色，只給「正在發生」。

**Don't**
- 不要讓元件有自己的顏色或自己的光；不要一個卡片影子往右下、另一個往左下。
- 不要用純白 `#FFF` 底——亮影會消失。不要深色底配新擬物（那是另一個風格）。
- 不要把唯一資訊放在同色凹字裡；不要只靠「凸 vs 凹」表示選中。
- 不要疊玻璃模糊、不要加彩色漸層（那是 Glassmorphism／Claymorphism）。
- 去 AI 化：不用紫藍漸層、emoji icon、Lorem ipsum、置中大標＋兩顆按鈕＋三張卡片模板、EST. 徽章。

## 10. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是新擬物了。

### ① 同色擠出——元件就是背景
元件背景色 = 頁面背景色，沒有邊框、沒有填色差。深度只來自一亮一暗兩道陰影。
```css
:root{--bg:#E6E1D6;--hi:#FFFDF8;--lo:#BCB3A3}
body,.card{background:var(--bg)}
.card{border:0;box-shadow:8px 8px 16px var(--lo),-8px -8px 16px var(--hi)}
```

### ② 單一光源・對角雙影——全站共用一個光向量
亮影偏移 = 光向量 × 高度，暗影 = 反向；模糊 = 偏移 × 2。光向是一個註冊過的 `<angle>`，改它全站同步轉向。
```css
@property --la{syntax:'<angle>';inherits:true;initial-value:225deg}
.card{--e:8px;--ox:calc(cos(var(--la))*var(--e));--oy:calc(sin(var(--la))*var(--e));
  box-shadow:calc(-1*var(--ox)) calc(-1*var(--oy)) calc(2*var(--e)) var(--lo),
             var(--ox) var(--oy) calc(2*var(--e)) var(--hi)}
/* JS：document.documentElement.style.setProperty('--la', deg+'deg') */
```

### ③ 地形三態＋兩種曲面——狀態用凸凹說
凸（可按）、平（停用／背景）、凹（按下／輸入槽），加上凸面／凹面圓鈕。
```css
.key{box-shadow:6px 6px 12px var(--lo),-6px -6px 12px var(--hi)}                 /* 凸 */
.key:active,.key[aria-pressed=true]{box-shadow:inset 4px 4px 8px var(--lo),inset -4px -4px 8px var(--hi)} /* 凹 */
.key:disabled{box-shadow:none;opacity:.45}                                         /* 平 */
.knob{background:linear-gradient(calc(var(--la) + 270deg),#F2EEE6,#D7D0C3)}        /* 凸面：亮端朝光 */
.dish{background:linear-gradient(calc(var(--la) + 270deg),#D7D0C3,#F2EEE6)}        /* 凹面：暗端朝光 */
```

### ④ 低彩度單色底＋唯一強調色
底色明度 82–93%、彩度低；整站只允許一個飽和色，而且只給「正在發生」的東西。
```css
:root{--acc:#3A8F53}
.led{width:8px;height:8px;border-radius:50%;background:#D7D0C3;box-shadow:inset 1px 1px 2px var(--lo)}
.led.on{background:var(--acc);box-shadow:0 0 8px rgba(58,143,83,.45)}
```

### ⑤ 大圓角與擬物控件——軟的、可以摸的
14–36px 圓角、圓形旋鈕、膠囊開關、凹槽軌道；圓頭無襯線字。
```html
<label class="sw"><input type="checkbox"><span class="track in"><span class="knob nm-s"></span></span>自備容器</label>
<style>
.sw .track{width:62px;height:34px;border-radius:20px;position:relative}
.sw .knob{position:absolute;top:4px;left:4px;width:26px;height:26px;border-radius:50%;transition:left .22s cubic-bezier(.3,1.4,.5,1)}
.sw input:checked ~ .track .knob{left:32px;background:var(--acc)}
body{font-family:"Nunito","Noto Sans TC",sans-serif}
</style>
```

## 11. 頁面骨架範例

```html
<body style="background:#E6E1D6">
  <header class="hero"><div class="slab nm-l"><canvas id="slab"></canvas>
    <div class="tag nm"><h1>品牌名</h1><p>一句話。</p></div></div></header>
  <main class="wrap">
    <section class="board">
      <article class="item big nm"><svg class="relief">…同色浮雕…</svg><h3>主商品</h3>
        <p>說明</p><span class="well in-s price">NT$35</span></article>
      <article class="item nm">…</article>
    </section>
  </main>
  <div class="dock nm-l"><nav class="in">
    <a class="key nm-s" aria-current="page" href="index.html"><span class="led"></span>首頁</a>
    <a class="key nm-s" href="menu.html"><span class="led"></span>商品</a></nav>
    <button class="lamp cx" role="slider" aria-label="光源"></button></div>
  <footer class="foot"><div class="foot-in nm">…</div></footer>
</body>
```

## 12. 技術實作與相容性

| 技術（層） | 承載什麼 | 支援現況與查證 | 不支援時 |
|---|---|---|---|
| **CSS 三角函數 `sin()`／`cos()` ＋ `@property`**（C 版面與樣式） | 特徵②：每一道 `box-shadow`、`text-shadow`、`drop-shadow()` 與凸面漸層角度都由同一個 `--la` 算出；`--depth` 驅動沉板換頁；`--lf` 讓光越低影越長 | MDN 標示 `sin()`／`cos()` 為 Baseline Widely available（自 2023-03；Chrome/Edge 111、Firefox 108、Safari 15.4）。`@property` 於 Firefox 128（2024-07）補齊後為 Baseline 2024。來源：developer.mozilla.org/docs/Web/CSS/sin、/cos | `@supports (width:calc(1px*cos(0deg)))` 失敗即用寫死的左上光靜態陰影（`8px 8px 16px`）；`@property` 不支援時 `--depth` 不能補間，換頁直接切換，外觀不變 |
| **WebGL2 高度場著色＋CPU 阻尼波動方程**（A 渲染） | 簽名動效：豆腐面。`h' = (2h − h₋₁ + c²∇²h − k·h)·damp`，按壓時以餘弦窗把區域拉向目標凹陷；每幀以 `R16F`（WebGL2 核心可線性濾波）上傳，片段著色器以中央差分求法線、`(n·L − L.z)·gain` 決定朝亮或朝暗——平面恰等於底色 | WebGL2 為 Baseline（2021 起 Safari 15 補齊）。`R16F`＋`RED`＋`FLOAT` 上傳為 ES 3.0 合法組合 | 取不到 `webgl2` → 首頁改顯示 CSS 同色凹字店名；〈摸豆腐〉改用 CSS `scale` 晃動動畫，且所有判讀數字（陷幾 mm、晃幾下、幾秒）由同一方程式離線算出，以文字呈現，遊戲照樣可玩 |
| **DeviceOrientationEvent**（D 輸入與感測） | 傾斜手機＝把窗搬到高的那一側：`atan2(−(β−40), −γ)` 為光向、傾角大小換算仰角，低通平滑 0.25 | MDN：需安全環境（HTTPS）；iOS Safari 須在使用者點擊內呼叫 `DeviceOrientationEvent.requestPermission()`（MDN 標示 Limited availability、非 Baseline）。來源：developer.mozilla.org/docs/Web/API/DeviceOrientationEvent/requestPermission_static | 按鈕文字改為「沒有拿到傾斜權限，請用燈鈕」；燈鈕（Pointer＋方向鍵＋PageUp/Down）與天光盤永遠可用 |

**效能實測（建置環境 node 22，同一份程式碼）**：120×72 格波動方程一步 ≈ 0.05ms（每幀兩步）；48×36 材料量測一次 6–40ms，延後到閒置時逐一計算、首屏零成本；首屏同步 JS 僅光源初始化與 DOM 綁定：jsdom 量測各頁 DOMContentLoaded 處理 0.1–25ms（visit 最高，來自 Intl 日期格式化七天＋十四個時段）；WebGL 初始化與著色器編譯未計入（建置環境無 GPU，無法實測，屬已知未驗證項）。豆腐面在能量 < 1e-7 且無按壓時停止上傳與重繪（零 GPU 閒置成本），離開視窗（IntersectionObserver）即暫停。單頁大小：index 約 44KB、tofu 約 47KB、window 約 43KB、visit 約 43KB（皆含 inline CSS/JS），遠低於 350KB 預算。已知限制：拖燈鈕時全頁 `box-shadow` 會逐幀重繪；本站靜態陰影元件每頁 31–47 個，tofu 頁動態生成後約 100 個，屬可接受上限，再多應改用較小的 blur 或只讓視窗內元件跟光。
