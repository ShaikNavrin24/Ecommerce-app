const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

async function createUser(userData) {
  console.log(userData)
  const { username, email, password } = userData;

  // Check if user with the provided email already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const existingUser1 = await userModel.findOne({ username });
  if (existingUser1) {
    throw new Error('User with this Username already exists');
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user document
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
    role: 'ADMIN', // Assign a default role
  });

  // Save the user to the database
  return await newUser.save();
}

async function userSignUpController(req, res) {
  try {
    const { username, password, email } = req.body;

    // Validate user input
    if (!email || !username || !password) {
      throw new Error('Please provide username, email, and password');
    }

    // Create the user
    const createdUser = await createUser({username,email,password});

    res.send({ message: 'User created successfully', user: createdUser });
  } catch (error) {
    res.send({ message: error.message });
  }
}

module.exports = userSignUpController;
