import "./navbar.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useAuth } from "../../hooks/useAuth";
const navbarVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
    },
  },
};

const Navbar = () => {
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="navbar"
    >
      <Box sx={{ flexGrow: 1, backgroundColor: "secondary.main" }}>
        <AppBar position="static">
          <Toolbar>
            <div className="logo">
              <Link to="/">myMoney</Link>
            </div>
            {user ? (
              <>
                {user.displayName && `Welcome ${user.displayName} `}
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ margin: "0 1em" }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginRight: 3 }}
                >
                  <Link to="/login">Login</Link>
                </Button>

                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#fff" }}
                >
                  <Link to="/signup">Register</Link>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </motion.div>
  );
};

export default Navbar;
