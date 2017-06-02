// character.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map_list: [{
      id: 0,
      url: '../../images/MapImages/1.png',
      text: 'Speak up',
    },
    {
      id: 1,
      url: '../../images/MapImages/2.png',
      text: 'Harvard',
    },
    {
      id: 2,
      url: '../../images/MapImages/3.png',
      text: 'MIT',
    },
    {
      id: 3,
      url: '../../images/MapImages/3.png',
      text: 'ISM',
    }],
    map_id: 0,
    h_id: 0,
    buttonImage: [{
      map_id: 0,
      image: [{
        img_id: 0,
        img_url: '../../images/ButtonImages/Button1.png'
      }, {
          img_id: 1,
          img_url: '../../images/ButtonImages/Button2.png'
      }, {
          img_id: 2,
          img_url: '../../images/ButtonImages/Button3.png'
      }, {
          img_id: 3,
          img_url: '../../images/ButtonImages/Button3.png'
      }]
    }]
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