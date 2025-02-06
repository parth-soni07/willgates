import React from 'react';
import { Scale, CheckCircle, XCircle, Clock } from 'lucide-react';

const ArbitratorPanel = () => {
  const disputes = [
    {
      id: 1,
      title: 'Asset Ownership Dispute',
      plaintiff: 'John Doe',
      defendant: 'Jane Smith',
      status: 'Pending Review',
      date: '2024-03-15',
      type: 'Asset Ownership',
    },
    {
      id: 2,
      title: 'Beneficiary Claim Dispute',
      plaintiff: 'Mike Johnson',
      defendant: 'Sarah Wilson',
      status: 'In Progress',
      date: '2024-03-10',
      type: 'Beneficiary Claim',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Arbitrator Panel</h1>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray- 600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Disputes</option>
            <option value="pending">Pending Review</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Cards */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Cases</p>
              <p className="text-2xl font-bold text-white mt-1">24</p>
            </div>
            <Scale className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Review</p>
              <p className="text-2xl font-bold text-white mt-1">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-white mt-1">12</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-white mt-1">4</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Case Details</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {disputes.map((dispute) => (
              <tr key={dispute.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-white">{dispute.title}</div>
                    <div className="text-sm text-gray-400">
                      {dispute.plaintiff} vs. {dispute.defendant}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{dispute.type}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    dispute.status === 'Pending Review' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {dispute.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{dispute.date}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200">
                    Review Case
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArbitratorPanel;