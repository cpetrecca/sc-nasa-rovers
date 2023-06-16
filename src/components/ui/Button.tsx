import Link from "next/link";

type Props = {
  label: string;
  url?: string;
  callBack?: Function;
};

const Button: React.FC<Props> = ({ label, url, callBack = () => {} }) => {
  const callBackHandler = (e: any) => {
    e.preventDefault();
    callBack();
  };

  if (url) {
    return (
      <Link
        key={label}
        href={url}
        className="bg-nasa-blue border rounded-lg cursor-pointer p-1 hover:drop-shadow-[0_1px_2px_rgba(200,200,200,1)] active:bg-blue-800"
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      key={label}
      onClick={callBackHandler}
      className="bg-nasa-blue border rounded-lg cursor-pointer p-1 hover:drop-shadow-[0_1px_2px_rgba(200,200,200,1)] active:bg-blue-800"
    >
      {label}
    </button>
  );
};

export default Button;
