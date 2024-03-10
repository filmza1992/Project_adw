import { Box, Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Header from "../../component/header";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import { Admin } from "../../model/Admin";
import { Users } from "../../model/users";
import { Image } from "../../model/Image";
import { Vote } from "../../model/Vote";
import AspectRatio from "@mui/joy/AspectRatio";
import axios from "axios";
import { useEffect, useState } from "react";
const RankPage = () => {
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [ImageData, setImageData] = useState<Image[]>([]);
  const [VoteData, setVoteData] = useState<Vote[]>([]);
  const [userData, setUserData] = useState<Users[]>([]);
  const [Resultdata, setData] = useState<any>(null);
  const arr = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type);
    }
  }, [params.id]);

  async function callApi(id: string, type: string) {
    if (type == "1") {
      const url = `http://localhost:9000/admin/${id}`;
      try {
        const response = await axios.get(url);
        const admin: Admin[] = response.data;
        const data = admin.data;
        setAdminData(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const url = `http://localhost:9000/user/${id}`;
      try {
        const response = await axios.get(url);
        const users: Users[] = response.data;
        const data = users.data;
        setUserData(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const url2 = `http://localhost:9000/vote/sort`;
    try {
      const response = await axios.get(url2);
      const vote: Vote[] = response.data;
      const data = vote.data;
      setVoteData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  console.log(ImageData);


  return (
    <>
      {params.id != null && type === "0" ? (
        <HeaderUser data={params.id} type={type} />
      ) : params.id != null && type === "1" ? (
        <HeaderAdmin data={params.id} type={type} />
      ) : (
        <Header />
      )}
      <Container sx={{ marginTop: "1.5rem" }}>
        <Box sx={{}}>
          <Table
            aria-label="table with ellipsis texts"
            noWrap
            sx={{ mx: "auto", width: 750 }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Rank</th>
                <th style={{ width: "40%", textAlign: "center" }}>Image</th>
                <th style={{ width: "30%", textAlign: "center" }}>
                Image owner's name
                </th>
                <th style={{ textAlign: "center" }}>Point</th>
              </tr>
            </thead>
            {VoteData.slice(0, 10).map((arr, index) => {
              return (
                <tbody>
                  <tr>
                    <td>
                      <h1>{index+1}</h1>
                    </td>
                    <td>
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
                            src={VoteData[index].img.img_url}
                          />
                        </AspectRatio>
                    </td>
                    <td style={{}}>
                      <p>
                      {VoteData[index].img.user.username}
                      </p>
                    </td>
                    <td>
                      <h2>{VoteData[index].point}</h2>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Box>
      </Container>
    </>
  );
};

export default RankPage;



  
