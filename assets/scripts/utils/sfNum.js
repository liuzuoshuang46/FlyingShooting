// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// K、M、G、T、P、E、B 单位

var unitConversion = {
    K: 1000,
    M: 1000000
}
cc.Class({
    extends: cc.Component,

    properties: {
        val: {
            set ( val ) {
                this._val = val;
                this.parseSFNum(  );
            },

            get () {
                return this._val;
            }
        },
        unit: {
            get () {
                return this._unit;
            }
        },
        num : {
            get () {
                return this._num;
            }
        }
    },
    parseSFNum ( ) {
        var idx = 0;
        if( this._val.match('K') ){
            idx = this._val.indexOf( 'K' );
        }else if( this._val.match('M') ){
            idx = this._val.indexOf( 'K' );
        }
        
        this._num = Number( this._val.slice(0,idx - 1) );
        this._unit = this._val.slice( idx, 1 );
    },
    add ( sfnum ) {
        
    },
    sub ( sfnum ) {

    }
});
