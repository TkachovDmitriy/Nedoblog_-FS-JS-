import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../actions/itemsAction';
import Paper  from './Paper/Paper';

import AddComment from './AddComment/AddComment'



const mapStayToProps = state => ({
    comments: state.comments
})


export default connect(mapStayToProps, {getComments}) (function Comments (props) {

    useEffect( () => {
        getComments()
        }, [])
    // console.log('Comments prop', props.props)
    const  comments  = props.props
    // console.log('KEY', props.post)
    const postId = props.post._id
    const postComents = comments.map( comment => { 
        // console.log()
        console.log('Post ID', comment.postId._id)
        if ( postId === comment.postId._id ) {
            return(
                <Paper key={comment._id} comment={comment}/>
            )
        } else {
            return null
        }
        
    }) 
    // console.log('ComentP', postComents)
    return (
        <>
            {postComents}
            <AddComment postId={postId}/>
            
        </>
            
    ) 
})