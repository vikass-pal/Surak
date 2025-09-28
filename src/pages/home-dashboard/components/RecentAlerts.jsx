import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAlerts = () => {
  const navigate = useNavigate();
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const recentAlerts = [
    {
      id: 1,
      type: "High Waves",
      location: "Marina Beach, Chennai",
      severity: "high",
      distance: "0.8 km",
      timestamp: "2025-09-14T09:15:00",
      description: "Wave height exceeding 3.5 meters reported by multiple sources",
      icon: "Waves",
      verificationStatus: "verified",
      reportCount: 12
    },
    {
      id: 2,
      type: "Urban Flooding",
      location: "T. Nagar, Chennai",
      severity: "medium",
      distance: "1.2 km",
      timestamp: "2025-09-14T08:45:00",
      description: "Water logging on main roads due to heavy rainfall",
      icon: "CloudRain",
      verificationStatus: "verified",
      reportCount: 8
    },
    {
      id: 3,
      type: "Tree Fall Risk",
      location: "Anna Nagar, Chennai",
      severity: "low",
      distance: "2.1 km",
      timestamp: "2025-09-14T08:30:00",
      description: "Large tree showing signs of instability near residential area",
      icon: "TreePine",
      verificationStatus: "pending",
      reportCount: 3
    },
    {
      id: 4,
      type: "Electrocution Risk",
      location: "Velachery, Chennai",
      severity: "high",
      distance: "1.8 km",
      timestamp: "2025-09-14T07:20:00",
      description: "Exposed electrical cables in flood water area",
      icon: "Zap",
      verificationStatus: "verified",
      reportCount: 15
    },
    {
      id: 5,
      type: "Oil Spill",
      location: "Ennore Port, Chennai",
      severity: "medium",
      distance: "5.2 km",
      timestamp: "2025-09-14T06:45:00",
      description: "Small oil spill detected near fishing harbor",
      icon: "Fuel",
      verificationStatus: "investigating",
      reportCount: 6
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };
  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified':
        return { color: 'bg-green-100 text-green-800', icon: 'CheckCircle', text: 'Verified' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: 'Clock', text: 'Pending' };
      case 'investigating':
        return { color: 'bg-blue-100 text-blue-800', icon: 'Search', text: 'Investigating' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: 'AlertCircle', text: 'Unknown' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date?.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  const handleAcknowledge = (alertId) => {
    setAcknowledgedAlerts(prev => new Set([...prev, alertId]));
  };

  const handleViewDetails = (alertId) => {
    navigate(`/interactive-hazard-map?alert=${alertId}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Recent Alerts in Your Area
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed about hazards within 5km of your location
            </p>
          </div>
          
          <div className="mt-6 lg:mt-0">
            <Button
              variant="outline"
              iconName="Map"
              iconPosition="left"
              onClick={() => navigate('/interactive-hazard-map')}
            >
              View All on Map
            </Button>
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {recentAlerts?.map((alert) => {
            const verification = getVerificationBadge(alert?.verificationStatus);
            const isAcknowledged = acknowledgedAlerts?.has(alert?.id);
            
            return (
              <div
                key={alert?.id}
                className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${getSeverityColor(alert?.severity)} rounded-lg flex items-center justify-center mr-3`}>
                      <Icon name={alert?.icon} size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {alert?.type}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {alert?.location} • {alert?.distance} away
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${verification?.color} mb-2`}>
                      <Icon name={verification?.icon} size={12} className="inline mr-1" />
                      {verification?.text}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(alert?.timestamp)}
                    </span>
                  </div>
                </div>
                {/* Severity Indicator */}
                <div className="flex items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityTextColor(alert?.severity)} bg-opacity-10`}>
                    {alert?.severity?.toUpperCase()} SEVERITY
                  </span>
                  <span className="text-xs text-muted-foreground ml-3">
                    {alert?.reportCount} reports
                  </span>
                </div>
                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {alert?.description}
                </p>
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {!isAcknowledged ? (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      onClick={() => handleAcknowledge(alert?.id)}
                      className="flex-1"
                    >
                      Acknowledge
                    </Button>
                  ) : (
                    <div className="flex items-center text-green-600 text-sm font-medium flex-1">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Acknowledged
                    </div>
                  )}
                  
                  <Button
                    variant="default"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => handleViewDetails(alert?.id)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <Icon name="Phone" size={24} color="white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Emergency Contacts
              </h3>
              <p className="text-red-700 text-sm mb-4">
                For immediate life-threatening emergencies, contact these numbers directly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-red-900 font-bold text-lg">108</div>
                  <div className="text-red-700 text-xs">Emergency Services</div>
                </div>
                <div className="text-center">
                  <div className="text-red-900 font-bold text-lg">1077</div>
                  <div className="text-red-700 text-xs">Disaster Management</div>
                </div>
                <div className="text-center">
                  <div className="text-red-900 font-bold text-lg">1070</div>
                  <div className="text-red-700 text-xs">Fire Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentAlerts;