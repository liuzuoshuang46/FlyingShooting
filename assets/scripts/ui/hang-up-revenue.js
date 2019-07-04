// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var doubleCost = 150;

cc.Class({
    extends: cc.Component,

    properties: {
        lblTime :{
            type : cc.Label,
            default: null
        },
        lblNum :{
            type : cc.Label,
            default: null
        },
        spRadial :{ // 进度条
            type : cc.Sprite,
            default: null
        },
    },
    
    start () {
        this.init();
    },

    init () {
        this._time = app.player.get('hangUpTime');
        if( !this._time ){
            var _time = Date.now();
            app.player.set('hangUpTime',_time);
            this._time = _time;
        }
        this.update( 0 );
    },

    update ( dt ) {
        if( app.gameMgr._isStart ){
            return;
        }
        var date = Date.now();

        var millisecond = date - this._time;
        var hangUpVal = app.player.getHangUpVal()
        if( millisecond > 86400000 ){
            // this.spRadial.fillRange = -1;
            // this.offCircleNum = parseInt( millisecond / 1000 / 10 );
            // this.lblNum.string = app.util.formatNum( this.offCircleNum * hangUpVal );
            // this.lblTime.string = '00:00';
            // return;
            millisecond = 86400000;
        }

        var offSecond = parseInt( millisecond / 1000 );
        
        var offCircleNum = this.offCircleNum = parseInt( offSecond / 10 );
        this.lblNum.string = app.util.formatNum( offCircleNum * hangUpVal );

        var offHour = parseInt( offSecond / 3600 );
        var offMin = parseInt( ( offSecond - offHour * 3600 ) / 60 );
        
        this.lblTime.string = ( 23 - offHour ) + ':' + ( 60 - offMin );
        if( offHour >= 24 ){
            this.lblTime.string = '00:00';
        }
        this.spRadial.fillRange = offSecond % 10 / -10;
    },

    clickGet () {
        //this.showNodeHangUp( false );
        if( !this.offCircleNum ) return;
        var _time = Date.now();
        app.player.set('hangUpTime',_time);
        this._time = _time;

        app.player.set('coin',app.player.get('coin') + this.offCircleNum * app.player.getHangUpVal() );
        this.update( 0 );
    },

    clickGetDouble () {
        //this.showNodeHangUp( false );
        if( !app.chsdk.canPlayVideo() ){
            this.clickGet();
            return;
        }
        if( !this.offCircleNum ) return;
        // if( app.player.checkDiamond( doubleCost ) && app.player.diamondBuy( doubleCost ) ){
        //     var _time = Date.now();
        //     app.player.set('hangUpTime',_time);
        //     this._time = _time;
    
        //     app.player.set('coin',app.player.get('coin') + this.offCircleNum * app.player.getHangUpVal() * 2 );
        //     this.update( 0 );

        //     app.logView.log('购买成功');
        //     app.datasdk.statistics.hangUpDoubleStatistics(  );
        // }
        var successCall = function(){
            var _time = Date.now();
            app.player.set('hangUpTime',_time);
            this._time = _time;
    
            app.player.set('coin',app.player.get('coin') + this.offCircleNum * app.player.getHangUpVal() * 2 );
            this.update( 0 );

            app.logView.log('领取成功');
            app.datasdk.statistics.hangUpDoubleStatistics(  );
        }.bind( this );
        
        app.chsdk.callAdVideo( function( ret ){
            if( ret ){
                successCall();
            }else{
                app.logView.log('奖励领取失败');
            }
        } );
        
    },

    playGrowLevelEffect () {
        var node = cc.instantiate( app.resMgr.prefHangUpGet );
        node.parent = this.node;
        var ani = node.getChildByName('dra').getComponent( dragonBones.ArmatureDisplay );
        ani.playAnimation('Sprite',1 );
        ani.addEventListener(dragonBones.EventObject.COMPLETE, function(){
            node.destroy();
        });
    },

    showNodeHangUp( show ){

        return;
        if( show instanceof cc.Event.EventTouch ){
            show = !!arguments[1];
        }
        var node = cc.find('Canvas/home/buttonHangUp/nodeHangUp');
        node.active = show;

        var num = node.getChildByName('number').getComponent( cc.Label );
        num.string = app.util.formatNum( this.offCircleNum * app.player.getHangUpVal() );
        if( show ){
            app.chsdk.showBanner('hang_up_revenue');
        }else{
            app.chsdk.rmBanner();
        }

        if( !app.chsdk.canPlayVideo() ){
            var nodeLbl = cc.find('Canvas/home/buttonHangUp/nodeHangUp/buttonDouble/homeui');
            var lbl = nodeLbl.getComponent(cc.Label);
            lbl.string = '1倍领取';
            nodeLbl.children[0].active = false;
            nodeLbl.x = 3;

            var nodeLbl = cc.find('Canvas/home/buttonHangUp/nodeHangUp/buttondelay').active = false;
        }
    }
});
