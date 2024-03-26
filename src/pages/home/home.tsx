import { Box, Container } from "@mui/system";
import HeaderUser from "../../component/headerUser";
import Header from "../../component/header";
import HeaderAdmin from "../../component/headerAdmin";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Avatar } from "@mui/joy"; // Import Avatar from "@mui/joy" instead of "@mui/joy/Avatar"
import { Typography, IconButton, Button, Toolbar } from "@mui/material";
import Card from "@mui/joy/Card";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Users } from "../../model/users";
import axios from "axios";
import { Vote } from "../../model/Vote";
import { TimeSet } from "../../model/TimeSet";
import { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import React from "react";
import { Image } from "../../model/Image";
function HomePage() {
  const params = useParams();
  const [userData, setUserData] = useState<Users[]>([]);
  const [ImageData, setImageData] = useState<Image[]>([]);
  const [VoteData, setVoteData] = useState<Vote[]>([]);
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
    const url3 = `http://localhost:9000/image`;
    try {
      const response = await axios.get(url3);
      const image: Image[] = response.data;
      const data = image.data;
      setImageData(data);
      console.log(data);
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

  const [playerscall, setPlayerscall] = useState<Image[]>([]);
  const [Votep1Data, setVotep1Data] = useState<Vote[]>([]);
  const [Votep2Data, setVotep2Data] = useState<Vote[]>([]);
  const [players, setPlayers] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const kFactor = 30; // ค่าคงที่ K ใน Elo Rating Algorithm

  useEffect(() => {
    if (ImageData.length > 0) {
      selectRandomPlayers(); // คำสั่งนี้
      setIsLoading(false);
    }
  }, [ImageData]);

  useEffect(() => {
    if (playerscall.length > 0) {
      callpl();
    }
  }, [playerscall]);

  const selectRandomPlayers = () => {
    const playersCopy = [...ImageData];
    const selectedPlayers: Image[] = [];

    while (selectedPlayers.length < 2 && playersCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * playersCopy.length);
      const selectedPlayer = playersCopy.splice(randomIndex, 1)[0];
      selectedPlayers.push(selectedPlayer);
    }
    setPlayerscall(selectedPlayers);
  };
  //
  function callpl() {
    if (playerscall !== null) {
      callApiVoteForplayer1(playerscall[0]?._id);
      callApiVoteForplayer2(playerscall[1]?._id);
    }
  }
  async function callApiVoteForplayer1(id: string) {
    console.log(
      "=========== callApiVoteForplayer1(playerscall[0]?._id); =======" + id
    );
    const url = `http://localhost:9000/vote/image/${id}`;
    try {
      const response = await axios.get(url);
      const vote: Vote[] = response.data;
      const data = vote.data;
      setVotep1Data(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function callApiVoteForplayer2(id: string) {
    console.log(
      "=========== callApiVoteForplayer1(playerscall[0]?._id); =======" + id
    );
    const url = `http://localhost:9000/vote/image/${id}`;
    try {
      const response = await axios.get(url);
      const vote: Vote[] = response.data;
      const data = vote.data;
      setVotep2Data(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  let lastItem1: unknown;
  if (Votep1Data.length > 0) {
    lastItem1 = Votep1Data[Votep1Data.length - 1];
  }
  let lastItem2: unknown;
  if (Votep2Data.length > 0) {
    lastItem2 = Votep2Data[Votep2Data.length - 1];
  }
  // ใน useEffect หรือฟังก์ชันที่ทำการรวมข้อมูล
  useEffect(() => {
    // สร้าง array ใหม่เพื่อเก็บข้อมูลทั้งหมด
    const allPlayersData = [];
    if (lastItem1) allPlayersData.push(lastItem1);
    if (lastItem2) allPlayersData.push(lastItem2);

    // ตั้งค่าใหม่ให้กับตัวแปร players
    setPlayers(allPlayersData);
    sets1point(lastItem1?.point);
    sets2point(lastItem2?.point);
  }, [lastItem1, lastItem2]);

  const [s1win, setS1Win] = useState(false);
  const [s2win, setS2Win] = useState(false);

  const updateElo = (winnerId: string, loserId: string) => {
    const winnerIndex = players.findIndex((player) => player._id === winnerId);
    const loserIndex = players.findIndex((player) => player._id === loserId);

    const winner = players[winnerIndex];
    const loser = players[loserIndex];

    const expectedWinProbabilityWinner =
      1 / (1 + 10 ** ((loser.point - winner.point) / 400));
    const expectedWinProbabilityLoser =
      1 / (1 + 10 ** ((winner.point - loser.point) / 400));
    console.log("console.log(expectedWinProbabilityWinner)");
    console.log(expectedWinProbabilityWinner);
    console.log(expectedWinProbabilityLoser);
    const newEloWinner =
      winner.point + kFactor * (1 - expectedWinProbabilityWinner);
    const newEloLoser =
      loser.point + kFactor * (0 - expectedWinProbabilityLoser);

    const updatedPlayers = [...players];
    updatedPlayers[winnerIndex].point = Math.round(newEloWinner);
    updatedPlayers[loserIndex].point = Math.round(newEloLoser);
    setPlayers(updatedPlayers);

    // window.location.reload();
    if (winnerId === players[0]._id) {
      setS1Win(true);
      setS2Win(false);
    } else {
      setS1Win(false);
      setS2Win(true);
    }
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

    console.log(playerscall);
  };
  const [setpoint0, sets1point] = useState(null);
  const [setpoint1, sets2point] = useState(null);
  const [persistentSetpoint1, setPersistentSetpoint1] = useState(null);

  console.log("======== data players =========");
  console.log(playerscall);
  console.log("======== data players Vote =========");
  console.log(players);
  console.log("======== data Votep1Data Vote =========");
  console.log(lastItem1);
  console.log("======== data Votep2Data Vote =========");
  console.log(lastItem2);
  console.log("======== data persistentSetpoint1 Vote =========");
  console.log(persistentSetpoint1);
  useEffect(() => {
    // เมื่อ players array เปลี่ยนแปลง อัพเดทค่า persistentSetpoint1
    setPersistentSetpoint1(players[1]?.point);
  }, [players]);
  console.log("======== data setpoint0 =========");
  console.log(setpoint0);
  console.log("======== data setpoint0 =========");
  console.log(setpoint1);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

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
    const urlwinner = `http://localhost:9000/vote`;
    const responsewinner = await axios.post(urlwinner, bodywinner);
    const resultwinner = responsewinner.data;
    console.log(resultwinner.message);
    if (resultwinner.message == "created Vote successfully") {
      console.log("Successful Update Winner Vote");
      // navigate("/profile/" + params.id + "/?type=" + type);
    } else {
      console.log("created Vote not successfully");
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
    const urlloser = `http://localhost:9000/vote`;
    const responseloser = await axios.post(urlloser, bodyloser);
    const resultloser = responseloser.data;
    console.log(resultloser.message);
    if (resultloser.message == "created Vote successfully") {
      console.log("Successful Update Loss Vote");

      handleClickOpen();
    } else {
      console.log("created Vote not successfully");
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
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
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
                      <FavoriteBorderRoundedIcon />
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
                      onClick={() => handleVote(players[0]._id, players[1]._id)}
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
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
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
                      <FavoriteBorderRoundedIcon />
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
                      onClick={() => handleVote(players[1]._id, players[0]._id)}
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
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth={maxWidth}
          >
            <DialogContent sx={{ background: "#333" }}>
              <DialogContentText>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    p: 1,
                    m: 1,
                    bgcolor: "333",
                    color: "white",
                    borderRadius: 1,
                  }}
                >
                  <div style={{ margin: "1rem", padding: "2rem" }}>
                    {s1win ? (
                      <h1
                        style={{
                          color: "rgb(114,224,80)",
                          textAlign: "center",
                        }}
                      >
                        Winner
                      </h1>
                    ) : (
                      <h1
                        style={{
                          color: "rgb(224,80,100)",
                          textAlign: "center",
                        }}
                      >
                        Loss
                      </h1>
                    )}

                    <img
                      alt=""
                      style={{
                        maxHeight: "300px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "2rem",
                        marginTop: "2rem",
                      }}
                      src={players[0]?.img.img_url}
                    />
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                      Point : {setpoint0}
                      <br />
                      ค่า K = {kFactor}
                      {s1win ? (
                        <>
                          <p>
                            EA = 1 / (1 + 10 ^ (({setpoint1} - {setpoint0}) /
                            400))
                          </p>
                          <p>
                            New Point : {setpoint0} + {kFactor} (1 -{" "}
                            {(
                              1 / (1 + 10 ** ((setpoint1 - setpoint0) / 400)) ||
                              0
                            ).toFixed(2)}
                            ) = {players[0]?.point}
                          </p>
                          <br />
                          <h1
                            style={{
                              textAlign: "center",
                              color: "rgb(98,217,129)",
                            }}
                          >
                            {players[0]?.point} Point!
                          </h1>
                        </>
                      ) : (
                        <>
                          <p>
                            EA = 1 / (1 + 10 ** (({setpoint1} - {setpoint0}) /
                            400))
                          </p>
                          <p>
                            New Point : {setpoint0} + {kFactor} (1 -{" "}
                            {(
                              1 / (1 + 10 ** ((setpoint1 - setpoint0) / 400)) ||
                              0
                            ).toFixed(2)}
                            )= {players[0]?.point}
                          </p>
                          <br />
                          <h1
                            style={{
                              textAlign: "center",
                              color: "rgb(217,98,134)",
                            }}
                          >
                            {players[0]?.point} Point!
                          </h1>
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{ margin: "1rem", padding: "2rem" }}>
                    {s2win ? (
                      <h1
                        style={{
                          color: "rgb(114,224,80)",
                          textAlign: "center",
                        }}
                      >
                        Winner
                      </h1>
                    ) : (
                      <h1
                        style={{
                          color: "rgb(224,80,100)",
                          textAlign: "center",
                        }}
                      >
                        Loss
                      </h1>
                    )}
                    <img
                      alt=""
                      style={{
                        maxHeight: "300px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "2rem",
                        marginTop: "2rem",
                      }}
                      src={players[1]?.img.img_url}
                    />
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                      Point : {setpoint1}
                      <br />
                      ค่า K = {kFactor}
                      {s2win ? (
                        <>
                          <p>
                            EA = 1 / (1 + 10 ^ (({setpoint0} - {setpoint1}) /
                            400))
                          </p>
                          <p>
                            New Point : {setpoint1} + {kFactor} (1 -{" "}
                            {(
                              1 / (1 + 10 ** ((setpoint0 - setpoint1) / 400)) ||
                              0
                            ).toFixed(2)}
                            ) = {players[1]?.point}
                          </p>
                          <br />
                          <h1
                            style={{
                              textAlign: "center",
                              color: "rgb(98,217,129)",
                            }}
                          >
                            {players[1]?.point} Point!
                          </h1>
                        </>
                      ) : (
                        <>
                          <p>
                            EA = 1 / (1 + 10 ** (({setpoint0} - {setpoint1}) /
                            400))
                          </p>
                          <p>
                            New Point : {setpoint1} + {kFactor} (1 -{" "}
                            {(
                              1 / (1 + 10 ** ((setpoint0 - setpoint1) / 400)) ||
                              0
                            ).toFixed(2)}
                            ) = {players[1]?.point}
                          </p>
                          <br />
                          <h1
                            style={{
                              textAlign: "center",
                              color: "rgb(217,98,134)",
                            }}
                          >
                            {players[1]?.point} Point!
                          </h1>
                        </>
                      )}
                    </div>
                  </div>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    p: 1,
                    m: 1,
                    bgcolor: "333",
                    color: "white",
                    borderRadius: 1,
                  }}
                >
                  <Button autoFocus onClick={handleClose}>
                    Close
                  </Button>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
