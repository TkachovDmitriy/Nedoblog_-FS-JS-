import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { GraphQLClient } from 'graphql-request'
import { createMuiTheme } from '@material-ui/core/styles';
// import {composeWithDevTools} from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { ThemeProvider } from '@material-ui/styles';

import AuthPage from './Pages/Auth'
import HomePage from './Pages/Main'
import Header from './Components/Header/Header'
import Container from '@material-ui/core/Container'
import rootReducer from './reducer/reducer'
import PrivateRouter from "./PrivatRouter/PrivatRouter";
import Profile from './Pages/Profile'
import Posts from './Pages/News'
// import AddPost from "./Pages/AddPost";

export const getToken = () => {
  const token = localStorage.getItem('token')
  const gql = new GraphQLClient("/graphql", {
    headers: {
      authorization: token ? `Bearer ${token}` : '' 
    }
  })
  return gql
};

console.log(getToken())
// const token = localStorage.getItem('token')

// export const gqlHeaders = new GraphQLClient("/graphql", {
//   headers: {
//     authorization: `Bearer ${token}` ,
//   }
// });
// console.log(token)
// import { dark } from '@material-ui/core/styles/createPalette';


// declarate store 
let store = createStore(
  rootReducer,
  applyMiddleware(
    thunk
  )
);

store.subscribe(() => console.log("store SUBSCRIBE", store.getState()));

// Create My Theme Color for Mui
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c2185b',
    },
    type: 'dark',
    secondary: {
      main: '#e91e63',
    },
  },
})


class App extends Component {
  
  render() {
    console.log()
    return (
      <Provider store = {store}>
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <Header />
          <Container>
            <main>
              <Switch>
                <Route path='/auth' component={AuthPage} />
                <PrivateRouter path='/profile' component={Profile}/>
                {/* <PrivateRouter path='/addPost' component={AddPost}/> */}
                <PrivateRouter path='/news' component={Posts}/>
                <PrivateRouter path='/' component={HomePage}/>
                {/* <PrivateRouter> */}
              </Switch>
            </main>
          </Container>
        </ThemeProvider>

      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
