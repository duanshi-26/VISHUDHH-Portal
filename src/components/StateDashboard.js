import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Moon, Sun, Camera } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StateDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Mock data
  const cleanlinessPercentage = 72;
  const alertPercentage = 45;

  const districts = [
    { id: 1, name: 'North District', cleanliness: 82 },
    { id: 2, name: 'South District', cleanliness: 68 },
    { id: 3, name: 'East District', cleanliness: 77 },
    { id: 4, name: 'West District', cleanliness: 71 },
    { id: 5, name: 'Central District', cleanliness: 79 },
    { id: 6, name: 'Urban District', cleanliness: 65 },
  ];

  const emergencyAlerts = [
    {
      id: 1,
      imageUrl: 'https://media.gettyimages.com/id/1473816323/photo/full-bins-because-of-waste-collection-strike.jpg?s=612x612&w=gi&k=20&c=-Cc4CwOugVx5ZXY9-KCu1Orf7J3ZzwtAIsH--42DgE0=',
      cleanliness: 50,
      location: 'North District',
      timestamp: '10 minutes ago'
    },
    {
      id: 2,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1681488503746-0e2cfffb5b36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FyYmFnZXxlbnwwfHwwfHx8MA%3D%3D',
      cleanliness: 30,
      location: 'South District',
      timestamp: '25 minutes ago'
    },
    {
      id: 3,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661964003668-f499e888f1b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cleanliness: 40,
      location: 'East District',
      timestamp: '45 minutes ago'
    },
  ];

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Cleanliness',
        data: [90, 85, 80, 75, 70, 65, 60],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Alerts',
        data: [10, 15, 20, 25, 30, 35, 40],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#1F2937',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#fff' : '#1F2937',
        },
      },
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#fff' : '#1F2937',
        },
      },
    },
  };

  const handleDistrictClick = (districtId) => {
    navigate(`/district-dashboard`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            State Dashboard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'
            } hover:bg-opacity-80`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className={`lg:col-span-2 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="col-span-2">
                <div className="flex items-center space-x-4">
                  <div className="w-24">
                    <CircularProgressbar
                      value={cleanlinessPercentage}
                      text={`${cleanlinessPercentage}%`}
                      styles={buildStyles({
                        textColor: darkMode ? '#A7F3D0' : '#166534',
                        pathColor: '#10B981',
                        trailColor: darkMode ? '#374151' : '#D1FAE5',
                      })}
                    />
                    <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Cleanliness
                    </p>
                  </div>
                  <div className="w-24">
                    <CircularProgressbar
                      value={alertPercentage}
                      text={`${alertPercentage}%`}
                      styles={buildStyles({
                        textColor: darkMode ? '#FCA5A5' : '#991B1B',
                        pathColor: '#EF4444',
                        trailColor: darkMode ? '#374151' : '#FEE2E2',
                      })}
                    />
                    <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Alerts
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <Line data={monthlyData} options={options} height={120} />
              </div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              District Controls
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {districts.map((district) => (
                <button
                  key={district.id}
                  onClick={() => handleDistrictClick(district.id)}
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-md"
                >
                  <Camera size={16} />
                  <span>{district.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="mt-6">
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Emergency Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl shadow-lg overflow-hidden ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <img
                  src={alert.imageUrl}
                  alt={`Alert at ${alert.location}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {alert.location}
                      </h3>
                      <p className="text-sm text-gray-500">{alert.timestamp}</p>
                    </div>
                    <div className="w-16">
                      <CircularProgressbar
                        value={alert.cleanliness}
                        text={`${alert.cleanliness}%`}
                        styles={buildStyles({
                          textColor: darkMode ? '#A7F3D0' : '#166534',
                          pathColor: alert.cleanliness < 50 ? '#EF4444' : '#10B981',
                          trailColor: darkMode ? '#374151' : '#E5E7EB',
                        })}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleDistrictClick(alert.id)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateDashboard;