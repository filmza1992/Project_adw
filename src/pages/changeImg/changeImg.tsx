import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import Header from "../../component/header";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { Admin } from "../../model/Admin";
import { Vote } from "../../model/Vote";
import axios from "axios";
import { Button } from "@mui/material";
import { v4 } from "uuid";
import { imgDB } from "../image/config";
import { Users } from "../../model/users";
import { Image } from "../../model/Image";
const ChangeImgPage = () => {
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const [imgUrlTmp, setImgUrlTmp] = useState();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const img_id = searchParams.get("img_id");
  const navigate = useNavigate(); // ย้ายไปข้างบน
  const [userData, setUserData] = useState<Users[]>([]);
  const [ImageData, setImageData] = useState<Image[]>([]);
  const [VoteData, setVoteData] = useState<Vote[]>([]);
  // console.log(img_id);
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type);
    }
  }, [params.id]);

  async function callApi(id: string, type: string) {
    const url = `http://localhost:9000/user/${id}`;
    try {
      const response = await axios.get(url);
      const users: Users[] = response.data;
      const data = users.data;
      setUserData(data);
      console.log("users data");
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const urlvote = `http://localhost:9000/vote/image/${img_id}`;
    try {
      const response = await axios.get(urlvote);
      const vote: Vote[] = response.data;
      const data = vote.data;
      setVoteData(data);
      console.log("vote data");
      console.log(data);
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
          console.log("url : " + url);
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
      user: {
        user_id: params.id,
        username: userData.username,
        photoURL: userData.img_url,
      },
    };
    const url = `http://localhost:9000/image/${img_id}`;
    try {
      const response = await axios.put(url, body);
      const result = response.data;
      console.log(result.message);
      if (result.message === "Successful operation") {
        console.log("Successful operation");
        // เมื่อ upPost เสร็จสิ้นเรียบร้อย ให้เรียกใช้ callmage
        callmage();
      } else {
        console.log("Update Image not successfully");
      }
    } catch (error) {
      console.error("Error posting image:", error);
    }
  }

  async function callmage() {
    const urlimage = `http://localhost:9000/image/${img_id}`;
    try {
      const response = await axios.get(urlimage);
      const image: Image[] = response.data;
      const data = image.data;
      setImageData(data);
      console.log(data._id);
      upVote(data._id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function upVote(_id: string) {
    console.log("data img");
    console.log(VoteData);
    const body = {
      point: 100, // ตั้งค่า point ตามที่ต้องการ
      img: {
        img_id: img_id, // กำหนด img_id ตามที่ต้องการ
        img_url: imgUrlTmp, // กำหนด img_url ตามที่ต้องการ
        user: {
          user_id: params.id, // กำหนด user_id ตามที่ต้องการ
          username: userData.username, // กำหนด username ตามที่ต้องการ
          photoURL: userData.img_url, // กำหนด photoURL ตามที่ต้องการ
        },
      },
      create_at: new Date(),
    };
    
    const url = `http://localhost:9000/vote/${VoteData[0]._id}`;
    const response = await axios.put(url, body);
    const result = response.data;
    console.log(result.message);
    if (result.message == "Successful operation") {
      console.log("Successful operation");
      navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      console.log("Update Vote not successfully");
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
      
      <Container sx={{}}>
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <h1>Edit Picture</h1>
            <p>Please import your image</p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form>
                <TextField type="file"  onChange={(e) => setImg(e.target.files[0])} />
                <Button
                  style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={UploadPicturePost}
                >
                  Upload
                </Button>
              </form>
              <br />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChangeImgPage;
