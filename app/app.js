App({
  config: {
    host: 'https://m.qicheku.com'
  },
  getOpenid: function(cb) {
    var _this = this

    if (this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.openid)

    } else {
      //调用登录接口
      wx.login({
        success: function(res) {
          let code = res.code;
          wx.showLoading({
            title: '加载中',
            mask: true
          });
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wx4b690fad387c3050',
              secret: '61ee8b58909fca72c6921ee580950208',
              js_code: code,
              grant_type: 'authorization_code'
            },
            success: function(res) {
              let openid = _this.globalData.openid = res.data.openid;
              wx.hideLoading();
              typeof cb == "function" && cb(openid);
            }
          });
          // typeof cb == "function" && cb('obI7s0GXAw54tZE8xesBk0Z7Gdws');
        }
      });
    }
  },
  globalData: {
    openid: null,
  },
});
