


export class AppLoader extends Phaser.GameObjects.Group{
    constructor(scene){
        super(scene);


        this.loaderLogoAdded=false;
    }
    init(_url,loaderBGCode){
        document.body.style.backgroundColor = "#212121";
        this.loaderBG = this.scene.add.graphics();
        this.loaderBase = this.scene.add.graphics();
        this.loaderPath = this.scene.add.graphics();
        this.loaderCover =this.scene.add.graphics();

        this.loaderBase.fillStyle(0xFFFFFF, .2);
        this.loaderCover.fillStyle(loaderBGCode,1);//0x212121, 1);
        this.loaderPath.fillStyle(loaderBGCode,1);//(0x212121, 1);
        this.loaderBG.fillStyle(loaderBGCode,1);//(0x212121, 1);

        this.add(this.loaderBG);
        this.add(this.loaderBase);
        this.add(this.loaderPath);
        this.add(this.loaderCover);

        this.loaderPath.setPosition(this.scene.game.canvas.width*.5, this.scene.game.canvas.height*.5 * 1.4 + 50);
        this.loaderBase.setPosition(this.scene.game.canvas.width*.5, this.scene.game.canvas.height*.5 * 1.4 + 50);
        this.loaderCover.setPosition(this.scene.game.canvas.width*.5,this.scene.game.canvas.height*.5 * 1.4 + 50);

        this.loaderBase.fillCircle(0, 0, 30 * 2);
        this.loaderCover.fillCircle(0, 0, 20 * 2);
        this.loaderPath.fillStyle(0x212121,1);
        this.loaderBG.fillRect(0, 0, this.scene.game.canvas.width, this.scene.game.canvas.height);

        this.loaderPath.fillCircle(0, 0, 30*2);//, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-100), true);

        for (var i = 0; i <= 50; i++) {
            this.loaderPath.fillStyle(0xf62323, 1 - 1 * i / 100);
           // this.loaderPath.arc(0, 0, 40*2, Phaser.Math.DegToRad(-100 - .9 * i), Phaser.Math.DegToRad(-100 - .9 * (i + 1)), true);
           this.loaderPath.beginPath();
           this.loaderPath.slice(0,0, 30*2, Phaser.Math.DegToRad(-100 - 7 * i), Phaser.Math.DegToRad(-100 -7* (i + 1)), true, true);
           this.loaderPath.fillPath();
        }

 /*        this.loaderBG.endFill();
        this.loaderBase.endFill();
        this.loaderPath.endFill();
        this.loaderCover.endFill(); */


   //     this.gameObj = gameObj;


        this.loadLogo(_url);
        this.rotateLoader();
    }
    rotateLoader() {
      /*   this.rotateTween = new Phaser.Tween(this.loaderPath, this.gameObj, this.gameObj.tweens).to({
            angle: 360
        }, 1100, Phaser.Easing.Linear.Out, 1, true).onComplete.addOnce(this.rotateLoader.bind(this)) */
        this.scene.tweens.add({
            targets: this.loaderPath,
            angle:360,
            duration: 1100,
            ease: 'Linear',
            easeParams: [ 3.5 ],
            delay: 0,
            loop:-1,
            onComplete:this.rotateLoader.bind(this)
        });
    }
    loadLogo(_url) {
        this.scene.load.image("loader-logo", _url);
        this.scene.load.once('complete', this.checkLoaderLogoStat.bind(this, "loader-logo"));
        this.scene.load.start();
    };
   checkLoaderLogoStat(_key) {
        if (this.scene.textures.get(_key).key==_key&&!this.loaderLogoAdded) {
            this.loaderLogoAdded=true;
           // this.scene.load.onFileComplete.removeAll(this);
            this.addLoaderLogo(_key)
        }
    };
    addLoaderLogo(_key) {

        this.loaderLogo = this.scene.add.image(0, 0, _key);
        this.loaderLogo.x = this.scene.game.canvas.width*.5;
        this.loaderLogo.y = this.scene.game.canvas.height*.55 ;
        this.add(this.loaderLogo);
  

  
        setTimeout((function () {
           

            this.scene.tweens.add({
                targets: this.loaderLogo,
                y: this.loaderLogo.y - this.loaderLogo.height*.25,
                duration: 500,
                alpha:1,
                ease: 'Cubic.Out',
                easeParams: [ 3.5 ],
                delay: 0
            });

        }).bind(this), 0)

    };
    dispose() {
        if (this.rotateTween)
            this.rotateTween._destroy();
        if (this.loaderLogo)
            this.loaderLogo.mask = null;
        this.loaderGr.destroy();

    }
}