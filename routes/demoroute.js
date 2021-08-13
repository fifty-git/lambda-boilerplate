'use strict';

const router = require('express').Router();
const demoController = require('./../controllers/demoController');

const routes = (() => {
  router.get('/demo/:id/:name', demoController.get);
  router.post('/demo', demoController.post);
  return router;
})();

module.exports = routes;
