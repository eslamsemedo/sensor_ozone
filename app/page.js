'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/metrics');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to load metrics', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-screen">No data available.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Step Count */}
      <div className="rounded-2xl shadow-lg p-4 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2 text-center">Step Count</h2>
        <div className="text-4xl font-bold text-center">{data.stepCount}</div>
      </div>

      {/* Calories Burned */}
      <div className="rounded-2xl shadow-lg p-4 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2 text-center">Calories Burned</h2>
        <div className="text-4xl font-bold text-center">{data.caloriesBurned.toFixed(2)}</div>
      </div>

      {/* History Chart */}
      <div className="md:col-span-2 rounded-2xl shadow-lg p-4 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-center">History (Last 1 Hour)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.history}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="steps" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="calories" stroke="#82ca9d" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
