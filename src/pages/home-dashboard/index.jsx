import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import FeatureCards from './components/FeatureCards';
import RecentAlerts from './components/RecentAlerts';
import TrustSection from './components/TrustSection';

const HomeDashboard = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>SurakshaX - Real-time Hazard Alerts From Seas to Streets</title>
        <meta 
          name="description" 
          content="Protecting communities through crowdsourced hazard detection and AI-powered social media analysis. Report hazards instantly and stay informed about risks in your area." 
        />
        <meta name="keywords" content="hazard alerts, emergency response, tsunami warning, flood alerts, disaster management, community safety" />
        <meta property="og:title" content="SurakshaX - Real-time Hazard Alerts" />
        <meta property="og:description" content="From Seas to Streets - Comprehensive hazard protection system" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroBanner />
          
          {/* Feature Cards Section */}
          <FeatureCards />
          
          {/* Recent Alerts Section */}
          <RecentAlerts />
          
          {/* Trust & Certification Section */}
          <TrustSection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">SurakshaX</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 max-w-md">
                  Protecting communities through real-time hazard detection and emergency response. 
                  From ocean safety to urban hazards, we keep you informed and safe.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/hazard-reporting-form" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Report Hazard
                    </a>
                  </li>
                  <li>
                    <a href="/interactive-hazard-map" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      View Map
                    </a>
                  </li>
                  <li>
                    <a href="/social-media-analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Analytics
                    </a>
                  </li>
                </ul>
              </div>

              {/* Emergency Contacts */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Emergency</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium">108</span> - Emergency
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium">1077</span> - Disaster Mgmt
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium">1070</span> - Fire Services
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} SurakshaX. All rights reserved. Developed By Foosie Gang 2025
              </p>
           
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeDashboard;