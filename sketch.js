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

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
