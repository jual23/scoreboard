const ModalStats = ({player, statDown, statUp, emerging}) => {
    return (
        <div className="player-list_stats_modal">
            <h3>{player.name}</h3>
            <ul>
                <li>
                    <h3>H</h3>
                    <button onClick={() => statUp(player, 'hit')}>+</button>
                    <p>{player.hit}</p>
                    <button onClick={() => statDown(player, 'hit')}>-</button>
                </li>
                <li>
                    <h3>2B</h3>
                    <button onClick={() => statUp(player, 'double')}>+</button>
                    <p>{player.double}</p>
                    <button onClick={() => statDown(player, 'double')}>
                        -
                    </button>
                </li>
                <li>
                    <h3>C</h3>
                    <button onClick={() => statUp(player, 'run')}>+</button>
                    <p>{player.run}</p>
                    <button onClick={() => statDown(player, 'run')}>-</button>
                </li>
                <li>
                    <h3>HR</h3>
                    <button onClick={() => statUp(player, 'homerun')}>+</button>
                    <p>{player.homerun}</p>
                    <button onClick={() => statDown(player, 'homerun')}>
                        -
                    </button>
                </li>
                <li>
                    <h3>O</h3>
                    <button onClick={() => statUp(player, 'out')}>+</button>
                    <p>{player.out}</p>
                    <button onClick={() => statDown(player, 'out')}>-</button>
                </li>
                <li>
                    <h3>K</h3>
                    <button onClick={() => statUp(player, 'strikeout')}>
                        +
                    </button>
                    <p>{player.strikeout}</p>
                    <button onClick={() => statDown(player, 'strikeout')}>
                        -
                    </button>
                </li>
            </ul>
            <div>
                <div>
                    <h3>Corredor</h3>
                    <input
                        type="text"
                        value={player.corredor}
                        onChange={e =>
                            emerging(player, 'corredor', e.target.value)
                        }
                    />
                </div>
                <div>
                    <h3>Pateador</h3>
                    <div>
                        <input
                            type="text"
                            value={player.pateador}
                            onChange={e =>
                                emerging(player, 'pateador', e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalStats
