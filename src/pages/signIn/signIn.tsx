import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";

const SignInPage = () => {
  const Component = styled.div`
    color: #d1d1d1;
    background: rgba(100, 100, 100, 0.87);
    margin: 1rem;
  `;
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }
  function navigateToUploadProfile() {
    navigate("/UploadProfile");
  }
  return (
    <>
      <Header></Header>
      <Container sx={{display : "flex", justifyContent : "center", alignItems: "center" ,height : "90vh"}}>
      <Box
          sx={(theme) => ({
            border: "1px solid rgba(100, 100, 100, 0.87)",
            padding: "4rem",
            borderRadius: "1rem",
            paddingBottom: "5rem",
            transitionDuration: "0.7s",
            width : "400px",
            "&:hover": {
                boxShadow:" 0 0 1em rgba(100, 100, 100, 0.87), 0 0 1em rgba(100, 100, 100, 0.87),  0 0 1em rgba(100, 100, 100, 0.87)",
              transform: "translateY(-2px)",
            }
          })}
        >
          <h1>Sign in</h1>
          <p>Please select your new account</p>
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password"/>
          <br />
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
          />
          <br />
          <Button
            sx={{ color: "rgba(100, 100, 100, 0.87)" ,marginLeft : "8.5rem" }}
            onClick={navigateToUploadProfile}
          >
            Confirm
          </Button>
          <Button
            sx={{ color: "rgba(100, 100, 100, 0.87)" ,marginLeft : "8.5rem" }}
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
