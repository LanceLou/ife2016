//global DataStructor   相关尺寸全部使用数字形式   便于计算
var Map = [];   //二维数组Map

//特工对象，x与y坐标  每秒移动speed个像素
var people = {
	x: 0,
	y: 0,
	speed: 200
}

//文件所在对象
var secretFile = {
	x: 0,
	y: 0
}

// 画布的大小，便于相关计算
var gameCanvasSize = {
	width: 0,
	height: 0
}

//小方格的大小   本project采用正方形格子   故宽就是高
var gridWidth = 0;
//画布格子的行数与列数
var rows = 0;
var cols = 0;

function initData() {
	
}