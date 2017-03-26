Page({
  data: {},
  onLoad: function(e) {
    this.setData({
      queryNumber: e.queryNumber,
      queryType: e.queryType
    });
  },
  goPay: function() {
    let queryType = this.data.queryType;
    let queryNumber = this.data.queryNumber;
    let url = '';
    switch (queryType) {
      case '1':
        url = `/pages/vehicle/vehicle?queryNumber=${queryNumber}`;
        break;
      case '2':
        url = `/pages/accident/accident?queryNumber=${queryNumber}`;
        break;
      case '3':
        url = `/pages/insurance/insurance?queryNumber=${queryNumber}`;
    }
    wx.redirectTo({
      url: url
    });
  }
});
