import React from "react";

const Sideboard = ({ runUp, outUp, save }) => {
  return (
    <div className="sideboard">
      <button onClick={() => save()}>GUARDAR</button>
    </div>
  );
};
export default Sideboard;
