// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var buyCost = 3000;
var timeDt = 30;

cc.Class({
    extends: cc.Component,

    properties: {
        nodeEffect:cc.Node,
        spMask: cc.Sprite,

    },

    start :function() {
        this.schedule( this.timeInterval, 1 );
    },

    init :function() {
        this.initData();
        this.initUI();
    },

    timeInterval:function () {
        if( this._useIntervel && this._useIntervel > 0 ){
            this._useIntervel -= 1;
            var percent = this._useIntervel / timeDt;
            this.spMask.fillRange = percent;

            if( this._useIntervel <= 0 ){
                delete this._useIntervel;
                this.init();
            }
        }
    },

    initData :function() {
        this.tbData = app.json.tbFitPlane.json[ 1 ];
    },

    initUI:function () {
        this.nodeEffect.active = false;
        this.spMask.node.active = false;


        this.spMask.fillRange = 1;

        if( this._useIntervel ){
            this.spMask.node.active = true;
        }else{
            this.nodeEffect.active = true;
        }

        //this.showNodeSelFitPlaneRoot( false );
        //this.resetSelFitPlaneUI();
    },
    //
    // showNodeSelFitPlaneRoot:function ( show ) {
    //     if( show ){
    //         app.gameMgr._isSelFitPlaneNodeShow = true;
    //     }else{
    //         app.gameMgr._isSelFitPlaneNodeShow = false;
    //     }
    //     this.nodeSelRoot.active = show;
    //     if( show ){
    //         this.resetSelFitPlaneUI();
    //     }
    // },
    //
    // hideSelNode:function(){
    //     app.gameMgr._isSelFitPlaneNodeShow = false;
    //     this.nodeSelRoot.active = false;
    // },
    //
    // resetSelFitPlaneUI:function () {
    //     this.resetSelFightPlaneLbl();
    // },
    //
    // resetSelFightPlaneLbl:function () {
    //     var curroleid = app.player.getUseRoleId();
    //     var fitroleid = this.idx2RoleId[ this._selectedTogglesIdx ];
    //     var jsonrolecur = app.json.tbRole.json[ curroleid ];
    //     var jsonrolefit = app.json.tbRole.json[ fitroleid ];
    //
    //     var jsonfitplane = app.json.tbFitPlane.json[ curroleid ];
    //     var jsonfitdata = app.json.tbFitData.json[ jsonfitplane['fit_' + fitroleid] ];
    //
    //     this.lblSelDesc1.string = '附带' + jsonrolecur.name + '飞侠技能';
    //     this.lblSelDesc2.string = '附带' + jsonrolefit.name + '飞侠技能';
    //     this.lblSelDesc3.string = '攻击力提升+' + jsonfitdata.attack_up + '%';
    //     this.lblSelFitPlaneName.string = '默认每次与' + jsonrolefit.name + '合体';
    //     this.lblSelFitPlaneNameInBtn.string = '与' + jsonrolefit.name + '合体';
    //
    //     if( !jsonfitdata.inherit_skill1 ){
    //         this.lblSelDesc1.string = '';
    //     }
    //     if( !jsonfitdata.inherit_skill2 ){
    //         this.lblSelDesc2.string = '';
    //     }
    // },

    clickSkill :function() {

        app.gameMgr.userShield1();
        this._useIntervel = timeDt;
        this.init();
        return;
        // if( !app.player.get('changeDefaultFitPlane') ){
        //     this.showNodeSelFitPlaneRoot( true );
        //     return;
        // }
        //
        // if( this._tryOutFitPlaneId ){
        //     this.showNodeSelFitPlaneRoot( true );
        //     return;
        // }
        //
        // this.clickFitPlane();
    },

    // toggleEvent:function( toggle, idx ){
    //     this._selectedTogglesIdx = idx;
    //     this.nodeSelPlaneNode.removeAllChildren();
    //
    //     var curroleid = app.player.getUseRoleId();
    //     var fitroleid = this.idx2RoleId[ this._selectedTogglesIdx ];
    //     var jsonfitplane = app.json.tbFitPlane.json[ curroleid ];
    //     var jsonfitdata = app.json.tbFitData.json[ jsonfitplane['fit_' + fitroleid] ];
    //
    //     var plane = cc.instantiate( app.resMgr[ 'prefPlaneModel' + jsonfitdata.model ] );
    //     plane.parent = this.nodeSelPlaneNode;
    //     this.resetSelFightPlaneLbl();
    // },
    //
    // clickFitPlane:function(){
    //     if( app.player.get('level') < app.G.guideCheck.fitPlane.level ){
    //         app.logView.log('第' + app.G.guideCheck.fitPlane.level + '关开启');
    //         return;
    //     }
    //     if( app.player.get('freeFitPlaneNum') ){
    //         app.player.set('freeFitPlaneNum',0);
    //         app.gameMgr.useFitPlaneWithRoleId1( this.idx2RoleId[ this._selectedTogglesIdx ] );
    //         this._useIntervel = timeDt;
    //         this.init();
    //         return;
    //     }
    //
    //     var roleId = this.idx2RoleId[ this._selectedTogglesIdx ];
    //     if( this.rolesData[roleId].lock && roleId == this._tryOutFitPlaneId ){
    //         this._tryOutFitPlaneId = app.gameMgr._tryOutFitPlaneId = 0;
    //     }
    //
    //     var successCall = function(){
    //         app.player.addFitPlaneNum();
    //         app.gameMgr.useFitPlaneWithRoleId1( this.idx2RoleId[ this._selectedTogglesIdx ] );
    //         this._useIntervel = timeDt;
    //         this.init();
    //     }.bind( this );
    //
    //     if( !app.chsdk.canPlayVideo() ) {
    //         app.projFunc.popDiamondBuy({
    //             cost:30,
    //             str:'一次合体技能',
    //             next: successCall
    //         });
    //     }else{
    //         app.chsdk.callAdVideo( function( ret ){
    //             if( ret ){
    //                 successCall();
    //             }else{
    //                 app.logView.log('奖励领取失败');
    //             }
    //         } );
    //     }
    // },
    //
    // selectDefaultPlane :function( toggle ) {
    //     var roleId = this.idx2RoleId[ this._selectedTogglesIdx ];
    //     if( !toggle.isChecked ) {
    //         roleId = 0;
    //         delete this._selectedTogglesIdx;
    //     }else{
    //         if( this.rolesData[ roleId].lock ){
    //             return;
    //         }
    //     }
    //     app.player.set('changeDefaultFitPlane', roleId );
    //     this.resetSelFitPlaneUI();
    // },
    //
    // clickTryOutBtn :function() {
    //     this.clickSkill( true );
    // },
    //
    // clickTryOutRole:function( toggle, idx ){
    //     this.toggleEvent( null, idx );
    //     this.clickFitPlane();
    // },
});
