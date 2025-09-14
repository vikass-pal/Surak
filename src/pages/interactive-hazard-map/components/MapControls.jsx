import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapControls = ({ 
  onZoomIn, 
  onZoomOut, 
  onResetView, 
  onToggleLayer,
  onToggleRealTime,
  isRealTimeEnabled,
  activeLayers,
  onLocationRequest
}) => {
  const layerOptions = [
    { id: 'ocean', label: 'Ocean Hazards', icon: 'Waves', color: 'text-blue-500' },
    { id: 'urban', label: 'Urban Hazards', icon: 'Building', color: 'text-gray-600' },
    { id: 'weather', label: 'Weather Alerts', icon: 'Cloud', color: 'text-sky-500' },
    { id: 'traffic', label: 'Traffic Impact', icon: 'Car', color: 'text-orange-500' }
  ];

  return (
    <div className="fixed top-20 right-4 z-20 space-y-2">
      {/* Zoom Controls */}
      <div className="bg-card border border-border rounded-lg shadow-modal overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="w-10 h-10 rounded-none border-b border-border"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="w-10 h-10 rounded-none"
        >
          <Icon name="Minus" size={16} />
        </Button>
      </div>
      {/* Location Controls */}
      <div className="bg-card border border-border rounded-lg shadow-modal overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLocationRequest}
          className="w-10 h-10 rounded-none border-b border-border"
          title="Go to my location"
        >
          <Icon name="Navigation" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onResetView}
          className="w-10 h-10 rounded-none"
          title="Reset view"
        >
          <Icon name="RotateCcw" size={16} />
        </Button>
      </div>
      {/* Real-time Toggle */}
      <div className="bg-card border border-border rounded-lg shadow-modal p-2">
        <Button
          variant={isRealTimeEnabled ? "default" : "ghost"}
          size="sm"
          onClick={onToggleRealTime}
          iconName="Radio"
          iconPosition="left"
          className="w-full text-xs"
        >
          {isRealTimeEnabled ? 'Live' : 'Static'}
        </Button>
        {isRealTimeEnabled && (
          <div className="flex items-center justify-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground ml-1">Live</span>
          </div>
        )}
      </div>
      {/* Layer Controls */}
      <div className="bg-card border border-border rounded-lg shadow-modal p-2 max-w-xs">
        <div className="text-xs font-medium text-foreground mb-2 px-1">Map Layers</div>
        <div className="space-y-1">
          {layerOptions?.map((layer) => (
            <button
              key={layer?.id}
              onClick={() => onToggleLayer(layer?.id)}
              className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-xs transition-colors ${
                activeLayers?.includes(layer?.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <Icon 
                name={layer?.icon} 
                size={14} 
                color={activeLayers?.includes(layer?.id) ? 'currentColor' : 'currentColor'} 
                className={!activeLayers?.includes(layer?.id) ? layer?.color : ''} 
              />
              <span className="truncate">{layer?.label}</span>
              {activeLayers?.includes(layer?.id) && (
                <Icon name="Check" size={12} color="currentColor" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-lg shadow-modal p-2">
        <div className="text-xs font-medium text-foreground mb-1">Active Hazards</div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-500">High Risk</span>
            <span className="font-medium">15</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-orange-500">Medium Risk</span>
            <span className="font-medium">18</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-500">Low Risk</span>
            <span className="font-medium">8</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
          Last updated: 2 min ago
        </div>
      </div>
    </div>
  );
};

export default MapControls;