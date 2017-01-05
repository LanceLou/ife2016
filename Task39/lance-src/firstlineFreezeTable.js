function FLFT(tTitle,tHead,initDate){
	this.tTitle = tTitle;
	this.tHead = tHead;
	this.initDate = initDate;
	this.dom = null;
	this.init();
}
FLFT.prototype = {
	constructor: FLFT,
	initDom: function () {
		var table = document.createElement("table");
		var caption = document.createElement("caption");
		caption.innerText = this.tTitle;
		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		//建立表头DOM节点
		var tr = document.createElement("tr");
		for(var thText in this.tHead){
			thText = this.tHead[thText];
			var th = document.createElement("th");
			th.innerText = thText;
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		//建立表主体DOM节点
		for(var bodyTr in this.initDate){
			bodyTr = this.initDate[bodyTr];
			var tr = document.createElement("tr");
			for (var i = 0; i < bodyTr.length; i++) {
				//第一列
				if (i == 0) {
					var th = document.createElement("th");
					th.innerText = bodyTr[i];
					tr.appendChild(th);			
				}else{
					var td = document.createElement("td");
					td.innerText = bodyTr[i];
					tr.appendChild(td);
				}
			}
			tbody.appendChild(tr);
		}
		table.appendChild(caption);
		table.appendChild(thead);
		table.appendChild(tbody);
		this.dom = table;
	},
	/*节点插入， 可以插在某个节点的前面*/
	insert: function (parentNode, beforeNode) {
		beforeNode = beforeNode || null;
		parentNode.insertBefore(this.dom, beforeNode);
	},
	getCorrentLeft: function (ele) {
		if (ele.getBoundingClientRect) {
			console.log(ele);
			var rect = ele.getBoundingClientRect();
			return rect["left"];
		}
	},
	// 这个是获取视口坐标，不需要获取文档坐标，如需文档坐标，需加上scroll的偏移
	getCorrentTop: function (ele) {
		if (ele.getBoundingClientRect) {
			var rect = ele.getBoundingClientRect();
			return rect["top"];
		}
	},
	getEleWidth: function (ele) {
		var box = ele.getBoundingClientRect();
		//第二个选项针对于IE8
		return box.width || (box.right - box.left);
	},
	//此处默认的是每个单元格等长
	fistLineFroozeHandler: function(self, event) {
		//获取具体的列数
		var colNum = self.tHead.length;
		//获取正常行的宽度
		var width = self.getEleWidth(self.dom.children[2]);
		//获取表格的left
		var left = self.getCorrentLeft(self.dom.children[2]);
		//设置class 长度以及每个子元素的长度
		var thead = self.dom.children[1];
		var thChildren = thead.children[0].children;
		thead.className = "topedThead";
		thead.style.width = width+"px";
		thead.left = left+"px";
		var itemWidth = (width / colNum).toFixed(0);
		for (var i = 0; i < thChildren.length; i++) {
			thChildren[i].style.width = itemWidth+"px";
		}
		//获取tbody的导向性数组，设置宽度
		var tbRefreChildren = self.dom.children[2].children[0].children;
		for (var i = 0; i < tbRefreChildren.length; i++) {
			tbRefreChildren[i].style.width = itemWidth+"px";
		}
	},
	clearFistLineFrooze: function (self) {
		var thead = self.dom.children[1];
		thead.className = "";
	},
	initEventListener: function () {
		var self = this;
		document.addEventListener("mousewheel",function (event) {
			var thead = self.dom.children[1];
			var tbody = self.dom.children[2];
			if (self.getCorrentTop(thead) <= 0) {
				self.fistLineFroozeHandler(self, event);
			}
			var tbodyTop = self.getCorrentTop(tbody);
			if (tbodyTop > 22 && tbodyTop < 100) {
				self.clearFistLineFrooze(self);
			}
		});
	},
	init: function () {
		this.initDom();
		this.initEventListener();
	}
}