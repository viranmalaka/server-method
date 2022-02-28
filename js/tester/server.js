const express = require('express');
const SM = require('../dist/lib/server');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

SM.ServerMethod({
  serviceDir: __dirname + '/service',
  baseUrl: '/api',
})(app);

app.listen(5000, () => {
  console.log('Test Server is up');
})