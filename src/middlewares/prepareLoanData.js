const prepareLoanData = (req, res, next) => {
  const {
    memberId,
    materialId,
    librarianId,
    dueDate,
    finePerDay,
  } = req.body;

  req.loanData = {
    memberId,
    materialId,
    librarianId,
    dueDate,
    fine: {
      finePerDay: finePerDay || 1000,
      totalFine: 0,
      fineStatus: "unpaid",
    },
  };

  next();
};

module.exports = prepareLoanData;