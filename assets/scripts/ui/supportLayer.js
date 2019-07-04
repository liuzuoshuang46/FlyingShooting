// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var idx2FrameName = {
    1:2,
    2:3,
    3:4,
    4:5,
    5:1
}

cc.Class({
    extends: cc.Component,

    properties: {

        btnBuy: cc.Button,
        upLv: cc.ParticleSystem,
        labelAttack: cc.Label,
        labelSspeed: cc.Label,
        labelLv: cc.Label,
        planeSpfram:{//皮肤
            type: [cc.SpriteFrame],
            default: []
        },
        roleNode: { // 角色展示
            type: cc.Sprite,
            default:null
        },
    },

    start () {
        app.homeWgt.checkRedPoint();
    },
    onEnter()
    {

    },
    init () {
        this.unlockLevel = [0,5,15,999];
        this.initData();
        this.initUI();
    },
    
    initData() {
        this._weaponData = app.player.get('weapon');
        this._roleData = app.player.get('hero');
        this._toggles = [];

        var childs = this.node.getChildByName('plane').children;
        for( var i in childs ){
            this._toggles.push( childs[i] );
        }

        if( !this._selectIndex ) {
            this._selectIndex = app.player.get('useRoleId');
        }

        var level = app.player.get('level');
        for(var i=0;i<childs.length;i++)
        {
            if(this._roleData[Number(i + 1)].lock == true &&  level> this.unlockLevel[i])
            {
                this._roleData[Number(i + 1)].lock = false;
            }
        }
        app.player.set('hero',this._roleData);

        // if(this._roleData[2].lock == true &&  level>= this.unlockLevel[this._selectIndex])
        // {
        //     this._roleData[2].lock = false;
        //     app.player.set('role',this._roleData);
        // }

        this.initWeaponData(this._selectIndex);
        this.roleNode.spriteFrame = this.planeSpfram[this._selectIndex];
    },

    initUI () {

    },

    selectRole ( roleId ) {
        var name = roleId.currentTarget.name;
        var selected = 0;
        if(name == "plane1")
            selected = 0;
        else if(name == "plane2")
            selected = 1;
        else if(name == "plane3")
            selected = 2;
        else if(name == "plane4")
            selected = 3;
        if(this._roleData[Number(selected + 1)].lock == true)
            return;


        this._selectIndex = selected;
        this.selectIdx( this._selectIndex );
        this.changePlane(this._selectIndex);
        this.initWeaponData(this._selectIndex);
    },
    selectData ( selected ) {

        if(this._roleData[Number(selected + 1)].lock == true)
            return;


        this._selectIndex = selected;
        this.selectIdx( this._selectIndex );
        this.changePlane(this._selectIndex);
        this.initWeaponData(this._selectIndex);
    },

    selectIdx ( roleId ) {
        this._selectIndex = roleId;
        this.roleNode.spriteFrame = this.planeSpfram[this._selectIndex];
        app.player.set('useRoleId',roleId);
    },
    initWeaponData(roleId)
    {
        var dataArray = app.json.tbWeapon_ly.json;
        this.weaponData = null;
        for(var i=0;i<dataArray.length;i++)
        {
            var lv =  Number(dataArray[i].wingman_leve);
            var userlv =  this._weaponData[Number(roleId+1)].Level;
            if(userlv == lv)
            {
                this.weaponData = dataArray[i];
                break;
            }

        }
        var buy= this.btnBuy.node.getChildByName("Label").getComponent(cc.Label);//
        buy.string = app.util.formatNum(this. weaponData.consumption);
        this.labelAttack.string = "攻击力:"+this. weaponData.attack;
        this.labelSspeed.string = "速度:"+this. weaponData.speed;
        this.labelLv.string = "lv:"+this. weaponData.wingman_leve;


        for(var i=0;i<this._toggles.length;i++)
        {
            var node = this._toggles[i].getChildByName("NotOpened");
            if(this.unlockLevel[i] == 999 )
            {
                this._toggles[i].getComponent(cc.Button).interactable = false;
                this._toggles[i].getChildByName("selected").active = false;
                this._toggles[i].getChildByName("NotOpened").active = true;
            }
            else if(this._roleData[Number(i+1)].lock == true)
            {
                this._toggles[i].getComponent(cc.Button).interactable = false;
                this._toggles[i].getChildByName("selected").active = false;
                node.active = true;
                node.getChildByName("Label").getComponent(cc.Label).string = this.unlockLevel[i]+"关解锁"
            }
            else if(i == this._selectIndex)
            {
                this._toggles[i].getComponent(cc.Button).interactable = false;
                this._toggles[i].getChildByName("selected").active = true;
                node.active = false;
            }
            else
            {
                this._toggles[i].getComponent(cc.Button).interactable = true;
                this._toggles[i].getChildByName("selected").active = false;
                node.active = false;
            }
        }
    },
    playAudioByRoleId( rid ){

    },
    
    changePlane (roleId) {

        if(app.gameMgr.plane) {
            app.gameMgr.plane.updataSkin(roleId);
        }

    },

    usePlane () {

    },

    buyPlane () {

        if(app.player.checkCoin(this.weaponData.consumption,true))
        {
            app.player.coinBuy(this.weaponData.consumption);

            this._weaponData[Number(this._selectIndex+1)].Level ++;
            app.player.set('weapon',this._weaponData);

            this.initWeaponData(this._selectIndex);

            this.upLv.resetSystem();
        }
        else
        {
            app.logView.log("金币不足");
        }
    },

    onDisable () {
        if( this.playingAudio ){
            app.audioMgr.stop( this.playingAudio );
        }
    },

    tryOutRole () {

    }
});
