const Review = require("../models/Review");

class ReviewsController {
  getAll = async (req, res) => {
    const reviews = await Review.find()
      .populate("memberId", "name email role")
      .populate("materialId", "title category materialType");

    res.status(200).json({
      data: reviews,
    });
  };

  getById = async (req, res) => {
    const id = req.params.id;
    const review = await Review.findById(id)
      .populate("memberId", "name email role")
      .populate("materialId", "title category materialType");

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      data: review,
    });
  };

  // Create review
  add = async (req, res) => {
    const { memberId, materialId, rating, comment } = req.body;

    const review = await Review.create({
      memberId,
      materialId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review created successfully",
      data: review,
    });
  };

  // Update review
  update = async (req, res) => {
    const id = req.params.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    const { rating, comment } = req.body;

    if (rating !== undefined) {
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    await review.save();

    res.status(200).json({
      message: "Review updated successfully",
      data: review,
    });
  };

  // Delete review
  remove = async (req, res) => {
    const id = req.params.id;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
    });
  };
}

module.exports = new ReviewsController();
