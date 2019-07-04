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
        bgPre : {
            type : cc.Node,
            default: null
        },
        bgCur : {
            type : cc.Node,
            default: null
        },
        bgNext : {
            type : cc.Node,
            default: null
        },
        lblPre : {
            type : cc.Label,
            default: null
        },
        lblCur : {
            type : cc.Label,
            default: null
        },
        lblNext : {
            type : cc.Label,
            default: null
        },
        arrowLeft : {
            type : cc.Node,
            default: null
        },
        arrowRight : {
            type : cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.updateCurLevel();
    },

    updateCurLevel () {
        this.setCurLevel( app.player.get('level') );
    },

    setCurLevel ( level ) {
        level = Number(level);
        var max = Object.keys( app.json.tbImpede.json ).length;
        var min = 1;
        var pre = level - 1;
        var next = level + 1
        pre = pre < min ? null : pre;
        next = next > max ? null : next;

        this.bgPre.active = !!pre;
        //this.arrowLeft.active = !!pre;
        this.lblPre.node.active = !!pre;
        pre && ( this.lblPre.string = pre );

        this.bgNext.active = !!next;
        //this.arrowRight.active = !!next;
        this.lblNext.node.active = !!next;
        next && ( this.lblNext.string = next );

        this.lblCur.string = level;
    }

});
