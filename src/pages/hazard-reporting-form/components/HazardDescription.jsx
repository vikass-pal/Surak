import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HazardDescription = ({ description, onDescriptionChange }) => {
  const [charCount, setCharCount] = useState(description?.length);
  const maxChars = 1000;
  const minChars = 50;

  const handleChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      onDescriptionChange(value);
      setCharCount(value?.length);
    }
  };

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-error';
    if (charCount > maxChars * 0.9) return 'text-warning';
    return 'text-success';
  };

  const suggestedQuestions = [
    "What exactly did you observe?",
    "When did this hazard occur?",
    "How many people are potentially affected?",
    "Are there any immediate dangers?",
    "What emergency services are needed?"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Hazard Description</h3>
            <p className="text-sm text-muted-foreground">Provide detailed information about the situation</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={description}
              onChange={handleChange}
              placeholder={`Describe the hazard in detail. Include:\n• What you observed\n• Current conditions\n• Number of people affected\n• Immediate dangers\n• Any ongoing emergency response`}
              className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
            <div className={`absolute bottom-3 right-3 text-xs font-medium ${getCharCountColor()}`}>
              {charCount}/{maxChars}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              {charCount >= minChars ? (
                <>
                  <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                  <span className="text-success">Minimum length met</span>
                </>
              ) : (
                <>
                  <Icon name="AlertCircle" size={14} color="var(--color-error)" />
                  <span className="text-error">Need {minChars - charCount} more characters</span>
                </>
              )}
            </div>
            <span className="text-muted-foreground">
              {charCount < minChars ? 'Too short' : charCount > maxChars * 0.9 ? 'Almost full' : 'Good length'}
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} />
            <span>Consider answering these questions:</span>
          </h4>
          <ul className="space-y-2">
            {suggestedQuestions?.map((question, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>

        {description?.length >= minChars && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <p className="text-sm font-medium text-success">
                Description looks comprehensive
              </p>
            </div>
            <p className="text-xs text-success/80 mt-1">
              Detailed reports help emergency responders prepare appropriate resources
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardDescription;