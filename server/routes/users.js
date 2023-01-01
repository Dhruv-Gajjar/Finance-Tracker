const router = require("express").Router();
const {getAllUsers} = require("../controllers/users");

router.get("/", getAllUsers)

module.exports = router