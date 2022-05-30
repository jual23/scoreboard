import { Autocomplete,TextField  } from '@mui/material';
import { useState } from 'react';

const TeamSelect = ({setMatchData,matchData,submitTeams,teamList}) => {

  const [inputTeamA,setInputTeamA] = useState('')
  const [inputTeamB,setInputTeamB] = useState('')

  return (
    <div className="selector">
        <h2>SELECCIONA LOS EQUIPOS</h2>
        <form onSubmit={submitTeams}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teamList}
              sx={{ width: 300 }}
             
              value={matchData.home}
              onChange={(event, newValue) => {
                setMatchData({...matchData, home: newValue});
              }}
              inputValue={inputTeamA}
              onInputChange={(event, newInputValue) => {
                setInputTeamA(newInputValue);
              }}

              renderInput={(params) => <TextField {...params}  SelectProps={{
                native: true,
              }} label="Casa" />}
            />  
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teamList}
              sx={{ width: 300 }}

              value={matchData.away}
              onChange={(event, newValue) => {
                setMatchData({...matchData, away: newValue});
              }}
              inputValue={inputTeamB}
              onInputChange={(event, newInputValue) => {
                setInputTeamB(newInputValue);
              }}

              renderInput={(params) => <TextField {...params}  SelectProps={{
                native: true,
              }} label="Visitante" />}
            />
            <input type="submit" value="Guardar" ></input>
        </form>
    </div>
  )
}

export default TeamSelect