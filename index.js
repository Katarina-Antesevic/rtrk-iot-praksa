const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const deviceRoute=require('./routes/device');
const measurementRoute = require('./routes/data');
const defaultRoute = require('./routes/default');
app.use(jsonParser);


app.use(express.static('client_app/build'))
app.use('/api/device', deviceRoute);
app.use('/api/data', measurementRoute);

if(process.env.NODE_ENV==='production'){
  const path = require('path');
  app.use('*', defaultRoute)
}

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Started on port ' + port);
})
console.log('SERVER STARTED!')


