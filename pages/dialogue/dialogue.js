// pages/dialogue/dialogue.js
var domain = 'https://47281688.qcloud.la/index.php/V1/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    words_list: [],
    map_id: 0,
    character_id: 0,
    story_id: 0,
    dialog_id: 0,
    test_id: 0,
    dialog_record_url: [],
    autoplay: false,
    interval: 5000,
    duration: 5000,
    currentIndex: 0,
    wordCount: 5,
    isFirstWord: false,
    isLastWord: false,
    recordPath: ''
  },

  getDialog: function() {
    var _this = this;
    wx.request({
      url: domain + 'dialog/getDialog/' + _this.data.character_id,
      success(res) {
        console.log(res.data);
        _this.setData({
          words_list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      map_id: options.map_id,
      story_id: options.story_id,
      character_id: options.character_id
    })
    this.getDialog();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  // 开始录音

  recordClick: function(options) {
    var _this = this;
    console.log('recording');
    wx.startRecord({
      success: function(res) {
        console.log(res);
        var tempFilePath = res.tempFilePath;
        _this.setData({
          recordPath: tempFilePath,
        })
      }, 
      fail: function(res) {
        console.log('fail');
        console.log(res);
      }
    });    
  },

  // 结束录音

  endRecord: function() {
    var _this = this;
    wx.stopRecord();
    console.log('end');
    setTimeout(function() {
      var urls = domain + "record/score/" + _this.data.character_id + '/' +
        _this.data.dialog_id;
      wx.uploadFile({
        url: urls,
        filePath: _this.data.recordPath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function(res) {
          console.log('success');
          console.log(res);
        },
        fail: function(res) {
          console.log('fail');
          console.log(res);
        }
      }); 
    }, 1000);
  },

  playWordVoice: function(dialog_record_url) {
    var _this = this;
    _this.setData({
    })
    wx.playVoice({
      filePath: _this.data.dialog_record_url,
      complete: function() {
      }
    })
  },

  backButtonClick: function() {
    var _this = this;
    if (_this.data.currentIndex > 0) {
      _this.setData({
        currentIndex: _this.data.currentIndex - 1,
      })
      _this.setData({
        dialog_id: _this.data.currentIndex
      })
    }
    if (_this.data.currentIndex == 0) {
        _this.setData({
          isFirstWord: true
        })
      }
  },
  
  forwardButtonClick: function() {
    var _this = this;
    if (_this.data.currentIndex < _this.data.wordCount) {
      _this.setData({
        currentIndex: _this.data.currentIndex + 1,
      })
      _this.setData({
        dialog_id: _this.data.currentIndex
      })
    }
    if (_this.data.currentIndex == _this.data.wordCount) {
      _this.setData({
        isLastWord: true
      })
    }
  },


  // showModel: function() {
  //   var _this = this;
  //   _this.setData({
  //     hidden: true
  //   });
  //   wx.showModal({
  //     title: '',
  //     content: '确认提交录音以获得成绩？',
  //     showCancel: true,
  //     cancelText: '取消',
  //     confirmText: '确认',
  //     success: function (res) {
  //       if (res.confirm) {
  //         _this.setData({
  //           uploading_hidden: false,
  //           hidden: true
  //         }),
  //         wx.uploadFile({
  //           url:'',
  //           filePath: _this.data.tempFilePath,
  //           name: 'record_file',
  //           success: function(res) {
  //             _this.setData({
  //             uploading_hidden: true,
  //             isUploadOver: true
  //           }),
  //           wx.showToast({
  //             title: '你这次的得分是' + _this.data.grade,
  //             image: '',
  //             duration: 1500
  //           });
  //           }
  //         })
  //       } else if (res.cancel) {
  //         _this.drawProgress(0, 0);
  //         _this.setData({
  //           hidden: true,
  //           uploading_hidden: true,
  //           isUploadOver: true,
  //           isRecordOver: false,
  //           timeRemain: _this.data.showText[_this.data.currentIndex].timeLimit
  //         })
  //       }
  //     }
  //   })
  // },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  }
})