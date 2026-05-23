const User = require("../models/User");

class UsersController {
    // get all users
  getAll = async (req, res) => {
    const users = await User.find();

    res.status(200).json({
      data: users,
    });
  };

  // Get user by ID
  getById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      data: user,
    });
  };

  // Create user
  add = async (req, res) => {
    const user = await User.create(req.userData);
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  };

  // Update user
  update = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.userData, { new: true });

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  };

  // Delete user
  remove = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  };
}

module.exports = new UsersController();
