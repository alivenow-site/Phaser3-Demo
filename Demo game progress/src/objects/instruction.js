import { setScaleFactor } from "../objects/scale_factor";
import { Global } from "../objects/global";

export default class Instruction extends Phaser.GameObjects.Container {
    constructor(game){
        super(game);
            this.scene.add.existing(this);
            this.callpatch = false;
            this.flipppL = false;
            this.flipppR = true;
            this.time = 30;
            this.score = 0;
            this.count = 3;
            this.move = false;
            this.moveSpeed = 40;
            this.fall = false;
            this.itemFrames=["bottle","box","bread","can1","cheese","chicken","cutter","flower","mashroom","onion","pizza","prawn","tomato","veg"];
    }

    init(){
        // console.log(this.scene.sys.game.scale.gameSize.width," width")
    setScaleFactor.call(this,false);
    this.pointer = this.scene.input.activePointer;
    this.character = this.scene.add.sprite(this.c_w*.5,(Global.isMobile) ? this.c_h*.952-this.extraTop : this.c_h*.89-this.extraTop,"character");
    
this.itemGroup = this.scene.add.group();

    this.UI_Score = this.scene.add.sprite((Global.isMobile) ? this.c_w*.9-this.extraLeftPer : this.c_w*.92-this.extraLeftPer, -this.c_h*.05, "UIScore");
    this.ScoreText=this.scene.make.text({
        x:this.UI_Score.x,
        y:this.UI_Score.y,
        text:"SCORE",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(13*this.scaleFact/.5)+`px appetite`:''+String(13*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
          //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.ScoreText.setDepth(2004)
    this.UI_Time = this.scene.add.sprite((Global.isMobile) ? this.c_w*.1+this.extraLeftPer : this.c_w*.81-this.extraLeftPer, -this.c_h*.05+this.extraTop, "UITime");
    this.TimeText=this.scene.make.text({
        x:this.UI_Time.x,
        y:this.UI_Time.y,
        text:"TIME",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px appetite`:''+String(13*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
          //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.TimeText.setDepth(2004)

    this.Timetxt=this.scene.make.text({
      x:this.UI_Time.x,
      y:this.UI_Time.y,
      text:this.time,
      origin: {
          x: 0.5,
          y: 0.5
      },
      style: {
          font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px appetite`:''+String(25*this.scaleFact/.5)+`px appetite`,
          fill: '#ffffff',
          align:"center",
        //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
      }
      
  });
  this.Timetxt.setDepth(2004)

  this.Scoretxt=this.scene.make.text({
    x:this.UI_Score.x,
    y:this.UI_Score.y,
    text:this.score,
    origin: {
        x: 0.5,
        y: 0.5
    },
    style: {
        font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px appetite`:''+String(25*this.scaleFact/.5)+`px appetite`,
        fill: '#ffffff',
        align:"center",
      //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
    }
    
});
this.Scoretxt.setDepth(2004)

    this.UI_Score.alpha = 0;
    this.UI_Time.alpha = 0;

    this.Ready_btn = this.scene.add.sprite(this.c_w*.5, this.c_h*.45, "buttons","button1");
    this.Ready_btn.setInteractive({ cursor: 'pointer' });
    this.Ready_btn.on('pointerdown', () => { this.patchFadeOut(); });
    this.Ready_btn.on('pointerover', () => {this.Ready_btn.setTexture ("buttons",'button3')});
    this.Ready_btn.on('pointerout', () => {this.Ready_btn.setTexture ("buttons",'button1')});
    this.ReadyText=this.scene.make.text({
      x:this.Ready_btn.x,
      y:this.Ready_btn.y,
      text:"READY,   GO!",
      origin: {
          x: 0.5,
          y: 0.5
      },
      style: {
          font: (Global.isMobile)?''+String(20*this.scaleFact/.5)+`px appetite`:''+String(20*this.scaleFact/.5)+`px appetite`,
          fill: '#ffffff',
          align:"center",
        //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
      }
      
  });
  this.Ready_btn.alpha = 0;
  this.ReadyText.alpha = 0;
  this.ReadyText.setDepth(2004);

    this.HowtoPlayMobile_patch = this.scene.add.sprite(this.c_w*.5, this.c_h*.3, (Global.isMobile) ? "HowtoPlayMobile" : "HowtoPlayDesktop");
    this.HowtoPlayMobile_patch.alpha = 0;
    

    this.character.setScale((Global.isMobile) ? this.scaleFact*.6 : this.scaleFact*.8);
    this.UI_Score.setScale((Global.isMobile) ? this.scaleFact*.6 : this.scaleFact*.72)
    this.UI_Time.setScale((Global.isMobile) ? this.scaleFact*.6 : this.scaleFact*.72)
    this.HowtoPlayMobile_patch.setScale((Global.isMobile) ? this.scaleFact*.5 : this.scaleFact*.82);
    this.Ready_btn.setScale(this.scaleFact*.75)

   /*   */

      if(!this.callpatch){
    this.patchFadeIN();
    this.callpatch = true;
      }

      this.scene.input.keyboard.on('keydown-LEFT', function (event) {
        this.moveLeft();
    }.bind(this));
  
    this.scene.input.keyboard.on('keydown-RIGHT', function (event) {
        this.moveRight();
    }.bind(this));

   
    console.log(this.pointer, "pointer")

    this.countPatch = this.scene.add.sprite(this.c_w*.5, this.c_h*.5, "countPatch");
    this.countPatch.setScale(this.scaleFact*.6);
    this.Counttxt=this.scene.make.text({
      x:this.countPatch.x,
      y:this.countPatch.y,
      text:this.count,
      origin: {
          x: 0.5,
          y: 0.5
      },
      style: {
          font: (Global.isMobile)?''+String(35*this.scaleFact/.5)+`px appetite`:''+String(35*this.scaleFact/.5)+`px appetite`,
          fill: '#FF0000',
          align:"center",
        //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
      }
      
  });
  this.Counttxt.setDepth(2004)
  this.countPatch.alpha = 0;
  this.Counttxt.alpha = 0;
}

update(){
  if(this.move){
  {if(this.pointer.isDown){
    if (this.pointer.x >= this.scene.sys.game.scale.gameSize.width / 2 && this.character.x <= (this.scene.sys.game.scale.gameSize.width - this.character.width / 2)){
      this.flipppL = false;
    if(!this.flipppR){
  this.character.flipX = !this.character.flipX;
    }
    this.flipppL = false;
    this.flipppR = true;
    this.character.x += this.moveSpeed;
    }
    if (this.pointer.x < this.scene.sys.game.scale.gameSize.width / 2 && this.character.x > (this.scene.sys.game.scale.gameSize.width / 12)) {
      if(!this.flipppL){
        this.character.flipX = !this.character.flipX;
        }
        this.flipppL = true;
        this.flipppR = false;
        this.character.x -= this.moveSpeed;
    }
  }}

  this.speed = 20;
  this.itemGroup.getChildren().forEach(function(enemy) {
    enemy.y += this.speed;
    enemy.angle -=0.2;

    var boundsA = enemy.getBounds();
    var boundsB = this.character.getBounds()

    if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA,boundsB)){
      enemy.destroy();
      this.score += 5;
      this.Scoretxt.text = this.score;
      this.tweenScore(boundsA);
    }

    if(enemy.y > this.scene.sys.game.scale.gameSize.height){
      enemy.destroy();
    }


  }, this);
 
      }
}

tweenScore(pos){
  this.tweentxt=this.scene.make.text({
    x:pos.x,
    y:pos.y,
    text:"+5",
    origin: {
        x: 0.5,
        y: 0.5
    },
    style: {
        font: (Global.isMobile)?''+String(35*this.scaleFact/.5)+`px appetite`:''+String(35*this.scaleFact/.5)+`px appetite`,
        fill: '#FF0000',
        align:"center",
      //   wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
    }
    
});
this.tweentxt.setDepth(2004)

this.scene.tweens.add({
  targets: this.tweentxt,
  y:this.c_h*.6,
  alpha:0,
  ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
  duration: 800,
  repeat: 0,
  delay:0,
});
}

moveLeft(){
 
    if(!this.flipppL){
    this.character.flipX = !this.character.flipX;
    }
    this.flipppL = true;
    this.flipppR = false;

    if (this.move && (this.character.x - this.character.width / 2) > 0){
      this.character.x -= this.moveSpeed;
    }
    /* if(this.move&&(this.character.x+this.character.width)<=this.scene.sys.game.scale.gameSize.width){
      this.character.x -= this.moveSpeed;
    } */
}

moveRight(){
    this.flipppL = false;
    if(!this.flipppR){
  this.character.flipX = !this.character.flipX;
    }
    this.flipppL = false;
    this.flipppR = true;

    if (this.move && (this.character.x + this.character.width / 2) < this.scene.sys.game.scale.gameSize.width){
      this.character.x += this.moveSpeed;
    }
    /* if(this.move&&(this.character.x+this.character.width)<=this.scene.sys.game.scale.gameSize.width){
      this.character.x += this.moveSpeed;
    } */
}

patchFadeOut(){
  this.scene.tweens.add({
    targets: this.HowtoPlayMobile_patch,
    y:this.c_h*.57,
    alpha:0,
    ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 800,
    repeat: 0,
    delay:0,
  });
  this.scene.tweens.add({
    targets: this.Ready_btn,
    y:this.c_h*.9,
    alpha:0,
    ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 800,
    repeat: 0,
    delay:0,
  });
  this.scene.tweens.add({
    targets: this.ReadyText,
    y:this.c_h*.9,
    alpha:0,
    ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 800,
    repeat: 0,
    delay:0,
    onComplete: this.countDown()
  });
}

countDown(){
  setTimeout(()=>{
    this.countPatch.alpha =1;
    this.Counttxt.alpha =1;
  },800)

  this.timedEvent = this.scene.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

}

onEvent(){
  this.count--;
  this.Counttxt.text = this.count;
  if(this.count == 0){
    this.countPatch.alpha =0;
    this.Counttxt.alpha =0;
    this.timedEvent.remove(false);
    this.gameTimer();
  }
}

gameTimer(){
  this.gameTimeEvent = this.scene.time.addEvent({ delay: 1000, callback: this.onGameEvent, callbackScope: this, loop: true });
}

onGameEvent(){
  this.move = true;
  this.time--;
  this.Timetxt.text = this.time;
  if(this.time == 0){
    // this.countPatch.alpha =0;
    // this.Counttxt.alpha =0;
    this.gameTimeEvent.remove(false);
  }
  if(!this.fall){
  this.itemFall();
  this.fall = true;
  }
}

itemFall(){
  var min = 400;
  var max = 700;
  if (this.timerCtr) {
      clearTimeout(this.timerCtr);
  }
var dist = Math.floor((Math.random() * 7) + 2)/10;;
// console.log(dist,"  dist")
var rand_itm = Math.floor(Math.random() * (13 - 0) + 0);
  this.fallItem = this.scene.add.sprite(this.scene.sys.game.scale.gameSize.width * dist+0.3, 0, "items",this.itemFrames[rand_itm]);
  if(rand_itm == 0 || rand_itm == 2 || rand_itm == 6 || rand_itm == 4){
    this.fallItem.setScale(this.scaleFact*.42);
  } else {
    this.fallItem.setScale(this.scaleFact*.55);
  }

  this.itemGroup.add(this.fallItem);
  
  this.timerCtr = setTimeout(this.itemFall.bind(this), Math.floor(Math.random() * (+max - +min)) + min);
}

patchFadeIN(){    
    this.scene.tweens.add({
        targets: this.UI_Score,
        y:(Global.isMobile) ? this.c_h*.05+this.extraTop : this.c_h*.11+this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.ScoreText,
        y:(Global.isMobile) ? this.c_h*.04+this.extraTop : this.c_h*.09+this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.UI_Time,
        y:(Global.isMobile) ? this.c_h*.05+this.extraTop : this.c_h*.11+this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.TimeText,
        y:(Global.isMobile) ? this.c_h*.04+this.extraTop : this.c_h*.09+this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.Timetxt,
        y:(Global.isMobile) ? this.c_h*.057 +this.extraTop: this.c_h*.12+this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.Scoretxt,
        y:(Global.isMobile) ? this.c_h*.057+this.extraTop : this.c_h*.12+this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
    this.scene.tweens.add({
        targets: this.HowtoPlayMobile_patch,
        y: (Global.isMobile) ? this.c_h*.45 : this.c_h*.4,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.Ready_btn,
        y: (Global.isMobile) ? this.c_h*.68 : this.c_h*.82-this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
      this.scene.tweens.add({
        targets: this.ReadyText,
        y:(Global.isMobile) ? this.c_h*.68 : this.c_h*.82-this.extraTop,
        alpha:1,
        ease: 'Cubic.InOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 800,
        repeat: 0,
        delay:0,
      });
    
}

}

export {
    Instruction
}