var ws = require("nodejs-websocket");
console.log("building connect...");
var getCon = null, getConReady = false;
var sendCon = null, sendConReady = false;
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        if(str === 'getMessage'){
            //保存获取消息连接
            getCon = conn;
            getConReady = true;
            //conn.sendText("getMessage success");
        }
        if(str === 'sendMessage'){
            //保存发送消息连接
            sendCon = conn;
            sendConReady = true;
            //conn.sendText("sendMessage success");
        }

        console.log(getConReady,sendConReady);
        //发送接收同时在线
        if(getConReady && sendConReady){
            getCon.sendText(str);
        }
        conn.sendText(str);
    });
    conn.on("close", function (code, reason) {
        console.log("close")
    });
    conn.on("error", function (code, reason) {
        console.log("error")
    });
});
server.listen(8888,function(){
    console.log("WebSocket success! port: 8888");
});
