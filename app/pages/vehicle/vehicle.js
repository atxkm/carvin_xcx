const app = getApp();

Page({
  onLoad: function(e) {
    let _this = this;
    let queryNumber = e.query_number;
    let outTradeNo = e.out_trade_no;

    app.getOpenid(function(openid) {
      _this.getInfo(queryNumber, outTradeNo, openid);
    });
  },
  getInfo: function(queryNumber, outTradeNo, openid) {
    let _this = this;
    wx.request({
      url: app.config.host + '/carvin/vin/getVin',
      data: {
        openid: openid,
        vincode: queryNumber,
        out_trade_no: outTradeNo
      },
      success: function(res) {
        res = res.data;
        _this.setInfo(res);
      }
    });
  },
  setInfo: function(res) {
    if (res.code == 1) {
      res.result = JSON.parse(res.result);
      this.setData({
        vinInfo: res.result.vininfo,
        carModelInfo: res.result.carmodelinfo,
      });

    } else {
      wx.showModal({
        title: res.message || '错误',
        showCancel: false
      });
    }
  }
});
