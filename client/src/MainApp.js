import React, { Component } from "react";
//import Loadable from "react-loadable";
import { Router, Link } from "@reach/router";
import Home from "./pages/Home";
//import Loader from "./Loader"
//import MyProfile from "./MyProfile"

//TODO: This below is for top level code splitting. Meaning only load on demand.
// const MyProfile = Loadable({
//   loader: () => import("./MyProfile"),
//   loading: Loader
// })

class MainApp extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        {/* <MyProfile path="/myprofile"/> */}
      </Router>
    );
  }
}

export default MainApp;
