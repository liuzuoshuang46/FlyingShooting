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
        nodeShop:{
            type: cc.Node,
            default : null
        },
        nodeBuyStrength:{
            type: cc.Node,
            default : null
        },
        scrBuyDiamond:{
            type: cc.ScrollView,
            default : null
        },
        scrBuyCandy:{
            type: cc.ScrollView,
            default : null
        },
    },
    
    start () {
        this.initData();
        this.initUI();
    },
    initData () {
        this.tbRechargeDiamond = app.json.tbRechargeDiamond.json;
        this.tbRechargeCandy = app.json.tbRechargeCandy.json;
        this.tbRechargeStrength = app.json.tbRechargeStrength.json;
    },
    initUI () {
        this.initShopCandy();
        this.initShopDiamond();
        this.initShopStrength();
        this.node.active = false;
        this.nodeShop.active = false;

        this.nodeShop.getChildByName('toggle1').active = false;
    },

    initShopCandy() {
        var maxZIndex = Object.keys( this.tbRechargeCandy ).length;
        for( var i in this.tbRechargeCandy ){
            var node = cc.instantiate( app.resMgr.prefShopItem );
            var control = node.getComponent( 'shop-item' );
            control.init( {
                id: i,
                type: app.enum.CURRENCY_CANDY,
                zIndex: maxZIndex - Number( i )
            });
            this.scrBuyCandy.content.addChild( node );
            var idx = maxZIndex - Number( i );
            node.x = idx % 2 == 0 ? 0 : node.width + 10;
            node.y = Math.ceil( idx / 2 ) * node.height;
        }

        this.scrBuyCandy.node.active = false;
    },
    initShopDiamond() {
        var maxZIndex = Object.keys( this.tbRechargeDiamond ).length;
        for( var i in this.tbRechargeDiamond ){
            var node = cc.instantiate( app.resMgr.prefShopItem );
            var control = node.getComponent( 'shop-item' );
            control.init( {
                id: i,
                type: app.enum.CURRENCY_DIAMOND,
                zIndex: maxZIndex - Number( i )
            });
            this.scrBuyDiamond.content.addChild( node );
            var idx = maxZIndex - Number( i );
            node.x = idx % 2 == 0 ? 0 : node.width + 10;
            node.y = Math.ceil( idx / 2 ) * node.height;
        }
        this.scrBuyDiamond.node.active = false;
    },

    initShopStrength() {
        this.nodeBuyStrength.active = false;
    },

    switchShop ( toggle, type ) {
        this.scrBuyCandy.node.active = type == 2;
        this.scrBuyDiamond.node.active = type == 1;

        if( !toggle ) cc.find('Canvas/shop/shopNode/toggle' + type).getComponent( cc.Toggle ).isChecked = true;
    },

    showType ( type ) {
        switch( type ){
            case app.enum.TYPE_STRENGTH:{
                this.nodeShop.active = false;
                this.nodeBuyStrength.getComponent('buyStrength').show();
                this.nodeBuyStrength.active = true;
                break;
            }
            case app.enum.CURRENCY_CANDY:{
                this.nodeShop.active = true;
                this.nodeBuyStrength.active = false;
                this.switchShop( null, 2 );
                break;
            }
            case app.enum.CURRENCY_DIAMOND:{
                this.nodeShop.active = true;
                this.nodeBuyStrength.active = false;
                this.switchShop( null, 1 );
                break;
            }
            default: 
            break;
        }
    },
    hide (  ) {
        this.node.active = false;
    }

});
