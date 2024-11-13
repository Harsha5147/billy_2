import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';

const ReportIncident: React.FC = () => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { currentUser, reportIncident } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to report an incident');
      return;
    }
    try {
      await reportIncident({ description });
      setSuccess('Incident reported successfully. You will be notified of any updates.');
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      setError('Failed to report incident. Please try again.');
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold text-center flex items-center justify-center">
            <AlertTriangle className="mr-2" /> Report Cyberbullying Incident
          </h3>
          <p className="mt-4">You need to be logged in to report an incident.</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center flex items-center justify-center">
          <AlertTriangle className="mr-2 text-red-500" /> Report Cyberbullying Incident
        </h3>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Incident Description
            </label>
            <textarea
              id="description"
              placeholder="Please describe the incident in detail..."
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Submit Report
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Your report will be handled confidentially and investigated by our team. We may contact you for additional information if needed.
        </p>
      </div>
    </div>
  );
};

export default ReportIncident;