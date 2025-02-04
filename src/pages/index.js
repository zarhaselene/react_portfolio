import { useContext } from "react";
import PortfolioContext from "../context/PortfolioContext";

export default function Home() {
  const { projects, techSkills } = useContext(PortfolioContext);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      {/* Hero */}
      <section className="text-center bg-gray-700 py-20 text-white">
        <h1 className="text-4xl font-bold mb-4">Your Name</h1>
        <p className="text-xl">Web Developer</p>
        <p className="mt-4 max-w-2xl mx-auto">lorem ipsum</p>
      </section>

      {/* Tech Skills */}
      <section className="py-12 bg-gray-800 px-4 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          Technical Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {techSkills.map((skill, index) => (
            <span key={index} className="bg-gray-700 px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects  */}
      <section className="py-12 px-4 max-w-6xl mx-auto bg-gray-800 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techUsed.map((tech, index) => (
                  <span
                    key={index}
                    className=" text-white px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                {project.demoLink && (
                  <a href={project.demoLink} className=" hover:underline block">
                    Demo
                  </a>
                )}
                {project.codeLink && (
                  <a href={project.codeLink} className="hover:underline block">
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 bg-gray-700 text-white mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
        </div>
      </section>
    </div>
  );
}
