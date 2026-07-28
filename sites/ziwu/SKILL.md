---
name: projection-cartographic
description: A cartography-studio style built around a live map-projection engine, where the hero is a deformable globe that continuously unrolls from an orthographic sphere into any flat projection while numerically-computed Tissot indicatrix ellipses reveal the area/shape distortion; a bold duotone atlas of deep sea-green ocean and ochre land, ivory reading panels, brass graticule lines, coral accents, an engraved-but-modern feel, and a graticule-projection illustration language where every image is the same sphere coordinates solved under a chosen projection. Never parchment-beige, never a dark instrument panel.
---

# 投影輿圖風 Projection-Cartographic

## 一、設計哲學

這個風格從一個數學事實長出來：**球面不可能無失真攤成平面**（高斯絕妙定理）。一張世界地圖永遠在某處撒謊——問題只是撒在面積、形狀還是距離上。整個站就是把這個取捨變成可以親手操作、親眼看見的東西。

三個信念：

1. **地圖是引擎算出來的網格，不是圖片。** 首頁的地球、圖鑑的每一張縮圖、logo、favicon、報名徽記，全部由同一支投影引擎把同一組經緯座標在某投影下解出來。沒有一張是「畫」的，也沒有一張外部圖片。拿掉這層皮膚，底下仍有一個別站沒有的東西——一顆可以連續攤平、且每一點的變形都被即時量出來的地球。
2. **雙色域，是海與陸，不是裝飾。** 兩塊大色域——深海松綠的海、陶土赭金的陸——本身就是地圖的內容。象牙只給要讀字的面板，黃銅只給刻線，珊瑚只給「現用」與「變形過頭」的警示。**不用米白紙感當底**（那會讓製圖站退化成一張古地圖海報），**也不壓成暗底儀器台**（那會變成又一台冷冰冰的模擬機）。這是一間亮著燈、攤著海圖的工作室。
3. **冷靜，但不冷漠。** 這是一間替出版社與航運公司選投影的工作室。文案要有具體的人、地址、費用、行話（等積、正形、折衷、變形橢圓、絕妙定理、子午線），像製圖師寫在圖框角落的註記，不是療癒文案，也不賣弄術語。

## 二、色彩系統

雙色域（duotone），深海松綠與陶土兩塊大色域主導；象牙、黃銅、珊瑚為輔。

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 深海松綠 sea | `#1C5A4E` | 頁面主底、海洋填色 | ~40% |
| 深綠二／三 sea2 / sea3 | `#153F37` / `#0F332C` | 導覽／頁尾／地圖框底、深件 | ~10% |
| 陶土赭金 land | `#CF9042`（深 `#B2762F`） | 陸地填色、長瓣、強調 | ~22% |
| 象牙 panel | `#EFE6CF`（次 `#E2D6B8`） | 面板／卡片／閱讀面 | ~14% |
| 墨 ink | `#141B18` | 字、2px 描邊、輪廓 | ~7% |
| 黃銅 brass | `#C9A24A`（深 `#9A7A2C`） | 經緯刻線、標籤、金屬細線、連結 | ~4% |
| 珊瑚 coral | `#E8552E` | 現用態、主按鈕、警示、變形過頭的橢圓 | ~3% |
| 蒼綠 pale / pale2 | `#CFE2D4` / `#8FBBA6` | 深底上的經緯網、次要文字 | 細節 |

規則：珊瑚是稀有色，只給「現在」與「危險（面積被吹大 >1.6 倍或形狀比 >1.5）」。海是最大面積，陸是第二，象牙只在需要讀字時出現。**絕不**把主底換成米白或近黑。

## 三、字體系統

- **標題／大字**：`Newsreader`（display serif，opsz 6..72）900／700，帶古典輿圖的襯線但收得俐落；大標可用斜體 500 作引言。
- **中文標題／品牌**：`Noto Serif TC` 900。
- **內文**：`Noto Sans TC` 400／500／700。
- **座標／標籤／英文小標／編號**：`Space Mono` 400／700，letter-spacing .05–.16em——所有經緯度、投影英文名、報名編號、圖說都走 mono。
- 字級 scale：品牌 24–30、頁面大標（Newsreader）30–34、H2 19–23、內文 16–16.5、mono 標籤 9–12。行高標題 1.16、內文 1.72–1.76。

## 四、版面與網格

- 主導覽為 **meridian-gore rail 子午瓣側桿**：桌機左緣 74px 固定直欄，四頁為四片橘子皮長瓣（gore）SVG，現用頁那瓣「攤平」成飽滿珊瑚色實心瓣、頁名翻墨；其餘為瘦長深綠瓣。≤820px 落為底部 56px 橫向 dock。`body` 依側欄留 `padding-left:74px`（行動版改 `padding-bottom`）。
- **工作室（index）**：左右分欄 `minmax(0,1fr) 350px`——左為地圖 SVG（viewBox 760×500），右為控制面板（製圖需求 chips → 投影法清單 → 攤平桿 / 轉動桿 → Tissot 開關 → 保真度雙條 → 建議框）。≤900px 疊成單欄。
- **圖鑑（tu）**：`auto-fill minmax(268px,1fr)` 卡片牆，每卡上半為即時繪的地圖 SVG、下半為標籤＋blurb＋面積／形狀雙條。
- 卡片與面板一律 2px 實線墨框 + `6px 6px 0` 硬投影（無圓角、無模糊陰影）。留白中等，不極密也不極疏。
- 地圖框底色為 sea3（比海更深），讓投影的輪廓（矩形／橢圓瓣／圓）浮出來。

## 五、元件配方

- **nav 長瓣**：`<svg viewBox="0 0 44 74">` 內一片 `M22 3C13 16 13 58 22 71C31 58 31 16 22 3Z` 的 gore path；現用頁換成飽滿版 `M22 3C10 16 10 58 22 71C34 58 34 16 22 3Z` 填珊瑚、描墨；文字用 `writing-mode:vertical-rl` 直排，行動版轉水平。
- **按鈕**：`.btn` 珊瑚底墨框 `4px 4px 0` 硬影、Newsreader 900；次要 `.btn.sec` 象牙底。`.chip` / `.tog` 為方形墨框標籤，選中翻深海綠或黃銅底。
- **投影清單項**：一列 = 迷你經緯縮圖（30×22）＋中文名＋英文 mono 小標＋排名 `#1/#2/#3`（珊瑚）。現用項翻黃銅底。
- **保真度條**：12px 高、象牙底墨框，內填深海綠；分數 <55 時整條翻珊瑚（`.warn`）。面積條與形狀條並列。
- **表單**：白底墨框輸入，`:focus` 珊瑚 outline；錯誤訊息 mono 珊瑚色列在欄位下。多步驟以頂部三格 steps 條標示（現用格翻黃銅）。
- **footer**：sea2 底、墨框上緣，三欄（簡介／聯絡／索引）＋底部 mono 免責聲明（虛構示意＋建置模型）。

## 六、動效規則

**唯一的動效簽名是攤平本身**——一切運動都由使用者拖桿驅動，不自動播放、不輪播、無跑馬燈。

- **攤平（flatten）**：攤平桿 0→100% 時，每個頂點的螢幕座標在「正射球儀解」與「所選投影解」之間線性內插（`lerp`），即時重繪經緯網、海岸線、邊界與 Tissot 橢圓。用 `requestAnimationFrame` 節流，一次只排一幀。
- **轉動（rotate）**：中央經線桿把 `effRot = rot·(1−t)` 套進經度位移，攤平時自動回正；折線遇反經線（相鄰經度差 >180°）就斷開重起子路徑，避免橫跨接縫。
- **切投影**：點投影項時，若已攤平就直接換解重繪（不做補間），保持俐落。
- 明確**避開四項過載語彙**：不用揭示淡入當簽名、不用數字計數滾動、不用按壓硬陰影當互動回饋、不用 stroke-dashoffset 描繪。分數改變是即時跳值（功能性），hover 反白 .12s。
- `prefers-reduced-motion`：起始就停在攤平度 100% 的推薦投影（不從球儀滾動展開），核心操作仍可用。

## 七、插畫與圖像風格（graticule-projection 經緯投影構圖）

全站沒有一張外部圖片、也沒有一張描外形的自由插圖——所有圖像都由三種原語在某投影下解出：

1. **經緯網 graticule**：每 30° 一條經線／緯線，各以 6° 取樣成折線，蒼綠 `#CFE2D4` 細線（0.7–0.8px）半透明。
2. **海岸線 coastline**：粗略世界輪廓多邊形（陶土填、墨描邊，教學示意、非測繪），換投影即換形狀。
3. **變形橢圓 Tissot**：在 30°×30° 網格點放橢圓，長短半軸由數值雅可比的奇異值決定、依該投影平均面積正規化顯示大小；面積被吹大或形狀被扭斜到閾值即翻珊瑚。三顆帶標籤（格陵蘭／剛果盆地／澳洲）示範經典對比。

換一個投影、轉一個角度、拉一次攤平，就是換一張圖；同一組參數恆得同一張。靜態方法頁（fa）的圖解則是手工烘好的原創 SVG（橘子皮長瓣、三種變形橢圓、等積 vs 正形對照），無 JS 亦可見。

## 八、Logo 與 Favicon 設計指南

- **Logo**：一顆經緯地球——深綠球面、黃銅外環、蒼綠經緯線，**中央子午線以陶土色加粗描出**（呼應「子午」社名與攤平的那一刀），最外圈 2.4px 墨環收邊。
- **Favicon**：同一顆地球的 32×32 精簡版（海綠底＋蒼綠十字經緯＋一條陶土子午線＋黃銅環），inline SVG data URI 寫在每頁 `<head>`。
- 兩者都出自同一套「同心圓＋經緯弧＋一條強調子午線」的語言，不引入其他圖形。

## 九、Do & Don't

**Do**
- 讓地圖是算的：所有圖像同源於一支投影引擎，換投影即換圖。
- 雙色域說故事：海綠與陸陶土是內容，象牙只讀字、黃銅只刻線、珊瑚只警示。
- 文案從投影本身長出：等積／正形／折衷／變形橢圓／絕妙定理／子午線，配具體人地價。
- 變形要「量」出來、不是「說」出來：Tissot 橢圓與保真分數用數值方法算，且可被使用者自己驗證（切等積投影→面積分數應接近滿分、切麥卡托→形狀分數應接近滿分）。

**Don't（含去AI化禁令）**
- 不用米白紙感／羊皮紙當底（製圖站最容易犯的退化）；不壓成近黑暗底儀器台。
- 不用紫藍漸層 hero、不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- 不用 emoji 當 icon（一律自繪 SVG）；不用 rounded-2xl＋模糊陰影卡片。
- 不放外部圖片（含世界地圖點陣圖）；地圖一律程序生成。
- 不用跑馬燈、不自動播放；不把揭示淡入／數字計數／按壓硬陰影／dashoffset 當簽名。
- 不宣稱海岸線精確或可導航——一律標明粗略示意、教學用途。

## 十、頁面骨架範例（可直接使用）

```html
<!-- 投影引擎核心（節錄）：球面座標 -> 平面 -> Tissot -->
<script>
const D2R=Math.PI/180;
const PROJ={
  ortho:(lo,la)=>{const l=lo*D2R,p=la*D2R;return{x:Math.cos(p)*Math.sin(l),y:Math.sin(p),c:Math.cos(p)*Math.cos(l)};},
  mercator:(lo,la)=>({x:lo*D2R,y:Math.log(Math.tan(Math.PI/4+Math.max(-89.5,Math.min(89.5,la))*D2R/2))}),
  gallpeters:(lo,la)=>({x:lo*D2R,y:2*Math.sin(la*D2R)}),           // 等積
  sinusoidal:(lo,la)=>({x:lo*D2R*Math.cos(la*D2R),y:la*D2R})       // 等積
};
// 數值雅可比 -> Tissot 橢圓長短半軸 a>=b（面積 a*b、形狀 a/b）
function tissot(fn,lo,la){
  const d=0.4,cp=Math.max(Math.cos(la*D2R),1e-4);
  const px=fn(lo+d,la),mx=fn(lo-d,la),py=fn(lo,la+d),my=fn(lo,la-d);
  const a11=(px.x-mx.x)/(2*d*D2R)/cp,a21=(px.y-mx.y)/(2*d*D2R)/cp;
  const a12=(py.x-my.x)/(2*d*D2R), a22=(py.y-my.y)/(2*d*D2R);
  const M00=a11*a11+a21*a21,M11=a12*a12+a22*a22,M01=a11*a12+a21*a22;
  const tr=M00+M11,det=M00*M11-M01*M01,dc=Math.sqrt(Math.max(0,tr*tr/4-det));
  return{a:Math.sqrt(tr/2+dc),b:Math.sqrt(Math.max(1e-9,tr/2-dc)),ang:0.5*Math.atan2(2*M01,M00-M11)};
}
</script>
```

```css
:root{--sea:#1C5A4E;--sea2:#153F37;--sea3:#0F332C;--land:#CF9042;
  --panel:#EFE6CF;--ink:#141B18;--coral:#E8552E;--brass:#C9A24A;--pale:#CFE2D4;
  --disp:'Newsreader',serif;--serif:'Noto Serif TC',serif;--sans:'Noto Sans TC',sans-serif;--mono:'Space Mono',monospace;}
body{background:var(--sea);color:var(--panel);font-family:var(--sans);padding-left:74px}
.panel{background:var(--panel);color:var(--ink);border:2px solid var(--ink);box-shadow:6px 6px 0 rgba(6,32,26,.4)}
.btn{background:var(--coral);color:var(--panel);border:2px solid var(--ink);box-shadow:4px 4px 0 rgba(6,32,26,.4);font-family:var(--serif);font-weight:900}
```

驗收：一個從未看過本 Demo 的 AI，只讀本檔，應能做出一個「所有地圖都由投影引擎程序生成、以深海綠×陶土雙色域為底、把球面攤平與變形量測當核心互動」的全新網站，而不是又一張米白古地圖海報。
