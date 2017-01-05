/**
* @param1: the layout's container
* @param2: the initial images src
* @param3: the img init/min Height
*/
function BarrelLayout(container,imgSrc,minHeight) {
	this.container = container;
	this.imgSrc = imgSrc;
	this.minHeight = minHeight || 180;
	this.containerWidth = Utils.getEleSize(container)["w"];
	//每一行图像对象的暂存  当这一行终结时  此记录进行清空(即当前行啦)
	this.rowImageBuffer = [];
	//保留当前行的图片总宽  以应对行没有结束还是图片没了的情况
	this.rowTotalWidth = 0;
	this.init();
	this.addImagesBySrcs(imgSrc);
}
BarrelLayout.prototype = {
	constructor: BarrelLayout,
	addImagesBySrcs: function (srcs) {
		var wrapperWidth = this.containerWidth;
		var minHeight = this.minHeight;

		var totalWidth = this.rowTotalWidth;
		//将src变成数组，如果不是数组的话
		if (!srcs.map) {
			srcs = [srcs];
		}
		var imgNum = srcs.length;
		var self = this;
		var index = 0;
		var timer = null;  //计时器
		(function () {
			var img = new Image();
			img.src = srcs[index];
			var argms = arguments;
			index++;
			img.onload = function () {
				//通过一定的比例算出图片在对应高度下的所占宽
				var height = img.height;
				var width = img.width;
				var tempWidth = new Number(((minHeight*width)/height).toFixed(3));

				console.log(totalWidth + tempWidth);
				//检测是否已经达到一行的标准
				if (totalWidth + tempWidth >= wrapperWidth) {					
					//--->>>达标，进行相关DOM创建与渲染
					//获取计算出的高度
					self.handDomImgsRender(self.container,srcs.splice(0,index-1),((wrapperWidth*minHeight)/totalWidth).toFixed(3));
					//更新数组长度，便于图片记载结束判断
					imgNum = srcs.length;
					index = 1;
					totalWidth = tempWidth;
				}else{
					//未达标
					totalWidth += tempWidth;
				}
				//检测是否图片已经加载完
				if (index>=imgNum) {
					clearTimeout(timer);
					//将剩下的不成行的图片进行渲染
					self.handDomImgsRender(self.container,srcs,self.minHeight);
					self.rowTotalWidth = totalWidth;
				}else{
					//继续加载图片
					timer = setTimeout(argms.callee,1);
				}
			}
		})();
	},
	handDomImgsRender: function(container,srcs,height) {
		console.log(srcs);
		console.log(height);
		var rowContainer = document.createElement("div");
		rowContainer.className = "imgRow";
		rowContainer.style.height = height+"px";
		for (var i = 0; i < srcs.length; i++) {
			var imgBox = document.createElement("div");
			imgBox.className = "imgBox";
			var img = document.createElement("img");
			img.src = srcs[i];
			imgBox.appendChild(img);
			rowContainer.appendChild(imgBox);
		}
		container.appendChild(rowContainer);
	},
	init: function () {
		this.container.style.padding = 0+"px";
	}
}