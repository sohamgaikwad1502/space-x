import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WITH_ALL_FILTERS } from "../utils/constants";
import LaunchCards from "./LaunchCards";
import Spinner from "./Spinner";

const Launches = ({ year, launch, land }) => {
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [current_page, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const allLaunches = useSelector((store) => store.spaceXData.allData);
  const launchAndLand = useSelector((store) => store.spaceXData.launchAndLand);
  const launchSuccess = useSelector((store) => store.spaceXData.launch);

  const length = filteredLaunches.length;
  const page_length = 16;
  const no_of_pages = filteredLaunches ? Math.ceil(length / page_length) : 0;
  const start = current_page * page_length;
  const end = start + page_length;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const fetchAll = async (year) => {
    const withallfiltersData = await axios.get(WITH_ALL_FILTERS + year);
    return withallfiltersData.data;
  };

  useEffect(() => {
    if (!allLaunches || !launchAndLand || !launchSuccess) {
      setFilteredLaunches([]);
      return;
    }

    setLoading(true);

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
    setLoading(false);
  }, [year, launch, land, allLaunches, launchAndLand, launchSuccess]);

  if (loading || filteredLaunches.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      <LaunchCards
        filteredLaunches={filteredLaunches}
        start={start}
        end={end}
      />
      <div className="col-span-full text-2xl text-center items-center ">
        <button
          className="m-2 cursor-pointer"
          disabled={current_page === 0}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          <img
            src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/external-left-chevron-arrows-inkubators-detailed-outline-inkubators-2.png"
            alt="external-left-chevron-arrows-inkubators-detailed-outline-inkubators-2"
          />
        </button>
        {[...Array(no_of_pages).keys()].map((n) => {
          return (
            <button
              key={n}
              className={`px-2 py-1 m-1  text-2xl border-4 border-none cursor-pointer ${
                n === current_page ? "bg-green-500" : "bg-green-300"
              } `}
              onClick={() => {
                handlePageChange(n);
              }}
            >
              {n}
            </button>
          );
        })}
        <button
          disabled={current_page === no_of_pages - 1}
          className="m-2 cursor-pointer"
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          <img
            src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/external-right-chevron-arrows-inkubators-detailed-outline-inkubators-2.png"
            alt="external-right-chevron-arrows-inkubators-detailed-outline-inkubators-2"
          />
        </button>
      </div>
    </>
  );
};

export default Launches;
