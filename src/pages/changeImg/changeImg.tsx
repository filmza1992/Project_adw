import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../../component/headerUser";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import CardProfile from "../../component/cardProfile";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Button } from "@mui/material";

const ChangeImgPage = () => {
  const Component = styled.div`
    color: #d1d1d1;
    background: rgba(100, 100, 100, 0.87);
    margin: 1rem;
  `;
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }
  return (
    <>
      <Header></Header>
      <Container sx={{}}>
        <Box sx={{}}>
          <h1>Edit Image</h1>
          {/* <CardProfile></CardProfile> */}
          <Box
            sx={{
              minHeight: 350,
              margin: "3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
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
                transition: "transform 0.3s, border 0.3s",
                "&:hover": {
                  borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                  transform: "translateY(-2px)",
                },
                "& > *": {
                  minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                },
              })}
            >
              <AspectRatio
                variant="soft"
                sx={{
                  flexGrow: 1,
                  display: "contents",
                  "--AspectRatio-paddingBottom":
                    "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 200,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <div>
                    <Typography level="title-lg">
                      <Link
                        href="#container-responsive"
                        overlay
                        underline="none"
                        sx={{
                          color: "text.primary",
                          "&.Mui-focusVisible:after": {
                            outlineOffset: "-4px",
                          },
                        }}
                      >
                        Picture Name ...
                      </Link>
                    </Typography>
                    <Typography level="body-sm">Picture Title ...</Typography>
                  </div>
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
                    src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
                  />
                </AspectRatio>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    mt: "auto",
                    padding: "0.3rem",
                  }}
                >
                  <div>
                    <Typography level="body-xs">Point of Image</Typography>
                    <Typography level="body-sm">2nd place</Typography>
                  </div>

                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{ ml: "auto", alignSelf: "flex-start" }}
                  >
                    <FavoriteBorderRoundedIcon color="danger" />
                    999
                  </IconButton>
                </Box>
                <TextField type="file" size="small" onChange={selectFile} />

                <Button
                  sx={{
                    color: "rgba(100, 100, 100, 0.87)",
                  }}
                //   onClick={navigateToHome}
                  onClick={upload}
                >
                  Upload File
                </Button>
              </Box>
            </Card>
          </Box>
          {/* <video
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"
            />
          </video> */}
        </Box>
      </Container>
    </>
  );
  function selectFile() {}

  function upload() {
    navigate("/profile");
  }
};

export default ChangeImgPage;
