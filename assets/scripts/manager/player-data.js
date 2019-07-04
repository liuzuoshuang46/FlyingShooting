var tempVideoPrizeNumLimit = 10;
if( CC_DEBUG ){
    tempVideoPrizeNumLimit = 2;
}
var keys = {
    revivalData: {
        type:'object',
        default:()=>{ return {
            time: JSON.stringify( new Date() ).substring(0,11),
            num: 0
        }},
        name:'revivalData'
    },
    buyStrengthData: {
        type:'object',
        default:()=>{ return {
            time: JSON.stringify( new Date() ).substring(0,11),
            num: 0
        }},
        name:'buyStrengthData'
    },
    buyPopCoin: {
        type:'object',
        default:()=>{ return {
            time: JSON.stringify( new Date() ).substring(0,11),
            num: 0
        }},
        name:'buyPopCoin'
    },
    buyPopDiamond: {
        type:'object',
        default:()=>{ return {
            time: JSON.stringify( new Date() ).substring(0,11),
            num: 0
        }},
        name:'buyPopDiamond'
    },
    storyGuide:{
        type:'number',
        default:0,
        name:'storyGuide'
    },
    gameGuide:{
        type:'number',
        default:0,
        name:'gameGuide'
    },
    niravanaGuide:{
        type:'number',
        default:0,
        name:'niravanaGuide'
    },
    fitPlaneGuide:{
        type:'number',
        default:0,
        name:'fitPlaneGuide'
    },
    bossGuide:{
        type:'number',
        default:0,
        name:'bossGuide'
    },
    strengthGuide:{
        type:'number',
        default:0,
        name:'strengthGuide'
    },
    coin: { // 金币
        type:'number',
        default:()=>{ return app.json.tbInitial.json[1].initial_candy },
        name:'coin'
    },
    diamond: { // 钻石
        type:'number',
        default:()=>{ return app.json.tbInitial.json[1].initial_diamonds },
        name:'diamond'
    },
    level: { // 当前关卡
        type:'number',
        default:1,
        name:'level'
    },
    useRoleId: { // 使用的角色id
        type:'number',
        default: 0,
        name: 'useRoleId'
    },
    useSupportId: { // 使用的僚机id
        type:'number',
        default: 0,
            name: 'useSupportId'
    },
    checkIn: {
        type:'object',
        default:{
            num:0,
            time:0
        },
        name: 'checkIn'
    },
hero: { // 角色 培养的属性
        type:'object',
        default: {
            1:{
                roleId:1,
                Level:1, // 角色绑定的技能在技能表中配的培养1的等级
                    lock:false
            },
            2:{
                roleId:2,
                    Level:1,
                    lock:true
            },
            3:{
                roleId:3,
                    Level:1,
                    lock:true
            },
            4:{
                roleId:4,
                Level:1,
                lock:true
            }
        },
        name: 'hero'
    },
    support: { // 角色 培养的属性
        type:'object',
    default: {
            1:{
                roleId:1,
                    Level:1, // 角色绑定的技能在技能表中配的培养1的等级
                    lock:false
            },
            2:{
                roleId:2,
                    Level:1,
                    lock:true
            },
            3:{
                roleId:3,
                    Level:1,
                    lock:true
            },
            4:{
                roleId:4,
                    Level:1,
                    lock:true
            }
        },
        name: 'support'
    },
weapon: { // 武器培养的属性
        type:'object',
    default: {
            1:{
                roleId:1,
                    Level:1,
                    lock:false
            },
            2:{
                roleId:2,
                    Level:1,
                    lock:true
            },
            3:{
                roleId:3,
                    Level:1,
                    lock:true
            },
            4:{
                roleId:4,
                    Level:1,
                    lock:true
            }
        },
        name: 'weapon'
    },

    defaultSkillLevel: { // 玩家默认子弹的培养
        type:'object',
        default: {
            growing1Level:1, // 角色绑定的技能在技能表中配的培养1的等级
            growing2Level:1, // 角色绑定的技能在技能表中配的培养2的等级
        },
        name: 'defaultSkillLevel'
    },
    switchShake:{
        type:'boolean',
        default:true,
        name:'switchShake'
    },
    switchAudio:{
        type:'boolean',
        default:true,
        name:'switchAudio'
    },
    profitBasics:{
        type:'number',
        default:1,
        name:'profitBasics'
    },
    profitDaily:{
        type:'number',
        default:1,
        name:'profitDaily'
    },
    hangUpTime:{
        type:'number',
        default:0,
        name:'hangUpTime'
    },
    niravanaData: {
        type:'object',
        default:()=>{ return {
            time: Date.now(),
            num: 1
        }},
        name:'niravanaData'
    },
    dailyResetTable:{
        type:'object',
        default:() => {
            return {
                __time:  JSON.stringify(new Date()).substring(0,11)
            };
        },
        name:'dailyResetTable'
    },
    fitPlaneData: {
        type:'object',
        default:()=>{ return {
            time: Date.now(),
            num: 1
        }},
        name:'fitPlaneData'
    },
    payInfo: {
        type:'object',
        default:()=>{ return {
        }},
        name:'payInfo'
    },
    strengthData: {
        type:'object',
        default:()=>{ return {
            time: Date.now(),
            num: app.json.tbInitial.json[1].initial_power
        }},
        name:'strengthData'
    },
    changeDefaultFitPlane:{
        type:'number',
        default:0,
        name:'changeDefaultFitPlane'
    },
    freeFitPlaneNum:{
        type:'number',
        default:1,
        name:'freeFitPlaneNum'
    },
    getPrizePromotionAppids:{ // 交叉推广奖励领取过奖励的游戏列表
        type:'object',
        default:{},
        name:'getPrizePromotionAppids'
    }
}

var type2convertFunc = function( type, write ) {
    switch( type ){
        case 'number':
            return write ? String : Number;
        case 'string':
            return String;
        case 'object':
            return write ? JSON.stringify : function ( val ) {
                var ret = val;
                if( typeof val !== 'string' ) return ret;
                if( !val.length ) return {};
                return JSON.parse( val );
            };
        case 'boolean':
            return write ? String : function ( val ) {
                var ret = val;
                if( typeof val !== 'string' ) return ret;
                if( !val.length ) return false;
                return val === 'true';
            };
        default :
            return function( val ){ return val; }
            break;
    }
}

cc.Class({

    extends: cc.Component,

    properties:{
        _attr:{
            default:{}
        },
        attr:{
            get () {
                return this._attr;
            },
            set ( val ) {
                return this._attr;
            }
        },
        _tryOutRoleData:{
            default:{}
        },
        _showRandPrizeBoxOnReturnHome: false
    },

    start () {
        this._randPrizeBoxData = {
            show: false,
            randTime: 0
        }
    },

    keys () {
        return keys;
    },

    get ( key ) {
        if( this.attr[ key ] === undefined ){
            console.error( '[player-data] get () key not found error ', key );
        }
        if( typeof this.attr[ key ] === 'object' ){
            return app.util.deepClone( this.attr[ key ] );
        }
        return this.attr[ key ];
    },
    set ( key, val ) {
        this.log( key, val,typeof(val), key.type );
        key = keys[key];
        if( !key || typeof(val) !== key.type ){
            console.error( 'player.data.set error',key,val);
            return;
        }
        
        var saveString = type2convertFunc(key.type,true)( val );
        this.log( 'setItem', key.name, saveString, typeof val );
        app.projFunc.saveLocal( key.name, saveString ); // setItem sync 有些平台会报错保存失败
        
        this.attr[ key.name ] = val;
        app.event.send(app.enum.event.UPDATE_PLAYER_DATA,{ name:key.name, val : val });
    },

    init () {
        this.log = app.util.createLog( '[ player-data ]', false );
        this.parseLocalData();
    },

    parseLocalData ( ) {
        this.log('-------- parseLocalData begin ----------');

        for( var i in keys ){
            var key = keys[i];
            var val = app.projFunc.getLocal( key.name );
            if( typeof val === 'string' ){
                this.log('string', val.length, !!val );
            }
            this.log( 'parseLocalData', key.name, val );
            
            this.log('step1', val, val === 'undefined',   val === 'undefined' ? key.default : val);
            val = val === 'undefined' ? key.default : val;

            val = val || key.default;

            val = typeof val === 'function' ? val() : val;

            var parseFunc = type2convertFunc(key.type);
            try{
                val = parseFunc( val );
            }catch( e ){
                console.error( e );
            }
            this.set(key.name, val );
        }

        this.log('-------- parseLocalData end ----------');
        this.checkDailyData();
    },

    // 检测需要每日更新的数据时间
    checkDailyData () {
        var curTime = JSON.stringify(new Date()).substring(0,11);

        var obj = this.get('dailyResetTable');
        if( curTime !== obj.__time ){
            obj = {
                __time: curTime
            }
            this.set('dailyResetTable',obj);
        }
    },

    getHangUpVal () {
        var level = this.get('profitDaily');
        var val = app.json.tbProfitDaily.json[ level ].val;
        return app.util.parseNum( val );
    },


    // 金币购买商品
    coinBuy : function( num ){
        var parsedNum = app.util.parseNum( num );
        var haveCoin = app.player.get('coin');
        if( haveCoin < parsedNum ){
              return false;
        }
        app.player.set( 'coin', haveCoin - parsedNum );
        return true;
    },

    // 检查金币数量是否足够
    checkCoin : function( num, passShop ){
        var parsedNum = app.util.parseNum( num );
        var haveCoin = app.player.get('coin');
        if( haveCoin < parsedNum ){
            if( !passShop ){
                app.clickAddCoin();
            }
            return false;
        }
        return true;
    },

    // 钻石购买商品
    diamondBuy : function( num ){
        var parsedNum = app.util.parseNum( num );
        var haveDiamond = app.player.get('diamond');
        if( haveDiamond < parsedNum ){
              return false;
        }
        app.player.set( 'diamond', haveDiamond - parsedNum );
        return true;
    },

    // 检查钻石数量是否足够
    checkDiamond : function( num, passShop ){
        var parsedNum = app.util.parseNum( num );
        var haveDiamond = app.player.get('diamond');
        if( haveDiamond < parsedNum ){
            if( !passShop ){
                app.clickAddDiamond();
            }
            return false;
        }
        return true;
    },

    // 读取下一关id
    getNextLevel : function( curLevel ) {
        curLevel = curLevel || app.player.get('level') ;
        var max = Object.keys( app.json.tbImpede.json ).length;
        var next = curLevel + 1;
        next = next > max ? null : next;
        return next;
    },
    
    

    // 开始游戏减体力
    subStrengthStartGame () {
        var subNum = app.json.tbInitial.json[1].Hp_expend;
        var curData = this.get('strengthData');
        var curNum = curData.num;
        if( curNum === app.strengthMax ){
            app.event.send( app.enum.event.UPDATE_STRENGTH_RESOTRE_TIME );
        }
        if( curNum >= subNum ){
            curData.num -= subNum;
            this.set( 'strengthData', curData );
            return true;
        }
        return false;
    },

    addStrength ( num, time ) {
        var max = app.strengthMax;

        var curData = this.get('strengthData');
        var curNum = curData.num;
        
        var to = curNum + num;
        if( to > max ){ 
            to = max 
        };
        curData.num = to;
        if( time ){
            curData.time = time;
        }
        this.set( 'strengthData', curData );
    },

    addCandy( num ){
        var cur = this.get('coin');
        this.set('coin', cur + num );
    },
    
    addDiamond( num ){
        var cur = this.get('diamond');
        this.set('diamond', cur + num );
        if( num ){
            app.animMgr.addDiamondAnim();
        }
    },

    buyDiamond( tbData, next ){
        if( app.debug.freeDiamond ){
            return next();
        }
        app.chsdk.afterInit( function(){app.chsdk.buy( tbData, next )} );
    },
    
    handlePayedOrder( orderInfo ){
        app.player.addDiamond( orderInfo.diamondNum );
        app.logView.log('购买成功');
    },
    getUseRoleId(){
        if( this._tryOutRoleData.used ){
            return this._tryOutRoleData.id;
        }
        return app.player.get('useRoleId');
    },

    getDailyResetByKey( key ){
        if( this.get( 'dailyResetTable' )[ key ] ){
            return this.get( 'dailyResetTable' )[ key ];
        }
        return 0;
    },

    setDailyResetByKey( key, val ){
        var tb = this.get('dailyResetTable');
        tb[key] = val;
        this.set( 'dailyResetTable', tb );
    },

    videoNumEnable () {
        return this.getDailyResetByKey('videoNumEnable') < 15;
    },
    addvideoNum ( ) {
        this.setDailyResetByKey( 'videoNumEnable', this.getDailyResetByKey('videoNumEnable') + 1 );
    },

    // 视频购买金币日限
    buyPopCoinEnable () {
        return this.getDailyResetByKey('buyPopCoinEnable') < tempVideoPrizeNumLimit;
    },
    addBuyPopCoinNum ( ) {
        this.setDailyResetByKey( 'buyPopCoinEnable',this.getDailyResetByKey('buyPopCoinEnable') + 1 );
    },

    // 视频购买钻石日限
    buyPopDiamondEnable () {
        return this.getDailyResetByKey('buyPopDiamondEnable') < tempVideoPrizeNumLimit;
    },
    addBuyPopDiamondNum ( ) {
        this.setDailyResetByKey( 'buyPopDiamondEnable', this.getDailyResetByKey('buyPopDiamondEnable') + 1 );
    },

    // 钻石购买体力日限
    buyStrengthEnable () {
        return this.getDailyResetByKey('buyStrengthEnable') < tempVideoPrizeNumLimit;
    },
    addBuyStrengthNum ( ) {
        this.setDailyResetByKey( 'buyStrengthEnable', this.getDailyResetByKey('buyStrengthEnable') + 1 );
    },

    // 视频复活日限
    revivalEnable () {
        return this.getDailyResetByKey('revivalEnable') < tempVideoPrizeNumLimit;
    },
    addRevivalNum ( ) {
        this.setDailyResetByKey( 'revivalEnable',this.getDailyResetByKey('revivalEnable') + 1 );
    },

    // 视频购买大招日限
    niravanEnable () {
        return this.getDailyResetByKey('niravanEnable') < tempVideoPrizeNumLimit;
    },
    addNiravanaNum () {
        this.setDailyResetByKey( 'niravanEnable', this.getDailyResetByKey('niravanEnable') + 1 );
    },
    // 视频购买合体日限
    fitPlaneEnable () {
        return this.getDailyResetByKey('fitPlaneEnable') < tempVideoPrizeNumLimit;
    },
    addFitPlaneNum () {
        this.setDailyResetByKey( 'fitPlaneEnable',this.getDailyResetByKey('fitPlaneEnable') + 1 );
    },

    // 视频试用角色日限
    tryOutRoleEnable () {
        return this.getDailyResetByKey('tryOutRoleEnable') < tempVideoPrizeNumLimit;
    },
    addTryOutRoleNum () {
        this.setDailyResetByKey( 'tryOutRoleEnable', this.getDailyResetByKey('tryOutRoleEnable') + 1 );
    },

    // 随机宝箱日限
    randPrizeBoxEnable () {
        return this.getDailyResetByKey('randPrizeBoxEnable') < tempVideoPrizeNumLimit;
    },
    addRandPrizeBoxNum () {
        this.setDailyResetByKey( 'randPrizeBoxEnable', this.getDailyResetByKey('randPrizeBoxEnable') + 1 );
    },
    getPromotionAppidPrizeData ( appId ) {
        var obj = this.get('getPrizePromotionAppids');
        return obj[appId] || {};
    },
    recordPromotionPrizeAppidCanGet( appId ){
        var obj = this.get('getPrizePromotionAppids');
        if( obj[ appId ] ) {
            return;
        }
        obj[ appId ] = {
            canget: true,
            isget: false
        };
        this.set('getPrizePromotionAppids', obj );
    },
    recordPromotionPrizeAppidDoGet( appId ){
        var obj = this.get('getPrizePromotionAppids');
        if( !obj[ appId ] ) {
            console.error( 'recordPromotionPrizeAppidDoGet appId not found');
            return;
        }
        obj[ appId ] = {
            canget: true,
            isget: true
        };
        this.set('getPrizePromotionAppids', obj );
    }
});