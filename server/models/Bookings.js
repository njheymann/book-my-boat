const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: "User" },
  name: {
    type: String,
  },
  name: {
    type: String,
  },
  clientemail: {
    type: String,

    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  phone: {
    type: String,
  },
  mooring: {
    type: String,
  },
  boatname: {
    type: String,
  },
  typeboat: {
    type: String,
  },
  length: {
    type: String,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  },
  wishlist: {
    type: String,
  },
});

const Bookings = model("Booking", bookingSchema);

module.exports = Bookings;
