import {Scene, Display} from 'phaser';

/**
 * Scene shown to the user after the game has ended. Allowing
 * them the option to play again.
 */
export default class GameOverScene extends Scene {
    constructor() {
        super({key: 'GameOverScene'});
    }

    init(data) {
        this.score = data.score;
    }
    create() {
        let canvas = document.getElementsByTagName('canvas')[0];
        let width = canvas.width;
        let height = canvas.height;

        this.scene.bringToTop();
        this.add.image(width / 2, height / 2, 'water').setScale(10, 2);
        this.add.image(width / 2, height / 2, 'awk-seal').setScale(0.15, 0.15);
        this.scoreText = this.add.text(0, 0, this.score, {
            fontSize: width / 5 + 'px',
            fill: '#fff',
        });

        this.pressStart = this.add.text(0, 0, 'TAP TO PLAY AGAIN', {
            fontSize: 50,
            font: 'Helvetica',
            fontWeight: 'bold',
            fill: '#fff',
        });
        Display.Align.In.BottomCenter(this.pressStart, this.add.zone(width / 2, height / 3, width, height));
        this.start = false;
        this.input.on('pointerdown', (pointer) => {
            this.start = true;
        });
        Display.Align.In.Center(this.scoreText, this.add.zone(width / 2, height / 2, width, height));
    }
    update() {
        if (this.start) {
            this.scene.start('GameScene');
        }
    }
}
