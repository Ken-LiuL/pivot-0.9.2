"use strict";
var express_1 = require('express');
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("I am healthy @ " + new Date().toISOString());
});
module.exports = router;
