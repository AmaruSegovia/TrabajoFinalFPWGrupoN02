import Phaser from 'phaser';

class Escena2 extends Phaser.Scene {
    constructor() {
      super("Escena2");
      this.score = 0; 
      this.scoreText = "";
      this.cantStarts=4;
    }
    preload() {
           //Precargando Sonidos
    this.load.audio('sonidoEstrella', ['/sound/Dude/confirmation_003.ogg']);
    this.load.audio('sonidoEstrellaFinal', ['/sound/Dude/confirmation_002.ogg']);
    this.load.audio('sonidoSalto', ['/sound/Dude/maximize_008.ogg']);
    this.load.audio('musicaTH', ['/sound/Dude/imstill8bits.mp3']);
      //Precargando Imagenes
      this.load.image("sky2", "/img/Dude/sky2.png");
      this.load.image("ground", "/img/Dude/platform.png"); 
      this.load.image("star", "/img/Dude/star.png");
      this.load.image("bomb", "/img/Dude/bomb.png");
      this.load.image("ground2", "/img/Dude/platform-copia.png")
      this.load.spritesheet("dude", "/img/Dude/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      }); 
    }
    create() {
      this.musicaTH = this.sound.add('musicaTH');
      this.musicaTH.play();
      this.musicaTH.setVolume(0.1);
      // TODO: Todo lo que se va a agregar a la Escena
      this.add.image(400, 300, "sky2");
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
      this.platforms.create(300, 100, "ground").setScale(0.5,1).refreshBody();
      this.platforms.create(250, 650, "ground2");
      this.platforms.create(-160, 230, "ground");
      this.platforms.create(500, 650, "ground2");
      this.platforms.create(400, 500, "ground2");
      this.platforms.create(750, 220, "ground");
      this.platforms.create(100, 580, "ground2");
  
      //this.add.image(400, 300, "star");
      this.player = this.physics.add.sprite(50, 500, "dude");
  
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
        repeat: this.cantStarts,
        setXY: { x: 300, y: 50, stepX: 90 },
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
        this.collectStar, null,
        this
      );
  
      // Para controlar el mensaje
      this.scoreText = this.add.text(16, 16, "Puntuación: 0", { 
        fontFamily: "sans-serif",
        fontSize: "32px",
        fill: "#000",
      });
  
      //Agregar Bombas
      this.bombs = this.physics.add.group();
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
    // ...

collectStar(player, star) {
  let sonidoEstrella = this.sound.add('sonidoEstrella');
  let sonidoEstrellaFinal = this.sound.add('sonidoEstrellaFinal');
  
  if (this.stars.countActive(true) > 1) {
      sonidoEstrella.play();
  } else {
      sonidoEstrellaFinal.play();
  }

  // Cuando se superpone jugador con estrella
  star.disableBody(true, true);
  
  // Mensaje, sumando puntos cada 10
  this.score += 10;
  this.scoreText.setText("Puntuación: " + this.score);

  // Verificar si el puntaje alcanza los 100
  if (this.score >= 100) {
      this.musicaTH.stop();
      this.scene.stop('Escena2');
      this.scene.start('Escena3');
      
  }

  // Para las bombas
  if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
          const randomX = Phaser.Math.Between(0, 500);
          child.enableBody(true, randomX, 0, true, true);
      });

      let x =
          player.x < 400
              ? Phaser.Math.Between(400, 800)
              : Phaser.Math.Between(0, 400);

      let bomb = this.bombs.create(x, 16, "bomb");

      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

      let bomb1 = this.bombs.create(x, 16, "bomb");

      bomb1.setBounce(1);
      bomb1.setCollideWorldBounds(true);
      bomb1.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

// ...

    hitBomb(player, bomb) {
      this.score = 0;
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play("turn");
      this.musicaTH.stop();
      this.scene.stop('Escena2');
      this.scene.start('GameOver');
      
    }
  }
  export default Escena2;
  