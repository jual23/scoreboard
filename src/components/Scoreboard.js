const Scoreboard = ({ matchData, homeRuns, awayRuns }) => {
  return (
    <div className="scoreboard-container">
      <div>
        <h2>{matchData.away}</h2>
        <h2>{matchData.home}</h2>
      </div>
      <div>
        <div className="inning-stat">
          {awayRuns.map((inning) => (
            <div key={inning.inning}>
              <h3>{inning.runs}</h3>
            </div>
          ))}
        </div>
        <div className="inning-stat">
          {homeRuns.map((inning) => (
            <div key={inning.inning}>
              <h3>{inning.runs}</h3>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="scoreboard-container_game-stat">
          <h3>INNING</h3>
          <p>{matchData.inning}</p>
        </div>
        <div className="scoreboard-container_game-stat">
          <h3>OUT</h3>
          <p>{matchData.outs}</p>
        </div>        
      </div>
    </div>
  );
};

export default Scoreboard;
