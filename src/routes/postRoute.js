const express = require("express");
const {empty_error} = require("../consts/Exception");
const {Post} = require("../models");
const requireAuth = require("../passports/requireAuth");
const adminService = require("../services/adminService");

const router = express.Router();

const model = Post;

router.get('/admin/post', requireAuth, (req, res, next) => {
    let {query={}} = req;
    const projection = { _id: 1, title: 1, body: 1 };
    const sort = {priority: -1};
    adminService.find_all({model, query, projection, sort}).then(obj=>{
        res.json(obj);
    }).catch(next);
});

router.get("/admin/post/count", requireAuth, (req, res, next)=> {
    const {query={}} = req;
    adminService.count({model, query}).then(count=>res.json({count})).catch(next);
});

router.get('/admin/post/:_id', requireAuth, (req, res, next) => {
    const {_id} = req.params;
    adminService.find_one({model, _id, empty_error}).then(obj=>res.json(obj)).catch(next);
});

router.delete('/admin/post/:_id', requireAuth, (req, res, next) => {
    const {_id} = req.params;
    adminService.remove_one({model, _id, empty_error}).then(e => res.json(e) ).catch(next);
});

router.put('/admin/post/:_id', requireAuth, (req, res, next) => {
    const {_id} = req.params;
    const obj = req.body;
    adminService.update_one({model, _id, obj, empty_error}).then(e => res.json(e) ).catch(next);
});

router.post('/admin/post', requireAuth, (req, res, next) => {
    const obj = req.body;
    adminService.add_one({model, obj, empty_error}).then(e => res.json(e) ).catch(next);
});

module.exports = router;