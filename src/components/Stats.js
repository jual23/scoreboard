const Stats = ({player, teamName, statUp, statDown, onHandlePlayer}) => {
    return (
        <div onClick={() => onHandlePlayer(player)}>
            <ul className={'gender_' + player.gender + ' player-list_stats'}>
                <h2>{player.number}</h2>
                <h3>{player.name}</h3>
                <li>{player.hit}</li>
                <li>{player.double}</li>
                <li>{player.homerun}</li>
                <li>{player.run}</li>
                <li>{player.out}</li>
                <li>{player.strikeout}</li>
                <li>{player.corredor}</li>
                <li>{player.pateador}</li>
            </ul>
        </div>
    )
}

export default Stats
