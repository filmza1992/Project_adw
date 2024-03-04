
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CardProfile() {
  const navigate = useNavigate();

  function navigateToProfil() {
    navigate("/UpLoadProfile");
  }
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
      <AspectRatio ratio="1" sx={{ width: 90 }} >
        <img src="src\assets\test.jpg" loading="lazy" alt=""/>
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          Phirada Thaworn
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          {/* <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: "text.tertiary" }}
          > */}
          64011212035@msu.ac.th
          {/* </Link> */}
        </Typography>
        <Button
          sx={{
            color: "rgba(100, 100, 100, 0.87)",
          }}
          onClick={navigateToProfil}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardProfile;
