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
