Page({
  onLoad: function(e) {
    let imgs = e.imgs;
    imgs = imgs.split(',');
    this.setData({ imgs: imgs });
  }
});
