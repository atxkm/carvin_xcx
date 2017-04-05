Page({
  data: {
    queryType: 'vin',
    inputLength: 17,
    queryNumber: 'LFV2A11G753133568',
  },
  selectQueryType: function(e) {
    let queryType = e.currentTarget.dataset.queryType;
    this.setData({ queryType: queryType });
  },
  inputNumber: function(e) {
    let queryNumber = this.data.queryNumber = e.detail.value;
    let length = queryNumber.length;
    this.setData({ inputLength: length });
  },
  startQuery: function(e) {
    let queryType = this.data.queryType;
    let queryNumber = this.data.queryNumber;

    if (queryNumber.length != 17) {
      wx.showModal({
        title: 'vin码长度为17位',
        showCancel: false
      });
      return;
    }

    wx.navigateTo({ url: `/pages/ensure_pay/ensure_pay?query_type=${queryType}&query_number=${queryNumber}` });
  },
});
