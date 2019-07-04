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
        prefCheckIn: cc.Prefab,
        prefBoomCoin :cc.Prefab,
        prefStoryGuide:cc.Prefab,
        prefNiravanaGuide:cc.Prefab,
        prefBossGuide:cc.Prefab,
        prefFitPlaneGuide:cc.Prefab,
        prefLogItem:cc.Prefab,
        prefShopItem:cc.Prefab,
        prefGameGuide:cc.Prefab,
        boomCoinPrefab:cc.Prefab,
        // boomDiamondPrefab:cc.Prefab,
        enemyPrefab:cc.Prefab,
        bulletPrefab:cc.Prefab,
        bullet2Prefab:cc.Prefab,
        bullet3Prefab:cc.Prefab,
        bullet4Prefab:cc.Prefab,
        bullet5Prefab:cc.Prefab,
        bullet6Prefab:cc.Prefab,
        bulletTurretPrefab:cc.Prefab,
        bulletTurret2Prefab:cc.Prefab,
        bulletTurret3Prefab:cc.Prefab,
        bulletSupportPrefab:cc.Prefab,
        bulletSupport2Prefab:cc.Prefab,
        bulletSupport3Prefab:cc.Prefab,
        bulletBuff2Prefab:cc.Prefab,
        bulletNiravana1Prefab:cc.Prefab,
        // bulletSkill1Prefab:cc.Prefab,
        // bulletSkill2Prefab:cc.Prefab,
        // bulletSkill3Prefab:cc.Prefab,
        // bulletSkill4Prefab:cc.Prefab,
        // bulletSkill5Prefab:cc.Prefab,
        bulletMonster1Prefab:cc.Prefab,
        bulletBoss1Prefab:cc.Prefab,
        prefabBulletBoom:cc.Prefab,
        prefabBulletBoom1:cc.Prefab,

        prefabMonster1Bomb:cc.Prefab,
        prefabBoss1Bomb:cc.Prefab,


        // prefMonsterBoss :cc.Prefab,
        prefMonsterBoss1 :cc.Prefab,

        // prefPrizeLevel: cc.Prefab,

        // popUp
        prefPopRandPrize1Box: cc.Prefab,
        prefPopRandPrize2Box: cc.Prefab,
        prefPopRandPrize3Box: cc.Prefab,
        prefPopUpTryOutRole: cc.Prefab,
        prefPopUpTryOutSupport: cc.Prefab,
        // prefPopAddCoin: cc.Prefab,
        // prefPopAddDiamond: cc.Prefab,
        // prefPopDiamondBuy: cc.Prefab, // 弹窗花费钻石购买物品，通用弹窗

        // popUpWidget
        prefPopWidgetRandPrizeBoxBtn: cc.Prefab,

        // dragonBones
        prefDBChangePlaneSmoke: cc.Prefab,

        // prefMonsterBoom1 :cc.Prefab, // 怪物死亡爆炸特效随机1
        // prefMonsterBoom2 :cc.Prefab,// 怪物死亡爆炸特效随机2
        // prefMonsterBoom3 :cc.Prefab,// 怪物死亡爆炸特效随机3
        // prefMonsterBoom4 :cc.Prefab,// 怪物死亡爆炸特效随机4
        prefPlaneBoom:cc.Prefab,// 飞机爆炸预制体
        prefPlaneBoom1:cc.Prefab,// 人形怪爆炸
        prefPlaneBoom2:cc.Prefab,// 人形怪烧成灰

        prefPlaneModel1:cc.Prefab,
        // prefPlaneModel2:cc.Prefab,
        // prefPlaneModel3:cc.Prefab,
        // prefPlaneModel4:cc.Prefab,
        // prefPlaneModel5:cc.Prefab,
        prefPlaneModel6:cc.Prefab,
        // prefPlaneModel7:cc.Prefab,
        // prefPlaneModel8:cc.Prefab,
        // prefPlaneModel9:cc.Prefab,
        // prefPlaneModel10:cc.Prefab,
        // prefPlaneModel11:cc.Prefab,
        // prefPlaneModel12:cc.Prefab,
        // prefPlaneModel13:cc.Prefab,
        prefPlaneModel14:cc.Prefab,

        // prefBossSkill1: cc.Prefab,
        // prefBossSkill2: cc.Prefab,
        

        // frameRoleModel1:cc.SpriteFrame,
        // frameRoleModel2:cc.SpriteFrame,
        // frameRoleModel3:cc.SpriteFrame,
        // frameRoleModel4:cc.SpriteFrame,
        // frameRoleModel5:cc.SpriteFrame,
        // frameRoleModel6:cc.SpriteFrame,
        //
        // // frame role head img;
        // frameRoleHeadImg1: cc.SpriteFrame,
        // frameRoleHeadImg2: cc.SpriteFrame,
        // frameRoleHeadImg3: cc.SpriteFrame,
        // frameRoleHeadImg4: cc.SpriteFrame,
        // frameRoleHeadImg5: cc.SpriteFrame,
        // frameRoleHeadImg6: cc.SpriteFrame,

        prefAddCoin: cc.Prefab,
        prefStrengthGuid:cc.Prefab,
        prefRedPoint:cc.Prefab,
        prefLevelUp:cc.Prefab,
        prefBuff: cc.Prefab,
        prefBuffIcon: cc.Prefab,
        prefHangUpGet: cc.Prefab,

        // prefEffectFitPlane: cc.Prefab,
        // preSpineFitPlane: cc.Prefab,

        prefUINodeFitPlane: cc.Prefab,

        frameCandy:cc.SpriteFrame,
        frameDiamond:cc.SpriteFrame,

        frameBulletDefault:cc.SpriteFrame,
        frameBulletCoin:cc.SpriteFrame,
        frameBulletAttack: cc.SpriteFrame,
        
        frameLock: cc.SpriteFrame,
        frameSelected: cc.SpriteFrame,

        frameBuff1: cc.SpriteFrame,
        frameBuff2: cc.SpriteFrame,
        frameBuff3: cc.SpriteFrame,
        frameBuff4: cc.SpriteFrame,
        frameBuff5: cc.SpriteFrame,
        frameBuff6: cc.SpriteFrame,
        frameBuff7: cc.SpriteFrame,
        frameBuff8: cc.SpriteFrame,
        frameBuff9: cc.SpriteFrame,
        
        frameBuffBorder: cc.SpriteFrame,
        frameDeBuffBorder: cc.SpriteFrame,
        frameBuffIconBorder: cc.SpriteFrame,
        frameDeBuffIconBorder: cc.SpriteFrame,

        // frame check in
        frameCheckIn1: cc.SpriteFrame,
        frameCheckIn2: cc.SpriteFrame,
        frameCheckIn3: cc.SpriteFrame,
        frameCheckIn4: cc.SpriteFrame,
        frameCheckIn5: cc.SpriteFrame,
        frameCheckIn6: cc.SpriteFrame,
        frameCheckIn7: cc.SpriteFrame,

        frameSkillIcon1:cc.SpriteFrame,
        frameSkillIcon2:cc.SpriteFrame,
        frameSkillIcon3:cc.SpriteFrame,
        frameSkillIcon4:cc.SpriteFrame,
        frameSkillIcon5:cc.SpriteFrame,

        framePromotion: [ cc.SpriteFrame ],
        framePromotionTitleBg:[ cc.SpriteFrame ],
        JumpMaxPng1: cc.Prefab,//交叉推广大图1
        JumpMaxPng2: cc.Prefab,//交叉推广大图2
        JumpMaxPngClose1: cc.Prefab,//交叉推广大图关闭按钮1
        JumpMaxPngClose2: cc.Prefab,//交叉推广大图关闭按钮1

        heroFF: cc.Prefab,//主角火焰枪

        poolEnemy:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonsterBoss :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonsterBoss1 :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBullet:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBullet2:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBullet3:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBullet4:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBullet5:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletTurret:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletTurret2:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletTurret3:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletSupport:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletSupport2:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletSupport3:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletBuff2:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletNiravana1:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletSkillNode:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletMonster1:{
            type:cc.NodePool,
            default: null,
            visible: false
        },

        poolBoomCoin : {
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBuff: {
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBuffIcon: {
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolAddCoin:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonsterBoom1 :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonsterBoom2 :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonsterBoom3 :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonsterBoom4 :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletBoom :{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBulletBoom1:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolMonster1Bomb:{
            type:cc.NodePool,
            default: null,
            visible: false
        },
        poolBoss1Bomb:{
            type:cc.NodePool,
            default: null,
            visible: false
        },

    },

    start () {
        this.log = app.util.createLog('[res-manager]', true );
        this.initPool();
    },

    // 初始化对象池
    initPool () {
        if( !this.poolEnemy ){
            this.poolEnemy = new cc.NodePool('monster');
            for( var i =0;i < 30;i ++){
                var item = cc.instantiate( this.enemyPrefab );
                this.poolEnemy.put( item );
            }
        }

        if( !this.poolBoomCoin ){
            this.poolBoomCoin = new cc.NodePool('boomCoin');
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.boomCoinPrefab );
                this.poolBoomCoin.put( item );
            }
        }

        if( !this.poolBullet ){
            this.poolBullet = new cc.NodePool('bullet');
            for( var i =0;i < 40;i ++){
                var item = cc.instantiate( this.bulletPrefab );
                this.poolBullet.put( item );
            }
        };
        if( !this.poolBullet2 ){
            this.poolBullet2 = new cc.NodePool('bullet2');
            for( var i =0;i < 40;i ++){
                var item = cc.instantiate( this.bullet2Prefab );
                this.poolBullet2.put( item );
            }
        };
        if( !this.poolBullet3 ){
            this.poolBullet3 = new cc.NodePool('bullet3');
            for( var i =0;i < 40;i ++){
                var item = cc.instantiate( this.bullet3Prefab );
                this.poolBullet3.put( item );
            }
        };
        if( !this.poolBullet4 ){
            this.poolBullet4 = new cc.NodePool('bullet4');
            for( var i =0;i < 40;i ++){
                var item = cc.instantiate( this.bullet4Prefab );
                this.poolBullet4.put( item );
            }
        };
        if( !this.poolBullet5 ){
            this.poolBullet5 = new cc.NodePool('bullet5');
            for( var i =0;i < 20;i ++){
                var item = cc.instantiate( this.bullet5Prefab );
                this.poolBullet5.put( item );
            }
        };
        if( !this.poolBullet6 ){
            this.poolBullet6 = new cc.NodePool('bullet6');
            for( var i =0;i < 20;i ++){
                var item = cc.instantiate( this.bullet6Prefab );
                this.poolBullet6.put( item );
            }
        };
        if( !this.poolBulletTurret ){
            this.poolBulletTurret = new cc.NodePool('bullet-turret');
            for( var i =0;i < 150;i ++){
                var item = cc.instantiate( this.bulletTurretPrefab );
                this.poolBulletTurret.put( item );
            }
        };
        if( !this.poolBulletTurret2 ){
            this.poolBulletTurret2 = new cc.NodePool('bullet-turret2');
            for( var i =0;i < 20;i ++){
                var item = cc.instantiate( this.bulletTurret2Prefab );
                this.poolBulletTurret2.put( item );
            }
        };
        // if( !this.poolBulletTurret3 ){
        //     this.poolBulletTurret3 = new cc.NodePool('bullet-turret3');
        //     for( var i =0;i < 4;i ++){
        //         var item = cc.instantiate( this.bulletTurret3Prefab );
        //         this.poolBulletTurret3.put( item );
        //     }
        // };

        if( !this.poolBulletSupport ){
            this.poolBulletSupport = new cc.NodePool('bullet-Support');
            for( var i =0;i < 150;i ++){
                var item = cc.instantiate( this.bulletSupportPrefab );
                this.poolBulletSupport.put( item );
            }
        };
        if( !this.poolBulletSupport2 ){
            this.poolBulletSupport2 = new cc.NodePool('bullet-Support2');
            for( var i =0;i < 150;i ++){
                var item = cc.instantiate( this.bulletSupport2Prefab );
                this.poolBulletSupport2.put( item );
            }
        };
        if( !this.poolBulletSupport3 ){
            this.poolBulletSupport3 = new cc.NodePool('bullet-Support3');
            for( var i =0;i < 4;i ++){
                var item = cc.instantiate( this.bulletSupport3Prefab );
                this.poolBulletSupport3.put( item );
            }
        };



        if( !this.poolBulletMonster1 ){
            this.poolBulletMonster1 = new cc.NodePool('bullet-monster1');
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.bulletMonster1Prefab );
                this.poolBulletMonster1.put( item );
            }
        };

        if( !this.poolBulletBoss1 ){
            this.poolBulletBoss1 = new cc.NodePool('bullet-boss1');
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.bulletBoss1Prefab );
                this.poolBulletBoss1.put( item );
            }
        };
        // if( !this.poolBulletBuff2 ){
        //     this.poolBulletBuff2 = new cc.NodePool('bullet-Buff2');
        //     for( var i =0;i < 4;i ++){
        //         var item = cc.instantiate( this.bulletBuff2Prefab );
        //         this.poolBulletBuff2.put( item );
        //     }
        // };


        if( !this.poolBulletNiravana1 ){
            this.poolBulletNiravana1 = new cc.NodePool('bullet-Niravana1');
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.bulletNiravana1Prefab );
                this.poolBulletNiravana1.put( item );
            }
        };
        if( !this.poolBuff ){
            this.poolBuff = new cc.NodePool();
            for( var i =0;i < 5;i ++){
                var item = cc.instantiate( this.prefBuff );
                this.poolBuff.put( item );
            }
        }

        // if( !this.poolBuffIcon ){
        //     this.poolBuffIcon = new cc.NodePool();
        //     for( var i =0;i < 5;i ++){
        //         var item = cc.instantiate( this.prefBuffIcon );
        //         this.poolBuffIcon.put( item );
        //     }
        // }

        // if( !this.poolAddCoin ){
        //     this.poolAddCoin = new cc.NodePool();
        //     for( var i =0;i < 80;i ++){
        //         var item = cc.instantiate( this.prefAddCoin );
        //         this.poolAddCoin.put( item );
        //     }
        // }

        // if( !this.poolMonsterBoss ){
        //     this.poolMonsterBoss = new cc.NodePool();
        //     for( var i = 0;i < 5; i++ ){
        //         var item = cc.instantiate( this.prefMonsterBoss );
        //         this.poolMonsterBoss.put( item );
        //     }
        // }
        if( !this.poolMonsterBoss1 ){
            this.poolMonsterBoss1 = new cc.NodePool();
            for( var i = 0;i < 2; i++ ){
                var item = cc.instantiate( this.prefMonsterBoss1 );
                this.poolMonsterBoss1.put( item );
            }
        }

        // if( !this.poolMonsterBoom1 ){
        //     this.poolMonsterBoom1 = new cc.NodePool();
        //     for( var i =0;i < 25;i ++){
        //         var item = cc.instantiate( this.prefMonsterBoom1 );
        //         this.poolMonsterBoom1.put( item );
        //     }
        // }
        //
        // if( !this.poolMonsterBoom2 ){
        //     this.poolMonsterBoom2 = new cc.NodePool();
        //     for( var i =0;i < 25;i ++){
        //         var item = cc.instantiate( this.prefMonsterBoom2 );
        //         this.poolMonsterBoom2.put( item );
        //     }
        // }
        //
        // if( !this.poolMonsterBoom3 ){
        //     this.poolMonsterBoom3 = new cc.NodePool();
        //     for( var i =0;i < 25;i ++){
        //         var item = cc.instantiate( this.prefMonsterBoom3 );
        //         this.poolMonsterBoom3.put( item );
        //     }
        // }
        //
        // if( !this.poolMonsterBoom4 ){
        //     this.poolMonsterBoom4 = new cc.NodePool();
        //     for( var i =0;i < 25;i ++){
        //         var item = cc.instantiate( this.prefMonsterBoom4 );
        //         this.poolMonsterBoom4.put( item );
        //     }
        // }

        if( !this.poolBulletBoom ){
            this.poolBulletBoom = new cc.NodePool();
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.prefabBulletBoom );
                this.poolBulletBoom.put( item );
            }
        }

        if( !this.poolBulletBoom1 ){
            this.poolBulletBoom1 = new cc.NodePool();
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.prefabBulletBoom1 );
                this.poolBulletBoom1.put( item );
            }
        }
        if( !this.poolPlaneBoom1 ){
            this.poolPlaneBoom1 = new cc.NodePool();
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.prefPlaneBoom1 );
                this.poolPlaneBoom1.put( item );
            }
        }

        if( !this.poolPlaneBoom2 ){
            this.poolPlaneBoom2 = new cc.NodePool();
            for( var i =0;i < 50;i ++){
                var item = cc.instantiate( this.prefPlaneBoom2 );
                this.poolPlaneBoom2.put( item );
            }
        }

        if( !this.poolMonster1Bomb ){
            this.poolMonster1Bomb = new cc.NodePool();
            for( var i =0;i < 150;i ++){
                var item = cc.instantiate( this.prefabMonster1Bomb );
                this.poolMonster1Bomb.put( item );
            }
        }
        if( !this.poolBoss1Bomb ){
            this.poolBoss1Bomb = new cc.NodePool();
            for( var i =0;i < 150;i ++){
                var item = cc.instantiate( this.prefabBoss1Bomb );
                this.poolBoss1Bomb.put( item );
            }
        };
    },

    instantiate ( pref ) {
        //this.log( 'new instantiate', pref.name );
        return cc.instantiate(pref);
    },

    getNewBulletBoom () {
        if( this.poolBulletBoom.size() <= 0 ){
            var item = this.instantiate(this.prefabBulletBoom);
            this.poolBulletBoom.put( item );
        }
        var item = this.poolBulletBoom.get();
        return item;
    },
    getNewBulletBoom1 () {
        if( this.poolBulletBoom1.size() <= 0 ){
            var item = this.instantiate(this.prefabBulletBoom1);
            this.poolBulletBoom1.put( item );
        }
        var item = this.poolBulletBoom1.get();
        return item;
    },
    getPlaneBoom1 () {
        if( this.poolPlaneBoom1.size() <= 0 ){
            var item = this.instantiate(this.prefPlaneBoom1);
            this.poolPlaneBoom1.put( item );
        }
        var item = this.poolPlaneBoom1.get();
        return item;
    },
    getPlaneBoom2 () {
        if( this.poolPlaneBoom2.size() <= 0 ){
            var item = this.instantiate(this.prefPlaneBoom2);
            this.poolPlaneBoom2.put( item );
        }
        var item = this.poolPlaneBoom2.get();
        return item;
    },

    getNewBuff () {
        if( this.poolBuff.size() <= 0 ){
            var item = this.instantiate(this.prefBuff);
            this.poolBuff.put( item );
        }
        var item = this.poolBuff.get();
        return item;
    },

    getNewBuffIcon () {
        if( this.poolBuffIcon.size() <= 0 ){
            var item = this.instantiate(this.prefBuffIcon);
            this.poolBuffIcon.put( item );
        }
        var item = this.poolBuffIcon.get();
        return item;
    },

    getNewMonster () {
        if (this.poolEnemy.size() <= 0) {
            var item = this.instantiate(this.enemyPrefab);
            this.poolEnemy.put( item );
        }

        return this.poolEnemy.get();
    },


    getNewMonsterBoss () {
        if (this.poolMonsterBoss.size() <= 0) {
            var item = this.instantiate(this.prefMonsterBoss);
            this.poolMonsterBoss.put( item );
        }

        return this.poolMonsterBoss.get();
    },
    getNewMonsterBoss1 () {
        if (this.poolMonsterBoss1.size() <= 0) {
            var item = this.instantiate(this.prefMonsterBoss1);
            this.poolMonsterBoss1.put( item );
        }

        return this.poolMonsterBoss1.get();
    },

    getNewBoomCoinAni () {
        if (this.poolBoomCoin.size() <= 0) {
            var item = this.instantiate(this.boomCoinPrefab);
            this.poolBoomCoin.put( item );
        }

        return this.poolBoomCoin.get();
    },
    
    getNewBullet () {
        if( this.poolBullet.size() <= 0 ){
            var bullet = this.instantiate(this.bulletPrefab);
            this.poolBullet.put( bullet );
        }
        return this.poolBullet.get();
    },
    getNewBullet2 () {
        if( this.poolBullet2.size() <= 0 ){
            var bullet = this.instantiate(this.bullet2Prefab);
            this.poolBullet2.put( bullet );
        }
        return this.poolBullet2.get();
    },
    getNewBullet3 () {
        if( this.poolBullet3.size() <= 0 ){
            var bullet = this.instantiate(this.bullet3Prefab);
            this.poolBullet3.put( bullet );
        }
        return this.poolBullet3.get();
    },
    getNewBullet4 () {
        if( this.poolBullet4.size() <= 0 ){
            var bullet = this.instantiate(this.bullet4Prefab);
            this.poolBullet4.put( bullet );
        }
        return this.poolBullet4.get();
    },
    getNewBullet5 () {
        if( this.poolBullet5.size() <= 0 ){
            var bullet = this.instantiate(this.bullet5Prefab);
            this.poolBullet5.put( bullet );
        }
        return this.poolBullet5.get();
    },
    getNewBullet6 () {
        if( this.poolBullet6.size() <= 0 ){
            var bullet = this.instantiate(this.bullet6Prefab);
            this.poolBullet6.put( bullet );
        }
        return this.poolBullet6.get();
    },
    getNewBulletTurret () {
        if( this.poolBulletTurret.size() <= 0 ){
            var bullet = this.instantiate(this.bulletTurretPrefab);
            this.poolBulletTurret.put( bullet );
        }
        return this.poolBulletTurret.get();
    },
    getNewBulletTurret2 () {
        if( this.poolBulletTurret2.size() <= 0 ){
            var bullet = this.instantiate(this.bulletTurret2Prefab);
            this.poolBulletTurret2.put( bullet );
        }
        return this.poolBulletTurret2.get();
    },
    getNewBulletTurret3 () {
        var bullet = this.instantiate(this.bulletTurret3Prefab);
        return bullet;

        // if( this.poolBulletTurret3.size() <= 0 ){
        //     var bullet = this.instantiate(this.bulletTurret3Prefab);
        //     this.poolBulletTurret3.put( bullet );
        // }
        // return this.poolBulletTurret3.get();
    },
    getNewBulletSupport () {
        if( this.poolBulletSupport.size() <= 0 ){
            var bullet = this.instantiate(this.bulletSupportPrefab);
            this.poolBulletSupport.put( bullet );
        }
        return this.poolBulletSupport.get();
    },
    getNewBulletSupport2 () {
        if( this.poolBulletSupport2.size() <= 0 ){
            var bullet = this.instantiate(this.bulletSupport2Prefab);
            this.poolBulletSupport2.put( bullet );
        }
        return this.poolBulletSupport2.get();
    },
    getNewBulletSupport3 () {
        if( this.poolBulletSupport3.size() <= 0 ){
            var bullet = this.instantiate(this.bulletSupport3Prefab);
            this.poolBulletSupport3.put( bullet );
        }
        return this.poolBulletSupport3.get();
    },
    getNewBulletMonster1 () {
        if( this.poolBulletMonster1.size() <= 0 ){
            var bullet = this.instantiate(this.bulletMonster1Prefab);
            this.poolBulletMonster1.put( bullet );
        }
        return this.poolBulletMonster1.get();
    },
    getNewBulletBoss1 () {
        if( this.poolBulletBoss1.size() <= 0 ){
            var bullet = this.instantiate(this.bulletBoss1Prefab);
            this.poolBulletBoss1.put( bullet );
        }
        return this.poolBulletBoss1.get();
    },



    getNewBulletBuff2 () {
        var bullet = this.instantiate(this.bulletBuff2Prefab);
        return bullet;
    },
    getNewBulletNiravana1 () {
        if( this.poolBulletNiravana1.size() <= 0 ){
            var bullet = this.instantiate(this.bulletNiravana1Prefab);
            this.poolBulletNiravana1.put( bullet );
        }
        return this.poolBulletNiravana1.get();
    },
    getNewBulletSkill () {
        var opt = app.gameMgr.getTechnicalSkillOptByRoleId();
        if( this.poolBulletSkillNode.size() <= 0 ){
            var bullet = this.instantiate(opt.prefab);
            this.poolBulletSkillNode.put( bullet );
        }
        return this.poolBulletSkillNode.get();
    },

    getNewMonsterBoom ( idx ) {
        var name = 'poolMonsterBoom' + idx;
        if( !this[ name ] ) {
            return null;
        }
        if( this[ name ].size() <= 0 ){
            console.log( 'getNewMonsterBoom', idx );
            var bullet = this.instantiate(this[ 'prefMonsterBoom' + idx ]);
            this[ name ].put( bullet );
        }
        
        var ret = this[ name ].get();
        ret.__pool = this[ name ];
        return ret;
    },

    getNewAddCoinBuff(){
        if( this.poolAddCoin.size() <= 0 ){
            var bullet = this.instantiate(this.prefAddCoin);
            this.poolAddCoin.put( bullet );
        }
        return this.poolAddCoin.get();
    },
    getNewMonster1Bomb(){
        if( this.poolMonster1Bomb.size() <= 0 ){
            var Bomb = this.instantiate(this.prefabMonster1Bomb);
            this.poolMonster1Bomb.put( Bomb );
        }
        return this.poolMonster1Bomb.get();
    },
    getNewBoss1Bomb(){
        if( this.poolBoss1Bomb.size() <= 0 ){
            var Bomb = this.instantiate(this.prefabBoss1Bomb);
            this.poolBoss1Bomb.put( Bomb );
        }
        return this.poolBoss1Bomb.get();
    },

    // 更换飞机会更换特殊技能
    resetBulletSkillNodePool () {
        if( this.poolBulletSkillNode ) {
            this.poolBulletSkillNode.clear();
        }

        var opt = app.gameMgr.getTechnicalSkillOptByRoleId();
        this.poolBulletSkillNode = new cc.NodePool( opt.script );
        for( var i =0;i < 10;i ++){
            var item = cc.instantiate( opt.prefab );
            this.poolBulletSkillNode.put( item );
        }
    },

});
