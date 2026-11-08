# 過灘泛舟 KUE-THUANN

秀姑巒溪泛舟業者 × **Atari VCS／TIA 掃描線像素風（Racing the Beam）**

花蓮瑞穗的泛舟店。創辦人高天助（Kacaw）從 1986 年起每天早上在黑板上畫今天的河：兩岸一樣粗、中間一條水、險灘點白點。孫子林子翔發現那塊黑板和倉庫裡那台木紋面板的 1977 年遊戲機守同一套規矩——一條線只有一種水色、一種岸色，畫面一行一行往下畫——於是照那顆顯示晶片（TIA）的規則重寫了整站畫面。

## 頁面

| 檔案 | 卡匣 | 內容 |
|---|---|---|
| `index.html` | GAME 1 河 | 攻擊模式開場：河自己往下游捲、船自己划；←→／游標／搖桿接手掌舵，↑↓ 調流速；GAME SELECT 換四種行程；今日水情、四種玩法、黑板的故事、操作表 |
| `book.html` | GAME 2 預約 | 〈插卡報名〉：主機開關就是報名表——搖桿左右選日子、上下加減人數、DIFFICULTY 選包船與便當、FIRE 送出；畫面是 12 天剩餘船位的彩虹長條，GAME RESET 試划這一程 |
| `river.html` | GAME 3 河道 | 捲軸就是船：22 公里依真實順序（瑞穗碼頭 → 奇美 → 長虹橋），sticky 螢幕跟著捲動往下游；下水前五件事 |

## 品牌設定（虛構）

- 花蓮縣瑞穗鄉中山路三段 286 號〔門牌虛構〕・(03) 887-1986〔虛構〕
- 人物：高天助 Kacaw（1952–，創辦人）、高美玲 Panay（1979–，教練長）、林子翔（1998–，寫畫面的人）
- 行程：GAME 1 全程約 22 km NT$1,000／GAME 2 前段 NT$800／GAME 3 後段（12 歲以上）NT$850／GAME 4 親子平流 NT$600；包船每艘加 NT$2,400；不要便當每人少 NT$100
- 4–10 月兩梯 07:30／11:30；11–3 月一梯 10:30、加借防寒衣
- 真實背景：秀姑巒溪、瑞穗、奇美（Kiwit）、長虹橋、全程約 22 公里、約 23 處險灘、3–4 小時；Atari VCS（1977）、TIA 顯示晶片、Montfort & Bogost《Racing the Beam》（MIT Press, 2009）。其餘皆虛構。

## 風格關鍵字

40 格鏡像 playfield・一條掃描線一組顏色・160×192 寬像素・NTSC 128 色・8 像素寬精靈與隔格閃爍・PF 分數字・HMOVE 黑梳齒・彩虹階梯條・木紋前板＋黑色肋條＋銀色撥桿

## 八維配方

- era：1977–1983 家用遊戲機第二世代
- locale：花蓮縱谷・秀姑巒溪
- voice：嚮導講解口吻，短句、口令式（「前划、後划、停、蹲」）
- texture：寬像素、掃描線色帶、木紋、黑色肋條塑膠
- density：螢幕內極低（受硬體限制）＋說明書區中等
- function：預約／選位（主機開關報名）——非模擬儀器台、無參數滑桿
- mood：woodgrain-console-ntsc 木紋主機・NTSC 色
- illust：tia-scanline-kernel TIA 掃描線組畫

## 四種動效

- **ambient**：攻擊模式——河自己捲、船自己划；險灘的浪花掃描線隨格數循環換色
- **input-driven**：鍵盤／游標／Gamepad 每格輪詢掌舵（同一格內反映，<17ms）；預約頁搖桿移動箭頭精靈並觸發 HMOVE 梳齒
- **transition**：跨文件 View Transitions「關機收線」（舊頁 steps(6) 收成一條橫線、新頁從橫線張開）；GAME SELECT／RESET 時螢幕 steps(7) 垂直捲動（垂直同步跑掉）
- **signature**：**追光束 racing the beam**——按住紅鈕／B 鍵／搖桿 B 鈕，時間停住，光束每格只前進 24 個色鐘，看畫面一條線一條線被寫出來，底下即時列出那條線的 COLUBK／COLUPF／PF0–PF2／GRP0／HMOVE

全部有 `prefers-reduced-motion` 降級：畫面停在一格但掌舵仍即時重畫；追光束改為直接標出第 150 條線並列出暫存器；轉場關閉。

## 首創

**追光束＋暫存器讀值**：全館第一個以真實顯示晶片的暫存器語意（20 位元 playfield 的 PF0 D4–D7／PF1 D7–D0／PF2 D0–D7 位元序、鏡像或重複、一條線一組 COLUBK／COLUPF、兩個 8 位元精靈）逐掃描線組出整站畫面，並讓使用者按住按鈕看光束把畫面寫出來的站；也是第一個用主機實體開關（GAME SELECT／DIFFICULTY A·B／TV TYPE／RESET）當報名表的站。

## motion-library 元件

| ID | 名稱 | 頁 | 類型 | 承載 |
|---|---|---|---|---|
| TXT-B-38 | Text Mosaic | index | transition | 卡匣標籤上的店名從 playfield 解析度的大方塊解析成印刷字——螢幕像素到標籤印刷的橋 |
| BG-B-37 | Minimal Stripes | index | ambient | 標籤下緣一條岸綠／河藍直條帶慢慢平移，像 playfield 的整欄色塊 |
| TXT-A-29 | Counter | book | input | 每次改人數、行程、開關，價錢像分數一樣從 0 數上來 |
| SHP-32 | Stairs Rise | book | ambient | 票根下緣七根由紅到黃的階梯條＝彩虹階梯，只有方塊 |
| TXT-B-27 | Pixel Dissolve | river | transition | 「22 KM・23 灘」以方格逐格溶出 |

來源：motion-library 1.36.0 @ede9bb9e（逐頁子集，tools/ml-smoke.js smoke ok）。

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-11-09）（排程 Agent 自動執行）。*
