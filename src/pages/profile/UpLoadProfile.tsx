import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../../component/headerUser";
import CardProfile from "../../component/cardProfile";

import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

const UpLoadProfilePage = () => {
  const Component = styled.div`
    color: #d1d1d1;
    background: rgba(100, 100, 100, 0.87);
    margin: 1rem;
  `;
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }
  return (
    <>
      <Header></Header>
      
      <Container sx={{}}>
        <Box sx={{}}>
          <h1>Edit Profile</h1>
          <p>Please select your account</p>
          <br />
          <CardProfile></CardProfile>
          {/* <video
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"
            />
          </video> */}
        </Box>
      </Container>
    </>
  );
};

export default UpLoadProfilePage;
