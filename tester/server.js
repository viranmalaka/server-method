const express = require('express');
const ServerMethods = require('../lib/server/index');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

ServerMethods({
  serviceDir: __dirname + '/service',
  baseUrl: '/api',
})(app);

app.listen(5000, () => {
  console.log('Test Server is up');
})