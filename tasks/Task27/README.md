>任务二十七：行星与飞船（二）
===

##任务目的
* 练习JavaScript面向对象设计
* 实践一些基础的设计模式

##任务描述

![demo](../images/task_2_27_1.jpg)

* 基于任务二十六，我们继续改善我们的任务
* 第一代宇宙飞船系统真是糟糕的实现，所以我们需要进行改进飞船自身，我们在几个部件进行了更多的组合可能性，在创建新飞船时可以自行选择，如图
* 我们新增了几种动力系统，能够让飞船飞得更快，相应的能源消耗也会不同
* 我们新增了集中能源系统，能够让飞船能量补充能源速度越快ef
* 接下来改进的是指令的传播问题
* 我们发明了新一代的传播介质BUS，它的单次传播失败率降低到10%，传播速度提升到300ms，而且他增加了多次重试的功能，可以保证信息一定能够传递出去，请你实现这个可以通过多次重试保证在10%丢包率情况下顺利将信息传递出去的BUS传播介质
* 但BUS有个弱点，就是无法直接传递JSON格式，它只能传递二进制码，但指挥官并不能够直接下达二进制编码指令，所以我们需要在行星上的发射器部分增加一个模块Adapter，把原来的指令格式翻译成二进制码。同时还需要在飞船的接收器部分增加一个Adapter，用来把二进制码翻译成原来能够理解的指令格式
* 二进制码格式自定，可以参考的例子：前四位标示飞船编号，后四位标示具体指令（0001：开始飞行，0010：停止飞行，1100：自我销毁）

##任务注意事项
* 实现功能的同时，请仔细学习JavaScript相关的知识
* 相关信息发送、接受等，建议在控制台中输出
* 任务说明中的各种数值说明只是参考，可能存在不合理性，可以自行设定
* 实现各种功能、模块时，不需要生搬硬套设计模式，但希望你就设计模式相关知识进行学习，并进行合理的借鉴运用
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