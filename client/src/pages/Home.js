import React from "react";
import "./Styling/Home.css";
import Button from "react-bootstrap/Button";

function Home() {
  const authenticateUser = () => {
    console.log("Authenticate user now!");
  };
  return (
    <div className="Home-page">
      <div className="Auth-container">
        <ul className="Auth-list">
          <li>Log in</li>
          <li>Sign up</li>
        </ul>
      </div>
      <div className="Home-page-body">
        <h1 className="App-title"> mi ritmo </h1>
        <Button
          onClick={() => {
            authenticateUser();
          }}
          variant="light"
        >
          Find your ritmo...
        </Button>
      </div>
      <footer>
        <ul className="Auth-list">
          <li>Help</li>
        </ul>
      </footer>
    </div>
  );
}

export default Home;
