import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";
import axios from "axios";
import { Users } from "../../model/users";
import { useRef, useState } from "react";
import { endpoint } from "../../constant/endpoint";
const LoginAdminPage = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [data, setData] = useState<Users>();
  async function navigateToHome() {
    const body = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    const url = endpoint +`/user/login`;
    const response = await axios.post(url, body);
    const result = response.data;

    const headers = {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    };
    if (result.message == "Successfuly_Login_Admin") {
      console.log("Successfuly_Login");
      const url = endpoint +"/admin/email/"+emailRef.current?.value;
      const response = await axios.get(url,headers);
      const users: Users = response.data.data;
      const user = users;
      setData(user);
      console.log(data);
      console.log(user._id);
      navigate("/" + user._id + "?type=1");
    } else {
      console.log("Not successfully_Login");
     alert("Login Not successfully\n======== :) ========\nPleass check your password")
    }
  }
  const navigate = useNavigate();
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
          sx={{
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
          }}
        >
          <h1>Admin Login</h1>
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
            width:"200px",
              marginTop: "1rem",
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

export default LoginAdminPage;
