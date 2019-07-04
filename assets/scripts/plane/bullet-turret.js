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
        body: {
            type: cc.Node,
            default: null
        },
        isDead: {
            get () {
                return this._isDead;
            },
            set ( val ) {
                this._isDead = val;
            },
            visible: false
        },
        _bulletData : {
            get () {
                return this.m_bulletData;
            },
            set ( bulletData ) {
                this.m_bulletData = bulletData;
            }
        },
        spBullet : cc.Sprite
    },

    reuse () {
        app.gameMgr.pushBullet( this );
    },

    unuse () {
        app.gameMgr.removeBullet( this );
    },

    // 检测撞到怪物
    collisionWithEnemy ( enemy ){

        var yvalue = Math.abs(enemy.node.y - this.node.y);
        if(yvalue > cc.winSize.height/3)
        {
            return false;
        }
        var enemyRect = enemy.node.getBoundingBox();
        var bulletRect = this.node.getBoundingBox();
        //cc.log("enemyRect=",enemyRect,";bulletRect=",bulletRect);
        var result = enemyRect.intersects(bulletRect);//cc.Intersection.rectRect(enemyRect,bulletRect);
        return result;

        // var dis = enemy.bodyRadius + this._bulletData.bullet_range / 2;
        //
        // var offx = enemy.node.x - this.node.x;
        // if( offx < 0 ) {
        //     offx = -offx;
        // }
        // if( offx > dis ){
        //     return false;
        // }
        //
        // var offy = enemy.node.y - this.node.y;
        // if( offy < 0 ) {
        //     offy = -offy;
        // }
        // if( offy > dis ){
        //     return false;
        // }
        //
        // return true;
    },

    showOnPlane ( plane, pos ) {
        this.node.position = pos;
        //var toScale = this.node.scale;

        if(this.posId == 1)
            this.node.rotation = -100;
        else if(this.posId == 2)
            this.node.rotation = -90;
        else if(this.posId == 3)
            this.node.rotation = -80;

        this.node.y += plane.node.height / 2;
    },

    init ( plane, bulletData, pos ,posId) {
        //角度id
        this.posId = posId;

        this.initData( plane, bulletData );
        this.initUI( plane, pos ,posId);
        this.afterInit();
        this.checkCoinBuff();
    },

    checkCoinBuff(){
        // if( this._bulletData.skillId === 1 ){
        //     if( app.gameMgr.plane._coinBulletNum ){
        //         //this.spBullet.spriteFrame = app.resMgr.frameBulletCoin;
        //         this._coinBulletNum = app.gameMgr.plane._coinBulletNum;
        //     } else if( app.gameMgr.plane.fitData ) {
        //        // this.spBullet.spriteFrame = app.resMgr.frameBulletAttack;
        //     }
        //     else{
        //        // this.spBullet.spriteFrame = app.resMgr.frameBulletDefault;
        //         this._coinBulletNum = 0;
        //     }
        // }
    },

    afterInit () {},

    initData ( plane, bulletData ) {
        this._bulletData = bulletData;
        this.isDead = false;
    },

    getNodePool () {
        return app.resMgr.poolBulletTurret;
    },

    initUI ( plane, pos ) {
        this.body && (this.body.active = true);
        //this.node.scale = this._bulletData.bullet_range / this.node.width;
        this.showOnPlane( plane, pos );
    }, 

    collision(  ){
        this.bomb( true );
    },

    bomb ( isCollisionWithEnemy ) {
        this.isDead = true;

        var aniNode = app.resMgr.getNewBulletBoom1();
        aniNode.rotation = _.random( 30, 330 );
        aniNode.parent = this.node;
        aniNode.name = 'bomb-ani';
        // var ani = aniNode.getComponent( cc.Animation );
        // ani.play('huohua');
        var currentAction = cc.sequence(cc.scaleTo(0.01,1),cc.scaleTo(0.2,1.5));
        aniNode.runAction(currentAction);

        this.body && (this.body.active = false);
        this.scheduleOnce( function(){
            this.putToPool();
        }.bind(this), 0.1 );

        if( isCollisionWithEnemy && this._coinBulletNum ){
            app.gameMgr.buffMgr.onCoinBulletBomb( this );
        }


    },

    stepUpdate( dt ) {
        if( this.isDead )
            return;
        if( this.startAction )
            return;
        var speed = this._bulletData.move;
        this.stepMove(  speed  );

        if( this.node.y > cc.winSize.height + 100 ) {
            //this.bomb();
            this.isDead = true;
            this.body && (this.body.active = false);
            this.putToPool();

        }
    },

    stepMove ( dis ){
        if(this.posId == 1) {
            this.node.x -= (dis / 9);
        }else if(this.posId == 2) {

        }else if(this.posId == 3) {
            this.node.x += (dis / 9);
        }

        this.node.y += dis;

    },

    putToPool () {
        var ani = this.node.getChildByName( 'bomb-ani' );
        if(ani)
        app.resMgr.poolBulletBoom1.put(ani)
        
        if( !this.unuseNodePool ) {
            this.getNodePool().put( this.node );
        }else{
            this.node.destroy();
            app.gameMgr.removeBullet( this );
        }
    },

    getSkillHurt () {
        var hurt = this._bulletData.hurt;

        return hurt;
    }
});
