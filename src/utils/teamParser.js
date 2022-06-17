 
  const teamParser = (data) => {
    // console.log()
    
    const teams  = data.data.data[0].attributes.teams.data;
    const output = [];
    for (const team of teams) {
      output.push(team.attributes.name)
      }
      console.log(output);
      return output;
    }
    

  
  export default teamParser;
  