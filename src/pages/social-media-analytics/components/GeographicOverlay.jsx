import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicOverlay = ({ geoData }) => {
  const [viewMode, setViewMode] = useState('heatmap');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const viewModes = [
    { id: 'heatmap', label: 'Heat Map', icon: 'Map' },
    { id: 'clusters', label: 'Clusters', icon: 'MapPin' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  const mockMapData = [
    {
      id: 1,
      location: "Mumbai, Maharashtra",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      postCount: 45,
      severity: 'high',
      hazardTypes: ['flooding', 'urban'],
      lastUpdate: '2 minutes ago'
    },
    {
      id: 2,
      location: "Chennai, Tamil Nadu",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      postCount: 32,
      severity: 'medium',
      hazardTypes: ['tsunami', 'highwaves'],
      lastUpdate: '15 minutes ago'
    },
    {
      id: 3,
      location: "Kochi, Kerala",
      coordinates: { lat: 9.9312, lng: 76.2673 },
      postCount: 28,
      severity: 'medium',
      hazardTypes: ['oilspill', 'ocean'],
      lastUpdate: '1 hour ago'
    },
    {
      id: 4,
      location: "Visakhapatnam, Andhra Pradesh",
      coordinates: { lat: 17.6868, lng: 83.2185 },
      postCount: 19,
      severity: 'low',
      hazardTypes: ['highwaves'],
      lastUpdate: '3 hours ago'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getHazardIcon = (hazardType) => {
    const icons = {
      flooding: 'Waves',
      tsunami: 'Waves',
      highwaves: 'Waves',
      oilspill: 'Fuel',
      urban: 'Building',
      ocean: 'Waves'
    };
    return icons?.[hazardType] || 'AlertTriangle';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Geographic Distribution</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Real-time mapping</span>
          </div>
        </div>

        <div className="flex space-x-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.id}
              variant={viewMode === mode?.id ? 'default' : 'ghost'}
              size="sm"
              iconName={mode?.icon}
              iconPosition="left"
              onClick={() => setViewMode(mode?.id)}
            >
              {mode?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {/* Map Container */}
        <div className="relative bg-muted rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Hazard Geographic Distribution"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=19.0760,72.8777&z=6&output=embed"
            className="rounded-lg"
          />
          
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 bg-card rounded-lg border border-border shadow-modal p-2">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="icon">
                <Icon name="ZoomIn" size={16} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="ZoomOut" size={16} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Maximize" size={16} />
              </Button>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card rounded-lg border border-border shadow-modal p-3">
            <div className="text-xs font-medium text-foreground mb-2">Severity Levels</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Low Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockMapData?.map((location) => (
            <div
              key={location?.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                selectedRegion === location?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedRegion(selectedRegion === location?.id ? null : location?.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <h4 className="font-medium text-foreground">{location?.location}</h4>
                </div>
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(location?.severity)}`}></div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Social Media Posts</span>
                  <span className="font-medium text-foreground">{location?.postCount}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <span className={`font-medium capitalize ${getSeverityTextColor(location?.severity)}`}>
                    {location?.severity}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Update</span>
                  <span className="text-foreground">{location?.lastUpdate}</span>
                </div>

                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-xs text-muted-foreground">Hazard Types:</span>
                  <div className="flex space-x-1">
                    {location?.hazardTypes?.map((hazard, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full"
                      >
                        <Icon name={getHazardIcon(hazard)} size={12} className="text-primary" />
                        <span className="text-xs text-foreground capitalize">{hazard}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xl font-bold text-foreground">124</div>
              <div className="text-xs text-muted-foreground">Active Locations</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xl font-bold text-red-600">8</div>
              <div className="text-xs text-muted-foreground">High Risk Areas</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xl font-bold text-orange-600">23</div>
              <div className="text-xs text-muted-foreground">Medium Risk Areas</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xl font-bold text-green-600">93</div>
              <div className="text-xs text-muted-foreground">Low Risk Areas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicOverlay;