import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HazardFilters from './components/HazardFilters';
import MapLegend from './components/MapLegend';
import HazardPopup from './components/HazardPopup';
import MapControls from './components/MapControls';
import HazardPin from './components/HazardPin';
import HazardCluster from './components/HazardCluster';

import Button from '../../components/ui/Button';

const InteractiveHazardMap = () => {
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [activeLayers, setActiveLayers] = useState(['ocean', 'urban']);
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai
  const [zoomLevel, setZoomLevel] = useState(12);

  // Mock hazard data
  const mockHazards = [
    {
      id: 1,
      type: 'tsunami',
      severity: 'high',
      status: 'verified',
      location: {
        coordinates: { lat: 19.0760, lng: 72.8777 },
        address: 'Marine Drive, Mumbai, Maharashtra'
      },
      description: `Tsunami warning issued for Mumbai coastline. Wave heights expected to reach 3-4 meters.\nImmediate evacuation of coastal areas recommended.\nEstimated arrival time: 45 minutes from now.`,
      timestamp: new Date(Date.now() - 300000),
      reporter: {
        name: 'Dr. Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        verified: true
      },
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
        { type: 'video', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400' }
      ],
      verificationInfo: {
        verifiedBy: 'INCOIS Mumbai',
        timestamp: new Date(Date.now() - 240000),
        notes: 'Confirmed by seismic monitoring stations'
      }
    },
    {
      id: 2,
      type: 'flooding',
      severity: 'medium',
      status: 'verified',
      location: {
        coordinates: { lat: 19.0896, lng: 72.8656 },
        address: 'Andheri East, Mumbai, Maharashtra'
      },
      description: `Heavy rainfall causing waterlogging in low-lying areas.\nRoad traffic severely affected on Western Express Highway.\nWater level: 2-3 feet in residential areas.`,
      timestamp: new Date(Date.now() - 600000),
      reporter: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        verified: false
      },
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400' }
      ]
    },
    {
      id: 3,
      type: 'electrocution',
      severity: 'high',
      status: 'pending',
      location: {
        coordinates: { lat: 19.0728, lng: 72.8826 },
        address: 'Colaba, Mumbai, Maharashtra'
      },
      description: `Fallen power lines due to strong winds creating electrocution hazard.\nArea cordoned off by local authorities.\nPower supply disrupted to 500+ households.`,
      timestamp: new Date(Date.now() - 900000),
      reporter: {
        name: 'Mumbai Fire Brigade',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
        verified: true
      },
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' }
      ]
    },
    {
      id: 4,
      type: 'landslide',
      severity: 'medium',
      status: 'verified',
      location: {
        coordinates: { lat: 19.1136, lng: 72.8697 },
        address: 'Powai Hills, Mumbai, Maharashtra'
      },
      description: `Minor landslide blocking access road to residential complex.\nNo casualties reported, evacuation precautionary.\nGeological survey team dispatched.`,
      timestamp: new Date(Date.now() - 1200000),
      reporter: {
        name: 'Amit Patel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        verified: false
      },
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' }
      ]
    },
    {
      id: 5,
      type: 'high-waves',
      severity: 'low',
      status: 'verified',
      location: {
        coordinates: { lat: 19.0544, lng: 72.8770 },
        address: 'Juhu Beach, Mumbai, Maharashtra'
      },
      description: `Moderate wave activity observed at Juhu Beach.\nSwimming not recommended for next 2-3 hours.\nLifeguards on high alert.`,
      timestamp: new Date(Date.now() - 1800000),
      reporter: {
        name: 'Coast Guard Mumbai',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150',
        verified: true
      },
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400' }
      ]
    }
  ];

  // Filter state
  const [filters, setFilters] = useState({
    hazardTypes: [],
    severity: [],
    status: [],
    dateFrom: '',
    dateTo: '',
    radius: '10'
  });

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', filters);
    setIsFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      hazardTypes: [],
      severity: [],
      status: [],
      dateFrom: '',
      dateTo: '',
      radius: '10'
    });
  };

  // Map controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  const handleResetView = () => {
    setMapCenter({ lat: 19.0760, lng: 72.8777 });
    setZoomLevel(12);
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
          setZoomLevel(15);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleToggleLayer = (layerId) => {
    setActiveLayers(prev => 
      prev?.includes(layerId) 
        ? prev?.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const handleToggleRealTime = () => {
    setIsRealTimeEnabled(prev => !prev);
  };

  // Hazard interactions
  const handleHazardClick = (hazard) => {
    setSelectedHazard(hazard);
  };

  const handleViewDetails = (hazard) => {
    navigate(`/hazard-details/${hazard?.id}`);
  };

  // Mock clustering logic
  const createClusters = (hazards, zoomLevel) => {
    if (zoomLevel > 14) return [];
    
    return [
      {
        id: 'cluster-1',
        count: 8,
        severity: 'high',
        position: { x: 300, y: 200 },
        hazards: hazards?.slice(0, 3)
      },
      {
        id: 'cluster-2',
        count: 5,
        severity: 'medium',
        position: { x: 500, y: 350 },
        hazards: hazards?.slice(3, 5)
      }
    ];
  };

  const clusters = createClusters(mockHazards, zoomLevel);

  // Real-time updates simulation
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Real-time update received');
    }, 30000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block">
          <HazardFilters
            isOpen={true}
            onToggle={() => {}}
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden">
          <HazardFilters
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-slate-100">
          {/* Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Interactive Hazard Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
            className="absolute inset-0"
          />

          {/* Hazard Pins Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              {/* Render clusters when zoomed out */}
              {clusters?.map((cluster) => (
                <div key={cluster?.id} className="pointer-events-auto">
                  <HazardCluster
                    cluster={cluster}
                    onClick={(cluster) => {
                      setZoomLevel(16);
                      // Focus on cluster center
                    }}
                  />
                </div>
              ))}

              {/* Render individual pins when zoomed in */}
              {zoomLevel > 14 && mockHazards?.map((hazard, index) => (
                <div
                  key={hazard?.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${20 + index * 80}%`,
                    top: `${30 + (index % 3) * 20}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <HazardPin
                    hazard={hazard}
                    onClick={handleHazardClick}
                    isSelected={selectedHazard?.id === hazard?.id}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Map Controls */}
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetView}
            onToggleLayer={handleToggleLayer}
            onToggleRealTime={handleToggleRealTime}
            isRealTimeEnabled={isRealTimeEnabled}
            activeLayers={activeLayers}
            onLocationRequest={handleLocationRequest}
          />

          {/* Map Legend */}
          <MapLegend
            isVisible={isLegendVisible}
            onToggle={() => setIsLegendVisible(!isLegendVisible)}
          />

          {/* Emergency Report Button - Mobile */}
          <div className="absolute bottom-4 right-4 lg:hidden">
            <Button
              variant="destructive"
              size="lg"
              iconName="Plus"
              className="emergency-btn rounded-full w-14 h-14 shadow-lg"
              onClick={() => navigate('/hazard-reporting-form')}
            >
              <span className="sr-only">Report Hazard</span>
            </Button>
          </div>

          {/* Status Bar */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-modal px-4 py-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium text-foreground">
                {isRealTimeEnabled ? 'Live Updates' : 'Static View'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {mockHazards?.length} hazards
            </div>
            <div className="text-sm text-muted-foreground">
              Zoom: {zoomLevel}x
            </div>
          </div>

          {/* Loading Overlay for Real-time Updates */}
          {isRealTimeEnabled && (
            <div className="absolute top-16 right-4 bg-card border border-border rounded-lg shadow-modal p-2 opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Syncing...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Hazard Details Popup */}
      {selectedHazard && (
        <HazardPopup
          hazard={selectedHazard}
          onClose={() => setSelectedHazard(null)}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
};

export default InteractiveHazardMap;