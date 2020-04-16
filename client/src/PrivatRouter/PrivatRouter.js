import React from "react";
import { Route, Redirect } from "react-router-dom";




function PrivateRoute({ component: Component, ...rest }) {

    let isAuthenticated = localStorage.getItem('token')

    if(isAuthenticated) { 
      
    }

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated  ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;