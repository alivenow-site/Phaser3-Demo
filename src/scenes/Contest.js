
import { Global } from "../objects/global";
import { setScaleFactor } from "../objects/scale_factor";
import * as moment from 'moment';

export default class Contest extends Phaser.Scene {
  constructor() {
    super({ key: 'Contest' });

    this.contestDate='2021-01-30 00:00:00';
    this.oneDay=24*60*60*1000;

  }
  create(){
      setScaleFactor.call(this,true);

 
      this.BG=this.add.sprite(this.c_w*.5,0,"contest_bg");
      this.BGBlue=this.add.sprite(this.c_w*.5,this.c_h*1.1-this.extraTop,"contest_blue");
      this.contestIcon=this.add.sprite(this.c_w*.5,this.c_h*.2+this.extraTop,"contest_icon");

      this.BG.setOrigin(0.5,0);
      this.BGBlue.setOrigin(0.5,1);
      this.contestIcon.setOrigin(0.5,0.2);

      this.BG.setScale(this.scaleFact*1.1);
      this.BGBlue.setScale(this.scaleFact*1.1);
      this.contestIcon.setScale(this.scaleFact*.9);

      this.column1=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:":",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.column1.setDepth(2004);
    this.column2=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:":",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.column2.setDepth(2004);
    this.column3=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:":",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.column3.setDepth(2004);
    this.day=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"05",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.day.setDepth(2004);
    this.hour=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"12",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.hour.setDepth(2004);
    this.minute=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"35",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.minute.setDepth(2004);
    this.second=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"44",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(60*this.scaleFact/.5)+`px appetite`:''+String(60*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.second.setDepth(2004);


    this.dayHead=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"Days",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px Helvetica`:''+String(15*this.scaleFact/.5)+`px Helvetica`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.dayHead.setDepth(2004);
    this.minuteHead=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"Minutes",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px Helvetica`:''+String(15*this.scaleFact/.5)+`px Helvetica`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.minuteHead.setDepth(2004);
    this.hourHead=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"Hours",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px Helvetica`:''+String(15*this.scaleFact/.5)+`px Helvetica`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.hourHead.setDepth(2004);
    this.secondHead=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.8*this.BGBlue.scaleY,
        text:"Seconds",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(15*this.scaleFact/.5)+`px Helvetica`:''+String(15*this.scaleFact/.5)+`px Helvetica`,
            fill: '#ffb602',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.8-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.secondHead.setDepth(2004);


    this.prizeInfo=this.make.text({
        x:this.c_w*.5,
        y:this.BGBlue.y-this.BGBlue.height*.55*this.BGBlue.scaleY,
        text:"with assured prizes",
        origin: {
            x: 0.5,
            y: 0.5
        },
        style: {
            font: (Global.isMobile)?''+String(35*this.scaleFact/.5)+`px appetite`:''+String(35*this.scaleFact/.5)+`px appetite`,
            fill: '#ffffff',
            align:"center",
            wordWrap: { width: this.game.canvas.width*.85-this.extraLeftPer, useAdvancedWrap: true }
        }
        
    });
    this.secondHead.setDepth(2004);


    this.initTimer();
    this.updateCounter();
  }
  updateCounter(){
        this.widthMax=Math.max(this.hour.width,this.minute.width,this.second.width,this.day.width)*.8;
      this.column2.setPosition(this.c_w*.5,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);
      this.hour.setPosition(this.column2.x-this.widthMax,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);
      this.minute.setPosition(this.column2.x+this.widthMax,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);
      this.column1.setPosition(this.hour.x-this.widthMax,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);
      this.day.setPosition(this.column1.x-this.widthMax,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);
      this.column3.setPosition(this.minute.x+this.widthMax,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);
      this.second.setPosition(this.column3.x+this.widthMax,this.BGBlue.y-this.BGBlue.height*.85*this.BGBlue.scaleY);

      this.dayHead.setPosition(this.day.x,this.day.y+75*this.scaleFact);
      this.hourHead.setPosition(this.hour.x,this.hour.y+75*this.scaleFact);
      this.minuteHead.setPosition(this.minute.x,this.minute.y+75*this.scaleFact);
      this.secondHead.setPosition(this.second.x,this.second.y+75*this.scaleFact);

      this.calculateExamRemainingTime();
  }
  initTimer(){
    this.gameTimer=this.time.addEvent({
        delay: 1000,                // ms
        callback: this.updateCounter,
        callbackScope: this,
        loop: true
    });
  }
  updateTime(){

  }
    calculateExamRemainingTime() {

        const exam_ending_at    = new Date(this.contestDate.replace(' ', 'T'));
        const current_time      = new Date();
       
        const totalSeconds     = Math.floor((exam_ending_at - (current_time))/1000);
        const totalMinutes     = Math.floor(totalSeconds/60);
        const totalHours       = Math.floor(totalMinutes/60);
        const totalDays        = Math.floor(totalHours/24);

        const hours   = totalHours - ( totalDays * 24 );
        const minutes = totalMinutes - ( totalDays * 24 * 60 ) - ( hours * 60 );
        const seconds = totalSeconds - ( totalDays * 24 * 60 * 60 ) - ( hours * 60 * 60 ) - ( minutes * 60 );

        const examRemainingHoursSection = document.querySelector('#remainingHours');
        const examRemainingMinutesSection = document.querySelector('#remainingMinutes');
        const examRemainingSecondsSection = document.querySelector('#remainingSeconds');
        this.day.setText((totalDays<10)?("0"+String(totalDays)):String(totalDays));
        this.hour.setText((hours<10)?("0"+String(hours)):String(hours));
        this.minute.setText((minutes<10)?("0"+String(minutes)):String(minutes));
        this.second.setText((seconds<10)?("0"+String(seconds)):String(seconds));

}
}