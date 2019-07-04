// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        items:{
            type:cc.Node,
            default:null
        },
    },


    log( msg ){
        this.node.active = true;
        var item = cc.instantiate(app.resMgr.prefLogItem);
        item.parent = this.items;
        item.x = 0;
        item.y = 0;
        // item.runAction( cc.moveBy(2,0,200) );
        item.runAction( cc.sequence(cc.delayTime(1),cc.fadeTo(0.1,0)) );
        item.runAction( cc.sequence(cc.delayTime(1.2),cc.callFunc(function(){
            item.destroy();
            if( !this.items.children.length ) this.node.active = false;
        }.bind( this ))));
        item.getChildByName('label').getComponent(cc.Label).string = msg;
        console.log('[ logview logmsg ] : ' + msg );
    }

    // update (dt) {},
});
