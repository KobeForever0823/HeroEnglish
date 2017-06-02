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
      upperText: 'Oh',
      lowerText: 'OH',
      timeLimit: 1000
    }, {
      id: 1,
      upperText: 'my',
      lowerText: 'MY',
      timeLimit: 2000
    }, {
      id: 2,
      upperText: 'fxxxxxx',
      lowerText: 'FXXXXXXX',
      timeLimit: 1500
    }, {
      id: 3,
      upperText: 'god',
      lowerText: 'GOD',
      timeLimit: 2500
    }, {
      id: 4,
      upperText: '',
      lowerText: '!',
      timeLimit: 100
    }], 
    map_list: [{
      map_id: 0,
      map_url: '../../images/MapImages/1.png',
      text: 'Speak up',
    },
    {
      map_id: 1,
      map_url: '../../images/MapImages/2.png',
      text: 'Harvard',
    },
    {
      map_id: 2,
      map_url: '../../images/MapImages/3.png',
      text: 'MIT',
    },
    {
      map_id: 3,
      map_url: '../../images/MapImages/3.png',
      text: 'ISM',
    }],
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
    }],
    currentIndex: 0,
    pageCount: 4,
    hidden: true,
    uploading_hidden: true,
    rate: 0.4,
    tempFilePath: '',
    timeRemain: 0,
    h_id: 0,
    map_id: 0,
    img_id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      map_id: options.map_id,
      img_id: options.img_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  refreshPage: function(options) {
    this.setData({
      isRecordStart: false,
      isRecordOver: false,
      isUploadOver: false,
      currentIndex: this.data.currentIndex,
      hidden: true,
      uploading_hidden: true,
      rate: 0,
      tempFilePath: '',
      timeRemain: this.data.showText[this.data.currentIndex].timeLimit
    })
  },

  showModel: function() {
    var _this = this;
    wx.showModal({
      title: '',
      content: '确认上传录音？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          _this.setData({
            uploading_hidden: false,
            hidden: true
          }),
          wx.uploadFile({
            url:'',
            filePath: _this.data.tempFilePath,
            name: 'record_file',
            success: function(res) {
              _this.setData({
              uploading_hidden: true,
              isUploadOver: true
            })
            wx.showModal({
              title: '',
              content: '录音上传成功！',
              showCancel: false,
              confirmText: '确认'
            })
            }
          })
        } else if (res.cancel) {
          _this.setData({
            hidden: true,
            uploading_hidden: true,
            isUploadOver: true,
            timeRemain: _this.data.showText[_this.data.currentIndex].timeLimit
          })
        }
      }
    })
  },

  countDown: function() {
    var _this = this
    console.log(_this.data.timeRemain);
    if (_this.data.timeRemain == 0) {
      wx.stopRecord()
      _this.showModel()
    } else {
      setTimeout(function(){
        _this.setData({
          timeRemain: _this.data.showText[_this.data.currentIndex].timeLimit - 1,
          rate: _this.data.timeRemain / _this.data.showText[_this.data.currentIndex].timeLimit
        });
        this.countDown();
      }, 10)
    }
  },

  recordClick: function(options) {
    var _this = this;
    _this.setData({
      hidden: false,
    });
    wx.startRecord({
      success: function(res) {
        _this.setData({
          tempFilePath: res.tempFilePath
        })
      },
      fail: function(res) {
      }
    })
    _this.countDown();
  },

  nextClick: function(options) {
    var _this = this;
    if (_this.data.pageCount > _this.data.currentIndex) {
      _this.setData({
        currentIndex: _this.data.currentIndex + 1
      }),
      _this.refreshPage();
    } else if (_this.data.pageCount == this.data.currentIndex){
      wx.redirectTo({
        url: '../grade/grade'
      })
    }
  }, 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentIndex: 0,
      pageCount: 4,
      hidden: true,
      uploading_hidden: true,
      rate: 0,
      tempFilePath: '',
      timeRemain: this.showText[currentIndex].timeLimit
    })
  }

})