var Utils = {
	getEleSize: function (ele) {
		var box = ele.getBoundingClientRect();
		var result = {};
		result["w"] = box.width || (box.right - box.left);
		result["h"] = box.height || (box.bottom - box.top);
		return result;
	},
	getParentChildrenLength: function (parent, isNode) {
		// 作为节点树对待，
		if (isNode) {
			return parent.childNodes.length;
		}else{
			//最为元素树对待 即忽略Text和Comment节点
			return parent.children.length;
		}
	}
}