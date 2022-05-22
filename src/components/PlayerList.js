import Stats from "./Stats";

const PlayerList = ({
  team,
  teamName,
  statUp,
  statDown,
  setHomeTeam,
  onHandlePlayer,
}) => {
  if (!team) return;
  return (
    <div className="player-list">
      <div className="player-list_team">
        <h2>{teamName}</h2>
        <p>H</p>
        <p>C</p>
        <p>HR</p>
        <p>O</p>
        <p>SO</p>
      </div>
        {team.map((player) => (
          <Stats
            key={player.id}
            player={player}
            onHandlePlayer={onHandlePlayer}
            statUp={statUp}
            statDown={statDown}
            teamName={teamName}
          />
        ))}
    </div>
  );
};

export default PlayerList;
