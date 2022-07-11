import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth } from "./hooks/useAuth";
const App = () => {
  const { authIsReady, user } = useAuth();
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };
  const RequireLoggedOut = ({ children }) => {
    return !user ? children : <Navigate to="/" />;
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#AC872D",
      },
      secondary: {
        main: "#2e2e2e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {authIsReady && (
          <>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireLoggedOut>
                    <Login />
                  </RequireLoggedOut>
                }
              />
              <Route
                path="/signup"
                element={
                  <RequireLoggedOut>
                    <Signup />
                  </RequireLoggedOut>
                }
              />
            </Routes>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
