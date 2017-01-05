/*
	drag.js
	对传入的Dom元素进行拖动位置变化处理
*/
function drag(elementToDrag,event) {
	elementToDrag.style.cursor = "move";
	//初始化鼠标位置，转换为文档坐标
	var scroll = getScrollOffsets();
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;

	//在文档坐标下，待拖动元素的初始距离
	//因为eleToDrag是绝对定位，所以我们可以假设其offsetParent就是body元素
	/*
		
		The HTMLElement.offsetParent read-only property returns a reference 
		to the object which is the closest (nearest in the containment hierarchy)
		positioned containing element. If the element is non-positioned, the nearest
		table cell or root element (html in standards compliant mode; body in quirks
		rendering mode) is the offsetParent. offsetParent returns null when the element
		has style.display set to "none". The offsetParent is useful because offsetTop
		and offsetLeft are relative to its padding edge.
	*/
	var origX = elementToDrag.offsetLeft;
	var origY = elementToDrag.offsetTop;

	//计算mouseDown时间和元素左上角之间的距离
	//并将其另存为鼠标移动的距离
	var deltaX = startX - origX;
	var deltaY = startY - origY;

	if (document.addEventListener) {
		document.addEventListener("mousemove",moveHandler,true);
		document.addEventListener("mouseup",upHandler,true);
	}else if(document.attachEvent){
		//时间捕获是通过调用元素上的setCapture()进行捕获
		elementToDrag.setCapture();
		elementToDrag.attachEvent("onmousemove",moveHandler);
		elementToDrag.attachEvent("onmouseup",upHandler);

		//作为mouseup事件看待鼠标捕获的丢失
		elementToDrag.attachEvent("onlosecapture",upHandler);
	}

	//阻止时间传播，不让其他元素看到
	if (event.stopPropagation) event.stopPropagation();
	else event.cancelBubble = true;

	//阻止默认操作
	if (event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;

	function moveHandler(e) {
		e = e || window.event;

		//移动这个元素的到当前鼠标位置
		//动过滚动条的位置以及初始单击的偏移量来调整
		var scroll = getScrollOffsets();
		elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
		elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";

		//阻止时间传播
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}

	function upHandler(e) {
		elementToDrag.style.cursor = "initial";

		e = e || window.event;

		if (document.removeEventListener) {
			document.removeEventListener("mouseup",upHandler,true);
			document.removeEventListener("mousemove",moveHandler,true);
		}else if (document.detachEvent) {   //IE5+时间模型
			elementToDrag.detachEvent("onlosecapture",upHandler);
			elementToDrag.detachEvent("onmouseup",upHandler);
			elementToDrag.detachEvent("onmousemove",moveHandler);
			elementToDrag.releaseCapture();   //对应上面的setCapture
		}
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}
}

function getScrollOffsets(w) {
	w = w || window;

	//except IE8-
	if (w.pageXOffset != null) {
		return {x: w.pageXOffset, y: w.pageYOffset}
	}

	var d = w.document;
	if (document.compatMode == "CSS1Compat") {
		return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};
	}

	//对怪异模式下的IE
	return {x: d.body.scrollLeft, y: d.body.scrollTop};

}