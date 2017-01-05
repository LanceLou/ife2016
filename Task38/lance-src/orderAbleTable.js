/**
* 初始化表格所需的数据
* @param1: tTitle 表格标题
* @param2: tHead 表格第一行，头部 []
* @param3: initDate 表格初始化数据 {key, []} key: 暂定位行数
*
*/
function OrderableTable(tTitle,tHead,initDate) {
	this.tTitle = tTitle;
	this.tHead = tHead;
	this.initDate = initDate;
	this.dom = null;
	this.init();
}

//直接建一个table即可，不需要创建其容器
OrderableTable.prototype = {
	constructor: OrderableTable,
	/*初始化表格所需DOM节点,但不进行插入*/
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
	/*根据相应的第几个子节点名排序*/
	orderByIndex: function (index) {
		console.log(index);
		var tbody = this.dom.children[2];
		var allTr = tbody.children;
		var max = 0;
		var maxIndex = 0;
		var tempNum = 0;
		var tempNode = null;
		var length = allTr.length; 
		//使用插入排序
		for (var i = 0; i < length; i++) {
			max = 0;
			for (var j = 0; j < length-i; j++) {
				tempNum = parseInt(allTr[j].children[index].innerText);
				if (max < tempNum) {
					maxIndex = j;
					max = tempNum;
				}
				//对j位节点和当前"最后"一位节点交换
			}
			tbody.insertBefore(allTr[maxIndex],allTr[length-i-1]);
			tbody.insertBefore(allTr[length-i-1],allTr[maxIndex]);
		}

	},
	/*获取表格的宽度和长度*/
	getEleWidthAndHeight: function () {
		return {width: this.dom.offsetWidth, height: this.dom.offsetHeight};
	},
	tableClickEventDispatch: function(event, obj){
		var target = event.target;
		//如果点击的是非th元素   或者   是th元素但是不是第一个孩子或者父节点的父节点不是Thead   则用户点的不是排序icon
		if (target.tagName === "TD" || [].indexOf.call(target.parentNode.children, target) === 0 || target.parentNode.parentNode.tagName === "TBODY") {
			return;
		}
		this.orderByIndex([].indexOf.call(target.parentNode.children, target));
	},
	initEventListener: function () {
		var self = this;
		this.dom.addEventListener("click",function (event) {
			self.tableClickEventDispatch(event, self);
		});
	},
	init: function () {
		this.initDom();
		this.initEventListener();
	}
}