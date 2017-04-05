const app = getApp();

Page({
  onLoad: function(e) {
    let _this = this;
    // 调用应用实例的方法获取全局数据
    app.getOpenid(function(openid) {
      _this.setData({ openid: openid });
    });

    this.setData({
      queryNumber: e.query_number,
      queryType: e.query_type
    });
  },
  payment: function() {
    let _this = this;
    let openid = this.data.openid;
    let queryType = this.data.queryType;
    let queryNumber = this.data.queryNumber;
    let url = '';

    switch (queryType) {
      case 'vin': //车型查询
        url = '/carvin/vin/getVin';
        break;
      case 'accidVin': //事故查询
        url = '/carvin/vin/getAccidVin';
        break;
      case 'insVin': //保险查询
        url = '/carvin/vin/getInsVin';
    }

    wx.request({
      url: app.config.host + url,
      data: {
        vincode: queryNumber,
        openid: openid
      },
      success: function(res) {
        res = res.data;
        if (res.code == -2) {
          _this.payOrder(res.result);

        } else {
          wx.showModal({
            title: res.message || '下单错误，请重试',
            showCancel: false
          });
        }
      }
    });
  },
  payOrder: function(result) {
    let outTradeNo = result.outTradeNo;
    let data = this.data;

    wx.request({
      url: app.config.host + '/carvin/wechat/place/order',
      data: {
        appid: 'wx4b690fad387c3050',
        openid: data.openid,
        out_trade_no: outTradeNo,
        body: `查询类型：${data.queryType}，车架号：${data.queryNumber}`,
        total_fee: 2
      },
      success: function(res) {
        res = res.data;
        if (res.code == 1) {
          var result = res.result;
          wx.requestPayment({
            timeStamp: result.timeStamp.toString(),
            nonceStr: result.nonceStr,
            package: result.package,
            signType: result.signType,
            paySign: result.paySign,
            success: function(res) {
              wx.redirectTo({ url: `/pages/pay_success/pay_success?query_number=${data.queryNumber}&out_trade_no=${outTradeNo}&query_type=${data.queryType}` });
            }
          });
        }
      }
    });
  }
});
