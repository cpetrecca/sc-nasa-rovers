const Star = () => {
  const randomWidthPosition = Math.floor(Math.random() * 100);
  const randomHeightPosition = Math.floor(Math.random() * 100);
  const randomBlur = Math.floor(Math.random() * 10) / 2;
  const randomColor = Math.floor(Math.random() * 10);
  const randomPulse= randomHeightPosition%2===0? "animate-pulse":"";
  let color = "white";
  if (randomColor > 5 && randomColor < 8) {
    color = "#415c85";
  } else if (randomColor > 8 && randomColor < 10) {
    color = "#f8fabe";
  } else if (randomColor === 10) {
    color = "#fa0734";
  }

  //as tailwind doesnt catch dinamically created values for styles and doesnt compiles it to actual css had to use style object
  return (
    <div
      style={{
        top: `${randomHeightPosition}%`,
        left: `${randomWidthPosition}%`,
        filter: `blur(${randomBlur}px)`,
        backgroundColor: color,
      }}
      className={`w-[1px] h-[1px] absolute  op rounded-full ${randomPulse} transition-all`}
    ></div>
  );
};

export default Star;
