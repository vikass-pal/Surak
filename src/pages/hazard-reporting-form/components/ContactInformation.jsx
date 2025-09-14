import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactInformation = ({ contactInfo, onContactInfoChange, isAnonymous, onAnonymousChange }) => {
  const handleInputChange = (field, value) => {
    onContactInfoChange({
      ...contactInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
            <p className="text-sm text-muted-foreground">Help responders reach you for updates</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Submit report anonymously"
            description="Your identity will not be shared with emergency services"
            checked={isAnonymous}
            onChange={(e) => onAnonymousChange(e?.target?.checked)}
          />

          {!isAnonymous && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={contactInfo?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  required={!isAnonymous}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactInfo?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  required={!isAnonymous}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={contactInfo?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                description="We'll send you updates about this report"
                required={!isAnonymous}
              />

              <div className="p-4 bg-muted rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={16} color="var(--color-primary)" className="mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Privacy Protection</p>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>• Your contact details are encrypted and secure</li>
                      <li>• Only authorized emergency personnel can access this information</li>
                      <li>• You can request data deletion after the incident is resolved</li>
                      <li>• We never share personal information with third parties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isAnonymous && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">Anonymous Reporting</p>
                  <p className="text-warning/80 text-xs">
                    Emergency services won't be able to contact you for additional information or updates. 
                    Consider providing contact details for critical situations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;