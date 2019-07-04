// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var opts = {
    2:[
        '点击强化按钮，可以强化飞机属性',
        '点击这里可以强化飞机的泡泡速度哦！'
    ],
    3:[
        '点击收益按钮，可以强化关卡中的收益',
        '点击这里可以强化在关卡中获得的糖果倍数'
    ],
    4:[
        '点击角色按钮，可以强化角色技能呦',
        '点击这里可以强化技能强度'
    ]
}

cc.Class({
    extends: cc.Component,

    properties: {
        lblContent:cc.Label
    },
    
    show( level ){
        this.level = level;
        this.index = 0;
        this.opt = opts[ this.level ];
        if( !this.opt || this.level == 1 ){
            this.node.destroy();
            return;
        }

        this.getComponent( cc.Animation ).play('strength-guide-' + (this.index + 1) );

        if( this.index == 0 ){
            var idx = this.level;
            if( idx == 2 ){
                idx = 3;
            }else if( idx == 3 ){
                idx = 2;
            }
            this.node.getChildByName('button').x = this.node.getChildByName('jiantou').x = [0,0,245,410,559][ idx ] - 360 + 40;
        }

        this.lblContent.string = this.opt[ this.index ];

        this.showMask();
    },

    next () {
        if( this.index == 0 ){
            var idx = this.level;
            if( idx == 2 ){
                idx = 3;
            }else if( idx == 3 ){
                idx = 2;
            }
            app.homeWgt.toggleEvent(0,idx );
        }
        ++this.index;
        this.showMask();

        app.event.send( app.enum.event.STRENGTH_GUIDE_CLICK, this.level * 10 + this.index );

        if( this.index + 1 > this.opt.length ){
            this.removeThis();
            return;
        }

        var aniName = 'strength-guide-' + (this.index + 1);
        if( this.level == 4 ){
            aniName = 'strength-guide-3';
        }

        this.getComponent( cc.Animation ).play( aniName );
        this.lblContent.string = this.opt[ this.index ];
    },

    removeThis() {
        app.player.set('strengthGuide',this.level );
        this.node.destroy();
    },
    
    showMask(){
        var m1 = this.node.getChildByName('mask' + this.level + '' + 1);
        var m2 = this.node.getChildByName('mask' + this.level + '' + 2);
        m1.active = this.index == 0;
        m2.active = this.index == 1;
    }
});
