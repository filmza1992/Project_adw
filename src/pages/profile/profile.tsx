import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import Header from "../../component/headerUser";
import CardProfile from "../../component/cardProfile";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
const ProfilePage = () => {
  const arr = [1, 2, 3, 4, 5];
  const Component = styled.div`
    color: #d1d1d1;
    background: rgba(100, 100, 100, 0.87);
    margin: 1rem;
  `;
  const navigate = useNavigate();
//   function navigateTo() {
//     navigate("/");
//   }
  function navigateToEditImage() {
    navigate("/changeImg");
  }
  return (
    <>
      <Header></Header>
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
              <h1>My Profile </h1>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                marginRight: "3rem",
                marginBottom: "3rem",
              }}
            >
              <CardProfile></CardProfile>
            </Box>
          </Box>
          <div>
            <Grid
              container
              spacing={0.5}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ flexGrow: 1 }}
            >
              {arr.map(() => {
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
                                Yosemite National Park
                              </Link>
                            </Typography>
                            <Typography level="body-sm">
                              California, USA
                            </Typography>
                          </div>
                          <IconButton
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: "auto", alignSelf: "flex-start" }}
                          >
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
                          <img
                            alt=""
                            src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
                          />
                        </AspectRatio>
                        <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                          <Avatar variant="soft" color="neutral">
                            Y
                          </Avatar>
                          <div>
                            <Typography level="body-xs">Designed by</Typography>
                            <Typography level="body-sm">
                              Nature itself
                            </Typography>
                          </div>
                        </Box>
                        <Button
                          sx={{
                            color: "rgba(100, 100, 100, 0.87)",
                          }}
                          onClick={navigateToEditImage}
                        >
                          Edit Image
                        </Button>
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

export default ProfilePage;
