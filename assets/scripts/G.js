// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const exp = {
    guideCheck:{
        // level 到第几关可用
        // nodeY 怪物位置小于多少时触发
        niravana:{
            level: 4,
            nodeY: 600
        },
        fitPlane:{
            level: 6,
            nodeY: 1000
        }
    },
    //game节点下的层级
    LAYER_MONSTER : 1,//怪物层 1
    LAYER_BUFF : 2,//buff球 2
    LAYER_BULLET : 3,//子弹 3
    LAYER_HERO : 5,//主角 5
    LAYER_SUPPORT : 5,//僚机 5
    LAYER_BOOM : 6,//爆炸动画
    LAYER_PARTICLE : 7,//粒子 6
    LAYER_BUFF2 : 8,//buff2的球球 7
    LAYER_CLOUD : 9,//云层 8
    LAYER_UI : 10,//ui层 10
    LAYER_POP : 20,//弹窗 20

    //子弹类型
    BULLET_1 : 1,//角色1默认子弹
    BULLET_2 : 2,//角色2默认子弹
    BULLET_3 : 3,//buff1子弹ff 火
    BULLET_4 : 4,//buff2子弹ll 半月
    BULLET_5 : 5,//buff3子弹mm
    BULLET_6 : 6,//角色3默认子弹

    MOVESPEED_MAP : 100,//背景图的移动速度


};
module.exports = exp;