const express = require('express');
const joi = require('joi');
const router = express.Router();
const auth = require('../_middleware/auth');
const validateWith = require('../_middleware/validation');
const userService = require('../_services/users-service');

const schema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email({tlds: {allow: false}}).required()
});

router.get(
  '/:id',
  auth,
  async (req, res) => {
    try {
      let userList = await userService.getUsers(req.params.id);

      res.status(200).send({code: 200, data: userList});
    } catch (error) {
      res
        .status(500)
        .json({ status: 'error', message: error.message, statusCode: 500 });
    }
  }
);

router.put(
  '/',
  validateWith(schema),
  async (req, res) => {
    try {
      let userNew = await userService.createUser(req.body);
  
      if (!userNew[0])
        return res.status(400).send({ error: 'Failed to create user.' });
  
      res.status(200).send({code: 200, message: `User "${req.body.name}" has been created!`});
    } catch (error) {
      res
        .status(500)
        .json({ status: 'error', message: error.message, statusCode: 500 });
    }
  }
);

module.exports = router;