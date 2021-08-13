'use strict';

const router = require('express').Router();
const demoController = require('./../controllers/demoController');

const routes = (() => {
  router.get('/demo/:id', demoController.get);
  router.post('/demo', demoController.post);
  router.put('/demo', demoController.put);
  return router;
})();

module.exports = routes;
