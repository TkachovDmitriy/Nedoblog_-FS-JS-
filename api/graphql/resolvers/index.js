const  authResolver = require ('./auth')
const  eventsResolver = require ('./posts')
const  comentsResolver = require ('./coments')
const   userResolver = require ('./user')


const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...comentsResolver,
  ...userResolver
};

module.exports = rootResolver;