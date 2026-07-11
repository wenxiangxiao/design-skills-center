# 月位元 MOONBIT GAMES — 像素風工作室網站

台北獨立遊戲工作室「月位元 MOONBIT GAMES」的品牌網站範例。
五人團隊 + 一隻店貓，專做像素風敘事遊戲。全站採 8-bit 像素美學：
深夜藍底、螢光青／洋紅／黃三色點綴、階梯狀像素邊框、steps() 逐格動效。

> 內容皆為虛構品牌情境，所有插圖（key art、頭像、地圖、logo、favicon）
> 均為原創 SVG 像素繪製，未使用任何外部圖片。

## 檔案結構

```
moonbit-games/
├── index.html        首頁：標語、互動像素貓「歐姆」、最新作 feature、工作室理念
├── games.html        作品集：三款遊戲的 key art、規格表、平台徽章、媒體評價
├── studio.html       工作室：成員像素頭像、開發日誌、徵才職缺、聯絡地址與像素地圖
├── assets/
│   └── logo.svg      原創像素 logo（弦月＋位元）
├── README.md
└── SKILL.md          pixel-8bit-style 設計系統文件
```

## 品牌摘要

| 項目 | 內容 |
|---|---|
| 工作室 | 月位元遊戲有限公司 MOONBIT GAMES CO., LTD.（2019 創立） |
| 地址 | 103 台北市大同區赤峰街 41 巷 8 號 2 樓（捷運中山站步行 4 分鐘） |
| 團隊 | 林澈（總監）、吳曉霜（像素美術）、陳一水（程式）、高芮（敘事）、黃仲升（音樂音效） |
| 店貓 | 歐姆 OHM（首頁互動精靈本尊） |

### 作品

| 遊戲 | 類型 | 平台 | 售價 | 發售 |
|---|---|---|---|---|
| 《月台九號 PLATFORM NO.9》 | 橫向敘事解謎 | Steam・Switch | NT$ 328 | 2022 |
| 《夜市迴圈 NIGHT MARKET LOOP》 | 時間迴圈冒險 | Steam・Switch・PS5 | NT$ 468 | 2024 |
| 《九命電器行 NINE LIVES ELECTRIC》 | 修理模擬 × 敘事 | Steam・Switch | NT$ 520 | 2026 |

## 動效簽名（本站獨有）

- **互動像素貓「歐姆」**：首頁 16×16 rect 拼成的 SVG 貓。游標靠近 160px 內會眨眼、揮手
  （雙幀 visibility 切換 + `steps(1,end)`）；點擊會跳起並掉出金幣、COIN 計數 +1、
  對話框輪播台詞。純 JS/SVG，無任何外部資源。
- **逐格 8-bit 揭示**：所有區塊進場採 `steps(6,end)` 階梯式位移＋淡入，
  由 IntersectionObserver 觸發。

## 技術規格

- 每頁單檔 HTML，CSS/JS 全部 inline；頁面以相對路徑互連，nav/footer 三頁一致。
- 外部資源僅 Google Fonts（Press Start 2P / DotGothic16 / Noto Sans TC）。
- Favicon 為原創像素月亮，inline SVG data URI。
- 像素邊框以四向 `box-shadow` 疊出（角落自然缺角成階梯），詳見 SKILL.md。
- `prefers-reduced-motion: reduce` 時關閉全部動畫，內容直接顯示；貓仍可點擊計數。
- RWD：860px 併欄、560px 以下單欄不破版。
- CRT 掃描線僅以 3px 週期、16% 透明度淡淡覆蓋，不干擾閱讀。

---

*本站由 **Claude Fable 5** 設計與建置（2026-07-12）。*
