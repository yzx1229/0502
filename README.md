# 20250502筆記
![image](https://hackmd.io/_uploads/Sylqn2Zxge.png)

## 第一條指令
```tex=
產生一個全螢幕的畫布， 背景顏色為d6ccc2，
擷取攝影機的影像， 正常的顯示在視窗的中間，
影像畫面寬高為視窗大小的65%，請把程式碼寫在sketch.js內
```

***
### 說明:
1. createCanvas(windowWidth, windowHeight)：設定畫布大小為全螢幕。
2. background('#d6ccc2')：設定背景顏色為 #d6ccc2。
3. createCapture(VIDEO)：啟用攝影機擷取影像。
4. capture.size(windowWidth * 0.65, windowHeight * 0.65)：將攝影機影像大小設為視窗的 65%。
5. image(capture, x, y, capture.width, capture.height)：將攝影機影像繪製在畫布中央。
6. windowResized：當視窗大小改變時，重新調整畫布與影像大小。
***
```javascript=
let capture;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色為 d6ccc2
  background('#d6ccc2');
  
  // 初始化攝影機擷取
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.65, windowHeight * 0.65); // 設定影像大小為視窗的 65%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
  // 繪製背景
  background('#d6ccc2');
  
  // 計算影像顯示位置，使其位於視窗中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 繪製攝影機影像
  image(capture, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.65, windowHeight * 0.65);
}
```
---
## 第二條指令
```tex
攝影機畫面要顯示鏡像畫面
```
![IMG_0305](https://hackmd.io/_uploads/SyUG1n-xeg.jpg)

***
### 說明
 1. push() 和 pop()：使用 push() 保存當前畫布狀態，pop() 恢復畫布狀態，避免影響其他繪製操作。
2.translate(width, 0)：將畫布的原點移到右上角，為水平翻轉做準備。
3.scale(-1, 1)：水平翻轉畫布，實現鏡像效果。
4.image(capture, x, y, capture.width, capture.height)：在翻轉後的畫布上繪製影像。
***
```javascript=
let capture;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色為 d6ccc2
  background('#d6ccc2');
  
  // 初始化攝影機擷取
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.65, windowHeight * 0.65); // 設定影像大小為視窗的 65%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
  // 繪製背景
  background('#d6ccc2');
  
  // 計算影像顯示位置，使其位於視窗中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 翻轉畫布以顯示鏡像
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height); // 繪製影像
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.65, windowHeight * 0.65);
}
```
---
## 第三條指令
```tex=
利用createGraphics指令，產生一個與video視訊畫面一樣的寬高一樣的大小內容，
該圖片顯示在視訊畫面的上方
```
***
### 說明:
1. **`createGraphics`**：
   - 使用 `createGraphics` 建立一個與視訊畫面大小相同的圖形內容。
   - 在 `overlayGraphics` 上繪製半透明紅色背景和文字。

2. **`image(overlayGraphics, x, y, capture.width, capture.height)`**：
   - 將 `overlayGraphics` 繪製在視訊畫面的上方。

3. **`windowResized`**：
   - 當視窗大小改變時，重新調整 `overlayGraphics` 的大小，確保與視訊畫面一致。
***
```javascript=
let capture;
let overlayGraphics;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色為 d6ccc2
  background('#d6ccc2');
  
  // 初始化攝影機擷取
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.65, windowHeight * 0.65); // 設定影像大小為視窗的 65%
  capture.hide(); // 隱藏原始的攝影機影像

  // 建立與視訊畫面相同大小的圖形內容
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.textSize(32);
  overlayGraphics.textAlign(CENTER, CENTER);
  overlayGraphics.text('Overlay Text', overlayGraphics.width / 2, overlayGraphics.height / 2);
}

function draw() {
  // 繪製背景
  background('#d6ccc2');
  
  // 計算影像顯示位置，使其位於視窗中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 翻轉畫布以顯示鏡像
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height); // 繪製影像
  pop();

  // 在視訊畫面上方繪製 overlayGraphics
  image(overlayGraphics, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.65, windowHeight * 0.65);

  // 重新調整 overlayGraphics 的大小
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.textSize(32);
  overlayGraphics.textAlign(CENTER, CENTER);
  overlayGraphics.text('Overlay Text', overlayGraphics.width / 2, overlayGraphics.height / 2);
}
```
---
## 第四條指令

```tex
把graphics的背景顏色為黑色，graphics在寬與高切成每隔20為一個單位，
在每個單位內產生一個寬高為15的圓，圓的顏色採用capture相對位置的顏色
```
***
### 說明：
1. **`overlayGraphics.background(0)`**：
   - 將 `overlayGraphics` 的背景設為黑色。

2. **`capture.get(x, y)`**：
   - 從 `capture` 中取得對應位置的顏色。

3. **`for` 迴圈**：
   - 每隔 20 單位繪製一個圓，圓的顏色取自 `capture` 的相對位置。

4. **`drawOverlayGraphics` 函數**：
   - 將繪製 `overlayGraphics` 的邏輯封裝到一個函數中，方便在 `setup` 和 `windowResized` 中重複使用。

5. **`ellipse(x + 10, y + 10, 15, 15)`**：
   - 圓的中心位於每個單位的中心，寬高為 15。
***
```javascript=
let capture;
let graphics;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色為#d6ccc2
  background('#d6ccc2');
  
  // 初始化攝影機，設定影像大小為視窗寬高的 80%
  let videoWidth = windowWidth * 0.8;
  let videoHeight = windowHeight * 0.8;
  capture = createCapture(VIDEO);
  capture.size(videoWidth, videoHeight);
  capture.elt.setAttribute('playsinline', ''); // 修正行動裝置問題
  capture.hide(); // 隱藏原始的攝影機影像

  // 建立與視訊畫面相同大小的 graphics
  graphics = createGraphics(videoWidth, videoHeight);
}

function draw() {
  // 繪製背景
  background('#d6ccc2');
  
  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉
  
  // 將攝影機影像繪製在畫布中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);
  
  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      let col = capture.get(i, j); // 從 capture 中取得顏色
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓形
    }
  }
  
  // 將 graphics 繪製在視訊畫面的上方
  image(graphics, x, y, capture.width, capture.height);
  
  pop(); // 恢復畫布狀態
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}

```
---
## 第五條指令

```tex
取消在graphics在每個單位上面的圓，改為寬為18的方框，
中間有個5的圓，圓的顏色為黑色，方框的顏色採用capture相對位置的顏色
```

![IMG_0311](https://hackmd.io/_uploads/H12hJTZggx.jpg)
***
### 說明：
1. **方框的繪製**：
   - 使用 `graphics.rect(i, j, 18, 18)` 繪製寬高為 18 的方框。
   - 方框的顏色採用 `capture.get(i, j)` 取得的顏色。

2. **圓的繪製**：
   - 使用 `graphics.ellipse(i + 9, j + 9, 5, 5)` 在方框的中心繪製一個半徑為 5 的黑色圓。

3. **繪製順序**：
   - 先繪製方框，再繪製圓，確保圓位於方框的中心。
***
```javascript=
function draw() {
  // 繪製背景
  background('#d6ccc2');
  
  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉
  
  // 將攝影機影像繪製在畫布中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);
  
  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      let col = capture.get(i, j); // 從 capture 中取得顏色
      
      // 繪製方框
      graphics.fill(col);
      graphics.noStroke();
      graphics.rect(i, j, 18, 18); // 繪製寬為 18 的方框
      
      // 繪製中間的黑色圓
      graphics.fill(0); // 設定顏色為黑色
      graphics.ellipse(i + 9, j + 9, 5, 5); // 繪製半徑為 5 的圓
    }
  }
  
  // 將 graphics 繪製在視訊畫面的上方
  image(graphics, x, y, capture.width, capture.height);
  
  pop(); // 恢復畫布狀態
}
```
---
