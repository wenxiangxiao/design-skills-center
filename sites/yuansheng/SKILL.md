---
name: formant-sagittal
description: A persimmon-ground mid-century language-lab poster style where every image is a procedural mid-sagittal vocal-tract section and a draggable IPA vowel quadrilateral drives real-time formant speech synthesis — articulation geometry, not recordings, makes the sound.
---

# 共振峰發聲切面風 Formant-Sagittal

## 設計哲學

這套風格把「一堂看得見的發音課」做成介面。核心不是插圖也不是版面，而是一組**發音器官的參數**：舌位前後、舌位高低、圓不圓唇、在哪裡成阻——這些參數同時驅動兩件事：一張**正中矢狀發聲切面**（頭部側剖面，舌頭是一條會隨參數變形的曲線）與一段**共振峰語音合成**（喉頭嗡聲經三支帶通濾波器塑成母音）。因此第一原則是：**聲音由發音姿勢算出，而非播放錄音**；第二原則是**看得見才改得動**——每一個抽象的「音」都被還原成可以指得出來的身體動作。

視覺上取 1960 年代語言教室掛圖的氣味：柿橘為底、骨白為紙、墨黑為線、teal 為「發音作用色」（舌、母音點、現用態）、mustard 為現用／焦點強調。硬邊、零圓角、資訊清楚。氣質是冷靜理性的正音教室，不是暗底儀表台——刻意用高彩度暖底把「科學製圖」從冷色實驗室裡拉出來。

## 色彩系統

| 用途 | Hex | 比例 |
|---|---|---|
| 柿橘 地色（radial 漸亮至 #E7663F、漸深至 #C33F1E） | `#DE4E2A` | ~44% 大面積通版底 |
| 骨白 面板／紙 | `#F3E7D0` | ~26% |
| 骨白次階 面板／分隔／切面底 | `#E7D6B6` / `#F7EFDD` | ~10% |
| 墨 文字／描邊／深面板（footer/nav #241014） | `#201410` | ~9% |
| 褐 次級文字 | `#5A463A` | ~4% |
| teal 發音作用色（舌／母音點／現用態） | `#1F8A82` | ~4%，**語意保留** |
| mustard 現用／焦點／highlight | `#E9B23A` | <4%，**語意保留** |
| maroon 成阻記號／錯誤／危險 | `#9A2A17` | <2%，**語意保留** |

**三支保留色各有固定語意**：teal＝發音的身體（舌、母音落點、正在作用的狀態）；mustard＝你此刻的選擇／焦點；maroon＝子音成阻位置與錯誤。狀態不靠彩度氾濫，靠這三色與墨值。

## 字體系統

- **Noto Sans TC**（400/500/700/900）：全站漢字。標題 900、鍵值 700、正文 400，行高 1.7–1.75。無襯線給掛圖的教學清爽感。
- **Space Grotesk**（500/700）：IPA 符號與拉丁副名——IPA 一律走 Space Grotesk 以取得字符辨識度與圖表感。
- **IBM Plex Mono**（400/600）：共振峰 Hz 值、留位號、英文小標、代碼——凡「讀數／機器產生的值」皆等寬。
- 字級：h1 26px／區塊標 19–22px／正文 15px／IPA 大字 26–34px／標籤 10–13px（letter-spacing .14–.32em，全大寫拉丁小標）。

## 版面與網格

- 最大寬 1080px（文件頁收窄至 760–820px）。內距 16–26px。
- **不對稱雙欄 stage**：`grid-template-columns:1fr 1fr`，欄間 2px 墨線；左欄操作（母音圖／子音表）、右欄結果（切面＋讀數）。≤820px 疊為單欄、分隔改上緣。
- **硬邊、零圓角**：面板一律 2px 墨框 + `6px 6px 0` 硬陰影（無模糊）；卡片 `4–5px 4–5px 0`。與圓角模糊卡片劃清界線。
- 無旋轉版式；唯一的「動」發生在舌頭曲線與游標點。密度中等偏實。

## 元件配方

- **masthead**：柿橘底，左為原創母音四邊形徽記（56px），中為「元聲・發聲與正音教室」900 + 拉丁副名（Space Grotesk 大寫），右為地址電話 meta。
- **nav（spectrogram-band 聲譜帶導覽）**：深色（#241014）小面板，四頁排成四條水平「共振峰帶」F1–F4；`a.band` 左緣 4px 色條、`::before` 為由左掃入的 teal 漸層（hover 70%、現用 100%）；現用頁翻 teal 底、左條 teal、英文小標為頁碼式 `F1 · STUDIO`。語意是一頁＝聲譜上一條共振峰帶。≤820px 仍為縱列（本身即窄），必要時落底。避開純 topbar 文字列。
- **panel / hd**：`.hd` 區塊標 900 + 前置 12px teal 方塊（2px 墨框）+ 右側 mono `.tag` 英文小標。
- **按鈕**：`.btn` 墨底骨白字 + `3px 3px 0` 硬陰影，hover `translate(-1px,-1px)`、active `translate(2px,2px)`；`.btn.on` teal 底、`.btn.mus` mustard 底、`.btn.ghost` 透明墨字。
- **chip**：2px 墨框標籤，`.sel` 翻 teal（母音／特徵選中）。
- **表單**：2px 墨框輸入，`.field.bad` 翻 maroon 框 + 淡紅底 + 顯示 `.err`；三步驟 `.steps` 以 `.on`（墨）／`.done`（teal）標記進度；驗證＝稱呼≥2、手機 `^09\d{8}$`、Email 選填 `[^\s@]+@[^\s@]+\.[^\s@]+`。
- **切面 svg**：骨白底、2px 墨框；頭部剖面為單一 `path` 墨線、口腔頂一條弧、舌為 teal 填色 `path`、子音以 maroon `✕` 圓標成阻。
- **footer**：深墨底（#241014）三欄（理念／導覽／發聲錨點）+ 跨欄虛線「虛構＋誠實聲明」帶。

## 動效規則

- **舌位變形**：拖動母音圖時，`update()` 重算 formants 與 tongue path、即時重繪切面；共振峰以 `setTargetAtTime(F, t, 0.02)` 平滑滑到目標，聽感上是母音連續morph。
- **游標**：`pointerdown` 即發聲並定位，`pointermove` 拖動；游標點為 teal 圓 + 骨白心。鍵盤方向鍵以 0.06 步進移動、空白／Enter 切換發聲。
- **共振峰帶掃入**：nav `a.band::before` `transition:width .35s ease`。
- **按壓**：`.btn:hover/active` translate，`.1s`。
- **prefers-reduced-motion**：全站 `transition/animation:none`；核心互動天生為使用者拖動、無自動播放，內容完全等值（音訊不受影響，仍由手勢啟動）。
- 不使用：淡入揭示當 signature、數字計數、模糊陰影、marquee、自動輪播。

## 插畫與圖像風格（sagittal-tract 正中矢狀發聲切面）

**全站沒有一張外部圖片，也沒有一張「畫」的插圖**——所有圖像都由同一支引擎依發音參數程序生成：

1. **母音切面**＝固定的頭部側剖面（`HEAD` 一條 path：臉廓、口腔頂弧、上齒、咽壁）＋一條 **tongue path**：舌隆起 apex 的座標由 (fx,fy) 求出（`apexX=130+fx*110`、`apexY=92+fy*96`），舌尖前抬、舌根固定後下，填 teal。圓唇時嘴唇兩弧的開口收窄。
2. **子音切面**＝中性舌位 + 在成阻部位（雙唇 70 / 唇齒 92 / 齒齦 150 / 硬顎 176 / 軟顎 210 / 聲門 250 的 x 座標）畫一枚 maroon `✕` 圓。
3. **共振峰條**＝三根 teal 直條，高度 ∝ F1/F2/F3。
4. **母音四邊形**＝上寬下窄梯形 + 參考點 + 可拖曳游標，本身即一張可讀的圖表。
5. **logo / favicon / 發聲印記**＝母音四邊形 + teal 母音點 + 骨白舌位曲線；報名印記的 5 顆點與曲線由留位號 `FNV-1a → mulberry32` 決定性生成，同碼恆得同印。

分工不可對調：舌／母音點恆為 teal、成阻與錯誤恆為 maroon、現用／焦點恆為 mustard、線與字為墨。換一組發音參數就是換一張圖。與 xylem-section（木材解剖切面）的差別：那畫的是植物組織、明暗來自孔隙密度；本技法畫的是發聲器官、舌形由 (F1,F2) 對應的舌位參數直接解出，且同一組參數同時被拿去合成聲音。

## Logo 與 Favicon 設計指南

- **概念**：母音四邊形（梯形）＝元音圖，teal 實心點＝一個母音的位置，骨白曲線＝矢狀舌位。三者疊起來就是「把一個音放到它該在的口腔位置」。
- **logo.svg**：柿橘底方塊，墨框梯形，內部兩條高低分隔淡線，teal 大點（高前 /i/）＋ mustard 小點（現用），骨白舌位曲線橫過。
- **favicon**：同構縮版，viewBox 32×32，梯形 + teal 點，寫成 inline SVG data URI 置於 `<head>`。

## Do & Don't

**Do**
- 讓一個抽象的音對應一個看得見的身體動作（舌位／成阻），並讓聲音由該動作即時算出。
- 三支保留色（teal/mustard/maroon）嚴守語意，其餘用墨值。
- IPA 走 Space Grotesk、讀數走 mono、漢字走 Noto Sans TC。
- 音訊一律由使用者手勢啟動（AudioContext 於首次互動建立／resume）。
- 每張圖都由發音參數程序生成，靜態頁（fa.html）以烘好的 SVG 保底、無 JS 亦可通讀原理。

**Don't（含去AI化禁令）**
- 不用紫藍漸層、不用置中大標＋兩顆按鈕＋三張圓角卡片模板。
- 不用 emoji 當 icon；icon 一律自繪 SVG。
- 不用 Lorem ipsum、不用 AI 腔（「在當今快節奏的世界」）。
- 不放 marquee／自動輪播；不把通用淡入當 signature。
- 不用暗底冷色實驗室那套「儀表台」皮膚——這是暖底教學掛圖，不是科學製圖恐嚇。
- 敏感／醫療聯想需標示「教學示意、合成音非真人錄音」。

## 頁面骨架範例

```html
<!-- 共振峰合成（母音）核心 -->
<script>
function formants(fx,fy,rounded){          // fx:0前→1後  fy:0高→1低
  var F1=Math.round(270+fy*(760-270));
  var F2=2300-fx*(2300-840), F3=3000-fx*260;
  if(rounded){F2=F2*0.72-90;F3=2450;}
  return [F1, Math.round(Math.max(680,F2)), Math.round(F3)];
}
// 喇叭：sawtooth 音源 → 3 支 bandpass(F1,F2,F3) 並聯 → master → destination
// 拖動時 filter.frequency.setTargetAtTime(Fi, t, 0.02) 平滑滑到目標
</script>

<!-- 矢狀切面：舌為隨參數變形的 path -->
<svg viewBox="0 0 320 300">
  <!-- HEAD：臉廓＋口腔頂弧＋上齒＋咽壁（固定） -->
  <path d="…頭部剖面…" fill="#f0e3c6" stroke="#201410" stroke-width="2"/>
  <!-- 舌：apexX=130+fx*110, apexY=92+fy*96 -->
  <path d="M96,220 C … apex … 252,250 L252,268 L96,268 Z" fill="#1F8A82" stroke="#201410" stroke-width="2"/>
</svg>

<!-- 聲譜帶導覽 -->
<nav class="spec"><div class="cap">聲譜帶 FORMANT BANDS</div><div class="bands">
  <a class="band" href="index.html" aria-current="page">發聲台<span class="en">F1 · STUDIO</span></a>
  …
</div></nav>
```

---

*風格代號 `formant-sagittal`。同一支發音參數引擎同時驅動：母音四邊形、共振峰合成、正中矢狀切面、子音成阻圖、logo、favicon 與報名印記——全站無一張外部圖片（僅 Google Fonts）。*
