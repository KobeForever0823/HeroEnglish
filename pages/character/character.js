// character.js
var domain = 'https://47281688.qcloud.la/index.php/V1/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    map_list: [],
    map_id: 0,
    banner_id: 0,
    character_list: []
  },

  getCharacter: function() {
    var _this = this;
    wx.request({
      url: domain + 'character/getCharacter/' + map_id, 
      success(res) {
        _this.setData({
          character_list: res.data
        })
      }
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      h_id: options.h_id,
      map_id: options.map_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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