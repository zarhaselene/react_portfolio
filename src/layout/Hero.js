import { useState, useEffect } from "react";
import { FaMapPin } from "react-icons/fa";

const Hero = () => {
  const [lineWidth, setLineWidth] = useState(450);

  const handleScroll = () => {
    const position = window.scrollY;
    const scrollDistance = 200;
    const scrollRatio = Math.min(position / scrollDistance, 1);
    const newLineWidth = 400 + scrollRatio * 560;
    setLineWidth(newLineWidth);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-[98vh] w-full relative overflow-hidden">
      <div className="max-w-full w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1300px]">
        <div className="hidden sm:flex items-center justify-center">
          <h1 className="text-white font-bold leading-[90%] text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem]">
            Front
          </h1>
          <span
            className="block bg-white h-[10px] mx-[10px] md:h-[15px] md:mx-[15px] lg:h-[20px] xl:mx-[50px]"
            style={{ minWidth: `${lineWidth}px` }}
          ></span>
          <h1 className="text-[5rem] text-white font-bold leading-[90%]  md:text-[6rem] lg:text-[8rem] xl:text-[10rem]">
            End
          </h1>
        </div>
        <div className="mb-8">
          <h1 className="text-white font-bold leading-[90%] text-[5rem] sm:hidden">
            Front End
          </h1>
          <h1 className="text-white font-bold leading-[90%] text-[5rem] sm:hidden">
            Developer
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-28 xl:flex-row xl:items-center lg:items-start">
          <div className="hidden sm:block">
            <h1 className="text-[5rem] text-white font-bold leading-[90%]  md:text-[6rem] lg:text-[8rem] xl:text-[10rem]">
              Developer
            </h1>
          </div>
          <div className="flex flex-col items-start text-left w-full xl:w-[25%] lg:mt-[20px]">
            <h3 className="text-secondary hover:animate-jello-horizontal text-[1.2rem] font-light tracking-[3px]">
              Hello there,
            </h3>
            <h2 className="text-[2.5rem] text-white ">I&rsquo;m Zarha</h2>
            <p className="text-white text-[1rem] sm:text-[0.875rem]">
              Stockholm-based web developer specializing in front-end magic.
              <br />
              Let&rsquo;s collaborate and make the web extraordinary.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[14px]">
        <span className="w-[5px] h-[5px] bg-secondary rounded-full absolute top-[-10px] left-1/2 transform -translate-x-1/2 animate-moveAndFade"></span>
        <span className="text-white ">Scroll to Explore</span>
      </div>
      <div className="text-white absolute bottom-0 right-5 flex items-center">
        <span className="text-secondary">
          <FaMapPin size={20} alt="Location Icon" />
        </span>
        <span className="ml-[5px]">Stockholm</span>
      </div>
    </div>
  );
};

export default Hero;
