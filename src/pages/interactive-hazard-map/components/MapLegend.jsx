import React from 'react';
import Icon from '../../../components/AppIcon';

const MapLegend = ({ isVisible, onToggle }) => {
  const severityLevels = [
    {
      level: 'High',
      color: 'bg-red-500',
      description: 'Immediate danger - evacuation required',
      icon: 'AlertTriangle'
    },
    {
      level: 'Medium',
      color: 'bg-orange-500',
      description: 'Caution advised - monitor situation',
      icon: 'AlertCircle'
    },
    {
      level: 'Low',
      color: 'bg-green-500',
      description: 'Awareness level - minimal risk',
      icon: 'Info'
    }
  ];

  const hazardTypes = [
    { type: 'Tsunami', icon: 'Waves', color: 'text-blue-600' },
    { type: 'High Waves', icon: 'Waves', color: 'text-cyan-600' },
    { type: 'Flooding', icon: 'CloudRain', color: 'text-blue-500' },
    { type: 'Oil Spill', icon: 'Fuel', color: 'text-gray-700' },
    { type: 'Electrocution', icon: 'Zap', color: 'text-yellow-500' },
    { type: 'Landslide', icon: 'Mountain', color: 'text-amber-700' },
    { type: 'Tree Fall', icon: 'TreePine', color: 'text-green-700' }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 left-4 z-20 bg-card border border-border rounded-lg p-2 shadow-modal hover:shadow-lg transition-all duration-200"
      >
        <Icon name="Info" size={20} color="var(--color-muted-foreground)" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-20 bg-card border border-border rounded-lg shadow-modal max-w-xs">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-semibold text-sm text-foreground">Map Legend</h3>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <Icon name="X" size={16} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="p-3 space-y-4">
        {/* Severity Levels */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Severity Levels
          </h4>
          <div className="space-y-2">
            {severityLevels?.map((level) => (
              <div key={level?.level} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${level?.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground">{level?.level}</div>
                  <div className="text-xs text-muted-foreground truncate">{level?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hazard Types */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Hazard Types
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {hazardTypes?.map((hazard) => (
              <div key={hazard?.type} className="flex items-center space-x-1">
                <Icon name={hazard?.icon} size={14} className={hazard?.color} />
                <span className="text-xs text-foreground truncate">{hazard?.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicators */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Status
          </h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-foreground">Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-xs text-foreground">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <span className="text-xs text-foreground">Unverified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;