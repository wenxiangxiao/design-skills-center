# 月殿影展 Lune Palace Film Festival

**產業**：電影影展　**風格**：Art Deco 裝飾藝術　**語言**：繁體中文

一座落腳台北大稻埕、一九三〇年代裝飾藝術戲院裡的虛構影展。第七屆・2026 年 11 月・十天五個單元。全站以鎏金、深紫墨、牛血紅構成 Deco 的高對比與對稱幾何，並以「戲院燈泡跑馬框追逐光」與「扇形放射進場揭示」作為動效簽名。

## 品牌設定

- **名稱**：月殿影展 Lune Palace Film Festival（第七屆）
- **場地**：月殿大戲院，台北市大同區迪化街一段 178 號（光廳 320 席／影廳 180 席／露臺 90 席）
- **會期**：2026 年 11 月 6 日 – 15 日
- **單元**：金月獎主競賽、午夜劇場、修復經典、亞洲新視野、紀錄之眼
- **票價**：單場 NT$280／五場套票 NT$1,200／影展通行證 NT$2,800
- **聯絡**：(02) 2557-6809 ・ hello@lunepalace.tw

> 品牌、人名、片名、地址、電話、票價皆為示範用途之虛構設定。

## 頁面清單

- `index.html` — 首頁。滿版裝飾藝術海報開場（fullbleed-art），含放射光暈、燈泡追逐畫框、月相標誌；下接影展簡介、五單元、焦點片單與金月獎面板。
- `programme.html` — 節目手冊。依日期切換的放映時刻表（開幕／Day 2／Day 3／Day 5／閉幕），標示單元色標、影廳與映後座談。
- `tickets.html` — 售票。三款 Deco 票根卡（含撕票孔洞）、可互動的三廳平面配置圖、購票須知手風琴。

## 開場與導覽原型

- **開場（opening）**：`fullbleed-art` — 滿版影展海報作為首屏，非大標 hero。
- **導覽（nav）**：`masthead` — 置中刊頭式導覽，戲院名居中、選單左右分列、上下鎏金雙線。
- **動效簽名（signature）**：戲院燈泡跑馬框追逐光（marquee bulb-chase frame）＋扇形放射／円月進場揭示。

## 技術

- 每頁單檔 HTML，CSS/JS 全 inline，頁面間相對路徑互連。
- 原創 `assets/logo.svg` 與 inline SVG data URI favicon；所有插圖為原創 SVG／CSS，零外部圖片。
- 外部資源僅 Google Fonts（Cinzel／Poiret One／Noto Serif TC／Noto Sans TC）。
- 全站支援 `prefers-reduced-motion` 降級與 RWD（≤820px 重排）。

## 風格規格

完整可重現的視覺語言規格見同目錄 `SKILL.md`，任何 AI 讀完即可替其他產業做出同風格網站。

---

*本站由 **Claude Opus 4.8**（排程 Agent 自動執行）設計與建置（2026-07-13）。*
