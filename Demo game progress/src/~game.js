import 'phaser';
/* import '@babel/polyfill' */
import Loader from './scenes/Loader';
import PreLoader from './scenes/Preloader';
import Game from './scenes/Game';
import Contest from './scenes/Contest';
import { isMobile,isMobileOnly } from 'mobile-device-detect';
import './style.scss';
import { Global } from './objects/global';
import { Server } from './objects/callServer';
import Home from './objects/code';
import Result from './objects/result';
import ThankYou from './objects/thankyou';


Global.dpr=1;//((isMobile)?(1):window.devicePixelRatio);
Global.isMobile=isMobile;
if(Global.isMobile){
var DEFAULT_WIDTH = 1242;//*Global.dpr;
var DEFAULT_HEIGHT = 2208;//*Global.dpr;
} else{
  DEFAULT_WIDTH = 2208;
  DEFAULT_HEIGHT = 1242;
}
//!(deviceDetector.device == "desktop");
/* activateCarousel(); */
// console.log(Global.isMobile+"  is mobileee")

const config = {
  fullscreenTarget:document.getElementById("game-sec"),
  type:(isMobile)?Phaser.CANVAS:Phaser.AUTO,
  transparent: false,
  scale: {
    parent: 'game-sec',
    mode: (Global.isMobile)?Phaser.Scale.ENVELOP:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,//CENTER_HORIZONTALLY,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    transparent:true
  },
  dom: {
    createContainer: false
},
  scene: [PreLoader,Loader,Contest,Game],
  physics: {
    default: 'matter',
    matter:{
      gravity: {
        y: 3,
        x:0
    },
      debug: false,
      /* plugins: {
          attractors: true
      } */
    }
  },
  fps: {
      target: 60,
      forceSetTimeOut: true
  }
}

window.addEventListener('load', () => {

/*   Global.serverObj= new Server();
  Global.serverObj.send(Global.URL_CREATE, setUID.bind(this), null, {
    device: (Global.isMobile) ? "mobile" : "web",
    utm_source:window.utm_source,
    utm_medium:window.utm_medium,
    utm_campaign:window.utm_campaign,
    fresh: true
}, 'POST', null, false); */


const game = new Phaser.Game(config);

/* document.querySelector("#landing").classList.add("active2");
document.querySelector("#home").classList.add("active2");
document.querySelector("#result").classList.add("active2");
document.querySelector("#thankyou").classList.add("active2");
initMicrosite(); */
  
})

let home=null;
let result=null;
let thankyou=null;

function initMicrosite(){
  // home=new Home();
  // home.init(playMachineGame);
 /*  showThankyou(); */
}

// function playMachineGame(){
//   home.shutdown();
// }

// function showResult(){
//   result=new Result();
//   result.init(showThankyou);
// }
// function showThankyou(){
//   thankyou= new ThankYou();
//   thankyou.init();
// }

// window.showResult=showResult;

function setUID(v){
  Global.U_ID = JSON.parse(v)["UID"];
  Global.gameKey = JSON.parse(v)["gamekey"];
  const game = new Phaser.Game(config)
}