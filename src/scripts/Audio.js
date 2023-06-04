/* AUDIO */

const audioProps = {

    sound: null,
    cached: []
}

export class AudioManager {


    //-------------- play audio

    static play (
        
        src, 
        vol, 
        loop, 
        scene, 
        detune
        
    )
    {

        audioProps.cached.push(src);
        audioProps.cached.filter(e => { 

        audioProps.sound = scene.sound.add(src);
        audioProps.sound.setLoop(loop).setVolume(vol).setDetune(detune);

    //if sound is already in cache, remove it

            if (e.toString() === src) 
                audioProps.cached.splice(audioProps.cached.indexOf(src), 1);

            audioProps.sound.play();  
        });
    }

    
    //------------------ stop audio


    static stop (src, scene)
    { 
        for (let snd of scene.sound.sounds) 
            if (snd.key == src) 
                snd.stop();
    }
    
}