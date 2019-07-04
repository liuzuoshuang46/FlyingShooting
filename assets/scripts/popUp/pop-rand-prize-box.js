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
        bar: cc.Sprite,
        prefGongXi: cc.Prefab,
        popType: 1,//1登陆礼包  2大礼包  3推荐礼包
    },

    clickClose(){
        this.node.destroy();
    },

    onLoad () {
        cc.log();
        this.curNum = 0;
        let node = this.node.getChildByName('箭头');
        let pos = node.position;
        var seq = cc.sequence(
            cc.moveBy(0.3, 0,-30).easing( cc.easeOut( 2 ) ),
            cc.moveBy(0.3, 0,30).easing( cc.easeOut( 2 ) )
        )
        node.runAction(cc.repeatForever (seq) );
        console.log("app.hbswitch.ccclick",app.hbswitch.ccclick);


        app.chsdk.loadBanner();

        if(app.hbswitch.ccclick) {
            // if (this.popType != 2) {
                this.showTopBanner();
            // }
        }
        app.gameMgr.pauseAllEnemyActions();


    },




    clickBtn () {
        this.curNum += 20;
        if( window.isValueuser == true)
        {
            window.isValueuser = false;

            app.chsdk.valueuser();
        }
    },

    update ( dt ) {
        if( this.isStop ){
            return;
        }
        if( app.hbswitch.ccclick ){
            this.curNum -= dt * 20;
        }

        if( this.curNum < 0 ){
            this.curNum = 0;
        }
        this.bar.fillRange  = this.curNum / 100;
        if( this.curNum >= 100 ){
            this.isStop = true;

            if( app.hbswitch.ccclick )
            {

                // if(this.popType == 2)
                // {
                //     if(app.sidebarList.length > 0) {
                //         this.node.getChildByName('home-promotion').active = true;
                //         this.node.getChildByName('home-promotion').getComponent('home-promotion').init();
                //     }
                //
                //     let node = cc.instantiate(this.prefGongXi);
                //     let num = 0;
                //     if (this.popType == 1) {
                //         num = 1000;
                //     }
                //     else {
                //         num = app.player.get('level') * 200;
                //     }
                //
                //     let cmt = node.getComponent('gongxihuode');
                //     node.parent = this.node;
                //     cmt.init(app.util.formatNum(num), function () {
                //
                //         app.logView.log('恭喜获得' + app.util.formatNum(num) + '金币');
                //         if (this.popType == 2) {
                //             app.gameMgr.onCatchedCoin(num);
                //         }
                //         else {
                //             app.player.addCandy(num);
                //         }
                //
                //         this.node.destroy();
                //     }.bind(this));
                // }
                // else {
                //     app.chsdk.showBanner();
                //
                //     this.node.runAction( cc.sequence(
                //         cc.delayTime( 0.5),
                //         cc.callFunc(  function(){
                //
                //             let node = cc.instantiate(this.prefGongXi);
                //             let num = 0;
                //             if (this.popType == 1) {
                //                 num = 1000;
                //             }
                //             else {
                //                 num = app.player.get('level') * 200;
                //             }
                //
                //             let cmt = node.getComponent('gongxihuode');
                //             node.parent = this.node;
                //             cmt.init(app.util.formatNum(num), function () {
                //
                //                 app.logView.log('恭喜获得' + app.util.formatNum(num) + '金币');
                //                 if (this.popType == 2) {
                //                     app.gameMgr.onCatchedCoin(num);
                //                 }
                //                 else {
                //                     app.player.addCandy(num);
                //                 }
                //
                //                 this.node.destroy();
                //             }.bind(this));
                //
                //         }.bind(this)),
                //
                //     ) );

                    this.showBottomBanner(() => {

                        let node = cc.instantiate(this.prefGongXi);
                        let num = 0;
                        if (this.popType == 1) {
                            num = 1000;
                        }
                        else {
                            num = app.player.get('level') * 200;
                        }

                        let cmt = node.getComponent('gongxihuode');
                        node.parent = this.node;
                        node.y = cc.winSize.height/2;
                        cmt.init(app.util.formatNum(num), function () {

                            app.logView.log('恭喜获得' + app.util.formatNum(num) + '金币');
                            if (this.popType == 2) {
                                app.gameMgr.onCatchedCoin(num);
                            }
                            else {
                                app.player.addCandy(num);
                            }

                            this.node.destroy();
                        }.bind(this));
                    });
                // }
            }
            else {
                let node = cc.instantiate(this.prefGongXi);
                let num = 0;
                if (this.popType == 1) {
                    num = 1000;
                }
                else {
                    num = app.player.get('level') * 200;
                }

                let cmt = node.getComponent('gongxihuode');
                node.parent = this.node;
                node.y = this.node.height/2;
                cmt.init(app.util.formatNum(num), function () {

                    app.logView.log('恭喜获得' + app.util.formatNum(num) + '金币');
                    if (this.popType == 2) {
                        app.gameMgr.onCatchedCoin(num);
                    }
                    else {
                        app.player.addCandy(num);
                    }

                    this.node.destroy();
                }.bind(this));

            }
        }

    },

    onDisable () {

        this.rmBanner();
        app.chsdk.rmBanner();
        app.gameMgr.resumeAllEnemyActions();
    },
    rmBanner () {
        if( this.__bannerInst ) {
            bannerMgr.rmBanner( this.__bannerInst );
            delete this.__bannerInst;
        }
        if( this.__oldBanner ){
            bannerMgr.rmBanner( this.__oldBanner );
            delete this.__oldBanner;
        }
    },


    showTopBanner () {

        if( this.__bannerInst ) {
            this.__oldBanner = this.__bannerInst;
        }
        this.__bannerInst = bannerMgr.show({
            bannerId:'top',
                onShow: () => {
            if( this.__oldBanner)
        {
            bannerMgr.rmBanner(this.__oldBanner);
            delete this.__oldBanner;
                //     }
                //     let seq = cc.sequence(
                //         cc.delayTime( 3 ),
                //         cc.callFunc( () => {
                //             this.showTopBanner();
                //     })
                //     );
                //     seq.setTag( 1101 );
                //     this.node.stopActionByTag( 1101 );
                //     this.node.runAction( seq );
                // },
            }
        },
            onCatch: () => {
                let seq = cc.sequence(
                    cc.delayTime( 1 ),
                    cc.callFunc( () => {
                        this.showTopBanner();
            })
            );
                seq.setTag( 1101 );
                this.node.stopActionByTag( 1101 );
                this.node.runAction( seq );
            }
        });
    },

    showBottomBanner( onShow ) {
        // this.node.getChildByName('home-promotion').active = true;

        this.rmBanner();
        this.onBottomBannerShowCall = onShow;

        this.node.runAction( cc.sequence(
            cc.delayTime(2),
            cc.callFunc( ()=>{
                if( this.onBottomBannerShowCall ) {
                this.onBottomBannerShowCall();
                delete this.onBottomBannerShowCall;
            }
        })
        ) );

        this.node.stopActionByTag( 1101 );
        this.__bannerInst && bannerMgr.rmBanner( this.__bannerInst );
        this.__bannerInst = bannerMgr.show({
            bannerId: 'bottom',
            onShow: () => {
            if( this.onBottomBannerShowCall ) {
            this.onBottomBannerShowCall();
            delete this.onBottomBannerShowCall;
                }
            },
            onCatch: () => {

            }
        });
    }
});
