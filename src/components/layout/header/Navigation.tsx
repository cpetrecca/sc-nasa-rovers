import Button from "@/components/ui/Button";
import { navLinks } from "@/config/layoutConfig";

const Navigation = () => {
  return (
    <ul className="flex flox-row items-center p-2 w-[100%]  text-white gap-5">
       {navLinks.map(link=><li  key={link.label+"li"}><Button label={link.label} key={link.label} url={link.url}></Button></li>)}      
    </ul>
  );
};

export default Navigation;
