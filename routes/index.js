const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
router.use("/users", require("./models/express-models/todos"))
router.get('/users', async (req,res) => {
  try {
      res.send([])
  } catch(error) {
      res.send(error)
  }
} )