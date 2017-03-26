let app = getApp();
let json = {
  "msg": "success",
  "result": {
    "insreult": [{
      "id": 21,
      "vincode": "LBEXDAEB65X262572",
      "carmodel": "北京现代",
      "carengine": null,
      "carproductdate": "2005-11-17 00:00:00.0",
      "isoperate": "非运营       ",
      "transfertimes": 8,
      "instype": "交强险       ",
      "instime": "20071023",
      "insarea": "通州区东关大桥东  ",
      "insdesc": "行驶中撞宝来（京GLJ822），本车右侧受损；三者车左前部及前部受损；无人伤；本车全责。",
      "insreason": "双方同责                ",
      "insbody": "右侧车门受损",
      "insprice": "<3000元",
      "createtime": "2017-01-16 15:23:09.0",
      "page": null
    }, {
      "id": 46,
      "vincode": "LBEXDAEB65X262572",
      "carmodel": "北京现代",
      "carengine": null,
      "carproductdate": "2005-11-16 00:00:00.0",
      "isoperate": "非运营       ",
      "transfertimes": 2,
      "instype": "商业险       ",
      "instime": "20081123",
      "insarea": "海淀区首体南路   ",
      "insdesc": "行驶中追尾，本车全责",
      "insreason": "本车全责                ",
      "insbody": "前保险杠，发动机",
      "insprice": ">30000元",
      "createtime": "2017-01-16 15:27:44.0",
      "page": null
    }, {
      "id": 71,
      "vincode": "LBEXDAEB65X262572",
      "carmodel": "北京现代",
      "carengine": null,
      "carproductdate": "2005-11-16 00:00:00.0",
      "isoperate": "非运营       ",
      "transfertimes": 2,
      "instype": "商业险       ",
      "instime": "20161123",
      "insarea": "朝阳区酒仙桥路   ",
      "insdesc": "行驶中追尾，本车全责",
      "insreason": "本车全责                ",
      "insbody": "前保险杠",
      "insprice": "<3000元",
      "createtime": "2017-01-16 15:29:49.0",
      "page": null
    }, {
      "id": 96,
      "vincode": "LBEXDAEB65X262572",
      "carmodel": "北京现代",
      "carengine": null,
      "carproductdate": "2005-11-16 00:00:00.0",
      "isoperate": "非运营       ",
      "transfertimes": 2,
      "instype": "商业险       ",
      "instime": "20120106",
      "insarea": "朝阳区大望路    ",
      "insdesc": "蹭马路牙子，人员无伤亡，前保险杠受损",
      "insreason": "本车全责                ",
      "insbody": "前保险杠",
      "insprice": "<3000元",
      "createtime": "2017-01-16 15:30:57.0",
      "page": null
    }]
  },
  "code": 1
};

Page({
  onLoad: function(e) {
    let insuranceInfo = json.result.insreult;
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
});
