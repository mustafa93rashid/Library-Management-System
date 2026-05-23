const User = require("../models/User");
const Material = require("../models/Material");
const Loan = require("../models/Loan");

// Check Member
const checkMember = async (req, res, next) => {
  const member = await User.findById(req.body.memberId);

  if (!member) {
    return res.status(404).json({
      message: "Member not found",
    });
  }

  if (member.role !== "member") {
    return res.status(400).json({
      message: "User must be a member",
    });
  }

  req.member = member;

  next();
};

// Check Librarian
const checkLibrarian = async (req, res, next) => {
  const librarian = await User.findById(req.body.librarianId);

  if (!librarian) {
    return res.status(404).json({
      message: "Librarian not found",
    });
  }

  if (librarian.role !== "librarian" && librarian.role !== "manager") {
    return res.status(400).json({
      message: "User must be librarian or manager",
    });
  }

  req.librarian = librarian;

  next();
};

// Check Material
const checkMaterial = async (req, res, next) => {
  const material = await Material.findById(req.body.materialId);

  if (!material) {
    return res.status(404).json({
      message: "Material not found",
    });
  }

  req.material = material;

  next();
};

// Check Available Copies
const checkAvailableCopies = (req, res, next) => {
  if (!req.material.isAvailable()) {
    return res.status(400).json({
      message: "No available copies",
    });
  }

  next();
};

// Get Loan
const getLoan = async (req, res, next) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return res.status(404).json({
      message: "Loan not found",
    });
  }

  req.loan = loan;

  next();
};

module.exports = {
  checkMember,
  checkLibrarian,
  checkMaterial,
  checkAvailableCopies,
  getLoan,
};