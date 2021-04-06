import React, { useState, useEffect, createContext } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";

// AWS Amplify config
import config from "./aws-exports";
Amplify.configure(config);

// User context
export const UserStatusContext = createContext("");

function App() {
  const [user, setUser] = useState<string>("no user authenticated");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    getUserData();

    Hub.listen("auth", (data) => {
      const event = data.payload.event;

      switch (event) {
        case "signIn":
          console.log(`user signed in`);
          getUserData();
          break;
        case "signUp":
          console.log(`user signed up`);
          break;
        case "signOut":
          console.log(`user signed out`);
          setUser("no user authenticated");
          break;
        case "signIn_failure":
          console.log(
            "Sign in failed. Please, cheack your username and password."
          );
          break;
        case "configured":
          console.log("the Auth module is configured");
          break;
        default:
          console.log("Users state");
      }
    });
  }, []);

  const getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user ? setUser(user.username) : setUser("no user authenticated");
    } catch (err) {
      console.log({ err });
    }
  };

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {console.log(theme)}
      {console.log(user)}
      <UserStatusContext.Provider value={user}>
        <Router>
          <GlobalStyles />
          <Header signOut={signOut} themeToggler={themeToggler} theme={theme} />
          <Switch>
            <Route exact path="/" component={Home} />

            {user === "no user authenticated" ? (
              <>
                <Route path="/auth" component={AuthPage} />
              </>
            ) : (
              <>
                <Route path="/auth" render={() => <Redirect to="/" />} />
              </>
            )}
          </Switch>
        </Router>
      </UserStatusContext.Provider>
    </ThemeProvider>
  );
}

export default App;
