const User = require('../../models/user')
const Comment = require('../../models/comment')
const Post = require('../../models/post')

const { singlePost, user } = require('./merj')


module.exports = {
    comments: async (args, req) => {
    //   console.log('req', req)
      try {
        // console.log('use contex'context)
        if (!req.isAuth) {
          throw new Error('Unauthenticated')
        }
        const comments = await Comment.find().populate('post').populate('author');
        // console.log('comment > ', comments)
        return await comments.map(comment => {
            // console.log('ONE comment>>>', comment)
          return {
            ...comment._doc,
              _id: comment.id,
            //   author: user.bind(this, comment.author),
            //   post: singlePost.bind(this. comment.post)
            //   postId: singlePost.bind(this, comment._doc.postId)
          }
        })

      } catch (e) {
        if (e.__proto__ === Error.prototype) {
          // console.log(Error.prototype)
          throw e
        } else console.log(e)  
      }
    },
    createComment: async (args, req) => {
        // console.log(args)
      try {
        if (!req.isAuth) {
          throw new Error('Unauthenticated')
        }
        const fetchedPost = await Post.findOne({ _id: args.commentInput.postId });
        // console.log('POST ID', fetchedPost)
        const createComment = await new Comment({
          description: args.commentInput.description,
          date: Date(Date.now().toLocaleString()),
          author: req.userId,
          postId: fetchedPost
        })
        // console.log('CREATED COMMENT', createComment)
        const author = await User.findOne({
          _id: req.userId
        })

        if (!author) {
          throw new Error('User not found')
        } else {
          const saveComment = await createComment.save()

          await author.createdComments.push(createComment)
          await fetchedPost.comments.push(createComment)
          await author.save()
          await fetchedPost.save()



          return {...saveComment._doc }  
        }
      } catch (e) {
        if (e.__proto__ === Error.prototype) {
          // console.log(Error.prototype)
          throw e
        } else console.log(e)
      }
    },
    deleteComment: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        
        await Comment.deleteOne({ _id: args.commentId })
        const comments = await Comment.find().populate('author');
        
        // console.log('POSTS > ',posts)
        return await comments.map(comments => {
          return {
            ...comments._doc,
            _id: comments.id,
            // author: user.bind(this, post.author)
          }
        })
      } catch (e) {
        throw new e
      }
    }
  }