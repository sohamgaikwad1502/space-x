import React, { useEffect, useState } from "react";
import axios from "axios";
import Launches from "./Launches";
import { useDispatch } from "react-redux";
import {
  WITH_LAUNCH_AND_LAND,
  WITH_LAUNCH_SUCCESS,
  WITHOUT_ANY_FILTERS,
} from "../utils/constants";
import { addAllData } from "../utils/slices/initialDataSlice";
import { addLaunches } from "../utils/slices/launchSlice";
import { addLaunchAndLand } from "../utils/slices/launchAndLandSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(null);
  const [launchSuccess, setLaunchSuccess] = useState(null);
  const [landSuccess, setLandSuccess] = useState(null);

  const generate_years = () => {
    const arr = [];
    for (let i = 2006; i <= 2020; i++) {
      arr.push(i);
    }
    return arr;
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get(WITHOUT_ANY_FILTERS);
      dispatch(addAllData(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLaunchAndLand = async () => {
    try {
      const response = await axios.get(WITH_LAUNCH_AND_LAND);
      dispatch(addLaunchAndLand(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchlaunchsuccess = async () => {
    try {
      const response = await axios.get(WITH_LAUNCH_SUCCESS);
      dispatch(addLaunches(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchLaunchAndLand();
    fetchlaunchsuccess();
  }, []);

  const handleYearFilter = (year) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleLaunchSuccessFilter = (success) => {
    setLaunchSuccess(launchSuccess === success ? null : success);
  };

  const handleLandSuccessFilter = (success) => {
    setLandSuccess(landSuccess === success ? null : success);
  };

  const renderFilterSection = () => (
    <div
      className={`
      w-full bg-white p-4 
      lg:w-64 lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:overflow-y-auto lg:shadow-sm
      md:w-64 md:fixed md:left-0 md:top-16 md:bottom-0 md:overflow-y-auto md:shadow-sm
    `}
    >
      <h1 className="font-bold text-2xl text-left mb-4">Filters</h1>
      <div className="mb-4">
        <h1 className="text-xl text-center mb-2 border-b">Launch Year</h1>
        <div className="grid grid-cols-2 gap-2">
          {generate_years().map((year) => (
            <button
              key={year}
              className={`py-2 px-4 rounded-sm text-sm 
              cursor-pointer transition-colors duration-200 ${
                selectedYear === year
                  ? "bg-green-500 text-white"
                  : "bg-green-200 hover:bg-green-300"
              }`}
              onClick={() => handleYearFilter(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-2 pt-2">
        <h1 className="text-xl text-center mb-4 border-b pb-2">
          Successful Launch
        </h1>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`rounded-sm py-2 px-4 text-sm 
            cursor-pointer transition-colors duration-200 ${
              launchSuccess === true
                ? "bg-green-500 text-white"
                : "bg-green-200 hover:bg-green-300"
            }`}
            onClick={() => handleLaunchSuccessFilter(true)}
          >
            True
          </button>
          <button
            className={`rounded-sm py-2 px-4 text-sm 
            cursor-pointer transition-colors duration-200 ${
              launchSuccess === false
                ? "bg-green-500 text-white"
                : "bg-green-200 hover:bg-green-300"
            }`}
            onClick={() => handleLaunchSuccessFilter(false)}
          >
            False
          </button>
        </div>
      </div>
      <div className="mb-2 pt-2">
        <h1 className="text-xl text-center mb-4 border-b pb-2">
          Successful Landing
        </h1>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`rounded-sm py-2 px-4 text-sm 
            cursor-pointer transition-colors duration-200 ${
              landSuccess === true
                ? "bg-green-500 text-white"
                : "bg-green-200 hover:bg-green-300"
            }`}
            onClick={() => handleLandSuccessFilter(true)}
          >
            True
          </button>
          <button
            className={`rounded-sm py-2 px-4 text-sm 
            cursor-pointer transition-colors duration-200 ${
              landSuccess === false
                ? "bg-green-500 text-white"
                : "bg-green-200 hover:bg-green-300"
            }`}
            onClick={() => handleLandSuccessFilter(false)}
          >
            False
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-gray-200 z-10 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-black p-4">
          SpaceX Launch Programs
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow pt-16">
        {renderFilterSection()}
        <div
          className={`
          flex-grow overflow-y-auto p-4
          lg:ml-64 
          md:ml-64 
          sm:ml-0
        `}
        >
          <div
            className={`
            grid gap-6 
            lg:grid-cols-4 
            md:grid-cols-2 
            sm:grid-cols-1
          `}
          >
            <Launches
              year={selectedYear}
              launch={launchSuccess}
              land={landSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
