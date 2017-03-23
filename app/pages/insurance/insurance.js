//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    select_car: false,
    select_acc: true,
    select_ensure: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
      //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  clickCar: function() {
    this.setData({
      select_car: false,
      select_acc: true,
      select_ensure: true
    })
  },

  clickAcc: function() {
    this.setData({
      select_car: true,
      select_acc: false,
      select_ensure: true
    })
  },

  clickEnsure: function() {
    this.setData({
      select_car: true,
      select_acc: true,
      select_ensure: false
    })
  }

});
