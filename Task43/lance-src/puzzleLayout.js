//拼图布局组件
function PuzzleLayout(container,imgsNum,imgUrlList) {

	//记录图片的个数
	this.num = imgsNum || 0;

	//图片的URL数组
	this.imgUrlList = imgUrlList;

	//相关容器  及其   属性
	this.container = container;
	this.containerWidth = 0;
	this.containerHeight = 0;


	this.init();

};

PuzzleLayout.prototype = {
	constructor: PuzzleLayout,
	allClipMethod: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null},
	allImgPos: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null},
	dramDom: function () {
		var cutMethods = this.initCutMethod();
		var posArr = this.initImgPosition();
		for (var i = 0; i < this.imgUrlList.length; i++) {
			var img = new Image();
			img.src = this.imgUrlList[i];
			var self = this;
			img.onload = function (i, img) {
				return function (event) {
					self.clipImg(img, cutMethods[i]);
					console.log(posArr[i]);
					self.positionImg(img, posArr[i]);
					self.container.appendChild(img);
				}
			}(i, img);
		}
	},
	//对图片进行定位
	positionImg: function (img, pos) {
		img.style.left = pos.left;
		img.style.top = pos.top;
	},
	//对图片进行剪切
	clipImg: function (img, clipPath) {
		img.style = "-webkit-clip-path: polygon("+clipPath+");" +
		"clip-path: polygon("+clipPath+");"
	},
	/*初始化每个img的切割方式数组 数目种类单一*/
	initCutMethod: function () {
		console.log(this.num);
		if (this.allClipMethod[this.num]) {
			return this.allClipMethod[this.num];
		}
		var width = this.containerWidth;
		var height = this.containerHeight;
		var cutPath = "";
		var clipPath = "";

		//
		var cutMethods = [];

		//三分之一容器宽度
		var otWidth = width * 0.33333;
		//三分之一容器高度
		var otHeight = height * 0.33333;
		//三分之二容器宽度
		var ttWidth = width * 0.66666;
		//三分之二容器高度
		var ttHeight = height * 0.66666;
		//有则不计算
		switch(this.num){
			case 1: 
				clipPath = "0 0" + "," + width + "px 0" + "," + width + "px " + height + "px" + "," +  "0 " + height + "px" ;
				cutMethods.push(clipPath);
				break;
			case 2:
				clipPath = "0 0" + "," + ttWidth + "px 0" + "," + otWidth + "px " + height + "px" + "," + "0 " + height + "px";
				cutMethods.push(clipPath);
				clipPath = 
				clipPath = otWidth + "px 0" + "," + ttWidth + "px 0"  + "," + ttWidth + "px " + height + "px" + "," + "0 " + height + "px";
				cutMethods.push(clipPath);
				break;
			case 3:
				var zfxArcLen = height * 0.5;
				clipPath = "0 0" + "," + (width - zfxArcLen) + "px 0" + "," + (width - zfxArcLen) + "px " + height + "px"  + "," + "0 " + height + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + zfxArcLen + "px 0" + "," + zfxArcLen + "px " + zfxArcLen + "px" + "," + "0 " + zfxArcLen + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + zfxArcLen + "px 0" + "," + zfxArcLen + "px " + zfxArcLen + "px" + "," + "0 " + zfxArcLen + "px";
				cutMethods.push(clipPath);
				break;
			case 4:
				var o2Width = width * 0.5;
				var o2Height = height * 0.5;
				clipPath = "0 0" + "," + o2Width + "px " + "0"  + "," + o2Width + "px " + o2Height + "px" + "," + "0 " + o2Height + "px" ;
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + o2Width + "px " + "0"  + "," + o2Width + "px " + o2Height + "px" + "," + "0 " + o2Height + "px" ;
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + o2Width + "px " + "0"  + "," + o2Width + "px " + o2Height + "px" + "," + "0 " + o2Height + "px" ;
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + o2Width + "px " + "0"  + "," + o2Width + "px " + o2Height + "px" + "," + "0 " + o2Height + "px" ;
				cutMethods.push(clipPath);
				break;
			case 5:
				clipPath = "0 0" + "," + ttWidth + "px 0" + "," + ttWidth + "px " + ttHeight + "px" + "," + "0 " + ttHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + (height - otWidth) + "px" + "," + "0 " + (height - otWidth) + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otWidth + "px" + "," + "0 " + otWidth + "px";
				cutMethods.push(clipPath);
				break;
			case 6:
				clipPath = "0 0" + "," + ttWidth + "px 0" + "," + ttWidth + "px " + ttHeight + "px" + "," + "0 " + ttHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				clipPath = "0 0" + "," + otWidth + "px 0" + "," + otWidth + "px " + otHeight + "px" + "," + "0 " + otHeight + "px";
				cutMethods.push(clipPath);
				break;
		}
		this.allClipMethod[this.num] = cutMethods;
		return cutMethods;
	},
	/*初始化每个img的位置数组 数目种类单一*/
	initImgPosition: function () {
		if (this.allImgPos[this.num]) {
			return this.allImgPos[this.num];
		}
		var width = this.containerWidth;
		var height = this.containerHeight;

		var pos = {top: 0, left: 0}

		var posArr = [];

		//三分之一容器宽度
		var otWidth = width * 0.33333;
		//三分之一容器高度
		var otHeight = height * 0.33333;
		//三分之二容器宽度
		var ttWidth = width * 0.66666;
		//三分之二容器高度
		var ttHeight = height * 0.66666;

		//二分之一宽   与   二分之一高
		var o2Width = width * 0.5;
		var o2Height = height * 0.5;
		switch(this.num){
			case 1:
				// pos.top = "0";
				// pos.left = "0";
				posArr.push({top: "0", left: "0"});
				break;
			case 2:
				// pos.top = "0";
				// pos.left = "0";
				posArr.push({top: "0", left: "0"});
				// pos.top = "0";
				// pos.left = otWidth + "px";
				posArr.push({top: "0", left: otWidth + "px"});
				break;
			case 3:
				// pos.top = "0";
				// pos.left = "0";
				posArr.push({top: "0", left: "0"});
				// pos.top = "0";
				// pos.left = (width - o2Height) + "px";
				posArr.push({top: "0", left: (width - o2Height) + "px"});
				// pos.top = o2Height + "px";
				// pos.left = (width - o2Height) + "px";
				posArr.push({top: o2Height + "px", left: (width - o2Height) + "px"});
				break;
			case 4:
				// pos.top = "0";
				// pos.left = "0";
				posArr.push({top: "0", left: "0"});
				// pos.top = o2Height + "px";
				// pos.left = "0";
				posArr.push({top: o2Height + "px", left: "0"});
				// pos.top = o2Height + "px";
				// pos.left = o2Width + "px";
				posArr.push({top: o2Height + "px", left: o2Width + "px"});
				// pos.top = "0";
				// pos.left = o2Width + "px";
				posArr.push({top: "0", left: o2Width + "px"});
				break;
			case 5:
				// pos.top = "0";
				// pos.left = "0";
				posArr.push({top: "0", left: "0"});
				// pos.top = ttHeight + "px";
				// pos.left = "0";
				posArr.push({top: ttHeight + "px", left: "0"});
				// pos.top = ttHeight + "px";
				// pos.left = otWidth + "px";
				posArr.push({top: ttHeight + "px", left: otWidth + "px"});
				// pos.top = (height - otWidth) + "px";
				// pos.left = ttWidth + "px";
				posArr.push({top: otWidth + "px", left: ttWidth + "px"});
				// pos.top = "0";
				// pos.left = ttWidth + "px";
				posArr.push({top: "0", left: ttWidth + "px"});
				break;
			case 6:
				// pos.top = "0";
				// pos.left = "0";
				posArr.push({top: "0", left: "0"});
				// pos.top = ttHeight + "px";
				// pos.left = "0";
				posArr.push({top: ttHeight + "px", left: "0"});
				// pos.top = ttHeight + "px";
				// pos.left = otWidth + "px";
				posArr.push({top: ttHeight + "px", left: otWidth + "px"});
				// pos.top = ttHeight + "px";
				// pos.left = ttWidth + "px";
				posArr.push({top: ttHeight + "px", left: ttWidth + "px"});
				// pos.top = otHeight + "px";
				// pos.left = ttWidth + "px";
				posArr.push({top: otHeight + "px", left: ttWidth + "px"});
				// pos.top = "0";
				// pos.left = ttWidth + "px";
				posArr.push({top: "0", left: ttWidth + "px"});
				break;
		}
		this.allImgPos[this.num] = posArr;
		return posArr;
	},
	init: function () {
		//初始化容器的size
		var res = Utils.getEleSize(this.container);
		this.containerWidth = res["w"];
		this.containerHeight = res["h"];
	}
}