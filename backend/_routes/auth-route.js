const express = require('express');
const router = express.Router();
const joi = require('joi');
const jwt = require('jsonwebtoken');
const userService = require('../_services/users-service');
const validateWith = require('../_middleware/validation');
const passwordCheck = require('../_utilities/passwordManager');

const schema = joi.object({
  name: joi.string().required(),
  password: joi.string().required().min(5),
});

router.post('/', validateWith(schema), async (req, res) => {
  try {
    const { name, password } = req.body;
    let user = await userService.getUserByUsername(name);

    if (!user[0].password)
      return res.status(400).send({ error: 'Invalid username or password.' });
    if (!passwordCheck.check(user[0].password, password))
      return res.status(400).send({ error: 'Invalid username or password.' });

    const token = jwt.sign(
      {
        userId: user[0].id,
        username: user[0].username,
      },
      'jwtPrivateKey'
    );
    res.status(200).send({code: 200, data: token});
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: error.message, statusCode: 500 });
  }
});

router.put('/', validateWith(schema), async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = {
      name: name,
      password: password,
      email: `${name}@admin.com`,
      userType: 'admin',
    }
    let userNew = await userService.createUser(user);

    if (!userNew[0])
      return res.status(400).send({ error: 'Failed to create admin user.' });

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      'jwtPrivateKey'
    );

    res.status(200).send({code: 200, data: token});
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: error.message, statusCode: 500 });
  }
});

module.exports = router;
