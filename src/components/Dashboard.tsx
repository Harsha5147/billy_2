import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { MessageSquare, AlertTriangle, FileText, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      if (currentUser) {
        const db = getFirestore();
        const q = query(collection(db, 'incidents'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const incidentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIncidents(incidentData);
      }
    };

    fetchIncidents();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page or login page after logout
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCard
                title="Chat with Billy"
                description="Get support and advice from our AI chatbot."
                icon={<MessageSquare className="h-8 w-8 text-blue-500" />}
                linkTo="/chat"
              />
              <DashboardCard
                title="Report Incident"
                description="Report a new cyberbullying incident."
                icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
                linkTo="/report"
              />
              <DashboardCard
                title="My Reports"
                description="View and manage your reported incidents."
                icon={<FileText className="h-8 w-8 text-green-500" />}
                onClick={() => {}} // This will open the modal
              />
            </div>

            {/* Recent Incidents Section */}
            <div className="mt-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Incidents</h2>
              {incidents.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {incidents.map((incident) => (
                      <li key={incident.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {incident.description.substring(0, 100)}...
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                incident.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {incident.status}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                Reported on {new Date(incident.reportedAt.seconds * 1000).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">No incidents reported yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo?: string;
  onClick?: () => void;
}> = ({ title, description, icon, linkTo, onClick }) => {
  const content = (
    <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo}>{content}</Link>
  ) : (
    <div onClick={onClick} className="cursor-pointer">
      {content}
    </div>
  );
};

export default Dashboard;