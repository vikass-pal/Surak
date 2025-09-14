import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HazardTypeSelector from './components/HazardTypeSelector';
import LocationSelector from './components/LocationSelector';
import MediaUpload from './components/MediaUpload';
import SeveritySelector from './components/SeveritySelector';
import HazardDescription from './components/HazardDescription';
import ContactInformation from './components/ContactInformation';
import FormActions from './components/FormActions';
import Icon from '../../components/AppIcon';

const HazardReportingForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    hazardCategory: '',
    hazardType: '',
    location: {
      latitude: '',
      longitude: '',
      address: ''
    },
    severity: '',
    description: '',
    files: [],
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    },
    isAnonymous: false
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reportId, setReportId] = useState('');

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData?.hazardType || formData?.description) {
        handleSaveDraft();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('hazard-report-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setLastSaved(new Date(localStorage.getItem('hazard-report-draft-timestamp')));
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  // Form validation
  const isFormValid = () => {
    return (formData?.hazardCategory &&
    formData?.hazardType &&
    formData?.location?.latitude &&
    formData?.location?.longitude &&
    formData?.severity &&
    formData?.description?.length >= 50 && (formData?.isAnonymous || (formData?.contactInfo?.name && formData?.contactInfo?.phone && formData?.contactInfo?.email)));
  };

  // Handlers
  const handleHazardCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      hazardCategory: category,
      hazardType: '' // Reset hazard type when category changes
    }));
  };

  const handleHazardTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      hazardType: type
    }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
  };

  const handleFilesChange = (files) => {
    setFormData(prev => ({
      ...prev,
      files
    }));
  };

  const handleSeverityChange = (severity) => {
    setFormData(prev => ({
      ...prev,
      severity
    }));
  };

  const handleDescriptionChange = (description) => {
    setFormData(prev => ({
      ...prev,
      description
    }));
  };

  const handleContactInfoChange = (contactInfo) => {
    setFormData(prev => ({
      ...prev,
      contactInfo
    }));
  };

  const handleAnonymousChange = (isAnonymous) => {
    setFormData(prev => ({
      ...prev,
      isAnonymous,
      contactInfo: isAnonymous ? { name: '', phone: '', email: '' } : prev?.contactInfo
    }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('hazard-report-draft', JSON.stringify(formData));
      localStorage.setItem('hazard-report-draft-timestamp', new Date()?.toISOString());
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock report ID
      const mockReportId = `HR-${Date.now()?.toString()?.slice(-6)}`;
      setReportId(mockReportId);
      
      // Clear saved draft
      localStorage.removeItem('hazard-report-draft');
      localStorage.removeItem('hazard-report-draft-timestamp');
      
      setSubmitSuccess(true);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/home-dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Report Submitted Successfully</h1>
              <p className="text-muted-foreground mb-6">
                Your hazard report has been received and emergency services have been notified.
              </p>
              
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-foreground mb-2">Report ID</p>
                <p className="text-lg font-mono text-primary">{reportId}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Save this ID to track your report status
                </p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>• Emergency services notified within 2-5 minutes</p>
                <p>• Verification process: 10-30 minutes</p>
                <p>• Community alerts sent once verified</p>
              </div>

              <p className="text-xs text-muted-foreground">
                Redirecting to dashboard in a few seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Emergency Hazard Report</h1>
                <p className="text-muted-foreground">
                  Report hazards quickly to protect your community
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>Takes 3-5 minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} />
                <span>Secure & encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>Helps community safety</span>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            <HazardTypeSelector
              selectedCategory={formData?.hazardCategory}
              onCategoryChange={handleHazardCategoryChange}
              selectedHazard={formData?.hazardType}
              onHazardChange={handleHazardTypeChange}
            />

            {formData?.hazardType && (
              <>
                <LocationSelector
                  location={formData?.location}
                  onLocationChange={handleLocationChange}
                />

                <SeveritySelector
                  severity={formData?.severity}
                  onSeverityChange={handleSeverityChange}
                />

                <HazardDescription
                  description={formData?.description}
                  onDescriptionChange={handleDescriptionChange}
                />

                <MediaUpload
                  files={formData?.files}
                  onFilesChange={handleFilesChange}
                />

                <ContactInformation
                  contactInfo={formData?.contactInfo}
                  onContactInfoChange={handleContactInfoChange}
                  isAnonymous={formData?.isAnonymous}
                  onAnonymousChange={handleAnonymousChange}
                />

                <FormActions
                  onSubmit={handleSubmit}
                  onSaveDraft={handleSaveDraft}
                  isSubmitting={isSubmitting}
                  isSaving={isSaving}
                  isFormValid={isFormValid()}
                  lastSaved={lastSaved}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardReportingForm;