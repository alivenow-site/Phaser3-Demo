
import Control from "../objects/controls";
import { Global } from "../objects/global";
import { setScaleFactor } from "../objects/scale_factor";
import SlotMachine from "../objects/slotMachine";
import { Instruction } from "../objects/instruction";


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    this.itemFrames=["bottle","box","bread","can1","cheese","chicken","cutter","flower","mashroom","onion","pizza","prawn","tomato","veg"];

    // this.onSpin=this.onSpin.bind(this);
    // this.showRay=this.showRay.bind(this);
    // this.onSlotOut=this.onSlotOut.bind(this);
  }
  init(){}
  create(){
    setScaleFactor.call(this,true);

    this.BG=this.add.sprite(this.c_w*.5,this.c_h*.5, (Global.isMobile) ? "BG_mobile" : "BG-desk");
    this.logo = this.add.sprite((Global.isMobile) ? this.c_w*.5 : this.c_w*.05+this.extraLeftPer , (Global.isMobile) ? this.c_h*.06+this.extraTop : this.c_h*.08+this.extraTop, "logo")

    

    for(var i=2; i<=13; i++){
      this["item"+String(i)] = this.add.sprite((Global.isMobile) ? this.c_w*.06+(-2+i)*70*this.scaleFact : this.c_w*.08+(-2+i)*145*this.scaleFact ,this.c_h*.0, "items",this.itemFrames[i])
      this["item"+String(i)].setScale(this.scaleFact*.4);
      this["item"+String(i)].alpha = 0; 
    }
    this.item2.angle = -40;
    this.item6.angle = -40;
    for(let a = 2; a<=13;a++){this["item"+String(a)].alpha = 1;}

    this.logo1 = this.add.sprite(this.c_w*.5, this.c_h*.1, "logo1");
    this.logo1.alpha = 0
    this.logo2 = this.add.sprite(this.c_w*.5, this.c_h*.2, "logo2");
    this.logo2.alpha = 0
    this.logo3 = this.add.sprite(this.c_w*.5, (Global.isMobile) ? this.c_h*.59 : this.c_h*.62, "logo3");
    this.logo3.alpha = 0
    
    this.title1 = this.add.sprite(this.c_w*.5, (Global.isMobile) ? this.c_h*.42 : this.c_h*.3, "title1");
    this.title1.alpha = 0;
    this.title2 = this.add.sprite(this.c_w*.5, (Global.isMobile) ? this.c_h*.48 : this.c_h*.4, "title2");
    this.title2.alpha = 0;
    this.title3 = this.add.sprite(this.c_w*.5, (Global.isMobile) ? this.c_h*.53 : this.c_h*.47, "title3");
    this.title3.alpha = 0;

    this.start_btn = this.add.sprite(this.c_w*.5, this.c_h*.63, "buttons","button1");
    this.start_btn.setInteractive({ cursor: 'pointer' });
    this.start_btn.alpha = 0;
    // this.start = this.add.text(this.start_btn.x, this.start_btn.y, 'Start', { fill: '#0f0', font-family: 'Helvetica' });
    this.start_btn.on('pointerdown', () => { this.scorecard(); });

    this.start_btn.on('pointerover', () => {this.start_btn.setTexture ("buttons",'button3')});
    this.start_btn.on('pointerout', () => {this.start_btn.setTexture ("buttons",'button1')});
    this.start=this.make.text({
      x:this.start_btn.x,
      y:this.start_btn.y,
      text:"START",
      origin: {
          x: 0.5,
          y: 0.5
      },
      style: {
          font: (Global.isMobile)?''+String(22*this.scaleFact/.5)+`px appetite`:''+String(22*this.scaleFact/.5)+`px appetite`,
          fill: '#ffffff',
          align:"center",
          wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
      }
      
  });
  this.start.setDepth(2004);
  this.start.alpha = 0

  this.ScoreCard = this.add.sprite((Global.isMobile) ? this.c_w*.5 : this.c_w*.3, (Global.isMobile) ? this.c_h*.33 : this.c_h*.46, "ScoreCard");
  this.ScoreCard.alpha = 0;
  this.combo = this.add.sprite((Global.isMobile) ? this.c_w*.5 : this.c_w*.695, (Global.isMobile) ? this.c_h*.64 : this.c_h*.46, (Global.isMobile) ? "combo" : "combo-desk");
  this.combo.alpha = 0;

  this.How_btn = this.add.sprite(this.c_w*.5, (Global.isMobile) ? this.c_h*.8 : this.c_h*.9-this.extraTop, "buttons","button1");
    this.How_btn.setInteractive({ cursor: 'pointer' });

    this.Howtext=this.make.text({
      x:this.How_btn.x,
      y:this.How_btn.y,
      text:"HOW TO PLAY",
      origin: {
          x: 0.5,
          y: 0.5
      },
      style: {
          font: (Global.isMobile)?''+String(20*this.scaleFact/.5)+`px appetite`:''+String(20*this.scaleFact/.5)+`px appetite`,
          fill: '#ffffff',
          align:"center",
          wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
      }
      
  });
  this.How_btn.on('pointerdown', () => { this.scoreFadeOut(); });
  this.How_btn.on('pointerover', () => {this.How_btn.setTexture ("buttons",'button3')});
  this.How_btn.on('pointerout', () => {this.How_btn.setTexture ("buttons",'button1')});
  this.Howtext.setDepth(2004);
  this.How_btn.alpha = 0;
  this.Howtext.alpha = 0;

    this.BG.setScale(this.scaleFact);
    this.logo.setScale(this.scaleFact*.7);
    this.title1.setScale(this.scaleFact*.8);
    this.logo1.setScale(this.scaleFact*.6);
    this.logo2.setScale(this.scaleFact*.6);
    this.logo3.setScale(this.scaleFact*.6);
    this.start_btn.setScale(this.scaleFact*.8);
    this.start.setDepth(2004);
    this.ScoreCard.setScale((Global.isMobile) ? this.scaleFact*.8 : this.scaleFact*.75);
    this.combo.setScale((Global.isMobile) ? this.scaleFact*.75 : this.scaleFact*.75);
    this.How_btn.setScale(this.scaleFact*.8)
 

    this.instruction=new Instruction(this);
   
    
    this.tweens.add({
      targets: this.logo2,
      alpha:1,
      y:this.c_h*.52,
      ease: 'Bounce.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0,
      delay:0,
      onComplete:this.fadeIN()
  }); 
 

    this.tweens.add({
      targets: this.item2,
      y:this.c_h*.7,
      ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0
  }); 
  this.tweens.add({
    targets: this.item3,
    y:this.c_h*.3,
    ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 800,
    repeat: 0,
    delay:0
}); 
this.tweens.add({
  targets: this.item4,
  y:this.c_h*.1,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
}); 
this.tweens.add({
  targets: this.item5,
  y:this.c_h*.5,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
}); 
this.tweens.add({
  targets: this.item6,
  y:this.c_h*.9,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
}); 
this.tweens.add({
  targets: this.item7,
  y:this.c_h*.6,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
}); 
this.tweens.add({
  targets: this.item8,
  y:this.c_h*.4,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
}); 
this.tweens.add({
  targets: this.item9,
  y:this.c_h*.78,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});
this.tweens.add({
  targets: this.item10,
  y:(Global.isMobile) ? this.c_h*.25 : this.c_h*.2,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});
this.tweens.add({
  targets: this.item11,
  y:this.c_h*.4,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});
this.tweens.add({
  targets: this.item12,
  y:this.c_h*.5,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});
this.tweens.add({
  targets: this.item13,
  y:this.c_h*.9,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});

  }


  fadeIN(){
    console.log("Ss")
    this.tweens.add({
      targets: this.logo1,
      alpha:1,
      y:(Global.isMobile) ? this.c_h*.45 : this.c_h*.39,
      ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0,
      delay:0
  });

  this.tweens.add({
    targets: this.logo3,
    alpha:1,
    ease: 'Back.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 800,
    repeat: 0,
    delay:600
});

setTimeout(() => {
  this.fadeOut();
}, 1200);
  }

  fadeOut(){
// console.log("playy")
this.tweens.add({
  targets: this.logo3,
  // x:this.c_w*.52,
  y:(Global.isMobile) ? this.c_h*.57: this.c_h*.65,
  alpha:0,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});
this.tweens.add({
  targets: this.logo1,
  // x:this.c_w*.52,
  y:(Global.isMobile) ? this.c_h*.43: this.c_h*.45,
  alpha:0,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0
});
this.tweens.add({
  targets: this.logo2,
  // x:this.c_w*.52,
  y:(Global.isMobile) ? this.c_h*.5: this.c_h*.55,
  alpha:0,
  ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 500,
  repeat: 0,
  delay:0,
  onComplete:this.Play()
});
  }

  Play(){
    setTimeout(() => {
      this.tweens.add({
        targets: this.title1,
        alpha:1,
        ease: 'Back.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0
      });
      this.tweens.add({
        targets: this.title2,
        alpha:1,
        ease: 'Back.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0
      });
      this.tweens.add({
        targets: this.title3,
        alpha:1,
        ease: 'Back.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0
      });

      this.start_btn.alpha = 1;
      this.start.alpha = 1;
    }, 800);
    
  }

  scorecard(){
    this.tweens.add({
      targets: this.title1,
      y:this.c_h*.43,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0
    });

    this.tweens.add({
      targets: this.title2,
      y:this.c_h*.49,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0
    });
    this.tweens.add({
      targets: this.title3,
      y:this.c_h*.54,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0
    });
    this.tweens.add({
      targets: this.start_btn,
      y:this.c_h*.68,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0
    });
    this.tweens.add({
      targets: this.start,
      y:this.c_h*.68,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0,
      onComplete: this.scoreFadeIN(),
    });
  }

  scoreFadeIN(){
    setTimeout(() => {
      this.ScoreCard.alpha = 1;
      this.combo.alpha = 1;
      this.How_btn.alpha = 1;
      this.Howtext.alpha = 1;
    }, 800);
   
  }
  scoreFadeOut(){
    this.tweens.add({
      targets: this.ScoreCard,
      y:this.c_h*.35,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0,
    });
    this.tweens.add({
      targets: this.combo,
      y:this.c_h*.66,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0,
    });
    this.tweens.add({
      targets: this.How_btn,
      y:(Global.isMobile) ? this.c_h*.82 : this.c_h*.95,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0,
    });
    this.tweens.add({
      targets: this.Howtext,
      y:(Global.isMobile) ? this.c_h*.82 : this.c_h*.95,
      alpha:0,
      ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0,
      delay:0,
      onComplete:this.itemUP()
    });

  }
  itemUP(){
    console.log("ITEM")
    
    setTimeout(() => {
      for(var b = 2; b<=13; b++){
        this.tweens.add({
          targets: this["item"+String(b)],
          y:-this.c_h*.1,
          ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 800,
          repeat: 0,
          delay:0,
          // onComplete: this.instruction.init(this)
        });
      }
    }, 800);
    
    setTimeout(()=>{
      this.instruction.init(this)
    },1600)
  }
  /* onSlotOut(resultKey){
      Global.rotateSound.stop();
      Global.winSound.play();
      Global.resultKey=resultKey;
      this.showRay();
      this.control.showProceed();
      this.slotMachine.startGlow();
  } */

 /*  showRay(){
    this.BGRay.setAlpha(.35);
 /*    this.tweens.add({
        targets: this.BGRay,
        scale:this.scaleFact*.8,
        ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 1000,
        repeat: 0,
        delay:0
    }); 
    this.tweens.add({
        targets: this.BGRay,
        angle:'+='+String(200),
        ease: 'Cubic.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 5000,
        repeat: 0,
        delay:0
    });
  } */

  /* onSpin(){
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
  } */

  update(){
    this.instruction.update();
  }

  
}