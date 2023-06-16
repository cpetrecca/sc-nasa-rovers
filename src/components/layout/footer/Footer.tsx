import Image from "next/image";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-t z-20 from-mars-land to-black  fixed inset-x-0 bottom-0 rounded-t-[10px] h-[4rem] ">
      <Image
        className="animate-moveRover"
        src="/curiosity.png"
        width={80}
        height={80}
        alt="Curiosity rover"
        priority={true}
        quality={80}
      />
    </footer>
  );
};

export default Footer;
