import mobileAndTabletCheck from './device.js'

export default class Main extends Phaser.Scene {

    constructor(){
        super({key: 'Main'});
    }

    create()
    {

        this.anims.create({
            key: 'wojak_walk',
            frames: this.anims.generateFrameNames('wojak', { prefix: 'fr', frames: [1, 2, 3, 4, 5], zeroPad: 2 }),
            frameRate: 8, yoyo: true
        });

        this.anims.create({
            key: 'wojak_punch1',
            frames: this.anims.generateFrameNames('wojak', { prefix: 'fr', frames: [3, 6], zeroPad: 2 }),
            frameRate: 8, yoyo: true
        });

        this.anims.create({
            key: 'wojak_punch2',
            frames: this.anims.generateFrameNames('wojak', { prefix: 'fr', frames: [4, 7], zeroPad: 2 }),
            frameRate: 8, yoyo: true
        });

        this.anims.create({
            key: 'npc_walk',
            frames: this.anims.generateFrameNames('npc', { prefix: 'fr', frames: [0, 1, 2, 3, 4], zeroPad: 2 }),
            frameRate: 8, repeat: -1, yoyo: true
        });


        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: platform =>  platform.scene.platformPool.add(platform)
            
        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: platform => platform.scene.platformGroup.add(platform)
            
        });

        //npcs

        this.NPCs = this.physics.add.group();

        //----------------------

        this.wojak = this.physics.add.sprite(50, 500, 'wojak', 'fr00').setScale(0.7).setDepth(Infinity); 

        //attack hitbox

        this.hitbox = this.add.zone(-Infinity, -Infinity).setSize(50, 50); 

        this.physics.world.enable(this.hitbox); 
        this.hitbox.body.moves = false;

        //hit npc

        this.physics.add.overlap(this.hitbox, this.NPCs, (a, b) => {

            let txt;

            if (b.active)
            {
                this.scene.get('UI').score++;
                txt = this.add.text(b.x, b.y - 220, 'OFFENDED!', {fontSize: '15px', fontFamily: 'Digitizer'}).setColor('#000000');
            }

            b.setTexture('npc', 'fr05').setVelocityX(0).setActive(false);

            this.time.delayedCall(250, () => {

                b.setTintFill(0x000000);

                this.time.delayedCall(100, () => {

                    if (txt)
                        txt.destroy();

                    b.destroy();
                });
            });
        });

        //procedural ground

        this.createGround(innerWidth * 2, 820);

        this.cameras.main.setBackgroundColor(0x00fbff).startFollow(this.wojak);
        
        if (mobileAndTabletCheck())
            this.cameras.main.centerOn(innerWidth / 2, innerHeight / 1.2).setZoom(0.5);

        //spawn NPCs

        const spawnNPC = ()=> {

            let npc = this.physics.add.sprite(Math.random() * 1 > 0.5 ? this.wojak.x + 800 : this.wojak.x - 800, 510, 'npc')
                .play('npc_walk', true)
                .setScale(0.7)
                .setDepth(Infinity);

            this.NPCs.add(npc);

        };

        
        this.time.addEvent({delay: 2000, callback: spawnNPC, callbackScope: this, repeat: -1});

        //game over

        const gameOver = this.physics.add.overlap(this.NPCs, this.wojak, ()=> {

            if (!gameOver.active)
                return;
                
            gameOver.active = false;

            this.cameras.main.fade(500, 255, 0, 0, false, (camera, progress) => { 

                if (progress > .9)
                {
                    this.scene.run('GameOver', { score: this.scene.get('UI').score });
                    this.scene.stop('UI');
                    this.scene.stop('Main');
                }

            });

        });


        this.scene.launch('Controller');
        this.scene.launch('UI');
        this.controller = this.scene.get('Controller');


    }

    //----------------------------------------

    createGround(platformWidth, posX)
    {

        let platform;

        if(this.platformPool.getLength())
        {
            platform = this.platformPool.getFirst();
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else
        {
            platform = this.add.sprite(posX, 820, 'ground');
            this.platformGroup.add(platform);
        }

        platform.displayWidth = platformWidth;

        this.nextPlatformDistance = Phaser.Math.Between(0, 800);

    }


    //----------------------------------

    update()
    {
 
        // recycling platforms

        let minDistance = this.scale.width;

        this.platformGroup.getChildren().forEach(platform => {      
            
            platform.x = this.wojak.x;

            let platformDistance = this.scale.width - platform.x - platform.displayWidth / 2;

            minDistance = Math.min(minDistance, platformDistance);

            if(platform.x < - platform.displayWidth)
            {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }

        }, this);
 

        // adding new platforms

        if(minDistance > this.nextPlatformDistance)
            this.createGround(innerWidth * 2, 820);
    
        //wojak actions

        if (this.controller.attack === false)
        {

            if (this.controller.right === true)
                this.wojak.play('wojak_walk', true).setVelocityX(120).setFlipX(false);
            else if (this.controller.left === true)
                this.wojak.play('wojak_walk', true).setVelocityX(-120).setFlipX(true);
            else if (this.controller.up === true)
                this.wojak.play('wojak_walk', true).setVelocityY(-120);
            else if (this.controller.down === true)
                this.wojak.play('wojak_walk', true).setVelocityY(120);
            else 
            {
                if (this.wojak.anims.isPlaying && this.wojak.anims.currentAnim.key === 'wojak_walk')
                    this.wojak.anims.stop().setTexture('wojak', 'fr00');
                else
                    this.wojak.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> this.wojak.anims.stop().setTexture('wojak', 'fr00'));
                
                this.wojak.setVelocity(0, 0);
            }

            this.hitbox.setPosition(-Infinity, -Infinity);
        }

        else if (this.controller.attack === true)   
        {
            this.controller.attack = false;
            this.wojak.play(Math.floor(Math.random() * 10 + 1) > 5 ? 'wojak_punch1' : 'wojak_punch2', true);
            this.wojak.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> this.wojak.anims.stop().setTexture('wojak', 'fr00').setVelocity(0, 0));
            this.hitbox.setPosition(this.wojak.flipX === true ? this.wojak.x - 180 : this.wojak.x + 150, this.wojak.y - 50);
        }

        else 
            this.wojak.anims.stop().setTexture('wojak', 'fr00').setVelocity(0, 0);

        //npc flip

        this.NPCs.getChildren().forEach(npc => {
            
            if (npc.active)
                npc.setFlipX(this.wojak.x > npc.x ? false : true).setVelocityX(this.wojak.x > npc.x ? Phaser.Math.Between(100, 500) : Phaser.Math.Between(-100, -500))
        });
    }

}


 
