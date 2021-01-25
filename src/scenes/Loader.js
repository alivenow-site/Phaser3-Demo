import { shuffle } from "../objects/array-util";
import { Global } from "../objects/global";
import {AppLoader} from '../objects/loader';
import { setScaleFactor } from "../objects/scale_factor";


export default class Loader extends Phaser.Scene {
  constructor() {
    super({ key: 'Loader' });

   
  }

  init(){
    this.loaderObj= new AppLoader(this);
    this.loaderObj.init("./assets/icon.png",0x5107a7);
  }
  
  onProgress(v){
    
  }
  preload() {
    this.load.atlas('icons', 'assets/icons.png', 'assets/icons.json');
    this.load.image('Spin','./assets/Spin.png');
    this.load.image('SpinActive','./assets/SpinActive.png');
    this.load.image('machine_ray','./assets/machine_ray.png');
    this.load.image('BG','./assets/BG.png');
    this.load.image('slot_machine','./assets/slot_machine.png');
    this.load.image('glow','./assets/glow.png');
    this.load.image('SpinActive','./assets/SpinActive.png');
    this.load.image('slot_bg','./assets/slot_bg.png');
    this.load.image('slot_gradient','./assets/slot_gradient.png');
    this.load.audio('rotate','./assets/rotate.mp3');
    this.load.audio('pre_rotate','./assets/pre_rotate.mp3');
    this.load.audio('spin_stop','./assets/spin_stop.mp3');
    this.load.audio('win','./assets/win.mp3');
    /* this.load.image('rise_shine','./assets/lock/rise_shine.png'); */
 
    /* this.load.atlas('rating_slider', 'assets/score/rating_slider.png', 'assets/score/rating_slider.json'); */



  }
  

  create() {
    Global.rotateSound=this.sound.add("rotate",{
        mute: false,
        volume: .5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });
    Global.prerotateSound=this.sound.add("pre_rotate",{
        mute: false,
        volume: .5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    });
    Global.stopSound=this.sound.add("spin_stop",{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    });
    Global.winSound=this.sound.add("win",{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    });
    this.scene.start("Game");

    
  }
}
  