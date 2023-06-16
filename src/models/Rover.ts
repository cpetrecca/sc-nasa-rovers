export type IManifest = {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: string[];
};
export type IRover = {
  id: number;
  name: string;
  status: string;
  landing_date: string;
  launch_date: string;
  max_sol: number;
  max_date: string;
};

class Rover {
  id: number;
  name: string;
  status: string;
  landing_date: string;
  launch_date: string;
  max_sol: number;
  max_date: string;
  manifest?: any;
  constructor(data: {
    id: number;
    name: string;
    status: string;
    landing_date: string;
    launch_date: string;
    max_sol: number;
    max_date: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.landing_date = data.landing_date;
    this.launch_date = data.launch_date;
    this.max_sol = data.max_sol;
    this.max_date = data.max_date;
  }
  setManifest(manifest: IManifest[]) {
    this.manifest = manifest;
  }
  getFormDataByDate(date: string) {
    ///could add some validation checks and throw error if not good date format
    const camerasByDate = this.manifest.find((el: IManifest) => {
      return el.earth_date === date;
    });
    return {
      cameras: camerasByDate?camerasByDate.cameras:[],
      solDate: camerasByDate?camerasByDate.sol:"",
      earthDate: date,
      selectedRover: this.name,
    };
  }
  getFormDataBySol(date: string) {
    ///could add some validation checks and throw error if not good date format
    const camerasByDate = this.manifest.find((el: IManifest) => {
      return el.sol === +date;
    });
   
    return {
      cameras: camerasByDate?camerasByDate.cameras:[],
      solDate: date,
      earthDate: camerasByDate?camerasByDate.earth_date:"",
      selectedRover: this.name,
    };
  }
}

export default Rover;
