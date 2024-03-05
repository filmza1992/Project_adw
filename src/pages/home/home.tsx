import { Box, Container } from "@mui/system";
import HeaderUser from "../../component/headerUser";
import Header from "../../component/header";
import ListImage from "../../component/cardProfile";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { Users } from "../../model/users";
import axios from "axios";
import styled from "styled-components";
import { useState,useEffect  } from "react";
function HomePage() {
  const params = useParams();
  const [data, setData] = useState<Users[]>([]);
  
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id);
    }
  }, [params.id]);
  console.log(params.id);
  async function callApi(id: string) {
    try {
      const url = `http://localhost:9000/user/${id}`;
      const response = await axios.get(url);
      const users: User[] = response.data;
      setData(users);
      console.log(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //
  return (
    <>
      {params.id != null ? <HeaderUser data={params.id} /> : <Header />}
      {/* <Head></Head> */}
      <Container
        sx={{ marginTop: "2rem", placeItems: "center", minWidth: "320px" }}
      >
        <Box sx={{}}>
          <div
            style={{
              fontSize: "40px",
              fontWeight: "bolder",
              marginBottom: "1.5rem",
            }}
          >
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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, width: "400px" }}
            >
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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, width: "400px" }}
            >
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
