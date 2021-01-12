export default {
  key: "boot",

  preload: function() {},

  create: function() {
    this.add.text(100, 300, "poolpe 3 wizz", {
      align: "center",
      fontFamily: "sans-serif",
      fontSize: 48
    });
    var rect = new Phaser.Geom.Rectangle(200, 285, 400, 30);
    var gfx = this.add.graphics();
    this.load.on("progress", function(progress) {
      gfx
        .clear()
        .fillStyle(0x666666)
        .fillRectShape(rect)
        .fillStyle(0xffffff)
        .fillRect(rect.x, rect.y, progress * rect.width, rect.height);
    });
    //
    // this.cameras.main.setViewport(-520, 0, 1000, 1300);
    this.scene.start("menu");
    // this.scene.start('play');
    this.scene.remove("boot");
  },

  update: function() {
    // console.log("eeee");
  }
};
