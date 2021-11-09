import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          if(jwt_decode(token).exp < Date.now() / 1000){
            localStorage.clear();
            return <Redirect to={`/signin`} />;
          }
          return <Component {...props} />;
        } else {
          return <Redirect to={`/signin`} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
