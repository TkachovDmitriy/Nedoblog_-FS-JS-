import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
import { login } from '../actions/authActions'
import { connect } from 'react-redux'

import Registration from '../Components/Auth/registr'
import './Auth.css'
import  CustomizedSnackbars from '../Components/SnackBar/SnackBar';


const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    errorAuth: state.auth.errorAuth
  });

export default connect(mapStateToProps ,{login})(class Auth extends Component {
    // // const classes = useStyles();
    // emailEl = React.createRef()
    // passwordEl = React.createRef()


    state = {
        email: null,
        password: null,
        referrer: false,
        singIn: true,
        errorAuth: this.props.errorAuth
    }
    
    clickHendlerRegForm = (e) => {
        e.preventDefault()
        this.setState({singIn:false})
    }
    
    clickHendler =  () => {
        const { email, password } = this.state
        this.setState({referrer: true})
        this.props.login(email, password)
        // this.setState({errorAuth:true})
        // setTimeout(() => {
        //     this.setState({errorAuth:false})
        // }, 2000)
    } 

    render() {

        const { singIn} = this.state;
        if (this.props.isAuth) {
            console.log('sdfds')
            return (<Redirect  to={'/'} />)
        } 
        if (!singIn) {
            return <Registration/>
        } 

        if (this.props.errorAuth) {
            return (
                <Container maxWidth="sm">
                    <form className='main__div'>
                        <TextField
                            requir='true'
                            id="outlined-basic"
                            className='textFiled'
                            type='email'
                            label="Email"
                            margin="dense"
                            variant="outlined"
                            ref={this.emailEl}
                            onChange={ e => { this.setState({email: e.target.value})}}
                        />
                        <TextField
                            required
                            id="outlined-basic-pass"
                            type='password'
                            className='textFiled'
                            label="Password"
                            variant="outlined"
                            ref={this.passwordEl}
                            onChange={ e => { this.setState({password: e.target.value})}}
                        />
                       
                       <Button onClick={this.clickHendler} className='buttonPadding' variant="contained" color="primary" >
                            Sign In
                        </Button>
                        {/* <a  className='buttonPadding' variant="contained" color="primary" >
                            Sing Up
                        </a> */}
                        <button 
                        type="button"
                        onClick={this.clickHendlerRegForm}
                        className="link-button" 
                        >
                            Sign Up
                        </button>
                       
                    </form>
                    <CustomizedSnackbars
                        variant="error"
                        className='snackBar'
                        message="Your 'Email' or 'Password' is incorrect!"
                    />
                </Container>
            )
        } 
           return (
                <Container maxWidth="sm">
                    <form className='main__div'>
                        <TextField
                            requir='true'
                            id="outlined-basic"
                            className='textFiled'
                            type='email'
                            label="Email"
                            margin="dense"
                            variant="outlined"
                            ref={this.emailEl}
                            onChange={ e => { this.setState({email: e.target.value})}}
                        />
                        <TextField
                            required
                            id="outlined-basic-pass"
                            type='password'
                            className='textFiled'
                            label="Password"
                            variant="outlined"
                            ref={this.passwordEl}
                            onChange={ e => { this.setState({password: e.target.value})}}
                        />
                       
                       <Button onClick={this.clickHendler} className='buttonPadding' variant="contained" color="primary" >
                            Sign In
                        </Button>
                        {/* <a  className='buttonPadding' variant="contained" color="primary" >
                            Sing Up
                        </a> */}
                        <button 
                        type="button"
                        onClick={this.clickHendlerRegForm}
                        className="link-button" 
                        >
                            Sign Up
                        </button>
                       
                    </form>
                    
                </Container>
            )        
    }
})