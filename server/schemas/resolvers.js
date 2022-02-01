const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    user: async () => {
      return User.find({}).populate('savedBooks');
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
  },
}

module.exports = resolvers;