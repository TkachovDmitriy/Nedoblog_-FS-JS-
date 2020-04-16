import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCommentSharpIcon from '@material-ui/icons/AddCommentSharp';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import './PostCard.css'
import Comments from '../Comments/Comments';
import { connect } from 'react-redux';
import { getComments, deletePost } from '../../actions/itemsAction';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 700,
    margin: '25px auto',
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: '0 25px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const mapDispatchToProps = dispatch => ({
  // dispatching plain actions
  getComments: () => dispatch( getComments() ),
  deletePost: (postId) => dispatch( deletePost(postId) )

})

const mapStayToProps = state => ({
  comments: state.item.comments
})

export default connect(mapStayToProps, mapDispatchToProps) (function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedComment, setExpandedComment] = React.useState(false);
  const [like, setLike] = React.useState({});
  
  const handleChange = name => event => {
    setLike({ ...like, [name]: event.target.checked });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const hendleExpandCpmment = () => {
    setExpandedComment(!expandedComment);
    
  };
  const clickHendlerDeletePost = () => {
    props.deletePost(props.post._id)
    
  }
  useEffect ( () => {
    props.getComments()
  }, [])

  const {post} = props
  // console.log('Comments', props.comments)

    var date = new Date(post.date*1);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    // var seconds = "0" + date.getSeconds();
    const dateDMY =   date.getDate()+ '-' +(date.getMonth() + 1) + '-' + date.getFullYear();
    var formattedTime = hours + ':' + minutes.substr(-2) +  '   ' + dateDMY;

    
    
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {/* {post.author.name} */}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={post.author.name}
            subheader={formattedTime}
            action= {
              <IconButton onClick={clickHendlerDeletePost} aria-label="delete" className={classes.margin}>
                <DeleteIcon />
              </IconButton>
            }
          />
          {/* <CardMedia
            className={classes.media}
            image={post.imgURL}
            title="Paella dish"
          /> */}
          <div>
            <img style={{width: '100%'}} src={post.imgURL}/>
          </div>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
               {post.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            
              <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}
              />
           
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton  onClick={hendleExpandCpmment} 
            className={clsx(classes, {
              [classes.expandOpen]: expandedComment,
            })}
            aria-label="share">
              <AddCommentSharpIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {post.description}
            </CardContent>
          </Collapse>

          <Collapse in={expandedComment} timeout="auto" unmountOnExit>
            <h4 style={{padding:'0 10px'}}>Comments: </h4>
            <CardContent>
              <Comments key={post._id} props={props.comments} post={post}/>
            </CardContent>

          </Collapse>
        </Card>
      );
})