// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 
 * @param {*} type
 * type _enum.GROWING_SKILL_GROWING1 = ++initInt; // 技能培养1
 * type _enum.GROWING_SKILL_GROWING2 = ++initInt; // 技能培养2
 * type _enum.GROWING_CANDY = ++initInt; // 金币倍数培养
 * type _enum.GROWING_DAILY = ++initInt; // 日常收益培养
 * @param {*} roleId 角色id 角色的技能培养时有值，玩家默认子弹时-1, 否则undefine
 */
function getOpts( type, roleId ) {
    var ret = {};
    ret.type = type;
    ret.roleId = roleId;
    ret.level = app.player.get('hero')[ ['growing1Level','growing2Level'][ type ] ];
    switch( type ){
        case app.enum.GROWING_SKILL_GROWING1:
            ret.tb = app.json.tbGrowing1;
            if( roleId !== -1 ){
                ret.level = app.player.get('hero')[ roleId ].growing1Level;
                ret.data = ret.tb.json[ app.json.tbRole.json[ ret.roleId ].technical_skill * 1000 + ret.level ];
                ret.nextData = ret.tb.json[ app.json.tbRole.json[ ret.roleId ].technical_skill * 1000 + ret.level + 1 ];

                var skillId = app.json.tbRole.json[ roleId ].technical_skill;
                var descType = app.json.tbSkill.json[ skillId ].peiyangbiao_one;
                ret.btnDesc = {
                    skill_hurt:'技能强度',
                    bullet_range:'技能范围',
                    time_interval:'技能速度',
                    collision_num:'碰撞次数',
                }[ descType ];
                if( !ret.btnDesc ) ret.btnDesc = '错误';
            }else{
                ret.level = app.player.get('defaultSkillLevel').growing1Level;
                ret.data = ret.tb.json[ 1000 + ret.level ]; // 1000 默认子弹id*1000
                ret.nextData = ret.tb.json[ 1000 + ret.level + 1 ];
                ret.btnDesc = '泡泡速度';
            }
        break;
        case app.enum.GROWING_SKILL_GROWING2:
            ret.tb = app.json.tbGrowing2;
            if( roleId !== -1 ){
                ret.level = app.player.get('hero')[ roleId ].growing2Level;
                ret.data = ret.tb.json[ app.json.tbRole.json[ ret.roleId ].technical_skill * 1000 + ret.level ];
                ret.nextData = ret.tb.json[ app.json.tbRole.json[ ret.roleId ].technical_skill * 1000 + + ret.level + 1 ];

                var skillId = app.json.tbRole.json[ roleId ].technical_skill;
                var descType = app.json.tbSkill.json[ skillId ].peiyangbiao_two;
                ret.btnDesc = {
                    skill_hurt:'技能强度',
                    bullet_range:'泡泡范围',
                    time_interval:'泡泡速度',
                    collision_num:'碰撞次数',
                }[ descType ];
                if( !ret.btnDesc ) ret.btnDesc = '错误';
            }else{
                ret.level = app.player.get('defaultSkillLevel').growing2Level;
                ret.data = ret.tb.json[ 1000 + ret.level ]; // 1000 默认子弹id*1000
                ret.nextData = ret.tb.json[ 1000 + ret.level + 1 ];
                ret.btnDesc = '泡泡强度';
            }
        break;
        case app.enum.GROWING_CANDY:
            ret.tb = app.json.tbProfitBasics;
            ret.level = app.player.get('profitBasics');
            ret.data = ret.tb.json[ ret.level ]; // 1000 默认子弹id*1000
            ret.nextData = ret.tb.json[ ret.level + 1 ];
            ret.btnDesc = '糖果倍数';
        break;
        case app.enum.GROWING_DAILY:
            ret.tb = app.json.tbProfitDaily;
            ret.level = app.player.get('profitDaily');
            ret.data = ret.tb.json[ ret.level ]; // 1000 默认子弹id*1000
            ret.nextData = ret.tb.json[ ret.level + 1 ];
            ret.btnDesc = '日常收益';
        break;
        default:
        break;
    }
    
    /*
    {
        roleId 角色id
        level 角色培养该属性的等级
        tb 对应的培养数值表
        data 表中当前等级的item
        type 培养类型
    }
    */
    return ret;
}

cc.Class({
    extends: cc.Component,

    properties: {
        lv:{
            type:cc.Label,
            default: null,
        },
        num:{
            type:cc.Label,
            default: null,
        },
        coin:{
            type:cc.Label,
            default: null,
        },
        _type:-1,
        lblDesc:{
            type:cc.Label,
            default: null
        },
        nodeButton:cc.Node
    },

    init ( type, roleId ) {
        app.event.addIfNoExist( this );
        this.initData( type, roleId );
        this.initUI();
    },

    initData ( type, roleId ) {
        this.opts = getOpts( type, roleId );
    },

    initUI () {
        var opts = this.opts; 
        if( !opts.nextData ){ // level max
            this.lv.string = opts.level;
            this.num.string = app.util.parseNum( opts.data.val ) ;
            this.coin.node.parent/* buy button */.active = false;
        }else{
            this.coin.node.parent/* buy button */.active = true;
            this.lv.string = opts.level;
            this.num.string = app.util.parseNum( opts.data.val ) ;
            this.coin.string = app.util.formatNum( opts.data.num );
        }
        this.lblDesc.string = opts.btnDesc;
        this.checkRedPoint();
    },

    clickLevelUp () {
        if( app.player.checkCoin( this.opts.data.num ) && app.player.coinBuy( this.opts.data.num ) ){
            var tmpstr =  '';

            switch( this.opts.type ){
                case app.enum.GROWING_SKILL_GROWING1:
                    if( this.opts.roleId !== -1 ){
                        var roles = app.player.get('hero');
                        roles[ this.opts.roleId ].growing1Level += 1;
                        app.player.set( 'hero', roles );
                        tmpstr =  app.json.tbRole.json[ this.opts.roleId ].name + '培养1等级'+ roles[ this.opts.roleId ].growing1Level;
                        app.homeWgt.selectRole.init();
                    }else{
                        var defaultSkill = app.player.get('defaultSkillLevel');
                        defaultSkill.growing1Level += 1;
                        app.player.set('defaultSkillLevel',defaultSkill);
                        tmpstr =  '子弹速度培养等级' + defaultSkill.growing1Level;
                    }
                    app.event.send(app.enum.event.UPDATE_PLANE);
                break;
                case app.enum.GROWING_SKILL_GROWING2:
                if( this.opts.roleId !== -1 ){
                    var roles = app.player.get('hero');
                    roles[ this.opts.roleId ].growing2Level += 1;
                    app.player.set( 'hero', roles );
                    tmpstr =  app.json.tbRole.json[ this.opts.roleId ].name + '培养2 等级'+ roles[ this.opts.roleId ].growing1Level;
                    app.homeWgt.selectRole.init();
                }else{
                    var defaultSkill = app.player.get('defaultSkillLevel');
                    defaultSkill.growing2Level += 1;
                    app.player.set('defaultSkillLevel',defaultSkill);
                    tmpstr =  '子弹强度培养等级' + defaultSkill.growing2Level;
                }
                    app.event.send(app.enum.event.UPDATE_PLANE);
                break;
                case app.enum.GROWING_CANDY:
                    app.player.set( 'profitBasics', app.player.get('profitBasics') + 1 );
                    tmpstr =  '糖果价值培养等级' + app.player.get('profitBasics');
                break;
                case app.enum.GROWING_DAILY:
                    app.player.set( 'profitDaily', app.player.get('profitDaily') + 1 );
                    tmpstr =  '日常收益培养等级' + app.player.get('profitDaily');
                    cc.find('Canvas/home/buttonHangUp').getComponent('hang-up-revenue').playGrowLevelEffect();
                break;
                default:
                break;
            }
            
            app.datasdk.statistics.strengthNodeBuyStatistics( tmpstr );
            var aniNode = cc.instantiate( app.resMgr.prefLevelUp );
            aniNode.parent = this.node;
            aniNode.position = this.num.node.position;
            aniNode.scale = 0.3;

            var dra = aniNode.children[0].getComponent( dragonBones.ArmatureDisplay ); 
            dra.addEventListener(dragonBones.EventObject.COMPLETE, function(){
                aniNode.destroy();
            }.bind( this ));

            this.init( this.opts.type, this.opts.roleId );
        }
    },

    onDestroy () {
        app.event.remove( this );
    },

    handleEvent ( name, param ) {
        if( name === app.enum.event.UPDATE_PLAYER_DATA ){
            if( param.name === 'coin' ){
                this.checkRedPoint();
            }
        }else if( app.enum.event.STRENGTH_GUIDE_CLICK === name ){
            this.checkGuide( param );
        }
    },

    checkGuide( param ) {
        switch( this.opts.type ){
            case app.enum.GROWING_SKILL_GROWING1:
                if( this.opts.roleId !== -1 ){
                }else{
                    if( param === 22 ){
                        this.clickLevelUp();
                    }
                }
            break;
            case app.enum.GROWING_SKILL_GROWING2:
            {
                if( this.opts.roleId !== -1 ){
                    if( param === 42 ){
                        this.clickLevelUp();
                    }
                }else{
                }
            }
            break;
            case app.enum.GROWING_CANDY:
                {
                    if( param === 32 ){
                        this.clickLevelUp();
                    }
                }
            break;
            case app.enum.GROWING_DAILY:
            break;
            default:
            break;
        }
    },

    checkRedPoint () {
        app.util.removeRedPoint( this.nodeButton );
        if( this.isRedPoint() ){
            app.util.createRedPoint( {parent:this.nodeButton} );
        }


        if( this.isRedPoint() ){
            this.coin.node.color = cc.color( 255,255,255 );
        }else{
            this.coin.node.color = cc.color( 255,0,0 );
        }
        
    },

    isRedPoint () {
        if( !this.opts ) return;
        return app.player.checkCoin( this.opts.data.num, true );
    }
});
