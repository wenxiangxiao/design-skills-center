# 兩陳看板 NN̄G TÂN KHUÀNN-PÁN

**產業**：手繪戲院看板畫室（兼頂樓默片夜）
**風格**：俄國構成主義 Constructivism・Stenberg 兄弟電影海報半身（型錄既有流派，第 2 站）

## 品牌設定

高雄市鹽埕區七賢三路 127 巷 8 號。陳水金（1941–2019）1958 年進鹽埕南星戲院看板間當學徒，弟弟陳水木（1944–）1962 年跟來；兄弟用幻燈機把劇照投在畫布上照著描，1968 年自立門戶，每一面看板右下角簽「2陳2」。2016 年姪孫女陳怡安（1990–）在舊書攤翻到 1997 年 MoMA 的 Stenberg 兄弟展覽目錄——也是兩兄弟、也用投影機描、也簽「2 Stenberg 2」——從此畫室把這套畫法正名，2017 年開始頂樓默片夜。

- 小看板 3×4 尺 NT$12,000（約 10 天）・喜宴看板 4×6 尺 NT$18,800（14 天）・中看板 4×8 尺 NT$26,000（21 天）・戲院規格 8×16 尺 NT$68,000 起（35 天）・主角每多一位 +NT$2,000
- 舊看板修復 NT$450 起／才・投影描稿體驗課 NT$1,600・看板明信片 NT$60・頂樓默片夜免費
- 週二至週日 10:00–19:00、週一休；默片夜每月最後一個週六 19:30；(07) 551-1968

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 看板：投影機把本月默片夜看板《鼓山渡輪夜班》描上鷹架（簽名動效）、一面看板的五道工、這個月掛出去的三面 |
| `montage.html` | 剪一段：庫里肖夫看板（func） |
| `works.html` | 價目：四種尺寸比例圖（170 cm 人形）、修復與體驗課、即時估價單（可帶入剪接草稿） |
| `about.html` | 兩陳：螺旋年表（textPath）、三位畫師、默片夜片目、鹽埕位置示意 |

## 風格關鍵字

Stenberg brothers・Sovkino film poster・projected still・three-tone posterize・ракурс foreshortening・spiral & ray burst・tilted band・condensed hand lettering・lithographic flat colour・2 … 2 signature

## 八維配方

| 維度 | 本站 |
|---|---|
| era 時代 | 1923–1933 莫斯科 × 1968– 高雄鹽埕 |
| locale 地域 | 蘇聯電影海報 × 台灣戲院看板 |
| voice 性格 | 手藝人的直白：「從來不畫中間調」 |
| texture 質感 | 石版平色、帆布、膠片格與片孔 |
| density 密度 | 中：一屏一個大構圖＋一欄資訊 |
| opening | projector-trace-first 投影描稿開場 |
| nav | kino-rays 右上角放射光束導覽 |
| function | 〈剪一段〉庫里肖夫蒙太奇剪接＋生成看板（敘事類） |

## func：〈剪一段〉庫里肖夫看板

三句規則：①畫面上是一張無表情的臉 ②從四捲片（一碗湯／一張空椅／一列開走的火車／她的背影）挑一個鏡頭接在臉後面、再接回同一張臉，剪三次 ③看樓下 41 位觀眾從同一張臉讀出什麼。剪完生成一面看板：最後一刀決定底色、第一刀決定螺旋轉向、中間一刀決定螺旋或放射；片名由第一與最後一刀組合（16 種）。可下載 SVG、複製 `?m=` 分享網址、帶到〈價目〉估價。鍵盤 1–4 可剪。約 30–60 秒一輪。

## 首創

**投影描稿 projector-trace × 庫里肖夫剪接台**：全館第一個把「投影機把一格劇照投在空白畫布、照光描成三階平色」做成簽名動效的站——灰階、模糊、梯形變形、閃爍的投影殘像先出現，梯形校正後，四道工（幾何／臉／斜帶片名／膠片格）依序以斜向筆刷 wipe 塗上，關燈後殘像消失；同一支 `trace()` 在首頁、捲動到的看板與剪接結果三處共用。〈剪一段〉則是全館第一個把庫里肖夫效應做成可操作的剪接互動：同一格臉、不同鏡頭，41 個座位即時顯示觀眾的不同讀法，並以同文件 View Transition 做每一刀的硬切。


## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-32` | Shock Lines | primary #E5306F／secondary #141212／bg #F1D21C、duration 6、density 1、intensity 1、seed 1958 | ambient：檸檬黃地上洋紅實心楔形由中心向外放射、內圈半徑一起一落——Stenberg 海報的放射光束；只用實心三角平塗，零漸層零透明，條帶斜 −1.5° 呼應本站斜帶。 |
| works.html | `TXT-A-06` | Stretch Pop | primary #E5306F／secondary #141212／bg #F1D21C、text 訂一面看板、duration 1.3、aspectRatio 16:9、seed 6（一次性，進視窗播放、點擊重播） | input：片名先被壓扁拉高、再彈回正常比例——構成主義海報把字體橫向壓縮塞進斜帶的那個動作；黃底墨字，斜 −6° 像貼在訂單上方的一條看板片名。 |
| montage.html | `TXT-A-19` | Gate | primary #E5306F／secondary #12806E／bg #F2EAD8、text 剪一段、duration 1.6、aspectRatio 16:9、seed 19（一次性，進視窗播放、點擊重播） | transition：洋紅與青綠兩片平色幕從中間向兩邊拉開，露出「剪一段」——戲院開演的布幕，也是剪接台上兩個鏡頭分開的那一刀；只有兩塊實色矩形。 |
| about.html | `BG-B-34` | Minimal Circle | primary #E5306F／secondary #F1D21C／bg #141212、duration 5、intensity 1、aspectRatio 1:1、seed 34 | ambient：墨底上一枚洋紅圓盤呼吸、外圈一段檸檬弧繞著轉——Stenberg 海報偏心圓盤與旋轉的放映機鏡頭；實心圓＋單一弧線。 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-16，排程 Agent 自動執行）。店名、人物、門牌、電話、價格、南星戲院與《鼓山渡輪夜班》皆為虛構示意；鹽埕的戲院聚落、Stenberg 兄弟的投影描稿法與「2 Stenberg 2」署名、1997 年 MoMA 展覽、庫里肖夫實驗為真實背景。所有圖像為程式繪製的原創三階描稿，未複製任何既有海報。*
