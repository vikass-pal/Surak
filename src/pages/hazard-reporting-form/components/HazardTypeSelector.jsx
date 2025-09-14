import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const HazardTypeSelector = ({ selectedCategory, onCategoryChange, selectedHazard, onHazardChange }) => {
  const hazardCategories = [
    { value: 'ocean', label: 'Ocean Hazards' },
    { value: 'local', label: 'Local/Urban Hazards' }
  ];

  const oceanHazards = [
    { value: 'tsunami', label: 'Tsunami', icon: 'Waves' },
    { value: 'high_waves', label: 'High Waves', icon: 'Waves' },
    { value: 'flooding', label: 'Coastal Flooding', icon: 'Droplets' },
    { value: 'oil_spill', label: 'Oil Spill', icon: 'Fuel' },
    { value: 'rip_currents', label: 'Rip Currents', icon: 'Wind' }
  ];

  const localHazards = [
    { value: 'torrential_rainfall', label: 'Torrential Rainfall', icon: 'CloudRain' },
    { value: 'electrocution', label: 'Electrocution Risk', icon: 'Zap' },
    { value: 'urban_flooding', label: 'Urban Flooding', icon: 'Droplets' },
    { value: 'tree_falls', label: 'Tree Falls', icon: 'TreePine' },
    { value: 'landslides', label: 'Landslides', icon: 'Mountain' }
  ];

  const getHazardOptions = () => {
    const hazards = selectedCategory === 'ocean' ? oceanHazards : localHazards;
    return hazards?.map(hazard => ({
      value: hazard?.value,
      label: hazard?.label,
      description: `Report ${hazard?.label?.toLowerCase()} incident`
    }));
  };

  const getCurrentHazardIcon = () => {
    const allHazards = [...oceanHazards, ...localHazards];
    const hazard = allHazards?.find(h => h?.value === selectedHazard);
    return hazard ? hazard?.icon : 'AlertTriangle';
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Hazard Type</h3>
            <p className="text-sm text-muted-foreground">Select the category and specific hazard type</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Hazard Category"
            placeholder="Choose category"
            options={hazardCategories}
            value={selectedCategory}
            onChange={onCategoryChange}
            required
          />

          {selectedCategory && (
            <Select
              label="Specific Hazard"
              placeholder="Choose hazard type"
              options={getHazardOptions()}
              value={selectedHazard}
              onChange={onHazardChange}
              required
            />
          )}
        </div>

        {selectedHazard && (
          <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name={getCurrentHazardIcon()} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Selected: {getHazardOptions()?.find(h => h?.value === selectedHazard)?.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  Please provide accurate details for this hazard type
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardTypeSelector;