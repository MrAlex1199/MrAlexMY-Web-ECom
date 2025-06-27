import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Configure Multer
const upload = multer({ dest: join(__dirname, "uploads/") });

const app = express();
const mongoURI = process.env.MONGO || "mongodb://localhost:27017/userDB";
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your connection URI in .evn file)
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully to:", mongoURI);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// User schema with email and hashed password
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true },
  selectedProducts: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      imageSrc: { type: String, required: true },
      selectedColor: { type: String, required: true },
      selectedSize: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  address: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      age: { type: Number, required: true },
    },
  ],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Admin schema with email and hashed password
const adminSchema = new mongoose.Schema({
  adminemail: { type: String, required: true, unique: true },
  adminpassword: { type: String, required: true },
  Afname: { type: String, required: true },
  Alname: { type: String, required: true },
  employeeID: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, default: "admin" },
});

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (this.isModified("adminpassword")) {
    const salt = await bcrypt.genSalt(10);
    this.adminpassword = await bcrypt.hash(this.adminpassword, salt);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock_remaining: { type: Number, required: true },
  href: { type: String },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String },
  breadcrumbs: { type: String },
  images: [{ src: String, alt: String }],
  description: { type: String },
  colors: [{ name: String, class: String, selectedClass: String }],
  sizes: [{ name: String, inStock: Boolean }],
  highlights: [String],
  details: String,
  discount: { type: Number, default: 0 },
  reviewsAvg: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  reviewsHref: { type: String, default: "#" },
  comments: [
    {
      id: { type: Number, required: true },
      userId: { type: String },
      name: { type: String, required: true },
      comment: { type: String, required: true },
      reviewImg: [{ type: String }],
      rating: { type: Number, default: 0 },
      date: { type: String, required: true },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

// New Product Schema
const NewProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock_remaining: { type: Number, required: true },
  href: { type: String },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String },
  breadcrumbs: { type: String },
  images: [{ src: String, alt: String }],
  description: { type: String },
  colors: [{ name: String, class: String, selectedClass: String }],
  sizes: [{ name: String, inStock: Boolean }],
  highlights: [String],
  details: String,
  discount: { type: Number, default: 0 },
  reviewsAvg: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  reviewsHref: { type: String, default: "#" },
  comments: [
    {
      id: { type: Number, required: true },
      userId: { type: String },
      name: { type: String, required: true },
      comment: { type: String, required: true },
      reviewImg: [{ type: String }],
      rating: { type: Number, default: 0 },
      date: { type: String, required: true },
    },
  ],
});

const NewProduct = mongoose.model("NewProduct", NewProductSchema);

// Confirm order schema
const OrderSchema = new mongoose.Schema({
  orderid: { type: Number, required: true, unique: true },
  userId: { type: String, required: true },
  customer: { type: String, required: true },
  productselected: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  ordered: { type: Date, required: true },
  estDelivery: { type: Date, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  deliveryprice: { type: Number, required: true },
  totalprice: { type: String, required: true },
  payment: { type: String, required: true },
  fromaddress: { type: String, required: true },
  toaddress: { type: String, required: true },
  shippingaddress: { type: String, required: true },
  trackingcode: { type: String, required: true },
  lastlocation: { type: String, required: true },
  carrier: { type: String, required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model("Order", OrderSchema);

// Endpoint to get all orders to admindashboard
app.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Endpoint to get all orders for a specific user
app.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (!orders) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Endpoint to save comments for a product or new product by ID
app.post(["/products/:id/comments"], async (req, res) => {
  const { id } = req.params;
  const { userId, name, comment, reviewImg, rating, date } = req.body;

  // Validate required fields
  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }
  if (!comment) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    let product = await Product.findById(id);
    let isNewProduct = false;

    if (!product) {
      product = await NewProduct.findById(id);
      isNewProduct = true;
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newComment = {
      id: Date.now(),
      userId,
      name: name || "Anonymous",
      comment,
      reviewImg: Array.isArray(reviewImg) ? reviewImg : [],
      rating: rating || 0,
      date,
    };

    product.comments.push(newComment);
    await product.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
      productType: isNewProduct ? "newProduct" : "product",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
});

// Endpoint to save order details
app.post("/orders/save", async (req, res) => {
  try {
    const {
      orderid,
      userId,
      customer,
      productselected,
      ordered,
      estDelivery,
      from,
      to,
      deliveryprice,
      totalprice,
      payment,
      fromaddress,
      toaddress,
      shippingaddress,
      trackingcode,
      lastlocation,
      carrier,
      status,
    } = req.body;

    // Validate required fields
    if (!userId || !shippingaddress || !payment) {
      return res
        .status(400)
        .json({ message: "Missing required order details" });
    }

    const order = new Order({
      orderid,
      userId,
      customer,
      productselected,
      ordered,
      estDelivery,
      from,
      to,
      deliveryprice,
      totalprice,
      payment,
      fromaddress,
      toaddress,
      shippingaddress,
      trackingcode,
      lastlocation,
      carrier,
      status,
    });

    await order.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order details:", error);
    res.status(500).json({ message: "Error saving order" });
  }
});

// Endpoint to upload CSV file and add new product to MongoDB
app.post(
  "/api/upload-csv-new-products",
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    try {
      const NewProducts = [];

      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (row) => {
            // Basic validation for required fields
            if (
              !row.name ||
              !row.price ||
              !row.stock_remaining ||
              !row.imageSrc
            ) {
              console.warn("Skipping row due to missing required fields:", row);
              return;
            }

            try {
              const NewProduct = {
                name: row.name,
                price: parseFloat(row.price.replace("$", "")),
                stock_remaining: parseInt(row.stock_remaining),
                href: row.href || "",
                imageSrc: row.imageSrc,
                imageAlt: row.imageAlt || "",
                breadcrumbs: row.breadcrumbs || "",
                images: row.images
                  ? row.images.split(" | ").map((image) => {
                      const [src, alt] = image.split(" > ");
                      if (!src || !alt) throw new Error("Invalid image format");
                      return { src, alt };
                    })
                  : [],
                colors: row.colors
                  ? row.colors.split(" | ").map((color) => {
                      const [name, classStr, selectedClass] =
                        color.split(" > ");
                      if (!name || !classStr || !selectedClass)
                        throw new Error("Invalid color format");
                      return { name, class: classStr, selectedClass };
                    })
                  : [],
                sizes: row.sizes
                  ? row.sizes.split(" | ").map((size) => {
                      const [name, inStock] = size.split(" > ");
                      if (!name || !inStock)
                        throw new Error("Invalid size format");
                      return { name, inStock: inStock === "true" };
                    })
                  : [],
                description: row.description || "",
                highlights: row.highlights ? row.highlights.split(" | ") : [],
                details: row.details || "",
                discount: row.discount ? parseInt(row.discount) : 0,
                reviewsAvg: row.reviewsAverage || 0,
                reviewsCount: row.reviewsTotal || 0,
                reviewsHref: row.reviewLink || "#",
              };

              // Validate numeric fields
              if (
                isNaN(NewProduct.price) ||
                isNaN(NewProduct.stock_remaining) ||
                isNaN(NewProduct.discount)
              ) {
                throw new Error("Invalid numeric value");
              }

              NewProducts.push(NewProduct);
            } catch (error) {
              console.warn(
                `Skipping row due to parsing error: ${error.message}`,
                row
              );
            }
          })
          .on("end", () => resolve())
          .on("error", (error) => reject(error));
      });

      if (NewProducts.length === 0) {
        return res
          .status(400)
          .json({ message: "No valid products found in CSV" });
      }

      await NewProduct.insertMany(NewProducts, { ordered: false }); // ordered: false to continue on duplicates
      res.status(200).json({
        message: `${NewProducts.length} products added successfully!`,
      });
    } catch (error) {
      console.error("Error processing CSV:", error);
      res
        .status(500)
        .json({ message: "Error uploading products", error: error.message });
    } finally {
      // Clean up file regardless of success or failure
      try {
        fs.unlinkSync(filePath);
      } catch (cleanupError) {
        console.error("Error deleting file:", cleanupError);
      }
    }
  }
);

// Endpoint to add Discount to product by ID
app.put("/api/products/:id/discount", async (req, res) => {
  const { id } = req.params;
  const { discount } = req.body;
  // console.log("discount", discount, "ID", id);
  try {
    const objectId = new mongoose.Types.ObjectId(id); // Use 'new' keyword to instantiate ObjectId
    const product = await Product.findById(objectId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.discount = discount;
    await product.save();
    res.status(200).json({ message: "Discount added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding discount" });
  }
});

// Endpoint to upload CSV file and add products to MongoDB
app.post("/api/upload-csv", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;

  try {
    const products = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          // Basic validation for required fields
          if (
            !row.name ||
            !row.price ||
            !row.stock_remaining ||
            !row.imageSrc
          ) {
            console.warn("Skipping row due to missing required fields:", row);
            return;
          }

          try {
            const product = {
              name: row.name,
              price: parseFloat(row.price.replace("$", "")),
              stock_remaining: parseInt(row.stock_remaining),
              href: row.href || "",
              imageSrc: row.imageSrc,
              imageAlt: row.imageAlt || "",
              breadcrumbs: row.breadcrumbs || "",
              images: row.images
                ? row.images.split(" | ").map((image) => {
                    const [src, alt] = image.split(" > ");
                    if (!src || !alt) throw new Error("Invalid image format");
                    return { src, alt };
                  })
                : [],
              colors: row.colors
                ? row.colors.split(" | ").map((color) => {
                    const [name, classStr, selectedClass] = color.split(" > ");
                    if (!name || !classStr || !selectedClass)
                      throw new Error("Invalid color format");
                    return { name, class: classStr, selectedClass };
                  })
                : [],
              sizes: row.sizes
                ? row.sizes.split(" | ").map((size) => {
                    const [name, inStock] = size.split(" > ");
                    if (!name || !inStock)
                      throw new Error("Invalid size format");
                    return { name, inStock: inStock === "true" };
                  })
                : [],
              description: row.description || "",
              highlights: row.highlights ? row.highlights.split(" | ") : [],
              details: row.details || "",
              discount: row.discount ? parseInt(row.discount) : 0,
              reviewsAvg: row.reviewsAverage || 0,
              reviewsCount: row.reviewsTotal || 0,
              reviewsHref: row.reviewLink || "#",
            };

            // Validate numeric fields
            if (
              isNaN(product.price) ||
              isNaN(product.stock_remaining) ||
              isNaN(product.discount)
            ) {
              throw new Error("Invalid numeric value");
            }

            products.push(product);
          } catch (error) {
            console.warn(
              `Skipping row due to parsing error: ${error.message}`,
              row
            );
          }
        })
        .on("end", () => resolve())
        .on("error", (error) => reject(error));
    });

    if (products.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid products found in CSV" });
    }

    await Product.insertMany(products, { ordered: false }); // ordered: false to continue on duplicates
    res
      .status(200)
      .json({ message: `${products.length} products added successfully!` });
  } catch (error) {
    console.error("Error processing CSV:", error);
    res
      .status(500)
      .json({ message: "Error uploading products", error: error.message });
  } finally {
    // Clean up file regardless of success or failure
    try {
      fs.unlinkSync(filePath);
    } catch (cleanupError) {
      console.error("Error deleting file:", cleanupError);
    }
  }
});

// Endpoint to get all new products
app.get("/api/new-products", async (req, res) => {
  try {
    const newProducts = await NewProduct.find();
    res.status(200).json(newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching new products" });
  }
});

//Endpoint to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Endpoint to get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Endpoint to get a single new product by ID
app.get("/api/new-products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newProduct = await NewProduct.findById(id);
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Endpoint to get user data and send it to Frontend
app.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      userId: user._id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      address: user.address, // This already contains all addresses
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user details" });
  }
});

// Endpoint to fetch admin data and send it to Frontend
app.get("/admin", async (req, res) => {
  try {
    const Atoken =
      req.headers.authorization?.split(" ")[1] || req.headers["x-admin-token"]; // Extract the token from the Authorization header
    const decodedToken = jwt.verify(Atoken, process.env.JWT_SECRET); // Decode the token to get the admin's ID or email
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const admin = await Admin.findById(decodedToken.id); // Assuming admin ID is stored in the token
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({
      success: true,
      adminId: admin._id,
      Aemail: admin.adminemail,
      Afname: admin.Afname,
      Alname: admin.Alname,
      phoneNumber: admin.phoneNumber,
      role: admin.role,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch admin details" });
  }
});

// Endpoint to fetch selected products for a user
app.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, selectedProducts: user.selectedProducts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch selected products" });
  }
});

// Endpoint to edit Admin orders by ID
app.put("/admin/orders/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const updatedOrder = req.body;

    // Ensure required fields are present
    const requiredFields = [
      "customer",
      "productselected",
      "status",
      "from",
      "to",
      "deliveryprice",
      "totalprice",
    ];
    for (const field of requiredFields) {
      if (!updatedOrder[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    const order = await Order.findOneAndUpdate({ orderid }, updatedOrder, {
      new: true,
      runValidators: true, // This will run schema validation
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: `Failed to update order: ${error.message}`,
    });
  }
});

// Endpoint to update the quantity and  Newtotal price of a product
app.put("/cart/update-quantity/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity, totalPrice } = req.body;

    console.log("quantity", quantity, "totalPrice", totalPrice);

    if (isNaN(quantity) || isNaN(totalPrice)) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const productIndex = user.selectedProducts.findIndex(
      (product) => product.productId === productId
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update product quantity and total price in the database
    user.selectedProducts[productIndex].quantity = quantity;
    user.selectedProducts[productIndex].totalPrice = totalPrice;

    await user.save(); // Persist changes to the database

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product quantity" });
  }
});

// Endpoint to change password
app.put("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      UpdatedPassdWord: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      UpdatedPassdWord: false,
      message: "Failed to update password",
    });
  }
});

// Endpoint to Remove Discount from product by ID
app.put("/api/products/:id/remove-discount", async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const product = await Product.findById(objectId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.discount = 0;
    await product.save();

    res.status(200).json({
      message: "Discount removed successfully",
      product: product,
    });
  } catch (error) {
    console.error("Error removing discount:", error);
    res.status(500).json({
      message: "Server error while removing discount",
      error: error.message,
    });
  }
});

// Endpoint to update address by ID
app.put("/update-address/:userId/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddress = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    user.address[addressIndex] = {
      ...user.address[addressIndex],
      ...updatedAddress,
    };
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update address" });
  }
});

// Endpoint to save selected products
app.post("/save-selected-products", async (req, res) => {
  try {
    const {
      userId,
      productName,
      productId,
      selectedColor,
      selectedSize,
      price,
      imageSrc,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let productExists = false;
    user.selectedProducts.forEach((product) => {
      if (
        product.productId === productId &&
        product.selectedColor === selectedColor &&
        product.selectedSize === selectedSize
      ) {
        product.productName = productName;
        product.quantity += 1;
        const priceValue =
          typeof price === "string" ? price.replace(/[^0-9.-]+/g, "") : price;
        product.price = parseFloat(priceValue || 0);
        product.totalPrice = product.quantity * product.price;
        product.imageSrc = imageSrc;
        productExists = true;
      }
    });

    if (!productExists) {
      const priceValue =
        typeof price === "string" ? price.replace(/[^0-9.-]+/g, "") : price;
      user.selectedProducts.push({
        productId,
        productName,
        imageSrc,
        selectedColor,
        selectedSize,
        price: parseFloat(priceValue || 0),
        quantity: 1,
        totalPrice: parseFloat(priceValue || 0),
      });
    }

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Selected product saved successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save selected product" });
  }
});

// Endpoint to save user address
app.post("/save-address", async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      city,
      postalCode,
      country,
      address,
      phone,
      age,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.address.push({
      firstName,
      lastName,
      city,
      postalCode,
      country,
      address,
      phone,
      age,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Address saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to save address" });
  }
});

// Endpoint to save edited user address by ID and address ID
app.put("/edit-address/:userId/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const {
      firstName,
      lastName,
      city,
      postalCode,
      country,
      address,
      phone,
      age,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !city ||
      !postalCode ||
      !country ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    user.address[addressIndex] = {
      ...user.address[addressIndex]._doc,
      firstName,
      lastName,
      city,
      postalCode,
      country,
      address,
      phone,
      age,
    };

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update address" });
  }
});

// Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const lowercaseEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowercaseEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    const user = new User({ email: lowercaseEmail, password, fname, lname });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      isLoggedIn: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      isLoggedIn: false,
    });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        loginStatus: false,
      });
    }

    const lowercaseEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowercaseEmail });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        loginStatus: false,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        loginStatus: false,
      });
    }

    const user = {
      id: existingUser._id,
      email: existingUser.email,
      fname: existingUser.fname,
      lname: existingUser.lname,
    };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, { httpOnly: true, secure: true });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      isLoggedIn: true,
      fname: existingUser.fname,
      lname: existingUser.lname,
      loginStatus: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", isLoggedIn: false });
  }
});

// Admin registration endpoint
app.post("/admin-register", async (req, res) => {
  try {
    const {
      adminemail,
      adminpassword,
      Afname,
      Alname,
      employeeID,
      phoneNumber,
    } = req.body;

    // Check if any required field is missing
    if (
      !adminemail ||
      !adminpassword ||
      !Afname ||
      !Alname ||
      !employeeID ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const lowercaseEmail = adminemail.toLowerCase();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminemail: lowercaseEmail });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    // Create and save new admin
    const admin = new Admin({
      adminemail: lowercaseEmail,
      adminpassword,
      Afname,
      Alname,
      employeeID,
      phoneNumber,
    });
    await admin.save();

    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// Admin Login endpoint
app.post("/admin-login", async (req, res) => {
  try {
    const { adminemail, adminpassword } = req.body;
    if (!adminemail || !adminpassword) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        loginStatus: false,
      });
    }

    const lowercaseEmail = adminemail.toLowerCase();

    const existingAdmin = await Admin.findOne({ adminemail: lowercaseEmail });
    if (!existingAdmin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        loginStatus: false,
      });
    }

    const isMatch = await bcrypt.compare(
      adminpassword,
      existingAdmin.adminpassword
    );
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        loginStatus: false,
      });
    }

    const admin = {
      id: existingAdmin._id,
      adminemail: existingAdmin.adminemail,
      role: "admin",
    }; // Explicit role
    const Atoken = jwt.sign(admin, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", Atoken, { httpOnly: true, secure: true });
    res.status(200).json({
      success: true,
      message: "Login successful",
      Atoken,
      adminemail: existingAdmin.adminemail,
      Afname: existingAdmin.Afname,
      Alname: existingAdmin.Alname,
      loginStatus: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", loginStatus: false });
  }
});

// admin logout endpoint
app.post("/admin-logout", async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
});

// logout endpoint
app.post("/logout", async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
});

// Endpoint to delete a product by ID
app.delete("/admin/orders/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    // Convert the orderid to number since it's stored as Number in the schema
    const numericOrderId = parseInt(orderid, 10);

    if (isNaN(numericOrderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID format" });
    }

    const order = await Order.findOneAndDelete({ orderid: numericOrderId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
});

// Endpoint to Delete address by ID
app.delete("/delete-address/:userId/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.address = user.address.filter(
      (addr) => addr._id.toString() !== addressId
    );
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete address" });
  }
});

//Endpoint to Delete product from Cart
app.delete("/cart/delete-product/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const productIndex = user.selectedProducts.findIndex(
      (product) => product.productId === productId
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    // Remove the product from the user's selectedProducts array
    user.selectedProducts.splice(productIndex, 1);

    // Save the updated user document to the database
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product deleted from cart successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product from cart" });
  }
});

// Endpoint to delete a all products in cart by userId
app.delete("/cart/clear/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Clear the selectedProducts array
    user.selectedProducts = [];

    await user.save();
    res.status(200).json({
      success: true,
      message: "All products cleared from cart successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to clear cart products" });
  }
});

// Endpoint to delete Account by userID
app.delete("/deleteAccount/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete user account" });
  }
});

// Endpoint to delete a comment
app.delete("/api/products/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Convert commentId to number since it's stored as number in schema
    const commentIdNum = parseInt(commentId);

    // Find the comment index
    const commentIndex = product.comments.findIndex(
      (comment) => comment.id === commentIdNum
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment
    product.comments.splice(commentIndex, 1);
    await product.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
