import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex mt-[15%] md:mt-[8%] mb-20 w-[80%] flex-col border rounded-md  items-center justify-between p-2 z-10 bg-[rgba(250,250,250,0.1)] text-white">
      {children}
    </main>
  );
};

export default Main;
