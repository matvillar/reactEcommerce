import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // validation
    },
    email: {
      type: String,
      required: true,
      unique: true, // validation
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true, // automatically create createdAt and updatedAt fields
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // this.password is the password in the database
};

userSchema.pre('save', async function (next) {
  // this is the user we are trying to save
  if (!this.isModified('password')) {
    // if password is not modified, move on to the next middleware
    next();
  }
  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash the password
}); // using .pre will check data saved in the database before saving it

const User = mongoose.model('User', userSchema);

export default User;
