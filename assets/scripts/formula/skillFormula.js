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
        skill_hurt:{
            get () {
                if( this.growing.skill_hurt ){
                    return this.growing.skill_hurt;
                }
                return this.tbData.skill_hurt;
            }
        },
        bullet_range:{
            get () {
                if( this.growing.bullet_range ){
                    if( this.growing.bullet_range < 5 ){
                        return 100 * this.growing.bullet_range;
                    }
                    return this.growing.bullet_range;
                }
                if( this.tbData.bullet_range < 22 ){
                    return 22;
                }
                return this.tbData.bullet_range;
            }
        },
        time_interval:{
            get () {
                if( this.growing.time_interval ){
                    return this.growing.time_interval;
                }
                return this.tbData.time_interval;
            }
        },
        move:{
            get () {
                if( this.growing.move ){
                    return this.growing.move;
                }
                return this.tbData.move;
            }
        },
        angle:{
            get () {
                if( this.growing.angle ){
                    return this.growing.angle;
                }
                return this.tbData.angle;
            }
        },
        collision_num:{
            get () {
                if( this.growing.collision_num ){
                    return this.growing.collision_num;
                }
                return this.tbData.collision_num;
            }
        },
    },

    init ( skillId, growing1Level, growing2Level ){
        this.growing1Level = growing1Level;
        this.growing2Level = growing2Level;
        this.skillId = skillId;
        this.resetTbData();
    },

    resetTbData () {
        this.tbData = app.json.tbSkill.json[ this.skillId ]; // 不需要培养的属性都在skill的json表中
        this.growing = {};
        this.growing[ this.tbData.peiyangbiao_one ] = app.util.parseNum( app.json.tbGrowing1.json[ this.skillId * 1000 + this.growing1Level ].val );
        this.growing[ this.tbData.peiyangbiao_two ] = app.util.parseNum( app.json.tbGrowing2.json[ this.skillId * 1000 + this.growing2Level ].val );
    }
});
