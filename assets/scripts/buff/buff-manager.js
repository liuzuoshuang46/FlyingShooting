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
        nodeBuff: cc.Node,
    },
    
    start () {
        this.reset();
    },

    reset () {
        if( this._buffs ){
            for( var i in this._buffs ){
                app.resMgr.poolBuff.put( this._buffs[i].node );
            }
        }
        if( this._buffIcons ){
            for( var i in this._buffIcons ){
                app.resMgr.poolBuffIcon.put( this._buffIcons[i].node );
            }
        }
        this._buffIcons = [];
        this._buffs = [];
    },

    createBuff ( opt ) {

        //cc.log("_buffs=",this._buffs);
        cc.log("Buff2State=",app.gameMgr.plane.Buff2State);
        if(app.gameMgr.plane.Buff2State == true && opt.buffId == 2)
        {
            return;
        }

        for(var i=0;i< this._buffs.length;i++)
        {
            var buffDta = this._buffs[i];
            if(opt.buffId == 2 && buffDta.buffId == 2 )
            {
                return;
            }
        }

        // var buff = cc.instantiate( app.resMgr.prefBuff );
        // buff.parent = this.node;
        // buff.position = opt.pos;

        var buff = app.resMgr.getNewBuff();
        buff.parent = this.node;
        buff.position = opt.pos;

        var script = buff.getComponent( 'buff' );
        script.init( opt.buffId, this, opt.direction );
        this._buffs.push( script );


    },

    createBuffIcon ( buffId ) {

        var tbData = app.json.tbBuff_ly.json[ Number(buffId  - 1)];
        this.onBuffStateChange( tbData );

        // var buffIcon = app.resMgr.getNewBuffIcon();
        // buffIcon.parent = this.node;
        //
        // var script = buffIcon.getComponent( 'buff-icon' );
        // script.init( buffId, this );
        // this._buffIcons.push( script );
        //this.onBuffStateChange( script.tbData );
        // this.resetBuffIconPos();
    },

    onBuffStateChange ( tbData ) {
        if( tbData.buff_type == 1 ){
            app.event.send( app.enum.BUFF_1 );
        }
        else if( tbData.buff_type == 2 ){
            app.event.send( app.enum.BUFF_2 );
        }
        else if( tbData.buff_type == 3 ){
            app.event.send( app.enum.BUFF_3 );
        }
        else if( tbData.buff_type == 4 ){
            app.event.send( app.enum.BUFF_4 );
        }

    },

    resetBuffIconPos(){
        for( var i in this._buffIcons ){
            var item = this._buffIcons[i];
            item.node.x = 600;
            item.node.y = 1000 - i * 120;
        }
    },

    removeBuff ( buff ) {
        app.util.removeIf( buff, this._buffs );
        app.resMgr.poolBuff.put( buff.node );
    },

    removeBuffIcon ( buffIcon ) {
        app.util.removeIf( buffIcon, this._buffIcons );
        app.resMgr.poolBuffIcon.put( buffIcon.node );
        this.resetBuffIconPos();
        this.onBuffStateChange( buffIcon.tbData );
    },
    
    stepUpdate( dt ) {
        for( var i in this._buffs ){
            this._buffs[i].stepUpdate( dt );
        }
    },

    collisionPlane ( plane ) {
        var _collosionArr = [];
        for( var i in this._buffs ){
            var item = this._buffs[ i ];

            var rect = item.node.getBoundingBox();
            var planeRect = plane.collisionBody.getBoundingBox();
            if( rect.intersects(planeRect) ){
                _collosionArr.push( item );
            }
        }

        for( var i in _collosionArr ){
            this.onBuffCollisionPlane( _collosionArr[i] );
        }
    },

    onBuffCollisionPlane( buff ){
        app.audioMgr.play( app.audioMgr.audioEatBuff );
        this.createBuffIcon( buff.buffId );
        this.removeBuff( buff );
    },

    attack () {
        var max = 0;
        for( var i in this._buffIcons ){
            var data = this._buffIcons[i].tbData;
            if( data.attack > max ){
                max = data.attack;
            }
        }
        return max;
    },

    gold () {
        var max = 0;
        for( var i in this._buffIcons ){
            var data = this._buffIcons[i].tbData;
            if( data.gold > max ){
                max = data.gold;
            }
        }
        return max;
    },

    speed_reduce () {
        var max = 0;
        for( var i in this._buffIcons ){
            var data = this._buffIcons[i].tbData;
            if( data.speed_reduce > max ){
                max = data.speed_reduce;
            }
        }
        return max;
    },

    speed_add () {
        var max = 0;
        for( var i in this._buffIcons ){
            var data = this._buffIcons[i].tbData;
            if( data.speed_add > max ){
                max = data.speed_add;
            }
        }
        return max;
    },

    support () {
        var max = 0;
        for( var i in this._buffIcons ){
            var data = this._buffIcons[i].tbData;
            if( data.support > max ){
                max = data.support;
            }
        }
        return max;
    },

    onCoinBulletBomb( bullet ) {
        var item = app.resMgr.getNewAddCoinBuff();
        item.position = bullet.node.position;
        item.parent = this.node;

        item.runAction( cc.sequence(
            cc.bezierTo( 0.3, [
                item.position,
                cc.v2((item.position.x + 148)/2, item.position.y - 100), 
                cc.v2(148,1050) ]
                ),
            cc.callFunc( function(){
                app.resMgr.poolAddCoin.put( item );
                app.gameMgr.onCatchedCoin( bullet._coinBulletNum )
            })
        ) );
    }
});
