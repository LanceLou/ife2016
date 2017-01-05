//瀑布流组件构造函数   params: 容器  左右间距  每个图片的宽度
function WaterFall(showContainer ,container, imgSpace, imgWidth) {
	//top 容器
	this.container = container;
	this.containerWidth = 0;
	this.containerPaddingLefRig = 0;

	//两列之间的间距
	if (imgSpace) {
		this.imgSpace = imgSpace / 2;
	}else{
		this.imgSpace = 8;
	}

	//图片的展示宽度
	this.imgWidth = imgWidth || 230;

	//图片的列数
	this.columns = 0;

	//单块图片及其包裹合起来的宽度
	this.singleBoxWidth = 0;

	//列最后(最下)一块的top或者说相对于上的位置 的数组   即咋们也可以说是每一列的bottom
	this.columnsBot = [];


	//每一列的每个box的left
	this.columnsPosLef = [];

	this.mask = null;

	this.showContainer = showContainer;

	this.init();
}

WaterFall.prototype = {
	constructor: WaterFall,
	//根据容器的宽度和图片的宽度和图片之间的间隙来确定一行中所拥有的图片的数目   即图片的列数
	initColumns: function () {
		//单个方块(图片加外包裹)的宽度
		this.singleBoxWidth = this.imgWidth+(this.imgSpace*2);
		this.container.style.boxSizing = "border-box";
		//职零容器的左右padding，方便计算
		this.container.style.paddingLeft = "0";
		this.container.style.paddingRight = "0";
		//获取容器的宽度
		var cwidth = Utils.getEleSize(this.container)["w"];
		this.containerWidth = cwidth;
		//取列数
		var columns = Math.floor(cwidth / (this.imgWidth+(this.imgSpace*2)));
		if (columns < 1) {
			throw("this container's width you set is too small");
		}
		//取剩余空间
		var mres =  cwidth % (this.imgWidth+(this.imgSpace*2));
		//调节容器的左右padding  从而达到"平衡"   剩余空间两边各分一半
		this.container.style.paddingLeft = mres / 2 + "px";
		this.container.style.paddingRight = mres / 2 + "px";
		this.containerPaddingLefRig = mres / 2;
		this.columns = columns;
	},
	//算出每一列的LEFT   最终据此来定位
	initEveryColumnsLeft: function () {
		//计算第一列的left
		var posLeft = this.containerPaddingLefRig;
		this.columnsPosLef.push(posLeft);
		for (var i = 1; i < this.columns; i++) {
			posLeft = this.containerPaddingLefRig + (this.imgSpace*2+this.imgWidth)*i;
			this.columnsPosLef.push(posLeft);
		}
	},
	initEventCulumnBot: function () {
		//初始化置零-> 每列的底部坐标
		for (var i = 0; i < this.columns; i++) {
			this.columnsBot[i] = 0;
		}
	},
	//计算每一列的底部pos中最小的   且取得是所有最小且相等里面的第一个
	cacuBotMin: function () {
		var temp = 0;
		var minIndex = 0;
		temp = this.columnsBot[0];
		for (var i = 0; i < this.columnsBot.length; i++) {
			if (temp > this.columnsBot[i]) {
				temp = this.columnsBot[i];
				minIndex = i;
			}
		}
		return {index: minIndex, value: temp};
	},
	// 往流中添加图片   参数为：图片加载路劲(src)  可传字符串或者数组
	addImg: function (img) {
		console.log(img);
		/*
			注意：上下也是相隔16px
		*/
		var images  = [];
		//数组直接赋值， 非数组
		if (img.length) {
			images = img;
		}else{
			images.push(img);
		}
		var self = this;
		var i = 0;
		//将传递过来的图片进行添加
		var timer = setTimeout(function() {
			//计算方块应在位置的index以及top
			var curAtt = self.cacuBotMin();
			var img = new Image();
			var imgBox = document.createElement("div");
			var argms = arguments;
			imgBox.className = "img-box";
			imgBox.style.padding = self.imgSpace + "px";
			imgBox.style.left = self.columnsPosLef[curAtt["index"]] + "px";
			imgBox.style.top = curAtt["value"] + "px";
			img.src = images[i];
			i++;
			img.onload = function (event) {
				//进行box高度计算与赋值的时候记得将相关的上下padding加上
				img.width = self.imgWidth;
				var imgHeight = img.height;
				self.columnsBot[curAtt["index"]] = curAtt["value"] + imgHeight + self.imgSpace;
				imgBox.appendChild(img);
				console.log(window.getComputedStyle(imgBox,null));
				self.container.appendChild(imgBox);
				if (i >= images.length) {
					clearTimeout(timer);
				}else{
					timer = setTimeout(argms.callee,1);
				}
			}
		}, 1);
	},
	initMask: function () {
		var mask = document.createElement("div");
		mask.className = "mask";
		document.body.insertBefore(mask,document.body.firstElementChild);
		this.mask = mask;
	},
	//更具目标URL来获取相应的远程主机数据   进行渲染(Renderer)添加
	addImgByAjax: function (targetUrl) {
		
	},
	initEventListener: function () {
		var self = this;
		this.container.addEventListener("click",function (event) {
			console.log(self);
			self.mask.style.display = "block";
			var showContainer = self.showContainer;
			showContainer.style.top = "50%";
			var target = event.target;
			var img = new Image();
			img.src = target.src;
			setTimeout(function() {
				img.className = "img-center";
				showContainer.style.width = img.width+"px";
				showContainer.style.height = img.height+"px";
				setTimeout(function () {
					showContainer.appendChild(img);
				},500)
			}, 1000);
		});
		this.mask.addEventListener("click",function (event) {
			self.mask.style.display = "none";
			self.showContainer.style.top = "-400px";
			self.showContainer.style.width = "400px";
			self.showContainer.style.height = "400px";
			self.showContainer.removeChild(self.showContainer.lastElementChild);
		});
	},
	init: function () {
		this.initColumns();
		this.initEveryColumnsLeft();
		this.initEventCulumnBot();
		this.initMask();
		this.initEventListener();
	}
}