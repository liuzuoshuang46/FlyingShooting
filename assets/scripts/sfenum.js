var _enum = {};
var initInt = 0x00000001;

_enum.GROWING_SKILL_GROWING1 = ++initInt; // 技能培养1
_enum.GROWING_SKILL_GROWING2 = ++initInt; // 技能培养2
_enum.GROWING_CANDY = ++initInt; // 金币倍数培养
_enum.GROWING_DAILY = ++initInt; // 日常收益培养

_enum.CURRENCY_CANDY = ++initInt; //货币-糖果
_enum.CURRENCY_DIAMOND = ++initInt; // 货币-钻石
_enum.TYPE_STRENGTH = ++initInt; // 体力

_enum.event = {}; // 游戏内发送的事件
_enum.event.GAME_PAUSE = ++initInt;  // 游戏暂停
_enum.event.UPDATE_PLAYER_DATA = ++initInt; // player-data.setItem
_enum.event.UPDATE_PLANE = ++initInt; // player-data.setItem
_enum.event.UPDATE_STRENGTH_RESOTRE_TIME = ++initInt; // player-data.setItem
_enum.event.ROLE_INFIGHT = ++initInt; // 角色出战
_enum.event.DISABLE_AD_VIDEO = ++initInt; // 视频广告日限

_enum.event.STRENGTH_GUIDE_CLICK = ++initInt; // 角色出战

_enum.BUFF_ATTACK_UPDATE = ++initInt; // 攻击力buff状态发生变化
_enum.BUFF_SUPPRORT_UPDATE = ++initInt; // 僚机buff状态发生变化
_enum.BUFF_ADD_COIN_UPDATE = ++initInt; // 金币buff状态发生变化
_enum.BUFF_1 = ++initInt; // 技能buff状态发生变化
_enum.BUFF_2 = ++initInt; // 火力提升buff状态发生变化
_enum.BUFF_3 = ++initInt; // 火力提升buff状态发生变化
_enum.BUFF_4 = ++initInt; // 火力提升buff状态发生变化

_enum.HBSwitch = ++initInt;
module.exports = _enum;