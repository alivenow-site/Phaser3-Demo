
import Control from "../objects/controls";
import { Global } from "../objects/global";
import { setScaleFactor } from "../objects/scale_factor";
import SlotMachine from "../objects/slotMachine";


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });


    this.onSpin=this.onSpin.bind(this);
    this.showRay=this.showRay.bind(this);
    this.onSlotOut=this.onSlotOut.bind(this);
  }
  init(){}
  create(){
    setScaleFactor.call(this,true);

    this.BG=this.add.sprite(this.c_w*.5,this.c_h*.5,"BG");
    this.BGRay=this.add.sprite(this.c_w*.5,this.c_h*.5,"machine_ray");

    this.BG.setScale(this.scaleFact);
    this.BGRay.setScale(this.scaleFact*.8);
    this.BGRay.setAlpha(0);

    this.slotMachine=new SlotMachine(this);
    this.control=new Control(this);

    this.slotMachine.init(this.onSlotOut);
    this.control.init(this.onSpin);

    
  }
  onSlotOut(resultKey){
      Global.rotateSound.stop();
      Global.winSound.play();
      Global.resultKey=resultKey;
      this.showRay();
      this.control.showProceed();
      this.slotMachine.startGlow();
  }
  showRay(){
    this.BGRay.setAlpha(.35);
 /*    this.tweens.add({
        targets: this.BGRay,
        scale:this.scaleFact*.8,
        ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 1000,
        repeat: 0,
        delay:0
    }); */
    this.tweens.add({
        targets: this.BGRay,
        angle:'+='+String(200),
        ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 5000,
        repeat: 0,
        delay:0
    });
  }
  onSpin(){
    if(!Global.spinActive){
      Global.spinActive=true;
      this.slotMachine.spin();
      this.control.hideSpin();
      Global.prerotateSound.play();
      setTimeout(function(){
        Global.rotateSound.play();
      },300)
      
      setTimeout(this.slotMachine.stopMachine,5000);
    }
  }
  update(){
    this.slotMachine.update();
  }

  
}