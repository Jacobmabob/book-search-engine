const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id }).populate('savedBooks');
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
      saveBook: async (parent, { bookToSave }, context ) => {
        if (context.user) {
            return User.findOneAndUpdate(
              { _id: user._id },
              { $addToSet: { savedBooks: bookToSave } },
              { new: true, runValidators: true }
            );
          }
        },
        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
            )
          }
          
          throw new AuthenticationError('You need to be logged in!');
        },
  },
}

module.exports = resolvers;