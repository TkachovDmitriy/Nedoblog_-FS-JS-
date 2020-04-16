import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    margin: 15,
  },
}));

export default function PaperSheet(comment) {
  const classes = useStyles();
    // console.log('propppppps', comment)
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {comment.comment.author.name}
      </Typography>
      <Typography component="p">
        {comment.comment.description}
      </Typography>
    </Paper>
  );
}