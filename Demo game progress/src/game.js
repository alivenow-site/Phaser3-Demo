import 'phaser'
import '@babel/polyfill'
import Loader from './scenes/Loader';
import Game from './scenes/Game';
// import Title from './scenes/Title';
// import Instruction from './scenes/Instruction';
// import Score from './scenes/Score';
import PreLoader from './scenes/PreLoader';
import { isMobile,isMobileOnly } from 'mobile-device-detect';


import './style.scss';
import { Global } from './objects/global';




Global.isMobile=isMobile;
Global.dpr=((Global.isMobile)?(1):(window.devicePixelRatio>1.5?1.5:window.devicePixelRatio));
Global.isTab= !Global.isMobile&&isMobile;

let DEFAULT_WIDTH = 2208*Global.dpr;
let DEFAULT_HEIGHT = 1242*Global.dpr;
if(Global.isMobile){
  Global.viewMode="portrait"
   DEFAULT_WIDTH = 1242*Global.dpr;
   DEFAULT_HEIGHT = 2208*Global.dpr;
}else{
  Global.viewMode="landscape"
}

const config = {
  fullscreenTarget:document.getElementById("game-sec"),
  type: Phaser.CANVAS,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'game-sec',
    mode: (Global.isMobile)?Phaser.Scale.ENVELOP:Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,//CENTER_HORIZONTALLY,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    transparent:true
  },
  dom: {
    createContainer: true
},
  scene: [PreLoader,Loader,Game],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }/* ,plugins:{
    key: 'rexGestures',
    plugin: GesturesPlugin,
    mapping: 'rexGestures'
  } */
  /* ,
  plugins: {
    scene: [{
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures'
    },
    // ...
    ]
} */
}
window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
