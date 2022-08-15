const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const userRoutes = require('./routes/index')
const bodyParser = require('body-parser');
const todos = require('./models/express-models/todos');

app.use(express.json())
app.use(bodyParser.json())
// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

app.use("/", userRoutes)

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

const PORT = 3100
app.listen(PORT, () => {
  console.log(`App listening on port:${PORT}`)
})

if (!module.parent) app.listen(3100); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
