---
name: candy-pastel-style
description: Build playful candy-shop websites with soft pastel colors, chunky outlined blobs, jelly-squish interactions, and bouncy entrance animations.
---

# 糖果粉彩風格（Candy Pastel Style）規格書

本文件是「糖雲 Sugar Cloud」網站的完整風格規格。任何 AI 或設計師依照本文件，即可在不看原始碼的情況下重現此風格。範例實作見同目錄 `index.html`、`menu.html`、`stores.html`。

---

## 1. 設計哲學

1. **甜美粉彩，不是螢光撞色。** 所有大面積色彩都是加了牛奶的粉彩（低飽和、高明度）；高飽和色只出現在極小的點綴（草莓、糖粒）。看起來像馬卡龍櫥窗，不是霓虹招牌。
2. **一切都是軟的。** 沒有直角、沒有細線。圓角極大（22–34px）、描邊粗（3px 卡通描邊）、陰影是「實心色塊位移」而非模糊投影——像餅乾疊在餅乾上。
3. **手作感的歪斜。** 完美對齊 = 工廠感。卡片、標籤、貼紙一律帶 ±0.5°–3° 旋轉，區塊間允許重疊與錯位，hover 時回正（rotate(0)），形成「被摸了一下」的回饋。
4. **會呼吸的頁面。** 任何時刻畫面上至少有一個東西在動：飄過的雲、漂浮的糖果、撒落的糖粒。動作緩慢、幅度小，是背景呼吸而非干擾。
5. **文案是店員在講話。** 用具體的產地、數字、小提醒（「附小木槌，請自己敲開」），禁止空泛形容詞堆疊。幽默要收斂在一兩句。

## 2. 色彩系統

| 變數 | Hex | 用途 |
|---|---|---|
| `--pink` 草莓粉 | `#F7A8C4` | 主 CTA 按鈕、主要點綴、logo 雲朵 |
| `--pink-deep` | `#E2789F` | 粉色系的文字/描邊加深（英文小標） |
| `--pink-soft` | `#FCE3ED` | 粉色區塊底色、hover 背景 |
| `--mint` 薄荷綠 | `#9EDCC3` | 次要按鈕、標籤、地圖綠地 |
| `--mint-deep` | `#5FBF9A` | 薄荷系加深 |
| `--mint-soft` | `#E2F6EE` | 薄荷區塊底色 |
| `--butter` 奶油黃 | `#FFE29A` | 價格標籤、active 導覽、招牌 |
| `--butter-deep` | `#E8B84B` | 奶油系加深、虛線框 |
| `--butter-soft` | `#FFF4D6` | 奶油區塊底色、便條卡 |
| `--sky` 天空藍 | `#A9DCF2` | 第三按鈕、飲品類、地圖河流 |
| `--sky-deep` | `#6FBBDF` | 天空系加深 |
| `--sky-soft` | `#E3F4FC` | 天空區塊底色 |
| `--cocoa` 深可可 | `#5A4350` | **唯一的深色**：所有文字、描邊、footer 背景。不用純黑 |
| `--cream` 奶霜白 | `#FFF9F2` | 頁面底色。不用純白當底 |
| 點綴紅 | `#E85D75` | 僅限草莓、櫻桃等 5% 以下面積 |

規則：
- **區塊底色輪替**：cream → pink-soft → cream → mint-soft…相鄰 section 不同色，之間必夾波浪分隔線。
- **禁止**：紫色、藍紫漸層、任何漸層背景（漸層只允許出現在文字底線 highlight 的 `linear-gradient(transparent 62%, var(--butter) 62%)` 這種平塗技巧）。
- 陰影一律用 cocoa 的透明版：`rgba(90,67,80,.14)`～`.16`。

## 3. 字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

- **標題／英文／數字／價格**：`'Baloo 2'`（圓滾滾、weight 700–800）。
- **內文（繁中）**：`'Noto Sans TC'`，內文 400–500，強調 700，標題 900。中文標題直接用 Noto Sans TC Black 也符合風格。
- 疊法：`font-family:'Baloo 2','Noto Sans TC',sans-serif` 讓英數走 Baloo、中文走 Noto。
- 字級：H1 `clamp(2.4rem,6vw,4.4rem)`；H2 `clamp(1.9rem,4vw,3rem)`；內文 0.92–1.08rem；`line-height:1.7`。
- 英文小標固定配方：`font-size:.78–.85rem; letter-spacing:.16em–.24em; font-weight:700; color:var(--pink-deep)`，全大寫。

## 4. 版面與網格

- 內容最大寬 **1120px**（導覽列 1080px），左右 padding 24px。
- Section 垂直 padding 70–80px，**相鄰 section 之間必放波浪 SVG**（見 §6）。
- **禁用「置中大標＋等寬三卡片」模板。** 替代做法：
  - 12 欄網格上讓三張卡各佔 4 欄，但 `margin-top` 交錯（0 / -18px / 38px）＋各自旋轉（-3° / 1.6° / 3°）；
  - 或改用「長條列」（左圖右文橫向卡）上下交錯歪斜。
- 標題列用「標籤貼紙＋歪斜大標＋手繪波浪線填滿剩餘寬度」的橫向組合，靠左對齊。
- 允許元素跨出容器邊界（漂浮糖果 `right:-3%`）、插畫壓在區塊交界上。
- RWD 斷點：**820px**（導覽收合、footer 單欄）、**760–900px**（卡片轉單欄）。手機上保留歪斜但收小角度。

## 5. 元件配方

### 導覽列
- `position:sticky; top:14px`，膠囊形：`border-radius:999px; border:3px solid var(--cocoa)`。
- 背景半透明白 `rgba(255,255,255,.86)` + `backdrop-filter:blur(10px)`。
- 實心位移陰影：`box-shadow:0 6px 0 rgba(90,67,80,.14)`。
- Logo 區整體 `rotate(-2deg)`。連結是膠囊，hover 變 `--pink-soft`，active 頁 `--butter` 底＋2px 描邊。最右一顆 CTA 按鈕（粉色、有果凍 hover）。
- 手機：漢堡鈕（奶油黃圓角方塊），選單下拉為白色圓角卡，展開時播 popIn 彈跳。

### 按鈕（果凍按鈕）
```css
.btn{font-family:'Baloo 2'; font-weight:800; padding:14px 30px;
  border:3px solid var(--cocoa); border-radius:999px;
  box-shadow:0 5px 0 var(--cocoa);}          /* 實心底陰影＝厚度 */
.btn:active{transform:translateY(4px); box-shadow:0 1px 0 var(--cocoa);} /* 按下去 */
```
底色四選一（pink/mint/butter/sky），同畫面兩顆以上按鈕必須不同色。hover 套 squish 動畫（見 §6）。

### 卡片
- 白底、`border:3px solid var(--cocoa)`、`border-radius:28–34px`、`box-shadow:0 7–9px 0 rgba(90,67,80,.15)`。
- 預設帶旋轉，hover 回正並上浮：`transform:rotate(0) translateY(-6px)`，transition 用 bounce easing。
- 插畫區塊高 140–160px，插畫底色用四種 soft 色輪替。
- 卡內順序：插畫 → 英文小標 → 中文標題（可夾徽章）→ 描述 → 價格標籤。

### 菜單列（menu row）
- 三欄 grid：`170px 插畫 | 1fr 文字 | auto 價格`，圓角 32px 長條卡。
- 奇偶交錯：`nth-child(odd){rotate(-.8deg)}`、`nth-child(even){rotate(.7deg) translateX(14px)}`。
- 價格是獨立「糖果標籤」：Baloo 2、奶油黃（偶數列薄荷綠）、3px 描邊、rotate(±3°)、實心陰影。
- 徽章（限量/季節/新品）：小膠囊、2px 描邊、粉彩底、`font-size:.7rem; font-weight:900`。

### Footer
- 唯一深色區：`background:var(--cocoa)`，文字奶霜白，標題奶油黃（Baloo 2）。
- 進入 footer 前必有一條波浪把前一區的粉彩「流進」深色。
- 三欄：品牌（logo＋一句介紹）/ 門市地址 / 快速連結。連結 hover：`text-decoration:underline wavy var(--pink) 2px`。
- 最底一行版權＋地址＋統編，`border-top:2px dashed` 半透明。

## 6. 動效規則

Easing 常數（全站共用）：
```css
--bounce: cubic-bezier(.34,1.56,.64,1);   /* 過衝彈跳：進場、hover 回正 */
--squish: cubic-bezier(.28,.84,.42,1);    /* 果凍壓扁 */
```

| 動效 | 觸發 | duration | 細節 |
|---|---|---|---|
| 進場彈跳 popIn | IntersectionObserver `threshold:.12–.15`，進視窗加 `.in`，只播一次 | .75s `--bounce` | `translateY(34px) scale(.92)` → 原位。同組元素以 `i%3–4 × .09s` 錯開 |
| 果凍壓扁 squish | 按鈕/CTA hover | .5s `--squish` | keyframes：`scale(1.14,.8)` 30% → `scale(.9,1.12)` 55% → `scale(1.05,.95)` 75% → 1 |
| 按下 | 按鈕 :active | .15s | 下沉 4px、實心陰影縮到 1px |
| 漂浮 floaty | 持續 | 4.8–6.6s ease-in-out infinite | `translateY(-16px)`，各元素隨機 `--d`/`--dl` 錯開；保留自身旋轉 `--r` |
| 飄雲 drift | 持續 | 46–64s linear infinite | `translateX(-12vw → 112vw)`，opacity .85，每頁 1–2 朵 |
| 糖粒撒落 sprinkleFall | 持續（JS 生成 26 顆） | 7–15s linear infinite | 小圓/長條 3–7px，四色輪替，落下 105vh＋rotate(560°)，首尾淡入淡出；只放首頁 |
| blob 變形 blobMorph | 持續 | 9s ease-in-out infinite | 三組 border-radius 8 值互換 |
| 卡片 hover | hover | .25–.3s `--bounce` | `rotate(0) translateY(-6~-8px)`，z-index 提升 |
| 跑馬燈 marq | 持續 | 26s linear infinite | 內容複製兩份、`translateX(-50%)`，整條 rotate(-1.2°) |

原則：進場動畫只播一次；持續動畫幅度小、週期長；不使用 `transition: all`；尊重使用者可加 `prefers-reduced-motion` 降級。

## 7. 插畫與圖像風格

- **全部手寫 inline SVG**，禁點陣圖。統一視覺語言：
- **描邊規則**：主體輪廓 `stroke:#5A4350`（cocoa），寬 4–5（大圖）/ 3–3.5（小件），`stroke-linecap/linejoin:round`。內部細節線用同色系 deep 色（如粉物件內紋用 `#E2789F`），寬 3–4，**不描 cocoa**——形成「外粗內細」層次。
- **blob 畫法**：不規則有機形用 8 值 border-radius（CSS）或手繪閉合 path（SVG），控制點角度輪流內外偏 10–20%，避免對稱。雲朵 = 3–4 段不同半徑的圓弧串成（大arc＋小arc交錯），底部平收。
- **擬人化**：招牌物件（雲、棉花糖）給臉——兩顆 cocoa 圓點眼（r≈物寬 3%）、一條 quadratic 微笑 `q3 3 6 0`、橢圓腮紅 `#FFD6E4`。菜單食物插畫**不給臉**（免得吃它有罪惡感），只有吉祥物系有臉。
- **構圖公式**（菜單插畫 160×140）：底部淺色橢圓當影子 → 主體置中偏下 → 周邊 2–3 顆糖粒/星星/斜放小物打破平衡 → 白色高光小圓。
- 高飽和點綴（草莓紅 #E85D75）每張限一兩處。

## 8. Logo 與 Favicon 設計指南

- **Logo 構成**（`assets/logo.svg`，560×200）：粉色 blob 背景 → 白色雲朵吉祥物（cocoa 描邊 6、有臉、頭頂一顆草莓）→ 右側中文字標「糖雲」（Noto Sans TC 900、cocoa）→ 英文「Sugar Cloud」（Baloo 2、pink-deep）→ 薄荷綠波浪底線（quadratic 連續 `q12-12 24 0`）→ 小字標語。周邊撒糖粒與星星。
- **Favicon**：logo 雲朵的極簡版，encode 成 SVG data URI 放 `<link rel="icon">`。64×64 viewBox，只留：粉雲身體＋眼睛＋微笑＋腮紅。data URI 內 `#` 要寫成 `%23`。
- 導覽列與 footer 用 64×64 的小雲朵版（inline SVG），與 favicon 同構圖，保證三處識別一致。

## 9. Do & Don't

**Do**
- 大圓角＋粗 cocoa 描邊＋實心位移陰影，三件套永遠一起出現。
- 每個 section 換粉彩底色，中間夾波浪。
- 貼紙、標籤、價格牌都歪一點；hover 回正。
- 文案寫具體事實：產地、限量數字、營業細節、一句店員式小提醒。
- 英文小標全大寫＋寬字距，當作「裝飾性第二聲部」。

**Don't**
- 禁紫色與藍紫漸層、禁任何大面積漸層背景。
- 禁螢光色、禁純黑 `#000` 與純白 `#FFF` 當底。
- 禁「置中大標＋三張等高卡片」的對稱模板。
- 禁 emoji 當 icon——icon 一律手畫 SVG。
- 禁模糊投影（`box-shadow` 帶 blur）——陰影必須是實心位移。
- 禁 Lorem ipsum、禁「探索無限可能」「開啟味蕾之旅」這類 AI 腔文案。
- 禁外部圖片、圖庫、placeholder 服務；外部資源僅限 Google Fonts。
- 動畫不要快（果凍 .5s 以下、漂浮 5s 以上），不要同時彈太多東西。

## 10. 頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁名｜糖雲 Sugar Cloud</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg ...雲朵臉...%3E"><!-- SVG data URI -->
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root{ /* §2 全部色彩變數 + --bounce/--squish */ }
    /* 導覽列、.btn、.jelly、.pop、.floater、.wave …（§5–6 配方） */
  </style>
</head>
<body>
  <header class="nav-wrap">
    <nav class="nav">
      <a class="brand" href="index.html"><svg><!-- 小雲朵 --></svg>
        <span class="brand-name">糖雲<small>SUGAR CLOUD</small></span></a>
      <button class="nav-toggle" id="navToggle">☰</button>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">首頁</a></li>
        <li><a href="menu.html">菜單</a></li>
        <li><a href="stores.html">門市</a></li>
        <li><a href="stores.html#booking" class="nav-cta jelly">預約訂位</a></li>
      </ul>
    </nav>
  </header>

  <section class="hero"><!-- 歪斜大標＋漂浮 SVG＋果凍 CTA --></section>

  <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none">
    <path d="M0 40C180 80 360 0 540 30S900 80 1080 44 1360 10 1440 36V80H0z"
          fill="下一區底色"/>
  </svg>

  <section class="section" style="background:var(--pink-soft)">
    <!-- 歪斜交錯卡片，class="pop" 進場彈跳 -->
  </section>

  <svg class="wave"><!-- 波浪流入 cocoa --></svg>
  <footer><!-- §5 Footer 配方 --></footer>

  <script>
    // 漢堡選單
    document.getElementById('navToggle').addEventListener('click',
      ()=>document.getElementById('navLinks').classList.toggle('open'));
    // 進場彈跳（只播一次、錯開延遲）
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    }),{threshold:.12});
    document.querySelectorAll('.pop').forEach((el,i)=>{
      el.style.animationDelay=(i%3)*0.1+'s';io.observe(el);});
  </script>
</body>
</html>
```
