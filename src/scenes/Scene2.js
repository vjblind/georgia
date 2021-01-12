import Heros from "../scenes/players";
import Evils from "./Evils";
import UI from "./ui";
var coplayer;
var player;
var hero;
var platforms;
var cursors;
var anim;
var sprite;
var tilesprite;
var count = 0;
var stars;
var doorlevel;
var map;
var score = 0;
var life = 100;
var armor = 100;
var amo = 100;
var scoreText;
var lifeText;
var armorText;
var amoText;
var minions;
var timerEvent;
var graphics;
var ui1; // head
var gocc;
var timedEvent;
export default {
  key: "boot2",

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  preload: function() {
    timerEvent = this.time.addEvent({ delay: 50, loop: true });

    this.load.image("tiles", "src/assets/tiles.png");
    this.load.tilemapTiledJSON("World", "src/assets/Level1.json");

    this.load.image("background2", require("../assets/background2.png"));
    this.load.image("star", require("../assets/star.png"));
    this.load.image("lader", require("../assets/lader.png"));
    // set the boundaries of our game world
    this.physics.world.bounds.width = 1000;
    this.physics.world.bounds.height = 1000;
    this.load.image("space", require("../assets/space.png"));
    this.load.image("ground", require("../assets/platform.png"));

    this.load.image("door", require("../assets/door.png"));
    /*  player1 = new Moby(this);
    player1.Player.x = 400;
    player1.Player.y = 100;*/

    this.load.spritesheet("A", require("../assets/a.png"), {
      frameWidth: 46,
      frameHeight: 49
    });
    this.load.spritesheet("M", require("../assets/minion.png"), {
      frameWidth: 46,
      frameHeight: 49
    });
    this.load.spritesheet("B", require("../assets/G.png"), {
      frameWidth: 46,
      frameHeight: 49
    });
    this.load.spritesheet("Uibulle", require("../assets/bulle.png"), {
      frameWidth: 49,
      frameHeight: 49
    });
  },

  init: function() {
    // this.cameras.main.setViewport(-220, -500, 1000, 1300);
    //
  },

  create: function() {
    console.log("kkkn");
    //   tilesprite = this.add.tileSprite(-100, 0, 32 * 50, 32 * 40, "space");

    this.map = this.add.tilemap("World");
    var tileset = this.map.addTilesetImage("tiles", "tiles");
    this.backgroundLayer = this.map.createStaticLayer("World", tileset);

    var tileset2 = this.map.addTilesetImage("tiles", "tiles");
    this.backgroundLayer2 = this.map.createDynamicLayer("above", tileset2);

    // tilesprite.setScrollFactor(0);
    //.add.image(0, 200, "background2");
    // this.add.image(200, 200, "A");r
    // ;

    /*  platforms = this.physics.add.staticGroup();
    platforms
      .create(400, 568, "ground")
      .setScale(2)
      .refreshBody();

    //  Now let's create some ledges
    platforms.create(-400, 400, "ground");
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    */ const spawnPoint = this.map.findObject(
      "object",
      obj => obj.name === "spawn"
    );
    // this.backgroundLayer.setCollisionBetween(6, 10);
    this.backgroundLayer.setCollision([
      1,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      97,
      70,
      40,
      41,
      42
    ]);
    hero = new Heros({
      scene: this,
      key: "A",
      x: spawnPoint.x,
      y: spawnPoint.y
    });

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y).setSize(8, 48);
    ui1 = new UI({
      scene: this,
      key: "Uibulle",
      x: player.x,
      y: player.y
    });

    timedEvent = this.time.addEvent({
      delay: 2000,
      callback: this.td1,
      callbackScope: this,
      repeat: 4,
      loop: true
    });

    //	When it completes it will call this function
    //go.onComplete.add(onComplete, this);

    //player.play("left", false);
    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.25);
    // player.setCollideWorldBounds(true);

    coplayer = this.physics.add.sprite(400, 200, "B").setSize(16, 48);
    coplayer.setBounce(0.25);

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    minions = this.physics.add.group({
      key: "M",
      repeat: 0,
      setXY: { x: -400, y: 200, stepX: 70 }
    });

    this.spikeGroup = this.physics.add.group();
    this.backgroundLayer2.forEachTile(tile => {
      if (tile.index === 91) {
        var spike = new Evils({
          scene: this,
          key: "M",
          x: tile.getCenterX(),
          y: tile.getCenterY()
        });

        //  spike.setVelocityY(Math.random(1, -0.5) * -30.0);
        this.physics.add.existing(spike);
        //   this.physics.add.collider(spike, platforms);
        this.spikeGroup.add(spike);
        //spike.body.allowGravity = false;
        this.backgroundLayer2.removeTileAt(tile.x, tile.y);
      }
      if (tile.index === 323) {
        doorlevel = this.physics.add.sprite(
          tile.getCenterX(),
          tile.getCenterY(),
          "door"
        );
        doorlevel.body.setAllowGravity(false);

        this.backgroundLayer2.removeTileAt(tile.x, tile.y);
      }
    });

    stars.children.iterate(function(child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.75));
    });
    minions.children.iterate(function(child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.75));
    });
    this.spikeGroup.children.iterate(function(child) {
      //  Give each star a slightly different bounce
      //child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.75));
    });
    // this.addLadder();

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.overlap(hero, stars, this.collectStar, null, this);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("A", { start: 0, end: 3 }),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("A", { start: 5, end: 9 }),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "A", frame: 4 }],
      frameRate: 20
    });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coplayer, platforms);
    this.physics.add.collider(player, this.backgroundLayer);
    this.physics.add.collider(stars, platforms);
    //  this.physics.add.collider(stars, player);
    this.physics.add.collider(stars, this.backgroundLayer);
    this.physics.add.collider(this.spikeGroup, platforms);
    this.physics.add.collider(this.spikeGroup, this.backgroundLayer);

    this.physics.add.collider(minions, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.overlap(player, doorlevel, this.nextlevel, null, this);

    //  The score
    scoreText = this.add.text(10, 10, "score", {
      align: "center",
      fontFamily: "sans-serif",
      fontSize: 20
    });

    lifeText = this.add.text(10, 35, "life " + life, {
      align: "center",
      fontFamily: "sans-serif",
      fontSize: 20
    });
    armorText = this.add.text(10, 50, "armor :" + armor, {
      fontFamily: "sans-serif",
      fontSize: 20
    });
    amoText = this.add.text(10, 70, "amo :" + amo, {
      fontFamily: "sans-serif",
      fontSize: 20
    });
    var rect = new Phaser.Geom.Rectangle(0, 10, score, 10);

    graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });

    graphics.fillRectShape(rect);

    //  this.physics.add.collider(stars, stars);
    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(player);
    amoText.setScrollFactor(0);
    armorText.setScrollFactor(0);
    lifeText.setScrollFactor(0);
    scoreText.setScrollFactor(0);
    graphics.setScrollFactor(0);
    // set bounds so the camera won't go outside the game world
    /*  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
       // make the camera follow the player
      
       
       // set background color, so the sky is not black    
       this.cameras.main.setBackgroundColor('#ccccff'); */
  },

  update: function() {
    /* this.scene.time.addEvent({
      delay: 500,
      callback: this.lockui(true),
      callbackScope: this
    });*/

    this.lockui(false);

    graphics.fillRect(10, 0, score, 10);
    this.spikeGroup.children.iterate(function(child) {
      //  Give each star a slightly different bounce
      child.body.setBounceY(Phaser.Math.FloatBetween(0.25, 0.75));

      //  child.body.setVelocity(100, 10);
      child.update();
      //  child.body.setVelocity(100, 10);
    });
    minions.children.iterate(function(child) {
      //  Give each star a slightly different bounce

      child.body.setVelocity(100, 10);
      if (timerEvent.getOverallProgress() % 40 > 20) {
        child.setVelocityX(-100);
      } else child.setVelocityX(10);
      child.setVelocityY(Math.random(1, -0.5) * -3);
    });
    player.setVelocityX(-160);

    // ui1.setposition(player.x, player.y);

    // console.log("eeee");
    //  tilesprite.tilePosition.y += 1;
    var blocked = player.body.blocked;
    // tilesprite.tilePositionY -= 3;
    if (cursors.left.isDown && !blocked.left) {
      player.setVelocityX(-160);
      player.play("left", true);
    } else if (cursors.right.isDown && !blocked.right) {
      player.setVelocityX(160);
      player.play("right", true);
    } else {
      player.setVelocityX(0);
      player.play("turn");
    }

    if (cursors.up.isDown && blocked.down && !blocked.up) {
      player.setVelocityY(-300);
      player.play("turn");
    }
  },
  extend: {
    collectStar: function(player, star) {
      star.disableBody(true, true);
      score += 10;
      scoreText.setText("Score: " + score);

      /* if (stars.countActive(true) === 0) {
        this.nextRound();
      }*/
    },
    td1: function() {
      //  var ladder = game.add.sprite(100, 200, "ladder");
      ui1.scaleY = ui1.scaleX += 0.5;
      score += 10;
      scoreText.setText("Score: " + score);
      var tween = this.tweens.add({
        targets: ui1,
        x: player.x + 50,
        scaleX: 2,
        scaleY: 2,
        duration: 3000,
        ease: "Bounce",
        completeDelay: 3000
      });
      this.a = 1;
      /* var tween = this.tweens.add({
        targets: [ui1],
        x: ui1.x,
        // y: "+=200",
        duration: ui1.x,
        
        delay:1000
      });*/

      // score += 610;
      /* if (stars.countActive(true) === 0) {
        this.nextRound();
      }*/
    },
    nextlevel: function() {
      // this.cameras.main.setViewport(-520, 0, 1000, 1300);
      this.scene.start("boot");
    },
    lockui: function(a) {
      // Fix this code

      // this.time.addEvent({delay: 500, callback: callback,callbackScope: this, loop: true});
      if (a) {
        let decisionX = Phaser.Math.RND.integerInRange(1, 4);
        if (decisionX === 1 || decisionX === 2) {
          //  ui1.x = player.x + 50;
          //   ui1.y = player.y - 50;
          ui1.scaleY = 1;
          ui1.scaleX = 1;
          ui1.y = player.y - 50;
        } else if (decisionX === 3) {
        } else if (decisionX === 4) {
        }
      }

      if (!a) {
        //
        ui1.visible = false;
      }
      return a === true;
    }
  }
};
