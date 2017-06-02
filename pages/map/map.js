// map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map_list: [{
      h_id: 0,
      image: [{
       map_id: 0,
       map_image_url: '../../images/MapImages/1.png'
      }, {
       map_id: 1,
       map_image_url: '../../images/MapImages/2.png'
      }, {
       map_id: 2,
       map_image_url: '../../images/MapImages/3.png'
      }, {
       map_id: 3,
       map_image_url: '../../images/MapImages/4.png'
      }]
    }],
    h_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      h_id: options.h_id
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