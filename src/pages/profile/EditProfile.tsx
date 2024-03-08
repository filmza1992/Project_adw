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
import HeaderUser from "../../component/headerUser";
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
const EditProfilePage = () => {
  const imageRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const birth_dayRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [data, setData] = useState<Users[]>([]);
  const params = useParams();
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyAQDzrW2mWlZ4JYjBqI-cmmcuKSQEx-Z2w",
  //   authDomain: "project-adw.firebaseapp.com",
  //   databaseURL: "https://project-adw-default-rtdb.firebaseio.com",
  //   projectId: "project-adw",
  //   storageBucket: "project-adw.appspot.com",
  //   messagingSenderId: "432161617519",
  //   appId: "1:432161617519:web:676549153358a72675bf9a",
  //   measurementId: "G-NYNKTVFQWC",
  // };
  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const storage = getStorage(app); // แก้เป็นการใช้ getStorage

  // const [file, setFile] = useState<File | null>(null);
  // console.log(storage);
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const handleUpload = () => {
  //   if (file) {
  //     const storageRef = storage.ref(); // ใช้ storage.ref() เพื่อสร้าง reference สำหรับ Firebase Storage
  //     const fileRef = storageRef.child(file.name); // ใช้ storageRef.child() เพื่อสร้าง reference สำหรับไฟล์ที่ต้องการจัดเก็บ
  //     fileRef
  //       .put(file)
  //       .then((snapshot) => {
  //         console.log("File uploaded successfully");
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading file:", error);
  //       });
  //   } else {
  //     console.error("No file selected");
  //   }
  // };

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
      {params.id != null ? <HeaderUser data={params.id} /> : <Header />}

      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={(theme) => ({
            width: "770px",
            border: "1px solid rgba(100, 100, 100, 0.87)",
            padding: "4rem",
            borderRadius: "1rem",
            marginTop: "3rem",
            paddingBottom: "3rem",
            transitionDuration: "0.7s",
            "&:hover": {
              boxShadow:
                " 0 0 1em rgba(100, 100, 100, 0.87), 0 0 1em rgba(100, 100, 100, 0.87),  0 0 1em rgba(100, 100, 100, 0.87)",
              transform: "translateY(-2px)",
            },
          })}
        >
          <h1>Edit Profile</h1>

          {/* <CardProfile data={data}></CardProfile> */}
          <TextField
            sx={{
              margin: "1rem",
              marginTop: "2rem",
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
            <Button
              style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
              variant="contained"
              color="primary"
              component="span"
              // onClick={handleUpload}
            >
              Upload
            </Button>
          </form>
          <br />
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

export default EditProfilePage;
