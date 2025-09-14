import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HazardPopup = ({ hazard, onClose, onViewDetails }) => {
  if (!hazard) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'unverified': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${getSeverityColor(hazard?.severity)}`}>
              <Icon 
                name={getHazardIcon(hazard?.type)} 
                size={20} 
                color="currentColor" 
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground capitalize">
                {hazard?.type?.replace('-', ' ')}
              </h3>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(hazard?.timestamp)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Status and Severity */}
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hazard?.status)}`}>
              {hazard?.status?.charAt(0)?.toUpperCase() + hazard?.status?.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(hazard?.severity)}`}>
              {hazard?.severity?.charAt(0)?.toUpperCase() + hazard?.severity?.slice(1)} Risk
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {hazard?.description}
            </p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-2">Location</h4>
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <div>{hazard?.location?.address}</div>
                <div className="text-xs opacity-75">
                  {hazard?.location?.coordinates?.lat?.toFixed(6)}, {hazard?.location?.coordinates?.lng?.toFixed(6)}
                </div>
              </div>
            </div>
          </div>

          {/* Reporter Info */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-2">Reported By</h4>
            <div className="flex items-center space-x-3">
              <Image
                src={hazard?.reporter?.avatar}
                alt={hazard?.reporter?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-foreground">{hazard?.reporter?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {hazard?.reporter?.verified && (
                    <span className="inline-flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} color="var(--color-success)" />
                      <span>Verified Reporter</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          {hazard?.media && hazard?.media?.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Media</h4>
              <div className="grid grid-cols-2 gap-2">
                {hazard?.media?.slice(0, 4)?.map((media, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={media?.url}
                      alt={`Hazard evidence ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                    {media?.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Icon name="Play" size={20} color="white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {hazard?.media?.length > 4 && (
                <p className="text-xs text-muted-foreground mt-2">
                  +{hazard?.media?.length - 4} more files
                </p>
              )}
            </div>
          )}

          {/* Verification Info */}
          {hazard?.verificationInfo && (
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-medium text-sm text-foreground mb-2">Verification Details</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Verified by: {hazard?.verificationInfo?.verifiedBy}</div>
                <div>Verification time: {formatTimeAgo(hazard?.verificationInfo?.timestamp)}</div>
                {hazard?.verificationInfo?.notes && (
                  <div>Notes: {hazard?.verificationInfo?.notes}</div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onViewDetails(hazard)}
              iconName="ExternalLink"
              iconPosition="right"
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              className="px-3"
            >
              <span className="sr-only">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Flag"
              className="px-3"
            >
              <span className="sr-only">Report</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardPopup;