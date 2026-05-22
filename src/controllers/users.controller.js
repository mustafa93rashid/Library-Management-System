const User = require("../models/User");

class UsersController {
  getAll = async (req, res) => {
    const users = await User.find();

    res.status(200).json({
      data: users,
    });
  };

  getById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      data: user,
    });
  };

  add = async (req, res) => {
    const user = await User.create(req.userData);
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  };

  update = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.userData);

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  };

  remove = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  };
}

module.exports = new UsersController();
