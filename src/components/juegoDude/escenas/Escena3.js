import Phaser from 'phaser';

class Escena3 extends Phaser.Scene {
  constructor() {
    super("Escena3");
    this.score = 0;
    this.scoreText = "";
    this.cantStarts = 4;
    this.tiempoRestante = 60;
    this.tiempoTexto = "";
    this.sonidoSalto = null; // Nueva propiedad para el sonido de salto
  }

  preload() {
    // Precarga de sonidos y musica
    this.load.audio('sonidoEstrella', ['/sound/Dude/confirmation_003.ogg']);
    this.load.audio('sonidoEstrellaFinal', ['/sound/Dude/confirmation_002.ogg']);
    this.load.audio('sonidoSalto', ['/sound/Dude/maximize_008.ogg']);
    this.load.audio('musicaTH', ['/sound/Dude/imstill8bits.mp3']);
    this.sonidoSalto = this.sound.add('sonidoSalto'); // Asignar el sonido de salto
    this.load.audio('musicaTH', ['/sound/Dude/imstill8bits.mp3']);
    this.load.audio('tesoro', ['/sound/Dude/tesoro.mp3']);
    // Precarga de imágenes
    this.load.image("sky3", "/img/Dude/sky3.png");
    this.load.image("ground", "/img/Dude/platform.png");
    this.load.image("star", "/img/Dude/star.png");
    this.load.image("bomb", "/img/Dude/bomb.png");
    this.load.image("ground2", "/img/Dude/platform-copia.png");
    this.load.spritesheet("dude", "/img/Dude/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("treasure", "/img/Dude/cofre.png"); // Nueva imagen del tesoro
  }

  create() {
    // Creacion de la musica
    this.musicaTH = this.sound.add('musicaTH');
    this.musicaTH.play();
    this.musicaTH.setVolume(0.1);
    this.sonidoTesoro = this.sound.add('tesoro');
    // Creacion de las plataformas
    this.add.image(400, 300, "sky3").setDisplaySize(800, 600);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.player = this.physics.add.sprite(50, 500, "dude");
    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);

    this.createAnimations();

    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: "star",
      repeat: this.cantStarts,
      setXY: { x: 300, y: 50, stepX: 90 },
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.scoreText = this.add.text(16, 16, "Puntuación: 0", {
      fontFamily: "sans-serif",
      fontSize: "32px",
      fill: "#000",
    });

    this.tiempoTexto = this.add.text(600, 16, "Tiempo: " + this.tiempoRestante, {
      fontFamily: "sans-serif",
      fontSize: "32px",
      fill: "#000",
    });

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  update() {
    this.updatePlayerControls();

    this.tiempoRestante -= this.game.loop.delta / 1000;
    this.tiempoTexto.setText("Tiempo: " + Math.ceil(this.tiempoRestante));

    if (this.tiempoRestante <= 0) {  // Si la cuenta rgresiva llega a 0 se pierde el juego.
      this.musicaTH.stop(); 
      this.scene.stop('Escena3'); // Detiene la escena 3 
      this.scene.start('GameOver'); //  Cambia a la escena GameOver
    }
  }

  createPlatform(x, y, key, scaleX = 1, scaleY = 1) {
    const platform = this.platforms.create(x, y, key).setScale(scaleX, scaleY).refreshBody();
    return platform;
  }

  createAnimations() {
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
  }

  updatePlayerControls() {
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
      this.sonidoSalto.play(); // Reproduce el sonido de salto
    }
  }

  collectStar(player, star) {
    let sonidoEstrella = this.sound.add('sonidoEstrella');
    let sonidoEstrellaFinal = this.sound.add('sonidoEstrellaFinal');

    if (this.stars.countActive(true) > 1) {
      sonidoEstrella.play();
    } else {
      sonidoEstrellaFinal.play();
    }

    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Puntuación: " + this.score);

    // Verifica si se ha alcanzado la puntuación de 100
    if (this.score < 100) {
      if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {
          const randomX = Phaser.Math.Between(0, 500);
          child.enableBody(true, randomX, 0, true, true);
        });

        this.createBomb();
        this.createBomb();
      }
    } else {
      // Si se ha alcanzado la puntuación de 100, no se generan más estrellas
      this.stars.clear(true, true);
    }

    // Genera el tesoro si se ha alcanzado la puntuación de 100
    if (this.score >= 100) {
      this.createTreasure();
    }
  }
  createBomb() {
    const x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const bomb = this.bombs.create(x, 16, "bomb");

    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  createTreasure() {
    const treasure = this.physics.add.sprite(400, 200, 'treasure').setCollideWorldBounds(true);
    treasure.setBounce(0.3);
    treasure.setScale(0.3); // Cambiado el valor de escala
    this.physics.add.collider(treasure, this.platforms);
    this.physics.add.overlap(this.player, treasure, this.collectTreasure, null, this);
  }

  collectTreasure(player, treasure) {
    this.musicaTH.stop();
    this.scene.stop('Escena3');
    this.sonidoTesoro.play();
    this.scene.start('YouWin');
  }

  hitBomb(player, bomb) {
    this.score = 0;
    this.sonidoSalto.pause(); // Pausa el sonido de salto
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    this.musicaTH.stop();
    this.scene.stop('Escena3');
    this.scene.start('GameOver');
  }
}

export default Escena3;
