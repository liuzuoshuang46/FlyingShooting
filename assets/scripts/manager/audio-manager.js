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
        audioBG : {
            type:cc.AudioClip,
            default: null
        },
        audio321GO: {
            type:cc.AudioClip,
            default: null
        },
        audioDandao : {
            type:cc.AudioClip,
            default: null
        },
        audioStrength : {
            type:cc.AudioClip,
            default: null
        },
        audioBing : {
            type:cc.AudioClip,
            default: null
        },
        audioGameOverCatchCoin : {
            type:cc.AudioClip,
            default: null
        },
        audioMonsterBomb : {
            type:cc.AudioClip,
            default: null
        },
        audioIdArr : {
            default:[],
            visible : false
        },
        audioSkills_001 : {
            type:cc.AudioClip,
            default: null
        },
        audioRoleId1:{
            type:cc.AudioClip,
            default: null
        },
        audioRoleId2:{
            type:cc.AudioClip,
            default: null
        },
        audioRoleId3:{
            type:cc.AudioClip,
            default: null
        },
        audioRoleId4:{
            type:cc.AudioClip,
            default: null
        },
        audioRoleId5:{
            type:cc.AudioClip,
            default: null
        },
        audioEatBuff:{
            type:cc.AudioClip,
            default: null
        },
        audioNiravanaPre:{
            type:cc.AudioClip,
            default: null
        },
        audioMonster1Bomb:{
            type:cc.AudioClip,
            default: null
        },
        audioBoss1Bomb:{
            type:cc.AudioClip,
            default: null
        },
        audioBossCome:{
            type:cc.AudioClip,
            default: null
        },
        audioLvup:{
            type:cc.AudioClip,
            default: null
        },
        volume : {
            default:1,
            visible : false
        },
        newBg : {
            type:cc.AudioClip,
            default: null
        }
    },
    
    play ( clip, loop, needCache ) {
        cc.audioEngine.uncache( clip );

        var aid = cc.audioEngine.play( clip, !!loop, this.volume  );
        if( needCache ) {
            // this.log('cache clip',aid ,clip.name);
            this.audioIdArr.push( [clip,aid] );
            this.node.runAction( cc.sequence(cc.delayTime( cc.audioEngine.getDuration(aid) ),cc.callFunc(this.removeCache.bind( this, aid ))) );
        }
        this.init();
    },

    getCache ( clip ) {
        for( var i in this.audioIdArr ){
            var item = this.audioIdArr[i];
            if( item[0] === clip ){
                return true;
            }
        }
        return false;
    },

    playMusic( clip ){
        var aid = cc.audioEngine.playMusic( clip, true, this.volume  );
        this.audioIdArr.push( [clip,aid] );
        cc.audioEngine.setFinishCallback( aid, this.removeCache.bind( this ) )
        this.init();
    },

    removeCache ( aid ) {
        this.log('remove cache ',aid );
        for( var i in this.audioIdArr ){
            var item = this.audioIdArr[i];
            if( item[1] === aid ){
                this.log('remove cache ',aid, item[0].name,'success' );
                cc.audioEngine.stop( aid );
                this.audioIdArr.splice( i, 1 );
                return;
            }
        }
        this.log('remove cache ',aid,'not found' );
    },

    stop ( clip ) {
        this.log('stop ',clip.name );
        for( var i in this.audioIdArr ){
            var item = this.audioIdArr[i];
            if( item[0] === clip ){
                this.log('stop ',item[1],clip.name,'success' );
                cc.audioEngine.stop( item[1] );
                this.audioIdArr.splice( i, 1 );
                return;
            }
        }
        this.log('stop ',clip.name,'not found' );
    },

    stopByAId( aid ){

    },

    init () {
        this.volume = 1;
        if( app.player.get('switchAudio') === false ){
            this.volume = 0;
        };
        cc.audioEngine.setEffectsVolume( this.volume );
        cc.audioEngine.setMusicVolume( this.volume );
    },

    start () {
        app.event.add( this );
        this.log = app.util.createLog('[audio-mgr]');
    },

    onDestroy () {
        app.event.remove( this );
    },

    handleEvent ( name, param ) {
        if( name === app.enum.event.UPDATE_PLAYER_DATA ){
            if( param.name === 'switchAudio' ){
                this.init();
            }
        }
    },
});
