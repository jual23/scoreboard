const ModalStats = ({ player, statDown, statUp }) => {
  return (
    <div className="player-list_stats_modal">
      <h3>{player.name}</h3>
      <ul>
        <li>
          <h3>H</h3>
          <button onClick={() => statUp(player, "hit")}>+</button>
          <p>{player.hit}</p>
          <button onClick={() => statDown(player, "hit")}>-</button>
        </li>
        <li>
          <h3>C</h3>
          <button onClick={() => statUp(player, "run")}>+</button>
          <p>{player.run}</p>
          <button onClick={() => statDown(player, "run")}>-</button>
        </li>
        <li>
          <h3>HR</h3>
          <button onClick={() => statUp(player, "homerun")}>+</button>
          <p>{player.homerun}</p>
          <button onClick={() => statDown(player, "homerun")}>-</button>
        </li>
        <li>
          <h3>O</h3>
          <button onClick={() => statUp(player, "out")}>+</button>
          <p>{player.out}</p>
          <button onClick={() => statDown(player, "out")}>-</button>
        </li>
        <li>
          <h3>SO</h3>
          <button onClick={() => statUp(player, "strikeout")}>+</button>
          <p>{player.strikeout}</p>
          <button onClick={() => statDown(player, "strikeout")}>-</button>
        </li>
      </ul>
    </div>
  );
};

export default ModalStats;
