import { setScaleFactor } from "../objects/scale_factor";
import { Global } from "./global";


export default class Control extends Phaser.GameObjects.Group {
  constructor(game) {
    super(game);

    this.showProceed=this.showProceed.bind(this);
    this.onProceed=this.onProceed.bind(this);
    this.hideSpin=this.hideSpin.bind(this);
  }
  init(onSpin){
      this.onSpin=onSpin;
      setScaleFactor.call(this,false);
      this.spinBtn=this.create(this.c_w*.5,this.c_h*.8,"Spin");

      this.spinBtn.setScale(this.scaleFact*.6);

      this.spinBtn.setInteractive({cursor:'pointer'}).on('pointerdown',this.onSpin);
      

  }
  showProceed(){
    this.spinBtn.setTexture("SpinActive");
    this.spinBtn.setAlpha(1);
    this.scene.tweens.add({
        targets: this.spinBtn,
        scale:{from:this.scaleFact*.55,to:this.scaleFact*.6},
        ease: 'Back.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 150,
        repeat: 0,
        delay:0
    });
    this.spinBtn.setInteractive({cursor:'pointer'}).on('pointerdown',this.onProceed);
  }
  onProceed(){
    if(Global.resultKey!="newsfeed"){
      window.showResult();
    }
  }
  hideSpin(){
    this.scene.tweens.add({
        targets: this.spinBtn,
        scale:{from:this.scaleFact*.6,to:this.scaleFact*.55},
        ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 150,
        repeat: 0,
        delay:0
    });
    this.spinBtn.setAlpha(0.5);
    this.spinBtn.disableInteractive();
  }
}