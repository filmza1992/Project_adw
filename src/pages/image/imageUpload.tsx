import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import { imgDB } from "./config";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import Header from "../../component/header";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import axios from "axios";
import { Users } from "../../model/users";
import { Image } from "../../model/Image";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/joy/IconButton";
import Alert from "@mui/joy/Alert";
function imageUpLoadPage() {
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const [imgUrlTmp, setImgUrlTmp] = useState();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate(); // ย้ายไปข้างบน
  const [userData, setUserData] = useState<Users[]>([]);
  const [ImageData, setImageData] = useState<Image[]>([]);
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type);
    }
  }, [params.id]);

  async function callApi(id: string, type: string) {
    const url = `http://localhost:9000/user/${id}`;
    try {
      const response = await axios.get(url);
      const users: User[] = response.data;
      const data = users.data;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function UploadPicturePost() {
    if (img != null) {
      const imgRef = ref(imgDB, `files/${v4()}`);
      uploadBytes(imgRef, img).then((val) => {
        getDownloadURL(val.ref).then((url) => {
          setImgUrlTmp(url);
          // console.log("url : " + url);
        });
      });
    }
  }

  useEffect(() => {
    // console.log(88);
    listAll(ref(imgDB, "files")).then((imgs) => {
      const promises = imgs.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImgUrl(urls);
        // console.log("All images are loaded"); // ตรวจสอบว่ารูปภาพทั้งหมดถูกโหลดเสร็จแล้ว
      });
    });
  }, []);

  useEffect(() => {
    // console.log(88);
    listAll(ref(imgDB, "files")).then((imgs) => {
      imgs.items.forEach((val) => {
        // console.log(val.name);
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
          // console.log("index ==== : " + imgUrlTmp);
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
      user: {
        user_id: params.id,
        username: userData.username,
        photoURL: userData.img_url,
      },
    };
    const url = `http://localhost:9000/image`;
    try {
      const response = await axios.post(url, body);
      const result = response.data;
      console.log(result.message);
      if (result.message === "created Image successfully") {
        console.log("created Image successfully");
        // เมื่อ upPost เสร็จสิ้นเรียบร้อย ให้เรียกใช้ callmage
        callmage();
      } else {
        console.log("Created Image not successfully");
      }
    } catch (error) {
      console.error("Error posting image:", error);
    }
}

async function callmage() {
    const urlimage = `http://localhost:9000/image`;
    try {
        const response = await axios.get(urlimage);
        const image: Image[] = response.data;
        const data = image.data;
        setImageData(data);
        console.log(data[data.length-1]._id);
        upVote(data[data.length-1]._id);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

  async function upVote(_id : string) {
    console.log("data img");
    console.log(_id);
    const body = {
      point: 100, // ตั้งค่า point ตามที่ต้องการ
      img: {
        img_id: _id, // กำหนด img_id ตามที่ต้องการ
        img_url: imgUrlTmp, // กำหนด img_url ตามที่ต้องการ
        user: {
          user_id: params.id, // กำหนด user_id ตามที่ต้องการ
          username: userData.username, // กำหนด username ตามที่ต้องการ
          photoURL: userData.img_url, // กำหนด photoURL ตามที่ต้องการ
        },
      },
      create_at: new Date(),
    };
    const url = `http://localhost:9000/vote`;
    const response = await axios.post(url, body);
    const result = response.data;
    console.log(result.message);
    if (result.message == "created Vote successfully") {
      console.log("created Vote successfully");
      navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      console.log("Created Vote not successfully");
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
      <Alert startDecorator={<WarningIcon />} variant="solid" color="warning">
        You can upload a maximum of 5 photos only.
      </Alert>
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
