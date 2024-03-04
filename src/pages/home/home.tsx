import { Box, Container } from "@mui/system";
import Header from "../../component/headerUser";
import ListImage from "../../component/cardProfile";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import styled from "styled-components";
const Component = styled.div`
  color: #d1d1d1;
  background: rgba(100, 100, 100, 0.87);
  margin: 1rem;
`;
function HomePage() {
  return (
    <>
      <Header></Header>
      <Container
        sx={{ marginTop: "2rem", placeItems: "center", minWidth: "320px" }}
      >
          <Box sx={{}}>
            <div style={{ fontSize: "40px", fontWeight: "bolder",marginBottom: "1.5rem" }}>
              Choose the picture you like
            </div>
            {/* <ListImage></ListImage>
             */}
            <Toolbar sx={{}}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 , width : "400px"}}>
                <img
                  src="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300"
                  srcSet="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300&dpr=2 2x"
                  loading="lazy"
                  alt="Yosemite by Casey Horner"
                />
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 , width : "400px"}}>
                <img
                  src="https://gearbox.imgix.net/https%3A%2F%2Fix-www.imgix.net%2Fsolutions%2Fwindmills.jpg?q=75&auto=format&fm=pjpg&fit=crop&w=456&h=342&ixlib=js-2.0.0&s=0213793bd6afa303564c7356a07a9243"
                  srcSet="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300&dpr=2 2x"
                  loading="lazy"
                  alt="Yosemite by Casey Horner"
                />
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
            </Toolbar>
            <br />

            <Toolbar sx={{}}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button
                  sx={{ color: "rgba(100, 100, 100, 0.87)" }}
                  //   onClick={navigateTo}
                >
                  Vote
                </Button>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, paddingLeft: "4.5rem" }}
              ></Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button
                  sx={{ color: "rgba(100, 100, 100, 0.87)" }}
                  //   onClick={navigateTo}
                >
                  Vote
                </Button>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
            </Toolbar>
          </Box>
      </Container>
    </>
  );
}

export default HomePage;
