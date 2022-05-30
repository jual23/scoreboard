import { DragDropContext } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Stats from "./Stats";

const PlayerList = ({
  team,
  teamName,
  statUp,
  statDown,
  onHandlePlayer,
  updateTeam
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
        <DragDropContext onDragEnd={updateTeam}>
          <Droppable droppableId={teamName}>
        {(provided,snapshot) => (
          <div ref={provided.innerRef}>
            {team.map((player,index) => (
              <Draggable draggableId={player.id} key={player.id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                    <Stats
                     
                  
                 
                    key={player.id}
                    player={player}
                    onHandlePlayer={onHandlePlayer}
                    statUp={statUp}
                    statDown={statDown}
                    teamName={teamName}
                  />
                </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
        
          </Droppable>
        </DragDropContext>
      </div>
  );
};




export default PlayerList;
