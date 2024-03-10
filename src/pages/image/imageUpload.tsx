import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import { imgDB } from "./config";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import Header from "../../component/header";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import axios from "axios";
import { Users } from "../../model/users";

function imageUpLoadPage() {
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const [imgUrlTmp, setImgUrlTmp] = useState();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate(); // ย้ายไปข้างบน

//   useEffect(() => {
//     if (params.id != null) {
//       callApi(params.id, type);
//     }
//   }, [params.id]);
  function UploadPicturePost() {
    if (img != null) {
      const imgRef = ref(imgDB, `files/${v4()}`);
      uploadBytes(imgRef, img).then((val) => {
        getDownloadURL(val.ref).then((url) => {
          setImgUrlTmp(url);
          console.log("url : " + url);
        });
      });
    }
  }

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
          console.log("index ==== : " + imgUrlTmp);
          upPost();
          // ทำงานเมื่อมีรูปที่อัปโหลดเสร็จแล้ว
          // สามารถเรียกใช้โค้ดที่ต้องการทำงานต่อไปได้ที่นี่
        }
      });
    });
  }, [imgUrlTmp]);

  async function upPost() {
    const body = {
      img_url: imgUrlTmp,
      username: usernameRef.current?.value,
      phone: phoneRef.current?.value,
      email: emailRef.current?.value,
      password: password1Ref.current?.value,
      birth_day: birth_dayRef.current?.value,
    };
    const url = `http://localhost:9000/user`;
    const response = await axios.post(url, body);
    const result = response.data;
    console.log(result.message);
    if (result.message == "created user successfully") {
      console.log("created user successfully");
      navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      console.log("Created user not successfully");
    }
  }
  return (
    <>
      {params.id != null && type === "0" ? (
        <HeaderUser data={params.id} type={type} />
      ) : params.id != null && type === "1" ? (
        <HeaderAdmin data={params.id} type={type} />
      ) : (
        <Header />
      )}

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
          <h1>Upload picture</h1>
          <p>Please select your flie</p>
          <br />
          <TextField
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          ></TextField>

          <br />
          <Button
            sx={{
              color: "rgba(100, 100, 100, 0.87)",
              width: "200px",
              marginTop: "1rem",
            }}
            onClick={UploadPicturePost}
          >
            Confirm Upload
          </Button>
        </Box>
      </Container>
    </>
  );
}
export default imageUpLoadPage;
