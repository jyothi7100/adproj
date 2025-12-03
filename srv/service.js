const cds = require('@sap/cds');
const express = require('express');

cds.on('bootstrap', app => {
  app.use('/images', express.static('app/logistics/webapp/images'));
});
