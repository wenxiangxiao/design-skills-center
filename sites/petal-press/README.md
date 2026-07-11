# 疊瓣花社 Petal Press — 範例網站

台中西區的虛構花店品牌網站:主打「像印刷一樣疊出來的花束」,整站以 Risograph 復古印刷語言打造——米白紙底、螢光粉 + 藍雙色油墨、疊印錯位、顆粒紋理、裁切線與對位十字。

## 檔案結構

```
petal-press/
├── index.html        首頁:品牌宣言、疊印花束主視覺、色版打樣室(招牌互動)、本週花束
├── bouquets.html     花束目錄:本季 8 束(雙色分版插畫+花材+油墨比例+價格)、每週訂閱三方案
├── atelier.html      工作室:插花課程表、訂製四步流程、店址/營業時間/手繪地圖、FAQ
├── assets/
│   └── logo.svg      原創雙色疊印字標(粉/藍兩版錯位 3px,含對位十字與版號)
├── README.md
└── SKILL.md          Risograph 印刷風格設計技能文件
```

## 設計系統速記

- **油墨**:Fluorescent Pink `#FF48B0`、Medium Blue `#3255A4`、特色黃 `#FFE800`(少量);疊色 `#321871` 一律由 `mix-blend-mode: multiply` 疊出,不直接填色。
- **紙**:米白 `#F7F1E3`,亮紙 `#FCF8EC`;整頁鋪 SVG `feTurbulence` 噪點模擬紙粒。
- **字體**:Noto Serif TC(標題與內文)+ Space Grotesk(工單、編號、英文標語)。
- **疊印文字**:`.op` 元件以 `::before`(粉)/`::after`(藍)兩層 `attr(data-text)` 錯位 2px 疊印。
- **插畫**:全部原創 inline SVG,採「分版畫法」——粉版畫花、藍版畫莖葉,藍版預設偏移 (3px, 2.5px)。

## 招牌動效(本站獨有)

1. **色版開關**:首頁「色版打樣室」有 PINK PLATE 01 / BLUE PLATE 02 兩顆開關,可各自停版;關掉一版,全站插畫與疊印標題退回單色打樣稿(兩版全關=白紙)。
2. **套準失調 hover**:滑過花束票券卡時,藍版偏移由 3px 加大到 6px、粉版反向偏移 2px,模擬印刷對位跑掉的瞬間。

兩者皆在 `prefers-reduced-motion` 下降級為靜態。

## 技術規格

- 每頁單檔 HTML,CSS/JS 全部 inline;頁面以相對路徑互連,nav/footer 一致。
- 外部資源僅 Google Fonts;favicon 為 inline SVG data URI(雙色疊印小花)。
- RWD 斷點 900px / 560px,窄幅不破版;課程表在行動版轉為堆疊工單。

## 預覽

直接以瀏覽器開啟 `index.html` 即可(無需建置工具或伺服器)。

---

*本站由 **Claude Fable 5** 設計與建置(2026-07-12)。*
