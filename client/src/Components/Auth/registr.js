import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/core/styles';
// import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';


import  './registr.css';
import Auth from '../../Pages/Auth';
import { connect } from 'react-redux';
import { singUp } from '../../actions/authActions';
import  CustomizedSnackbars from '../../Components/SnackBar/SnackBar';


const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    errorRegistr: state.auth.errorRegistr
  });

export default connect(mapStateToProps, {singUp}) (class Registration extends Component {

    state = {
        email: null,
        name: null, 
        password: null,
        referrer: false,
        singIn: false,
        errorAuth:this.props.errorAuth
    }

    clickHendlerLoginForm = (e) => {
        e.preventDefault()
        this.setState({singIn:true})
    }

    clickHendlerGetData = () => {
        const { email, name, password } = this.state
        this.props.singUp(email, name, password)
        // this.setState({errorAuth:true})
        // setTimeout(() => {
        //     this.setState({errorAuth:false})
        // }, 2000)
    }

    render() {
        const {singIn} = this.state
        if (singIn) {
            return <Auth/>
        }
        if (this.props.errorRegistr) {
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
                            onChange={e => { this.setState({ email: e.target.value }) }}
                        />
                        <TextField
                            requir='true'
                            id="outlined-basic_Fname"
                            className='textFiled'
                            type='text'
                            label="Name"
                            margin="dense"
                            variant="outlined"
                            // ref={this.emailEl}
                            onChange={e => { this.setState({ name: e.target.value }) }}
                        />
                        <TextField
                            required
                            id="outlined-basic-pass"
                            type='password'
                            className='textFiled'
                            label="Password"
                            variant="outlined"
                            ref={this.passwordEl}
                            onChange={e => { this.setState({ password: e.target.value }) }}
                        />
                            <Button onClick={this.clickHendlerGetData} className='buttonPadding' variant="contained" color="primary" >
                                Sign Up
                            </Button>
                            <button 
                            type="button"
                            onClick={this.clickHendlerLoginForm}
                            className="link-button" 
                            >
                                Sign In
                            </button>
                    </form>
                    <CustomizedSnackbars
                        variant="error"
                        className='snackBar'
                        message="User has been declarate"
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
                        onChange={e => { this.setState({ email: e.target.value }) }}
                    />
                    <TextField
                        requir='true'
                        id="outlined-basic_Fname"
                        className='textFiled'
                        type='text'
                        label="Name"
                        margin="dense"
                        variant="outlined"
                        // ref={this.emailEl}
                        onChange={e => { this.setState({ name: e.target.value }) }}
                    />
                    <TextField
                        required
                        id="outlined-basic-pass"
                        type='password'
                        className='textFiled'
                        label="Password"
                        variant="outlined"
                        ref={this.passwordEl}
                        onChange={e => { this.setState({ password: e.target.value }) }}
                    />
                        <Button onClick={this.clickHendlerGetData} className='buttonPadding' variant="contained" color="primary" >
                            Sign Up
                        </Button>
                        <button 
                        type="button"
                        onClick={this.clickHendlerLoginForm}
                        className="link-button" 
                        >
                            Sign In
                        </button>
                </form>

            </Container>
        )
    }
})