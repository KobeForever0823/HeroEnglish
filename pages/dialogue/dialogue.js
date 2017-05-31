// pages/dialogue/dialogue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRecordStart: false,
    isRecordOver: false,
    isUploadOver: false,
    showText: [{
      id: 0,
      upperText: "Oh",
      lowerText: "OH"
    }, {
      id: 1,
      speakingText: "my",
      speechText: "MY"
    }, {
      id: 2,
      speakingText: "fxxxxxx",
      speechText: "FXXXXXXX"
    }, {
      id: 3,
      speakingText: "god",
      speechText: "GOD"
    }, {
      id: 4,
      speakingText: "",
      speechText: ""
    }],    
    currentText: {
      id: 0,
      speakingText: "xxx",
      speechText: ""
    },
    totalText: 0,
    hidden: true,
    timeLimit: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  recordClick: function(options) {
    var _this = this;
    _this.setData({
      hidden: false,
    });
    
    setTimeout(function() {
      _this.setData({
        hidden: true,
        isUploadOver: true
      });
    }, _this.data.timeLimit);
  },

  nextClick: function(options) {
    
  }, 


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isRecordStart: false,
      isRecordOver: false,
      isUploadOver: false,
      currentText: {
        id: 0,
        speakingText: this.data.isRecordOver + '',
        speechText: this.data.isUploadOver + ''
      }
    })
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