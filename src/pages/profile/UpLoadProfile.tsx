import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../component/headerUser";
import CardProfile from "../../component/cardProfile";

import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { useEffect, useRef, useState } from "react";
import { Users } from "../../model/users";
import axios from "axios";
import { Button } from "@mui/material";

const UpLoadProfilePage = () => {
  const imageRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const birth_dayRef = useRef<HTMLInputElement>();
  const password1Ref = useRef<HTMLInputElement>();
  const password2Ref = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [data, setData] = useState<Users[]>([]);
  const params = useParams();
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
      const user = users.data;
      setData(user);
      console.log();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function navigateToUploadProfile() {
    const body = {
      img_url: imageRef.current?.value,
      username: usernameRef.current?.value,
      phone: phoneRef.current?.value,
      birth_day: birth_dayRef.current?.value,
      // img_url: passwordRef.current?.value,
    };
    const url = `http://localhost:9000/user`;
    const response = await axios.post(url, body);
    const result = response.data;
    console.log(result.message);
    if (result.message == "created user successfully") {
      console.log("created user successfully");
      const url = "http://localhost:9000/userEmail/" + emailRef.current?.value;
      console.log(url);
      const response = await axios.get(url);
      const users: Users[] = response.data;
      const user = users.data;
      setData(user);
      console.log(user);
      console.log(user._id);
      navigate("/profile/" + user._id);
    } else {
      alert("รหัสผ่านไม่ตรงกันกรุณาป้อนรหัสผ่านใหม่");
    }

    // navigate("/");
  }
  return (
    <>
      <Header></Header>

      <Container sx={{}}>
        <Box sx={{}}>
          <h1>Edit Profile</h1>
          <p>Please select your account</p>
          <br />
          {/* <CardProfile data={data}></CardProfile> */}
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            // label="username"
            value={data.username}
            variant="outlined"
            inputRef={usernameRef}
          />
          <br />
          <form>
            <TextField type="file" />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </form>
          <TextField
            sx={
              {
                // margin: "1rem",
              }
            }
            id="outlined-basic"
            // label="image"
            value={data.img_url}
            variant="outlined"
            inputRef={imageRef}
          />
          <br />
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            // label="phone"
            value={data.phone}
            variant="outlined"
            inputRef={phoneRef}
          />
          <br />
          <TextField
            sx={
              {
                // margin: "1rem",
              }
            }
            id="outlined-basic"
            // label="birthday"
            value={data.birth_day}
            variant="outlined"
            inputRef={birth_dayRef}
          />
          <br />
          <Button
            sx={{ color: "rgba(100, 100, 100, 0.87)", width: "215px" }}
            type="submit"
            onClick={navigateToUploadProfile}
          >
            Confirm
          </Button>
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
