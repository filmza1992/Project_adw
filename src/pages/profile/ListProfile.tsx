import { Box, Container} from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Button} from "@mui/material";
import HeaderAdmin from "../../component/headerAdmin";
import HeaderUser from "../../component/headerUser";
import Header from "../../component/header";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Users } from "../../model/users";
import { endpoint } from "../../constant/endpoint";

const ListProfilePage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [userData, setUserData] = useState<Users[]>([]);
  const [data, setData] = useState<Users[]>([]);
  const navigate = useNavigate(); // ย้ายไปข้างบน

  const headers = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  };

  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type!);
    }
  }, [params.id]);
  async function DeleteUser(id: string) {
    const url = `https://542d-118-172-203-210.ngrok-free.app/user/${id}`;
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
      const url = endpoint +`/admin/${id}`;
      try {
        const response = await axios.get(url,headers);
        const admin = response.data.data;
        const data = admin;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const url = endpoint +`/user`;
    try {
      const response = await axios.get(url,headers);
      const users:Users[] = response.data.data;
      const data = users;
      console.log(data);
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
            {userData.map((item , index) => {
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
                        navigateToShowProfile(item._id)
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
