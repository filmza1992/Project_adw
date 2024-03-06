import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";
import axios from "axios";
import { Users } from "../../model/users";
import { useRef, useState } from "react";
const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [data, setData] = useState<Users[]>([]);
  async function navigateToHome() {
    const body = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    const url = `http://localhost:9000/user/login`;
    const response = await axios.post(url, body);
    const result = response.data;

    if (result.message == "Successfuly_Login") {
      console.log("Successfuly_Login");
      const url = "http://localhost:9000/user/email/"+emailRef.current?.value;
      const response = await axios.get(url);
      const users: Users[] = response.data;
      const user = users.data;
      setData(user);
      console.log(user._id);
      navigate("/" + user._id);
    } else {
      console.log("Not successfully_Login");
    }
  }
  const navigate = useNavigate();
  function navigateToSignIn() {
    navigate("/signIn");
  }
  return (
    <>
      <Header></Header>
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            border: "1px solid rgba(100, 100, 100, 0.87)",
            padding: "4rem",
            borderRadius: "1rem",
            paddingBottom: "5rem",
            transitionDuration: "0.7s",
            "&:hover": {
              boxShadow:
                " 0 0 1em rgba(100, 100, 100, 0.87), 0 0 1em rgba(100, 100, 100, 0.87),  0 0 1em rgba(100, 100, 100, 0.87)",
              transform: "translateY(-2px)",
            },
          })}
        >
          <h1>Login</h1>
          <p>Please select your account</p>
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={emailRef}
          />
          <br />
          <TextField
            id="outlined-basic"
            inputRef={passwordRef}
            label="Password"
            variant="outlined"
          />
          <br />

          <Button
            sx={{
              color: "rgba(100, 100, 100, 0.87)",
              marginRight: "1rem",
              marginTop: "0.5rem",
            }}
            // onClick={() => alert("It works!")}
            onClick={navigateToSignIn}
          >
            Sign in
          </Button>
          <Button
            sx={{
              color: "rgba(100, 100, 100, 0.87)",
              marginLeft: "1rem",
              marginTop: "0.5rem",
            }}
            onClick={navigateToHome}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
