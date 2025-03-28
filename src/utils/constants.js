const WITHOUT_ANY_FILTERS = "https://api.spacexdata.com/v3/launches?limit=100";
const WITH_LAUNCH_SUCCESS =
  "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true";
const WITH_LAUNCH_AND_LAND =
  "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true";
const WITH_ALL_FILTERS =
  "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=";

export {
  WITHOUT_ANY_FILTERS,
  WITH_LAUNCH_SUCCESS,
  WITH_LAUNCH_AND_LAND,
  WITH_ALL_FILTERS,
};
