import { shuffle } from "./array-util";
import { Global } from "./global";

export default class Result{
    constructor(){

        

    }

    init(){
        document.querySelector("#result").classList.add("active");
        document.querySelector("#result .prize_holder img").src=`./assets/prize_${Global.resultKey}.png`;

    }
    moveToNext(index){
       
    }
    setPrizes(){
       
    }
    shutdown(){
        document.querySelector("#result").classList.remove("active");
    }
}

export {
    Result
}