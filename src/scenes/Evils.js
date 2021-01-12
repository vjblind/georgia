export default class Evils extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setEnable();

    this.prop1 = "blah 1";
    this.status = 0;
    this.speed = -50;

    var iatime = 10;
  }
  ia1() {}
  update() {
    this.body.setAcceleration(0);
  }
  preUpdate(time, delta) {
    this.prop1 = "blah 2";
    super.preUpdate(time, delta);

    this.body.setVelocityY(-5);
    if (this.body.blocked.right) {
      this.speed *= -1;
      this.flipX = false;
    }
    if (this.body.blocked.left) {
      this.speed *= -1;
      this.flipX = true;
    }

    switch (this.status) {
      case 0:
        this.body.setVelocityX(this.speed);
        //console.log("Mangoes and papayas are $2.79 a pound.");
        break;

      case 1:
        //   console.log("Mvpapayas are $2.79 a pound.");
        this.body.setVelocityX(this.speed);
        break;

      case 2:
        //   console.log("Mvpapayas are $2.79 a pound.");
        this.body.setVelocityX(this.speed);
        break;
    }

    // this.rotation += 0.01;
  }

  onEvent() {}
}
