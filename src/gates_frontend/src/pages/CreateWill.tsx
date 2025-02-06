import React, { useState } from 'react';
import { FileText, Users, Wallet, X } from 'lucide-react';

interface Asset {
  id: number;
  name: string;
  type: string;
  value: string;
  assignedTo: string | null;
}

interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
}

const CreateWill = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [willTitle, setWillTitle] = useState('');
  const [willDescription, setWillDescription] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  // Sample data - in a real app, this would come from your state management
  const beneficiaries: Beneficiary[] = [
    { id: 1, name: 'John Doe', relationship: 'Son' },
    { id: 2, name: 'Jane Smith', relationship: 'Daughter' },
  ];

  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, name: 'Primary Residence', type: 'Real Estate', value: '$500,000', assignedTo: null },
    { id: 2, name: 'Investment Portfolio', type: 'Financial', value: '$250,000', assignedTo: null },
    { id: 3, name: 'Art Collection', type: 'Collectibles', value: '$100,000', assignedTo: null },
  ]);

  const handleNextStep = () => {
    if (currentStep === 3 && assets.some(asset => !asset.assignedTo)) {
      alert('Please assign all assets to beneficiaries before proceeding.');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleAssignBeneficiary = (beneficiaryName: string) => {
    if (selectedAssetId !== null) {
      setAssets(assets.map(asset => 
        asset.id === selectedAssetId 
          ? { ...asset, assignedTo: beneficiaryName }
          : asset
      ));
    }
    setShowAssignModal(false);
    setSelectedAssetId(null);
  };

  const openAssignModal = (assetId: number) => {
    setSelectedAssetId(assetId);
    setShowAssignModal(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Will Title
              </label>
              <input
                type="text"
                id="title"
                value={willTitle}
                onChange={(e) => setWillTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a title for your will"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={willDescription}
                onChange={(e) => setWillDescription(e.target.value)}
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any additional notes or instructions"
              ></textarea>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Beneficiaries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-medium">{beneficiary.name}</h4>
                  <p className="text-gray-300 text-sm">{beneficiary.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Asset Assignment</h3>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Asset Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Value</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {assets.map((asset) => (
                    <tr key={asset.id}>
                      <td className="px-6 py-4 text-sm text-white">{asset.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{asset.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{asset.value}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openAssignModal(asset.id)}
                          className={`${
                            asset.assignedTo
                              ? 'text-blue-400 hover:text-blue-300'
                              : 'bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg'
                          } transition-colors duration-200`}
                        >
                          {asset.assignedTo || 'Assign'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Create Your Will</h1>
      
      {/* Steps Progress */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <span className={currentStep >= 1 ? 'text-blue-400' : 'text-gray-400'}>Basic Info</span>
          <span className={currentStep >= 2 ? 'text-blue-400' : 'text-gray-400'}>Beneficiaries</span>
          <span className={currentStep >= 3 ? 'text-blue-400' : 'text-gray-400'}>Assets</span>
          <span className={currentStep >= 4 ? 'text-blue-400' : 'text-gray-400'}>ZK Setup</span>
          <span className={currentStep >= 5 ? 'text-blue-400' : 'text-gray-400'}>Review</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={handlePrevStep}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextStep}
            className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            {currentStep === 5 ? 'Finish' : 'Next Step'}
          </button>
        </div>
      </div>

      {/* Beneficiary Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Assign Beneficiary</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-2">
              {beneficiaries.map((beneficiary) => (
                <button
                  key={beneficiary.id}
                  onClick={() => handleAssignBeneficiary(beneficiary.name)}
                  className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200"
                >
                  <div className="font-medium">{beneficiary.name}</div>
                  <div className="text-sm text-gray-400">{beneficiary.relationship}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWill;