import { useState, useEffect } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import exportFromJSON from 'export-from-json'

// Components
// import NavMenu from "./components/NavMenu";
import MatchInfo from "./components/MatchInfo";
import Sideboard from "./components/Sideboard";
import Scoreboard from "./components/Scoreboard";
import PlayerList from "./components/PlayerList";

//Data & Parser
import rawData from "./data/22_lpk_1_teams.json";
import parser from "./utils/parser";
import { onSnapshot, collection } from "firebase/firestore";
import ModalStats from "./components/ModalStats";
import TeamSelect from "./components/TeamSelect";

const App = () => {
  const [data, setData] = useState(parser(rawData));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   onSnapshot(collection(firebase, "users"), (snapshot) => {
  //     console.log(snapshot);
  //   });
  // });

  const [player, setPlayer] = useState(null);

  const [matchData, setMatchData] = useState({
    home: "Arrepinchosos",
    away: "Akatsuki",
    inning: 1,
    outs: 0,
    bottomHalf: false,
  });

  const [homeRuns, setHomeRuns] = useState([
    { inning: 1, runs: "" },
    { inning: 2, runs: "" },
    { inning: 3, runs: "" },
    { inning: 4, runs: "" },
    { inning: 5, runs: "" },
    { inning: 6, runs: "" },
    { inning: 7, runs: "" },
  ]);
  const [awayRuns, setAwayRuns] = useState([
    { inning: 1, runs: 0 },
    { inning: 2, runs: "" },
    { inning: 3, runs: "" },
    { inning: 4, runs: "" },
    { inning: 5, runs: "" },
    { inning: 6, runs: "" },
    { inning: 7, runs: "" },
  ]);

  const [homeTeam, setHomeTeam] = useState(data[matchData.home]);
  const [awayTeam, setAwayTeam] = useState(data[matchData.away]);

  const handlePlayer = (player) => {
    setPlayer(player);
  };

  const statUp = (currentPlayer, stat) => {
    if (stat === "out" || stat === "strikeout") { outUp()}
    if (stat === "run" || stat === "homerun") { runUp()}

    currentPlayer.team === matchData.home
      ? setHomeTeam(
          homeTeam.map(
            (player) => {
              if (player.id === currentPlayer.id) {
                setPlayer({ ...player, [stat]: player[stat] + 1 });
                return { ...player, [stat]: player[stat] + 1 };
              }
              return player;
            }
            // player.id === currentPlayer.id
            //   ? { ...player, [stat]: player[stat] + 1 }
            //   : player
          )
        )
      : setAwayTeam(
          awayTeam.map(
            (player) => {
              if (player.id === currentPlayer.id) {
                setPlayer({ ...player, [stat]: player[stat] + 1 });
                return { ...player, [stat]: player[stat] + 1 };
              }
              return player;
            }
            // player.id === currentPlayer.id
            //   ? { ...player, [stat]: player[stat] + 1 }
            //   : player
          )
        );
  };

  const statDown = (currentPlayer, stat) => {
    currentPlayer.team === matchData.home
      ? setHomeTeam(
          homeTeam.map((player) => {
            // (player.id === currentPlayer.id
            //   ? { ...player, [stat]: player[stat] - 1 }
            //   : player)
            if (player.id === currentPlayer.id) {
              setPlayer({ ...player, [stat]: player[stat] - 1 });
              return { ...player, [stat]: player[stat] - 1 };
            }
            return player;
          })
        )
      : setAwayTeam(
          awayTeam.map((player) => {
            // player.id === currentPlayer.id
            //   ? { ...player, [stat]: player[stat] - 1 }
            //   : player
            if (player.id === currentPlayer.id) {
              setPlayer({ ...player, [stat]: player[stat] - 1 });
              return { ...player, [stat]: player[stat] - 1 };
            }
            return player;
          })
        );
  };

  const outUp = () => {
    matchData.outs === 2
      ? matchData.bottomHalf === true
        ? setAwayRuns(
            awayRuns.map((inning) =>
              inning.inning === matchData.inning + 1
                ? { ...inning, runs: 0 }
                : inning
            )
          )
        : setHomeRuns(
            homeRuns.map((inning) =>
              inning.inning === matchData.inning
                ? { ...inning, runs: 0 }
                : inning
            )
          )
      : setHomeRuns(homeRuns);

    setMatchData((matchData) =>
      matchData.outs === 2
        ? matchData.bottomHalf === true
          ? {
              ...matchData,
              outs: 0,
              inning: matchData.inning + 1,
              bottomHalf: false,
            }
          : { ...matchData, outs: 0, bottomHalf: true }
        : { ...matchData, outs: matchData.outs + 1 }
    );
  };

  const runUp = () => {
    matchData.bottomHalf === true
      ? setHomeRuns(
          homeRuns.map((inning) =>
            inning.inning === matchData.inning
              ? { ...inning, runs: inning.runs + 1 }
              : inning
          )
        )
      : setAwayRuns(
          awayRuns.map((inning) =>
            inning.inning === matchData.inning
              ? { ...inning, runs: inning.runs + 1 }
              : inning
          )
        );
  };

  const save = () => {
    let data = JSON.stringify(homeTeam.concat(awayTeam))
    let filename = 'download'
    let extension = 'json'
    exportFromJSON({ data, filename, extension })
  };

  return (
    <Router>
      <TeamSelect setMatchData={setMatchData} matchData={matchData}/>
      <div className="main">
        <div className="top-row">
          <MatchInfo />
          <Scoreboard
            matchData={matchData}
            homeRuns={homeRuns}
            awayRuns={awayRuns}
          />
          <Sideboard matchData={matchData} outUp={outUp} runUp={runUp} save={save} />
        </div>


        <div className="teams-container">
          <PlayerList
            onHandlePlayer={handlePlayer}
            team={homeTeam}
            teamName={matchData.home}
            statUp={statUp}
            statDown={statDown}
          />
          
          <PlayerList
            team={awayTeam}
            onHandlePlayer={handlePlayer}
            teamName={matchData.away}
            statUp={statUp}
            statDown={statDown}
          />
        </div>


        <Modal
          open={player !== null}
          onClose={() => setPlayer(null)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalStats player={player} statUp={statUp} statDown={statDown} />
        </Modal>
      </div>
    </Router>
  );
};

export default App;
