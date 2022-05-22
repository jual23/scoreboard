const ModalStats = ({ player, statDown, statUp }) => {
  return (
    <div className="player-list_stats_modal">
      <h3>{player.name}</h3>
      <ul>
        <li>
          <button onClick={() => statUp(player, "hit")}>UP</button>
          <p>{player.hit}</p>
          <button onClick={() => statDown(player, "hit")}>DOWN</button>
        </li>
        <li>
          <button onClick={() => statUp(player, "run")}>UP</button>
          <p>{player.run}</p>
          <button onClick={() => statDown(player, "run")}>DOWN</button>
        </li>
        <li>
          <button onClick={() => statUp(player, "homerun")}>UP</button>
          <p>{player.homerun}</p>
          <button onClick={() => statDown(player, "homerun")}>DOWN</button>
        </li>
        <li>
          <button onClick={() => statUp(player, "out")}>UP</button>
          <p>{player.out}</p>
          <button onClick={() => statDown(player, "out")}>DOWN</button>
        </li>
        <li>
          <button onClick={() => statUp(player, "strikeout")}>UP</button>
          <p>{player.strikeout}</p>
          <button onClick={() => statDown(player, "strikeout")}>DOWN</button>
        </li>
      </ul>
    </div>
  );
};

export default ModalStats;
