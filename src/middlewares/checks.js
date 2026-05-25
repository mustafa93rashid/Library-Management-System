const User = require("../models/User");
const Material = require("../models/Material");
const Loan = require("../models/Loan");

// Check Member
const checkMember = async (req, res, next) => {
  const memberId = req.body.memberId;
  const member = await User.findById(memberId);

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
  const librarianId = req.body.librarianId;
  const librarian = await User.findById(librarianId);

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
  const materialId = req.body.materialId;
  const material = await Material.findById(materialId);

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
  const id = req.params.id;
  const loan = await Loan.findById(id);

  if (!loan) {
    return res.status(404).json({
      message: `Loan with id ${id} not found`,
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
