// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var actionTag = {
    enter:1,
    win: 2,
    revival: 3,
    lose: 4,
    goCetner:5
}


cc.Class({
    extends: cc.Component,

    properties: {
        collisionBody: {
            type: cc.Node,
            default:null
        },
        roleFormula : {
            get () {
                return this.m_roleFormula;
            },
            set ( val ) {
                this.m_roleFormula = val;
            },
            visible: false
        },
        _fireDt : 0,
        _fireSkillDt : 0,
        skillOpts:{ // 特殊技能需要飞机记录的属性
            default:{},
            visible: false
        },
        isRevivalTime: {
            get () {
                return this._isRevivalTime;
            },
            set ( val ) {
                this._isRevivalTime = val;
            },
            visible: false
        },
        hpLabel : { // 血量文本
            type:cc.Label,
            default:null
        },
        shieldNode : { // 无敌护盾的node
            type:cc.Node,
            default:null
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
        planeSkinSprite: {
            type: [cc.SpriteFrame],
            default:[]
        },
        planeData:null,
        supportData:null,
    },

    
    resetDefaultSkillSpeed () {
        // time_interval 一秒几个子弹
        // var inteval = this.roleFormula.default_skill_formula.time_interval;
        // var attack_add = app.gameMgr.buffMgr.attack();
        // if( attack_add ) {
        //     inteval *= attack_add;
        // }
        // if( this.fitData ){
        //     inteval *= 5;
        // }
        //
        // this._defaultFireDt = 1 / inteval;
        // this._fireNum = 1;
        // while( this._defaultFireDt < 0.06 ){
        //     this._defaultFireDt *= 2;
        //     this._fireNum += 1;
        // }
        // if( app.debug.baozou ){
        //     this._fireNum = 10;
        // }
    },
    //根据等级控制主角弹幕的数量
    getBulletNum()
    {
        var id = this.planeData.aircraft_id;
        if(id == 1) {
            if (this.bulletLv == 1) {
                this.bulletNum = 3;
            }
            else if (this.bulletLv == 2) {
                this.bulletNum = 5;
            }
            else if (this.bulletLv == 3){
                this.bulletNum = 7;
            }
            else if (this.bulletLv == 4){
                this.bulletNum = 9;
            }
        }
        else  if(id == 2)
        {
            if (this.bulletLv == 1)
            {
                this.bulletNum = 2;
            }
            else if (this.bulletLv == 2)
            {
                this.bulletNum = 5;
            }
            else
            {
                this.bulletNum = 7;
            }

        }
        else  if(id == 3)
        {
            if (this.bulletLv == 1)
            {
                this.bulletNum = 3;
            }
            else if (this.bulletLv == 2)
            {
                this.bulletNum = 5;
            }
            else
            {
                this.bulletNum = 7;
            }

        }

    },

    //控制必杀技的释放与结束
    setNiravana1State(state)
    {
      this.useNiravana1State = state;
    },

    //自定义updata
    stepUpdate (dt) {
        if( app.gameMgr.isPause ) return;
        if( !app.gameMgr.isStart ) return;
        if( app.gameMgr.isGameOver ) return;

        if(this.planeBulletId == app.G.BULLET_3)
        {
            if( this.heroFF)
                this.heroFF.position = cc.v2(this.node.position.x,this.node.position.y + 20);
        }


        //主炮
        var isFire = false;
        this.fireTime += dt;
        //副炮
        var isTurretFire = false;
        this.fireTurretTime += dt;
        //僚机
        var isSupportFire = false;
        this.fireSupportTime += dt;

        //主 副炮是否开火
        var id = this.planeData.aircraft_id;
        if(id == app.G.BULLET_1){
            if(this.fireTime >= 0.12) {
                this.fireTime -= 0.12;
                isFire = true;
            }
            if(this.fireTurretTime >= 0.12)
            {
                this.fireTurretTime -= 0.12;
                isTurretFire = true;
            }
        }
        else if(id == app.G.BULLET_2){
            if(this.fireTime >= 0.24) {
                this.fireTime -= 0.24;
                isFire = true;
            }
            if(this.fireTurretTime >= 2)
            {
                this.fireTurretTime -= 2;
                isTurretFire = true;
            }
        }
        else if(id == app.G.BULLET_6){
            if(this.fireTime >= 0.24) {
                this.fireTime -= 0.24;
                isFire = true;
            }
            if(this.fireTurretTime >= 2)
            {
                this.fireTurretTime -= 2;
                isTurretFire = true;
            }
        }
        else if(id == app.G.BULLET_3){
            if(this.fireTime >= 0.2) {
                this.fireTime -= 0.2;
                isFire = true;
            }
            if(this.fireTurretTime >= 0.01)
            {
                this.fireTurretTime -= 0.01;
                isTurretFire = true;
            }
        }
        else if(id == app.G.BULLET_4){
            if(this.fireTime >= 0.3) {
                this.fireTime -= 0.3;
                isFire = true;
            }
            if(this.fireTurretTime >= 0.01)
            {
                this.fireTurretTime -= 0.01;
                isTurretFire = true;
            }
        }
        else if(id == app.G.BULLET_5){
            if(this.fireTime >= 1) {
                this.fireTime -= 1;
                isFire = true;
            }
            if(this.fireTurretTime >= 0.01)
            {
                this.fireTurretTime -= 0.01;
                isTurretFire = true;
            }
        }


        //僚机是否开火
        if(this.supportData.wingman_id == 3)
        {
            if(this.fireSupportTime >= 1)
            {
                this.fireSupportTime -= 1;
                isSupportFire = true;
            }
        }
        else
        {
            isSupportFire = true;
        }



        if(isFire == true)
        {
            this.getBulletNum();
            this._fireNum = this.bulletNum;

            if(this.useNiravana1State == false)
                this.fire( this._fireNum );
            else
                this.fireNiravana1( this._fireNum );
        }
        if(isTurretFire == true)
        {
            this.fireTurret(dt);
        }
        if(isSupportFire == true)
        {
            //僚机开火
            this.supportFire();
        }







        //僚机
        for(var i=0;i<this.supportPlaneMax;i++)
        {
            if( this.supportPlane[i] && this.supportPlane[i].isState == true){
                this.supportPlane[i].stepUpdate( dt );
            }
        }
        if(this.bulletLv >= Number(this.planeData.outbreak_level)) {
            this.addSupportPlane();
        } else {
            this.removeSupportPlane();
        }

        //buff1的更新
        if(this.Buff1State == true) {
            if (this.Buff1Effect_time > 0)
                this.Buff1Effect_time -= dt;
            if (this.Buff1Effect_time <= 0) {
                this.bulletLv = Number(this.planeData.outbreak_level - 1);
                this.Buff1State = false;
            }
        }

        //buff2的更新
        for(var i=0;i<this.buff2PlaneMax;i++)
        {
            if( this.buff2Plane[i] ){
               this.buff2Plane[i].stepUpdate( dt );
            }
        }
        // var tempTarget = null;
        // for(var i=0;i<this.buff2PlaneMax;i++)
        // {
        //     if( this.buff2Plane[i] ){
        //         var tempNode = this.buff2Plane[i].stepUpdate( dt );
        //         if(tempNode != null)
        //         {
        //             tempTarget = tempNode;
        //         }
        //     }
        // }
        // var data = app.json.tbBuff_ly.json[ 1 ];
        // this.buff2fireTime-= dt;
        // if( this.buff2fireTime <= 0){
        //     this.buff2fireTime = data.buff_interval;
        //
        //     if(tempTarget != null)
        //     {
        //         if( this.buff2Plane[0] ) {
        //             var bullet = this.buff2Plane[0].buff2Bullet;
        //             if(bullet) {
        //                 var hurt = bullet.getComponent('bullet-Buff2').getSkillHurt();
        //                 tempTarget.releaseHp(hurt);
        //                 tempTarget.releaseSpeedAndAni();
        //                 if (tempTarget.hp <= 0) {
        //
        //                     if(tempTarget.name == "boss")
        //                     {
        //                         app.gameMgr.doBossDead( tempTarget );
        //                     }
        //                     else
        //                     {
        //                         app.gameMgr._deadedEnemy.push(tempTarget);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

    },

    //主飞机开火
    fire ( num ) {
        //主炮
        var id = this.planeBulletId;//this.planeData.aircraft_id;


        if(id == app.G.BULLET_1)
            app.gameMgr.newBullet( num ,this.planeData);
        else  if(id == app.G.BULLET_2)
            app.gameMgr.newBullet2( num ,this.planeData);
        else  if(id == app.G.BULLET_6)
            app.gameMgr.newBullet3( num ,this.planeData);
        else if(id == app.G.BULLET_3)
            app.gameMgr.newBullet4( num ,this.heroFF.getComponent(cc.ParticleSystem).life,this.planeData);
        else if(id == app.G.BULLET_4)
            app.gameMgr.newBullet5( num ,this.bulletLv,this.planeData);
        else if(id == app.G.BULLET_5)
            app.gameMgr.newBullet6( num ,this.bulletLv,this.planeData);
        else
            app.gameMgr.newBullet( num ,this.planeData);

    },
    //副炮开火
    fireTurret ( dt)
    {
        return;
        if(this.planeData.aircraft_id == 1) {
            if (this.bulletLv < 3) {
            }
            else if (this.bulletLv == 3) {
                app.gameMgr.newTurretBullet(1);
            } else if (this.bulletLv == 4) {
                app.gameMgr.newTurretBullet(2);
            } else {
                app.gameMgr.newTurretBullet(3);
            }
        }
        else  if(this.planeData.aircraft_id == 2) {
            if (this.bulletLv <= 3) {
            }
            else if (this.bulletLv == 4) {
                app.gameMgr.newTurret2Bullet(1,this.planeData);
            } else {
                app.gameMgr.newTurret2Bullet(2,this.planeData);
            }
        }
        else  if(this.planeData.aircraft_id == 3) {

            if (this.bulletLv <= 3) {

            }
            else if (this.bulletLv == 4) {
                if(this.turret3Bulle[0] == null)
                    this.turret3Bulle[0] = app.gameMgr.newTurret3Bullet(0,this.planeData);
                if(this.turret3Bulle[1] == null)
                    this.turret3Bulle[1] = app.gameMgr.newTurret3Bullet(1,this.planeData);
            } else {
                if(this.turret3Bulle[2] == null)
                    this.turret3Bulle[2] =  app.gameMgr.newTurret3Bullet(2,this.planeData);
                if(this.turret3Bulle[3] == null)
                    this.turret3Bulle[3] =  app.gameMgr.newTurret3Bullet(3,this.planeData);
            }

            for(var i=0;i<this.turret3BulleMax;i++)
            {
                //boss入场不发射子弹
                if(this.turret3Bulle[i] != null )
                {
                    var node = this.turret3Bulle[i];

                    if(app.gameMgr.boosEntranceState != 2) {
                        var comp = node.getComponent('bullet-turret3');
                        comp.stepUpdate(dt);
                    }
                    else
                    {
                        node.active = false;
                    }
                }
            }


        }
    },

    //必杀技
    fireNiravana1()
    {
        app.gameMgr.newBulletNiravana1();
    },
    //僚机开火
    supportFire ( ) {

        for(var i=0;i<this.supportPlaneMax;i++)
        {
            if( this.supportPlane[i] && this.supportPlane[i].nofireLeftTime <= 0 ){

                if(this.supportData.wingman_id == 1) {
                    app.gameMgr.newBulletSupport(this.supportPlane[i],this.supportData);
                }
                else  if(this.supportData.wingman_id == 2)
                {
                    app.gameMgr.newBulletSupport2(this.supportPlane[i],this.supportData);
                }
                else  if(this.supportData.wingman_id == 3)
                {
                    app.gameMgr.newBulletSupport3(this.supportPlane[i],this.supportData);
                }
            }
        }
    },

    fireSkill () {
        app.gameMgr.newBulletSkill();
    },

    initRoleData (  ) {

        this.selectedPlane(1);
        var tempRoleData = app.player.get('hero');
        var tempRoleSel = app.player.get('useRoleId');
        if(app.gameMgr.roleTryOut)
        {
            tempRoleSel = app.gameMgr.roleTryOut;
        }
        var data = app.json.tbAircraft_ly.json;
        for(var i=0;i<data.length;i++)
        {
            if(Number(tempRoleSel + 1) == Number(data[i].aircraft_id) && tempRoleData[Number(tempRoleSel+1)].Level == Number(data[i].aircraft_leve))
            {
                this.planeData = data[i];
                break;
            }
        }

        var tempSupportData = app.player.get('support');
        var tempSupportSel = app.player.get('useSupportId');
        if(app.gameMgr.supportTryOut)
        {
            tempSupportSel = app.gameMgr.supportTryOut;
        }
        data = app.json.tbWingman_ly.json;
        for(var i=0;i<data.length;i++)
        {
            if(Number(tempSupportSel + 1) == Number(data[i].wingman_id) && tempSupportData[Number(tempSupportSel+1)].Level == Number(data[i].wingman_leve))
            {
                this.supportData = data[i];
                break;
            }

        }

        // this.roleFormula = roleFormula;
        if(this.planeData) {
            var data = this.planeData;//app.json.tbAircraft_ly.json[ 0 ];
            this.initHp = this.hp = app.util.parseNum(data.hp);
            this.updateLbl();

            var node  =  app.gameMgr.hpNode.node.parent;
            node.zIndex = 10;
        }
    },
    selectedPlane(tempRoleSel)
    {
        var tempRoleData = app.player.get('hero');
        var data = app.json.tbAircraft_ly.json;
        for(var i=0;i<data.length;i++)
        {
            if(Number(tempRoleSel ) == Number(data[i].aircraft_id) && /*tempRoleData[Number(tempRoleSel)].Level*/1 == Number(data[i].aircraft_leve))
            {
                this.planeData = data[i];
                break;
            }
        }
    },
    // 检测和怪物的碰撞
    checkCollision ( monster ) {
        if( app.debug.wudi ) return false;
        var rect = monster.node.getBoundingBox();
        var myRect = this.collisionBody.getBoundingBox();
        return rect.intersects(myRect);
    },

    enterAction () {
        this.node.y = -150;
        this.node.stopActionByTag( actionTag.goCetner );

        var act = cc.moveTo( 0.5,320,160 ).easing(cc.easeOut(3));
        act.setTag( actionTag.goCetner );
        this.node.runAction( act );
    },

    goCenterAction () {
        // this.node.stopActionByTag( actionTag.goCetner );
        //
        // var act = cc.moveTo( Math.abs(this.node.y - 490) / 200 ,320,490 ).easing(cc.easeOut(5));
        // act.setTag( actionTag.goCetner );
        // this.node.runAction( act );

    },

    backBottomAction () {
        // this.node.stopActionByTag( actionTag.goCetner );
        //
        // var act = cc.moveTo( Math.abs(this.node.y - 200) / 200 ,320,200 ).easing(cc.easeOut(5));
        // act.setTag( actionTag.goCetner );
        // this.node.runAction( act );
    },

    revivalAction ( pos ) {
        if( pos ) {
            this.node.position = pos;
        }

        this.isRevivalTime = true;

        var act = [];
        act.push( cc.fadeTo(0.35,50) );
        act.push( cc.fadeTo(0.35,255) );
        act.push( cc.fadeTo(0.35,50) );
        act.push( cc.fadeTo(0.35,255) );
        act.push( cc.fadeTo(0.35,50) );
        act.push( cc.fadeTo(0.35,255) );
        act.push( cc.callFunc( function(){
            this.isRevivalTime = false;

        }.bind( this )))

        var seq = cc.sequence( act );
        seq.setTag( actionTag.revival );
        this.node.stopActionByTag( actionTag.goCetner );
        this.node.stopActionByTag( actionTag.revival );
        this.node.runAction( seq );

    },

    //胜利了
    winAction () {
        this.resetBuff();
        this.exitTurret3Bulle();

        this.node.stopActionByTag( actionTag.win );

        var offy = 1300 - this.node.y;

        var act = cc.moveBy( offy / 1000,0,offy ).easing(cc.easeIn(3));
        act.setTag( actionTag.win );
        this.node.runAction( act );

        this._coinBulletNum = 0;
        if(this.heroFF) {
            this.heroFF.destroy();
            this.heroFF = null;
        }
    },

    //输了
    loseAction () {
        this.resetBuff();
        this.exitTurret3Bulle();
        this.node.active = false;
        // this.node.stopActionByTag( actionTag.lose );
        // var offy = -200 - this.node.y;
        // var act = cc.moveBy( -offy / 1000,0,offy ).easing(cc.easeIn(3));
        // act.setTag( actionTag.lose );
        // this.node.runAction( act );
        if(this.heroFF) {
            this.heroFF.destroy();
            this.heroFF = null;
        }
    },

    isInAction () {
        if( this.node.getActionByTag( actionTag.win ) ){
            return true;
        }
        if( this.node.getActionByTag( actionTag.lose ) ){
            return true;
        }
    },
    //移除所有僚机(胜利或者失败)
    resetBuff () {
        for(var i=0;i<this.supportPlaneMax;i++)
        {
            this.exitSupportPlane(i);
        }
        this.exitBuff2AllPlane();
        this._coinBulletNum = 0;
    },

    //移除指定的僚机
    exitSupportPlane (indx) {

        if( this.supportPlane[indx] ){
            this.supportPlane[indx].exitScene();
            delete this.supportPlane[indx];
            this.supportPlane[indx] = null;
        }
    },
    //移除副炮3的激光
    exitTurret3Bulle (indx) {

       for(var i=0;i<this.turret3BulleMax;i++)
       {
           var node = this.turret3Bulle[i];
           if(node != null)
           {
               var comp = node.getComponent('bullet-turret3');
               comp.isDead = true;
               comp.putToPool();
           }
       }
    },

    //移除buff2
    exitBuff2AllPlane () {
        for(var i=0;i<this.buff2PlaneMax;i++) {
            if (this.buff2Plane[i]) {
                this.buff2Plane[i].exitScene();
                delete this.buff2Plane[i];
                this.buff2Plane[i] = null;
            }
        }
        this.Buff2State = false
    },
    // 被攻击
    beFire ( bullet ){
        var hurt = bullet.getSkillHurt();

        this.releaseHp( hurt );
    },
    releaseHp ( hp ){
        hp = Number( hp );
        this.hp -= hp;
        if(this.hp < 0) {
            this.hp = 0;
        }
        this.updateLbl();
    },
    // 设置lbl
    updateLbl () {
        var val = app.util.formatNum( this.hp );
        //this.log( this.hp, val )
        this.hpLabel.string = val;
        app.gameMgr.hpNode.fillRange = Number(this.hp/this.initHp);

    },
    onLoad ()
    {
        this.collisionBody = this.node;
        app.event.add( this );


        this.supportPlane = new Array();
        this.supportPlaneMax = 6;
        for(var i=0;i<this.supportPlaneMax;i++) {
            this.supportPlane[i] = null;
        }
        this.buff2Plane = new Array();
        this.buff2PlaneMax = 4;
        for(var i=0;i<this.buff2PlaneMax;i++) {
            this.buff2Plane[i] = null;
        }

        this.turret3Bulle = new Array();
        this.turret3BulleMax = 4;
        for(var i=0;i<this.turret3BulleMax;i++) {
            this.turret3Bulle[i] = null;
        }

        this.useNiravana1State = false;
        this.bulletNum = 0;
        this.bulletLv = 1;
        this.testJs = 0;
        this.Buff1State = false
        this.Buff2State = false
        this.fireTime = 0;//计算主炮的开火时间
        this.fireTurretTime = 0;//计算副炮的开火时间
        this.buff2fireTime = 0;//计算buff2的开火时间
        this.fireSupportTime = 0;//计算僚机的开火时间
        //var data = this.planeData;//app.json.tbAircraft_ly.json[ 0 ];
        //this.initHp = this.hp = app.util.parseNum( data.hp );
        //this.updateLbl ();

        //火焰枪的粒子参数
        this.heroFFEmissionRate = [150,250,350,350];
        this.heroFFLife = [0.6,0.7,0.8,1];
        this.heroFFAngleVar= [4.6,6,10,10];
        this.heroFFEndSize = [200,200,200,250];


        this.planeBulletId = app.G.BULLET_1;
    },

    start () {
        // this.collisionBody = this.node;
        // app.event.add( this );
        //
        //
        // this.supportPlane = new Array();
        // this.supportPlaneMax = 6;
        // for(var i=0;i<this.supportPlaneMax;i++) {
        //     this.supportPlane[i] = null;
        // }
        // this.buff2Plane = new Array();
        // this.buff2PlaneMax = 4;
        // for(var i=0;i<this.buff2PlaneMax;i++) {
        //     this.buff2Plane[i] = null;
        // }
        //
        // this.turret3Bulle = new Array();
        // this.turret3BulleMax = 4;
        // for(var i=0;i<this.turret3BulleMax;i++) {
        //     this.turret3Bulle[i] = null;
        // }
        //
        // this.useNiravana1State = false;
        // this.bulletNum = 0;
        // this.bulletLv = 1;
        // this.testJs = 0;
        // this.Buff1State = false
        // this.Buff2State = false
        // this.checkSupportPlane();
        // this.fireTime = 0;//计算主炮的开火时间
        // this.fireTurretTime = 0;//计算副炮的开火时间
        // this.buff2fireTime = 0;//计算buff2的开火时间
        // this.fireSupportTime = 0;//计算僚机的开火时间
        // //var data = this.planeData;//app.json.tbAircraft_ly.json[ 0 ];
        // //this.initHp = this.hp = app.util.parseNum( data.hp );
        // //this.updateLbl ();
        //
        // //火焰枪的粒子参数
        // this.heroFFEmissionRate = [1300,1500,1500,1800];
        // this.heroFFLife = [0.4,0.5,0.5,0.8];
        // this.heroFFEndSizeVar = [100,100,200,300];
        //
        //
        // this.planeBulletId = app.G.BULLET_1;


    },
    setHeroFFInfo(lvIndx)
    {
        if(lvIndx >= this.heroFFEmissionRate.length)
            lvIndx = this.heroFFEmissionRate.length - 1;

        this.heroFF.getComponent(cc.ParticleSystem).emissionRate = this.heroFFEmissionRate[lvIndx];
        this.heroFF.getComponent(cc.ParticleSystem).life = this.heroFFLife[lvIndx];
        this.heroFF.getComponent(cc.ParticleSystem).angleVar =this.heroFFAngleVar[lvIndx];
        this.heroFF.getComponent(cc.ParticleSystem).endSize = this.heroFFEndSize[lvIndx];
    },

    updataSkin(skinId)
    {
        var js = 0;
        var node = this.node.getChildByName('skin');
        node.stopAllActions();
        node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.callFunc( function(){
                        js = js >= 4 ? 0 : js;
                        node.getComponent(cc.Sprite).spriteFrame = this.planeSkinSprite[skinId* 4 + js];
                        js ++;
                    }.bind( this )),
                    cc.delayTime(0.2 )
                )
            )
        );

        // this.node.getChildByName('skin').getComponent(cc.Sprite).spriteFrame = this.planeSpfram[skinId];
        //
        // var type2Node = {
        //     0:this.node.getChildByName('1'),
        //     1:this.node.getChildByName('2'),
        //     2:this.node.getChildByName('3'),
        //     3:this.node.getChildByName('4'),
        // };
        // for( var i in type2Node ){
        //     var node = type2Node[i];
        //     if( i == skinId ){
        //         node && ( node.active = true );
        //     }else{
        //         node && ( node.active = false );
        //     }
        // }

    },


    onDestroy () {
        app.event.remove( this );
        if(this.heroFF) {
            this.heroFF.destroy();
            this.heroFF = null;
        }
    },

    //事件监听
    handleEvent ( name, param ) {


        // if( name === app.enum.BUFF_1 ){
        //     this.bulletUpLv();
        // }
        // else  if( name === app.enum.BUFF_2 ){
        //     cc.log("收到新事件=",name);
        //     this.checkBuff2Plane();
        // }
        cc.log("收到新事件=",name);

        if( name === app.enum.BUFF_1 ){//aa
            this.checkBuff2Plane();
        }
        else if( name === app.enum.BUFF_2 ){//ff
            if(this.planeBulletId == app.G.BULLET_3)
            {
                this.bulletUpLv();
            }
            else
            {
                if( !this.heroFF) {
                    this.heroFF = app.resMgr.instantiate(app.resMgr.heroFF);
                    this.heroFF.parent = app.gameMgr.node;
                    this.heroFF.zIndex = app.G.LAYER_PARTICLE;
                }

                this.planeBulletId = app.G.BULLET_3;

                this.setHeroFFInfo(1);
                this.heroFF.getComponent(cc.ParticleSystem).resetSystem();

                this.selectedPlane(this.planeBulletId);

            }
        }
        else if( name === app.enum.BUFF_3 ){//ll
            if(this.planeBulletId == app.G.BULLET_4)
            {
                this.bulletUpLv();
            }
            else
            {
                this.planeBulletId = app.G.BULLET_4;
                if( this.heroFF) {
                    this.heroFF.getComponent(cc.ParticleSystem).stopSystem();
                }
                this.selectedPlane(this.planeBulletId);
            }
        }
        else  if( name === app.enum.BUFF_4 ){//mm
            if(this.planeBulletId == app.G.BULLET_5)
            {
                this.bulletUpLv();
            }
            else
            {
                this.planeBulletId = app.G.BULLET_5;
                if( this.heroFF) {
                    this.heroFF.getComponent(cc.ParticleSystem).stopSystem();
                }
                this.selectedPlane(this.planeBulletId);
            }
        }

    },

    //火力提升
    bulletUpLv()
    {
        var lv = Number(this.bulletLv + 1);
        cc.log("lv",lv);

        if(lv > this.planeData.outbreak_level) {
            lv  = this.planeData.outbreak_level;
        }

        if(lv == this.planeData.outbreak_level && this.bulletLv == Number(this.planeData.outbreak_level - 1))
        {
            cc.log("暴走");
            app.showRampage();
        }
        else if(lv > this.bulletLv)
        {
            app.showWeaponUp(this.node.position,this.node);
            if( this.planeBulletId == app.G.BULLET_3)
            {
                this.setHeroFFInfo(lv);
            }

        }

        if(lv == this.planeData.outbreak_level)
        {
            //var tbData = app.json.tbAircraft_ly.json[ 0 ];
            this.Buff1Effect_time = this.planeData.outbreak_time;
            this.Buff1State = true;
        }

        this.bulletLv = lv;
    },
    checkCoinBuff() {
        this._coinBulletNum = app.gameMgr.buffMgr.gold();
    },

    //创建僚机
    checkSupportPlane(){

        var act = [];
        act.push(-100);
        act.push(100);
        act.push(-170);
        act.push(170);
        act.push(-240);
        act.push(240);
        for(var i=0;i<this.supportPlaneMax - 4;i++)
        {
            if(this.supportPlane[i])
            {
                this.exitSupportPlane(i);
            }

            if( !this.supportPlane[i] ){
                // if( ret ){
                var plane = cc.instantiate( app.resMgr.prefPlaneModel6 );
                plane = plane.getComponent( 'support-plane' );
                plane.mOffsetPos = cc.v2(act[i],0);
                plane.updataSkin(i);
                this.supportPlane[i] = plane;

                plane.node.parent = this.node.parent;
                plane.node.zIndex =app.G.LAYER_SUPPORT;
                this.supportPlane[i].setPlanePos( this.node.position );
            }
        }
    },
    //创建buff2
    checkBuff2Plane(){

        var act = [];
        act.push(-50);
        act.push(50);
        act.push(-150);
        act.push(150);

        for(var i=0;i<this.buff2PlaneMax;i++)
        {
            if( !this.buff2Plane[i] ){

                var plane = cc.instantiate( app.resMgr.prefPlaneModel14 );
                plane.addComponent( require('buff2-plane') );
                plane = plane.getComponent( 'buff2-plane' );
                this.buff2Plane[i] = plane;
                plane.node.parent = this.node.parent;
                plane.node.zIndex = app.G.LAYER_BUFF2;
                this.buff2Plane[i].setPlanePos( this.node.position ,cc.v2(act[i],0));
            }
        }
        this.Buff2State = true
    },

    //暴走后添加多余僚机
    addSupportPlane(){

        //cc.log("添加多余僚机");
        for(var i=0;i<this.supportPlaneMax;i++)
        {
            var act = [];
            act.push(-100);
            act.push(100);
            act.push(-170);
            act.push(170);
            act.push(-240);
            act.push(240);

            if( !this.supportPlane[i] ){
                // if( ret ){
                var plane = cc.instantiate( app.resMgr.prefPlaneModel6 );
                plane = plane.getComponent( 'support-plane' );
                plane.mOffsetPos = cc.v2(act[i],0);
                plane.updataSkin(i);
                this.supportPlane[i] = plane;
                this.supportPlane[i].nofireLeftTime = 0.5;
                plane.node.parent = this.node.parent;
                plane.node.zIndex =app.G.LAYER_SUPPORT;
                this.supportPlane[i].setPlanePos( this.node.position );
            }
        }
    },
    //暴走结束移除多余僚机
    removeSupportPlane(){
        //cc.log("移除多余僚机");
        for(var i=2;i<this.supportPlaneMax;i++)
        {
            if( this.supportPlane[i] ){
                // if( ret ){
                this.exitSupportPlane(i);
            }
        }
    },

    //手指的移动
    onTouchMove( event ){
        var pos = event.getLocation();
        var pre = event.getPreviousLocation();
        this.node.x += pos.x - pre.x;
        this.node.y += pos.y - pre.y;

        if( this.node.x < 0 ){
            this.node.x = 0
        }else if( this.node.x > cc.winSize.width ){
            this.node.x = cc.winSize.width;
        }

        if( this.node.y < 0 ){
            this.node.y = 0
        }else if( this.node.y > cc.winSize.hegith ){
            this.node.y = cc.winSize.hegith;
        }
        for(var i=0;i<this.supportPlaneMax;i++)
        {
            if( this.supportPlane[i] ){
                this.supportPlane[i].setPlanePos( this.node.position );
            }
        }

    },

    changePlaneModelWithId ( mid ){
        // var model = cc.instantiate( app.resMgr['prefPlaneModel' + mid] );
        // this.node.removeAllChildren();
        // var effect = cc.instantiate(app.resMgr.prefDBChangePlaneSmoke);
        // effect.parent = this.node;
        // effect.zIndex = 1;
        // // var dra = effect.children[0].getComponent( dragonBones.ArmatureDisplay );
        // //
        // // dra.addEventListener(dragonBones.EventObject.COMPLETE, function(){
        // //     effect.destroy();
        // // });
        //
        // app.util.childsExec( model, function( child ){
        //     child.setParent(this.node);
        // }.bind( this ) );
    },

    onFitPlane ( fitData ) {
        // this.fitData = fitData;
        // this.changePlaneModelWithId( fitData.model );
        // this.resetDefaultSkillSpeed();
        // this.node.runAction( cc.sequence(
        //     cc.delayTime( fitData.there_time ),
        //     cc.callFunc( function(){
        //         delete this.fitData;
        //         this.resetDefaultSkillSpeed();
        //         this.changePlaneModelWithId( this.roleFormula.type );
        //     }.bind( this ))
        // ) );
    },
    //播放死亡动画 完成后回收
    playDeadAni () {

        app.audioMgr.play(app.audioMgr.audioMonster1Bomb);

        var aniNode = app.resMgr.getNewMonster1Bomb();
        aniNode.parent = this.node;
        aniNode.scale = 1;
        aniNode.getComponent(cc.ParticleSystem ).resetSystem();
        aniNode.name =  'dead-ani';
        this.node.runAction( cc.sequence(
            cc.delayTime( 0.5 ),
            cc.callFunc( function(){
                this.putToPool(  );
            }.bind( this ))
        ) );

        if(this.heroFF) {
            this.heroFF.destroy();
            this.heroFF = null;
        }
    },
    //回收
    putToPool () {
        var aniNode = this.node.getChildByName( 'dead-ani' );
        if( aniNode ){
            app.resMgr.poolMonster1Bomb.put( aniNode );
        }
    }
});
