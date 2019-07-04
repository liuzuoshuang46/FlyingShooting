
var getHBSwitch = function () {


    if( CC_DEBUG ){
        setTimeout(function(){
            app.hbswitch = {
                hideVideoSpr:true, // 隐藏视频图标
                bannerDelay:true, // 延迟显示banner
                ccclick: true // 连续点击
            };
            app.event.send( app.enum.event.HBSwitch );
        },2);
        return;
    }

    var url = ""

    var xhr = cc.loader.getXMLHttpRequest();
    xhr.timeout = 5000;
    url = encodeURI( url );
    xhr.open("GET",url, true);

    xhr.onreadystatechange = function() {
        console.log('get console.log();', xhr.readyState, xhr.status, xhr.responseText );
        if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
            if (xhr.responseText && xhr.responseText.length >= 1)
            {
                try{
                    var ret = JSON.parse( xhr.responseText );

                    if(ret.isOpen)
                    {
                        if(ret.isOpen == 0)
                        {
                            app.hbswitch = {
                                hideVideoSpr:false, // 隐藏视频图标
                                bannerDelay:false, // 延迟显示banner
                                ccclick: false // 连续点击
                            };

                        }
                        else if(ret.isOpen == 1)
                        {
                            app.hbswitch = {
                                hideVideoSpr:(ret.video == 1 ? true : false), // 隐藏视频图标
                                bannerDelay:(ret.banner == 1 ? true : false), // 延迟显示banner
                                ccclick: (ret.click == 1 ? true : false) // 连续点击
                            };
                        }
                        app.event.send( app.enum.event.HBSwitch );
                    }
                    else {
                        app.hbswitch = {};
                    }

                }catch( e ) {
                    console.error( e );
                    app.hbswitch = {};
                }
            }
        }
    }.bind(this);
    xhr.send();
}

cc.Class({
    extends: cc.Component,

    properties: {
        gameMgr: require('game-manager'),
        homeWgt: require('home-widget'),
        logView: require('logview'),
        bgMove: require('BgMove'),
        json: {
            type: require('sfjson'),
            default: null,
            visible: false
        },
        debug: {
            type: require('debug'),
            default: null,
            visible: false
        },
        audioMgr: {
            type: require('audio-manager'),
            default: null,
            visible: false
        },
        animMgr: {
            type: require('home-animations'),
            default: null,
            visible: false
        },
        resMgr: {
            type: require('res-manager'),
            default: null,
            visible: false
        },
        chsdk: {
            type: require('CHSdk'), // 渠道sdk
            default: null,
            visible: false
        },
        datasdk: {
            type: require('datasdk'), // 数据统计sdk
            default: null,
            visible: false
        },
        util: {
            type: require('sfutil'), // 数据统计sdk
            default: null,
            visible: false
        },
        projFunc: {
            type: require('projFunc'),
            default: null,
            visible: false
        },
        player: {
            type: require('player-data'), // 数据统计sdk
            default: null,
            visible: false,
            serializable: false
        },

        pop: {
            type: require('pop-up-manager'),
            default: null
        },
        hbswitch: { // 黑白开关
            get() {
                return this._hbswitch;
            },
            set(val) {
                this._hbswitch = val;
            }
        },

        prefScript_json: cc.Prefab,
        prefScript_debug: cc.Prefab,
        prefScript_audioMgr: cc.Prefab,
        prefScript_animMgr: cc.Prefab,
        prefScript_resMgr: cc.Prefab,
        prefScript_datasdk: cc.Prefab,
        prefScript_datasdk: cc.Prefab,
        prefScript_util: cc.Prefab,
        prefScript_player: cc.Prefab,
        prefScript_projFunc: cc.Prefab,
        prefScript_WeaponUp: cc.Prefab,

        version: {
            visible: false,
            get() {
                return 'wx1.0.8';
            }
        },
        designSize: cc.size(640, 1136),
        strengthMax: {
            visible: false,
            get() {
                return 100;
            }
        },
        lockui: cc.Node,

        gameid: {
            visible: false,
            get() {
                return 'j6';
            }
        },
        qudaoId: {
            visible: false,
            get() {
                return 62;
            }
        },
        // shop: {
        //     type: require('shop'),
        //     default: null
        // },
        bannerDt: {
            visible: false,
            default: 1
        },
        rampageLabel: cc.Node,
        niravana1Anima: cc.Node,
        versionNode: cc.Label,
        sidebarList:new Array(),
        randStartIdx:0,
    },

    // LIFE-CYCLE CALLBACKS:

    init() {
        cc.audioEngine.stopMusic( );
        window.app = this;
        { // 非component
            window._ = require('underscore-min');
            this.event = require('event-manager')();
            var _enum = require('sfenum');
            this.enum = _enum;
            var _chsdk = require('CHSdk');
            this.chsdk = new _chsdk();
            var _G = require('G');
            app.G = _G;
        }

        { // component
            (function (arr) {
                for (var i in arr) {
                    var item = arr[i];
                    var node = cc.instantiate(app['prefScript_' + item.name]);
                    node.parent = app.node;

                    var st = node.getComponent(item.stname);
                    app[item.name] = st;
                }
            })([
                {
                    name: 'util',
                    stname: 'sfutil'
                },
                {
                    name: 'json',
                    stname: 'sfjson'
                },
                {
                    name: 'debug',
                    stname: 'debug'
                },
                {
                    name: 'audioMgr',
                    stname: 'audio-manager'
                },
                {
                    name: 'projFunc',
                    stname: 'projFunc'
                },
                {
                    name: 'animMgr',
                    stname: 'home-animations'
                },
                {
                    name: 'resMgr',
                    stname: 'res-manager'
                },
                {
                    name: 'datasdk',
                    stname: 'datasdk'
                },
                {
                    name: 'player',
                    stname: 'player-data'
                }]);
        }

        if (!CC_DEBUG) {
            this.debug = {};
        }


        app.hbswitch = false;
        this.util.init();
        this.chsdk.init();
        this.datasdk.init();
        this.player.init();
        this.audioMgr.init();
        this.lockView();

        this.animMgr.init();
        getHBSwitch();

        this.versionNode.string = this.version;
		
        cc.find('Canvas/version').getComponent(cc.Label).string = this.version;

        if( window.promoCfgs ){
            this.handlePromoCfgs( window.promoCfgs );
        }
        // for(var i=0;i<response.data.side.length;i++)
        // {
        //     app.sidebarList.push(response.data.side[i]);
        // }
        // app.homeWgt.homePromotion.init();
        //
        // app.homeWgt.homePromotion1.init();
        // app.homeWgt.homePromotion1.node.active = true;

        this.audioMgr.playMusic(this.audioMgr.newBg);
    },

    handlePromoCfgs ( data ) {
        this.sidebarList = [];
        if( data.code == 1 ){
            data.data.forEach( item => {
                var obj = {
                    appid:item.to_appid,
                    jump_type:item.jump_type,
                    name:item.togame_name,
                    path:item.jump_path,
                    imageUrl: item.icon,
                    platform_appid:item.platform_appid,

                }
                this.sidebarList.push( obj );
            });
        }
    },

    //心跳函数
    heart()
    {
        console.log("app.heart");
        this.schedule(function(){
                app.chsdk.heart();
            },
            window.liuyang_heart);
    },

    start () {
        
        this.init();
        console.log('app-start');
        this.schedule( this.onlineUpdate.bind( this ), 30 );
        this.schedule( this.randPrizeBox.bind( this ), 5 );
        this.animMgr.returnHome();

        this.node.runAction(cc.sequence(
            cc.delayTime(0.2),
            cc.callFunc( function(){
                app.pop.push( app.resMgr.prefPopRandPrize1Box );
            }.bind( this ) )
        ));


    },

    randPrizeBox () {

        return;
        if( !app.chsdk.canPlayVideo() ){
            return;
        }
        var data = app.player._randPrizeBoxData;
        if( data.show ){
            return;
        }
        if( !app.player.randPrizeBoxEnable() ){
            return;
        }
        if( !data.randTime ){
            data.randTime = _.random( 60, 180 );
            // data.randTime = _.random( 3, 4 );
        }
        if( app.chsdk.adShow ){
            return;
        }
        data.randTime -= 5;
        if( data.randTime <= 0 ){
            data.randTime = 0;
            data.show = true;
            this.projFunc.showRandPrizeBox( true );
        }
    },

    startGame () {
        // if( app.player.subStrengthStartGame() ){
            app.datasdk.statistics.scrollScreenStartGame();
            this.gameMgr.startGame();
            this.homeWgt.startGame();
            this.animMgr.startGame();

            // if( app.player._randPrizeBoxData.show ){
            //     this.projFunc.showRandPrizeBox( true );
            // }
            return true;
        // }else{
        //     this.logView.log( '体力不足' );
        // }
        return false;
    },

    returnHome () {
        this.gameMgr.returnHome();
        this.homeWgt.returnHome();
        this.animMgr.returnHome();

        app.pop.push( app.resMgr.prefPopRandPrize3Box );
        app.bgMove.updataBg();
    //     if( app.player._randPrizeBoxData.show ){
    //         this.projFunc.showRandPrizeBox( true );
    //     }
    //     if( app.player._showRandPrizeBoxOnReturnHome ){
    //         app.player._showRandPrizeBoxOnReturnHome = false;
    //         app.pop.push( app.resMgr.prefPopRandPrizeBox );
    //     }
    },

    showRevival () {
        cc.find('Canvas/revival').getComponent('revival').show();
        //this.animMgr.showRevival();
    },
    showRampage () {

        this.rampageLabel.active = true;
        this.rampageLabel.runAction(cc.sequence(
            cc.fadeIn(0.01),
            cc.delayTime(0.5),
            cc.fadeOut(1),
            cc.callFunc( function(){
                this.rampageLabel.active = false;
            }.bind( this ) )
        ));
    },
    //显示必杀技动画
    showNiravana1Anima () {
        this.niravana1Anima.active = true;
        this.niravana1Anima.getChildByName("label1").runAction(cc.sequence(
            cc.fadeOut(0.01),
            cc.fadeIn(0.01),
            cc.scaleTo(0.01,3,3),
            cc.scaleTo(0.5,2,2)
        ));
        this.niravana1Anima.getChildByName("label2").runAction(cc.sequence(
            cc.fadeOut(0.01),
            cc.delayTime(0.5),
            cc.fadeIn(0.01),
            cc.scaleTo(0.01,3,3),
            cc.scaleTo(0.5,2,2)
        ));
        this.niravana1Anima.getChildByName("label3").runAction(cc.sequence(
            cc.fadeOut(0.01),
            cc.delayTime(1),
            cc.fadeIn(0.01),
            cc.scaleTo(0.01,3,3),
            cc.scaleTo(0.5,2,2)
        ));
    },
    //隐藏必杀技动画
    hideNiravana1Anima () {
        this.niravana1Anima.active = false;
    },

    //显示火力提升动画
    showWeaponUp (point,parentNode) {

        app.audioMgr.play(app.audioMgr.audioLvup, false, true );

        var node = cc.instantiate( this.prefScript_WeaponUp );
         node.x = point.x - 320;
         node.y = point.y - 568;
        node.parent = this.node;
        node.zIndex = 999
        node.name = "WeaponUp";
        cc.log("showWeaponUp",point);
        node.runAction(cc.sequence(
            cc.spawn(
                cc.fadeOut(2),
                cc.scaleTo(1.5,2,2)
            ),
            cc.callFunc( function(){
                    this.destroy();
                }.bind( node )
             ))
        );

    },
    showSetting () {
        this.animMgr.showSetting();
    },
    lockView ( ret, msg ) {
        this.lockui.active = ret;
        var lbl = this.lockui.getChildByName('label').getComponent( cc.Label );
        lbl.string = '';
        if( msg ){
            lbl.string = msg;
        }
    },

    onlineUpdate () {
        if( !this._onlineNum ){
            this._onlineNum = 0;
        }
        ++this._onlineNum;

        app.datasdk.statistics.onlineStatistics( this._onlineNum );
    },

    // 金币
    clickAddCoin () {
        if( app.chsdk.canPlayVideo() ) {
            this.projFunc.adVideoAddCoin();
        }else{
            // app.animMgr.showShop();
            // this.shop.showType( app.enum.CURRENCY_CANDY );
        }
    },
    // 体力
    clickAddStrength () {
        // app.animMgr.showShop();
        // this.shop.showType( app.enum.TYPE_STRENGTH );
    },
    // 钻石
    clickAddDiamond () {
        if( app.chsdk.canPlayVideo() ) {
            this.projFunc.adVideoAddDiamond();
        }else{
            app.logView.log('钻石不足');
        }
    }
});
