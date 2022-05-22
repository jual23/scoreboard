const Stats = ({ player, teamName, statUp, statDown, onHandlePlayer }) => {
  return (
    <div onClick={() => onHandlePlayer(player)}>
      <ul className="player-list_stats">
        {/* <h3 onClick={handleOpen}>{player.name}</h3> */}
        <h3>{player.name}</h3>
        <li>{player.hit}</li>
        <li>{player.homerun}</li>
        <li>{player.run}</li>
        <li>{player.out}</li>
        <li>{player.strikeout}</li>
      </ul>
    </div>
  );
};

export default Stats;
