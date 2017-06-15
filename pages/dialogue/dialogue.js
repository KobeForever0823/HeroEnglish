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
    score: [],
    dialog_record_url: [],
    autoplay: true,
    interval: 5000,
    duration: 5000,
    currentIndex: 0,
    wordCount: 5,
    isFirstWord: false,
    isLastWord: false,
    recordPath: '',
    scoreChanged: false
  },

  getDialog: function() {
    var _this = this;
    var record_url = [];
    wx.request({
      url: domain + 'dialog/getDialog/' + _this.data.character_id,
      success(res) {
        var tmp = res.data.data;
        _this.setData({
          words_list: tmp
        })
        var wordsLength = _this.data.words_list.length;
        _this.setData({
          wordCount: wordsLength
        })
        
        res.data.data.map((index) => record_url.push(index.dialog_record_url))
        _this.setData({
          dialog_record_url: record_url
        })
      }
    })
  },

  getScore: function() {
    var _this = this;
    wx.request({
      url: domain + 'score/getScore/' + _this.data.dialog_id,
      success(res) {
        _this.setData({
          score: res.data.data.quality_score,
          scoreChanged: true
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
      var urls = domain + "score/score/" + _this.data.character_id + '/' +
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
          _this.getScore();
        },
        fail: function(res) {
          console.log('fail');
          console.log(res);
        }
      }); 
    }, 1000);
    _this.setData({
      scoreChanged: false
    })
    _this.ifNavigate();
  },

  playWordVoice: function() {
    var _this = this;
    console.log(_this.data.dialog_record_url[_this.data.currentIndex]);
    wx.playVoice({
      filePath: _this.data.dialog_record_url[_this.data.currentIndex],
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

  // showModel: function(score) {
  //   var animation = wx.createAnimation({
  //     duration: 200,
  //     timingFunction: "linear",
  //     delay: 0
  //   });
    
  //   this.animation = animation;
  //   animation.opacity(0).rorateX(-100).step();

  //   this.setData({
  //     animationData: animation.export()
  //   })

  //   setTimeout(function() {
  //     animation.opacity(1).rotateX(0).step();
  //     this.setData({
  //       animationData: animation
  //     })
  //   }.bind(this), 200)
  // },


  ifNavigate: function() {
    var _this = this;
    if (_this.data.currentIndex == _this.data.wordCount) {
      if (_this.data.map_id == 0) {
        wx.redirectTo({
          url: '/pages/grade/grade?map_id=' + _this.data.map_id + '&character_id=' + _this.data.character_id
            + '&score=' + _this.data.score,
          complete: function(res) {
          }
        })
      } else {
        wx.redirectTo({
          url: '/pages/result/result?map_id=' + _this.data.map_id + '&character_id=' + _this.data.character_id,
          complete: function(res) {
          }
        })
      }
    }
  },



  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  }
})