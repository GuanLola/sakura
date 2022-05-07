/* 整场樱花雨为你而下 */

var stop;
var img = new Image();
img.src = "./images/sakura.png";

/* Sakura 类 实例化一个sakura对象 开始 */
function Sakura(x, y, s, r) {
  this.x = x; // x轴坐标
  this.y = y; // y轴坐标
  this.s = s; // sakura大小
  this.r = r; // sakura旋转角度
}
Sakura.prototype.draw = function(cxt) {
  cxt.save();
  var xc = (40 * this.s) / 4;
  cxt.translate(this.x, this.y);
  cxt.rotate(this.r);
  cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
  cxt.restore();
};
/* Sakura 类 实例化一个sakura对象 结束 */

/* SakuraList 类 实例化一个sakuraList对象 开始 */
SakuraList = function() {
  this.list = [];
};
SakuraList.prototype.push = function(sakura) {
  this.list.push(sakura);
};
SakuraList.prototype.draw = function(cxt) {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].draw(cxt);
  }
};
SakuraList.prototype.get = function(i) {
  return this.list[i];
};
SakuraList.prototype.size = function() {
  return this.list.length;
};
/* SakuraList 类 实例化一个sakuraList对象 结束 */

function getRandom(option) {
  var ret, random;
  switch (option) {
    case "x":
      // x轴随机坐标
      ret = Math.random() * window.innerWidth;
      break;
    case "y":
      // y轴随机坐标
      ret = Math.random() * window.innerHeight;
      break;
    case "s":
      // sakura大小
      ret = Math.random();
      break;
    case "r":
      // sakura旋转角度
      ret = Math.random() * 6;
      break;
    case "fnx":
      // x轴随机函数
      random = -0.5 + Math.random() * 1;
      ret = function(x, y) {
        return x + 0.5 * random - 1.7;
      };
      break;
    case "fny":
      // y轴随机函数
      random = 1.5 + Math.random() * 0.7;
      ret = function(x, y) {
        return y + random;
      };
      break;
    case "fnr":
      // r轴随机函数
      random = Math.random() * 0.03;
      ret = function(r) {
        return r + random;
      };
      break;
  }
  return ret;
}

function startSakura() {
  //兼容性 不同浏览器的动画控制函数 告诉浏览器希望执行动画
  var requestAnimationFrame =
    window.requestAnimationFrame || //chrome
    window.mozRequestAnimationFrame || // Firefox
    window.webkitRequestAnimationFrame || // Chrome
    window.msRequestAnimationFrame || // IE
    window.oRequestAnimationFrame; // Opera

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

  var sakuraList = new SakuraList();
  for (var i = 0; i < 50; i++) {
    var sakura, randomX, randomY, randomS, randomR;
    randomX = getRandom("x");
    randomY = getRandom("y");
    randomR = getRandom("r");
    randomS = getRandom("s");
    sakura = new Sakura(randomX, randomY, randomS, randomR);
    sakuraList.push(sakura);
  }
  stop = requestAnimationFrame(function() {
    cxt.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
    sakuraList.draw(cxt); // 绘制
    stop = requestAnimationFrame(arguments.callee); // 递归重绘
  });
}

img.onload = function() {
  startSakura();
};
