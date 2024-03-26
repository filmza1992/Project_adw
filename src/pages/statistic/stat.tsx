import { Box, Container } from "@mui/system";
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
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useEffect, useState } from "react";
import { Admin } from "../../model/Admin";
import { Image } from "../../model/Image";
import { Vote } from "../../model/Vote";
import { User } from "firebase/auth";
import { BarChart } from "@mui/x-charts/BarChart";
const StatPage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const img_id = searchParams.get("img_id");
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [ImageData, setImageData] = useState<Image[]>([]);
  const [VoteData, setVoteData] = useState<Vote[]>([]);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate(); // ย้ายไปข้างบน
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type);
    }
  }, [params.id]);

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
    } else {
      const url = `http://localhost:9000/user/${id}`;
      try {
        const response = await axios.get(url);
        const users: User[] = response.data;
        const data = users.data;
        setUserData(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const url1 = `http://localhost:9000/image/user/${id}`;
      try {
        const response = await axios.get(url1);
        const imagepost: image[] = response.data;
        const data = imagepost.data;
        setImageData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const url3 = `http://localhost:9000/vote/${img_id}`;
      try {
        const response = await axios.get(url3);
        const vote: Vote[] = response.data;
        const data = vote.data;
        setVoteData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  function navigateToUpLoadProfile() {
    navigate(
      "/UpLoadProfile/" +
        data?._id +
        "/?type=" +
        type +
        "&name=" +
        data.username +
        "&phone=" +
        data.phone +
        "&birthday=" +
        data.birth_day
    ); // ใส่เช็คว่า data ไม่ใช่ null ก่อนที่จะเรียกใช้
  }
  async function DeleteImage(id: string, idvote: string) {
    const url = `http://localhost:9000/image/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const url2 = `http://localhost:9000/vote/${idvote}`;
    try {
      await axios.delete(url2);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function navigateToEditImage(id: string) {
    navigate("/changeImg/" + data?._id + "/?type=" + type + "&img_id=" + id);
  }
  function navigateToImgUploade() {
    if (VoteData.length >= 5) {
      alert("You can upload a maximum of 5 photos only.");
    } else {
      navigate("/ImageUpLoad/" + data?._id + "/?type=" + type);
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
              <h1 style={{ margin: "1.5rem" }}>My Profile </h1>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                marginRight: "3rem",

                marginBottom: "3rem",
              }}
            >
              <Card
                variant="outlined"
                orientation="horizontal"
                sx={{
                  width: "100%",
                  textAlign: "left",
                  transitionDuration: "0.6s",
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                  <img src={data?.img_url} loading="lazy" alt="" />
                </AspectRatio>
                <CardContent>
                  <Typography level="title-lg" id="card-description">
                    {data?.username}
                  </Typography>
                  <Typography
                    level="body-sm"
                    aria-describedby="card-description"
                    mb={1}
                  >
                    {data?.email}
                  </Typography>
                  <Button
                    sx={{
                      color: "rgba(100, 100, 100, 0.87)",
                    }}
                    onClick={navigateToUpLoadProfile}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
              {params.id != null && type === "0" ? (
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  sx={{ marginLeft: "1rem" }}
                  onClick={navigateToImgUploade}
                >
                  Upload Picture
                </Button>
              ) : null}
            </Box>
          </Box>
          <Box sx={{ minHeight: 350, margin: "1rem" }}>
            <Card
              variant="outlined"
              sx={(theme) => ({
                width: 300,
                gridColumn: "span 2",
                flexDirection: "row",
                flexWrap: "wrap",
                resize: "horizontal",
                overflow: "hidden",
                gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                transition: "transform 0.8s, border 0.8s",
                "&:hover": {
                  borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                  transform: "translateY(-6px)",
                },
                "& > *": {
                  minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                },
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 200,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <div style={{ textAlign: "left" }}>
                    <Typography level="title-lg">
                      {VoteData?.img.user.username}
                    </Typography>
                    <Typography level="body-sm">{data?.email}</Typography>
                  </div>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{ ml: "auto", alignSelf: "flex-start" }}
                  >
                    <Typography level="body-sm" sx={{ marginRight: "0.5rem" }}>
                      {VoteData?.point}
                    </Typography>
                    <FavoriteBorderRoundedIcon color="danger" />
                  </IconButton>
                </Box>
                <AspectRatio
                  variant="soft"
                  sx={{
                    "--AspectRatio-paddingBottom":
                      "clamp(0px, (100% - 200px) * 999, 200px)",
                    pointerEvents: "none",
                  }}
                >
                  <img alt="" src={VoteData?.img.img_url} />
                </AspectRatio>
                <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                  <Avatar
                    variant="soft"
                    color="neutral"
                    src={data?.img_url}
                  ></Avatar>
                  <div>
                    <Typography level="body-xs">Designed by</Typography>
                    <Typography level="body-sm">
                      {VoteData?.img.user.username}
                    </Typography>
                  </div>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Button
                    sx={{
                      color: "rgba(100, 100, 100, 0.87)",
                      marginRight: "1rem",
                    }}
                    onClick={() => DeleteImage(VoteData?.img._id, VoteData._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    sx={{
                      color: "rgba(100, 100, 100, 0.87)",
                      marginLeft: "1rem",
                    }}
                    onClick={() => navigateToEditImage(VoteData?.img.img_id)}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
          <div>
            <BarChart
              series={[
                { data: [35] },
                { data: [51] },
                { data: [15] },
                { data: [60] },
              ]}
              height={290}
              width={300}
              xAxis={[{ data: ["Q1"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </Box>
      </Container>
    </>
  );
};

export default StatPage;
