# 夢園造型樹苗圃 BĀNG-HN̂G

彰化田尾打簾村的造型樹苗圃（虛構）。1983 年一位義大利修女帶來一本 1499 年威尼斯木刻書的翻印本——*Hypnerotomachia Poliphili*——指著書裡照樹的形狀排的字說：「那時候連字都照樹的樣子排。」從此園裡每一棵樹的吊牌都照它自己的形狀寫。整站就是那本書：一種墨、Griffo 式羅馬體、段落排成高腳杯與漏斗、輪廓木刻、折標與提示字。

## 品牌設定

- 詹清水〔1938–2012〕1972 年把菊花田改種苗木，1979 年接到第一張「修成球」訂單；詹素琴〔1964–〕接園、做杯形；第三代管配送與修剪課（皆虛構）。
- 地址：彰化縣田尾鄉打簾村光復路二段 418 號〔門牌虛構〕；電話 (04) 883-1499〔虛構〕；每日 07:30–17:30，週三 12:00 後休。
- 價目：球形七里香 Ø40 NT$1,800 起、杯形雀舌黃楊 H90 NT$6,800、圓錐羅漢松 H150 NT$12,000、三層塔 H180 NT$18,500、螺旋龍柏 H160 NT$9,800、黃金榕圓頂柱 H200 NT$5,400；到府修剪每株 NT$350 起；修剪課 NT$600。
- 真實背景：Hypnerotomachia Poliphili（Aldus Manutius，威尼斯 1499）、Francesco Griffo、Francesco Colonna 離合詩、田尾、八卦山、台一線、北斗交流道、田中／員林站。其餘皆虛構。

## 頁面

| 頁 | 折標 | 內容 |
|---|---|---|
| `index.html` 卷首 | a | 封面木刻（拱門、圓錐列、兩甕球形樹）＋高腳杯形店家介紹＋即時開園狀態；HORTVS 六章，首字連起來是 H·O·R·T·V·S；漏斗形版權頁 |
| `trees.html` 樹譜 | b | 〈修剪台〉拖曳樹冠，旁邊那段字跟著重排；六種造型樹，每段說明排成那棵樹的形狀；價目與工 |
| `dream.html` 夢 | c | 〈三個夢〉選門、說住處、說修剪頻率，夢醒得到一棵照自己形狀寫的樹（可分享 `#d=g-p-c`） |

## 風格關鍵字

Aldine、Hypnerotomachia Poliphili、搖籃本 incunabula、shaped text、高腳杯版式、漏斗章末、Griffo 羅馬體、零粗體零斜體、輪廓木刻、黑地藤蔓首字、折標 signature mark、提示字 catchword、碎布紙簾紋鏈線、對開 verso／recto。

## 八維配方

| 維度 | 本站 |
|---|---|
| 產業 | 造型樹苗圃（球、杯、錐、塔、螺、柱；到府修剪；代養修形；修剪課） |
| 風格 | Aldine 文藝復興書冊・Hypnerotomachia 杯形排版（型錄「印刷與製程」新增條目，全館第 1 站） |
| era 時代 | 1499 威尼斯 × 2026 田尾 |
| locale 地域 | 彰化田尾打簾村 |
| voice 性格 | 園丁的口吻，安靜、具體、講規矩 |
| texture 質感 | 碎布紙簾紋與鏈線、單一黑墨、木刻刻線 |
| density 密度 | 疏：大邊距、對開、尖端留白 |
| function 功能 | 〈三個夢〉敘事選路（門→住處→修剪頻率→一棵樹）；〈修剪台〉即時重排 |

## 動效四種

- ambient：木刻樹冠擺動、雲漂、鳥飛（+ BG-A-11、BG-A-29）
- input：修剪台拖曳 → 樹冠與文字杯同幀重算、葉片掉落
- transition：右頁沿書溝翻頁（換頁與夢的每一步）、門扇打開
- signature：**傾注**——段落由矩形被 shape-outside polygon 擠成杯／漏斗／樹形，字一行行往下流到尖端（scroll-driven）

## 首創

全館第一個「段落由兩個 float 的 shape-outside polygon 補間、隨捲動從矩形傾注成杯／漏斗／樹形」的站，且木刻樹形與文字杯形共用同一支剖面函式——畫樹與排字是同一條曲線；容量（每行字數）由剖面預先算出，杯高與字數精確對應；修剪台讓使用者改剖面、字即時重排。

## motion-library 元件

| ID | 名稱 | 頁 | 類型 | 承載 |
|---|---|---|---|---|
| TXT-B-36 | Ink Bleed | index | transition | 店名「夢園」由墨點暈開 |
| BG-A-11 | Parallel Curves | index | ambient | TEMPVS 章的木刻風刻線帶 |
| TXT-B-16 | Circle Text | trees | transition | FESTINA·LENTE 圓章 |
| TXT-A-02 | Letter Sequence | dream | input／transition | 每一夢的章名逐字升起 |
| BG-A-29 | Topo Lines | dream | ambient | 夢醒後的維納斯之泉水紋 |

來源：motion-library 1.37.0 @b655b9df（tools/ml-embed.js 子集，建置期字族替換 Cardo／Noto Serif TC、字重 400，terser 壓縮；tools/ml-smoke.js smoke ok）。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-10）（排程 Agent 自動執行）。*
