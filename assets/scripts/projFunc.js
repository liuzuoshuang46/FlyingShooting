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

    },

    showRandPrizeBox(show) {
        var isCurShow = false;
        var pref = app.resMgr.prefPopWidgetRandPrizeBoxBtn;
        var parent1 = cc.find('Canvas/home/randPrizeBox');
        var parent2 = cc.find('Canvas/game/randPrizeBox');
        app.util.childsExec(parent1, function (child) {
            isCurShow = true;
            child.destroy();
        })
        app.util.childsExec(parent2, function (child) {
            isCurShow = true;
            child.destroy();
        })
        if (show) {
            var node1 = cc.instantiate(pref);
            node1.parent = parent1;
            var node2 = cc.instantiate(pref);
            node2.parent = parent2;

            var btn1 = node1.getChildByName('prizeBox3').getComponent(cc.Button);
            var btn2 = node2.getChildByName('prizeBox3').getComponent(cc.Button);

            if (!app.gameMgr.isStart && !app.gameMgr._isStarting) {
                if (!isCurShow) {
                    app.pop.push(app.resMgr.prefPopRandPrizeBox);
                }
                node2.active = false;
            } else {
                node1.active = false;
            }

            if (app.gameMgr.isStart || app.gameMgr._isStarting) {
                if (!isCurShow && app.player.get('strengthGuide') >= 4) {
                    app.player._showRandPrizeBoxOnReturnHome = true;
                }
            }

            app.util.btnAddEvent({
                btn: btn1,
                node: this.node,
                scriptName: 'projFunc',
                funcName: 'clickAtRandPrizeBox'
            });
            app.util.btnAddEvent({
                btn: btn2,
                node: this.node,
                scriptName: 'projFunc',
                funcName: 'clickAtRandPrizeBox'
            });
        }
    },

    clickAtRandPrizeBox() {
        app.pop.push(app.resMgr.prefPopRandPrizeBox);
    },

    adVideoAddCoin() {
        app.pop.push(app.resMgr.prefPopAddCoin);
    },

    adVideoAddDiamond() {
        app.pop.push(app.resMgr.prefPopAddDiamond);
    },

    popDiamondBuy(opt) {
        app.pop.push(app.resMgr.prefPopDiamondBuy, opt);
    },

    checkMaskAd() {
        if (!app.hbswitch) {
            return;
        }
        var randRet = _.random(1, 100);
        if (randRet < 50) {
            return;
        }
        // app.adMask
    },

    // 出banner 的时候，banner延时，领取按钮位置放到banner的位置，到时见后banner出现，领取按钮回到原位置
    showBannerWithDelayAndOffy(opt) {
        this.rmBanner();
        if (app.hbswitch.bannerDelay) {

            var btnComponent = null;
            if (opt.nodeBtn) {
                btnComponent = opt.nodeBtn.getComponent(cc.Button);
                if (btnComponent) {
                    btnComponent.interactable = false;
                }
            }

            opt.nodeBtn.y -= opt.offy;
            opt.nodeBtn.runAction(cc.sequence(
                cc.delayTime(2),
                cc.callFunc(() => {
                    opt.nodeBtn.y += opt.offy;
                    if (btnComponent) {
                        btnComponent.interactable = true;
                    }
                    if (opt.promntion) {
                        opt.promntion.active = true;
                        opt.promntion.getComponent('home-promotion').init();
                    }
                    else {

                        this.__bannerInst = bannerMgr.show({
                            bannerId: 'bottom',
                            onShow: () => {
                            },
                            onCatch: () => {

                            }
                        });
                    }
                }),
            ));
        }
        else {

            this.__bannerInst = bannerMgr.show({
                bannerId: 'bottom',
                onShow: () => {
                },
                onCatch: () => {

                }
            });
        }
    },

    rmBanner () {
        if( this.__bannerInst ) {
            bannerMgr.rmBanner( this.__bannerInst );
            delete this.__bannerInst;
        }
    },

    saveLocal(key, val) {
        if (window.wx) {
            window.wx.setStorage({
                key: key,
                data: val
            })
        } else {
            cc.log("saveLocal=" + key, val);
            cc.sys.localStorage.setItem(key, val);
        }
    },

    getLocal(key, val) {
        cc.log("getLocal=" + key, val);
        return cc.sys.localStorage.getItem(key);
    }

});
