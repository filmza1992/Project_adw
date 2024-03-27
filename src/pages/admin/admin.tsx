import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import Header from "../../component/header";

import { useEffect, useRef, useState } from "react";
import { Admin } from "../../model/Admin";
import { TimeSet } from "../../model/TimeSet";
import axios from "axios";
import { Button } from "@mui/material";
import { endpoint } from "../../constant/endpoint";

const AdminPage = () => {
  const timesetRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [dataAdmin, setDataAdmin] = useState<Admin>();
  const [dataTimeSet, setDataTimeSet] = useState<TimeSet[]>([]);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const headers = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  };

  useEffect(() => {
    if (params.id != null) {
      callApi(params.id);
    }
  }, [params.id]);

  async function callApi(id: string) {
    try {
      const url = endpoint +`/admin/${id}`;
      console.log(dataAdmin);
      const response = await axios.get(url,headers);
      const admins= response.data.data;
      const data = admins[0];
      setDataAdmin(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const url = endpoint +`/timeset`;
      const response = await axios.get(url,headers);
      const timesets: TimeSet[] = response.data;
      const data = timesets;
      setDataTimeSet(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function UpdateTimeSet() {
    const id = dataTimeSet[0]._id;
    const body = {
      time_set: timesetRef.current ? parseInt(timesetRef.current.value) : 0,
      create_at: new Date(), 
    };

    try {
      const url = endpoint +`/timeset/${id}`;
      const response = await axios.put(url, body);
      const result = response.data;
      console.log(result.message);
      if (result.message === "Successful operation") {
        console.log("Successful operation");
        navigate("/" + params.id + "/?type=" + type);
      } else {
        console.log("Bot Successful operation");
      }
    } catch (error) {
      console.error("Error updating time set:", error);
    }
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
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <h1>Admin mode</h1>
            <p>Please enter time for set vote</p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{
                  margin: "1rem",
                }}
                id="outlined-basic"
                variant="outlined"
                type="number"
                inputRef={timesetRef}
              />
              <br />
              <Button
                sx={{ color: "rgba(100, 100, 100, 0.87)", width: "100px" }}
                type="button"
                onClick={UpdateTimeSet}
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
