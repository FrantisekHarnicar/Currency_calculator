const express = require('express');
const app = express();
const port = 3000;

const routesHandler = require('./routes/handler');

app.use('/', routesHandler);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});