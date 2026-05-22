const calculateFine = (dueDate, returnDate, finePerDay) => {
  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  if (returned <= due) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const lateDays = Math.ceil((returned - due) / millisecondsPerDay);

  return lateDays * finePerDay;
};

module.exports = calculateFine;