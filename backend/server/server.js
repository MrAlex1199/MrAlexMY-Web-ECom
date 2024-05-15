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
  password: { type: String, required: true },
  selectedProducts: [{
    productId: { type: String, required: true },
    productName: { type: String, required: true},
    imageSrc: { type: String, required: true },
    selectedColor: { type: String, required: true },
    selectedSize: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }]
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

app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode the token to get the user's ID or email
    const user = await User.findById(decodedToken.id); // Assuming user ID is stored in the token
    
    res.status(200).json({ success: true, fname: user.fname, lname: user.lname, userId: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch user details' });
  }
});

// Endpoint to fetch selected products for a user
app.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, selectedProducts: user.selectedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch selected products' });
  }
});

// Endpoint to update the quantity and  Newtotal price of a product
app.put('/cart/update-quantity/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity, totalPrice } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const productIndex = user.selectedProducts.findIndex(product => product.productId === productId);
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Update product quantity and total price in the database
    user.selectedProducts[productIndex].quantity = quantity;
    user.selectedProducts[productIndex].totalPrice = totalPrice;

    await user.save(); // Persist changes to the database

    res.status(200).json({ success: true, message: 'Product quantity updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update product quantity' });
  }
});

app.delete('/cart/delete-product/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const productIndex = user.selectedProducts.findIndex(product => product.productId === productId);
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    // Remove the product from the user's selectedProducts array
    user.selectedProducts.splice(productIndex, 1);

    // Save the updated user document to the database
    await user.save();

    res.status(200).json({ success: true, message: 'Product deleted from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete product from cart' });
  }
});


// Endpoint to save selected products
app.post('/save-selected-products', async (req, res) => {
  try {
    const { userId, productName, productId, selectedColor, selectedSize, price, imageSrc } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let productExists = false;
    user.selectedProducts.forEach(product => {
      if (product.productId === productId && product.selectedColor === selectedColor && product.selectedSize === selectedSize) {
        product.productName = productName;
        product.quantity += 1;
        product.price = parseFloat(price.replace(/[^0-9.-]+/g,""));
        product.totalPrice = product.quantity * product.price;
        product.imageSrc = imageSrc;
        productExists = true;
      }
    });

    if (!productExists) {
      user.selectedProducts.push({
        productId,
        productName,
        imageSrc,
        selectedColor,
        selectedSize,
        price: parseFloat(price.replace(/[^0-9.-]+/g,"")),
        quantity: 1,
        totalPrice: parseFloat(price.replace(/[^0-9.-]+/g,"")),
      });
    }

    await user.save();

    res.status(201).json({ success: true, message: 'Selected product saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to save selected product' });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const user = new User({ email, password, fname, lname });
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully', isLoggedIn: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed', isLoggedIn: false });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' , loginStatus: false });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' ,loginStatus: false });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password', isLoggedIn: false , loginStatus: false });
    }

    const user = { id: existingUser._id, email: existingUser.email, fname: existingUser.fname, lname: existingUser.lname };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.status(200).json({ success: true, message: 'Login successful', token, isLoggedIn: true, fname: existingUser.fname, lname: existingUser.lname , loginStatus: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed', isLoggedIn: false });
  }
});

// logout endpoint
app.post('/logout', async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});