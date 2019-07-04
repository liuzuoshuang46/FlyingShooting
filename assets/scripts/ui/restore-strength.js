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
        lblAniNum:cc.Label,
        lblTimeLeft: cc.Label
    },

    init () {
        this.initData();
        
        this.unschedule(this.secondCallback);
        this.schedule(this.secondCallback, 1);
        this.secondCallback();

    },

    initData () {
        if( this.strengthData ){
            var newdata = app.player.get('strengthData');
            var off = newdata.num - this.strengthData.num;
            if( off ){
                this.strengthAnim( off );
            }
        }
        this.strengthData = app.player.get('strengthData');
        this.tbData = app.json.tbInitial.json[ 1 ];
        this._time = this.tbData.Hp_restore * 60; // 分钟转秒
        if( app.debug.restoreStrengthTime ){
            this._time = 0.05 * 60;
        }
    },

    secondCallback () {
        
        if( this.strengthData.num >= app.strengthMax ){
            this.lblTimeLeft.node.active = false;
            this.unschedule(this.secondCallback);
        }
        else{
            var timeNow = Date.now();
            var lastRestoreTime = this.strengthData.time;
            var off = timeNow - lastRestoreTime;
            off = parseInt( off / 1000 );
            var addNum = parseInt( off / this._time );
            if( addNum ){
                this.addStrength( addNum );
            }else{
                var left = this._time - off;
                var leftMinute = parseInt(left / 60);
                var leftSecond = parseInt( left % 60 );
                this.lblTimeLeft.node.active = false;
                this.lblTimeLeft.string = leftMinute + ':' + leftSecond + '  +1';
            }
        }
    },

    addStrength ( num ) {
        app.player.addStrength( num, Date.now() );
        this.init();
    },
    
    strengthAnim( str ){
        if( !str ){
            return;
        }
        this.lblAniNum.node.active = true;

        var addchar = '';
        if( str > 0 ){
            addchar = '+';
        }else{
            addchar = '-';
        }

        str = addchar + Math.abs(parseInt(str));
        this.lblAniNum.string = str;

        var inity = -250;
        this.lblAniNum.node.stopActionByTag( 128 );
        this.lblAniNum.node.y = inity;
        this.lblAniNum.node.opacity = 255;

        var act = cc.sequence(
            cc.spawn( cc.moveBy(0.5,0,150), cc.sequence(
                cc.delayTime( 0.4 ),
                cc.fadeTo( 0.3, 0 )
            )),
            cc.callFunc( function(){ 
                this.lblAniNum.node.active = false;
            }.bind(this))
        );
        act.setTag( 128 );

        this.lblAniNum.node.runAction( act );

        var act1 = cc.sequence(
            cc.scaleTo( 0.3,1.2 ).easing( cc.easeOut(5) ),
            cc.scaleTo( 0.3,0.7 ),
        );
        act1.setTag( 129 );
        this.node.stopActionByTag( 129 );
        this.node.runAction( act1 )
    },

    start () {
        app.event.add( this );
        this.init();

        this.lblAniNum.node.active = false;
        this.lblAniNum.node.y = 2000;
    },

    onDestroy () {
        app.event.remove( this );
    },

    handleEvent ( name, param ) {
        if( name === app.enum.event.UPDATE_PLAYER_DATA ){
            if( param.name === 'strengthData' ){
                this.init();
            }
        }
        if( name === app.enum.event.UPDATE_STRENGTH_RESOTRE_TIME ){
            this.addStrength( 0 );
        }
    },
});
