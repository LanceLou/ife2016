/*说是main.js，不能说是总装js*/
var $ = function (el) {
	return document.querySelector(el);
}
var $$ = function (el) {
	return document.querySelectorAll(el);
}

/*中介者mediator
   我的思想是由中控单元将相关消息会指令广播到各个单元和飞船
*/
var mediator = (function () {
	//被广播或被监听的topic   那么：我们是否可以认为其实一个消息机制，一系列消息的集合
	var topics = {};
	//订阅某一类消息
	var subscribe = function (topic, fn) {
		if (!topics[topic]) {
			topics[topic] = [];
		}
		/*这个topics中保存的是执行上下文和函数   咋们说对于每一类或者说一种消息都会有很多的订阅者，对于整个中介者来说，只需要知道相应的消息的相应的处理办法(函数),
		发布：当有消息发生时执行相应的订阅者给出的函数*/
		topics[topic].push({context: this, callback: fn});
		return this;
	};

	//发布or广播事件到程序的剩余部分
	var publish = function (topic) {
		var args;
		adapter(arguments);
		console.log(arguments);
		/*这是一个共有的中介者，即一个消息订阅与发布平台，那么其消息的发布与广播也是有针对性的，即你订阅某方面的消息，我就给你广播某方面的消息*/
		if (!topics[topic]) {
			return false;
		}
		while(true){
			if ((topic == "Command" || topic == "ShipCreate") && Math.floor(Math.random()*10) < 1) {  //如果是两种传递指令
				var id = arguments[1]["id"] || "XXX";
				CentralDisplayUnit.addMsg("与联盟"+id+"号失去连接，通讯失败，正尝试重新发送，caption","error","assistant");
			}else{
				break;
			}
		}
		args = Array.prototype.slice.call(arguments, 1);
		//对每一个订阅者进行消息广播/发布
		/* */
		setTimeout(function () {
			for(var i = 0, l = topics[topic].length; i < l; i++){
				var subscription = topics[topic][i];
				subscription.callback.apply(subscription.context, args);
			}	
		},300);
		
		
		return this;
	};
	var adapter = function () {
		var temp = arguments[0][1];
		tempStr = "";
		if (typeof temp === "object") {
			//id
			tempStr = temp["id"].toString(2);
			while(tempStr.length < 4){
				tempStr = "0"+tempStr;
			}
			switch(temp["command"]){
				case "fly":
					tempStr += "0001";
					break;
				case "stop":
					tempStr += "0010";
					break;
				case "destory":
					tempStr += "0100";
					break;
			}
		}else{
			tempStr = temp.toString(2);
			while(tempStr.length < 4){
				tempStr = "0"+tempStr;
			}
		}
		console.log(tempStr);
		arguments[0][1] = tempStr;
		// console.log(temp.toString(2).length);
		// console.log(parseInt("0001",2));
	}
	return {
		Publish: publish,
		Subscribe: subscribe,

		//想相关功能传递给Obj对象
		installTo: function (obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
})();


var CentralControlUnit = (function () {
	//私有属性
	var addBtn = document.getElementById("shipCtreate"); /*飞船添加按钮*/
	var wrap = document.getElementById("ccu-content");
	var msg = {};  /*私有属性msg  保存指令 {id: xx, commond: ''}*/
	return {
		ships: {},  /*保存飞船对象  使用对象形式保存，相应的轨道即为相应的键*/
		shipsControl: {},  //DOM对象
		addShip: function (i) {
			/*模拟信号丢失(丢包)机制  时间模拟机制将会要放到mediator中去，进行统一的模拟*/
			i = this.adapter(i);
			if (!this.ships[i]) {
				var shipKind = ShipCreateUnit.getCurSelected();
				this.ships[i] = new SpaceShip(i);
				//设置Ship的动力类型和能量类型
				this.ships[i].dynamicalDystem = shipKind["DS"] || this.ships[i].dynamicalDystem;
				this.ships[i].energySystem = shipKind["ES"] || this.ships[i].energySystem;
			}
			this.ships[i].init();
			this.newShipRender(i);
		},
		newShipRender: function (shipId) {
			var span = document.createElement("span");
			span.setAttribute("class","ship-item");
			span.setAttribute("data-shipid",shipId);
			span.innerHTML = "联盟"+shipId+"号(aps-"+shipId+")<br/>"+
						"<input type='button' value='开启曲速'>"+
						"<input type='button' value='停止飞行'>"+
						"<input type='button' value='销毁'>";
			this.shipsControl[shipId] = wrap.appendChild(span);
		},
		delShip: function (shipId) {
			wrap.removeChild(this.shipsControl[shipId]);
			this.shipsControl[shipId] = null;
			this.ships[shipId]["ele"] = null;
		},
		adapter: function (news) {
			//注意这里将会需要解析两种消息
			var id = parseInt(news.substring(0,4),2);
			var command = news.length > 4 ? news.substring(4,8) : null;
			if (command) {
				var temp = {};
				temp["id"] = id;
				switch(command){
					case "0001":
						temp["command"] = "fly";
						break;
					case "0010":
						temp["command"] = "stop";
						break;
					case "0100":
						temp["command"] = "destory";
						break;
				}
				return temp;
			}else{
				return id+"";
			}
		},
		initShipEventListen: function () {
			EventUtil.addHandler(addBtn,"click", function () {
				CentralDisplayUnit.addMsg("飞船创建指令发送成功，caption","","assistant");
				var i = 1;
				for(;i<=4;i++){
					//有这个对象单没有那个节点(本容器里的节点)  或者   没对象就不管比有木有那个节点了
					if (!CentralControlUnit.ships[i] || !CentralControlUnit.shipsControl[i]) {
						break;
					}
				}
				//如果相关的ships对象是已存在的，则对其进行再次初始化，抹除记忆
				if(i == 5){
					CentralDisplayUnit.addMsg("轨道已满，无法创建飞船，caption","error","assistant");
					return;
				}
				mediator.Publish("ShipCreate",i);  //保存创建的飞船的编号即轨道号
			});
			EventUtil.addHandler(wrap,"click",function (event) {
				msg = {};
				var target = event.target;
				if (target.nodeName !== "INPUT") {
					return;
				}
				var id = parseInt(event.target.parentElement.getAttribute("data-shipid"));
				switch(target.value){
					case "开启曲速":
						/*当飞船飞行或充电时  无法开启飞行*/
						if (CentralControlUnit.ships[id].status == "fly" || CentralControlUnit.ships[id].status == "charge") {
							return;
						}
						msg["command"] = "fly";
						break;
					case "停止飞行":
						if (CentralControlUnit.ships[id].status != "fly") {
							return;
						}
						msg["command"] = "stop";
						break;
					case "销毁":
						msg["command"] = "destory";
				}
				msg["id"] = id;
				mediator.Publish("Command",msg);
			});
		},
		initSubscribe: function () {
			mediator.Subscribe.call(this, "ShipCreate",this.addShip);
			mediator.Subscribe.call(this,"Command",function (msg) {
				//进行相关消息解析
				msg = this.adapter(msg);
				if (msg["command"] === "destory") {
					this.delShip(msg["id"]);
				}
			});	
		},
		init: function () {
			this.initShipEventListen();
			this.initSubscribe();
		}
	}
})();
var SpaceshipStatusUnit = (function () {
	var wrap = document.getElementById("ssu-content");
	var timer = {};  //保存定时器对象
	var statusCompose = {};
	return {
		shipsStatus: {},   /*保存飞船状态栏dom，便于操作*/
		addShipStatus: function (news) {
			var id = this.adapter(news);
			//添加的时候将相关的DOM节点添加入相关的数组
			var span = document.createElement("span");
			span.setAttribute("class","ss-item clear-fix");
			span.innerHTML = "<span><i>aps-"+id+"</i><br/><i>online</i></span>"+
						"<span>"+
							"<label for=''>energy:</label><span><i class='process'></i></span><em>100%</em><br>"+
							"<label for=''>Status:</label><em class='status'>ready</em><br>"+
							"<label for=''>Orbit:</label><em class='Orbit'>"+id+"</em>"+
						"</span>";
			var target = this.shipsStatus[id] = wrap.appendChild(span);
			statusCompose[id] = {};
			statusCompose[id]["processBar"] = target.getElementsByClassName("process")[0];;
			statusCompose[id]["num"] = target.getElementsByTagName("em")[0];
			statusCompose[id]["status"] = target.getElementsByClassName("status")[0];
		},
		delShipStatus: function (id) {
			/*进行报废飞船的相关的后事的处理*/
			wrap.removeChild(this.shipsStatus[id]);
			timer[id] ? clearInterval(timer[id]["fly"]) : 0;
			timer[id] ? clearInterval(timer[id]["charge"]) : 0;
			timer[id] = {};
			statusCompose[id] = {};
		},
		energyRender: function (id) {
			timer[id] = {};
			var ship = CentralControlUnit.ships[id];
			statusCompose[id]["status"].innerText = "fly";
			timer[id]["fly"] = setInterval(function () {
				statusCompose[id]["processBar"].style.width = (ship.energy/10)+"px";
				statusCompose[id]["num"].innerText = (ship.energy/10).toFixed(2)+"%";
				if (ship.energy <= 0) {
					clearInterval(timer[id]["fly"]);
				}
			},30);
		},
		chargeRender: function (news) {
			var id = this.adapter(news);
			//充电过程不看中断
			var ship = CentralControlUnit.ships[id];
			statusCompose[id]["status"].innerText = "charge";
			timer[id]["charge"] = setInterval(function () {
				statusCompose[id]["processBar"].style.width = (ship.energy/10)+"px";
				statusCompose[id]["num"].innerText = (ship.energy/10).toFixed(2)+"%";
				if (ship.energy >= 1000) {
					clearInterval(timer[id]["charge"]);
					ship.status = "ready";
					statusCompose[id]["status"].innerText = "ready";
				}
			},30);
		},
		stopRender: function (id) {
			clearInterval(timer[id]);
			this.shipsStatus[id].getElementsByClassName("status")[0].innerText = "stop";
		},
		adapter: function (news) {
			console.log(typeof news);
			console.log(news);
			var id = parseInt(news.substring(0,4),2);
			var command = news.length > 4 ? news.substring(4,8) : null;
			if (command) {
				var temp = {};
				temp["id"] = id;
				switch(command){
					case "0001":
						temp["command"] = "fly";
						break;
					case "0010":
						temp["command"] = "stop";
						break;
					case "0100":
						temp["command"] = "destory";
						break;
				}
				return temp;
			}else{
				return id+"";
			}
		},
		initSubscribe: function () {
			mediator.Subscribe.call(this,"ShipCreate",this.addShipStatus);
			mediator.Subscribe.call(this,"Command",function (msg) {
				console.log(msg);
				msg = this.adapter(msg);
				switch(msg["command"]){
					case "destory":
						this.delShipStatus(msg["id"]);
						break;
					case "fly":
						this.energyRender(msg["id"]);
						break;
					case "stop":
						this.stopRender(msg["id"]);
				}
			});
			mediator.Subscribe.call(this,"EnergyEnd",this.chargeRender);
		},
		init: function () {
			this.initSubscribe();
		}
	}
})();
var CentralDisplayUnit = (function () {
	var wrap = document.getElementById("cdu-content");
	return {
		initSubscribe: function () {
			mediator.Subscribe.call(this, "Command", this.subscribeCommandMsgProcess);
			mediator.Subscribe.call(this, "ShipCreate", this.subscribeShipCreateMsgProcess);
			mediator.Subscribe.call(this, "EnergyEnd", this.subscribeEnergyEndMsgProcess);
			mediator.Subscribe.call(this, "chargeEnd", this.subscribechargeEndMsgProcess);
		},
		subscribeCommandMsgProcess: function (msg) {
			msg = this.adapter(msg);
			var id = msg["id"];
			switch(msg["command"]){
				case "fly": 
					this.addMsg("联盟"+id+"号已开启曲速引擎，出发，caption","","asp-"+id+"(caption)");
					break;
				case "stop":
					this.addMsg("联盟"+id+"号停车成功，待命，caption","","asp-"+id+"(caption)");
					break;
				case "destory":
					this.addMsg("联盟"+id+"号已下线(销毁),caption");
			}
		},
		subscribeShipCreateMsgProcess: function (msg) {
			var id = this.adapter(msg);
			var sup = this;
			this.addMsg("联盟"+id+"号已经上线，在"+id+"号轨道，caption","","assistant");
			setTimeout(function () {
				sup.addMsg("联盟"+id+"曲速引擎已上线，随时可以出发，caption","","asp-"+id+"(caption)");
			},500);
		},
		subscribeEnergyEndMsgProcess: function (msg) {
			var id = this.adapter(msg);
			this.addMsg("联盟"+id+"号能量耗尽，开始充电，caption","","asp-"+id+"(caption)");
		},
		subscribechargeEndMsgProcess: function (msg) {
			var id = this.adapter(msg);
			this.addMsg("联盟"+id+"充电完毕，待命，caption","","asp-"+id+"(caption)");			
		},
		adapter: function (news) {
			var id = parseInt(news.substring(0,4),2);
			var command = news.length > 4 ? news.substring(4,8) : null;
			if (command) {
				var temp = {};
				temp["id"] = id;
				switch(command){
					case "0001":
						temp["command"] = "fly";
						break;
					case "0010":
						temp["command"] = "stop";
						break;
					case "0100":
						temp["command"] = "destory";
						break;
				}
				return temp;
			}else{
				return id+"";
			}
		},
		addMsg: function (msg, eleclass, who) {
			who = who+":";
			var p = document.createElement("p");
			var eleclass = eleclass ? "cc-item "+eleclass : "cc-item";
			p.setAttribute("class",eleclass);
			p.innerText = msg;
			var i = document.createElement("i");
			i.innerText = who;
			p.insertBefore(i,p.firstChild);
			wrap.appendChild(p);
		},
		init: function () {
			this.initSubscribe();
		}
	}
})();
var Universal = (function () {
	var wrap = $(".universe");
	var theShips = {};   //保存宇宙中的飞船DOM节点
	return {
		renderShip: function (id) {
			id = this.adapter(id);
			var div = document.createElement("div");
			div.setAttribute("class","spaceShip-"+id);
			div.setAttribute("id","ship-"+id);
			div.innerHTML = "<img src='images/spaceShip.png' alt=''>";
			theShips[id] = wrap.appendChild(div);
			CentralControlUnit.ships[id]["ele"] = theShips[id];
		},
		unrenderShip: function (id) {
			if (parseInt(Math.random()*10) <= 3) {
				return;
			}
			wrap.removeChild(theShips[id]);
		},
		initSubscribe: function () {
			mediator.Subscribe.call(this,"ShipCreate",this.renderShip);
			mediator.Subscribe.call(this,"Command",function (msg) {
				msg = this.adapter(msg);
				if (msg["command"] === "destory") {
					this.unrenderShip(msg["id"]);
				}
			});
		},
		adapter: function (news) {
			var id = parseInt(news.substring(0,4),2);
			var command = news.length > 4 ? news.substring(4,8) : null;
			if (command) {
				var temp = {};
				temp["id"] = id;
				switch(command){
					case "0001":
						temp["command"] = "fly";
						break;
					case "0010":
						temp["command"] = "stop";
						break;
					case "0100":
						temp["command"] = "destory";
						break;
				}
				return temp;
			}else{
				return id+"";
			}
		},
		init: function () {
			this.initSubscribe();
		}
	}
})();
var ShipCreateUnit = (function () {
	var wrap = $(".shipCreate");
	var createBtn = $("#shipCtreate");
	var selectedDate = {};
	return {
		getCurSelected: function () {
			return selectedDate;
		},
		initEventListen: function () {
			EventUtil.addHandler(wrap,"change",function () {
				var target = event.target;
				selectedDate[target.name] = target.value;
			})
		},
		init: function () {
			this.initEventListen();
		}
	}
})();

var EventUtil = {
  addHandler: function (element, type, handler) {
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type, handler);
    }else{
      element["on"+type] = handler;
    }
  },
  removeHandler: function (element,type,handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type,handler,false);
    } else if (element.detachEvent) {
      element.detachEvent("on"+type,handler);
    } else {
      element["on"+type] = null;
    }
  }
}

function init() {
	CentralControlUnit.init();
	SpaceshipStatusUnit.init();
	CentralDisplayUnit.init();
	Universal.init();
	ShipCreateUnit.init();
}
init();