const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const reservationsController = require("../controllers/reservations.controller");
const id = require("../middlewares/id");
const {checkMember, checkMaterial} = require("../middlewares/checks");
const prepareReservationData = require("../middlewares/prepareReservationData");

router.get("/",asyncHandler(reservationsController.getAll));

router.get("/:id",[id], asyncHandler(reservationsController.getById));

router.post("/", [ checkMember, checkMaterial, prepareReservationData,], asyncHandler(reservationsController.add));

router.put("/cancel/:id",[id],asyncHandler(reservationsController.cancelReservation));

router.put("/expire/:id",[id],asyncHandler(reservationsController.expireReservation));

router.delete("/:id",[id],asyncHandler(reservationsController.remove));

module.exports = router;