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
        baozou :{
            tooltip: '射速暴走',
            default:false
        },

        passPause :{
            tooltip: '调过暂停',
            default:false
        },

        passLevel :{
            tooltip: '每关只打第一波 ',
            default:false
        },

        moreMonsterHp :{
            tooltip: '怪物血量翻十倍',
            default:false
        },

        debugRemoteVersion :{
            tooltip: '发布外网的开发版本，需要每次清除游戏缓存，不然缓存数据结构不对会导致崩溃',
            default:false
        },

        restoreStrengthTime :{
            tooltip: '加快体力恢复',
            default:false
        },
        niravanaTime :{
            tooltip: '加快大招恢复',
            default:false
        },
        wudi :{
            tooltip: '无敌模式',
            default:false
        },
        debugSdk :{
            tooltip: '付费价格 *= 0.01,调过sdk的初始化直接调用接口',
            default:false
        },
        freeDiamond:{
            tooltip:'直接购买钻石',
            default:false
        },
        fitPlaneTime:{
            tooltip:'加快合体恢复时间',
            default:false
        }
    },
});
