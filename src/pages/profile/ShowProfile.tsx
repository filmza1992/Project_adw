import { Box, Container} from "@mui/system";
import {  Grid } from "@mui/material";
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
import { Image } from "../../model/Image";
import { Users } from "../../model/users";
import { endpoint } from "../../constant/endpoint";

const ShowProfilePage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const showid = searchParams.get("showid");
  const [ImageData, setImageData] = useState<Image[]>([]);
  const [data, setData] = useState<Users>();

  
  const headers = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  };

  useEffect(() => {
    if (showid != null) {
      callApi(showid);
    }
  }, [showid]);

  async function callApi(id: string) {
    
      const url = endpoint +`/user/${id}`;
      try {
        const response = await axios.get(url,headers);
        const users = response.data.data;
        const data = users;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const url1 = endpoint +`/image/user/${id}`;
      try {
        const response = await axios.get(url1,headers);
        const imagepost: Image[] = response.data.data;
        const data = imagepost;
        setImageData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
              <h1>{data?.username} Profile </h1>
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
                  
                </CardContent>
              </Card>
              
            </Box>
          </Box>
          <div>
            <Grid 
              container
              spacing={0.5}

              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ flexGrow: 1 ,marginLeft : "2.5rem"}}
            >
              {ImageData.map((item)  => {
                return (
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
                              {data?.username}
                            </Typography>
                            <Typography level="body-sm">
                              {data?.email}
                            </Typography>
                          </div>
                          <IconButton
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: "auto", alignSelf: "flex-start" }}
                          >
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
                          <img
                            alt=""
                            src={item.img_url}
                          />
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
                              {data?.username}
                            </Typography>
                          </div>
                        </Box>
                        
                      </Box>
                    </Card>
                  </Box>
                );
              })}
            </Grid>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default ShowProfilePage;
