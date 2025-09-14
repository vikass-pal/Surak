import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SocialMediaAnalytics from './pages/social-media-analytics';
import HomeDashboard from './pages/home-dashboard';
import HazardReportingForm from './pages/hazard-reporting-form';
import InteractiveHazardMap from './pages/interactive-hazard-map';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HazardReportingForm />} />
        <Route path="/social-media-analytics" element={<SocialMediaAnalytics />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/hazard-reporting-form" element={<HazardReportingForm />} />
        <Route path="/interactive-hazard-map" element={<InteractiveHazardMap />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
