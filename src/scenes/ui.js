export default class UI extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    //config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    //  this.body.setEnable(false);
    // ths.setTexture("M");
    //  Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, "A");
    //this.setPosition(x, y);
  }

  update() {}
  preUpdate(time, delta) {
    this.setPosition(10, 10);
  }
}
