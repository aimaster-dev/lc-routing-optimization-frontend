/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './ResultsTable.css'; // Create styles as needed

const ResultsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace '/api/results' with your actual endpoint that returns table data in JSON format.
    fetch('/api/results')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching results");
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!tableData.length) {
    return <p>No results available.</p>;
  }

  return (
    <div className="results-table-container">
      <h3>Route Optimization Results</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Route_ID</th>
            <th>Driving Time (min) Optimal</th>
            <th>Driving Distance (mile) Optimal</th>
            <th>Driving Time (min.) Manual</th>
            <th>Driving Distance (mile) Manual</th>
            <th>Percentage of DRT</th>
            <th>Percentage of Swing</th>
            <th>Number of Stops</th>
            <th>Route Optimal</th>
            <th>Route Manual</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.Route_ID}</td>
              <td>{row["Driving Time (min) Optimal"]}</td>
              <td>{row["Driving Distance (mile) Optimal"]}</td>
              <td>{row["Driving Time (min.) Manual"]}</td>
              <td>{row["Driving Distance (mile) Manual"]}</td>
              <td>{row["Percentage of DRT"]}</td>
              <td>{row["Percentage of Swing"]}</td>
              <td>{row["Number of Stops"]}</td>
              <td>
                {Array.isArray(row["Route Optimal"])
                  ? row["Route Optimal"].join(" -> ")
                  : row["Route Optimal"]}
              </td>
              <td>
                {Array.isArray(row["Route Manual"])
                  ? row["Route Manual"].join(" -> ")
                  : row["Route Manual"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
