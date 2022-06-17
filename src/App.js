import {useState, useEffect} from 'react'
import './App.css'
import Modal from '@mui/material/Modal'
import {BrowserRouter as Router} from 'react-router-dom'
import exportFromJSON from 'export-from-json'
import axios from 'axios'

// Components
// import NavMenu from "./components/NavMenu";
import MatchInfo from './components/MatchInfo'
import Sideboard from './components/Sideboard'
import Scoreboard from './components/Scoreboard'
import PlayerList from './components/PlayerList'

//Data & Parser
import ModalStats from './components/ModalStats'
import TeamSelect from './components/TeamSelect'

const App = () => {
    const [teams, setTeams] = useState([{id: '', attributes: {name: ''}}])

    useEffect(() => {
        axios
            .get(
                'https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/leagues?fields[0]=name&populate[logo][fields][0]=url&populate[teams][fields][0]=name&populate[teams][populate][logo][fields][0]=url&filters[id]=2'
            )
            .then(response => {
                setTeams(response.data.data[0].attributes.teams.data)
            })
            .catch(error => console.error(error))
    }, [])

    const [player, setPlayer] = useState(null)

    const [matchData, setMatchData] = useState({
        home: '',
        homeId: '',
        away: '',
        awayId: '',
        inning: 1,
        outs: 0,
        bottomHalf: false,
    })

    const [homeRuns, setHomeRuns] = useState([
        {inning: 1, runs: ''},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
        {inning: 9, runs: ''},
    ])
    const [awayRuns, setAwayRuns] = useState([
        {inning: 1, runs: 0},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
        {inning: 9, runs: ''},
    ])

    const [homeTeam, setHomeTeam] = useState()
    const [awayTeam, setAwayTeam] = useState()
    const [homeBatter, setHomeBatter] = useState([])
    const [awayBatter, setAwayBatter] = useState([])

    const parsePlayers = (response, teamId) => {
        let output = []

        for (let player of response) {
            let p = {
                name: player.attributes.player.data.attributes.name,
                number: `${player.attributes.number}`,
                gender: player.attributes.player.data.attributes.gender,
                id: `${player.attributes.player.data.id}`,
                team: teamId,
                hit: 0,
                run: 0,
                homerun: 0,
                out: 0,
                strikeout: 0,
                bateador: '',
                pateador: '',
            }
            output.push(p)
        }
        // response.forEach((player, teamId) => {
        //     console.log(teamId)
        //     let p = {
        //         name: player.attributes.player.data.attributes.name,
        //         number: `${player.attributes.number}`,
        //         gender: player.attributes.player.data.attributes.gender,
        //         id: `${player.attributes.player.data.id}`,
        //         team: teamId,
        //         hit: 0,
        //         run: 0,
        //         homerun: 0,
        //         out: 0,
        //         strikeout: 0,
        //     }
        //     output.push(p)
        // })
        return output
    }

    const submitTeams = e => {
        e.preventDefault()
        axios
            .get(
                `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/rosters?fields[0]=number&populate[player][fields][0]=name&populate[player][fields][1]=gender&populate[player][populate][profile][fields][0]=url&filters[team][id][$eq]=${matchData.homeId}&filters[league][id][$eq]=2`
            )
            .then(response => {
                setHomeTeam(parsePlayers(response.data.data, matchData.homeId))
            })
            .catch(error => console.error(error))

        axios
            .get(
                `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/rosters?fields[0]=number&populate[player][fields][0]=name&populate[player][fields][1]=gender&populate[player][populate][profile][fields][0]=url&filters[team][id][$eq]=${matchData.awayId}&filters[league][id][$eq]=2`
            )
            .then(response => {
                setAwayTeam(parsePlayers(response.data.data, matchData.awayId))
            })
            .catch(error => console.error(error))
    }

    const handlePlayer = player => {
        setPlayer(player)
    }

    const updateHomeTeam = result => {
        let movedItem,
            newBatter = homeBatter,
            newReserve = homeTeam

        if (result.source.droppableId === result.destination.droppableId) {
            if (result.source.droppableId === 'home_reserve') {
                movedItem = newReserve[result.source.index]
                newReserve.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                newBatter.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            }
        } else {
            if (result.source.droppableId === 'home_reserve') {
                movedItem = newReserve[result.source.index]
                newReserve.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                newBatter.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            }
        }
        setHomeTeam(newReserve)
        setHomeBatter(newBatter)
    }

    const updateAwayTeam = result => {
        let movedItem,
            newBatter = awayBatter,
            newReserve = awayTeam

        if (result.source.droppableId === result.destination.droppableId) {
            if (result.source.droppableId === 'away_reserve') {
                movedItem = newReserve[result.source.index]
                newReserve.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                newBatter.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            }
        } else {
            if (result.source.droppableId === 'away_reserve') {
                movedItem = newReserve[result.source.index]
                newReserve.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                newBatter.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            }
        }

        setAwayTeam(newReserve)
        setAwayBatter(newBatter)
    }

    const statUp = (currentPlayer, stat) => {
        if (stat === 'out' || stat === 'strikeout') {
            outUp()
        }
        if (stat === 'run' || stat === 'homerun') {
            runUp()
        }

        currentPlayer.team === matchData.homeId
            ? setHomeTeam(
                  homeTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          setPlayer({...player, [stat]: player[stat] + 1})
                          return {...player, [stat]: player[stat] + 1}
                      }
                      return player
                  })
              )
            : setAwayTeam(
                  awayTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          setPlayer({...player, [stat]: player[stat] + 1})
                          return {...player, [stat]: player[stat] + 1}
                      }
                      return player
                  })
              )
    }

    const statDown = (currentPlayer, stat) => {
        if (stat === 'out' || stat === 'strikeout') {
            outDown()
        }
        if (stat === 'run' || stat === 'homerun') {
            runDown()
        }
        currentPlayer.team === matchData.homeId
            ? setHomeTeam(
                  homeTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          setPlayer({...player, [stat]: player[stat] - 1})
                          return {...player, [stat]: player[stat] - 1}
                      }
                      return player
                  })
              )
            : setAwayTeam(
                  awayTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          setPlayer({...player, [stat]: player[stat] - 1})
                          return {...player, [stat]: player[stat] - 1}
                      }
                      return player
                  })
              )
    }

    const outUp = () => {
        matchData.outs === 2
            ? matchData.bottomHalf === true
                ? setAwayRuns(
                      awayRuns.map(inning =>
                          inning.inning === matchData.inning + 1
                              ? {...inning, runs: 0}
                              : inning
                      )
                  )
                : setHomeRuns(
                      homeRuns.map(inning =>
                          inning.inning === matchData.inning
                              ? {...inning, runs: 0}
                              : inning
                      )
                  )
            : setHomeRuns(homeRuns)

        setMatchData(matchData =>
            matchData.outs === 2
                ? matchData.bottomHalf === true
                    ? {
                          ...matchData,
                          outs: 0,
                          inning: matchData.inning + 1,
                          bottomHalf: false,
                      }
                    : {...matchData, outs: 0, bottomHalf: true}
                : {...matchData, outs: matchData.outs + 1}
        )
    }

    const runUp = () => {
        matchData.bottomHalf === true
            ? setHomeRuns(
                  homeRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? {...inning, runs: inning.runs + 1}
                          : inning
                  )
              )
            : setAwayRuns(
                  awayRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? {...inning, runs: inning.runs + 1}
                          : inning
                  )
              )
    }

    const outDown = () => {
        matchData.outs === 0
            ? matchData.bottomHalf === true
                ? setMatchData({
                      ...matchData,
                      outs: 2,
                      bottomHalf: false,
                  })
                : setMatchData({
                      ...matchData,
                      outs: 2,
                      bottomHalf: true,
                      inning: matchData.inning - 1,
                  })
            : setMatchData({...matchData, outs: matchData.outs - 1})
    }

    const runDown = () => {
        matchData.bottomHalf === true
            ? setHomeRuns(
                  homeRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? inning.runs > 0
                              ? {...inning, runs: inning.runs - 1}
                              : inning
                          : inning
                  )
              )
            : setAwayRuns(
                  awayRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? inning.runs > 0
                              ? {...inning, runs: inning.runs - 1}
                              : inning
                          : inning
                  )
              )
    }

    const save = () => {
        let data = JSON.stringify(homeTeam.concat(awayTeam))
        let filename = 'download'
        let extension = 'json'
        exportFromJSON({data, filename, extension})
    }

    return (
        <Router>
            {!awayTeam && (
                <TeamSelect
                    setMatchData={setMatchData}
                    matchData={matchData}
                    submitTeams={submitTeams}
                    teams={teams}
                />
            )}
            {awayTeam && (
                <div className="main">
                    <div className="top-row">
                        <MatchInfo />
                        <Scoreboard
                            matchData={matchData}
                            homeRuns={homeRuns}
                            awayRuns={awayRuns}
                        />
                        <Sideboard
                            matchData={matchData}
                            outUp={outUp}
                            runUp={runUp}
                            save={save}
                        />
                    </div>

                    <div className="teams-container">
                        <PlayerList
                            updateTeam={updateHomeTeam}
                            onHandlePlayer={handlePlayer}
                            team={homeTeam}
                            teamBatter={homeBatter}
                            teamId={'home'}
                            teamName={matchData.home}
                            statUp={statUp}
                            statDown={statDown}
                        />
                        <PlayerList
                            updateTeam={updateAwayTeam}
                            team={awayTeam}
                            teamBatter={awayBatter}
                            teamId={'away'}
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
                        aria-describedby="modal-modal-description">
                        <ModalStats
                            player={player}
                            statUp={statUp}
                            statDown={statDown}
                        />
                    </Modal>
                </div>
            )}
        </Router>
    )
}

export default App
