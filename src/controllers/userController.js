const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "name and email are required",
      });
    }

    const user = await userModel.createUser({ name, email });
    return res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "email already exists" });
    }

    return res.status(500).json({ message: "failed to create user" });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "invalid user id" });
    }

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "failed to fetch user" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
