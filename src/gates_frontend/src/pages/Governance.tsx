import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Shield, Users, AlertCircle } from 'lucide-react';

const Governance = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Governance & Dispute Resolution</h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Active Disputes */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Active Disputes</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium">Asset Ownership Dispute</h3>
                    <p className="text-sm text-gray-400 mt-1">Filed by John Doe - 3 days ago</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    In Progress
                  </span>
                </div>
                <p className="text-gray-300 text-sm mt-4">
                  Dispute regarding the ownership transfer of the primary residence property.
                </p>
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/file-dispute')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors duration-200 flex items-center"
              >
                <AlertCircle className="h-5 w-5 mr-3" />
                <span>File New Dispute</span>
              </button>
              
              <button 
                onClick={() => navigate('/arbitrator-panel')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center"
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Arbitrator Panel</span>
              </button>
            </div>
          </div>

          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Governance Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Disputes</span>
                <span className="text-white font-medium">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Resolved Cases</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Resolution Time</span>
                <span className="text-white font-medium">5 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;