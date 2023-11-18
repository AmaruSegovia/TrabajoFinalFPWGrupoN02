import Phaser from "phaser";

// Clase para las musicas y efectos
export default class SoundScene{
    constructor(scene){
        this.relatedScene = scene;
    }
    preload(){
        // Cargamos los audios
        this.relatedScene.load.audio('nivel1', '/sound/SpaceWar/musicScene/Pluto  Space.mp3');
        this.relatedScene.load.audio('tutorial', '/sound/SpaceWar/musicScene/Tutorial.mp3');
        this.relatedScene.load.audio('Menu', '/sound/SpaceWar/musicScene/Menu.mp3');

        // Cargamos los efectos
        this.relatedScene.load.audio('laser1', '/sound/SpaceWar/efects/laser1.mp3');
        this.relatedScene.load.audio('laser3', '/sound/SpaceWar/efects/laser3.mp3');
        this.relatedScene.load.audio('laser4', '/sound/SpaceWar/efects/laser6.mp3');
        this.relatedScene.load.audio('laser5', '/sound/SpaceWar/efects/laser7.mp3');
        this.relatedScene.load.audio('mydeath', '/sound/SpaceWar/efects/death.mp3');
        this.relatedScene.load.audio('enemyDeath', '/sound/SpaceWar/efects/deathEnemy.mp3');
        this.relatedScene.load.audio('shootEnemy', '/sound/SpaceWar/efects/shootEnemy.mp3');
        this.relatedScene.load.audio('money', '/sound/SpaceWar/efects/coin.ogg');
    }
    create (escena) {
        // Agregando objetos de sonido
        this.soundScene = this.relatedScene.sound.add(escena, { loop: true });
        this.soundScene.setVolume(1);
        this.soundScene.play();

        this.laser1 = this.relatedScene.sound.add('laser1');
        this.laserSuper = this.relatedScene.sound.add('laser3');
        this.laserMultiple = this.relatedScene.sound.add('laser4');
        this.laserCombo = this.relatedScene.sound.add('laser5');
        this.mydeath = this.relatedScene.sound.add('mydeath');
        this.enemyDeath = this.relatedScene.sound.add('enemyDeath');
        this.shootEnemy = this.relatedScene.sound.add('shootEnemy');
        this.money = this.relatedScene.sound.add('money');

        this.laser1.setVolume(0.1);
        this.laserSuper.setVolume(0.1);
        this.laserMultiple.setVolume(0.1);
        this.laserCombo.setVolume(0.3);
        this.mydeath.setVolume(0.1);
        this.enemyDeath.setVolume(0.1);
        this.shootEnemy.setVolume(0.1);
        this.money.setVolume(0.1);
    }
    detener_escena(){
        this.soundScene.stop();
    }

    muerte_nave(){
        this.mydeath.play();
    }

    muerte_enemigo(){
        this.enemyDeath.play();
    }

    disparo(){
        this.laser1.play();
    }
    disparoSuper(){
        this.laserSuper.play();
    }
    disparoMultiple(){
        this.laserMultiple.play();
    }
    disparoCombo(){
        this.laserCombo.play();
    }

    enemigo_disparo(){
        this.shootEnemy.play();
    }

    money_collected(){
        this.money.play();
    }

    
}