const Reservation = require("../models/Reservation");
const Material = require("../models/Material");

class ReservationsController {
  // Get all reservations
  getAll = async (req, res) => {
    const reservations = await Reservation.find()
      .populate("memberId", "name email role")
      .populate("materialId", "title category materialType");

    res.status(200).json({
      data: reservations,
    });
  };

  // Get reservation by id
  getById = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findById(id)
      .populate("memberId", "name email role")
      .populate("materialId", "title category materialType");

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      data: reservation,
    });
  };

  // Create reservation
  add = async (req, res) => {
    // Material must be unavailable
    if (req.material.availableCopies > 0) {
      return res.status(400).json({
        message: "Reservation is allowed only when availableCopies = 0",
      });
    }

    // Queue priority
    const reservationsCount = await Reservation.countDocuments({
      materialId: req.material._id,
      status: "active",
    });

    const autoCancelAfter = new Date();
 
    autoCancelAfter.setDate(autoCancelAfter.getDate() + 3);

    const reservation = await Reservation.create({
      memberId: req.member._id,
      materialId: req.material._id,

      queuePriority: reservationsCount + 1,

      notifyWhenAvailable: true,

      autoCancelAfter,
    });

    res.status(201).json({
      message: "Reservation created successfully",
      data: reservation,
    });
  };

  // Cancel reservation
  cancelReservation = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.status(200).json({
      message: "Reservation cancelled successfully",
      data: reservation,
    });
  };

  // Expire reservation
  expireReservation = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "expired";

    await reservation.save();

    res.status(200).json({
      message: "Reservation expired successfully",
      data: reservation,
    });
  };

  // Delete reservation
  remove = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      message: "Reservation deleted successfully",
    });
  };
}

module.exports = new ReservationsController();
