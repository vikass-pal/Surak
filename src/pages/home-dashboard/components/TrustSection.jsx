import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSection = () => {
  const trustMetrics = [
    {
      id: 1,
      value: "99.2%",
      label: "Alert Accuracy",
      description: "Verified through multiple sources",
      icon: "Target"
    },
    {
      id: 2,
      value: "< 2 min",
      label: "Response Time",
      description: "Average alert processing time",
      icon: "Clock"
    },
    {
      id: 3,
      value: "50,000+",
      label: "Active Users",
      description: "Contributing to community safety",
      icon: "Users"
    },
    {
      id: 4,
      value: "24/7",
      label: "Monitoring",
      description: "Continuous hazard surveillance",
      icon: "Shield"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "INCOIS Certified",
      description: "Indian National Centre for Ocean Information Services",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      verified: true
    },
    {
      id: 3,
      name: "ISO 27001 Certified",
      description: "Information Security Management",
      logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center",
      verified: true
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by Government & Communities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform is officially recognized and certified by leading government agencies 
            for reliable hazard detection and emergency response.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics?.map((metric) => (
            <div
              key={metric?.id}
              className="text-center bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={metric?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {metric?.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {metric?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric?.description}
              </div>
            </div>
          ))}
        </div>

        {/* Government Partnership */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Award" size={32} className="text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-blue-900">
                Official Government Partnership
              </h3>
            </div>
            <p className="text-blue-700 text-lg mb-6 max-w-3xl mx-auto">
              SurakshaX is developed by foosie gang in collaboration with the Ministry of Earth Sciences,
              under the Smart India Hackathon initiative to enhance national disaster preparedness.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center text-blue-800">
                <Icon name="MapPin" size={16} className="mr-2" />
                <span className="text-sm font-medium">Ministry of Earth Sciences, Govt. of India</span>
              </div>
              <div className="flex items-center text-blue-800">
                <Icon name="Calendar" size={16} className="mr-2" />
                <span className="text-sm font-medium">Established 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
