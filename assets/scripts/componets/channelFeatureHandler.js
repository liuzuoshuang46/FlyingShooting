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
        videoSprArr:{
            default:[],
            type: cc.Sprite
        },
        hideVideoSetPos:{
            default:[],
            type: cc.Node
        }
    },
    
    start () {
        app.event.add( this );
        if( app.hbswitch.hideVideoSpr ){
            this.hideVideoSpr();
        }
    },

    hideVideoSpr () {
        for( var i in this.videoSprArr ){
            var spr = this.videoSprArr[i];
            spr.node.active = false;
        }
    },

    onDestroy () {
        app.event.remove( this );
    },

    handleEvent ( name, param ) {
        if( name === app.enum.event.HBSwitch ){
            if( app.hbswitch.hideVideoSpr ){
                this.hideVideoSpr();
            }
        }
    },
});
