import React from 'react';
import Icon from '../../../components/AppIcon';

const HazardPin = ({ hazard, onClick, isSelected }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500 border-red-600 shadow-red-200';
      case 'medium': return 'bg-orange-500 border-orange-600 shadow-orange-200';
      case 'low': return 'bg-green-500 border-green-600 shadow-green-200';
      default: return 'bg-gray-500 border-gray-600 shadow-gray-200';
    }
  };

  const getHazardIcon = (type) => {
    const iconMap = {
      'tsunami': 'Waves',
      'high-waves': 'Waves',
      'flooding': 'CloudRain',
      'oil-spill': 'Fuel',
      'electrocution': 'Zap',
      'landslide': 'Mountain',
      'tree-fall': 'TreePine'
    };
    return iconMap?.[type] || 'AlertTriangle';
  };

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'verified': return 'border-green-400 bg-green-100';
      case 'pending': return 'border-yellow-400 bg-yellow-100';
      case 'unverified': return 'border-gray-400 bg-gray-100';
      default: return 'border-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="relative">
      {/* Main Pin */}
      <button
        onClick={() => onClick(hazard)}
        className={`
          relative w-10 h-10 rounded-full border-2 text-white
          hover:scale-110 transition-all duration-200
          flex items-center justify-center shadow-lg
          ${getSeverityColor(hazard?.severity)}
          ${isSelected ? 'ring-4 ring-blue-300 scale-110' : ''}
        `}
        title={`${hazard?.type?.replace('-', ' ')} - ${hazard?.severity} risk`}
      >
        <Icon 
          name={getHazardIcon(hazard?.type)} 
          size={18} 
          color="white" 
        />
      </button>
      {/* Status Indicator */}
      <div className={`
        absolute -top-1 -right-1 w-3 h-3 rounded-full border
        ${getStatusIndicator(hazard?.status)}
      `}>
        {hazard?.status === 'verified' && (
          <Icon name="Check" size={8} color="var(--color-success)" className="absolute inset-0.5" />
        )}
      </div>
      {/* Pulse Animation for High Severity */}
      {hazard?.severity === 'high' && (
        <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping" />
      )}
      {/* Tooltip on Hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-modal opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="font-medium capitalize">{hazard?.type?.replace('-', ' ')}</div>
        <div className="text-xs opacity-75">{hazard?.location?.address}</div>
      </div>
    </div>
  );
};

export default HazardPin;