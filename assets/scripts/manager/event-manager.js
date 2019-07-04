module.exports = function(){
    return new mgr();
}

var mgr = function(){
    this.log = (function( tag, logret ){
        var log = function(){
            if( !logret ) return;
            var p = [].slice.call(arguments);
            p.splice(0,0,tag);
            console.log.apply( console, p );
        }
        return log;
    })('[event-mgr]', true );
    this.objs = []
}

mgr.prototype.isAdded = function( obj ){
    return this.objs.indexOf( obj ) !== -1;
}

mgr.prototype.add = function( obj ){
    if( this.isAdded(obj) ){
        console.error('repeat object');
    }
    this.objs.push( obj );
}
mgr.prototype.addIfNoExist = function( obj ){
    if( !this.isAdded( obj ) ){
        this.add( obj );
    }
}
mgr.prototype.remove = function( obj ){
    for(var i in this.objs ){
        var item = this.objs[i];
        if( item === obj ) {
            this.objs.splice(i,1);
        }
    }
}
mgr.prototype.send = function( name, params ){
    this.log( name, JSON.stringify(params) );
    for( var i in this.objs ){
        var item = this.objs[i];
        item.handleEvent.call( item, name, params );
    }
}
