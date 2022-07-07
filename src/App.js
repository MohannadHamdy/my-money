import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey, brown } from "@mui/material/colors";

const App = () => {
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
