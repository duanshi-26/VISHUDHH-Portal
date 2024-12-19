import React ,{ useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import StateDashboard from "./StateDashboard";
import DistrictDashboard from "./DistrictDashboard";

const AdminDashboard = () => {

  const [states, setStates] = useState([
    { name: "Maharashtra", districts: [{ name: "Mumbai", cameraIP: "192.168.1.1" }] },
    { name: "Bihar", districts: [{ name: "Patna", cameraIP: "192.168.1.2" }] },
  ]);
  const [expandedState, setExpandedState] = useState(null);
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newCameraIP, setNewCameraIP] = useState("");
  const [newStateName, setNewStateName] = useState("");
  const [newStateDistrictCount, setNewStateDistrictCount] = useState("");

  const toggleExpandedState = (stateIndex) => {
    setExpandedState(expandedState === stateIndex ? null : stateIndex);
  };

  const handleAddDistrict = (stateIndex) => {
    if (newDistrictName && newCameraIP) {
      const updatedStates = [...states];
      updatedStates[stateIndex].districts.push({
        name: newDistrictName,
        cameraIP: newCameraIP,
      });
      setStates(updatedStates);
      setNewDistrictName("");
      setNewCameraIP("");
    }
  };

  const handleDeleteDistrict = (stateIndex, districtIndex) => {
    const updatedStates = [...states];
    updatedStates[stateIndex].districts.splice(districtIndex, 1);
    setStates(updatedStates);
  };

  const handleAddState = () => {
    if (newStateName && newStateDistrictCount) {
      const districtCount = parseInt(newStateDistrictCount, 10);
      const newState = { name: newStateName, districts: [] };
      // Add default districts based on the entered count
      for (let i = 0; i < districtCount; i++) {
        newState.districts.push({ name: `District ${i + 1}`, cameraIP: "" });
      }
      setStates([...states, newState]);
      setNewStateName("");
      setNewStateDistrictCount("");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg sticky top-0 z-50 flex justify-between items-center h-20 px-6">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            to="/state-dashboard"
            className="bg-green-700 hover:bg-green-800 px-6 py-2 text-white font-semibold rounded"
          >
            State Dashboard
          </Link>
          <Link
            to="/district-dashboard"
            className="bg-green-700 hover:bg-green-800 px-6 py-2 text-white font-semibold rounded"
          >
            District Dashboard
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Admin Dashboard Content */}
        <Route
          path="/"
          element={
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Reports */}
                <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                  <div className="text-blue-600 text-4xl mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c.638-2.024 1.278-4.03 2.56-5.93 1.099-1.636 3.205-2.045 4.905-1.314M16.88 3.12l3.5 2.28-2.28 3.5M6 12h.01M3.12 7.12l3.5 2.28-2.28 3.5M12 16c.638-2.024 1.278-4.03 2.56-5.93 1.099-1.636 3.205-2.045 4.905-1.314M16.88 11.12l3.5 2.28-2.28 3.5M12 16c-.638 2.024-1.278-4.03-2.56-5.93-1.099-1.636-3.205-2.045-4.905-1.314M7.12 20.88l3.5-2.28-2.28-3.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-600 text-lg font-semibold">
                      Total Reports Submitted
                    </h2>
                    <p className="text-3xl font-bold">1200</p>
                  </div>
                </div>

                {/* Total Post Offices */}
                <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                  <div className="text-green-600 text-4xl mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10l1.79 5.37c.15.44.54.75 1 .75h8.42a1.75 1.75 0 001.74-1.54L17.4 10M10 2l-2 4m6-4l2 4m-8 8h8m-8 0c.3.91 1.16 2 3 2s2.7-1.09 3-2M12 18v4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-600 text-lg font-semibold">
                      Total Post Offices Monitored
                    </h2>
                    <p className="text-3xl font-bold">850</p>
                  </div>
                </div>
              </div>

              {/* Performance Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Best Performing State */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                  <h2 className="text-gray-600 text-lg font-semibold">
                    Best Performing State
                  </h2>
                  <p className="text-2xl font-bold text-green-600">
                    Maharashtra
                  </p>
                </div>

                {/* Worst Performing State */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                  <h2 className="text-gray-600 text-lg font-semibold">
                    Worst Performing State
                  </h2>
                  <p className="text-2xl font-bold text-red-600">Bihar</p>
                </div>
              </div>
            </div>
          }
        />

        {/* State Dashboard */}
        <Route path="/state-dashboard" element={<StateDashboard />} />

        {/* District Dashboard */}
        <Route path="/district-dashboard" element={<DistrictDashboard />} />
      </Routes>

      <div className="p-6">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Manage States and Districts
        </h2>
        
        {/* Add New State Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Add New State</h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newStateName}
              onChange={(e) => setNewStateName(e.target.value)}
              placeholder="Enter state name"
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              type="number"
              value={newStateDistrictCount}
              onChange={(e) => setNewStateDistrictCount(e.target.value)}
              placeholder="Enter number of districts"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button
              onClick={handleAddState}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add State
            </button>
          </div>
        </div>

        {/* State and District Management */}
        {states.map((state, stateIndex) => (
          <div key={stateIndex} className="mb-4">
            <div
              className="flex justify-between items-center bg-emerald-50 p-4 rounded shadow cursor-pointer"
              onClick={() => toggleExpandedState(stateIndex)}
            >
              <span className="text-lg font-medium text-gray-800">
                {state.name} - {state.districts.length} Districts
              </span>
              <button
                className={`text-sm px-2 py-1 rounded ${
                  expandedState === stateIndex
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {expandedState === stateIndex ? "Collapse" : "Expand"}
              </button>
            </div>

            {/* Expandable District List */}
            {expandedState === stateIndex && (
              <div className="bg-emerald-50 p-4 mt-2 rounded shadow">
                {state.districts.map((district, districtIndex) => (
                  <div
                    key={districtIndex}
                    className="flex justify-between items-center bg-white p-3 rounded shadow mb-2"
                  >
                    <span className="text-gray-700">
                      {district.name} - Camera IP: {district.cameraIP}
                    </span>
                    <button
                      onClick={() => handleDeleteDistrict(stateIndex, districtIndex)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {/* Add New District */}
                <div className="flex items-center space-x-4 mt-4">
                  <input
                    type="text"
                    value={newDistrictName}
                    onChange={(e) => setNewDistrictName(e.target.value)}
                    placeholder="Enter district name"
                    className="flex-1 px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={newCameraIP}
                    onChange={(e) => setNewCameraIP(e.target.value)}
                    placeholder="Enter camera IP"
                    className="flex-1 px-4 py-2 border rounded"
                  />
                  <button
                    onClick={() => handleAddDistrict(stateIndex)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
                  >
                    Add District
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
 





    </div>
  );
};

export default AdminDashboard;
