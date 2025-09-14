import React from 'react';


const HazardCluster = ({ cluster, onClick }) => {
  const { count, severity, position } = cluster;
  
  const getClusterColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500 border-red-600 text-white';
      case 'medium': return 'bg-orange-500 border-orange-600 text-white';
      case 'low': return 'bg-green-500 border-green-600 text-white';
      default: return 'bg-gray-500 border-gray-600 text-white';
    }
  };

  const getClusterSize = (count) => {
    if (count >= 20) return 'w-12 h-12 text-sm';
    if (count >= 10) return 'w-10 h-10 text-xs';
    return 'w-8 h-8 text-xs';
  };

  return (
    <button
      onClick={() => onClick(cluster)}
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 
        rounded-full border-2 font-bold shadow-lg
        hover:scale-110 transition-all duration-200
        flex items-center justify-center
        ${getClusterColor(severity)}
        ${getClusterSize(count)}
      `}
      style={{
        left: `${position?.x}px`,
        top: `${position?.y}px`,
      }}
      title={`${count} hazards in this area`}
    >
      {count >= 100 ? '99+' : count}
    </button>
  );
};

export default HazardCluster;