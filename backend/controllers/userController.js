import asyncHandler from "express-async-handler";
import { generateToken, generatePassword } from "../utils/generateToken.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.status !== "active") {
      throw new Error(
        "Veuillez verifier votre email pour valider votre compte!"
      );
    }
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,

      email: user.email,
      phone: user.phone,
      address: user.address,
      points: user.points,
      role: user.role,
      status: user.status,

      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("email ou mot de passe invalide");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastName, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(
      "Adresse mail deja existante, veuillez verifier votre boite email pour le lien de confirmation"
    );
  }

  const code = generateToken(email + password + "user");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmailAccount,
      pass: process.env.gmailPass,
    },
  });
  const mailOptions = {
    from: "noreply@sequoia.ma",
    to: email,
    subject: "verification de votre compte",
    html: `<h1>Confirmation Email</h1>
      <h2>Hello ${name}</h2>
      <p> Merci pour votre enregistrement. veuillez confirmer votre email en cliquant sur ce lien</p>
      <a href=http://localhost:3000/validation/${code}>http://localhost:3000/validation/${code}</a>
      </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error("error when sending verfication email :" + error);
    } else {
      const user = User.create({
        name,
        lastName,
        email,
        password,
        phone,
        confirmationCode: code,
        role: "user",
      });
      if (user) {
        res.send({
          message:
            "enregistrement avec succes, clickez sur le lien dans votre boite mail pour finir votre inscription",
        });
        console.log("Email sent: " + info.response);
      }
    }
  });
});

// @desc    confirm a new user
// @route   GET /api/users/confirm
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  if (userExists) {
    userExists.status = "active";
    const user = await userExists.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,

      email: user.email,
      phone: user.phone,
      address: user.address,
      points: user.points,
      role: user.role,
      status: user.status,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("veuillez vous enregistrer d'abord");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,

      email: user.email,
      phone: user.phone,
      address: user.address,

      points: user.points,
      role: user.role,
      status: user.status,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const modifyPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  console.log(email);

  if (user) {
    var newPass = generatePassword();
    user.password = newPass;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.gmailAccount,
        pass: process.env.gmailPass,
      },
    });
    const mailOptions = {
      from: "noreply@sequoia.ma",
      to: email,
      subject: "mot de passe oublié",
      html: `<h1>Votre nouveau mot de passe</h1>
        <h2>${newPass}</h2>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error("error when sending new pass email :" + error);
      } else {
        if (user.status !== "active") {
          user.status = "active";
        }
        const updatedUser = user.save();
        res.send({
          message:
            "vous trouverez votre nouveau mot de passe dans votre boite email",
        });
      }
    });
  } else {
    res.status(401);
    throw new Error("email invalide, veuillez vous enregistrer d'abord");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("updating user profile...");
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;

    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,

      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: user.role,
      status: user.status,

      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;

    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.points = req.body.points || user.points;
    user.role = req.body.role || user.role;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,

      email: updatedUser.email,
      phone: updatedUser.phone,
      points: updatedUser.points,
      address: updatedUser.address,

      role: updatedUser.role,
      status: updatedUser.status,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyUser,
  modifyPassword,
};
