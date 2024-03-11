import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
import { Admin } from "../../model/Admin";
import axios from "axios";
import { Button } from "@mui/material";
import HeaderUser from "../../component/headerUser";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imgDB } from "../image/config";
import HeaderAdmin from "../../component/headerAdmin";
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

const EditProfilePage = () => {
  const imageRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const birth_dayRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const name = searchParams.get("name");
  const birth_day = searchParams.get("birthday");
  const phone = searchParams.get("phone");
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [data, setData] = useState<any>(null);
  const params = useParams();
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const [imgUrlTmp, setImgUrlTmp] = useState();
  
  useEffect(() => {
    console.log(88);
    listAll(ref(imgDB, "files")).then((imgs) => {
      const promises = imgs.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImgUrl(urls);
        console.log("All images are loaded"); // ตรวจสอบว่ารูปภาพทั้งหมดถูกโหลดเสร็จแล้ว
      });
    });
  }, []);

  useEffect(() => {
    console.log(88);
    listAll(ref(imgDB, "files")).then((imgs) => {
      imgs.items.forEach((val) => {
        console.log(val.name);
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log(88);
    listAll(ref(imgDB, "files")).then((imgs) => {
      const promises = imgs.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImgUrl(urls);
        console.log("All images are loaded");

        // ตรวจสอบว่ามีรูปที่อัปโหลดเสร็จแล้วหรือไม่
        if (imgUrlTmp) {
          if (type == "0") {
            upUser(imgUrlTmp);
          }
          else{
            upAdmin(imgUrlTmp);
          }
          
          // ทำงานเมื่อมีรูปที่อัปโหลดเสร็จแล้ว
          // สามารถเรียกใช้โค้ดที่ต้องการทำงานต่อไปได้ที่นี่
        }
        
      });
    });
  }, [imgUrlTmp]);
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id);
    }
  }, [params.id]);
  console.log(params.id);
  console.log(data);
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
    console.log("url : ");
    if (imgUrl.length === 0) {
      alert("รอสักครู่ให้รูปถูกโหลดให้เสร็จสมบูรณ์");
      return;
    }
    if (img != null) {
      const imgRef = ref(imgDB, `files/${v4()}`);
      await uploadBytes(imgRef, img).then((val) => {
        getDownloadURL(val.ref).then((url) => {
          setImgUrlTmp(url);
          console.log("url : " + url);
        });
      });
    }

  }

  // navigate("/");

  async function upUser(myurl: string) {
    const body = {
      img_url: myurl,
      username: usernameRef.current?.value,
      phone: phoneRef.current?.value,
      birth_day: birth_dayRef.current?.value,
    };
    const url = `http://localhost:9000/user/${params.id}`;
    const response = await axios.put(url, body);
    const result = response.data;
    console.log("=== result.message ===");
    console.log(result.message);

    if (result.message == "Successful operation") {
      console.log("Successful operation");
      const url = `http://localhost:9000/user/${params.id}`;
      console.log(url);
      const response = await axios.get(url);
      const users: Users[] = response.data;
      const user = users.data;
      setData(user);
      console.log(user);
      navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      alert("รหัสผ่านไม่ตรงกันกรุณาป้อนรหัสผ่านใหม่");
    }
  }
  async function upAdmin(myurl: string) {
    const body = {
      img_url: myurl,
      username: usernameRef.current?.value,
      phone: phoneRef.current?.value,
      birth_day: birth_dayRef.current?.value,
    };
    const url = `http://localhost:9000/admin/${params.id}`;
    const response = await axios.put(url, body);
    const result = response.data;
    console.log("=== result.message ===");
    console.log(result.message);

    if (result.message == "Successful operation") {
      console.log("Successful operation");
      const url = `http://localhost:9000/admin/${params.id}`;
      console.log(url);
      const response = await axios.get(url);
      const admins: Admin[] = response.data;
      const admin = admins.data;
      setData(admin);
      console.log(admin);
      console.log(admin._id);
      navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      alert("รหัสผ่านไม่ตรงกันกรุณาป้อนรหัสผ่านใหม่");
    }
  }
  return (
    <>
      {params.id != null && type === "0" ? (
        <HeaderUser data={params.id} type={type}/>
      ) : params.id != null && type === "1" ? (
        <HeaderAdmin data={params.id} type={type}/>
      ) : (
        <Header />
      )}

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
            defaultValue={name}
            inputRef={usernameRef}
          />
          <br />
          <form>
            <TextField
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </form>
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            // label="phone"
            defaultValue={phone}
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
            defaultValue={birth_day}
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
