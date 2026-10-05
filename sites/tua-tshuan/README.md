# 大川膠鞋 Tuā-tshuan Rubber

> 膠鞋廠 × 德國物件海報 Sachplakat／Plakatstil（Lucian Bernhard，柏林 1906–1914）

臺南永康的膠鞋廠，1969 年林大川以兩台手壓機開工，做藍白拖、白雨鞋、鋼頭工作雨鞋與紅帆布童鞋。第三代林宥辰 2024 年把所有廣告重畫成物件海報——一雙鞋、兩個字、一個底色——並在廠門口立起一根廣告柱。

## 品牌設定

- 地址：臺南市永康區永大路二段 413 巷 21 號・(06) 253-4417
- 門市：週一至週六 08:00–17:30，週日公休
- 看工廠：每月第二個週六 09:30，九十分鐘，15 人，NT$200（送一雙藍白拖）
- 商品：No.1 藍白拖 NT$129／打 1,320・No.7 白雨鞋 NT$420／打 4,560・No.12 鋼頭工作雨鞋 NT$680／打 7,440・No.3 紅帆布童鞋 NT$260／打 2,880
- 人物：廠長 林秀琴、海報與門市 林宥辰、成型領班 陳阿蓮、送貨 黃志明

## 頁面

| 檔案 | 頁 | 內容 |
|---|---|---|
| `index.html` | 柱 Column | 開場即一根可拖曳旋轉的 CSS 3D 廣告柱（依真實週數轉到本週那面）、「坐電車經過」、Bernhard 與 Litfaß 的來由 |
| `shoes.html` | 鞋 Shoes | 每款一個全寬區塊，區塊地色＝海報地色，價格與規格寫在海報旁 |
| `paintout.html` | 刷 Paint-out | 核心功能〈刷〉：三張塞滿東西的舊廣告，刷掉雜物、換底色、坐電車經過受檢 |
| `factory.html` | 廠 Factory | 年表、廠裡的人、門市／參觀／批發、柱子正面輪替表 |

## 風格關鍵字

Sachplakat、Plakatstil、object poster、Lucian Bernhard、Priester 1906、Stiller 1908、Hollerbaum & Schmidt、Litfaßsäule、石印四色、平塊無描線、牌名即唯一的字、一瞥可讀

## 八維配方

- era：1906–14 柏林物件海報 × 2026 臺南永康
- locale：永康工業區巷弄，膠鞋王國時期留下的小廠
- voice：工廠人的實話——「鋼頭不是賣點，是不用去醫院」
- texture：零質感石印平色
- density：低——一頁一個地色、一張海報一件東西
- function：〈刷〉編輯（減法）＋判讀：刷掉雜物、換底色、30 公尺視距量測、電車一瞥（非模擬儀器台、無量表、非配置購物、非限時、非探索找物、非聲音、非排序工具）
- opening：litfass-first 廣告柱直開場
- nav：pasted-bill-rail 小海報側欄

## 技術

CSS 3D `preserve-3d` 廣告柱／Pointer Events＋setPointerCapture＋getCoalescedEvents 筆刷（以雜物聯集為 SVG mask）／SVG→canvas 40×56 下採樣＋OKLab ΔE 的 30 公尺視距量測。詳見 SKILL.md 第 12 章。

## 首創

**paint-out-to-the-object 減法刷除＋視距判讀**：全館第一個把「設計流派的誕生軼事」做成可玩規則的站——Bernhard 1906 年把桌巾、菸灰缸、雪茄、女郎一樣一樣用底色塗掉，你也照做；刷完的海報被縮成三十公尺外的 40×56 點、逐點算 OKLab 色差，再貼上一根 CSS 3D 廣告柱，以 1.2 秒的電車一瞥接受路人檢驗，通過的版本跨頁出現在首頁柱上。

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-05）（排程 Agent 自動執行）。*
