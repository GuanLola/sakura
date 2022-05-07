/* 单片花瓣 */

var img = new Image();
img.src = "./images/sakura.png";

function startSakura() {
  // 定义canvas画布
  var canvas = document.createElement("canvas"), cxt;

  // 初始化canvas画布
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.setAttribute(
    "style",
    "position: fixed;left: 0;top: 0;pointer-events: none;"
  );
  canvas.setAttribute("id", "canvas_sakura");
  document.getElementsByTagName("body")[0].appendChild(canvas);

  // 获取canvas画布上下文 提供在画布上绘图的方法和属性
  cxt = canvas.getContext("2d");

  // drawImage(image, sx, sy, swidth, sheight, x, y, width, height)
  cxt.drawImage(img, 0, 0, 40, 40);
}

img.onload = function() {
  startSakura();
};
