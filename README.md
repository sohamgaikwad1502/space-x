# SpaceX Launch Programs

This project is a React-based web application that displays SpaceX launch programs with filtering options for launch year, successful launches, and successful landings.

## Features

- Fetches and displays SpaceX launch data using APIs
- Filters launches based on:
  - Launch Year
  - Successful Launch
  - Successful Landing
- Uses Redux for state management
- Responsive UI using Tailwind CSS

## Technologies Used

- React.js
- Redux
- Axios (for API calls)
- Tailwind CSS

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sohamgaikwad1502/SpaceX_Assignment.git
   ```
2. Navigate to the project directory:
   ```sh
   cd space-x
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
src/
│── components/
│   ├── Home.jsx
│   ├── Launches.jsx
│── utils/
│   ├── constants.js
│   ├── slices/
│       ├── initialDataSlice.js
│       ├── launchSlice.js
│       ├── launchAndLandSlice.js
    ├── store.js
│── App.jsx
│── main.jsx
```

## API Endpoints

- `WITHOUT_ANY_FILTERS` - Fetches all launches
- `WITH_LAUNCH_AND_LAND` - Fetches launches with successful landings
- `WITH_LAUNCH_SUCCESS` - Fetches launches with successful launches
- `WITH_ALL_FILTERS` - Fetches launches filtered by year

## Approach & Logic

### Data Fetching
- The application fetches SpaceX launch data using Axios.
- The `fetchAll` , `fetchLaunchAndLand` , `fetchlaunchsuccess` function retrieves data based on the APIS and their filters.

### Filtering Mechanism
- The `Launches` component filters launches dynamically using React state (`useState`) and `useEffect`.
- It extracts data from the Redux store using `useSelector`.
- The component filters data based on:
  - **Launch Year**: Filters based on `launch_year`.
  - **Successful Launch**: Filters based on `launch_success`.
  - **Successful Landing**: Extracts `land_success` from `rocket.first_stage.cores`.
- The component updates the displayed launches whenever filters change.

### Redux State Management
- The Redux store maintains initial launch data and filtered data.
- Slices (`initialDataSlice`, `launchSlice`, `launchAndLandSlice`) manage different parts of the state.
- The state updates dynamically when new filters are applied.

### UI Rendering
- The `Launches` component displays filtered launch details inside responsive cards.
- Uses Tailwind CSS for styling.
- Shows mission patches, mission name, year, and success status.
- Displays a message when no launches match the filters.

## Usage

1. Select a launch year to filter launches.
2. Toggle between successful launches and landings.
3. View detailed launch information including:
   - Mission Name
   - Flight Number
   - Launch Year
   - Mission IDs
   - Success Status

