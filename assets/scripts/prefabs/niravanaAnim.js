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
        prefBoom1: dragonBones.ArmatureDisplay,
        prefBoom2: dragonBones.ArmatureDisplay,
        prefBoom3: dragonBones.ArmatureDisplay,
        prefBoom4: dragonBones.ArmatureDisplay,
        prefBoom5: dragonBones.ArmatureDisplay,
    },
    
    show ( roleId ) {
        this.node.active = true;
        this.playAnim( roleId );
    },

    playAnim ( roleId ) {
        var cs = [this.c1,this.c2,this.c3,this.c4,this.c5];
        for( var i in cs ){
            var idx = parseInt( i );
            var c = cs[i];
            var res = this.draRes[roleId - 1];

            c.buildArmature('newAnimation',c.node);
            c.dragonAsset = res.r1;
            c.dragonAtlasAsset = res.r2;

            if( !c._pos ){
                c._pos = c.node.position;
            }

            c.node.position = c._pos;

            c.node.opacity = 0;
            c.node.runAction(cc.sequence(
                cc.delayTime( idx / 5 ),
                cc.callFunc( function(){
                    this.node.opacity = 255;
                    this.playAnimation('newAnimation',1);
                    this.node.runAction( cc.moveBy(1,50,100).easing( cc.easeOut( 10 ) ));
                }.bind(c)),
                cc.delayTime( 1 ),
                cc.callFunc(function(){
                    this.node.opacity = 0;
                }.bind( c ))
            ));
            
            this.node.runAction( 
                cc.sequence(
                    cc.delayTime( 0.9 ),
                    cc.callFunc( function(){ 
                        this.node.active = false;
                    }.bind( this) )
                )
            );

        }
    }
});
