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
        image_ren:{
            type: cc.Node,
            default: null
        },

        label_num:{
            type: cc.Label,
            default: null
        },
        image_tiao:{
            type: cc.Node,
            default: null
        },
        node_jiazai:{
            type: cc.Node,
            default: null
        },
        clip_music:{
            type: cc.AudioClip,
            default: null
        },
        btn_start:{
            type: cc.Button,
            default: null
        },
        node_ren:{
            type: [cc.Node],
            default: []
        },
    },

    // LIFE-CYCLE CALLBACKS:


    wxShowShareBtn(){
        if( !window.wx ){
            return;
        }
        //开启右上角的分享
        wx.showShareMenu();
        wx.onShareAppMessage(function (res) {
            return {
                title: "喂，你的佣兵！不，是你的佣兵！",
                imageUrlId:'mLzST_YdSS2WuDdV_oFyGQ',
                imageUrl:'https://mmocgame.qpic.cn/wechatgame/G0oJdv74boHrHQhJxhwg8k1VrXtIUDK6gGMjCrxUVfnfunCCKT3ibjzibHnNJlLzicu/0'
            }
        })
        return true;
    },

    showShareBtn() {
        this.wxShowShareBtn();
   },

     onLoad : function() {

         if( window.wx ){
            let sdk = require("fyhd_v2.0");
            window.fysdk = sdk.getFyhd();

            fysdk.startSdk();

            var param = {}
            fysdk.shareRecommend(param, (arg1) => {
                console.log('风云sdk',arg1);
                window.promoCfgs = arg1;
                if( window.app ){
                    app.handlePromoCfgs( arg1 );
                }
            });
         }
         window.isValueuser = true;
     },
    initBannerMgr()
    {
        let bids = [
                    "adunit-861f105969ec7efd",
                    "adunit-36732082da442c0d",
                    "adunit-7593b4aa2679d1e2",
                    "adunit-a4c07cb8f4c35872",
                    "adunit-ff116008fafc471a",
                    "adunit-15348828d261228f",
                    "adunit-e73e71bb7eff34d2",
                    "adunit-9659bd2fb075a7f5",
                    "adunit-167ce14e615d7caf",
                    "adunit-7b3e51f5d5149ae6",
                    "adunit-1d004e336d8069fd",
                    ];

        for( var i = 0;i < 4;i ++ ){
            if( !bids[i] ){
                bids[i] = bids[0];
            }
        }

        var mgr = require('bannerMgr');
        window.bannerMgr = new mgr();
        bannerMgr.init({
            bids:bids,
            checkDt: 0.1,           // 几秒检查一次，1. 重新创建创建失败的banner 2. 删除用过的banner，并预创建一个新的备用
            errorNumMax: 10,        // 一个bannerid 拉取banner失败的最大次数，超过不再刷新此banner
            clearErrorNumDt: 10,    // 几秒清除一次bannerid的拉取失败次数,
            openLog: true           // bannerMgr 相关的log开关 报错时log数量巨大
        });

    },

    start: function () {


        // cc.sys.localStorage.clear();
        this.scheduleOnce( function(){
            this.init();
        }.bind(this),0.5);

    },
    init()
    {
        window.LoginState = false;
        window.shareJs = 0;

        this.timeValue = 0.0;
        this.loadScene = false;
        var callback = cc.callFunc(this.moby, this);
        var seq = cc.sequence(cc.moveTo(0.4, cc.v2(0, 341)),cc.scaleTo(0.2,1.5,1.5),cc.scaleTo(0.2,1,1));
        this.image_ren.runAction(seq);

        this.scaleXvalue = 0;

        this.label_num.getComponent(cc.Label).string = '0%';
        this.image_tiao.scaleX = 0;
        this.isStaet = false;
        //cc.audioEngine.resume();
        // if( CC_DEBUG ){
        //     this.node_jiazai.active = true;
        //     this.isStaet = true;
        // }
        this.btn_start.node.active = false;
        this.startBtnCallback();

        var moveBy0_1 = cc.moveBy(1, cc.v2(0.3, -20));
        var moveBy0_2 = cc.moveBy(1, cc.v2(0.3, 20));
        var rep0 = cc.repeatForever(cc.sequence(moveBy0_1,moveBy0_2));
        this.node_ren[0].runAction(rep0);

        var moveBy1_1 = cc.moveBy(1, cc.v2(0.3, -20));
        var moveBy1_2 = cc.moveBy(1, cc.v2(0.3, 20));
        var rep1 = cc.repeatForever(cc.sequence(moveBy1_1,moveBy1_2));
        this.node_ren[1].runAction(rep1);

        var moveBy2_1 = cc.moveBy(1, cc.v2(0.3, 40));
        var moveBy2_2 = cc.moveBy(1, cc.v2(0.3, -40));
        var rep2 = cc.repeatForever(cc.sequence(moveBy2_1,moveBy2_2));
        this.node_ren[2].runAction(rep2);

        this.initBannerMgr();
        this.showShareBtn();


        if( window.wx ){
            var optionsInfo = wx.getLaunchOptionsSync();
            console.log("optionsInfo",optionsInfo);
            // if( optionsInfo.query ){
            //    optionsInfo.query.hc && (window.liuyang_hc = optionsInfo.query.hc);
            //    optionsInfo.query.hk && (window.liuyang_hk = optionsInfo.query.hk);
            // }

            // if(optionsInfo.referrerInfo.extraData) {
            //     if(optionsInfo.referrerInfo.extraData.channel) {
            //         window.liuyang_hc = optionsInfo.referrerInfo.extraData.channel;
            //     }
            //
            //     if(optionsInfo.referrerInfo.extraData.key) {
            //         window.liuyang_hk = optionsInfo.referrerInfo.extraData.key;
            //     }
            // }
        }
    },
    moby: function(node,)
    {

        var moveBy1 = cc.moveBy(1, cc.v2(0.2, 40));
        var moveBy2 = cc.moveBy(1, cc.v2(0.2, -40));
        var rep = cc.repeatForever(cc.sequence(moveBy1,moveBy2));
        this.image_ren.runAction(rep);
    },

    update : function(dt) {

        if(this.isStaet == true) {

            this.timeValue += dt;

            if (this.timeValue > 0.5) {
                this.timeValue -= 0.5;

                if (this.loadScene == false) {
                    this.loadScene = true;
                    var self = this;

                    cc.loader.onProgress = function (completedCount, totalCount, item) {

                        if (completedCount == totalCount) {
                        }
                        else {
                            var value = parseInt((completedCount / totalCount).toFixed(2) * 100);

                            self.scaleXvalue = self.scaleXvalue > value ? self.scaleXvalue : value;
                            self.label_num.getComponent(cc.Label).string = self.scaleXvalue + '%';
                            self.image_tiao.scaleX = self.scaleXvalue / 100;
                        }
                    }.bind( this );
                    cc.director.loadScene('Home');
                }

            }
        }

     },

    startBtnCallback: function(even)
    {
        // var node = even.target;
        // node.active = false;

        this.node_jiazai.active = true;

        this.isStaet = true;

        this.audioid = cc.audioEngine.playMusic( this.clip_music, true);
        this.statisticsClickStart();
    },

    statisticsClickStart () {
        if( !window.wx || !window.wx.aldSendEvent ){
            return;
        }
        if(!this.getLocal('newYongbing2PlayerStartGame'))
        {
            cc.sys.localStorage.clear();
            this.saveLocal('newYongbing2PlayerStartGame',"1");
            wx.aldSendEvent('新用户点击开始游戏按钮','');
        }
        wx.aldSendEvent('点击开始游戏按钮','');
    },
    
    statisticsSceneLoadComplete () {
        if( !window.wx || !window.wx.aldSendEvent ){
            return;
        }
        if(!this.getLocal('newYongbing2PlayerLoadingOver'))
        {
            this.saveLocal('newYongbing2PlayerLoadingOver',"1");
            wx.aldSendEvent('新用户游戏加载完成进入游戏','');
        }
        console.log('游戏加载完成！！！');
        wx.aldSendEvent('游戏加载完成进入游戏','');
    },

    onDestroy: function()
    {
        this.scaleXvalue = 0;
        cc.loader.onProgress = function (){};

        this.statisticsSceneLoadComplete();
        //cc.audioEngine.stopMusic(  );
        //delete this.audioid;
    },
    saveLocal( key, val ){
        if( window.wx ){
            window.wx.setStorage({
                key: key,
                data: val
            })
        }else{
            cc.log("saveLocal="+key,val);
            cc.sys.localStorage.setItem( key ,val );
        }
    },

    getLocal ( key, val ){
        cc.log("getLocal="+key,val);
        return cc.sys.localStorage.getItem( key  );
    }

});
