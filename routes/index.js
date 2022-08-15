const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos')
var bodyParser = require('body-parser')
router.use(bodyParser.json())
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
    let curName = req.params.name
    let curTask = req.body.toJSON()
    todos.add(curName, curTask)
        res.status(201).send(curTask)
    })

router.put('/users/:name/tasks/:index', (req, res) => {
    res.send(todos.complete(req.params.name, req.params.index))
});

router.delete('/users/:name/tasks/:index', (req, res) => {
    res.status(204).send(todos.remove(req.params.name, req.params.index))
});


  module.exports = router;