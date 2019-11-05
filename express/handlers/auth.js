const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET, TOKEN_EXPIRES_IN, ADMIN } = require('../../config/keys');
const { validateLoginInput } = require('../validation/auth');
//  Load user model
const { User, Admin } = require('../models');

const checkEmail = async email => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const user = await User.findOne({ email });
      if (!user) {
        return false;
      }
      return user;
    }
    return admin;
    // Check for User
  } catch (err) {
    return err;
  }
};
//  Login User Handle function
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  const errors = validateLoginInput(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }
  const user = await checkEmail(email);
  if (!user) {
    errors.global = 'email or password incorrect';
    return res.status(400).json({ errors });
  }
  if (!user.confirmed) {
    errors.global = 'please confirm your email first';
    return res.status(403).json({ errors });
  }
  bcrypt
    .compare(password, user.password)
    .then(isMatch => {
      console.log(isMatch);
      if (!isMatch) {
        errors.global = 'email or password incorrect';
        return res.status(400).json({ errors });
      }
      if (isMatch) {
        const userData = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
        const secret = user.role === 'admin' ? ADMIN : SECRET;
        const key = user.role === 'admin' ? 'adminToken' : 'userToken';
        console.log(user, secret, key);
        return jwt.sign(
          userData,
          secret,
          { expiresIn: TOKEN_EXPIRES_IN },
          (err, token) => {
            return res.json({
              key,
              token: `Bearer ${token}`,
              expiresIn: TOKEN_EXPIRES_IN,
              id: userData.id,
            });
          },
        );
      }
      errors.global = 'email or password incorrect';
      return res.status(400).json({ errors });
    })
    .catch(err => {
      console.log(err);
      errors.global = 'Something went wrong :/';
      return res.status(400).json({ errors });
    });
};
