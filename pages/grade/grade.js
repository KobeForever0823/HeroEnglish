// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 1,
    progress1: 40,
    progress2: 50,
    progress3: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  drawArc: function() {
    var score_arc = wx.createCanvasContext('canvasArc');

    score_arc.setLineWidth(5);
    score_arc.setStrokeStyle('#ED7D31');
    score_arc.setLineCap('round');
    score_arc.beginPath();
    score_arc.arc(75, 75, 60, -1 / 2 * Math.PI, - 1 / 2 * Math.PI + this.data.score * 2 * Math.PI, false);
    score_arc.stroke();
    score_arc.draw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawArc();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})