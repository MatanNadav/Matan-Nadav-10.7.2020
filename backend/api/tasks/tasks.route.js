"use strict";
exports.__esModule = true;
var express_1 = require("express");
var tasks_controller_1 = require("./tasks.controller");
var router = express_1.Router();
router.get('/task', tasks_controller_1.getTasks);
router.post('/task', tasks_controller_1.createTask);
router.get('/task/:taskId', tasks_controller_1.getTask);
router["delete"]('/task/:taskId', tasks_controller_1.deleteTask);
router.put('/task/:taskId', tasks_controller_1.updateTask);
exports["default"] = router;