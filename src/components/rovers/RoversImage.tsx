import Image from "next/image";

type Props = {
  imageUrl: string;
};

const RoversImage: React.FC<Props> = ({ imageUrl }) => {
  return (
    <Image
      key={imageUrl}
      style={{
        borderRadius: '5%',
        maxWidth: "100%",
        height: "auto",
     
      }}
      width={200}
      height={0}
      className="w-full h-auto"
      src={imageUrl}
      alt={imageUrl}
      priority={true}
    />
  );
};

export default RoversImage;
