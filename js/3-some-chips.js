/* 以50片为单位 */

var stop;
var img = new Image();
img.src = "./images/sakura.png";

/* Sakura 类 实例化一个sakura对象 开始 */
function Sakura(x, y, s) {
  this.x = x; // x轴坐标
  this.y = y; // y轴随机坐标
  this.s = s; // sakura大小
}
Sakura.prototype.draw = function(cxt) {
  var xc = (40 * this.s) / 4;
  cxt.translate(this.x, this.y);
  cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
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
/* SakuraList 类 实例化一个sakuraList对象 结束 */

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

  var sakuraList = new SakuraList();
  for (var i = 0; i < 50; i++) {
    sakura = new Sakura(Math.random() * 20, Math.random() * 5, 1);
    sakuraList.push(sakura);
  }

  sakuraList.draw(cxt); // 绘制
}

img.onload = function() {
  startSakura();
};
