import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Wallet } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Welcome to Will-Gates</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Tokenized Assets</h3>
            <Wallet className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">12</p>
          <p className="text-sm text-gray-400 mt-2">Total assets registered</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Will Status</h3>
            <FileText className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">Active</p>
          <p className="text-sm text-gray-400 mt-2">Last updated 2 days ago</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Beneficiaries</h3>
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-white">5</p>
          <p className="text-sm text-gray-400 mt-2">Registered heirs</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button 
          onClick={() => navigate('/create-will')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transition-colors duration-200"
        >
          <h3 className="text-lg font-medium mb-2">Create New Will</h3>
          <p className="text-sm opacity-80">Start the will creation process</p>
        </button>
        
        <button 
          onClick={() => navigate('/create-will')}
          className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors duration-200"
        >
          <h3 className="text-lg font-medium mb-2">View Existing Will</h3>
          <p className="text-sm opacity-80">Review and edit your current will</p>
        </button>
        
        <button 
          onClick={() => navigate('/assets')}
          className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors duration-200"
        >
          <h3 className="text-lg font-medium mb-2">View Assets</h3>
          <p className="text-sm opacity-80">Manage your tokenized assets</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;