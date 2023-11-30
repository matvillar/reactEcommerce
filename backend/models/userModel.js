import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

export default User;
