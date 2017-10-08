const _ = require("lodash");
const JSONError = require("../errors/JSONError");
const {password_length_is_not_valid, password_is_empty} = require("../consts/Exception");

const ValidateUtil = {
    password: function (password) {
        let jsonError;
        password = password.trim();
        if (password.length === 0) {
            jsonError = new JSONError(password_is_empty);
        }
        if (password.length < 6) {
            jsonError = new JSONError(password_length_is_not_valid, 6);
        }
        return jsonError;
    }
};
module.exports = ValidateUtil;
