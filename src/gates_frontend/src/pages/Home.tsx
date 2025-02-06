import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Cpu, Users } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: 'NFT Asset Tokenization',
    description: 'Convert your assets into secure, blockchain-based tokens for seamless transfer and management.'
  },
  {
    icon: <Lock className="h-6 w-6 text-blue-500" />,
    title: 'Zero-Knowledge Identity',
    description: 'Protect privacy with advanced cryptographic proofs for secure identity verification.'
  },
  {
    icon: <Cpu className="h-6 w-6 text-blue-500" />,
    title: 'Automated Execution',
    description: 'Smart contracts ensure your wishes are carried out exactly as specified.'
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: 'Governance & Resolution',
    description: 'Fair and transparent dispute resolution through decentralized arbitration.'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Reinventing Estate Planning with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Blockchain & Zero-Knowledge Proofs
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Simplify will creation, automate asset distribution, and ensure complete privacy using Will-Gates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors duration-200"
            >
              Get Started
            </button>
            <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium text-lg transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Next-Generation Estate Planning
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Will-Gates merges traditional estate planning with cutting-edge blockchain technology and advanced cryptography for unparalleled security and privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-200"
              >
                <div className="bg-gray-900 rounded-lg p-3 inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;