const initState = {
  projects: [
    { id: "1", title: "Example Example Example Example Example" },
    { id: "2", title: "3535 3535353" },
    { id: "3", title: "vnvcncncv   hdfhd h hdhdfh hf" }
  ]
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log("created project", action.project);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("created project error", action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
