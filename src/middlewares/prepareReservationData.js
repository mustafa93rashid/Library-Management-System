const Reservation = require("../models/Reservation");

const prepareReservationData = async (req, res, next) => {
  const { memberId, materialId, notifyWhenAvailable } = req.body;

  const reservationsCount = await Reservation.countDocuments({
    materialId,
    status: "active",
  });

  const autoCancelAfter = new Date();

  autoCancelAfter.setDate(autoCancelAfter.getDate() + 3);

  req.reservationData = {
    memberId,
    materialId,
    queuePriority: reservationsCount + 1,

    notifyWhenAvailable: notifyWhenAvailable ?? true,

    autoCancelAfter,
  };

  next();
};

module.exports = prepareReservationData;
