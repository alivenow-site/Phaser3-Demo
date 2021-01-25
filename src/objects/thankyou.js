import { shuffle } from "./array-util";
import { Global } from "./global";

export default class ThankYou{
    constructor(){

        

    }

    init(){
        document.querySelector("#thankyou").classList.add("active");
        //document.querySelector("#result .prize_holder img").src=`./assets/prize_${Global.resultKey}.png`;

    }
    moveToNext(index){
       
    }
    setPrizes(){
       
    }
    shutdown(){
        document.querySelector("#thankyou").classList.remove("active");
    }
}

export {
    ThankYou
}