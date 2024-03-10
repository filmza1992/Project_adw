import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate, useParams,useSearchParams } from "react-router-dom";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import Header from "../../component/header";

import { useEffect, useRef, useState } from "react";
import { Admin } from "../../model/Admin";
import axios from "axios";
import { Button } from "@mui/material";

const AdminPage = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [data, setData] = useState<Admin[]>([]);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  useEffect(() => {
    if (params.id != null) {
      callApi(params.id);
    }
  }, [params.id]);
  console.log(params.id);
  async function callApi(id: string) {
    try {
      const url = `http://localhost:9000/admin/${id}`;
      const response = await axios.get(url);
      const admins: Admin[] = response.data;
      setData(admins);
      const admin = admins.data;
      setData(admin);
      console.log();
    } catch (error) {
        
      console.error("Error fetching data:", error);
    }
  }
  
  // navigate("/");

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
        <Box sx={{height: "50vh",display : "flex", justifyContent : "center", alignItems : "center"}}>
            <Box>
          <h1>Admin mode</h1>
          <p>Please enter time for set vote</p>
          <Box sx={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <TextField
            sx={{
              margin: "1rem",
            }}
            id="outlined-basic"
            // label="username"
            variant="outlined"
            type="number"
            inputRef={usernameRef}
          />
          <br />
          <Button
            sx={{ color: "rgba(100, 100, 100, 0.87)", width: "100px" }}
            type="submit"
            // onClick={navigateToUploadProfile}
          >
            Confirm
          </Button>
          </Box>
        </Box>
        </Box>
      </Container>
    </>
  );
};

export default AdminPage;
