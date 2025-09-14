import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnalyticsFilters = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    platforms: [],
    keywords: '',
    dateRange: '24h',
    verificationStatus: 'all',
    sentiment: 'all',
    location: '',
    hazardType: 'all'
  });

  const platforms = [
    { id: 'twitter', label: 'Twitter/X', icon: 'Twitter', color: 'bg-blue-500' },
    { id: 'instagram', label: 'Instagram', icon: 'Instagram', color: 'bg-pink-500' },
    { id: 'facebook', label: 'Facebook', icon: 'Facebook', color: 'bg-blue-600' }
  ];

  const verificationStatuses = [
    { id: 'all', label: 'All Posts' },
    { id: 'pending', label: 'Pending Review' },
    { id: 'verified', label: 'Verified' },
    { id: 'dismissed', label: 'Dismissed' },
    { id: 'investigating', label: 'Under Investigation' }
  ];

  const sentimentOptions = [
    { id: 'all', label: 'All Sentiments' },
    { id: 'positive', label: 'Positive' },
    { id: 'neutral', label: 'Neutral' },
    { id: 'negative', label: 'Negative' }
  ];

  const hazardTypes = [
    { id: 'all', label: 'All Hazards' },
    { id: 'tsunami', label: 'Tsunami' },
    { id: 'flooding', label: 'Flooding' },
    { id: 'highwaves', label: 'High Waves' },
    { id: 'oilspill', label: 'Oil Spill' },
    { id: 'electrocution', label: 'Electrocution' },
    { id: 'landslide', label: 'Landslide' }
  ];

  const dateRanges = [
    { id: '1h', label: 'Last Hour' },
    { id: '6h', label: 'Last 6 Hours' },
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const handlePlatformToggle = (platformId) => {
    const updatedPlatforms = localFilters?.platforms?.includes(platformId)
      ? localFilters?.platforms?.filter(p => p !== platformId)
      : [...localFilters?.platforms, platformId];
    
    const newFilters = { ...localFilters, platforms: updatedPlatforms };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      platforms: [],
      keywords: '',
      dateRange: '24h',
      verificationStatus: 'all',
      sentiment: 'all',
      location: '',
      hazardType: 'all'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.platforms?.length > 0) count++;
    if (localFilters?.keywords) count++;
    if (localFilters?.dateRange !== '24h') count++;
    if (localFilters?.verificationStatus !== 'all') count++;
    if (localFilters?.sentiment !== 'all') count++;
    if (localFilters?.location) count++;
    if (localFilters?.hazardType !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Quick Search */}
        <div>
          <Input
            label="Search Keywords"
            type="text"
            placeholder="Search posts by keywords..."
            value={localFilters?.keywords}
            onChange={(e) => handleFilterChange('keywords', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Social Media Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms?.map((platform) => (
              <Button
                key={platform?.id}
                variant={localFilters?.platforms?.includes(platform?.id) ? 'default' : 'outline'}
                size="sm"
                iconName={platform?.icon}
                iconPosition="left"
                onClick={() => handlePlatformToggle(platform?.id)}
                className="flex-shrink-0"
              >
                {platform?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Time Range
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dateRanges?.map((range) => (
              <Button
                key={range?.id}
                variant={localFilters?.dateRange === range?.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('dateRange', range?.id)}
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Verification Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Verification Status
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {verificationStatuses?.map((status) => (
                  <Button
                    key={status?.id}
                    variant={localFilters?.verificationStatus === status?.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('verificationStatus', status?.id)}
                  >
                    {status?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sentiment
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sentimentOptions?.map((sentiment) => (
                  <Button
                    key={sentiment?.id}
                    variant={localFilters?.sentiment === sentiment?.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('sentiment', sentiment?.id)}
                  >
                    {sentiment?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Hazard Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hazard Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {hazardTypes?.map((type) => (
                  <Button
                    key={type?.id}
                    variant={localFilters?.hazardType === type?.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('hazardType', type?.id)}
                  >
                    {type?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <Input
                label="Location Filter"
                type="text"
                placeholder="Filter by location (city, state, coordinates)..."
                value={localFilters?.location}
                onChange={(e) => handleFilterChange('location', e?.target?.value)}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsFilters;