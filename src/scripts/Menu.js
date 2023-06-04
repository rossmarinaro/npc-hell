import mobileAndTabletCheck from './device.js'

export default class Menu extends Phaser.Scene {

    constructor(){
        super({ key: 'Menu' });
    }
    create()
    {

        this.add.sprite(this.scale.width / 2, 250, 'wojak_normal');
        this.add.text(this.scale.width / 2 - 230, 420, 'Wojak goes for a walk', {font: "60px Bangers", fill: "#ccc"}).setStroke("#000000", 4);
        
        const startTxt = this.add.text(this.scale.width / 2 - 80, 550, 'PLAY GAME', {font: "50px Bangers", fill: "#00fbff"}).setStroke("#000000", 4).setInteractive()

        .on('pointerover', ()=> startTxt.setTint(0xff0000))
        .on('pointerout', ()=> startTxt.clearTint())
        .on('pointerdown', ()=>{

            this.sound.stopAll();
            this.sound.removeAll();

            this.scene.start('Main');
            this.scene.stop('Menu');
        });

        this.cameras.main.setBackgroundColor(0x444444);
        
        if (mobileAndTabletCheck())
            this.cameras.main.centerOn(innerWidth / 2, innerHeight / 1.2).setZoom(0.5);
    }
}