
const Post = require('../../models/post')
const User = require('../../models/user')


// merge func
const comments = async commentsID => {
  const comments = await Comment.find({_id: { $in: commentsID } })
  return comments.map(comment => {
    return {
      ...comment._doc,
          _id: comment.id,
          author: user.bind(this, comment.author)
    }
  })
}

const posts = async postID => {
    try {
      const posts = await Post.find({ _id: { $in: postID } });
      return posts.map(post => {        
        return {
          ...post._doc,
          _id: post.id,
          author: user.bind(this, post.author)
        }
      })
    } catch (e) {
      if (e.__proto__ === Error.prototype) {
        // console.log(Error.prototype)
        throw e
      } else console.log(e)  
    }
  }
  
  const singlePost = async postID => {
    try {
      const post = await Post.findById(postID);
      return {
            ...post._doc,
              _id: post.id,
              author: user.bind(this, post.author),
              comments: comments.bind(this, post.comments)
          }
    } catch (err) {
      throw err;
    }
  };

  const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        createdPosts: posts.bind(this, user._doc.createdPosts),
        createdComments: comments.bind(this, user._doc.createdComments)
      };
    } catch (err) {
      throw err;
    }
  };
  // //////////

  // TRANFORM RETURN 

  // let tranformPost = post => {
  //   return {
  //     ...post._doc,
  //       _id: post.id,
  //       author: user.bind(this, post.author)
  //   }
  // }

  // exports.tranformPost = tranformPost
  exports.user = user;
exports.singlePost = singlePost;