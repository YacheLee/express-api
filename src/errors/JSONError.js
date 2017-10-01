const httpStatus = require("http-status");
const util = require("util");

/**
 * Class representing an JSON API error.
 */
class JSONError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
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
