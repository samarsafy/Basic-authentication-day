import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate (cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) //fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Home = () => <h3>Home</h3>
const Admin = () => <h3>Admin</h3>


const privateRoute= ({ component: component, ...rest }) =>(
  <Route {...rest} render ={(props) => (
    fakeAuth.isAuthenticated === true
    ? <component {...props} />
    : <Redirect to ={{
      pathname:'/Login',
      state: { from: props.location }
    }} />
  )} />
)

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };
  Login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { from }= this.props.location.state || { from: { pathname: '/' } }
    if (redirectToReferrer === true) {
      return <Redirect to={ from } />;
    }

    return (
      <div>
        <p>You must log in to view this page at {from.pathname}</p>
        <button onClick={this.Login}>log in</button>
      </div>
    );
  }
}

const AuthButton = withRouter(({ history })) => {
  fakeAuth.isAuthenticated === true
  ? <p>
  Welcome! <button onClick={() => {
    fakeAuth.signout(() => history.push('/'))
  }}>Sign Out</button>
  </p>
  : <p>You are not logged in </p>
}





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
      <div>
      <AuthButton />
      <ul>
        <li><link to ='/Home'>Home</link></li>
       <li><link to ='/Admin'>Admin</link></li>
        <Login />
        </ul>
        <Route path='/Home' component={Home} />
        <Route path='/login' component={Login} />
        <privateRoute path='/Admin' component={Admin} />
      </div>
      </Router>
    );
  }
}
export default App;
