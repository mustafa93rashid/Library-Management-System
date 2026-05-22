const Reservation = require("../models/Reservation");

const prepareReservationData = async (
  req,
  res,
  next
) => {
  const {
    memberId,
    materialId,
    notifyWhenAvailable,
  } = req.body;

  // Count active reservations
  const reservationsCount =
    await Reservation.countDocuments({
      materialId,
      status: "active",
    });

  // Auto cancel after 3 days
  const autoCancelAfter = new Date();

  autoCancelAfter.setDate(
    autoCancelAfter.getDate() + 3
  );

  req.reservationData = {
    memberId,
    materialId,

    queuePriority: reservationsCount + 1,

    notifyWhenAvailable:
      notifyWhenAvailable ?? true,

    autoCancelAfter,
  };

  next();
};

module.exports = prepareReservationData;