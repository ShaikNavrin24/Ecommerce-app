const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  console.log(req.body);
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new Error('Please Provide the Username');
    }
    if (!password) {
      throw new Error('Please Provide the Password');
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      throw new Error('User Not Found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log(checkPassword);

    if (checkPassword) {
      // Password is correct
      const tokenData = {
        _id: user.id,
        email: user.email
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60*8 });
      const tokenOption = {
        httpOnly: true,
        secure: true
      };

      // Send the token in response and set it as a cookie
      res.cookie("token", token, tokenOption).send({ message: 'User authenticated successfully', data: token, success: true });

    } else {
      throw new Error('Incorrect Password');
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

module.exports = userSignInController;
