var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    var userId = socket.id;
    socket.on("connect", function() {
        console.log("a user go connect");
    });
    socket.on("disconnect", function() {
        console.log("a user go out");
    });
    socket.on('reconnect', function() {
        console.log("a user reconnect");
    });
    socket.on("msg", function(obj) {
        obj.id = userId;
        io.emit("msg", obj); //发送
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});