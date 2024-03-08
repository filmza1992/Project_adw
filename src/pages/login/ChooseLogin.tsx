import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";

const ChooseLoginPage = () => {
  const navigate = useNavigate();
  function navigateToAdminLogin() {
    navigate("/loginAdmin");
  }
  function navigateToUserLogin() {
    navigate("/loginUser");
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
          <br />
          <p>Please select your role</p>
          <br />

          <Button
            sx={{
              color: "rgba(100, 100, 100, 0.87)",
              marginRight: "1rem",
              marginTop: "0.5rem",
            }}
            // onClick={() => alert("It works!")}
            onClick={navigateToAdminLogin}
          >
            Admin
          </Button>
          or
          <Button
            sx={{
              color: "rgba(100, 100, 100, 0.87)",
              marginLeft: "1rem",
              marginTop: "0.5rem",
            }}
            onClick={navigateToUserLogin}
          >
            User
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ChooseLoginPage;
