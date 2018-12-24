import React from "react";

const ProjectSummary = ({ project }) => {
  return (
    <div className="project-lit section">
      <div className="card z-depth-0 grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>Posted by the ...</p>
        <p className="grey-text">december</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
