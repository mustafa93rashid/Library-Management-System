const Loan = require("../models/Loan");
const Material = require("../models/Material");
const User = require("../models/User");
const calculateFine = require("../utils/calculateFine");

class LoansController {
  // Get all Loans
  getAll = async (req, res) => {
    const loans = await Loan.find()
      .populate("memberId", "name email")
      .populate("materialId", "title author")
      .populate("librarianId", "name email");

    res.status(200).json({
      data: loans,
      message: `get ${loans.length} loans successfully`,
    });
  };

// Get active loans
getActiveLoans = async (req, res) => {
  const loans = await Loan.find({ status: "active" })
    .populate("memberId", "name email")
    .populate("materialId", "title author")
    .populate("librarianId", "name email");

  res.status(200).json({
    message: `get ${loans.length} active loans successfully`,
    data: loans,
  });
};

// Get cancelled loans
getCancelledLoans = async (req, res) => {
  const loans = await Loan.find({ status: "cancelled" })
    .populate("memberId", "name email")
    .populate("materialId", "title author")
    .populate("librarianId", "name email");

  res.status(200).json({
    message: `get ${loans.length} cancelled loans successfully`,
    data: loans,
  });
};

// Get paid fine loans
getPaidFineLoans = async (req, res) => {
  const loans = await Loan.find({ "fine.fineStatus": "paid" })
    .populate("memberId", "name email")
    .populate("materialId", "title author")
    .populate("librarianId", "name email");

  res.status(200).json({
    message: `get ${loans.length} paid fine loans successfully`,
    data: loans,
  });
};

// Get overdue loans
getOverdueLoans = async (req, res) => {
  const loans = await Loan.find({ status: "overdue" })
    .populate("memberId", "name email")
    .populate("materialId", "title author")
    .populate("librarianId", "name email");

  res.status(200).json({
    message: `get ${loans.length} overdue loans successfully`,
    data: loans,
  });
};


  // Get all Loans by id
  getById = async (req, res) => {
    const id = req.params.id;
    const loan = await Loan.findById(id)
      .populate("memberId", "name email")
      .populate("materialId", "title author")
      .populate("librarianId", "name email");

    if (!loan) {
      return res.status(404).json({
        message: `Loan with id ${id} not found`,
      });
    }

    res.status(200).json({
      data: loan,
      message: `get loan by id ${id} successfully`,
    });
  };

  // add Loan
  add = async (req, res) => {
    const loan = await Loan.create(req.loanData);

    const user = await User.findById(loan.memberId);
    const material = await Material.findById(loan.materialId);

    material.availableCopies -= 1;
    await material.save();

    res.status(201).json({
      message: `Loan ${material.materialType} ${material.title} to ${user.name} created successfully`,
      data: loan,
    });
  };

  // return Loan
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
      loan.fine.finePerDay,
    );

    loan.returnDate = returnDate;
    loan.fine.totalFine = totalFine;
    loan.status = totalFine > 0 ? "overdue" : "returned";

    await loan.save();

    const material = await Material.findById(loan.materialId);
    const user = await User.findById(loan.memberId);

    if (material && material.availableCopies < material.totalCopies) {
      material.availableCopies += 1;
      await material.save();
    }

    res.status(200).json({
      message: `${user.name} returned ${material.title} successfully`,
      data: loan,
    });
  };

  // cancel Loan
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
    const user = await User.findById(loan.memberId);

    if (material && material.availableCopies < material.totalCopies) {
      material.availableCopies += 1;
      await material.save();
    }

    res.status(200).json({
      message: `${user.name} cancelled ${material.title} successfully`,
      data: loan,
    });
  };

  // pay fine
  payFine = async (req, res) => {
    const loan = req.loan;

    if (loan.fine.totalFine <= 0) {
      return res.status(400).json({
        message: "This loan has no fine",
      });
    }

    const user = await User.findById(loan.memberId);
    const material = await Material.findById(loan.materialId);

    loan.fine.fineStatus = "paid";
    await loan.save();

    res.status(200).json({
      message: `${user.name} paid the fine of ${material.title} ${loan.fine.totalFine} successfully`,
      data: loan,
    });
  };

  // delete Loan
  remove = async (req, res) => {
    const id = req.params.id;

    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({
        message: `Loan with id ${id} not found`,
      });
    }

    const material = await Material.findById(loan.materialId);
    const user = await User.findById(loan.memberId);

    if (material && material.availableCopies < material.totalCopies) {
      material.availableCopies += 1;
      await material.save();
    }

    await loan.deleteOne();

    res.status(200).json({
      message: `Loan ${material.title} to ${user.name} deleted successfully`,
    });
  };
}

module.exports = new LoansController();