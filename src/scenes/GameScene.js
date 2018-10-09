import {Scene} from 'phaser';
import Jacob from '../sprites/Jacob';
import FallingObject from '../sprites/FallingObject';

const MISS_LIMIT = 3;
const MISS = 'X';

/**
 * This is the primary scene. The game is played during this scene.
 */
class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        this.add.image(this.width / 2, this.height / 2, 'water').setScale(10, 2);
        this.platforms = this.physics.add.staticGroup();
        this.platforms
            .create(0, this.height, 'ground')
            .setScale(10, 0.5)
            .refreshBody();

        this.score = 0;
        this.numMissed = 0;
        this.scoreText = this.add.text(24, 24, `${this.score} ${MISS.repeat(MISS_LIMIT - this.numMissed)}`, {
            fontSize: '32px',
            fill: '#fff',
        });

        this.x = this.width / 2;
        this.jacob = new Jacob({
            scene: this,
            key: 'jacob',
            x: this.x,
            y: this.height,
        });

        this.dicks = this.add.group();

        this.time.addEvent({
            delay: 400,
            callback: () => this.addDickBetween(0, 20),
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: 200,
            callback: () => this.addDickBetween(20, 150),
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: 160,
            callback: () => this.addDickBetween(150, 100000000000),
            callbackScope: this,
            loop: true,
        });

        this.input.on(
            'pointerdown',
            (pointer) => {
                this.x = pointer.x;
            },
            this
        );
        this.input.on(
            'pointermove',
            (pointer) => {
                this.x = pointer.x;
            },
            this
        );
    }

    update() {
        this.jacob.update(this.x);
        this.dicks.children.entries.forEach((element) => {
            element.update();
        });
        if (this.numMissed > MISS_LIMIT) {
            this.scene.start('GameOverScene', {score: this.score});
        }
    }

    enemySpawnXValue() {
        let range = this.width * 0.9;
        let pad = this.width * 0.02;
        return Math.floor(Math.random() * range) + pad;
    }

    addDick() {
        this.dicks.add(
            new FallingObject({
                scene: this,
                key: 'dick',
                x: this.enemySpawnXValue(),
                y: -this.height / 4,
            })
        );
    }
    addDickBetween(min, max) {
        if (this.score >= min && this.score <= max) {
            this.addDick();
        }
    }
    incrementScore() {
        this.score++;
        this.updateScoreText();
    }

    incrementMiss() {
        this.numMissed++;
        this.updateScoreText();
    }

    updateScoreText() {
        let num = MISS_LIMIT - this.numMissed;
        num = num >= 0 ? num : 0;
        this.scoreText.setText(`${this.score} ${MISS.repeat(num)}`);
    }
}

export default GameScene;
