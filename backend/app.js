'use strict';

const express = require('express');
const cors = require('cors');

const config = require('config');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// route imports
const authRoute = require('./_routes/auth-route');
const usersRoute = require('./_routes/users-route');

const corsOpts = {
  origin: '*',
  methods: "GET, PUT"
};

app.use(cors(corsOpts));
app.use(express.json());

// route config
app.use('/api/auth', cors(corsOpts), authRoute);
app.use('/api/user', cors(corsOpts), usersRoute);


app.listen(port, () => {
  console.log(`Server initialized on port ${port}`);
})