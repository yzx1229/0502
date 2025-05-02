# 20250502筆記

### 第一條指令
產生一個全螢幕的畫布， 背景顏色為d6ccc2，
擷取攝影機的影像， 正常的顯示在視窗的中間，
影像畫面寬高為視窗大小的65%，請把程式碼寫在sketch.js內

createCanvas(windowWidth, windowHeight)：設定畫布大小為全螢幕。
background('#d6ccc2')：設定背景顏色為 #d6ccc2。
createCapture(VIDEO)：啟用攝影機擷取影像。
capture.size(windowWidth * 0.65, windowHeight * 0.65)：將攝影機影像大小設為視窗的 65%。
image(capture, x, y, capture.width, capture.height)：將攝影機影像繪製在畫布中央。
windowResized：當視窗大小改變時，重新調整畫布與影像大小。
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
