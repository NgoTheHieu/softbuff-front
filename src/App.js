import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import AlgoDetail from "./pages/AlgoDetail";
import AlgoPage from "./pages/AlgoPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
function App(props) {
  const [user, setUser] = useState(true);
  const [open, setOpen] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);
  const loginWithFacebook = async (data) => {
    if (data && data.accessToken) {
      console.log(data.accessToken);
      const res = await fetch(
        `http://localhost:5000/auth/login/facebook?token=${data.accessToken}`
      );
      if (res.ok) {
        const dt = await res.json();
        console.log(dt);
        const user = dt.data;
        const token = dt.token;
        setUser(user);
        localStorage.setItem("token", token);
      } else {
        console.log(res);
      }
    }
  };
  const loginWithEmail = async (email, pw) => {
    if (!email || !pw) {
      console.log("Need email and password");
      return;
    }
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password: pw }),
    });

    if (res.ok) {
      const dt = await res.json();
      console.log(dt);
      const user = dt.data.user;
      const token = dt.data.token;
      setUser(user);
      localStorage.setItem("token", token);
    } else {
      console.log(res);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoaded(true);
      return;
    }
    const res = await fetch(`http://localhost:5000/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const dt = await res.json();
      setUser(dt.data);
    } else {
      localStorage.removeItem("token");
    }
    setLoaded(true);
  };

  const logout = async () => {
    const res = await fetch(`http://localhost:5000/auth/logout`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      console.log("Don't mess with my app");
    }
  };

  if (!loaded) {
    return <h1>Loading ...</h1>;
  }

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  return (
    <Switch>
      <Route path="/" exact component={()=><MainPage user={user}/>} />
      <Route path="/login" exact component={LoginPage} />
      {/* this handle event that switch user to Login pages */}
      <Route path="/algo" exact component={AlgoPage} />
      {/* this handle event that switch user to well, .. Jobs page */}
      <Route path="/signup" exact component={SignupPage} />
      {/* this handle event that switch user to well, .. Jobs page */}
      <ProtectedRoute
        path="/Algo/:id"
        render={(props) => <AlgoDetail {...props} />}
      />
    </Switch>
  );
}

export default App;
