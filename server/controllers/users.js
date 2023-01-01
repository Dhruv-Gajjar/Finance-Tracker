const User = require("../models/Users");

const getAllUsers = async (req, res) => {
    const query = req.query.new;
  
    try {
      const user = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find({});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  module.exports = {
    getAllUsers
  }