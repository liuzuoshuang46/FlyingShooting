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
        lblCoin:{
            default:null,
            type:cc.Label
        },
        lblStrength:{
            default:null,
            type:cc.Label
        },
        lblDiamond:{
            default:null,
            type:cc.Label
        },
        //强化
        // nodeStrengthen:{
        //     default:null,
        //     type:cc.Node
        // },
        // //收益
        // nodeIncome:{
        //     default:null,
        //     type:cc.Node
        // },
        // //选择角色
        // nodeRole:{
        //     default:null,
        //     type:cc.Node
        // },
        //选择飞机
        nodePlane:{
            default:null,
            type:cc.Node
        },
        //选择僚机
        nodeSupport:{
            default:null,
            type:cc.Node
        },

        nodeSetting:{
            default:null,
            type:cc.Node
        },
        // selectRole : {
        //     type:require('select-role'),
        //     default:null
        // },
        selectPlaneLayer : {
            type:require('planeLayer'),
            default:null
        },
        selectSupportLayer : {
            type:require('supportLayer'),
            default:null
        },
        // defaultSkillGrowingNode1:{
        //     type: require('strengthenNode'),
        //     default:null
        // },
        // defaultSkillGrowingNode2:{
        //     type: require('strengthenNode'),
        //     default:null
        // },
        // candyGrowingNode:{
        //     type: require('strengthenNode'),
        //     default:null
        // },
        // dailyGrowingNode:{
        //     type: require('strengthenNode'),
        //     default:null
        // },
        // nodeRandPromo: cc.Node, // 交叉推广随机的一个摇晃的节点
        homePromotion: require('home-promotion'),
        homePromotion1: require('home-promotion'),
        btnSetting:{
            default:null,
            type:cc.Sprite
        },
    },

    showPromotion () {
        if(app.sidebarList.length > 0) {
            this.homePromotion.node.active = true;
        }
    },

    hidePromotion () {
        this.homePromotion.node.active = false;
    },

    clickRandProItem () { // 点击交叉推广的随机节点
        // console.log(this.nodeRandPromo.randCfg);
        // app.chsdk.promotion( this.nodeRandPromo.randCfg, function( ret ){
        //     if( ret ){
        //         app.datasdk.statistics.promotion( this.nodeRandPromo.randCfg );
        //     }
        // }.bind( this ));
    },

    // 随机一个交叉推广的游戏展示
    randPromoItemUpdate () {
        // var randCfg = this.homePromotion.randProItem();
        // randCfg.showType = '大厅推广按钮';
        // this.nodeRandPromo.getChildByName('pro-1').getComponent( cc.Sprite ).spriteFrame = randCfg.frame;
        // this.nodeRandPromo.getChildByName( 'homeui' ).getComponent( cc.Label ).string = randCfg.name;
        // this.nodeRandPromo.randCfg = randCfg;
    },

    initPromotion () {
       this.homePromotion1.node.active = false;
        this.showPromotion ()
        // this.homePromotion.init();

        this.hidePromotion();
        
        this.randPromoItemUpdate();
        // var act = cc.repeatForever(
        //     cc.sequence(
        //         cc.rotateBy( 0.2,30 ).easing( cc.easeIn(3) ),
        //         cc.rotateBy( 0.2,-60 ),
        //         cc.rotateBy( 0.2,30 ).easing( cc.easeOut(3) ),
        //         cc.delayTime( 1 ),
        //
        //         cc.rotateBy( 0.2,30 ).easing( cc.easeIn(3) ),
        //         cc.rotateBy( 0.2,-60 ),
        //         cc.rotateBy( 0.2,30 ).easing( cc.easeOut(3) ),
        //         cc.delayTime( 1 ),
        //
        //         cc.callFunc( this.randPromoItemUpdate.bind( this ) )
        //     )
        // );
        //
        // this.nodeRandPromo.runAction( act );
    },

    // LIFE-CYCLE CALLBACKS:

    onDestroy () {
        app.event.remove( this );
    },

    checkStrengthStory ( level ) {
        if( level > 5 ){
            return;
        }
        if( app.player.get('strengthGuide') >= level ){
            return;
        }

        app.util.removeChildByName( this.node, 'strengthGuide' );
        // var guide = cc.instantiate( app.resMgr.prefStrengthGuid );
        // guide.name = 'strengthGuide';
        // guide.parent = this.node;
        // guide.zIndex = 1000;
        // guide.getComponent('strengthGuide').show( level );
    },

    checkRedPoint () {
        var tp = cc.find('Canvas/home/toggle');

        app.util.removeRedPoint( tp.children[1] );
        app.util.removeRedPoint( tp.children[2] );
        app.util.removeRedPoint( tp.children[3] );
        
        // if( this.defaultSkillGrowingNode1.isRedPoint() || this.defaultSkillGrowingNode2.isRedPoint() ){
        //     app.util.createRedPoint( {parent:tp.children[2]} );
        // }
        //
        // if( this.candyGrowingNode.isRedPoint() || this.dailyGrowingNode.isRedPoint() ) {
        //     app.util.createRedPoint( {parent:tp.children[1]} );
        // }

        // if( this.selectRole.growingNode1.isRedPoint() || this.selectRole.growingNode2.isRedPoint() ) {
        //     app.util.createRedPoint( {parent:tp.children[3]} );
        // }
        
    },


    handleEvent ( name, param ) {
        switch( name ){
            case app.enum.event.UPDATE_PLAYER_DATA:
            {
                switch( param.name ){
                    case 'coin':
                        this.lblCoin.string = app.util.formatNum( param.val );
                        this.checkRedPoint();
                    case 'level':
                        this.checkStrengthStory( param.val );
                    break;
                    case 'diamond':
                        this.lblDiamond.string = app.util.formatNum( param.val );
                    break;
                    case 'strengthData':
                        //this.lblStrength.string = app.util.formatNum( param.val.num );
                    break;
                    case 'useRoleId':
                        this.updateGrowingNodes();
                    break;
                    case 'strengthGuide':
                        this.checkIsCheckedIn();
                    break;
                }
            }
            break;
            case app.enum.event.ROLE_INFIGHT:{
                this.toggleEvent( 0 , 1 );
            }
            break;
            case app.enum.event.DISABLE_AD_VIDEO:{
                this.disableADBtn();
                app.projFunc.showRandPrizeBox( false );
                app.pop.clear();
            }
            break;
        }
    },

    initData () {
    },

    initUI() {
         this.selectPlaneLayer.init();
        this.selectSupportLayer.init();
        this.toggleEvent( 0 , 1 );
        this.updatePlayerAttr();
        this.updateGrowingNodes();
        this.checkRedPoint();
        this.initLevelArrow(); // 关卡上面的箭头指引
        this.initPromotion();

        // cc.find('Canvas/home/buttonHangUp').active = false;
        //
        // var nodeHangUp = cc.find('Canvas/home/buttonHangUp/nodeHangUp');
        // if( nodeHangUp ){
        //    nodeHangUp.active = false;
        // }

        if( !app.chsdk.canPlayVideo() ){
            this.disableADBtn();
        }
        this.resetSettingBtn();

    },
    resetSettingBtn()
    {
        var stt= "";
        if(app.player.get('switchAudio')) {
            stt = "LiuYang/resources/ui/soundOpen";
        }
        else
        {
            stt = "LiuYang/resources/ui/soundClose";
        }
        cc.loader.loadRes(stt, cc.SpriteFrame, function (err, spriteFrame) {
            this.btnSetting.spriteFrame = spriteFrame;
        }.bind( this ));
    },
    initLevelArrow () {
        var node = cc.find('Canvas/home/toggle/toggle1/jiantou');
        node.runAction( cc.repeatForever( cc.sequence(
            cc.callFunc( function(){
                node.y += 50;
            }),
            cc.moveBy( 0.8,0, -50 ).easing( cc.easeOut( 3 ) )
        ) ) );
    },

    showLevelArrow ( show ) {
        var node = cc.find('Canvas/home/toggle/toggle1/jiantou');
        node.opacity = 255 * Number(show);
    },

    disableADBtn () {
        cc.find('Canvas/home/dingbu/buttonDiamond').active = false;
    },

    updateGrowingNodes () {
        // this.candyGrowingNode.init( app.enum.GROWING_CANDY );
        // this.dailyGrowingNode.init( app.enum.GROWING_DAILY );
        // this.defaultSkillGrowingNode1.init( app.enum.GROWING_SKILL_GROWING1, -1 );
        // this.defaultSkillGrowingNode2.init( app.enum.GROWING_SKILL_GROWING2, -1 );
    },

    // 玩家金币体力之类的属性显示
    updatePlayerAttr () {
        this.lblCoin.string = app.util.formatNum( app.player.get('coin') );
        //this.lblStrength.string = app.util.formatNum( app.player.get('strengthData').num );
        this.lblDiamond.string = app.util.formatNum( app.player.get('diamond') );
    },

    start () {
        console.log('homewidget-start');

        app.event.add( this );
        this.initData();
        this.initUI();
        
        app.datasdk.statistics.loginStatistics();
        this._startActionQueue = [
            // this.checkStoryGuide.bind( this ),
            this.checkIsCheckedIn.bind( this )
        ];
        this.nextStartAction();

        this.homePromotion.init();

        this.homePromotion1.init();
        this.homePromotion1.node.active = true;
    },

    nextStartAction() {
        if( this._startActionQueue.length ){
            while( this._startActionQueue.length && !this._startActionQueue.splice(0,1)[0]() ){}
        }
    },

    checkStoryGuide ( next ) {
        if( !app.player.get( 'storyGuide' ) ){
            var guide = cc.instantiate( app.resMgr.prefStoryGuide );
            guide.parent = this.node;
            guide.zIndex = 999;
            return true;
        }
        return false;
    },

    checkIsCheckedIn ( next ) {
        if(  app.player.get('strengthGuide') < 4 ){
            return;
        }
        var checkInData = app.player.get('checkIn');
        var timeNow = JSON.stringify( new Date() ).substring(0,11);
        if( checkInData.time === timeNow ){
            return false;
        }
        var checkInNode = cc.instantiate( app.resMgr.prefCheckIn );
        checkInNode.parent = this.node;
        checkInNode.zIndex = 999;
        return true;
    },

    startGame () {
        // var childs = this.node.children;
        // for( var i in childs ){
        //     var child = childs[i];
        //     child.touchEnabled = false;
        //     child.runAction( cc.sequence(
        //         cc.fadeOut(1),
        //         cc.callFunc( function() {
        //             child.active = false;
        //         })
        //     ) );
        // }
    },

    returnHome ( ) {
            
    },

    // 设置按钮
    clickSetting () {
        app.player.set('switchAudio',!app.player.get('switchAudio'));
        app.player.set('switchShake',!app.player.get('switchShake'))
        this.resetSettingBtn();
        //this.nodeSetting.active = true;
        //app.showSetting();
    },
    // 下面的一排按钮选中 type 1-4
    toggleEvent ( toggle, type ) { 
        var type2Node = {
            1:this.nodePlane,
            2:this.nodeSupport,
        };
        var type3Component = {
            1:this.nodePlane.getComponent("planeLayer"),
            2:this.nodeSupport.getComponent("supportLayer"),
        };
        for( var i in type2Node ){
            var node = type2Node[i];
            if(node == null)
                continue;
            if( i == type ){
               node.active = true ;
                type3Component[i].selectData(type3Component[2 -  type + 1]._selectIndex);
            }else{
                 node.active = false;
            }
        }

        // var cfg = [
        //     0,
        //     {bg:false,di:false,text:true,nodeRandPromo:true},
        //     {bg:false,di:true,text:false,nodeRandPromo:false},
        //     {bg:true,di:true,text:false,nodeRandPromo:false},
        //     {bg:true,di:true,text:false,nodeRandPromo:false},
        // ][ type ];
        //
        // this.selectRole.planeModel.node.active = cfg.bg;
        // this.selectRole.selectRole(app.player.getUseRoleId());
        //
        // //this.nodeRandPromo.active = cfg.nodeRandPromo;
        // this.node.getChildByName('beijing').active = cfg.bg;
        // this.node.getChildByName('di3').active = cfg.di;
        // cc.find('Canvas/home/homeui').active = cfg.text;
        //
        // if( type != 1 ){
        //     app.gameMgr.plane.goCenterAction();
        // }else{
        //     app.gameMgr.plane.backBottomAction();
        // }
        //
        // cc.find('Canvas/home/toggle/toggle' + type).getComponent( cc.Toggle ).isChecked = true;
        // this.randTryOutRoleId();
        // this.selectRole.init();
        //
        // this.showLevelArrow( type != 1 );
    },

    randTryOutRoleId () {
        //
        // if( !app.chsdk.canPlayVideo() ){
        //     return;
        // }
        // if( app.player._tryOutRoleData.id ){
        //     return;
        // }
        // if( app.player.get('level') < 4 ){
        //     return;
        // }
        // var roleIdArr = [];
        // var roles = app.player.get('role');
        // for( var i in roles ){
        //     if( roles[i].lock ){
        //         var canBuy = false;
        //         var tbData = app.json.tbRole.json[ roles[i].roleId ];
        //         if( tbData.rmb && app.player.checkDiamond( tbData.rmb, true ) ){
        //             canBuy = true;
        //         }else if( tbData.gold && app.player.checkCoin( tbData.gold, true ) ) {
        //             canBuy = true;
        //         }
        //
        //         if( !canBuy ){
        //             roleIdArr.push( roles[i].roleId );
        //         }
        //     }
        // }
        //
        // if( !roleIdArr.length ){
        //     return;
        // }
        //
        // var randPercent = 30;
        // var randRet = _.random( 1, 100 );
        // if( randPercent < randRet ){
        //     var roleIdLength = roleIdArr.length;
        //     app.player._tryOutRoleData = {
        //         id:roleIdArr[ _.random( 0, roleIdLength - 1 ) ],
        //         used: false
        //     }
        // }
    }
});
