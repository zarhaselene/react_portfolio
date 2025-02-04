import { useState, useContext } from "react";
import PortfolioContext from "../context/PortfolioContext";
import { FaXmark } from "react-icons/fa6";

export default function Admin() {
  const {
    projects,
    techSkills,
    addProject,
    editProject,
    deleteProject,
    addTechSkill,
    deleteTechSkill,
  } = useContext(PortfolioContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [projectData, setProjectData] = useState({
    id: null,
    title: "",
    description: "",
    techUsed: [],
    demoLink: "",
    codeLink: "",
  });
  const [newSkill, setNewSkill] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectData.id) {
      editProject(projectData.id, projectData);
    } else {
      addProject(projectData);
    }
    setProjectData({
      id: null,
      title: "",
      description: "",
      techUsed: [],
      demoLink: "",
      codeLink: "",
    });

    const handleKeyDown = (e, action) => {
      if (e.key === "Enter") {
        e.preventDefault();
        action();
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      {!loggedIn ? (
        <div className="max-w-md mx-auto bg-gray-700 p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6 text-white">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-500"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">
            Admin Dashboard
          </h1>

          {/* Project Form */}
          <div className="bg-gray-00 p-6 rounded-lg shadow mb-8 text-white">
            <h2 className="text-xl font-bold mb-4 ">
              {projectData.id ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                className="w-full p-2 border rounded"
                value={projectData.title}
                onChange={(e) =>
                  setProjectData({ ...projectData, title: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Project Description"
                className="w-full p-2 border rounded"
                value={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                className="w-full p-2 border rounded"
                value={projectData.techUsed.join(", ")}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    techUsed: e.target.value.split(/,\s*/),
                  })
                }
              />
              <input
                type="url"
                placeholder="Demo URL"
                className="w-full p-2 border rounded"
                value={projectData.demoLink}
                onChange={(e) =>
                  setProjectData({ ...projectData, demoLink: e.target.value })
                }
              />
              <input
                type="url"
                placeholder="Code Repository URL"
                className="w-full p-2 border rounded"
                value={projectData.codeLink}
                onChange={(e) =>
                  setProjectData({ ...projectData, codeLink: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                {projectData.id ? "Update Project" : "Add Project"}
              </button>
            </form>
          </div>

          {/* Skills Management */}
          <div className="bg-gray-800 p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">Manage Skills</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="New Skill"
                className="flex-1 p-2 border rounded"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newSkill.trim()) {
                    addTechSkill(newSkill.trim());
                    setNewSkill("");
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newSkill.trim()) {
                    addTechSkill(newSkill.trim());
                    setNewSkill("");
                  }
                }}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-500 px-3 py-1 rounded-lg flex items-center gap-2"
                >
                  <span className="text-white">{skill}</span>
                  <button
                    onClick={() => deleteTechSkill(skill)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaXmark />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-white">
              Existing Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-b pb-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => setProjectData(project)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
