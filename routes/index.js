const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos')

// write your routes here. Feel free to split into multiple files if you like.
router.get('/', (req, res) => {
    res.redirect('/users');
  });

router.get('/users', (req, res) => {
    res.send(todos.listPeople())
  });

router.get('/users/:name/tasks', (req, res) => {
    let curUser = req.params.name
    res.send(todos.list(curUser))
  })

router.post('/users/:name/tasks', (req,res) => {
    let curUser = req.params.name
    let curTask = req.query.content
    console.log(curTask)
    //res.sendStatus(201).send(todos.add(curUser, curTask))
    res.send(todos.add(curUser, curTask ))
})


  module.exports = router;