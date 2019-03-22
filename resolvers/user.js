const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const resolvers = {
  
  Query: {
    me: (root, args, context) => context.user,
  },

  Mutation: {
    signup: async (root, args, context) => {
      return null;
    },
    signin: async (root, args, context) => {
      return null;
    },
  },
};

module.exports = resolvers;
