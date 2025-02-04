import { useState, useContext } from "react";
import PortfolioContext from "../context/PortfolioContext";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

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
    codeLink: "",
    image: null,
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
      codeLink: "",
      image: null,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectData({ ...projectData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="min-h-screen bg-tertiary p-8">
      {!loggedIn ? (
        <div className="max-w-md mx-auto bg-primary p-8 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-6 text-white">Admin Login</h1>
            <button
              onClick={() => router.push("/")}
              className="bg-tertiary text-white py-2 px-4 rounded hover:bg-secondary mb-6"
            >
              Back
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-secondary rounded bg-tertiary text-black"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-secondary rounded bg-tertiary text-black"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded hover:bg-tertiary"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start justify-between">
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary mb-6"
            >
              Back
            </button>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Admin Dashboard
            </h1>
          </div>

          {/* Project Form */}
          <div className="bg-primary p-6 rounded-lg shadow mb-8 text-white">
            <h2 className="text-xl font-bold mb-4 ">
              {projectData.id ? "Edit Project" : "Add New Project"}
            </h2>
            <form
              onSubmit={handleProjectSubmit}
              className="flex flex-col space-y-4"
            >
              <input
                type="text"
                placeholder="Project Title"
                className="w-full p-2 border border-secondary rounded text-white bg-primary"
                value={projectData.title}
                onChange={(e) =>
                  setProjectData({ ...projectData, title: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Project Description"
                className="w-full p-2 border border-secondary rounded text-white bg-primary"
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
                className="w-full p-2 border border-secondary rounded text-white bg-primary"
                value={projectData.techUsed.join(", ")}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    techUsed: e.target.value.split(/,\s*/),
                  })
                }
                required
              />

              <input
                type="url"
                placeholder="Code Repository URL"
                className="w-full p-2 border border-secondary rounded text-white bg-primary "
                value={projectData.codeLink}
                onChange={(e) =>
                  setProjectData({ ...projectData, codeLink: e.target.value })
                }
              />
              <label className="block bg-tertiary border border-secondary text-white py-2 px-4 rounded hover:bg-secondary cursor-pointer">
                Välj bild
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-primary"
              >
                {projectData.id ? "Update Project" : "Add Project"}
              </button>
            </form>
          </div>

          {/* Skills Management */}
          <div className="bg-primary p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">Manage Skills</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="New Skill"
                className="flex-1 p-2 border border-secondary rounded text-white bg-primary"
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
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-primary"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-secondary px-3 py-1 rounded-lg flex items-center gap-2"
                >
                  <span className="text-white">{skill}</span>
                  <button
                    onClick={() => deleteTechSkill(skill)}
                    className="text-primary hover:text-red-700"
                  >
                    <FaXmark />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-primary p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-white">
              Existing Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setProjectData(project)}
                      className="px-3 py-1 rounded-lg flex items-center bg-white text-tertiary hover:bg-secondary hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-3 py-1 rounded-lg flex items-center text-white bg-red-500 hover:bg-red-600"
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
