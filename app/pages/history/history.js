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
    wx.request({
      url: app.config.host + '/carvin/myquery/list',
      data: { openid: openid },
      success: function(res) {
        res = res.data;
        _this.setInfo(res);
      }
    });
  },
  setInfo(res) {
    let list = this.data.bigResult = res.result;
    let gruopJson = {};

    list.forEach(item => {
      item.result = JSON.parse(item.result);
      let date = new Date(item.createtime);
      date = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
      item.createdate = date;
      let result = item.result.result;

      item.carModel = '未查到';
      if (item.type == 'vin' && result.vininfo) {
        item.carModel = result.vininfo.clxh;

      } else if (item.type == 'accidVin') {

        if (result.vininfo != 0) {
          item.carModel = result.vininfo.clxh;

        } else if (result.carmodelinfo != 0) {
          let carModelInfo = result.carmodelinfo[0];
          item.carModel = carModelInfo.brandName + carModelInfo.seriesName;
        }

      } else if (item.type == 'insVin' && result.insreult) {
        item.carModel = result.insreult[0].carmodel;
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
  },
  navigatTo: function(e) {
    let dataset = e.currentTarget.dataset;
    let outTradeNo = dataset.outTradeNo;
    let queryNumber = dataset.vinCode;
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
    url += `?out_trade_no=${outTradeNo}&query_number=${queryNumber}`;

    wx.navigateTo({ url: url });
  }
});
