export default class Heros extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setEnable();
    // ths.setTexture("M");
    //  Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, "A");
    //this.setPosition(x, y);
  }

  update() {
    this.body.setAcceleration(0);
    this.setBounce(0.25);
  }
  preUpdate(time, delta) {
    this.body.setAcceleration(0);
    this.setBounce(0.25);
  }
}
