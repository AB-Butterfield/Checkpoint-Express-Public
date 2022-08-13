const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const users = require("./models/express-models/todos");
// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)



app.get('/', (req, res) => {
  res.redirect('/users');

})
app.get('/users', async (req,res) => {
  try {
      res.send(users.listPeople())
  } catch(error) {
      res.send(error)
  }
} )

app.get('/users/:name/tasks', (req, res) => {
  try {
    let curUser = app.query(req.params.id)
    console.log(curUser)
    //res.send(users.list(curUser))
  } catch(error) {
    res.send(error)
  }
})

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

const PORT = 3100
app.listen(PORT, () => {
  console.log(`App listening on port:${PORT}`)
})

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
