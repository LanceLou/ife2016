function ShootLayer(title, content, width, height) {
	this.title = title || "title";
	this.content = content || "content";
	this.width = width || 500;
	this.height = height || 250;
	this.certainBtn = null;
	this.cancelBtn = null;
	this.mask = null;
	this.container = null;
	this.init();
}
ShootLayer.prototype = {
	constructor: shootLayer,
	createLayer: function () {
		/*
			创建相关的DOM，并: 初始化两个按钮(certainBtn 和 cancelBtn)
		*/
		var container = document.createElement("article");
		container.className = "shootLayer";
		var secTitle = document.createElement("section");
		secTitle.className = "title";
		secTitle.innerText = this.title;
		var secContent = document.createElement("section");
		secContent.className = "content";
		secContent.innerText = this.content;
		var btnWrapper = document.createElement("btn-wrapper");
		btnWrapper.className = "btn-wrapper";
		var cerBtn = document.createElement("input");
		cerBtn.type = "button";
		cerBtn.value = "确定";
		var cancelBtn = document.createElement("input");
		cancelBtn.type = "button";
		cancelBtn.value = "取消";
		btnWrapper.appendChild(cerBtn);
		btnWrapper.appendChild(cancelBtn);
		this.certainBtn = cerBtn;
		this.cancelBtn = cancelBtn;
		var fragment = document.createDocumentFragment();
		fragment.appendChild(secTitle);
		fragment.appendChild(secContent);
		fragment.appendChild(btnWrapper);
		container.appendChild(fragment);
		this.container = container;
		console.log(container);
		document.body.appendChild(container);
	},
	createMask: function () {
		this.mask = createMask();
		this.mask.style.display = "block";
	},
	initMaskListener: function (maskClickHandler) {
		var that = this;
		this.mask.addEventListener("click",maskClickHandler);
	},
	deletLayer: function (certainHandler,cancelHandler,maskClickHandler) {
		//先取消时间监听   再删除DOM	再删除对象(当然不是在此处)
		this.delEventListener(certainHandler,cancelHandler,maskClickHandler);
		this.container.parentNode.removeChild(this.container);
		this.mask.style.display = "none";
	},
	/*这里提供手动resize的方法，具体拖动resize的方法笔者回去实现*/
	resize: function (width, height) {
		
	},
	/**
	* 以方法的的形式来
	* 
	* @param1 certainHandler: 确定按钮的时间处理程序
	* @param2 cancelHandler： 取消按钮的时间处理程序
	*
	*/
	initDrag: function () {
		var shootLayer = this.container;
		shootLayer.addEventListener("mousedown",function (event) {
			drag(shootLayer,event);
		});
	},
	initEventListener: function (certainHandler, cancelHandler) {
		var that = this;
		this.certainBtn.addEventListener("click", certainHandler);
		this.cancelBtn.addEventListener("click", cancelHandler);
	},
	delEventListener: function (certainHandler, cancelHandler,maskClickHandler) {
		this.certainBtn.removeEventListener("click",certainHandler);
		this.cancelBtn.removeEventListener("click",cancelHandler);
		this.mask.removeEventListener("click",maskClickHandler);
	},
	init: function () {
		this.createMask();
		this.createLayer();
		this.initDrag();
		this.initEventListener(certainHandler,cancelHandler);
		this.initMaskListener(maskClickHandler);
	}
};
function certainHandler(event) {
	//可以做额外的处理   这个里面的this变成了Window   有所处的上下文决定
	shootLay.deletLayer(certainHandler,cancelHandler,maskClickHandler);
}
function cancelHandler(event) {
	//可以做额外的处理
	shootLay.deletLayer(certainHandler,cancelHandler,maskClickHandler);
}
function maskClickHandler(event){
	shootLay.deletLayer(certainHandler,cancelHandler,maskClickHandler);
}