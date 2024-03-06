import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Users } from "../model/users";

function CardProfile(data) {
 
  function navigateToUpLoadProfile() {
    navigate("/UpLoadProfile/"+data.data._id);
  }
  const navigate = useNavigate();
  console.log(data.data.username);
  return (
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
        <img src={data.data.img_url} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {data.data.username}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          {/* <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: "text.tertiary" }}
          > */}
          {data.data.email}
          {/* </Link> */}
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
  );
}

export default CardProfile;
