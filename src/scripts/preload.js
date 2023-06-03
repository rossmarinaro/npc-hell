import main_resources from './resources.json';
import joyStick from './joystick.js';

//place these two classes in the beginning of your game config scene array. 


//---------- loads resources to memory

export class Boot extends Phaser.Scene {
        constructor() {
            super("Boot"); 
        }
        preload()
        {
           this.load.json('main_resources', main_resources);   
           this.load.plugin('rexvirtualjoystickplugin', joyStick, true);
        }
        create()
        {

            this.add.text(0, 0, '', { font: "1px Digitizer"}).setAlpha(0);
            this.add.text(0, 0, '', { font: "1px Bangers"}).setAlpha(0);
    
            this.time.delayedCall(500, ()=> {

                this.scene.run('Preload');
                this.scene.stop('Boot');
                
            });
  
        }
    }


//---------- preloads them into the game cache

export class Preload extends Phaser.Scene {

    constructor() {
	    super("Preload");
    }
    preload()
    {   
       this.parseResources(this.cache.json.get('main_resources')); 
    }
   create()
   {
        //now call your main game scene
        this.scene.run('Menu');
        this.scene.stop('Preload');
   }
//------------------------------------------------------------------------------------ parse asset resource manifests

    parseResources(json) 
    {

    //images (png)

        if (json.hasOwnProperty('image')) 
        {
            for (let key in json.image) 
            {
                let keys = Object.keys(json.image[key]).find(i => i); 
                for (let value in json.image[key]) 
                {
                    let values = json.image[key][value];
                    this.load.image(keys, values); 
                }
            }
        }
    //audio (ogg)
        if (json.hasOwnProperty('audio')) 
        {
            for (let key in json.audio) 
            {
                let keys = Object.keys(json.audio[key]).find(i => i); 
                for (let value in json.audio[key]) 
                {
                    let values = json.audio[key][value];
                    this.load.audio(keys, values); 
                }
            }
        }
    //obj
        if (json.hasOwnProperty('obj'))
        {
            for (let key in json.obj) 
            {
                let keys = Object.keys(json.obj[key]).find(i => i); 
                for (let value in json.obj[key]) 
                {
                    let obj = json.obj[key][value][0], 
                        mtl = json.obj[key][value][1];
                    this.load.obj(keys, obj, mtl); 
                }
            }
        }
    //atlas
        if (json.hasOwnProperty('atlas'))
        {
            for (let key in json.atlas) 
            {
                let keys = Object.keys(json.atlas[key]).find(i => i); 
                for (let value in json.atlas[key]) 
                {
                    let img = json.atlas[key][value][0], 
                        data = json.atlas[key][value][1];
                    this.load.atlas(keys, img, data); 
                }
            }
        }
    //spritesheet
        if (json.hasOwnProperty('spritesheet'))
        {
            for (let key in json.spritesheet) 
            {
                let keys = Object.keys(json.spritesheet[key]).find(i => i);
                for (let key2 in json.spritesheet[key]) 
                {
                    let img = json.spritesheet[key][key2][0],
                        data = json.spritesheet[key][key2][1];
                   this.load.spritesheet(keys, img, {frameWidth: data.frameWidth, frameHeight: data.frameHeight}); 
                }
            }
        }
    //tilemaps
        if (json.hasOwnProperty('tilemapTiledJSON'))
        {
            for (let key in json.tilemapTiledJSON) 
            {
                let keys = Object.keys(json.tilemapTiledJSON[key]).find(i => i); 
                for (let key2 in json.tilemapTiledJSON[key]) 
                {
                   let data = json.tilemapTiledJSON[key][key2];
                   this.load.tilemapTiledJSON(keys, data);  
                }   
            }
        }
    }
}
