import { Box, Container } from "@mui/system";

import {useParams, useSearchParams } from "react-router-dom";

import Table from "@mui/joy/Table";

import Header from "../../component/header";
import HeaderUser from "../../component/headerUser";
import HeaderAdmin from "../../component/headerAdmin";
import { Admin } from "../../model/Admin";
import { Users } from "../../model/users";
import { Vote } from "../../model/Vote";
import AspectRatio from "@mui/joy/AspectRatio";
import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../constant/endpoint";
const RankPage = () => {
  const [adminData, setAdminData] = useState<Admin>();
  const [VoteData, setVoteData] = useState<Vote[]>([]);
  const [userData, setUserData] = useState<Users>();

  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const headers = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  };
  useEffect(() => {
    if (params.id == null) {
      callApiVote();
    }
  }, [params.id]);

  async function callApiVote() {
    console.log(adminData);
    console.log(userData);
    const url2 = endpoint +`/vote`;
    try {
      const response = await axios.get(url2,headers);
      const vote: Vote[] = response.data.data;
      const data = vote;
      const seen = new Set();
      const updatedData: Vote[] = [];
      data.forEach((item) => {
        const imgId = item.img.img_id;
        if (!seen.has(imgId)) {
          seen.add(imgId);
          updatedData.push(item);
        } else {
          const existingIndex = updatedData.findIndex(
            (existingItem) => existingItem.img.img_id === imgId
          );
          if (existingIndex !== -1) {
            updatedData[existingIndex] = item;
          }
        }
      });

      // เรียงลำดับ updatedData ตามค่า point ของแต่ละอ็อบเจกต์
      updatedData.sort((a, b) => b.point - a.point);

      console.log("======updatedData=====");
      console.log(updatedData);
      setVoteData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (params.id != null) {
      callApi(params.id, type);
      callApiVote();
    }
  }, [params.id]);

  async function callApi(id: string, type: string) {
    if (type == "1") {
      const url = endpoint +`/admin/${id}`;
      try {
        const response = await axios.get(url,headers);
        const admin: Admin = response.data.data;
        const data = admin;
        setAdminData(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const url = endpoint +`/user/${id}`;
      try {
        const response = await axios.get(url,headers);
        const users: Users = response.data.data;
        const data = users;
        setUserData(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
            {VoteData.slice(0, 10).map((item,index) => {
              return (
                <tbody>
                  <tr>
                    <td>
                      <h1>{index + 1}</h1>
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
                        <img alt="" src={VoteData[index].img.img_url} />
                      </AspectRatio>
                    </td>
                    <td style={{}}>
                      <p>{item.img.user.username}</p>
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
