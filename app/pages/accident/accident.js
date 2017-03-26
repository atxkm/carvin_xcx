let app = getApp();

let json = {
  "msg": "success",
  "result": {
    "rtype": 2,
    "vininfo": 0,
    "carmodelinfo": 0,
    "accreult": {
      "id": 1,
      "carmodel": "现代朗动",
      "vincode": "LBEMDAFC0DZ288985",
      "accidcity": "河南信阳",
      "firstcreatdate": "2014-01-22",
      "isvindamaged": "否",
      "accidimg": "http://admin.shiguche88.com/upload/2014/8/11/9ed14196-c390-4297-b351-e7b9a711ecdd.jpghttp://admin.shiguche88.com/upload/2014/8/11/8aece549-08ee-44f7-9858-651d4d5aeb1e.jpghttp://admin.shiguche88.com/upload/2014/8/11/42595808-50ba-49d9-bca6-65778fc1d205.jpghttp://admin.shiguche88.com/upload/2014/8/11/1fd44bae-936d-4eb1-a0a6-54951a95f024.jpghttp://admin.shiguche88.com/upload/2014/8/11/89adcf03-d88c-48b7-944c-e60c11bc8f3c.jpghttp://admin.shiguche88.com/upload/2014/8/11/f11c9e5f-507d-47a3-9a1e-c36729136b59.jpghttp://admin.shiguche88.com/upload/2014/8/11/fbbc7458-ccf4-4a29-af6d-dc6b17496d67.jpghttp://admin.shiguche88.com/upload/2014/8/11/259fe524-4d61-4295-ac53-e7a8fe9d83b4.jpghttp://admin.shiguche88.com/upload/2014/8/11/98bfb95d-2060-47df-8d7f-b416c28084f9.jpghttp://admin.shiguche88.com/upload/",
      "remark": "&nbsp; &nbsp;拍卖前，我司会全部告知拍卖车辆停放地，参拍会员必须在拍卖前实地看车，其检测报告，仅供会员参考，不作为法律依据，一旦参与出价，就表示会员对我司展示拍卖车辆无任何争议，已同意并认同车辆的损失现状，拍卖结束后，拒绝一切形式的议价。",
      "carcode": "",
      "acciddate": "",
      "stopadress": "",
      "enginestatus": "",
      "gearboxstatus": "",
      "isdisassembly": "",
      "carresouse": "",
      "cartype": "事故车",
      "detailpage": "http://www.shiguche88.com/cardetail2901acd.html",
      "page": null
    }
  },
  "code": 1
};


Page({
  data: {},
  onLoad: function(e) {
    // wx.setNavigationBarTitle({
    //   title: '事故查询结果'
    // });
    console.log(e);
    let queryNumber = e.queryNumber;

    let result = json.result;
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
  }
});
