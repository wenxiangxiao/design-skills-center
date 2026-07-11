# Design Skills Center

看得到的風格，拿得走的 SKILL。

這是一座「去AI化」網頁設計風格圖書館：每個範例站都是完整可瀏覽的網站（3 頁以上、原創 Logo／favicon／SVG 插畫／動畫、真實可信的虛構文案），並附上一份 **SKILL.md** ——把整套視覺語言寫成任何 AI 都能讀懂並重現的規格書。

## 使用方式

1. 逛 [藝廊](index.html) 的 Demo，選定喜歡的風格
2. 下載該站的 `SKILL.md`
3. 丟給任何 AI：「請完全遵循這份 SKILL，為我的品牌建立網站」

風格與內容分離：同一份 SKILL 可套用到任何產業。

## 目前館藏（Vol.02）

| # | 範例站 | 產業 | 風格 | 語言 | 建置模型 |
|---|--------|------|------|------|----------|
| 01 | [光合髮室 Lumière](sites/lumiere-hair/index.html) | 美髮沙龍 | 手繪雜誌風 | 繁中 | Claude Fable 5 |
| 02 | [Kinetiq](sites/kinetiq/index.html) | 科技 SaaS | 動態加重 | EN | Claude Fable 5 |
| 03 | [糖雲 Sugar Cloud](sites/sugarcloud/index.html) | 甜點餐飲 | 糖果風 | 繁中 | Claude Fable 5 |
| 04 | [TickerHouse](sites/tickerhouse/index.html) | 金融投資 | 復古終端機 | EN | Claude Fable 5 |
| 05 | [Poppin](sites/poppin/index.html) | 社交 App | 俏皮普普風 | 中英混 | Claude Fable 5 |
| 06 | [亂流製造 Turbulence](sites/turbulence-brewing/index.html) | 精釀啤酒 | 野獸派 Brutalism | 繁中 | Claude Fable 5 |
| 07 | [驟雨書店日報](sites/sudden-rain-books/index.html) | 書店 | 報紙編輯風 | 繁中 | Claude Fable 5 |
| 08 | [Maison Luminé](sites/maison-lumine/index.html) | 婚紗攝影 | 奢華精品風 | 繁中 | Claude Fable 5 |
| 09 | [RASTER 當代美術館](sites/raster/index.html) | 美術館展覽 | 瑞士國際主義 | 繁中 | Claude Fable 5 |
| 10 | [凪 NAGI 日本茶](sites/nagi-cha/index.html) | 茶葉品牌 | 和風極簡 | 繁中 | Claude Fable 5 |
| 11 | [孔雀閣 Hôtel Pavone](sites/hotel-pavone/index.html) | 精品旅宿 | Art Deco 裝飾藝術 | 繁中 | Claude Fable 5 |

## 種子庫

[seeds.html](seeds.html) 收錄 48 個產業種子 × 28 個風格種子（1,344 種組合），內建「產業 × 風格 → AI 生成指令」組合器，用來持續擴充館藏。

## 去AI化守則

全館禁止：紫藍漸層 hero、置中大標＋三卡片模板、emoji icon、千篇一律圓角陰影卡、Lorem ipsum 與 AI 腔文案。全館要求：不對稱版面、有個性的字體配置、原創插畫與 Logo、真實可信的文案。

## 目錄結構

```
design-skills-center/
├── index.html      藝廊
├── seeds.html      種子庫 + 指令生成器
├── guide.html      使用指南
└── sites/<代號>/    index.html + 內頁 + assets/logo.svg + README.md + SKILL.md
```

---

*所有品牌、價格、地址、數據皆為虛構示意。*
