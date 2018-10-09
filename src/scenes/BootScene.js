import {Scene} from 'phaser';

/**
 * This scene's primary responsibility is to load assets for the rest of the game.
 */
class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        this.load.image('water', 'images/water.png');
        this.load.image('ground', 'images/sandy-bottom.png');
        this.load.image('dick', 'images/pumpkin.png');
        this.load.image('jacob', 'images/sylvia.png');
        this.load.image('play-again', 'images/play_again.png');
        this.load.image('awk-seal', 'images/sylvia-loves-pumpkins.jpg');
    }

    create() {
        this.scene.start('TitleScene');
    }
}

export default BootScene;
