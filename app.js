var app = require("express").createServer(),
    io = require("socket.io").listen(app);

// 실제 heroku에서는 PORT를 사용. 현재 Cloud9ide에선 C9_PORT사용
var port = process.env.app_port;
//if (!port){
//    port = process.env.PORT;
//}

app.listen(port);

app.get("/", function(req, res){
    res.sendfile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket){
    socket.on("chat", function(data){
        console.log("receivedata = " + data);
        socket.broadcast.emit("chat", data);
    });
});
