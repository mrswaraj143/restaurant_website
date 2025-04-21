const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const email = 'sawantswaraj76@gmail.com'; // your desired email
  const password = 'SwarajDS@123'; // your desired password

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email: email, // using 'email' instead of 'username'
    password: hashedPassword,
  });

  await newUser.save();

  console.log('✅ User created successfully!');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Error connecting to database or saving user:', err);
});
