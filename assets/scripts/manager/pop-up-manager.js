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
        popsLength:{
            visible:false,
            get(){
                return this.node.children.length;
            }
        }
    },
    
    push( pref, opt ){
        var node = cc.instantiate( pref );
        node.parent = this.node;
        if( opt ){
            var scr = node._components[0];
            if( scr && scr.loadOpt ){
                scr.loadOpt( opt );
            }
        }
    },
    
    clear () {
        app.util.childsExec( this.node, function( child ){
            child.destroy();
        });
    }
});
