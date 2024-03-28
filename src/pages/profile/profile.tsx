import { Box, Container} from "@mui/system";
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

import { Vote } from "../../model/Vote";
import { Users } from "../../model/users";
import { endpoint } from "../../constant/endpoint";
import { Image } from "../../model/Image";

const ProfilePage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [VoteData, setVoteData] = useState<Vote[]>([]);
  const [image , setImage] = useState<Image[]>([]);
  const [data, setData] = useState<Users>();
  const navigate = useNavigate(); // ย้ายไปข้างบน

  const headers = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  };
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type || "");
    }
  }, [params.id]);

  async function callApi(id: string, type: string) {
    let img : Image[];
    if (type == "1") {
      
      const url = endpoint +`/admin/${id}`;
      try {
        const response = await axios.get(url,headers);
        const userData = response.data.data;

        setData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.log(id);
      const url = endpoint +`/user/${id}`;
      try {
        const response = await axios.get(url,headers);
        const userData = response.data.data;

        setData(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const url1 = endpoint +`/image/user/${id}`;
      try {
        const response = await axios.get(url1,headers);
        const data = response.data.data;
        setImage(data);
        console.log(image);
        img = data;
        console.log(img);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const url2 = endpoint +`/vote/user/${id}`;
      try {
        const response = await axios.get(url2,headers);
        const voteData: Vote[] = response.data.data;
        const voteSort = voteData.slice().sort((a,b)=>b.create_at - a.create_at);
        console.log(voteSort);
        const vote: Vote[] = [];
        for(const i of img){
          console.log(i._id);
          for(const voteS of voteSort){
            if(i._id == voteS.img.img_id){
              vote.push(voteS);
              console.log(voteS);
              break;
            }
          }
        }
        console.log(vote);
        const data = vote;
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
        data?.username +
        "&phone=" +
        data?.phone +
        "&birthday=" +
        data?.birth_day
    ); // ใส่เช็คว่า data ไม่ใช่ null ก่อนที่จะเรียกใช้
  }
  async function DeleteImage(id: string, idvote: string) {
    const url = endpoint +`/image/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const url2 = endpoint +`/vote/${idvote}`;
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
  function navigateToStat(id: string) {
    navigate("/stat/" + data?._id + "/?type=" + type + "&img_id=" + id);
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
              <h1 style={{ margin: "1.5rem" }}>Statistics</h1>
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
          <div>
            <Grid
              container
              spacing={0.5}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ flexGrow: 1 }}
            >
              {VoteData.map((item, index) => (
                <Box key={index} sx={{ minHeight: 350, margin: "1rem" }}>
                  <Card
                    variant="outlined"
                    onClick={() => navigateToStat(item._id)}
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
                        borderColor:
                          theme.vars.palette.primary.outlinedHoverBorder,
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
                            {item.img.user.username}
                          </Typography>
                          <Typography level="body-sm">{data?.email}</Typography>
                        </div>
                        <IconButton
                          size="sm"
                          variant="plain"
                          color="neutral"
                          sx={{ ml: "auto", alignSelf: "flex-start" }}
                        >
                          <Typography
                            level="body-sm"
                            sx={{ marginRight: "0.5rem" }}
                          >
                            {item.point}
                          </Typography>
                          <FavoriteBorderRoundedIcon />
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
                        <img alt="" src={item.img.img_url} />
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
                            {item.img.user.username}
                          </Typography>
                        </div>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Button
                          sx={{
                            color: "rgba(100, 100, 100, 0.87)",
                            marginRight: "1rem",
                          }}
                          onClick={() => DeleteImage(item.img.img_id, item._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          sx={{
                            color: "rgba(100, 100, 100, 0.87)",
                            marginLeft: "1rem",
                          }}
                          onClick={() => navigateToEditImage(item.img.img_id)}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Grid>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
