import { createContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [techSkills, setTechSkills] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects");
    const savedSkills = localStorage.getItem("portfolioTechSkills");

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedSkills) setTechSkills(JSON.parse(savedSkills));
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolioTechSkills", JSON.stringify(techSkills));
  }, [techSkills]);

  // Create project
  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };
  // Update project
  const editProject = (id, updatedProject) => {
    setProjects(
      projects.map((proj) => (proj.id === id ? updatedProject : proj))
    );
  };

  // Delete project
  const deleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  // Create skill
  const addTechSkill = (skill) => {
    setTechSkills([...techSkills, skill]);
  };

  // Delete skill
  const deleteTechSkill = (skill) => {
    setTechSkills(techSkills.filter((s) => s !== skill));
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        techSkills,
        addProject,
        editProject,
        deleteProject,
        addTechSkill,
        deleteTechSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioContext;
