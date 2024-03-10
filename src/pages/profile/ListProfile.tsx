import { Box, Container, textAlign } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import HeaderAdmin from "../../component/headerAdmin";
import HeaderUser from "../../component/headerUser";
import Header from "../../component/header";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import { useParams, useSearchParams } from "react-router-dom";
import { Users } from "../../model/users";
import axios from "axios";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useEffect, useState } from "react";
import { Admin } from "../../model/Admin";
import { Image } from "../../model/Image";
import { User } from "firebase/auth";

const ListProfilePage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [ImageData, setImageData] = useState<Image[]>([]);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate(); // ย้ายไปข้างบน

  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type);
    }
  }, [params.id]);
  async function DeleteUser(id: string) {
    const url = `http://localhost:9000/user/${id}`;
    try {
      await axios.delete(url);
      // รีเฟรชหน้าเว็บ
      window.location.reload();
      // หรือสามารถใช้ useEffect เรียก callApi ใหม่ได้
      // useEffect(() => {
      //   callApi(params.id, type);
      // }, []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function callApi(id: string, type: string) {
    if (type == "1") {
      const url = `http://localhost:9000/admin/${id}`;
      try {
        const response = await axios.get(url);
        const admin: Admin[] = response.data;
        const data = admin.data;
        setAdminData(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const url = `http://localhost:9000/user`;
    try {
      const response = await axios.get(url);
      const users: User[] = response.data;
      const data = users.data;
      setUserData(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function navigateToShowProfile(id: string) {
    navigate("/ShowProfile/" + data + "/?type=" + type + "&showid=" + id);
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
        <Box sx={{}}>
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                marginRight: "3rem",
                marginBottom: "1rem",
              }}
            >
              <h1 style={{ marginTop: "1.5rem" }}>List User Profile </h1>
            </Box>
            {userData.map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    // marginRight: "3rem",
                    padding: "1rem",
                    // marginBottom: "3rem",
                  }}
                >
                  <Card
                    variant="outlined"
                    orientation="horizontal"
                    onClick={() =>
                        navigateToShowProfile(userData[index]?._id)
                      }
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      transitionDuration: "0.6s",

                      "&:hover": {
                        background : "rgb(236, 236, 236)",
                        boxShadow: "md",
                        borderColor: "neutral.outlinedHoverBorder",
                        transform: "translateY(-6px)",
                        cursor : "pointer",
                      },
                    }}
                  >
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                      <img
                        src={userData[index]?.img_url}
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                    <CardContent>
                      <Typography level="title-lg" id="card-description">
                        {userData[index]?.username}
                      </Typography>
                      <Typography
                        level="body-sm"
                        aria-describedby="card-description"
                        mb={1}
                      >
                        {userData[index]?.email}
                      </Typography>
                    </CardContent>
                    <Button
                      sx={{
                        color: "rgba(100, 100, 100, 0.87)",
                        margin: "0.5rem",
                      }}
                      onClick={() =>
                        navigateToShowProfile(userData[index]?._id)
                      }
                    >
                      See Profile
                    </Button>
                    <Button
                      sx={{
                        color: "rgba(100, 100, 100, 0.87)",
                        margin: "0.5rem",
                      }}
                      onClick={() => DeleteUser(userData[index]?._id)}
                    >
                      Delete User
                    </Button>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ListProfilePage;
