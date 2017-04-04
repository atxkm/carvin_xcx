let app = getApp();
let config = app.config;

Page({
  data: {},
  onLoad: function(e) {
    // let queryNumber = e.queryNumber;
    // console.log('queryNumber', queryNumber);

    // wx.request({
    //   url: host + '/carvin/vin/getVin',
    //   data: { vincode: queryNumber },
    //   header: { 'content-type': 'application/json' },
    //   success: function(res) {
    //     console.log(res);
    //   }
    // });

    this.setData({
      vinInfo: json.result.vininfo,
      carModelInfo: json.result.carmodelinfo,
    });
  }
});

let json = {
  "msg": "success",
  "result": {
    "vininfo": {
      "id": 2,
      "clsbdh": "LFV2A11GX53133581",
      "clxh": "FV7160CiF E3",
      "wzhgzbh": "WAB060501133581",
      "fzrq": "2005-12-06 00:00:00.0",
      "csys": "亮银",
      "fdjh": "BJG 126402",
      "pfbz": "GB18352.2-2001",
      "pl": "1595",
      "gl": "68",
      "clzzrq": "2005-12-06 00:00:00.0",
      "bz": null,
      "createtime": "2005-12-08 08:25:42.0",
      "vehiclestatus": "3",
      "emissionsid": 0,
      "vintablename": null,
      "page": null
    },
    "carmodelinfo": [{
      "id": 219,
      "brandId": 84,
      "seriesId": 449,
      "simpleId": 3357,
      "brandName": "大众",
      "seriesName": "捷达",
      "simpleName": "2004款 CIF 1.6L 手动 都市春天基本型(国Ⅲ)",
      "versionYear": 2004,
      "productionDate": "2004-03-01 00:00:00.0",
      "displacement": 1.6,
      "maxPowerKw": 68,
      "emissionsId": 2,
      "bright": "4扬声器    ",
      "newPrice": 11.98,
      "gbm": "FV7160CIF E3",
      "userId": 0,
      "updateTime": 0,
      "isShow": 1,
      "isSure": 2,
      "isCode": 0,
      "sourceFrom": 1,
      "str": "",
      "carType": 2,
      "mfrsId": 1,
      "mfrsName": "一汽大众",
      "engineName": "BJG",
      "seats": 5,
      "page": null
    }, {
      "id": 221,
      "brandId": 84,
      "seriesId": 449,
      "simpleId": 3366,
      "brandName": "大众",
      "seriesName": "捷达",
      "simpleName": "2004款 CIF 1.6L 手动 豪华型(国Ⅲ)",
      "versionYear": 2004,
      "productionDate": "2004-03-01 00:00:00.0",
      "displacement": 1.6,
      "maxPowerKw": 68,
      "emissionsId": 2,
      "bright": "",
      "newPrice": 10.78,
      "gbm": "FV7160CIF E3",
      "userId": 0,
      "updateTime": 0,
      "isShow": 1,
      "isSure": 2,
      "isCode": 0,
      "sourceFrom": 1,
      "str": "",
      "carType": 2,
      "mfrsId": 1,
      "mfrsName": "一汽大众",
      "engineName": "BJG",
      "seats": 5,
      "page": null
    }, {
      "id": 24291,
      "brandId": 84,
      "seriesId": 449,
      "simpleId": 1133,
      "brandName": "大众",
      "seriesName": "捷达",
      "simpleName": "2004款 CIF 1.6L 手动 都市春天舒适型(国Ⅲ)",
      "versionYear": 2004,
      "productionDate": "2004-03-01 00:00:00.0",
      "displacement": 1.6,
      "maxPowerKw": 68,
      "emissionsId": 2,
      "bright": "铝合金轮毂 手动空调   ",
      "newPrice": 8.98,
      "gbm": "FV7160CIF E3",
      "userId": 0,
      "updateTime": 0,
      "isShow": 1,
      "isSure": 2,
      "isCode": 0,
      "sourceFrom": 1,
      "str": "",
      "carType": 2,
      "mfrsId": 1,
      "mfrsName": "一汽大众",
      "engineName": "BJG",
      "seats": 5,
      "page": null
    }]
  },
  "code": 1
};
