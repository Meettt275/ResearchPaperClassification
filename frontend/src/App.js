import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");

  const handlePrediction = async () => {
    if (!title.trim()) {
      setError('Please enter a research paper title');
      return;
    }
    try {
      const response = await axios.post("https://meettt275.pythonanywhere.com/predict", {
        titles: [title],
      });
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (!input.trim().match(/^\d+$/)) {
      setTitle(input);
      setError("");
    } else {
      setError("Input cannot contain only numeric characters");
    }
  };

  return (
    <div className="container">
      <h1>Research Paper Title Predictor</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter research paper title"
          value={title}
          onChange={handleChange}
        />
        <button onClick={handlePrediction}>Predict</button>
        <h2>Predictions:</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {predictions && (
          <div className="result">
            {/* <p className="result-label">Domain:</p>
            <p className="result-value">{predictions}</p> */}
            <p className="result-label">Subdomain:</p>
            <p className="result-value">{predictions}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
