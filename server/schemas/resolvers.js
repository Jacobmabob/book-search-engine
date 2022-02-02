const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (parent, { id }) => {
      return User.findOne({ _id: id }).populate('savedBooks');
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const newUser= await User.create({username, email, password });
      const token = signToken(newUser)
      
      return { token, newUser };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No profile with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, {user, bookId }, context ) => {
        if (context.user) {
          try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $addToSet: { savedBooks: bookId } },
              { new: true, runValidators: true }
            );
            return updatedUser
          } catch (err) {
            console.log(err);
            return res.status(400).json(err);
          }
        }
      },
      removeBook: async (parent, { user, bookId }, context) => {
        const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
              );
              if (!updatedUser) {
                return res.status(404).json({ message: "Couldn't find user with this id!" });
              }
              return updatedUser;
      }
  },
}

module.exports = resolvers;