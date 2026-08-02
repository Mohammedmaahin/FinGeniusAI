import { registerUser, loginUser } from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

export const register = async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await loginUser(data.email, data.password);

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
};