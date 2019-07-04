var formula = cc.Class({
    extends: cc.Component,

    properties: {
        type : {
            get () {
                return this.tbData.type;
            }
        },
        role_name : {
            get () {
                return this.tbData.name;
            }
        },
        desc : {
            get () {
                return this.tbData.desc;
            }
        },
        hp : {
            get () {
                if( !this._parsedHp ){
                    this._parsedHp = app.util.parseNum( this.tbData.hp );
                }
                return this._parsedHp;
            }
        },
        model : {
            get () {
                return this.tbData.model;
            }
        },
        limit : {
            get () {
                return this.tbData.limit;
            }
        },
        default_type : {
            get () {
                return this.tbData.default_type;
            }
        },
        technical_skill: {
            get () {
                return this.tbData.technical_skill;
            }
        },
        technical_skill_level: {
            get () {
                return this.incomData.technical_skill_level;
            }
        },
        default_skill_formula: {
            get () {
                return this._default_skill_formula;
            },
            set ( val ) {
                this._default_skill_formula = val;
            }
        },
        technical_skill_formula: {
            get () {
                return this._technical_skill_formula;
            },
            set ( val ) {
                this._technical_skill_formula = val;
            }
        },
    },
    init : function( type ){
        this.tbData = app.json.tbRole.json[ type ];
        this.incomData = app.player.get('hero')[ type ];
        if( !this.incomData ){
            this.incomData = {
                technical_skill_level: 1
            }
        }

        this.createSkillFormula();
    },

    createSkillFormula () {
        var formula = require('skillFormula');
        this.default_skill_formula = new formula( );
        this.technical_skill_formula = new formula( );

        this.default_skill_formula.init( this.default_type, app.player.get('defaultSkillLevel').growing1Level,app.player.get('defaultSkillLevel').growing2Level );

        var growing1Level = app.player.get('hero')[this.type].growing1Level;
        var growing2Level = app.player.get('hero')[this.type].growing2Level;
        this.technical_skill_formula.init( this.technical_skill, growing1Level, growing2Level );
    }
});
