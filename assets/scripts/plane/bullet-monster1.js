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
        _leftCollisionNum:0,
        spBullet : cc.Sprite
    },

    reuse () {
        app.gameMgr.pushMonsterBullet( this );
    },

    unuse () {
        app.gameMgr.removeMonsterBullet( this );
    },
    //检测碰撞到护罩
    collisionWithShield ( plane, shield){

        var yvalue = Math.abs((plane.node.y + shield.y) - this.node.y);
        if(yvalue > cc.winSize.height/3)
        {
            return false;
        }

        var planeRect = shield.getBoundingBox();
        planeRect.x += plane.node.x;
        planeRect.y += plane.node.y;
        var bulletRect = this.node.getBoundingBox();
        var result = planeRect.intersects(bulletRect);
        return result;
    },
    // 检测撞到飞机
    collisionWithEnemy ( plane ){

        var yvalue = Math.abs(plane.node.y - this.node.y);
        if(yvalue > cc.winSize.height/3)
        {
            return false;
        }

        var planeRect = plane.node.getBoundingBox();
        var bulletRect = this.node.getBoundingBox();
        //cc.log("enemyRect=",enemyRect,";bulletRect=",bulletRect);
        var result = planeRect.intersects(bulletRect);// Intersection.rectRect(enemyRect,bulletRect);
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

        // return false;
    },

    showOnPlane ( plane, pos,target,opts) {
        // plane.node.position = cc.v2(100,100);;
        this.opts = opts;
        this.targetNode = target

        //速度
        this.speed = opts.speed;;

        this.node.position = cc.v2(opts.post.x ,opts.post.y );;

        //1.单颗子弹 直线向下发射
        if(opts.bulletType == 1)
        {
            this.xValue = 0;
            this.yValue = -this.speed;

            this.node.rotation = 90;

            this.startAction = false;
        }
        //2.单颗子弹 直线追踪发射
        else if(opts.bulletType == 2){

            // var x0 = opts.post.x + opts.offset.x;
            // var y0 = opts.post.y + opts.offset.y;
            //
            // var x1 = x0 + opts.offset.y * Math.cos((opts.rotation + 90) *  Math.PI / 180);
            // var y1 = y0 + opts.offset.y * Math.sin((opts.rotation + 90) *  Math.PI / 180);
            // var p1 = cc.v2(x1,y1);//this.node.position;

            //计算弧度
            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x)) //弧度
            this.xValue = Math.cos(angle) * this.speed;
            this.yValue = Math.sin(angle) * this.speed;

            //计算角度
            //var angle1 = Math.atan2((p2.x - p1.x), (p2.y - p1.y)) //弧度
            var theta = angle * (180 / Math.PI); //角度
            this.node.rotation =-1*  theta;

            this.startAction = false;




        }
        //3.三颗子弹 直线向下发射
        else if(opts.bulletType == 3)
        {
            this.xValue = 0;
            this.yValue = -this.speed;

            this.node.rotation = 90;

            this.startAction = true;
            this.node.runAction( cc.sequence(cc.delayTime(0.15*( opts.indx  + 1)),cc.callFunc(function(){ this.startAction = false; }.bind( this ))) );

        }
        //4.三行 三列子弹 扇形追踪发射
        else if(opts.bulletType == 4) {

            var layerNum = parseInt(Number(opts.indx / 3));
            var remainderNum = parseInt(Number(opts.indx % 3));


            //计算弧度
            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x)) //弧度

            if ((remainderNum == 1 || remainderNum == 2))
            {
                var angle1 = angle + (remainderNum == 1 ? 0.1 : -0.1);
                var x1 = this.speed * Math.cos((angle1) * 3.14 / 180)
                var y1 = this.speed * Math.sin((angle1) * 3.14 / 180)
                this.xValue = Math.cos(angle1) * this.speed;
                this.yValue = Math.sin(angle1) * this.speed;

                //计算角度
                //  angle1 = Math.atan2((x1 - p1.x),(y1 - p1.y)) //弧度
                var theta = angle1 * (180 / Math.PI); //角度
                this.node.rotation = -1 * theta;

            }
            else
            {
                this.xValue = Math.cos(angle) * this.speed;
                this.yValue = Math.sin(angle) * this.speed;

                //计算角度
                // var angle1 = Math.atan2((p2.x - p1.x), (p2.y - p1.y)) //弧度
                var theta = angle * (180 / Math.PI); //角度
                this.node.rotation = -1 * theta;

                //console.log('tttt' + remainderNum,this.node.rotation);
            }

            this.startAction = true;
            this.node.runAction( cc.sequence(cc.delayTime(0.1*layerNum),cc.callFunc(function(){ this.startAction = false;  }.bind( this ))) );
        }
        //5.单行子弹 成圈发射
        else if(opts.bulletType == 5)
        {
            //计算弧度
            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var x1   =   p1.x   +   this.speed   *   Math.cos((opts.indx*10)   *   3.14   /180   )
            var y1   =   p1.y   +   this.speed   *   Math.sin((opts.indx*10)   *   3.14   /180   )

            var angle = Math.atan2((y1 - p1.y), (x1 - p1.x)) //弧度
            this.xValue = Math.cos(angle) * this.speed;
            this.yValue = Math.sin(angle) * this.speed;

            //计算角度
            //var angle1 = Math.atan2((x1 - p1.x), (y1 - p1.y)) //弧度
            var theta = angle * (180 / Math.PI); //角度
            this.node.rotation = -1 * theta;

            this.startAction = false;
        }
        //6.两行子弹 成圈发射
        else if(opts.bulletType == 6)
        {
            //计算弧度
            var layerNum =   parseInt(Number(opts.indx/opts.columnsNum));

            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var x1   =   p1.x   +   this.speed   *   Math.cos((opts.indx*10)   *   3.14   /180   )
            var y1   =   p1.y   +   this.speed   *   Math.sin((opts.indx*10)   *   3.14   /180   )

            var angle = Math.atan2((y1 - p1.y), (x1 - p1.x)) //弧度
            this.xValue = Math.cos(angle) * this.speed;
            this.yValue = Math.sin(angle) * this.speed;

            //计算角度
           // var angle1 = Math.atan2((x1 - p1.x), (y1 - p1.y)) //弧度
            var theta = angle * (180 / Math.PI); //角度
            this.node.rotation = -1 * theta;

            if(layerNum == 0)
            {
                this.startAction = false;
            }
            else
            {
                this.startAction = true;
                this.node.runAction( cc.sequence(cc.delayTime(0.1),cc.callFunc(function(){ this.startAction = false; }.bind( this ))) );
            }
        }
        //7.30行 3列 扇形发射
        else  if(opts.bulletType == 7)
        {
            //计算弧度
            var layerNum =   parseInt(Number(opts.indx/3));
            var remainderNum =   parseInt(Number(opts.indx%3));

            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var temp = -90;
            if(remainderNum == 1)
                temp = -110;
            else if(remainderNum == 2)
                temp = -70;
            var x1   =   p1.x   +   this.speed   *   Math.cos((temp)   *   3.14   /180   )
            var y1   =   p1.y   +   this.speed   *   Math.sin((temp)   *   3.14   /180   )

            var angle = Math.atan2((y1 - p1.y), (x1 - p1.x)) //弧度
            this.xValue = Math.cos(angle) * this.speed;
            this.yValue = Math.sin(angle) * this.speed;

            //计算角度
            // var angle1 = Math.atan2((x1 - p1.x), (y1 - p1.y)) //弧度
            var theta = angle * (180 / Math.PI); //角度
            this.node.rotation = -1 * theta;


            this.startAction = true;
            this.node.runAction( cc.sequence(cc.delayTime(layerNum*0.2),cc.callFunc(function(){ this.startAction = false;}.bind( this ))) );
        }
        //8.3行子弹 成圈发射
        else if(opts.bulletType == 8)
        {
            //计算弧度
            var layerNum =   parseInt(Number(opts.indx/opts.columnsNum));

            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var x1   =   p1.x   +   this.speed   *   Math.cos((layerNum * 5 + opts.indx*10)   *   3.14   /180   )
            var y1   =   p1.y   +   this.speed   *   Math.sin((layerNum * 5 + opts.indx*10)   *   3.14   /180   )

            var angle = Math.atan2((y1 - p1.y), (x1 - p1.x)) //弧度
            this.xValue = Math.cos(angle) * this.speed;
            this.yValue = Math.sin(angle) * this.speed;

            //计算角度
            // var angle1 = Math.atan2((x1 - p1.x), (y1 - p1.y)) //弧度
            var theta = angle * (180 / Math.PI); //角度
            this.node.rotation = -1 * theta;

            if(layerNum == 0)
            {
                this.startAction = false;
            }
            else
            {
                this.startAction = true;

                this.node.runAction( cc.sequence(cc.delayTime(layerNum*0.5),cc.callFunc(function(){ this.startAction = false; }.bind( this ))) );
            }
        }
        //9.3行 15列 成圈发射
        else  if(opts.bulletType == 9)
        {
            //计算弧度
            var layerNum =   parseInt(Number(opts.indx/opts.columnsNum));

            var p1 = this.node.position;
            var p2 = cc.v2(this.targetNode.node.x, this.targetNode.node.y);
            var x1   =   p1.x   +   this.speed   *   Math.cos((layerNum * 5 + opts.indx*10)   *   3.14   /180   )
            var y1   =   p1.y   +   this.speed   *   Math.sin((layerNum * 5 + opts.indx*10)   *   3.14   /180   )

            var angle = Math.atan2((y1 - p1.y), (x1 - p1.x)) //弧度
            this.xValue = Math.cos(angle) * this.speed;
            this.yValue = Math.sin(angle) * this.speed;

            //计算角度
            // var angle1 = Math.atan2((x1 - p1.x), (y1 - p1.y)) //弧度
            var theta = angle * (180 / Math.PI); //角度
            this.node.rotation = -1 * theta;

            if(layerNum == 0)
            {
                this.startAction = false;
            }
            else
            {
                this.startAction = true;
                this.node.runAction( cc.sequence(cc.delayTime(layerNum*0.1),cc.callFunc(function(){ this.startAction = false; }.bind( this ))) );
            }
        }


    },

    init ( plane, pos ,target ,opts) {
        this.aniNode = null;
        this.initData( plane);
        this.initUI( plane, pos ,target,opts);
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

    initData ( plane ) {
        this.isDead = false;
    },

    getNodePool () {
        return app.resMgr.poolBulletMonster1;
    },

    initUI ( plane, pos ,target,opts) {
        this.body && (this.body.active = true);
        //this.node.scale = this._bulletData.bullet_range / this.node.width;
        this.showOnPlane( plane, pos ,target,opts);
    }, 

    collision(  ){
        this.bomb( true );
    },

    bomb ( isCollisionWithEnemy ) {
        this.isDead = true;

        this.aniNode = app.resMgr.getNewBulletBoom();
        this.aniNode.rotation = _.random( 30, 330 );
        this.aniNode.parent = app.gameMgr.node;
        this.aniNode.zIndex = app.G.LAYER_PARTICLE;
        this.aniNode.position = this.node.position;
        this.aniNode.name = 'bomb-ani';
        var ani = this.aniNode.getComponent( cc.Animation );
        ani.play('huohua');

        this.body && (this.body.active = false);
        this.scheduleOnce( function(){
            this.putToPool();
        }.bind( this ), 0.1 );

        if( isCollisionWithEnemy && this._coinBulletNum ){
            app.gameMgr.buffMgr.onCoinBulletBomb( this );
        }
    },

    stepUpdate( dt ) {
        if( this.isDead ) return;
        if( this.startAction ) return;
        var speed = this.opts.move;
       this.stepMove( );
        if( this.node.y > cc.winSize.height + 100 || this.node.y < -100 || this.node.x > cc.winSize.width || this.node.x < -100) {
            this.bomb();
        }
    },

    stepMove (  ){
        this.node.position = cc.v2(this.node.x + this.xValue,this.node.y + this.yValue);
    },

    putToPool () {
        if(this.aniNode ){
            app.resMgr.poolBulletBoom.put( this.aniNode );
        }
        
        if( !this.unuseNodePool ) {
            this.getNodePool().put( this.node );
        }else{
            this.node.destroy();
            app.gameMgr.removeBullet( this );
        }
    },

    getSkillHurt () {
        var hurt = Number(this.opts.attack);
        return hurt;
    }
});
