import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../component/header";
import { useRef, useState } from "react";
import axios from "axios";
import { Users } from "../../model/users";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { v4 } from "uuid";
import { imgDB } from "../image/config";
const SignInPage = () => {
  const [img, setImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState([]);
  const [imgUrlTmp, setImgUrlTmp] = useState<string>();
  const headers = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  };
  // function handleClick() {
  //   if (img != null) {
  //     const imgRef = ref(imgDB, `files/${v4()}`);
  //     uploadBytes(imgRef, img).then((val) => {
  //       getDownloadURL(val.ref).then((url) => {
  //         setImgUrlTmp(url);
  //         console.log("url : " + url);
  //       });
  //     });
  //   }
  // }
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
        console.log(data);
        // ตรวจสอบว่ามีรูปที่อัปโหลดเสร็จแล้วหรือไม่
        if (imgUrlTmp) {
          console.log("index ==== : " + imgUrlTmp);
          upUser();
          // ทำงานเมื่อมีรูปที่อัปโหลดเสร็จแล้ว
          // สามารถเรียกใช้โค้ดที่ต้องการทำงานต่อไปได้ที่นี่
        }
      });
    });
  }, [imgUrlTmp]);

  console.log("url imgUrlTmp  +++++++++ : " + imgUrlTmp);
  const usernameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const birth_dayRef = useRef<HTMLInputElement>();
  const password1Ref = useRef<HTMLInputElement>();
  const password2Ref = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [data, setData] = useState<Users>();


  async function navigateToUploadProfile() {
    if (imgUrl.length === 0) {
      alert("รอสักครู่ให้รูปถูกโหลดให้เสร็จสมบูรณ์");
      return;
    }
    if (password1Ref.current?.value == password2Ref.current?.value) {
      if (img != null) {
        const imgRef = ref(imgDB, `files/${v4()}`);
        await uploadBytes(imgRef, img).then((val) => {
          getDownloadURL(val.ref).then((url) => {
            setImgUrlTmp(url);
            console.log("url : " + url);
          });
        });
      }
    } else {
      alert("รหัสผ่านไม่ตรงกันกรุณาป้อนรหัสผ่านใหม่");
    }
  }
  async function upUser() {
    const body = {
      img_url: imgUrlTmp,
      username: usernameRef.current?.value,
      phone: phoneRef.current?.value,
      email: emailRef.current?.value,
      password: password1Ref.current?.value,
      birth_day: birth_dayRef.current?.value,
    };
    const url = `https://542d-118-172-203-210.ngrok-free.app/user`;
    const response = await axios.post(url, body);
    const result = response.data;
    console.log(result.message);
    if (result.message == "created user successfully") {
      console.log("created user successfully");
      const url =
        "https://542d-118-172-203-210.ngrok-free.app/user/email/" + emailRef.current?.value;
      console.log(url);
      const response = await axios.get(url,headers);
      const users: Users = response.data.data;
      const user = users;
      setData(user);
      console.log(user);
      console.log(user._id);
      navigate("/profile/" + user._id + "/?type=0");
    } else {
      console.log("Created user not successfully");
    }
  }
  return (
    <>
      <Header></Header>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "90vh",
        }}
      >
        <Box
          sx={{
            border: "1px solid rgba(100, 100, 100, 0.87)",
            marginTop: "1rem",
            padding: "1.2rem",
            borderRadius: "1rem",
            paddingBottom: "1.5rem",
            transitionDuration: "0.7s",
            width: "600px",
            "&:hover": {
              boxShadow:
                " 0 0 1em rgba(100, 100, 100, 0.87), 0 0 1em rgba(100, 100, 100, 0.87),  0 0 1em rgba(100, 100, 100, 0.87)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <h1>Sign in</h1>
          <br />
          <p>Please select your new account</p>

          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="username"
            variant="outlined"
            inputRef={usernameRef}
          />
          {/* {imgUrl} */}
          <TextField
                  type="file"
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    console.log(file);
                    return setImg(file);
                  }}
                ></TextField>
          {/* <Button
            variant="contained"
            sx={{ marginTop: "0.5rem", marginLeft: "1rem" }}
            onClick={handleClick}
          >
            Upload
          </Button> */}
          <br /> 
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="phone"
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
            label="birthday"
            variant="outlined"
            inputRef={birth_dayRef}
          />
          <br />
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
            sx={
              {
                // margin: "1rem",
              }
            }
            label="Password"
            variant="outlined"
            type="password"
            inputRef={password1Ref}
          />
          <br />
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            inputRef={password2Ref}
          />

          <br />

          <Button
            sx={{ color: "rgba(100, 100, 100, 0.87)", width: "215px" }}
            type="submit"
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
