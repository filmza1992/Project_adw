import { Box, Container} from "@mui/system";
import TextField from "@mui/material/TextField";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";

const LoginPage = () => {
  // const Component = styled.div`
  //   color: #d1d1d1;
  //   background: rgba(100, 100, 100, 0.87);
  //   margin: 1rem;
  // `;
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }
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
                boxShadow:" 0 0 1em rgba(100, 100, 100, 0.87), 0 0 1em rgba(100, 100, 100, 0.87),  0 0 1em rgba(100, 100, 100, 0.87)",
              transform: "translateY(-2px)",
            }
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
          />
          <br />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
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