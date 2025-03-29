import React from "react";

const LaunchCards = ({ filteredLaunches, start, end }) => {
  return (
    <>
      {filteredLaunches.slice(start, end).map((launchItem) => (
        <div
          key={launchItem.flight_number}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-center mb-6 w-80px">
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

            <div className="flex-col justify-between items-center w-80px">
              <div className="text-xl font-bold text-blue-700 mb-4 text-center flex flex-wrap">
                <h1>{launchItem.mission_name}</h1>{" "}
                <h1>#{launchItem.flight_number}</h1>
              </div>

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

export default LaunchCards;
