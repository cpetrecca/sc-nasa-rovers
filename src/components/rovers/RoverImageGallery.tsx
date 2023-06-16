import RoversImage from "./RoversImage";
import Loading from "../ui/Loading";

type Props = {
  roverImages: any;
  fetchingPhotos: boolean;
  noMorePicsToFetch:boolean;
};

const RoversImageGallery: React.FC<Props> = ({
  roverImages,
  fetchingPhotos,
  noMorePicsToFetch
}) => {
  return (
    <div
      key={"ImageGalleryContainer"}
      className="mx-auto space-y-2 gap-1 lg:space-y-0 lg:gap-2 md:grid  md:grid-cols-4 lg:grid-cols-5 max-h-[2] "
    >
      {roverImages.map((el: any) => {
        return (
          <div
            key={el.id + "container"}
            className="w-full rounded flex content-center items-center bg-[rgba(250,250,250,0.2)]  hover:bg-[rgba(250,250,250,0.4)] hover:trasnsition-all cursor-pointer"
          >
            <RoversImage key={el.id} imageUrl={el.img_src}></RoversImage>
          </div>
        );
      })}
      {fetchingPhotos && <Loading message="Loading more pictures..." />}
      {noMorePicsToFetch && <p>Sorry, thats all we can give you with this search params.</p>}
    </div>
  );
};

export default RoversImageGallery;
