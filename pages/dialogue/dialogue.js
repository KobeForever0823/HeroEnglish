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
      timeLimit: 5000
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
    grade: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      map_id: options.map_id,
      img_id: options.img_id
    });
  },

  drawProgress: function(w, c) {
    var record_progress = wx.createCanvasContext('recordingProgress');
    record_progress.setFillStyle('green');
    record_progress.fillRect(10, 10, w * c, 5);
    record_progress.draw();
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
    _this.setData({
      hidden: true
    });
    wx.showModal({
      title: '',
      content: '确认提交录音以获得成绩？',
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
            }),
            wx.showToast({
              title: '你这次的得分是' + _this.data.grade,
              image: '',
              duration: 1500
            });
            }
          })
        } else if (res.cancel) {
          _this.drawProgress(0, 0);
          _this.setData({
            hidden: true,
            uploading_hidden: true,
            isUploadOver: true,
            isRecordOver: false,
            timeRemain: _this.data.showText[_this.data.currentIndex].timeLimit
          })
        }
      }
    })
  },

  // countDown: function() {
  //   var _this = this;
  //   if (_this.data.timeRemain == 0) {
  //     wx.stopRecord()
      
  //   } else {
  //     setTimeout(function(){
  //       _this.setData({
  //         timeRemain: _this.data.timeRemain - 1,
  //         rate: _this.data.timeRemain / _this.data.showText[_this.data.currentIndex].timeLimit
  //       });
        
  //       _this.countDown();
  //     }, 10);
  //   }
  // },

  recordClick: function(options) {
    var _this = this;
    var count = 0;
    _this.setData({
      hidden: false,
    });
    wx.startRecord({
      success: function(res) {
        // wx.showToast({
        //   title: 'success',
        //   duration: 1000
        // })
        _this.setData({
          tempFilePath: res.tempFilePath
        })
        console.log(_this.data.tempFilePath);
      },
      fail: function(res) {
        // wx.showToast({
        //   title: 'failed',
        //   duration: 1000
        // })
      }
    });
    var recordInterval = setInterval(function(){
      if (count == _this.data.showText[_this.data.currentIndex].timeLimit / 1000 || _this.data.timeRemain <= 0) {
        clearInterval(recordInterval);
        count = 0;
        wx.stopRecord();
        _this.showModel();
      } else {
        count++;
        _this.drawProgress(500 / (_this.data.showText[_this.data.currentIndex].timeLimit / 500), count);
        _this.setData({
          timeRemain: _this.data.timeRemain - 1000,
          rate: _this.data.timeRemain / _this.data.showText[_this.data.currentIndex].timeLimit
        });
        console.log(_this.data.timeRemain);
        console.log(count);
      }
    }, 1000);
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
        // url: '../grade/grade?grade_id=' + _this.data.grade
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
      timeRemain: this.data.showText[this.data.currentIndex].timeLimit
    })
  }

})