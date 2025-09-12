import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import captianModel from "../models/captian.model.js";
import { publishRideAccepted } from '../rabbitmq/captain.publish.js';

export const register = async (req, res) => {
  try {
    const { name, email, password,Contact } = req.body;

    // Check if user already exists
    const existingCaptian = await captianModel.findOne({ email });
    if (existingCaptian) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    if(Contact.length < 10){
      return res.status(402).json({message:"Contact Should be 10 Number Digit"})
    }

    // Create new user
    const newCaptian = new captianModel({
      name,
      email,
      password: hashPassword,
      Contact
    });
    await newCaptian.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newCaptian._id, email: newCaptian.email, name: newCaptian.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response (NO cookies, only JSON)
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newCaptian._id,
        name: newCaptian.name,
        email: newCaptian.email,
        Contact:newCaptian.Contact
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
    const captian = await captianModel.findOne({ email });
    if (!captian) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, captian.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: captian._id, email: captian.email },
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
   
    const captian = await captianModel.findById(req.captian.id).select("-password");
    if (!captian) return res.status(404).json({ message: "User not found" });

    res.json(captian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateAvailability = async (req, res) => {
  try {
    const captian = await captianModel.findById(req.params.id);
    if (!captian) return res.status(404).json({ message: "Captain not found" });

  captian.isAvailable = !captian.isAvailable;
    // Save changes
    await captian.save();

    res.json({
      message: "Captain availability updated",
      isAvailable: captian.isAvailable
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const acceptRide = async (req, res) => {
  try {
    const { rideId } = req.body;
    const captainId = req.params.id;
    const captain = await captianModel.findById(captainId);
    const captainName = captain.name;
    const captainContact = captain.Contact;

    await publishRideAccepted(rideId, captainId,captainName,captainContact);

    res.status(200).json({ message: 'Ride accepted and event published' });
  } catch (error) {
    console.error("Error accepting ride:", error);
    res.status(500).json({ error: 'Failed to accept ride' });
  }
};
