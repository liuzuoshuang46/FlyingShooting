// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var logret = true;
var speedReleaseDt = 0.2; // 被攻击减速时长
var monsterAniSpeed = 0.1;
var monsterAniSpeedFast = 1;
var tagSpeedRelease = 101;
var radius = 150;

// 出场生成随机位置
var randDireAndPos = function( idx ){
    var ret = {
        dire:_.random( 180 + 60, 180 + 60 * 2 ),
        pos:cc.v2( _.random(50,600),_.random(1300,1700) + idx * 800 )
    }
    return ret;
}

cc.Class({
    extends: cc.Component,

    properties: {
        logTips:{
            type: cc.Node,
            default: null
        },
        body: { // 怪物体
            type: cc.Node,
            default:null
        },
        bob: {
            type: cc.Node,
            default: null
        },
        bodyRadius : {
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
                return 1;
            },

            set ( val ) {
                
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
    },
    
    init ( opts ){
        this.log = app.util.createLog('[ monster-boss ] ', false );
        this.initData(opts);
        this.initUI(opts);
    },

    initData ( opts ) {
        this.opts = opts;

        // console.log('11111111  mboss',opts);
        // if( !opts.target_form ){
        //     return;
        // }
        this.bodyRadius = radius;
        this.initHp = this.hp = app.util.parseNum( opts.hp );
        this.target_son = opts.target_son;
        this.form = opts.target_form;
        this.prizeNum = opts.prizeNum;
        this.speed = opts.speed;
        this.skillDt = 0;

        // 生成出场位置
        var randResult = randDireAndPos( this.opts.randIdx );
        this.direction = randResult.dire;
        this.node.position = randResult.pos;

        this.resetMathTan();
    },

    initUI (  ) {
        this.showChilds( true ); 
        this.hpLabel.node.active = true;
        this.bob.getComponent(cc.Animation).play('bob1');

        // 根据半径调整缩放
        this.node.scale = this.bodyRadius / (this.bob.width / 2);

        // 重置动画速度
        this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeed;
        this.updateLbl();

        this.node.stopAllActions();
        this.body.stopAllActions();
        this.body.rotation = _.random( 30, 330 );
        this.body.runAction( cc.repeatForever( cc.rotateBy( 5, 360 )) );
        this.logTips.active = false;

        if( this.opts.tbData.boss_skill == 1 ){
            this.bob.getChildByName('dra').children[0].active = true;
            this.bob.getChildByName('dra').children[1].active = false;
        }else{
            this.bob.getChildByName('dra').children[0].active = false;
            this.bob.getChildByName('dra').children[1].active = true;
        }

        this.hpSpArr = [
            this.node.getChildByName('hp1+'),
            this.node.getChildByName('hp2+'),
            this.node.getChildByName('hp3+'),
            this.node.getChildByName('hp4+'),
        ];
        
        _.forEach( this.hpSpArr, function( node ){
            node.active = true;
            node.opacity = 0;
        })
    },
    
    // 设置lbl
    updateLbl () {
        var val = app.util.formatNum( this.hp );
        this.log( this.hp, val )
        this.hpLabel.string = val;
    },

    // 检测与 位置pos，半径radius 的球是否碰撞
    collision( pos, radius ){
        if( this.node.y - this.bodyRadius > 1136 ) return false;
        radius = radius || 50;
        var ret = false;
        if( pos.distance(this.node.position) <= ( this.bodyRadius + radius ) ) {
            ret = true;
        }
        return ret;
    },

    // 检测是否撞墙了
    checkCollisionScreen(){
        var colLeft,colRight,colTop;
        colLeft = colRight = colTop = false;
        if( ( this.direction >= 90 && this.direction <= 270 ) && this.node.position.x - this.bodyRadius <= 0 ) {
            colLeft = true;
        }
        if( ( this.direction >= 270 || this.direction <= 90 ) && this.node.position.x + this.bodyRadius >= cc.winSize.width ){
            colRight = true;
        }

        if( this.node.position.y + this.bodyRadius >= cc.winSize.height && ( this.direction > 0 && this.direction < 180 ) ){
            colTop = true;
        }

        if( colLeft ){
            this.log('left ' + this.direction + " : " +  (180 + 360 - this.direction) % 360);
            this.direction = (180 + 360 - this.direction) % 360;
            this.resetMathTan();
        }else if( colRight ){
            this.log('right ' + this.direction + " : " +  (360 - this.direction) ) ;
            this.direction = (180 + 360 - this.direction) % 360;
            this.resetMathTan();
        }
        
        if( colTop ){
            this.log('top ' + this.direction + " : " +  (360 - this.direction) ) ;
            this.direction = 360 - this.direction;
            this.resetMathTan();
        }
        
        this.checkOutScreen();
    },

    // 检查是否掉出屏幕外
    checkOutScreen () {
        if( this.node.position.y + this.bodyRadius < 0 ){
            this.node.y += 1200 + this.bodyRadius * 2;
        }
    },

    // 缓存tan值
    resetMathTan () {
        this._mathTan = Math.tan( app.util.angle2radians( this.direction ) );
    },
    
    // 移动的计算
    stepUpdate ( dt ) {
        this.checkCollisionScreen();
        
        var speed = this.speed;
        if( app.gameMgr.isPause ) speed = 30;
        if( this.isLowSpeed ) {
            speed = speed / 2;
        }

        var speed_reduce = app.gameMgr.buffMgr.speed_reduce();
        var speed_add = app.gameMgr.buffMgr.speed_add();
        var offPrecent = speed_add - speed_reduce;
        speed *= ( 1 + offPrecent );

        var dis = dt * speed;

        var offy = dis * (this.direction > 180 ? -1 : 1) ;
        var offx = offy / this._mathTan ;

        this.node.x += offx;
        this.node.y += offy;

        if( this.node.y - this.bodyRadius < 700 ){
            this.checkSkill( dt );
        }
        
    },

    checkSkill( dt ){
        var tbData = this.opts.tbData;
        this.skillDt = this.skillDt || 0;
        if( this.skillDt < 0 ){
            if( tbData.boss_skill == 1 ){
                var leftHpPercent = this.hp / this.initHp;
                if( leftHpPercent < 0.5 ){
                    this.useSkill1();
                    this.skillDt = tbData.skill_interval;
                }
            }else{
                this.useSkill2();
                this.skillDt = tbData.skill_interval;
            }
        }
        this.skillDt -= dt;
    },

    useSkill1(){ // 吸小怪血
        var node = this.node.getChildByName( 'bob' ).getChildByName('skill');
        node.children[0].active = true;
        node.children[1].active = false;
        node = node.children[0];

        this.logTips.active = true;
        this.logTips.children[0].getComponent( cc.Label ).string = this.opts.tbData.voice;

        var dra = node.getComponent( dragonBones.ArmatureDisplay );
        dra.playAnimation('newAnimation', 1 );

        dra.addEventListener(dragonBones.EventObject.COMPLETE, function(){
            node.active = false;
            this.node.runAction( cc.sequence(
                cc.delayTime( 1 ),
                cc.callFunc( function(){
                    this.logTips.active = false;
                }.bind( this ))
            ));
        }.bind( this ));

        var allMonster = app.gameMgr._enemys;
        var self = this;
        var selectedArr = _.filter( allMonster, function( monster ){
            var dis = app.util.v2Distance( monster.node.position, self.node.position ) - self.bodyRadius;
            return dis <= self.opts.tbData.scope;
        })

        this._absorbMonsterArr = this._absorbMonsterArr || [];
        for( var i in selectedArr ){
            var monster = selectedArr[ i ];
            var offHp = _.random( app.util.parseNum( this.opts.tbData.powe_hp_min ),app.util.parseNum( this.opts.tbData.powe_hp_max ) )
            offHp = offHp * ( this.opts.tbData.boss_skill == 1  ? -1 : 1 );
            monster.beAbsorbed( this.node );
            this._absorbMonsterArr.push( monster );
        }
        
        this.startBossSkill( Math.ceil( this.initHp * 0.2 ) );
    },

    useSkill2(){ // 给小怪加血
        var node = this.node.getChildByName( 'bob' ).getChildByName('skill');
        node.children[0].active = false;
        node.children[1].active = true;
        node = node.children[1];

        this.logTips.active = true;
        this.logTips.children[0].getComponent( cc.Label ).string = this.opts.tbData.voice;

        var dra = node.getComponent( dragonBones.ArmatureDisplay );
        dra.playAnimation('newAnimation', 1 );

        dra.addEventListener(dragonBones.EventObject.COMPLETE, function(){
            this.node.runAction( cc.sequence(
                cc.delayTime( 1 ),
                cc.callFunc( function(){
                    this.logTips.active = false;
                }.bind( this ))
            ));
            node.active = false;
        }.bind( this ));


        var allMonster = app.gameMgr._enemys;
        var self = this;
        var changeHpMonsterArr = _.filter( allMonster, function( monster ){
            var dis = app.util.v2Distance( monster.node.position, self.node.position ) - self.bodyRadius;
            return dis <= self.opts.tbData.scope;
        })

        for( var i in changeHpMonsterArr ){
            var monster = changeHpMonsterArr[ i ];
            var offHp = _.random( app.util.parseNum( this.opts.tbData.powe_hp_min ),app.util.parseNum( this.opts.tbData.powe_hp_max ) )
            offHp = offHp * ( this.opts.tbData.boss_skill == 1  ? -1 : 1 );
            monster.startBossSkill( offHp );
        }
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
        this.isLowSpeed = true;

        this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeedFast;

        var resume = function() {
            this.isLowSpeed = false;
            this.bob.getComponent(cc.Animation).getAnimationState('bob1').speed = monsterAniSpeed;
        };
        
        var offwidth = 0.13;
        var nodeScale = this.bodyRadius / (this.bob.width / 2);

        var scale = cc.scaleTo( this.bodyRadius * offwidth / 200, nodeScale );
        var delay = cc.delayTime( 0.1 );
        var call1 = cc.callFunc( resume.bind( this ) );

        var seq = cc.sequence( scale, delay, call1 );
        seq.setTag( tagSpeedRelease );

        this.node.scale = nodeScale - offwidth;
        this.node.stopActionByTag( tagSpeedRelease );
        this.node.runAction( seq );
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

    playDeadAni () {
        
        if( this._absorbMonsterArr && this._absorbMonsterArr.length ){
            for( var i in this._absorbMonsterArr ){
                this._absorbMonsterArr[i].beFreed( this.node );
            }
            delete this._absorbMonsterArr;
        }
        this.node.stopActionByTag( 111 );
        this.node.stopActionByTag( 116 );
        
        _.forEach( this.hpSpArr, function( node ){
            node.stopActionByTag( 115 );
            node.opacity = 0;
        })

        this.node.runAction( cc.sequence(
            cc.delayTime( 0.5 ),
            cc.callFunc( function(){
                this.hpLabel.node.active = false;
                this.showChilds( false ); 
        
                var randIdx = _.random( 1, 4 );
                var aniNode = app.resMgr.getNewMonsterBoom(randIdx);
                aniNode.parent = this.node;
                aniNode.name =  'dead-ani';
                aniNode.scale = 2;
                aniNode.rotation = _.random( 50, 300 );
                aniNode.children[0].scale = 0.3 / this.node.scale;
                aniNode.children[0].getComponent( dragonBones.ArmatureDisplay ).playAnimation( 'newAnimation', 1 );
                
                var ani = aniNode.getComponent( dragonBones.ArmatureDisplay );
                ani.playAnimation( 'Sprite', 1 );
                ani.addEventListener(dragonBones.EventObject.COMPLETE,this.putToPool,this );
            }.bind( this ))
        ) );
    },

    putToPool () {
        var aniNode = this.node.getChildByName( 'dead-ani' );
        if( aniNode ){
            aniNode.getComponent( dragonBones.ArmatureDisplay ).removeEventListener(dragonBones.EventObject.COMPLETE,this.putToPool,this );
            aniNode.__pool.put( aniNode );
        }
        app.resMgr.poolMonsterBoss.put( this.node );
    },

    showChilds ( ret ) {
        for( var i in this.node.children ){
            this.node.children[i].active = ret;
        }
    },
    startBossSkill( off ){

        var toHp = this.hp + off;
        if( toHp <= 0 ) {
            toHp = 1;
        }

        var offEveryAct = Math.floor( off / ( 2 / 0.2 ) );
        var act = cc.repeat( cc.sequence(
            cc.delayTime(0.2),
            cc.callFunc( function(){
                this.hp += offEveryAct;
                var stop = false;
                if( off < 0 && this.hp <= 1 ){
                    stop = true;
                    this.hp = 1;
                }
                if( off > 0 && this.hp >= toHp ){
                    stop = true;
                    this.hp = toHp;
                }
                this.updateLbl();
                if( stop ){
                    this.node.stopActionByTag( 111 );
                }
            }.bind( this ))
            ),10
        );
        act.setTag( 111 );
        
        this.node.runAction( act );

        app.gameMgr._bossSkillTime = true;
        var offwidth = 0.5;
        var nodeScale = this.bodyRadius / (this.bob.width / 2);
        var scale = cc.scaleTo( 1, nodeScale ).easing( cc.easeBackOut( 10 ) );
        var seq = cc.sequence( scale, cc.callFunc(function(){
            app.gameMgr._bossSkillTime = false;
        }))
        seq.setTag( tagSpeedRelease );

        this.node.scale = nodeScale - offwidth;
        this.node.stopActionByTag( tagSpeedRelease );
        this.node.runAction( seq );

        if( off > 0 ){
            var self = this;
            var act = cc.sequence(
                cc.repeat(
                    cc.sequence(
                        cc.callFunc(function(){
                            var actNode = null;
                            _.forEach( self.hpSpArr, function( node ){
                                if( !node.getActionByTag( 115 ) ){
                                    actNode = node;
                                }
                            });
                            if( !actNode ){
                                actNode = self.hpSpArr[0];
                                actNode.stopActionByTag( 115 );
                            }
    
                            actNode.opacity = 255;
                            var act =  cc.sequence(
                                cc.spawn(
                                    cc.sequence(
                                        cc.scaleTo( 0.15, 1.3 ),
                                        cc.scaleTo( 0.35, 0.3 ),
                                    ),
                                    cc.moveBy( 0.5, 0 ,150 ).easing( cc.easeOut( 2 ) )
                                ),
                                cc.callFunc( function(){
                                    actNode.scale = 1;
                                    actNode.y = 1;
                                    var ret = false;
    
                                    if( off < 0 && self.hp <= 1 ){
                                        ret = true;
                                    }
                                    if( off > 0 && self.hp >= toHp ){
                                        ret = true;
                                    }
                                    if( ret ){
                                        _.forEach( self.hpSpArr, function( node ){
                                            node.stopActionByTag( 115 );
                                            node.opacity = 0;
                                            self.node.stopActionByTag( 116 );
                                        });
                                    }else{
                                        actNode.y = 57;
                                        actNode.scale = 1;
                                    }
                                })
                            );
                            act.setTag( 115 )
                            actNode.runAction( act );
                        }),
                        cc.delayTime( 0.2 ),
                    ), 10
                ),
                cc.callFunc( function(){
                    _.forEach( self.hpSpArr, function( node ){
                        node.stopActionByTag( 115 );
                        node.opacity = 0;
                    });
                })
            );
            act.setTag( 116 );
            this.node.runAction( act );
        }
    }
});
