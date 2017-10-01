const httpStatus = require("http-status");
const util = require("util");

class ValidationError {
    constructor(error) {
        this.error = error;
        this.status = httpStatus.FORBIDDEN;
    }
}

module.exports = ValidationError;