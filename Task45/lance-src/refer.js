/**
  *
  * Rowphoto v0.0.1
  * desciption, by StevenYu.
  * use with rowphoto.css
  * @author StevenYu
  */



;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Rowphoto = factory();
  }
}(this, function() {

  'use strict';

  /**
    * @param {Object} opts - options used in plugin
    * @constructor
    */

  var Rowphoto = function(opts) {

    opts = opts || {};
    var containerSelector = opts.containerSelector || '.rowphotoContainer';
    var boxSelector = opts.boxSelector || '.rowphotoBox';

    this.rowMinHeight = opts.rowMinHeight || '200px';
    this.container = document.querySelector(containerSelector);

    //获取每一个图片的盒子容器的DOM  一个图片对应一个盒子容器
    this.boxes = this.container ? Array.prototype.slice.call(this.container.querySelectorAll(boxSelector)) : [];


    //--------------->>>>>>>>>>>>>>>>>>>>>>>>--------------------------  取得每一个盒子的比值
    for (var i = 0; i < this.boxes.length; i++) {
      this.boxes[i].ratio = this.boxes[i].clientWidth / this.boxes[i].clientHeight;
    }
    // init rowphoto
    this.compose();
  }

  /**
    * Plugin prototype definition.
    */

  Rowphoto.prototype = {

    /**
      * compose the Rowphoto
      */

    compose: function() {

      var rows = this.calcRow(3, 6);
      var index = 0;
      var i;

      // initial the rows
      this.initRow(rows);

      // add the box to the rows according to the index
      for (i = 0; i < this.boxes.length; i++) {
        if (i > rows[index].number) index ++;
        this.boxes[i].style.height = '100%';
        this.boxes[i].style.width = '';
        this.addBox(this.boxes[i], index);
      }
    },

    /**
      * calculate the rows according to the minium height
      * @param {Number} min - the min number of the images 每一行最少的列数
      * @param {Number} max - the max number of the images 每一行至多的列数
      * @return {Array} rows -object including the number of rows and the height of the rows
      */

      /**
        通过每一个图像缩放到列最小高度（这里默认200px，也可以自己指定）的宽度叠加与容器宽度比较计算出数
      量，再通过比值计算回合适的列的高度。缺点在于列的计算需要等待图像全部加载完才能算出来
      */
    //计算行高度的关键代码
    calcRow: function(min, max) {
      //去掉后面两个  去掉最后连个，即单位px
      var height = this.rowMinHeight.slice(0,-2);
      var rows = [];
      var width = 0;
      var count = 0; 
      var ratio;  //比例
      var totalWidth;   //宽度和值
      var totalHeight;   //高度和值
      var i;
      
      // compare the total width with the container width
      // if the total width is grater than container width
      // than push to the row array which include the number and height
      // clear data and loop(循环) again until end
      //
      for (i = 0; i < this.boxes.length; i++) {
        //初始化相同的高度
        this.boxes[i].style.height = height + 'px';
        //按比值计算出他们的宽度
        this.boxes[i].style.width = (height * this.boxes[i].ratio) + 'px';
        //进行width相加   for   与容器的宽度比较
        width += height * this.boxes[i].ratio;
        count++;
        if ((width > this.container.clientWidth && count > min) || count > max) {
          //减掉超出的那一个box
          totalWidth = width - this.boxes[i].clientWidth;
          //初始height / 现实际宽度
          ratio = height / totalWidth;
          //其容器宽度乘以比例
          totalHeight = this.container.clientWidth * ratio;
          rows.push({number: i-1, height: totalHeight});
          width = this.boxes[i].clientWidth;
          count = 1;
        }
      }
      rows.push({number: i, height: 200});
      return rows;
    },

    /**
      * init the rows
      * @param {Array} row -object including the number of rows and the height of the rows
      */

    initRow: function(row) {
      this.rows = [];
      for (var i = 0; i < row.length; i++) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'rowphotoRow';
        rowDiv.style.height = row[i].height + 'px';
        this.rows.push(rowDiv);
        this.container.appendChild(rowDiv);
      }
    },

    /**
      * add the box to the row
      * @param {Object} ele - the box element
      * @param {Number} index - the index of the rows
      */

    addBox: function(ele, index) {
      var row = this.rows[index];
      row.appendChild(ele);
    }

  }

  return Rowphoto;

}));




window.onload = function() {
  var rowphoto = new Rowphoto({
    containerSelector: '.rowphotoContainer'
  })
}