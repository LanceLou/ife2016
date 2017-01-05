function SpaceShip(id) {
	this.id = id;   //飞船ID  同时也是所在轨道的编号
	this.name = "";  //飞船名字
	this.ele = null;   //飞船对应的DOM节点
	this.energy = -1;   //飞船能量
	this.status = "";   //飞船状态：charge  ready  destroied  fly
	this.deg = 0;    //当前飞船所在轨道的位置
	this.timer = {};   //定时器相关对象
	this.subscribed = false;
}
/*
	不应该在对象里面作订阅操作
		对象只接受命令并执行操作，不主动去干某事
*/
SpaceShip.prototype={
	Constructor: SpaceShip,
	/*下面的函数都需要进行相关的广播*/

	fly: function () {
		var ship = this.ele;
		this.status = "fly";
		var sup = this;
		var ele = this.ele;

		this.timer["fly"] = setInterval(function () {
			sup.deg += 1;
			sup.energy -= 1;
			ship.style.transform = "rotate("+sup.deg+"deg)";
			if (sup.energy <= 0) {
				//能量使用完，进行广播
				mediator.Publish("EnergyEnd",sup.id);
				//自己展开太阳能帆，charge
				sup.charge();
				clearInterval(sup.timer["fly"]);
			}
		},15);
	},
	stop: function () {
		//这是订阅关系
		console.log("stop");
		this.status = "stop";
		clearInterval(this.timer["fly"]);
	},
	destroy: function () {
		//飞船被销毁，无需广播，这是订阅关系(订阅来自中控的msg)
		clearInterval(this.timer["fly"]);
		clearInterval(this.timer["charge"]);
		this.status = "destroied";
		//删除相应的宇宙引用
	},
	charge: function () {
		//充电时不能被打断
		var sup = this;
		this.timer["charge"] = setInterval(function () {
			sup.energy += 1;
			if (sup.energy >= 1000) {
				clearInterval(sup.timer["charge"]);
				mediator.Publish("ChargeEnd",sup.id);
			}
		},40);

	},
	//对于command指令的消息，咱们需要对其进行加工	   算是飞船的接收器吧
	subscribeCommandMsgProcess: function (msg) {
		var id = msg["id"];
		if (this.id != id) {
			return;
		}
		switch(msg["command"]){
			case "fly": 
				this.fly();
				break;
			case "stop":
				this.stop();
				break;
			case "destory":
				this.destroy();
				break;
		}
	},
	initSubscribe: function () {
		mediator.Subscribe.call(this,"Command",this.subscribeCommandMsgProcess);
	},
	init: function () {
		/*新飞船进行相关属性的初始化*/
		this.name = "aps-"+this.id;
		this.energy = 1000;
		this.status = "ready";
		this.deg = 90;
		//如果订阅了一次，就不用再订阅了
		if (!this.subscribed) {
			this.initSubscribe();
			this.subscribed = true;
		}
		
	}
}