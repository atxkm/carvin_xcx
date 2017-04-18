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
    let groupJson = {};

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

      //按时间组集
      if (groupJson[date]) {
        groupJson[date].push(item);
      } else {
        groupJson[date] = [item];
      }
    });

    //提取key值
    var keyArr = [];
    for (var key in groupJson) {
      keyArr.push(key);
      //将小集合按createtime排序
      var items = groupJson[key];
      items.sort(function(p, n) {
        return p.createtime < n.createtime;
      });
    }
    //将key值排序
    keyArr.sort(function(p, n) {
      return p < n;
    });
    //创建有序的list
    let historyList = [];
    for (var i = 0; i < keyArr.length; i++) {
      var key = keyArr[i];
      historyList.push(groupJson[key]);
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
