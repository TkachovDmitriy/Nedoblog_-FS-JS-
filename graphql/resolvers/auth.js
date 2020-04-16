const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../../models/user')

module.exports = {
      
    createUser: async (argm) => {
      try {
        const existingUser = await User.findOne({
          email: argm.userInput.email
        })

        if (existingUser) {
          throw new Error('User exist already')
        } 
          let hashPass = await bcrypt.hash(argm.userInput.password, 12)
          const user = new User({
            email: argm.userInput.email,
            name: argm.userInput.name,
            password: hashPass
          })
          const saveUser = await user.save()

            return {
                ...saveUser._doc,
                password: null,
                _id: saveUser._id
              }
            
      } catch (e) {
        if (e.__proto__ === Error.prototype) {
          console.log(Error.prototype)
          throw e
        } else console.log(e)
      }
    },
    login: async ( {email, password} ) => {
      // console.log(context)
      const user = await User.findOne({email: email})
      if (!user) {
        throw new Error('User does not exist')
      }
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) {
        throw new Error('Password is incorrect')
      }
      const token = jwt.sign({
        userId: user._id, email: user.email
      },
      'SomeSuperSecretKey',
      {
        expiresIn: '10h'
      }
      )
      return  { userId: user.id, token: token, tokenExpiration: 10 }
    }
    
  }