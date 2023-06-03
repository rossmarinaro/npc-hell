
export default class GameOver extends Phaser.Scene {

    constructor(){
        super({ key:'GameOver' });
    }
    create(score)
    {

        this.add.sprite(this.scale.width / 2, 200, 'angry_wojak').setScale(0.5);

        this.add.text(this.scale.width / 2 - 70, 370, 'SCORE: ', {font: "30px Digitizer", fill: "#ffffff"}).setStroke("#000000", 4);
        this.add.text(this.scale.width / 2 + 50, 370, score, {font: "30px Digitizer", fill: "#ffffff"}).setStroke("#000000", 4);

        this.add.text(this.scale.width / 2 - 170, 420, "GAME OVER", {font: "60px Digitizer", fill: "#ffff00"}).setStroke("#ff0000", 4);
        this.add.text(this.scale.width / 2 - 130, 490, "TRY AGAIN?", {font: "50px Digitizer", fill: "#ffffff"}).setStroke("#000000", 4);

        const 

            yes = this.add.sprite(this.scale.width / 2 - 50, 650, 'yes').setInteractive()
            .on('pointerover', ()=> yes.setTint(0x525252))
            .on('pointerout', ()=> yes.clearTint())
            .on('pointerdown', ()=>{

                this.sound.stopAll();
                this.sound.removeAll();

                this.scene.start('Main');
                this.scene.stop('GameOver');
            }),

            no = this.add.sprite(this.scale.width / 2 + 70, 650, 'no').setInteractive()
            .on('pointerover', ()=> no.setTint(0x525252))
            .on('pointerout', ()=> no.clearTint())
            .on('pointerdown', ()=>{
                
                this.sound.stopAll(); 
                this.sound.removeAll();

                this.scene.start('Menu');
                this.scene.stop('GameOver');
            });
        


        this.cameras.main.setBackgroundColor(0xccc);
    }
}