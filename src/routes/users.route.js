const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(usersController.getAll))

router.get("/:id", [id], asyncHandler(usersController.getById))     

router.post("/", asyncHandler(usersController.add))

router.put("/:id", [id],asyncHandler(usersController.update))

router.delete("/:id", [id], asyncHandler(usersController.remove))

module.exports = router;