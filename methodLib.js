exports.test = function (params,id,callback) {
    var error=null,result='The result';

    if (id!==null) {
        // method should return a result
        return callback (error,result,id);
    } else {
        return console.log("notification handled");
    }
}