import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="min-w-[100%] h-[8%] absolute top-0 z-10">
      <div className=" top-0 bg-nasa-blue z-10 border-b border-b-white min-h-[3px]"> </div>
      <Navigation />
    </header>
  );
};

export default Header;
