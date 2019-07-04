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
    
    playNumToPos( num, worldPos ){
        this.num = num;
        this.goPos = this.node.convertToNodeSpace( worldPos );

        var childs = this.node.children;
        for( var i in childs ){
            var child = childs[i];
            if( i >= num ) {
                child.active = false;
            }else{
                child.active = true;
            }
            //child.scale = 1;
            child.opacity = 255;
        }
        var ani = this.getComponent(cc.Animation);
        ani.play();
        ani.on('finished',this.onBoomFinish, this );
    },

    onBoomFinish () {
        var childs = this.node.children;
        var maxDt = 0;

        for( var i in childs ){
            var child = childs[i];
            if( i < this.num ) {
                let arr = [];
                let randDt = _.random(0,2) * 0.1;
                if( randDt > maxDt ){
                    maxDt = randDt;
                }

                arr.push( cc.delayTime(randDt) )
                arr.push(
                    cc.spawn(
                        cc.moveTo( 0.3, this.goPos ).easing(cc.easeQuadraticActionIn()),
                        // cc.rotateBy( 0.3, 720 ),
                        cc.fadeTo( 0.3, 30 )
                    )
                );
                arr.push( cc.callFunc( function(){
                    app.audioMgr.play( app.audioMgr.audioBing );
                }))
                var seq = cc.sequence( arr );
                child.runAction( seq );
                //child.scale = 0.5;
            }
        }

        var seq = cc.sequence([
            cc.delayTime( maxDt + 0.3 ),
            cc.callFunc( function(){
                app.resMgr.poolBoomCoin.put( this.node );
            }.bind( this ))
        ]);
        this.node.runAction(seq);
    }

    // show () {
    //     this.node.scale = 0.5;
    //     this.getComponent(cc.Animation).play( 'boomCoin3' );
    //     this.getComponent(cc.Animation).on('finished',  this.onComplete,    this);
    // },

    // onComplete () {
    //     this.getComponent(cc.Animation).off('finished',  this.onComplete,    this);
    //     app.gameMgr.poolBoomCoin.put( this.node );
    // },

    // reuse () {

    // },

    // unuse () {

    // }
});
