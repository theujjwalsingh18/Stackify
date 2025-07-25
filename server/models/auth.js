import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedon: { type: Date, default: Date.now },
  resetOtp: String,
  resetOtpExpiry: Date,
  lastResetDate: { type: String },
  resetAttempted: { type: Boolean, default: false },
  videoOtp: String,
  videoOtpExpiry: Date,
  lastVideoOtpSent: Date,
  loginHistory: [{
    timestamp: { type: Date, default: Date.now },
    browser: String,
    os: String,
    deviceType: String,
    ip: String,
    location: String
  }],
  loginOtp: String,
  loginOtpExpiry: Date
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
export default User;