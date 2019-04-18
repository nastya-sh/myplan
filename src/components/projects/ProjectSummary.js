import React from "react";
import moment from "moment";

const ProjectSummary = ({ project }) => {
  return (
    <div
      className="project-lit section"
      data-e2e={`project-${project.createdAt.toDate().getSeconds()}`}
    >
      <div className="card z-depth-0 grey-text text-darken-3">
        <span
          className="card-title"
          data-e2e={`title-${project.createdAt.toDate().getSeconds()}`}
        >
          {project.title}
        </span>
        <p>
          Posted by{" "}
          <span data-e2e={`user-${project.createdAt.toDate().getSeconds()}`}>
            {project.authorFirstName} {project.authorLastName}
          </span>
        </p>
        <p
          className="grey-text"
          data-e2e={`time-${project.createdAt.toDate().getSeconds()}`}
        >
          {moment(project.createdAt.toDate()).calendar()}
        </p>
      </div>
    </div>
  );
};

export default ProjectSummary;
