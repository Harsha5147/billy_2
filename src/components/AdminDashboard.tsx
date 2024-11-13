import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, 'incidents'), orderBy('reportedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const incidentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIncidents(incidentsData);

      // Calculate statistics
      const totalIncidents = incidentsData.length;
      const pendingIncidents = incidentsData.filter(i => i.status === 'pending').length;
      const resolvedIncidents = incidentsData.filter(i => i.status === 'resolved').length;

      setStats({
        totalIncidents,
        pendingIncidents,
        resolvedIncidents
      });
    });

    return () => unsubscribe();
  }, []);

  const chartData = {
    labels: ['Total Incidents', 'Pending Incidents', 'Resolved Incidents'],
    datasets: [
      {
        label: 'Incident Statistics',
        data: [stats.totalIncidents, stats.pendingIncidents, stats.resolvedIncidents],
        backgroundColor: ['#8884d8', '#82ca9d', '#ffc658'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Incident Statistics',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Incidents" value={stats.totalIncidents} />
        <StatCard title="Pending Incidents" value={stats.pendingIncidents} />
        <StatCard title="Resolved Incidents" value={stats.resolvedIncidents} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Incident Statistics</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Incidents</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {incident.reportedAt.toDate().toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {incident.userId}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {incident.description}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    incident.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;