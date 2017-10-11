const httpStatus = require("http-status");
const util = require("util");

class JSONError {
  constructor(exception, variable, data=null) {
    let msg = exception.msg.zh_tw;
    if (variable) {
      msg = util.format(msg, variable);
    }
    this.msg = msg;
    this.errorCode = exception.errorCode;
    if(data){
      this.data = data;
    }
    this.status = httpStatus.FORBIDDEN;
  }
}

module.exports = JSONError;
