const _ = require("lodash");
const {server_error} = require("../consts/Exception");
const QueryUtil = require("../utils/QueryUtil");
const CheckUtil = require("../utils/CheckUtil");

function datify(obj){
    return Promise.resolve(obj);
}

function validate(obj){
    return Promise.resolve(obj);
}

function find_all({model, query={}, projection={}, sort={created_date: -1}}) {
    let {page = false, count = false} = query;
    if (_.isString(page)) {
        page = parseInt(page);
    }
    if (_.isString(count)) {
        count = parseInt(count);
    }
    return model.findJson(QueryUtil.filter(query), projection, {page, count, sort});
}

function count({model, query}){
    return model.count(QueryUtil.filter(query));
}

function find_one({model, _id, id_empty_error=server_error, empty_error=server_error}){
    return CheckUtil.check_empty(_id, id_empty_error)
        .then(e => model.findOneJson({_id}))
        .then(obj => CheckUtil.check_empty(obj, empty_error));
}

function update_one({model, _id, datify=adminService.datify, validate=adminService.validate, obj={}, id_empty_error=server_error, empty_error=server_error}){
    return CheckUtil.check_empty(_id, id_empty_error)
        .then(e=>CheckUtil.check_empty(obj, empty_error))
        .then(e=>datify(obj))
        .then(e=>validate(obj))
        .then(e=>model.update({_id}, obj))
        .then(e=> adminService.find_one({model, _id, id_empty_error, empty_error}));
}

function add_one({model, obj={}, datify = adminService.datify, validate = adminService.validate, empty_error=server_error, id_empty_error=server_error}){
    return CheckUtil.check_empty(obj._id, id_empty_error )
        .then(e=>CheckUtil.check_empty(obj, empty_error))
        .then(e=>datify(obj))
        .then(e=>validate(obj))
        .then(e=>model.create(obj))
        .then(e=>adminService.find_one({model, _id: obj._id, id_empty_error, empty_error}));
}

function remove_one({model, _id, id_empty_error = server_error, empty_error = server_error}){
    return CheckUtil.check_empty(_id, id_empty_error)
        .then(e=>adminService.find_one({model, _id, id_empty_error, empty_error}))
        .then(e=>model.remove({_id}));
}

const adminService = module.exports = {
    datify,
    validate,
    find_all,
    count,
    find_one,
    update_one,
    add_one,
    remove_one
};