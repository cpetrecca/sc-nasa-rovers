import RoversClientController from "@/components/rovers/RoversClientController"
import { roversConfig } from "./../../config/roversConfig";
import {IRover} from "../../models/Rover";
const API_KEY = roversConfig.api_key;

async function getLatestPhotos(rover: string) {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API_KEY}`,
    { next: { revalidate: 60 * 24 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch rover data.");
  }
  const data = await res.json();

  return data;
}

async function getRovers() {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`,
    { next: { revalidate: 60 * 24 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch rover data.");
  }
  const data = await res.json();

  return data;
}

//we create the manifest data in the server; for completed rovers we will place once for year as we dont want out lazy server to work
async function getManifests(roverToFetch: IRover[]) {
  const fetchedRoversManifests = await Promise.all(
    roverToFetch.map((rover) => {
      const revalidationTime =
        rover.status === "active" ? 60 * 24 : 60 * 24 * 365;
      return fetch(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover.name}/?api_key=${API_KEY}`,
        { next: { revalidate: revalidationTime } }
      )
        .then((res) => {
          return res.json();
        })
        .catch(() => {
          throw new Error("Failed to fetch manifest");
        });
    })
  );
  return fetchedRoversManifests;
}

export default async function Rovers() {
  //Making te rover models with manifests for generating data and avoiding needless requests (a bit more on the clients load but less apis petitions)
  const roversFromEndpont = await getRovers();
  const roverModels = roversFromEndpont.rovers.map((rover: any) => {
    return rover;
  });


  const manifests= await getManifests(roverModels);
  const manifestToClient=manifests.map(man=>man.photo_manifest)

  //load latest photos of default rover
  const images = await getLatestPhotos(roversConfig.default);
  
  return (
    <div>
      <h1 className="border-b">Rovers</h1>

      <RoversClientController
        rovers={roverModels}
        manifests={manifestToClient}
        images={images.latest_photos}
      ></RoversClientController>
    </div>
  );
}
