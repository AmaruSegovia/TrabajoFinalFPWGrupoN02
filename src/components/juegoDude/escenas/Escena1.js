import Phaser from 'phaser'; 

class Escena1 extends Phaser.Scene {
  constructor() {
    super("Escena1");
    this.cantStars = 2;
  }

  preload() {
    this.load.audio('sonidoEstrella', ['/sound/Dude/confirmation_003.ogg']);
    this.load.audio('sonidoEstrellaFinal', ['/sound/Dude/confirmation_002.ogg']);
    this.load.audio('sonidoSalto', ['/sound/Dude/maximize_008.ogg']);
    this.load.audio('musicaTH', ['/sound/Dude/imstill8bits.mp3']);
    this.load.image("sky", "/img/Dude/sky.png");
    this.load.image("ground", "/img/Dude/platform.png");
    this.load.image("star", "/img/Dude/star.png");
    this.load.image("bomb", "/img/Dude/bomb.png");
    this.load.spritesheet("dude", "/img/Dude/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // Agregamos la musica
    this.musicaTH = this.sound.add('musicaTH');

    this.musicaTH.play();
    this.musicaTH.setVolume(0.1);

    // TODO: Todo lo que se va a agregar a la Escena
    this.add.image(400, 300, "sky");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.player = this.physics.add.sprite(100, 100, "dude");

    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Se agregan Estrellas
    this.stars = this.physics.add.group({
      key: "star",
      repeat: this.cantStars,
      setXY: { x: Phaser.Math.Between(0, 600), y: 0, stepX: 70 },
    });
    // Rebote en el grupo de estrellas
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    // habilita las coliciones de las estrellas con la plataforma
    this.physics.add.collider(this.stars, this.platforms);

    // Superpocicion/Choque entre jugador y estella
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    // Para controlar el mensaje
    this.scoreText = this.add.text(16, 16, "Tutorial", {
      fontFamily: "sans-serif",
      fontSize: "32px",
      fill: "#000",
    });

    //Agregar Bombas
    this.bombs = this.physics.add.group();
    this.bombs2 = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
      let sonidoSalto = this.sound.add('sonidoSalto');
      sonidoSalto.play();
    }
  }

  // revisando colisiones
  collectStar(player, star) {
    let sonidoEstrella = this.sound.add('sonidoEstrella');
    let sonidoEstrellaFinal = this.sound.add('sonidoEstrellaFinal');

    if (this.stars.countActive(true) > 1) {
      sonidoEstrella.play();
    } else {
      sonidoEstrellaFinal.play();
    }

    star.disableBody(true, true);
    this.cantStars--;

    if (this.stars.countActive(true) === 0) {
      this.scene.start('NextLevel');
      this.musicaTH.stop();
    }
  }

  // Agregamos el evento shutdown para detener la música al salir de la escena
  
}

export default Escena1;
