import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Shield, Users, AlertTriangle } from 'lucide-react';
import BillyLogo from './BillyLogo';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <BillyLogo className="w-12 h-12" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Billy - Buddy against Cyber Bullying</h1>
          </div>
          <nav>
            {currentUser ? (
              <Link to="/chat" className="text-blue-600 hover:text-blue-800 font-medium">Go to Chat</Link>
            ) : (
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col justify-center items-center text-center">
              <BillyLogo className="w-32 h-32 mb-4" />
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Welcome to Billy
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Your AI companion in the fight against cyberbullying.
              </p>
              {currentUser ? (
                <Link
                  to="/chat"
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center"
                >
                  <MessageSquare className="mr-2" />
                  Start Chatting
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center"
                >
                  <Users className="mr-2" />
                  Join Us
                </Link>
              )}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">Our Features</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-blue-600" />}
                title="AI Chat Support"
                description="Get immediate support and advice from our AI-powered chatbot."
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-green-600" />}
                title="Defense Strategies"
                description="Learn effective strategies to protect yourself from cyberbullying."
              />
              <FeatureCard
                icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
                title="Incident Reporting"
                description="Easily report cyberbullying incidents and get help."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-lg font-medium text-gray-900">
            {title}
          </dt>
          <dd className="mt-2 text-base text-gray-500">
            {description}
          </dd>
        </div>
      </div>
    </div>
  </div>
);

export default Home;