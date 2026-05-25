const User = require("../models/User");

class UsersController {
  // get all users
  getAll = async (req, res) => {
    const users = await User.find();

    res.status(200).json({
      message: `get ${users.length} users successfully`,
      data: users,
    });
  };

  // Get user by ID
  getById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }

    res.status(200).json({
      message: `get user ${user.name} by id ${id} successfully`,
      data: user,
    });
  };

  // Create user
  add = async (req, res) => {
    const user = await User.create(req.userData);
    res.status(201).json({
      message: `${user.name} created successfully`,
      data: user,
    });
  };

  // Update user
  update = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.userData, { new: true });
    const updatedFields = Object.keys(req.body);

    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }

    res.status(200).json({
      message: `${updatedFields.length} field(s) of ${user.name} updated successfully`,
      updatedFields,
      data: user,
    });
  };

  // Delete user
  remove = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: `${user.role} ${user.name} deleted successfully`,
    });
  };
}

module.exports = new UsersController();
