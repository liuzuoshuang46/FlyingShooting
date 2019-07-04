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
        // tbMonster:{ // 怪物数据表
        //     type:cc.JsonAsset,
        //     default:null
        // },
        tbRole:{ // avatar表
            type:cc.JsonAsset,
            default:null
        },
        tbSkill:{ // 子弹(技能) 表
            type:cc.JsonAsset,
            default:null
        },
        tbImpede:{ // 关卡数据表
            type:cc.JsonAsset,
            default:null
        },
        tbInitial:{ // 玩家初始属性表
            type:cc.JsonAsset,
            default:null
        },
        tbGrowing1:{ // 技能培养属性第一个
            type:cc.JsonAsset,
            default:null
        },
        tbGrowing2:{ // 技能培养属性第二个
            type:cc.JsonAsset,
            default:null
        },
        tbProfitBasics:{ // 金币培养表
            type:cc.JsonAsset,
            default:null
        },
        tbProfitDaily:{ // 日常收益培养表
            type:cc.JsonAsset,
            default:null
        },
        tbRevival:{ // 复活数值表
            type:cc.JsonAsset,
            default:null
        },
        tbRechargeCandy:{ // 购买糖果
            type:cc.JsonAsset,
            default:null
        },
        tbRechargeDiamond:{ // 购买钻石
            type:cc.JsonAsset,
            default:null
        },
        tbRechargeStrength:{ // 购买体力
            type:cc.JsonAsset,
            default:null
        },
        
        tbNiravana:{ // 大招
            type:cc.JsonAsset,
            default:null
        },
        tbFitPlane:{ // 合体数据
            type:cc.JsonAsset,
            default:null
        },
        tbFitData:{ // 合体模型表
            type:cc.JsonAsset,
            default:null
        },
        tbBuff:{
            type:cc.JsonAsset,
            default:null
        },
        tbBossData:{
            type:cc.JsonAsset,
            default:null
        },
        tbBossTrigger:{
            type:cc.JsonAsset,
            default:null
        },
        /**********************************/
        tbAircraft_ly:{//战机
            type:cc.JsonAsset,
            default:null
        },
        tbBuff_ly:{
            type:cc.JsonAsset,
            default:null
        },
        tbCheckpoint_ly:{//关卡
            type:cc.JsonAsset,
            default:null
        },
        tbGroup_ly:{//掉落组
            type:cc.JsonAsset,
            default:null
        },
        tbItem_ly:{//道具表
            type:cc.JsonAsset,
            default:null
        },
        tbMonster_ly:{//怪物
            type:cc.JsonAsset,
            default:null
        },
        tbWingman_ly:{//僚机
            type:cc.JsonAsset,
            default:null
        },
        tbBigrecruit_ly:{//技能
            type:cc.JsonAsset,
            default:null
        },
        tbWeapon_ly:{//武器
            type:cc.JsonAsset,
            default:null
        },
    }
});
