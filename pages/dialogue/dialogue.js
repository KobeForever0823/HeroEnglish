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
    score: 0,
    dialog_record_url: [],
    autoplay: false,
    interval: 30000,
    duration: 10000,
    currentIndex: 0,
    wordCount: 5,
    isFirstWord: true,
    isLastWord: false,
    recordPath: '',
    scoreChanged: false,
    gettingScore: false,
    isRecording: false,
    apis: [],
    dialog_texts: [],
    user_id: ''
  },

  getDialog: function() {
    var _this = this;
    var record_url = [];
    var api_s = [];
    var dialogTexts = [];
    wx.request({
      url: domain + 'dialog/getDialog/' + _this.data.character_id,
      success(res) {
        var tmp = res.data.data;
        _this.setData({
          words_list: tmp
        })
        console.log("words", _this.data.words_list);
        var wordsLength = _this.data.words_list.length;
        _this.setData({
          wordCount: wordsLength - 1
        })
        
        res.data.data.map((index) => record_url.push(index.dialog_record_url))
        _this.setData({
          dialog_record_url: record_url
        })


        res.data.data.map((index) => api_s.push(index.api))
        var tmp = api_s
        _this.setData({
          apis: tmp
        })

        res.data.data.map((index) => dialogTexts.push(index.dialog_text))
        var tmp = dialogTexts
        _this.setData({
          dialog_texts: tmp
        })
      }
    })
  },

  getScore: function() {
    var _this = this;
    _this.setData({
      gettingScore: true
    })
    wx.request({
      url: domain + 'score/getScore/' + _this.data.dialog_id,
      success(res) {
        console.log(res.data.data);
        _this.setData({
          score: res.data.data[_this.data.currentIndex + 12].score.quality_score,
          autoplay: false
        })
        console.log(_this.data.score);
      }
    })
  },

  getTestScore: function() {

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
    console.log(this.data.gettingScore);
    console.log(this.data.isFirstWord);
    this.setData({
        user_id: wx.getStorageSync('user_id')
    })
    console.log("user_id", this.data.user_id);
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
    _this.setData({
      autoplay: false,
      isRecording: true
    })
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
    _this.setData({
        gettingScore: true,
        isRecording: false
    })
    setTimeout(function() {
      var urls = domain + "score/score/";
      
      console.log(_this.data.user_id);
      console.log(_this.data.character_id);
      console.log(_this.data.dialog_id,);
      console.log(_this.data.apis[_this.data.currentIndex]);
      console.log(_this.data.dialog_texts[_this.data.currentIndex]);
      wx.uploadFile({
        url: urls,
        filePath: _this.data.recordPath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: {
          user_id: _this.data.user_id,
          character_id: _this.data.character_id,
          dialog_id: _this.data.dialog_id,
          api: _this.data.apis[_this.data.currentIndex],
          dialog_text: _this.data.dialog_texts[_this.data.currentIndex]
        },
        success: function(res) {
          console.log('success');
          console.log(res);
          _this.getScore();
          _this.setData({
            scoreChanged: true,
            gettingScore: false
          });
          setTimeout(function(){
            _this.ifNavigate()
          }, 2000);
        },
        fail: function(res) {
          console.log('fail');
          console.log(res);
        }
      }); 
    }, 1000);
  },

  playWordVoice: function() {
    var _this = this;
    _this.setData({
      autoplay: false
    })
    wx.playVoice({
      filePath: _this.data.dialog_record_url[_this.data.currentIndex],
      complete: function() {
      }
    })
  },

  backButtonClick: function() {
    var _this = this;
    _this.setData({
      isLastWord: false
    })
    if (_this.data.currentIndex > 0) {
      _this.setData({
        scoreChanged: false,
        currentIndex: _this.data.currentIndex - 1,
      })
      _this.setData({
        dialog_id: _this.data.currentIndex
      })
    }
    if (_this.data.currentIndex == 0) {
        _this.setData({
          scoreChanged: false,
          isFirstWord: true
        })
      }
  },
  
  forwardButtonClick: function() {
    var _this = this;
    _this.setData({
      isFirstWord: false
    })
    if (_this.data.currentIndex < _this.data.wordCount) {
      _this.setData({
        scoreChanged: false,
        currentIndex: _this.data.currentIndex + 1,
      })
      _this.setData({
        dialog_id: _this.data.currentIndex
      })
    }
    if (_this.data.currentIndex == _this.data.wordCount) {
      _this.setData({
        scoreChanged: false,
        isLastWord: true
      })
    }
  },

  ifNavigate: function() {
    var _this = this;
    console.log(_this.data.currentIndex);
    console.log(_this.data.wordCount);
    _this.setData({
      scoreChanged: false,
    });
    if (_this.data.autoplay == true && _this.data.currentIndex == _this.data.wordCount) {
      _this.setData({
        isLastWord: true
      })
    }
    if (_this.data.currentIndex == _this.data.wordCount) {
      if (_this.data.map_id == 1) {
        setTimeout(function() {
            wx.redirectTo({
              url: '/pages/grade/grade?map_id=' + _this.data.map_id + '&character_id=' + _this.data.character_id
                + '&score=' + _this.data.score,
              complete: function(res) {
            }
          })
        }, 1000);   
      } else if (_this.data.map_id == 2){
        setTimeout(function() {
          wx.redirectTo({
            url: '/pages/result/result?map_id=' + _this.data.map_id + '&character_id=' + _this.data.character_id,
            complete: function(res) {
            }
          })
        }, 1000);
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  }
})