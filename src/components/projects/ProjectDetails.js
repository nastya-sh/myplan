import React from "react";

const ProjectDetails = props => {
  const id = props.match.params.id;
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-title">Project Title - {id}</div>
        <p>
          Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem
        </p>
        <div className="card-action gret lighten-4 grey-text">
          <div>Posted by .....</div>
          <div>december, 4am</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
