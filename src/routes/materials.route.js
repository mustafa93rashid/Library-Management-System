const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const materialsController = require("../controllers/materials.controller");
const id = require("../middlewares/id");
const prepareMaterialsData = require("../middlewares/prepareMaterialsData");

router.get("/", asyncHandler(materialsController.getAll))

router.get("/:id", [id], asyncHandler(materialsController.getById))     

router.post("/", [prepareMaterialsData], asyncHandler(materialsController.add))

router.put("/:id", [id], [prepareMaterialsData], asyncHandler(materialsController.update))

router.delete("/:id", [id], asyncHandler(materialsController.remove))

module.exports = router;