import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response (NO cookies, only JSON)
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return token in JSON response (no cookies!)
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const logout = async (req, res) => {
  try {
    
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
   
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
