/*
	使用单例模式创建蒙版，why：  如果用于永远不点是弹出层的创建按钮，就永远不用创建这个弹出层
*/
var singleton = function( fn ){
    var result;
    return function(){
        return result || ( result = fn .apply( this, arguments ) );
    }
}
var createMask = singleton( function(){
	var mask = document.createElement('div');
	mask.className = "mask";
	return document.body.appendChild(mask);
});