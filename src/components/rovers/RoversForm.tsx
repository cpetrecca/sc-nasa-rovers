"use client";

import Rover from "@/models/Rover";
import { roversConfig } from "@/config/roversConfig";
import { useState } from "react";
import Button from "../ui/Button";

type Props = {
  roversNames: string[];
  roverModel?: Rover;
  selectedRover: string;
  changeRoverHandler: Function;
  submitForm: Function;
};

type FormData = {
  earthDate: string;
  cameras: string[];
  solDate: number | string;
  selectedRover: string;
  selectedCamera?: string;
};

const RoversForm: React.FC<Props> = ({
  selectedRover,
  roverModel,
  roversNames,
  changeRoverHandler,
  submitForm,
}) => {
  const [formData, setFormData] = useState<FormData>({
    selectedRover: selectedRover,
    earthDate: roverModel!.max_date,
    cameras: roverModel?.getFormDataByDate(roverModel!.max_date).cameras,
    solDate: roverModel!.max_sol,
    selectedCamera: roversConfig.defaultCamera,
  });
  const [checkedCamera, setCheckedCamera] = useState(
    roversConfig.defaultCamera
  );
  const availableRovers = roversNames.map((rover, i) => {
    return (
      <option value={rover} key={rover + i}>
        {rover}
      </option>
    );
  });

  if (selectedRover !== formData.selectedRover) {
    setFormData({
      selectedRover: selectedRover,
      earthDate: roverModel!.max_date,
      cameras: roverModel?.getFormDataByDate(roverModel!.max_date).cameras,
      solDate: roverModel!.max_sol,
      selectedCamera: roversConfig.defaultCamera,
    });
  }

  const changeEarthDateHandler = (e: any) => {
    const newFormData = roverModel?.getFormDataByDate(e.target.value);
    setFormData(newFormData!);
  };

  const changeSolDateHandler = (e: any) => {
    const newFormData = roverModel?.getFormDataBySol(e.target.value);
    setFormData(newFormData!);
  };

  const datePicker = (
    <input
      className="bg-gray-800 mx-2"
      type="date"
      name="earthDate"
      value={formData.earthDate}
      max={roverModel!.max_date}
      min={roverModel!.landing_date}
      onChange={changeEarthDateHandler}
    />
  );

  const solDatePicker = (
    <input
      type="number"
      max={roverModel!.max_sol}
      min="0"
      value={formData.solDate}
      className="bg-gray-600"
      onChange={changeSolDateHandler}
    ></input>
  );

  const changeRoverNameHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeRoverHandler(e);
  };
  const changeCameraHandler = (e: any) => {
    setCheckedCamera(e.target.value);
  };

  const camerasAvailables = formData.cameras.map((cameraName, i) => {
    //for some obscure reason it was complaining about keys so I made sure it won complain anymore,beware: heresy is everywhere
    return (
      <div key={Math.random()} >
        <label key={Math.random()}>{cameraName}</label>
        <input
          onChange={changeCameraHandler}
          type="radio"
          name="cameras"
          key={Math.random()}
          value={cameraName}
          className="mx-2"
          checked={checkedCamera === cameraName}
        />
      </div>
    );
  });

  const submitFormHandler = () => {
    submitForm({ ...formData, selectedCamera: checkedCamera });
  };

  return (
    <form className="flex flex-col md:flex-row place-content-between pb-2 ">
      <div >
        <label htmlFor="rovers">Rovers</label>
        <select
          className="bg-black"
          name="rovers"
          value={formData.selectedRover}
          onChange={changeRoverNameHandler}
        >
          {availableRovers}
        </select>
        <label>
          Enter earth date:
          {datePicker}
        </label>
        <label>Or Solar</label>
        {solDatePicker}
        <fieldset className="flex flex-col md:flex-row">
          <legend>Check a camera: </legend>
          <label>All:</label>
          <input
            type="radio"
            onChange={changeCameraHandler}
            key="roversConfig.defaultCamera"
            checked={checkedCamera === roversConfig.defaultCamera}
            name="cameras"
            className=""
            value={roversConfig.defaultCamera}
          />
          {camerasAvailables}
        </fieldset>
      </div>
      <div  className="flex align-middle items-center">
        {camerasAvailables.length > 0 ? (
          <Button label="search" callBack={submitFormHandler}></Button>
        ) : (
          "Sorry no pictures for this date."
        )}

      </div>
    </form>
  );
};

export default RoversForm;
