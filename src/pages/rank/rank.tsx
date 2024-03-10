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

const RankPage = () => {
  const arr = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  console.log(params.id);
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
                  Image name
                </th>
                <th style={{ textAlign: "center" }}>Point</th>
              </tr>
            </thead>
            {arr.map((arr, index) => {
              return (
                <tbody>
                  <tr>
                    <td>
                      <h1>{arr}</h1>
                    </td>
                    <td>
                      <img
                        src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
                        loading="lazy"
                        alt=""
                        style={{ width: "280px" }}
                      />
                    </td>
                    <td style={{}}>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Modi suscipit impedit molestias quas repellat,
                        iure mollitia? Aut eaque molestias molestiae aperiam
                        iste, quaerat dolore voluptatibus, placeat ratione
                        quibusdam illum rerum!
                      </p>
                    </td>
                    <td>
                      <h2>39</h2>
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
