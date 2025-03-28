import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WITH_ALL_FILTERS } from "../utils/constants";

const Launches = ({ year, launch, land }) => {
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const allLaunches = useSelector((store) => store.initialData);
  const launchAndLand = useSelector((store) => store.launch_and_land);
  const launchSuccess = useSelector((store) => store.launch_success);

  const fetchAll = async (year) => {
    const withallfiltersData = await axios.get(WITH_ALL_FILTERS + year);
    return withallfiltersData.data;
  };

  useEffect(() => {
    if (!allLaunches || !launchAndLand || !launchSuccess)
      return setFilteredLaunches([]);

    let filtered = [...allLaunches];
    if (year && launch && land) {
      async () => {
        const allFillteredData = await fetchAll(year);
        filtered = [...allFillteredData];
      };
    }
    if ((launch && land) || (year && land)) filtered = [...launchAndLand];
    if (year && launch) filtered = [...launchSuccess];

    if (year) {
      filtered = filtered.filter(
        (launchItem) => launchItem.launch_year === year.toString()
      );
    }

    if (launch !== null) {
      filtered = filtered.filter(
        (launchItem) => launchItem.launch_success === launch
      );
    }

    if (land !== null) {
      filtered = filtered.filter((launchItem) => {
        return launchItem.rocket?.first_stage?.cores?.some(
          (core) => core.land_success === land
        );
      });
    }

    setFilteredLaunches(filtered);
  }, [year, launch, land, allLaunches]);

  if (filteredLaunches.length === 0) {
    return (
      <div className="col-span-4 text-center text-gray-500 py-10">
        No launches found with the selected filters.
      </div>
    );
  }

  return (
    <>
      {filteredLaunches.map((launchItem) => (
        <div
          key={launchItem.flight_number}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-center mb-6 w-full">
            <div className="mb-6 w-full">
              <img
                src={
                  launchItem.links?.mission_patch_small ||
                  "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
                }
                alt={`${launchItem.mission_name} Mission Badge`}
                className="w-full h-64 object-contain bg-gray-200"
              />
            </div>

            <div className="flex-col justify-between items-center w-full">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                {launchItem.mission_name} #{launchItem.flight_number}
              </h2>

              <div className="mb-3">
                <span className="font-semibold text-base">Mission Ids:</span>
                <ul className="list-disc list-inside text-base text-gray-800">
                  {launchItem.mission_id?.length > 0 ? (
                    launchItem.mission_id.map((id) => (
                      <li key={id} className="ml-2">
                        {id}
                      </li>
                    ))
                  ) : (
                    <li className="ml-2">No Mission IDs</li>
                  )}
                </ul>
              </div>

              <div className="mb-3">
                <span className="font-semibold text-base">Launch Year:</span>
                <span className="text-base text-gray-800 ml-2">
                  {launchItem.launch_year}
                </span>
              </div>

              <div className="mb-3">
                <span className="font-semibold text-base">
                  Successful Launch:
                </span>
                <span className="text-base text-gray-800 ml-2">
                  {launchItem.launch_success ? "True" : "False"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-base">
                  Successful Landing:
                </span>
                <span className="text-base text-gray-800 ml-2">
                  {launchItem.rocket?.first_stage?.cores?.some(
                    (core) => core.land_success
                  )
                    ? "True"
                    : "False"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Launches;
