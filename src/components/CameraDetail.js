import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function CameraDetail() {
  const [cleanlinessScore, setCleanlinessScore] = useState(100);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [detectedItems, setDetectedItems] = useState({
    recyclable: [],
    non_recyclable: [],
    hazardous: []
  });
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);

  // Webcam constraints for better detection
  const videoConstraints = {
    width: 640,
    height: 640,
    facingMode: "environment"
  };

  const processFrame = async () => {
    if (!webcamRef.current || loading) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("Unable to capture webcam frame.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/detect", {
        image: imageSrc
      });

      const {
        cleanliness_score,
        timestamp,
        detected_items,
        detected_counts
      } = response.data;

      // Only update score if there's a significant change
      setCleanlinessScore(prevScore => {
        const scoreDiff = Math.abs(prevScore - cleanliness_score);
        return scoreDiff > 1 ? cleanliness_score : prevScore;
      });
      
      setDetectedItems(detected_items);
      
      // Update score history only when items are detected or score changes
      if (Object.values(detected_counts).some(count => count > 0)) {
        setScoreHistory(prev => [{
          score: cleanliness_score,
          timestamp: timestamp,
          counts: detected_counts
        }, ...prev.slice(0, 9)]); // Keep last 10 entries
      }
      
    } catch (error) {
      console.error("Error detecting waste:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(processFrame, 1000); // Increased frequency for better detection
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-orange-100";
    return "bg-red-100";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! Area is clean.";
    if (score >= 60) return "Moderate. Some items need attention.";
    return "Poor. Immediate cleaning recommended.";
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Real-time Waste Detection</h2>

        {/* Webcam Display */}
        <div className="webcam-container mb-4 flex justify-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="h-[640px] w-[640px] object-cover rounded-md"
          />
        </div>

        {/* Detected Items Display */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-yellow-100">
            <h3 className="font-bold mb-2">Recyclable Items</h3>
            <ul className="list-disc pl-4">
              {detectedItems.recyclable.length > 0 
                ? detectedItems.recyclable.map((item, idx) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))
                : <li>None detected</li>}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-100">
            <h3 className="font-bold mb-2">Non-Recyclable Items</h3>
            <ul className="list-disc pl-4">
              {detectedItems.non_recyclable.length > 0 
                ? detectedItems.non_recyclable.map((item, idx) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))
                : <li>None detected</li>}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-red-100">
            <h3 className="font-bold mb-2">Hazardous Items</h3>
            <ul className="list-disc pl-4">
              {detectedItems.hazardous.length > 0 
                ? detectedItems.hazardous.map((item, idx) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))
                : <li>None detected</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/4 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Detection Console</h2>
        
        {/* Current Score */}
        <div className={`mb-6 p-4 rounded-lg ${getScoreColor(cleanlinessScore)}`}>
          <h3 className="text-lg font-bold text-center">Cleanliness Score</h3>
          <p className="text-3xl font-bold text-center">{cleanlinessScore.toFixed(1)}</p>
          <p className="text-center mt-2">{getScoreMessage(cleanlinessScore)}</p>
        </div>

        {/* Score History */}
        <div className="score-history">
          <h3 className="text-lg font-bold mb-2">Score History</h3>
          {scoreHistory.map((entry, idx) => (
            <div key={idx} className="mb-2 p-2 bg-white rounded shadow-sm">
              <p className="text-sm text-gray-600">{entry.timestamp}</p>
              <p className="font-bold">Score: {entry.score.toFixed(1)}</p>
              <p className="text-xs">
                R: {entry.counts.recyclable} | 
                NR: {entry.counts.non_recyclable} | 
                H: {entry.counts.hazardous}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CameraDetail;