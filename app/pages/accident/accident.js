const app = getApp();

Page({
  onLoad: function(e) {
    let _this = this;

    if (app.globalData.result) {
      this.setInfo(app.globalData.result);

    } else {
      let queryNumber = e.query_number;
      let outTradeNo = e.out_trade_no;
      app.getOpenid(function(openid) {
        _this.getInfo(queryNumber, outTradeNo, openid);
      });
    }
  },
  getInfo(queryNumber, outTradeNo, openid) {
    let _this = this;
    wx.request({
      url: app.config.host + '/carvin/vin/getAccidVin',
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
  setInfo(res) {
    if (res.code == 1) {
      let result = res.result = JSON.parse(res.result);
      let carInfo = {};
      let queryResult = {};

      let accidentType = result.rtype;

      let vinInfo = result.vininfo;
      if (vinInfo != 0) {
        carInfo.vinCode = vinInfo.vincode;
        carInfo.carModel = vinInfo.clxh;
        carInfo.engineNumber = vinInfo.fdjh;
        carInfo.manufactureDate = vinInfo.clzzrq;

      } else if (result.carmodelinfo != 0) {
        let carModelInfo = result.carmodelinfo[0];
        carInfo.vinCode = carModelInfo.vincode;
        carInfo.carModel = carModelInfo.brandName + carModelInfo.seriesName;
        carInfo.engineNumber = carModelInfo.engineName;
        carInfo.manufactureDate = carModelInfo.productionDate.substring(0, 10);

      } else {
        carInfo.vinCode = queryNumber;
        carInfo.carModel = '未查到';
        carInfo.engineNumber = '未查到';
        carInfo.manufactureDate = '未查到';
      }

      this.setData({
        accidentType: accidentType,
        carInfo: carInfo,
        accidentResult: result.accreult
      });
    } else {
      wx.showModal({
        title: res.message || '错误',
        showCancel: false
      });
    }
  }
});
