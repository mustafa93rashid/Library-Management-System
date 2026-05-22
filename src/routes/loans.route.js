const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const loansController = require("../controllers/loans.controller");

const id = require("../middlewares/id");
const prepareLoanData = require("../middlewares/prepareLoanData");

const {checkMember,checkLibrarian,checkMaterial,checkAvailableCopies,getLoan} = require("../middlewares/checks");

router.get("/", asyncHandler(loansController.getAll));

router.get("/:id", [id], asyncHandler(loansController.getById));

router.post( "/",[checkMember, checkLibrarian,checkMaterial,checkAvailableCopies,prepareLoanData,], asyncHandler(loansController.add),);

router.put("/return/:id",[id, getLoan], asyncHandler(loansController.returnLoan),);

router.put( "/cancel/:id", [id, getLoan],asyncHandler(loansController.cancelLoan),);

router.put("/pay/:id", [id, getLoan], asyncHandler(loansController.payFine));

router.delete("/:id", [id], asyncHandler(loansController.remove));

module.exports = router;
