export default {
  key: "menu",
  preload: function() {
    this.load.image("b1", require("../assets/block1.png"));
  },
  create: function() {
    var sprite = this.add.sprite(100, 100, "b1");
    sprite.setScale(0.2);
    const helloButton = this.add.text(50, 130, "Hello Phaser!", {
      fill: "#0f0"
    });
    sprite.setInteractive();
    sprite.on("pointerdown", () => {
      this.scene.start("boot2");
      // this.scene.start('play');
      this.scene.remove("menu");
      console.log("pointerdown");
    });

    var sprite2 = this.add.sprite(100 + 300, 100, "b1");
    sprite2.setScale(0.2);
    const helloButton2 = this.add.text(50 + 300, 130, "Hello Phaser!", {
      fill: "#0f0"
    });
    sprite2.setInteractive();
    sprite2.on("pointerdown", () => {
      this.scene.start("boot2");
      // this.scene.start('play');
      this.scene.remove("menu");
      console.log("pointerdown");
    });

    this.cameras.main.flash(500, 255, 0, 0);
  }
};
