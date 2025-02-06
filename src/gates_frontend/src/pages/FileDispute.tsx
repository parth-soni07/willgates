import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';

const FileDispute = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">File a Dispute</h1>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        <form className="space-y-6">
          <div>
            <label htmlFor="disputeType" className="block text-sm font-medium text-gray-300 mb-2">
              Type of Dispute
            </label>
            <select
              id="disputeType"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select dispute type</option>
              <option value="asset-ownership">Asset Ownership</option>
              <option value="beneficiary-claim">Beneficiary Claim</option>
              <option value="will-execution">Will Execution</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="relatedAsset" className="block text-sm font-medium text-gray-300 mb-2">
              Related Asset (if applicable)
            </label>
            <select
              id="relatedAsset"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select related asset</option>
              <option value="asset1">Primary Residence</option>
              <option value="asset2">Investment Portfolio</option>
              <option value="asset3">Art Collection</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Dispute Description
            </label>
            <textarea
              id="description"
              rows={6}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide detailed information about your dispute"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Supporting Documentation
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">
                  PDF, DOC, JPG up to 10MB each
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-white">Important Notice</h4>
                <p className="mt-1 text-sm text-gray-400">
                  Filing a dispute will initiate a formal review process. Please ensure all information provided is accurate and truthful.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Dispute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileDispute;