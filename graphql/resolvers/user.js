const User = require('../../models/user')

module.exports = {

    user: async (argm, req) => {
        // console.log(req.isAuth)
        // console.log(req.userId)

        try {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
          }
        
          const user = await User.findOne({
            _id: req.userId
          });

          return await user
        } catch (err) {
          throw err;
        }
      },

}