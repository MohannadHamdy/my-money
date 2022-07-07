import "./signup.scss";
import { motion } from "framer-motion";
import { Typography, Container, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const formVariants = {
  hidden: {
    opacity: 0,
    //  x: "-180vw",
  },
  visible: {
    opacity: 1,
    //  x: 0,
    transition: {
      delay: 0.7,
      stiffness: 100,
      type: "spring",
      duration: 0.3,
    },
  },
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password, email);
  };

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <Container maxWidth="md" align="center">
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ margin: "2em 0" }}
          align="center"
        >
          Register
        </Typography>

        <Box
          sx={{
            width: 300,
            height: 300,
          }}
        >
          <form className="signupForm">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              value={email}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Button
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              onClick={handleLogin}
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Signup;
