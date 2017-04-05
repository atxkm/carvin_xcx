const app = getApp();

Page({
  onShow: function() {
    let _this = this;
    app.getOpenid(function(openid) {
      _this.getInfo(openid);
    });
  },
  getInfo(openid) {
    let _this = this;
    console.log(openid);
    wx.request({
      url: app.config.host + '/carvin/myquery/list',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { openid: openid },
      success: function(res) {
        console.log(res);
        res = res.data;
        _this.setInfo(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },
  navigatTo: function(e) {
    let dataset = e.currentTarget.dataset;

    let type = dataset.type;
    let url = '';
    switch (type) {
      case 'vin':
        url = '/pages/vehicle/vehicle';
        break;
      case 'accidVin':
        url = '/pages/accident/accident';
        break;
      case 'insVin':
        url = '/pages/insurance/insurance';
    }

    let outTradeNo = dataset.outTradeNo;
    var result;
    var bigResult = this.data.bigResult;
    for (var i = 0; i < bigResult.length; i++) {
      var item = bigResult[i];
      if (item.outTradeNo == outTradeNo) {
        result = item.result;
        break;
      }
    }
    result.result = JSON.stringify(result.result);
    app.globalData.result = result;

    wx.navigateTo({ url: url });
  },
  setInfo(res) {
    let list = this.data.bigResult = res.result;
    let gruopJson = {};

    list.forEach(item => {
      item.result = JSON.parse(item.result);
      let date = new Date(item.createtime);
      date = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`;
      item.createdate = date;
      let result = item.result.result;

      // if (item.type == 'vin') {
      // item.url = `/pages/vehicle/vehicle?result=${JSON.stringify(result)}`;
      // } else if (item.type == 'accidVin') {
      if (item.type == 'accidVin') {
        let carInfo = {};
        let vinInfo = result.vininfo;
        if (vinInfo != 0) {
          carInfo.vinCode = vinInfo.vincode;
          carInfo.carModel = vinInfo.clxh;

        } else if (result.carmodelinfo != 0) {
          let carModelInfo = result.carmodelinfo[0];
          carInfo.vinCode = carModelInfo.vincode;
          carInfo.carModel = carModelInfo.brandName + carModelInfo.seriesName;

        } else {
          carInfo.vinCode = queryNumber;
          carInfo.carModel = '未查到';
        }

        item.result.carInfo = carInfo;

      } else if (item.type == 'insVin') {
        item.result.carInfo = item.result.insreult[0];
      }

      if (gruopJson[date]) {
        gruopJson[date].push(item);
      } else {
        gruopJson[date] = [item];
      }
    });

    let historyList = [];
    for (let key in gruopJson) {
      let item = gruopJson[key];
      historyList.push(item);
    }

    this.setData({ historyList: historyList });
  }
});
