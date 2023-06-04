

`use strict`;

import mobileAndTabletCheck from './device.js'
import { AudioManager } from './Audio.js';


export default class Controller extends Phaser.Scene {

    constructor(){
        super('Controller');
    }

    init()
    {
        this.attack = false;
        this.left = false;
        this.right = false;
    }

    create()
    {

        if (mobileAndTabletCheck()) 
        {

            this.cameras.main.centerOn(innerWidth / 2, innerHeight / 1.2).setZoom(0.5);
            
            this.input.addPointer(1);
            this.joystickBase1 = this.add.circle(-50, 250, 80, 0x000000).setAlpha(0.5);
            this.joystickThumb1 = this.add.circle(-50, 250, 50, 0xcccccc).setAlpha(0.5);
            this.joystick1 = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                forceX: 0,
                forceY: 0,
                x: 200,
                y: 200,
                radius: 60,
                base: this.joystickBase1,
                thumb: this.joystickThumb1
            });

            this.attackButton = this.add.circle(850, 300, 50, 0x000000).setAlpha(0.5).setInteractive()
                .on('pointerdown', ()=> {

                    if (!this.attack)
                        AudioManager.play('swipe', 0.3, false, this, 0);

                    this.attack = true;
                })

                this.events.on('update', ()=> {

                    if (this.joystick1.forceX !== 0 && this.joystick1.forceY !== 0)
                    {
                        if (this.joystick1.forceX > 40)
                            this.right = true;
                        else if (this.joystick1.forceX < -40) 
                            this.left = true;
                    }
                    else
                    {
                        this.left = false;
                        this.right = false;
                    }       
                });
        }
        
        else ////keyboard
        {


            this.input.keyboard
            .on('keydown-RIGHT', ()=> this.right = true)
            .on('keyup-RIGHT', ()=> this.right = false)
            .on('keydown-LEFT', ()=> this.left = true)
            .on('keyup-LEFT', ()=> this.left = false)
            .on('keydown-SPACE', ()=> {
                
                if (this.attacking)
                    return;

                this.attacking = true;

                this.attack = true;
                AudioManager.play('swipe', 0.3, false, this, 0);

            })
            .on('keyup-SPACE', ()=> this.attacking = false);
        }
    }


}