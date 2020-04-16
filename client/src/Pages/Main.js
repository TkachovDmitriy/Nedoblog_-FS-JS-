import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import PostCard from '../Components/PostCard/PostCard';
import { getPosts } from '../actions/itemsAction';


const mapStateToProps = state => ({
    posts: state.item.posts,
    isAuthenticated: state.auth.isAuth
  });

export default connect(mapStateToProps,{ getPosts }) (class Auth extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    render () {
        
        const {posts} = this.props
        const PostList = posts.map( post => {
            console.log('post', post)
            return (
                <PostCard key= {post._id} post={post}/>
                
            )
       })
        return (
            <div>
                {PostList}
            </div>
            // {allPostList}
        )
    }
})
