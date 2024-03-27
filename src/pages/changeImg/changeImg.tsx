
import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import Header from "../../component/header";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Vote } from "../../model/Vote";
import axios from "axios";
import { Button } from "@mui/material";
import { v4 } from "uuid";
import { imgDB } from "../image/config";
import { Users } from "../../model/users";
import { Image } from "../../model/Image";
const ChangeImgPage = () => {
  const [img, setImg] = useState<File>();

  const [imgUrlTmp, setImgUrlTmp] = useState<string>();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const img_id = searchParams.get("img_id");
  const navigate = useNavigate(); // ย้ายไปข้างบน
  const [userData, setUserData] = useState<Users[]>([]);
  const [VoteData, setVoteData] = useState<Vote[]>([]);

  const headers = {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  };
  // console.log(img_id);
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id);
    }
    if (imgUrlTmp) {
      console.log("index ==== : " + imgUrlTmp);
      upPost();
      // ทำงานเมื่อมีรูปที่อัปโหลดเสร็จแล้ว
      // สามารถเรียกใช้โค้ดที่ต้องการทำงานต่อไปได้ที่นี่
    }
  }, [params.id]);

  async function callApi(id: string) {
    const url = `http://https://542d-118-172-203-210.ngrok-free.app/user/${id}`;
    try {
      const response = await axios.get(url, headers);
      const users = response.data.data;
      const data = users;
      setUserData(data);
      console.log("users data");
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const urlvote = `http://https://542d-118-172-203-210.ngrok-free.app/vote/image/${img_id}`;
    try {
      const response = await axios.get(urlvote, headers);
      const vote: Vote[] = response.data;
      const data = vote;
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


  async function upPost() {
    const body = {
      img_url: imgUrlTmp,
      user: {
        user_id: params.id,
        username: userData[0].username,
        photoURL: userData[0].img_url,
      },
    };
    const url = `https://542d-118-172-203-210.ngrok-free.app/image/${img_id}`;
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
    const urlimage = `https://542d-118-172-203-210.ngrok-free.app/image/${img_id}`;
    try {
      const response = await axios.get(urlimage, headers);
      const image: Image[] = response.data.data;
      const data = image;
      console.log(data[0]._id);
      upVote();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function upVote() {
    console.log("data img");
    console.log(VoteData);
    const body = {
      point: 0, // ตั้งค่า point ตามที่ต้องการ
      img: {
        img_id: img_id, // กำหนด img_id ตามที่ต้องการ
        img_url: imgUrlTmp, // กำหนด img_url ตามที่ต้องการ
        user: {
          user_id: params.id, // กำหนด user_id ตามที่ต้องการ
          username: userData[0].username, // กำหนด username ตามที่ต้องการ
          photoURL: userData[0].img_url, // กำหนด photoURL ตามที่ต้องการ
        },
      },
      create_at: new Date(),
    };

    const url = `https://542d-118-172-203-210.ngrok-free.app/vote/${VoteData[0]._id}`;
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
                <TextField
                  type="file"
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    console.log(file);
                    return setImg(file);
                  }}
                ></TextField>
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
