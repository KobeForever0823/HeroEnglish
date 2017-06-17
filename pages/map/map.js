// map.js
var domain = 'https://47281688.qcloud.la/index.php/V1/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    map_id: 0,
    cards_list: [],
  },

  getCharacterById: function() {
    var _this = this;
    wx.request({
      url: domain + 'character/getCharacter/' + _this.data.map_id,
      success(res) {
        console.log(res.data.data);
        _this.setData({
          cards_list: res.data.data
        })
      },
      fail(error) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      map_id: options.map_id
    })
    this.getCharacterById();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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