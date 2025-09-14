import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const HazardFilters = ({ 
  isOpen, 
  onToggle, 
  filters, 
  onFilterChange,
  onApplyFilters,
  onClearFilters 
}) => {
  const hazardTypes = [
    { id: 'tsunami', label: 'Tsunami', icon: 'Waves', count: 3 },
    { id: 'high-waves', label: 'High Waves', icon: 'Waves', count: 12 },
    { id: 'flooding', label: 'Flooding', icon: 'CloudRain', count: 8 },
    { id: 'oil-spill', label: 'Oil Spill', icon: 'Fuel', count: 2 },
    { id: 'electrocution', label: 'Electrocution', icon: 'Zap', count: 5 },
    { id: 'landslide', label: 'Landslide', icon: 'Mountain', count: 4 },
    { id: 'tree-fall', label: 'Tree Fall', icon: 'TreePine', count: 7 }
  ];

  const severityLevels = [
    { id: 'high', label: 'High Risk', color: 'text-red-500', count: 15 },
    { id: 'medium', label: 'Medium Risk', color: 'text-orange-500', count: 18 },
    { id: 'low', label: 'Low Risk', color: 'text-green-500', count: 8 }
  ];

  const verificationStatus = [
    { id: 'verified', label: 'Verified', count: 28 },
    { id: 'pending', label: 'Pending Review', count: 9 },
    { id: 'unverified', label: 'Unverified', count: 4 }
  ];

  const handleHazardTypeChange = (typeId, checked) => {
    const updatedTypes = checked 
      ? [...filters?.hazardTypes, typeId]
      : filters?.hazardTypes?.filter(id => id !== typeId);
    onFilterChange({ ...filters, hazardTypes: updatedTypes });
  };

  const handleSeverityChange = (severityId, checked) => {
    const updatedSeverity = checked 
      ? [...filters?.severity, severityId]
      : filters?.severity?.filter(id => id !== severityId);
    onFilterChange({ ...filters, severity: updatedSeverity });
  };

  const handleStatusChange = (statusId, checked) => {
    const updatedStatus = checked 
      ? [...filters?.status, statusId]
      : filters?.status?.filter(id => id !== statusId);
    onFilterChange({ ...filters, status: updatedStatus });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-20 bg-card border border-border rounded-lg p-3 shadow-modal hover:shadow-lg transition-all duration-200 lg:hidden"
      >
        <Icon name="Filter" size={20} color="var(--color-foreground)" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
        onClick={onToggle}
      />
      {/* Filter Panel */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border shadow-modal z-40 overflow-y-auto
        lg:relative lg:top-0 lg:h-full lg:shadow-none lg:z-10
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-border lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <Icon name="X" size={20} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div>
            <h3 className="font-medium text-sm text-foreground mb-3">Date Range</h3>
            <div className="space-y-3">
              <Input
                type="date"
                label="From"
                value={filters?.dateFrom}
                onChange={(e) => onFilterChange({ ...filters, dateFrom: e?.target?.value })}
              />
              <Input
                type="date"
                label="To"
                value={filters?.dateTo}
                onChange={(e) => onFilterChange({ ...filters, dateTo: e?.target?.value })}
              />
            </div>
          </div>

          {/* Location Radius */}
          <div>
            <h3 className="font-medium text-sm text-foreground mb-3">Search Radius</h3>
            <div className="space-y-3">
              <Input
                type="number"
                label="Radius (km)"
                placeholder="Enter radius"
                value={filters?.radius}
                onChange={(e) => onFilterChange({ ...filters, radius: e?.target?.value })}
                min="1"
                max="100"
              />
              <div className="text-xs text-muted-foreground">
                Current location: Mumbai, Maharashtra
              </div>
            </div>
          </div>

          {/* Hazard Types */}
          <div>
            <h3 className="font-medium text-sm text-foreground mb-3">Hazard Types</h3>
            <div className="space-y-2">
              {hazardTypes?.map((type) => (
                <div key={type?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center space-x-2">
                        <Icon name={type?.icon} size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm">{type?.label}</span>
                      </div>
                    }
                    checked={filters?.hazardTypes?.includes(type?.id)}
                    onChange={(e) => handleHazardTypeChange(type?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {type?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Severity Levels */}
          <div>
            <h3 className="font-medium text-sm text-foreground mb-3">Severity Level</h3>
            <div className="space-y-2">
              {severityLevels?.map((level) => (
                <div key={level?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <span className={`text-sm font-medium ${level?.color}`}>
                        {level?.label}
                      </span>
                    }
                    checked={filters?.severity?.includes(level?.id)}
                    onChange={(e) => handleSeverityChange(level?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {level?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div>
            <h3 className="font-medium text-sm text-foreground mb-3">Verification Status</h3>
            <div className="space-y-2">
              {verificationStatus?.map((status) => (
                <div key={status?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={<span className="text-sm">{status?.label}</span>}
                    checked={filters?.status?.includes(status?.id)}
                    onChange={(e) => handleStatusChange(status?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {status?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              onClick={onApplyFilters}
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onClearFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear All
            </Button>
          </div>

          {/* Active Filters Summary */}
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
            <div className="font-medium mb-1">Active Filters:</div>
            <div>
              {filters?.hazardTypes?.length + filters?.severity?.length + filters?.status?.length} filters applied
            </div>
            <div>Showing 41 hazards</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HazardFilters;