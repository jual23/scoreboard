const scoreData = {
    name: 'nombre',
    number: '5',
    gender: 'f',
    hit: 0,
    run: 0,
    homerun: 0,
    out: 0,
    strikeout: 0,
}

const parser = data => {
    const {teams} = data
    const output = {}
    for (const team of Object.values(teams)) {
        output[team.name] = []
        for (const player of team.players) {
            const {name, id, number, gender} = player
            output[team.name].push({
                name,
                id,
                number,
                gender,
                team: team.name,
                ...scoreData,
            })
        }
    }
    return output
}

export default parser
