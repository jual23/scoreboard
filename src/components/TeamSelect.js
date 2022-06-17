import { Autocomplete,TextField  } from '@mui/material';
import { useState } from 'react';

const TeamSelect = ({setMatchData,matchData,submitTeams,teams}) => {
  const teamList = teams

  //Controlled Autocomplete
  const [inputTeamA,setInputTeamA] = useState("")
  const [inputTeamB,setInputTeamB] = useState("")
  const [valueA,setValueA] = useState(teamList[0])
  const [valueB,setValueB] = useState(teamList[0])


  return (
    <div className="selector">
        <h2>SELECCIONA LOS EQUIPOS</h2>
        <form onSubmit={submitTeams}>
        <Autocomplete
                value={valueA}
                onChange={(event, newValue) => {
                   setValueA(newValue)
                   setMatchData({...matchData, home: newValue.attributes.name,homeId:newValue.id});
                }}
                inputValue={inputTeamA}
                onInputChange={(event, newInputValue) => {
                  setInputTeamA(newInputValue);
                }}
                isOptionEqualToValue={(option, value) => option === value}
                options={teamList}
                getOptionLabel={(option) => option.attributes.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Equipo" />}
              />
        <Autocomplete
          value={valueB}
          onChange={(event, newValue) => {
            setValueB(newValue)
            setMatchData({...matchData, away: newValue.attributes.name,awayId:newValue.id});
          }}
          inputValue={inputTeamB}
          onInputChange={(event, newInputValue) => {
            setInputTeamB(newInputValue);
          }}
          isOptionEqualToValue={(option, value) => option === value}
          options={teamList}
          getOptionLabel={(option) => option.attributes.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Equipo" />}
        />
            {/* <Autocomplete
              disablePortal
              options={teams}
              sx={{ width: 300 }}
             
              value={matchData.home}
              onChange={(event, newValue) => {
                setMatchData({...matchData, home: newValue.id});
              }}
              inputValue={inputTeamA}
              onInputChange={(event, newInputValue) => {
                setInputTeamA(newInputValue.id);
              }}
              isOptionEqualToValue={(option, value) => option.id === value}
              getOptionLabel={(option) => teams.id}
              renderInput={(params) => <TextField {...params}  SelectProps={{
                native: true,
              }} label="Casa" />}
            />  
            <Autocomplete
              disablePortal
              options={teams}
              sx={{ width: 300 }}

              value={matchData.away}
              onChange={(event, newValue) => {
                setMatchData({...matchData, away: newValue.id});
              }}
              inputValue={inputTeamB}
              onInputChange={(event, newInputValue) => {
                setInputTeamB(newInputValue.id);
              }}
              isOptionEqualToValue={(option, value) => option.id === value}
              getOptionLabel={(option) => teams.id}
              renderInput={(params) => <TextField {...params}  SelectProps={{
                native: true,
              }} label="Visitante" />}
            /> */}
            <input type="submit" value="Guardar" ></input>
        </form>
    </div>
  )
}

export default TeamSelect