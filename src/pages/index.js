import { useContext, useState } from "react";
import PortfolioContext from "../context/PortfolioContext";

export default function Home() {
  const [hoveredLetter, setHoveredLetter] = useState({
    word: null,
    index: null,
  });

  const handleMouseEnter = (word, index) => {
    setHoveredLetter({ word, index });
  };
  const { projects, techSkills } = useContext(PortfolioContext);
  const renderLetters = (word, className) => {
    return word.split("").map((letter, index) => (
      <span
        key={index}
        className={`${className} ${
          hoveredLetter.word === word && hoveredLetter.index === index
            ? "text-secondary"
            : "text-white"
        } transition-colors duration-300`}
        onMouseEnter={() => handleMouseEnter(word, index)}
        onMouseLeave={() => setHoveredLetter({ word: null, index: null })}
      >
        {letter}
      </span>
    ));
  };
  return (
    <div className="min-h-screen bg-tertiary flex flex-col">
      {/* Hero */}
      <section className="text-center bg-primary py-20 text-white">
        {renderLetters(
          "Zarha Buske",
          "mb-10 hover:[text-shadow:0px_0px_100px_#f08fdd44] font-bold text-6xl sm:text-8xl md:text-[8rem] font-header leading-[90%] cursor-default"
        )}
        <br />
        {renderLetters(
          "Web Developer",
          "mb-10 hover:[text-shadow:0px_0px_100px_#f08fdd44] font-bold text-6xl sm:text-8xl md:text-[8rem] font-header leading-[90%] cursor-default"
        )}
        <p className="mt-4 max-w-2xl mx-auto md:text-xl">
          Stockholm-based web developer specializing in front-end magic.
          <br />
          Let’s collaborate and make the web extraordinary.
        </p>
      </section>

      {/* Tech Skills */}
      <section className="py-12 bg-tertiary px-4 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Technical Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {techSkills.map((skill, index) => (
            <span key={index} className="bg-secondary px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects  */}
      <section className="py-12 px-4 max-w-6xl mx-auto  text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-primary rounded-lg shadow-md p-6"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-secondary mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techUsed.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-primary text-white px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    className="text-blue-500 hover:underline block"
                  >
                    Demo
                  </a>
                )}
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    className="text-blue-500 hover:underline block"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer
        className="py-12 px-4 bg-primary text-white mt-auto
      flex flex-col justify-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-secondary">What&apos;s next?</p>
          <p className="text-[1.9rem] py-1">Get in touch</p>
          <a
            href="mailto:zarhabuske@hotmail.com"
            className="text-white no-underline border border-white rounded-full px-10 py-2 mt-2 inline-block transition-all duration-300 ease-in-out hover:text-secondary hover:border-secondary hover:animate-jelloHorizontal"
          >
            Say hello
          </a>
        </div>
      </footer>
    </div>
  );
}
