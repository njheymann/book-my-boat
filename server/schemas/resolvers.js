const { User, Bookings } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("bookings");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
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
          user: context.user,
        });
        console.log(booking);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { bookings: booking } },
          { new: true }
        );

        return booking;
      }
    },
  },
};

module.exports = resolvers;
