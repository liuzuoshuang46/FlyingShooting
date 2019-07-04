// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var time2DiamondNum = {
    1:30,
    2:40,
    3:50,
    4:60,
    5:70,
    6:80,
    7:100
}

cc.Class({
    extends: cc.Component,

    properties: {
        toggleADDouble: cc.Toggle
    },

    start () {
        this.init();
        app.event.add( this );
    },

    onDestroy () {
        app.event.remove( this );
    },

    init () {
        this.initData();
        this.initUI();
    },

    initData () {
        this.data = app.player.get('checkIn');
    },

    disableAD () {
        this.node.getChildByName('homeui').active = false;
        this.node.getChildByName('toggle').active = false;
        this.node.getChildByName('toggle').getComponent(cc.Toggle).isChecked = false;
        this.node.getChildByName('videoad11').active = false;
    },

    handleEvent ( name, param ) {
        switch( name ){
            case app.enum.event.DISABLE_AD_VIDEO:{
                this.disableAD();
            }
            break;
        }
    },

    initUI () {
        for( var i = 1;i <= 7;i ++ ){
            var node = this.node.getChildByName(String(i));
            if( i < this.data.num + 1 ){
                this.initYes( node, i );
            }else if( i == this.data.num + 1 ){
                this.initToday( node, i );
            }else{
                this.initNo( node, i );
            }
        }

        if( !app.chsdk.canPlayVideo() ) {
            this.disableAD();
        }

    },

    initToday ( node, num ) {
        node.nodeToday = node.getChildByName('today');
        node.nodeNo = node.getChildByName('no');
        node.nodeYes = node.getChildByName('yes');
        node.nodeToday.active = node.nodeNo.active = node.nodeYes.active = false;

        node.nodeToday.active = true;
        node.nodeToday.getChildByName('3').getComponent(cc.Sprite).spriteFrame = app.resMgr['frameCheckIn' + num];
        node.nodeToday.getChildByName('5').getComponent(cc.Label).string = time2DiamondNum[ num ];
        node.nodeToday.getChildByName('6').getComponent(cc.Label).string = '待签到';
    },

    initNo ( node, num ) {
        node.nodeToday = node.getChildByName('today');
        node.nodeNo = node.getChildByName('no');
        node.nodeYes = node.getChildByName('yes');
        node.nodeToday.active = node.nodeNo.active = node.nodeYes.active = false;

        node.nodeNo.active = true;
        node.nodeNo.getChildByName('3').getComponent(cc.Sprite).spriteFrame = app.resMgr['frameCheckIn' + num];
        node.nodeNo.getChildByName('5').getComponent(cc.Label).string = time2DiamondNum[ num ];
        node.nodeNo.getChildByName('6').getComponent(cc.Label).string = '第' + app.util.num2chinese( num ) + '天';
    },

    initYes ( node, num ) {
        node.nodeToday = node.getChildByName('today');
        node.nodeNo = node.getChildByName('no');
        node.nodeYes = node.getChildByName('yes');
        node.nodeToday.active = node.nodeNo.active = node.nodeYes.active = false;
        
        node.nodeYes.active = true;
        node.nodeYes.getChildByName('3').getComponent(cc.Sprite).spriteFrame = app.resMgr['frameCheckIn' + num];
        node.nodeYes.getChildByName('5').getComponent(cc.Label).string = time2DiamondNum[ num ];
    },

    clickCheckIn () {

        var successCall = function(){
            this.data.num += 1;
            var addDiamond = time2DiamondNum[ this.data.num ];
            if( this.toggleADDouble.isChecked ){
                addDiamond *= 2;
            }
            app.logView.log('签到获得钻石:' + addDiamond );
            app.player.addDiamond( addDiamond );
            if( this.data.num >= 7 ){
                this.data.num = 0;
            }
            this.data.time = JSON.stringify( new Date() ).substring(0,11);
            app.player.set('checkIn', this.data );
            this.node.destroy();
            app.homeWgt.nextStartAction();
        }.bind( this );;

        if( this.toggleADDouble.isChecked ){
            app.chsdk.callAdVideo( function( ret ) {
                if( ret ) {
                    successCall();
                }else{
                    app.logView.log('分享失败，未能获取奖励')
                }
            }.bind( this ) );
        }else{
            app.chsdk.share( function( ret ) {
                if( ret ) {
                    successCall();
                }else{
                    app.logView.log('分享失败，未能获取奖励')
                }
            }.bind( this ))
        }
    },

    clickSkip () {
        this.node.destroy();
    },

    onEnable () {
        app.chsdk.showBanner('check_in');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }

});
