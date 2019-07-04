// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var maxRadius = 60; // 最大尺寸怪物的半径
var maxSize = cc.size( maxRadius * 2, maxRadius * 2 );
var defaultSpeed = 127; // 227 px/s
var logret = false;
var speedReleaseDt = 0.2; // 被攻击减速时长
var monsterAniSpeed = 0.1;
var monsterAniSpeedFast = 1;
var tagSpeedRelease = 101;

var log = function(){
    if( !logret ) return;
    var p = [].slice.call(arguments);
    p.splice(0,0,'[ monster ]');
    console.log.apply( console, p );
}

// 出场生成随机位置
var randDireAndPos = function( idx ){
    var ret = {
        dire:_.random( 180 + 60, 180 + 60 * 2 ),
        pos:cc.v2( _.random(50,600),_.random(1200,1500) )
    }
    return ret;
}

var level2cfg = function( level ){
    var cfgs = [
        0,
        { radius: 40 },
        { radius: 55 },
        { radius: 75 },
        { radius: 85 },
        { radius: 95 },
    ];
    return cfgs[ level ];
}
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        body: { // 怪物体
            type: cc.Node,
            default:null
        },
        bob: {
            type: cc.Node,
            default: null
        },
        bodyRadius : { // 被攻击减速
            get () {
                return this._bodyRadius;
            },
            set ( val ) {
                this._bodyRadius = val;
            },
            visible: false
        },
        hpLabel : { // 血量文本
            type:cc.Label,
            default:null
        },
        hpNode : { // 血条node
            type:cc.Node,
            default:null
        },
        baseNode : { // 怪物类型5的 底座
            type:cc.Node,
            default:null
        },

        isLowSpeed : { // 被攻击减速
            get () {
                return this._isLowSpeed;
            },
            set ( val ) {
                this._isLowSpeed = val;
            },
            visible: false
        },
        form : { // 第几形态
            get () {
                return this._form;
            },

            set ( val ) {
                this._form = val;
            },
            visible: false
        },
        hp : { // 剩余血量
            get () {
                return this._hp;
            },

            set ( val ) {
                if( val < 0 ) val = 0;
                this._hp = val;
            },
            visible: false
        },
        initHp : { // 血量
            get () {
                return this._initHp;
            },

            set ( val ) {
                this._initHp = val;
            },
            visible: false
        },
        prizeNum : {
            get () {
                return this._prizeNum;
            },

            set ( val ) {
                this._prizeNum = val;
            },
            visible: false
        },
        speed : {
            get () {
                return this._speed;
            },

            set ( val ) {
                this._speed = val;
            },
            visible: false
        },
        direction : {
            get () {
                return this._direction;
            },
            set ( val ) {
                this._direction = val;
                this.resetMathTan();
            },
            visible: false
        },
        monsterSpfram1:{//4帧皮肤
            type: [cc.SpriteFrame],
            default: []
        },
        monsterSpfram2:{//2帧皮肤
            type: [cc.SpriteFrame],
            default: []
        },
        monsterSpfram3:{//1帧皮肤
            type: [cc.SpriteFrame],
            default: []
        },
    },
    
    init ( opts ){
        this.log = app.util.createLog('[ monster ] ', true );
        this.initData(opts);
        this.initUI(opts);


    },

    initData ( opts ) {
        this.opts = opts;
        this.isDead = false;
        this.initHp = this.hp = app.util.parseNum( opts.hp );
         this.prizeNum = opts.prizeNum;
        this.speed = opts.speed;
        this.body.rotation = 0;
        this.aniNode = null;
        this.aniNode1 = null;
        this.hpNode.active = true;
        this.baseNode.active = false
        this.hpNode.getChildByName("Hp").getComponent(cc.Sprite).fillRange = Number(this.hp/this.initHp);

        this.node.position =cc.v2( _.random(50,600),_.random(1200,1500))


        this.resetMathTan();
    },

    initUI (  ) {
        this.cacheInitFrame();

        this.showChilds( true );
        this.hpLabel.node.active = false;
        // this.bob.getComponent(cc.Animation).play('bob1');


        // 重置动画速度
        // this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeed;
        this.updateLbl();

        this.node.stopAllActions();

        this.body.stopAllActions();

        this.node.stopActionByTag( 111 );
        this.node.stopActionByTag( 115 );

        //
        // this.hpSpArr = [
        //     this.node.getChildByName('hp1+'),
        //     this.node.getChildByName('hp2+'),
        //     this.node.getChildByName('hp3+'),
        //     this.node.getChildByName('hp4+'),
        // ];
        //
        // _.forEach( this.hpSpArr, function( node ){
        //     node.active = true;
        //     node.opacity = 0;
        // })
    },

    // 随机一个类型组的皮肤
    randSkin() {
        //this.body.getComponent( cc.Sprite ).spriteFrame = this.monsterSpfram[Number(this.opts.skinId -1)];
    },
    // 创建一个类型的皮肤
    createSkin(skinId) {

        cc.log('skinId',skinId);
        this.skinId = skinId;

        if(this.skinId == 1) {
            this.m_offset = cc.v2(0,151/2);
        } else if(this.skinId == 2 ) {
            this.m_offset = cc.v2(105/4,109/2);
        }else if(this.skinId == 3 ) {
            this.m_offset = cc.v2(70/3,118/2);
        }else if(this.skinId == 4) {
            this.m_offset = cc.v2(0,223/4);
        }else if(this.skinId == 5) {
            this.m_offset = cc.v2(0,20);
        } else if(this.skinId == 6) {
            this.m_offset = cc.v2(0,20);
        } else if(this.skinId == 7) {
            this.m_offset = cc.v2(0,20);
        } else if(this.skinId == 8) {
            this.m_offset = cc.v2(0,150/2);
        }else if(this.skinId == 9) {
            this.m_offset = cc.v2(0,170/2);
        }else if(this.skinId == 10) {
            this.m_offset = cc.v2(0,211/2);
        }

        //this.body.getComponent( cc.Sprite ).spriteFrame = this.monsterSpfram[Number(skinId -1)];
        if(this.opts.monsterType == 4)
        {
            this.body.getComponent(cc.Sprite).spriteFrame = this.monsterSpfram3[0];
        }
        else if(this.opts.monsterType == 5)
        {
            skinId = this.skinId - 7;
            this.baseNode.active = true;
            this.body.getComponent(cc.Sprite).spriteFrame = this.monsterSpfram3[skinId];
        }
        else
        {
            var js = 0;
            var node = this.body;
            node.stopAllActions();
            node.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.callFunc(function () {
                            if (this.skinId > 3) {
                                skinId = this.skinId - 3;
                                js = js >= 2 ? 0 : js;
                                node.getComponent(cc.Sprite).spriteFrame = this.monsterSpfram2[Number(skinId - 1) * 2 + js];
                            }
                            else {
                                js = js >= 4 ? 0 : js;
                                node.getComponent(cc.Sprite).spriteFrame = this.monsterSpfram1[Number(skinId - 1) * 4 + js];
                            }
                            js++;
                        }.bind(this)),
                        cc.delayTime(0.2)
                    )
                )
            );
        }


    },

    // 因为死亡动画会把纹理切成碎掉的，所以缓存一下最开始的纹理，每次reuse设置一下
    cacheInitFrame () {
        var sp = this.body.getComponent(cc.Sprite);
        sp._oldFrame = sp._oldFrame || sp.spriteFrame;
        sp.spriteFrame = sp._oldFrame;
    },

    // 设置lbl
    updateLbl () {
        var val = app.util.formatNum( this.hp );
        this.hpLabel.string = val;
        this.hpNode.getChildByName("Hp").getComponent(cc.Sprite).fillRange = Number(this.hp/this.initHp);
    },
    //弹幕怪
    /*****************移动方式1******************/
    moveOne()
    {
        var t_pos = cc.v2(0,0);
        var t_dest = cc.v2(0,0);
        var t_time = 0;

        t_pos = this.node.position;

        t_dest = cc.v2(t_pos.x, 1136*2/3+this.node.height/2+(_.random( 0, 160 )-80));
        t_time = Math.abs(t_pos.y-t_dest.y)/400;
        var move =  cc.moveTo(t_time,t_dest.x,t_dest.y);
        var call = cc.callFunc(this.moveOneOverCallBack.bind(this));
        var call1 = cc.callFunc(this.fire.bind(this));
        var call2 = cc.callFunc(this.selectedWeapon.bind(this));
        var currentAction = cc.sequence(move,call,call1,call2);
        this.node.runAction(currentAction);
    },
    selectedWeapon()
    {
        var call = cc.callFunc(this.fire.bind(this));
        var call1 = cc.callFunc(this.selectedWeapon.bind(this));
        var currentAction = cc.sequence(cc.delayTime(_.random(1,4)),call,call1);
        this.node.runAction(currentAction);
    },
    moveOneOverCallBack()
    {
        var t_pos= cc.v2(0,0);
        var t_dest= cc.v2(0,0);
        var t_time = 0;
        var t_left;
        var t_right;
        var t_v = _.random(100, 200);

        t_pos = this.node.position;


        var type = _.random(0,2);

        if (type==0)
        {

            t_dest = cc.v2(_.random(0, 640),_.random(1136*2/3, 1136));
            t_time = app.util.v2Distance(t_dest,t_pos)/t_v;

            var move =  cc.moveTo(t_time,t_dest.x,t_dest.y);
            var call = cc.callFunc(this.moveOneOverCallBack.bind(this));
            var currentAction = cc.sequence(move,call);
            this.node.runAction(currentAction);
        }
        else if (type==1)
        {

            t_left = 1136*2/3+(_.random(0,100)-50);
            t_right = 1136 - this.node.height/2;
            t_time = app.util.v2Distance(t_pos, t_dest)/t_v;

            var move1 =  cc.moveTo(t_time/2,t_pos.x,t_right);
            var move2 =  cc.moveTo(t_time/2,t_pos.x,t_left);
            var seq = cc.sequence(move1,move2);
            var rep = cc.repeat(seq,_.random(2, 3));
            var call = cc.callFunc(this.moveOneOverCallBack.bind(this));
            var seq2 = cc.sequence(rep,call);
            this.node.runAction(seq2);
        }
        else if (type==2)
        {

            t_left = 0 + this.node.width/2;
            t_right = 640 - this.node.width/2;
            t_time = app.util.v2Distance(t_pos, t_dest)/t_v;

            var move1 =  cc.moveTo(t_time/2,t_left,t_pos.y);
            var move2 =  cc.moveTo(t_time/2,t_right,t_pos.y);
            var seq = cc.sequence(move1,move2);
            var rep = cc.repeat(seq,_.random(2, 3));
            var call = cc.callFunc(this.moveOneOverCallBack.bind(this));
            var seq2 = cc.sequence(rep,call);
            this.node.runAction(seq2);
        }
    },
    /*****************移动方式1******************/
    //冲击怪
    /*****************移动方式2 不发射子弹******************/
    moveTwo(  _type,  _index ,  _x,  _y)
    {
        cc.log("moveWayForMany=",_type);
        if(_type==0)
        {
            var offset = this.node.width + 15;
            if(_x < (640/2))
            {
                this.node.position = cc.v2(20+_index*offset,(1136+100));
            }
            else
            {
                this.node.position = cc.v2((640-20)-_index*offset,(1136+100));
            }

            this.node.position = cc.v2(20+_index*offset,(1136+100));

            var move =cc.moveBy(3, 0, -(1136+100));
            var call = cc.callFunc(this.moveTwoOverCallBack.bind(this));
            var currentAction = cc.sequence(move,call);
            this.node.runAction(currentAction);
        }
        if(_type==1)
        {
            this.node.position = cc.v2(_x,(1136+100));

            var delay  = cc.delayTime(0.5*_index)
            var move = cc.moveBy(3, cc.v2(0, -(1136+100)))
            var call = cc.callFunc(this.moveTwoOverCallBack.bind(this));
            var currentAction = cc.sequence(delay,move,call);
            this.node.runAction(currentAction);
        }
        if(_type==2)
        {
            if(_y%2==0)
            {
                this.node.position = cc.v2(-100,_y);

                var delay  = cc.delayTime(0.8*(_index))
                var move = cc.moveBy(3, cc.v2((640+100), -(1136/3)))
                var call = cc.callFunc(this.moveTwoOverCallBack.bind(this));
                var currentAction = cc.sequence(delay,move,call);

                this.node.runAction(currentAction);
            }
            else
            {
                this.node.position = cc.v2((640 + 100),_y);

                var delay  = cc.delayTime(0.8*(_index))
                var move = cc.moveBy(3, cc.v2(-(640+100), -(1136/3)))
                var call = cc.callFunc(this.moveTwoOverCallBack.bind(this));
                var currentAction = cc.sequence(delay,move,call);

                this.node.runAction(currentAction);
            }
        }


    },

    moveTwoOverCallBack( )
    {
        app.gameMgr.removeEmy( this );
        this.putToPool();
    },
    /*****************移动方式2不发射子弹******************/
    //宝箱怪
    /*****************移动方式3不发射子弹******************/
    moveThree()
    {
        var t_pos = cc.v2(0,0);
        var t_dest = cc.v2(0,0);
        var t_time = 0;

        t_pos = this.node.position;

        t_dest = cc.v2(t_pos.x, 1136*2/3+this.node.height/2+(_.random( 0, 160 )-80));
        t_time = Math.abs(t_pos.y-t_dest.y)/400;
        var move =  cc.moveTo(t_time,t_dest.x,t_dest.y);
        var call = cc.callFunc(this.moveThreeCallBack.bind(this));
        var currentAction = cc.sequence(move,call);
        this.node.runAction(currentAction);
    },
    moveThreeCallBack( _target)
    {
        var t_pos= cc.v2(0,0);
        var t_dest= cc.v2(0,0);
        var t_time = 0;
        var t_left;
        var t_right;
        var t_v = _.random(100, 200);

        t_pos = this.node.position;


        var type = _.random(0,2);

        if (type==0)
        {

            t_dest = cc.v2(_.random(0, 640),_.random(1136*2/3, 1136));
            t_time = app.util.v2Distance(t_dest,t_pos)/t_v;

            var move =  cc.moveTo(t_time,t_dest.x,t_dest.y);
            var call = cc.callFunc(this.moveThreeCallBack.bind(this));
            var currentAction = cc.sequence(move,call);
            this.node.runAction(currentAction);
        }
        else if (type==1)
        {

            t_left = 1136*2/3+(_.random(0,100)-50);
            t_right = 1136 - this.node.height/2;
            t_time = app.util.v2Distance(t_pos, t_dest)/t_v;

            var move1 =  cc.moveTo(t_time/2,t_pos.x,t_right);
            var move2 =  cc.moveTo(t_time/2,t_pos.x,t_left);
            var seq = cc.sequence(move1,move2);
            var rep = cc.repeat(seq,_.random(2, 3));
            var call = cc.callFunc(this.moveThreeCallBack.bind(this));
            var seq2 = cc.sequence(rep,call);
            this.node.runAction(seq2);
        }
        else if (type==2)
        {

            t_left = 0 + this.node.width/2;
            t_right = 640 - this.node.width/2;
            t_time = app.util.v2Distance(t_pos, t_dest)/t_v;

            var move1 =  cc.moveTo(t_time/2,t_left,t_pos.y);
            var move2 =  cc.moveTo(t_time/2,t_right,t_pos.y);
            var seq = cc.sequence(move1,move2);
            var rep = cc.repeat(seq,_.random(2, 3));
            var call = cc.callFunc(this.moveThreeCallBack.bind(this));
            var seq2 = cc.sequence(rep,call);
            this.node.runAction(seq2);
        }
    },
    /*****************移动方式3不发射子弹******************/
    /*****************移动方式4跟随地图移动******************/
    moveFour()
    {
        var call1 = cc.callFunc(this.moveFourCallBack.bind(this));
        var currentAction = cc.sequence(cc.delayTime(_.random(3,5)),call1);
        this.node.runAction(currentAction);
    },
    moveFourCallBack( _target)
    {
        var call = cc.callFunc(this.fire.bind(this));
        var call1 = cc.callFunc(this.moveFourCallBack.bind(this));
        var currentAction = cc.sequence(cc.delayTime(_.random(1,4)),call,call1);
        this.node.runAction(currentAction);
    },
    /*****************移动方式4跟随地图移动******************/
    fire()
    {
        var m_rowsNum = 0;//行数
        var m_columnsNum = 0;//列数
        var m_isTrace = false;//是否追踪
        var m_isCircle = false;//是否成圈
        var m_bulletType = 1;//_.random(1,6);
        var m_speed = 10;//速度
        var m_attack = this.opts.attack;//攻击
        var rotation = 0;
        var data = app.json.tbMonster_ly.json;
        for(var i=0;i<data.length;i++)
        {
            if(data[i].monster_id == this.opts.monsterId)
            {
                var barrageListArr = JSON.parse( data[i].barrage_id);
                var indx = _.random(0,barrageListArr.length -1);
                m_bulletType = barrageListArr[indx];
                break;
            }
        }




        //1.单颗子弹 直线向下发射
        if(m_bulletType == 1)
        {
            m_rowsNum = 1;
            m_columnsNum = 1;
            m_isTrace = false;
            m_isCircle = false;
        }
        //2.单颗子弹 直线追踪发射
        else  if(m_bulletType == 2)
        {
            rotation = this.node.rotation;
            m_rowsNum = 1;
            m_columnsNum = 1;
            m_isTrace = true;
            m_isCircle = false;
        }
        //3.三颗子弹 直线向下发射
        else  if(m_bulletType == 3)
        {
            m_rowsNum = 3;
            m_columnsNum = 1;
            m_isTrace = false;
            m_isCircle = false;
        }
        //4.三行 三列子弹 扇形追踪发射
        else  if(m_bulletType == 4)
        {
            m_rowsNum = 3;
            m_columnsNum = 3;
            m_isTrace = true;
            m_isCircle = false;
        }
        //5.单行子弹 成圈发射
        else  if(m_bulletType == 5)
        {
            m_rowsNum = 1;
            m_columnsNum = 36;
            m_isTrace = false;
            m_isCircle = true;
        }
        //6.两行子弹 成圈发射
        else  if(m_bulletType == 6)
        {
            m_rowsNum = 2;
            m_columnsNum = 36;
            m_isTrace = false;
            m_isCircle = true;
        }
        //7.30行 3列 扇形发射
        else  if(m_bulletType == 7)
        {
            m_rowsNum = 15;
            m_columnsNum = 3;
            m_isTrace = false;
            m_isCircle = false;
            firePoint =  cc.v2(this.node.x - 50,this.node.y)
            app.gameMgr.newBulletBoss1(
                firePoint,
                {
                    rotation:rotation,
                    offset: this.m_offset,
                    attack:m_attack,
                    bulletType:m_bulletType,
                    speed:m_speed,
                    rowsNum:m_rowsNum,//行数
                    columnsNum:m_columnsNum,//列数
                    isTrace:m_isTrace,//是否追踪
                    isCircle:m_isCircle//是否成圈
                }
            );

            firePoint =  cc.v2(this.node.x + 50,this.node.y)
            app.gameMgr.newBulletBoss1(
                firePoint,
                {
                    rotation:rotation,
                    offset: this.m_offset,
                    attack:m_attack,
                    bulletType:m_bulletType,
                    speed:m_speed,
                    rowsNum:m_rowsNum,//行数
                    columnsNum:m_columnsNum,//列数
                    isTrace:m_isTrace,//是否追踪
                    isCircle:m_isCircle//是否成圈
                }
            );
            return ;
        }


        app.gameMgr.newBulletMonster1(
            this,
            {
                rotation:rotation,
                offset: this.m_offset,
                attack:m_attack,
                bulletType:m_bulletType,
                speed:m_speed,
                rowsNum:m_rowsNum,//行数
                columnsNum:m_columnsNum,//列数
                isTrace:m_isTrace,//是否追踪
                isCircle:m_isCircle//是否成圈
            }
        );
    },
    // 检测与 位置pos，半径radius 的球是否碰撞
    collision( pos, radius ){

        // var enemyRect = enemy.node.getBoundingBox();
        // var bulletRect = this.node.getBoundingBox();
        // var result = cc.Intersection.rectRect(enemyRect,bulletRect);
        // return result;


        // if( this.node.y - this.bodyRadius > 1136 ) return false;
        // radius = radius || 50;
        // var ret = false;
        // if( pos.distance(this.node.position) <= ( this.bodyRadius + radius ) ) {
        //     ret = true;
        // }
        // return false;

        return false;

    },

    // 检测是否撞墙了
    checkCollisionScreen(){
        // var colLeft,colRight,colTop;
        // colLeft = colRight = colTop = false;
        // if( ( this.direction >= 90 && this.direction <= 270 ) && this.node.position.x - this.bodyRadius <= 0 ) {
        //     colLeft = true;
        // }
        // if( ( this.direction >= 270 || this.direction <= 90 ) && this.node.position.x + this.bodyRadius >= app.designSize.width ){
        //     colRight = true;
        // }
        //
        // if( this.node.position.y + this.bodyRadius >= app.designSize.height && ( this.direction > 0 && this.direction < 180 ) ){
        //     colTop = true;
        // }
        //
        // if( colLeft ){
        //     log('left ' + this.direction + " : " +  (180 + 360 - this.direction) % 360);
        //     this.direction = (180 + 360 - this.direction) % 360;
        //     this.resetMathTan();
        // }else if( colRight ){
        //     log('right ' + this.direction + " : " +  (360 - this.direction) ) ;
        //     this.direction = (180 + 360 - this.direction) % 360;
        //     this.resetMathTan();
        // }
        //
        // if( colTop ){
        //     log('top ' + this.direction + " : " +  (360 - this.direction) ) ;
        //     this.direction = 360 - this.direction;
        //     this.resetMathTan();
        // }
        
        this.checkOutScreen();
    },

    // 检查是否掉出屏幕外
    checkOutScreen () {
        // if( this.node.position.y + this.bodyRadius < 0 ){
        //     //this.node.y += 1200 + this.bodyRadius * 2;
        //     this.putToPool();
        // }
    },

    // 缓存tan值
    resetMathTan () {
        // this._mathTan = Math.tan( app.util.angle2radians( this.direction ) );
    },
    
    // 移动的计算
    stepUpdate ( dt ) {

        this.checkCollisionScreen();
        //console.log('this.isDead',this.isDead);
        if(this.opts.monsterType == 5)
        {
            var dis = dt * app.G.MOVESPEED_MAP;
            this.node.y -= dis;
            if(this.node.y < 0)
            {
                app.gameMgr.removeEmy( this );
                this.putToPool();
            }

            //计算角度
            var p1 = this.node.position;
            var p2 = app.gameMgr.plane.node.position;
            //cc.log("p1=",p1);
            // cc.log("p2=",p2);
            var angle = Math.atan2( (p2.x-p1.x),(p2.y-p1.y)) //弧度  0.6435011087932844
            var theta = angle*(180/Math.PI); //角度  36.86989764584402
            this.body.rotation = 180+theta;

        }



        //
        // var speed = 50;
        // if( this.isLowSpeed ) {
        //     speed = speed / 2;
        // }
        //
        // var dis = dt * speed;
        //
        // var offy = dis * (this.direction > 180 ? -1 : 1) ;
        // var offx = offy / this._mathTan ;
        //
        // this.node.x += offx;
        // this.node.y += offy;

        // console.log( this.isLowSpeed, offy );
        // this.node.x = this.node.y = 0;
    },

    handleEvent ( name, param ) {
        switch( name ){
            case app.enum.event.GAME_PAUSE:
                if( !param ) {
                    this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeed / 10;
                }else{
                    this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeed;
                }
            break;
        }
    },

    // 被攻击
    beFire ( bullet ){
        var hurt = bullet.getSkillHurt();
        if( app.debug.baozou ){
            // hurt = 100;
        }
        this.releaseHp( hurt );
        this.releaseSpeedAndAni();
    },

    // 被攻击时减速 被攻击动画
    releaseSpeedAndAni () {
        // this.isLowSpeed = true;
        //
        // this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeedFast;
        //
        // var resume = function() {
        //     this.isLowSpeed = false;
        //     this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeed;
        // };
        //
        //
        // var offwidth = 0.1;
        // if( offwidth * this.bodyRadius < 5 ) {
        //     offwidth = 0.2;
        // }else if( offwidth * this.bodyRadius > 20 ) {
        //     offwidth = 0.13;
        // }
        //
        // var scale = cc.scaleTo( this.bodyRadius * offwidth / 200, 1 );
        // var delay = cc.delayTime( 0.1 );
        // var call1 = cc.callFunc( resume.bind( this ) );
        //
        // var seq = cc.sequence( scale, delay, call1 );
        // seq.setTag( tagSpeedRelease );
        //
        // this.bob.parent.scale = 1 - offwidth;
        // this.bob.parent.stopActionByTag( tagSpeedRelease );
        // this.bob.parent.runAction( seq );
    },

    releaseHp ( hp ){
        hp = Number( hp );
        this.hp -= hp;
        this.updateLbl();
    },

    reuse () {
        app.event.add( this );
    },

    unuse () {
        app.event.remove( this ) ;
    },

    //播放死亡动画 完成后回收
    playDeadAni () {
        if(this.isDead == true)
            return;

        this.node.stopAllActions();
        this.isDead = true;
        this.hpLabel.node.active = false;
        this.hpNode.active = false;
        this.showChilds( false );

        var randIdx = _.random( 1, 4 );
        this.node.stopActionByTag( 112 );
        
        this.node.stopActionByTag( 111 );
        this.node.stopActionByTag( 116 );
        
        _.forEach( this.hpSpArr, function( node ){
            node.stopActionByTag( 115 );
            node.opacity = 0;
        })




        app.audioMgr.play(app.audioMgr.audioBoss1Bomb);

        // var aniNode = app.resMgr.getNewMonsterBoom(randIdx);
        // aniNode.parent = this.node;
        // aniNode.name =  'dead-ani';
        // aniNode.scale = 2;
        // aniNode.rotation = _.random( 50, 300 );
        // aniNode.children[0].scale = 0.3 / this.node.scale;
        // aniNode.children[0].getComponent( dragonBones.ArmatureDisplay ).playAnimation( 'newAnimation', 1 );
        // var ani = aniNode.getComponent( dragonBones.ArmatureDisplay );
        // ani.playAnimation( 'Sprite', 1 );
        // ani.addEventListener(dragonBones.EventObject.COMPLETE,this.putToPool,this );

        if( this.skinId <= 3)
        {
            if(app.gameMgr.plane.planeBulletId == app.G.BULLET_3)
            {
                this.aniNode1 = app.resMgr.getPlaneBoom2();
                this.aniNode1.parent = app.gameMgr.node;
                this.aniNode1.zIndex = app.G.LAYER_BOOM;
                this.aniNode1.position = this.node.position;
                this.aniNode1.name = 'dead-ani1';
                var ani = this.aniNode1.getComponent(cc.Animation);
                ani.play('huohua1');
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.putToPool();
                    }.bind(this))
                ));
            }
            else {
                this.aniNode1 = app.resMgr.getPlaneBoom1();
                this.aniNode1.parent = app.gameMgr.node;
                this.aniNode1.zIndex = app.G.LAYER_PARTICLE;
                this.aniNode1.position = this.node.position;
                this.aniNode1.name = 'dead-ani2';
                var ani = this.aniNode1.getComponent(cc.Animation);
                ani.play('huohua');
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.putToPool();
                    }.bind(this))
                ));
            }
        }
        else {
            this.aniNode = app.resMgr.getNewBoss1Bomb();
            this.aniNode.parent = app.gameMgr.node;
            this.aniNode.zIndex = app.G.LAYER_PARTICLE;
            this.aniNode.position = this.node.position;
            this.aniNode.scale = 1;
            this.aniNode.getComponent(cc.ParticleSystem).resetSystem();
            this.aniNode.name = 'dead-ani';
            this.node.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.callFunc(function () {
                    var curlevel = app.player.get('level');
                    if(this.opts.monsterType == 4 && app.gameMgr.isGameOver == false)
                    {
                        app.pop.push( app.resMgr.prefPopRandPrize2Box );
                    }
                    this.putToPool();
                }.bind(this))
            ));
        }
    },

    //回收
    putToPool () {
        if(this.aniNode ){

            app.resMgr.poolBoss1Bomb.put( this.aniNode );
        }
        if(this.aniNode1 ){
            if(this.aniNode1.name == 'dead-ani1')
            {
                app.resMgr.poolPlaneBoom2.put( this.aniNode1 );
            }
            else  if(this.aniNode1.name == 'dead-ani2')
            {
                app.resMgr.poolPlaneBoom1.put( this.aniNode1 );
            }

        }
        app.resMgr.poolEnemy.put( this.node );
    },

    //所有子节点的显示隐藏
    showChilds ( ret ) {
        for( var i in this.node.children ){
            var node = this.node.children[i];
            if(node.name == "base" && ret == true)
            {
                continue;
            }
            this.node.children[i].active = ret;
        }
    },

    //释放boss技能1
    startBossSkill( off ){
        // var toHp = this.hp + off;
        // if( toHp <= 0 ) {
        //     toHp = 1;
        // }
        // off = toHp - this.hp;
        // var offEveryAct = Math.floor( off / ( 2 / 0.2 ) );
        // if( offEveryAct == 0 && off < 0 ){
        //     offEveryAct = -1;
        // }
        // if( offEveryAct == 0 && off > 0 ){
        //     offEveryAct = 1;
        // }
        //
        // this.node.stopActionByTag( 111 );
        // var act = cc.repeat( cc.sequence(
        //     cc.delayTime(0.1),
        //     cc.callFunc( function(){
        //         this.hp += offEveryAct;
        //         if( off < 0 && this.hp <= 1 ){
        //             this.hp = 1;
        //             this.node.stopActionByTag( 111 );
        //         }
        //         if( off > 0 && this.hp >= toHp ){
        //             this.node.stopActionByTag( 111 );
        //             this.hp = toHp;
        //         }
        //         this.updateLbl();
        //     }.bind( this ))
        //     ), 10
        // );
        // act.setTag( 111 );
        //
        // this.node.runAction( act );
        //
        // if( off > 0 ){
        //     var self = this;
        //     var act = cc.sequence(
        //         cc.repeat(
        //             cc.sequence(
        //                 cc.callFunc(function(){
        //                     var actNode = null;
        //                     _.forEach( self.hpSpArr, function( node ){
        //                         if( !node.getActionByTag( 115 ) ){
        //                             actNode = node;
        //                         }
        //                     });
        //                     if( !actNode ){
        //                         actNode = self.hpSpArr[0];
        //                         actNode.stopActionByTag( 115 );
        //                     }
        //
        //                     actNode.opacity = 255;
        //                     var act =  cc.sequence(
        //                         cc.spawn(
        //                             cc.sequence(
        //                                 cc.scaleTo( 0.15, 1.3 ),
        //                                 cc.scaleTo( 0.35, 0.3 ),
        //                             ),
        //                             cc.moveBy( 0.5, 0 ,150 ).easing( cc.easeOut( 2 ) )
        //                         ),
        //                         cc.callFunc( function(){
        //                             actNode.scale = 1;
        //                             actNode.y = 1;
        //                             var ret = false;
        //
        //                             if( off < 0 && self.hp <= 1 ){
        //                                 ret = true;
        //                             }
        //                             if( off > 0 && self.hp >= toHp ){
        //                                 ret = true;
        //                             }
        //                             if( ret ){
        //                                 _.forEach( self.hpSpArr, function( node ){
        //                                     node.stopActionByTag( 115 );
        //                                     node.opacity = 0;
        //                                     self.node.stopActionByTag( 116 );
        //                                 });
        //                             }else{
        //                                 actNode.y = 57;
        //                                 actNode.scale = 1;
        //                             }
        //                         })
        //                     );
        //                     act.setTag( 115 )
        //                     actNode.runAction( act );
        //                 }),
        //                 cc.delayTime( 0.2 ),
        //             ), 10
        //         ),
        //         cc.callFunc(function(){
        //             _.forEach( self.hpSpArr, function( node ){
        //                 node.stopActionByTag( 115 );
        //                 node.opacity = 0;
        //             });
        //         })
        //     )
        //     act.setTag( 116 );
        //     this.node.runAction( act );
        // }
    },
    //释放boss技能2 被boss吸收
    beAbsorbed( bossNode ){
        // this._isBeAbsorbed = true;
        // var arr = [];
        // arr.push( cc.moveTo(1, bossNode.position ).easing( cc.easeIn(3) ) );
        // arr.push( cc.scaleTo(1, 0 ).easing( cc.easeIn(5) ) );
        // var act = cc.spawn( arr );
        // act.setTag( 112 );
        // this.node.runAction( act );
    },
    //释放boss技能2 被boss放出来
    beFreed( bossNode ){
        // var dire = _.random( 1, 360 );
        // var bossPos = bossNode.position;
        // this.node.position = bossPos;
        // var posx = bossPos.x + 130 * Math.cos( dire );
        // var posy = bossPos.y + 130 * Math.sin( dire );
        //
        // if( posx - this.bodyRadius < 0 ){
        //     posx = this.bodyRadius;
        // }else if( posx + this.bodyRadius > 640 ){
        //     posx = 640 - this.bodyRadius;
        // }
        //
        // if( posy + this.bodyRadius > 1136 ){
        //     this.posy = 1136 - this.bodyRadius;
        // }else if( posy - this.bodyRadius < 0 ){
        //     posy = this.bodyRadius;
        // }
        //
        // var arr = [];
        // arr.push( cc.moveTo(0.5, cc.v2( posx, posy ) ).easing( cc.easeIn(3) ) );
        // arr.push( cc.scaleTo(0.5, this.bodyRadius / (this.bob.width / 2) ).easing( cc.easeIn(3) ) );
        // var act = cc.sequence(
        //     cc.spawn( arr ),
        //     cc.callFunc(function(){
        //         this._isBeAbsorbed = false;
        //     }.bind( this ))
        // );
        // act.setTag( 112 );
        // this.node.runAction( act );
    },

});
