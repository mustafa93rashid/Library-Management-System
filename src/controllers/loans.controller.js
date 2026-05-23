const Loan = require("../models/Loan");
const Material = require("../models/Material");
const calculateFine = require("../utils/calculateFine");

class LoansController {
  getAll = async (req, res) => {
    const loans = await Loan.find()
      .populate("memberId")
      .populate("materialId")
      .populate("librarianId");

    res.status(200).json({
      data: loans,
    });
  };

  getById = async (req, res) => {
    const id = req.params.id;
    const loan = await Loan.findById(id)
      .populate("memberId")
      .populate("materialId")
      .populate("librarianId");

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    res.status(200).json({
      data: loan,
    });
  };

  add = async (req, res) => {
    const loan = await Loan.create(req.loanData);

    req.material.availableCopies -= 1;
    await req.material.save();

    res.status(201).json({
      message: "Loan created successfully",
      data: loan,
    });
  };

  returnLoan = async (req, res) => {
    const loan = req.loan;

    if (loan.status === "returned") {
      return res.status(400).json({
        message: "Loan already returned",
      });
    }

    if (loan.status === "cancelled") {
      return res.status(400).json({
        message: "Cancelled loan cannot be returned",
      });
    }

    const returnDate = req.body.returnDate || new Date();

    const totalFine = calculateFine(
      loan.dueDate,
      returnDate,
      loan.fine.finePerDay
    );

    loan.returnDate = returnDate;
    loan.fine.totalFine = totalFine;
    loan.status = totalFine > 0 ? "overdue" : "returned";

    await loan.save();

    const material = await Material.findById(loan.materialId);

    if (material && material.availableCopies < material.totalCopies) {
      material.availableCopies += 1;
      await material.save();
    }

    res.status(200).json({
      message: "Loan returned successfully",
      data: loan,
    });
  };

  cancelLoan = async (req, res) => {
    const loan = req.loan;

    if (loan.status !== "active") {
      return res.status(400).json({
        message: "Only active loans can be cancelled",
      });
    }

    loan.status = "cancelled";
    await loan.save();

    const material = await Material.findById(loan.materialId);

    if (material && material.availableCopies < material.totalCopies) {
      material.availableCopies += 1;
      await material.save();
    }

    res.status(200).json({
      message: "Loan cancelled successfully",
      data: loan,
    });
  };

  payFine = async (req, res) => {
    const loan = req.loan;

    if (loan.fine.totalFine <= 0) {
      return res.status(400).json({
        message: "This loan has no fine",
      });
    }

    loan.fine.fineStatus = "paid";
    await loan.save();

    res.status(200).json({
      message: "Fine paid successfully",
      data: loan,
    });
  };

  remove = async (req, res) => {
    const loan = await Loan.findByIdAndDelete(req.params.id);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    res.status(200).json({
      message: "Loan deleted successfully",
    });
  };
}

module.exports = new LoansController();