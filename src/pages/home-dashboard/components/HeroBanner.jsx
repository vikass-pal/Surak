import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleReportHazard = () => {
    navigate('/hazard-reporting-form');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-300 via-cyan-500 to-blue-400 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Main Heading */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Icon name="Shield" size={32} color="white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Real-time Hazard Alerts
            </h1>
          </div>
          
          <p className="text-xl lg:text-2xl font-medium mb-8 text-blue-100">
            From Seas to Streets
          </p>

          {/* Description */}
          <p className="text-lg lg:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Protecting communities through crowdsourced hazard detection and AI-powered social media analysis. 
            Report hazards instantly and stay informed about risks in your area.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={handleReportHazard}
              className="bg-red-500 hover:bg-red-600 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Report Hazard Now
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Map"
              iconPosition="left"
              onClick={() => navigate('/interactive-hazard-map')}
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
            >
              View Hazard Map
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm lg:text-base text-blue-100">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white">1,247</div>
              <div className="text-sm lg:text-base text-blue-100">Reports Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white">15+</div>
              <div className="text-sm lg:text-base text-blue-100">Hazard Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white">98%</div>
              <div className="text-sm lg:text-base text-blue-100">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;