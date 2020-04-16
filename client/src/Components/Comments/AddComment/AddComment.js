import  React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addComment, getComments, getPosts } from '../../../actions/itemsAction';
import '../Comments.css'

const mapDispatchToProps = dispatch => ({
      // dispatching plain actions
      addComment: (postId, description) => dispatch( addComment(postId, description) ),
      getComments: () => dispatch( getComments() ),
      getPosts: () => dispatch( getPosts() )

  })

export default connect(null, mapDispatchToProps) (class AddComment extends Component {


    state = {        
        postId: this.props.postId,
        description: null
    }

    clickHendlerCommentData = () => {
        const { postId, description } = this.state
        this.props.addComment(postId, description)
        this.props.getComments()

    }

    render () {
        return (

            <form >
                
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
                    <Button onClick={this.clickHendlerCommentData} className='buttonPadding' variant="contained" color="primary" >
                        Add Comment
                    </Button>
            </form>

        )
    }
})