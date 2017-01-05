/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

var chartWrapper = document.getElementById("aqi-chart-wrap");
var blockColor = {};   //定义公共的color属性

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


/*将柱形的总高度设置为500  从而使得相应的aqi数据即为相应的矩形高度   同时注意
相关的矩形的宽度的计算与获取   求平均
*/

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  chartWrapper.innerHTML = "";
  var localChartWrapper = chartWrapper;
  //全局变量本地化，减少全局访问
  var localChartData = chartData["data"];
  var fragment = document.createDocumentFragment();
  var aqiValue = "";  //本地存储aqi的值，减少全局访问
  //每个chart块的宽度 每个chart块的左右margin
  var spanEle = null;
  var chartBlockAttr = getMarginWidth();
  var widthMargin = chartBlockAttr["charBlockWidth"];
  var info = [];  //记录几月第几周
  //添加csption
  var div = document.createElement("div");
  div.setAttribute("class","caption");

  switch(pageState["nowGraTime"]){
    case "day":
      div.innerText = pageState["nowSelectCity"]+"市各月份日API";
      for(var day in localChartData){
        aqiValue = localChartData[day];
        spanEle = document.createElement("span");
        spanEle.setAttribute("class","chart-block");
        spanEle.setAttribute("data-show",day+"  aqi:"+aqiValue);
        spanEle.style.height = aqiValue;
        spanEle.style.width = widthMargin;
        spanEle.style.margin = "0";
        if (!blockColor[aqiValue]) {
          blockColor[aqiValue] = getRandomColor();
        }
        spanEle.style.backgroundColor = blockColor[aqiValue];
        EventUtil.addHandler(spanEle,"mouseenter",function (event) {
          var styleTemp = this.getAttribute("class");
          styleTemp = styleTemp+" chart-block-before";
          this.setAttribute("class",styleTemp);
        });
        EventUtil.addHandler(spanEle,"mouseleave",function (event) {
          var styleTemp = this.getAttribute("class").split(" ")[0];
          this.setAttribute("class",styleTemp);
        });
        fragment.appendChild(spanEle);
      }
      localChartWrapper.appendChild(fragment);
      break;
    case "week":
      div.innerText = pageState["nowSelectCity"]+"市各月份周API";
      for(var week in localChartData){
        aqiValue = localChartData[week];
        spanEle = document.createElement("span");
        spanEle.setAttribute("class","chart-block");
        info = week.split("-");
        spanEle.setAttribute("data-show","第"+info[0]+"月第"+info[1]+"周"+"  aqi:"+aqiValue);
        spanEle.style.height = aqiValue;
        spanEle.style.width = widthMargin;
        spanEle.style.margin = "0";
        if (!blockColor[aqiValue]) {
          blockColor[aqiValue] = getRandomColor();
        }
        spanEle.style.backgroundColor = blockColor[aqiValue];
        EventUtil.addHandler(spanEle,"mouseenter",function (event) {
          var styleTemp = this.getAttribute("class");
          styleTemp = styleTemp+" chart-block-before-week";
          this.setAttribute("class",styleTemp);
        });
        EventUtil.addHandler(spanEle,"mouseleave",function (event) {
          var styleTemp = this.getAttribute("class").split(" ")[0];
          this.setAttribute("class",styleTemp);
        });
        fragment.appendChild(spanEle);
      }
      localChartWrapper.appendChild(fragment);
      break;
    case "month":
      div.innerText = pageState["nowSelectCity"]+"市各月份月API";
      for(var month in localChartData){
        aqiValue = localChartData[month];
        spanEle = document.createElement("span");
        spanEle.setAttribute("class","chart-block");
        spanEle.setAttribute("data-show","第"+month+"月"+"  aqi:"+aqiValue);
        spanEle.style.height = aqiValue;
        spanEle.style.width = widthMargin;
        spanEle.style.margin = "0 "+chartBlockAttr["charBlockMariginLR"];
        if (!blockColor[aqiValue]) {
          blockColor[aqiValue] = getRandomColor();
        }
        spanEle.style.backgroundColor = blockColor[aqiValue];
        EventUtil.addHandler(spanEle,"mouseenter",function (event) {
          var styleTemp = this.getAttribute("class");
          styleTemp = styleTemp+" chart-block-before-month";
          this.setAttribute("class",styleTemp);
        });
        EventUtil.addHandler(spanEle,"mouseleave",function (event) {
          var styleTemp = this.getAttribute("class").split(" ")[0];
          this.setAttribute("class",styleTemp);
        });
        fragment.appendChild(spanEle);
      }
      localChartWrapper.appendChild(fragment);
      break;
  }
  chartWrapper.appendChild(div);

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(timeVaue) {
  // 确定是否选项发生了变化
  if (pageState.nowGraTime === timeVaue) {
    return;
  }
  pageState.nowGraTime = timeVaue;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */

function citySelectChange(city) {
  // 确定是否选项发生了变化
  if (pageState.nowSelectCity === city) {
    return;
  }
  pageState.nowSelectCity = city;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radioS = {};
  var graTimeEles = document.getElementById("form-gra-time");
  var firstLabel = graTimeEles.firstElementChild.nextElementSibling;
  radioS.day = firstLabel.firstElementChild;
  radioS.week = firstLabel.nextElementSibling.firstElementChild;
  radioS.month = firstLabel.nextElementSibling.nextElementSibling.firstElementChild;
  for(radio in radioS){
    EventUtil.addHandler(radioS[radio],"focus",function (event) {
      graTimeChange(event.target.value);
    });
  }
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  var select = document.getElementById("city-select");
  var option = null;
  var optionsFrag = document.createDocumentFragment();
  var cityArr = ["北京","上海","广州","深圳","成都","西安","福州","厦门","沈阳"];
  for(city in aqiSourceData){
    option = document.createElement("option");
    option.innerText = city;
    optionsFrag.appendChild(option);
  }
  select.appendChild(optionsFrag);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  EventUtil.addHandler(select,"change",function (event) {
    citySelectChange(cityArr[event.target.selectedIndex]);
  })

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var len = 0;   //记录长度  月长  或周长
  var avg = 0;   //记录周平均或月平均
  var localAqiSourceDate = null;  //将全局的数据对象保存到当前函数(scop)中减少全局访问
  var flag = true;  //开关变量
  var month = "";  //记录当天或当周为第几月
  var valueSize = 0;   //记录数据的个数，方便后期布局
  console.log(pageState["nowGraTime"]);
  switch(pageState["nowGraTime"]){
    case "day": 
      chartData["data"] = aqiSourceData[pageState["nowSelectCity"]];
      localAqiSourceDate = aqiSourceData[pageState["nowSelectCity"]];
      for(var key in localAqiSourceDate){
        valueSize++;
      }
      chartData["dataSize"] = valueSize;
      break;
    case "month":
      chartData["data"] = {};
      localAqiSourceDate = aqiSourceData[pageState["nowSelectCity"]];
      for(var date in localAqiSourceDate){
        if (flag) {
          month = date.split("-")[1];
          flag = false;
        }
        if (month !== date.split("-")[1]) {
          chartData["data"][month] = Math.round(avg/len);
          valueSize++;
          month = date.split("-")[1];
          avg = 0;
          len = 0;
        }
        avg = avg + localAqiSourceDate[date];
        len++;
      }
      //最后一个月
      chartData["data"][month] = Math.round(avg/len);
      valueSize++;
      chartData["dataSize"] = valueSize;
      flag = true;
      break;
    case "week":
      chartData["data"] = {};
      localAqiSourceDate = aqiSourceData[pageState["nowSelectCity"]];
      //记录星期的值
      var week_day = 0;
      //记录当前是某一月的第几周
      var week = 1;
      for(day in localAqiSourceDate){
        if (flag) {
          month = day.split("-")[1];
          flag = false;
        }
        //如果这一月已经提前结束且新的一个月的第一天不是周一，则也结束当前周，不管算了几天
        if (month !== day.split("-")[1]) {
          if (new Date(day).getUTCDay() !== 1) {
            //此处的month依然为上一个月
            chartData["data"][month+"-"+week] = Math.round(avg/len);
            valueSize++;
            //将month设置为新的一个月
            month = day.split("-")[1];
            avg = 0;
            len = 0;
          }else{
            month = day.split("-")[1];
          }
          week = 1;
        }
        //记录当前为星期几
        week_day = new Date(day).getUTCDay();
        avg += localAqiSourceDate[day];
        len++;
        //如果已经到周日了  这这一周结束
        if (week_day == 0) {
          chartData["data"][month+"-"+week] = Math.round(avg/len);
          valueSize++;
          //将第几周记录数值进行自增，即为当前月的下一周
          week++;
          avg = 0;
          len = 0;
        }
      }
      //最后一周：
      chartData["data"][month+"-"+week] = Math.round(avg/len);
      valueSize++;
      chartData["dataSize"] = valueSize;
  }
  // 处理好的数据存到 chartData 中
}
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
//为树状图的矩形生成随机颜色
function getRandomColor() {
  var c = '#'; 
  var cArray = ['2','5','6','7','8','9','A','B','E']; 
  for(var i = 0; i < 6;i++) 
  { 
    var cIndex = Math.round(Math.random()*8); 
    c += cArray[cIndex]; 
  } 
  return c;
}
//获取每个chart块的宽度和左右边距
function getMarginWidth() {
  var size = chartData["dataSize"];
  var chartBlockAttr = {};
  chartBlockAttr["charBlockWidth"] = chartBlockAttr["charBlockMariginLR"] = (1200/(chartData["dataSize"])).toFixed(2)+"px";
  if (pageState["nowGraTime"] === "month") {
   chartBlockAttr["charBlockWidth"] = (1200/(size*2)).toFixed(2);
   chartBlockAttr["charBlockMariginLR"]  =  chartBlockAttr["charBlockWidth"] / 2 + "px";
   chartBlockAttr["charBlockWidth"] += "px";
  }
  return chartBlockAttr;
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}
init();