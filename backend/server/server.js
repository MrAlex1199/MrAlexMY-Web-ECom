import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import 'dotenv/config'
import jwt from 'jsonwebtoken';


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


// Connect to MongoDB (replace with your connection URI in .evn file)
mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

// User schema with email and hashed password
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
    try {
      const { email, password, fname, lname } = req.body;

      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }
  
      const user = new User({ email, password, fname, lname });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed password with provided password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = { id: existingUser._id, email: existingUser.email }; // Create user object for JWT
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' }); // Generate JWT with secret and expiry time

    // Set appropriate storage method (cookie or local storage) for the token
    res.cookie('jwt', token, { httpOnly: true, secure: true }); // Example for secure cookie

    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});