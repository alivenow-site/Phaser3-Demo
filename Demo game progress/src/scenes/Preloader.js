import { Global } from "../objects/global";



export default class PreLoader extends Phaser.Scene {
  constructor() {
    super({ key: 'PreLoader' })
  }

  init(){}
  onProgress(v){
  
    
  }
  preload() {
/*     this.load.image('contest_bg','./assets/contest/bg.png');
    this.load.image('contest_blue','./assets/contest/blue_bg.png');
    this.load.image('contest_icon','./assets/contest/contest-icon.png'); */

    
  }
  create(){

      this.scene.start("Loader");
  }
}