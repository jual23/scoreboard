
const TeamSelect = ({setMatchData,matchData}) => {
  return (
    <div className="selector">
        <form>
            <label>Casa</label><input value={matchData.home} type="text"  onChange={(e) => setMatchData({...matchData, home: e.target.value})} required></input>
            <label>Visitante</label><input value={matchData.away} type="text" onChange={(e) => setMatchData({...matchData, away: e.target.value})} required></input>
        </form>
    </div>
  )
}

export default TeamSelect