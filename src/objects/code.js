import { shuffle } from "./array-util";

export default class Home{
    constructor(){

        this.iconsFrames=["tshirt","youtube","teddy","dates","dinner","newsfeed"];
        this.prizeIndex=0;

        this.setPrizes=this.setPrizes.bind(this);
        this.moveToNext=this.moveToNext.bind(this);

    }

    init(playMachineGame){
        console.log(window.showResult)
        this.playMachineGame=playMachineGame;
        document.querySelector("#home").classList.add("active");
        document.querySelector("#home_start").addEventListener("click",this.playMachineGame);
        this.iconsFrames=shuffle(this.iconsFrames);
        this.setPrizes();
        this.prizeInt= setInterval(this.setPrizes,2000);
        for(var i=1;i<=6;i++){
            document.querySelector("#code"+String(i)).addEventListener("keyup",this.moveToNext.bind(this,i));
        }
    }
    moveToNext(index){
        if(index<6){
            document.querySelector("#code"+String(index+1)).focus();
        }
    }
    setPrizes(){
        document.querySelector(".prize_holder").classList.remove(this.iconsFrames[this.prizeIndex]);
        if(this.prizeIndex>=this.iconsFrames.length-1){
            this.prizeIndex=0;
        }else{
            this.prizeIndex++;
        }
        setTimeout(function(){
            document.querySelector(".prize_holder").classList.add(this.iconsFrames[this.prizeIndex]);
        }.bind(this),50);

    }
    shutdown(){
        document.querySelector("#home").classList.remove("active");
    }
}

export {
    Home
}