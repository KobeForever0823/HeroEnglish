// home.js
var domain = 'https://47281688.qcloud.la/index.php/V1/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    home_img_list: [{
      id: 0,
      home_img_url: '../../images/Home/Kiko and Friends.png'
    }, {
      id: 1, 
      home_img_url: '',
    }],
    story_select: [],
    story_id: 0,
  },


  getMap: function() {
    var _this = this;
    wx.request({
      url: domain + 'map/getMap/' + _this.data.story_id,
      success(res) {
        console.log(res.data);
        _this.setData({
          story_select: res.data
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
    this.getMap()
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