import React from 'react';
import Icon from '../../../components/AppIcon';

const SeveritySelector = ({ severity, onSeverityChange }) => {
  const severityLevels = [
    {
      value: 'low',
      label: 'Low Risk',
      description: 'Minor hazard with minimal immediate danger',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      icon: 'Info'
    },
    {
      value: 'medium',
      label: 'Medium Risk',
      description: 'Moderate hazard requiring attention',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      icon: 'AlertTriangle'
    },
    {
      value: 'high',
      label: 'High Risk',
      description: 'Severe hazard with immediate danger',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      icon: 'AlertOctagon'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Gauge" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Severity Assessment</h3>
            <p className="text-sm text-muted-foreground">Rate the urgency and danger level</p>
          </div>
        </div>

        <div className="space-y-3">
          {severityLevels?.map((level) => (
            <label
              key={level?.value}
              className={`relative flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-sm ${
                severity === level?.value
                  ? `${level?.borderColor} ${level?.bgColor}`
                  : 'border-border bg-background hover:border-border/60'
              }`}
            >
              <input
                type="radio"
                name="severity"
                value={level?.value}
                checked={severity === level?.value}
                onChange={(e) => onSeverityChange(e?.target?.value)}
                className="sr-only"
              />
              
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                severity === level?.value ? level?.bgColor : 'bg-muted'
              }`}>
                <Icon 
                  name={level?.icon} 
                  size={16} 
                  color={severity === level?.value ? `var(--color-${level?.value === 'low' ? 'success' : level?.value === 'medium' ? 'warning' : 'error'})` : 'var(--color-muted-foreground)'} 
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium ${
                    severity === level?.value ? level?.color : 'text-foreground'
                  }`}>
                    {level?.label}
                  </h4>
                  {severity === level?.value && (
                    <div className="w-2 h-2 bg-current rounded-full" />
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  severity === level?.value ? level?.color + '/80' : 'text-muted-foreground'
                }`}>
                  {level?.description}
                </p>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                severity === level?.value
                  ? `${level?.borderColor?.replace('/20', '')} ${level?.bgColor}`
                  : 'border-border'
              }`}>
                {severity === level?.value && (
                  <div className={`w-2 h-2 rounded-full ${
                    level?.value === 'low' ? 'bg-success' : 
                    level?.value === 'medium' ? 'bg-warning' : 'bg-error'
                  }`} />
                )}
              </div>
            </label>
          ))}
        </div>

        {severity && (
          <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <p className="text-sm font-medium text-foreground">
                Severity Level: {severityLevels?.find(l => l?.value === severity)?.label}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This helps emergency responders prioritize their response
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeveritySelector;