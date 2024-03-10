import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/joy/Avatar";
import { useNavigate } from "react-router-dom";
import { Users } from "../../model/users";
import axios from "axios";
import { useState, useEffect } from "react";
function Header({ data, type }) {

  const [dataUser, setDataUser] = useState<Users[]>([]);
  console.log("data from headUser ");
  console.log(data);
  console.log("type from headUser ");
  console.log(type);
  callApiHeader(data)
  function setImg(img: string) {
    this.img = img;
  }
  
  async function callApiHeader(id: string) {
      const url = `http://localhost:9000/user/${id}`;
      try {
        const response = await axios.get(url);
        const imagepost: Users[] = response.data;
        const datacheck = imagepost.data;
        setDataUser(datacheck);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
         <Avatar alt="Remy Sharp" src={dataUser.img_url} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
