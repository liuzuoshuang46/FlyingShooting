// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var td = {
    'speedMax' : 1000, // 1000px / s 速度上限
    'speedMin' : 100, //  速度下限
    'levelTime' : 30, // s  关卡总时间
    'generalDt' : 0.5, // 几秒产生一个邮件
    'maxNum' : 10, // 屏幕最多几个邮件
    'checkTop' : 800, // 飞机最高飞到的高度
    'onceNumMax' : 3, // 一次产生几个邮件的最大值
    'onceNumMin' : 1 // 一次产生几个邮件的最小值
}

cc.Class({
    extends: cc.Component,

    properties: {
        nodeTemplateMail1: cc.Node, // 邮件预制体 
        nodeTemplateMail2: cc.Node, // 邮件预制体 
        nodeTemplateBoomCoin: cc.Node, // 爆金币预制体

        lblGetNum: cc.Label,
        lblTime: cc.Label,
        arrAnimPosBezier:{
            default:[],
            type: [cc.Vec2]
        },
        animPosBezier1:cc.Vec2,
        arrAnimPosBezier2:{
            default:[],
            type: [cc.Vec2]
        },
        arrAnimPosBezier3:{
            default:[],
            type: [cc.Vec2]
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init ( tbData ) {
        this.initData( tbData );
        this.initUI();
        this.startCountDown();
    },

    startCountDown () {
        var anim = this.node.getComponent( cc.Animation );
        anim.play('prize-level');
        this.countDownPlaying = true;
        app.audioMgr.play( app.audioMgr.audio321GO );

        anim.on('finished',function(){
            this.countDownPlaying = false;
            this.startGame();
        }.bind( this ) );
    },
    
    initData( tbData ) {

        this.gold_min = Math.floor(tbData.gold_min);
        this.gold_max = Math.floor(tbData.gold_max);

        this.leftTime = td.levelTime;
        this.catchedNum = 0; // 收获金币数量
        this.countDownPlaying = false; // 321Go正在播放
        this.generalIdx = 0; // 产生第几个位置的邮件了
        this.generalDt = td.generalDt;
        this.isStart = false; // 游戏是否开始
        this.plane = null;
        this.allMails = []; // 邮件对象池
        this.allBoomCoins = []; // 爆金币特效对象池
        this.usedMails = []; // 正在飞的邮件
        this.deadMails = []; // 需要从屏幕移除的邮件
    },
    initUI () {
        this.nodeTemplateMail1.active = false;
        this.nodeTemplateMail2.active = false;
        this.nodeTemplateBoomCoin.active = false;

        this.updateLbl();
        this.generalPlane();
        this.createMails();
        // this.createBoomCoins();
    },
    updateLbl () {
        this.lblTime.string = '剩余' + Math.floor( this.leftTime ) + 's';
        this.lblGetNum.string = app.util.formatNum( this.catchedNum );
    },

    startGame () {
        this.initTouch();
        this.isStart = true;
    },

    generalPlane () {
        if( this.plane ){
            console.error('generalPlane');
        }
        var plane = this.plane = cc.instantiate( app.resMgr[ 'prefPlaneModel' + app.player.getUseRoleId() ] );
        plane.parent = this.node;
        plane.y = -150;
        plane.x = 320;
        plane.runAction( cc.moveTo( 0.5,320,200 ).easing(cc.easeOut(3)) );
    },

    newMail () {
        var item = cc.instantiate( this[ 'nodeTemplateMail' + _.random( 1, 2 ) ] );
        item.getComponent('moveComponent').init({
            checkTop: td.checkTop,
            speed: _.random( td.speedMin, td.speedMax ) ,
            bodyWidth: item.width,
            onOutScreen: ( node ) => {
                this.removeMail( node )
            }
        });
        item.parent = this.node;
        item.active = false;

        this.allMails.push( item );
    },

    newBoomCoin (  ) {
        var item = cc.instantiate( this.nodeTemplateBoomCoin );
        item.parent = this.node;
        item.active = false;
        this.allBoomCoins.push( item );
    },

    createBoomCoins () {
        for( var i = 0;i < td.maxNum;i ++ ){
            this.newBoomCoin();
        }
    },

    createMails () {
        for( var i = 0;i < td.maxNum;i ++ ){
            this.newMail();
        }
    },

    generalBoomCoin ( position ) {

        var newCoinAni = app.resMgr.getNewBoomCoinAni().getComponent('boomCoin');
        newCoinAni.node.parent = this.node;
        newCoinAni.node.position = position;
        newCoinAni.playNumToPos( _.random( 6,8 ), cc.v2(60,1088) );
        
        var coinNum = _.random( this.gold_min, this.gold_max );
        this.catchedNum += coinNum;
        this.updateLbl();

        return;

        if( !this.allBoomCoins.length ){
            this.newBoomCoin();
        }
        var item = this.allBoomCoins[ this.allBoomCoins.length - 1];
        app.util.removeIf( item, this.allBoomCoins );

        item.active = true;
        item.position = position;

        item.getComponent( dragonBones.ArmatureDisplay ).playAnimation( 'newAnimation', 1 );
        item.getComponent( dragonBones.ArmatureDisplay ).addEventListener(dragonBones.EventObject.COMPLETE, function(){
            var coinNum = _.random( this.gold_min, this.gold_max );
            this.catchedNum += coinNum;

            this.allBoomCoins.push( item );
            item.active = false;

            this.updateLbl();
        }.bind( this ));
    },
    generalMailItem( num ) {
        if( num ){
            for( var i =0;i < num; i++ ){
                this.generalMailItem();
            }
            return;
        }
        if( !this.allMails.length ){
            this.newMail();
        }
        var item = this.allMails[ this.allMails.length - 1];
        app.util.removeIf( item, this.allMails );
        item.active = true;
        item.position = this.animPosBezier1;

        var idx = this.generalIdx;
        var p1 = this.animPosBezier1;
        var p2 = this.arrAnimPosBezier2[ idx ];
        var p3 = this.arrAnimPosBezier3[ idx ];

        item.runAction( cc.sequence(
            cc.bezierTo( td.generalDt, [ p1, p2, p3 ] ),
            cc.callFunc( function(){
                this.usedMails.push( item );
            }.bind( this ))
        ) );

        this.generalIdx = ++this.generalIdx % 5;
    },

    initTouch () {
        var touchNode = this.node.getChildByName('beijingtu');
        touchNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this );
        touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this );
        touchNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this );
        touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this );
    },

    touchStart ( event ) {
        if( this.countDownPlaying ){
            return false;
        }
    },

    touchMove ( event ) {
        var pos = event.getLocation();
        var pre = event.getPreviousLocation();
        this.plane.x += pos.x - pre.x;
        this.plane.y += pos.y - pre.y;

        if( this.plane.x < 0 ){
            this.plane.x = 0
        }else if( this.plane.x > cc.winSize.width ){
            this.plane.x = cc.winSize.width;
        }

        if( this.plane.y < 0 ){
            this.plane.y = 0
        }else if( this.plane.y > 800 ){
            this.plane.y = 800;
        }
    },

    touchEnd ( event ) {
    },

    touchCancel ( event ) {
    },

    gameOver () {
        app.gameMgr.onPrizeLevelEnd( this.catchedNum );
        this.node.destroy();
    },

    update ( dt ) {
        if( this.countDownPlaying || !this.isStart ){
            return;
        }
        this.leftTime -= dt;
        if( this.leftTime <= 0 ){
            this.gameOver();
            return;
        }

        this.generalDt -= dt;
        
        // 检测生成邮件
        if( this.allMails.length && this.generalDt <= 0 ) {
            this.generalMailItem(_.random(td.onceNumMin, td.onceNumMax));
            this.generalDt += td.generalDt;
        }

        // 邮件飞行 检测飞机和邮件碰撞
        var len = this.usedMails.length;

        for( var i = 0; i< len; i++ ){
            var item = this.usedMails[i];
            if( !item ){
                console.error('error');
            }
            item.getComponent('moveComponent').updatePos( dt );

            var r1 = item.getBoundingBox();
            var r2 = this.plane.getBoundingBox();

            // 飞机只有头部碰撞区，这里改成全身
            r2.y -= 30;
            r2.height = 120;
            var ret = r1.intersects(r2);
            if( ret ){
                this.onCatchMail( item );
            }
        }
        
        this.doRemoveMail();
        this.updateLbl();
    },
    

    removeMail ( mailNode ){
        this.deadMails.push( mailNode );
    },

    doRemoveMail () {
        for( var i in this.deadMails ){
            var mailNode = this.deadMails[i];
            app.util.removeIf( mailNode, this.usedMails );
            this.allMails.push( mailNode );
            mailNode.active = false;
        }
        this.deadMails = [];
    },

    onCatchMail ( mailNode ) {
        this.removeMail( mailNode );
        this.generalBoomCoin( mailNode.position );
    }
});