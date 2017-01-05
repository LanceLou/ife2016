>任务四十六：王牌特工 准备工作（一）
===

##任务目的
* 熟悉 HTML5 技术在游戏开发领域的应用
* 学习游戏核心玩法的设计，并在此基础上合理地管理和添加功能
* 熟练使用 JavaScript 解决一般性的算法问题
* 为第四阶段的游戏任务做准备


##任务描述

![demo](../images/task_3_46_1.png)



* 开发一款适用于移动端的 HTML5 游戏
* 如下图，创建一个矩形活动区域
* 在区域上方设置起点，放置特工（主角）；在区域下方设置终点，放置机密文件（目标）
* 区域内有随机生成的墙：墙是不可进入或穿过的
* 通过点击屏幕内可活动区域，可以使特工移动到指定位置，寻路算法可自行选择并实现
* 特工抵达终点获得文件，生成下一个关卡


##任务注意事项
* 请注意代码风格的整齐、优雅
* 代码中含有必要的注释
* 可选择用 Canvas（推荐）或 DOM 或两者结合的方式实现
* 能够适应不同分辨率的手机
* 保证游戏关卡是可通的
* 图例样式仅供参考，可自行设计
* 可以合理使用第三方框架、类库


##任务协作建议
* 如果是各自工作，可以按以下方式：
* 团队集中讨论，明确题目要求，保证队伍各自对题目要求认知一致
* 各自完成任务实践
* 交叉互相Review其他人的代码，建议每个人至少看一个同组队友的代码
* 相互讨论，最后合成一份组内最佳代码进行提交
* 如果是分工工作（推荐），可以按以下模块切分
* 特工的操控和移动
* 关卡随机生成
* 寻路算法
* 移动端适配
* 样式


##在线学习参考资料
* [MDN Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
* How to Make a Simple HTML5 Canvas Game [英文](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/) [中文](http://www.cnblogs.com/Wayou/p/how-to-make-a-simple-html5-canvas-game.html)
* [移动端屏幕适配方案](https://github.com/baidu-ife/ife/blob/master/2015_summer/task/game_yangfan_01.md#2-一个适配移动端的游戏场景)
* [寻路算法可视化实现](http://qiao.github.io/PathFinding.js/visual/)