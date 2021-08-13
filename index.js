'use strict';

const serverless = require('serverless-http');
const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const expJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(
  expJwt({ secret: process.env.JWT_KEY }).unless({
    path: ['/auth'],
  }),
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

// routes
const authRouter = require('./routes/auth')(jwt);
const demoroute = require('./routes/demoroute');

app.use('/', demoroute);

// auth - jwt
app.use(
  '/',
  basicAuth({
    users: { demouser: process.env.BASIC_USER_PASS },
  }),
  authRouter,
);

module.exports.handler = serverless(app);
