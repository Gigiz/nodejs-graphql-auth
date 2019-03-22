const express = require('express');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const {
  ApolloServer,
} = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { Strategy, ExtractJwt } = passportJwt;

const { JWT_SECRET, SERVER_PORT } = process.env;

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, (payload, done) => done(null, payload));
passport.use(strategy);

const app = express();
passport.initialize();

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
});

const context = ({ req }) => {
  const user = req.user || null;
  return { user };
};

const server = new ApolloServer({ typeDefs, resolvers, context});
server.applyMiddleware({ app });

app.listen(SERVER_PORT);
