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
    this.load.atlas('items', 'assets/items.png', 'assets/items.json');
    this.load.atlas('buttons', 'assets/buttons.png', 'assets/buttons.json');
    this.load.image('BG_mobile','./assets/bg1-mobile.jpg');
    this.load.image('logo','./assets/Dominos.png');
    this.load.image('title1','./assets/title1.png');
    this.load.image('title2','./assets/title2.png');
    this.load.image('title3','./assets/title3.png');
    this.load.image('logo1','./assets/logo1.png');
    this.load.image('logo2','./assets/logo2.png');
    this.load.image('logo3','./assets/logo3.png');
    this.load.image('ScoreCard','./assets/ScoreCard.png');
    this.load.image('combo','./assets/ComboMultiplierMobile.png');
    this.load.image('combo-desk','./assets/ComboMultiplierDesktop.png');
    this.load.image('character','./assets/character.png');
    this.load.image('UIScore','./assets/UIScore.png');
    this.load.image('UITime','./assets/UITime.png');
    this.load.image('HowtoPlayMobile','./assets/HowtoPlayMobile.png');
    this.load.image('HowtoPlayDesktop','./assets/HowtoPlayDesktop.png');
    this.load.image('BG2','./assets/bg2-mobile.png');
    this.load.image('countPatch','./assets/countDown.png');
    this.load.image('BG-desk','./assets/bg1-desktop.jpg');


    // this.load.image('glow','./assets/glow.png');
    // this.load.image('SpinActive','./assets/SpinActive.png');
    // this.load.image('slot_bg','./assets/slot_bg.png');
    // this.load.image('slot_gradient','./assets/slot_gradient.png');
    // this.load.audio('rotate','./assets/rotate.mp3');
    // this.load.audio('pre_rotate','./assets/pre_rotate.mp3');
    // this.load.audio('spin_stop','./assets/spin_stop.mp3');
    // this.load.audio('win','./assets/win.mp3');
    /* this.load.image('rise_shine','./assets/lock/rise_shine.png'); */
 
    /* this.load.atlas('rating_slider', 'assets/score/rating_slider.png', 'assets/score/rating_slider.json'); */



  }
  

  create() {
    /* Global.rotateSound=this.sound.add("rotate",{
        mute: false,
        volume: .5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }); */
    /* Global.prerotateSound=this.sound.add("pre_rotate",{
        mute: false,
        volume: .5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }); */
   /*  Global.stopSound=this.sound.add("spin_stop",{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }); */
    /* Global.winSound=this.sound.add("win",{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }); */
    this.scene.start("Game");

    
  }
}
  