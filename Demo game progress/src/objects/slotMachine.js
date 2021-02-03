import { setScaleFactor } from "../objects/scale_factor";
import { shuffle } from "./array-util";
import { Global } from "./global";


export default class SlotMachine extends Phaser.GameObjects.Container {
  constructor(game) {
    super(game);

    this.scene.add.existing(this);
    this.isGlowing=true;
    this.spinActive=false;
    this.spin1Speed=5;
    this.spin2Speed=0;
    this.spin3Speed=0;
    this.isSettling=false; 
    this.column1Settled=false;
    this.column2Settled=false;
    this.column3Settled=false;
    this.resultKey="youtube";
    this.columeYPadd=.7;
    this.yTop=0;
    this.yBottom=0;
    this.iconsFrames=["tshirt","youtube","teddy","dates","dinner","newsfeed"];
    this.startGlow=this.startGlow.bind(this);
    this.changeGlow=this.changeGlow.bind(this);
    this.spin=this.spin.bind(this);
    this.stopMachine=this.stopMachine.bind(this);
  }
  init(showRay){
      this.showRay=showRay;
      setScaleFactor.call(this,false);

      this.iconsFrames=shuffle(this.iconsFrames);
      this.body=this.scene.add.sprite(this.c_w*.5,this.c_h*.38,"slot_machine");
      this.glow=this.scene.add.sprite(this.c_w*.5,this.c_h*.38,"glow");

      this.add(this.body);
      this.add(this.glow);
      this.body.setScale(this.scaleFact*.6);
      this.glow.setScale(this.scaleFact*.6);

    

      for(var i=1;i<=3;i++){
        this["icon_bg"+String(i)]=this.scene.add.sprite(this.c_w*.504+(-2+i)*163*this.scaleFact,this.body.y+this.body.height*.125*this.body.scaleY,"slot_bg");
        this["icon_gradient"+String(i)]=this.scene.add.sprite(this.c_w*.504+(-2+i)*163*this.scaleFact,this.body.y+this.body.height*.125*this.body.scaleY,"slot_gradient");

        this["icon"+String(i)]=this.scene.add.sprite(this.c_w*.505+(-2+i)*163*this.scaleFact,this["icon_gradient"+String(i)].y,"icons",this.iconsFrames[i-1]);
        
        this.add(this["icon_bg"+String(i)]);
        this.add(this["icon_gradient"+String(i)]);
        this.add(this["icon"+String(i)]);
        this["icon"+String(i)].setScale(this.scaleFact*.5);
        this["icon_bg"+String(i)].setScale(this.scaleFact*.6);
        this["icon_gradient"+String(i)].setScale(this.scaleFact*.6);

        this["icon_2"+String(i)]=this.scene.add.sprite(this.c_w*.505+(-2+i)*163*this.scaleFact,this["icon"+String(i)].y-this["icon"+String(i)].height*this.columeYPadd*this["icon"+String(i)].scaleY,"icons",this.iconsFrames[3+i-1]);
        this.add(this["icon_2"+String(i)]);
        this["icon_2"+String(i)].setScale(this.scaleFact*.5);

        this["icon_3"+String(i)]=this.scene.add.sprite(this.c_w*.505+(-2+i)*163*this.scaleFact,this["icon"+String(i)].y+this["icon"+String(i)].height*this.columeYPadd*this["icon"+String(i)].scaleY,"icons",this.iconsFrames[3+i-1]);
        this.add(this["icon_3"+String(i)]);
        this["icon_3"+String(i)].setScale(this.scaleFact*.5);

        this["icon"+String(i)].setData("followsTo",this["icon_3"+String(i)]);
        this["icon_2"+String(i)].setData("followsTo",this["icon"+String(i)]);
        this["icon_3"+String(i)].setData("followsTo",this["icon_2"+String(i)])
      }

      this.stackMaskShape=this.scene.add.graphics();
      this.add(this.stackMaskShape);
      this.stackMaskShape.fillStyle(0x000000,0);
      this.stackMaskShape.setPosition(this.icon_bg1.x-this.icon_bg1.width*.5*this.icon_bg1.scaleX,this.icon_bg1.y-this.icon_bg1.height*.5*this.icon_bg1.scaleY);
      this.stackMaskShape.fillRect(0,0,this.icon_bg1.width*3.9*this.icon_bg1.scaleX,this.icon_bg1.height*this.icon_bg1.scaleY);//(130*8+50)*this.scaleFact);
      this.stackMaskShape.setDepth(2000);
      this.stackMask = this.stackMaskShape.createGeometryMask();

     for(var i=1;i<=3;i++){
        this["icon"+String(i)].setMask(this.stackMask);
        this["icon_2"+String(i)].setMask(this.stackMask);
        this["icon_3"+String(i)].setMask(this.stackMask);
     }
      
      this.yTop=this.icon1.y-this.icon1.height*1*this.icon1.scaleY;
      this.yBottom=this.icon1.y+this.icon1.height*1*this.icon1.scaleY;
     this.changeGlow();
  }

  startGlow(){
    this.gameTime= this.scene.time.addEvent({
        delay: 250,                // ms
        callback: this.changeGlow,
        loop: true
    });
  }
  changeGlow(){
    this.isGlowing=!this.isGlowing;
    this.glow.setVisible(this.isGlowing);
  }
  spin(){
    this.spinActive=true;
    for(var i=1;i<=3;i++){
        setTimeout(function(i){
            this["spinTime"+String(i)]= this.scene.time.addEvent({
                delay: 1,                // ms
                callback: this.changeSpeed.bind(this,i,1),
                loop: true
            });
        }.bind(this,i),300*i)
    }
  }
  changeSpeed(i,direction){
     if(direction==1){
      this["spin"+String(i)+"Speed"]+=.5;
     }else if(direction==-1){
      this["spin"+String(i)+"Speed"]-=.5;
     }
      if(this["spin"+String(i)+"Speed"]>=30&&direction==1){
       
        this["spinTime"+String(i)].destroy(true)
      }
      if(this["spin"+String(i)+"Speed"]<=10&&direction==-1){
        this["spinTime"+String(i)].destroy(true)
      }
  }
  update(){
 
      if(this.spinActive){
        for(var i=1;i<=3;i++){
          if((!this["column"+String(i)+"Settled"])){
            this["icon"+String(i)].y+= this["spin"+String(i)+"Speed"];
            this["icon_2"+String(i)].y+= this["spin"+String(i)+"Speed"];
            this["icon_3"+String(i)].y+= this["spin"+String(i)+"Speed"];
           
          }
          if(this["icon"+String(i)].y>=this.yBottom){
            this["icon"+String(i)].y=this["icon"+String(i)].getData("followsTo").y-this["icon_3"+String(i)].getData("followsTo").height*this.columeYPadd*this["icon_3"+String(i)].getData("followsTo").scaleY;
            if(this.isSettling&&!this["column"+String(i)+"Settled"]&&this["spin"+String(i)+"Speed"]<=10){
              this["icon"+String(i)].setFrame(this.resultKey);
              this["column"+String(i)+"Settled"]=true;
              this.settleToCenter(this["icon"+String(i)],["icon_2","icon_3"],i);
            }else{
              this["icon"+String(i)].setFrame(String(this.iconsFrames[Phaser.Math.Between(0,2)]+(this["spin"+String(i)+"Speed"]>20?"_1":"")));
            }
            
        }
        if(this["icon_2"+String(i)].y>=this.yBottom){
            this["icon_2"+String(i)].y=this["icon_2"+String(i)].getData("followsTo").y-this["icon_2"+String(i)].getData("followsTo").height*this.columeYPadd*this["icon_2"+String(i)].getData("followsTo").scaleY;
            if(this.isSettling&&!this["column"+String(i)+"Settled"]&&this["spin"+String(i)+"Speed"]<=10){
              this["icon_2"+String(i)].setFrame(this.resultKey);
              this["column"+String(i)+"Settled"]=true;
              this.settleToCenter(this["icon_2"+String(i)],["icon_3","icon"],i);
            }else{
              this["icon_2"+String(i)].setFrame(String(this.iconsFrames[Phaser.Math.Between(0,2)]+(this["spin"+String(i)+"Speed"]>20?"_1":"")));
            }
        }
        if(this["icon_3"+String(i)].y>=this.yBottom){
          this["icon_3"+String(i)].y=this["icon_3"+String(i)].getData("followsTo").y-this["icon_3"+String(i)].getData("followsTo").height*this.columeYPadd*this["icon_3"+String(i)].getData("followsTo").scaleY;
          if(this.isSettling&&!this["column"+String(i)+"Settled"]&&this["spin"+String(i)+"Speed"]<=10){
            this["icon_3"+String(i)].setFrame(this.resultKey);
            this["column"+String(i)+"Settled"]=true;
            this.settleToCenter(this["icon_3"+String(i)],["icon_2","icon"],i);
          }else{
            this["icon_3"+String(i)].setFrame(String(this.iconsFrames[Phaser.Math.Between(0,2)]+(this["spin"+String(i)+"Speed"]>20?"_1":"")));
          }
      }
        }

      }
  }
  settleToCenter(item,list,i){
      this["followY"+String(i)]=item.y;
     
      this.scene.tweens.add({
        targets: item,
        y:this.icon_gradient1.y,
        ease: 'Back.Out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 700,
        repeat: 0,
        delay:0,
        onUpdate:this.followSettle.bind(this,item,list,i),
        onComplete:function(){
          
          if(i==3){
            this.showRay(this.resultKey);
          }
        }.bind(this,i)
        
    });
    setTimeout(function() {
      Global.stopSound.play();
    },400);
  }
  followSettle(item,list,i){
    list.forEach(function(item,i,listKey){
      this[listKey+String(i)].y+=(item.y-this["followY"+String(i)]);
      if(this[listKey+String(i)].y>=this.yBottom){
        this[listKey+String(i)].y=this[listKey+String(i)].getData("followsTo").y-this[listKey+String(i)].getData("followsTo").height*this.columeYPadd*this[listKey+String(i)].getData("followsTo").scaleY;
      }
    }.bind(this,item,i));
    this["followY"+String(i)]=item.y;

    //this["icon"+String(i)].getData("followsTo")
  }
  stopMachine(){
      this.isSettling=true;
      
      for(var i=1;i<=3;i++){
        setTimeout(function(i){
          this["spinTime"+String(i)]= this.scene.time.addEvent({
              delay: 1,                // ms
              callback: this.changeSpeed.bind(this,i,-1),
              loop: true
          });
        }.bind(this,i),300*i)
      }
  }
}