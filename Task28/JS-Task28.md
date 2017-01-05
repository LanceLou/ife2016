>任务二十八：行星与飞船（三）
===

##任务目的
* 练习JavaScript面向对象设计
* 实践一些基础的设计模式

##任务描述
![demo](../images/task_2_28_1.jpg)

* 基于任务二十七，我们继续改善
* 第二代宇宙飞船系统进步了很多，但是我们依然无法知道飞船的能源消耗情况，可能有的时候我们发出开始飞行的指令，但飞船早就没有能量了，所以我们再次进行升级，这次我们需要增加一个飞船状态的监视系统
* 我们为每个飞船增加一个信号发射器，飞船会通过BUS系统定时（比如每秒）广播自己的飞行状态。发送的时候，我们通过已经安装在飞船上的Adapter把状态数据翻译成二进制码形式，把飞船自身标示，飞行状态，能量编码成一个16位的二进制串，前四位用于飞船自身标示，接下来4位表示飞行状态，0010为停止，0001为飞行，1100表示即将销毁，后八位用于记录飞船剩余能源百分比
* 行星上有一个信号接收器，用于通过BUS系统接受各个飞船发送过来的信号
* 当信号接收器接收到飞船信号后，会把信息传给数据处理中心（DC），数据处理中心依然是调用Adapter模块，把这些二进制数据转为对象格式存储在DC中
* 实现一个行星上的监视大屏幕（如图），用来显示所有飞船的飞行状态及能源情况，当数据处理中心飞船数据发生变化时，它会相应在监视器上做出变化

##任务注意事项
* 实现功能的同时，请仔细学习JavaScript相关的知识
* 相关信息发送、接受等，建议在控制台中输出
* 实现各种功能、模块时，不需要生搬硬套设计模式，但希望你就设计模式相关知识进行学习，并进行合理的借鉴运用
* 任务说明中的各种数值说明只是参考，可能存在不合理性，可以自行设定
* 请注意代码风格的整齐、优雅
* 代码中含有必要的注释
* 允许使用jQuery等库，但不建议使用React、Angular等框架

##在线学习参考资料
* [JavaScript Design Patterns](http://www.dofactory.com/javascript/design-patterns)
* [4 JavaScript Design Patterns You Should Know](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know)
* [JavaScript Design Patterns](https://carldanley.com/javascript-design-patterns/)
* [Understanding Design Patterns in JavaScript](http://code.tutsplus.com/tutorials/understanding-design-patterns-in-javascript--net-25930)
* [在线电子书：Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
* [JavaScript 设计模式 – 第一部分： 单例模式、组合模式和外观模式](http://www.adobe.com/cn/devnet/html5/articles/javascript-design-patterns-pt1-singleton-composite-facade.html)
* [JavaScript 设计模式 – 第二部分： 适配器、装饰者和工厂模式](http://www.adobe.com/cn/devnet/html5/articles/javascript-design-patterns-pt2-adapter-decorator-factory.html)
* [JavaScript设计模式一：工厂模式和构造器模式](https://segmentfault.com/a/1190000002525792)
* [JavaScript 设计模式读书笔记(五)——工厂模式](https://segmentfault.com/a/1190000000491074)
* [Alloy JavaScript 设计模式](http://www.alloyteam.com/2012/10/common-javascript-design-patterns/)
* [常用的Javascript设计模式](http://blog.jobbole.com/29454/)
* [javascript常见的设计模式举例](http://blog.csdn.net/yingyiledi/article/details/26725795)
* [前端攻略：javascript 设计模式](http://www.cnblogs.com/Darren_code/archive/2011/08/31/JavascripDesignPatterns.html)