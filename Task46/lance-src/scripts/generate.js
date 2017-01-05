/*
	目前准备在产生Map的的时候就已经获取到了shortest PATH
	如果无法获取到shortest PATH即此路不通  从新生成Map  直至wall的数量达到一定的数目的时候，考虑玩家通关完毕
	即在此js文件中   生成Map的同时，就已经有shortest PATH了。
	其实在生成Map的时候产生的shortest PATH说有用也有用，说没用也没用   如果用户一开始点击的就是target有用  (但其是必须的，因为我们需要验证可达性)

	
*/