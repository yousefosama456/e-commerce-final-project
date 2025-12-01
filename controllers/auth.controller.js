const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const catchAsyncUtils = require("../utilities/catch-async.utils");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN}
  );
};

exports.login = catchAsyncUtils(async (req, res) => {
  const { email, password } = req.body;
  const myuser = await User.findOne({ email });
  if(myuser.isBlocked){
    return res.status(404).json({ message: "you are blocked,contact Admin" });

  }
  if (!myuser) {
    return res.status(404).json({ message: "error,invalid email or password" });
  }
  const correctPassword = await myuser.correctPassword(password);
  if (!correctPassword) {
    return res.status(401).json({ message: "error,invalid email or password" });
  }
  const token=signToken(myuser);
  res.status(200).json({ message: "you are logged in" ,data:token});
  
});

exports.signup = catchAsyncUtils(async (req, res) => {
  const { email, password, name, phone, addresses } = req.body; 

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = await User.create({
    email,
    password,
    name,
    phone,
    addresses
  });

  res.status(201).json({
    message: "User created successfully",
    data: newUser
  });
});


exports.createAdmin = catchAsyncUtils(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newAdmin = await User.create({
    name,
    email,
    password,
    phone,
    role: "admin", 
  });

  res.status(201).json({ message: "Admin created successfully", data: newAdmin });
});
