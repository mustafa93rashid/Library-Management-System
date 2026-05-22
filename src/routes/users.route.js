const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const usersController = require("../controllers/users.controller");
const id = require("../middlewares/id");
const prepareUserData = require("../middlewares/prepareUserData");

router.get("/", asyncHandler(usersController.getAll))

router.get("/:id", [id], asyncHandler(usersController.getById))     

router.post("/", [prepareUserData], asyncHandler(usersController.add))

router.put("/:id", [id], [prepareUserData], asyncHandler(usersController.update))

router.delete("/:id", [id], asyncHandler(usersController.remove))

module.exports = router;