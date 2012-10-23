var methodLib = require ('./methodLib');

exports.handleJsonRpc = function (requestObject,callback){
    var operation='',id=null;
    
    // Notification?
    if (requestObject.hasOwnProperty('id')) {
        id=requestObject.id;
    }
    
    // Operation mode
    if (requestObject.hasOwnProperty('method')) {
        var method = requestObject.method;
        operation = 'method';
    }
    
    if (requestObject.hasOwnProperty('result')) {
        operation = 'result';
    }
    
    if (requestObject.hasOwnProperty('error')) {
        operation = 'error';
    }
    
    switch (operation) {
        case 'method':
            if (requestObject.hasOwnProperty('params')) {
                var params = requestObject.params;
                return callMethod(method, params,id);
            } else {
                return callback("no params given",null);
            }
            break;
            
        case 'result':
            return handleResult(requestObject.result,id);
            break;
            
        case 'error':
            return handleError(requestObject.error,id);
            break;
            
        default:
            return callback("operation is undefined",null);
    }
    
    function callMethod(method,params,id) {
        methodLib[method](params,id,function (error,result) {
                          // the method returned an error
                          if (error!==null) {
                          return sendError(error,id);
                          
                          // the method returned a result
                          } else if (result!==null){
                          return sendResult(result,id);
                          }
                          });
    }
    
    function sendResult(result,id){
        var obj = {
        jsonrpc:"2.0",
        result:result,
        id:id
        }
        return callback(null,obj);
    }
    
    function sendError(error,id){
        var obj = {
        jsonrpc:"2.0",
        error:error,
        id:id
        }
        return callback(null,obj);
    }
    
    function handleResult (result,id) {
        // Handle the result
        return console.log("Result received:",result,"with id:",id);
    }
    
    function handleError (error,id) {
        // Handle the error
        return console.log("Error received:",error,"with id:",id);
    }
}