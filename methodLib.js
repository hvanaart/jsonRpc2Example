exports.test = function (params,id,callback) {
    var error=null,result='The result';

    if (id!==null) {
        // method should return a result
        return callback (error,result,id);
    } else {
        return console.log("notification handled");
    }
}

exports.add= function (params,id,callback) {
    var error=null,result=-1;
    
    // are two params given?
    if (params.length !==2){
        error = "invalid params";
        return callback(error,null,id);
    }
    // do the calculation
    result = parseInt(params[0])+parseInt(params[1]);
    
    if (id!==null) {
        // return the result
        return callback (error,result,id);
    } else {
        // be quite in case of notification
        return console.log("notification handled");
    }
}
