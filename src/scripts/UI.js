

export default class UI extends Phaser.Scene {

    constructor(){
        super({ key: 'UI' });
    }
    create()
    {

        this.score = 0;

        this.add.text(50, 20, 'Score: ', {fontSize: '45px', fontFamily: 'Bangers'}).setColor('#717171').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
        
        this.scoreText = this.add.text(180, 30, this.score, {fontSize: '45px', fontFamily: 'Digitizer'}).setColor('#717171').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);

    }
    update()
    {
        //update score

        this.scoreText.setText(this.score);
    }
}