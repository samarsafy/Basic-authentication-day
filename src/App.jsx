import React from "react";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <Home />
        <Admin />
        <Login />
      </div>
    );
  }
}
export default App;
