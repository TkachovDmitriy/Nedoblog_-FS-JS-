import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addPost, getPosts } from '../actions/itemsAction';





export default connect(null, { addPost, getPosts }) (class AddPost extends Component {
    
    textInput = React.createRef();

    state = {
        title: null,
        description: null,
        imgURL:null,
        open: true
    }
    clickHendlerClose = () => {
        this.props.open(false)
    }

    clickHendlerPostData = () => {
        const { title, imgURL, description } = this.state
        // console.log(imgURL)
        this.props.addPost(title, imgURL, description)
        this.props.getPosts()
        // this.clickHendlerClose()
    }
   

    render () {
        // console.log()
        return (

            <form className='main__div_addPost'>
                <TextField
                    requir='true'
                    id="outlined-basic"
                    className='textFiled'
                    type='text'
                    label="Title"
                    margin="dense"
                    variant="outlined"
                    onChange={e => { this.setState({ title: e.target.value }) }}
                />
                 <TextField
                    requir='true'
                    id="outlined-basic"
                    className='textFiled'
                    type='text'
                    label="Img URL"
                    margin="dense"
                    variant="outlined"
                    onChange={e => { this.setState({ imgURL: e.target.value }) }}
                />
                <TextField
                    requir='true'
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Description"
                    multiline
                    className='textFiled'
                    type='text'
                    label="Description"
                    margin="dense"
                    variant="outlined"
                    // ref={this.emailEl}
                    onChange={e => { this.setState({ description: e.target.value }) }}
                />
                    <Button onClick={this.clickHendlerPostData} className='buttonPadding' variant="contained" color="primary" >
                        Add Post
                    </Button>
            </form>
            

        )
    }
})