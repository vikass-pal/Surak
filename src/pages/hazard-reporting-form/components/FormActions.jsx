import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSubmit, 
  onSaveDraft, 
  isSubmitting, 
  isSaving, 
  isFormValid, 
  lastSaved 
}) => {
  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const saved = new Date(timestamp);
    const diffMinutes = Math.floor((now - saved) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Saved just now';
    if (diffMinutes < 60) return `Saved ${diffMinutes}m ago`;
    return `Saved ${Math.floor(diffMinutes / 60)}h ago`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex flex-col space-y-4">
          {/* Auto-save status */}
          {lastSaved && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Save" size={16} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground">
                  {formatLastSaved(lastSaved)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSaveDraft}
                loading={isSaving}
                iconName="RefreshCw"
                iconPosition="left"
                className="text-xs"
              >
                Save Now
              </Button>
            </div>
          )}

          {/* Form validation status */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {isFormValid ? (
                <>
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">Form is complete and ready to submit</span>
                </>
              ) : (
                <>
                  <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                  <span className="text-sm font-medium text-warning">Please complete all required fields</span>
                </>
              )}
            </div>

            {!isFormValid && (
              <div className="text-xs text-muted-foreground ml-6">
                Required: Hazard type, location, severity, and description (min 50 characters)
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Save Draft
            </Button>

            <Button
              variant="destructive"
              onClick={onSubmit}
              loading={isSubmitting}
              disabled={!isFormValid}
              iconName="Send"
              iconPosition="left"
              className="flex-1 emergency-btn"
            >
              {isSubmitting ? 'Submitting Report...' : 'Submit Emergency Report'}
            </Button>
          </div>

          {/* Emergency notice */}
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertOctagon" size={16} color="var(--color-error)" className="mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-error mb-1">Emergency Situations</p>
                <p className="text-error/80 text-xs">
                  For immediate life-threatening emergencies, call emergency services directly at 
                  <strong className="font-semibold"> 112</strong> or <strong className="font-semibold">108</strong> 
                  before submitting this report.
                </p>
              </div>
            </div>
          </div>

          {/* Submission info */}
          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} color="var(--color-primary)" className="mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="mb-1">After submission:</p>
                <ul className="space-y-0.5">
                  <li>• You'll receive a report ID for tracking</li>
                  <li>• Emergency services will be notified within 2-5 minutes</li>
                  <li>• Verification typically takes 10-30 minutes</li>
                  <li>• Community alerts will be sent once verified</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormActions;