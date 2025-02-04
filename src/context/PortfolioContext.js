import { createContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const baseProjects = [
    {
      id: 1,
      title: "Graduation Countdown Timer",
      description:
        "This project is a countdown timer that counts down to a specific date and time, displaying the remaining days, hours, minutes, and seconds. The timer includes a flip animation effect for the digits when they change.",
      techUsed: ["JavaScript", "CSS", "HTML"],
      codeLink: "https://github.com/zarhaselene/countdown",
      image: "/assets/countdown.png",
    },
    {
      id: 2,
      title: "Todo App",
      description:
        "This project is a simple Todo application built with React and Vite. It allows users to add, mark as done, and remove tasks. The application also persists tasks in the browser's local storage.",
      techUsed: ["React", "Tailwind"],
      codeLink: "https://github.com/zarhaselene/react_todoapp",
      image: "/assets/todo.jpg",
    },
    {
      id: 3,
      title: "Gemini AI: Multi-Functional AI Assistant",
      description:
        "Gemini AI-site is a web application that leverages AI to provide various functionalities such as generating recipes, solving mathematical equations, and more. The application is built using modern web technologies and provides a seamless user experience.",
      techUsed: ["Next.js", "Tailwind", "Flowbite", "Gemini AI"],
      codeLink: "https://github.com/zarhaselene/gemini_ai-site/tree/main",
      image: "/assets/geminiAi.jpg",
    },
  ];

  const baseSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "PHP",
    "REST APIs",
  ];

  const [projects, setProjects] = useState(baseProjects);
  const [techSkills, setTechSkills] = useState(baseSkills);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProjects = localStorage.getItem("portfolioProjects");
      const savedSkills = localStorage.getItem("portfolioTechSkills");

      if (savedProjects) setProjects(JSON.parse(savedProjects));
      if (savedSkills) setTechSkills(JSON.parse(savedSkills));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Saving projects to localStorage:", projects); // Debug log
      localStorage.setItem("portfolioProjects", JSON.stringify(projects));
      localStorage.setItem("portfolioTechSkills", JSON.stringify(techSkills));
    }
  }, [projects, techSkills]);

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };

  const editProject = (id, updatedProject) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, ...updatedProject } : proj
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const addTechSkill = (skill) => {
    setTechSkills([...techSkills, skill]);
  };

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
