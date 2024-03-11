import { Box, Container } from "@mui/system";
import HeaderUser from "../../component/headerUser";
import Header from "../../component/header";
import HeaderAdmin from "../../component/headerAdmin";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Avatar } from "@mui/joy"; // Import Avatar from "@mui/joy" instead of "@mui/joy/Avatar"
import {
  Typography,
  IconButton,
  Button,
  Toolbar,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import Card from "@mui/joy/Card";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Users } from "../../model/users";
import axios from "axios";
import { Vote } from "../../model/Vote";
import { TimeSet } from "../../model/TimeSet";
import { useState, useEffect } from "react";

import AspectRatio from "@mui/joy/AspectRatio";
function HomePage() {
  const params = useParams();
  const [userData, setUserData] = useState<Users[]>([]);
  const [VoteData, setVoteData] = useState<Vote[]>([]);
  const [VoteWinData, setVoteWinData] = useState<Vote[]>([]);
  const [VoteLossData, setVoteLossData] = useState<Vote[]>([]);
  const [TimeSetData, setTimeSetData] = useState<TimeSet[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate(); // ย้ายไปข้างบน

  async function delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (params.id == null) {
      callApiTimeSet();
    }
  }, [params.id]);

  useEffect(() => {
    if (TimeSetData.length > 0 && params.id == null) {
      const loadDataAsync = async () => {
        await delay(TimeSetData[0]?.time_set * 1000);
        setIsLoadingData(false);
        callApiVote(params.id);
      };
      loadDataAsync();
    }
  }, [TimeSetData, params.id]);

  async function callApiVote(id: string) {
    const url2 = `http://localhost:9000/vote`;
    try {
      const response = await axios.get(url2);
      const vote: Vote[] = response.data;
      const data = vote.data;
      setVoteData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    if (params.id != null) {
      callApiTimeSet();
    }
  }, [params.id]);
  useEffect(() => {
    if (TimeSetData.length > 0 && params.id != null) {
      const loadDataAsync = async () => {
        await delay(TimeSetData[0]?.time_set * 1000);
        setIsLoadingData(false);
        console.log(TimeSetData[0]?.time_set * 1000);
        callApi(params.id);
      };
      loadDataAsync();
    }
  }, [TimeSetData, params.id]);
  async function callApiTimeSet() {
    const url2 = `http://localhost:9000/timeset`;
    try {
      const response = await axios.get(url2);
      const timeset: TimeSet[] = response.data;
      const data = timeset.data;
      setTimeSetData(data);
      console.log("====dataTimeSet====");
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function callApi(id: string) {
    const url = `http://localhost:9000/user/${id}`;
    try {
      const response = await axios.get(url);
      const users: Users[] = response.data;
      const data = users.data;
      setUserData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const url2 = `http://localhost:9000/vote`;
    try {
      const response = await axios.get(url2);
      const vote: Vote[] = response.data;
      const data = vote.data;

      setVoteData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [players, setPlayers] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (VoteData.length > 0) {
      selectRandomPlayers();
      setIsLoading(false);
    }
  }, [VoteData]);

  const selectRandomPlayers = () => {
    const playersCopy = [...VoteData];
    const selectedPlayers: Vote[] = [];

    while (selectedPlayers.length < 2 && playersCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * playersCopy.length);
      const selectedPlayer = playersCopy.splice(randomIndex, 1)[0];
      selectedPlayers.push(selectedPlayer);
    }

    setPlayers(selectedPlayers);
  };

  const updateElo = (winnerId: string, loserId: string) => {
    const kFactor = 30; // ค่าคงที่ K ใน Elo Rating Algorithm

    const winnerIndex = players.findIndex((player) => player._id === winnerId);
    const loserIndex = players.findIndex((player) => player._id === loserId);

    const winner = players[winnerIndex];
    const loser = players[loserIndex];

    const expectedWinProbabilityWinner =
      1 / (1 + 10 ** ((loser.point - winner.point) / 400));
    const expectedWinProbabilityLoser =
      1 / (1 + 10 ** ((winner.point - loser.point) / 400));

    const newEloWinner =
      winner.point + kFactor * (1 - expectedWinProbabilityWinner);
    const newEloLoser =
      loser.point + kFactor * (0 - expectedWinProbabilityLoser);

    const updatedPlayers = [...players];
    updatedPlayers[winnerIndex].point = Math.round(newEloWinner);
    updatedPlayers[loserIndex].point = Math.round(newEloLoser);
    setPlayers(updatedPlayers);
    // window.location.reload();
    updatePointWin(
      winnerId,
      Math.round(newEloWinner),
      loserId,
      Math.round(newEloLoser)
    );
  };

  const handleVote = (winnerId: string, loserId: string) => {
    updateElo(winnerId, loserId);
    // แสดงผลคะแนนใหม่หลังจากการคำนวณ
    console.log(players);
  };
  console.log("======== data players =========");
  console.log(players);

  async function updatePointWin(
    winnerId: string,
    pointWinner: number,
    loserId: string,
    pointLoss: number
  ) {
    if (pointLoss <= 0) {
      pointLoss = 0;
    }
    try {
      const responseWinner = await axios.get(
        `http://localhost:9000/vote/${winnerId}`
      );
      const winnerData: Vote[] = responseWinner.data.data;

      await upPointWin(winnerData, pointWinner);

      const responseLoser = await axios.get(
        `http://localhost:9000/vote/${loserId}`
      );
      const loserData: Vote[] = responseLoser.data.data;

      await upPointLoss(loserData, pointLoss);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function upPointWin(voteData: Vote[], pointWinner: number) {
    const bodywinner = {
      point: pointWinner, // ตั้งค่า point ตามที่ต้องการ
      img: {
        img_id: voteData.img.img_id, // กำหนด img_id ตามที่ต้องการ
        img_url: voteData.img.img_url, // กำหนด img_url ตามที่ต้องการ
        user: {
          user_id: voteData.img.user.user_id, // กำหนด user_id ตามที่ต้องการ
          username: voteData.img.user.username, // กำหนด username ตามที่ต้องการ
          photoURL: voteData.img.user.photoURL, // กำหนด photoURL ตามที่ต้องการ
        },
      },
      create_at: new Date(),
    };
    const urlwinner = `http://localhost:9000/vote/${voteData._id}`;
    const responsewinner = await axios.put(urlwinner, bodywinner);
    const resultwinner = responsewinner.data;
    console.log(resultwinner.message);
    if (resultwinner.message == "Successful operation") {
      console.log("Successful Update Winner Vote");
      // navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      console.log("Update Vote not successfully");
    }
  }
  async function upPointLoss(voteData: Vote[], pointLoss: number) {
    const bodyloser = {
      point: pointLoss, // ตั้งค่า point ตามที่ต้องการ
      img: {
        img_id: voteData.img.img_id, // กำหนด img_id ตามที่ต้องการ
        img_url: voteData.img.img_url, // กำหนด img_url ตามที่ต้องการ
        user: {
          user_id: voteData.img.user.user_id, // กำหนด user_id ตามที่ต้องการ
          username: voteData.img.user.username, // กำหนด username ตามที่ต้องการ
          photoURL: voteData.img.user.photoURL, // กำหนด photoURL ตามที่ต้องการ
        },
      },
      create_at: new Date(),
    };
    const urlloser = `http://localhost:9000/vote/${voteData._id}`;
    const responseloser = await axios.put(urlloser, bodyloser);
    const resultloser = responseloser.data;
    console.log(resultloser.message);
    if (resultloser.message == "Successful operation") {
      console.log("Successful Update Loss Vote");
      window.location.reload();
    } else {
      console.log("Update Vote not successfully");
    }
  }
  const CountdownTimer = ({ onComplete }) => {
    const [count, setCount] = useState(TimeSetData[0]?.time_set);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
      if (count === 0) {
        onComplete();
      }
    }, [count, onComplete]);

    return <div>{count}</div>;
  };
  function navigateToShowProfile(id: string) {
    navigate("/ShowProfile/" + params.id + "/?type=" + type + "&showid=" + id);
  }
  return (
    <>
      {isLoadingData ? (
        // แสดง UI สำหรับการโหลดข้อมู
        <>
          {params.id != null && type === "0" ? (
            <HeaderUser data={params.id} type={type} />
          ) : params.id != null && type === "1" ? (
            <HeaderAdmin data={params.id} type={type} />
          ) : (
            <Header />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <h1 style={{fontSize : "170px" , fontWeight : "300px"}}>
              <CountdownTimer onComplete={undefined} />
            </h1>
          </Box>
        </>
      ) : (
        // แสดง UI หลังจากโหลดข้อมูลเสร็จสมบูรณ์
        <>
          {params.id != null && type === "0" ? (
            <HeaderUser data={params.id} type={type} />
          ) : params.id != null && type === "1" ? (
            <HeaderAdmin data={params.id} type={type} />
          ) : (
            <Header />
          )}

          <Container
            sx={{ marginTop: "2rem", placeItems: "center", minWidth: "320px" }}
          >
            <Box sx={{}}>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "bolder",
                  marginBottom: "1.5rem",
                }}
              >
                Choose the picture you like
              </div>
              <Toolbar sx={{}}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
                <Box sx={{ minHeight: 350, margin: "1rem" }}>
                  <Card
                    variant="outlined"
                    sx={(theme) => ({
                      width: 300,
                      gridColumn: "span 2",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      resize: "horizontal",
                      overflow: "hidden",
                      gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                      transition: "transform 0.8s, border 0.8s",
                      "&:hover": {
                        borderColor:
                          theme.vars.palette.primary.outlinedHoverBorder,
                        transform: "translateY(-6px)",
                      },
                      "& > *": {
                        minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                      },
                    })}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: 200,
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <div
                          style={{
                            textAlign: "left",
                            display: "flex",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigateToShowProfile(players[0]?.img.user.user_id)
                          }
                        >
                          <Avatar
                            variant="soft"
                            color="neutral"
                            src={players[0]?.img.user.photoURL}
                          ></Avatar>
                          <Typography sx={{ marginLeft: "1rem" }} variant="h6">
                            {players[0]?.img.user.username}
                          </Typography>
                        </div>

                        <IconButton
                          size="small"
                          variant="plain"
                          color="neutral"
                          sx={{ ml: "auto", alignSelf: "flex-start" }}
                        >
                          <FavoriteBorderRoundedIcon color="danger" />
                        </IconButton>
                      </Box>
                      <AspectRatio
                        variant="soft"
                        sx={{
                          "--AspectRatio-paddingBottom":
                            "clamp(0px, (100% - 200px) * 999, 200px)",
                          pointerEvents: "none",
                        }}
                      >
                        <img alt="" src={players[0]?.img.img_url} />
                      </AspectRatio>
                      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                        {/* <Avatar variant="soft" color="neutral" src={data?.img_url}></Avatar> */}
                        <div>
                          {/* Changed level="body-xs" to variant="body2" */}
                          {/* <Typography variant="body2">{data.username}</Typography>*/}
                        </div>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Button
                          sx={{ color: "rgba(100, 100, 100, 0.87)" }}
                          onClick={() =>
                            handleVote(players[0]._id, players[1]._id)
                          }
                        >
                          Vote
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
                <Box sx={{ minHeight: 350, margin: "1rem" }}>
                  <Card
                    variant="outlined"
                    sx={(theme) => ({
                      width: 300,
                      gridColumn: "span 2",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      resize: "horizontal",
                      overflow: "hidden",
                      gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                      transition: "transform 0.8s, border 0.8s",
                      "&:hover": {
                        borderColor:
                          theme.vars.palette.primary.outlinedHoverBorder,
                        transform: "translateY(-6px)",
                      },
                      "& > *": {
                        minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                      },
                    })}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: 200,
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <div
                          style={{
                            textAlign: "left",
                            display: "flex",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigateToShowProfile(players[1]?.img.user.user_id)
                          }
                        >
                          <Avatar
                            variant="soft"
                            color="neutral"
                            src={players[1]?.img.user.photoURL}
                          ></Avatar>
                          <Typography sx={{ marginLeft: "1rem" }} variant="h6">
                            {players[1]?.img.user.username}
                          </Typography>
                        </div>

                        <IconButton
                          size="small"
                          variant="plain"
                          color="neutral"
                          sx={{ ml: "auto", alignSelf: "flex-start" }}
                        >
                          <FavoriteBorderRoundedIcon color="danger" />
                        </IconButton>
                      </Box>
                      <AspectRatio
                        variant="soft"
                        sx={{
                          "--AspectRatio-paddingBottom":
                            "clamp(0px, (100% - 200px) * 999, 200px)",
                          pointerEvents: "none",
                        }}
                      >
                        <img alt="" src={players[1]?.img.img_url} />
                      </AspectRatio>
                      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                        <div>
                          {/* Changed level="body-xs" to variant="body2" */}
                          {/* <Typography variant="body2">{data.username}</Typography>*/}
                        </div>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Button
                          sx={{ color: "rgba(100, 100, 100, 0.87)" }}
                          onClick={() =>
                            handleVote(players[1]._id, players[0]._id)
                          }
                        >
                          Vote
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
              </Toolbar>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default HomePage;
