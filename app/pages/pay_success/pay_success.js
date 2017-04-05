let app = getApp();
let config = app.config;

Page({
  onLoad: function(e) {
    wx.showLoading({ title: '请稍候...' });
    setTimeout(function() {
      let queryType = e.query_type;
      let queryNumber = e.query_number;
      let outTradeNo = e.out_trade_no;
      let url = '';
      switch (queryType) {
        case 'vin':
          url = '/pages/vehicle/vehicle';
          break;
        case 'accidVin':
          url = '/pages/accident/accident';
          break;
        case 'insVin':
          url = '/pages/insurance/insurance';
      }
      url += `?query_number=${queryNumber}&out_trade_no=${outTradeNo}`;
      app.globalData.result = null; //清除列表查看数据的缓存
      wx.redirectTo({ url: url });
    }, 2000);
  }
});
