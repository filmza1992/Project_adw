import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/joy/Avatar";
import { useNavigate } from "react-router-dom";

function Header({ data, type }) {
  const img = null;
  console.log("from headAdmin "+data);
  function setImg(img: string) {
    this.img = img;
  }
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/"+data+"/?type="+type);
  }
  function navigateToRank() {
    navigate("/rank/"+data+"/?type="+type);
  }
  function navigateToProfile() {
    navigate("/profile/"+data+"/?type="+type);
  }
  function navigateToAdmin() {
    navigate("/admin/"+data+"/?type="+type);
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
            <div onClick={navigateToHome} style={{ cursor: "pointer" }}>
              View
            </div>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={navigateToAdmin}>
              Admin mode
            </Button>
            <Button color="inherit" onClick={navigateToHome}>
              Home
            </Button>
            <Button color="inherit" onClick={navigateToRank}>
              Rank
            </Button>
            <Button color="inherit" onClick={navigateToProfile}>
              Profile
            </Button>
            <Button color="inherit" onClick={navigateToLogin}>
              Logout
            </Button>
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
