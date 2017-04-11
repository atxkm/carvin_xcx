const app = getApp();

Page({
  onLoad: function(e) {
    let _this = this;
    let queryNumber = e.query_number;
    this.setData({ queryNumber: queryNumber });
    let outTradeNo = e.out_trade_no;
    app.getOpenid(function(openid) {
      _this.getInfo(queryNumber, outTradeNo, openid);
    });
  },
  getInfo: function(queryNumber, outTradeNo, openid) {
    let _this = this;
    wx.request({
      url: app.config.host + '/carvin/vin/getInsVin',
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
      let insuranceInfo = res.result.insreult;

      if (insuranceInfo) {
        let carInfo = insuranceInfo[0];
        carInfo.insuranceCount = insuranceInfo.length;
        let moneyCount = 0;
        insuranceInfo.forEach(item => {
          let insurancePrice = item.insprice.substr(1).replace('元', '');
          moneyCount += parseInt(insurancePrice);
        });
        carInfo.moneyCount = moneyCount;

        this.setData({
          carInfo: carInfo,
          insuranceInfo: insuranceInfo
        });
      }

    } else {
      wx.showModal({
        title: res.message || '错误',
        showCancel: false
      });
    }
  }
});
