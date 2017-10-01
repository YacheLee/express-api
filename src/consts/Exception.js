const Exception = {
    email_is_duplicated: {
        errorCode: 10001,
        msg: {
            zh_tw: '此Email已經被使用'
        }
    },
    user_does_not_exist: {
        errorCode: 10002,
        msg: {
            zh_tw: '此帳號尚未註冊'
        }
    },

    password_length_is_not_valid: {
        errorCode: 10003,
        msg: {
            zh_tw: '密長度必須大於%s'
        }
    },
    password_is_empty: {
        errorCode: 10004,
        msg: {
            zh_tw: '密碼不可以是空的'
        }
    },
    unauthenticated: {
        errorCode: 10005,
        msg: {
            zh_tw: '登入失敗'
        }
    },
    email_is_empty: {
        errorCode: 10006,
        msg: {
            zh_tw: 'Email不可以是空的'
        }
    },
    email_format_is_not_valid: {
        errorCode: 10007,
        msg: {
            zh_tw: 'Email格式有誤'
        }
    },
    server_error: {
        errorCode: 99999,
        msg: {
            zh_tw: '抱歉，伺服器發生錯誤。請聯絡管理員。'
        }
    }
};

module.exports = Exception;