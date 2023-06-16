"use client";
import { useState, Suspense, useMemo, useEffect, useContext } from "react";
import useRoversCameras from "@/hooks/useRoversCameras";
import { roversConfig } from "@/config/roversConfig";
import Rover from "@/models/Rover";
import RoversImageGallery from "./RoverImageGallery";
import RoversForm from "./RoversForm";
import Loading from "../ui/Loading";
import Button from "../ui/Button";
import BookmarkContext from "@/store/bookmarks-context";
import { BookmarksContextProvider } from "@/store/bookmarks-context";

type Props = {
  images?: any[];
  manifests: any;
  rovers: Rover[];
};

type searchParams = {
  solDate: string;
  selectedCamera: string;
  selectedRover: string;
  page: number;
};

const RoversClientController: React.FC<Props> = ({
  images = [],
  manifests,
  rovers,
}) => {
  const bookmarkCtx=useContext(BookmarkContext);
  const [selectedRover, setSelectedRover] = useState(roversConfig.default);
  const [searchParams, setSearchParams] = useState<searchParams>();
  //custom hook for fetching images and keep code a bit tidier
  const {
    images: roverFetchedImages,
    loading: fetchingPhotos,
    noMorePicsToFetch,
    fetchRoverImages,
  } = useRoversCameras();

  //function that enables infinite rolling for more pleasure and better UX
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    if (searchParams && !fetchingPhotos) {
      const newParams = { ...searchParams, page: +searchParams.page + 1 };
      setSearchParams((prevParams) => {
        return { ...newParams, page: prevParams!.page + 1 };
      });
    }
  };
  
  //search new images on new search params
  useEffect(() => {
    if (searchParams)
      fetchRoverImages(
        searchParams.solDate,
        searchParams.selectedRover,
        searchParams?.selectedCamera,
        searchParams?.page
      );
  }, [searchParams]);
  //useEffect for infinite scrolling only if is not fetching images already
  useEffect(() => {
    if (!fetchingPhotos && !noMorePicsToFetch) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [fetchingPhotos]);

  //memo not really needed here as is not a big array but wanted to use it anyways just for show
  const roversModels: Rover[] = useMemo(() => {
    return rovers.map((rover) => new Rover(rover));
  }, [rovers]);

  //as Im relying on the manifests I know for sure there will be images back on every search
  const roverImages =
    roverFetchedImages.length > 0 ? roverFetchedImages : images;
  const roversNames = useMemo(() => {
    return roversModels.map((rover) => rover.name);
  }, [rovers]);
  const roverModel = roversModels.find((rover) => rover.name === selectedRover);
  const manifestForModel = manifests.find((manifest: any) => {
    return manifest.name === roverModel!.name;
  });
  roverModel?.setManifest(manifestForModel.photos);

  const setSelectedRoverHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRover(e.target.value);
  };

  //when searchParams state changes it triggers a useEffect for fetching 
  const fetchRoverImagesHandler = (formData: searchParams) => {
    setSearchParams({
      solDate: formData.solDate,
      selectedRover: selectedRover,
      selectedCamera: formData.selectedCamera,
      page: 1,
    });
  };
 
  //for some reason not calling the contextApi function
  const saveBookmarHandler=()=>{
    if(searchParams){
      bookmarkCtx.addBookmark(searchParams)}
    else{ (alert("Awfull alert to let you know you didnt made a search to bookmark yet!"))}
  }
  return (
    <BookmarksContextProvider>
      
      <Suspense fallback={<p>Loading form...</p>}>
        <RoversForm
          selectedRover={selectedRover}
          roversNames={roversNames}
          roverModel={roverModel}
          changeRoverHandler={setSelectedRoverHandler}
          submitForm={fetchRoverImagesHandler}
        />
        {searchParams &&  <Button label="BOOKMARK!" callBack={saveBookmarHandler}></Button>}
      
       <hr className="py-2"></hr> 
      </Suspense>

      {fetchingPhotos && (
        <Loading message="Fetching images, a long way from mars." />
      )}
      <RoversImageGallery fetchingPhotos={fetchingPhotos} noMorePicsToFetch={noMorePicsToFetch} roverImages={roverImages} />
    </BookmarksContextProvider>
  );
};

export default RoversClientController;
