"use client";
import { useState } from "react";
import { roversConfig } from "./../config/roversConfig";

type RoverImages = {
  id: string | number;
  img_src: string;
};

const API_KEY = roversConfig.api_key;

const useRoversCameras = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [noMorePicsToFetch, setNoMorePicsToFetch] = useState<boolean>(false);
  const [images, setImages] = useState<RoverImages[]>([]);

  const fetchRoverImages = async (
    date: string,
    roverName: string,
    camera = roversConfig.defaultCamera,
    pageNumber = 1
  ) => {
    setLoading(true);
    if(pageNumber==1 && noMorePicsToFetch){setNoMorePicsToFetch(false)}

    const selectedCamara =
      camera === roversConfig.defaultCamera ? "" : "&camera=" + camera;
    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${date}${selectedCamara}&page=${pageNumber}&api_key=${API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch rover data.");
    }
    const data = await res.json();
    if (data.photos.length > 0) {
      const fetchedImages = data.photos.map((photo: RoverImages) => {
        return { id: photo.id, img_src: photo.img_src };
      });
      if (pageNumber == 1) {
        setImages(fetchedImages);
      } else {
        setImages((prevImages) => {
          return [...prevImages, ...fetchedImages];
        });
      }
    } else {
      setNoMorePicsToFetch(true);
    }

    setLoading(false);
  };

  return { images, loading, noMorePicsToFetch, fetchRoverImages };
};
export default useRoversCameras;
