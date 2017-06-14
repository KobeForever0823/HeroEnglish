//app.js
var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};


App({

  onShow: function() {
    qcloud.setLoginUrl(config.service.loginUrl);
    this.doLogin();
  },

  doLogin: function() {
    showBusy('正在登录');
    qcloud.login({
      success(result) {
        showSuccess('登录成功');
        console.log('登录成功', result);
        qcloud.request({
          url: 'https://47281688.qcloud.la/index.php/V1/home/getuid',
          success(response) {
            console.log(response)
            wx.setStorageSync('userid', response.data)
          }
        })
      },
      fail(error) {
        showModel('登录失败', error);
      }
    })
  },

  onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  //   this.getUserInfo()
  // },
  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res.userInfo);
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData:{
  //   userInfo:null
  }
})