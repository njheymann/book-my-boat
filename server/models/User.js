const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const bookingSchema = require("./Bookings");

// import schema from Book.js
//const bookSchema = require("./Book");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    bookings: [bookingSchema.schema],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual("bookCount").get(function () {
//   return this.savedBooks.length;
// });

const User = model("User", userSchema);

module.exports = User;
