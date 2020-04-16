// var jwt = require('jsonwebtoken');

const Post = require('../../models/post')
const User = require('../../models/user')
const { user } = require('./merj')
// const { posts } = require('./merj')
// const { transformPost }  = require ('./merj')


module.exports = {
  posts: async (args, req, contex) => {
    try {
      // console.log('use contex', req)
      if (!req.isAuth) {
        throw new Error('Unauthenticated')
      }
      const posts = await Post.find().populate('author').populate('comments');
      // console.log('POSTS > ',posts)
      return await posts.map(post => {
        return {
          ...post._doc,
          _id: post.id,
          // author: user.bind(this, post.author)
        }
      })

    } catch (e) {
      if (e.__proto__ === Error.prototype) {
        // console.log(Error.prototype)
        throw e
      } else console.log(e)
    }
  },
  createPost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated')
      }
      const date = new Date().toISOString()
      const createPost = await new Post({
        title: args.postInput.title,
        description: args.postInput.description,
        imgURL:args.postInput.imgURL,
        date: date,
        author: req.userId
      })

      const author = await User.findOne({
        _id: req.userId
      })

      if (!author) {
        throw new Error('User not found')
      } else {
        const savePost = await createPost.save()

        await author.createdPosts.push(createPost)
        await author.save()

        return { ...savePost._doc }
      }
    } catch (e) {
      if (e.__proto__ === Error.prototype) {
        // console.log(Error.prototype)
        throw e
      } else console.log(e)
    }
  },
  deletePost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const author = await User.findOne({
        _id: req.userId
      })
      if (!author) {
        throw new Error('User not changed this post')
      }

      await Post.deleteOne({ _id: args.postId })
      const posts = await Post.find().populate('author');
      
      // console.log('POSTS > ',posts)
      return await posts.map(post => {
        return {
          ...post._doc,
          _id: post.id,
          // author: user.bind(this, post.author)
        }
      })
    } catch (e) {
      throw new e
    }
  },
  changedPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const author = await User.findOne({
        _id: req.userId
      })
      const authorPost = author.createdPosts
      let bool = post => post == args.postId
      let findPost = await authorPost.some(bool)
      // console.log(findPost)
      console.log(findPost === false)

      if (findPost === false) {
        throw new Error('User not changed this post')
      }
        const updatePost = await Post.findOneAndUpdate(
          { _id: args.postId },
          { $set: { 
            title: args.postInput.title,
            description: args.postInput.description,
            date: Date(Date.now().toLocaleString()) 
          }},
          {useFindAndModify: false}
          )
          // const savePost= await updatePost.save()
          
          return {
            ...updatePost._doc
          }
      // }
      
    } catch (e) {
      if (e.__proto__ === Error.prototype) {
        // console.log(Error.prototype)
        throw e
      } else console.log(e)
    }
  }
}