var URL = "https://game.fcoolgame.com.cn/"

var HTTP = cc.Class({
    extends: cc.Component,

    statics:{
        url:URL,
        sendRequest : function(path,data,handler,extraUrl){
            console.log('[HTTP sendRequest]',path);
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for(var k in data){
                if(str != "?"){
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if(extraUrl == null){
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            xhr.open("GET",requestURL, true);
            if (cc.sys.isNative){
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):",JSON.parse(xhr.responseText));
                    // try {
                    //     var ret = JSON.parse(xhr.responseText);
                    //     if(handler !== null){
                    //         handler(ret);
                    //     }                        /* code */
                    // } catch (e) {
                    //     console.log("err:" + e);
                    //     handler(null);
                    // }
                    // finally{
                    // }
                    
                    var ret = JSON.parse(xhr.responseText);
                    if(handler !== null){
                        handler(ret);
                    }          

                }
            };
            
            xhr.send();
            return xhr;
        },
    },
});