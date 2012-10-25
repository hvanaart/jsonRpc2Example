var net = require('net'),
fs = require('fs');

var rpcHandler = require('./rpcHandler');

var server = net.createServer(function(socket) {connect(socket);});
server.listen(5555, function() {console.log('server started');});

function connect(socket) {
    socket
    .on('data',function(data) {
        try {
        var requestObject = JSON.parse(data);
        
        rpcHandler.handleJsonRpc(requestObject, function (error,result) {
                                 // Log the error
                                 if (error!==null) {
                                 return console.log("JSON processing error:",error);
                                 }
                                 
                                 // Send the result
                                 if (result!==null) {
                                 var stringData=JSON.stringify(result),
                                 buffer=new Buffer(stringData);
                                 return socket.write(buffer);
                                 }
                                 });
        } catch (err) {
        console.log("JSON parse error",err);
        }
                       })
    .on('end', function (){
        console.log("data input ended");
        })
    .on('close', function (){
        console.log("connection closed");
        })
    .on('error', function (excep){
        console.log("stream error", excep);
        });
}