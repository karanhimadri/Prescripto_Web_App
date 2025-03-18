import validator from "validator";
import bycrpt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"

// API endpoint for adding doctor
const addDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  } = req.body;
  const imageFile = req.file;
  const normalizedEmail = email.toLowerCase();

  if (
    !name ||
    !normalizedEmail ||
    !password ||
    !speciality ||
    !degree ||
    !experience ||
    !about ||
    !fees ||
    !address
  ) {
    return res.status(400).json({ success: false, message: "MIssing Details" });
  }

  // Check Email format
  if (!validator.isEmail(normalizedEmail)) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ success: false, message: "Please choose a strong password" });
  }

  try {
    // hashing password
    const salt = await bycrpt.genSalt(10);
    const hashedPass = await bycrpt.hash(password, salt);

    // upload image at cloudinary and got a URL
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;

    const doctorData = {
      name,
      email: normalizedEmail,
      image: imageURL,
      password: hashedPass,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.status(201).json({ success: true, message: "Account created." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
};

// API For admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "MIssing Details" });
  }

  const normalizedEmail = email.toLowerCase()
  try {
    if (normalizedEmail === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      return res.status(201).json({ success: true, message: "Logged in", token: token });
    } else {
      return res.status(401).json({ success: false, message: "Invaild Credentials.",});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
}

export { addDoctor, loginAdmin };
