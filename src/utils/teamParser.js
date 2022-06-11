 
  const teamParser = (data) => {
    const { teams } = data;
    const output = [];
    for (const team of Object.values(teams)) {
      output.push(team.name)
      }
      return output;
    }
    

  
  export default teamParser;
  