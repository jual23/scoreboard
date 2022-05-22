import React from "react";

const Sideboard = ({ runUp, outUp, save }) => {
  return (
    <div>
      <button onClick={() => runUp()}>CARRERA</button>
      <button onClick={() => outUp()}>OUT</button>
      <button onClick={() => save()}>GUARDAR</button>
    </div>
  );
};
export default Sideboard;
