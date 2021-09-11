const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  // const { name, email, password } = req.body;

  // // error checking - controller example
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email, and password');
  // }

  // // hash user password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // const tempUser = {
  //   name,
  //   email,
  //   password: hashedPassword,
  // };

  const user = await User.create({ ...req.body });

  // // generate token - controller
  // const payload = {
  //   userId: user._id,
  //   name: user.name,
  // };

  // const token = jwt.sign(payload, 'JWTSECRET', {
  //   expiresIn: '30d',
  // });

  // generate token - instance method (mongoose)
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  // compare password
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  // generate token - instance method with mongoose
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
