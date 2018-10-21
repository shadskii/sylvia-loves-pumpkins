import Phaser from 'phaser';

/**
 * Girl that loves pumpkins.
 */
export default class Eater extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.alive = true;
        this.body.setCollideWorldBounds(true);
        this.setScale(0.7, 0.7);
    }

    update(x) {
        this.x = x;
    }
}
