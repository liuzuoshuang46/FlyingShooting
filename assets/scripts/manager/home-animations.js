// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    init () {
        this.player = app.node.getComponent(cc.Animation);
    },

    startGame () {
        // this._enterGamePlaying = true;
        //
        // var next = function(){
        //     this._enterGamePlaying = false;
        //     this.player.off( 'finished',next );
        // }.bind( this );
        //
        // var state = this.player.play('home-enter-game');
        // state.wrapMode = cc.WrapMode.Normal;
        // this.player.playAdditive('home-level-to-game');
        //
        // this.player.on('finished',next );

        app.homeWgt.node.active = false;
        app.gameMgr.showGameUI( false );
        cc.find('Canvas/version').active = true;
    },

    returnHome () {
        // this._enterGamePlaying = true;
        //
        // var next = function(){
        //     this._enterGamePlaying = false;
        //     this.player.off( 'finished',next );
        // }.bind( this );
        //
        // var state = this.player.play('home-enter-game');
        // state.wrapMode = cc.WrapMode.Reverse;
        //
        // this.player.playAdditive('home-level-to-home');
        //
        // this.player.on('finished',next );
        app.homeWgt.node.active = true;
        app.gameMgr.showHomeUI( false );
        cc.find('Canvas/version').active = false;
    },

    showSetting () {
        //this.player.play('setting');
    },

    showRevival () {
        cc.find('Canvas/revival').getComponent('revival').show();
        //this.player.play('home-revival');
    },

    showShop () {
        // this.player.play('home-shop');
        cc.find('Canvas/shop').active = true;
    },

    showGameOver () {
        // this.player.play('home-level-to-game-over');
    },

    strengthAnim ( num ) {
        // cc.find('Canvas/home/dingbu/homeuiStrength').getComponent('restore-strength').strengthAnim( String( num ) );
    },

    addDiamondAnim (  ){
        // cc.find('Canvas/home/dingbu/diamond').getComponent( cc.Animation ).play( 'add-diamond' );
    }
});
