import React, { useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getPosts } from "../actions/itemsAction";
import PostCard from '../Components/PostCard/PostCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import './New.css'

import AddPost from './AddPost';





const mapStateToProps = state => ({
    posts: state.item.posts,
    isAuthenticated: state.auth.isAuth
  });


const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      minWidth: '600px',
      justifyContent: 'center',
      boxShadow: theme.shadows[5],
      padding: '20px',
      outline: 'none'
    },
  }));

export default connect(mapStateToProps, { getPosts }) (function News (props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        
        useEffect( () => {
            props.getPosts()
        }, [])
        const handleClose = () => {
            setOpen(false);
        };

        const {posts} = props
        const userPostList = posts.map( post => {
            
            // console.log('post', post)

            const userId = localStorage.getItem('userId')
            if (userId == post.author._id) {
                return (
                    <PostCard key= {post._id} post={post}/>
                )
            } else{
                return null
            }
            
        })
        const style =  {
            'maxWidth': '900px',
            margin: '0 auto', 
            'flexWrap':'wrap'
        }
        return (
            <>
                <div style={style}>
                    {userPostList}
                    <Fab onClick={handleOpen} color="primary" aria-label="add" className='add__button'>
                        <AddIcon />
                    </Fab>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className={classes.paper}>
                            <AddPost/>
                        </div>
                        </Fade>
                    </Modal>
                </div>
                
            </>
        )
    }
      
)


