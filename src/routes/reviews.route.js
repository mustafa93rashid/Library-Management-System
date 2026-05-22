const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");

const reviewsController = require("../controllers/reviews.controller");

const id = require("../middlewares/id");

const {checkMember, checkMaterial} = require("../middlewares/checks");

router.get("/", asyncHandler(reviewsController.getAll));

router.get("/:id", [id], asyncHandler(reviewsController.getById));

router.post("/", [checkMember,checkMaterial,],asyncHandler(reviewsController.add));

router.put("/:id",[id], asyncHandler(reviewsController.update));

router.delete("/:id",[id],asyncHandler(reviewsController.remove));

module.exports = router;