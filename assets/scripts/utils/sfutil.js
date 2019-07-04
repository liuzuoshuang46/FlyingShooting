// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


var num2chinese = {
    1:'一',
    2:'二',
    3:'三',
    4:'四',
    5:'五',
    6:'六',
    7:'七',
}

cc.Class({
    extends: cc.Component,
    
    properties:{
    },

    init () {
        this.log = app.util.createLog('[util] ', false );
    },

    error ( code ) {
        this.codeArr = this.codeArr || {};
        this.codeArr.NO_ERROR = 0;
        this.codeArr.INDEX_NOT_FOUND = 1;

        return this.codeArr[ code ];
    },

    // 角度转弧度
    angle2radians ( angle ) {
        return angle * Math.PI / 180;
    },

    // 弧度转角度
    radians2angle ( radians ) {
        return radians * 180 / Math.PI;
    },

    removeIf ( item, array ){
        var idx = array.indexOf( item );
        if( idx != -1 ){
            array.splice( idx, 1 );
        }else{
            return this.error( 1 );
        }
        return this.error( 0 );
    },

    isNumber : function( nb ){
        return nb + 0 === nb;
    },
    
    isString : function( str ){
        return str + '' === str;
    },
    
    nodeLoadAttrs : function( node, attr ){
        if( node && attr ){
            for( var i in attr ){
                node[i] = attr[i];
            }
        }
    },

    createLog( tag, logret ){
        var log = function(){
            if( !logret ) return;
            var p = [].slice.call(arguments);
            p.splice(0,0,tag);
            console.log.apply( console, p );
        }
        return log;
    },

    deepClone ( obj ) {
        var ret = obj;
        ret = JSON.stringify( ret );
        ret = JSON.parse( ret )
        return ret;
    },

    /*
    预制体播放龙骨动画，播放完成自动移除
    注意： 预制体的根节点下面必须有名字为dragon的子节点，该节点上面挂上dragonBones.ArmatureDisplay组件

    opts: {
        parent: 创建出来的预制体要加入的父节点
        prefab: 预制体的资源,
        next : 动画只播放一次，播放完成的回调
        actName: 'Sprite' 动作名字
    }
    */
    newDragonPrefAutoRemove ( opts ) {
        if( !opts.parent ){
            return '没有加入场景之前，playAnimation执行无效';
        }

        var aniNode = cc.instantiate( opts.prefab );
        aniNode.parent = opts.parent;

        var ani = aniNode.getChildByName( 'dragon' ).getComponent( dragonBones.ArmatureDisplay );

        opts.actName && ani.playAnimation( opts.actName, 1 );
        ani.addEventListener(dragonBones.EventObject.COMPLETE, function(){
            aniNode.destroy();
            opts.next && opts.next();
        }.bind( this ));

        return aniNode;
    },

    // 对node的子节点遍历执行func 不递归
    childsExec ( node, func ){
        var childs = node.children;
        var len = childs.length;
        for( var i = len - 1 ;i >=0 ;i-- ){
            var child = childs[i];
            func( child );
        }
    },

    // 数值换算成小数点后1位的带单位字符串
    formatNum ( val ) {
        var numToFixed = function( val ){
            val = val.toFixed( 1 );
            if( parseInt( val ) === parseFloat( val ) ){
                val = parseInt( val );
            }
            return val;
        }

        var ret = 'error';
        if( val >= 1000000 ){
            ret = val / 1000000;
            ret = numToFixed( ret );
            ret = ret + 'M';
            return ret;
        }else if( val >= 1000 ){
            ret = val / 1000;
            ret = numToFixed( ret );
            ret = ret + 'K';
            return ret;
        }else{
            return String( val );
        }
    },

    // K M 单位换算成数值
    parseNum ( val ) {
        if( typeof val === 'number' ) {
            val = String( val );
        };
        var idx = val.indexOf( 'K' );
        var ret = NaN;
        if( idx !== -1 ){
            val = val.substring( 0, idx );
            ret = Number( val ) * 1000;
            return ret;
        }

        idx = val.indexOf( 'M' );
        if( idx !== -1 ) {
            val = val.substring( 0, idx );
            ret = Number( val ) * 1000000;
            return ret;
        }

        ret = Number( val );
        return ret;
    },
    httpRequest ( url, param, next ) {
        return;
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;

        if( param ){
            url += '?';
            for( var i in param ){
                url = url + i + '=' + param[i] + '&';
            }
            url = url.substr(0, url.length -1 )
        }

        this.log( 'httpRequest url',url );
        url = encodeURI( url );
        xhr.open("GET",url, true);
        
        xhr.onreadystatechange = function() {
            this.log( 'httpRequest onreadystatechange',xhr.readyState,xhr.status );
            if (xhr.readyState == 4)
            {
                var response = xhr.responseText;
                if (response && response.length > 0)
                {
                    next(response);
                }
            }
             else
            {
                this.log("httpRequest 请求失败3");
            }
        }.bind(this);
        xhr.send();
    },

    

    createRedPoint( opt ){
        opt.name = opt.name || '__redPoint';
        var node = cc.instantiate( app.resMgr.prefRedPoint );
        node.name = opt.name;
        
        if( opt.parent ){
            node.parent = opt.parent;
            node.position = app.util.halfSize2Pos( opt.parent );
        }

        return node;
    },

    removeRedPoint( node, name ) {
        name = name || '__redPoint';
        app.util.removeChildByNameAll( node, name );
    },

    halfSize ( node ) {
        return cc.size(node.width/2,node.height/2);
    },

    halfSize2Pos( node ){
        return app.util.size2Pos( app.util.halfSize( node ) );
    },

    size2Pos ( size ) {
        return cc.v2( size.width, size.height );
    },

    removeChildByName( parent, name ){
        var node = parent.getChildByName( name );
        if( node ){
            node.destroy();
        }
    },

    removeChildByNameAll ( parent, name ){
        _.each( parent.children, function( child ){
            if( child.name === name ){
                child.destroy();
            }
        });

    },

    formatLengthNum ( num, len ) {
        num = String( num );
        var off = len - num.length;
        for( var i = 0;i < off; i++ ){
            num = '0' + off;
        }
        return num;
    },

    v2Distance ( p1, p2 ){
        return Math.sqrt(Math.pow(p1.x - p2.x,2)+Math.pow(p1.y - p2.y,2));
    },

    num2chinese ( num ){
        return num2chinese[ num ];
    },

    btnAddEvent( opts ){
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = opts.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = opts.scriptName;//这个是代码文件名
        clickEventHandler.handler = opts.funcName;
        clickEventHandler.customEventData = opts.eventData;
        opts.btn.clickEvents.push(clickEventHandler);
    },

    nodeShowDelay( node, time ){
        time = time || 0.5;
        if( !node ){
            console.error( 'nodeShowDelay node is ' + node );
            return;
        }
        node.opacity = 0;
        node.runAction(cc.sequence(
            cc.delayTime( time ),
            cc.callFunc(()=>{
                node.opacity = 255;
            })
        ));
    }
});
