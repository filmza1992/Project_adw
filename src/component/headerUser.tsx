import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/joy/Avatar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }
  function navigateToRank() {
    navigate("/rank");
  }
  function navigateToProfile() {
    navigate("/profile");
  }
  function navigateToLogin() {
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "#d1d1d1", color: "rgba(100, 100, 100, 0.87)" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div onClick={navigateToHome} style={{cursor : "pointer"}}>View</div>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={navigateToHome}>
              Home
            </Button>
            <Button color="inherit" onClick={navigateToRank}>
              Rank
            </Button>
            <Button color="inherit" onClick={navigateToProfile}>
              Profile
            </Button><Button color="inherit" onClick={navigateToLogin}>
              Logout
            </Button>
          </Typography>
          <Avatar alt="Remy Sharp" onClick={navigateToProfile} sx={{cursor : "pointer"}} src="src\assets\test.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
