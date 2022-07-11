import "./signup.scss";
import { motion } from "framer-motion";
import { Typography, Container, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";

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
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup, error, outcome, isPending } = useSignUp();

  const handleLogin = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
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
              id="displayName"
              label="Display Name"
              variant="outlined"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              value={displayName}
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
              disabled={isPending}
            >
              Register
            </Button>
          </form>
          {error && (
            <Typography
              variant="h6"
              gutterBottom
              sx={{ margin: "1em 0" }}
              align="center"
            >
              {error}
            </Typography>
          )}
          {outcome && (
            <Typography
              variant="h6"
              gutterBottom
              sx={{ margin: "1em 0" }}
              align="center"
            >
              {outcome}
            </Typography>
          )}
        </Box>
      </Container>
    </motion.div>
  );
};

export default Signup;
