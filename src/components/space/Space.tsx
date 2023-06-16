import Star from "./Star";

const stars: React.ReactElement[] = [];
for (let index = 0; index < 500; index++) {
  stars.push(<Star key={index} />);
}

const Space=()=>{
 return(
    <div className="bg-black h-screen w-screen fixed top-0 left-0 z-[-10]">
    {stars}
    </div>
 )
}

export default Space;