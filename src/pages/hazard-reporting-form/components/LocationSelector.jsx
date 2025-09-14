import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationSelector = ({ location, onLocationChange }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState('');

  const detectLocation = () => {
    setIsDetecting(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        onLocationChange({
          latitude: latitude?.toFixed(6),
          longitude: longitude?.toFixed(6),
          address: `${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`
        });
        setIsDetecting(false);
      },
      (error) => {
        let errorMessage = 'Unable to detect location';
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error?.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error?.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleManualLocationChange = (field, value) => {
    onLocationChange({
      ...location,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Location Details</h3>
            <p className="text-sm text-muted-foreground">Precise location helps emergency responders</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={detectLocation}
              loading={isDetecting}
              iconName="Crosshair"
              iconPosition="left"
              className="flex-1"
            >
              {isDetecting ? 'Detecting Location...' : 'Auto-Detect Location'}
            </Button>
          </div>

          {locationError && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                <p className="text-sm text-error">{locationError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="text"
              placeholder="e.g., 19.0760"
              value={location?.latitude}
              onChange={(e) => handleManualLocationChange('latitude', e?.target?.value)}
              required
            />
            <Input
              label="Longitude"
              type="text"
              placeholder="e.g., 72.8777"
              value={location?.longitude}
              onChange={(e) => handleManualLocationChange('longitude', e?.target?.value)}
              required
            />
          </div>

          <Input
            label="Address/Landmark"
            type="text"
            placeholder="Nearest landmark or address"
            value={location?.address}
            onChange={(e) => handleManualLocationChange('address', e?.target?.value)}
            description="Provide nearby landmarks for better identification"
          />

          {location?.latitude && location?.longitude && (
            <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">Location Preview</h4>
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="CheckCircle" size={14} />
                  <span>Location Set</span>
                </div>
              </div>
              <div className="w-full h-48 bg-muted-foreground/10 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Hazard Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=15&output=embed`}
                  className="border-0"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Coordinates: {location?.latitude}, {location?.longitude}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;