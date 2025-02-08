import React, { useState, useEffect } from "react";
import {
  Upload,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  X,
} from "lucide-react";

// Initialize Lighthouse
const apiKey = "9a782bb5.5024fefce7204377bd04154f45c67ada";

interface KycVerificationPageProps {
  userPrincipal: string;
}

const KycVerificationPage: React.FC<KycVerificationPageProps> = ({
  userPrincipal,
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [docType, setDocType] = useState<string>("Aadhaar");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<
    "idle" | "submitting" | "verified" | "rejected"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [verificationRefId, setVerificationRefId] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDocFile(file);

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setDocPreview(null);
      }

      // Show notification
      setShowNotification(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) {
      setErrorMessage("Please select a document file to upload.");
      return;
    }
    setErrorMessage("");
    setKycStatus("submitting");

    try {
      // Create blob from file
      const blob = new Blob([docFile], { type: docFile.type });

      // Create form data
      const formData = new FormData();
      formData.append("file", blob, docFile.name);

      // Make direct fetch request to Lighthouse
      const response = await fetch(
        "https://node.lighthouse.storage/api/v0/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.Hash) {
        console.log("File uploaded to IPFS:", data.Hash);
        setKycStatus("verified");
        setVerificationRefId(data.Hash);
      } else {
        throw new Error("Failed to get IPFS hash from response");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setKycStatus("rejected");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An error occurred during KYC submission."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">KYC Verification</h1>

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 max-w-sm animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
              <div>
                <p className="text-white font-medium">Document Uploaded</p>
                <p className="text-gray-400 text-sm mt-1">{docFile?.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        {kycStatus === "verified" ? (
          <div className="text-center">
            <div className="bg-green-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              KYC Verified Successfully!
            </h2>
            <p className="text-gray-400">Reference ID: {verificationRefId}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name (as per Govt. ID)
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="docType"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Document Type
              </label>
              <select
                id="docType"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Passport">Passport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Document (PDF/Images)
              </label>
              {docFile ? (
                <div className="mt-1 p-4 border-2 border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {docPreview ? (
                        <img
                          src={docPreview}
                          alt="Document preview"
                          className="h-20 w-20 object-cover rounded"
                        />
                      ) : (
                        <div className="h-20 w-20 bg-gray-700 rounded flex items-center justify-center">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="ml-4">
                        <p className="text-white font-medium">{docFile.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(docFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDocFile(null);
                        setDocPreview(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                  >
                    Change file
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={handleDocFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".png, .jpg, .jpeg, .pdf"
                          onChange={handleDocFileChange}
                          className="sr-only"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="bg-red-900/20 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                <p className="text-red-400">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={kycStatus === "submitting"}
              className={`w-full px-4 py-2 ${
                kycStatus === "submitting"
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg transition-colors duration-200 flex items-center justify-center`}
            >
              {kycStatus === "submitting" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Submit for Verification"
              )}
            </button>
          </form>
        )}

        {kycStatus === "rejected" && (
          <div className="mt-6 bg-red-900/20 rounded-lg p-4 flex items-start">
            <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <p className="text-red-400 font-medium">
                KYC Verification failed or rejected.
              </p>
              <p className="text-red-400/80 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycVerificationPage;
