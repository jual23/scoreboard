import { useState, useEffect } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import { BrowserRouter as Router} from "react-router-dom";
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
import ModalStats from "./components/ModalStats";
import TeamSelect from "./components/TeamSelect";
import teamParser from "./utils/teamParser";

const App = () => {
  const data = parser(rawData);
  const teamList = teamParser(rawData)
  useEffect(() => {
    const savedData = window.localStorage.getItem('MY_APP_STATE');
    if ( savedData !== null ) setMatchData(JSON.parse(savedData));
  }, []);
  

  const [player, setPlayer] = useState(null);

  const [matchData, setMatchData] = useState({
    home: "",
    away: "",
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

  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();
  const [homeBatter, setHomeBatter] = useState([]);
  const [awayBatter, setAwayBatter] = useState([]);

  const submitTeams = (e) => {
    e.preventDefault()
setHomeTeam(data[matchData.home])
setAwayTeam(data[matchData.away])
window.localStorage.setItem('MY_APP_STATE', JSON.stringify(matchData));
  }
 
  const handlePlayer = (player) => {
    setPlayer(player);
  };

  const updateHomeTeam = (result) => {
    let movedItem, newBatter = homeBatter, newReserve = homeTeam

    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.droppableId === "home_reserve") {
         movedItem = newReserve[result.source.index]
         newReserve.splice(result.source.index,1)  
         newReserve.splice(result.destination.index,0,movedItem)      
       } else {
          movedItem = newBatter[result.source.index]
          newBatter.splice(result.source.index,1) 
          newBatter.splice(result.destination.index,0,movedItem) 
       }
       
     } else {
       if (result.source.droppableId === "home_reserve") {
          movedItem = newReserve[result.source.index]
          newReserve.splice(result.source.index,1) 
          newBatter.splice(result.destination.index,0,movedItem) 
        } else {
          movedItem = newBatter[result.source.index]
          newBatter.splice(result.source.index,1) 
          newReserve.splice(result.destination.index,0,movedItem) 
        }
     }
      setHomeTeam(newReserve)
      setHomeBatter(newBatter)
  }

  const updateAwayTeam = (result) => {
    let movedItem, newBatter = awayBatter, newReserve = awayTeam

    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.droppableId === "away_reserve") {
         movedItem = newReserve[result.source.index]
         newReserve.splice(result.source.index,1)  
         newReserve.splice(result.destination.index,0,movedItem)      
       } else {
          movedItem = newBatter[result.source.index]
          newBatter.splice(result.source.index,1) 
          newBatter.splice(result.destination.index,0,movedItem) 
       }
       
     } else {
       if (result.source.droppableId === "away_reserve") {
          movedItem = newReserve[result.source.index]
          newReserve.splice(result.source.index,1) 
          newBatter.splice(result.destination.index,0,movedItem) 
        } else {
          movedItem = newBatter[result.source.index]
          newBatter.splice(result.source.index,1) 
          newReserve.splice(result.destination.index,0,movedItem) 
        }
     }
      
      setAwayTeam(newReserve)
      setAwayBatter(newBatter)
  }
 

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
          )
        );
  };

  const statDown = (currentPlayer, stat) => {
    if (stat === "out" || stat === "strikeout") { outDown()}
    if (stat === "run" || stat === "homerun") { runDown()}
    currentPlayer.team === matchData.home
      ? setHomeTeam(
          homeTeam.map((player) => {
            if (player.id === currentPlayer.id) {
              setPlayer({ ...player, [stat]: player[stat] - 1 });
              return { ...player, [stat]: player[stat] - 1 };
            }
            return player;
          })
        )
      : setAwayTeam(
          awayTeam.map((player) => {
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

  const outDown = () => {
    matchData.outs === 0 
      ? matchData.bottomHalf === true 
        ? setMatchData ( 
          {
            ...matchData,
            outs: 2,
            bottomHalf:false
          })
        : setMatchData ( 
          {
            ...matchData,
            outs: 2,
            bottomHalf:true,
            inning: matchData.inning - 1
          })     
        : setMatchData ({...matchData, outs: matchData.outs-1})
  }

  const runDown = () => {
    matchData.bottomHalf === true
      ? setHomeRuns(
          homeRuns.map((inning) =>
            inning.inning === matchData.inning
              ? inning.runs > 0 
                ? {...inning, runs: inning.runs-1}
              :
                inning
              : inning
          )
        )
      : setAwayRuns(
          awayRuns.map((inning) =>
            inning.inning === matchData.inning
              ? inning.runs > 0 
                ? {...inning, runs: inning.runs-1}
              :
                inning
              : inning
        )
        );
  }

  const save = () => {
    let data = JSON.stringify(homeTeam.concat(awayTeam))
    let filename = 'download'
    let extension = 'json'
    exportFromJSON({ data, filename, extension })
  };

  return (
    <Router>
      { !homeTeam && <TeamSelect setMatchData={setMatchData} matchData={matchData} submitTeams={submitTeams} teamList={teamList}/>}
      { homeTeam && <div className="main">
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
              updateTeam ={updateHomeTeam}
              onHandlePlayer={handlePlayer}
              team={homeTeam}
              teamBatter={homeBatter}
              teamId={"home"}
              teamName={matchData.home}
              statUp={statUp}
              statDown={statDown}
            />
            <PlayerList
              updateTeam ={updateAwayTeam}
              team={awayTeam}
              teamBatter={awayBatter}
              teamId={"away"}
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
      </div>}
    </Router>
  );
};

export default App;
