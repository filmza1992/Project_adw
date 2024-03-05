import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";
import { useRef } from "react";
import axios from "axios";
const SignInPage = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const birth_dayRef = useRef<HTMLInputElement>();
  const password1Ref = useRef<HTMLInputElement>();
  const password2Ref = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function navigateToHome() {
    const body = {
      username: usernameRef.current?.value,
      phone: phoneRef.current?.value,
      email: emailRef.current?.value,
      password: password1Ref.current?.value,
      birth_day: birth_dayRef.current?.value,
      img_url: passwordRef.current?.value,
    };
    const url = `http://localhost:9000/user/login`;
    const response = await axios.post(url, body);
    const result = response.data;


    navigate("/");
  }
  function navigateToUploadProfile() {
    navigate("/UploadProfile");
  }
  return (
    <>
      <Header></Header>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "90vh",
        }}
      >
        <Box
          sx={(theme) => ({
            border: "1px solid rgba(100, 100, 100, 0.87)",
            marginTop : "1rem",
            padding: "1.2rem",
            borderRadius: "1rem",
            paddingBottom: "1.5rem",
            transitionDuration: "0.7s",
            width: "400px",
            "&:hover": {
              boxShadow:
                " 0 0 1em rgba(100, 100, 100, 0.87), 0 0 1em rgba(100, 100, 100, 0.87),  0 0 1em rgba(100, 100, 100, 0.87)",
              transform: "translateY(-2px)",
            },
          })}
        >
          <h1>Sign in</h1>
          <br />
          <p>Please select your new account</p>
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="username"
            variant="outlined"
            inputRef={usernameRef}
          />

          <TextField
            sx={
              {
                // margin: "1rem",
              }
            }
            id="outlined-basic"
            label="phone"
            variant="outlined"
            inputRef={phoneRef}
          />
          <br />
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="phone"
            variant="outlined"
            inputRef={phoneRef}
          />
          <br />
          <TextField
            sx={{
              // margin: "1rem",
            }}
            id="outlined-basic"
            label="birthday"
            variant="outlined"
            inputRef={birth_dayRef}
          />
          <br />
          <TextField
            sx={
              {
                margin: "1rem",
              }
            }
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={emailRef}
          />
          <br />
          <TextField
            id="outlined-basic"
            sx={{
              // margin: "1rem",
            }}
            label="Password"
            variant="outlined"
            type="password"
            inputRef={password1Ref}
          />
          <br />
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            inputRef={password2Ref}
          />

          <br />

          <Button
            sx={{ color: "rgba(100, 100, 100, 0.87)", width : "215px"}}
            onClick={navigateToUploadProfile}
          >
            Confirm
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SignInPage;
