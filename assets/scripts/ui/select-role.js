// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var idx2FrameName = {
    1:2,
    2:3,
    3:4,
    4:5,
    5:1
}

cc.Class({
    extends: cc.Component,

    properties: {
        planeModel:{ // 飞机模型图片
            type: cc.Sprite,
            default: null
        },
        _toggles:[],
        btnApply : cc.Node,
        btnBuy : cc.Node,

        growingNode1:{
            type: require('strengthenNode'),
            default:null
        },
        growingNode2:{
            type: require('strengthenNode'),
            default:null
        },
        nodeHave: cc.Node,
        nodeBuy: cc.Node,
        lblPrice: cc.Label,
        spCurrency:cc.Sprite,
        nodeGrayBlock: cc.Node,
    },

    start () {
        app.homeWgt.checkRedPoint();
    },

    init () {
        this.initData();
        this.initUI();
    },
    
    initData() {
        this._roleData = app.player.get('hero');
        this._toggles = [];

        var childs = this.node.getChildByName('New Node').children;
        for( var i in childs ){
            this._toggles.push( childs[i] );
        }

        if( !this._selectIndex ) {
            this._selectIndex = app.player.get('useRoleId');
        }
    },

    initUI () {
        for( var i in this._toggles ){
            var btn = this._toggles[i];
            var roleId = parseInt( i ) + 1;

            var sp = btn.getChildByName('weijiesuo');
            if( this._roleData[roleId].lock ){
                sp.getComponent( cc.Sprite ).spriteFrame = app.resMgr.frameLock;
                sp.active = true;
                this.planeModel.node.color = cc.color( 80,80,80 );
                btn.getComponent(cc.Toggle).target.color = cc.color( 80,80,80 );
            }else if( app.player.get('useRoleId') == roleId ){
                sp.getComponent( cc.Sprite ).spriteFrame = app.resMgr.frameSelected;
                sp.active = true;
                btn.getComponent(cc.Toggle).target.color = this.planeModel.node.color = cc.color( 255,255,255 );
            }else{
                sp.active = false;
                btn.getComponent(cc.Toggle).target.color = this.planeModel.node.color = cc.color( 255,255,255 );
            }

            // var btnTryOut = btn.getChildByName('manjishiyong');
            // if( !app.player._tryOutRoleData.used && roleId == app.player._tryOutRoleData.id ){
            //     btnTryOut.active = true;
            //     sp.active = false;
            // }else{
            //     btnTryOut.active = false;
            // }
        }
        this.selectRole( this._selectIndex );
        //cc.find('Canvas/home/toggle/toggle4/manjishiyong').zIndex = 2;
        //cc.find('Canvas/home/toggle/toggle4/manjishiyong').active = !app.player._tryOutRoleData.used && !!app.player._tryOutRoleData.id;
    },

    selectRole ( roleId ) {
        this.selectIdx( roleId );
    },

    selectIdx ( idx ) {
        this.toggleEventEmitByCode = true;

        for( var i in this._toggles ){
            if( idx == Number(i) + 1 ){
                this._toggles[i].getComponent(cc.Toggle).isChecked = true;
            }else{
                this._toggles[i].getComponent(cc.Toggle).isChecked = false;
            }
        }
        this.changePlane( null, idx );
    },

    playAudioByRoleId( rid ){
        //if( this.playingAudio ){
       //     app.audioMgr.stop( this.playingAudio );
       // }

       // this.playingAudio = app.audioMgr['audioRoleId' + rid ];
        //app.audioMgr.play( this.playingAudio, false, true );
    },
    
    changePlane ( toggle, idx ) {

        if( !this.toggleEventEmitByCode && toggle ){
            var rid = this._roleData[idx].roleId;
            app.datasdk.statistics.selectRoleToggleStatistics( app.json.tbRole.json[rid].name );
            
            this.playAudioByRoleId( rid );
        }
        
        this.toggleEventEmitByCode = false;
        
        idx = Number( idx );
        this._selectIndex = idx;
        this.planeModel.spriteFrame = app.resMgr[ 'frameRoleModel' + idx ];
        
        if( this._roleData[this._selectIndex].lock ) {
            this.nodeGrayBlock.active = true;
            this.planeModel.node.color = cc.color( 80,80,80 )
        }else{
            this.nodeGrayBlock.active = false;
            this.planeModel.node.color = cc.color( 255,255,255 )
        }

        this.growingNode1.init( app.enum.GROWING_SKILL_GROWING1, idx );
        this.growingNode2.init( app.enum.GROWING_SKILL_GROWING2, idx );

        app.homeWgt.checkRedPoint();

        this.nodeBuy.active = !!this._roleData[this._selectIndex].lock;
        this.nodeHave.active = !this._roleData[this._selectIndex].lock  && app.player.get('useRoleId') != this._selectIndex;
        var tbData = app.json.tbRole.json[ this._selectIndex ];
        if( tbData.rmb ){
            this.lblPrice.string = '售价:' + tbData.rmb;
            this.spCurrency.spriteFrame = app.resMgr.frameDiamond;
            this.spCurrency.node.scale = 1;
        }else if( tbData.gold ) {
            this.lblPrice.string = '售价:' + tbData.gold;
            this.spCurrency.spriteFrame = app.resMgr.frameCandy;
            this.spCurrency.node.scale = 0.5;
        }
    },

    usePlane () {
        this.playAudioByRoleId( this._selectIndex );
        app.player.set('useRoleId',this._selectIndex);
        this.init();
        app.event.send( app.enum.event.ROLE_INFIGHT );
    },

    buyPlane () {
        var tbData = app.json.tbRole.json[ this._selectIndex ];
        if( tbData.rmb && app.player.checkDiamond( tbData.rmb ) ){
            app.player.diamondBuy( tbData.rmb );
        }else if( tbData.gold && app.player.checkCoin( tbData.gold ) ) {
            app.player.coinBuy( tbData.gold );
        }else{
            return;
        }
        app.datasdk.statistics.roleBuyStatistics( tbData.name );
        this._roleData[ this._selectIndex ].lock = false;
        app.player.set('hero',this._roleData);
        this.init();
    },

    onDisable () {
        if( this.playingAudio ){
            app.audioMgr.stop( this.playingAudio );
        }
    },

    tryOutRole () {
        var successCall = function(){
            app.player._tryOutRoleData.used = true;
            app.gameMgr.resetPlane();
            app.startGame();
            app.player.addTryOutRoleNum();
            this.init();
        }.bind( this );
        
        app.chsdk.callAdVideo( function( ret ){
            if( ret ){
                successCall();
            }else{
                app.logView.log('奖励领取失败');
            }
        } );
    }
});
