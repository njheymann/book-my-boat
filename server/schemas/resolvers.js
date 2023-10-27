const { User, Bookings } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("bookings");

        return userData;
      }
      throw AuthenticationError;
    },
    booking: async (parent, { bookingId }, context) => {
      return Bookings.findOne({ _id: bookingId });
    },

    locations: async (parent, args, context) => {
      const url = `https://api.willyweather.com.au/v2/${API_KEY}/search.json?query=${args.postcode}`;
      const response = await axios.get(url);
      return response.data;
    },
    tides: async (parent, args, context) => {
      const url = `https://api.willyweather.com.au/v2/${API_KEY}/locations/${args.idlocation}/weather.json?forecasts=tides&startDate=${args.date}`;
      const response = await axios.get(url);
      return response.data;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addBooking: async (parent, args, context) => {
      if (context.user) {
        const booking = await Bookings.create({
          ...args,
          userId: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { bookings: booking._id } },
          { new: true }
        );

        return booking;
      }
    },
    addLocation: async (parent, args, context) => {
      if (context.user) {
        const location = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { idlocation: args.idlocation } },
          { new: true }
        );
        return location;
      }
      throw AuthenticationError;
    },
    removeBooking: async (parent, { bookingId }, context) => {
      if (context.user) {
        const booking = await Bookings.findOneAndDelete({
          _id: bookingId,
          userId: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { bookings: bookingId } }
        );
        return booking;
      }
      throw AuthenticationError;
    },
    updateBooking: async (parent, { bookingId, ...args }, context) => {
      const booking = await Bookings.findOneAndUpdate(
        { _id: bookingId },
        { $set: args },
        { new: true }
      );
      return booking;
    },
  },
};

module.exports = resolvers;
