import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FeatureCards = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Geo-Tagged Reporting",
      description: "Report hazards with precise location data and photo evidence for accurate emergency response.",
      icon: "MapPin",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      onClick: () => navigate('/hazard-reporting-form')
    },
    {
      id: 2,
      title: "Ocean Safety Alerts",
      description: "Real-time monitoring of tsunamis, high waves, oil spills, and rip currents for coastal protection.",
      icon: "Waves",
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
      onClick: () => navigate('/interactive-hazard-map')
    },
    {
      id: 3,
      title: "Urban Hazard Detection",
      description: "Track flooding, electrocution risks, landslides, and tree falls in urban environments.",
      icon: "Building2",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      onClick: () => navigate('/interactive-hazard-map')
    },
    {
      id: 4,
      title: "AI Social Media Analysis",
      description: "Advanced AI monitoring of social platforms for early hazard detection and trend analysis.",
      icon: "Brain",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      onClick: () => navigate('/social-media-analytics')
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Hazard Protection
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our advanced system combines crowdsourced reporting with AI-powered analysis 
            to provide complete hazard coverage from ocean to urban environments.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              onClick={feature?.onClick}
              className="group bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-300 cursor-pointer hover-lift"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${feature?.color} ${feature?.hoverColor} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}>
                <Icon name={feature?.icon} size={24} color="white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                {feature?.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {feature?.description}
              </p>

              {/* Action Link */}
              <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-200">
                <span>Learn More</span>
                <Icon name="ArrowRight" size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Make Your Community Safer?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of citizens contributing to real-time hazard detection and community safety.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/hazard-reporting-form')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Submit First Report
              </button>
              <button
                onClick={() => navigate('/interactive-hazard-map')}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <Icon name="Map" size={20} className="mr-2" />
                Explore Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;