 
  const teamParser = (data) => {
    const { teams } = data;
    const output = [];
    for (const team of Object.values(teams)) {
      output.push(team.name)
      }
      console.log(output)
      return output;
    }
    

  
  export default teamParser;
  